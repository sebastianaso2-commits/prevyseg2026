import conflictImg from '../assets/images/course_conflict_resolution_1788545038374.jpg';
import portImg from '../assets/images/course_port_security_1788545050484.jpg';
import agricultureImg from '../assets/images/course_agriculture.jpg';
import foodImg from '../assets/images/course_gastronomy.jpg';
import aestheticImg from '../assets/images/course_aesthetic.jpg';
import elderlyImg from '../assets/images/course_elderly_care.jpg';
import bankCashierImg from '../assets/images/course_bank_cashier.jpg';

import securityGuardsImg from '../assets/images/security_guards.jpg';
import securitySupervisorImg from '../assets/images/security_supervisor.jpg';
import cctvOperatorImg from '../assets/images/cctv_operator.jpg';
import cyberImg from '../assets/images/course_cybersecurity_1788545064007.jpg';
import { supabase } from '../config/supabase';

// =========================================================================
// CATÁLOGO OFICIAL EXCLUSIVO DE PREVYSEG
// Estructurado estrictamente según la especificación del usuario.
// Cada curso cuenta con: disponible, cupos, fecha_inicio y fecha_termino.
// =========================================================================

export const DEFAULT_COURSES = [
  // =======================================================================
  // 1. ESCUELA DE OFICIOS (SOLO LOS CURSOS SOLICITADOS POR EL USUARIO)
  // =======================================================================
  
  // --- DESARROLLO DE HABILIDADES LABORALES ---
  {
    id: 'of-01',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    title: 'Resolución de conflictos y manejo de situaciones difíciles',
    duration: '40 Horas Online Asíncrona',
    modality: 'Online Asíncrona (Plataforma 24/7)',
    permitePresencial: false,
    permiteVirtual: true,
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    priceDetail: 'Código SENCE Franquicia Tributaria',
    disponible: true,
    cupos: 25,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Noviembre, 2026',
    badgeText: '40 Horas Asíncrono',
    highlight: 'Habilidades Blandas',
    image: conflictImg,
    description: 'Estrategias de negociación, contención emocional, mediación de controversias laborales y resolución constructiva de problemas en entornos de trabajo exigentes.'
  },
  {
    id: 'of-02',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    title: 'Técnicas de manejo de resolución de conflictos',
    duration: '8 Horas Presencial',
    modality: 'Presencial Intensivo en Sede',
    permitePresencial: true,
    permiteVirtual: false,
    price: '$55.000 CLP',
    depositPrice: '$27.500 CLP (50%)',
    priceDetail: 'Taller Práctico Dinámico',
    disponible: true,
    cupos: 15,
    fecha_inicio: '24 de Octubre, 2026',
    fecha_termino: '24 de Octubre, 2026',
    badgeText: '8 Horas Presencial',
    highlight: 'Jornada Intensiva',
    image: conflictImg,
    description: 'Taller práctico con dinámicas de rol y simulación para el manejo asertivo del estrés, control de crisis interpersonal y resolución pacífica en equipos.'
  },

  // --- ÁREA AGROPECUARIA ---
  {
    id: 'of-03',
    school: 'oficios',
    category: 'Área Agropecuaria',
    title: 'Manejo y uso de plaguicidas agrícolas',
    duration: '40 Horas',
    modality: 'Semipresencial (Teoría + Campo)',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$120.000 CLP',
    depositPrice: '$60.000 CLP (50%)',
    priceDetail: 'Normativa SAG & Seremi de Salud',
    disponible: true,
    cupos: 20,
    fecha_inicio: '20 de Octubre, 2026',
    fecha_termino: '22 de Noviembre, 2026',
    badgeText: 'Norma SAG & Salud',
    highlight: 'Alta Demanda Valle Azapa',
    image: agricultureImg,
    description: 'Protocolos de dosificación segura, equipos de protección personal (EPP), calibración de pulverizadores, almacenamiento regulado y primeros auxilios ante intoxicaciones.'
  },

  // --- ÁREA LOGÍSTICA Y OPERACIONES ---
  {
    id: 'of-04',
    school: 'oficios',
    category: 'Área Logística y Operaciones',
    title: 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios',
    duration: '50 Horas',
    modality: 'Semipresencial con Terreno Portuario',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (50%)',
    priceDetail: 'Normativa Portuaria Directemar / TPA',
    disponible: true,
    cupos: 18,
    fecha_inicio: '18 de Octubre, 2026',
    fecha_termino: '25 de Noviembre, 2026',
    badgeText: 'Operación Portuaria',
    highlight: 'Inserción Puertos TPA',
    image: portImg,
    description: 'Técnicas de estiba y desestiba, manejo de cargas críticas en muelles, señalética de maniobras, uso de eslingas y protocolos de seguridad portuaria internacional.'
  },

  // --- ÁREA ALIMENTACIÓN ---
  {
    id: 'of-05',
    school: 'oficios',
    category: 'Área Alimentación',
    title: 'Procedimientos de higiene, seguridad y prevención de riesgos en procesos de manipulación de alimentos',
    duration: '60 Horas pedagógicas',
    modality: 'Presencial, teórico-práctica',
    dias: '3 veces por semana',
    horario: 'Martes, Miércoles y Jueves',
    jornada: '16 hrs teóricas / 28 hrs prácticas / 16 hrs de implementación',
    permitePresencial: true,
    permiteVirtual: false,
    price: '$150.000 CLP',
    depositPrice: '$75.000 CLP (50%)',
    priceDetail: 'Acreditación Oficial • Incluye Materiales',
    disponible: true,
    cupos: 20,
    fecha_inicio: '12 de Octubre, 2026',
    fecha_termino: '12 de Noviembre, 2026',
    badgeText: '60 Horas Teórico-Prácticas',
    highlight: 'Emprendimiento Gastronómico',
    image: foodImg,
    description: 'Aprende a elaborar alimentos de forma segura y desarrolla las competencias necesarias para iniciar o fortalecer tu emprendimiento gastronómico con herramientas de inocuidad y formalización.',
    requisitos: [
      'Cédula de Identidad chilena vigente (o extranjera con permanencia definitiva).',
      'Mayor de 18 años.',
      'Interés en iniciar o fortalecer un emprendimiento gastronómico.',
      'Salud compatible con funciones de manipulación higiénica de alimentos.'
    ]
  },

  // --- ÁREA ESTÉTICA Y SERVICIOS ---
  {
    id: 'of-06',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    title: 'Técnicas de depilación con cera miel',
    duration: '30 Horas Prácticas',
    modality: 'Presencial en Taller Estético',
    permitePresencial: true,
    permiteVirtual: false,
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    priceDetail: 'Incluye Set de Insumos Prácticos',
    disponible: true,
    cupos: 12,
    fecha_inicio: '26 de Octubre, 2026',
    fecha_termino: '18 de Noviembre, 2026',
    badgeText: 'Cera Miel & Cuidados',
    highlight: 'Emprendimiento Rápido',
    image: aestheticImg,
    description: 'Anatomía de la piel y folículo piloso, temperatura adecuada de cera, técnicas de extracción sin dolor, asepsia profesional y tratamientos post-depilatorios calmantes.'
  },
  {
    id: 'of-07',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    title: 'Técnicas de manicure',
    duration: '35 Horas Prácticas',
    modality: 'Presencial en Taller Estético',
    permitePresencial: true,
    permiteVirtual: false,
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    priceDetail: 'Esmaltado Permanente & Limpieza',
    disponible: true,
    cupos: 14,
    fecha_inicio: '27 de Octubre, 2026',
    fecha_termino: '20 de Noviembre, 2026',
    badgeText: 'Manicure Profesional',
    highlight: 'Alta Salida Laboral',
    image: aestheticImg,
    description: 'Manicure rusa y tradicional, limado anatómico, retiro higiénico de cutícula, preparación de la uña natural, esmaltado semipermanente y diseños en tendencia.'
  },
  {
    id: 'of-08',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    title: 'Técnicas de maquillaje carnaval',
    duration: '30 Horas Prácticas',
    modality: 'Presencial Especializado (Teórico-Práctica)',
    dias: 'Talleres Prácticos en Sede',
    horario: 'Jornada Intensiva con Insumos',
    jornada: 'Kit de Trabajo entregado desde el Día 1',
    permitePresencial: true,
    permiteVirtual: false,
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    priceDetail: 'Incluye Kit Completo de Insumos y Manual',
    disponible: true,
    cupos: 15,
    fecha_inicio: '02 de Noviembre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    badgeText: 'Carnaval con la Fuerza del Sol',
    highlight: 'Tradición Macro Zona Norte',
    image: aestheticImg,
    description: 'Formación técnica en colorimetría, peinados con ornamentación capilar y maquillaje artístico de alta fijación resistente al calor, sudor y movimiento para carnavales y eventos.',
    requisitos: [
      'Cédula de Identidad chilena vigente.',
      'Mayor de 18 años.',
      'No se requieren conocimientos previos en maquillaje ni estética.'
    ]
  },

  // --- ÁREA DE SALUD ---
  {
    id: 'of-09',
    school: 'oficios',
    category: 'Área de Salud',
    title: 'Cuidado adulto mayor y personas postradas',
    duration: '60 Horas Teórico-Prácticas',
    modality: 'Semipresencial con Prácticas Asistidas',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$130.000 CLP',
    depositPrice: '$65.000 CLP (50%)',
    priceDetail: 'Formación Asistencial y Ética',
    disponible: true,
    cupos: 16,
    fecha_inicio: '16 de Octubre, 2026',
    fecha_termino: '30 de Noviembre, 2026',
    badgeText: 'Geriatría & Cuidados',
    highlight: 'Vocación Asistencial',
    image: elderlyImg,
    description: 'Movilización de personas postradas, prevención de úlceras por presión (escaras), administración asistida de medicamentos orales, higiene en cama y signos vitales.'
  },

  // --- ÁREA DE ADMINISTRACIÓN ---
  {
    id: 'of-10',
    school: 'oficios',
    category: 'Área de Administración',
    title: 'Cajero bancario, administración de condominios',
    duration: '50 Horas',
    modality: 'Online Sincrónico + Simulador',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$110.000 CLP',
    depositPrice: '$55.000 CLP (50%)',
    priceDetail: 'Simulador de Cajas & Ley de Copropiedad',
    disponible: true,
    cupos: 22,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    badgeText: 'Cajas & Copropiedad',
    highlight: 'Banca y Edificios',
    image: bankCashierImg,
    description: 'Detección de billetes y documentos falsificados, arqueo de caja, cuadratura diaria, gestión de gastos comunes y administración conforme a la Nueva Ley de Copropiedad Inmobiliaria.'
  },

  // =======================================================================
  // 2. ESCUELA DE SEGURIDAD (SOLO LOS CURSOS SOLICITADOS POR EL USUARIO)
  // =======================================================================

  // --- FORMACIÓN INICIAL ---
  {
    id: 'seg-01',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación de guardias de seguridad',
    duration: '90 Horas Cronológicas',
    dias: '2 semanas',
    horario: '08:30 a 12:30 y 14:30 a 18:30 hrs',
    jornada: 'Lunes a Sábado • Mañana: 08:30-12:30 | Tarde: 14:30-18:30',
    modality: 'Presencial y Práctica en Terreno',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (2 cuotas de 50%)',
    priceDetail: 'Facilidad de pago: 2 cuotas de 50% ($70.000 c/u) • Examen Oficial SPD / OS-10',
    disponible: true,
    cupos: 30,
    fecha_inicio: '14 de Octubre, 2026',
    fecha_termino: '20 de Noviembre, 2026',
    badgeText: 'Credencial OS-10 SPD',
    highlight: 'Iniciación Obligatoria',
    image: securityGuardsImg,
    description: 'Programa oficial exigido por la Ley 21.659. Prepara al alumno en legislación de seguridad privada, primeros auxilios, defensa personal y preparación para el examen ante la Autoridad Fiscalizadora.',
    requisitos: [
      'Cédula de Identidad chilena vigente (ambos lados). Extranjeros: Permanencia Definitiva en Chile.',
      'Tener 18 años cumplidos al momento de la matrícula.',
      'Certificado de Estudios: Licencia de Enseñanza Media completa (4° Medio rendido) validada por Mineduc.',
      'Certificado de Antecedentes para Fines Especiales (sin condenas por crímenes, simples delitos ni causas por Violencia Intrafamiliar - VIF).',
      'Certificado Médico de Aptitud Física emitido por médico cirujano (inscrito en la Superintendencia de Salud).',
      'Certificado Psicológico de Aptitud Mental (evaluación psicotécnica emitida por psicólogo habilitado).',
      'Declaración jurada de idoneidad cívica y no haber sido sancionado por la Ley de Seguridad del Estado.'
    ]
  },
  {
    id: 'seg-02',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación de vigilantes privados',
    duration: '106 Horas Cronológicas',
    dias: '15 días hábiles',
    horario: '08:30 a 13:00 y 14:30 a 17:30 hrs',
    jornada: 'Lunes a Viernes • Incluye Polígono de Tiro',
    modality: 'Presencial con Instrucción de Tiro',
    permitePresencial: true,
    permiteVirtual: false,
    price: '$190.000 CLP',
    depositPrice: '$95.000 CLP (50%)',
    priceDetail: 'Instrucción con Porte de Armas Regulado',
    disponible: true,
    cupos: 15,
    fecha_inicio: '21 de Octubre, 2026',
    fecha_termino: '04 de Diciembre, 2026',
    badgeText: 'Alta Seguridad & Armamento',
    highlight: 'Banca & Valores',
    image: securitySupervisorImg,
    description: 'Instrucción especializada para entidades bancarias, transporte de caudales y recintos estratégicos de alto riesgo, con polígono de tiro y protocolos de defensa armada.',
    requisitos: [
      'Cédula de Identidad chilena vigente (nacionalidad chilena o permanencia definitiva según normativa).',
      'Tener 21 años cumplidos al inicio de la instrucción.',
      'Situación Militar al día (Certificado de cumplimiento de Servicio Militar o exención legal).',
      'Licencia de Educación Media completa (4° Medio rendido y aprobado por Mineduc).',
      'Certificado de Antecedentes para Fines Especiales intachable (sin condenas ni formalizaciones vigentes).',
      'Evaluación Psiquiátrica y Psicotécnica rigurosa para Porte y Uso de Armas de Fuego.',
      'Certificado Médico de Aptitud Física compatible con instrucción de tiro y esfuerzo.',
      'Informe Comercial (Boletín Comercial / Dicom) sin morosidades ni protestos graves vigentes.'
    ]
  },
  {
    id: 'seg-03',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación de guardia de seguridad marítimo portuario',
    duration: '90 Horas Cronológicas',
    dias: '12 días',
    horario: '08:30 a 12:30 y 14:30 a 16:30 hrs',
    jornada: 'Lunes a Sábado • Práctica en Terminales Portuarios',
    modality: 'Presencial / Recintos Portuarios',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$130.000 CLP',
    depositPrice: '$65.000 CLP (50%)',
    priceDetail: 'Código PBIP y Directemar',
    disponible: true,
    cupos: 20,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '27 de Noviembre, 2026',
    badgeText: 'Acreditación Directemar',
    highlight: 'Puertos del Norte',
    image: portImg,
    description: 'Instrucción en resguardo y control de accesos en muelles, terminales marítimos y recintos portuarios de la Macro Zona Norte bajo las directivas de la Autoridad Marítima.',
    requisitos: [
      'Cédula de Identidad chilena vigente (o Permanencia Definitiva).',
      'Mayor de 18 años.',
      'Licencia de Enseñanza Media completa acreditada por Mineduc.',
      'Certificado de Antecedentes para Fines Especiales limpio.',
      'Examen Médico de Aptitud Física compatible con faenas marítimo-portuarias y borde costero.',
      'Evaluación psicológica de idoneidad y control de impulsos.',
      'Cumplimiento de estándares del Código Internacional PBIP / Autoridad Marítima (Directemar).'
    ]
  },
  {
    id: 'seg-04',
    school: 'seguridad',
    category: 'Formación Inicial',
    title: 'Formación para porteros, nocheros, rondines u otro de similar carácter',
    duration: '50 Horas',
    dias: '8 días hábiles',
    horario: '09:00 a 13:00 hrs o Vespertino 18:00 a 21:30 hrs',
    jornada: 'Lunes a Viernes • Turnos Flexibles Diurno o Vespertino',
    modality: 'Online Asíncrono + Prácticas',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    priceDetail: 'Acreditación SENCE & Certificación OTEC',
    disponible: true,
    cupos: 25,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Noviembre, 2026',
    badgeText: 'Control de Accesos',
    highlight: 'Rápida Inserción',
    image: conflictImg,
    description: 'Manejo de libro de novedades, rondas nocturnas perimetrales, control de accesos peatonales y vehiculares, y protocolos ante emergencias en condominios y empresas.',
    requisitos: [
      'Cédula de Identidad chilena vigente (o Permanencia Definitiva).',
      'Mayor de 18 años.',
      'Certificado de Educación Básica completa o Enseñanza Media.',
      'Certificado de Antecedentes para Fines Especiales sin condenas penales vigentes.',
      'Salud compatible con funciones de control de acceso y rondas en condominios residenciales.'
    ]
  },

  // --- PERFECCIONAMIENTO ---
  {
    id: 'seg-05',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    title: 'Perfeccionamiento de guardias de seguridad',
    duration: '36 Horas Cronológicas',
    dias: '5 días hábiles intensivos',
    horario: '08:30 a 13:00 y 14:30 a 17:00 hrs',
    jornada: 'Lunes a Viernes • Reentrenamiento Trienal',
    modality: 'Semipresencial (Reentrenamiento Trienal)',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    priceDetail: 'Revalidación Oficial Trienal SPD',
    disponible: true,
    cupos: 35,
    fecha_inicio: '12 de Octubre, 2026',
    fecha_termino: '05 de Noviembre, 2026',
    badgeText: 'Renovación Trienal',
    highlight: 'Revalidación Rápida',
    image: securityGuardsImg,
    description: 'Actualización jurídica de la Ley 21.659, reentrenamiento físico, primeros auxilios actualizados y preparación inmediata para renovar la credencial oficial ante la SPD.',
    requisitos: [
      'Copia de Tarjeta / Credencial OS-10 anterior (vencida o próxima a expirar).',
      'Cédula de Identidad chilena vigente.',
      'Certificado de Antecedentes para Fines Especiales al día y sin anotaciones.',
      'Certificado Médico y Psicológico de aptitud física y mental renovado.',
      'Certificado de Enseñanza Media rendida (o registro previo validado ante Carabineros OS-10).'
    ]
  },
  {
    id: 'seg-06',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    title: 'Perfeccionamiento de guardia de seguridad marítimo portuario',
    duration: '40 Horas Cronológicas',
    dias: '6 días hábiles',
    horario: '08:30 a 13:00 y 14:30 a 16:30 hrs',
    jornada: 'Lunes a Sábado • Revalidación Directemar',
    modality: 'Presencial / Código PBIP',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$100.000 CLP',
    depositPrice: '$50.000 CLP (50%)',
    priceDetail: 'Revalidación Directemar',
    disponible: true,
    cupos: 20,
    fecha_inicio: '20 de Octubre, 2026',
    fecha_termino: '10 de Noviembre, 2026',
    badgeText: 'Actualización Portuaria',
    highlight: 'Terminales TPA',
    image: portImg,
    description: 'Revisión y actualización de protocolos de inspección de naves, verificación de contenedores y resguardo de faenas portuarias para guardias con vigencia por expirar.',
    requisitos: [
      'Copia de Credencial Marítima Portuaria previa Directemar.',
      'Cédula de Identidad chilena vigente.',
      'Certificado de Antecedentes para Fines Especiales limpio.',
      'Examen de salud ocupacional vigente para faenas en recintos portuarios.'
    ]
  },
  {
    id: 'seg-07',
    school: 'seguridad',
    category: 'Perfeccionamiento',
    title: 'Perfeccionamiento para porteros, nocheros, rondines u otro de similar carácter',
    duration: '30 Horas',
    dias: '4 días hábiles',
    horario: 'Vespertino 18:30 a 21:45 hrs o Intensivo Sábados 08:30 a 16:30 hrs',
    jornada: 'Vespertino o Sábados Intensivos',
    modality: 'Online Flexible',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$75.000 CLP',
    depositPrice: '$37.500 CLP (50%)',
    priceDetail: 'Certificación OTEC Continua',
    disponible: true,
    cupos: 25,
    fecha_inicio: '16 de Octubre, 2026',
    fecha_termino: '06 de Noviembre, 2026',
    badgeText: 'Actualización Periódica',
    highlight: 'Flexibilidad de Turno',
    image: conflictImg,
    description: 'Reentrenamiento en técnicas preventivas, resolución de incidentes vecinales, ciberseguridad básica para conserjerías y primeros auxilios en recintos residenciales.',
    requisitos: [
      'Cédula de Identidad chilena vigente.',
      'Acreditación de experiencia previa en conserjería o certificado de curso anterior.',
      'Certificado de Antecedentes para Fines Especiales al día.'
    ]
  },

  // --- TECNOLOGÍA Y SISTEMAS DE SEGURIDAD (CURSOS DE ESPECIALIZACIÓN) ---
  {
    id: 'seg-08',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    title: 'Técnicas de operación de circuitos cerrados de televisión (CCTV codificado por SENCE)',
    codigo_sence: 'CCTV-ALARM-09',
    duration: '60 Horas',
    dias: '10 días hábiles',
    horario: 'Diurno: 09:00 a 13:00 hrs | Vespertino: 18:00 a 21:30 hrs',
    jornada: 'Lunes a Viernes • Diurno o Vespertino',
    modality: 'Online Sincrónico + Software VMS',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (50%)',
    priceDetail: 'Codificación SENCE Oficial',
    disponible: false,
    proximamente: true,
    activo: true,
    cupos: 18,
    fecha_inicio: '19 de Octubre, 2026',
    fecha_termino: '28 de Noviembre, 2026',
    badgeText: 'CCTV SENCE',
    highlight: 'Especialización Tecnológica',
    image: cctvOperatorImg,
    description: 'Operación avanzada de software VMS, cámaras domo PTZ, reconocimiento de matrículas y rostros, resguardo de evidencia digital y trazabilidad forense para salas de control.',
    requisitos: [
      'Cédula de Identidad chilena vigente.',
      'Licencia de Enseñanza Media completa (requisito código SENCE).',
      'Certificado de Antecedentes sin observaciones penales.',
      'Manejo de usuario en computación y sistemas operativos Windows.'
    ]
  },
  {
    id: 'seg-10',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    title: 'Supervisor de seguridad privada',
    duration: '120 Horas Cronológicas',
    dias: '16 días hábiles',
    horario: 'Vespertino: 18:30 a 21:45 hrs y Sábados 09:00 a 14:00 hrs',
    jornada: 'Vespertino y Sábados • Compatible con Turnos de Trabajo',
    modality: '100% Online Aula Virtual',
    permitePresencial: true,
    permiteVirtual: true,
    price: '$180.000 CLP',
    depositPrice: '$90.000 CLP (50%)',
    priceDetail: 'Liderazgo & Directivas SPD',
    disponible: true,
    cupos: 20,
    fecha_inicio: '15 de Octubre, 2026',
    fecha_termino: '15 de Diciembre, 2026',
    badgeText: 'Rango de Jefatura',
    highlight: 'Gestión y Mando',
    image: securitySupervisorImg,
    description: 'Planificación de turnos y cuadrantes, confección de Directivas de Funcionamiento conforme a la Ley 21.659, supervisión operativa en terreno y liderazgo de equipos de guardias.',
    requisitos: [
      'Cédula de Identidad chilena vigente y mayor de 21 años.',
      'Licencia de Enseñanza Media completa (deseable título técnico o superior).',
      'Experiencia laboral comprobable en seguridad privada o funciones de mando en FF.AA. / Carabineros.',
      'Certificado de Antecedentes para Fines Especiales intachable.',
      'Currículum Vitae actualizado con referencias laborales.',
      'Evaluación psicológica de liderazgo, templanza y toma de decisiones.'
    ]
  }
];

