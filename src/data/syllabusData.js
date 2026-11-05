export const UNIFIED_TEACHERS_TEAM = [
  {
    area: "Legislación · Administración · Ética",
    nombre: "Ignacio Mamani N.",
    cargo: "Relator",
    resena: "Abogado, UTA — Diplomado Gestión de Seguridad Privada 440 hrs — Acreditado OS-10.",
    name: "Ignacio Mamani N.",
    role: "Relator • Legislación, Administración y Ética",
    badge: "Acreditado OS-10",
    credentials: "Abogado UTA • Diplomado Gestión de Seguridad Privada 440 hrs",
    bio: "Abogado, UTA — Diplomado Gestión de Seguridad Privada 440 hrs — Acreditado OS-10."
  },
  {
    area: "Prevención · Instalaciones · Ética",
    nombre: "Marlon Vargas C.",
    cargo: "Relator",
    resena: "Ing. en Prevención de Riesgos — Diplomado Gestión SP 440 hrs UTEM — Acreditado OS-10.",
    name: "Marlon Vargas C.",
    role: "Relator • Prevención, Instalaciones y Ética",
    badge: "Acreditado OS-10",
    credentials: "Ing. Prevención de Riesgos • Diplomado Gestión SP UTEM",
    bio: "Ing. en Prevención de Riesgos — Diplomado Gestión SP 440 hrs UTEM — Acreditado OS-10."
  },
  {
    area: "Prevención · Emergencias · Instalaciones",
    nombre: "Patricio Melgarejo A.",
    cargo: "Relator",
    resena: "Ing. de Ejecución en Prevención de Riesgos — Acreditado OS-10.",
    name: "Ing. Patricio Melgarejo A.",
    role: "Relator • Prevención, Emergencias e Instalaciones",
    badge: "Acreditado OS-10",
    credentials: "Ing. de Ejecución en Prevención de Riesgos • Registro SNS",
    bio: "Ing. de Ejecución en Prevención de Riesgos — Acreditado OS-10."
  },
  {
    area: "Primeros Auxilios · Emergencias",
    nombre: "Marcos Gallardo Saes",
    cargo: "Relator",
    resena: "Técnico Nivel Superior de Enfermería — Especializado en Primeros Auxilios y Emergencias.",
    name: "Marcos Gallardo Saes",
    role: "Relator • Primeros Auxilios y Emergencias",
    badge: "TNS Enfermería",
    credentials: "Técnico Nivel Superior de Enfermería • Especialista en Urgencias",
    bio: "Técnico Nivel Superior de Enfermería — Especializado en Primeros Auxilios y Emergencias."
  },
  {
    area: "Sistemas Alarmas · Telecomunicaciones",
    nombre: "Ricardo Rocha Á.",
    cargo: "Relator",
    resena: "Ing. en Ejecución Electrónica, UTA — Acreditado OS-10.",
    name: "Ricardo Rocha Á.",
    role: "Relator • Sistemas de Alarmas y Telecomunicaciones",
    badge: "Acreditado OS-10",
    credentials: "Ing. en Ejecución Electrónica, Universidad de Tarapacá",
    bio: "Ing. en Ejecución Electrónica, UTA — Acreditado OS-10."
  }
];

// =========================================================================
// PROGRAMAS Y TEMARIOS OFICIALES DETALLADOS DE PREVYSEG 2026
// Malla Curricular Estandarizada para los Cursos de Seguridad y Oficios
// Incorpora: Resumen, Objetivos, Requisitos, Temario, Profesores, Bibliografía y Video RRSS.
// =========================================================================

