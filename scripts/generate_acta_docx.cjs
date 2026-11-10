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
  PageNumber
} = require('docx');

async function generateActaDocx() {
  const COLOR_PRIMARY = "0F2942";      // Azul Corporativo PrevySeg
  const COLOR_GOLD = "D4AF37";         // Dorado SENCE
  const COLOR_SKY = "0284C7";          // Cyan / Azul Tecnológico
  const COLOR_DARK = "1E293B";         // Slate Oscuro
  const COLOR_TEXT = "1E293B";         // Texto Principal
  const COLOR_MUTED = "64748B";        // Texto Secundario
  const COLOR_BORDER = "CBD5E1";       // Borde Gris Claro
  const COLOR_BG_LIGHT = "F8FAFC";     // Fondo Fila Alterna

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
      bgColor = isHeader ? COLOR_PRIMARY : null,
      textColor = isHeader ? "FFFFFF" : COLOR_TEXT,
      bold = isHeader,
      italic = false,
      align = AlignmentType.LEFT,
      fontSize = isHeader ? 18 : 17
    } = options;

    const paragraphs = Array.isArray(text) ? text : [text];

    return new TableCell({
      width: width ? { size: width, type: WidthType.PERCENTAGE } : undefined,
      shading: bgColor ? { fill: bgColor, type: ShadingType.CLEAR } : undefined,
      borders: standardBorders,
      margins: { top: 120, bottom: 120, left: 140, right: 140 },
      children: paragraphs.map(p => {
        if (p instanceof Paragraph) return p;
        return new Paragraph({
          alignment: align,
          spacing: { line: 240, after: 40 },
          children: [
            new TextRun({
              text: String(p),
              bold,
              italics: italic,
              color: textColor,
              size: fontSize,
              font: "Calibri"
            })
          ]
        });
      })
    });
  };

  const createHeading1 = (title) => new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 140 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 24,
        color: COLOR_PRIMARY,
        font: "Calibri"
      })
    ]
  });

  const createBullet = (num, title, body) => new Paragraph({
    spacing: { before: 100, after: 100, line: 260 },
    children: [
      new TextRun({
        text: `${num}. ${title}: `,
        bold: true,
        color: COLOR_PRIMARY,
        size: 19,
        font: "Calibri"
      }),
      new TextRun({
        text: body,
        color: COLOR_TEXT,
        size: 19,
        font: "Calibri"
      })
    ]
  });

  const doc = new Document({
    creator: "Sebastián Ignacio Acuña Valderrama — Santo Tomás Arica",
    title: "Acta de Entrega y Recepción Conforme de Proyecto de Práctica Profesional",
    description: "Acta de cierre conforme Ecosistema PrevySeg 2026 (v2.6.0 Final)",
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
                    text: "IP Santo Tomás Sede Arica & OTEC PrevySeg SpA | ACTA DE RECEPCIÓN CONFORME",
                    size: 15,
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
                    text: "Acta de Recepción Conforme — OTEC PrevySeg SpA & Santo Tomás",
                    size: 15,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    text: "Página ",
                    size: 15,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 15,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    text: " de ",
                    size: 15,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 15,
                    color: COLOR_MUTED,
                    font: "Calibri"
                  })
                ]
              })
            ]
          })
        },
        children: [
          // ENCABEZADO
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 80 },
            children: [
              new TextRun({
                text: "ACTA DE ENTREGA Y RECEPCIÓN CONFORME DE PROYECTO",
                bold: true,
                size: 26,
                color: COLOR_PRIMARY,
                font: "Calibri"
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: "Práctica Profesional — Ingeniería en Informática | Santo Tomás Sede Arica",
                bold: true,
                size: 20,
                color: COLOR_GOLD,
                font: "Calibri"
              })
            ]
          }),

          // DATOS GENERALES
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell("DATOS GENERALES DEL PROYECTO", { isHeader: true, colSpan: 2, bold: true, align: AlignmentType.CENTER })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Proyecto:", { bold: true, width: 32 }),
                  createCell("Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS", { width: 68 })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Versión Final:", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Ecosistema PrevySeg 2026 (Versión 2.6.0 Final de Producción)", { bgColor: COLOR_BG_LIGHT, bold: true })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Estudiante en Práctica:", { bold: true }),
                  createCell("Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Centro de Práctica:", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("OTEC PrevySeg SpA (RUT: 76.256.947-7 • SENCE N° 1238088725)", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Supervisora del Centro:", { bold: true }),
                  createCell("Viviane Montesillo — Dirección General")
                ]
              }),
              new TableRow({
                children: [
                  createCell("Docente Guía Santo Tomás:", { bold: true, bgColor: COLOR_BG_LIGHT }),
                  createCell("Paola Andrea Cifuentes Berríos", { bgColor: COLOR_BG_LIGHT })
                ]
              }),
              new TableRow({
                children: [
                  createCell("Fecha de Recepción:", { bold: true }),
                  createCell("Noviembre de 2026 — Arica, Chile")
                ]
              })
            ]
          }),

          // SECCIÓN 1: DECLARACIÓN
          createHeading1("1. DECLARACIÓN DE RECEPCIÓN Y CONFORMIDAD"),
          new Paragraph({
            spacing: { after: 180, line: 260 },
            children: [
              new TextRun({
                text: "Por medio de la presente acta, el Organismo Técnico de Capacitación PrevySeg SpA, representado por su Dirección y Supervisión de Práctica, deja constancia de haber recibido a entera satisfacción y conformidad el proyecto de software desarrollado por el estudiante Sebastián Ignacio Acuña Valderrama en el marco de su Práctica Profesional de Ingeniería en Informática. La institución declara que el software ha sido auditado, probado y puesto en funcionamiento, cumpliendo cabalmente con los objetivos fijados para el ecosistema tecnológico PrevySeg 2026.",
                font: "Calibri",
                size: 19
              })
            ]
          }),

          // SECCIÓN 2: CUMPLIMIENTOS RECIENTES
          createHeading1("2. CUMPLIMIENTO DE REQUERIMIENTOS Y SOLICITUDES DE CAMBIO"),
          new Paragraph({
            spacing: { after: 120, line: 260 },
            children: [
              new TextRun({
                text: "Se certifica que el estudiante respondió oportunamente y dio cumplimiento al 100% de los requerimientos y ajustes solicitados por la empresa durante el desarrollo, destacando:",
                font: "Calibri",
                size: 19
              })
            ]
          }),

          createBullet(1, "Catálogo Oficial Cerrado de 20 Cursos", "Configuración exacta de 10 programas de formación en seguridad privada (Ley N° 21.659) y 10 cursos de oficios industriales para la Macro Zona Norte con desglose de arancel, horas y abono del 50%."),
          createBullet(2, "Cuerpo Docente Oficial OS-10", "Regularización de la malla curricular con los instructores acreditados ante Carabineros de Chile (Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar)."),
          createBullet(3, "Ficha de Admisión Oficial con 8 Campos Obligatorios", "Captura estructurada y validación sincrónica de integridad: Nombre Completo, RUT (algoritmo Módulo 11 en tiempo real), Fecha de Nacimiento (control etario), Correo Electrónico (RFC 5322), Teléfono/WhatsApp (+56 9...), Dirección Particular (residencia actual), Región (16 regiones) y Ciudad/Comuna."),
          createBullet(4, "Declaración Jurada Formal con Ticket Interactivo", "Casilla obligatoria bajo fe de juramento que desglosa con exactitud los requisitos exigidos para matricularse en OTEC PrevySeg (Certificado de Antecedentes Especiales y Licencia Media MINEDUC) vs requisitos tramitados ante la plataforma de la Subsecretaría de Prevención del Delito (SPD)."),
          createBullet(5, "Motor Dual de Notificaciones Simultáneas en Tiempo Real", "Despacho concurrente mediante Gmail SMTP (prevysegconfirm@gmail.com con App Password) y Resend API en paralelo (Promise.all con keepalive: true), enviando copia de la ficha y comprobante bancario al postulante y a la casilla corporativa prevyseg.capacitaciones@gmail.com."),
          createBullet(6, "Boceto Oficial Idéntico de Transferencia y Código QR", "Visualización en pantalla y en ambos correos de los datos de PREVYSEG SPA (RUT 76.256.947-7, Cta Cte 1000163399 Banco Estado / Chile) junto a código QR escaneable generado dinámicamente vía API."),
          createBullet(7, "Redirección Instantánea a WhatsApp Admisiones (+56 9 7869 1869)", "Apertura sincrónica sin bloqueo de ventanas emergentes (popups) con la ficha de los 8 datos pre-llenada y código único de solicitud PS-XXXXXX."),
          createBullet(8, "Deshabilitación de Pasarela de Pagos Web Directa", "Canalización asistida exclusiva mediante transferencia bancaria y confirmación humana con el equipo de admisiones."),
          createBullet(9, "Persistencia Atómica en Base de Datos", "Implementación en Supabase PostgreSQL del procedimiento transaccional process_enrollment_registration, eliminando registros huérfanos y asegurando la regla de matrícula única por cohorte."),
          createBullet(10, "Seguridad Criptográfica Bcrypt 256-bit y Control RBAC", "Cifrado con costo 10 (pgcrypto) en contraseñas, funciones admin_create_user y change_user_password, y aislamiento estricto de roles (ADMIN, TEACHER, STUDENT, EMPRESA)."),
          createBullet(11, "Calculadora SENCE y Canales de Atención", "Integración de la calculadora de Franquicia Tributaria (tramos UTM) y enrutamiento inteligente hacia las dos líneas autorizadas de WhatsApp (+56 9 7869 1869 y +56 9 8231 2128)."),
          createBullet(12, "Transparencia Financiera y Diplomas QR", "Ficha con desglose del 50% de abono inicial, cláusula de privacidad Ley N° 19.628 (sin notas numéricas expuestas) y emisión de certificados con verificación criptográfica QR antifraude."),

          // SECCIÓN 3: CIERRE DEFINITIVO
          createHeading1("3. CIERRE DEFINITIVO DE DESARROLLO Y ENTREGA DE ACCESOS"),
          createBullet(1, "Cierre de Ciclo de Desarrollo", "Con la entrega de la versión 2.6.0 y la firma de esta acta, se da por concluida formalmente la etapa de desarrollo encomendada al estudiante en su práctica profesional."),
          createBullet(2, "Congelamiento de Alcance", "Habiéndose cumplido a satisfacción todos los requerimientos acordados, se declara el cierre técnico del sistema y no se contemplan modificaciones ni requerimientos adicionales. Cualquier nueva función o módulo futuro que la OTEC requiera quedará fuera del alcance de la presente práctica."),
          createBullet(3, "Traspaso de Credenciales", "El estudiante hace entrega formal de los accesos maestros (código fuente en GitHub, base de datos en Supabase, proyecto en Vercel y ejecutable local Windows), pasando la administración y resguardo del sistema a control de OTEC PrevySeg SpA."),

          new Paragraph({
            spacing: { before: 200, after: 300 },
            children: [
              new TextRun({
                text: "En señal de plena conformidad, aprobación del proyecto y agradecimiento por el trabajo realizado, firman los intervinientes:",
                italics: true,
                size: 18,
                font: "Calibri"
              })
            ]
          }),

          // FIRMAS
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell([
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "_________________________________________\n", color: COLOR_MUTED }),
                        new TextRun({ text: "SEBASTIÁN IGNACIO ACUÑA\nVALDERRAMA\n", bold: true, size: 18, color: COLOR_PRIMARY }),
                        new TextRun({ text: "Alumno en Práctica Profesional\n", size: 16, color: COLOR_TEXT }),
                        new TextRun({ text: "Ingeniería en Informática — Santo Tomás Arica", size: 15, color: COLOR_MUTED, italics: true })
                      ]
                    })
                  ], { width: 33, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } } }),
                  createCell([
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "_________________________________________\n", color: COLOR_MUTED }),
                        new TextRun({ text: "VIVIANE MONTESILLO\n\n", bold: true, size: 18, color: COLOR_PRIMARY }),
                        new TextRun({ text: "Supervisora de Práctica / Dirección General\n", size: 16, color: COLOR_TEXT }),
                        new TextRun({ text: "OTEC PrevySeg SpA", size: 15, color: COLOR_MUTED, italics: true })
                      ]
                    })
                  ], { width: 34, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } } }),
                  createCell([
                    new Paragraph({
                      alignment: AlignmentType.CENTER,
                      children: [
                        new TextRun({ text: "_________________________________________\n", color: COLOR_MUTED }),
                        new TextRun({ text: "PAOLA ANDREA CIFUENTES BERRÍOS\n\n", bold: true, size: 18, color: COLOR_PRIMARY }),
                        new TextRun({ text: "Docente Guía de Práctica Profesional\n", size: 16, color: COLOR_TEXT }),
                        new TextRun({ text: "IP Santo Tomás — Sede Arica", size: 15, color: COLOR_MUTED, italics: true })
                      ]
                    })
                  ], { width: 33, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } } })
                ]
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, '..', 'Acta_de_Entrega_y_Recepcion_Conforme_PrevySeg_2026.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log('✅ Documento Word del Acta generado con éxito en:', outputPath);
}

generateActaDocx().catch(console.error);
