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
    subtitle: 'Curso de Formación de Guardias de Seguridad (OS-10 / SPD)',
    summary: 'Programa oficial de formación integral habilitante para desempeñarse como Guardia de Seguridad en empresas públicas y privadas de todo Chile, acreditado bajo la nueva Ley N° 21.659 de Seguridad Privada y regulado por la Subsecretaría de Prevención del Delito (SPD) y Carabineros de Chile. Otorga credencial digital oficial con vigencia extendida de 4 años y acceso al seguro de vida obligatorio de 132 UF.',
    objective: 'Capacitar y habilitar al alumno con las competencias operativas, tácticas, jurídicas y de primeros auxilios exigidas por la normativa chilena para resguardar personas, instalaciones y bienes patrimoniales.',
    specificObjectives: [
      'Dominar el marco legal, derechos humanos y facultades del guardia de seguridad según la Ley 21.659.',
      'Aplicar técnicas de control de accesos, patrullaje preventivo y resolución de incidentes críticos.',
      'Ejecutar protocolos de primeros auxilios, soporte vital básico y uso de desfibrilador externo (DEA).',
      'Operar sistemas de radiocomunicaciones y enlace con centrales de emergencia y Plan Cuadrante.',
      'Aprobar con éxito el examen reglamentario ante la Autoridad Fiscalizadora OS-10 de Carabineros de Chile.'
    ],
    schedule: '2 semanas (Lunes a Sábado) • 08:30 a 12:30 y 14:30 a 18:30 hrs',
    durationDetail: '90 horas cronológicas exigidas por Ley 21.659',
    totalHours: 90,
    weeks: '2 semanas',
    classesCount: '12 jornadas intensivas',
    nextDate: '19/10/2026',
    modality: 'Presencial Teórico-Práctica',
    price: '$140.000 CLP',
    depositPrice: '$70.000 CLP (Cuota 1 de 50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas del 50% ($70.000 c/u)',
    certification: 'Certificado oficial OTEC PrevySeg habilitante para Examen OS-10 y Credencial SPD por 4 años',
    requirements: [
      'Cédula de Identidad chilena vigente o permanencia definitiva apostillada.',
      'Mayor de 18 años de edad cumplidos.',
      'Licencia de Enseñanza Media (4° Medio aprobado) certificada por Mineduc.',
      'Certificado de Antecedentes para Fines Especiales sin condenas por crímenes, simples delitos ni VIF.',
      'Certificado Médico de Aptitud Física emitido por profesional visado por la Superintendencia de Salud.',
      'Certificado Psicológico de Aptitud Mental compatible con la función de seguridad privada.',
      'Declaración Jurada simple de idoneidad cívica y no pertenencia a grupos violentistas.'
    ],
    modules: [
      {
        number: '01',
        title: 'Legislación de Seguridad Privada y Derechos Humanos (Ley 21.659)',
        topics: [
          'Nueva institucionalidad y Subsecretaría de Prevención del Delito (SPD).',
          'Derechos fundamentales, prohibición de tortura y no discriminación.',
          'Legítima defensa, flagrancia y retención según el Código Procesal Penal.',
          'Responsabilidad civil, penal y laboral del personal de seguridad.'
        ]
      },
      {
        number: '02',
        title: 'Prevención de Riesgos, Control de Emergencias e Incendios',
        topics: [
          'Química del fuego y uso táctico de extintores portátiles PQS y CO2.',
          'Planes de evacuación, zonas de seguridad y protocolos ante sismos/tsunamis.',
          'Normas de seguridad laboral y prevención de accidentes en puestos de guardia.'
        ]
      },
      {
        number: '03',
        title: 'Primeros Auxilios y Soporte Vital Básico (SVB)',
        topics: [
          'Evaluación primaria y secundaria del accidentado.',
          'Reanimación Cardiopulmonar (RCP) y manejo del Desfibrilador Externo Automático (DEA).',
          'Manejo de hemorragias, inmovilización de fracturas, quemaduras y shock.'
        ]
      },
      {
        number: '04',
        title: 'Defensa Personal, Reducción Táctica y Manejo del Estrés',
        topics: [
          'Técnicas de sujeción, control y conducción de personas agresivas sin daño.',
          'Uso proporcional de la fuerza y herramientas defensivas permitidas.',
          'Manejo del pánico, autocontrol situacional y mediación de conflictos verbales.'
        ]
      },
      {
        number: '05',
        title: 'Sistemas de Comunicación, Enlace Táctico y CCTV',
        topics: [
          'Claves radiales oficiales y coordinación con Carabineros de Chile.',
          'Redacción de partes de servicio, libros de guardia y actas de novedades.',
          'Familiarización con monitoreo de cámaras y sensores perimetrales.'
        ]
      }
    ],
    teachers: [
      {
        name: 'Mayor (R) Carlos Valenzuela Soto',
        role: 'Instructor Jefe de Seguridad Privada',
        credentials: 'Acreditado OS-10 Carabineros de Chile • Registro SPD N° 458-2024',
        bio: 'Ex-Oficial de Carabineros con 22 años de experiencia en seguridad pública, operaciones de orden urbano y dirección de academias de seguridad privada en la Región de Arica y Parinacota.',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Dra. Marcela Fuenzalida Rivas',
        role: 'Especialista en Primeros Auxilios y Trauma',
        credentials: 'Médico Cirujano • Instructora Certificada AHA en Soporte Vital (BLS/DEA)',
        bio: 'Médico de emergencias con amplia trayectoria en capacitación de brigadas industriales, rescate urbano y primeros auxilios tácticos para personal operativo.',
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Ley N° 21.659 sobre Seguridad Privada en Chile (Ministerio del Interior y Seguridad Pública).',
      'Decreto Supremo N° 867/2017: Reglamento de Seguridad Privada.',
      'Manual Oficial de Doctrina y Procedimientos para Guardias de Seguridad (Depto. OS-10 Carabineros).',
      'Código Procesal Penal: Normas de flagrancia y detención ciudadana (Artículos 129 y 130).',
      'Guía Clínica de Reanimación Cardiopulmonar y Manejo de DEA (Ministerio de Salud de Chile).'
    ],
    videoData: {
      title: 'Cápsula Informativa Oficial: Claves del Curso de Guardias OS-10 y Nueva Ley 21.659',
      presenter: 'Camila Valenzuela — Conductora y Encargada de Comunicaciones y RRSS PrevySeg',
      frequency: 'Cápsula 1 de 4 del ciclo mensual de orientación en Redes Sociales',
      duration: '03:45 min',
      description: 'En esta cápsula audiovisual nuestra encargada de RRSS te explica paso a paso los nuevos requisitos para postular a Guardia de Seguridad en Arica, cómo funciona la credencial digital con vigencia de 4 años, el nuevo seguro de vida obligatorio de 132 UF y la modalidad de pago en 2 cuotas.',
      topicsCovered: [
        'Documentos requeridos para matricularte sin observaciones.',
        'Diferencias entre el antiguo curso OS-10 y la nueva malla de 90 horas.',
        'Cómo se rinde el examen final ante Carabineros y obtención de credencial online.',
        'Facilidades de pago y oportunidades de inserción laboral en empresas colaboradoras.'
      ]
    }
  },

  'seg-02': {
    subtitle: 'Formación de Vigilantes Privados (Porte de Armas / 106 Horas)',
    summary: 'Programa especializado de alta exigencia táctica para personal destinado a entidades bancarias, transporte de valores, puertos y faenas mineras. Contempla polígono de tiro real, instrucción jurídica en legítima defensa con armamento de fuego y protocolos de reacción ante asaltos armados.',
    objective: 'Preparar vigilantes privados con la destreza táctica, psicológica y jurídica necesaria para operar armamento letal en resguardo de recintos estratégicos según la normativa OS-10.',
    specificObjectives: [
      'Dominar las normas de seguridad en el manejo, porte y custodia de armas de fuego.',
      'Aprobar las prácticas de tiro de precisión y reacción en polígono autorizado.',
      'Aplicar procedimientos de seguridad bancaria, custodia de remesas y transporte de valores.',
      'Gestionar protocolos de seguridad preventiva ante situaciones de alto riesgo y asaltos.'
    ],
    schedule: '15 días hábiles • 08:30 a 13:00 y 14:30 a 17:30 hrs (incluye Polígono)',
    durationDetail: '106 horas cronológicas con tiro práctico',
    totalHours: 106,
    weeks: '3 semanas',
    classesCount: '15 jornadas intensivas',
    nextDate: '26/10/2026',
    modality: 'Presencial con Prácticas de Polígono',
    price: '$220.000 CLP',
    depositPrice: '$110.000 CLP (50%)',
    paymentFacility: 'Facilidad en 2 cuotas del 50% ($110.000 c/u)',
    certification: 'Certificado Oficial para Examen de Vigilante Privado OS-10 y Credencial de Porte de Armas',
    requirements: [
      '21 años de edad cumplidos.',
      'Situación Militar al día (Servicio Militar cumplido o exención acreditada).',
      'Licencia de Enseñanza Media completa.',
      'Certificado de Antecedentes Especiales intachable sin anotaciones.',
      'Examen psiquiátrico y psicotécnico de idoneidad para porte de armas de fuego.',
      'Informe comercial (Dicom Platinum) sin morosidades ni protestos graves.',
      'Certificado médico de salud física compatible con alto esfuerzo físico.'
    ],
    modules: [
      { number: '01', title: 'Marco Legal del Vigilante y Legislación de Armas (Ley 17.798)', topics: ['Delitos contra la propiedad y legítima defensa con armamento', 'Responsabilidades penales y civiles en entidades financieras'] },
      { number: '02', title: 'Técnicas de Armamento, Balística y Tiro Práctico', topics: ['Nomenclatura de revólver y pistola semiautomática', 'Medidas de seguridad en el desarme y limpieza', 'Instrucción de tiro en polígono homologado OS-10'] },
      { number: '03', title: 'Seguridad en Entidades Financieras y Transporte de Valores', topics: ['Protocolos de bóveda y apertura retardada', 'Reacción ante toma de rehenes y asaltos coordinados', 'Custodia de valores en tránsito'] }
    ],
    teachers: [
      {
        name: 'Suboficial Mayor (R) Jorge Paredes Alarcón',
        role: 'Instructor Maestro de Tiro y Tácticas Armadas',
        credentials: 'Perito Armero • Acreditado OS-10 Carabineros de Chile',
        bio: 'Especialista en balística forense y tiro táctico con más de 25 años formando vigilantes bancarios e instructores de tiro en la zona norte.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Ley N° 17.798 sobre Control de Armas y Explosivos y su Reglamento complementario.',
      'Decreto Ley N° 3.607: Normas sobre Vigilantes Privados en Chile.',
      'Manual de Operaciones para el Transporte de Valores y Seguridad Bancaria (OS-10 Carabineros).'
    ],
    videoData: {
      title: 'Cápsula RRSS: Todo lo que debes saber del Curso de Vigilantes Privados y Polígono',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula de orientación en Redes Sociales PrevySeg',
      duration: '04:10 min',
      description: 'Video explicativo donde se abordan los requisitos de tiro, la situación militar al día y las oportunidades laborales de alta remuneración en bancos y minería.',
      topicsCovered: ['Diferencias salariales entre guardia y vigilante', 'Cómo prepararse para el examen psicológico', 'Fechas de polígono de tiro en Arica']
    }
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
        bio: 'Especialista en seguridad portuaria internacional con 18 años de servicio en la Armada de Chile y jefaturas de seguridad en terminales marítimos de Arica.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Código Internacional para la Protección de los Buques y de las Instalaciones Portuarias (Código PBIP/ISPS).',
      'Decreto Ley N° 2.222: Ley de Navegación de la República de Chile.',
      'Código Marítimo Internacional de Mercancías Peligrosas (Código IMDG).'
    ],
    videoData: {
      title: 'Cápsula RRSS: Empleabilidad Portuaria y Certificación Directemar',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula audiovisual mensual de difusión PrevySeg',
      duration: '03:30 min',
      description: 'Conoce los beneficios de capacitarte como guardia marítimo portuario en Arica, los trámites ante Capitanía de Puerto y las oportunidades en TPA y EPA.',
      topicsCovered: ['Qué exige Directemar para otorgar la matrícula portuaria', 'Horarios de clases', 'Inserción laboral portuaria']
    }
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
    teachers: [{ name: 'Carlos Valenzuela Soto', role: 'Instructor de Seguridad', credentials: 'OS-10 Carabineros', bio: 'Instructor con amplia experiencia en capacitación de conserjería.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Ley N° 21.442 de Copropiedad Inmobiliaria.', 'Ley N° 21.659 de Seguridad Privada.'],
    videoData: {
      title: 'Cápsula RRSS: La Nueva Ley de Seguridad y los Conserjes de Condominios',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula mensual de orientación comunitaria',
      duration: '03:15 min',
      description: 'Aprende por qué los nocheros y conserjes ahora deben estar capacitados y cómo evitar sanciones de la Subsecretaría de Prevención del Delito.',
      topicsCovered: ['Diferencia entre conserje y guardia', 'Acreditación requerida', 'Inscripción para comités de administración']
    }
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
    teachers: [{ name: 'Mayor (R) Carlos Valenzuela Soto', role: 'Instructor Jefe OS-10', credentials: 'Registro SPD N° 458-2024', bio: 'Especialista en legislación de seguridad.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Ley N° 21.659 de Seguridad Privada.', 'Manual de Perfeccionamiento OS-10 Carabineros.'],
    videoData: {
      title: 'Cápsula RRSS: ¿Tienes tu credencial por vencer? Cómo renovar fácil con PrevySeg',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula mensual de orientación profesional',
      duration: '02:50 min',
      description: 'Guía rápida para renovar tu credencial OS-10 por 4 años en solo 5 días de clases.',
      topicsCovered: ['Plazos para renovar antes de que expire', 'Trámite digital con ClaveÚnica', 'Horarios de clases intensivas']
    }
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
    bibliography: ['Código PBIP/ISPS.', 'Reglamentos Directemar.'],
    videoData: { title: 'Cápsula RRSS: Revalidación Portuaria en Arica', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual RRSS', duration: '03:00 min', description: 'Todo sobre la renovación de matrícula marítima ante Capitanía de Puerto.', topicsCovered: ['Exámenes Directemar', 'Cupos y fechas'] }
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
    teachers: [{ name: 'Carlos Valenzuela Soto', role: 'Instructor de Seguridad', credentials: 'OS-10 Carabineros', bio: 'Instructor con amplia experiencia.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Ley N° 21.442 de Copropiedad Inmobiliaria.'],
    videoData: { title: 'Cápsula RRSS: Actualización para Conserjes y Nocheros', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual RRSS', duration: '02:40 min', description: 'Mejores prácticas para la seguridad en condominios.', topicsCovered: ['Nuevas tecnologías de acceso', 'Cierre de turnos'] }
  },

  'seg-08': {
    subtitle: 'Operación Profesional de Cámaras CCTV (Código SENCE)',
    summary: 'Formación técnica y operativa para operadores de salas de control y centros de monitoreo de televisión en circuito cerrado (CCTV) con software VMS, analítica con inteligencia artificial y cadena de custodia judicial de evidencias.',
    objective: 'Capacitar operadores con las destrezas de patrullaje virtual, control de domos PTZ y gestión de video forense para la prevención y persecución del delito.',
    specificObjectives: [
      'Operar cámaras PTZ, cámaras fijas y térmicas en consolas joystick y software VMS.',
      'Detectar conductas sospechosas mediante analítica de video y patrones de comportamiento.',
      'Preservar la cadena de custodia de grabaciones como prueba admisible en tribunales.'
    ],
    schedule: '10 días hábiles • Diurno: 09:00 a 13:00 hrs | Vespertino: 18:00 a 21:30 hrs',
    durationDetail: '40 horas pedagógicas certificadas por SENCE',
    totalHours: 40,
    weeks: '2 semanas',
    classesCount: '10 jornadas',
    nextDate: '19/10/2026',
    modality: 'Presencial con Simulador de Sala de Monitoreo',
    price: '$120.000 CLP',
    depositPrice: '$60.000 CLP (50%)',
    paymentFacility: '2 cuotas del 50% ($60.000 c/u)',
    certification: 'Certificado Oficial SENCE OTEC PrevySeg con Código de Franquicia Tributaria',
    requirements: ['Cédula de Identidad chilena vigente.', 'Licencia de 4° Medio aprobada.', 'Conocimientos básicos de computación a nivel usuario.'],
    modules: [
      { number: '01', title: 'Topología de Redes y Arquitectura de Centrales CCTV', topics: ['Protocolos IP, códecs H.264/H.265 y NVRs', 'Diseño de videowall y ergonomía de puesto'] },
      { number: '02', title: 'Operación de Cámaras PTZ y Software VMS', topics: ['Patrullaje programado, tours y zoom óptico', 'Gestión de alertas automáticas y sensores'] },
      { number: '03', title: 'Extracción de Evidencias y Cadena de Custodia', topics: ['Exportación segura de video forense', 'Aspectos legales y protección de la privacidad'] }
    ],
    teachers: [
      {
        name: 'Ing. Alejandro Morales Sepúlveda',
        role: 'Ingeniero de Telecomunicaciones y CCTV',
        credentials: 'Certificado Milestone VMS • Relator SENCE NCh 2728',
        bio: 'Ingeniero con 14 años de experiencia en diseño de centrales de monitoreo municipal, retail y minería en el norte grande.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Norma Técnica de Seguridad Privada Electrónica (Subsecretaría de Prevención del Delito).',
      'Manual de Operación de Sistemas de Videoprotección Urbana (Ministerio del Interior).',
      'Guía Práctica de Cadena de Custodia de Evidencia Digital (Ministerio Público de Chile).'
    ],
    videoData: {
      title: 'Cápsula RRSS: Conoce la Sala de Monitoreo CCTV de PrevySeg y Aprende con IA',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula mensual de tecnología y seguridad RRSS',
      duration: '03:55 min',
      description: 'Te mostramos por dentro el taller de cámaras de PrevySeg y cómo aprenderás a usar domos motorizados y software de última generación.',
      topicsCovered: ['Prácticas con cámaras reales', 'Campo laboral en retail y condominios', 'Certificado con código SENCE']
    }
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
    teachers: [{ name: 'Mayor (R) Carlos Valenzuela Soto', role: 'Director Académico de Seguridad', credentials: 'OS-10 y SPD', bio: 'Experto en mando y operaciones.', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Ley N° 21.659 de Seguridad Privada.', 'Código del Trabajo de Chile: Jornadas excepcionales.'],
    videoData: {
      title: 'Cápsula RRSS: Da el salto a Supervisor de Seguridad con PrevySeg',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula mensual de liderazgo laboral',
      duration: '03:20 min',
      description: 'Descubre cómo ascender en tu empresa de seguridad y dominar la confección de directivas de funcionamiento.',
      topicsCovered: ['Requisitos para asumir jefatura de turno', 'Malla curricular ejecutiva', 'Convenios con empresas']
    }
  },

  // =======================================================================
  // 2. ESCUELA DE OFICIOS Y EMPLEABILIDAD PRODUCTIVA (SENCE / NCH 2728)
  // =======================================================================

  'of-01': {
    subtitle: 'Resolución de Conflictos y Manejo de Situaciones Difíciles',
    summary: 'Capacitación en habilidades blandas, negociación y contención emocional orientada a personal de atención al cliente, ejecutivos, guardias y trabajadores de entornos laborales de alta presión.',
    objective: 'Desarrollar herramientas de comunicación asertiva y negociación para transformar controversias en acuerdos colaborativos y mitigar el estrés laboral.',
    specificObjectives: ['Aplicar técnicas de desescalamiento verbal ante clientes o usuarios hostiles.', 'Fortalecer la empatía y la resiliencia en equipos de trabajo.'],
    schedule: 'Plataforma Online 24/7 disponible las 4 semanas del mes',
    durationDetail: '40 horas cronológicas e-learning asíncrono',
    totalHours: 40,
    weeks: '4 semanas',
    classesCount: 'Módulos interactivos 24/7',
    nextDate: '15/10/2026',
    modality: 'Online Asíncrona (Aula Virtual 24/7)',
    price: '$95.000 CLP',
    depositPrice: '$47.500 CLP (50%)',
    paymentFacility: '2 cuotas de $47.500 CLP • Franquicia SENCE 100%',
    certification: 'Diploma Oficial SENCE OTEC PrevySeg con Certificación de Competencias',
    requirements: ['Cédula de Identidad chilena.', 'Mayor de 18 años.', 'Dispositivo con conexión a internet.'],
    modules: [
      { number: '01', title: 'Psicología del Conflicto y Dinámicas Laborales', topics: ['Factores detonantes del conflicto', 'Manejo de la frustración y clima laboral'] },
      { number: '02', title: 'Comunicación Asertiva y Lenguaje No Verbal', topics: ['Escucha activa y validación emocional', 'Límites saludables'] },
      { number: '03', title: 'Técnicas de Negociación Harvard y Acuerdos Ganar-Ganar', topics: ['Modelos de mediación', 'Resolución constructiva de disputas'] }
    ],
    teachers: [{ name: 'Ps. Andrea Cárdenas Godoy', role: 'Psicóloga Organizacional', credentials: 'Magíster en RRHH • Relatora SENCE', bio: 'Especialista en coaching de equipos y resolución de controversias laborales.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Método Harvard de Negociación (Fisher & Ury).', 'Inteligencia Emocional en el Trabajo (Daniel Goleman).'],
    videoData: { title: 'Cápsula RRSS: Aprende a Resolver Conflictos con Éxito', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual de habilidades blandas', duration: '02:50 min', description: 'Cómo controlar situaciones difíciles en tu trabajo de forma profesional.', topicsCovered: ['Casos reales de clientes molestos', 'Aula virtual disponible 24/7'] }
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
    bibliography: ['Manual de Dinámicas Grupales y Mediación.'],
    videoData: { title: 'Cápsula RRSS: Taller Vivencial de Conflictos en Arica', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual RRSS', duration: '02:30 min', description: 'Un vistazo al taller presencial más dinámico de Arica.', topicsCovered: ['Roleplaying práctico', 'Cupos limitados'] }
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
    bibliography: ['Resolución SAG N° 2.195 sobre Evaluaciones de Aplicadores.', 'Decreto Supremo N° 157: Reglamento de Plaguicidas (Minsal).'],
    videoData: { title: 'Cápsula RRSS: Obtén tu Carnet SAG de Aplicador de Plaguicidas en Arica', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual del sector agrícola', duration: '03:40 min', description: 'Requisitos y salidas a terreno para acreditarte ante el SAG.', topicsCovered: ['Valle de Azapa y Lluta', 'Uso de EPP y examen SAG'] }
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
    teachers: [{ name: 'Rodrigo Cisternas Vega', role: 'Instructor Portuario', credentials: 'Directemar PBIP', bio: 'Oficial de protección portuaria.', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Código de Prácticas de Seguridad en Instalaciones Portuarias (OIT).'],
    videoData: { title: 'Cápsula RRSS: Empleo y Capacitación Portuaria en Arica', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual RRSS', duration: '03:10 min', description: 'Oportunidades de trabajo en carga y estiba en el puerto de Arica.', topicsCovered: ['Requisitos físicos', 'Faenas con grúas'] }
  },

  'of-05': {
    subtitle: 'Curso de Manipulación de Alimentos y Técnicas Gastronómicas',
    summary: 'Formación oficial e intensiva para personas interesadas en emprender o trabajar en restaurantes, cafeterías, casinos, panaderías y servicios de catering, cumpliendo las directrices del Reglamento Sanitario de los Alimentos (DTO 977/96) de la Seremi de Salud de Arica y Parinacota.',
    objective: 'Formar a los participantes en los conocimientos, habilidades y acciones necesarias para elaborar y comercializar alimentos de manera segura, aplicando herramientas, presentación y formalización para desarrollar su propio emprendimiento.',
    specificObjectives: [
      'Aplicar Buenas Prácticas de Manufactura (BPM) y control de puntos críticos (HACCP).',
      'Elaborar fichas técnicas de producción, costeo de recetas y control de mermas.',
      'Gestionar la obtención de la Autorización Sanitaria de Alimentos y patentes comerciales.',
      'Diseñar y envasar productos alimenticios con rotulado nutricional normativo.'
    ],
    schedule: '3 veces por semana (Martes, Miércoles y Jueves) • 09:00 a 13:30 hrs',
    durationDetail: '60 horas pedagógicas (16 hrs teóricas / 28 hrs prácticas en cocina / 16 hrs de proyecto)',
    totalHours: 60,
    weeks: '4 semanas',
    classesCount: '12 sesiones presenciales',
    nextDate: '20/10/2026',
    modality: 'Presencial Teórico-Práctica en Cocina-Taller',
    price: '$150.000 CLP',
    depositPrice: '$75.000 CLP (50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas del 50% ($75.000 c/u)',
    certification: 'Certificación Oficial para Carnet de Manipulador Seremi de Salud y Diploma OTEC PrevySeg',
    requirements: [
      'Cédula de Identidad chilena vigente (o extranjera con permanencia definitiva).',
      'Mayor de 18 años cumplidos.',
      'Interés en formalizar o iniciar un emprendimiento en el rubro gastronómico.',
      'Salud compatible con funciones de manipulación de alimentos.'
    ],
    modules: [
      {
        number: '01',
        title: 'Fundamentos de Higiene, Inocuidad y Microbiología de los Alimentos',
        topics: [
          'Reglamento Sanitario de los Alimentos (DTO 977/96).',
          'Enfermedades Transmitidas por Alimentos (ETA) y bacterias de riesgo.',
          'Higiene personal, lavado de manos clínico y uso de uniforme EPP reglamentario.',
          'Contaminación cruzada directa e indirecta.'
        ]
      },
      {
        number: '02',
        title: 'Abastecimiento, Selección de Insumos y Control de Costos',
        topics: [
          'Recepción y verificación de materias primas con control de temperatura.',
          'Almacenamiento por zonas y rotación FIFO/FEFO (lo primero en entrar es lo primero en salir).',
          'Control de mermas, cálculo de rendimientos y presupuestos de compras.'
        ]
      },
      {
        number: '03',
        title: 'Planificación de la Producción y Buenas Prácticas de Manufactura (BPM)',
        topics: [
          'Organización de la línea de trabajo y mise en place profesional.',
          'Elaboración de fichas técnicas de recetas estandarizadas.',
          'Procedimientos Operativos Estandarizados de Sanitización (POES).'
        ]
      },
      {
        number: '04',
        title: 'Elaboración, Técnicas de Cocción y Presentación Comercial',
        topics: [
          'Técnicas de cocción con puntos críticos de control térmico (>70°C).',
          'Emplatado, montaje estético y porcionamiento para la venta.',
          'Envasado al vacío, sellado térmico y técnicas de delivery seguro.'
        ]
      },
      {
        number: '05',
        title: 'Permisología Sanitaria, Formalización y Emprendimiento',
        topics: [
          'Requisitos para la Autorización Sanitaria de Alimentos (Seremi de Salud).',
          'Resolución sanitaria de elaboración, expendio y carros de comida (Foodtrucks).',
          'Rotulado nutricional obligatorio según la Ley 20.606 (Sellos Altos En).'
        ]
      },
      {
        number: '06',
        title: 'Implementación del Proyecto Piloto de Alimentos',
        topics: [
          'Desarrollo de un producto gastronómico comercial.',
          'Prueba piloto y degustación con pauta de evaluación sensorial.',
          'Portafolio final del emprendimiento con plan de comercialización.'
        ]
      }
    ],
    teachers: [
      {
        name: 'Chef Instructora Paola Fuentes Morales',
        role: 'Chef Internacional y Relatora en Inocuidad Alimentaria',
        credentials: 'Acreditada SENCE • Asesora HACCP para Empresas Gastronómicas',
        bio: 'Chef ejecutiva con 16 años de trayectoria dirigiendo cocinas de alta gama, asesorando a microempresarios en resolución sanitaria y capacitando manipuladores en toda la región.',
        avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Reglamento Sanitario de los Alimentos: Decreto Supremo N° 977/96 (Minsal).',
      'Manual de Buenas Prácticas de Manufactura en Servicios Gastronómicos (ACHIPIA).',
      'Ley N° 20.606 sobre Composición Nutricional de los Alimentos y su Publicidad.',
      'Norma Técnica sobre Sistema de Análisis de Peligros y Puntos Críticos de Control (HACCP).'
    ],
    videoData: {
      title: 'Cápsula RRSS: Todo sobre el Curso de Manipulación de Alimentos y Resolución Sanitaria',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula mensual de oficios y gastronomía',
      duration: '04:05 min',
      description: 'Nuestra encargada de redes te muestra la cocina-taller equipada de PrevySeg, cómo aprenderás a preparar alimentos inocuos y cómo obtener tu carnet oficial de la Seremi para trabajar de inmediato.',
      topicsCovered: [
        'Aprenderás en cocina real con insumos incluidos.',
        'Cómo sacar el carnet de manipulador de alimentos en Arica.',
        'Cómo formalizar tu propio emprendimiento gastronómico o foodtruck.',
        'Facilidades de pago en 2 cuotas del 50%.'
      ]
    }
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
    bibliography: ['Manual de Cosmetología y Bioseguridad Cutánea.'],
    videoData: { title: 'Cápsula RRSS: Aprende Depilación Profesional con Cera Miel', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual de estética', duration: '03:10 min', description: 'Emprende desde casa con servicios de depilación profesional.', topicsCovered: ['Kit inicial incluido', 'Prácticas en modelos reales'] }
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
    bibliography: ['Manual de Dermatología Básica y Bioseguridad en Manicura.'],
    videoData: { title: 'Cápsula RRSS: Conviértete en Manicurista Profesional y Emprende', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual de estética', duration: '03:30 min', description: 'Descubre las técnicas de acrílico y esmaltado permanente con mayor demanda.', topicsCovered: ['Uso de torno', 'Prácticas desde la primera clase', 'Ingresos promedio de una manicurista'] }
  },

  'of-08': {
    subtitle: 'Curso de Maquillaje de Carnaval y Estilismo Festivo',
    summary: 'Taller especializado para crear looks de alto impacto para el Carnaval con la Fuerza del Sol de Arica, eventos folclóricos y festivales. Enseña fijación extrema resistente a la sudoración, pegado de pedrería, trenzados y peinados de comparsa.',
    objective: 'Dominar el arte del maquillaje artístico de carnaval y ornamentación capilar de alto impacto con fijación resistente a condiciones extremas de calor, movimiento y sudor.',
    specificObjectives: [
      'Diagnosticar la piel y aplicar protocolos de preparación cutánea para eventos de larga duración.',
      'Diseñar y ejecutar looks de ojos de impacto con glitter, pedrería y sellado HD.',
      'Elaborar peinados trenzados ornamentados con plumas, telas y accesorios festivos.'
    ],
    schedule: 'Vespertino • Lunes, Miércoles y Viernes de 18:30 a 21:00 hrs',
    durationDetail: '30 horas prácticas en taller estético',
    totalHours: 30,
    weeks: '3 semanas',
    classesCount: '10 sesiones',
    nextDate: '19/10/2026',
    modality: 'Presencial Especializado (Teórico-Práctica)',
    price: '$90.000 CLP',
    depositPrice: '$45.000 CLP (50%)',
    paymentFacility: 'Facilidad de pago en 2 cuotas del 50% ($45.000 c/u)',
    certification: 'Certificado de Participación Oficial OTEC PrevySeg con Kit de Trabajo',
    requirements: ['Cédula de Identidad chilena vigente.', 'Mayor de 18 años.', 'No se requieren conocimientos previos en maquillaje.'],
    modules: [
      {
        number: '01',
        title: 'Cuidado de la Piel, Colorimetría y Teoría del Color Festivo',
        topics: [
          'Diagnóstico cutáneo y preparación con primer fijador de alto rendimiento.',
          'Círculo cromático, armonías de color y selección de paletas según el traje de comparsa.'
        ]
      },
      {
        number: '02',
        title: 'Peinados de Carnaval y Ornamentación Capilar',
        topics: [
          'Técnicas de recogido trenzado (boxeadoras, trenzas africanas y holandesas).',
          'Fijación extrema de plumas, pedrería y tocados resistentes al movimiento.'
        ]
      },
      {
        number: '03',
        title: 'Maquillaje de Carnaval Teórico y Práctico con Acabado HD',
        topics: [
          'Bases de alta cobertura, contornos en crema y sellado waterproof.',
          'Colocación de pedrería facial con adhesivo profesional hipoalergénico.',
          'Labios 3D y evaluación final con modelo de comparsa.'
        ]
      }
    ],
    teachers: [
      {
        name: 'Camila Valenzuela Pizarro',
        role: 'Maquilladora Profesional y Directora de Estilismo',
        credentials: 'Maquilladora Certificada en Efectos Especiales y Festivales',
        bio: 'Maquilladora oficial de comparsas del Carnaval de Arica con 7 años liderando cuadrillas de estética para bailarines de Morenada y Caporales.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      'Manual de Maquillaje Profesional y Técnicas de Escenario.',
      'Guía de Seguridad Dermatológica en Cosmética Artística (ISP Chile).'
    ],
    videoData: {
      title: 'Cápsula RRSS: Prepárate para el Carnaval con el Curso de Maquillaje PrevySeg',
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula mensual de estilismo y cultura regional',
      duration: '03:40 min',
      description: 'Aprende a maquillar y peinar para el Carnaval con la Fuerza del Sol con técnicas resistentes al calor y sudor. ¡Inicia tu propio negocio de estilismo!',
      topicsCovered: [
        'Kit de insumos entregado desde el primer día.',
        'Técnicas de fijación de pedrería y plumas.',
        'Cómo cobrar tus servicios por bailarina en el carnaval.'
      ]
    }
  },

  'of-09': {
    subtitle: 'Cuidados del Adulto Mayor y Personas Dependientes',
    summary: 'Capacitación humana y técnica para desempeñarse como cuidador/a formal de adultos mayores en domicilios particulares, residencias de larga estadía (ELEAM) y centros de día.',
    objective: 'Entregar herramientas de atención biopsicosocial, administración de medicamentos, movilización segura y primeros auxilios gerontológicos.',
    specificObjectives: ['Aprender técnicas de traslado ergonómico para evitar caídas y lesiones.', 'Manejo de patologías frecuentes: demencias, diabetes e hipertensión.'],
    schedule: 'Lunes a Jueves • 18:00 a 21:00 hrs',
    durationDetail: '50 horas pedagógicas',
    totalHours: 50,
    weeks: '4 semanas',
    classesCount: '16 sesiones',
    nextDate: '26/10/2026',
    modality: 'Presencial con Prácticas Clínicas en Taller',
    price: '$120.000 CLP',
    depositPrice: '$60.000 CLP (50%)',
    paymentFacility: '2 cuotas de $60.000 CLP',
    certification: 'Diploma de Cuidador/a de Personas Mayores OTEC PrevySeg',
    requirements: ['Cédula de Identidad chilena vigente.', 'Mayor de 18 años.', 'Vocación de servicio y empatía.'],
    modules: [
      { number: '01', title: 'Gerontología Básica y Derechos de la Persona Mayor', topics: ['Envejecimiento activo y prevención de vulneración de derechos'] },
      { number: '02', title: 'Cuidados Clínicos, Movilización y Prevención de UPP', topics: ['Cambios posturales, aseo y confort en cama', 'Prevención de úlceras por presión'] },
      { number: '03', title: 'Administración de Medicamentos y Urgencias Médicas', topics: ['Control de signos vitales', 'Primeros auxilios geriátricos y atragantamiento'] }
    ],
    teachers: [{ name: 'Enf. Patricia Morales Soto', role: 'Enfermera Universitaria Gerontóloga', credentials: 'Magíster en Salud Pública', bio: 'Enfermera clínica con 15 años de experiencia en cuidados geriátricos.', avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Manual de Cuidados del Adulto Mayor Dependiente (SENAMA).', 'Guía Clínica de Prevención de Caídas en Personas Mayores (Minsal).'],
    videoData: { title: 'Cápsula RRSS: Fórmate como Cuidador/a de Adultos Mayores con PrevySeg', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual de salud y bienestar', duration: '03:15 min', description: 'Una carrera con alta demanda y enorme valor social en Arica.', topicsCovered: ['Técnicas de enfermería básica', 'Inserción laboral rápida'] }
  },

  'of-10': {
    subtitle: 'Cajero Bancario y Comercial con Detección de Fraudes',
    summary: 'Formación para desempeñarse en cajas de bancos, retail, supermercados y empresas de cobranza, aprendiendo cuadre de caja, arqueos, operación de terminales POS y detección de billetes falsos.',
    objective: 'Entrenar cajeros comerciales y bancarios con alta precisión numérica y velocidad operativa.',
    specificObjectives: ['Identificar marcas de seguridad en papel moneda nacional y dólares.', 'Dominar técnicas de arqueo rápido sin descuadres.'],
    schedule: 'Lunes a Viernes • 18:30 a 21:30 hrs',
    durationDetail: '45 horas pedagógicas presenciales',
    totalHours: 45,
    weeks: '3 semanas',
    classesCount: '15 sesiones',
    nextDate: '26/10/2026',
    modality: 'Presencial con Simulador de Caja',
    price: '$110.000 CLP',
    depositPrice: '$55.000 CLP (50%)',
    paymentFacility: '2 cuotas de $55.000 CLP',
    certification: 'Certificado de Cajero Bancario y Comercial OTEC PrevySeg',
    requirements: ['Cédula de Identidad chilena vigente.', 'Licencia de Enseñanza Media completa.'],
    modules: [
      { number: '01', title: 'Operatoria de Caja y Medios de Pago', topics: ['Efectivo, cheques, tarjetas bancarias y transferencias electrónicas'] },
      { number: '02', title: 'Detección de Moneda Falsa y Medidas de Seguridad', topics: ['Billetes de la familia polímero y algodón', 'Luz UV y tacto'] },
      { number: '03', title: 'Arqueo, Cuadre Diario y Atención al Cliente', topics: ['Procedimientos ante faltantes/sobrantes', 'Manejo del estrés en horas punta'] }
    ],
    teachers: [{ name: 'Contador Auditor René Salgado Osses', role: 'Auditor Financiero', credentials: 'Ex Jefe de Cajas BancoEstado', bio: 'Especialista en control de tesorería y detección de fraudes comerciales.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80' }],
    bibliography: ['Manual de Billetes y Monedas en Circulación (Banco Central de Chile).'],
    videoData: { title: 'Cápsula RRSS: Aprende Cajero Bancario y Trabaja en Retail o Bancos', presenter: 'Camila Valenzuela', frequency: 'Cápsula mensual de negocios', duration: '03:00 min', description: 'Cómo funciona la caja registradora, detección de billetes y salidas laborales.', topicsCovered: ['Simulador de caja', 'Detección de billetes con luz UV', 'Prácticas reales'] }
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
    teachers: [
      {
        name: isSecurity ? 'Instructor Oficial PrevySeg' : 'Relator/a Especialista SENCE',
        role: isSecurity ? 'Instructor Acreditado OS-10 / SPD' : 'Relator/a Certificado/a NCh 2728',
        credentials: isSecurity ? 'Acreditación OS-10 Carabineros de Chile' : 'Registro Nacional de Relatores SENCE',
        bio: 'Profesional con más de 10 años de experiencia técnica y pedagógica en capacitación laboral.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      }
    ],
    bibliography: [
      isSecurity ? 'Ley N° 21.659 de Seguridad Privada y Decretos complementarios.' : 'Norma Chilena NCh 2728:2015 sobre Sistemas de Gestión de Calidad para OTEC.',
      'Manuales técnicos y guías de procedimiento institucional OTEC PrevySeg.'
    ],
    videoData: {
      title: `Cápsula Informativa Oficial: Todo sobre el curso ${course.title}`,
      presenter: 'Camila Valenzuela — Encargada de RRSS PrevySeg',
      frequency: 'Cápsula del ciclo mensual de difusión en Redes Sociales',
      duration: '03:00 min',
      description: `Nuestra encargada de RRSS explica en video los aspectos clave de ${course.title}, campo laboral y facilidades de matrícula en Arica.`,
      topicsCovered: [
        'Requisitos de postulación.',
        'Duración y modalidad de estudio.',
        'Facilidades de pago y certificación oficial.'
      ]
    }
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
