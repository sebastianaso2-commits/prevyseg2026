import fs from 'fs';
import path from 'path';
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
  Header,
  Footer,
  PageNumber,
  PageBreak
} from 'docx';

const NAVY = '0F2942';       // PrevySeg Navy Corporativo
const GOLD = 'D4AF37';       // Dorado Institucional SENCE
const CYAN = '0284C7';       // Cyan Tecnológico
const TEAL = '0D9488';       // Teal PrevySeg
const LIGHT_GRAY = 'F8FAFC'; // Fondo Alterno
const BORDER_COLOR = 'CBD5E1'; // Borde Tabla
const TEXT_DARK = '1E293B';  // Texto Primario Slate
const TEXT_MUTED = '64748B'; // Texto Secundario

function createCell(text, isHeader = false, widthPercent = null, customBg = null, bold = false, align = AlignmentType.LEFT) {
  return new TableCell({
    width: widthPercent ? { size: widthPercent, type: WidthType.PERCENTAGE } : undefined,
    shading: {
      type: ShadingType.CLEAR,
      fill: customBg || (isHeader ? NAVY : 'FFFFFF')
    },
    margins: {
      top: 130,
      bottom: 130,
      left: 150,
      right: 150
    },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      bottom: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      left: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR },
      right: { style: BorderStyle.SINGLE, size: 1, color: BORDER_COLOR }
    },
    children: [
      new Paragraph({
        alignment: align,
        children: [
          new TextRun({
            text: text,
            bold: isHeader || bold,
            color: isHeader ? 'FFFFFF' : TEXT_DARK,
            font: 'Calibri',
            size: isHeader ? 20 : 18
          })
        ]
      })
    ]
  });
}

function createHeading(title) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 26,
        color: NAVY,
        font: 'Calibri'
      })
    ]
  });
}

function createSubHeading(title) {
  return new Paragraph({
    spacing: { before: 200, after: 100 },
    children: [
      new TextRun({
        text: title,
        bold: true,
        size: 20,
        color: NAVY,
        font: 'Calibri'
      })
    ]
  });
}

