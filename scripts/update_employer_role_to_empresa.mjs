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
    console.log('Connected to PostgreSQL database...');

    // 1. Drop existing users_rol_check constraint
    console.log('1. Dropping old users_rol_check constraint...');
    await client.query(`ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_rol_check;`);

    // 2. Re-create constraint allowing 'EMPRESA', 'EMPLEADOR', 'EMPLOYER'
    console.log('2. Adding updated users_rol_check constraint with EMPRESA...');
    await client.query(`
      ALTER TABLE public.users 
      ADD CONSTRAINT users_rol_check 
      CHECK (((rol)::text = ANY ((ARRAY[
        'ADMIN'::character varying, 
        'TEACHER'::character varying, 
        'DOCENTE'::character varying, 
        'STUDENT'::character varying,
        'EMPRESA'::character varying,
        'EMPLEADOR'::character varying,
        'EMPLOYER'::character varying
      ])::text[])));
    `);

    // 3. Update employer user in public.users to 'EMPRESA'
    console.log('3. Updating public.users to rol = EMPRESA for employer...');
    const res = await client.query(`
      UPDATE public.users 
      SET rol = 'EMPRESA' 
      WHERE rut LIKE '%76.543%' OR email LIKE '%76543210%' OR email LIKE '%minerialogistica%' OR nombre LIKE '%Minería%'
      RETURNING id, rut, nombre, email, rol;
    `);
    console.log('Updated public.users rows:', res.rows);

    // 4. Update auth.users user_metadata to role 'EMPRESA'
    console.log('4. Updating auth.users metadata to rol = EMPRESA...');
    const authRes = await client.query(`
      UPDATE auth.users 
      SET raw_user_meta_data = jsonb_set(
        COALESCE(raw_user_meta_data, '{}'::jsonb), 
        '{rol}', 
        '"EMPRESA"'
      )
      WHERE email LIKE '%76543210%' OR email LIKE '%minerialogistica%' OR id IN (
        SELECT id FROM public.users WHERE rol = 'EMPRESA'
      )
      RETURNING id, email, raw_user_meta_data;
    `);
    console.log('Updated auth.users rows:', authRes.rows);

    // 5. Update admin_create_user function to allow 'EMPRESA' if it has role checks
    console.log('5. Ensuring admin_create_user supports EMPRESA...');
    await client.query(`
      CREATE OR REPLACE FUNCTION public.admin_create_user(
        p_rut character varying,
        p_nombre character varying,
        p_email character varying,
        p_rol character varying,
        p_telefono character varying,
        p_password text,
        p_course_id uuid DEFAULT NULL::uuid
      )
      RETURNS uuid
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path TO 'public', 'auth', 'extensions'
      AS $function$
      DECLARE
        v_user_id uuid;
        v_encrypted_pw text;
        v_clean_rut varchar;
        v_role varchar;
      BEGIN
        v_clean_rut := regexp_replace(p_rut, '[^0-9kK]', '', 'g');
        v_role := upper(trim(p_rol));
        IF v_role NOT IN ('ADMIN', 'TEACHER', 'DOCENTE', 'STUDENT', 'EMPRESA', 'EMPLEADOR', 'EMPLOYER') THEN
          v_role := 'STUDENT';
        END IF;

        v_encrypted_pw := extensions.crypt(p_password, extensions.gen_salt('bf', 10));

        SELECT id INTO v_user_id FROM public.users WHERE rut = p_rut OR email = p_email LIMIT 1;

        IF v_user_id IS NOT NULL THEN
          UPDATE public.users
          SET nombre = p_nombre,
              email = p_email,
              rol = v_role,
              telefono = p_telefono,
              encrypted_password = v_encrypted_pw
          WHERE id = v_user_id;

          UPDATE auth.users
          SET encrypted_password = v_encrypted_pw,
              raw_user_meta_data = jsonb_build_object(
                'nombre', p_nombre,
                'rut', p_rut,
                'rol', v_role,
                'telefono', p_telefono
              ),
              updated_at = now()
          WHERE id = v_user_id;
        ELSE
          v_user_id := extensions.gen_random_uuid();

          INSERT INTO auth.users (
            instance_id, id, aud, role, email, encrypted_password,
            email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
            created_at, updated_at
          ) VALUES (
            '00000000-0000-0000-0000-000000000000',
            v_user_id,
            'authenticated',
            'authenticated',
            p_email,
            v_encrypted_pw,
            now(),
            '{"provider":"email","providers":["email"]}'::jsonb,
            jsonb_build_object(
              'nombre', p_nombre,
              'rut', p_rut,
              'rol', v_role,
              'telefono', p_telefono
            ),
            now(),
            now()
          );

          INSERT INTO public.users (
            id, rut, nombre, email, rol, telefono, encrypted_password, created_at
          ) VALUES (
            v_user_id, p_rut, p_nombre, p_email, v_role, p_telefono, v_encrypted_pw, now()
          );
        END IF;

        IF p_course_id IS NOT NULL THEN
          INSERT INTO public.enrollments (user_id, course_id, estado, progreso, created_at)
          VALUES (v_user_id, p_course_id, 'activo', 0, now())
          ON CONFLICT DO NOTHING;
        END IF;

        RETURN v_user_id;
      END;
      $function$;
    `);
    console.log('✅ admin_create_user updated to support EMPRESA role.');

    console.log('🎉 All updates completed successfully!');
  } catch (err) {
    console.error('❌ Error executing database update:', err);
  } finally {
    await client.end();
  }
}

run();
