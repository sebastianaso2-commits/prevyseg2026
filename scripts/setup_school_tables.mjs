import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function setupTables() {
  try {
    await client.connect();
    console.log('🔗 Connected to PostgreSQL Supabase');

    // 1. Crear tabla escuela_seguridad
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.escuela_seguridad (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
        rut VARCHAR(20) NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        telefono VARCHAR(50),
        curso_id VARCHAR(100) NOT NULL,
        curso_nombre VARCHAR(255) NOT NULL,
        modalidad VARCHAR(100),
        horas VARCHAR(50),
        monto_total NUMERIC DEFAULT 0,
        abono_50 NUMERIC DEFAULT 0,
        estado_matricula VARCHAR(50) DEFAULT 'REGISTRADO',
        estado_pago VARCHAR(50) DEFAULT 'PENDIENTE_50',
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('✅ Table public.escuela_seguridad created/verified');

    // 2. Crear tabla escuela_oficio
    await client.query(`
      CREATE TABLE IF NOT EXISTS public.escuela_oficio (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL UNIQUE REFERENCES public.users(id) ON DELETE CASCADE,
        rut VARCHAR(20) NOT NULL,
        nombre VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        telefono VARCHAR(50),
        curso_id VARCHAR(100) NOT NULL,
        curso_nombre VARCHAR(255) NOT NULL,
        modalidad VARCHAR(100),
        horas VARCHAR(50),
        monto_total NUMERIC DEFAULT 0,
        abono_50 NUMERIC DEFAULT 0,
        estado_matricula VARCHAR(50) DEFAULT 'REGISTRADO',
        estado_pago VARCHAR(50) DEFAULT 'PENDIENTE_50',
        created_at TIMESTAMPTZ DEFAULT now()
      );
    `);
    console.log('✅ Table public.escuela_oficio created/verified');

    // 3. Crear alias o vistas para EscuelaSeguridad y EscuelaOficio si alguien usa PascalCase
    await client.query(`
      CREATE OR REPLACE VIEW public."EscuelaSeguridad" AS SELECT * FROM public.escuela_seguridad;
      CREATE OR REPLACE VIEW public."EscuelaOficio" AS SELECT * FROM public.escuela_oficio;
    `);
    console.log('✅ Views EscuelaSeguridad and EscuelaOficio created for PascalCase compatibility');

    // 4. Habilitar permisos a anon, authenticated, service_role
    await client.query(`
      GRANT ALL ON public.escuela_seguridad TO anon, authenticated, service_role;
      GRANT ALL ON public.escuela_oficio TO anon, authenticated, service_role;
      GRANT ALL ON public."EscuelaSeguridad" TO anon, authenticated, service_role;
      GRANT ALL ON public."EscuelaOficio" TO anon, authenticated, service_role;
    `);
    console.log('✅ Permissions granted');

    // 5. Habilitar Row Level Security con políticas permisivas para lectura/escritura del sistema
    await client.query(`
      ALTER TABLE public.escuela_seguridad ENABLE ROW LEVEL SECURITY;
      ALTER TABLE public.escuela_oficio ENABLE ROW LEVEL SECURITY;

      DROP POLICY IF EXISTS "Permitir lectura general escuela_seguridad" ON public.escuela_seguridad;
      CREATE POLICY "Permitir lectura general escuela_seguridad" ON public.escuela_seguridad
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Permitir insercion escuela_seguridad" ON public.escuela_seguridad;
      CREATE POLICY "Permitir insercion escuela_seguridad" ON public.escuela_seguridad
        FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Permitir actualizacion escuela_seguridad" ON public.escuela_seguridad;
      CREATE POLICY "Permitir actualizacion escuela_seguridad" ON public.escuela_seguridad
        FOR UPDATE USING (true);

      DROP POLICY IF EXISTS "Permitir lectura general escuela_oficio" ON public.escuela_oficio;
      CREATE POLICY "Permitir lectura general escuela_oficio" ON public.escuela_oficio
        FOR SELECT USING (true);

      DROP POLICY IF EXISTS "Permitir insercion escuela_oficio" ON public.escuela_oficio;
      CREATE POLICY "Permitir insercion escuela_oficio" ON public.escuela_oficio
        FOR INSERT WITH CHECK (true);

      DROP POLICY IF EXISTS "Permitir actualizacion escuela_oficio" ON public.escuela_oficio;
      CREATE POLICY "Permitir actualizacion escuela_oficio" ON public.escuela_oficio
        FOR UPDATE USING (true);
    `);
    console.log('✅ RLS Policies configured');

    // 6. Restricción 1 Estudiante = 1 Solo Curso
    // Trigger para evitar que un mismo estudiante esté registrado en ambas tablas simultáneamente
    await client.query(`
      CREATE OR REPLACE FUNCTION check_single_course_enrollment()
      RETURNS TRIGGER AS $$
      BEGIN
        IF TG_TABLE_NAME = 'escuela_seguridad' THEN
          IF EXISTS (SELECT 1 FROM public.escuela_oficio WHERE user_id = NEW.user_id) THEN
            RAISE EXCEPTION 'El estudiante ya cuenta con una matrícula activa en la Escuela de Oficios. Cada alumno solo puede pertenecer a un curso.';
          END IF;
        ELSIF TG_TABLE_NAME = 'escuela_oficio' THEN
          IF EXISTS (SELECT 1 FROM public.escuela_seguridad WHERE user_id = NEW.user_id) THEN
            RAISE EXCEPTION 'El estudiante ya cuenta con una matrícula activa en la Escuela de Seguridad. Cada alumno solo puede pertenecer a un curso.';
          END IF;
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      DROP TRIGGER IF EXISTS trg_check_single_course_seguridad ON public.escuela_seguridad;
      CREATE TRIGGER trg_check_single_course_seguridad
        BEFORE INSERT OR UPDATE ON public.escuela_seguridad
        FOR EACH ROW EXECUTE FUNCTION check_single_course_enrollment();

      DROP TRIGGER IF EXISTS trg_check_single_course_oficio ON public.escuela_oficio;
      CREATE TRIGGER trg_check_single_course_oficio
        BEFORE INSERT OR UPDATE ON public.escuela_oficio
        FOR EACH ROW EXECUTE FUNCTION check_single_course_enrollment();
    `);
    console.log('✅ 1 Student = 1 Course cross-table trigger deployed');

    console.log('🎉 Setup completed successfully!');
  } catch (err) {
    console.error('❌ Error during setup:', err);
  } finally {
    await client.end();
  }
}

setupTables();
