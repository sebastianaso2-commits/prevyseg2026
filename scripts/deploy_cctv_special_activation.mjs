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
  console.log('Deploying CCTV special activation table and stored procedures...');

  // 1. Crear tabla cctv_special_activations
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.cctv_special_activations (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      course_id uuid REFERENCES public.courses(id) ON DELETE CASCADE,
      course_title text NOT NULL,
      user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
      student_name text NOT NULL,
      student_rut text NOT NULL,
      student_email text,
      activated_at timestamp with time zone DEFAULT now(),
      expires_at timestamp with time zone DEFAULT (now() + interval '30 days'),
      is_active boolean DEFAULT true,
      progress integer DEFAULT 0,
      completed_docs text[] DEFAULT '{}',
      created_at timestamp with time zone DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_cctv_activations_user_course 
      ON public.cctv_special_activations(user_id, course_id, is_active);
  `);

  // 2. RLS en cctv_special_activations
  await client.query(`
    ALTER TABLE public.cctv_special_activations ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Lectura de activaciones cctv" ON public.cctv_special_activations;
    CREATE POLICY "Lectura de activaciones cctv"
      ON public.cctv_special_activations
      FOR SELECT
      TO authenticated, anon
      USING (true);

    DROP POLICY IF EXISTS "Staff administra activaciones cctv" ON public.cctv_special_activations;
    CREATE POLICY "Staff administra activaciones cctv"
      ON public.cctv_special_activations
      FOR ALL
      TO authenticated, anon
      USING (true)
      WITH CHECK (true);
  `);

  // 3. Stored Procedure: activate_cctv_student
  await client.query(`
    CREATE OR REPLACE FUNCTION public.activate_cctv_student(
      p_course_id uuid,
      p_user_id uuid
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_user_name text;
      v_user_rut text;
      v_user_email text;
      v_course_title text;
      v_new_id uuid;
      v_activated_at timestamptz := now();
      v_expires_at timestamptz := now() + interval '30 days';
    BEGIN
      -- Obtener datos del alumno
      SELECT nombre, rut, email INTO v_user_name, v_user_rut, v_user_email
      FROM public.users
      WHERE id = p_user_id;

      IF v_user_name IS NULL THEN
        RAISE EXCEPTION 'Usuario no encontrado en public.users con ID %', p_user_id;
      END IF;

      -- Obtener título del curso
      SELECT titulo INTO v_course_title
      FROM public.courses
      WHERE id = p_course_id;

      IF v_course_title IS NULL THEN
        -- Si no se encuentra por UUID directo, buscar el curso CCTV por defecto
        SELECT id, titulo INTO p_course_id, v_course_title
        FROM public.courses
        WHERE titulo ILIKE '%cctv%alarmas%' OR codigo_sence = 'CCTV-ALARM-09'
        LIMIT 1;
      END IF;

      -- Desactivar cualquier activación previa para garantizar que SOLO 1 persona esté activa a la vez
      UPDATE public.cctv_special_activations
      SET is_active = false
      WHERE course_id = p_course_id;

      -- Crear la nueva activación activa por 30 días
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
        p_course_id,
        v_course_title,
        p_user_id,
        v_user_name,
        v_user_rut,
        v_user_email,
        v_activated_at,
        v_expires_at,
        true,
        0,
        '{}'
      )
      RETURNING id INTO v_new_id;

      -- Asegurar matrícula en la tabla enrollments para el estudiante
      IF EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = p_user_id AND course_id = p_course_id) THEN
        UPDATE public.enrollments
        SET estado = 'ACTIVO',
            progreso = 0
        WHERE user_id = p_user_id AND course_id = p_course_id;
      ELSE
        INSERT INTO public.enrollments (
          user_id,
          course_id,
          estado,
          progreso,
          abono_inicial,
          documentos_validados
        ) VALUES (
          p_user_id,
          p_course_id,
          'ACTIVO',
          0,
          150000,
          true
        );
      END IF;

      RETURN json_build_object(
        'success', true,
        'activation_id', v_new_id,
        'user_id', p_user_id,
        'student_name', v_user_name,
        'student_rut', v_user_rut,
        'course_id', p_course_id,
        'course_title', v_course_title,
        'activated_at', v_activated_at,
        'expires_at', v_expires_at,
        'days_remaining', 30,
        'message', 'Habilitación individual de 30 días activada exitosamente para ' || v_user_name
      );
    END;
    $$;
  `);

  // 4. Stored Procedure: deactivate_cctv_student
  await client.query(`
    CREATE OR REPLACE FUNCTION public.deactivate_cctv_student(
      p_activation_id uuid
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_user_id uuid;
      v_course_id uuid;
      v_name text;
    BEGIN
      SELECT user_id, course_id, student_name INTO v_user_id, v_course_id, v_name
      FROM public.cctv_special_activations
      WHERE id = p_activation_id;

      IF v_name IS NULL THEN
        RAISE EXCEPTION 'Activación no encontrada con ID %', p_activation_id;
      END IF;

      UPDATE public.cctv_special_activations
      SET is_active = false
      WHERE id = p_activation_id;

      -- Opcional: pausar enrollment
      UPDATE public.enrollments
      SET estado = 'INACTIVO'
      WHERE user_id = v_user_id AND course_id = v_course_id;

      RETURN json_build_object(
        'success', true,
        'activation_id', p_activation_id,
        'student_name', v_name,
        'message', 'Habilitación de CCTV desactivada para ' || v_name
      );
    END;
    $$;
  `);

  // 5. Stored Procedure: get_cctv_active_status
  await client.query(`
    CREATE OR REPLACE FUNCTION public.get_cctv_active_status(p_course_id uuid)
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_act record;
      v_days_rem int;
      v_hours_rem int;
      v_is_expired boolean;
    BEGIN
      SELECT * INTO v_act
      FROM public.cctv_special_activations
      WHERE (course_id = p_course_id OR p_course_id IS NULL)
        AND is_active = true
      ORDER BY activated_at DESC
      LIMIT 1;

      IF v_act.id IS NULL THEN
        RETURN json_build_object(
          'has_active', false,
          'message', 'No hay ningún alumno habilitado actualmente en este curso CCTV.'
        );
      END IF;

      -- Calcular días restantes
      v_is_expired := now() > v_act.expires_at;
      IF v_is_expired THEN
        -- Auto desactivar si expiró
        UPDATE public.cctv_special_activations
        SET is_active = false
        WHERE id = v_act.id;

        RETURN json_build_object(
          'has_active', false,
          'is_expired', true,
          'last_student_name', v_act.student_name,
          'message', 'El periodo de 30 días de ' || v_act.student_name || ' ha finalizado.'
        );
      END IF;

      v_days_rem := EXTRACT(DAY FROM (v_act.expires_at - now()))::int;
      v_hours_rem := EXTRACT(HOUR FROM (v_act.expires_at - now()))::int;

      RETURN json_build_object(
        'has_active', true,
        'activation_id', v_act.id,
        'user_id', v_act.user_id,
        'student_name', v_act.student_name,
        'student_rut', v_act.student_rut,
        'student_email', v_act.student_email,
        'course_id', v_act.course_id,
        'course_title', v_act.course_title,
        'activated_at', v_act.activated_at,
        'expires_at', v_act.expires_at,
        'days_remaining', GREATEST(v_days_rem, 0),
        'hours_remaining', GREATEST(v_hours_rem, 0),
        'progress', v_act.progress,
        'completed_docs', v_act.completed_docs,
        'is_expired', false
      );
    END;
    $$;
  `);

  console.log('✅ Tablas y Stored Procedures para CCTV Special Activations desplegados exitosamente.');
  await client.end();
}

deploy().catch(err => {
  console.error('Error al desplegar:', err);
  process.exit(1);
});
