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
  console.log('Deploying CCTV applicant incorporation and historical registry system...');

  // 1. Crear tabla de historial y registro de participantes por curso
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.course_participant_history (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      course_id uuid REFERENCES public.courses(id) ON DELETE SET NULL,
      course_title text NOT NULL,
      user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
      user_name text NOT NULL,
      user_rut text NOT NULL,
      user_email text,
      action text NOT NULL, -- 'INCORPORADO', 'FINALIZADO_30_DIAS', 'DESACTIVADO', 'RENOVADO'
      enrolled_at timestamptz DEFAULT now(),
      ended_at timestamptz,
      progress integer DEFAULT 0,
      notes text,
      created_at timestamptz DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_participant_history_course 
      ON public.course_participant_history(course_id, created_at DESC);
  `);

  // 2. Políticas RLS
  await client.query(`
    ALTER TABLE public.course_participant_history ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Lectura publica de historial" ON public.course_participant_history;
    CREATE POLICY "Lectura publica de historial"
      ON public.course_participant_history
      FOR SELECT
      TO authenticated, anon
      USING (true);

    DROP POLICY IF EXISTS "Escritura de historial" ON public.course_participant_history;
    CREATE POLICY "Escritura de historial"
      ON public.course_participant_history
      FOR ALL
      TO authenticated, anon
      USING (true)
      WITH CHECK (true);
  `);

  // 3. Procedimiento para consultar postulantes que SOLICITARON específicamente el curso CCTV
  await client.query(`
    CREATE OR REPLACE FUNCTION public.get_cctv_applicants(p_course_id uuid DEFAULT NULL)
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_course_id uuid := p_course_id;
      v_result json;
    BEGIN
      -- Si no se pasa UUID, obtener el del curso CCTV
      IF v_course_id IS NULL THEN
        SELECT id INTO v_course_id FROM public.courses WHERE titulo ILIKE '%cctv%alarmas%' LIMIT 1;
      END IF;

      SELECT json_agg(row_to_json(t)) INTO v_result
      FROM (
        -- A. Solicitudes desde escuela_seguridad
        SELECT DISTINCT ON (COALESCE(es.user_id, u.id, es.rut::uuid))
          COALESCE(es.user_id, u.id) as user_id,
          es.nombre,
          es.rut,
          es.email,
          es.telefono,
          es.curso_id,
          es.curso_nombre,
          COALESCE(es.estado_matricula, 'POSTULANTE') as estado_postulacion,
          COALESCE(es.estado_pago, 'PENDIENTE') as estado_pago,
          es.created_at as fecha_solicitud,
          'escuela_seguridad' as origen
        FROM public.escuela_seguridad es
        LEFT JOIN public.users u ON u.rut = es.rut OR u.email = es.email
        WHERE es.curso_id IN ('seg-09', 'cctv-online', 'CCTV-ALARM-09')
           OR es.curso_nombre ILIKE '%cctv%'
           OR es.curso_nombre ILIKE '%televigilancia%'

        UNION

        -- B. Solicitudes desde enrollments en el curso CCTV
        SELECT DISTINCT ON (e.user_id)
          e.user_id,
          u.nombre,
          u.rut,
          u.email,
          u.telefono,
          'seg-09' as curso_id,
          c.titulo as curso_nombre,
          COALESCE(e.estado, 'POSTULANTE') as estado_postulacion,
          'CONFIRMADO' as estado_pago,
          e.created_at as fecha_solicitud,
          'enrollment' as origen
        FROM public.enrollments e
        JOIN public.users u ON u.id = e.user_id
        JOIN public.courses c ON c.id = e.course_id
        WHERE c.titulo ILIKE '%cctv%' OR c.id = v_course_id

        ORDER BY fecha_solicitud DESC
      ) t;

      RETURN COALESCE(v_result, '[]'::json);
    END;
    $$;
  `);

  // 4. Procedimiento para incorporar a un postulante aceptado (1 a la vez) y registrar en historial
  await client.query(`
    CREATE OR REPLACE FUNCTION public.incorporate_cctv_student(
      p_user_id uuid,
      p_course_id uuid DEFAULT NULL
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_course_id uuid := p_course_id;
      v_course_title text;
      v_user_name text;
      v_user_rut text;
      v_user_email text;
      v_prev_student record;
      v_new_act_id uuid;
      v_now timestamptz := now();
      v_expires timestamptz := now() + interval '30 days';
    BEGIN
      -- Resolver curso CCTV
      IF v_course_id IS NULL THEN
        SELECT id, titulo INTO v_course_id, v_course_title 
        FROM public.courses 
        WHERE titulo ILIKE '%cctv%alarmas%' LIMIT 1;
      ELSE
        SELECT titulo INTO v_course_title FROM public.courses WHERE id = v_course_id;
      END IF;

      -- Obtener datos del alumno
      SELECT nombre, rut, email INTO v_user_name, v_user_rut, v_user_email
      FROM public.users
      WHERE id = p_user_id;

      IF v_user_name IS NULL THEN
        -- Intentar obtener de escuela_seguridad si user_id no está sincronizado
        SELECT nombre, rut, email INTO v_user_name, v_user_rut, v_user_email
        FROM public.escuela_seguridad
        WHERE user_id = p_user_id OR rut = p_user_id::text;

        IF v_user_name IS NULL THEN
          RAISE EXCEPTION 'Usuario no encontrado para incorporar al curso.';
        END IF;
      END IF;

      -- 1. Si había un alumno previamente activo, registrar su término en el historial
      SELECT * INTO v_prev_student
      FROM public.cctv_special_activations
      WHERE course_id = v_course_id AND is_active = true
      LIMIT 1;

      IF v_prev_student.id IS NOT NULL THEN
        -- Desactivar el anterior
        UPDATE public.cctv_special_activations
        SET is_active = false
        WHERE id = v_prev_student.id;

        -- Registrar en historial de auditoría
        INSERT INTO public.course_participant_history (
          course_id,
          course_title,
          user_id,
          user_name,
          user_rut,
          user_email,
          action,
          enrolled_at,
          ended_at,
          progress,
          notes
        ) VALUES (
          v_course_id,
          v_course_title,
          v_prev_student.user_id,
          v_prev_student.student_name,
          v_prev_student.student_rut,
          v_prev_student.student_email,
          'REEMPLAZADO',
          v_prev_student.activated_at,
          v_now,
          v_prev_student.progress,
          'Reemplazado por nuevo alumno incorporado: ' || v_user_name
        );
      END IF;

      -- 2. Crear la nueva activación exclusiva por 30 días
      INSERT INTO public.cctv_special_activations (
        course_id,
        course_title,
        user_id,
        student_name,
        student_rut,
        student_email,
        activated_at,
        expires_at,
        is_active,
        progress,
        completed_docs
      ) VALUES (
        v_course_id,
        v_course_title,
        p_user_id,
        v_user_name,
        v_user_rut,
        v_user_email,
        v_now,
        v_expires,
        true,
        0,
        '{}'
      )
      RETURNING id INTO v_new_act_id;

      -- 3. Registrar la INCORPORACIÓN en el historial de participantes
      INSERT INTO public.course_participant_history (
        course_id,
        course_title,
        user_id,
        user_name,
        user_rut,
        user_email,
        action,
        enrolled_at,
        ended_at,
        progress,
        notes
      ) VALUES (
        v_course_id,
        v_course_title,
        p_user_id,
        v_user_name,
        v_user_rut,
        v_user_email,
        'INCORPORADO',
        v_now,
        v_expires,
        0,
        'Incorporación individual oficial con plazo límite de 30 días.'
      );

      -- 4. Actualizar o insertar enrollment activo
      INSERT INTO public.enrollments (user_id, course_id, estado, progreso, abono_inicial, documentos_validados)
      VALUES (p_user_id, v_course_id, 'ACTIVO', 0, 150000, true)
      ON CONFLICT (user_id, course_id) 
      DO UPDATE SET estado = 'ACTIVO', progreso = 0;

      RETURN json_build_object(
        'success', true,
        'activation_id', v_new_act_id,
        'user_id', p_user_id,
        'student_name', v_user_name,
        'student_rut', v_user_rut,
        'days_remaining', 30,
        'expires_at', v_expires,
        'message', 'Alumno ' || v_user_name || ' incorporado exitosamente al curso CCTV por 30 días.'
      );
    END;
    $$;
  `);

  // 5. Procedimiento para consultar el historial de participantes del curso
  await client.query(`
    CREATE OR REPLACE FUNCTION public.get_course_participant_history(p_course_id uuid DEFAULT NULL)
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_course_id uuid := p_course_id;
      v_res json;
    BEGIN
      IF v_course_id IS NULL THEN
        SELECT id INTO v_course_id FROM public.courses WHERE titulo ILIKE '%cctv%alarmas%' LIMIT 1;
      END IF;

      SELECT json_agg(row_to_json(h)) INTO v_res
      FROM (
        SELECT 
          id,
          user_id,
          user_name,
          user_rut,
          user_email,
          action,
          enrolled_at,
          ended_at,
          progress,
          notes,
          created_at
        FROM public.course_participant_history
        WHERE course_id = v_course_id OR v_course_id IS NULL
        ORDER BY created_at DESC
        LIMIT 50
      ) h;

      RETURN COALESCE(v_res, '[]'::json);
    END;
    $$;
  `);

  console.log('✅ Sistema de incorporación dinámica y registro histórico desplegado con éxito.');
  await client.end();
}

deploy().catch(err => {
  console.error(err);
  process.exit(1);
});