const STORAGE_KEY = 'prevyseg_custom_courses_v5';

// Helper robusto para comparar si dos referencias de curso apuntan al mismo curso académico
export function coursesMatch(a, b) {
  if (!a || !b) return false;
  const idA = (a.id || '').toString().toLowerCase().trim();
  const idB = (b.id || '').toString().toLowerCase().trim();
  if (idA && idB && idA === idB) return true;

  const codeA = (a.codigo_sence || a.code || a.idSence || a.nombreCorto || '').toString().toLowerCase().trim();
  const codeB = (b.codigo_sence || b.code || b.idSence || b.nombreCorto || '').toString().toLowerCase().trim();
  if (codeA && codeB && codeA === codeB) return true;

  const titleA = (a.title || a.titulo || a.nombreCompleto || '').toLowerCase().trim();
  const titleB = (b.title || b.titulo || b.nombreCompleto || '').toLowerCase().trim();
  if (titleA && titleB && titleA === titleB) return true;

  // Coincidencia semántica especializada para cursos de CCTV
  const isCctvA = titleA.includes('cctv') || titleA.includes('circuitos cerrados') || codeA.includes('cctv');
  const isCctvB = titleB.includes('cctv') || titleB.includes('circuitos cerrados') || codeB.includes('cctv');
  if (isCctvA && isCctvB) return true;

  return false;
}

