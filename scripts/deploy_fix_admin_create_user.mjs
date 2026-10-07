import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function deployFix() {
  console.log('Connecting to PostgreSQL database...');
  await client.connect();

  try {
    // 1. Fix all existing auth.users with NULL token columns
    console.log('1. Fixing existing NULL tokens in auth.users...');
    const fixRes = await client.query(`
      UPDATE auth.users
      SET 
        confirmation_token = COALESCE(confirmation_token, ''),
        recovery_token = COALESCE(recovery_token, ''),
        email_change_token_new = COALESCE(email_change_token_new, ''),
        email_change = COALESCE(email_change, ''),
        reauthentication_token = COALESCE(reauthentication_token, ''),
        email_change_token_current = COALESCE(email_change_token_current, ''),
        phone_change = COALESCE(phone_change, ''),
        phone_change_token = COALESCE(phone_change_token, ''),
        is_super_admin = COALESCE(is_super_admin, false)
      WHERE confirmation_token IS NULL 
         OR recovery_token IS NULL 
         OR email_change_token_new IS NULL 
         OR email_change IS NULL;
    `);
    console.log(`✅ Fixed ${fixRes.rowCount} users in auth.users.`);

    // 2. Deploy robust admin_create_user procedure
    console.log('2. Deploying robust admin_create_user procedure...');
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
        v_target_role text;
        v_result json;
      BEGIN
        -- 1. Normalizar RUT
        v_clean_rut := lower(regexp_replace(p_rut, '[^a-zA-Z0-9]', '', 'g'));
        v_auth_email := v_clean_rut || '@prevyseg.cl';

        IF length(v_clean_rut) < 6 THEN
          RAISE EXCEPTION 'El RUT ingresado no es válido.';
        END IF;

        -- 2. Normalizar Rol
        v_target_role := upper(trim(COALESCE(p_rol, 'STUDENT')));
        IF v_target_role IN ('DOCENTE', 'PROFESOR') THEN
          v_target_role := 'TEACHER';
        ELSIF v_target_role IN ('EMPLEADOR', 'EMPLOYER') THEN
          v_target_role := 'EMPRESA';
        ELSIF v_target_role NOT IN ('ADMIN', 'TEACHER', 'EMPRESA', 'STUDENT') THEN
          v_target_role := 'STUDENT';
        END IF;

        -- 3. Validar o asignar contraseña por defecto
        IF p_password IS NOT NULL AND length(trim(p_password)) >= 4 THEN
          v_pass := trim(p_password);
        ELSE
          v_pass := v_clean_rut; -- Por defecto el RUT limpio
        END IF;

        v_encrypted_password := extensions.crypt(v_pass, extensions.gen_salt('bf', 10));

        -- 4. Comprobar si existe en public.users
        SELECT id INTO v_existing_id
        FROM public.users
        WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut OR rut = trim(p_rut)
        LIMIT 1;

        -- Si no existe en public.users, comprobar si existe en auth.users
        IF v_existing_id IS NULL THEN
          SELECT id INTO v_existing_id
          FROM auth.users
          WHERE email = v_auth_email
          LIMIT 1;
        END IF;

        IF v_existing_id IS NOT NULL THEN
          v_user_id := v_existing_id;
          
          UPDATE auth.users
          SET encrypted_password = v_encrypted_password,
              raw_user_meta_data = jsonb_build_object(
                'rut', trim(p_rut),
                'nombre', trim(p_nombre),
                'rol', v_target_role,
                'telefono', trim(p_telefono)
              ),
              confirmation_token = COALESCE(confirmation_token, ''),
              recovery_token = COALESCE(recovery_token, ''),
              email_change_token_new = COALESCE(email_change_token_new, ''),
              email_change = COALESCE(email_change, ''),
              reauthentication_token = COALESCE(reauthentication_token, ''),
              email_change_token_current = COALESCE(email_change_token_current, ''),
              phone_change = COALESCE(phone_change, ''),
              phone_change_token = COALESCE(phone_change_token, ''),
              is_super_admin = COALESCE(is_super_admin, false),
              updated_at = now()
          WHERE id = v_user_id;
        ELSE
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
            '00000000-0000-0000-0000-000000000000',
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
            '{"provider": "email", "providers": ["email"]}'::jsonb,
            jsonb_build_object(
              'rut', trim(p_rut),
              'nombre', trim(p_nombre),
              'rol', v_target_role,
              'telefono', trim(p_telefono)
            ),
            false,
            now(),
            now()
          );
        END IF;

        -- 5. Insertar o actualizar en auth.identities
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

        -- 6. Insertar o actualizar en public.users
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
          v_target_role,
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
          encrypted_password = EXCLUDED.encrypted_password;

        -- 7. Si se especificó curso (usualmente para rol STUDENT), crear matrícula
        IF p_course_id IS NOT NULL THEN
          INSERT INTO public.enrollments (
            user_id,
            course_id,
            estado,
            progreso,
            documentos_validados,
            created_at
          ) VALUES (
            v_user_id,
            p_course_id,
            'ACTIVO',
            0,
            true,
            now()
          )
          ON CONFLICT (user_id, course_id) DO NOTHING;
        END IF;

        v_result := json_build_object(
          'id', v_user_id,
          'rut', trim(p_rut),
          'email', v_auth_email,
          'nombre', trim(p_nombre),
          'rol', v_target_role
        );

        RETURN v_result;
      END;
      $$;
    `);

    await client.query(`
      GRANT EXECUTE ON FUNCTION public.admin_create_user(text, text, text, text, text, text, uuid) TO anon, authenticated, service_role;
    `);
    console.log('✅ Procedure admin_create_user updated with full token initialization.');

    // 3. Update request_cctv_approval procedure as well
    console.log('3. Updating request_cctv_approval to ensure empty token fields...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.request_cctv_approval(
        p_rut text,
        p_nombre text,
        p_email text,
        p_telefono text,
        p_notas text DEFAULT NULL,
        p_user_id uuid DEFAULT NULL
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

        IF v_user_id IS NULL AND p_rut IS NOT NULL THEN
          SELECT id INTO v_user_id 
          FROM public.users 
          WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut 
             OR rut = trim(p_rut) 
          LIMIT 1;
        END IF;

        IF v_user_id IS NULL THEN
          SELECT id INTO v_user_id
          FROM auth.users
          WHERE email = v_auth_email
          LIMIT 1;
        END IF;

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
            '00000000-0000-0000-0000-000000000000',
            'authenticated',
            'authenticated',
            v_auth_email,
            extensions.crypt(v_clean_rut, extensions.gen_salt('bf', 10)),
            v_now,
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
              'telefono', trim(p_telefono)
            ),
            false,
            v_now,
            v_now
          );
        END IF;

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
    console.log('✅ Procedure request_cctv_approval updated.');

    console.log('🎉 ALL DATABASE PROCEDURES SUCCESSFULLY UPDATED AND FIXED!');
  } catch (err) {
    console.error('❌ Error during deployment:', err);
  } finally {
    await client.end();
  }
}

deployFix();
