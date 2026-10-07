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
  await client.connect();
  console.log('--- Migrando lógica CCTV a Modalidad Individual Multi-Alumno en Paralelo ---');

  // 1. Procedimiento activate_cctv_student:
  // Activa a un alumno para su periodo individual de 30 días SIN desactivar a otros alumnos
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
        SELECT nombre, rut, email INTO v_user_name, v_user_rut, v_user_email
        FROM public.escuela_seguridad
        WHERE user_id = p_user_id;
      END IF;

      IF v_user_name IS NULL THEN
        RAISE EXCEPTION 'Usuario no encontrado con ID %', p_user_id;
      END IF;

      -- Obtener título del curso
      SELECT titulo INTO v_course_title
      FROM public.courses
      WHERE id = p_course_id;

      IF v_course_title IS NULL THEN
        SELECT id, titulo INTO p_course_id, v_course_title
        FROM public.courses
        WHERE titulo ILIKE '%cctv%alarmas%' OR codigo_sence = 'CCTV-ALARM-09'
        LIMIT 1;
      END IF;

      -- Desactivar solo si ESTE MISMO usuario tenía una activación previa activa para este curso
      UPDATE public.cctv_special_activations
      SET is_active = false
      WHERE user_id = p_user_id AND (course_id = p_course_id OR p_course_id IS NULL);

      -- Crear la nueva activación individual por 30 días para este alumno
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
        COALESCE(v_course_title, 'Técnicas de operación CCTV y alarmas de seguridad privada'),
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
        progress,
        notes
      ) VALUES (
        p_course_id,
        COALESCE(v_course_title, 'Técnicas de operación CCTV y alarmas de seguridad privada'),
        p_user_id,
        v_user_name,
        v_user_rut,
        v_user_email,
        'INCORPORADO',
        v_activated_at,
        0,
        'Habilitación individual de autoestudio (30 días) activada'
      );

      -- Actualizar matrícula en enrollments
      IF p_course_id IS NOT NULL THEN
        IF EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = p_user_id AND course_id = p_course_id) THEN
          UPDATE public.enrollments
          SET estado = 'ACTIVO', progreso = 0
          WHERE user_id = p_user_id AND course_id = p_course_id;
        ELSE
          INSERT INTO public.enrollments (
            user_id, course_id, estado, progreso, abono_inicial, documentos_validados
          ) VALUES (
            p_user_id, p_course_id, 'ACTIVO', 0, 140000, true
          );
        END IF;
      END IF;

      RETURN json_build_object(
        'success', true,
        'activation_id', v_new_id,
        'user_id', p_user_id,
        'student_name', v_user_name,
        'student_rut', v_user_rut,
        'activated_at', v_activated_at,
        'expires_at', v_expires_at,
        'days_remaining', 30,
        'message', 'Habilitación individual de 30 días activada exitosamente para ' || v_user_name
      );
    END;
    $$;
  `);

  // 2. Procedimiento incorporate_cctv_student:
  // Incorpora al alumno aceptado SIN desactivar a otros alumnos en curso
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

      IF v_course_title IS NULL THEN
        v_course_title := 'Técnicas de operación CCTV y alarmas de seguridad privada';
      END IF;

      -- Obtener datos del alumno
      SELECT nombre, rut, email INTO v_user_name, v_user_rut, v_user_email
      FROM public.users
      WHERE id = p_user_id;

      IF v_user_name IS NULL THEN
        SELECT nombre, rut, email INTO v_user_name, v_user_rut, v_user_email
        FROM public.escuela_seguridad
        WHERE user_id = p_user_id;
      END IF;

      IF v_user_name IS NULL THEN
        RAISE EXCEPTION 'Usuario no encontrado para incorporar al curso.';
      END IF;

      -- Desactivar cualquier activación PREVIA del mismo usuario para evitar duplicidad de ese mismo alumno
      UPDATE public.cctv_special_activations
      SET is_active = false
      WHERE user_id = p_user_id AND (course_id = v_course_id OR v_course_id IS NULL);

      -- Crear la nueva activación individual por 30 días para este alumno
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

      -- Registrar la INCORPORACIÓN en el historial de participantes
      INSERT INTO public.course_participant_history (
        course_id,
        course_title,
        user_id,
        user_name,
        user_rut,
        user_email,
        action,
        enrolled_at,
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
        0,
        'Incorporado al autoestudio individual CCTV por 30 días'
      );

      -- Actualizar estado en cctv_approval_requests si existe
      UPDATE public.cctv_approval_requests
      SET visto_bueno = true,
          estado_aprobacion = 'APROBADO',
          visto_bueno_at = COALESCE(visto_bueno_at, v_now),
          updated_at = v_now
      WHERE user_id = p_user_id;

      -- Actualizar escuela_seguridad
      UPDATE public.escuela_seguridad
      SET estado_matricula = 'ACTIVO_AUTOESTUDIO'
      WHERE user_id = p_user_id;

      -- Asegurar matrícula activa en enrollments si hay course_id
      IF v_course_id IS NOT NULL THEN
        IF EXISTS (SELECT 1 FROM public.enrollments WHERE user_id = p_user_id AND course_id = v_course_id) THEN
          UPDATE public.enrollments
          SET estado = 'ACTIVO'
          WHERE user_id = p_user_id AND course_id = v_course_id;
        ELSE
          INSERT INTO public.enrollments (
            user_id, course_id, estado, progreso, abono_inicial, documentos_validados
          ) VALUES (
            p_user_id, v_course_id, 'ACTIVO', 0, 140000, true
          );
        END IF;
      END IF;

      RETURN json_build_object(
        'success', true,
        'activation_id', v_new_act_id,
        'user_id', p_user_id,
        'student_name', v_user_name,
        'course_id', v_course_id,
        'activated_at', v_now,
        'expires_at', v_expires,
        'days_remaining', 30,
        'message', 'Alumno ' || v_user_name || ' incorporado con éxito a su autoestudio individual de 30 días.'
      );
    END;
    $$;
  `);

  // 3. Procedimiento get_cctv_active_status:
  // Soporta múltiples alumnos activos simultáneos y consulta por user_id específico
  await client.query(`
    CREATE OR REPLACE FUNCTION public.get_cctv_active_status(
      p_course_id uuid DEFAULT NULL,
      p_user_id uuid DEFAULT NULL
    )
    RETURNS json
    LANGUAGE plpgsql
    SECURITY DEFINER
    SET search_path = public, auth, extensions
    AS $$
    DECLARE
      v_active_list json;
      v_user_active record;
      v_total_active int;
    BEGIN
      -- Desactivar automáticamente registros expirados
      UPDATE public.cctv_special_activations
      SET is_active = false
      WHERE is_active = true AND now() > expires_at;

      -- Obtener todos los alumnos actualmente activos (pueden ser varios en paralelo)
      SELECT json_agg(row_to_json(act)) INTO v_active_list
      FROM (
        SELECT 
          id as activation_id,
          user_id,
          student_name,
          student_rut,
          student_email,
          course_id,
          course_title,
          activated_at,
          expires_at,
          GREATEST(EXTRACT(DAY FROM (expires_at - now()))::int, 0) as days_remaining,
          GREATEST(EXTRACT(HOUR FROM (expires_at - now()))::int, 0) as hours_remaining,
          progress,
          completed_docs
        FROM public.cctv_special_activations
        WHERE (course_id = p_course_id OR p_course_id IS NULL)
          AND is_active = true
          AND expires_at > now()
        ORDER BY activated_at DESC
      ) act;

      SELECT count(*) INTO v_total_active
      FROM public.cctv_special_activations
      WHERE (course_id = p_course_id OR p_course_id IS NULL)
        AND is_active = true
        AND expires_at > now();

      -- Si se consultó por un usuario específico, verificar si ese usuario está activo
      IF p_user_id IS NOT NULL THEN
        SELECT 
          id as activation_id,
          user_id,
          student_name,
          student_rut,
          student_email,
          course_id,
          course_title,
          activated_at,
          expires_at,
          GREATEST(EXTRACT(DAY FROM (expires_at - now()))::int, 0) as days_remaining,
          progress
        INTO v_user_active
        FROM public.cctv_special_activations
        WHERE user_id = p_user_id
          AND (course_id = p_course_id OR p_course_id IS NULL)
          AND is_active = true
          AND expires_at > now()
        LIMIT 1;
      END IF;

      RETURN json_build_object(
        'has_active', (v_total_active > 0),
        'total_active', v_total_active,
        'active_students', COALESCE(v_active_list, '[]'::json),
        'is_user_active', (v_user_active.activation_id IS NOT NULL),
        'user_activation', CASE WHEN v_user_active.activation_id IS NOT NULL THEN row_to_json(v_user_active) ELSE NULL END,
        'message', CASE 
          WHEN v_total_active > 0 THEN 'Hay ' || v_total_active || ' alumno(s) cursando autoestudio individual actualmente.'
          ELSE 'No hay alumnos cursando autoestudio actualmente.'
        END
      );
    END;
    $$;
  `);

  // 4. Procedimiento get_cctv_approval_list:
  // Actualizado para listar postulantes aprobados y todos los alumnos activos en paralelo
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

      -- B. Postulantes APROBADOS con visto bueno
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
            WHEN EXISTS (
              SELECT 1 FROM public.cctv_special_activations act 
              WHERE act.user_id = r.user_id AND act.is_active = true AND act.expires_at > now()
            ) THEN true
            ELSE false
          END as is_currently_active
        FROM public.cctv_approval_requests r
        WHERE r.visto_bueno = true AND r.estado_aprobacion = 'APROBADO'
        ORDER BY r.visto_bueno_at DESC
      ) a;

      -- C. Estado de los alumnos actualmente activos en paralelo
      v_active_status := public.get_cctv_active_status(p_course_id);

      RETURN json_build_object(
        'pending_requests', COALESCE(v_pending, '[]'::json),
        'approved_applicants', COALESCE(v_approved, '[]'::json),
        'active_status', v_active_status
      );
    END;
    $$;
  `);

  // Otorgar permisos
  await client.query(`
    GRANT EXECUTE ON FUNCTION public.activate_cctv_student(uuid, uuid) TO anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION public.incorporate_cctv_student(uuid, uuid) TO anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION public.get_cctv_active_status(uuid, uuid) TO anon, authenticated, service_role;
    GRANT EXECUTE ON FUNCTION public.get_cctv_approval_list(uuid) TO anon, authenticated, service_role;
  `);

  console.log('✅ Migración exitosa: Modalidad CCTV individual multi-alumno en paralelo desplegada correctamente.');
  await client.end();
}

run().catch(err => {
  console.error('Error durante la migración:', err);
  process.exit(1);
});