// Helper oficial para obtener y verificar las modalidades de un curso
export function getCourseModalities(course) {
  if (!course) return { permitePresencial: true, permiteVirtual: true };
  const p = typeof course.permitePresencial === 'boolean' ? course.permitePresencial : true;
  const v = typeof course.permiteVirtual === 'boolean' ? course.permiteVirtual : true;
  if (!p && !v) return { permitePresencial: true, permiteVirtual: true };
  return { permitePresencial: p, permiteVirtual: v };
}

// Cargar cursos desde localStorage o fallback a los oficiales
export function getSavedCourses() {
  if (typeof window === 'undefined') return DEFAULT_COURSES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
      return DEFAULT_COURSES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
      return DEFAULT_COURSES;
    }

    // Merge con datos por defecto para preservar imágenes, modalidades y campos requeridos
    const mergedDefaults = DEFAULT_COURSES.map(defCourse => {
      const match = parsed.find(p => coursesMatch(p, defCourse));
      if (!match) return {
        ...defCourse,
        titulo: defCourse.title,
        activo: typeof defCourse.activo === 'boolean' ? defCourse.activo : true,
        permitePresencial: typeof defCourse.permitePresencial === 'boolean' ? defCourse.permitePresencial : true,
        permiteVirtual: typeof defCourse.permiteVirtual === 'boolean' ? defCourse.permiteVirtual : true,
      };
      return {
        ...defCourse,
        titulo: match.titulo || match.title || defCourse.title,
        activo: typeof match.activo === 'boolean' ? match.activo : (typeof defCourse.activo === 'boolean' ? defCourse.activo : true),
        disponible: typeof match.disponible === 'boolean' ? match.disponible : defCourse.disponible,
        proximamente: typeof match.proximamente === 'boolean' ? match.proximamente : Boolean(defCourse.proximamente),
        cupos: typeof match.cupos === 'number' ? match.cupos : (parseInt(match.cupos, 10) || defCourse.cupos),
        fecha_inicio: match.fecha_inicio || defCourse.fecha_inicio,
        fecha_termino: match.fecha_termino || defCourse.fecha_termino,
        duration: defCourse.duration,
        price: ((defCourse.id === 'of-05' && match.price === '$85.000 CLP') || (defCourse.id === 'seg-01')) ? defCourse.price : (match.price || defCourse.price),
        depositPrice: ((defCourse.id === 'of-05' && match.depositPrice === '$42.500 CLP (50%)') || (defCourse.id === 'seg-01')) ? defCourse.depositPrice : (match.depositPrice || defCourse.depositPrice),
        dias: (defCourse.id === 'seg-01') ? defCourse.dias : (defCourse.dias || match.dias),
        horario: (defCourse.id === 'seg-01') ? defCourse.horario : (defCourse.horario || match.horario),
        jornada: (defCourse.id === 'seg-01') ? defCourse.jornada : (defCourse.jornada || match.jornada),
        requisitos: defCourse.requisitos || match.requisitos || [],
        permitePresencial: typeof match.permitePresencial === 'boolean' 
          ? match.permitePresencial 
          : (typeof defCourse.permitePresencial === 'boolean' ? defCourse.permitePresencial : true),
        permiteVirtual: typeof match.permiteVirtual === 'boolean' 
          ? match.permiteVirtual 
          : (typeof defCourse.permiteVirtual === 'boolean' ? defCourse.permiteVirtual : true),
        school: match.school || defCourse.school,
        category: match.category || defCourse.category,
      };
    });

    // Cursos adicionales que no existían en DEFAULT_COURSES
    const extraCourses = parsed.filter(p => !DEFAULT_COURSES.some(d => coursesMatch(p, d)));
    return [...mergedDefaults, ...extraCourses];
  } catch (e) {
    console.error('Error al leer cursos de localStorage:', e);
    return DEFAULT_COURSES;
  }
}

