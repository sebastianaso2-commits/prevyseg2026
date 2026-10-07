import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

const COURSES = [
  // --- SEGURIDAD ---
  {
    titulo: 'Formación de guardias de seguridad',
    school: 'seguridad',
    category: 'Formación Inicial',
    duracion: '90 Horas Cronológicas',
    modalidad: 'Presencial / Semipresencial',
    precio: 120000,
    disponible: true,
    cupos: 30,
    fecha_inicio: '14 de Octubre, 2026',
    fecha_termino: '20 de Noviembre, 2026',
    codigo_sence: 'OS10-FORM-01',
    descripcion: 'Curso oficial exigido por la Ley 21.659. Prepara al alumno en legislación, primeros auxilios, defensa personal y examen ante la Autoridad Fiscalizadora.'
  },
  {
    titulo: 'Formación de vigilantes privados',
    school: 'seguridad',
    category: 'Formación Inicial',
    duracion: '100 Horas',
    modalidad: 'Presencial con Polígono de Tiro',
    precio: 190000,
    disponible: true,
    cupos: 15,
    fecha_inicio: '21 de Octubre, 2026',
    fecha_termino: '04 de Diciembre, 2026',
    codigo_sence: 'OS10-VIG-02',
    descripcion: 'Instrucción especializada para entidades bancarias, transporte de valores y recintos estratégicos con porte de armas regulado.'
  },
  {
    titulo: 'Formación de guardia de seguridad marítimo portuario',
    school: 'seguridad',
    category: 'Formación Inicial',
    duracion: '90 Horas',
    modalidad: 'Presencial / Recintos Portuarios',
    precio: 130000,
    disponible: true,
    cupos: 20,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '27 de Noviembre, 2026',
    codigo_sence: 'DIR-FORM-03',
    descripcion: 'Resguardo y control de accesos en muelles, terminales marítimos y recintos portuarios bajo Código PBIP y Directemar.'
  },
  {
    titulo: 'Formación para porteros, nocheros, rondines u otro de similar carácter',
    school: 'seguridad',
    category: 'Formación Inicial',
    duracion: '50 Horas',
    modalidad: 'Online Asíncrono + Práctico',
    precio: 95000,
    disponible: true,
    cupos: 25,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Noviembre, 2026',
    codigo_sence: 'OS10-PORT-04',
    descripcion: 'Control de libro de novedades, rondas nocturnas perimetrales y protocolos de emergencia en condominios y empresas.'
  },
  {
    titulo: 'Perfeccionamiento de guardias de seguridad',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    duracion: '36 Horas',
    modalidad: 'Semipresencial (Reentrenamiento Trienal)',
    precio: 90000,
    disponible: true,
    cupos: 35,
    fecha_inicio: '12 de Octubre, 2026',
    fecha_termino: '05 de Noviembre, 2026',
    codigo_sence: 'OS10-PERF-05',
    descripcion: 'Reentrenamiento obligatorio cada 3 años para renovación de credencial ante la Subsecretaría de Prevención del Delito.'
  },
  {
    titulo: 'Perfeccionamiento de guardia de seguridad marítimo portuario',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    duracion: '40 Horas',
    modalidad: 'Presencial / Directemar',
    precio: 100000,
    disponible: true,
    cupos: 20,
    fecha_inicio: '20 de Octubre, 2026',
    fecha_termino: '10 de Noviembre, 2026',
    codigo_sence: 'DIR-PERF-06',
    descripcion: 'Actualización en inspección de naves, contenedores y faenas portuarias bajo normativa PBIP.'
  },
  {
    titulo: 'Perfeccionamiento para porteros, nocheros, rondines u otro de similar carácter',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    duracion: '30 Horas',
    modalidad: 'Online Flexible',
    precio: 75000,
    disponible: true,
    cupos: 25,
    fecha_inicio: '16 de Octubre, 2026',
    fecha_termino: '06 de Noviembre, 2026',
    codigo_sence: 'OS10-PPERF-07',
    descripcion: 'Actualización periódica para personal de control y conserjería con foco en emergencias residenciales.'
  },
  {
    titulo: 'Técnicas de operación de circuitos cerrados de televisión (CCTV codificado por SENCE)',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    duracion: '60 Horas',
    modalidad: 'Online Sincrónico + Software VMS',
    precio: 140000,
    disponible: true,
    cupos: 18,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    codigo_sence: 'CCTV-SENCE-08',
    descripcion: 'Operación profesional de software VMS, cámaras domo PTZ, reconocimiento facial y trazabilidad forense para centrales de monitoreo.'
  },
  {
    titulo: 'Técnicas de operación CCTV y alarmas de seguridad privada',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    duracion: '65 Horas',
    modalidad: 'Semipresencial con Paneles de Alarma',
    precio: 150000,
    disponible: true,
    cupos: 16,
    fecha_inicio: '26 de Octubre, 2026',
    fecha_termino: '05 de Diciembre, 2026',
    codigo_sence: 'CCTV-ALARM-09',
    descripcion: 'Integración de centrales de alarma perimetral, sensores infrarrojos y respuesta ante intrusiones.'
  },
  {
    titulo: 'Supervisor de seguridad privada',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    duracion: '120 Horas',
    modalidad: '100% Online Aula Virtual',
    precio: 180000,
    disponible: true,
    cupos: 20,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Diciembre, 2026',
    codigo_sence: 'SUP-SPD-10',
    descripcion: 'Gestión de turnos, confección de Directivas de Funcionamiento conforme a la Ley 21.659 y liderazgo operativo en terreno.'
  },

  // --- OFICIOS ---
  {
    titulo: 'Resolución de conflictos y manejo de situaciones difíciles',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    duracion: '40 Horas Online Asíncrona',
    modalidad: 'Online Asíncrona (Plataforma 24/7)',
    precio: 95000,
    disponible: true,
    cupos: 25,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Noviembre, 2026',
    codigo_sence: 'OF-CONF-01',
    descripcion: 'Estrategias de negociación, contención emocional, mediación de controversias laborales y resolución constructiva en entornos de trabajo exigentes.'
  },
  {
    titulo: 'Técnicas de manejo de resolución de conflictos',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    duracion: '8 Horas Presencial',
    modalidad: 'Presencial Intensivo en Sede',
    precio: 55000,
    disponible: true,
    cupos: 15,
    fecha_inicio: '24 de Octubre, 2026',
    fecha_termino: '24 de Octubre, 2026',
    codigo_sence: 'OF-CONF-02',
    descripcion: 'Taller práctico con dinámicas de rol y simulación para el manejo asertivo del estrés y control de crisis interpersonal.'
  },
  {
    titulo: 'Manejo y uso de plaguicidas agrícolas',
    school: 'oficios',
    category: 'Área Agropecuaria',
    duracion: '40 Horas',
    modalidad: 'Semipresencial (Teoría + Campo)',
    precio: 120000,
    disponible: true,
    cupos: 20,
    fecha_inicio: '20 de Octubre, 2026',
    fecha_termino: '22 de Noviembre, 2026',
    codigo_sence: 'OF-AGRO-03',
    descripcion: 'Protocolos de dosificación segura, equipos de protección EPP, calibración de pulverizadores y primeros auxilios ante intoxicaciones conforme a norma SAG.'
  },
  {
    titulo: 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios',
    school: 'oficios',
    category: 'Área Logística y Operaciones',
    duracion: '50 Horas',
    modalidad: 'Semipresencial con Terreno Portuario',
    precio: 140000,
    disponible: true,
    cupos: 18,
    fecha_inicio: '18 de Octubre, 2026',
    fecha_termino: '25 de Noviembre, 2026',
    codigo_sence: 'OF-PORT-04',
    descripcion: 'Técnicas de estiba y desestiba, manejo de cargas críticas en muelles, señalética de maniobras y uso seguro de eslingas en recintos portuarios.'
  },
  {
    titulo: 'Procedimientos de higiene, seguridad y prevención de riesgos en procesos de manipulación de alimentos',
    school: 'oficios',
    category: 'Área Alimentación',
    duracion: '40 Horas',
    modalidad: 'Online + Taller Higiénico',
    precio: 85000,
    disponible: true,
    cupos: 25,
    fecha_inicio: '12 de Octubre, 2026',
    fecha_termino: '12 de Noviembre, 2026',
    codigo_sence: 'OF-ALIM-05',
    descripcion: 'Buenas Prácticas de Manufactura (BPM), control de puntos críticos (HACCP), inocuidad y desinfección conforme a la Seremi de Salud.'
  },
  {
    titulo: 'Técnicas de depilación con cera miel',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    duracion: '30 Horas Prácticas',
    modalidad: 'Presencial en Taller Estético',
    precio: 90000,
    disponible: true,
    cupos: 12,
    fecha_inicio: '26 de Octubre, 2026',
    fecha_termino: '18 de Noviembre, 2026',
    codigo_sence: 'OF-EST-06',
    descripcion: 'Anatomía folicular, temperatura adecuada de cera miel natural, extracción sin dolor, asepsia profesional y cuidados post-depilatorios.'
  },
  {
    titulo: 'Técnicas de manicure',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    duracion: '35 Horas Prácticas',
    modalidad: 'Presencial en Taller Estético',
    precio: 95000,
    disponible: true,
    cupos: 14,
    fecha_inicio: '27 de Octubre, 2026',
    fecha_termino: '20 de Noviembre, 2026',
    codigo_sence: 'OF-EST-07',
    descripcion: 'Manicure rusa y tradicional, limado anatómico, esmaltado semipermanente UV/LED, cuidado de la uña natural y diseños en tendencia.'
  },
  {
    titulo: 'Técnicas de maquillaje carnaval',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    duracion: '30 Horas Prácticas',
    modalidad: 'Presencial Especializado',
    precio: 90000,
    disponible: true,
    cupos: 15,
    fecha_inicio: '02 de Noviembre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    codigo_sence: 'OF-EST-08',
    descripcion: 'Técnicas de maquillaje artístico resistente a sudor y clima, aplicación de pedrería, glitter y pigmentos para bailarines de carnavales.'
  },
  {
    titulo: 'Cuidado adulto mayor y personas postradas',
    school: 'oficios',
    category: 'Área de Salud',
    duracion: '60 Horas Teórico-Prácticas',
    modalidad: 'Semipresencial con Prácticas Asistidas',
    precio: 130000,
    disponible: true,
    cupos: 16,
    fecha_inicio: '16 de Octubre, 2026',
    fecha_termino: '30 de Noviembre, 2026',
    codigo_sence: 'OF-SALUD-09',
    descripcion: 'Movilización de personas postradas, prevención de úlceras por decúbito, aseo en cama, control de signos vitales y administración asistida de medicamentos.'
  },
  {
    titulo: 'Cajero bancario, administración de condominios',
    school: 'oficios',
    category: 'Área de Administración',
    duracion: '50 Horas',
    modalidad: 'Online Sincrónico + Simulador',
    precio: 110000,
    disponible: true,
    cupos: 22,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    codigo_sence: 'OF-ADM-10',
    descripcion: 'Detección de billetes falsos, cuadratura diaria de caja, gestión de gastos comunes y administración bajo la Nueva Ley de Copropiedad Inmobiliaria.'
  }
];

