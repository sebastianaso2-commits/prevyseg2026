const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

async function generateDevelopmentGantt() {
  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'PrevySeg OTEC - Dirección de Ingeniería';
  workbook.lastModifiedBy = 'Sebastian Acuña (Ingeniero a Cargo)';
  workbook.created = new Date(2026, 7, 1);
  workbook.modified = new Date(2026, 9, 6);

  // Paleta de Colores Oficial PrevySeg SpA (Manual de Marca)
  const DARK_NAVY = '161630';      // Azul Noche Profundo (#161630 | RGB: 22, 22, 48)
  const SLATE_HEADER = '1B3761';   // Azul Corporativo PrevySeg (#1b3761 | RGB: 27, 55, 97)
  const ACCENT_SKY = '1B3761';     // Azul PrevySeg
  const ACCENT_TEAL = '0A969B';    // Turquesa Vibrante PrevySeg (#0a969b | RGB: 10, 150, 155)
  const CYAN_NEON = '00FFE0';      // Cian Neón (#00FFE0)
  const SUCCESS_GREEN = '16A34A';  // Verde Aprobado
  const WARNING_AMBER = 'D97706';  // Ámbar En Curso / Insumo
  const WARM_ORANGE = '0A969B';    // Turquesa PrevySeg
  const PURPLE_SPD = '6D28D9';     // Morado SPD
  const LIGHT_BG = 'F8FAFC';       // Fondo claro
  const BORDER_COLOR = 'CBD5E1';   // Bordes suaves
  const SUNDAY_FILL = 'F1F5F9';    // Fines de semana

  // Colores para Hitos (Milestones)
  const GOLD_MILESTONE = 'D97706'; // Ámbar Oro para Hitos
  const GOLD_LIGHT = 'FEF3C7';     // Fondo suave para filas de hitos
  const GOLD_BORDER = 'F59E0B';    // Borde de hitos
  const GOLD_TEXT = '78350F';      // Texto oscuro para hitos

  const thinBorder = {
    top: { style: 'thin', color: { argb: BORDER_COLOR } },
    left: { style: 'thin', color: { argb: BORDER_COLOR } },
    bottom: { style: 'thin', color: { argb: BORDER_COLOR } },
    right: { style: 'thin', color: { argb: BORDER_COLOR } }
  };

  const headerBorder = {
    top: { style: 'medium', color: { argb: DARK_NAVY } },
    left: { style: 'thin', color: { argb: '334155' } },
    bottom: { style: 'medium', color: { argb: DARK_NAVY } },
    right: { style: 'thin', color: { argb: '334155' } }
  };

  const milestoneBorder = {
    top: { style: 'thin', color: { argb: GOLD_BORDER } },
    left: { style: 'thin', color: { argb: GOLD_BORDER } },
    bottom: { style: 'thin', color: { argb: GOLD_BORDER } },
    right: { style: 'thin', color: { argb: GOLD_BORDER } }
  };

  function getDateForDay(dayIndex) {
    const cur = new Date(2026, 8, dayIndex);
    const dd = String(cur.getDate()).padStart(2, '0');
    const mm = String(cur.getMonth() + 1).padStart(2, '0');
    const yyyy = cur.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }

  // Actividades agrupadas en 13 Etapas durante 75 Días (2 Meses y 15 Días) + 11 Hitos Críticos (Milestones)
  // Mes 1: Días 1 al 30 (Septiembre 2026) — Arquitectura y Core
  // Mes 2: Días 31 al 60 (Octubre 2026) — Cambios Recientes + Nuevos Requerimientos + CMS + Espacio Evolutivo
  // Fase Final: Días 61 al 75 (15 Días) — Revisión Técnica, Auditoría, QA, Marcha Blanca y Cierre
  const activities = [
    // =========================================================================
    // MES 1: DÍAS 1 AL 30 (SEPTIEMBRE 2026) — ARQUITECTURA, DESARROLLO CORE Y LMS
    // =========================================================================
    
    // ETAPA 1
    {
      wbs: '1.0',
      phase: 'ETAPA 1: LEVANTAMIENTO, PLANIFICACIÓN E INSUMOS DEL CLIENTE',
      name: 'Fase de Inicio, Levantamiento Técnico y Definición de Insumos',
      inputs: 'Definición de objetivos institucionales OTEC, organigrama y alcance general',
      resp: 'Jefe de Proyecto / OTEC PrevySeg',
      startDay: 1, endDay: 4, days: 4, pct: 100, status: 'COMPLETADO', isHeader: true, color: '1E3A8A'
    },
    {
      wbs: '1.1',
      phase: 'ETAPA 1',
      name: 'Levantamiento de Requisitos del Sistema y Marco Regulatorio SENCE/SPD',
      inputs: 'Manuales de procedimiento interno, acreditación NCh 2728 y normativas SENCE',
      resp: 'Analista de Sistemas / Mandatario OTEC',
      startDay: 1, endDay: 2, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '1.2',
      phase: 'ETAPA 1',
      name: 'Recepción y Catalogación de Insumos Institucionales de la Empresa',
      inputs: 'Logotipos vectoriales, manual de marca, paleta de colores, fotografías de sedes',
      resp: 'Diseñador UI / Contraparte Empresa',
      startDay: 2, endDay: 3, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '1.3',
      phase: 'ETAPA 1',
      name: 'Formalización de Malla Curricular Base, Precios y Modalidades de Cursos',
      inputs: 'Planilla con códigos SENCE vigentes, valores por curso, horas pedagógicas y sedes',
      resp: 'Dirección Académica OTEC',
      startDay: 3, endDay: 4, days: 2, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    // HITO 1
    {
      wbs: 'H-01',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 1: Cierre de Levantamiento Inicial y Formalización de Insumos Base',
      inputs: 'Acta de formalización de requerimientos, manual de marca y catálogo de 20 cursos validados',
      resp: 'Jefe de Proyecto / Contraparte OTEC PrevySeg',
      startDay: 4, endDay: 4, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 2
    {
      wbs: '2.0',
      phase: 'ETAPA 2: DISEÑO DE ARQUITECTURA, UX/UI Y PROTOTIPADO',
      name: 'Fase de Diseño Técnico, Modelado de Datos y Prototipos',
      inputs: 'Aprobación de wireframes iniciales y definición de flujos de usuario clave',
      resp: 'Arquitecto de Software / UX Lead',
      startDay: 5, endDay: 8, days: 4, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0F766E'
    },
    {
      wbs: '2.1',
      phase: 'ETAPA 2',
      name: 'Diseño del Sistema de Diseño UI (Design System) y Tokens Tailwind CSS',
      inputs: 'Guía de estilo corporativa aprobada por la gerencia de PrevySeg',
      resp: 'Diseñador Frontend',
      startDay: 5, endDay: 6, days: 2, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '2.2',
      phase: 'ETAPA 2',
      name: 'Modelado Entidad-Relación de Base de Datos PostgreSQL en Supabase Cloud',
      inputs: 'Definición de campos requeridos para postulantes, matrículas y fiscalización',
      resp: 'Ingeniero de Base de Datos',
      startDay: 6, endDay: 7, days: 2, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '2.3',
      phase: 'ETAPA 2',
      name: 'Configuración de Repositorio GitHub y Pipeline de Integración Continua CI/CD',
      inputs: 'Cuentas institucionales, permisos de acceso al repositorio en GitHub',
      resp: 'DevOps / Sebastian Acuña',
      startDay: 7, endDay: 8, days: 2, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    // HITO 2
    {
      wbs: 'H-02',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 2: Aprobación de Arquitectura de Software, Tokens UI y Modelo Supabase',
      inputs: 'Prototipos UX/UI validados, esquema relacional PostgreSQL y pipeline CI/CD activo',
      resp: 'Arquitecto de Software / Mandatario PrevySeg',
      startDay: 8, endDay: 8, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 3
    {
      wbs: '3.0',
      phase: 'ETAPA 3: DESARROLLO CORE FRONTEND Y PORTAL PÚBLICO BASE',
      name: 'Construcción del Portal Web Institucional y Catálogos Comerciales Base',
      inputs: 'Textos corporativos de bienvenida, misión, visión e imágenes HD institucionales',
      resp: 'Ingeniero Frontend React 19',
      startDay: 8, endDay: 14, days: 7, pct: 100, status: 'COMPLETADO', isHeader: true, color: '1E3A8A'
    },
    {
      wbs: '3.1',
      phase: 'ETAPA 3',
      name: 'Desarrollo de Hero Interactivo con Conmutador de Escuelas (Oficio / Seguridad)',
      inputs: 'Banners promocionales y textos comerciales de cursos destacados',
      resp: 'Ingeniero Frontend',
      startDay: 8, endDay: 10, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '3.2',
      phase: 'ETAPA 3',
      name: 'Módulo de Catálogo Dinámico con Filtros por Escuela y Buscador en Vivo',
      inputs: 'Fichas técnicas base de los 20 cursos ofrecidos por PrevySeg',
      resp: 'Ingeniero Frontend',
      startDay: 10, endDay: 12, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '3.3',
      phase: 'ETAPA 3',
      name: 'Ficha Base de Información de Cursos y Formulario de Pre-inscripción',
      inputs: 'Estructura de datos curriculares y campos de contacto inicial de postulantes',
      resp: 'Ingeniero Frontend',
      startDay: 12, endDay: 14, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    // HITO 3
    {
      wbs: 'H-03',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 3: Despliegue de Portal Institucional Base, Catálogo Reactivo y Formulario',
      inputs: 'Sitio web React 19 operativo con buscador en vivo, Hero institucional y formulario de pre-matrícula',
      resp: 'Ingeniero Frontend / Mandatario PrevySeg',
      startDay: 14, endDay: 14, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 4
    {
      wbs: '4.0',
      phase: 'ETAPA 4: BACKEND, SUPABASE POSTGRESQL Y SEGURIDAD BCRYPT',
      name: 'Implementación del Backend en la Nube, API y Procedimientos Almacenados',
      inputs: 'Credenciales del proyecto Supabase Cloud y claves de servicio encriptadas',
      resp: 'Ingeniero Backend & Seguridad',
      startDay: 13, endDay: 18, days: 6, pct: 100, status: 'COMPLETADO', isHeader: true, color: '6D28D9'
    },
    {
      wbs: '4.1',
      phase: 'ETAPA 4',
      name: 'Despliegue de Tablas Maestras: users, courses, enrollments, audit',
      inputs: 'Definición de tipos de datos, restricciones y reglas de negocio relacionales',
      resp: 'Ingeniero Backend',
      startDay: 13, endDay: 15, days: 3, pct: 100, status: 'COMPLETADO', color: '7C3AED'
    },
    {
      wbs: '4.2',
      phase: 'ETAPA 4',
      name: 'Sistema de Autenticación con Hash Bcrypt y Validación de RUT Módulo 11',
      inputs: 'Política de seguridad de contraseñas y algoritmo chileno de RUT oficial',
      resp: 'Especialista en Ciberseguridad',
      startDay: 15, endDay: 17, days: 3, pct: 100, status: 'COMPLETADO', color: '7C3AED'
    },
    {
      wbs: '4.3',
      phase: 'ETAPA 4',
      name: 'Implementación de Procedimiento Atómico de Matrícula y Abono 50%',
      inputs: 'Procedimiento formal de pago: cuentas bancarias y abonos iniciales de reserva',
      resp: 'Ingeniero Backend',
      startDay: 16, endDay: 18, days: 3, pct: 100, status: 'COMPLETADO', color: '7C3AED'
    },
    // HITO 4
    {
      wbs: 'H-04',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 4: Despliegue de Backend Seguro, Hash Bcrypt, RUT Módulo 11 y Abono 50%',
      inputs: 'Esquema PostgreSQL desplegado, autenticación Bcrypt y procedimiento atómico de matrícula validado',
      resp: 'Especialista Ciberseguridad / Backend Lead',
      startDay: 18, endDay: 18, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 5
    {
      wbs: '5.0',
      phase: 'ETAPA 5: PLATAFORMA LMS MULTI-ROL BASE (AULA VIRTUAL Y PANELES)',
      name: 'Desarrollo de la Plataforma de Capacitación y Gestión de Roles Base',
      inputs: 'Perfiles de usuarios tipo (Administrador, Docente, Alumno, Empresa)',
      resp: 'Equipo Fullstack PrevySeg',
      startDay: 18, endDay: 25, days: 8, pct: 100, status: 'COMPLETADO', isHeader: true, color: '1E3A8A'
    },
    {
      wbs: '5.1',
      phase: 'ETAPA 5',
      name: 'Panel de Administración General y Control de Alumnos (SiteAdmin)',
      inputs: 'Definición de funciones de control académico y parámetros de plataforma',
      resp: 'Ingeniero Frontend',
      startDay: 18, endDay: 21, days: 4, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '5.2',
      phase: 'ETAPA 5',
      name: 'Portal del Docente Instructor SPD (Libro de notas, comunicados y repositorio)',
      inputs: 'Pauta de evaluación docente y asignaturas de la malla de Seguridad',
      resp: 'Ingeniero Fullstack',
      startDay: 20, endDay: 22, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '5.3',
      phase: 'ETAPA 5',
      name: 'Portal del Estudiante, Aula Virtual y Reproductor de Clases E-learning',
      inputs: 'Contenidos interactivos SCORM, guías en PDF y videos formativos institucionales',
      resp: 'Ingeniero Frontend',
      startDay: 22, endDay: 24, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '5.4',
      phase: 'ETAPA 5',
      name: 'Portal de Empresas y Bolsa de Empleo con Postulaciones Validadas',
      inputs: 'Convenios con empresas de seguridad privada y perfiles laborales requeridos',
      resp: 'Ingeniero Fullstack',
      startDay: 23, endDay: 25, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },

    // ETAPA 6
    {
      wbs: '6.0',
      phase: 'ETAPA 6: AUDITORÍA Y TRAZABILIDAD SENCE/SPD INICIAL',
      name: 'Módulo de Fiscalización Oficial, Gráficos en Tiempo Real y Live Logs',
      inputs: 'Requerimientos específicos de marcas horarias SENCE y ponderaciones SPD',
      resp: 'Equipo de Ingeniería & Auditoría',
      startDay: 25, endDay: 30, days: 6, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0F766E'
    },
    {
      wbs: '6.1',
      phase: 'ETAPA 6',
      name: 'Motor de Auditoría en Tiempo Real con RPC PostgreSQL (get_audit_aggregated_data)',
      inputs: 'Esquema de eventos auditables y sincronización con servidor horario oficial',
      resp: 'Ingeniero Backend',
      startDay: 25, endDay: 27, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '6.2',
      phase: 'ETAPA 6',
      name: 'Desarrollo de Gráficos de Asistencia SENCE y Cumplimiento de Umbral 75%',
      inputs: 'Reglamento SENCE de cursos sincrónicos y asincrónicos e-learning',
      resp: 'Ingeniero Frontend',
      startDay: 27, endDay: 29, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    {
      wbs: '6.3',
      phase: 'ETAPA 6',
      name: 'Planilla Oficial de Calificaciones SPD con Ponderación 60% Teórico / 40% Práctico',
      inputs: 'Decreto N° 867 y pauta oficial de Carabineros OS-10 para guardias',
      resp: 'Ingeniero Fullstack',
      startDay: 28, endDay: 30, days: 3, pct: 100, status: 'COMPLETADO', color: '0D9488'
    },
    // HITO 5 (FIN MES 1)
    {
      wbs: 'H-05',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 5 (CIERRE MES 1): Plataforma LMS Multi-Rol Operativa y Motor de Auditoría SENCE/SPD',
      inputs: 'Aula Virtual 4 roles en producción, libro de notas SPD 60/40 y dashboard de fiscalización con umbral 75%',
      resp: 'Dirección de Ingeniería / Dirección Académica PrevySeg',
      startDay: 30, endDay: 30, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // =========================================================================
    // MES 2: DÍAS 31 AL 60 (OCTUBRE 2026) — CAMBIOS RECIENTES Y ESPACIO EVOLUTIVO
    // =========================================================================

    // ETAPA 7
    {
      wbs: '7.0',
      phase: 'ETAPA 7: ADAPTACIONES NORMATIVAS Y GESTIÓN DE NOTICIAS INSTITUCIONALES',
      name: 'Incorporación de Normativas Ley 21.659, SENCE y Módulo de Noticias Oficiales',
      inputs: 'Textos oficiales Ley 21.659, decretos SPD, estándares SENCE NCh 2728 y manual de comunicación',
      resp: 'Equipo de Desarrollo & Dirección Académica PrevySeg',
      startDay: 31, endDay: 36, days: 6, pct: 100, status: 'COMPLETADO', isHeader: true, color: 'B45309'
    },
    {
      wbs: '7.1',
      phase: 'ETAPA 7',
      name: 'Módulo Informativo y Sección de Noticias Segmentada por Escuela (Ley 21.659 & SENCE)',
      inputs: 'Redacción oficial: Ley 21.659 (SPD, credenciales 4 años, seguro 132 UF) y Estándar NCh 2728',
      resp: 'Ingeniero Frontend / Redactor Institucional',
      startDay: 31, endDay: 33, days: 3, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },
    {
      wbs: '7.2',
      phase: 'ETAPA 7',
      name: 'Normalización Normativa de Requisitos, Mallas y Horarios Oficiales de Seguridad',
      inputs: 'Pautas Carabineros OS-10, SPD y Directemar (4° medio, certificados médicos, antecedentes)',
      resp: 'Ingeniero Frontend & Backend',
      startDay: 32, endDay: 34, days: 3, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },
    {
      wbs: '7.3',
      phase: 'ETAPA 7',
      name: 'Depuración del Catálogo de Seguridad y Consistencia de Código Oficial CCTV SENCE',
      inputs: 'Matriz académica depurada: eliminación de curso seg-09 redundante y consolidación de seg-08 SENCE',
      resp: 'Ingeniero de Base de Datos',
      startDay: 33, endDay: 35, days: 3, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },
    {
      wbs: '7.4',
      phase: 'ETAPA 7',
      name: 'Corrección de Incidencia Crítica LMS y Sincronización Bidireccional de Esquema',
      inputs: 'Diagnóstico de bug de reactividad al ocultar cursos en LMS; desacoplamiento UUID vs ID local',
      resp: 'Ingeniero Fullstack',
      startDay: 34, endDay: 36, days: 3, pct: 100, status: 'COMPLETADO', color: 'D97706'
    },
    // HITO 6
    {
      wbs: 'H-06',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 6: Homologación Normativa Ley 21.659, Depuración CCTV y Resiliencia LMS',
      inputs: 'Noticias oficiales segmentadas, requisitos legales normalizados y corrección de concurrencia LMS',
      resp: 'Dirección Jurídico-Académica / Fullstack Lead',
      startDay: 36, endDay: 36, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 8
    {
      wbs: '8.0',
      phase: 'ETAPA 8: REINGENIERÍA UX/UI, FICHAS TÉCNICAS Y DESACOPLAMIENTO DE VISTAS',
      name: 'Fichas Curriculares Expandibles en Tabs, Vistas Online/Presencial y Rediseño de Navegación',
      inputs: 'Folletos oficiales de Oficios (Alimentos, Maquillaje), arquitectura de navegación y wireframes',
      resp: 'Equipo UX/UI & Frontend React',
      startDay: 36, endDay: 44, days: 9, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0284C7'
    },
    {
      wbs: '8.1',
      phase: 'ETAPA 8',
      name: 'Fichas Técnicas Curriculares Interactivas en Tabs (CourseCurriculumModal) para Oficios y Seguridad',
      inputs: 'Folletos oficiales: Manipulación de Alimentos, Maquillaje de Carnaval y programas de Seguridad',
      resp: 'Ingeniero Frontend',
      startDay: 36, endDay: 39, days: 4, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '8.2',
      phase: 'ETAPA 8',
      name: 'Desacoplamiento de Vistas por Modalidad: Cursos Online vs. Cursos Presenciales con Gestión Admin',
      inputs: 'Requerimiento de segmentación comercial de oferta virtual vs. presencial en Sede Arica',
      resp: 'Ingeniero Frontend & Backend',
      startDay: 38, endDay: 41, days: 4, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '8.3',
      phase: 'ETAPA 8',
      name: 'Reorganización Jerárquica del Header Corporativo y Menú Desplegable Fluido 1 a 1',
      inputs: 'Auditoría ergonómica: menú dropdown para Cursos, top-bar retráctil y sincronización 1:1 con Home',
      resp: 'Diseñador UX / Ingeniero Frontend',
      startDay: 40, endDay: 43, days: 4, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    {
      wbs: '8.4',
      phase: 'ETAPA 8',
      name: 'Modularización de Sección Independiente de Franquicia Tributaria y Tramos SENCE',
      inputs: 'Tramos legales de financiamiento empresarial Ley N° 19.518 (100%, 50%, 15% y Pago Directo)',
      resp: 'Ingeniero Frontend',
      startDay: 42, endDay: 44, days: 3, pct: 100, status: 'COMPLETADO', color: '0284C7'
    },
    // HITO 7
    {
      wbs: 'H-07',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 7: Desacoplamiento de Modalidades (Online/Presencial) y Fichas Interactivas',
      inputs: 'Vistas Online/Presencial independientes, modal interactivo de oficios y módulo de beneficios SENCE',
      resp: 'Diseñador UX / Ingeniero Frontend',
      startDay: 44, endDay: 44, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 9
    {
      wbs: '9.0',
      phase: 'ETAPA 9: GESTIÓN AVANZADA DE PERMISOS Y ACTUALIZACIONES COMERCIALES',
      name: 'Control Condicional de Módulos Administrativos y Nueva Estructura Arancelaria',
      inputs: 'Definición de visibilidad administrativa para Modo Edición y nuevos valores comerciales',
      resp: 'Equipo Fullstack PrevySeg & Finanzas',
      startDay: 44, endDay: 50, days: 7, pct: 100, status: 'COMPLETADO', isHeader: true, color: '4338CA'
    },
    {
      wbs: '9.1',
      phase: 'ETAPA 9',
      name: 'Control de Visibilidad Condicional en Menú de Administración con Modo Edición',
      inputs: 'Demanda del cliente: ocultar Banco de Preguntas y Contenidos salvo activación de Modo Edición',
      resp: 'Ingeniero Frontend',
      startDay: 44, endDay: 47, days: 4, pct: 100, status: 'COMPLETADO', color: '6366F1'
    },
    {
      wbs: '9.2',
      phase: 'ETAPA 9',
      name: 'Actualización Comercial y Financiera de Cursos Críticos (Guardias OS-10 $140.000 / 2 Cuotas 50%)',
      inputs: 'Pauta comercial: arancel $140.000 CLP, 2 cuotas del 50% ($70.000) y jornada intensiva 2 semanas',
      resp: 'Ingeniero Fullstack & Finanzas',
      startDay: 47, endDay: 50, days: 4, pct: 100, status: 'COMPLETADO', color: '6366F1'
    },

    // =========================================================================
    // ETAPA 10: REQUERIMIENTOS FORMALES DE IMÁGENES, 3 VISTAS, CMS Y PRUEBAS UX
    // =========================================================================
    {
      wbs: '10.0',
      phase: 'ETAPA 10: ESTANDARIZACIÓN DE FICHAS, CARD LATERAL, RRSS, CMS ADMIN Y PRUEBAS UX',
      name: 'Estandarización Curricular en 4 Tabs, Card Lateral, Video RRSS, CMS Admin y Pruebas UX (2 Personas)',
      inputs: 'Requerimientos formales: 4 pestañas obligatorias, card comercial con métricas y botón "¡Convence a tu Jefe!", espacio audiovisual RRSS, muestra de uso con 2 personas, desacoplamiento en 3 vistas y CMS para admin',
      resp: 'Equipo de Ingeniería Frontend, UX/UI, Área Académica y RRSS PrevySeg',
      startDay: 42, endDay: 54, days: 13, pct: 100, status: 'COMPLETADO', isHeader: true, color: '0A969B'
    },
    {
      wbs: '10.1',
      phase: 'ETAPA 10',
      name: 'Estandarización Curricular en 4 Pestañas para los 20 Cursos (Resumen, Objetivos, Requisitos y Temario)',
      inputs: 'Solicitud del cliente: incorporación obligatoria de las 4 pestañas en la ficha técnica de cada curso',
      resp: 'Ingeniero Frontend & Coordinador Académico',
      startDay: 42, endDay: 45, days: 4, pct: 100, status: 'COMPLETADO', color: '1B3761'
    },
    {
      wbs: '10.2',
      phase: 'ETAPA 10',
      name: 'Desarrollo de Card Lateral de Convocatoria, Métricas de Cursada y Módulo "¡Convence a tu Jefe!"',
      inputs: 'Diseño de card al costado: Próxima convocatoria, semanas, horas de estudio, inicio, valor CLP, checkbox SENCE (+10%), matrícula y WhatsApp',
      resp: 'Diseñador UI / Ingeniero Frontend',
      startDay: 44, endDay: 47, days: 4, pct: 100, status: 'COMPLETADO', color: '0A969B'
    },
    {
      wbs: '10.3',
      phase: 'ETAPA 10',
      name: 'Incorporación de Asignación Docente y Bibliografía Normativa SENCE/SPD por Curso',
      inputs: 'Requerimiento de acreditación: perfil del profesor instructor, certificaciones oficiales y marco legal (Ley 21.659)',
      resp: 'Dirección Académica & Frontend',
      startDay: 46, endDay: 49, days: 4, pct: 100, status: 'COMPLETADO', color: '1B3761'
    },
    {
      wbs: '10.4',
      phase: 'ETAPA 10',
      name: 'Diseño e Integración del Espacio para Videos Explicativos de RRSS (4 Videos Mensuales)',
      inputs: 'Requerimiento audiovisual: player interactivo para cápsulas explicativas producidas por la encargada de RRSS (Camila Valenzuela)',
      resp: 'Área de Comunicaciones RRSS & Frontend',
      startDay: 48, endDay: 51, days: 4, pct: 100, status: 'COMPLETADO', color: '0A969B'
    },
    {
      wbs: '10.5',
      phase: 'ETAPA 10',
      name: 'Protocolo de Pruebas de Uso y Evaluación de Experiencia de Usuario con Muestra de 2 Personas',
      inputs: 'Requerimiento formal: evaluación de usabilidad con 2 usuarios piloto (Evaluador 1: Postulante / Evaluador 2: Docente), cálculo SUS Score (94.5/100)',
      resp: 'Líder QA / Evaluadores Piloto Arica',
      startDay: 50, endDay: 52, days: 3, pct: 100, status: 'COMPLETADO', color: '1B3761'
    },
    {
      wbs: '10.6',
      phase: 'ETAPA 10',
      name: 'Desacoplamiento en 3 Vistas (OTEC Institucional, Escuela Seguridad, Escuela Oficios), Modalidades y Resumen SENCE',
      inputs: 'Requerimiento formal: portada institucional OTEC con resumen corto SENCE al inicio, vistas dedicadas por Escuela (Seguridad y Oficios) con selector de modalidad (Presencial/Online)',
      resp: 'Arquitecto de Software & Ingeniero Frontend',
      startDay: 50, endDay: 53, days: 4, pct: 100, status: 'COMPLETADO', color: '0A969B'
    },
    {
      wbs: '10.7',
      phase: 'ETAPA 10',
      name: 'Consolidación de Contenidos Integrales por Escuela (Hero Switcher Dual, "Garantizamos Estándares", Catálogo y Noticias)',
      inputs: 'Requerimiento formal: unificación de toda la información por escuela en su respectiva vista superior (Hero fotográfico con botones intercambiables, sección de estándares, catálogo y noticias)',
      resp: 'Ingeniero Frontend & Especialista UX',
      startDay: 51, endDay: 54, days: 4, pct: 100, status: 'COMPLETADO', color: '1B3761'
    },
    {
      wbs: '10.8',
      phase: 'ETAPA 10',
      name: 'Interconexión y Redirección Dinámica desde Banner de Identidad Institucional (AboutUs) a Vistas de Escuela',
      inputs: 'Requerimiento formal: vinculación reactiva del botón "Ver todas las capacitaciones de esta Escuela" según pestaña activa para redirigir directamente',
      resp: 'Ingeniero Frontend',
      startDay: 51, endDay: 53, days: 3, pct: 100, status: 'COMPLETADO', color: '0A969B'
    },
    {
      wbs: '10.9',
      phase: 'ETAPA 10',
      name: 'Modernización Estética y UI/UX de Alto Impacto Visual (Neón Cian, Shimmer, Dark-Glass y Micro-animaciones)',
      inputs: 'Requerimiento visual: elevación estética llamativa respetando la estructura 1:1, bordes geométricos, auras neón cian (#00FFE0), animaciones de brillo y badges destacados',
      resp: 'Especialista UI/UX & Frontend Lead',
      startDay: 52, endDay: 54, days: 3, pct: 100, status: 'COMPLETADO', color: '0A969B'
    },
    {
      wbs: '10.10',
      phase: 'ETAPA 10',
      name: 'Módulo CMS de Gestión de Cursos para Administrador en Vivo (Garantía de Persistencia en las 3 Vistas)',
      inputs: 'Requerimiento funcional: garantía de edición reactiva en tiempo real por el administrador de cualquier curso (título, precio, modalidad, escuela, visibilidad) manteniendo sincronización en las 3 vistas',
      resp: 'Ingeniero Fullstack & Backend',
      startDay: 52, endDay: 54, days: 3, pct: 100, status: 'COMPLETADO', color: '1B3761'
    },
    // HITO 8
    {
      wbs: 'H-08',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 8: Validación de Sistema de 3 Vistas, 4 Tabs Curriculares, CMS Admin y Pruebas UX (2 Personas)',
      inputs: 'Vistas OTEC/Seguridad/Oficios, panel lateral, 4 tabs estandarizados, CMS Admin reactivo, SUS Score 94.5/100 y estética de vanguardia validada',
      resp: 'Líder QA / Evaluadores Piloto / Mandatario PrevySeg',
      startDay: 54, endDay: 54, days: 1, pct: 100, status: 'LOGRADO ✓', isMilestone: true, color: '16A34A'
    },

    // ETAPA 11 (Desarrollos Evolutivos Octubre 2026)
    {
      wbs: '11.0',
      phase: 'ETAPA 11: RESERVA TÉCNICA Y DESARROLLOS EVOLUTIVOS DE OCTUBRE 2026',
      name: 'Espacio Reservado para Integraciones Digitales y Demandas Emergentes del Mandatario',
      inputs: 'Contratos comerciales de pasarela, nuevos requerimientos de octubre y pautas formativas',
      resp: 'Equipo de Desarrollo PrevySeg & Contraparte Mandatario',
      startDay: 52, endDay: 60, days: 9, pct: 35, status: 'EN CURSO', isHeader: true, color: '047857'
    },
    {
      wbs: '11.1',
      phase: 'ETAPA 11',
      name: 'Integración de Pasarela de Pagos Webpay Plus / Transbank para Cuotas Digitales',
      inputs: 'Contrato de comercio Transbank, llaves API de integración y webhooks de confirmación',
      resp: 'Ingeniero Backend & Pasarelas',
      startDay: 52, endDay: 55, days: 4, pct: 40, status: 'EN CURSO', color: '059669'
    },
    {
      wbs: '11.2',
      phase: 'ETAPA 11',
      name: 'Carga y Parametrización de Nuevos Cursos de Oficios Solicitados en Octubre',
      inputs: 'Fichas técnicas de nuevos programas formativos aprobados por SENCE durante octubre',
      resp: 'Dirección Académica & Frontend',
      startDay: 54, endDay: 57, days: 4, pct: 40, status: 'EN CURSO', color: '059669'
    },
    {
      wbs: '11.3',
      phase: 'ETAPA 11',
      name: 'Generación Automatizada de Diplomas Digitales con Verificación QR y Firma Electrónica',
      inputs: 'Plantilla institucional de certificación OTEC con folio único y código de validación web',
      resp: 'Ingeniero Fullstack',
      startDay: 56, endDay: 59, days: 4, pct: 30, status: 'EN CURSO', color: '059669'
    },
    {
      wbs: '11.4',
      phase: 'ETAPA 11',
      name: 'Slot Reservado para Requerimientos y Ajustes Complementarios del Mandatario (Octubre 2026)',
      inputs: 'Solicitudes de cambio, adaptaciones operativas y feedback institucional de PrevySeg en octubre',
      resp: 'Equipo de Ingeniería / Contraparte OTEC',
      startDay: 58, endDay: 60, days: 3, pct: 25, status: 'EN CURSO', color: '059669'
    },
    // HITO 9 (FIN MES 2)
    {
      wbs: 'H-09',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 9 (CIERRE MES 2): Culminación de Desarrollos Evolutivos y Pasarela Webpay Plus Octubre',
      inputs: 'Webpay Plus integrado para cuotas digitales del 50%, nuevos cursos de oficios parametrizados y diplomas QR listos',
      resp: 'Equipo Fullstack / Área de Finanzas PrevySeg',
      startDay: 60, endDay: 60, days: 1, pct: 35, status: 'EN CURSO', isMilestone: true, color: 'D97706'
    },

    // =========================================================================
    // FASE FINAL: DÍAS 61 AL 75 (15 DÍAS) — REVISIÓN TÉCNICA, AUDITORÍA, QA Y MEJORAS
    // =========================================================================

    // ETAPA 12
    {
      wbs: '12.0',
      phase: 'ETAPA 12: AUDITORÍA DE CÓDIGO, TESTING DE RENDIMIENTO Y BLINDAJE DE SEGURIDAD',
      name: 'Fase de Revisión Integral de Calidad, Optimización de Carga y Seguridad Cloud',
      inputs: 'Protocolos de aseguramiento de calidad, estándares OWASP Top 10 y métricas Core Web Vitals',
      resp: 'Equipo de Calidad QA, Seguridad & DevOps',
      startDay: 61, endDay: 68, days: 8, pct: 0, status: 'PLANIFICADO', isHeader: true, color: '9F1239'
    },
    {
      wbs: '12.1',
      phase: 'ETAPA 12',
      name: 'Auditoría Estática de Código, Refactorización Arquitectónica y Análisis de Deuda Técnica',
      inputs: 'Reglas de linter Oxlint, análisis de dependencias npm y optimización de bundle Vite',
      resp: 'Arquitecto de Software / QA Lead',
      startDay: 61, endDay: 63, days: 3, pct: 0, status: 'PLANIFICADO', color: 'BE123C'
    },
    {
      wbs: '12.2',
      phase: 'ETAPA 12',
      name: 'Pruebas de Carga Concurrente, Optimización de Assets y Core Web Vitals (Lighthouse)',
      inputs: 'Simulación de tráfico concurrente en aula virtual y métricas LCP, FID, CLS en móviles',
      resp: 'Ingeniero de Rendimiento Web',
      startDay: 63, endDay: 65, days: 3, pct: 0, status: 'PLANIFICADO', color: 'BE123C'
    },
    {
      wbs: '12.3',
      phase: 'ETAPA 12',
      name: 'Testing de Compatibilidad Multiplataforma, Responsive Design y Accesibilidad (WCAG 2.1)',
      inputs: 'Matriz de pruebas en dispositivos reales (iOS, Android, Windows, macOS) y navegadores',
      resp: 'QA Tester / Especialista UI',
      startDay: 65, endDay: 67, days: 3, pct: 0, status: 'PLANIFICADO', color: 'BE123C'
    },
    {
      wbs: '12.4',
      phase: 'ETAPA 12',
      name: 'Auditoría de Seguridad, Control de Inyección SQL y Blindaje de Políticas RLS en Supabase',
      inputs: 'Revisión exhaustiva de Row Level Security (RLS), procedimientos RPC y tokens JWT',
      resp: 'Especialista en Ciberseguridad Cloud',
      startDay: 66, endDay: 68, days: 3, pct: 0, status: 'PLANIFICADO', color: 'BE123C'
    },
    // HITO 10
    {
      wbs: 'H-10',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 10: Auditoría Exhaustiva de Calidad, Blindaje RLS y Rendimiento Web Cloud',
      inputs: 'Informe de análisis estático sin vulnerabilidades, score Lighthouse 95+ y políticas RLS Supabase certificadas',
      resp: 'Auditor de Calidad QA / Especialista Ciberseguridad',
      startDay: 68, endDay: 68, days: 1, pct: 0, status: 'PLANIFICADO', isMilestone: true, color: '6D28D9'
    },

    // ETAPA 13
    {
      wbs: '13.0',
      phase: 'ETAPA 13: MARCHA BLANCA, MEJORAS CONTINUAS Y TRANSFERENCIA TECNOLÓGICA',
      name: 'Pruebas de Aceptación con Usuarios Piloto, Subsanación de Hallazgos y Cierre Oficial',
      inputs: 'Plan de pruebas de aceptación de usuario (UAT), usuarios piloto y entrega formal del software',
      resp: 'Líder de Proyecto, Dirección OTEC y Contraparte Mandatario',
      startDay: 69, endDay: 75, days: 7, pct: 0, status: 'PLANIFICADO', isHeader: true, color: '0F172A'
    },
    {
      wbs: '13.1',
      phase: 'ETAPA 13',
      name: 'Despliegue en Ambiente Staging y Ejecución de Pruebas de Aceptación de Usuario (UAT)',
      inputs: 'Pautas de navegación guiada con docentes y alumnos piloto de la sede Arica',
      resp: 'QA Lead / Product Owner',
      startDay: 69, endDay: 71, days: 3, pct: 0, status: 'PLANIFICADO', color: '334155'
    },
    {
      wbs: '13.2',
      phase: 'ETAPA 13',
      name: 'Subsanación de Observaciones de Marcha Blanca y Micro-mejoras Ergonómicas Finales',
      inputs: 'Registro de feedback operativo, ajustes de micro-interacciones y tiempos de respuesta',
      resp: 'Equipo Fullstack de Desarrollo',
      startDay: 71, endDay: 73, days: 3, pct: 0, status: 'PLANIFICADO', color: '334155'
    },
    {
      wbs: '13.3',
      phase: 'ETAPA 13',
      name: 'Consolidación de Documentación Técnica Maestra, Manuales Operativos y Entrega Final',
      inputs: 'Manuales de usuario administrador/docente, repositorio sincronizado y acta de entrega formal',
      resp: 'Líder de Proyecto / Sebastian Acuña',
      startDay: 73, endDay: 75, days: 3, pct: 0, status: 'PLANIFICADO', color: '334155'
    },
    // HITO 11 (CIERRE PROYECTO)
    {
      wbs: 'H-11',
      phase: 'PUNTO DE CONTROL / HITO',
      name: '◆ HITO 11 (CIERRE DEL PROYECTO): Marcha Blanca Concluida, Acta de Aceptación y Entrega Definitiva',
      inputs: 'Protocolo UAT aprobado por la gerencia, manuales operativos entregados, repositorio GitHub respaldado y puesta en marcha oficial',
      resp: 'Jefe de Proyecto / Gerencia General PrevySeg SpA',
      startDay: 75, endDay: 75, days: 1, pct: 0, status: 'PLANIFICADO', isMilestone: true, color: '0F172A'
    }
  ];

  /* ==========================================================================
     HOJA 1: CARTA GANTT OFICIAL MAESTRA (75 DÍAS: 2 MESES Y 15 DÍAS)
     ========================================================================== */
  const wsGantt = workbook.addWorksheet('Carta Gantt de Desarrollo', {
    views: [{ state: 'frozen', xSplit: 4, ySplit: 8, showGridLines: true }]
  });

  const totalCols = 10 + 75; // 85 columnas (A hasta CG)

  function getColLetter(colIndex) {
    let temp, letter = '';
    while (colIndex > 0) {
      temp = (colIndex - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      colIndex = Math.floor((colIndex - temp - 1) / 26);
    }
    return letter;
  }

  const lastColLetter = getColLetter(totalCols); // CG

  // Título Principal
  wsGantt.mergeCells(`A1:${lastColLetter}1`);
  const titleCell = wsGantt.getCell('A1');
  titleCell.value = 'OTEC PREVYSEG 2026 — CARTA GANTT MAESTRA DE DESARROLLO Y PLAN DE TRABAJO (2 MESES Y 15 DÍAS)';
  titleCell.font = { name: 'Segoe UI', size: 14, bold: true, color: { argb: 'FFFFFF' } };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
  titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsGantt.getRow(1).height = 34;

  // Subtítulo
  wsGantt.mergeCells(`A2:${lastColLetter}2`);
  const subCell = wsGantt.getCell('A2');
  subCell.value = 'Cronograma Integral de Desarrollo de Software Web • Requerimientos Normativos Ley 21.659 & SENCE • Sistema de 3 Vistas, CMS Administrador, Pruebas UX y 11 Hitos Críticos (75 Días Calendario)';
  subCell.font = { name: 'Segoe UI', size: 9.5, italic: true, color: { argb: 'E2E8F0' } };
  subCell.alignment = { vertical: 'middle', horizontal: 'center' };
  subCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE_HEADER } };
  wsGantt.getRow(2).height = 22;

  // Fila de Metadatos
  wsGantt.mergeCells('A3:D3');
  wsGantt.getCell('A3').value = 'ORGANISMO TÉCNICO: OTEC PrevySeg SpA';
  wsGantt.getCell('A3').font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '334155' } };

  wsGantt.mergeCells('E3:H3');
  wsGantt.getCell('E3').value = 'REPOSITORIO GITHUB: https://github.com/Sebastianaso/PrevySeg2026';
  wsGantt.getCell('E3').font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '0284C7' } };

  wsGantt.mergeCells('I3:L3');
  wsGantt.getCell('I3').value = 'DURACIÓN TOTAL: 2 Meses y 15 Días (75 Días)';
  wsGantt.getCell('I3').font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '16A34A' } };

  wsGantt.mergeCells(`M3:${lastColLetter}3`);
  wsGantt.getCell('M3').value = 'PERÍODO EJECUTIVO: Septiembre — Noviembre 2026 (Mes 1: Días 1-30 | Mes 2: Días 31-60 | Revisión y Mejoras: Días 61-75)';
  wsGantt.getCell('M3').font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: '475569' } };
  wsGantt.getRow(3).height = 20;

  // Fila 4: Barra de Simbología y Estado de Hitos
  wsGantt.mergeCells('A4:C4');
  const legTitle = wsGantt.getCell('A4');
  legTitle.value = 'SIMBOLOGÍA DE CONTROL:';
  legTitle.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: DARK_NAVY } };
  legTitle.alignment = { vertical: 'middle', horizontal: 'center' };
  legTitle.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'E2E8F0' } };

  wsGantt.mergeCells('D4:F4');
  const legComp = wsGantt.getCell('D4');
  legComp.value = '✓ = Tarea Completada (100%)';
  legComp.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: '15803D' } };
  legComp.alignment = { vertical: 'middle', horizontal: 'center' };
  legComp.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DCFCE7' } };

  wsGantt.mergeCells('G4:I4');
  const legProg = wsGantt.getCell('G4');
  legProg.value = '⚙ = En Curso / Desarrollo Activo';
  legProg.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: 'B45309' } };
  legProg.alignment = { vertical: 'middle', horizontal: 'center' };
  legProg.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FEF3C7' } };

  wsGantt.mergeCells('J4:L4');
  const legPlan = wsGantt.getCell('J4');
  legPlan.value = '⏱ = Tarea Planificada';
  legPlan.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: '475569' } };
  legPlan.alignment = { vertical: 'middle', horizontal: 'center' };
  legPlan.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F1F5F9' } };

  wsGantt.mergeCells('M4:R4');
  const legMil = wsGantt.getCell('M4');
  legMil.value = '◆ = HITO CRÍTICO DE CONTROL Y APROBACIÓN (MILESTONE)';
  legMil.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: GOLD_TEXT } };
  legMil.alignment = { vertical: 'middle', horizontal: 'center' };
  legMil.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD_LIGHT } };

  wsGantt.mergeCells(`S4:${lastColLetter}4`);
  const legSum = wsGantt.getCell('S4');
  legSum.value = 'AVANCE ESTRATÉGICO: 8 HITOS LOGRADOS (72.7%) | 1 EN CURSO (9.1%) | 2 PLANIFICADOS (18.2%) | ESTADO: EN PLAZO Y CONFORME';
  legSum.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: '0F766E' } };
  legSum.alignment = { vertical: 'middle', horizontal: 'center' };
  legSum.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'CCFBF1' } };
  wsGantt.getRow(4).height = 20;

  // Fila 5: Separador suave
  wsGantt.mergeCells(`A5:${lastColLetter}5`);
  wsGantt.getCell('A5').value = '';
  wsGantt.getCell('A5').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'F8FAFC' } };
  wsGantt.getRow(5).height = 4;

  // Encabezados de Columnas Principales
  const headers = [
    { col: 1, label: 'WBS', width: 8 },
    { col: 2, label: 'Etapa / Fase del Proyecto', width: 30 },
    { col: 3, label: 'Actividad Ejecutada del Software / Hito', width: 46 },
    { col: 4, label: 'Insumos Necesarios / Criterio de Éxito', width: 50 },
    { col: 5, label: 'Responsable', width: 24 },
    { col: 6, label: 'Inicio', width: 11 },
    { col: 7, label: 'Fin', width: 11 },
    { col: 8, label: 'Días', width: 7 },
    { col: 9, label: '% Avance', width: 10 },
    { col: 10, label: 'Estado', width: 14 }
  ];

  headers.forEach(h => {
    wsGantt.getColumn(h.col).width = h.width;
    wsGantt.mergeCells(7, h.col, 8, h.col);
    const cell = wsGantt.getCell(7, h.col);
    cell.value = h.label;
    cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
    cell.border = headerBorder;
  });

  // Fila 6: Encabezados de los 3 Grandes Bloques Temporales
  // Bloque 1: Mes 1 (Días 1 al 30) -> Col 11 a 40
  wsGantt.mergeCells('K6:AN6');
  const b1 = wsGantt.getCell('K6');
  b1.value = 'MES 1: SEPTIEMBRE 2026 — ARQUITECTURA, DESARROLLO CORE Y LMS BASE (DÍAS 1 AL 30)';
  b1.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FFFFFF' } };
  b1.alignment = { vertical: 'middle', horizontal: 'center' };
  b1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E3A8A' } };

  // Bloque 2: Mes 2 (Días 31 al 60) -> Col 41 a 70
  wsGantt.mergeCells('AO6:BR6');
  const b2 = wsGantt.getCell('AO6');
  b2.value = 'MES 2: OCTUBRE 2026 — ADAPTACIONES, 3 VISTAS, CMS ADMIN, PRUEBAS UX Y EVOLUTIVO (DÍAS 31 AL 60)';
  b2.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FFFFFF' } };
  b2.alignment = { vertical: 'middle', horizontal: 'center' };
  b2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '0F766E' } };

  // Bloque 3: Fase Final (Días 61 al 75) -> Col 71 a 85
  wsGantt.mergeCells(`BS6:${lastColLetter}6`);
  const b3 = wsGantt.getCell('BS6');
  b3.value = 'FASE FINAL: REVISIÓN Y MEJORAS TÉCNICAS (DÍAS 61 AL 75 — 15 DÍAS)';
  b3.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'FFFFFF' } };
  b3.alignment = { vertical: 'middle', horizontal: 'center' };
  b3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '9F1239' } };
  wsGantt.getRow(6).height = 20;

  // Días de semana y domingos para los 75 días
  const dayNames = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const sundays = [];

  for (let d = 1; d <= 75; d++) {
    const colIdx = 10 + d;
    wsGantt.getColumn(colIdx).width = 3.8;

    const cur = new Date(2026, 8, d);
    const dayOfWeek = cur.getDay(); // 0 = Domingo
    if (dayOfWeek === 0) sundays.push(d);

    const isSunday = dayOfWeek === 0;

    // Fila 7: Número de Día de Proyecto (1 a 75)
    const numCell = wsGantt.getCell(7, colIdx);
    numCell.value = d;
    numCell.font = { name: 'Segoe UI', size: 7.5, bold: true, color: { argb: 'FFFFFF' } };
    numCell.alignment = { vertical: 'middle', horizontal: 'center' };
    
    let dayBg = '334155';
    if (d >= 31 && d <= 60) dayBg = '134E4A';
    if (d >= 61 && d <= 75) dayBg = '881337';
    numCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: dayBg } };
    numCell.border = thinBorder;

    // Fila 8: Letra del día de la semana
    const letCell = wsGantt.getCell(8, colIdx);
    letCell.value = dayNames[dayOfWeek];
    letCell.font = { name: 'Segoe UI', size: 7, bold: true, color: { argb: isSunday ? 'EF4444' : 'E2E8F0' } };
    letCell.alignment = { vertical: 'middle', horizontal: 'center' };
    letCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: isSunday ? '1E293B' : '475569' } };
    letCell.border = thinBorder;
  }
  wsGantt.getRow(7).height = 18;
  wsGantt.getRow(8).height = 16;

  // Llenar Filas de Actividades e Hitos
  let currentRow = 9;

  activities.forEach(act => {
    wsGantt.getRow(currentRow).height = act.isHeader ? 24 : (act.isMilestone ? 22 : 22);

    const cWbs = wsGantt.getCell(currentRow, 1);
    cWbs.value = act.wbs;
    cWbs.alignment = { vertical: 'middle', horizontal: 'center' };
    if (act.isMilestone) {
      cWbs.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: GOLD_TEXT } };
    } else {
      cWbs.font = { name: 'Segoe UI', size: 8.5, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '0F172A' } };
    }

    const cPhase = wsGantt.getCell(currentRow, 2);
    cPhase.value = act.phase;
    cPhase.alignment = { vertical: 'middle', horizontal: 'left' };
    if (act.isMilestone) {
      cPhase.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: 'B45309' } };
    } else {
      cPhase.font = { name: 'Segoe UI', size: 8.5, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '334155' } };
    }

    const cName = wsGantt.getCell(currentRow, 3);
    cName.value = act.name;
    cName.alignment = { vertical: 'middle', horizontal: 'left' };
    if (act.isMilestone) {
      cName.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: GOLD_TEXT } };
    } else {
      cName.font = { name: 'Segoe UI', size: 8.5, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '0F172A' } };
    }

    const cInputs = wsGantt.getCell(currentRow, 4);
    cInputs.value = act.inputs;
    cInputs.alignment = { vertical: 'middle', horizontal: 'left' };
    if (act.isMilestone) {
      cInputs.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: '92400E' } };
    } else {
      cInputs.font = { name: 'Segoe UI', size: 8, italic: !act.isHeader, bold: act.isHeader, color: { argb: act.isHeader ? 'FFFFFF' : '475569' } };
    }

    const cResp = wsGantt.getCell(currentRow, 5);
    cResp.value = act.resp;
    cResp.alignment = { vertical: 'middle', horizontal: 'left' };
    if (act.isMilestone) {
      cResp.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: GOLD_TEXT } };
    } else {
      cResp.font = { name: 'Segoe UI', size: 8, color: { argb: act.isHeader ? 'FFFFFF' : '334155' } };
    }

    const cStart = wsGantt.getCell(currentRow, 6);
    cStart.value = getDateForDay(act.startDay);
    cStart.alignment = { vertical: 'middle', horizontal: 'center' };
    cStart.font = { name: 'Segoe UI', size: 8, bold: act.isMilestone, color: { argb: act.isHeader ? 'FFFFFF' : (act.isMilestone ? GOLD_TEXT : '334155') } };

    const cEnd = wsGantt.getCell(currentRow, 7);
    cEnd.value = getDateForDay(act.endDay);
    cEnd.alignment = { vertical: 'middle', horizontal: 'center' };
    cEnd.font = { name: 'Segoe UI', size: 8, bold: act.isMilestone, color: { argb: act.isHeader ? 'FFFFFF' : (act.isMilestone ? GOLD_TEXT : '334155') } };

    const cDays = wsGantt.getCell(currentRow, 8);
    cDays.value = act.days;
    cDays.alignment = { vertical: 'middle', horizontal: 'center' };
    cDays.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: act.isHeader ? 'FFFFFF' : (act.isMilestone ? GOLD_TEXT : '0F172A') } };

    const cPct = wsGantt.getCell(currentRow, 9);
    cPct.value = `${act.pct}%`;
    cPct.alignment = { vertical: 'middle', horizontal: 'center' };
    let pctColor = '16A34A';
    if (act.pct === 0) pctColor = '64748B';
    else if (act.pct < 100) pctColor = 'D97706';
    cPct.font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: act.isHeader ? 'FFFFFF' : pctColor } };

    const cStatus = wsGantt.getCell(currentRow, 10);
    cStatus.value = act.status;
    cStatus.alignment = { vertical: 'middle', horizontal: 'center' };
    let statusColor = '15803D';
    if (act.status === 'PLANIFICADO') statusColor = '475569';
    else if (act.status === 'EN CURSO') statusColor = 'B45309';
    else if (act.status.includes('LOGRADO')) statusColor = '15803D';
    cStatus.font = { name: 'Segoe UI', size: 8, bold: true, color: { argb: act.isHeader ? 'FFFFFF' : statusColor } };

    // Estilos de celdas fijas (cols 1 a 10)
    if (act.isHeader) {
      for (let c = 1; c <= 10; c++) {
        const cell = wsGantt.getCell(currentRow, c);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: act.color } };
        cell.border = thinBorder;
      }
    } else if (act.isMilestone) {
      for (let c = 1; c <= 10; c++) {
        const cell = wsGantt.getCell(currentRow, c);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: GOLD_LIGHT } };
        cell.border = milestoneBorder;
      }
    } else {
      for (let c = 1; c <= 10; c++) {
        const cell = wsGantt.getCell(currentRow, c);
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: currentRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF' } };
        cell.border = thinBorder;
      }
    }

    // Pintar la barra de Gantt en las 75 columnas de días (Cols 11 a 85)
    for (let d = 1; d <= 75; d++) {
      const colIdx = 10 + d;
      const cell = wsGantt.getCell(currentRow, colIdx);
      cell.border = thinBorder;

      const isSunday = sundays.includes(d);

      if (act.isMilestone) {
        if (d === act.startDay) {
          // Marcador de Hito: Rombo ◆
          cell.value = '◆';
          cell.font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: 'FFFFFF' } };
          cell.alignment = { vertical: 'middle', horizontal: 'center' };
          let mColor = '16A34A'; // Verde si 100% logrado
          if (act.pct < 100 && act.pct > 0) mColor = 'D97706'; // Ámbar si en curso
          if (act.pct === 0) mColor = '6D28D9'; // Púrpura si planificado
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: mColor } };
          cell.border = {
            top: { style: 'medium', color: { argb: DARK_NAVY } },
            left: { style: 'medium', color: { argb: DARK_NAVY } },
            bottom: { style: 'medium', color: { argb: DARK_NAVY } },
            right: { style: 'medium', color: { argb: DARK_NAVY } }
          };
        } else {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: isSunday ? SUNDAY_FILL : 'FFFDF5' }
          };
        }
      } else {
        // Tarea normal o Header
        if (d >= act.startDay && d <= act.endDay) {
          const barColor = act.isHeader ? act.color : (act.color || '0284C7');
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: barColor }
          };

          if (d === act.endDay && !act.isHeader) {
            if (act.status === 'COMPLETADO') {
              cell.value = '✓';
              cell.font = { name: 'Segoe UI', size: 7, bold: true, color: { argb: 'FFFFFF' } };
            } else if (act.status === 'EN CURSO') {
              cell.value = '⚙';
              cell.font = { name: 'Segoe UI', size: 7, bold: true, color: { argb: 'FFFFFF' } };
            } else {
              cell.value = '⏱';
              cell.font = { name: 'Segoe UI', size: 7, bold: true, color: { argb: 'FFFFFF' } };
            }
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
          }
        } else {
          if (isSunday) {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SUNDAY_FILL } };
          } else {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
          }
        }
      }
    }

    currentRow++;
  });

  /* ==========================================================================
     HOJA 2: MATRIZ DE INSUMOS DE LA EMPRESA Y SUBSANACIÓN DE DEMANDAS
     ========================================================================== */
  const wsInputs = workbook.addWorksheet('Insumos de Empresa & Demandas', {
    views: [{ showGridLines: true }]
  });

  wsInputs.mergeCells('A1:G1');
  const t2 = wsInputs.getCell('A1');
  t2.value = 'MATRIZ DETALLADA DE INSUMOS REQUERIDOS DE LA EMPRESA Y SUBSANACIÓN DE DEMANDAS';
  t2.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  t2.alignment = { vertical: 'middle', horizontal: 'center' };
  t2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsInputs.getRow(1).height = 30;

  wsInputs.mergeCells('A2:G2');
  const st2 = wsInputs.getCell('A2');
  st2.value = 'Catálogo de recursos provistos por el mandante OTEC PrevySeg, requerimientos de folletos, videos RRSS, pruebas de uso y demandas subsanadas';
  st2.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'E2E8F0' } };
  st2.alignment = { vertical: 'middle', horizontal: 'center' };
  st2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE_HEADER } };
  wsInputs.getRow(2).height = 20;

  const inputHeaders = [
    { col: 1, label: 'ID', width: 8 },
    { col: 2, label: 'Categoría / Fase', width: 28 },
    { col: 3, label: 'Insumo o Demanda Requerida', width: 48 },
    { col: 4, label: 'Propósito e Impacto en el Software', width: 48 },
    { col: 5, label: 'Responsable de Entrega', width: 24 },
    { col: 6, label: 'Fecha / Período', width: 16 },
    { col: 7, label: 'Estado de Gestión', width: 18 }
  ];

  inputHeaders.forEach(h => {
    wsInputs.getColumn(h.col).width = h.width;
    const c = wsInputs.getCell(4, h.col);
    c.value = h.label;
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    c.alignment = { vertical: 'middle', horizontal: 'center' };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
    c.border = headerBorder;
  });
  wsInputs.getRow(4).height = 24;

  const companyInputs = [
    // MES 1: Insumos Base
    { id: 'INS-01', cat: 'MES 1: Identidad Corporativa', name: 'Logotipo Oficial, Paleta Cromática y Manual de Marca', purpose: 'Configuración visual del portal, navbar, footer, sellos y certificaciones', resp: 'Gerencia General PrevySeg', date: '02/09/2026', status: 'RECEPCIONADO 100%' },
    { id: 'INS-02', cat: 'MES 1: Reglamentario SENCE', name: 'Malla Curricular Base, Códigos SENCE y Horas Pedagógicas', purpose: 'Carga de los 20 cursos en base de datos PostgreSQL y parametrización', resp: 'Dirección Académica OTEC', date: '03/09/2026', status: 'RECEPCIONADO 100%' },
    { id: 'INS-03', cat: 'MES 1: Comercial & Pagos', name: 'Estructura Base de Aranceles, Cuenta Bancaria y Abono 50%', purpose: 'Implementación del procedimiento seguro de cálculo y reserva de cupo', resp: 'Administración y Finanzas', date: '04/09/2026', status: 'RECEPCIONADO 100%' },
    { id: 'INS-04', cat: 'MES 1: Normativo SPD / OS-10', name: 'Pauta de Ponderaciones 60% Teórico / 40% Práctico SPD', purpose: 'Generación del Libro de Calificaciones y actas de fiscalización', resp: 'Docente Titular / Instructor SPD', date: '07/09/2026', status: 'RECEPCIONADO 100%' },
    { id: 'INS-05', cat: 'MES 1: Contenidos E-learning', name: 'Material Didáctico SCORM, PDFs y Módulos Formativos', purpose: 'Alimentación del Aula Virtual interactiva y banco de preguntas', resp: 'Cuerpo Docente PrevySeg', date: '10/09/2026', status: 'RECEPCIONADO 100%' },
    { id: 'INS-06', cat: 'MES 1: Empresas & Empleo', name: 'Convenios de Contratación y Ofertas Laborales Vigentes', purpose: 'Publicación de vacantes activas en el Portal de Empleadores', resp: 'Área de Selección y RRHH', date: '14/09/2026', status: 'RECEPCIONADO 100%' },

    // MES 1: Demandas Iniciales Subsanadas
    { id: 'DEM-01', cat: 'MES 1: DEMANDA MANDATARIO', name: 'Regla de Negocio Estricta: 1 Alumno = 1 Solo Curso Activo', purpose: 'Subsanación técnica: validación en PostgreSQL que impide doble matrícula', resp: 'Mandatario / Auditoría OTEC', date: '25/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-02', cat: 'MES 1: DEMANDA MANDATARIO', name: 'Flujo Especial CCTV: 1 Alumno a la vez, 30 Días e Historial', purpose: 'Subsanación técnica: sistema de visto bueno y archivo de participantes', resp: 'Mandatario / Dirección OTEC', date: '26/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-03', cat: 'MES 1: DEMANDA MANDATARIO', name: 'Gráficos por Apartado en Auditoría y Live Logs en Tiempo Real', purpose: 'Subsanación técnica: dashboard con gráficos SVG, marcas SENCE y logs BD', resp: 'Mandatario / Evaluador Técnico', date: '28/09/2026', status: 'SUBSANADO 100%' },

    // MES 2: Demandas Previas
    { id: 'DEM-04', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Sección de Noticias Oficiales Segmentada por Escuela (Ley 21.659 & SENCE)', purpose: 'Subsanación técnica: redacción oficial Ley 21.659 y Estándar NCh 2728 en NewsSection.jsx', resp: 'Dirección Jurídico-Académica', date: '29/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-05', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Normalización de Requisitos, Mallas y Horarios Oficiales de Seguridad', purpose: 'Subsanación técnica: badges interactivos de horarios y requisitos Ley 21.659 en catálogo', resp: 'Mandatario / Carabineros OS-10', date: '29/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-06', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Depuración de Duplicidad en Catálogo de Seguridad (CCTV SENCE)', purpose: 'Subsanación técnica: eliminación de seg-09, prevalencia de seg-08 oficial y desactivación BD', resp: 'Dirección Académica OTEC', date: '29/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-07', cat: 'MES 2: INCIDENCIA CRÍTICA', name: 'Corrección de Colapso en LMS al Alternar Visibilidad a "Oculto"', purpose: 'Subsanación técnica: merge inteligente de esquemas UUID vs local y etiqueta roja para admin', resp: 'Administración de Plataforma', date: '29/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-08', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Fichas Curriculares de Oficios en Modal Interactivo por Pestañas', purpose: 'Subsanación técnica: CourseCurriculumModal con tabs para Manipulación y Maquillaje', resp: 'Escuela de Oficios PrevySeg', date: '30/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-09', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Desacoplamiento de Vistas por Modalidad: Cursos Online vs. Presenciales', purpose: 'Subsanación técnica: OnlineCoursesView y PresencialCoursesView gestionadas desde admin', resp: 'Jefatura de Admisión y Marketing', date: '30/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-10', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Reorganización Estructural del Header y Menú Dropdown Secuencial 1 a 1', purpose: 'Subsanación técnica: menú desplegable para Cursos, top-bar retráctil y sincronización con Home', resp: 'Jefatura UX/UI y Dirección OTEC', date: '30/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-11', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Extracción de Sección Independiente de Beneficios SENCE', purpose: 'Subsanación técnica: bloque contrastado con anclaje #beneficios-sence y tramos Ley 19.518', resp: 'Área Franquicia Tributaria SENCE', date: '30/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-12', cat: 'MES 2: DEMANDA MANDATARIO', name: 'Visibilidad Condicional en Menú Admin mediante Modo Edición', purpose: 'Subsanación técnica: ocultar Banco de Preguntas y Contenido salvo Modo Edición activo', resp: 'Administración LMS', date: '30/09/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-13', cat: 'MES 2: COMERCIAL & NEGOCIO', name: 'Actualización Comercial Guardias OS-10 ($140.000 / 2 Cuotas 50% / 2 Semanas)', purpose: 'Subsanación técnica: pasarela EnrollmentForm, syllabusData y coursesData sincronizados', resp: 'Gerencia General y Finanzas', date: '01/10/2026', status: 'SUBSANADO 100%' },

    // MES 2: REQUERIMIENTOS FORMALES INCORPORADOS (IMÁGENES CLIENTE & VISTAS)
    { id: 'DEM-15', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Estandarización de 4 Pestañas Obligatorias por Curso (Resumen, Objetivos, Requisitos y Temario)', purpose: 'Subsanación técnica: integración obligatoria de las 4 pestañas para los 20 cursos en CourseCurriculumModal', resp: 'Dirección Académica & Frontend', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-16', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Card Lateral de Convocatoria con Botones de Carrito, Contacto y "¡Convence a tu Jefe!"', purpose: 'Subsanación técnica: panel lateral con semanas, horas de estudio, inicio, precio, checkbox SENCE (+10%) y propuesta laboral', resp: 'Diseñador UI / Frontend', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-17', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Información de Profesores Relatores Asignados y Bibliografía Oficial por Curso', purpose: 'Subsanación técnica: pestaña y fichas de docentes (acreditación OS-10/SENCE) y marco legal chileno en los 20 cursos', resp: 'Coordinación Docente PrevySeg', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-18', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Espacio Audiovisual para Cápsulas de Video Explicativo de RRSS (4 Videos Mensuales)', purpose: 'Subsanación técnica: player y mockup de video oficial conducido por la encargada de RRSS (Camila Valenzuela)', resp: 'Área de Comunicaciones RRSS', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-19', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Evaluación y Pruebas de Uso con Muestra Piloto de 2 Personas (Testing UX)', purpose: 'Subsanación técnica: UserTestingModal con protocolo de usabilidad (Postulante vs Docente) y SUS Score de 94.5/100', resp: 'Líder QA / Evaluadores Arica', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-20', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Desacoplamiento en 3 Vistas (OTEC Institucional, Escuela Seguridad, Escuela Oficios), Modalidades (Presencial/Online) y Resumen SENCE', purpose: 'Subsanación técnica: portada enfocada en presentación OTEC con SenceExecutiveSummary al inicio, vistas dedicadas SecuritySchoolView y TradesSchoolView con selector de modalidad', resp: 'Dirección de Ingeniería & Frontend', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-21', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Consolidación de Contenidos Integrales por Escuela (Hero Switcher Dual, "Garantizamos Estándares", Catálogo y Noticias)', purpose: 'Subsanación técnica: unificación de la información por escuela en la vista superior (Hero con selector dual, sección de estándares, catálogo y noticias)', resp: 'Ingeniero Frontend & Especialista UX', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-22', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Redirección Dinámica desde Banner Institucional (AboutUs) a Catálogo de Escuela', purpose: 'Subsanación técnica: botón dinámico "Ver todas las capacitaciones de Escuela de Oficios / Seguridad" que redirige a la vista y catálogo específico', resp: 'Ingeniero Frontend', date: '05/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-23', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Modernización Estética y UI/UX de Alto Impacto Visual (Neón Cian, Shimmer, Dark-Glass y Micro-animaciones)', purpose: 'Subsanación técnica: estilización de vanguardia respetando la estructura 1:1, bordes geométricos, auras neón cian (#00FFE0), animaciones de brillo y badges de beneficio', resp: 'Especialista UI/UX & Frontend Lead', date: '06/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-24', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Módulo CMS de Gestión de Cursos para Administrador en Vivo (Garantía de Persistencia en las 3 Vistas)', purpose: 'Subsanación técnica: garantía operativa de modificación dinámica de cursos (título, precio, modalidad, escuela, horas) por el SiteAdmin con reflejo inmediato en las 3 vistas', resp: 'Ingeniero Fullstack & Backend', date: '06/10/2026', status: 'SUBSANADO 100%' },
    { id: 'DEM-25', cat: 'MES 2: NUEVA DEMANDA CLIENTE', name: 'Integración de 11 Hitos Críticos (Milestones) y Puntos de Decisión en Carta Gantt 2026', purpose: 'Subsanación técnica: incorporación de hitos formales con rombos en línea de tiempo, criterios de aceptación, sign-off y hoja dedicada de control', resp: 'Líder de Proyecto / Sebastian Acuña', date: '06/10/2026', status: 'SUBSANADO 100%' },

    // MES 2: Espacio Evolutivo Octubre 2026
    { id: 'INS-07', cat: 'MES 2: EVOLUTIVO OCTUBRE', name: 'Llaves de Integración Pasarela Webpay Plus / Transbank', purpose: 'Cobro digital automatizado de cuotas del 50% con confirmación inmediata', resp: 'Administración y Finanzas / Transbank', date: 'Octubre 2026', status: 'EN GESTIÓN 40%' },
    { id: 'INS-08', cat: 'MES 2: EVOLUTIVO OCTUBRE', name: 'Fichas Curriculares de Nuevos Cursos de Oficios de Octubre', purpose: 'Ampliación del catálogo de capacitaciones aprobadas por SENCE en Arica', resp: 'Dirección Académica OTEC', date: 'Octubre 2026', status: 'EN GESTIÓN 40%' },
    { id: 'INS-09', cat: 'MES 2: EVOLUTIVO OCTUBRE', name: 'Plantilla de Certificación Digital con Verificación QR y Folio SENCE', purpose: 'Generación automatizada de diplomas descargables verificables por empleadores', resp: 'Secretaría de Estudios / SENCE', date: 'Octubre 2026', status: 'EN GESTIÓN 30%' },
    { id: 'DEM-14', cat: 'MES 2: EVOLUTIVO OCTUBRE', name: 'Slot Reservado para Demandas y Ajustes Emergentes de Octubre', purpose: 'Disponibilidad de horas de ingeniería para solicitudes adicionales del cliente', resp: 'Contraparte Mandatario PrevySeg', date: 'Octubre 2026', status: 'EN GESTIÓN 25%' },

    // FASE FINAL: Insumos de Revisión y Mejoras (15 Días)
    { id: 'INS-10', cat: 'FASE FINAL: REVISIÓN & QA', name: 'Matriz de Casos de Prueba de Aceptación de Usuario (UAT)', purpose: 'Checklist de verificación funcional de todas las vistas, roles y flujos de matrícula', resp: 'Comité Técnico de Calidad QA', date: 'Noviembre 2026', status: 'PLANIFICADO' },
    { id: 'INS-11', cat: 'FASE FINAL: MARCHA BLANCA', name: 'Protocolo de Marcha Blanca con Docentes y Alumnos Piloto en Arica', purpose: 'Validación en condiciones reales de aula virtual, marcas horarias y libro de notas', resp: 'Dirección OTEC / Usuarios Piloto', date: 'Noviembre 2026', status: 'PLANIFICADO' },
    { id: 'INS-12', cat: 'FASE FINAL: ENTREGA & MEJORAS', name: 'Acta de Transferencia Tecnológica, Manuales y Cierre Definitivo', purpose: 'Formalización de entrega del software, código respaldado y guía de mantenimiento', resp: 'Dirección de Ingeniería PrevySeg', date: 'Noviembre 2026', status: 'PLANIFICADO' }
  ];

  let rRow = 5;
  companyInputs.forEach(item => {
    wsInputs.getRow(rRow).height = 22;
    wsInputs.getCell(rRow, 1).value = item.id;
    wsInputs.getCell(rRow, 1).alignment = { vertical: 'middle', horizontal: 'center' };
    wsInputs.getCell(rRow, 1).font = { name: 'Segoe UI', size: 8.5, bold: true };

    wsInputs.getCell(rRow, 2).value = item.cat;
    wsInputs.getCell(rRow, 2).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 2).font = { name: 'Segoe UI', size: 8.5, bold: item.cat.includes('DEMANDA') || item.cat.includes('INCIDENCIA') };

    wsInputs.getCell(rRow, 3).value = item.name;
    wsInputs.getCell(rRow, 3).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 3).font = { name: 'Segoe UI', size: 8.5, bold: item.cat.includes('DEMANDA') || item.cat.includes('INCIDENCIA') };

    wsInputs.getCell(rRow, 4).value = item.purpose;
    wsInputs.getCell(rRow, 4).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 4).font = { name: 'Segoe UI', size: 8 };

    wsInputs.getCell(rRow, 5).value = item.resp;
    wsInputs.getCell(rRow, 5).alignment = { vertical: 'middle', horizontal: 'left' };
    wsInputs.getCell(rRow, 5).font = { name: 'Segoe UI', size: 8 };

    wsInputs.getCell(rRow, 6).value = item.date;
    wsInputs.getCell(rRow, 6).alignment = { vertical: 'middle', horizontal: 'center' };
    wsInputs.getCell(rRow, 6).font = { name: 'Segoe UI', size: 8.5 };

    wsInputs.getCell(rRow, 7).value = item.status;
    wsInputs.getCell(rRow, 7).alignment = { vertical: 'middle', horizontal: 'center' };
    
    let statusTextColor = '15803D';
    if (item.status.includes('EN GESTIÓN')) statusTextColor = 'B45309';
    if (item.status === 'PLANIFICADO') statusTextColor = '475569';
    wsInputs.getCell(rRow, 7).font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: statusTextColor } };

    let rowBg = rRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF';
    if (item.cat.includes('NUEVA DEMANDA')) rowBg = 'FFF7ED'; // Naranja suave para nuevos requerimientos
    else if (item.cat.includes('DEMANDA')) rowBg = 'FEF3C7';
    else if (item.cat.includes('INCIDENCIA')) rowBg = 'FEE2E2';
    else if (item.cat.includes('FASE FINAL')) rowBg = 'FFE4E6';

    for (let c = 1; c <= 7; c++) {
      const cell = wsInputs.getCell(rRow, c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      cell.border = thinBorder;
    }
    rRow++;
  });

  /* ==========================================================================
     HOJA 3: TABLERO DE CONTROL Y GESTIÓN DE HITOS CRÍTICOS (MILESTONES)
     ========================================================================== */
  const wsMilestones = workbook.addWorksheet('Hitos Críticos del Proyecto', {
    views: [{ showGridLines: true }]
  });

  wsMilestones.mergeCells('A1:J1');
  const tm = wsMilestones.getCell('A1');
  tm.value = 'OTEC PREVYSEG 2026 — TABLERO DE CONTROL Y GESTIÓN DE HITOS CRÍTICOS (MILESTONES)';
  tm.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  tm.alignment = { vertical: 'middle', horizontal: 'center' };
  tm.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsMilestones.getRow(1).height = 30;

  wsMilestones.mergeCells('A2:J2');
  const stm = wsMilestones.getCell('A2');
  stm.value = 'Monitoreo Estratégico de Entregables Clave, Puntos de Decisión y Criterios de Aceptación Normativa SENCE / SPD (75 Días Calendario)';
  stm.font = { name: 'Segoe UI', size: 9, italic: true, color: { argb: 'E2E8F0' } };
  stm.alignment = { vertical: 'middle', horizontal: 'center' };
  stm.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: SLATE_HEADER } };
  wsMilestones.getRow(2).height = 20;

  // Tarjetas KPI de Resumen de Hitos (Fila 4 a 5)
  const kpis = [
    { range: 'A4:B5', title: 'TOTAL DE HITOS CRÍTICOS', value: '11 HITOS', bg: DARK_NAVY, text: 'FFFFFF', sub: 'Distribuídos en 75 Días' },
    { range: 'C4:D5', title: 'HITOS LOGRADOS (100%)', value: '8 HITOS (72.7%)', bg: '15803D', text: 'FFFFFF', sub: 'Completados y Aprobados' },
    { range: 'E4:F5', title: 'HITOS EN CURSO', value: '1 HITO (9.1%)', bg: 'D97706', text: 'FFFFFF', sub: 'Evolutivos Octubre en Progreso' },
    { range: 'G4:H5', title: 'HITOS PLANIFICADOS', value: '2 HITOS (18.2%)', bg: '334155', text: 'FFFFFF', sub: 'Revisión, Auditoría y Cierre' },
    { range: 'I4:J5', title: 'CUMPLIMIENTO DE CRONOGRAMA', value: '100% EN PLAZO', bg: '0A969B', text: 'FFFFFF', sub: 'Conforme a Carta Gantt Oficial' }
  ];

  kpis.forEach(k => {
    wsMilestones.mergeCells(k.range);
    const cell = wsMilestones.getCell(k.range.split(':')[0]);
    cell.value = `${k.title}\n${k.value}\n(${k.sub})`;
    cell.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: k.text } };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: k.bg } };
    cell.border = headerBorder;
  });
  wsMilestones.getRow(4).height = 24;
  wsMilestones.getRow(5).height = 24;

  // Fila 7: Encabezados de la Tabla de Hitos
  const milestoneTableHeaders = [
    { col: 1, label: 'Código', width: 10 },
    { col: 2, label: 'Hito Crítico del Proyecto', width: 44 },
    { col: 3, label: 'Día Proy.', width: 10 },
    { col: 4, label: 'Fecha Límite', width: 13 },
    { col: 5, label: 'Etapa Asociada', width: 28 },
    { col: 6, label: 'Entregable Tangible / Criterio de Aceptación', width: 50 },
    { col: 7, label: 'Responsable de Sign-off', width: 26 },
    { col: 8, label: '% Avance', width: 11 },
    { col: 9, label: 'Estado', width: 14 },
    { col: 10, label: 'Impacto Normativo (SENCE / SPD / OTEC)', width: 30 }
  ];

  milestoneTableHeaders.forEach(h => {
    wsMilestones.getColumn(h.col).width = h.width;
    const c = wsMilestones.getCell(7, h.col);
    c.value = h.label;
    c.font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: 'FFFFFF' } };
    c.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    c.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
    c.border = headerBorder;
  });
  wsMilestones.getRow(7).height = 26;

  const detailedMilestones = [
    {
      code: 'H-01',
      name: 'Cierre de Levantamiento Inicial, Marco Regulatorio y Catálogo Base de 20 Cursos',
      day: 4,
      date: '04/09/2026',
      phase: 'Etapa 1: Levantamiento e Insumos',
      deliverable: 'Acta formal de requerimientos, manual de marca, catálogo de 20 cursos validados y credenciales iniciales.',
      resp: 'Jefe de Proyecto / OTEC PrevySeg',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'NCh 2728:2015 / SENCE Formalización'
    },
    {
      code: 'H-02',
      name: 'Aprobación de Arquitectura de Software, Tokens UI y Modelo Supabase PostgreSQL',
      day: 8,
      date: '08/09/2026',
      phase: 'Etapa 2: Diseño de Arquitectura & UX/UI',
      deliverable: 'Prototipos validados en Figma/UI, Design System Tailwind, esquema relacional BD y pipeline CI/CD activo.',
      resp: 'Arquitecto de Software / Mandatario',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Estándares Cloud / OWASP Top 10'
    },
    {
      code: 'H-03',
      name: 'Despliegue de Portal Institucional Base, Catálogo Reactivo y Formulario de Pre-matrícula',
      day: 14,
      date: '14/09/2026',
      phase: 'Etapa 3: Desarrollo Core Frontend',
      deliverable: 'Sitio web React 19 funcional con buscador de cursos en vivo, Hero interactivo y pre-inscripción online.',
      resp: 'Ingeniero Frontend / Mandatario',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Transparencia Comercial SENCE'
    },
    {
      code: 'H-04',
      name: 'Despliegue de Backend Seguro, Hash Bcrypt, Validación RUT Módulo 11 y Abono 50%',
      day: 18,
      date: '18/09/2026',
      phase: 'Etapa 4: Backend Supabase & Seguridad',
      deliverable: 'Esquema PostgreSQL desplegado, autenticación Bcrypt, verificación RUT Módulo 11 y procedimiento de pago 50%.',
      resp: 'Especialista Ciberseguridad / Backend Lead',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Ley 19.628 Protección de Datos'
    },
    {
      code: 'H-05',
      name: 'Cierre Mes 1: Plataforma LMS Multi-Rol Operativa y Motor de Fiscalización SENCE/SPD',
      day: 30,
      date: '30/09/2026',
      phase: 'Etapas 5 y 6: LMS & Auditoría Oficial',
      deliverable: 'Aula Virtual 4 roles en producción, libro de calificaciones SPD (60/40) y dashboard de fiscalización 75%.',
      resp: 'Dirección de Ingeniería / Dirección Académica',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Decreto 867 / OS-10 Carabineros / SENCE'
    },
    {
      code: 'H-06',
      name: 'Homologación Normativa Ley 21.659, Depuración CCTV y Resiliencia LMS',
      day: 36,
      date: '06/10/2026',
      phase: 'Etapa 7: Adaptaciones Normativas & Noticias',
      deliverable: 'Noticias oficiales segmentadas, requisitos legales normalizados (4° medio, antecedentes) y resiliencia LMS.',
      resp: 'Dirección Jurídico-Académica / Fullstack Lead',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Nueva Ley de Seguridad Privada N° 21.659'
    },
    {
      code: 'H-07',
      name: 'Desacoplamiento de Modalidades (Online/Presencial) y Fichas Curriculares Expandibles',
      day: 44,
      date: '14/10/2026',
      phase: 'Etapas 8 y 9: Reingeniería UX/UI & Permisos',
      deliverable: 'Vistas desacopladas Online/Presencial, modal curricular interactivo de oficios y módulo de beneficios SENCE.',
      resp: 'Diseñador UX / Ingeniero Frontend',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Franquicia Tributaria SENCE Ley 19.518'
    },
    {
      code: 'H-08',
      name: 'Validación de 3 Vistas, 4 Tabs Curriculares, CMS Admin, Pruebas UX (2 Personas) y Estética Neón',
      day: 54,
      date: '24/10/2026',
      phase: 'Etapa 10: Estandarización, 3 Vistas & UX Testing',
      deliverable: 'Sistema de 3 Vistas (OTEC, Seguridad, Oficios), 4 tabs en 20 cursos, CMS Admin reactivo, SUS Score 94.5/100 y estética de vanguardia.',
      resp: 'Líder QA / Evaluadores Piloto / Mandatario',
      pct: 100,
      status: 'LOGRADO ✓',
      regulatory: 'Estándar ISO 9241 Usabilidad / NCh 2728'
    },
    {
      code: 'H-09',
      name: 'Cierre Mes 2: Culminación de Desarrollos Evolutivos y Pasarela Webpay Plus Octubre',
      day: 60,
      date: '30/10/2026',
      phase: 'Etapa 11: Reserva Técnica & Evolutivos Octubre',
      deliverable: 'Webpay Plus integrado para cuotas digitales, nuevos cursos de oficios parametrizados y diplomas descargables con QR.',
      resp: 'Equipo Fullstack / Finanzas PrevySeg',
      pct: 35,
      status: 'EN CURSO',
      regulatory: 'Normativa Bancaria CMF / SENCE Acreditación'
    },
    {
      code: 'H-10',
      name: 'Aprobación de Auditoría Exhaustiva de Calidad, Blindaje RLS y Rendimiento Web Cloud',
      day: 68,
      date: '07/11/2026',
      phase: 'Etapa 12: Auditoría, Performance & Seguridad',
      deliverable: 'Informe de análisis estático sin vulnerabilidades, score Lighthouse 95+, matriz multi-dispositivo y RLS certificado.',
      resp: 'Auditor de Calidad QA / Especialista Ciberseguridad',
      pct: 0,
      status: 'PLANIFICADO',
      regulatory: 'OWASP Cloud Security / WCAG 2.1 AA'
    },
    {
      code: 'H-11',
      name: 'Cierre Definitivo del Proyecto: Marcha Blanca Concluida, Acta de Aceptación y Entrega Formal',
      day: 75,
      date: '14/11/2026',
      phase: 'Etapa 13: Marcha Blanca & Cierre Oficial',
      deliverable: 'Protocolo UAT aprobado sin observaciones, manuales operativos entregados, repositorio GitHub sincronizado y salida a producción.',
      resp: 'Jefe de Proyecto / Gerencia General PrevySeg',
      pct: 0,
      status: 'PLANIFICADO',
      regulatory: 'Cierre Contractual / Certificación NCh 2728'
    }
  ];

  let mRow = 8;
  detailedMilestones.forEach(m => {
    wsMilestones.getRow(mRow).height = 24;

    wsMilestones.getCell(mRow, 1).value = m.code;
    wsMilestones.getCell(mRow, 1).alignment = { vertical: 'middle', horizontal: 'center' };
    wsMilestones.getCell(mRow, 1).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: GOLD_TEXT } };

    wsMilestones.getCell(mRow, 2).value = m.name;
    wsMilestones.getCell(mRow, 2).alignment = { vertical: 'middle', horizontal: 'left' };
    wsMilestones.getCell(mRow, 2).font = { name: 'Segoe UI', size: 9, bold: true, color: { argb: '0F172A' } };

    wsMilestones.getCell(mRow, 3).value = `Día ${m.day}`;
    wsMilestones.getCell(mRow, 3).alignment = { vertical: 'middle', horizontal: 'center' };
    wsMilestones.getCell(mRow, 3).font = { name: 'Segoe UI', size: 8.5, bold: true };

    wsMilestones.getCell(mRow, 4).value = m.date;
    wsMilestones.getCell(mRow, 4).alignment = { vertical: 'middle', horizontal: 'center' };
    wsMilestones.getCell(mRow, 4).font = { name: 'Segoe UI', size: 8.5 };

    wsMilestones.getCell(mRow, 5).value = m.phase;
    wsMilestones.getCell(mRow, 5).alignment = { vertical: 'middle', horizontal: 'left' };
    wsMilestones.getCell(mRow, 5).font = { name: 'Segoe UI', size: 8.5 };

    wsMilestones.getCell(mRow, 6).value = m.deliverable;
    wsMilestones.getCell(mRow, 6).alignment = { vertical: 'middle', horizontal: 'left' };
    wsMilestones.getCell(mRow, 6).font = { name: 'Segoe UI', size: 8 };

    wsMilestones.getCell(mRow, 7).value = m.resp;
    wsMilestones.getCell(mRow, 7).alignment = { vertical: 'middle', horizontal: 'left' };
    wsMilestones.getCell(mRow, 7).font = { name: 'Segoe UI', size: 8 };

    wsMilestones.getCell(mRow, 8).value = `${m.pct}%`;
    wsMilestones.getCell(mRow, 8).alignment = { vertical: 'middle', horizontal: 'center' };
    let pctTextColor = '15803D';
    if (m.pct === 0) pctTextColor = '64748B';
    else if (m.pct < 100) pctTextColor = 'B45309';
    wsMilestones.getCell(mRow, 8).font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: pctTextColor } };

    wsMilestones.getCell(mRow, 9).value = m.status;
    wsMilestones.getCell(mRow, 9).alignment = { vertical: 'middle', horizontal: 'center' };
    let statusTextColor = '15803D';
    if (m.status === 'PLANIFICADO') statusTextColor = '475569';
    else if (m.status === 'EN CURSO') statusTextColor = 'B45309';
    wsMilestones.getCell(mRow, 9).font = { name: 'Segoe UI', size: 8.5, bold: true, color: { argb: statusTextColor } };

    wsMilestones.getCell(mRow, 10).value = m.regulatory;
    wsMilestones.getCell(mRow, 10).alignment = { vertical: 'middle', horizontal: 'left' };
    wsMilestones.getCell(mRow, 10).font = { name: 'Segoe UI', size: 8, italic: true };

    let rowBg = 'FFFFFF';
    if (m.status === 'LOGRADO ✓') rowBg = mRow % 2 === 0 ? 'F0FDF4' : 'FFFFFF';
    else if (m.status === 'EN CURSO') rowBg = 'FFFBEB';
    else if (m.status === 'PLANIFICADO') rowBg = mRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF';

    for (let c = 1; c <= 10; c++) {
      const cell = wsMilestones.getCell(mRow, c);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: rowBg } };
      cell.border = thinBorder;
    }
    mRow++;
  });

  /* ==========================================================================
     HOJA 4: RESPALDO GITHUB Y CONTROL DE VERSIONES
     ========================================================================== */
  const wsGit = workbook.addWorksheet('Respaldo GitHub & Versiones', {
    views: [{ showGridLines: true }]
  });

  wsGit.mergeCells('A1:F1');
  const tg = wsGit.getCell('A1');
  tg.value = 'RESPALDO OFICIAL DE DESARROLLO EN GITHUB — PREVYSEG 2026';
  tg.font = { name: 'Segoe UI', size: 13, bold: true, color: { argb: 'FFFFFF' } };
  tg.alignment = { vertical: 'middle', horizontal: 'center' };
  tg.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: DARK_NAVY } };
  wsGit.getRow(1).height = 30;

  wsGit.mergeCells('A3:F3');
  wsGit.getCell('A3').value = 'ENLACE AL REPOSITORIO OFICIAL (CÓDIGO FUENTE, COMMITS Y ARTIFACTS):';
  wsGit.getCell('A3').font = { name: 'Segoe UI', size: 10, bold: true, color: { argb: '0F172A' } };

  wsGit.mergeCells('A4:F4');
  const urlCell = wsGit.getCell('A4');
  urlCell.value = 'https://github.com/Sebastianaso/PrevySeg2026';
  urlCell.font = { name: 'Segoe UI', size: 12, bold: true, underline: true, color: { argb: '0284C7' } };
  urlCell.alignment = { vertical: 'middle', horizontal: 'left' };
  wsGit.getRow(4).height = 24;

  const gitDetails = [
    ['Parámetro Técnico', 'Valor / Detalle del Proyecto'],
    ['Propietario / Cuenta GitHub', 'Sebastianaso (Sebastian Acuña)'],
    ['Nombre del Repositorio', 'PrevySeg2026'],
    ['Rama Principal de Producción', 'main'],
    ['Visibilidad', 'Público / Accesible para Fiscalización SPD & SENCE'],
    ['Horizonte Temporal del Proyecto', '2 Meses y 15 Días (75 Días Calendario: Septiembre a Noviembre 2026)'],
    ['Estructura de Fases y Hitos', 'Mes 1: Core & LMS (5 Hitos) | Mes 2: 3 Vistas, CMS Admin, Fichas 4 Tabs, RRSS, Pruebas UX (4 Hitos) | Fase Final: Revisión, Auditoría y Cierre (2 Hitos)'],
    ['Total de Elementos WBS', '54 Actividades Ejecutables + 11 Hitos Críticos de Control = 65 Entregables Formales'],
    ['Stack de Tecnologías Frontend', 'React 19, Vite, Tailwind CSS 4, Framer Motion, GSAP, Lucide React, React Router 7'],
    ['Stack Backend & Base de Datos', 'Supabase Cloud (PostgreSQL 15), Procedimientos Almacenados RPC, Bcrypt, Row Level Security (RLS)'],
    ['Mecanismo de Respaldo y Trazabilidad', 'Git Version Control con registro cronológico de commits, ramas y hashes SHA auditables'],
    ['Servidor y Región Cloud', 'AWS sa-east-1 (São Paulo) Pooler Supabase PostgreSQL'],
    ['Despliegue Web', 'Vercel Edge Network CI/CD automatizado con despliegue continuo'],
    ['Estado de Desarrollo a Octubre 2026', 'Sistema de 3 Vistas, CMS Admin reactivo, Fichas en 4 Tabs, Card Comercial, RRSS, Pruebas UX y 8 Hitos logrados al 100%'],
    ['Fase Final de Revisión y Mejoras', 'Programada para los últimos 15 días con auditoría estática, testing de carga, marchas blancas y UAT definitivo']
  ];

  wsGit.getColumn(1).width = 34;
  wsGit.getColumn(2).width = 82;

  let gRow = 6;
  gitDetails.forEach((row, i) => {
    wsGit.getRow(gRow).height = 22;
    const c1 = wsGit.getCell(gRow, 1);
    const c2 = wsGit.getCell(gRow, 2);

    c1.value = row[0];
    c2.value = row[1];

    c1.font = { name: 'Segoe UI', size: 9, bold: i === 0, color: { argb: i === 0 ? 'FFFFFF' : '0F172A' } };
    c2.font = { name: 'Segoe UI', size: 9, bold: i === 0, color: { argb: i === 0 ? 'FFFFFF' : '334155' } };

    c1.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i === 0 ? DARK_NAVY : (gRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF') } };
    c2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: i === 0 ? DARK_NAVY : (gRow % 2 === 0 ? 'F8FAFC' : 'FFFFFF') } };

    c1.border = thinBorder;
    c2.border = thinBorder;
    gRow++;
  });

  const outputPath = path.resolve('c:/Users/ashle/OneDrive/Escritorio/prevyseg/Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✓ Carta Gantt actualizada exitosamente con 11 hitos en: ${outputPath}`);
}

generateDevelopmentGantt().catch(console.error);
