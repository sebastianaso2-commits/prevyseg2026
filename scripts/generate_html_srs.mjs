import fs from 'fs';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Especificación de Requerimientos de Software - PrevySeg 2026 (v2.6.0 Final)</title>
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <style>
    :root {
      --primary: #0F2942;
      --gold: #D4AF37;
      --dark: #1E293B;
      --light: #F8FAFC;
      --border: #E2E8F0;
    }
    body {
      font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      color: var(--dark);
      background: #F1F5F9;
      margin: 0;
      padding: 40px 20px;
    }
    .document-container {
      max-width: 980px;
      margin: 0 auto;
      background: #FFFFFF;
      padding: 50px 60px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    }
    .header-badge {
      display: inline-block;
      background: #EFF6FF;
      color: #1D4ED8;
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 12px;
      border: 1px solid #BFDBFE;
    }
    h1 {
      color: var(--primary);
      font-size: 28px;
      margin-top: 0;
      margin-bottom: 8px;
      border-bottom: 3px solid var(--gold);
      padding-bottom: 12px;
    }
    h2 {
      color: var(--primary);
      font-size: 20px;
      margin-top: 36px;
      margin-bottom: 16px;
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
    }
    h3 {
      color: #334155;
      font-size: 16px;
      margin-top: 24px;
      margin-bottom: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
      font-size: 14px;
    }
    th, td {
      border: 1px solid var(--border);
      padding: 10px 14px;
      text-align: left;
    }
    th {
      background-color: var(--primary);
      color: #FFFFFF;
      font-weight: 600;
    }
    tr:nth-child(even) {
      background-color: var(--light);
    }
    .mermaid-box {
      background: #F8FAFC;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 20px;
      margin: 20px 0;
      display: flex;
      justify-content: center;
    }
    .btn-download {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #0F2942;
      color: #FFFFFF;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 600;
      font-size: 14px;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      margin-right: 12px;
      margin-bottom: 20px;
    }
    .btn-download:hover {
      background: #1E3A5F;
    }
    .btn-print {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #D4AF37;
      color: #0F2942;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 8px;
      font-weight: 700;
      font-size: 14px;
      cursor: pointer;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    @media print {
      body {
        background: #FFFFFF;
        padding: 0;
      }
      .document-container {
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>

  <div class="document-container">
    <div class="no-print" style="margin-bottom: 24px; display: flex; flex-wrap: wrap; gap: 12px;">
      <a href="./Especificacion_Requerimientos_PrevySeg_2026.docx" download class="btn-download">
        📄 Descargar Archivo Word (.docx)
      </a>
      <button onclick="window.print()" class="btn-print">
        🖨️ Imprimir / Guardar como PDF
      </button>
    </div>

    <div class="header-badge">CÓDIGO: ERS-PREVYSEG-2026-V2.6-FINAL • REGISTRO SENCE N° 1238088725</div>
    <h1>Especificación de Requerimientos de Software (SRS / ERS)</h1>
    <p style="font-size: 16px; color: #475569; margin-top: -4px;">
      <strong>Ecosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción</strong><br>
      OTEC PrevySeg SpA (RUT: 76.256.947-7) • Sede Central: Blanco Encalada N° 666, Arica, Chile<br>
      Estudiante: <strong>Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)</strong> — IP Santo Tomás Sede Arica
    </p>

    <h2>1. Control de Versiones del Documento</h2>
    <table>
      <thead>
        <tr>
          <th>Versión</th>
          <th>Fecha</th>
          <th>Autor / Rol</th>
          <th>Descripción del Cambio</th>
          <th>Aprobador</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>v1.0.0</strong></td>
          <td>01/09/2026</td>
          <td>Sebastián Acuña</td>
          <td>Levantamiento inicial de requerimientos para portal web y vitrina de cursos.</td>
          <td>Supervisión OTEC</td>
        </tr>
        <tr>
          <td><strong>v1.5.0</strong></td>
          <td>08/09/2026</td>
          <td>Sebastián Acuña</td>
          <td>Especificación del Campus Virtual LMS, autenticación con RUT y roles RBAC.</td>
          <td>Dirección Académica</td>
        </tr>
        <tr>
          <td><strong>v2.0.0</strong></td>
          <td>22/09/2026</td>
          <td>Sebastián Acuña</td>
          <td>Depuración a cursos SENCE, emisión de diplomas y confidencialidad Ley 19.628.</td>
          <td>Dirección General</td>
        </tr>
        <tr>
          <td><strong>v2.4.0</strong></td>
          <td>15/10/2026</td>
          <td>Sebastián Acuña</td>
          <td>Seguridad pgcrypto Bcrypt 256-bit y calculadora de Franquicia SENCE (tramos UTM).</td>
          <td>Supervisión Práctica</td>
        </tr>
        <tr style="background-color: #EFF6FF;">
          <td><strong>v2.6.0</strong></td>
          <td>10/11/2026</td>
          <td>Sebastián Ignacio Acuña Valderrama</td>
          <td><strong>VERSIÓN FINAL DE PRODUCCIÓN:</strong> Catálogo oficial cerrado de 20 cursos, docentes OS-10 (Marco Gallardo Sáez e Ing. Patricio Melgarejo Araníbar), persistencia atómica process_enrollment_registration, Ficha con 8 campos obligatorios (Fecha Nacimiento y Dirección Particular), Declaración Jurada interactiva OTEC vs SPD, motor dual Gmail SMTP y Resend a cliente y prevyseg.capacitaciones@gmail.com, bloque bancario QR oficial y WhatsApp directo.</td>
          <td>Viviane Montesillo / Paola Cifuentes</td>
        </tr>
      </tbody>
    </table>

    <h2>2. Diagramas de Arquitectura y Procesos</h2>
    
    <h3>2.1 Flujo de Admisión, Persistencia Atómica y Motor Dual de Notificaciones</h3>
    <div class="mermaid-box">
      <div class="mermaid">
flowchart TD
    P[Postulante / Alumno] -->|1. Completa 8 Campos Obligatorios| F[Ficha Digital de Admisión]
    F -->|2. Validación Matemática| V1[Módulo 11 RUT + RFC 5322 Email + Control Etario]
    F -->|3. Acepta Términos| DJ[Declaración Jurada Interactiva: OTEC vs SPD]
    F -->|4. Pulsa 'Enviar Información'| WAPOP[Apertura Instantánea WhatsApp Admisiones: +56 9 7869 1869]
    F -->|5. Proceso Concurrente| DUAL[Motor Dual de Correo en Paralelo]
    DUAL -->|Gmail SMTP| C1[prevysegconfirm@gmail.com con App Password]
    DUAL -->|Resend API| C2[Resend SDK con keepalive: true]
    C1 & C2 -->|Envío Simultáneo| RCPT1[Bandeja Postulante]
    C1 & C2 -->|Copia Oficial| RCPT2[prevyseg.capacitaciones@gmail.com]
    F -->|6. Persistencia Atómica| RPC[PostgreSQL: process_enrollment_registration]
    RPC -->|Hash Bcrypt 256-bit| PGC[pgcrypto: crypt]
    PGC -->|Matrícula Única y Segura| DB[(Supabase Cloud Database)]
      </div>
    </div>

    <h3>2.2 Diagrama de Ciclo de Vida del Estudiante y Certificación (Ley N° 19.628)</h3>
    <div class="mermaid-box">
      <div class="mermaid">
stateDiagram-v2
    [*] --> Postulante_Inscrito: Ficha 8 Campos + Declaración Jurada + Abono 50%
    Postulante_Inscrito --> En_Revision_Documental: Recepción en WhatsApp (+56 9 7869 1869)
    En_Revision_Documental --> Matriculado_Oficial: Validación Antecedentes Especiales + Licencia Media
    Matriculado_Oficial --> En_Formacion_LMS: Clases Sincrónicas con Docentes OS-10 + Aula Virtual
    En_Formacion_LMS --> Evaluacion_Completada: Asistencia ≥ 75% + Exámenes Formativos
    Evaluacion_Completada --> Visto_Bueno_Admin: Auditoría Administrativa PrevySeg
    Visto_Bueno_Admin --> Diploma_Emitido: Diploma Digital con QR Antifraude (Sin Notas Numéricas)
    Diploma_Emitido --> [*]
      </div>
    </div>

    <h2>3. Matriz Exhaustiva de Requerimientos Funcionales (RF-01 a RF-22)</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Módulo</th>
          <th>Requerimiento Funcional</th>
          <th>Descripción Técnica y Criterio de Aceptación</th>
          <th>Prioridad</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>RF-01</strong></td><td>Catálogo</td><td><strong>Catálogo Cerrado de 20 Cursos Oficiales</strong></td><td>Despliegue de exactamente 10 programas de seguridad (Ley N° 21.659) y 10 cursos de oficios industriales con arancel, horas y abono del 50%.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-02</strong></td><td>Académico</td><td><strong>Cuerpo Docente Oficial OS-10</strong></td><td>Presentación curricular de los instructores acreditados ante Carabineros de Chile (Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-03</strong></td><td>Admisión</td><td><strong>Ficha de Admisión de 8 Campos Obligatorios</strong></td><td>Captura y validación de 8 datos personales: Nombre completo, RUT, Fecha de Nacimiento, Correo, Teléfono/WhatsApp, Dirección Particular, Región (16 regiones) y Ciudad/Comuna.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-04</strong></td><td>Validación</td><td><strong>Algoritmo Módulo 11 para RUT</strong></td><td>Validación matemática en tiempo real del dígito verificador y formateador automático dinámico a formato XX.XXX.XXX-X.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-05</strong></td><td>Normativo</td><td><strong>Declaración Jurada con Ticket Interactivo</strong></td><td>Casilla obligatoria con fe de juramento que desglosa los requisitos de admisión en OTEC PrevySeg vs requisitos en plataforma de la SPD.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-06</strong></td><td>Notificaciones</td><td><strong>Motor Dual de Correo en Tiempo Real</strong></td><td>Despacho simultáneo vía Gmail SMTP (prevysegconfirm@gmail.com) y Resend API hacia el alumno y hacia prevyseg.capacitaciones@gmail.com con Promise.all y keepalive: true.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-07</strong></td><td>Financiero</td><td><strong>Boceto Oficial de Transferencia y Código QR</strong></td><td>Inserción en pantalla y en ambos correos de los datos bancarios oficiales de PREVYSEG SPA (RUT 76.256.947-7, Cta Cte 1000163399 Banco Estado / Chile) y código QR escaneable generado dinámicamente.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-08</strong></td><td>Admisión</td><td><strong>Redirección Instantánea a WhatsApp</strong></td><td>Apertura inmediata y sincrónica al pulsar Enviar Información hacia la línea oficial (+56 9 7869 1869) con el texto pre-llenado de los 8 datos y sin bloqueo de popups.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-09</strong></td><td>Financiero</td><td><strong>Deshabilitación de Pasarela de Pagos Web</strong></td><td>Desactivación de pasarela directa en línea; el sistema prioriza la transferencia bancaria con respaldo y la coordinación humana asistida por admisiones.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-10</strong></td><td>Persistencia</td><td><strong>Procedimiento Atómico process_enrollment_registration</strong></td><td>Función PL/pgSQL con transacciones seguras que registra usuario, cohorte y matrícula en Supabase, impidiendo registros huérfanos y garantizando matrícula única por cohorte.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-11</strong></td><td>Seguridad</td><td><strong>Criptografía Blowfish Bcrypt 256-bit</strong></td><td>Encriptación unidireccional con costo 10 usando pgcrypto en PostgreSQL para todas las credenciales de acceso. Cero almacenamiento en texto plano.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-12</strong></td><td>Seguridad</td><td><strong>Procedimiento admin_create_user y change_user_password</strong></td><td>Funciones administrativas para enrolamiento de cuentas y reseteo/cambio seguro de claves re-hasheadas con Bcrypt en auth.users y public.users.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-13</strong></td><td>Comercial</td><td><strong>Calculadora de Franquicia Tributaria SENCE</strong></td><td>Módulo de cálculo automático de cobertura según tramos de ingresos en UTM (100% hasta 25 UTM, 50% entre 25 y 50 UTM, 15% sobre 50 UTM y pago particular).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-14</strong></td><td>Comercial</td><td><strong>Enrutamiento Multicanal de WhatsApp</strong></td><td>Conmutación inteligente de líneas oficiales de atención: Admisiones Generales (+56 9 7869 1869) y Coordinación Académica (+56 9 8231 2128).</td><td>Must Have</td></tr>
        <tr><td><strong>RF-15</strong></td><td>Acceso</td><td><strong>Modal de Acceso 1-Click Demo</strong></td><td>Interfaz modal con alternancia de visibilidad de contraseña (ojo/candado) y accesos rápidos precargados para evaluación de roles ADMIN, TEACHER y STUDENT.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-16</strong></td><td>LMS Admin</td><td><strong>Gestión de Participantes y Claves</strong></td><td>Consola administrativa con filtros por curso, cohorte, búsqueda por RUT, exportación y modal dedicado para restablecimiento de claves encriptadas.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-17</strong></td><td>LMS Alumno</td><td><strong>Área Personal y Progreso Curricular</strong></td><td>Dashboard del alumno con porcentaje de avance, estado de matrícula SENCE y acceso directo a lecciones.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-18</strong></td><td>LMS Alumno</td><td><strong>Aula Virtual y Visor Didáctico Modular</strong></td><td>Entorno didáctico modular con visor de contenidos interactivos, material descargable y cuestionarios formativos.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-19</strong></td><td>Certificación</td><td><strong>Visto Bueno Administrativo de Diplomas</strong></td><td>Módulo de fiscalización interna para auditar asistencia y evaluaciones antes de autorizar la emisión de certificados oficiales.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-20</strong></td><td>Certificación</td><td><strong>Confidencialidad Ley N° 19.628</strong></td><td>Diplomas públicos emitidos con aprobación cualitativa (APROBADO) sin exhibir notas numéricas, protegiendo los datos personales del estudiante.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-21</strong></td><td>Certificación</td><td><strong>Verificación Criptográfica QR Antifraude</strong></td><td>Generación de código QR en diplomas que enlaza a endpoint público de validación de autenticidad y vigencia institucional.</td><td>Must Have</td></tr>
        <tr><td><strong>RF-22</strong></td><td>Empleabilidad</td><td><strong>Bolsa de Empleo Regional Arica y Parinacota</strong></td><td>Vitrina de ofertas de trabajo en empresas de seguridad e industrias de la región con postulación directa del alumno con su RUT verificado.</td><td>Should Have</td></tr>
      </tbody>
    </table>

    <h2>4. Matriz de Requerimientos No Funcionales (RNF - ISO/IEC 25010)</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Dimensión ISO 25010</th>
          <th>Requisito y Criterio de Calidad</th>
          <th>Métrica Objetivo</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><strong>RNF-01</strong></td><td>Seguridad Criptográfica</td><td>Hasheo Blowfish Bcrypt ($2a$10$) para 100% de contraseñas. Prohibido texto plano.</td><td>100% hashes Bcrypt</td></tr>
        <tr><td><strong>RNF-02</strong></td><td>Integridad de Datos</td><td>Persistencia atómica de matrícula e idempotencia (ON CONFLICT) entre auth y public users.</td><td>0 errores de clave</td></tr>
        <tr><td><strong>RNF-03</strong></td><td>Seguridad (RBAC)</td><td>Aislamiento estricto de vistas y funciones según rol (ADMIN, TEACHER, STUDENT).</td><td>100% rutas protegidas</td></tr>
        <tr><td><strong>RNF-04</strong></td><td>Rendimiento</td><td>Tiempo de renderizado inicial (FCP) inferior a 1.2s y compilación limpia con Vite.</td><td>FCP ≤ 1.2s</td></tr>
        <tr><td><strong>RNF-05</strong></td><td>Disponibilidad</td><td>Disponibilidad del servicio 24/7 con SLA del 99.8% mensual.</td><td>Uptime ≥ 99.8%</td></tr>
        <tr><td><strong>RNF-06</strong></td><td>Usabilidad / Accesibilidad</td><td>Contraste WCAG 2.1 AA (bg-slate-50, text-slate-900) y tipografía legible.</td><td>Ratio ≥ 4.5:1</td></tr>
        <tr><td><strong>RNF-07</strong></td><td>Compatibilidad</td><td>Funcionamiento garantizado en Chrome, Edge, Firefox, Safari y móviles.</td><td>100% estándar</td></tr>
        <tr><td><strong>RNF-08</strong></td><td>Mantenibilidad</td><td>Código modular desacoplado en React (supabase.js, notificationService.js, validation.js).</td><td>Modular sin deuda</td></tr>
        <tr><td><strong>RNF-09</strong></td><td>Cumplimiento SENCE</td><td>Trazabilidad de participantes bajo Norma Chilena NCh 2728:2015.</td><td>Auditoría 100% OK</td></tr>
        <tr><td><strong>RNF-10</strong></td><td>Privacidad (Ley 19.628)</td><td>Certificados con acreditación cualitativa ("APROBADO") sin notas numéricas.</td><td>0% notas expuestas</td></tr>
        <tr><td><strong>RNF-11</strong></td><td>Tolerancia a Fallos</td><td>Captura de errores con React Error Boundaries y motor dual (Gmail SMTP ↔ Resend).</td><td>0 pantallas blancas</td></tr>
        <tr><td><strong>RNF-12</strong></td><td>Trazabilidad Git</td><td>Commits semánticos y descriptivos en español sincronizados en GitHub (Sebastianaso/PrevySeg2026).</td><td>100% en main</td></tr>
      </tbody>
    </table>

    <h2>5. Aprobación Formal y Validación de Entrega</h2>
    <table>
      <thead>
        <tr>
          <th>Rol / Responsabilidad</th>
          <th>Nombre, Título e Institución</th>
          <th>Estado y Validación</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Estudiante en Práctica Profesional</strong></td>
          <td>Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5)<br>Ingeniería en Informática — IP Santo Tomás Sede Arica</td>
          <td style="color: #16A34A; font-weight: bold;">ENTREGA CONFORME<br>Noviembre 2026</td>
        </tr>
        <tr>
          <td><strong>Supervisora Centro de Práctica</strong></td>
          <td>Viviane Montesillo<br>Dirección General — OTEC PrevySeg SpA</td>
          <td style="color: #16A34A; font-weight: bold;">RECEPCIÓN CONFORME<br>Noviembre 2026</td>
        </tr>
        <tr>
          <td><strong>Docente Guía Santo Tomás</strong></td>
          <td>Paola Andrea Cifuentes Berríos<br>Docente Guía — IP Santo Tomás Sede Arica</td>
          <td style="color: #16A34A; font-weight: bold;">APROBADO ACADÉMICO<br>Noviembre 2026</td>
        </tr>
      </tbody>
    </table>
  </div>

  <script>
    mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
  </script>
</body>
</html>`;

const publicDocsDir = path.resolve('public', 'docs');
fs.writeFileSync(path.join(publicDocsDir, 'Especificacion_Requerimientos_PrevySeg_2026.html'), htmlContent);
console.log('✅ Versión HTML imprimible generada en public/docs/Especificacion_Requerimientos_PrevySeg_2026.html');
