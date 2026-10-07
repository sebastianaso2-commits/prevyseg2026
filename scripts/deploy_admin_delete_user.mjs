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
  console.log('Connected to PostgreSQL to deploy admin_delete_user and improve admin_create_user...');

  // 1. Desplegar admin_delete_user con SECURITY DEFINER
  await client.query(`
    CREATE OR REPLACE FUNCTION public.admin_delete_user(p_user_id uuid)
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_name text;
      v_rut text;
    BEGIN
      SELECT nombre, rut INTO v_name, v_rut FROM public.users WHERE id = p_user_id;

      IF v_name IS NULL THEN
        SELECT raw_user_meta_data->>'nombre', raw_user_meta_data->>'rut'
        INTO v_name, v_rut
        FROM auth.users WHERE id = p_user_id;
      END IF;

      -- Eliminar en cascada
      DELETE FROM public.enrollments WHERE user_id = p_user_id;
      DELETE FROM public.certificates WHERE user_id = p_user_id;
      DELETE FROM public.escuela_seguridad WHERE user_id = p_user_id;
      DELETE FROM public.escuela_oficio WHERE user_id = p_user_id;
      DELETE FROM public.users WHERE id = p_user_id;
      DELETE FROM auth.identities WHERE user_id = p_user_id;
      DELETE FROM auth.sessions WHERE user_id = p_user_id;
      DELETE FROM auth.users WHERE id = p_user_id;

      RETURN json_build_object(
        'success', true,
        'deleted_id', p_user_id,
        'nombre', COALESCE(v_name, 'Usuario'),
        'rut', COALESCE(v_rut, ''),
        'message', 'Usuario eliminado exitosamente de la base de datos'
      );
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.admin_delete_user(uuid) TO anon, authenticated, service_role;
  `);
  console.log('✅ Stored Procedure admin_delete_user successfully deployed.');

  // 2. Mejorar admin_create_user para que soporte dinámicamente cualquier rol y maneje cursos opcionales
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

      -- 4. Comprobar existencia previa en public.users
      SELECT id INTO v_existing_id
      FROM public.users
      WHERE lower(regexp_replace(rut, '[^a-zA-Z0-9]', '', 'g')) = v_clean_rut OR rut = trim(p_rut)
      LIMIT 1;

      IF v_existing_id IS NOT NULL THEN
        RAISE EXCEPTION 'El RUT % ya se encuentra registrado en la base de datos.', p_rut;
      END IF;

      -- Comprobar si existe en auth.users
      SELECT id INTO v_existing_id
      FROM auth.users
      WHERE email = v_auth_email
      LIMIT 1;

      IF v_existing_id IS NOT NULL THEN
        v_user_id := v_existing_id;
        v_encrypted_password := extensions.crypt(v_pass, extensions.gen_salt('bf', 10));
        
        UPDATE auth.users
        SET encrypted_password = v_encrypted_password,
            raw_user_meta_data = jsonb_build_object(
              'rut', trim(p_rut),
              'nombre', trim(p_nombre),
              'rol', v_target_role,
              'telefono', trim(p_telefono)
            ),
            updated_at = now()
        WHERE id = v_user_id;
      ELSE
        v_user_id := gen_random_uuid();
        v_encrypted_password := extensions.crypt(v_pass, extensions.gen_salt('bf', 10));

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
          '{"provider": "email", "providers": ["email"]}'::jsonb,
          jsonb_build_object(
            'rut', trim(p_rut),
            'nombre', trim(p_nombre),
            'rol', v_target_role,
            'telefono', trim(p_telefono)
          ),
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

      -- 6. Insertar en public.users
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

    GRANT EXECUTE ON FUNCTION public.admin_create_user(text, text, text, text, text, text, uuid) TO anon, authenticated, service_role;
  `);
  console.log('✅ Stored Procedure admin_create_user successfully updated with robust role support.');

  await client.end();
}

deploy().catch(err => {
  console.error('Error during deployment:', err);
  process.exit(1);
});
