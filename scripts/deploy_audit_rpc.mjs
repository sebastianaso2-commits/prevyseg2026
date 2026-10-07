import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  console.log('Creando función RPC get_audit_aggregated_data...');

  await client.query(`
    CREATE OR REPLACE FUNCTION public.get_audit_aggregated_data()
    RETURNS jsonb
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      v_users jsonb;
      v_courses jsonb;
      v_enrollments jsonb;
      v_cctv_activations jsonb;
      v_cctv_requests jsonb;
      v_history jsonb;
      v_logs jsonb;
      v_escuela_seg jsonb;
      v_escuela_ofi jsonb;
      v_summary jsonb;
    BEGIN
      -- 1. Usuarios reales (sin contraseñas)
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', u.id,
          'rut', u.rut,
          'nombre', u.nombre,
          'email', u.email,
          'rol', u.rol,
          'telefono', u.telefono,
          'domicilio', u.domicilio,
          'created_at', u.created_at
        ) ORDER BY u.created_at DESC
      ) INTO v_users
      FROM public.users u;

      -- 2. Cursos reales
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', c.id,
          'titulo', c.titulo,
          'codigo_sence', c.codigo_sence,
          'modalidad', c.modalidad,
          'precio', c.precio,
          'school', c.school,
          'category', c.category,
          'duracion', c.duracion,
          'activo', c.activo
        ) ORDER BY c.titulo ASC
      ) INTO v_courses
      FROM public.courses c;

      -- 3. Matrículas reales con datos de curso y usuario
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', e.id,
          'user_id', e.user_id,
          'course_id', e.course_id,
          'estado', e.estado,
          'progreso', e.progreso,
          'abono_inicial', e.abono_inicial,
          'documentos_validados', e.documentos_validados,
          'created_at', e.created_at,
          'user_nombre', u.nombre,
          'user_rut', u.rut,
          'user_email', u.email,
          'course_titulo', c.titulo,
          'course_sence', c.codigo_sence
        ) ORDER BY e.created_at DESC
      ) INTO v_enrollments
      FROM public.enrollments e
      LEFT JOIN public.users u ON u.id = e.user_id
      LEFT JOIN public.courses c ON c.id = e.course_id;

      -- 4. Activaciones CCTV especiales
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', a.id,
          'course_id', a.course_id,
          'course_title', a.course_title,
          'user_id', a.user_id,
          'student_name', a.student_name,
          'student_rut', a.student_rut,
          'student_email', a.student_email,
          'activated_at', a.activated_at,
          'expires_at', a.expires_at,
          'is_active', a.is_active,
          'progress', a.progress,
          'completed_docs', a.completed_docs,
          'created_at', a.created_at
        ) ORDER BY a.created_at DESC
      ) INTO v_cctv_activations
      FROM public.cctv_special_activations a;

      -- 5. Solicitudes de aprobación CCTV
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', r.id,
          'user_id', r.user_id,
          'rut', r.rut,
          'nombre', r.nombre,
          'email', r.email,
          'telefono', r.telefono,
          'curso_id', r.curso_id,
          'curso_nombre', r.curso_nombre,
          'estado_aprobacion', r.estado_aprobacion,
          'visto_bueno', r.visto_bueno,
          'visto_bueno_at', r.visto_bueno_at,
          'visto_bueno_by', r.visto_bueno_by,
          'notas', r.notas,
          'created_at', r.created_at
        ) ORDER BY r.created_at DESC
      ) INTO v_cctv_requests
      FROM public.cctv_approval_requests r;

      -- 6. Historial de participantes
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', h.id,
          'course_id', h.course_id,
          'course_title', h.course_title,
          'user_id', h.user_id,
          'user_name', h.user_name,
          'user_rut', h.user_rut,
          'action', h.action,
          'enrolled_at', h.enrolled_at,
          'ended_at', h.ended_at,
          'progress', h.progress,
          'notes', h.notes,
          'created_at', h.created_at
        ) ORDER BY h.created_at DESC
      ) INTO v_history
      FROM public.course_participant_history h;

      -- 7. Escuela Seguridad
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', s.id,
          'user_id', s.user_id,
          'rut', s.rut,
          'nombre', s.nombre,
          'email', s.email,
          'telefono', s.telefono,
          'curso_id', s.curso_id,
          'curso_nombre', s.curso_nombre,
          'modalidad', s.modalidad,
          'horas', s.horas,
          'monto_total', s.monto_total,
          'abono_50', s.abono_50,
          'estado_matricula', s.estado_matricula,
          'estado_pago', s.estado_pago,
          'created_at', s.created_at
        ) ORDER BY s.created_at DESC
      ) INTO v_escuela_seg
      FROM public.escuela_seguridad s;

      -- 8. Escuela Oficio
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', o.id,
          'user_id', o.user_id,
          'rut', o.rut,
          'nombre', o.nombre,
          'email', o.email,
          'telefono', o.telefono,
          'curso_id', o.curso_id,
          'curso_nombre', o.curso_nombre,
          'modalidad', o.modalidad,
          'horas', o.horas,
          'monto_total', o.monto_total,
          'abono_50', o.abono_50,
          'estado_matricula', o.estado_matricula,
          'estado_pago', o.estado_pago,
          'created_at', o.created_at
        ) ORDER BY o.created_at DESC
      ) INTO v_escuela_ofi
      FROM public.escuela_oficio o;

      -- 9. Live logs más recientes
      SELECT jsonb_agg(
        jsonb_build_object(
          'id', l.id,
          'category', l.category,
          'action', l.action,
          'user_name', l.user_name,
          'user_rut', l.user_rut,
          'user_role', l.user_role,
          'description', l.description,
          'metadata', l.metadata,
          'ip_address', l.ip_address,
          'status', l.status,
          'created_at', l.created_at
        ) ORDER BY l.created_at DESC
      ) INTO v_logs
      FROM (SELECT * FROM public.audit_logs ORDER BY created_at DESC LIMIT 100) l;

      -- Resumen consolidado para KPIs
      v_summary := jsonb_build_object(
        'total_users', COALESCE(jsonb_array_length(v_users), 0),
        'total_courses', COALESCE(jsonb_array_length(v_courses), 0),
        'total_enrollments', COALESCE(jsonb_array_length(v_enrollments), 0),
        'total_cctv_requests', COALESCE(jsonb_array_length(v_cctv_requests), 0),
        'total_escuela_seguridad', COALESCE(jsonb_array_length(v_escuela_seg), 0),
        'total_logs', COALESCE(jsonb_array_length(v_logs), 0),
        'server_timestamp', now()
      );

      RETURN jsonb_build_object(
        'summary', v_summary,
        'users', COALESCE(v_users, '[]'::jsonb),
        'courses', COALESCE(v_courses, '[]'::jsonb),
        'enrollments', COALESCE(v_enrollments, '[]'::jsonb),
        'cctv_activations', COALESCE(v_cctv_activations, '[]'::jsonb),
        'cctv_requests', COALESCE(v_cctv_requests, '[]'::jsonb),
        'history', COALESCE(v_history, '[]'::jsonb),
        'escuela_seguridad', COALESCE(v_escuela_seg, '[]'::jsonb),
        'escuela_oficio', COALESCE(v_escuela_ofi, '[]'::jsonb),
        'logs', COALESCE(v_logs, '[]'::jsonb)
      );
    END;
    $$;

    GRANT EXECUTE ON FUNCTION public.get_audit_aggregated_data() TO anon, authenticated, service_role;
  `);

  console.log('Función RPC get_audit_aggregated_data creada exitosamente.');

  // Probar la función
  const testRes = await client.query('SELECT public.get_audit_aggregated_data() as data;');
  console.log('Prueba exitosa. Resumen devuelto:', testRes.rows[0].data.summary);

  await client.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