export const SYLLABUS_DETAILS = {
  // =======================================================================
  // 1. ESCUELA DE SEGURIDAD PRIVADA (LEY N° 21.659 / SUBSECRETARÍA DE PREVENCIÓN DEL DELITO / OS-10)
  // =======================================================================

  'seg-01': {
    subtitle: 'Curso de Formación de Guardias de Seguridad (Ley N° 21.659 / SPD / OS-10)',
    summary: 'Programa oficial de formación integral habilitante para desempeñarse como Guardia de Seguridad en todo el territorio nacional, acreditado bajo el nuevo marco de la Ley N° 21.659 de Seguridad Privada, regulado por la Subsecretaría de Prevención del Delito (SPD) y Carabineros de Chile OS-10.',
    objective: 'Capacitar y habilitar al alumno con las competencias operativas, tácticas, jurídicas y de primeros auxilios exigidas por la Ley 21.659 para resguardar personas, instalaciones y bienes patrimoniales.',
    specificObjectives: [
      'Dominar el marco legal, derechos humanos y facultades del guardia de seguridad según la Ley 21.659.',
      'Aplicar técnicas de control de accesos, seguridad de instalaciones y telecomunicaciones.',
      'Ejecutar protocolos de primeros auxilios y correcto uso de elementos defensivos y de protección.',
      'Desarrollar acondicionamiento físico y técnicas de reducción sin daño físico.'
    ],
    schedule: 'Jornadas: Mañana (08:30 a 12:30) y Tarde (14:30 a 19:00), Lunes a Sábado • Sede: Blanco Encalada #666, Arica + Aula Virtual',
    durationDetail: '90 horas cronológicas (60 hrs teóricas / 30 hrs prácticas)',
    totalHours: 90,
    weeks: '2 semanas',
    classesCount: '12 jornadas intensivas',
    nextDate: '19/10/2026',
    modality: 'Presencial Teórico-Práctica (Blanco Encalada #666, Arica + Aula Virtual)',
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (2 cuotas de 50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas de $70.000 c/u',
    certification: 'Certificado oficial OTEC PrevySeg para Examen OS-10 y Credencial digital SPD por 4 años',
    requirements: [
      'Ser mayor de 18 años de edad cumplidos.',
      'Haber aprobado la educación media o su equivalente (certificado Mineduc).',
      'No haber sido condenado ni encontrarse formalizado por crimen o simple delito.',
      'No haber dejado de pertenecer a las FFAA, de Orden o Gendarmería por sanciones disciplinarias.',
      'No haber sido sancionado conforme a la Ley de Violencia Intrafamiliar (VIF).',
      'Poseer idoneidad física y psíquica compatible con la función (certificados médico y psicológico vigentes).',
      'Cumplir con los requisitos del Art. 46 (excepto numeral 11) y Art. 25 numerales 1 y 3 de la Ley N° 21.659.'
    ],
    modules: [
      { number: '01', title: 'Legislación aplicada a la seguridad privada', hours: '22h T', topics: ['Ley N° 21.659 de Seguridad Privada', 'Subsecretaría de Prevención del Delito (SPD)', 'Derechos constitucionales y Código Procesal Penal', 'Responsabilidades civiles y penales'] },
      { number: '02', title: 'Respeto y promoción de los derechos humanos', hours: '2h T', topics: ['Estándares internacionales de DDHH', 'Trato digno y garantías fundamentales'] },
      { number: '03', title: 'Probidad, no discriminación y perspectiva de género', hours: '2h T', topics: ['Principios de probidad pública y privada', 'Enfoque de género y no discriminación arbitraria'] },
      { number: '04', title: 'Privacidad y uso de datos personales', hours: '2h T', topics: ['Protección de datos sensibles y registros', 'Límites normativos en el control de accesos'] },
      { number: '05', title: 'Prevención de riesgos', hours: '9h T / 5h P', topics: ['Identificación de peligros y evaluación de riesgos', 'Planes de emergencia, evacuación y control de incendios', 'Uso táctico de extintores portátiles'] },
      { number: '06', title: 'Seguridad de instalaciones', hours: '14h T', topics: ['Protección física de recintos e infraestructura crítica', 'Control perimetral y procedimientos de inspección', 'Libro de novedades y partes de novedades'] },
      { number: '07', title: 'Seguridad electrónica', hours: '2h T / 2h P', topics: ['Sistemas de CCTV, sensores perimetrales y alarmas', 'Operación de paneles de intrusión y videovigilancia'] },
      { number: '08', title: 'Sistema de telecomunicaciones', hours: '1h T / 1h P', topics: ['Protocolos de radiocomunicaciones y claves oficiales', 'Enlace directo con Carabineros de Chile y emergencias'] },
      { number: '09', title: 'Instrucción física', hours: '6h P', topics: ['Acondicionamiento físico general', 'Resistencia aeróbica y movilidad articular adaptada'] },
      { number: '10', title: 'Correcto uso de elementos defensivos y de protección', hours: '2h T / 4h P', topics: ['Uso táctico de bastón defensivo (luma) y chaleco anticorte', 'Principios de proporcionalidad y legítima defensa'] },
      { number: '11', title: 'Primeros auxilios', hours: '2h T / 4h P', topics: ['Soporte vital básico (SVB) y maniobras RCP', 'Uso del Desfibrilador Externo Automático (DEA)', 'Control de hemorragias, quemaduras e inmovilización'] },
      { number: '12', title: 'Técnicas de reducción', hours: '2h T / 8h P', topics: ['Técnicas de sujeción, retención y conducción sin daño', 'Desescalamiento físico de agresiones y control no letal'] }
    ],
    teachers: UNIFIED_TEACHERS_TEAM,
    bibliography: [
      'Ley N° 21.659 sobre Seguridad Privada en Chile.',
      'Decreto Supremo N° 867/2017 y Manual Operativo OS-10.',
      'Manual Oficial de Doctrina y Procedimientos para Guardias de Seguridad (OS-10 Carabineros).',
      'Código Procesal Penal: Normas de flagrancia y retención ciudadana (Art. 129 y 130).'
    ]
  },

  'seg-02': {
    subtitle: 'Formación de Vigilantes Privados (100 Horas Cronológicas)',
    summary: 'Programa especializado semipresencial de 100 horas para personal destinado a entidades bancarias, transporte de valores, puertos y recintos estratégicos. Teoría 100% online en Aula Virtual (para Arica, Iquique o Antofagasta) y práctica presencial en Arica.',
    objective: 'Preparar vigilantes privados con la destreza táctica, jurídica, física y de armamento requerida para el resguardo de entidades obligadas bajo la normativa vigente.',
    specificObjectives: [
      'Dominar el marco legal y de tiro defensivo regulado para entidades de alto riesgo.',
      'Ejecutar acondicionamiento físico, primeros auxilios y técnicas de reducción táctica.',
      'Aplicar procedimientos de seguridad bancaria, custodia de remesas y transporte de valores.'
    ],
    schedule: 'Teoría 100% Online en Aula Virtual 24/7 (Arica, Iquique, Antofagasta) • Práctica presencial en Arica',
    durationDetail: '100 horas cronológicas (Semipresencial)',
    totalHours: 100,
    weeks: '3 semanas',
    classesCount: 'Teoría Online + Jornadas Prácticas en Arica',
    nextDate: '26/10/2026',
    modality: 'Semipresencial (Teoría 100% online en Aula Virtual / Práctica presencial en Arica)',
    price: null,
    depositPrice: null,
    paymentFacility: 'Consultar valor y cupos por WhatsApp',
    consultByWhatsappOnly: true,
    legalNotice: 'Al aprobar el curso se otorga Certificado de Capacitación oficial. No se entrega credencial debido a la normativa vigente sobre porte de armas.',
    certification: 'Certificado de Capacitación Oficial OTEC PrevySeg. No se entrega credencial debido a la normativa vigente sobre porte de armas.',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Tener 21 años cumplidos al inicio de la instrucción.',
      'Situación Militar al día (cumplido o exención legal).',
      'Licencia de Educación Media completa validada por Mineduc.',
      'Certificado de Antecedentes para Fines Especiales intachable.',
      'Evaluación psiquiátrica y psicotécnica rigurosa para uso de armamento.',
      'Certificado médico de aptitud física compatible.',
      'Aviso legal obligatorio: Al aprobar el curso se otorga Certificado de Capacitación oficial. No se entrega credencial debido a la normativa vigente sobre porte de armas.'
    ],
    modules: [
      { number: '01', title: 'Marco Legal del Vigilante Privado y Entidades Obligadas', topics: ['Normativa OS-10, DS 867 y responsabilidades jurídicas', 'Legítima defensa privilegiada en recintos de seguridad'] },
      { number: '02', title: 'Acondicionamiento Físico y Táctico', topics: ['Resistencia física y capacidad de reacción inmediata', 'Desplazamiento táctico y cobertura en situaciones de crisis'] },
      { number: '03', title: 'Elementos Defensivos y Técnicas de Reducción', topics: ['Uso proporcional de elementos defensivos', 'Técnicas de sujeción, desarme y retención sin daño letal'] },
      { number: '04', title: 'Primeros Auxilios y Control de Hemorragias Tácticas', topics: ['Soporte vital básico y atención en zonas de riesgo', 'Torniquetes y apósitos hemostáticos ante heridas por proyectil'] },
      { number: '05', title: 'Conocimientos de Arma y Tiro Práctico', topics: ['Medidas de seguridad en la manipulación y porte de armas', 'Prácticas de polígono de tiro y precisión de combate'] }
    ],
    teachers: UNIFIED_TEACHERS_TEAM,
    bibliography: [
      'Decreto Ley N° 3.607 sobre Vigilantes Privados y normativas complementarias.',
      'Decreto Supremo N° 867/2017: Reglamento de Seguridad Privada.',
      'Manual Operativo de Armamento y Tiro de la Autoridad Fiscalizadora.'
    ]
  },

  'seg-03': {
    subtitle: 'Formación Guardia Marítimo Portuario (Directemar PBIP)',
    summary: 'Instrucción técnica especializada para el resguardo de terminales portuarios, muelles y naves mercantes bajo las disposiciones de la Dirección General del Territorio Marítimo y Marina Mercante (Directemar) y el Código Internacional PBIP.',
    objective: 'Capacitar personal de seguridad para la vigilancia marítimo-portuaria y la prevención de actos ilícitos en instalaciones costeras y naves de bandera nacional e internacional.',
    specificObjectives: [
      'Interpretar y aplicar las normas de seguridad del Código PBIP (ISPS Code).',
      'Ejecutar controles de acceso a zonas restringidas de recintos portuarios.',
      'Gestionar emergencias con mercancías peligrosas marítimas (Código IMDG).'
    ],
    schedule: '12 días hábiles • 08:30 a 12:30 y 14:30 a 16:30 hrs',
    durationDetail: '90 horas cronológicas reglamentadas por Directemar',
    totalHours: 90,
    weeks: '2 semanas',
    classesCount: '12 jornadas',
    nextDate: '19/10/2026',
    modality: 'Presencial Portuaria',
    price: '$160.000 CLP',
    depositPrice: '$80.000 CLP (50%)',
    paymentFacility: '2 cuotas del 50% ($80.000 c/u)',
    certification: 'Certificado de Aprobación OTEC PrevySeg habilitante para examen ante la Capitanía de Puerto',
    requirements: [
      'Mayor de 18 años y nacionalidad chilena o permanencia definitiva.',
      'Licencia de Enseñanza Media completa.',
      'Certificado de antecedentes intachable.',
      'Examen de aptitud física y psicológico compatible con faenas portuarias.'
    ],
    modules: [
      { number: '01', title: 'Legislación Marítima y Código PBIP/ISPS', topics: ['Convenio SOLAS', 'Niveles de protección 1, 2 y 3', 'Planes de protección de la instalación portuaria (PPIP)'] },
      { number: '02', title: 'Seguridad en Muelles y Control de Cargas IMDG', topics: ['Inspección vehicular y contenedores', 'Mercancías peligrosas', 'Prevención de contaminación marina'] },
      { number: '03', title: 'Primeros Auxilios Marítimos y Rescate en Borde Costero', topics: ['Hipotermia y ahogamiento', 'Uso de chalecos salvavidas y equipos náuticos'] }
    ],
    teachers: [
      {
        name: 'Oficial de Marina (R) Rodrigo Cisternas Vega',
        role: 'Relator Experto en Protección Portuaria PBIP',
        credentials: 'Oficial de Protección de la Instalación Portuaria (OPIP) Acreditado Directemar',
        badge: 'OPIP Directemar',
        bio: 'Especialista en seguridad portuaria internacional con 18 años de servicio en la Armada de Chile y jefaturas de seguridad en terminales marítimos de Arica.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ing. Patricio Melgarejo Aranibar',
        role: 'Relator Acreditado OS-10 • Prevención de Riesgos Portuarios y Emergencias Químicas',
        credentials: 'Prefectura Carabineros Arica N° 1 • Aut. N° 010103030013 • Registro Experto SNS N° AC/P 826',
        badge: 'Acreditado OS-10',
        areas: ['Prevención de Riesgos', 'Control de Emergencias', 'Protección de Instalaciones'],
        bio: 'Ingeniero en Prevención de Riesgos (U. Arturo Prat) y Experto SNS N° AC/P 826. Relator de la Mutual de Seguridad e Instructor de la Academia Nacional de Bomberos especializado en emergencias químicas, materiales peligrosos (IMDG) y seguridad en recintos portuarios.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Código Internacional para la Protección de los Buques y de las Instalaciones Portuarias (Código PBIP/ISPS).',
      'Decreto Ley N° 2.222: Ley de Navegación de la República de Chile.',
      'Código Marítimo Internacional de Mercancías Peligrosas (Código IMDG).'
    ]
  },

  'seg-04': {
    subtitle: 'Formación para Porteros, Nocheros y Rondines',
    summary: 'Capacitación orientada a conserjes de condominios, porteros y recepcionistas para formalizar sus funciones de resguardo y seguridad preventiva bajo el nuevo marco de la Ley 21.659, evitando multas para las comunidades.',
    objective: 'Dotar al personal de conserjería de herramientas preventivas de control de accesos, manejo de libros de novedades y respuesta ante emergencias en edificios residenciales.',
    specificObjectives: ['Aplicar técnicas de control de visitas y vehículos en accesos peatonales y vehiculares.', 'Reaccionar coordinadamente ante amagos de incendio y emergencias médicas en condominios.'],
    schedule: '8 días hábiles • Diurno o Vespertino',
    durationDetail: '32 horas cronológicas',
    totalHours: 32,
    weeks: '1.5 semanas',
    classesCount: '8 jornadas',
    nextDate: '19/10/2026',
    modality: 'Presencial o Semipresencial',
    price: '$75.000 CLP',
    depositPrice: '$37.500 CLP (50%)',
    paymentFacility: '2 cuotas de $37.500 CLP',
    certification: 'Certificado Oficial OTEC PrevySeg con acreditación de competencias',
    requirements: ['Cédula de Identidad chilena vigente.', 'Mayor de 18 años.', 'Antecedentes para fines especiales sin condenas.'],
    modules: [
      { number: '01', title: 'Marco Regulatorio y Rol del Nochero/Conserje', topics: ['Límites legales y Ley de Copropiedad Inmobiliaria', 'Responsabilidades en el turno'] },
      { number: '02', title: 'Control de Accesos y Manejo de Emergencias', topics: ['Sistemas de citofonía y bitácoras', 'Evacuación y red húmeda en edificios'] }
    ],
    teachers: [
      {
        name: 'Marco Antonio Gallardo Sáez',
        role: 'Relator Acreditado OS-10 • Primeros Auxilios y Ética en Servicios',
        credentials: 'Prefectura Carabineros Arica N° 1 • Res. Exenta N° 136 (Vigencia 2028)',
        badge: 'Acreditado OS-10',
        areas: ['Primeros Auxilios', 'Valores y Ética', 'Administración de Seguridad'],
        bio: 'Capacitador acreditado OS-10 en Primeros Auxilios, Administración y Ética. Técnico de Nivel Superior en Enfermería (CFT Tarapacá) y especialización en Ética Laboral por la Pontificia Universidad Católica de Chile.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ing. Patricio Melgarejo Aranibar',
        role: 'Relator Acreditado OS-10 • Prevención de Riesgos y Control de Incendios en Edificios',
        credentials: 'Prefectura Carabineros Arica N° 1 • Aut. N° 010103030013 • Registro Experto SNS N° AC/P 826',
        badge: 'Acreditado OS-10',
        areas: ['Control de Emergencias', 'Protección de Instalaciones', 'Prevención de Riesgos'],
        bio: 'Ingeniero en Prevención de Riesgos e Instructor de Bomberos. Capacitador acreditado OS-10 en manejo de redes húmedas, planes de evacuación comunitaria y protección de accesos residenciales.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: ['Ley N° 21.442 de Copropiedad Inmobiliaria.', 'Ley N° 21.659 de Seguridad Privada.']
  },

  'seg-05': {
    subtitle: 'Perfeccionamiento de Guardias de Seguridad (Renovación OS-10)',
    summary: 'Curso obligatorio de actualización normativa, táctica y de primeros auxilios para guardias que cuentan con credencial vigente o por vencer, adaptando sus competencias a la nueva Ley 21.659 para renovar por 4 años.',
    objective: 'Actualizar las competencias de los guardias de seguridad en servicio activo bajo los estándares de la Subsecretaría de Prevención del Delito.',
    specificObjectives: ['Actualizar conocimientos en la nueva Ley 21.659 y derechos humanos.', 'Reentrenar destrezas en primeros auxilios y control de multitudes.'],
    schedule: '5 días hábiles intensivos • 08:30 a 13:00 y 14:30 a 17:00 hrs',
    durationDetail: '36 horas cronológicas de actualización',
    totalHours: 36,
    weeks: '1 semana',
    classesCount: '5 jornadas',
    nextDate: '26/10/2026',
    modality: 'Presencial Intensivo',
    price: '$85.000 CLP',
    depositPrice: '$42.500 CLP (50%)',
    paymentFacility: '2 cuotas de $42.500 CLP',
    certification: 'Certificado de Perfeccionamiento para Renovación de Credencial Digital SPD/OS-10',
    requirements: ['Cédula de Identidad chilena vigente.', 'Certificado del curso anterior de guardia o credencial vencida/por vencer.', 'Certificado de antecedentes intachable.'],
    modules: [
      { number: '01', title: 'Actualización Jurídica Ley 21.659', topics: ['Modificaciones respecto al DL 3.607', 'Nuevo régimen sancionatorio'] },
      { number: '02', title: 'Reentrenamiento Táctico Operativo', topics: ['Procedimientos en retail y grandes tiendas', 'Manejo de crisis'] }
    ],
    teachers: [
      {
        name: 'Marco Antonio Gallardo Sáez',
        role: 'Relator Acreditado OS-10 • Actualización Primeros Auxilios y Deontología',
        credentials: 'Prefectura Carabineros Arica N° 1 • Res. Exenta N° 136 / Aut. N° 016 (Vigencia 2028)',
        badge: 'Acreditado OS-10',
        areas: ['Primeros Auxilios', 'Administración de Seguridad', 'Valores y Ética'],
        bio: 'Capacitador oficial de Carabineros de Chile (OS-10 Prefectura Arica N° 1, Res. Exenta N° 136). Especialista en reentrenamiento de soporte vital, administración de seguridad privada y actualización deontológica.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ing. Patricio Melgarejo Aranibar',
        role: 'Relator Acreditado OS-10 • Reentrenamiento en Prevención y Emergencias',
        credentials: 'Prefectura Carabineros Arica N° 1 • Aut. N° 010103030013 • Registro Experto SNS N° AC/P 826',
        badge: 'Acreditado OS-10',
        areas: ['Prevención de Riesgos', 'Control de Emergencias', 'Protección de Instalaciones'],
        bio: 'Ingeniero en Prevención de Riesgos (U. Arturo Prat) y Experto SNS N° AC/P 826. Relator acreditado OS-10 para la actualización de protocolos de evacuación, planes de emergencia y prevención ante la nueva Ley 21.659.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: ['Ley N° 21.659 de Seguridad Privada.', 'Manual de Perfeccionamiento OS-10 Carabineros.']
  },

  'seg-06': {
    subtitle: 'Perfeccionamiento de Guardia de Seguridad Marítimo Portuario',
    summary: 'Actualización periódica para guardias portuarios en faenas costeras, buques mercantes y terminales bajo la supervisión de Directemar y el código PBIP.',
    objective: 'Revalidar competencias marítimo-portuarias ante la Autoridad Marítima.',
    specificObjectives: ['Revisar procedimientos de inspección de naves y cargas.', 'Actualizar conocimientos en primeros auxilios en medio acuático.'],
    schedule: '6 días hábiles • 08:30 a 13:00 y 14:30 a 16:30 hrs',
    durationDetail: '36 horas pedagógicas reglamentarias',
    totalHours: 36,
    weeks: '1 semana',
    classesCount: '6 jornadas',
    nextDate: '26/10/2026',
    modality: 'Presencial Portuaria',
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    paymentFacility: '2 cuotas de $47.500 CLP',
    certification: 'Certificado de Revalidación Portuaria Directemar',
    requirements: ['Cédula de Identidad.', 'Matrícula portuaria anterior.', 'Certificado de antecedentes.'],
    modules: [{ number: '01', title: 'Actualización PBIP y Enlace Capitanía', topics: ['Protocolos de inspección', 'Reportes marítimos'] }],
    teachers: [{ name: 'Rodrigo Cisternas Vega', role: 'Relator OPIP Directemar', credentials: 'Certificación OPIP Armada', bio: 'Instructor portuario con 18 años de trayectoria.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Código PBIP/ISPS.', 'Reglamentos Directemar.']
  },

  'seg-07': {
    subtitle: 'Perfeccionamiento para Porteros, Nocheros y Rondines',
    summary: 'Actualización de competencias operativas para personal de conserjería y vigilancia nocturna.',
    objective: 'Reforzar las medidas de control y prevención de delitos en condominios residenciales.',
    specificObjectives: ['Actualizar protocolos ante nuevas modalidades de robo residencial.', 'Manejo de sistemas de citofonía IP y cámaras comunitarias.'],
    schedule: '4 días hábiles • Vespertino o Sábados',
    durationDetail: '16 horas de actualización',
    totalHours: 16,
    weeks: '1 semana',
    classesCount: '4 jornadas',
    nextDate: '19/10/2026',
    modality: 'Presencial o Mixta',
    price: '$50.000 CLP',
    depositPrice: '$25.000 CLP (50%)',
    paymentFacility: '2 cuotas de $25.000 CLP',
    certification: 'Diploma de Actualización Laboral OTEC PrevySeg',
    requirements: ['Cédula de Identidad.', 'Certificado de curso previo de conserjería o nochero.'],
    modules: [{ number: '01', title: 'Nuevos Métodos Preventivos y Tecnológicos', topics: ['Citofonía inteligente', 'Planes de contingencia vecinal'] }],
    teachers: [
      {
        name: 'Marco Antonio Gallardo Sáez',
        role: 'Relator Acreditado OS-10 • Protocolos de Emergencia y Ética',
        credentials: 'Prefectura Carabineros Arica N° 1 • Res. Exenta N° 136 (Vigencia 2028)',
        badge: 'Acreditado OS-10',
        areas: ['Primeros Auxilios', 'Administración de Seguridad', 'Valores y Ética'],
        bio: 'Capacitador acreditado OS-10. Técnico de Nivel Superior en Enfermería (CFT Tarapacá) y Diplomado en Alta Dirección de Seguridad Privada (CFT UDA).',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ing. Patricio Melgarejo Aranibar',
        role: 'Relator Acreditado OS-10 • Prevención de Riesgos y Control de Incendios en Edificios',
        credentials: 'Prefectura Carabineros Arica N° 1 • Aut. N° 010103030013 • Registro Experto SNS N° AC/P 826',
        badge: 'Acreditado OS-10',
        areas: ['Control de Emergencias', 'Protección de Instalaciones', 'Prevención de Riesgos'],
        bio: 'Ingeniero en Prevención de Riesgos (U. Arturo Prat) y Experto Profesional SNS N° AC/P 826. Capacitador acreditado OS-10 en Control de Emergencias, manejo de extintores, redes húmedas y evacuación segura de condominios y edificios habitacionales.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: ['Ley N° 21.442 de Copropiedad Inmobiliaria.']
  },

  'seg-08': {
    subtitle: 'Especialización Operador de Cámaras de Televigilancia (CCTV)',
    summary: 'Modalidad 100% online y asincrónica a través de Aula Virtual. El estudiante gestiona su propio aprendizaje de forma autónoma con material interactivo disponible 24/7.',
    objective: 'Capacitar operadores profesionales en gestión de software VMS, analítica de video, domos PTZ y monitoreo preventivo continuo.',
    specificObjectives: [
      'Gestionar plataformas VMS y monitoreo de múltiples cámaras en tiempo real.',
      'Identificar conductas sospechosas y activar protocolos de respuesta.',
      'Extraer evidencia digital cumpliendo la cadena de custodia legal.'
    ],
    schedule: 'Modalidad 100% online y asincrónica a través de Aula Virtual. Plataforma disponible 24/7.',
    durationDetail: '40 horas asincrónicas + 2 horas prácticas (plazo máximo de ejecución: 1 mes)',
    totalHours: 42,
    weeks: '1 mes máximo',
    classesCount: 'Autoestudio asincrónico 24/7 + 2h prácticas',
    nextDate: 'Matrícula abierta / Acceso inmediato',
    modality: '100% Online Asincrónica (Aula Virtual 24/7)',
    price: '$100.000 CLP',
    promoExalumnos: '$70.000 CLP',
    depositPrice: '$100.000 CLP (Pago Único)',
    paymentFacility: 'Pago único (1 cuota total). Bloqueada la opción de pago en 2 cuotas.',
    soloPagoUnico: true,
    hideSyllabusAndTeachers: true,
    explanatoryNote: 'Modalidad 100% online y asincrónica a través de Aula Virtual. El estudiante gestiona su propio aprendizaje de forma autónoma con material interactivo disponible 24/7.',
    certification: 'Certificado oficial de Especialización en Operación de Sistemas CCTV OTEC PrevySeg',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Licencia de Enseñanza Media completa.',
      'Dispositivo informático con conexión a internet para el Aula Virtual.',
      'Plazo máximo de ejecución: 1 mes desde la activación.'
    ],
    modules: [],
    teachers: [],
    bibliography: [
      'Manual de Operación de Sistemas de Videoprotección Urbana (Ministerio del Interior).',
      'Guía Técnica de Estándares de Grabación y Resguardo Forense de Evidencia Digital.'
    ]
  },

  'seg-10': {
    subtitle: 'Supervisor de Seguridad Privada (Liderazgo y Gestión Operativa)',
    summary: 'Programa directivo de nivel técnico para líderes de equipos de vigilancia, jefes de turno y coordinadores de operaciones de seguridad privada, enfocado en administración de personal, diseño de directivas de funcionamiento y cumplimiento de la Ley 21.659.',
    objective: 'Formar supervisores capaces de dirigir servicios de seguridad con liderazgo, resolución de conflictos y apego estricto a las normas laborales y de la Subsecretaría de Prevención del Delito.',
    specificObjectives: ['Confeccionar directivas de funcionamiento y planes de seguridad aprobables ante OS-10.', 'Liderar equipos operativos con técnicas de motivación y resolución de crisis en terreno.'],
    schedule: '16 días hábiles • Vespertino: 18:30 a 21:45 hrs y Sábados 09:00 a 14:00 hrs',
    durationDetail: '60 horas pedagógicas de instrucción técnica y de mando',
    totalHours: 60,
    weeks: '3 semanas',
    classesCount: '16 jornadas',
    nextDate: '26/10/2026',
    modality: 'Presencial Ejecutivo',
    price: '$180.000 CLP',
    depositPrice: '$90.000 CLP (50%)',
    paymentFacility: '2 cuotas del 50% ($90.000 c/u)',
    certification: 'Diploma de Especialización como Supervisor de Seguridad Privada OTEC PrevySeg',
    requirements: ['21 años cumplidos y 4° Medio aprobado.', 'Experiencia comprobable de al menos 1 año en seguridad privada o ex personal de FF.AA./Orden.', 'Certificado de antecedentes intachable.'],
    modules: [
      { number: '01', title: 'Administración de Servicios y Gestión de Personas', topics: ['Planificación de roles de turno (Turnos 4x4, 6x1)', 'Legislación laboral aplicada al guardia'] },
      { number: '02', title: 'Elaboración de Directivas de Funcionamiento OS-10', topics: ['Estudio de seguridad de instalaciones', 'Planes de contingencia y matrices de riesgo'] },
      { number: '03', title: 'Liderazgo, Resolución de Conflictos y Auditoría en Terreno', topics: ['Inspección de puestos de guardia', 'Manejo de sindicatos y clima laboral'] }
    ],
    teachers: [
      {
        name: 'Marco Antonio Gallardo Sáez',
        role: 'Relator Acreditado OS-10 • Alta Dirección y Supervisión de Seguridad',
        credentials: 'Prefectura Carabineros Arica N° 1 • Res. Exenta N° 136 / Aut. N° 016 (Vigencia 2028)',
        badge: 'Acreditado OS-10',
        areas: ['Administración de Seguridad', 'Valores y Ética', 'Primeros Auxilios'],
        bio: 'Diplomado en Alta Dirección de Seguridad Privada (CFT UDA) y certificación de Supervisor de Seguridad Privada. Capacitador acreditado por Carabineros de Chile en Administración de Seguridad y Ética Laboral por la Pontificia Universidad Católica de Chile.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ing. Patricio Melgarejo Aranibar',
        role: 'Relator Acreditado OS-10 • Matrices de Riesgo, IPER y Planes de Contingencia',
        credentials: 'Prefectura Carabineros Arica N° 1 • Aut. N° 010103030013 • Registro Experto SNS N° AC/P 826',
        badge: 'Acreditado OS-10',
        areas: ['Prevención de Riesgos', 'Control de Emergencias', 'Protección de Instalaciones'],
        bio: 'Ingeniero en Prevención de Riesgos (U. Arturo Prat, aprobado con distinción) y Experto SNS N° AC/P 826. Relator de la Mutual de Seguridad C.Ch.C. Especialista en confección de directivas de funcionamiento OS-10, matrices IPER y protocolos de emergencia para supervisores y jefes de turno.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: ['Ley N° 21.659 de Seguridad Privada.', 'Código del Trabajo de Chile: Jornadas excepcionales.']
  },

  // =======================================================================
  // 2. ESCUELA DE OFICIOS Y EMPLEABILIDAD PRODUCTIVA (SENCE / NCH 2728)
  // =======================================================================

  'of-01': {
    subtitle: 'Resolución de Conflictos y Manejo de Situaciones Difíciles (Código SENCE 1238088725)',
    summary: 'Programa integral de capacitación en técnicas avanzadas de mediación, negociación asertiva, contención emocional y desescalamiento de situaciones conflictivas en el ámbito laboral y de atención al público.',
    objective: 'Desarrollar competencias psicosociales y tácticas para resolver controversias, gestionar la presión y liderar acuerdos constructivos en momentos de crisis.',
    specificObjectives: [
      'Identificar la anatomía del conflicto y factores detonantes en entornos laborales.',
      'Aplicar técnicas de comunicación asertiva, empatía y desescalamiento verbal.',
      'Diseñar protocolos de negociación y contención emocional bajo la guía de un especialista.'
    ],
    schedule: 'Online Asíncrona (Aula Virtual 24/7) • Flexible a tu propio ritmo',
    durationDetail: '40 Horas pedagógicas Asincrónicas',
    totalHours: 40,
    weeks: '4 semanas',
    classesCount: 'Material interactivo 24/7 en Aula Virtual',
    nextDate: '15/10/2026',
    modality: 'Online Asíncrona (Aula Virtual 24/7)',
    price: '$150.000 CLP',
    depositPrice: '$75.000 CLP (50%)',
    codigo_sence: '1238088725',
    paymentFacility: 'Facilidad de pago en 2 cuotas de $75.000 c/u • Franquicia SENCE',
    certification: 'Certificado Oficial SENCE (Código 1238088725) OTEC PrevySeg',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Mayor de 18 años.',
      'Dispositivo con acceso a internet para interactuar en el Aula Virtual.'
    ],
    modules: [
      { number: '01', title: 'Bases Psicológicas del Conflicto y Percepción Humana', topics: ['Origen del conflicto interpersonal y laboral', 'Mecanismos de defensa y reactividad emocional', 'El rol de las expectativas en la dinámica laboral'] },
      { number: '02', title: 'Comunicación Asertiva y Técnicas de Contención Emocional', topics: ['Escucha activa y reformulación positiva', 'Manejo del tono de voz, lenguaje no verbal y asertividad', 'Primeros auxilios psicológicos y contención en crisis'] },
      { number: '03', title: 'Negociación Estratégica y Desescalamiento de Controversias', topics: ['Modelo Harvard de negociación: intereses vs. posiciones', 'Técnicas de desescalamiento ante usuarios o clientes molestos', 'Búsqueda de alternativas de mutuo beneficio (Método MAPAN)'] },
      { number: '04', title: 'Protocolos de Mediación y Cierre Constructivo en el Trabajo', topics: ['Diseño de acuerdos sostenibles en equipos multidisciplinarios', 'Seguimiento y evaluación de la convivencia laboral', 'Resolución de casos reales en el Aula Virtual'] }
    ],
    teachers: [
      {
        nombre: 'Felipe I. Cisterna Farias',
        name: 'Felipe I. Cisterna Farias',
        cargo: 'Relator Asignado • Psicólogo Clínico',
        role: 'Relator Asignado • Psicólogo Clínico',
        area: 'Salud Mental & Mediación',
        badge: 'Psicólogo Clínico',
        credentials: 'Tu Espacio Terapéutico • felipecisternaf@gmail.com',
        bio: 'Psicólogo Clínico de Tu Espacio Terapéutico. Especialista en mediación de controversias, desarrollo de habilidades blandas, contención emocional y salud mental laboral.',
        whatsapp: 'https://wa.me/56972210629'
      }
    ],
    bibliography: [
      'Manual de Mediación y Resolución de Conflictos Organizacionales.',
      'Guía Práctica de Negociación y Comunicación Asertiva en el Trabajo.'
    ]
  },

  'of-02': {
    subtitle: 'Taller Práctico de Manejo de Resolución de Conflictos',
    summary: 'Versión presencial e intensiva con simulaciones y roleplaying para equipos que requieren entrenamiento práctico inmediato en contención y desescalamiento.',
    objective: 'Entrenar de forma práctica la reacción inmediata ante situaciones de tensión laboral.',
    specificObjectives: ['Simular casos de crisis con retroalimentación en tiempo real.'],
    schedule: '1 jornada intensiva de 8 horas presenciales',
    durationDetail: '8 horas presenciales de taller práctico',
    totalHours: 8,
    weeks: '1 día',
    classesCount: '1 jornada intensiva',
    nextDate: '24/10/2026',
    modality: 'Presencial Intensivo en Sede Arica',
    price: '$55.000 CLP',
    depositPrice: '$27.500 CLP (50%)',
    paymentFacility: '2 cuotas de $27.500 CLP',
    certification: 'Certificado de Taller Práctico OTEC PrevySeg',
    requirements: ['Cédula de Identidad chilena vigente.'],
    modules: [{ number: '01', title: 'Taller Dinámico de Roleplaying y Escalamiento', topics: ['Ejercicios vivenciales y contención en vivo'] }],
    teachers: [{ name: 'Ps. Andrea Cárdenas Godoy', role: 'Relatora de Habilidades', credentials: 'SENCE NCh 2728', bio: 'Psicóloga facilitadora.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Manual de Dinámicas Grupales y Mediación.']
  },

  'of-03': {
    subtitle: 'Manejo y Uso de Plaguicidas con Acreditación SAG',
    summary: 'Formación teórico-práctica para trabajadores agrícolas y operarios de predios para la correcta manipulación, dosificación y aplicación de productos fitosanitarios, cumpliendo la normativa del Servicio Agrícola y Ganadero (SAG).',
    objective: 'Capacitar aplicadores agrícolas en el uso seguro de plaguicidas, uso de EPP y gestión ambiental en los valles de Azapa y Lluta.',
    specificObjectives: ['Aprender la técnica del triple lavado de envases.', 'Calcular dosis exactas y calibrar equipos pulverizadores.'],
    schedule: 'Semanas mixtas • Clases teóricas y terreno en predio agrícola',
    durationDetail: '40 horas presenciales y de campo',
    totalHours: 40,
    weeks: '2 semanas',
    classesCount: '8 sesiones',
    nextDate: '19/10/2026',
    modality: 'Presencial con Práctica en Terreno',
    price: '$110.000 CLP',
    depositPrice: '$55.000 CLP (50%)',
    paymentFacility: '2 cuotas de $55.000 CLP',
    certification: 'Certificado habilitante para rendir examen y obtener Carnet SAG de Aplicador',
    requirements: ['Cédula de Identidad.', 'Mayor de 18 años.', 'Salud compatible con actividades agrícolas de campo.'],
    modules: [
      { number: '01', title: 'Toxicología y Clasificación de Plaguicidas SAG', topics: ['Etiquetas y bandas toxicológicas', 'Vías de ingreso y síntomas de intoxicación'] },
      { number: '02', title: 'Manejo de EPP y Protocolo de Triple Lavado', topics: ['Uso correcto de respiradores y trajes', 'Disposición en centros de acopio autorizados'] },
      { number: '03', title: 'Calibración de Equipos y Aplicación Agrícola', topics: ['Calibración de pulverizadores de espalda', 'Condiciones climáticas de aplicación'] }
    ],
    teachers: [{ name: 'Ing. Agrónomo Gonzalo Parra Morales', role: 'Ingeniero Agrónomo y Relator Fitosanitario', credentials: 'Acreditado SAG • Registro SENCE', bio: 'Especialista en manejo integrado de plagas en valles costeros.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Resolución SAG N° 2.195 sobre Evaluaciones de Aplicadores.', 'Decreto Supremo N° 157: Reglamento de Plaguicidas (Minsal).']
  },

  'of-04': {
    subtitle: 'Operaciones de Carga y Descarga Portuaria (Operador Portuario)',
    summary: 'Instrucción técnica en maniobras de estiba, trincaje y manejo seguro de aparejos en muelles comerciales y terminales marítimos de exportación/importación.',
    objective: 'Preparar operarios portuarios altamente calificados para desempeñarse en recintos portuarios de la macrozona norte.',
    specificObjectives: ['Dominar señales manuales de maniobra y cálculo de capacidad de carga de eslingas.'],
    schedule: 'Lunes a Viernes • 09:00 a 13:00 hrs',
    durationDetail: '40 horas de instrucción portuaria',
    totalHours: 40,
    weeks: '2 semanas',
    classesCount: '10 sesiones',
    nextDate: '26/10/2026',
    modality: 'Presencial Portuaria',
    price: '$130.000 CLP',
    depositPrice: '$65.000 CLP (50%)',
    paymentFacility: '2 cuotas de $65.000 CLP',
    certification: 'Certificado de Competencias Portuarias OTEC PrevySeg',
    requirements: ['Mayor de 18 años.', 'Salud física compatible con faenas portuarias pesadas.'],
    modules: [{ number: '01', title: 'Seguridad en Faenas de Estiba y Trincaje', topics: ['Aparejos, estrobos y grúas de muelle', 'Código IMDG de mercancías peligrosas'] }],
    teachers: [
      {
        name: 'Rodrigo Cisternas Vega',
        role: 'Instructor Portuario',
        credentials: 'Directemar PBIP',
        badge: 'OPIP Directemar',
        bio: 'Oficial de protección portuaria con 18 años de trayectoria en operaciones marítimas.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Ing. Patricio Melgarejo Aranibar',
        role: 'Experto en Prevención de Riesgos y Seguridad en Faenas Portuarias',
        credentials: 'Registro Experto SNS N° AC/P 826 • Relator Mutual de Seguridad C.Ch.C.',
        badge: 'Experto SNS',
        areas: ['Seguridad en Faenas', 'Control de Emergencias', 'Manejo de EPP y Aparejos'],
        bio: 'Ingeniero en Prevención de Riesgos (Universidad Arturo Prat) y Relator de la Mutual de Seguridad C.Ch.C. Especialista en seguridad operativa en faenas pesadas de muelle, prevención de accidentes en estiba y respuesta ante emergencias.',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: ['Código de Prácticas de Seguridad en Instalaciones Portuarias (OIT).']
  },

  'of-05': {
    subtitle: 'Manipulación de Alimentos para el Emprendimiento (ChileValora P-5629-9412-001-V02)',
    summary: 'Capacitación presencial integral de 60 horas (16h teóricas / 44h prácticas) basada en el perfil ocupacional oficial de ChileValora (Código: P-5629-9412-001-V02). Prepara al alumno en higiene alimentaria, costeo, planificación de la producción, elaboración higiénica, inocuidad y puesta en marcha con venta piloto.',
    objective: 'Adquirir y demostrar las competencias laborales requeridas para elaborar alimentos de forma higiénica y rentable conforme a los estándares de ChileValora.',
    specificObjectives: [
      'Aplicar buenas prácticas de manufactura (BPM) e inocuidad alimentaria.',
      'Controlar costos de insumos y estandarizar fichas técnicas con Mise en Place.',
      'Elaborar, presentar y despachar productos en una jornada de taller y venta piloto.'
    ],
    schedule: '100% Presencial en Taller Gastronómico • Martes, Miércoles y Jueves',
    durationDetail: '60 horas (16h teóricas / 44h prácticas)',
    totalHours: 60,
    weeks: '4 semanas',
    classesCount: '12 jornadas de taller práctico con venta piloto',
    nextDate: '12/10/2026',
    modality: '100% Presencial con taller práctico y venta piloto',
    price: '$150.000 CLP',
    depositPrice: '$75.000 CLP (50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas de $75.000 c/u',
    avisoLegal: 'Capacitación basada en perfil ocupacional ChileValora (Código: P-5629-9412-001-V02). No certifica directamente Seremi de Salud.',
    certification: 'Diploma de Capacitación OTEC PrevySeg basado en competencias ChileValora P-5629-9412-001-V02',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Mayor de 18 años.',
      'Interés en iniciar o formalizar un emprendimiento alimentario.',
      'Aviso legal: Capacitación basada en perfil ocupacional ChileValora (Código: P-5629-9412-001-V02). No certifica directamente Seremi de Salud.'
    ],
    modules: [
      { number: '01', title: 'Fundamentos de higiene e inocuidad alimentaria', hours: '6h', topics: ['Buenas Prácticas de Manufactura (BPM)', 'Peligros biológicos, químicos y físicos', 'Lavado de manos, indumentaria y desinfección de superficies'] },
      { number: '02', title: 'Abastecimiento, selección de insumos y control de costos', hours: '9h', topics: ['Criterios de compra y recepción de materias primas', 'Rotación de inventarios y sistema FIFO / PEPS', 'Cálculo de rendimientos y control de mermas'] },
      { number: '03', title: 'Planificación de la producción: Mise en Place, fichas técnicas y costeo', hours: '9h', topics: ['Diseño y estandarización de recetas', 'Elaboración de fichas técnicas de producción', 'Costeo directo, margen de utilidad y precio de venta'] },
      { number: '04', title: 'Elaboración, presentación, envasado y despacho', hours: '11h', topics: ['Técnicas culinarias seguras y control de temperaturas', 'Tipos de envases inocuos y rotulado reglamentario', 'Manejo seguro en delivery y transporte de alimentos'] },
      { number: '05', title: 'Inocuidad, calidad y cumplimiento normativo', hours: '9h', topics: ['Reglamento Sanitario de los Alimentos (RSA - Dto. 977/96)', 'Trazabilidad y procedimientos POES', 'Checklist de auditoría interna de inocuidad'] },
      { number: '06', title: 'Puesta en marcha del emprendimiento alimentario: Taller y venta piloto', hours: '16h', topics: ['Simulación de producción a escala comercial', 'Estrategia de comercialización y atención al cliente', 'Jornada de venta piloto presencial con evaluación de resultados'] }
    ],
    teachers: [
      {
        name: 'Chef Instructor Gastronómico',
        role: 'Relator Especialista en Inocuidad y Emprendimiento Culinario',
        badge: 'ChileValora',
        credentials: 'Especialista en BPM, Costeo y Gestión de Alimentos',
        bio: 'Instructor con amplia trayectoria en formación culinaria, gestión de inocuidad y asesoría en formulación de emprendimientos gastronómicos.'
      }
    ],
    bibliography: [
      'Reglamento Sanitario de los Alimentos (Decreto Supremo N° 977/96).',
      'Perfil Ocupacional Manipulador de Alimentos ChileValora (P-5629-9412-001-V02).',
      'Manual de Buenas Prácticas de Manufactura e Higiene en Servicios de Alimentación.'
    ]
  },

  'of-06': {
    subtitle: 'Depilación Profesional y Técnicas de Cera Miel',
    summary: 'Taller práctico de estética para aprender la técnica de extracción de vello con cera tibia y caliente de miel natural, bioseguridad cutánea y cuidados pre/post tratamiento.',
    objective: 'Capacitar especialistas en estética con dominio de la depilación corporal y facial sin dolor ni lesiones cutáneas.',
    specificObjectives: ['Conocer la anatomía y ciclos del folículo piloso.', 'Aplicar cera miel a temperatura óptima en diversas zonas del cuerpo.'],
    schedule: 'Vespertino • 2 veces por semana',
    durationDetail: '30 horas prácticas en taller estético',
    totalHours: 30,
    weeks: '3 semanas',
    classesCount: '8 sesiones',
    nextDate: '21/10/2026',
    modality: 'Presencial Práctica',
    price: '$85.000 CLP',
    depositPrice: '$42.500 CLP (50%)',
    paymentFacility: '2 cuotas de $42.500 CLP',
    certification: 'Diploma de Competencia Práctica en Depilación OTEC PrevySeg',
    requirements: ['Cédula de Identidad.', 'Mayor de 18 años.', 'No se requieren conocimientos previos.'],
    modules: [
      { number: '01', title: 'Fisiología de la Piel y Bioseguridad', topics: ['Desinfección de herramientas', 'Contraindicaciones médicas'] },
      { number: '02', title: 'Técnicas de Aplicación de Cera Miel', topics: ['Zonas faciales, axilas, piernas y rebaje', 'Cuidados post depilatorios'] }
    ],
    teachers: [{ name: 'Daniela Tapia Silva', role: 'Cosmetóloga y Esteticista Integral', credentials: 'Certificada Seremi de Salud', bio: 'Especialista en depilación y estética.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Manual de Cosmetología y Bioseguridad Cutánea.']
  },

  'of-07': {
    subtitle: 'Manicura Profesional, Uñas Acrílicas y Esmaltado Permanente',
    summary: 'Instrucción de alta demanda en el mercado de la belleza que abarca técnicas de manicura rusa combinada, esmaltado semipermanente de larga duración, uñas acrílicas con molde y nail art de salón.',
    objective: 'Formar manicuristas capacitadas para atender clientes de manera autónoma o en salones profesionales.',
    specificObjectives: ['Dominar el uso de torno profesional para cutículas.', 'Construir estructuras acrílicas y esculpidas perfectas.'],
    schedule: 'Sábados intensivos de 09:00 a 14:00 hrs',
    durationDetail: '35 horas prácticas en taller estético',
    totalHours: 35,
    weeks: '4 semanas',
    classesCount: '4 jornadas intensivas',
    nextDate: '24/10/2026',
    modality: 'Presencial Práctica con Kit',
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    paymentFacility: '2 cuotas de $47.500 CLP',
    certification: 'Diploma de Manicurista Profesional OTEC PrevySeg',
    requirements: ['Cédula de Identidad chilena vigente.', 'Mayor de 18 años.'],
    modules: [
      { number: '01', title: 'Salud de la Uña y Manicura Combinada con Torno', topics: ['Anatomía de la uña natural', 'Esterilización en autoclave'] },
      { number: '02', title: 'Esmaltado Permanente y Nivelación Rubber', topics: ['Preparación de la placa', 'Aplicación bajo cutícula'] },
      { number: '03', title: 'Estructuras Acrílicas y Gel Esculpido', topics: ['Uso de monómero y polímero', 'Limado y acabado gloss'] }
    ],
    teachers: [{ name: 'Javiera Monroy Castillo', role: 'Nail Artist y Educadora Master', credentials: 'Certificación Internacional Nail Pro', bio: 'Educadora con más de 8 años formando manicuristas exitosas en Arica.', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Manual de Dermatología Básica y Bioseguridad en Manicura.']
  },

  'of-08': {
    subtitle: 'Técnicas de Maquillaje Carnaval (24 Horas Cronológicas)',
    summary: 'Capacitación presencial especializada de 24 horas cronológicas (25% teórico / 75% práctico) distribuidas en 9 días durante 3 semanas. Incluye kit completo de insumos y materiales desde el día 1, manual y certificado de participación.',
    objective: 'Dominar las técnicas de colorimetría, peinados ornamentales y maquillaje de carnaval con sellado HD de máxima duración para bailarines y comparsas.',
    specificObjectives: [
      'Preparar y proteger la piel para aplicaciones de maquillaje de alta fijación.',
      'Diseñar peinados y tocados con ornamentación y trenzado capilar.',
      'Ejecutar maquillaje artístico con pedrería, glitter y sellado resistente a sudor.'
    ],
    schedule: 'Presencial: Martes y Jueves (2h/clase) y Sábados (4h/clase) • 9 días en 3 semanas',
    durationDetail: '24 horas cronológicas (25% teórico / 75% práctico)',
    totalHours: 24,
    weeks: '3 semanas',
    classesCount: '9 jornadas de taller práctico',
    nextDate: '02/11/2026',
    modality: 'Presencial (25% teórico / 75% práctico)',
    price: '$150.000 CLP',
    depositPrice: '$75.000 CLP (50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas de $75.000 c/u • Incluye Kit de Insumos',
    beneficios: 'Incluye kit completo de insumos y materiales desde el día 1, manual y certificado de participación.',
    certification: 'Certificado de Participación y Competencia Práctica OTEC PrevySeg',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Mayor de 18 años.',
      'No se requieren conocimientos previos en maquillaje.'
    ],
    modules: [
      { number: '01', title: 'Cuidado de la piel y colorimetría', hours: '6h', topics: ['Preparación y limpieza profunda de la piel', 'Teoría del color aplicada a vestuarios y comparsas', 'Prebases, primer de alta fijación y protección solar'] },
      { number: '02', title: 'Peinados y ornamentación', hours: '3h', topics: ['Estructuras de trenzado resistente al movimiento', 'Fijación de tocados, plumas y ornamentación tradicional', 'Uso de geles y fijadores de alta resistencia térmica'] },
      { number: '03', title: 'Maquillaje de carnaval profesional y sellado HD', hours: '11h', topics: ['Técnicas de esfumado artístico y contrastes de impacto', 'Aplicación de pedrería, perlas, glitter y pigmentos puros', 'Técnicas de sellado HD resistente a sudor, calor y humedad'] },
      { number: '04', title: 'Evaluación final y presentación práctica', hours: '4h', topics: ['Montaje integral de maquillaje y peinado en modelo real', 'Evaluación de durabilidad, prolijidad y propuesta escénica'] }
    ],
    teachers: [
      {
        name: 'Instructora Estilista Profesional',
        role: 'Maquilladora Artística Especializada en Danzas del Norte',
        badge: 'Certificada',
        credentials: 'Especialista en Maquillaje HD y Caracterización Escénica',
        bio: 'Maquilladora profesional y estilista con amplia experiencia en comparsas del Carnaval con la Fuerza del Sol y producciones artísticas del norte de Chile.'
      }
    ],
    bibliography: [
      'Manual Técnico de Maquillaje Social y Artístico Profesional.',
      'Guía de Colorimetría y Fijación de Pigmentos en Condiciones Extremas.'
    ]
  },

  'of-09': {
    subtitle: 'Cuidado del Adulto Mayor (ChileValora P-8810-5322-001-V01)',
    summary: 'Programa presencial de 50 horas cronológicas (17 sesiones en 2 meses) alineado al perfil ocupacional ChileValora P-8810-5322-001-V01 (Nivel 3). Exige asistencia mínima del 85% para su aprobación y certificación.',
    objective: 'Desarrollar competencias técnicas, asistenciales y humanas para brindar atención integral y digna a personas mayores autovalentes y dependientes.',
    specificObjectives: [
      'Asistir en las actividades básicas de la vida diaria respetando la autonomía.',
      'Controlar signos vitales y administrar medicación por vía oral indicada.',
      'Prevenir riesgos de caídas, úlceras por presión y situaciones de vulneración.'
    ],
    schedule: 'Martes, Miércoles y Jueves (18:30 a 21:30 hrs) • 16 sesiones de 3h + 1 de 2h (2 meses)',
    durationDetail: '50 horas cronológicas (17 sesiones presenciales)',
    totalHours: 50,
    weeks: '8 semanas (2 meses)',
    classesCount: '17 sesiones (16 de 3h + 1 de 2h)',
    nextDate: '16/10/2026',
    modality: 'Presencial Teórico-Práctica (Asistencia mínima 85% obligatoria)',
    price: '$180.000 CLP',
    depositPrice: '$90.000 CLP (50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas de $90.000 c/u',
    certification: 'Certificado Oficial de Capacitación OTEC PrevySeg alineado a ChileValora P-8810-5322-001-V01 (Nivel 3)',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Mayor de 18 años.',
      'Salud física y mental compatible con labores de cuidado asistencial.',
      'Cumplir con el requisito de asistencia mínima obligatoria del 85% para aprobación.'
    ],
    modules: [
      { number: '00', title: 'Inducción al rol del cuidador', hours: '3h', topics: ['Marco ético, envejecimiento activo y rol del cuidador formal', 'Derechos fundamentales de las personas mayores'] },
      { number: '01', title: 'UCL 1: Asistencia en actividades de la vida diaria', hours: '12h', topics: ['Higiene, aseo en cama y confort del usuario', 'Técnicas de alimentación asistida e hidratación adecuada', 'Movilización segura, transferencias y uso de ayudas técnicas'] },
      { number: '02', title: 'UCL 2: Área de salud y control de signos vitales', hours: '12h', topics: ['Control de presión arterial, frecuencia cardíaca, temperatura y saturación', 'Administración asistida de medicamentos según indicación médica', 'Reconocimiento temprano de descompensaciones clínicas'] },
      { number: '03', title: 'UCL 3: Desarrollo socioafectivo y estimulación cognitiva', hours: '6h', topics: ['Técnicas de estimulación de la memoria y psicomotricidad', 'Escucha activa, empatía y prevención del aislamiento social', 'Manejo del duelo y acompañamiento afectivo'] },
      { number: '04', title: 'UCL 4: Prevención de riesgos, caídas y maltrato', hours: '9h', topics: ['Adaptación del entorno doméstico seguro para prevenir caídas', 'Prevención y cuidado de úlceras por presión (escaras)', 'Detección, protocolo y denuncia ante sospechas de maltrato o abandono'] },
      { number: '05', title: 'Módulo Transversal: Empleabilidad y autocuidado del cuidador', hours: '3h', topics: ['Habilidades de comunicación con la familia y equipos de salud', 'Prevención del síndrome de Burnout y técnicas de autocuidado'] },
      { number: '06', title: 'Taller integrador de casos y evaluación final', hours: '5h', topics: ['Simulación clínica de casos complejos en aula taller', 'Evaluación práctica individual de competencias'] }
    ],
    teachers: [
      {
        nombre: 'Enfermera / Docente Clínica',
        name: 'Enfermera / Docente Clínica',
        cargo: 'Relatora Especialista en Geriatría',
        role: 'Relatora Especialista en Geriatría',
        badge: 'Área Salud',
        credentials: 'Licenciada en Enfermería • Diplomada en Atención Gerontológica',
        bio: 'Profesional de enfermería especializada en docencia para la salud, atención a la dependencia y cuidados paliativos.'
      }
    ],
    bibliography: [
      'Perfil Ocupacional Cuidador de Personas Mayores ChileValora (P-8810-5322-001-V01).',
      'Manual de Cuidados para Personas Mayores en Situación de Dependencia (SENAMA).'
    ]
  },

  'of-10': {
    subtitle: 'Administración de Condominios y Edificios (Ley N° 21.442 / MINVU)',
    summary: 'Capacitación presencial de 75 horas (19 sesiones en 7 semanas) bajo la Ley N° 21.442 de Copropiedad Inmobiliaria. Cubre las competencias mínimas exigidas por el Ministerio de Vivienda y Urbanismo (MINVU) para la inscripción en el Registro Nacional de Administradores de Condominios. Incluye sin costo adicional el curso de Resolución de Conflictos (SENCE 1238088725).',
    objective: 'Capacitar administradores inmobiliarios y miembros de comités en el marco legal, financiero, laboral y operativo exigido por la nueva Ley de Copropiedad.',
    specificObjectives: [
      'Interpretar y aplicar el marco legal de la Ley N° 21.442 y su reglamento.',
      'Diseñar planes de emergencia, seguridad y cumplimiento de la normativa laboral.',
      'Calcular gastos comunes, fondos de reserva y liderar comités de convivencia.'
    ],
    schedule: 'Lunes, Miércoles y Viernes • Mañana (08:30 a 12:30 hrs) o Tarde (14:30 a 18:30 hrs) • 19 sesiones en 7 semanas',
    durationDetail: '75 horas presenciales (19 sesiones en 7 semanas)',
    totalHours: 75,
    weeks: '7 semanas',
    classesCount: '19 sesiones presenciales',
    nextDate: '19/10/2026',
    modality: 'Presencial (Lunes, Miércoles y Viernes)',
    price: '$180.000 CLP',
    depositPrice: '$90.000 CLP (2 cuotas de $90.000: 50% al inscribirse y 50% al iniciar)',
    paymentFacility: 'Facilidad de pago en 2 cuotas de $90.000 c/u (50% inscripción / 50% al iniciar)',
    beneficioIncluido: 'Incluye sin costo adicional el curso de Resolución de Conflictos y Manejo de Situaciones Difíciles (Código SENCE 1238088725).',
    certification: 'Certificado Oficial OTEC PrevySeg con acreditación de competencias para Registro Nacional de Administradores MINVU',
    requirements: [
      'Cédula de Identidad chilena vigente.',
      'Licencia de Enseñanza Media completa.',
      'Manejo de herramientas ofimáticas básicas (hojas de cálculo y correo electrónico).'
    ],
    modules: [
      { number: '01', title: 'Marco normativo y Ley N° 21.442 de Copropiedad Inmobiliaria', hours: '16h', topics: ['Nueva institucionalidad y Registro Nacional de Administradores MINVU', 'Reglamento de copropiedad, asambleas ordinarias y extraordinarias', 'Responsabilidades civiles y penales del administrador y comité'] },
      { number: '02', title: 'Plan de emergencia, evacuación y seguridad en condominios', hours: '16h', topics: ['Diseño y actualización del Plan de Emergencia y Evacuación', 'Inspección de redes húmedas, secas y sistemas contra incendios', 'Coordinación con Bomberos, Carabineros y empresas de mantenimiento'] },
      { number: '03', title: 'Normativa laboral aplicada al personal de conserjería', hours: '12h', topics: ['Contratos de trabajo, jornadas, turnos 4x4 y horas extraordinarias', 'Obligaciones del empleador y Ley de Seguridad Laboral (Ley 16.744)', 'Finiquitos, fiscalizaciones de la Dirección del Trabajo y comités paritarios'] },
      { number: '04', title: 'Gastos comunes, contabilidad y cobranza', hours: '16h', topics: ['Estructura del gasto común ordinario y extraordinario', 'Constitución y administración del fondo común de reserva', 'Procedimientos legales de cobranza, intereses y corte de suministros'] },
      { number: '05', title: 'Convivencia comunitaria y resolución de conflictos', hours: '15h', topics: ['Mediación vecinal y gestión asertiva de reclamos', 'Uso de áreas comunes, ruidos molestos y tenencia responsable de mascotas', 'Taller vivencial de resolución de conflictos'] }
    ],
    teachers: [
      {
        name: 'Abogado Especialista en Copropiedad',
        role: 'Relator Experto en Ley 21.442 y Derecho Inmobiliario',
        badge: 'Derecho Inmobiliario',
        credentials: 'Asesor Legal de Condominios y Administraciones',
        bio: 'Abogado con más de 12 años de experiencia asesorando comités de administración y administradores bajo la nueva normativa MINVU.'
      }
    ],
    bibliography: [
      'Ley N° 21.442 de Copropiedad Inmobiliaria (MINVU).',
      'Reglamento de la Ley N° 21.442 y Manual para Administradores de Condominios.',
      'Código del Trabajo de Chile: Normas aplicadas a conserjes y personal de edificios.'
    ]
  }
};

// =========================================================================
// FUNCIÓN GENERADORA Y FALLBACK DINÁMICO INTELIGENTE
// Garantiza que cualquiera de los 20 cursos tenga Resumen, Objetivos, Requisitos,
// Temario, Docentes, Bibliografía y Video RRSS listos.
// =========================================================================

export function getCourseSyllabus(course) {
  if (!course) return null;

  // 1. Coincidencia por ID directa
  if (course.id && SYLLABUS_DETAILS[course.id]) {
    const data = SYLLABUS_DETAILS[course.id];
    return enrichSyllabusWithCourse(data, course);
  }

  // 2. Coincidencia por texto en título
  const title = (course.title || course.titulo || '').toLowerCase();
  
  if (title.includes('manipulación') || title.includes('alimento')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-05'], course);
  if (title.includes('carnaval') || title.includes('maquillaje')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-08'], course);
  if (title.includes('guardias') && (title.includes('formación') || title.includes('os-10'))) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-01'], course);
  if (title.includes('vigilantes')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-02'], course);
  if (title.includes('marítimo') && title.includes('formación')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-03'], course);
  if (title.includes('marítimo') && title.includes('perfeccionamiento')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-06'], course);
  if (title.includes('porteros') && title.includes('formación')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-04'], course);
  if (title.includes('porteros') && title.includes('perfeccionamiento')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-07'], course);
  if (title.includes('perfeccionamiento') && title.includes('guardias')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-05'], course);
  if (title.includes('cctv') || title.includes('televisión') || title.includes('cámaras')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-08'], course);
  if (title.includes('supervisor')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['seg-10'], course);
  if (title.includes('plaguicidas') || title.includes('sag')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-03'], course);
  if (title.includes('portuaria') || title.includes('carga y descarga')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-04'], course);
  if (title.includes('cera') || title.includes('depilación')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-06'], course);
  if (title.includes('manicure') || title.includes('manicura') || title.includes('uñas')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-07'], course);
  if (title.includes('adulto mayor') || title.includes('cuidador')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-09'], course);
  if (title.includes('cajero') || title.includes('bancario')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-10'], course);
  if (title.includes('conflictos') && title.includes('asíncrona')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-01'], course);
  if (title.includes('conflictos')) return enrichSyllabusWithCourse(SYLLABUS_DETAILS['of-02'], course);

  // 3. Fallback estructurado oficial ("dejar para completar a futuro")
  const isSecurity = course.school === 'seguridad';
  const fallback = {
    subtitle: course.title,
    summary: course.description || `Programa de capacitación técnica integral impartido por OTEC PrevySeg en la ciudad de Arica, enfocado en el desarrollo de competencias laborales de alta empleabilidad bajo la norma chilena NCh 2728:2015.`,
    objective: `Desarrollar y fortalecer las competencias técnicas, operativas y normativas requeridas para el desempeño eficiente y seguro en el área de ${course.category || 'capacitación laboral'}.`,
    specificObjectives: [
      'Dominar los fundamentos teóricos y normativos aplicables en Chile.',
      'Ejecutar procedimientos técnicos y protocolos de seguridad en el entorno laboral.',
      'Acreditar competencias profesionales con certificación respaldada por OTEC PrevySeg.'
    ],
    schedule: course.horario || 'Convocatoria mensual programada • Jornada Diurna y Vespertina',
    durationDetail: course.duration || 'Horas pedagógicas según plan formativo SENCE',
    totalHours: parseInt(course.duration) || 40,
    weeks: '2 a 4 semanas',
    classesCount: 'Jornadas programadas según modalidad',
    nextDate: course.fecha_inicio || '19/10/2026',
    modality: course.modality || 'Presencial / E-learning',
    price: course.price || '$100.000 CLP',
    depositPrice: course.depositPrice || '$50.000 CLP (50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas del 50%',
    certification: `Certificación Oficial OTEC PrevySeg con respaldo NCh 2728${isSecurity ? ' y normativa SPD' : ' y código SENCE'}`,
    requirements: course.requisitos || [
      'Cédula de Identidad chilena vigente.',
      'Mayor de 18 años de edad.',
      'Licencia de Enseñanza Media completa.',
      'Certificado de antecedentes intachable.'
    ],
    modules: [
      {
        number: '01',
        title: 'Módulo Introductorio y Marco Normativo Vigente',
        topics: [
          'Fundamentos técnicos del área de especialización.',
          'Normativas de seguridad y reglamentación chilena aplicable.'
        ]
      },
      {
        number: '02',
        title: 'Módulo Práctico y Operativo en Taller',
        topics: [
          'Técnicas y procedimientos de ejecución laboral.',
          'Uso correcto de herramientas, equipos y protocolos de prevención.'
        ]
      },
      {
        number: '03',
        title: 'Evaluación Integrada y Casos Aplicados',
        topics: [
          'Simulaciones y resolución de problemas reales del rubro.',
          'Pauta de evaluación final de competencias laborales.'
        ]
      }
    ],
    teachers: isSecurity
      ? [
          {
            name: 'Marco Antonio Gallardo Sáez',
            role: 'Relator Oficial Acreditado OS-10 Carabineros de Chile',
            credentials: 'Prefectura Carabineros Arica N° 1 • Res. Exenta N° 136 / Aut. N° 016 (Vigencia 2028)',
            badge: 'Acreditado OS-10',
            areas: ['Primeros Auxilios', 'Administración de Seguridad', 'Valores y Ética'],
            bio: 'Capacitador autorizado por Carabineros de Chile en materias de Seguridad Privada. Técnico de Nivel Superior en Enfermería (CFT Tarapacá), Diplomado en Alta Dirección de Seguridad Privada (CFT UDA) y postítulo en Ética Laboral por la Pontificia Universidad Católica de Chile.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
          }
        ]
      : [
          {
            name: 'Relator/a Especialista SENCE',
            role: 'Relator/a Certificado/a NCh 2728',
            credentials: 'Registro Nacional de Relatores SENCE',
            bio: 'Profesional con más de 10 años de experiencia técnica y pedagógica en capacitación laboral.',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
          }
        ],
    bibliography: [
      isSecurity ? 'Ley N° 21.659 de Seguridad Privada y Decretos complementarios.' : 'Norma Chilena NCh 2728:2015 sobre Sistemas de Gestión de Calidad para OTEC.',
      'Manuales técnicos y guías de procedimiento institucional OTEC PrevySeg.'
    ]
  };

  return enrichSyllabusWithCourse(fallback, course);
}

function enrichSyllabusWithCourse(syllabus, course) {
  return {
    ...syllabus,
    courseTitle: course.title,
    courseSchool: course.school,
    coursePrice: course.price,
    courseDeposit: course.depositPrice,
    courseDate: course.fecha_inicio || syllabus.nextDate,
    courseDuration: course.duration,
    courseModality: course.modality
  };
}