async function syncCourses() {
  try {
    await client.connect();
    console.log('🔗 Connected to Supabase PostgreSQL');

    // 1. Asegurar columnas en public.courses y relajar check constraint de modalidad
    await client.query(`
      ALTER TABLE public.courses DROP CONSTRAINT IF EXISTS courses_modalidad_check;
      ALTER TABLE public.courses 
      ADD COLUMN IF NOT EXISTS school VARCHAR(50) DEFAULT 'seguridad',
      ADD COLUMN IF NOT EXISTS category VARCHAR(100),
      ADD COLUMN IF NOT EXISTS duracion VARCHAR(100),
      ADD COLUMN IF NOT EXISTS disponible BOOLEAN DEFAULT true,
      ADD COLUMN IF NOT EXISTS cupos INT DEFAULT 20,
      ADD COLUMN IF NOT EXISTS fecha_inicio VARCHAR(100),
      ADD COLUMN IF NOT EXISTS fecha_termino VARCHAR(100);
    `);
    console.log('✅ Columns in public.courses verified and constraint updated');

    // 2. Limpiar cursos antiguos para tener exclusivamente la lista oficial
    await client.query(`DELETE FROM public.courses;`);
    console.log('🧹 Cleaned old courses from public.courses');

    // 3. Insertar los 20 cursos solicitados
    for (const c of COURSES) {
      await client.query(`
        INSERT INTO public.courses (
          titulo, school, category, duracion, modalidad, precio, disponible, cupos, fecha_inicio, fecha_termino, codigo_sence, descripcion, activo
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, true
        );
      `, [
        c.titulo, c.school, c.category, c.duracion, c.modalidad, c.precio, c.disponible, c.cupos, c.fecha_inicio, c.fecha_termino, c.codigo_sence, c.descripcion
      ]);
    }
    console.log(`✅ Inserted ${COURSES.length} official courses into PostgreSQL`);

    // 4. Verificar conteo
    const res = await client.query(`
      SELECT school, count(*) as total 
      FROM public.courses 
      GROUP BY school;
    `);
    console.log('📊 Courses in database by school:', res.rows);

  } catch (err) {
    console.error('❌ Error syncing courses to DB:', err);
  } finally {
    await client.end();
  }
}

syncCourses();
