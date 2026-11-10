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

async function generateMasterTechnicalDoc() {
  const COLOR_PRIMARY = "072B4F";      // Azul Marino Corporativo PrevySeg
  const COLOR_SECONDARY = "00A896";    // Teal / Verde Esmeralda SENCE
  const COLOR_SKY = "0284C7";          // Azul Tecnológico
  const COLOR_DARK = "0F172A";         // Slate Oscuro
  const COLOR_TEXT = "1E293B";         // Texto Principal
  const COLOR_MUTED = "475569";        // Texto Secundario
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_HEADER = "072B4F";    // Encabezado Tablas
  const COLOR_BG_LIGHT = "F8FAFC";     // Fila Alterna
  const COLOR_ACCENT = "D97706";       // Acento Ámbar

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
      fontSize = isHeader ? 18 : 17
    } = options;

    const paragraphs = Array.isArray(text) ? text : [text];

    return new TableCell({
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
      columnSpan: colSpan,
      borders: standardBorders,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: paragraphs.map(p => {
        if (p instanceof Paragraph) return p;
        return new Paragraph({
          alignment: align,
          spacing: { line: 260 },
          children: [
            new TextRun({
              text: String(p),
              bold,
              italics: italic,
              color: textColor,
              size: fontSize,
              font: "Segoe UI"
            })
          ]
        });
      })
    });
  };

  const createHeading1 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 28,
        color: COLOR_PRIMARY,
        font: "Segoe UI"
      })
    ]
  });

  const createHeading2 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 120 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24,
        color: COLOR_SKY,
        font: "Segoe UI"
      })
    ]
  });

  const createParagraph = (text, options = {}) => {
    const { bold = false, italic = false, color = COLOR_TEXT, size = 20, spaceAfter = 120 } = options;
    return new Paragraph({
      spacing: { after: spaceAfter, line: 280 },
      children: [
        new TextRun({
          text,
          bold,
          italics: italic,
          color,
          size,
          font: "Segoe UI"
        })
      ]
    });
  };

  const createBullet = (label, description) => new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 100, line: 260 },
    children: [
      new TextRun({
        text: `${label}: `,
        bold: true,
        color: COLOR_PRIMARY,
        size: 19,
        font: "Segoe UI"
      }),
      new TextRun({
        text: description,
        color: COLOR_TEXT,
        size: 19,
        font: "Segoe UI"
      })
    ]
  });

  const createCallout = (title, bodyText, borderColor = COLOR_SKY, bgColor = "F0F9FF") => new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: {
              top: { style: BorderStyle.NONE },
              bottom: { style: BorderStyle.NONE },
              right: { style: BorderStyle.NONE },
              left: { style: BorderStyle.SINGLE, size: 24, color: borderColor }
            },
            shading: { fill: bgColor, type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 200, right: 160 },
            children: [
              new Paragraph({
                spacing: { after: 60 },
                children: [
                  new TextRun({
                    text: `📌 ${title}`,
                    bold: true,
                    size: 20,
                    color: COLOR_PRIMARY,
                    font: "Segoe UI"
                  })
                ]
              }),
              new Paragraph({
                spacing: { after: 0, line: 260 },
                children: [
                  new TextRun({
                    text: bodyText,
                    color: COLOR_MUTED,
                    size: 18,
                    font: "Segoe UI"
                  })
                ]
              })
            ]
          })
        ]
      })
    ]
  });

  console.log('Construyendo documento Word de Especificación Técnica PrevySeg 2026 (v2.6.0 Final)...');

  const doc = new Document({
    creator: "Sebastián Ignacio Acuña Valderrama — Alumno en Práctica Profesional",
    title: "Documentación Técnica Maestra PrevySeg 2026 — Versión 2.6.0 Final",
    description: "Manual y especificación técnica de arquitectura, código, persistencia atómica, motor dual y vinculación a GitHub",
    sections: [
      {
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: "OTEC PrevySeg SpA | DOCUMENTACIÓN TÉCNICA MAESTRA — v2.6.0 FINAL",
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI",
                    bold: true
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
                    color: "94A3B8",
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    text: "    Página ",
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI",
                    bold: true
                  }),
                  new TextRun({
                    text: " de ",
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: "94A3B8",
                    font: "Segoe UI",
                    bold: true
                  })
                ]
              })
            ]
          })
        },
        children: [
          // PORTADA
          new Paragraph({ spacing: { before: 200, after: 100 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: "ORGANISMO TÉCNICO DE CAPACITACIÓN PREVYSEG SPA",
                size: 26,
                bold: true,
                color: COLOR_SECONDARY,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: "RUT Oficial: 76.256.947-7 • Registro SENCE N° 1238088725 • Norma NCh 2728:2015\nBlanco Encalada N° 666, 2do Piso, Arica y Parinacota, Chile",
                size: 18,
                color: COLOR_MUTED,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 150, after: 120 },
            children: [
              new TextRun({
                text: "DOCUMENTACIÓN TÉCNICA MAESTRA Y ARQUITECTURA DE SOFTWARE",
                size: 34,
                bold: true,
                color: COLOR_PRIMARY,
                font: "Segoe UI"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: "Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS\nEcosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción",
                size: 20,
                color: COLOR_MUTED,
                font: "Segoe UI",
                italics: true
              })
            ]
          }),

          // Cuadro de Vínculo a GitHub
          createCallout(
            "VINCULACIÓN OFICIAL AL REPOSITORIO GITHUB (RESPALDO DE CÓDIGO Y COMMITS)",
            "Para verificar la autenticidad, trazabilidad histórica de commits y respaldo continuo de desarrollo, consulte el repositorio oficial en GitHub:\n\n" +
            "🔗 REPOSITORIO PÚBLICO: https://github.com/Sebastianaso/PrevySeg2026\n" +
            "• Propietario / Autor: Sebastianaso (Sebastián Ignacio Acuña Valderrama)\n" +
            "• Rama Principal: main\n" +
            "• Commits Verificados: Registros cronológicos de cada avance, componentes reactivos, persistencia atómica y subsanación de demandas.",
            COLOR_SKY,
            "F0F9FF"
          ),

          new Paragraph({ spacing: { before: 240, after: 120 } }),

          // Ficha Técnica de Portada
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("PARÁMETRO INSTITUCIONAL", { isHeader: true, width: 35 }),
                  createCell("DETALLE TÉCNICO", { isHeader: true, width: 65 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Nombre del Software", { bold: true }),
                  createCell("PrevySeg 2026 — Plataforma Integral OTEC & LMS Multi-Rol")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Razón Social del Cliente", { bold: true }),
                  createCell("OTEC PrevySeg SpA (RUT: 76.256.947-7 • SENCE N° 1238088725)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante en Práctica Profesional", { bold: true }),
                  createCell("Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)\nIngeniería en Informática — IP Santo Tomás Sede Arica")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Supervisora del Centro de Práctica", { bold: true }),
                  createCell("Viviane Montesillo — Dirección General OTEC PrevySeg SpA")
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
                  createCell("Versión del Sistema", { bold: true }),
                  createCell("v2.6.0 — Versión Final de Producción (Recepción Conforme)", { bold: true, textColor: COLOR_SECONDARY })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Fecha de Emisión y Cierre", { bold: true }),
                  createCell("Noviembre de 2026 — Arica, Chile")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Cumplimiento Normativo", { bold: true }),
                  createCell("Norma NCh 2728:2015, Ley N° 21.659 (SPD/OS-10), Ley N° 19.518 (SENCE) y Ley N° 19.628")
                ]
              }),
            ]
          }),

          new Paragraph({ children: [new PageBreak()] }),

          // SECCIÓN 1: INTRODUCCIÓN Y OBJETIVOS
          createHeading1("1. Introducción y Objetivos del Proyecto"),
          createParagraph(
            "El proyecto PREVYSEG 2026 (Versión 2.6.0 Final de Producción) corresponde al diseño, construcción, aseguramiento de calidad y puesta en marcha de un ecosistema tecnológico integral para el Organismo Técnico de Capacitación (OTEC) PrevySeg SpA, ubicado en la Región de Arica y Parinacota, Chile. La institución imparte capacitaciones especializadas en dos grandes áreas: Escuela de Seguridad Privada (con cursos acreditados por Carabineros de Chile Departamento OS-10 y la Subsecretaría de Prevención del Delito - SPD bajo la Ley N° 21.659) y Escuela de Oficios Industriales y Técnicos (con franquicia tributaria SENCE y norma chilena NCh 2728:2015)."
          ),
          createParagraph(
            "Los objetivos centrales de ingeniería implementados abarcan:"
          ),
          createBullet("Catálogo Cerrado de 20 Cursos Oficiales", "10 programas de formación en seguridad privada y 10 cursos de oficios industriales adaptados a la Macro Zona Norte con desglose de horas y arancel."),
          createBullet("Cuerpo Docente Oficial OS-10", "Acreditación e integración en plataforma de los instructores oficiales Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar."),
          createBullet("Ficha de Admisión con 8 Campos Obligatorios", "Captura y validación sincrónica de Nombre, RUT (Módulo 11), Fecha de Nacimiento (control etario), Correo (RFC 5322), Teléfono, Dirección Particular, Región (16 regiones) y Ciudad/Comuna."),
          createBullet("Declaración Jurada con Ticket Interactivo", "Desglose formal entre requisitos para formalizar matrícula en OTEC PrevySeg y antecedentes gestionados ante la plataforma de la Subsecretaría de Prevención del Delito."),
          createBullet("Persistencia Atómica en PostgreSQL (Supabase)", "Procedimiento stored procedure `process_enrollment_registration` con transacciones ACID que garantiza matrícula única sin registros huérfanos."),
          createBullet("Motor Dual de Notificaciones Simultáneas", "Despacho concurrente de correos mediante Gmail SMTP (prevysegconfirm@gmail.com) y Resend API en paralelo (Promise.all con keepalive: true) al postulante y a prevyseg.capacitaciones@gmail.com."),
          createBullet("Boceto Oficial Bancario y Código QR", "Visualización en pantalla y correos de datos de PREVYSEG SPA (RUT 76.256.947-7, Cta Cte 1000163399 Banco Estado / Chile) junto a código QR dinámico."),
          createBullet("Redirección Instantánea a WhatsApp Admisiones", "Disparo sincrónico sin bloqueo de popups hacia la línea +56 9 7869 1869 con texto pre-llenado de los 8 datos y código de solicitud PS-XXXXXX."),
          createBullet("Campus Virtual LMS Multi-Rol", "Paneles personalizados para Administradores, Docentes Instructores, Estudiantes y Empresas empleadoras con bolsa laboral regional."),
          createBullet("Auditoría en Vivo y Confidencialidad Ley N° 19.628", "Libros oficiales de asistencia SENCE (marcas horarias), calificaciones SPD (60% teórico / 40% práctico), Live Logs con WebSockets y certificados cualitativos sin notas numéricas."),

          // SECCIÓN 2: ARQUITECTURA TECNOLÓGICA
          createHeading1("2. Arquitectura de Software y Stack Tecnológico"),
          createParagraph(
            "La plataforma ha sido construida bajo una arquitectura modular desacoplada basada en micro-componentes reactivos en el frontend y una capa de persistencia administrada en la nube con PostgreSQL 15:"
          ),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("CAPA / COMPONENTE", { isHeader: true, width: 25 }),
                  createCell("TECNOLOGÍA SELECCIONADA", { isHeader: true, width: 30 }),
                  createCell("JUSTIFICACIÓN TÉCNICA & VENTAJAS", { isHeader: true, width: 45 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Frontend Core", { bold: true }),
                  createCell("React 19.2 + Vite 8"),
                  createCell("Renderizado ultra-rápido, Hot Module Replacement (HMR <50ms) y arquitectura de componentes desacoplada.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estilos & UI", { bold: true }),
                  createCell("Tailwind CSS 4.3 + Vanilla CSS"),
                  createCell("Diseño responsivo corporativo, micro-animaciones fluidas, accesibilidad visual WCAG 2.1 AA.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Base de Datos Cloud", { bold: true }),
                  createCell("PostgreSQL 15 (AWS sa-east-1)"),
                  createCell("Motor relacional ACID con soporte JSONB, transacciones atómicas, funciones PL/pgSQL y RLS.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Servicios Cloud & Auth", { bold: true }),
                  createCell("Supabase BaaS + Supabase Auth"),
                  createCell("Autenticación robusta, WebSockets Realtime para Live Logs y funciones RPC con SECURITY DEFINER.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Ciberseguridad", { bold: true }),
                  createCell("Blowfish Bcrypt 256-bit (pgcrypto)"),
                  createCell("Hasheo unidireccional no reversible de credenciales con costo 10 en PostgreSQL. Cero texto plano.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Motor de Notificaciones Dual", { bold: true }),
                  createCell("Gmail SMTP + Resend API"),
                  createCell("Despacho simultáneo en tiempo real con Promise.all y keepalive: true al postulante y a prevyseg.capacitaciones@gmail.com.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Generación de Documentos", { bold: true }),
                  createCell("ExcelJS 4.4 + Docx 9.7"),
                  createCell("Exportación de planillas Gantt (.xlsx), especificaciones Word (.docx) y reportes de auditoría.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Control de Versiones", { bold: true }),
                  createCell("Git + GitHub"),
                  createCell("Trazabilidad histórica completa alojada en https://github.com/Sebastianaso/PrevySeg2026.")
                ]
              }),
            ]
          }),

          // SECCIÓN 3: ESTRUCTURA DEL CÓDIGO FUENTE
          createHeading1("3. Estructura del Código y Organización de Carpetas"),
          createParagraph(
            "El repositorio se organiza bajo una arquitectura modular limpia orientada a vistas y componentes reutilizables:"
          ),
          createBullet("src/App.jsx", "Orquestador raíz de la aplicación. Maneja el estado global de autenticación, control de sesión contra Supabase y apertura de modales."),
          createBullet("src/components/PreEnrollmentStep.jsx", "Ficha oficial de postulación y matrícula con los 8 campos obligatorios, validación de RUT Módulo 11 en vivo, ticket interactivo de Declaración Jurada, motor dual de correo y WhatsApp sincrónico."),
          createBullet("src/services/notificationService.js", "Servicio cliente/servidor para el despacho automatizado y simultáneo de correos vía Gmail SMTP y Resend API."),
          createBullet("src/components/SenceTramosSection.jsx", "Calculadora interactiva de cobertura SENCE por tramos UTM y enrutamiento inteligente multicanal de WhatsApp."),
          createBullet("src/lms/LMSLayout.jsx", "Contenedor maestro del campus virtual LMS. Renderiza el menú lateral condicional según el rol activo (Admin, Docente, Alumno, Empresa)."),
          createBullet("src/lms/views/", "Vistas especializadas del LMS: AdminGeneralView, SiteAdminView, SettingsView, ParticipantsView, CertificateApprovalView, ReportsView, QuestionBankView, ContentBankView, TeacherPortalView, PersonalAreaView, StudentLiveClassesView, CourseClassroomView, EmployerPortalView, ExtraCoursesView, JobBoardView."),
          createBullet("src/config/supabase.js", "Cliente oficial de Supabase, wrappers de autenticación por RUT, persistencia atómica process_enrollment_registration y helpers de base de datos."),

          // SECCIÓN 4: ESPECIFICACIÓN DE ROLES
          createHeading1("4. Detalle Exhaustivo de cada Rol de Usuario (RBAC)"),
          createParagraph(
            "La plataforma implementa un control de acceso basado en roles (RBAC) dinámico, derivado directamente del campo 'rol' en la tabla public.users de PostgreSQL:"
          ),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("ROL DEL SISTEMA", { isHeader: true, width: 22 }),
                  createCell("IDENTIFICADOR DB", { isHeader: true, width: 18 }),
                  createCell("PERFIL & RESPONSABILIDADES", { isHeader: true, width: 30 }),
                  createCell("VISTAS Y MÓDULOS HABILITADOS", { isHeader: true, width: 30 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Administrador OTEC", { bold: true }),
                  createCell("ADMIN"),
                  createCell("Dirección Ejecutiva y administradores OTEC. Control general del sistema, auditoría, fiscalización y aprobación de certificados."),
                  createCell("AdminGeneralView, SiteAdminView, SettingsView, ParticipantsView, CertificateApprovalView, ReportsView, QuestionBankView, ContentBankView.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Docente Instructor OS-10", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("TEACHER / DOCENTE", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Instructores acreditados ante Carabineros OS-10 (Marco Gallardo / Patricio Melgarejo). Seguimiento académico y calificaciones.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("TeacherPortalView (Libro de calificaciones 60/40, comunicados, guías pedagógicas y mensajería de alumnos).", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante Regular", { bold: true }),
                  createCell("STUDENT / ALUMNO"),
                  createCell("Alumnos formalmente matriculados en cursos de seguridad u oficios."),
                  createCell("PersonalAreaView, StudentLiveClassesView, CourseClassroomView, JobBoardView.")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Empresa Patrocinante", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("EMPRESA / EMPLOYER", { bgColor: COLOR_BG_LIGHT }),
                  createCell("Empresas empleadoras y departamentos de recursos humanos en la Macro Zona Norte.", { bgColor: COLOR_BG_LIGHT }),
                  createCell("EmployerPortalView (publicación de vacantes laborales, visualización de postulantes calificados) y calculadora SENCE.", { bgColor: COLOR_BG_LIGHT })
                ]
              })
            ]
          }),

          // SECCIÓN 5: VINCULACIÓN A GITHUB Y RESPALDO
          createHeading1("5. Vinculación al Repositorio GitHub y Evidencias de Avance"),
          createParagraph(
            "Como garantía de que el desarrollo cuenta con respaldos técnicos rigurosos, versionamiento formal y control de cambios paso a paso, el proyecto completo se encuentra alojado en GitHub en el siguiente enlace:"
          ),

          createCallout(
            "URL OFICIAL DEL REPOSITORIO GITHUB",
            "https://github.com/Sebastianaso/PrevySeg2026\n\n" +
            "Instrucciones de verificación para evaluadores e inspectores:\n" +
            "1. Acceda al enlace mediante cualquier navegador web.\n" +
            "2. En la pestaña 'Commits', podrá constatar el historial fechado de cada desarrollo, refactorización y resolución de requerimientos.\n" +
            "3. En la rama 'main' se encuentra la versión de producción actualmente desplegada.\n" +
            "4. Clonación local mediante terminal: git clone https://github.com/Sebastianaso/PrevySeg2026.git",
            COLOR_PRIMARY,
            "F8FAFC"
          ),

          new Paragraph({ spacing: { before: 300, after: 150 } }),

          // SECCIÓN 6: APROBACIÓN FORMAL Y FIRMAS
          createHeading1("6. Aprobación Formal y Validación de Entrega"),
          createParagraph("En conformidad con el Acta de Entrega y Recepción Conforme de Proyecto de Práctica Profesional suscrita en Arica, Chile, se aprueba formalmente la presente Documentación Técnica Maestra al 100% de cumplimiento:"),

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

  const outputPath = path.join(__dirname, '..', 'Documentacion_Tecnica_Maestra_PrevySeg_2026.docx');
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Documentación técnica generada exitosamente en: ${outputPath}`);
}

generateMasterTechnicalDoc().catch(console.error);
