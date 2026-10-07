import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function deploySecurityAndValidations() {
  await client.connect();
  console.log('🚀 Deploying security enhancements, pgcrypto encryption, and validation RPCs to PostgreSQL...');

  // 1. Ensure pgcrypto extension is installed
  await client.query(`CREATE EXTENSION IF NOT EXISTS pgcrypto;`);
  console.log('✅ Extension pgcrypto verified.');

  // 2. Ensure encrypted_password column exists on public.users
  await client.query(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'encrypted_password'
      ) THEN
        ALTER TABLE public.users ADD COLUMN encrypted_password text;
      END IF;
    END $$;
  `);
  console.log('✅ Column public.users.encrypted_password verified.');

  // 3. Deploy validate_chilean_rut function
  await client.query(`
    CREATE OR REPLACE FUNCTION public.validate_chilean_rut(p_rut text)
    RETURNS boolean
    LANGUAGE plpgsql
    IMMUTABLE
    AS $$
    DECLARE
      v_clean text;
      v_body text;
      v_dv char;
      v_sum int := 0;
      v_multiplier int := 2;
      v_i int;
      v_calc_dv char;
      v_remainder int;
    BEGIN
      IF p_rut IS NULL THEN
        RETURN false;
      END IF;
      v_clean := upper(regexp_replace(p_rut, '[^0-9kK]', '', 'g'));
      IF length(v_clean) < 7 OR length(v_clean) > 10 THEN
        RETURN false;
      END IF;

      v_body := substring(v_clean from 1 for length(v_clean) - 1);
      v_dv := substring(v_clean from length(v_clean) for 1);

      IF v_body !~ '^[0-9]+$' THEN
        RETURN false;
      END IF;

      FOR v_i IN REVERSE length(v_body)..1 LOOP
        v_sum := v_sum + (substring(v_body from v_i for 1)::int * v_multiplier);
        v_multiplier := v_multiplier + 1;
        IF v_multiplier > 7 THEN
          v_multiplier := 2;
        END IF;
      END LOOP;

      v_remainder := 11 - (v_sum % 11);
      IF v_remainder = 11 THEN
        v_calc_dv := '0';
      ELSIF v_remainder = 10 THEN
        v_calc_dv := 'K';
      ELSE
        v_calc_dv := v_remainder::text;
      END IF;

      RETURN v_dv = v_calc_dv;
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.validate_chilean_rut(text) TO anon, authenticated, service_role;
  `);
  console.log('✅ Function validate_chilean_rut deployed.');

  // 4. Deploy register_new_student procedure
  await client.query(`
    CREATE OR REPLACE FUNCTION public.register_new_student(
      p_rut text,
      p_password text,
      p_nombre text,
      p_email text,
      p_telefono text,
      p_domicilio text DEFAULT 'Arica, Chile',
      p_escuela text DEFAULT 'seguridad'
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
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

      -- 8. Asignar matrícula inicial en public.enrollments
      SELECT id INTO v_default_course_id
      FROM public.courses
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
          'ACTIVO',
          0,
          140000,
          false,
          now()
        )
        ON CONFLICT DO NOTHING;
      END IF;

      -- 9. Retornar datos del estudiante registrado
      v_result := json_build_object(
        'id', v_user_id,
        'rut', trim(p_rut),
        'user', trim(p_rut),
        'nombre', trim(p_nombre),
        'email', COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
        'rol', 'STUDENT',
        'telefono', trim(p_telefono),
        'domicilio', trim(p_domicilio),
        'cargo', 'Estudiante / Alumno Regular (' || p_escuela || ')'
      );

      RETURN v_result;
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.register_new_student(text, text, text, text, text, text, text) TO anon, authenticated, service_role;
  `);
  console.log('✅ Procedure register_new_student deployed.');

  // 5. Deploy admin_create_user procedure
  await client.query(`
    CREATE OR REPLACE FUNCTION public.admin_create_user(
      p_rut text,
      p_nombre text,
      p_email text,
      p_rol text,
      p_telefono text,
      p_password text DEFAULT NULL,
      p_course_id uuid DEFAULT NULL
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_clean_rut text;
      v_auth_email text;
      v_user_id uuid;
      v_encrypted_password text;
      v_existing_id uuid;
      v_pass text;
      v_result json;
    BEGIN
      -- 1. Normalizar RUT
      v_clean_rut := lower(regexp_replace(p_rut, '[^a-zA-Z0-9]', '', 'g'));
      v_auth_email := v_clean_rut || '@prevyseg.cl';

      IF length(v_clean_rut) < 6 THEN
        RAISE EXCEPTION 'El RUT ingresado no es válido.';
      END IF;

      -- 2. Validar o asignar contraseña por defecto
      IF p_password IS NOT NULL AND length(trim(p_password)) >= 4 THEN
        v_pass := trim(p_password);
      ELSE
        v_pass := v_clean_rut; -- Por defecto el RUT limpio
      END IF;

      -- 3. Comprobar existencia previa
      SELECT id INTO v_existing_id
      FROM public.users
      WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut OR rut = trim(p_rut)
      LIMIT 1;

      IF v_existing_id IS NOT NULL THEN
        RAISE EXCEPTION 'El RUT % ya se encuentra registrado en la base de datos.', p_rut;
      END IF;

      -- 4. Generar ID y encriptar contraseña con pgcrypto Bcrypt
      v_user_id := gen_random_uuid();
      v_encrypted_password := extensions.crypt(v_pass, extensions.gen_salt('bf', 10));

      -- 5. Insertar en auth.users
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
          'rol', COALESCE(p_rol, 'STUDENT'),
          'telefono', trim(p_telefono),
          'email_personal', trim(p_email)
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

      -- 7. Insertar en public.users
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
        COALESCE(p_rol, 'STUDENT'),
        trim(p_telefono),
        'Arica, Chile',
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

      -- 8. Si se especificó curso, crear matrícula
      IF p_course_id IS NOT NULL THEN
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
          p_course_id,
          'ACTIVO',
          0,
          150000,
          true,
          now()
        )
        ON CONFLICT DO NOTHING;
      END IF;

      -- 9. Retornar usuario creado
      v_result := json_build_object(
        'id', v_user_id,
        'rut', trim(p_rut),
        'nombre', trim(p_nombre),
        'email', COALESCE(NULLIF(trim(p_email), ''), v_auth_email),
        'rol', COALESCE(p_rol, 'STUDENT'),
        'telefono', trim(p_telefono)
      );

      RETURN v_result;
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.admin_create_user(text, text, text, text, text, text, uuid) TO anon, authenticated, service_role;
  `);
  console.log('✅ Procedure admin_create_user deployed.');

  // 6. Deploy change_user_password procedure (Bcrypt encryption)
  await client.query(`
    CREATE OR REPLACE FUNCTION public.change_user_password(
      p_user_id uuid,
      p_new_password text
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_pass text;
      v_encrypted_password text;
      v_user_exists boolean;
    BEGIN
      v_pass := trim(p_new_password);
      IF v_pass IS NULL OR length(v_pass) < 4 THEN
        RAISE EXCEPTION 'La nueva contraseña debe contener al menos 4 caracteres.';
      END IF;

      -- Verificar existencia del usuario
      SELECT EXISTS(SELECT 1 FROM public.users WHERE id = p_user_id) INTO v_user_exists;
      IF NOT v_user_exists THEN
        RAISE EXCEPTION 'Usuario no encontrado.';
      END IF;

      -- Generar hash Blowfish Bcrypt
      v_encrypted_password := extensions.crypt(v_pass, extensions.gen_salt('bf', 10));

      -- Actualizar auth.users
      UPDATE auth.users
      SET encrypted_password = v_encrypted_password,
          updated_at = now()
      WHERE id = p_user_id;

      -- Actualizar public.users
      UPDATE public.users
      SET encrypted_password = v_encrypted_password
      WHERE id = p_user_id;

      RETURN json_build_object(
        'success', true,
        'user_id', p_user_id,
        'message', 'Contraseña actualizada y encriptada exitosamente con Bcrypt'
      );
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.change_user_password(uuid, text) TO anon, authenticated, service_role;
  `);
  console.log('✅ Procedure change_user_password deployed.');

  // 7. Deploy check_rut_exists procedure
  await client.query(`
    CREATE OR REPLACE FUNCTION public.check_rut_exists(p_rut text)
    RETURNS boolean
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, extensions
    AS $$
    DECLARE
      v_clean_rut text;
      v_count int;
    BEGIN
      v_clean_rut := lower(regexp_replace(p_rut, '[^a-zA-Z0-9]', '', 'g'));
      SELECT count(*) INTO v_count
      FROM public.users
      WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut OR rut = trim(p_rut);

      RETURN v_count > 0;
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.check_rut_exists(text) TO anon, authenticated, service_role;
  `);
  console.log('✅ Function check_rut_exists deployed.');

  await client.end();
  console.log('🎉 All PostgreSQL functions, encryption procedures, and security checks deployed successfully!');
}

deploySecurityAndValidations().catch(console.error);
