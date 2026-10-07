import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function deploy() {
  await client.connect();
  console.log('Deploying CCTV approval and "visto bueno" workflow...');

  // 1. Crear o actualizar tabla de solicitudes de aprobación para el curso CCTV
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.cctv_approval_requests (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
      rut text NOT NULL,
      nombre text NOT NULL,
      email text,
      telefono text,
      curso_id text DEFAULT 'seg-09',
      curso_nombre text DEFAULT 'Técnicas de operación CCTV y alarmas de seguridad privada',
      estado_aprobacion text DEFAULT 'PENDIENTE', -- 'PENDIENTE', 'APROBADO', 'RECHAZADO'
      visto_bueno boolean DEFAULT false,
      visto_bueno_at timestamptz,
      visto_bueno_by text,
      notas text,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    );

    -- Asegurar constraint unique por RUT y curso_id
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'uq_cctv_rut_curso'
      ) THEN
        ALTER TABLE public.cctv_approval_requests 
          ADD CONSTRAINT uq_cctv_rut_curso UNIQUE (rut, curso_id);
      END IF;
    END $$;

    CREATE INDEX IF NOT EXISTS idx_cctv_requests_status 
      ON public.cctv_approval_requests(estado_aprobacion, visto_bueno, created_at DESC);
  `);

  // 2. Políticas RLS
  await client.query(`
    ALTER TABLE public.cctv_approval_requests ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Lectura publica de solicitudes cctv" ON public.cctv_approval_requests;
    CREATE POLICY "Lectura publica de solicitudes cctv"
      ON public.cctv_approval_requests
      FOR SELECT
      TO authenticated, anon
      USING (true);

    DROP POLICY IF EXISTS "Insercion y modificacion solicitudes cctv" ON public.cctv_approval_requests;
    CREATE POLICY "Insercion y modificacion solicitudes cctv"
      ON public.cctv_approval_requests
      FOR ALL
      TO authenticated, anon
      USING (true)
      WITH CHECK (true);
  `);

  // 3. Stored Procedure: Estudiante solicita admisión a CCTV -> Crea solicitud de aprobación
  await client.query(`
    CREATE OR REPLACE FUNCTION public.request_cctv_approval(
      p_user_id uuid,
      p_rut text,
      p_nombre text,
      p_email text DEFAULT NULL,
      p_telefono text DEFAULT NULL,
      p_notas text DEFAULT NULL
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_user_id uuid := p_user_id;
      v_clean_rut text;
      v_auth_email text;
      v_req_id uuid;
      v_now timestamptz := now();
    BEGIN
      v_clean_rut := lower(regexp_replace(trim(p_rut), '[^a-zA-Z0-9]', '', 'g'));
      v_auth_email := v_clean_rut || '@prevyseg.cl';

      -- Si no se proporcionó user_id, buscarlo por RUT en public.users
      IF v_user_id IS NULL AND p_rut IS NOT NULL THEN
        SELECT id INTO v_user_id 
        FROM public.users 
        WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut 
           OR rut = trim(p_rut) 
        LIMIT 1;
      END IF;

      -- Si no está en public.users, buscar en auth.users por email generado
      IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id
        FROM auth.users
        WHERE email = v_auth_email
        LIMIT 1;
      END IF;

      -- Si no existe en ningún lado, crearlo en auth.users
      IF v_user_id IS NULL THEN
        v_user_id := gen_random_uuid();

        INSERT INTO auth.users (
          id,
          instance_id,
          aud,
          role,
          email,
          encrypted_password,
          email_confirmed_at,
          raw_app_meta_data,
          raw_user_meta_data,
          is_super_admin,
          created_at,
          updated_at
        ) VALUES (
          v_user_id,
          '00000000-0000-0000-0000-000000000000',
          'authenticated',
          'authenticated',
          v_auth_email,
          extensions.crypt(v_clean_rut, extensions.gen_salt('bf', 10)),
          v_now,
          '{"provider":"email","providers":["email"]}'::jsonb,
          jsonb_build_object(
            'rut', trim(p_rut),
            'nombre', trim(p_nombre),
            'rol', 'STUDENT',
            'telefono', trim(p_telefono)
          ),
          false,
          v_now,
          v_now
        );
      END IF;

      -- Garantizar en public.users con ON CONFLICT (id)
      IF v_user_id IS NOT NULL THEN
        INSERT INTO public.users (
          id,
          rut,
          nombre,
          email,
          telefono,
          rol,
          created_at
        ) VALUES (
          v_user_id,
          trim(p_rut),
          trim(p_nombre),
          COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
          trim(p_telefono),
          'STUDENT',
          v_now
        )
        ON CONFLICT (id) DO UPDATE SET
          rut = EXCLUDED.rut,
          nombre = EXCLUDED.nombre,
          email = EXCLUDED.email,
          telefono = EXCLUDED.telefono;
      END IF;

      -- Insertar o actualizar la solicitud en estado PENDIENTE de visto bueno
      INSERT INTO public.cctv_approval_requests (
        user_id,
        rut,
        nombre,
        email,
        telefono,
        curso_id,
        curso_nombre,
        estado_aprobacion,
        visto_bueno,
        notas,
        created_at,
        updated_at
      ) VALUES (
        v_user_id,
        trim(p_rut),
        trim(p_nombre),
        trim(p_email),
        trim(p_telefono),
        'seg-09',
        'Técnicas de operación CCTV y alarmas de seguridad privada',
        'PENDIENTE',
        false,
        COALESCE(p_notas, 'Solicitud de alumno ingresada para evaluación y visto bueno'),
        v_now,
        v_now
      )
      ON CONFLICT (rut, curso_id) DO UPDATE SET
        estado_aprobacion = 'PENDIENTE',
        visto_bueno = false,
        visto_bueno_at = NULL,
        visto_bueno_by = NULL,
        user_id = COALESCE(EXCLUDED.user_id, public.cctv_approval_requests.user_id),
        nombre = EXCLUDED.nombre,
        email = EXCLUDED.email,
        telefono = EXCLUDED.telefono,
        notas = COALESCE(p_notas, public.cctv_approval_requests.notas),
        updated_at = v_now
      RETURNING id INTO v_req_id;

      -- Sincronizar también con escuela_seguridad
      IF v_user_id IS NOT NULL THEN
        INSERT INTO public.escuela_seguridad (
          user_id,
          rut,
          nombre,
          email,
          telefono,
          curso_id,
          curso_nombre,
          modalidad,
          estado_matricula,
          estado_pago,
          created_at
        ) VALUES (
          v_user_id,
          trim(p_rut),
          trim(p_nombre),
          trim(p_email),
          trim(p_telefono),
          'seg-09',
          'Técnicas de operación CCTV y alarmas de seguridad privada',
          'Autoestudio Documental (30 Días)',
          'PENDIENTE_APROBACION',
          'PENDIENTE',
          v_now
        )
        ON CONFLICT (user_id) DO UPDATE SET
          estado_matricula = 'PENDIENTE_APROBACION';
      END IF;

      RETURN json_build_object(
        'success', true,
        'request_id', v_req_id,
        'user_id', v_user_id,
        'nombre', trim(p_nombre),
        'rut', trim(p_rut),
        'estado', 'PENDIENTE',
        'message', 'Solicitud de aprobación para CCTV registrada exitosamente. Pendiente de visto bueno por el administrador.'
      );
    END;
    $$;
  `);

  // 4. Stored Procedure: Admin da el "Visto Bueno" y Acepta la solicitud
  await client.query(`
    CREATE OR REPLACE FUNCTION public.approve_cctv_request(
      p_request_id uuid,
      p_admin_name text DEFAULT 'Administrador OTEC',
      p_notes text DEFAULT NULL,
      p_incorporate_now boolean DEFAULT false
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_req record;
      v_inc_result json;
      v_now timestamptz := now();
    BEGIN
      SELECT * INTO v_req FROM public.cctv_approval_requests WHERE id = p_request_id;
      IF NOT FOUND THEN
        RAISE EXCEPTION 'Solicitud de CCTV no encontrada con ID %', p_request_id;
      END IF;

      -- Marcar con visto bueno y aceptado
      UPDATE public.cctv_approval_requests
      SET estado_aprobacion = 'APROBADO',
          visto_bueno = true,
          visto_bueno_at = v_now,
          visto_bueno_by = COALESCE(p_admin_name, 'Administrador OTEC'),
          notas = COALESCE(p_notes, 'Aceptado y con visto bueno otorgado por ' || COALESCE(p_admin_name, 'Administrador OTEC')),
          updated_at = v_now
      WHERE id = p_request_id;

      -- Actualizar estado en escuela_seguridad
      IF v_req.user_id IS NOT NULL THEN
        UPDATE public.escuela_seguridad
        SET estado_matricula = 'VISTO_BUENO_APROBADO',
            estado_pago = 'CONFIRMADO'
        WHERE user_id = v_req.user_id;
      END IF;

      -- Si se solicitó incorporación inmediata (1 a la vez)
      IF p_incorporate_now AND v_req.user_id IS NOT NULL THEN
        v_inc_result := public.incorporate_cctv_student(v_req.user_id);
      END IF;

      RETURN json_build_object(
        'success', true,
        'request_id', p_request_id,
        'user_id', v_req.user_id,
        'student_name', v_req.nombre,
        'visto_bueno', true,
        'visto_bueno_at', v_now,
        'incorporated', p_incorporate_now,
        'incorporation_result', v_inc_result,
        'message', 'Visto bueno otorgado exitosamente para ' || v_req.nombre || '.'
      );
    END;
    $$;
  `);

  // 5. Stored Procedure: Admin rechaza la solicitud
  await client.query(`
    CREATE OR REPLACE FUNCTION public.reject_cctv_request(
      p_request_id uuid,
      p_reason text DEFAULT 'Solicitud rechazada por la administración'
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_req record;
      v_now timestamptz := now();
    BEGIN
      SELECT * INTO v_req FROM public.cctv_approval_requests WHERE id = p_request_id;
      IF NOT FOUND THEN
        RAISE EXCEPTION 'Solicitud no encontrada con ID %', p_request_id;
      END IF;

      UPDATE public.cctv_approval_requests
      SET estado_aprobacion = 'RECHAZADO',
          visto_bueno = false,
          notas = COALESCE(p_reason, 'Rechazado por administración'),
          updated_at = v_now
      WHERE id = p_request_id;

      IF v_req.user_id IS NOT NULL THEN
        UPDATE public.escuela_seguridad
        SET estado_matricula = 'RECHAZADO'
        WHERE user_id = v_req.user_id;
      END IF;

      RETURN json_build_object(
        'success', true,
        'request_id', p_request_id,
        'student_name', v_req.nombre,
        'message', 'Solicitud rechazada.'
      );
    END;
    $$;
  `);

  // 6. Stored Procedure: Listar solicitudes y postulantes categorizados
  await client.query(`
    CREATE OR REPLACE FUNCTION public.get_cctv_approval_list(
      p_course_id uuid DEFAULT NULL
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_pending json;
      v_approved json;
      v_active_status json;
    BEGIN
      -- A. Solicitudes PENDIENTES de visto bueno
      SELECT json_agg(row_to_json(p)) INTO v_pending
      FROM (
        SELECT 
          r.id as request_id,
          r.user_id,
          r.nombre,
          r.rut,
          r.email,
          r.telefono,
          r.curso_id,
          r.curso_nombre,
          r.estado_aprobacion,
          r.visto_bueno,
          r.notas,
          r.created_at as fecha_solicitud
        FROM public.cctv_approval_requests r
        WHERE r.visto_bueno = false AND r.estado_aprobacion = 'PENDIENTE'
        ORDER BY r.created_at DESC
      ) p;

      -- B. Postulantes APROBADOS con visto bueno (listos para incorporar 1 a la vez)
      SELECT json_agg(row_to_json(a)) INTO v_approved
      FROM (
        SELECT 
          r.id as request_id,
          r.user_id,
          r.nombre,
          r.rut,
          r.email,
          r.telefono,
          r.curso_id,
          r.curso_nombre,
          r.estado_aprobacion,
          r.visto_bueno,
          r.visto_bueno_at,
          r.visto_bueno_by,
          r.notas,
          r.created_at as fecha_solicitud,
          CASE 
            WHEN a.is_active = true AND a.expires_at > now() THEN true
            ELSE false
          END as is_currently_active
        FROM public.cctv_approval_requests r
        LEFT JOIN public.cctv_special_activations a ON a.user_id = r.user_id AND a.is_active = true
        WHERE r.visto_bueno = true AND r.estado_aprobacion = 'APROBADO'
        ORDER BY r.visto_bueno_at DESC
      ) a;

      -- C. Estado del alumno actualmente activo
      v_active_status := public.get_cctv_active_status(p_course_id);

      RETURN json_build_object(
        'pending_requests', COALESCE(v_pending, '[]'::json),
        'approved_applicants', COALESCE(v_approved, '[]'::json),
        'active_status', v_active_status
      );
    END;
    $$;
  `);

  // Permisos
  await client.query(`
    GRANT EXECUTE ON FUNCTION public.request_cctv_approval(uuid, text, text, text, text, text) TO anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION public.approve_cctv_request(uuid, text, text, boolean) TO anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION public.reject_cctv_request(uuid, text) TO anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION public.get_cctv_approval_list(uuid) TO anon, authenticated, service_role;
    GRANT ALL ON TABLE public.cctv_approval_requests TO anon, authenticated, service_role;
  `);

  console.log('✅ CCTV Approval & Visto Bueno workflow deployed successfully!');
  await client.end();
}

deploy().catch(err => {
  console.error('Error deploying CCTV approval workflow:', err);
  process.exit(1);
});