// Guardar actualizaciones de un curso permanentemente en LocalStorage y Supabase PostgreSQL
export function updateCourseItem(courseId, updates) {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedCourses();
    let updatedTarget = null;
    let found = false;

    const updated = current.map(c => {
      const match = coursesMatch(c, { id: courseId, ...updates });
      if (match) {
        found = true;
        updatedTarget = { 
          ...c, 
          ...updates,
          titulo: updates.titulo || updates.title || c.titulo || c.title,
          title: updates.title || updates.titulo || c.title || c.titulo,
          activo: typeof updates.activo === 'boolean' ? updates.activo : (typeof c.activo === 'boolean' ? c.activo : true),
          proximamente: typeof updates.proximamente === 'boolean' ? updates.proximamente : Boolean(c.proximamente),
          disponible: typeof updates.disponible === 'boolean' ? updates.disponible : (updates.proximamente ? false : c.disponible),
          permitePresencial: typeof updates.permitePresencial === 'boolean' ? updates.permitePresencial : c.permitePresencial,
          permiteVirtual: typeof updates.permiteVirtual === 'boolean' ? updates.permiteVirtual : c.permiteVirtual,
          school: updates.school || c.school,
        };
        return updatedTarget;
      }
      return c;
    });

    if (!found && (updates.title || updates.titulo)) {
      const isCctv = (updates.title || updates.titulo || '').toLowerCase().includes('cctv');
      updatedTarget = {
        id: courseId || `course-${Date.now()}`,
        school: updates.school || 'seguridad',
        category: updates.category || 'Tecnología y Sistemas de Seguridad',
        title: updates.title || updates.titulo || 'Curso',
        titulo: updates.titulo || updates.title || 'Curso',
        duration: updates.duration || '60 Horas',
        modality: updates.modality || 'Online Sincrónico + Software VMS',
        permitePresencial: typeof updates.permitePresencial === 'boolean' ? updates.permitePresencial : true,
        permiteVirtual: typeof updates.permiteVirtual === 'boolean' ? updates.permiteVirtual : true,
        price: updates.price || '$140.000 CLP',
        depositPrice: updates.depositPrice || '$70.000 CLP (50%)',
        disponible: typeof updates.disponible === 'boolean' ? updates.disponible : !updates.proximamente,
        proximamente: Boolean(updates.proximamente),
        cupos: updates.cupos || 18,
        fecha_inicio: updates.fecha_inicio || '',
        fecha_termino: updates.fecha_termino || '',
        activo: updates.activo !== false,
        image: isCctv ? cctvOperatorImg : (updates.school === 'seguridad' ? securityGuardsImg : conflictImg),
        description: updates.description || ''
      };
      updated.push(updatedTarget);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('prevyseg-courses-updated', { detail: updated }));

    // Persistir asíncronamente en PostgreSQL en Supabase
    if (supabase) {
      const dbPayload = {};
      if (typeof updates.activo === 'boolean') {
        dbPayload.activo = updates.activo;
      }
      if (typeof updates.permitePresencial === 'boolean') {
        dbPayload.permite_presencial = updates.permitePresencial;
      }
      if (typeof updates.permiteVirtual === 'boolean') {
        dbPayload.permite_virtual = updates.permiteVirtual;
      }
      if (typeof updates.disponible === 'boolean') {
        dbPayload.disponible = updates.disponible;
      }
      if (typeof updates.proximamente === 'boolean') {
        dbPayload.proximamente = updates.proximamente;
      }
      if (typeof updates.cupos === 'number') {
        dbPayload.cupos = updates.cupos;
      }
      if (updates.fecha_inicio) {
        dbPayload.fecha_inicio = updates.fecha_inicio;
      }
      if (updates.fecha_termino) {
        dbPayload.fecha_termino = updates.fecha_termino;
      }

      if (Object.keys(dbPayload).length > 0) {
        const isUUID = typeof courseId === 'string' && courseId.length > 20 && courseId.includes('-');
        if (isUUID) {
          supabase.from('courses').update(dbPayload).eq('id', courseId).then(({ error }) => {
            if (error) console.warn('Error sincronizando curso con Supabase:', error);
          });
        }
        if (updatedTarget && (updatedTarget.title || updatedTarget.titulo)) {
          const targetTitle = updatedTarget.title || updatedTarget.titulo;
          supabase.from('courses').update(dbPayload).ilike('titulo', `%${targetTitle}%`).then(({ error }) => {
            if (error) console.warn('Error sincronizando curso con Supabase:', error);
          });
          if (targetTitle.toLowerCase().includes('cctv') || targetTitle.toLowerCase().includes('circuitos cerrados')) {
            supabase.from('courses').update(dbPayload).ilike('titulo', '%cctv%').catch(() => {});
            supabase.from('courses').update(dbPayload).ilike('titulo', '%circuitos cerrados%').catch(() => {});
          }
        }
      }
    }

    return updated;
  } catch (e) {
    console.error('Error guardando curso:', e);
  }
}

