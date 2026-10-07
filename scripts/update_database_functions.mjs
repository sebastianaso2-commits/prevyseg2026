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
    console.log('Connected to Supabase PostgreSQL database.');

    // 1. Actualizar register_new_student para insertar en escuela_seguridad o escuela_oficio
    console.log('Updating register_new_student procedure...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.register_new_student(
        p_rut text,
        p_password text,
        p_nombre text,
        p_email text DEFAULT ''::text,
        p_telefono text DEFAULT ''::text,
        p_domicilio text DEFAULT 'Arica, Chile'::text,
        p_escuela text DEFAULT 'seguridad'::text
      )
      RETURNS json
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      DECLARE
        v_clean_rut text;
        v_auth_email text;
        v_user_id uuid;
        v_encrypted_password text;
        v_existing_id uuid;
        v_default_course_id uuid;
        v_pass text;
        v_result json;
        v_target_school text;
      BEGIN
        -- 1. Normalizar y validar RUT
        v_clean_rut := lower(regexp_replace(p_rut, '[^a-zA-Z0-9]', '', 'g'));
        v_auth_email := v_clean_rut || '@prevyseg.cl';

        IF length(v_clean_rut) < 6 THEN
          RAISE EXCEPTION 'El RUT ingresado no es válido. Debe contener al menos 6 caracteres.';
        END IF;

        -- 2. Validar contraseña
        v_pass := trim(p_password);
        IF v_pass IS NULL OR length(v_pass) < 4 THEN
          RAISE EXCEPTION 'Debes definir una contraseña de al menos 4 caracteres para tu cuenta.';
        END IF;

        -- 3. Comprobar si el RUT ya existe en auth.users o public.users
        SELECT id INTO v_existing_id
        FROM auth.users
        WHERE email = v_auth_email
        LIMIT 1;

        IF v_existing_id IS NOT NULL THEN
          RAISE EXCEPTION 'El RUT % ya se encuentra registrado en la plataforma. Por favor inicia sesión con tu contraseña.', p_rut;
        END IF;

        SELECT id INTO v_existing_id
        FROM public.users
        WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut OR rut = trim(p_rut)
        LIMIT 1;

        IF v_existing_id IS NOT NULL THEN
          RAISE EXCEPTION 'El RUT % ya se encuentra registrado en la base de datos. Por favor inicia sesión.', p_rut;
        END IF;

        -- 4. Generar UUID y encriptar contraseña con Blowfish Bcrypt
        v_user_id := gen_random_uuid();
        v_encrypted_password := extensions.crypt(v_pass, extensions.gen_salt('bf', 10));

        -- 5. Insertar en auth.users con contraseña encriptada
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
          json_build_object(
            'nombre', trim(p_nombre),
            'rut', trim(p_rut),
            'rol', 'STUDENT',
            'telefono', trim(p_telefono),
            'email_personal', trim(p_email),
            'domicilio', trim(p_domicilio),
            'escuela', trim(p_escuela)
          )::jsonb,
          NULL,
          now(),
          now()
        );

        -- 6. Insertar en auth.identities
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
          json_build_object(
            'sub', v_user_id::text,
            'email', v_auth_email,
            'email_verified', true
          )::jsonb,
          'email',
          v_user_id::text,
          now(),
          now(),
          now()
        );

        -- 7. Insertar en public.users con contraseña encriptada
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
          COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
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
          rol = EXCLUDED.rol,
          telefono = EXCLUDED.telefono,
          domicilio = EXCLUDED.domicilio,
          encrypted_password = EXCLUDED.encrypted_password;

        -- 8. Determinar escuela de destino y registrar en tabla correspondiente
        v_target_school := lower(trim(p_escuela));
        IF v_target_school = 'oficios' OR v_target_school = 'oficio' THEN
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
            'postulante-oficios',
            'Postulante Registrado - Escuela de Oficios',
            'Por Definir',
            'Por Definir',
            0,
            0,
            'REGISTRADO',
            'PENDIENTE_INSCRIPCION',
            now()
          )
          ON CONFLICT (user_id) DO UPDATE SET
            rut = EXCLUDED.rut,
            nombre = EXCLUDED.nombre,
            email = EXCLUDED.email,
            telefono = EXCLUDED.telefono;
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
            'postulante-seguridad',
            'Postulante Registrado - Escuela de Seguridad',
            'Por Definir',
            'Por Definir',
            0,
            0,
            'REGISTRADO',
            'PENDIENTE_INSCRIPCION',
            now()
          )
          ON CONFLICT (user_id) DO UPDATE SET
            rut = EXCLUDED.rut,
            nombre = EXCLUDED.nombre,
            email = EXCLUDED.email,
            telefono = EXCLUDED.telefono;
        END IF;

        -- 9. Asignar matrícula inicial en public.enrollments
        SELECT id INTO v_default_course_id
        FROM public.courses
        WHERE school = CASE WHEN v_target_school IN ('oficios', 'oficio') THEN 'oficios' ELSE 'seguridad' END
        ORDER BY created_at ASC
        LIMIT 1;

        IF v_default_course_id IS NOT NULL THEN
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
            v_default_course_id,
            'PENDIENTE',
            0,
            0,
            false,
            now()
          )
          ON CONFLICT DO NOTHING;
        END IF;

        -- 10. Retornar datos del estudiante registrado
        v_result := json_build_object(
          'id', v_user_id,
          'rut', trim(p_rut),
          'user', trim(p_rut),
          'nombre', trim(p_nombre),
          'email', COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
          'rol', 'STUDENT',
          'telefono', trim(p_telefono),
          'domicilio', trim(p_domicilio),
          'escuela', p_escuela,
          'cargo', 'Estudiante / Alumno Regular (' || p_escuela || ')'
        );

        RETURN v_result;
      END;
      $$;
    `);
    console.log('✓ Successfully updated register_new_student procedure.');

    // 2. Verificar que los 20 cursos estén intactos y con escuela correcta
    const resCourses = await client.query(`
      SELECT school, count(*) as count 
      FROM public.courses 
      GROUP BY school;
    `);
    console.log('Courses count in public.courses:', resCourses.rows);

  } catch (err) {
    console.error('Error in database update script:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
