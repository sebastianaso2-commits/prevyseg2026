import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL for deploying process_enrollment_registration...');

    // 1. Agregar restricción UNIQUE (user_id, course_id) en public.enrollments si no existe
    console.log('1. Ensuring UNIQUE (user_id, course_id) on enrollments...');
    await client.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM pg_constraint WHERE conname = 'enrollments_user_id_course_id_key'
        ) THEN
          ALTER TABLE public.enrollments ADD CONSTRAINT enrollments_user_id_course_id_key UNIQUE (user_id, course_id);
        END IF;
      END $$;
    `);

    // 2. Actualizar check_single_course_enrollment para que solo restrinja matrículas CONFIRMADAS
    console.log('2. Updating trigger function check_single_course_enrollment...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.check_single_course_enrollment()
      RETURNS trigger
      LANGUAGE plpgsql
      AS $$
      BEGIN
        IF TG_TABLE_NAME = 'escuela_seguridad' THEN
          IF EXISTS (
            SELECT 1 FROM public.escuela_oficio 
            WHERE user_id = NEW.user_id 
              AND estado_pago = 'ABONO_50_CONFIRMADO'
              AND curso_id NOT LIKE 'postulante-%'
          ) THEN
            RAISE EXCEPTION 'El estudiante ya cuenta con una matrícula activa en la Escuela de Oficios. Cada alumno solo puede pertenecer a un curso.';
          END IF;
        ELSIF TG_TABLE_NAME = 'escuela_oficio' THEN
          IF EXISTS (
            SELECT 1 FROM public.escuela_seguridad 
            WHERE user_id = NEW.user_id 
              AND estado_pago = 'ABONO_50_CONFIRMADO'
              AND curso_id NOT LIKE 'postulante-%'
          ) THEN
            RAISE EXCEPTION 'El estudiante ya cuenta con una matrícula activa en la Escuela de Seguridad. Cada alumno solo puede pertenecer a un curso.';
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$;
    `);

    // 2. Crear el procedimiento atómico process_enrollment_registration
    console.log('2. Creating procedure process_enrollment_registration...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.process_enrollment_registration(
        p_rut text,
        p_nombre text,
        p_email text,
        p_telefono text,
        p_domicilio text,
        p_password text,
        p_course_id text,
        p_course_name text,
        p_modalidad text,
        p_horas text,
        p_total_amount numeric,
        p_cuota50 numeric,
        p_school text
      )
      RETURNS json
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public, auth, extensions
      AS $$
      DECLARE
        v_clean_rut text;
        v_auth_email text;
        v_user_email text;
        v_user_id uuid;
        v_encrypted_password text;
        v_target_school text;
        v_matched_course_id uuid;
        v_result json;
      BEGIN
        -- 1. Normalizar RUT
        v_clean_rut := lower(regexp_replace(p_rut, '[^a-zA-Z0-9]', '', 'g'));
        v_auth_email := v_clean_rut || '@prevyseg.cl';
        v_target_school := CASE WHEN lower(trim(p_school)) IN ('oficios', 'oficio') THEN 'oficios' ELSE 'seguridad' END;

        IF length(v_clean_rut) < 6 THEN
          RAISE EXCEPTION 'El RUT ingresado no es válido.';
        END IF;

        -- 2. Verificar regla estricta: 1 estudiante = 1 solo curso activo
        IF v_target_school = 'oficios' THEN
          IF EXISTS (
            SELECT 1 FROM public.escuela_seguridad 
            WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut
              AND estado_pago = 'ABONO_50_CONFIRMADO'
              AND curso_id NOT LIKE 'postulante-%'
              AND curso_id != p_course_id
          ) THEN
            RAISE EXCEPTION 'El estudiante ya cuenta con una matrícula activa en la Escuela de Seguridad Privada. Cada alumno solo puede pertenecer a un curso a la vez.';
          END IF;
        ELSE
          IF EXISTS (
            SELECT 1 FROM public.escuela_oficio 
            WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut
              AND estado_pago = 'ABONO_50_CONFIRMADO'
              AND curso_id NOT LIKE 'postulante-%'
              AND curso_id != p_course_id
          ) THEN
            RAISE EXCEPTION 'El estudiante ya cuenta con una matrícula activa en la Escuela de Oficios. Cada alumno solo puede pertenecer a un curso a la vez.';
          END IF;
        END IF;

        -- 3. Buscar si el usuario ya existe en public.users o auth.users
        SELECT id INTO v_user_id
        FROM public.users
        WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut OR rut = trim(p_rut)
        LIMIT 1;

        IF v_user_id IS NULL THEN
          SELECT id INTO v_user_id
          FROM auth.users
          WHERE email = v_auth_email
          LIMIT 1;
        END IF;

      -- Preparar contraseña encriptada (bcrypt)
      IF p_password IS NOT NULL AND length(trim(p_password)) >= 4 THEN
        v_encrypted_password := extensions.crypt(trim(p_password), extensions.gen_salt('bf', 10));
      ELSE
        v_encrypted_password := extensions.crypt(v_clean_rut, extensions.gen_salt('bf', 10));
      END IF;

      -- 4. Garantizar usuario en auth.users
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
          confirmation_token,
          recovery_token,
          email_change_token_new,
          email_change,
          reauthentication_token,
          email_change_token_current,
          phone_change,
          phone_change_token,
          raw_app_meta_data,
          raw_user_meta_data,
          is_super_admin,
          created_at,
          updated_at
        ) VALUES (
          v_user_id,
          '00000000-0000-0000-0000-000000000000'::uuid,
          'authenticated',
          'authenticated',
          v_auth_email,
          v_encrypted_password,
          now(),
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          '{"provider":"email","providers":["email"]}'::jsonb,
          jsonb_build_object(
            'rut', trim(p_rut),
            'nombre', trim(p_nombre),
            'rol', 'STUDENT',
            'telefono', trim(p_telefono),
            'domicilio', trim(p_domicilio)
          ),
          false,
          now(),
          now()
        );
      ELSE
        UPDATE auth.users 
        SET encrypted_password = COALESCE(v_encrypted_password, encrypted_password),
            raw_user_meta_data = COALESCE(raw_user_meta_data, '{}'::jsonb) || jsonb_build_object(
              'rut', trim(p_rut),
              'nombre', trim(p_nombre),
              'telefono', trim(p_telefono),
              'domicilio', trim(p_domicilio)
            ),
            updated_at = now()
        WHERE id = v_user_id;
      END IF;

      -- 5. Garantizar auth.identities para autenticación GoTrue
      INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        provider_id,
        last_sign_in_at,
        created_at,
        updated_at
      ) VALUES (
        gen_random_uuid(),
        v_user_id,
        jsonb_build_object(
          'sub', v_user_id::text,
          'email', v_auth_email,
          'email_verified', true
        ),
        'email',
        v_user_id::text,
        now(),
        now(),
        now()
      )
      ON CONFLICT (provider, provider_id) DO UPDATE SET
        identity_data = EXCLUDED.identity_data,
        updated_at = now();

      -- 6. Determinar email único para public.users
      v_user_email := COALESCE(NULLIF(trim(p_email), ''), v_auth_email);
      IF EXISTS (SELECT 1 FROM public.users WHERE email = v_user_email AND id != v_user_id) THEN
        v_user_email := v_auth_email;
      END IF;

      -- 7. CRÍTICO: Garantizar que el usuario SIEMPRE exista en public.users antes de matricular
      INSERT INTO public.users (
        id,
        rut,
        nombre,
        email,
        rol,
        telefono,
        domicilio,
        encrypted_password,
        created_at
      ) VALUES (
        v_user_id,
        trim(p_rut),
        trim(p_nombre),
        v_user_email,
        'STUDENT',
        trim(p_telefono),
        COALESCE(NULLIF(trim(p_domicilio), ''), 'Arica, Chile'),
        v_encrypted_password,
        now()
      )
      ON CONFLICT (id) DO UPDATE SET
        rut = EXCLUDED.rut,
        nombre = EXCLUDED.nombre,
        email = EXCLUDED.email,
        telefono = EXCLUDED.telefono,
        domicilio = EXCLUDED.domicilio,
        encrypted_password = EXCLUDED.encrypted_password;

        -- 5. Limpiar registro pendiente de la escuela contraria para evitar conflicto de trigger
        IF v_target_school = 'oficios' THEN
          DELETE FROM public.escuela_seguridad 
          WHERE user_id = v_user_id AND estado_pago = 'PENDIENTE_INSCRIPCION';
        ELSE
          DELETE FROM public.escuela_oficio 
          WHERE user_id = v_user_id AND estado_pago = 'PENDIENTE_INSCRIPCION';
        END IF;

        -- 6. Insertar o actualizar registro de matrícula en la escuela seleccionada
        IF v_target_school = 'oficios' THEN
          INSERT INTO public.escuela_oficio (
            user_id,
            rut,
            nombre,
            email,
            telefono,
            curso_id,
            curso_nombre,
            modalidad,
            horas,
            monto_total,
            abono_50,
            estado_matricula,
            estado_pago,
            created_at
          ) VALUES (
            v_user_id,
            trim(p_rut),
            trim(p_nombre),
            COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
            trim(p_telefono),
            p_course_id,
            p_course_name,
            p_modalidad,
            p_horas,
            p_total_amount,
            p_cuota50,
            'MATRICULADO',
            'ABONO_50_CONFIRMADO',
            now()
          )
          ON CONFLICT (user_id) DO UPDATE SET
            rut = EXCLUDED.rut,
            nombre = EXCLUDED.nombre,
            email = EXCLUDED.email,
            telefono = EXCLUDED.telefono,
            curso_id = EXCLUDED.curso_id,
            curso_nombre = EXCLUDED.curso_nombre,
            modalidad = EXCLUDED.modalidad,
            horas = EXCLUDED.horas,
            monto_total = EXCLUDED.monto_total,
            abono_50 = EXCLUDED.abono_50,
            estado_matricula = 'MATRICULADO',
            estado_pago = 'ABONO_50_CONFIRMADO';
        ELSE
          INSERT INTO public.escuela_seguridad (
            user_id,
            rut,
            nombre,
            email,
            telefono,
            curso_id,
            curso_nombre,
            modalidad,
            horas,
            monto_total,
            abono_50,
            estado_matricula,
            estado_pago,
            created_at
          ) VALUES (
            v_user_id,
            trim(p_rut),
            trim(p_nombre),
            COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
            trim(p_telefono),
            p_course_id,
            p_course_name,
            p_modalidad,
            p_horas,
            p_total_amount,
            p_cuota50,
            'MATRICULADO',
            'ABONO_50_CONFIRMADO',
            now()
          )
          ON CONFLICT (user_id) DO UPDATE SET
            rut = EXCLUDED.rut,
            nombre = EXCLUDED.nombre,
            email = EXCLUDED.email,
            telefono = EXCLUDED.telefono,
            curso_id = EXCLUDED.curso_id,
            curso_nombre = EXCLUDED.curso_nombre,
            modalidad = EXCLUDED.modalidad,
            horas = EXCLUDED.horas,
            monto_total = EXCLUDED.monto_total,
            abono_50 = EXCLUDED.abono_50,
            estado_matricula = 'MATRICULADO',
            estado_pago = 'ABONO_50_CONFIRMADO';
        END IF;

        -- 7. Sincronizar en public.enrollments si coincide con curso de base de datos
        SELECT id INTO v_matched_course_id
        FROM public.courses
        WHERE titulo ILIKE '%' || substring(p_course_name from 1 for 20) || '%'
        LIMIT 1;

        IF v_matched_course_id IS NOT NULL THEN
          INSERT INTO public.enrollments (
            user_id,
            course_id,
            estado,
            progreso,
            abono_inicial,
            documentos_validados,
            created_at
          ) VALUES (
            v_user_id,
            v_matched_course_id,
            'PENDIENTE',
            0,
            p_cuota50,
            false,
            now()
          )
          ON CONFLICT (user_id, course_id) DO UPDATE SET
            abono_inicial = EXCLUDED.abono_inicial;
        END IF;

        -- 8. Retornar resultado estructurado
        v_result := json_build_object(
          'success', true,
          'user_id', v_user_id,
          'rut', trim(p_rut),
          'nombre', trim(p_nombre),
          'email', COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
          'school', v_target_school,
          'course_id', p_course_id,
          'course_name', p_course_name,
          'abono_50', p_cuota50,
          'estado_pago', 'ABONO_50_CONFIRMADO'
        );

        RETURN v_result;
      END;
      $$;

      GRANT EXECUTE ON FUNCTION public.process_enrollment_registration(
        text, text, text, text, text, text, text, text, text, text, numeric, numeric, text
      ) TO anon, authenticated, service_role;
    `);

    console.log('✅ Procedure process_enrollment_registration deployed and permissions granted!');

  } catch (err) {
    console.error('Error deploying procedure:', err);
  } finally {
    await client.end();
  }
}

run();