// Agregar un nuevo curso permanentemente en LocalStorage y Supabase
export function addNewCourse(courseData) {
  if (typeof window === 'undefined') return;
  try {
    const current = getSavedCourses();
    const newId = courseData.id || `course-${Date.now()}`;
    const isVirtualOnly = courseData.permiteVirtual && !courseData.permitePresencial;
    const isPresencialOnly = courseData.permitePresencial && !courseData.permiteVirtual;

    const newCourse = {
      id: newId,
      school: courseData.school || 'seguridad',
      category: courseData.category || (courseData.school === 'seguridad' ? 'Seguridad Privada' : 'Área General'),
      title: courseData.title || courseData.titulo || 'Nuevo Curso Capacitación',
      titulo: courseData.titulo || courseData.title || 'Nuevo Curso Capacitación',
      duration: courseData.duration || '40 Horas',
      modality: courseData.modality || (isVirtualOnly ? '100% Online Asíncrono' : isPresencialOnly ? 'Presencial en Sede' : 'Semipresencial'),
      permitePresencial: courseData.permitePresencial !== false,
      permiteVirtual: courseData.permiteVirtual !== false,
      price: courseData.price || '$120.000 CLP',
      depositPrice: courseData.depositPrice || '$60.000 CLP (50%)',
      disponible: courseData.disponible !== false,
      proximamente: Boolean(courseData.proximamente),
      cupos: Number(courseData.cupos) || 20,
      fecha_inicio: courseData.fecha_inicio || '15 de Noviembre, 2026',
      fecha_termino: courseData.fecha_termino || '15 de Diciembre, 2026',
      badgeText: courseData.badgeText || (isVirtualOnly ? '100% Online' : isPresencialOnly ? 'Presencial en Sede' : 'Online / Presencial'),
      highlight: courseData.highlight || 'Nuevo',
      image: courseData.image || (courseData.school === 'seguridad' ? DEFAULT_COURSES[0].image : DEFAULT_COURSES[10].image),
      description: courseData.description || 'Programa oficial de formación y capacitación técnica con certificación oficial OTEC PrevySeg.',
      requisitos: courseData.requisitos || [
        'Cédula de Identidad chilena vigente.',
        'Mayor de 18 años.'
      ],
      activo: true,
      ...courseData
    };

    const updated = [newCourse, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('prevyseg-courses-updated', { detail: updated }));

    // Persistir asíncronamente en Supabase si está disponible
    if (supabase) {
      supabase.from('courses').insert({
        id: newId,
        titulo: newCourse.title,
        school: newCourse.school,
        category: newCourse.category,
        modalidad: newCourse.modality,
        duracion: newCourse.duration,
        precio: parseFloat(String(newCourse.price).replace(/[^0-9]/g, '')) || 0,
        permite_presencial: newCourse.permitePresencial,
        permite_virtual: newCourse.permiteVirtual,
        disponible: newCourse.disponible,
        proximamente: newCourse.proximamente,
        cupos: newCourse.cupos,
        fecha_inicio: newCourse.fecha_inicio,
        fecha_termino: newCourse.fecha_termino,
        descripcion: newCourse.description,
        activo: true
      }).then(({ error }) => {
        if (error) console.warn('Aviso: inserción directa en tabla courses Supabase:', error.message);
      });
    }

    return updated;
  } catch (e) {
    console.error('Error creando nuevo curso:', e);
  }
}