async function generateDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 22,
            color: TEXT_DARK
          }
        }
      }
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              bottom: 1440,
              left: 1440,
              right: 1440
            }
          }
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.RIGHT,
                children: [
                  new TextRun({
                    text: 'OTEC PrevySeg SpA | ERS-PREVYSEG-2026-V2.6-FINAL',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
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
                    text: 'Confidencial - Norma NCh 2728:2015 & SENCE - IP Santo Tomás Arica',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    text: '    Página ',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    text: ' de ',
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  }),
                  new TextRun({
                    children: [PageNumber.TOTAL_PAGES],
                    size: 16,
                    color: TEXT_MUTED,
                    font: 'Calibri'
                  })
                ]
              })
            ]
          })
        },
        children: [
          // PORTADA / ENCABEZADO
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'ORGANISMO TÉCNICO DE CAPACITACIÓN PREVYSEG SPA',
                bold: true,
                size: 28,
                color: NAVY,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
            children: [
              new TextRun({
                text: 'RUT Oficial: 76.256.947-7 • Registro SENCE N° 1238088725 • Norma NCh 2728:2015',
                bold: true,
                size: 20,
                color: GOLD,
                font: 'Calibri'
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 300 },
            children: [
              new TextRun({
                text: 'Sede Central: Blanco Encalada N° 666, 2do Piso, Arica, Chile',
                size: 18,
                color: TEXT_MUTED,
                italics: true
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'ESPECIFICACIÓN DE REQUERIMIENTOS DE SOFTWARE (SRS / ERS)',
                bold: true,
                size: 30,
                color: NAVY
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
            children: [
              new TextRun({
                text: 'Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS\nEcosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción',
                size: 22,
                color: TEXT_DARK,
                bold: true
              })
            ]
          }),

          // METADATOS TÉCNICOS Y ACADÉMICOS
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Código Documental', true, 30),
                  createCell('ERS-PREVYSEG-2026-V2.6-FINAL', false, 70, null, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estudiante en Práctica', true, 30),
                  createCell('Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)\nCarrera de Ingeniería en Informática — IP Santo Tomás Sede Arica', false, 70, LIGHT_GRAY, true)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Centro de Práctica / Mandante', true, 30),
                  createCell('OTEC PrevySeg SpA (RUT: 76.256.947-7 • SENCE N° 1238088725)', false, 70)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Supervisora del Centro', true, 30),
                  createCell('Viviane Montesillo — Dirección General OTEC PrevySeg SpA', false, 70, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Docente Guía Santo Tomás', true, 30),
                  createCell('Paola Andrea Cifuentes Berríos — Santo Tomás Sede Arica', false, 70)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estándares Aplicados', true, 30),
                  createCell('ISO/IEC/IEEE 29148:2018 / IEEE Std 830-1998 / ISO/IEC 25010 / NCh 2728:2015', false, 70, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Fecha de Emisión y Cierre', true, 30),
                  createCell('Noviembre de 2026 — Arica, Chile (Recepción Conforme)', false, 70)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Repositorio GitHub', true, 30),
                  createCell('https://github.com/Sebastianaso/PrevySeg2026 (Rama main)', false, 70, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estado de Aprobación', true, 30),
                  createCell('APROBADO 100% — AUDITADO, PROBADO Y CONFORME A ACTA DE ENTREGA', false, 70, 'DCFCE7', true)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 150 }, children: [] }),

          // SECCIÓN 1: CONTROL DE VERSIONES
          createHeading('1. Control de Versiones del Documento'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Versión', true, 12, null, true, AlignmentType.CENTER),
                  createCell('Fecha', true, 14, null, true, AlignmentType.CENTER),
                  createCell('Autor / Rol', true, 22),
                  createCell('Descripción del Cambio', true, 37),
                  createCell('Aprobador', true, 15)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v1.0.0', false, 12, LIGHT_GRAY, true, AlignmentType.CENTER),
                  createCell('01/09/2026', false, 14, LIGHT_GRAY, false, AlignmentType.CENTER),
                  createCell('Sebastián Acuña', false, 22, LIGHT_GRAY),
                  createCell('Levantamiento inicial de requerimientos para portal web y vitrina de cursos.', false, 37, LIGHT_GRAY),
                  createCell('Supervisión OTEC', false, 15, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v1.5.0', false, 12, null, true, AlignmentType.CENTER),
                  createCell('08/09/2026', false, 14, null, false, AlignmentType.CENTER),
                  createCell('Sebastián Acuña', false, 22),
                  createCell('Especificación del Campus Virtual LMS, autenticación con RUT y roles RBAC.', false, 37),
                  createCell('Dirección Académica', false, 15)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v2.0.0', false, 12, LIGHT_GRAY, true, AlignmentType.CENTER),
                  createCell('22/09/2026', false, 14, LIGHT_GRAY, false, AlignmentType.CENTER),
                  createCell('Sebastián Acuña', false, 22, LIGHT_GRAY),
                  createCell('Depuración a cursos SENCE, emisión de diplomas y confidencialidad Ley N° 19.628.', false, 37, LIGHT_GRAY),
                  createCell('Dirección General', false, 15, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v2.4.0', false, 12, null, true, AlignmentType.CENTER),
                  createCell('15/10/2026', false, 14, null, false, AlignmentType.CENTER),
                  createCell('Sebastián Acuña', false, 22),
                  createCell('Seguridad pgcrypto Bcrypt 256-bit y calculadora de Franquicia SENCE (tramos UTM).', false, 37),
                  createCell('Supervisión Práctica', false, 15)
                ]
              }),
              new TableRow({
                children: [
                  createCell('v2.6.0', false, 12, 'EFF6FF', true, AlignmentType.CENTER),
                  createCell('10/11/2026', false, 14, 'EFF6FF', false, AlignmentType.CENTER),
                  createCell('Sebastián Ignacio Acuña Valderrama', false, 22, 'EFF6FF', true),
                  createCell('VERSIÓN FINAL DE PRODUCCIÓN: Catálogo cerrado de 20 cursos, docentes OS-10 (Marco Gallardo Sáez e Ing. Patricio Melgarejo Araníbar), persistencia atómica process_enrollment_registration, Ficha con 8 campos obligatorios (Fecha Nacimiento y Dirección Particular), Declaración Jurada interactiva OTEC vs SPD, motor dual Gmail SMTP (prevysegconfirm@gmail.com) y Resend a cliente y prevyseg.capacitaciones@gmail.com, bloque bancario QR oficial y WhatsApp directo (+56 9 7869 1869).', false, 37, 'EFF6FF', true),
                  createCell('Viviane Montesillo / Paola Cifuentes', false, 15, 'EFF6FF', true)
                ]
              })
            ]
          }),

          // SECCIÓN 2: INTRODUCCIÓN Y MARCO LEGAL
          createHeading('2. Introducción, Alcance y Marco Regulatorio'),
          createSubHeading('2.1 Propósito del Sistema'),
          new Paragraph({
            spacing: { after: 150 },
            children: [
              new TextRun({
                text: 'Formalizar, delimitar y auditar cabalmente las especificaciones de ingeniería de software del Ecosistema PrevySeg 2026 (Versión 2.6.0 Final de Producción), comprendiendo el Portal Web Corporativo, la Ficha Oficial de Admisión y Pre-Inscripción Atómica, los Canales de Atención Multicanal en Tiempo Real y el Campus Virtual LMS para el Organismo Técnico de Capacitación OTEC PrevySeg SpA.'
              })
            ]
          }),

          createSubHeading('2.2 Alcance del Sistema (System Scope)'),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Catálogo Oficial Cerrado de 20 Cursos: ', bold: true }),
              new TextRun({ text: '10 programas de formación en seguridad privada regulados por la Ley N° 21.659 y Decreto N° 867 (Guardias OS-10, Perfeccionamiento, Supervisores, CCTV, Seguridad Bancaria, Eventos Masivos, Jefe de Seguridad, Entidades Obligadas, Puertos ISPS y Ciberseguridad Física), más 10 oficios industriales para la Macro Zona Norte (Maquinaria Pesada, Electricidad Industrial, Soldadura 1G a 4G, Logística de Bodegas, Asistente Contable, BPM Alimentos, Primeros Auxilios/RCP, Cuidado Adulto Mayor, Conducción Alta Montaña y Manejo RESPEL).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Cuerpo Docente Oficial OS-10: ', bold: true }),
              new TextRun({ text: 'Integración y acreditación curricular de los instructores oficiales acreditados ante Carabineros de Chile: Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Ficha de Admisión Oficial con 8 Campos Obligatorios: ', bold: true }),
              new TextRun({ text: '1. Nombre Completo, 2. RUT / Cédula con algoritmo Módulo 11 en tiempo real, 3. Fecha de Nacimiento (validación etaria), 4. Correo Electrónico (RFC 5322), 5. Teléfono / WhatsApp (+56 9 ...), 6. Dirección Particular, 7. Región de Residencia (16 regiones), 8. Ciudad / Comuna.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Declaración Jurada con Ticket Interactivo: ', bold: true }),
              new TextRun({ text: 'Fe de juramento interactiva separando claramente requisitos para matricularse en OTEC PrevySeg (Certificado de Antecedentes Especiales y Licencia Media MINEDUC) de requisitos gestionados ante la plataforma oficial de la Subsecretaría de Prevención del Delito (SPD).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Persistencia Atómica en PostgreSQL Supabase: ', bold: true }),
              new TextRun({ text: 'Procedimiento almacenado transaccional process_enrollment_registration que garantiza matrícula única por cohorte sin registros huérfanos ni duplicados.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Motor Dual de Notificaciones en Tiempo Real: ', bold: true }),
              new TextRun({ text: 'Despacho simultáneo vía Gmail SMTP con Google App Password (prevysegconfirm@gmail.com) y Resend API en paralelo (Promise.all con keepalive: true) al postulante y a prevyseg.capacitaciones@gmail.com.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Bloque Oficial de Transferencia Bancaria y QR: ', bold: true }),
              new TextRun({ text: 'Visualización y envío por correo de los datos de PREVYSEG SPA (RUT 76.256.947-7, Cuenta Corriente 1000163399 Banco Estado / Chile) junto a código QR escaneable generado dinámicamente.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Redirección Instantánea a WhatsApp Admisiones: ', bold: true }),
              new TextRun({ text: 'Apertura inmediata sin bloqueo de popups hacia la línea +56 9 7869 1869 con texto pre-llenado de los 8 datos y código único de postulación PS-XXXXXX.' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 200 },
            children: [
              new TextRun({ text: 'Deshabilitación de Pasarela Web Directa: ', bold: true }),
              new TextRun({ text: 'Priorización institucional de la transferencia asistida y confirmación humana con el equipo de admisiones.' })
            ]
          }),

          createSubHeading('2.3 Marco Normativo y Legal'),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Norma Chilena NCh 2728:2015: ', bold: true }),
              new TextRun({ text: 'Sistema de Gestión de la Calidad para Organismos Técnicos de Capacitación (OTEC).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Ley N° 21.659 y Decreto N° 867: ', bold: true }),
              new TextRun({ text: 'Nueva Ley de Seguridad Privada, fiscalizada por Carabineros OS-10 y la Subsecretaría de Prevención del Delito (SPD).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ text: 'Ley N° 19.518: ', bold: true }),
              new TextRun({ text: 'Estatuto de Capacitación y Empleo (Franquicia Tributaria SENCE).' })
            ]
          }),
          new Paragraph({
            bullet: { level: 0 },
            spacing: { after: 250 },
            children: [
              new TextRun({ text: 'Ley N° 19.628: ', bold: true }),
              new TextRun({ text: 'Protección de la Vida Privada (Confidencialidad de calificaciones numéricas en diplomas emitidos).' })
            ]
          }),

          // SECCIÓN 3: MATRIZ DE ACTORES
          createHeading('3. Matriz de Actores y Perfiles del Sistema (RBAC)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Actor / Rol', true, 25),
                  createCell('Descripción y Competencias', true, 35),
                  createCell('Responsabilidades Principales', true, 40)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Administrador OTEC (ADMIN)', false, 25, LIGHT_GRAY, true),
                  createCell('Dirección Ejecutiva y Personal Administrativo de PrevySeg SpA.', false, 35, LIGHT_GRAY),
                  createCell('Gestión integral del LMS, padrón de alumnos, reseteo de claves Bcrypt, otorgamiento de visto bueno a diplomas y parametrización de cursos.', false, 40, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Docente Instructor OS-10 (TEACHER)', false, 25, null, true),
                  createCell('Instructores acreditados ante Carabineros (Marco Gallardo Sáez / Patricio Melgarejo).', false, 35),
                  createCell('Impartición de lecciones, libro de calificaciones SPD/SENCE, publicación de guías didácticas y acompañamiento pedagógico.', false, 40)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estudiante Regular (STUDENT)', false, 25, LIGHT_GRAY, true),
                  createCell('Postulantes formalmente matriculados en cursos de seguridad u oficios.', false, 35, LIGHT_GRAY),
                  createCell('Acceso al aula virtual 24/7, visualización de clases sincrónicas, descarga de material didáctico, postulación a bolsa laboral y descarga de diplomas con QR.', false, 40, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Postulante / Público General', false, 25, null, true),
                  createCell('Personas naturales interesadas en certificar competencias en seguridad u oficios.', false, 35),
                  createCell('Llenado de Ficha de Admisión (8 datos), aceptación de Declaración Jurada, recepción de comprobante con QR bancario y contacto directo por WhatsApp.', false, 40)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Empresa Patrocinante / RRHH', false, 25, LIGHT_GRAY, true),
                  createCell('Gerencias de Recursos Humanos y Contratistas Industriales de la Zona Norte.', false, 35, LIGHT_GRAY),
                  createCell('Cotización de cursos con franquicia tributaria SENCE mediante calculadora de tramos UTM y coordinación de nóminas de trabajadores.', false, 40, LIGHT_GRAY)
                ]
              })
            ]
          }),

          // SECCIÓN 4: REQUERIMIENTOS FUNCIONALES
          createHeading('4. Matriz Detallada de Requerimientos Funcionales (RF-01 a RF-22)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Código', true, 10, null, true, AlignmentType.CENTER),
                  createCell('Módulo', true, 14),
                  createCell('Requerimiento Funcional', true, 26),
                  createCell('Descripción Técnica y Criterio de Aceptación', true, 38),
                  createCell('Prioridad', true, 12, null, true, AlignmentType.CENTER)
                ]
              }),
              ...[
                { id: 'RF-01', mod: 'Catálogo', name: 'Catálogo Cerrado de 20 Cursos Oficiales', desc: 'Despliegue de exactamente 10 programas de seguridad (Ley N° 21.659) y 10 cursos de oficios industriales con arancel, horas cronológicas y abono del 50%.', prio: 'Must Have' },
                { id: 'RF-02', mod: 'Académico', name: 'Cuerpo Docente Oficial OS-10', desc: 'Presentación curricular de los instructores acreditados ante Carabineros de Chile (Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar) vinculados a la malla.', prio: 'Must Have' },
                { id: 'RF-03', mod: 'Admisión', name: 'Ficha de Admisión de 8 Campos Obligatorios', desc: 'Captura y validación de 8 datos personales: Nombre completo, RUT, Fecha de Nacimiento, Correo, Teléfono/WhatsApp, Dirección Particular, Región (16 regiones) y Ciudad/Comuna.', prio: 'Must Have' },
                { id: 'RF-04', mod: 'Validación', name: 'Algoritmo Módulo 11 para RUT', desc: 'Validación matemática en tiempo real del dígito verificador y formateador automático dinámico a formato XX.XXX.XXX-X mientras el usuario escribe.', prio: 'Must Have' },
                { id: 'RF-05', mod: 'Normativo', name: 'Declaración Jurada con Ticket Interactivo', desc: 'Casilla obligatoria con fe de juramento que desglosa los requisitos de admisión en OTEC PrevySeg (antecedentes especiales y estudios) vs requisitos en plataforma de la SPD.', prio: 'Must Have' },
                { id: 'RF-06', mod: 'Notificaciones', name: 'Motor Dual de Correo en Tiempo Real', desc: 'Despacho simultáneo vía Gmail SMTP (prevysegconfirm@gmail.com con Google App Password) y Resend API hacia el alumno y hacia prevyseg.capacitaciones@gmail.com con Promise.all y keepalive: true.', prio: 'Must Have' },
                { id: 'RF-07', mod: 'Financiero', name: 'Boceto Oficial de Transferencia y Código QR', desc: 'Inserción en pantalla y en ambos correos de los datos bancarios oficiales de PREVYSEG SPA (RUT 76.256.947-7, Cta Cte 1000163399 Banco Estado / Chile) y código QR escaneable generado dinámicamente.', prio: 'Must Have' },
                { id: 'RF-08', mod: 'Admisión', name: 'Redirección Instantánea a WhatsApp', desc: 'Apertura inmediata y sincrónica al pulsar Enviar Información hacia la línea oficial (+56 9 7869 1869) con el texto pre-llenado de los 8 datos y sin bloqueo de popups.', prio: 'Must Have' },
                { id: 'RF-09', mod: 'Financiero', name: 'Deshabilitación de Pasarela de Pagos Web', desc: 'Desactivación de pasarela directa en línea; el sistema prioriza la transferencia bancaria asistida con respaldo y la coordinación humana por admisiones.', prio: 'Must Have' },
                { id: 'RF-10', mod: 'Persistencia', name: 'Procedimiento Atómico process_enrollment_registration', desc: 'Función PL/pgSQL con transacciones seguras que registra usuario, cohorte y matrícula en Supabase, impidiendo registros huérfanos y garantizando matrícula única por cohorte.', prio: 'Must Have' },
                { id: 'RF-11', mod: 'Seguridad', name: 'Criptografía Blowfish Bcrypt 256-bit', desc: 'Encriptación unidireccional con costo 10 usando pgcrypto en PostgreSQL para todas las credenciales de acceso. Cero almacenamiento en texto plano.', prio: 'Must Have' },
                { id: 'RF-12', mod: 'Seguridad', name: 'Procedimiento admin_create_user y change_user_password', desc: 'Funciones administrativas para enrolamiento de cuentas y reseteo/cambio seguro de claves re-hasheadas con Bcrypt en auth.users y public.users.', prio: 'Must Have' },
                { id: 'RF-13', mod: 'Comercial', name: 'Calculadora de Franquicia Tributaria SENCE', desc: 'Módulo de cálculo automático de cobertura según tramos de ingresos en UTM (100% hasta 25 UTM, 50% entre 25 y 50 UTM, 15% sobre 50 UTM y pago particular).', prio: 'Must Have' },
                { id: 'RF-14', mod: 'Comercial', name: 'Enrutamiento Multicanal de WhatsApp', desc: 'Conmutación inteligente de líneas oficiales de atención: Admisiones Generales (+56 9 7869 1869) y Coordinación Académica (+56 9 8231 2128).', prio: 'Must Have' },
                { id: 'RF-15', mod: 'Acceso', name: 'Modal de Acceso 1-Click Demo', desc: 'Interfaz modal con alternancia de visibilidad de contraseña (ojo/candado) y accesos rápidos precargados para evaluación de roles ADMIN, TEACHER y STUDENT.', prio: 'Must Have' },
                { id: 'RF-16', mod: 'LMS Admin', name: 'Gestión de Participantes y Claves', desc: 'Consola administrativa con filtros por curso, cohorte, búsqueda por RUT, exportación y modal dedicado para restablecimiento de claves encriptadas.', prio: 'Must Have' },
                { id: 'RF-17', mod: 'LMS Alumno', name: 'Área Personal y Progreso Curricular', desc: 'Dashboard del alumno con porcentaje de avance, estado de matrícula SENCE y acceso directo a lecciones.', prio: 'Must Have' },
                { id: 'RF-18', mod: 'LMS Alumno', name: 'Aula Virtual y Visor Didáctico Modular', desc: 'Entorno didáctico modular con visor de contenidos interactivos, material descargable y cuestionarios formativos.', prio: 'Must Have' },
                { id: 'RF-19', mod: 'Certificación', name: 'Visto Bueno Administrativo de Diplomas', desc: 'Módulo de fiscalización interna para auditar asistencia y evaluaciones antes de autorizar la emisión de certificados oficiales.', prio: 'Must Have' },
                { id: 'RF-20', mod: 'Certificación', name: 'Confidencialidad Ley N° 19.628', desc: 'Diplomas públicos emitidos con aprobación cualitativa (APROBADO) sin exhibir notas numéricas, protegiendo los datos personales del estudiante.', prio: 'Must Have' },
                { id: 'RF-21', mod: 'Certificación', name: 'Verificación Criptográfica QR Antifraude', desc: 'Generación de código QR en diplomas que enlaza a endpoint público de validación de autenticidad y vigencia institucional.', prio: 'Must Have' },
                { id: 'RF-22', mod: 'Empleabilidad', name: 'Bolsa de Empleo Regional Arica y Parinacota', desc: 'Vitrina de ofertas de trabajo en empresas de seguridad e industrias de la región con postulación directa del alumno con su RUT verificado.', prio: 'Should Have' }
              ].map((rf, idx) =>
                new TableRow({
                  children: [
                    createCell(rf.id, false, 10, idx % 2 === 0 ? LIGHT_GRAY : null, true, AlignmentType.CENTER),
                    createCell(rf.mod, false, 14, idx % 2 === 0 ? LIGHT_GRAY : null),
                    createCell(rf.name, false, 26, idx % 2 === 0 ? LIGHT_GRAY : null, true),
                    createCell(rf.desc, false, 38, idx % 2 === 0 ? LIGHT_GRAY : null),
                    createCell(rf.prio, false, 12, idx % 2 === 0 ? LIGHT_GRAY : null, false, AlignmentType.CENTER)
                  ]
                })
              )
            ]
          }),

          // SECCIÓN 5: REQUERIMIENTOS NO FUNCIONALES
          createHeading('5. Matriz de Requerimientos No Funcionales (RNF - ISO/IEC 25010)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Código', true, 12, null, true, AlignmentType.CENTER),
                  createCell('Dimensión ISO 25010', true, 25),
                  createCell('Requisito y Criterio de Calidad', true, 43),
                  createCell('Métrica Objetivo', true, 20)
                ]
              }),
              ...[
                { id: 'RNF-01', dim: 'Seguridad Criptográfica', req: 'Todas las contraseñas deben estar hasheadas con Blowfish Bcrypt ($2a$10$). Prohibido almacenar texto plano bajo cualquier condición.', metric: '100% claves con hash Bcrypt' },
                { id: 'RNF-02', dim: 'Integridad de Datos', req: 'Persistencia atómica de matrícula e idempotencia (ON CONFLICT) entre auth.users, auth.identities y public.users mediante RPC.', metric: '0 fallos de clave foránea' },
                { id: 'RNF-03', dim: 'Seguridad (RBAC)', req: 'Aislamiento estricto de vistas y acciones administrativas según el rol del usuario autenticado (ADMIN, TEACHER, STUDENT).', metric: '100% rutas protegidas' },
                { id: 'RNF-04', dim: 'Eficiencia de Rendimiento', req: 'Tiempo de renderizado inicial (FCP) inferior a 1.2 segundos y compilación limpia con Vite.', metric: 'FCP ≤ 1.2s • 0 errores build' },
                { id: 'RNF-05', dim: 'Disponibilidad Operacional', req: 'Disponibilidad del servicio 24/7 con un Acuerdo de Nivel de Servicio (SLA) del 99.8% mensual.', metric: 'Uptime ≥ 99.8%' },
                { id: 'RNF-06', dim: 'Usabilidad y Accesibilidad', req: 'Interfaz con contraste WCAG 2.1 Nivel AA (bg-slate-50, bg-white, text-slate-900), tipografía legible y respuesta en vivo.', metric: 'Ratio contraste ≥ 4.5:1' },
                { id: 'RNF-07', dim: 'Compatibilidad Cross-Browser', req: 'Funcionamiento garantizado en Chrome, Edge, Firefox, Safari y navegadores móviles Android/iOS.', metric: '100% navegadores estándar' },
                { id: 'RNF-08', dim: 'Mantenibilidad del Código', req: 'Arquitectura modular desacoplada en React con librerías dedicadas (supabase.js, notificationService.js, validation.js).', metric: 'Código modular sin deuda' },
                { id: 'RNF-09', dim: 'Cumplimiento SENCE', req: 'Trazabilidad y auditoría de participantes bajo la Norma Chilena NCh 2728:2015.', metric: 'Auditoría SENCE 100% OK' },
                { id: 'RNF-10', dim: 'Privacidad Legal (Ley 19.628)', req: 'Certificados emitidos con acreditación cualitativa (APROBADO) sin notas numéricas.', metric: '0% notas en certificados' },
                { id: 'RNF-11', dim: 'Tolerancia a Fallos', req: 'Captura de excepciones en tiempo de ejecución con React Error Boundaries y fallback de motor dual (Gmail SMTP ↔ Resend).', metric: '0 pantallas blancas' },
                { id: 'RNF-12', dim: 'Trazabilidad en Git', req: 'Registro histórico en Git con commits semánticos y descriptivos en español sincronizados en GitHub (Sebastianaso/PrevySeg2026).', metric: 'Trazabilidad 100% en main' }
              ].map((rnf, idx) =>
                new TableRow({
                  children: [
                    createCell(rnf.id, false, 12, idx % 2 === 0 ? LIGHT_GRAY : null, true, AlignmentType.CENTER),
                    createCell(rnf.dim, false, 25, idx % 2 === 0 ? LIGHT_GRAY : null, true),
                    createCell(rnf.req, false, 43, idx % 2 === 0 ? LIGHT_GRAY : null),
                    createCell(rnf.metric, false, 20, idx % 2 === 0 ? LIGHT_GRAY : null, true)
                  ]
                })
              )
            ]
          }),

          // SECCIÓN 6: MATRIZ DE TRAZABILIDAD (RTM)
          createHeading('6. Matriz de Trazabilidad de Requerimientos (RTM)'),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Requerimientos', true, 22),
                  createCell('Módulo / Funcionalidad', true, 25),
                  createCell('Componentes / Archivos en Repositorio', true, 30),
                  createCell('Método de Verificación', true, 23)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-01, RF-02', false, 22, LIGHT_GRAY, true),
                  createCell('Catálogo 20 Cursos & Docentes OS-10', false, 25, LIGHT_GRAY),
                  createCell('src/components/CoursesSection.jsx\nsrc/components/EnrollmentForm.jsx', false, 30, LIGHT_GRAY),
                  createCell('Auditoría de grilla, 20 temarios y docentes OS-10', false, 23, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-03, RF-04, RF-05', false, 22, null, true),
                  createCell('Ficha 8 Campos & Declaración Jurada', false, 25),
                  createCell('src/components/PreEnrollmentStep.jsx\nsrc/utils/validation.js', false, 30),
                  createCell('Prueba de validación de 8 datos y ticket de juramento', false, 23)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-06, RF-07', false, 22, LIGHT_GRAY, true),
                  createCell('Motor Dual Email & QR Bancario', false, 25, LIGHT_GRAY),
                  createCell('src/services/notificationService.js\nvite.config.js / api/send-enrollment-email.js', false, 30, LIGHT_GRAY),
                  createCell('Prueba en vivo de entrega con Gmail SMTP y Resend', false, 23, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-08, RF-09', false, 22, null, true),
                  createCell('WhatsApp Directo & Cierre Pasarela', false, 25),
                  createCell('src/components/PreEnrollmentStep.jsx', false, 30),
                  createCell('Apertura instantánea sin bloqueo de popups', false, 23)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-10, RF-11, RF-12', false, 22, LIGHT_GRAY, true),
                  createCell('Persistencia Atómica & Bcrypt', false, 25, LIGHT_GRAY),
                  createCell('src/config/supabase.js\nsupabase_setup_login.sql', false, 30, LIGHT_GRAY),
                  createCell('Inspección de transacciones ACID y hashes en BD', false, 23, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-13, RF-14', false, 22, null, true),
                  createCell('Calculadora SENCE & WhatsApps', false, 25),
                  createCell('src/components/SenceTramosSection.jsx', false, 30),
                  createCell('Verificación de tramos UTM y enlaces a ambas líneas', false, 23)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-15, RF-16', false, 22, LIGHT_GRAY, true),
                  createCell('Acceso Demo & Gestión Participantes', false, 25, LIGHT_GRAY),
                  createCell('src/components/Modals.jsx\nsrc/lms/views/ParticipantsView.jsx', false, 30, LIGHT_GRAY),
                  createCell('Prueba de login 1-click y reseteo de claves', false, 23, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-17, RF-18', false, 22, null, true),
                  createCell('Campus Virtual & Aulas Interactivas', false, 25),
                  createCell('src/lms/views/PersonalAreaView.jsx\nsrc/lms/views/CourseClassroomView.jsx', false, 30),
                  createCell('Inspección de avance curricular y visualizador didáctico', false, 23)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-19, RF-20, RF-21', false, 22, LIGHT_GRAY, true),
                  createCell('Certificación, Ley 19.628 & QR', false, 25, LIGHT_GRAY),
                  createCell('src/lms/views/CertificateApprovalView.jsx', false, 30, LIGHT_GRAY),
                  createCell('Auditoría de Visto Bueno, confidencialidad y QR', false, 23, LIGHT_GRAY)
                ]
              }),
              new TableRow({
                children: [
                  createCell('RF-22', false, 22, null, true),
                  createCell('Bolsa de Empleo Regional', false, 25),
                  createCell('src/lms/views/JobBoardView.jsx', false, 30),
                  createCell('Prueba de postulación laboral con RUT verificado', false, 23)
                ]
              })
            ]
          }),

          // SECCIÓN 7: APROBACIÓN FORMAL Y VALIDACIÓN
          createHeading('7. Aprobación Formal y Validación de Entrega'),
          new Paragraph({
            spacing: { after: 200 },
            children: [
              new TextRun({
                text: 'En conformidad con el Acta de Entrega y Recepción Conforme de Proyecto de Práctica Profesional suscrita en Arica, Chile, se aprueba formalmente la presente Especificación de Requerimientos de Software al 100% de cumplimiento:'
              })
            ]
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  createCell('Rol / Responsabilidad', true, 34),
                  createCell('Nombre, Título e Institución', true, 36),
                  createCell('Estado de Validación', true, 30, null, true, AlignmentType.CENTER)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Estudiante en Práctica Profesional', false, 34, LIGHT_GRAY, true),
                  createCell('Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)\nIngeniería en Informática — IP Santo Tomás Sede Arica', false, 36, LIGHT_GRAY),
                  createCell('ENTREGA CONFORME\nNoviembre 2026', false, 30, 'DCFCE7', true, AlignmentType.CENTER)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Supervisora Centro de Práctica', false, 34, null, true),
                  createCell('Viviane Montesillo\nDirección General — OTEC PrevySeg SpA', false, 36),
                  createCell('RECEPCIÓN CONFORME\nNoviembre 2026', false, 30, 'DCFCE7', true, AlignmentType.CENTER)
                ]
              }),
              new TableRow({
                children: [
                  createCell('Docente Guía Santo Tomás', false, 34, LIGHT_GRAY, true),
                  createCell('Paola Andrea Cifuentes Berríos\nDocente Guía — IP Santo Tomás Sede Arica', false, 36, LIGHT_GRAY),
                  createCell('APROBADO ACADÉMICO\nNoviembre 2026', false, 30, 'DCFCE7', true, AlignmentType.CENTER)
                ]
              })
            ]
          }),

          new Paragraph({ spacing: { before: 300, after: 100 } }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: '© 2026 OTEC PrevySeg SpA • Blanco Encalada N° 666, Arica, Chile • Estándar ISO/IEC/IEEE 29148:2018',
                size: 16,
                color: TEXT_MUTED,
                italics: true
              })
            ]
          })
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);

  // Asegurar directorios
  const publicDocsDir = path.resolve('public', 'docs');
  const dotDocsDir = path.resolve('.docs');
  if (!fs.existsSync(publicDocsDir)) fs.mkdirSync(publicDocsDir, { recursive: true });
  if (!fs.existsSync(dotDocsDir)) fs.mkdirSync(dotDocsDir, { recursive: true });

  const fileName = 'Especificacion_Requerimientos_PrevySeg_2026.docx';
  fs.writeFileSync(path.join(publicDocsDir, fileName), buffer);
  fs.writeFileSync(path.join(dotDocsDir, fileName), buffer);
  fs.writeFileSync(path.resolve(fileName), buffer);

  console.log('✅ Archivo DOCX generado exitosamente en:');
  console.log(` - public/docs/${fileName}`);
  console.log(` - .docs/${fileName}`);
  console.log(` - ${fileName} (Raíz del proyecto)`);
}

generateDocx().catch(err => {
  console.error('❌ Error generando DOCX:', err);
  process.exit(1);
});
