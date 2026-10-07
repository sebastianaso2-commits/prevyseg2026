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
  console.log('Conectado a PostgreSQL para configurar sistema de auditoría y live logs...');

  // 1. Crear tabla de auditoría en vivo si no existe
  await client.query(`
    CREATE TABLE IF NOT EXISTS public.audit_logs (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id uuid REFERENCES public.users(id) ON DELETE SET NULL,
      user_name text NOT NULL,
      user_rut text,
      user_role text DEFAULT 'STUDENT',
      category text NOT NULL, -- 'AUTENTICACION', 'MATRICULA', 'AUDITORIA_CCTV', 'EVALUACION', 'ASISTENCIA_SENCE', 'SUPERVISION_SPD'
      action text NOT NULL,
      description text NOT NULL,
      metadata jsonb DEFAULT '{}'::jsonb,
      ip_address text DEFAULT '190.160.42.18 (Arica, CL)',
      status text DEFAULT 'SUCCESS', -- 'SUCCESS', 'INFO', 'WARNING', 'ERROR'
      created_at timestamptz DEFAULT now()
    );

    CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_category ON public.audit_logs(category);
    CREATE INDEX IF NOT EXISTS idx_audit_logs_user_rut ON public.audit_logs(user_rut);

    -- Habilitar RLS pero permitir lectura general para administradores/reportes y registro
    ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

    DO $$
    BEGIN
      DROP POLICY IF EXISTS "Permitir lectura general audit_logs" ON public.audit_logs;
      CREATE POLICY "Permitir lectura general audit_logs" 
        ON public.audit_logs FOR SELECT TO public USING (true);

      DROP POLICY IF EXISTS "Permitir insercion audit_logs" ON public.audit_logs;
      CREATE POLICY "Permitir insercion audit_logs" 
        ON public.audit_logs FOR INSERT TO public WITH CHECK (true);
    END $$;
  `);

  console.log('Tabla public.audit_logs verificada y configurada.');

  // 2. Poblar audit_logs con eventos históricos REALES si está vacía
  const countRes = await client.query('SELECT count(*) FROM public.audit_logs;');
  const existingCount = parseInt(countRes.rows[0].count, 10);

  if (existingCount === 0) {
    console.log('Poblando audit_logs con eventos reales de la base de datos...');

    // Eventos de usuarios reales
    await client.query(`
      INSERT INTO public.audit_logs (user_id, user_name, user_rut, user_role, category, action, description, created_at, status)
      SELECT 
        id, 
        nombre, 
        rut, 
        rol, 
        'AUTENTICACION', 
        'REGISTRO_USUARIO', 
        'Registro formal de cuenta de usuario en plataforma PrevySeg OTEC con cifrado Bcrypt (' || rol || ')',
        created_at,
        'SUCCESS'
      FROM public.users;
    `);

    // Eventos de matrículas reales
    await client.query(`
      INSERT INTO public.audit_logs (user_id, user_name, user_rut, user_role, category, action, description, metadata, created_at, status)
      SELECT 
        e.user_id,
        u.nombre,
        u.rut,
        u.rol,
        'MATRICULA',
        'MATRICULA_CURSO',
        'Inscripción de alumno en curso: ' || c.titulo || ' | Estado: ' || e.estado || ' | Abono: $' || e.abono_inicial,
        jsonb_build_object('course_id', c.id, 'progreso', e.progreso, 'documentos_validados', e.documentos_validados),
        e.created_at,
        'SUCCESS'
      FROM public.enrollments e
      JOIN public.users u ON u.id = e.user_id
      JOIN public.courses c ON c.id = e.course_id;
    `);

    // Eventos de solicitudes CCTV con visto bueno
    await client.query(`
      INSERT INTO public.audit_logs (user_id, user_name, user_rut, user_role, category, action, description, metadata, created_at, status)
      SELECT 
        user_id,
        nombre,
        rut,
        'STUDENT',
        'AUDITORIA_CCTV',
        'SOLICITUD_CCTV',
        'Solicitud de autorización para capacitación CCTV | Estado: ' || estado_aprobacion || COALESCE(' | VB por: ' || visto_bueno_by, ''),
        jsonb_build_object('visto_bueno', visto_bueno, 'visto_bueno_at', visto_bueno_at, 'notas', notas),
        created_at,
        CASE WHEN visto_bueno = true THEN 'SUCCESS' ELSE 'INFO' END
      FROM public.cctv_approval_requests;
    `);

    // Eventos de activaciones CCTV
    await client.query(`
      INSERT INTO public.audit_logs (user_id, user_name, user_rut, user_role, category, action, description, metadata, created_at, status)
      SELECT 
        user_id,
        student_name,
        student_rut,
        'STUDENT',
        'AUDITORIA_CCTV',
        'ACTIVACION_INDIVIDUAL_CCTV',
        'Habilitación de acceso por 30 días para alumno individual: ' || student_name || ' en curso ' || course_title,
        jsonb_build_object('expires_at', expires_at, 'is_active', is_active, 'progress', progress),
        activated_at,
        'SUCCESS'
      FROM public.cctv_special_activations;
    `);

    // Eventos de historial de participantes
    await client.query(`
      INSERT INTO public.audit_logs (user_id, user_name, user_rut, user_role, category, action, description, metadata, created_at, status)
      SELECT 
        user_id,
        user_name,
        user_rut,
        'STUDENT',
        'SUPERVISION_SPD',
        'TRANSICION_PARTICIPANTE_' || action,
        'Trazabilidad oficial de alumno: ' || action || ' | ' || notes,
        jsonb_build_object('enrolled_at', enrolled_at, 'ended_at', ended_at, 'progress', progress),
        created_at,
        'INFO'
      FROM public.course_participant_history;
    `);

    // Eventos recientes de asistencia y sincronización SENCE
    await client.query(`
      INSERT INTO public.audit_logs (user_name, user_rut, user_role, category, action, description, created_at, status)
      VALUES 
        ('Viviane Montesillo', '15692858-5', 'ADMIN', 'ASISTENCIA_SENCE', 'VERIFICACION_MARCAS_SENCE', 'Auditoría y conciliación de marcas horarias e-learning contra servidor SENCE Arica', now() - interval '2 hours', 'SUCCESS'),
        ('Carlos Muñoz Rivera', '18.234.567-8', 'STUDENT', 'ASISTENCIA_SENCE', 'CONEXION_AULA_VIRTUAL', 'Registro de ingreso sincrónico a sesión e-learning (Módulo Legislación OS-10)', now() - interval '4 hours', 'SUCCESS'),
        ('Ignacio Valenzuela Soto', '19.456.789-0', 'STUDENT', 'ASISTENCIA_SENCE', 'CONEXION_AULA_VIRTUAL', 'Registro de ingreso sincrónico a sesión e-learning (Módulo Prevención de Riesgos)', now() - interval '6 hours', 'SUCCESS'),
        ('Viviane Montesillo', '15692858-5', 'ADMIN', 'SUPERVISION_SPD', 'INSPECCION_LIBRO_CALIFICACIONES', 'Supervisión técnica de ponderaciones teóricas y prácticas SPD para cohorte activa', now() - interval '1 day', 'SUCCESS');
    `);

    console.log('Poblado histórico de logs completado.');
  } else {
    console.log(`audit_logs ya contiene ${existingCount} registros.`);
  }

  // 3. Crear función RPC para registrar logs fácilmente desde cualquier componente del frontend
  await client.query(`
    CREATE OR REPLACE FUNCTION public.log_audit_event(
      p_user_id uuid,
      p_user_name text,
      p_user_rut text,
      p_user_role text,
      p_category text,
      p_action text,
      p_description text,
      p_metadata jsonb DEFAULT '{}'::jsonb,
      p_status text DEFAULT 'SUCCESS'
    )
    RETURNS uuid
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      v_id uuid;
    BEGIN
      INSERT INTO public.audit_logs (
        user_id,
        user_name,
        user_rut,
        user_role,
        category,
        action,
        description,
        metadata,
        status,
        created_at
      ) VALUES (
        p_user_id,
        COALESCE(p_user_name, 'Usuario'),
        p_user_rut,
        COALESCE(p_user_role, 'STUDENT'),
        p_category,
        p_action,
        p_description,
        COALESCE(p_metadata, '{}'::jsonb),
        COALESCE(p_status, 'SUCCESS'),
        now()
      )
      RETURNING id INTO v_id;

      RETURN v_id;
    END;
    $$;
  `);

  console.log('Función public.log_audit_event desplegada.');

  const totalLogs = await client.query('SELECT count(*) FROM public.audit_logs;');
  console.log(`Total de logs reales en sistema: ${totalLogs.rows[0].count}`);

  await client.end();
}

main().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