// Sincronizar catálogo local con Supabase al iniciar la aplicación
export async function syncCoursesWithDatabase() {
  if (typeof window === 'undefined' || !supabase) return;
  try {
    const { data, error } = await supabase.from('courses').select('*');
    if (error || !data || data.length === 0) return;

    const current = getSavedCourses();
    let hasChanges = false;

    const merged = current.map(localCourse => {
      // Buscar todas las filas en BD que coincidan con este curso
      const matchingDbRows = data.filter(d => coursesMatch(localCourse, d));
      if (matchingDbRows.length === 0) return localCourse;

      // Priorizar la fila que esté activa y configurada como próximamente (ej. CCTV)
      const dbMatch = matchingDbRows.find(d => d.activo && d.proximamente) ||
                      matchingDbRows.find(d => d.activo) ||
                      matchingDbRows[0];

      const p = typeof dbMatch.permite_presencial === 'boolean' 
        ? dbMatch.permite_presencial 
        : localCourse.permitePresencial;
      const v = typeof dbMatch.permite_virtual === 'boolean' 
        ? dbMatch.permite_virtual 
        : localCourse.permiteVirtual;
      const prox = typeof dbMatch.proximamente === 'boolean' 
        ? dbMatch.proximamente 
        : localCourse.proximamente;
      const disp = typeof dbMatch.disponible === 'boolean' 
        ? dbMatch.disponible 
        : localCourse.disponible;
      const act = typeof dbMatch.activo === 'boolean'
        ? dbMatch.activo
        : (typeof localCourse.activo === 'boolean' ? localCourse.activo : true);

      if (p !== localCourse.permitePresencial || v !== localCourse.permiteVirtual || prox !== localCourse.proximamente || disp !== localCourse.disponible || act !== localCourse.activo) {
        hasChanges = true;
      }

      return {
        ...localCourse,
        titulo: localCourse.titulo || localCourse.title || dbMatch.titulo,
        activo: act,
        permitePresencial: p !== undefined ? p : true,
        permiteVirtual: v !== undefined ? v : true,
        proximamente: prox !== undefined ? prox : false,
        disponible: disp !== undefined ? disp : true,
        cupos: typeof dbMatch.cupos === 'number' ? dbMatch.cupos : localCourse.cupos,
        fecha_inicio: dbMatch.fecha_inicio || localCourse.fecha_inicio,
        fecha_termino: dbMatch.fecha_termino || localCourse.fecha_termino,
      };
    });

    if (hasChanges) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      window.dispatchEvent(new CustomEvent('prevyseg-courses-updated', { detail: merged }));
    }
    return merged;
  } catch (e) {
    console.warn('Error en syncCoursesWithDatabase:', e);
  }
}

// Iniciar sincronización en segundo plano automáticamente en el navegador
if (typeof window !== 'undefined') {
  syncCoursesWithDatabase();
}

// Restablecer valores de fábrica
export function resetCoursesToDefault() {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_COURSES));
    window.dispatchEvent(new CustomEvent('prevyseg-courses-updated', { detail: DEFAULT_COURSES }));
    return DEFAULT_COURSES;
  } catch (e) {
    console.error('Error al resetear cursos:', e);
  }
}
