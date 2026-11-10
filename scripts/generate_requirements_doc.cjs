const fs = require('fs');
const path = require('path');
const { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  AlignmentType, 
  HeadingLevel, 
  BorderStyle, 
  ShadingType,
  Header,
  Footer,
  PageNumber,
  PageBreak
} = require('docx');

async function createFormalEngineeringRequirementsDoc() {
  // Paleta de Colores de Ingeniería PrevySeg
  const COLOR_PRIMARY = "0F3B7A";      // Azul Marino Corporativo / Ingeniería
  const COLOR_SECONDARY = "0284C7";    // Cyan / Azul Tecnológico PrevySeg
  const COLOR_TEAL = "0D9488";         // Teal Acentuado
  const COLOR_DARK_SLATE = "0F172A";   // Pizarra Oscuro (Encabezados)
  const COLOR_TEXT = "1E293B";         // Texto Principal (Slate 800)
  const COLOR_MUTED = "64748B";        // Texto Secundario (Slate 500)
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_HEADER = "0F172A";    // Fondo Encabezados Tabla
  const COLOR_BG_SUBHEADER = "1E293B"; // Fondo Sub-encabezados
  const COLOR_BG_LIGHT = "F8FAFC";     // Fondo Fila Alterna
  const COLOR_CRITICAL = "B91C1C";     // Rojo Prioridad Crítica
  const COLOR_HIGH = "C2410C";         // Naranja Prioridad Alta
  const COLOR_MEDIUM = "0369A1";       // Azul Prioridad Media

  const standardBorders = {
    top: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
    bottom: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
    left: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
    right: { style: BorderStyle.SINGLE, size: 1, color: COLOR_BORDER },
  };

  const createCell = (text, options = {}) => {
    const { 
      isHeader = false, 
      width = null, 
      bgColor = isHeader ? COLOR_BG_HEADER : null, 
      textColor = isHeader ? "FFFFFF" : COLOR_TEXT,
      bold = isHeader,
      italic = false,
      align = AlignmentType.LEFT,
      colSpan = 1,
      rowSpan = 1,
      fontSize = isHeader ? 18 : 17
    } = options;

    const paragraphs = Array.isArray(text) ? text : [text];

    return new TableCell({
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
      columnSpan: colSpan,
      rowSpan: rowSpan,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      borders: standardBorders,
      children: paragraphs.map(pText => new Paragraph({
        alignment: align,
        spacing: { line: 240, after: 40 },
        children: [
          new TextRun({
            text: pText,
            bold: bold,
            italics: italic,
            color: textColor,
            size: fontSize,
            font: "Calibri"
          })
        ]
      }))
    });
  };

  const createHeading1 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 160 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_PRIMARY,
          size: 28,
          font: "Calibri"
        })
      ]
    });
  };

  const createHeading2 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 240, after: 120 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_SECONDARY,
          size: 24,
          font: "Calibri"
        })
      ]
    });
  };

  const createHeading3 = (title) => {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text: title,
          bold: true,
          color: COLOR_DARK_SLATE,
          size: 20,
          font: "Calibri"
        })
      ]
    });
  };

  const createParagraph = (text, options = {}) => {
    const { bold = false, italic = false, size = 20, color = COLOR_TEXT, align = AlignmentType.LEFT, after = 120 } = options;
    return new Paragraph({
      alignment: align,
      spacing: { after: after, line: 276 },
      children: [
        new TextRun({
          text: text,
          bold: bold,
          italics: italic,
          color: color,
          size: size,
          font: "Calibri"
        })
      ]
    });
  };

  const createBullet = (boldPrefix, text) => {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { after: 80, line: 260 },
      children: [
        new TextRun({
          text: boldPrefix + " ",
          bold: true,
          color: COLOR_DARK_SLATE,
          size: 19,
          font: "Calibri"
        }),
        new TextRun({
          text: text,
          color: COLOR_TEXT,
          size: 19,
          font: "Calibri"
        })
      ]
    });
  };

  /* ==========================================================================
     REQUERIMIENTOS FUNCIONALES FORMALES (RF-01 A RF-22)
     ========================================================================== */
  const functionalRequirements = [
    {
      code: "RF-01",
      module: "Módulo Catálogo Oficial",
      name: "Catálogo Oficial Cerrado de 20 Cursos (Seguridad y Oficios)",
      desc: "Despliegue interactivo de exactamente 10 cursos de la Escuela de Seguridad Privada (Ley N° 21.659 / D.S. N° 867) y 10 cursos de la Escuela de Oficios Industriales y Técnicos (Macro Zona Norte). Cada tarjeta incluye arancel oficial en CLP, horas pedagógicas/cronológicas, modalidad y desglose de cuotas del abono del 50%.",
      inputs: "Navegación por el portal web o selección de pestañas de escuela.",
      process: "Renderizado reactivo desacoplado en grilla responsiva con cálculo en tiempo real de cuotas de abono y visualización de temarios oficiales.",
      outputs: "Vitrina académica completa con apertura de modales de temario y admisión.",
      actor: "Público General / Empresas / Alumnos",
      priority: "Must Have (Crítica)",
      acceptance: "Despliegue exacto de los 20 cursos oficiales con precios, horas y conmutador entre ambas escuelas sin inconsistencias."
    },
    {
      code: "RF-02",
      module: "Módulo Académico",
      name: "Cuerpo Docente Oficial OS-10 Acreditado",
      desc: "Presentación curricular de los instructores acreditados ante la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile: Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar, asociados a la impartición de la malla pedagógica.",
      inputs: "Consulta de información institucional y programas de seguridad.",
      process: "Vinculación curricular y despliegue de perfiles de instructores autorizados.",
      outputs: "Bloque de docentes acreditados con sello de validación policial.",
      actor: "Alumnos / Empresas / OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Exhibición visible y precisa de ambos instructores acreditados en la plataforma."
    },
    {
      code: "RF-03",
      module: "Módulo Admisión",
      name: "Ficha de Admisión Digital con 8 Campos Obligatorios",
      desc: "Captura, validación de integridad y procesamiento de 8 datos personales obligatorios: 1. Nombre Completo, 2. RUT / Cédula, 3. Fecha de Nacimiento (validación etaria), 4. Correo Electrónico (RFC 5322), 5. Teléfono / WhatsApp (+56 9...), 6. Dirección Particular (residencia actual), 7. Región de Residencia (16 regiones) y 8. Ciudad / Comuna.",
      inputs: "Ingreso de datos en el modal de postulación interactivo.",
      process: "Comprobación sincrónica campo a campo con indicadores visuales de completitud y estado de validación.",
      outputs: "Formulario apto para despacho y preinscripción académica.",
      actor: "Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Bloqueo estricto del botón de envío si falta cualquiera de los 8 datos obligatorios o si alguno presenta formato inválido."
    },
    {
      code: "RF-04",
      module: "Módulo Validación",
      name: "Algoritmo Módulo 11 y Formateador Dinámico para RUT",
      desc: "Validación matemática del dígito verificador del RUT chileno (calculateRutDv y validateRut) y formateo dinámico en tiempo real a la estructura estándar XX.XXX.XXX-X mientras el usuario escribe.",
      inputs: "Caracteres numéricos y dígito verificador ingresados por el postulante.",
      process: "Cálculo aritmético ponderado (serie 2,3,4,5,6,7) con detección instantánea de errores y badge de validación.",
      outputs: "RUT formateado correctamente y habilitación del campo.",
      actor: "Todos los Usuarios",
      priority: "Must Have (Crítica)",
      acceptance: "Rechazo inmediato de RUTs matemáticamente inválidos y aceptación sin fallos de RUTs válidos con o sin guion inicial."
    },
    {
      code: "RF-05",
      module: "Módulo Normativo",
      name: "Declaración Jurada Formal con Ticket Interactivo",
      desc: "Casilla de verificación obligatoria con fe de juramento que diferencia expresamente los requisitos exigidos para formalizar matrícula en OTEC PrevySeg (Certificado de Antecedentes Especiales y Licencia Media MINEDUC) de los gestionados ante la plataforma oficial de la Subsecretaría de Prevención del Delito (evaluación médica, informe psicotécnico y cédula).",
      inputs: "Activación del checkbox de declaración jurada interactiva.",
      process: "Validación booleana de conformidad normativa antes de habilitar el procesamiento de la postulación.",
      outputs: "Estado de aceptación registrado en la ficha y transmitido en los respaldos.",
      actor: "Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Impedimento de envío si el postulante no ha marcado el ticket de declaración jurada de conocimiento de requisitos."
    },
    {
      code: "RF-06",
      module: "Módulo Notificaciones",
      name: "Motor Dual de Correo en Tiempo Real (Gmail SMTP y Resend API)",
      desc: "Despacho automatizado y simultáneo de comprobantes oficiales mediante Gmail SMTP (con autenticación de dos pasos y App Password para prevysegconfirm@gmail.com) y Resend API en paralelo (Promise.all con keepalive: true), enviando réplica al postulante y a la casilla institucional prevyseg.capacitaciones@gmail.com.",
      inputs: "Pulsación del botón 'Enviar Información' en la ficha de admisión.",
      process: "Construcción de plantilla HTML corporativa con diseño responsivo y despacho concurrente a ambas casillas.",
      outputs: "Correos electrónicos entregados en bandeja de entrada con ficha completa, código de solicitud y datos bancarios.",
      actor: "Sistema / Postulante / OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Llegada efectiva y sincrónica de las dos copias de correo electrónico con la ficha idéntica y acuse de recibo."
    },
    {
      code: "RF-07",
      module: "Módulo Financiero",
      name: "Bloque Oficial de Transferencia Bancaria y Código QR Dinámico",
      desc: "Exhibición en pantalla y en el cuerpo de ambos correos del boceto oficial de datos bancarios: PREVYSEG SPA, RUT 76.256.947-7, Cuenta Corriente 1000163399 Banco Estado / Chile, correo comprobante y código QR escaneable generado dinámicamente vía API para pago asistido.",
      inputs: "Confirmación de curso seleccionado y arancel pactado.",
      process: "Generación de código QR de transferencia bancaria e incrustación en la ficha y plantilla de email.",
      outputs: "Boceto bancario institucional idéntico en web y correos de respaldo.",
      actor: "Postulante / Finanzas OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Visualización clara de datos bancarios oficiales y código QR escaneable y operativo en dispositivos móviles."
    },
    {
      code: "RF-08",
      module: "Módulo Admisión",
      name: "Redirección Instantánea a WhatsApp Admisiones (+56 9 7869 1869)",
      desc: "Apertura sincrónica e inmediata en una nueva pestaña del enlace a WhatsApp de Admisiones al pulsar 'Enviar Información', precargando la ficha de 8 campos y el código de postulación sin sufrir bloqueo por ventanas emergentes (popups).",
      inputs: "Pulsación de confirmación en la ficha de postulación.",
      process: "Disparo sincrónico de window.open() previo a operaciones asíncronas de red para preservar la interacción del usuario.",
      outputs: "Chat de WhatsApp abierto en la línea +56 9 7869 1869 con el mensaje listo para ser enviado.",
      actor: "Postulante / Admisiones",
      priority: "Must Have (Crítica)",
      acceptance: "Apertura sin bloqueo en Google Chrome, Microsoft Edge, Safari y navegadores móviles Android/iOS."
    },
    {
      code: "RF-09",
      module: "Módulo Financiero",
      name: "Deshabilitación de Pasarela Web Directa (Canal Asistido)",
      desc: "Desactivación explícita de pasarelas de pago automatizadas directas en línea, priorizando el modelo de transferencia bancaria asistida con confirmación y respaldo humano del equipo de admisión.",
      inputs: "Proceso de pago y formalización de matrícula.",
      process: "Enrutamiento administrativo hacia validación de comprobante bancario por parte del personal de finanzas.",
      outputs: "Flujo asistido de matrícula transparente y trazable.",
      actor: "OTEC / Postulante",
      priority: "Must Have (Crítica)",
      acceptance: "Ausencia de cargos no asistidos; canalización exclusiva vía transferencia con acuse oficial."
    },
    {
      code: "RF-10",
      module: "Módulo Persistencia",
      name: "Procedimiento Atómico `process_enrollment_registration`",
      desc: "Procedimiento almacenado PL/pgSQL transaccional en PostgreSQL (Supabase) con cláusulas ACID que crea el usuario, la cohorte y la matrícula, garantizando la regla de matrícula única sin registros huérfanos ni duplicidades.",
      inputs: "Payload de inscripción autenticado desde el frontend.",
      process: "Transacción atómica segura con commit/rollback que vincula auth.users, public.users y public.enrollments.",
      outputs: "Matrícula persistida con identificador único y cupo reservado.",
      actor: "Sistema / Base de Datos",
      priority: "Must Have (Crítica)",
      acceptance: "0% fallos de integridad referencial y prevención matemática de inscripciones duplicadas para un mismo RUT."
    },
    {
      code: "RF-11",
      module: "Módulo Seguridad",
      name: "Criptografía Blowfish Bcrypt 256-bit (pgcrypto)",
      desc: "Hasheo unidireccional de contraseñas mediante algoritmo Bcrypt con factor de costo 10 utilizando la extensión oficial pgcrypto en PostgreSQL. Prohibición estricta de almacenar texto plano.",
      inputs: "Contraseña ingresada en registros o actualizaciones.",
      process: "Cifrado no reversible `crypt(plain_pwd, gen_salt('bf', 10))` a nivel de base de datos.",
      outputs: "Hash Bcrypt de 60 caracteres almacenado en auth.users y public.users.",
      actor: "Seguridad / Sistema",
      priority: "Must Have (Crítica)",
      acceptance: "100% de las contraseñas del padrón protegidas con hash Bcrypt; imposibilidad de recuperación en texto plano."
    },
    {
      code: "RF-12",
      module: "Módulo Seguridad",
      name: "Procedimientos de Seguridad `admin_create_user` y `change_user_password`",
      desc: "Funciones PL/pgSQL con elevación controlada (`SECURITY DEFINER`) que permiten al administrador enrolar nuevos usuarios y resetear/cambiar contraseñas re-hasheadas de forma atómica en ambas tablas de autenticación.",
      inputs: "Identificador de usuario y nueva contraseña proporcionada por el administrador.",
      process: "Ejecución de RPC administrativo con validación de privilegios RBAC y actualización simultánea.",
      outputs: "Contraseña actualizada exitosamente con registro en bitácora de auditoría.",
      actor: "Administrador OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Cambio inmediato de contraseña efectivo en login de prueba sin desincronización de sesiones."
    },
    {
      code: "RF-13",
      module: "Módulo Comercial",
      name: "Calculadora de Franquicia Tributaria SENCE (Tramos UTM)",
      desc: "Módulo interactivo que calcula el porcentaje de cobertura de la Franquicia Tributaria SENCE en base al sueldo del trabajador en UTM: 100% de franquicia (hasta 25 UTM), 50% de franquicia (entre 25 y 50 UTM), 15% (sobre 50 UTM) y costo particular.",
      inputs: "Ingreso de renta imponible o selección directa del tramo tributario.",
      process: "Aplicación aritmética de las tasas legales según la Ley N° 19.518 y cálculo de copago de la empresa.",
      outputs: "Desglose claro de cobertura fiscal y copago neto por alumno.",
      actor: "Empresas / Recursos Humanos",
      priority: "Must Have (Crítica)",
      acceptance: "Cálculo matemático exacto conforme a la normativa vigente SENCE."
    },
    {
      code: "RF-14",
      module: "Módulo Comercial",
      name: "Enrutamiento Multicanal de WhatsApp",
      desc: "Mecanismo inteligente de enlace a los dos canales de atención corporativa: Canal de Admisiones Generales (+56 9 7869 1869) y Canal de Coordinación Académica (+56 9 8231 2128), según la sección del portal visitada.",
      inputs: "Clic en los botones de contacto flotantes o contextuales.",
      process: "Construcción de URI con mensaje contextualizado según la consulta del usuario.",
      outputs: "Derivación al canal telefónico oficial correspondiente.",
      actor: "Público General / Alumnos",
      priority: "Must Have (Crítica)",
      acceptance: "Enlace operativo y comprobado hacia ambos números telefónicos institucionales."
    },
    {
      code: "RF-15",
      module: "Módulo Acceso",
      name: "Modal de Acceso 1-Click Demo con Conmutador de Visibilidad",
      desc: "Modal de autenticación institucional que incluye botón de visibilidad de contraseña (ojo/candado) y accesos rápidos preconfigurados de demostración para los tres roles del sistema (ADMIN, TEACHER, STUDENT).",
      inputs: "Pulsación de credenciales demo o ingreso manual de credenciales.",
      process: "Autocompletado de formulario y verificación de credenciales con hash en Supabase.",
      outputs: "Inicio de sesión seguro y redirección al entorno correspondiente según el rol.",
      actor: "Todos los Usuarios",
      priority: "Must Have (Crítica)",
      acceptance: "Acceso fluido a los tres perfiles sin bloqueos y alternancia correcta del estado de visualización de clave."
    },
    {
      code: "RF-16",
      module: "Módulo LMS Admin",
      name: "Consola de Gestión de Participantes y Claves",
      desc: "Panel administrativo con grilla interactiva de participantes, filtros por curso, cohorte, búsqueda por RUT, exportación a CSV/Excel y modal dedicado para restablecimiento inmediato de contraseñas Bcrypt.",
      inputs: "Interacción del administrador en la vista de participantes.",
      process: "Consulta optimizada en PostgreSQL con paginación, filtros dinámicos y modal de reseteo.",
      outputs: "Tabla de usuarios actualizada en tiempo real con acciones de gestión activas.",
      actor: "Administrador OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Búsqueda instantánea por RUT y ejecución exitosa del modal de reseteo de claves con notificación visual."
    },
    {
      code: "RF-17",
      module: "Módulo LMS Alumno",
      name: "Área Personal y Monitoreo Curricular",
      desc: "Panel de control del estudiante con indicador porcentual de avance académico, estado de matrícula SENCE y acceso rápido a los módulos formativos y certificaciones emitidas.",
      inputs: "Inicio de sesión del alumno regular.",
      process: "Cálculo reactivo de avance curricular ponderado y consulta de estado de matrícula.",
      outputs: "Dashboard personal con métricas académicas claras y accesos directos a lecciones.",
      actor: "Estudiante",
      priority: "Must Have (Crítica)",
      acceptance: "Visualización correcta del progreso del alumno sin inconsistencias numéricas."
    },
    {
      code: "RF-18",
      module: "Módulo LMS Alumno",
      name: "Aula Virtual y Visor Didáctico Multimedia",
      desc: "Entorno interactivo de aprendizaje organizado por unidades temáticas con visor de documentos técnicos (PDFs), reproducción de material audiovisual y cuestionarios de autoevaluación formativa.",
      inputs: "Navegación del alumno por los módulos del curso matriculado.",
      process: "Carga dinámica de recursos didácticos y registro de completitud de actividades.",
      outputs: "Visualización fluida de material de estudio y retroalimentación interactiva.",
      actor: "Estudiante",
      priority: "Must Have (Crítica)",
      acceptance: "Reproducción multimedia estable y avance progresivo entre las lecciones del curso."
    },
    {
      code: "RF-19",
      module: "Módulo Certificación",
      name: "Visto Bueno Administrativo para Emisión de Diplomas",
      desc: "Módulo de auditoría interna que permite a la dirección del OTEC verificar el cumplimiento de asistencia (mínimo 75% SENCE) y aprobación académica antes de autorizar la generación y emisión del diploma oficial.",
      inputs: "Revisión de actas finales de cohorte por parte de la administración.",
      process: "Validación de requisitos y cambio de estado a 'AUTORIZADO PARA EMISIÓN'.",
      outputs: "Diploma habilitado para descarga por el estudiante con sello institucional.",
      actor: "Administrador OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "Bloqueo de certificados para alumnos no aprobados o con asistencia insuficiente."
    },
    {
      code: "RF-20",
      module: "Módulo Certificación",
      name: "Confidencialidad Legal de Diplomas (Ley N° 19.628)",
      desc: "Los diplomas y certificados emitidos consignan exclusivamente la condición cualitativa de 'APROBADO', omitiendo notas numéricas para proteger la vida privada y datos sensibles del estudiante según la Ley N° 19.628.",
      inputs: "Generación de documento digital de certificación.",
      process: "Renderizado de plantilla PDF oficial sin inclusión de calificaciones cuantitativas.",
      outputs: "Diploma oficial con formato legalmente conforme y presentación profesional.",
      actor: "Sistema / OTEC",
      priority: "Must Have (Crítica)",
      acceptance: "0% de calificaciones numéricas expuestas en los certificados públicos emitidos."
    },
    {
      code: "RF-21",
      module: "Módulo Certificación",
      name: "Verificación Criptográfica QR Antifraude",
      desc: "Inclusión en cada diploma emitido de un código QR con firma criptográfica que enlaza a un endpoint público de validación para que empleadores y Carabineros OS-10 comprueben la autenticidad y vigencia del documento.",
      inputs: "Escaneo del código QR presente en el diploma físico o digital.",
      process: "Consulta pública del identificador de certificación en la base de datos de PrevySeg.",
      outputs: "Página de validación con datos del egresado, curso, fecha y estado de vigencia.",
      actor: "Empleadores / Fiscalizadores OS-10",
      priority: "Must Have (Crítica)",
      acceptance: "Validación instantánea en línea de certificados emitidos y rechazo de códigos adulterados."
    },
    {
      code: "RF-22",
      module: "Módulo Empleabilidad",
      name: "Bolsa de Empleo Regional Arica y Parinacota",
      desc: "Vitrina de ofertas laborales exclusivas para el sector de seguridad privada e industrias técnicas de la Macro Zona Norte con postulación directa del alumno utilizando su perfil y RUT validado en la plataforma.",
      inputs: "Postulación a una vacante laboral desde el área del estudiante.",
      process: "Registro de postulación en la base de datos con vinculación de antecedentes académicos.",
      outputs: "Confirmación de postulación y reporte disponible para la empresa contratante.",
      actor: "Estudiante / Empresas",
      priority: "Should Have (Alta)",
      acceptance: "Postulación exitosa con verificación de requisitos mínimos exigidos por el aviso de empleo."
    }
  ];

  /* ==========================================================================
     REQUERIMIENTOS NO FUNCIONALES (RNF-01 A RNF-12)
     ========================================================================== */
  const nonFunctionalRequirements = [
    { code: "RNF-01", dim: "Seguridad Criptográfica", req: "Todas las contraseñas deben estar hasheadas con Blowfish Bcrypt ($2a$10$) mediante la extensión pgcrypto en PostgreSQL. Cero texto plano.", metric: "100% claves hasheadas con Bcrypt" },
    { code: "RNF-02", dim: "Integridad de Datos", req: "Persistencia atómica de matrícula e idempotencia (ON CONFLICT) entre auth.users, auth.identities y public.users mediante RPC transaccional.", metric: "0 fallos de integridad referencial" },
    { code: "RNF-03", dim: "Seguridad (RBAC)", req: "Aislamiento estricto de rutas, vistas y endpoints de base de datos según el rol autenticado del usuario (ADMIN, TEACHER, STUDENT).", metric: "100% rutas y acciones protegidas" },
    { code: "RNF-04", dim: "Eficiencia de Rendimiento", req: "Tiempo de renderizado inicial (FCP) inferior a 1.2 segundos y compilación en producción sin advertencias ni errores con Vite.", metric: "FCP ≤ 1.2s • 0 errores de build" },
    { code: "RNF-05", dim: "Disponibilidad Operacional", req: "Disponibilidad del servicio 24/7 con un Acuerdo de Nivel de Servicio (SLA) del 99.8% mensual en la infraestructura cloud de Supabase.", metric: "Uptime mensual ≥ 99.8%" },
    { code: "RNF-06", dim: "Usabilidad y Accesibilidad", req: "Interfaz con contraste conforme a WCAG 2.1 Nivel AA (bg-slate-50, bg-white, text-slate-900), diseño adaptativo y tipografía legible.", metric: "Ratio de contraste ≥ 4.5:1" },
    { code: "RNF-07", dim: "Compatibilidad Cross-Browser", req: "Funcionamiento garantizado en navegadores modernos de escritorio y móviles: Google Chrome, Microsoft Edge, Mozilla Firefox, Safari y navegadores Android/iOS.", metric: "100% compatibilidad estándar" },
    { code: "RNF-08", dim: "Mantenibilidad del Código", req: "Arquitectura desacoplada en React con librerías y utilidades dedicadas (supabase.js, notificationService.js, validation.js) sin deuda técnica.", metric: "Arquitectura modular y limpia" },
    { code: "RNF-09", dim: "Cumplimiento Normativo SENCE", req: "Trazabilidad de registros de asistencia y participantes bajo los estándares de la Norma Chilena NCh 2728:2015 para organismos de capacitación.", metric: "Conformidad auditoría SENCE 100%" },
    { code: "RNF-10", dim: "Privacidad Legal (Ley 19.628)", req: "Diplomas emitidos con certificación cualitativa ('APROBADO') omitiendo notas numéricas para resguardar la privacidad del participante.", metric: "0% notas en certificados públicos" },
    { code: "RNF-11", dim: "Tolerancia a Fallos", req: "Captura de excepciones en tiempo de ejecución con React Error Boundaries y mecanismo de fallback transparente en el motor dual de correo.", metric: "0 pantallas blancas ante fallos" },
    { code: "RNF-12", dim: "Trazabilidad en Git", req: "Registro cronológico de commits descriptivos en español sincronizados en el repositorio GitHub oficial (Sebastianaso/PrevySeg2026, rama main).", metric: "Trazabilidad 100% en rama main" }
  ];

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Calibri", size: 21, color: COLOR_TEXT }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "OTEC PrevySeg SpA | ERS-PREVYSEG-2026-V2.6-FINAL",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  })
                ]
              })
            ]
          })
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                alignment: AlignmentType.SPACE_BETWEEN,
                children: [
                  new TextRun({
                    text: "Confidencial - Norma NCh 2728:2015 & SENCE - IP Santo Tomás Arica",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    text: "    Página ",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    text: " de ",
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  })
                ]
              })
            ]
          })
        },
        children: [
          // ==================================================================
          // PORTADA / ENCABEZADO FORMAL
          // ==================================================================
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 120 },
            children: [
              new TextRun({
                text: "ORGANISMO TÉCNICO DE CAPACITACIÓN PREVYSEG SPA",
                bold: true,
                color: COLOR_PRIMARY,
                size: 28,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: "RUT Oficial: 76.256.947-7 • Registro SENCE N° 1238088725 • Norma NCh 2728:2015",
                bold: true,
                color: "D97706",
                size: 20,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 260 },
            children: [
              new TextRun({
                text: "Sede Central: Blanco Encalada N° 666, 2do Piso, Arica, Chile",
                size: 18,
                color: COLOR_MUTED,
                italics: true,
                font: "Calibri"
              })
            ]
          }),

          createHeading1("ESPECIFICACIÓN FORMAL DE REQUERIMIENTOS DE SOFTWARE"),
          createParagraph("Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS\nEcosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción", { bold: true, size: 22, color: COLOR_PRIMARY, align: AlignmentType.CENTER, after: 300 }),

          // TABLA DE METADATOS TÉCNICOS
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("PARÁMETRO DOCUMENTAL", { isHeader: true, width: 35 }),
                  createCell("VALOR OFICIAL / REGISTRO", { isHeader: true, width: 65 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Código de Especificación", { bold: true }),
                  createCell("ERS-PREVYSEG-2026-V2.6-FINAL", { bold: true, textColor: COLOR_PRIMARY })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante en Práctica Profesional", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)\nIngeniería en Informática — IP Santo Tomás Sede Arica", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Centro de Práctica / Mandante", { bold: true }),
                  createCell("OTEC PrevySeg SpA (RUT: 76.256.947-7 • SENCE N° 1238088725)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Supervisora del Centro de Práctica", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Viviane Montesillo — Dirección General OTEC PrevySeg SpA", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Docente Guía Santo Tomás", { bold: true }),
                  createCell("Paola Andrea Cifuentes Berríos — Santo Tomás Sede Arica")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estándares de Ingeniería", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("ISO/IEC/IEEE 29148:2018 / IEEE Std 830-1998 / ISO/IEC 25010 / NCh 2728:2015", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Fecha de Cierre y Emisión", { bold: true }),
                  createCell("Noviembre de 2026 — Arica, Chile")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Repositorio y Trazabilidad Git", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("https://github.com/Sebastianaso/PrevySeg2026 (Rama main)", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estado de Conformidad", { bold: true }),
                  createCell("APROBADO 100% — AUDITADO, PROBADO Y CONFORME A ACTA DE ENTREGA", { bold: true, textColor: "15803D" })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // HISTORIAL DE VERSIONES
          // ==================================================================
          createHeading2("Historial de Revisiones y Control de Versiones"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("VERSIÓN", { isHeader: true, width: 12, align: AlignmentType.CENTER }),
                  createCell("FECHA", { isHeader: true, width: 14, align: AlignmentType.CENTER }),
                  createCell("AUTOR / ROL", { isHeader: true, width: 22 }),
                  createCell("DETALLE DE MODIFICACIONES", { isHeader: true, width: 37 }),
                  createCell("APROBACIÓN", { isHeader: true, width: 15, align: AlignmentType.CENTER })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v1.0.0", { bold: true, align: AlignmentType.CENTER, bgColor: COLOR_BG_LIGHT }),
                  createCell("01/09/2026", { align: AlignmentType.CENTER, bgColor: COLOR_BG_LIGHT }),
                  createCell("Sebastián Acuña", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Levantamiento inicial de requerimientos para portal web y vitrina de cursos.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Supervisión OTEC", { align: AlignmentType.CENTER, bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v1.5.0", { bold: true, align: AlignmentType.CENTER }),
                  createCell("08/09/2026", { align: AlignmentType.CENTER }),
                  createCell("Sebastián Acuña"),
                  createCell("Especificación funcional del Campus Virtual LMS, autenticación con RUT y roles RBAC."),
                  createCell("Dirección Académica", { align: AlignmentType.CENTER })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v2.0.0", { bold: true, align: AlignmentType.CENTER, bgColor: COLOR_BG_LIGHT }),
                  createCell("22/09/2026", { align: AlignmentType.CENTER, bgColor: COLOR_BG_LIGHT }),
                  createCell("Sebastián Acuña", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Depuración a cursos SENCE, emisión de diplomas y confidencialidad Ley N° 19.628.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Dirección General", { align: AlignmentType.CENTER, bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v2.4.0", { bold: true, align: AlignmentType.CENTER }),
                  createCell("15/10/2026", { align: AlignmentType.CENTER }),
                  createCell("Sebastián Acuña"),
                  createCell("Seguridad pgcrypto Bcrypt 256-bit y calculadora de Franquicia SENCE (tramos UTM)."),
                  createCell("Supervisión Práctica", { align: AlignmentType.CENTER })
                ]
              }),
              new TableRow({
                children: [
                  createCell("v2.6.0", { bold: true, align: AlignmentType.CENTER, bgColor: "EFF6FF" }),
                  createCell("10/11/2026", { align: AlignmentType.CENTER, bgColor: "EFF6FF" }),
                  createCell("Sebastián Ignacio Acuña Valderrama", { bold: true, bgColor: "EFF6FF" }),
                  createCell("VERSIÓN FINAL DE PRODUCCIÓN: Catálogo oficial cerrado de 20 cursos, docentes OS-10 (Marco Gallardo Sáez e Ing. Patricio Melgarejo Araníbar), persistencia atómica process_enrollment_registration, Ficha con 8 campos obligatorios (Fecha Nacimiento y Dirección Particular), Declaración Jurada interactiva OTEC vs SPD, motor dual Gmail SMTP y Resend a cliente y prevyseg.capacitaciones@gmail.com, bloque bancario QR oficial y WhatsApp directo.", { bgColor: "EFF6FF" }),
                  createCell("Viviane Montesillo / Paola Cifuentes", { bold: true, align: AlignmentType.CENTER, bgColor: "EFF6FF" })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 1: INTRODUCCIÓN Y ALCANCE
          // ==================================================================
          createHeading1("1. Introducción, Alcance y Marco Regulatorio"),
          createParagraph("El presente documento formaliza los Requerimientos Funcionales y No Funcionales del Ecosistema PrevySeg 2026 (Versión 2.6.0 Final de Producción), desarrollado para el Organismo Técnico de Capacitación PrevySeg SpA bajo estándares internacionales de ingeniería de software (ISO/IEC/IEEE 29148:2018 e ISO/IEC 25010)."),
          createBullet("Propósito:", "Formalizar la plataforma tecnológica integral que articula el Portal Web Institucional, la Ficha Oficial de Admisión y Matrícula Atómica con pasarela bancaria asistida, el Motor Dual de Notificaciones en tiempo real y el Campus Virtual LMS multi-rol."),
          createBullet("Norma NCh 2728:2015:", "Sistema de Gestión de Calidad para OTEC en Chile, exigiendo trazabilidad curricular, control de asistencia y respaldo documental."),
          createBullet("Ley N° 21.659 y Decreto N° 867:", "Nueva Ley de Seguridad Privada, regulando la formación impartida por instructores acreditados ante Carabineros OS-10 y la Subsecretaría de Prevención del Delito (SPD)."),
          createBullet("Ley N° 19.518:", "Estatuto de Capacitación y Empleo, rigiendo la Franquicia Tributaria SENCE y los tramos impositivos en UTM."),
          createBullet("Ley N° 19.628:", "Protección de la Vida Privada, garantizando confidencialidad mediante emisión cualitativa de diplomas sin notas numéricas."),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 2: MATRIZ DE ACTORES
          // ==================================================================
          createHeading1("2. Matriz de Actores y Perfiles de Acceso (RBAC)"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("ROL / ACTOR", { isHeader: true, width: 22 }),
                  createCell("DESCRIPCIÓN Y COMPETENCIAS", { isHeader: true, width: 35 }),
                  createCell("RESPONSABILIDADES Y ACCIONES PRINCIPALES", { isHeader: true, width: 43 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Administrador OTEC (ADMIN)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Dirección Ejecutiva y Personal Administrativo de PrevySeg SpA.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Control integral del LMS, administración de participantes, reseteo de claves Bcrypt, otorgamiento de visto bueno de certificados y parametrización de cursos.", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Docente OS-10 (TEACHER)", { bold: true }),
                  createCell("Instructores acreditados ante Carabineros (Marco Gallardo / Patricio Melgarejo)."),
                  createCell("Impartición de lecciones, libro de calificaciones SPD/SENCE, publicación de guías didácticas y resolución de dudas formativas.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante (STUDENT)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Postulantes formalmente matriculados en cursos de seguridad u oficios.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Acceso al aula virtual 24/7, lecciones interactivas, descarga de material didáctico, postulación a bolsa laboral y descarga de diplomas con QR.", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Postulante / Público", { bold: true }),
                  createCell("Personas naturales interesadas en certificar competencias laborales."),
                  createCell("Llenado de Ficha de Admisión (8 datos), aceptación de Declaración Jurada, recepción de comprobante con QR bancario y contacto directo por WhatsApp.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Empresa / RRHH", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Gerencias de Personas y Contratistas Industriales de la Zona Norte.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Cotización de cursos con franquicia SENCE mediante calculadora de tramos UTM y coordinación de nóminas corporativas.", { bgColor: COLOR_BG_LIGHT })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 3: REQUERIMIENTOS FUNCIONALES DETALLADOS
          // ==================================================================
          createHeading1("3. Especificación Exhaustiva de Requerimientos Funcionales"),
          createParagraph("A continuación se presentan las 22 fichas técnicas normalizadas de los Requerimientos Funcionales (RF-01 a RF-22) que rigen el Ecosistema PrevySeg 2026:"),

          ...functionalRequirements.map((rf) => {
            return new Table({
              width: { size: 100, type: WidthType.PERCENTAGE },
              alignment: AlignmentType.CENTER,
              rows: [
                new TableRow({
                  children: [
                    createCell(`${rf.code}: ${rf.name}`, { isHeader: true, colSpan: 2, bgColor: COLOR_PRIMARY, bold: true, fontSize: 19 })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Módulo / Dominio", { bold: true, width: 28, bgColor: COLOR_BG_LIGHT }),
                    createCell(rf.module, { width: 72, bgColor: COLOR_BG_LIGHT })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Descripción Funcional", { bold: true }),
                    createCell(rf.desc)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Entradas (Inputs)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                    createCell(rf.inputs, { bgColor: COLOR_BG_LIGHT })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Procesamiento Técnico", { bold: true }),
                    createCell(rf.process)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Salidas (Outputs)", { bold: true, bgColor: COLOR_BG_LIGHT }),
                    createCell(rf.outputs, { bgColor: COLOR_BG_LIGHT })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Actor Responsable", { bold: true }),
                    createCell(rf.actor)
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Prioridad de Negocio", { bold: true, bgColor: COLOR_BG_LIGHT }),
                    createCell(rf.priority, { bold: true, textColor: rf.priority.includes("Crítica") ? COLOR_CRITICAL : COLOR_MEDIUM, bgColor: COLOR_BG_LIGHT })
                  ]
                }),
                new TableRow({
                  children: [
                    createCell("Criterio de Aceptación", { bold: true }),
                    createCell(rf.acceptance, { italic: true, bold: true, textColor: COLOR_TEXT })
                  ]
                })
              ]
            });
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 4: REQUERIMIENTOS NO FUNCIONALES
          // ==================================================================
          createHeading1("4. Requerimientos No Funcionales (RNF - ISO/IEC 25010)"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("CÓDIGO", { isHeader: true, width: 12, align: AlignmentType.CENTER }),
                  createCell("DIMENSIÓN ISO 25010", { isHeader: true, width: 25 }),
                  createCell("REQUISITO Y CRITERIO TÉCNICO", { isHeader: true, width: 43 }),
                  createCell("MÉTRICA OBJETIVO", { isHeader: true, width: 20 })
                ]
              }),
              ...nonFunctionalRequirements.map((rnf, idx) =>
                new TableRow({
                  children: [
                    createCell(rnf.code, { bold: true, align: AlignmentType.CENTER, bgColor: idx % 2 === 0 ? COLOR_BG_LIGHT : null }),
                    createCell(rnf.dim, { bold: true, bgColor: idx % 2 === 0 ? COLOR_BG_LIGHT : null }),
                    createCell(rnf.req, { bgColor: idx % 2 === 0 ? COLOR_BG_LIGHT : null }),
                    createCell(rnf.metric, { bold: true, textColor: COLOR_PRIMARY, bgColor: idx % 2 === 0 ? COLOR_BG_LIGHT : null })
                  ]
                })
              )
            ]
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 5: MATRIZ DE TRAZABILIDAD (RTM)
          // ==================================================================
          createHeading1("5. Matriz de Trazabilidad de Requerimientos (RTM)"),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("REQUERIMIENTOS", { isHeader: true, width: 22 }),
                  createCell("MÓDULO DEL SISTEMA", { isHeader: true, width: 25 }),
                  createCell("ARCHIVOS / COMPONENTES IMPLEMENTADOS", { isHeader: true, width: 33 }),
                  createCell("MÉTODO DE VERIFICACIÓN", { isHeader: true, width: 20 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-01, RF-02", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Catálogo 20 Cursos & Docentes OS-10", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/components/CoursesSection.jsx\nsrc/components/EnrollmentForm.jsx", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Auditoría visual y conmutación de escuelas", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-03, RF-04, RF-05", { bold: true }),
                  createCell("Ficha 8 Campos & Declaración Jurada"),
                  createCell("src/components/PreEnrollmentStep.jsx\nsrc/utils/validation.js"),
                  createCell("Prueba de validación de 8 datos y ticket")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-06, RF-07", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Motor Dual Email & QR Bancario", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/services/notificationService.js\nvite.config.js / api/send-enrollment-email.js", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Prueba de recepción en bandejas de entrada", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-08, RF-09", { bold: true }),
                  createCell("WhatsApp Directo & Cierre Pasarela"),
                  createCell("src/components/PreEnrollmentStep.jsx"),
                  createCell("Apertura inmediata sin bloqueo popups")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-10, RF-11, RF-12", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Persistencia Atómica & Bcrypt", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/config/supabase.js\nsupabase_setup_login.sql", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Inspección de integridad y hashes BD", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-13, RF-14", { bold: true }),
                  createCell("Calculadora SENCE & WhatsApps"),
                  createCell("src/components/SenceTramosSection.jsx"),
                  createCell("Prueba de cálculo UTM y enlaces")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-15, RF-16", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Acceso Demo & Gestión Participantes", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/components/Modals.jsx\nsrc/lms/views/ParticipantsView.jsx", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Prueba de login 1-click y reseteo de claves", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-17, RF-18", { bold: true }),
                  createCell("Campus Virtual & Aulas Interactivas"),
                  createCell("src/lms/views/PersonalAreaView.jsx\nsrc/lms/views/CourseClassroomView.jsx"),
                  createCell("Inspección de avance y visor multimedia")
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-19, RF-20, RF-21", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Certificación, Ley 19.628 & QR", { bgColor: COLOR_BG_LIGHT }),
                  createCell("src/lms/views/CertificateApprovalView.jsx"),
                  createCell("Auditoría de confidencialidad y validación QR", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("RF-22", { bold: true }),
                  createCell("Bolsa de Empleo Regional"),
                  createCell("src/lms/views/JobBoardView.jsx"),
                  createCell("Prueba de postulación laboral con RUT")
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // ==================================================================
          // SECCIÓN 6: APROBACIÓN FORMAL Y FIRMAS
          // ==================================================================
          createHeading1("6. Aprobación Formal y Validación de Entrega"),
          createParagraph("En conformidad con el Acta de Entrega y Recepción Conforme de Proyecto de Práctica Profesional suscrita en Arica, Chile, se aprueba formalmente la presente Especificación de Requerimientos de Software al 100% de cumplimiento:"),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            alignment: AlignmentType.CENTER,
            rows: [
              new TableRow({
                children: [
                  createCell("ROL / RESPONSABILIDAD", { isHeader: true, width: 34 }),
                  createCell("NOMBRE, TÍTULO E INSTITUCIÓN", { isHeader: true, width: 36 }),
                  createCell("ESTADO DE VALIDACIÓN", { isHeader: true, width: 30, align: AlignmentType.CENTER })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante en Práctica Profesional", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)\nIngeniería en Informática — IP Santo Tomás Sede Arica", { bgColor: COLOR_BG_LIGHT }),
                  createCell("ENTREGA CONFORME\nNoviembre 2026", { bold: true, textColor: "15803D", align: AlignmentType.CENTER, bgColor: "DCFCE7" })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Supervisora Centro de Práctica", { bold: true }),
                  createCell("Viviane Montesillo\nDirección General — OTEC PrevySeg SpA"),
                  createCell("RECEPCIÓN CONFORME\nNoviembre 2026", { bold: true, textColor: "15803D", align: AlignmentType.CENTER, bgColor: "DCFCE7" })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Docente Guía Santo Tomás", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Paola Andrea Cifuentes Berríos\nDocente Guía — IP Santo Tomás Sede Arica", { bgColor: COLOR_BG_LIGHT }),
                  createCell("APROBADO ACADÉMICO\nNoviembre 2026", { bold: true, textColor: "15803D", align: AlignmentType.CENTER, bgColor: "DCFCE7" })
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 200, after: 100 } }),
          createParagraph("© 2026 OTEC PrevySeg SpA • Blanco Encalada N° 666, Arica, Chile • Estándar ISO/IEC/IEEE 29148:2018.", { italic: true, size: 16, color: COLOR_MUTED, align: AlignmentType.CENTER })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Documento Word de Requerimientos generado con éxito en:', outputPath);
}

createFormalEngineeringRequirementsDoc().catch(console.error);
