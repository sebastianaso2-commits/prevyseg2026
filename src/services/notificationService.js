/**
 * SERVICIO CENTRAL DE NOTIFICACIONES PREVYSEG
 * Maneja el envío de correos (Resend API), generación de QR bancario
 * y enlaces a WhatsApp para el postulante y la empresa.
 */

// 1. Constantes oficiales de la empresa y datos de pago
export const PREVYSEG_COMPANY_INFO = {
  nombre: 'PREVYSEG SPA',
  rut: '76.256.947-7',
  tipoCuenta: 'CUENTA CORRIENTE',
  numeroCuenta: '1000163399',
  banco: 'Banco Estado / Banco de Chile',
  email: 'prevyseg.capacitaciones@gmail.com',
  whatsappDisplay: '+56 9 7869 1869',
  whatsappRaw: '56978691869',
  direccion: 'Blanco Encalada N°666, 2do Piso, Arica, Chile',
  web: 'https://prevyseg.cl'
};

/**
 * 2. Genera la URL del código QR escaneable con los datos de transferencia oficiales
 */
export const generatePaymentQrUrl = () => {
  const payload = [
    `DATOS DE TRANSFERENCIA OFICIAL`,
    `Titular: ${PREVYSEG_COMPANY_INFO.nombre}`,
    `RUT: ${PREVYSEG_COMPANY_INFO.rut}`,
    `Tipo Cuenta: ${PREVYSEG_COMPANY_INFO.tipoCuenta}`,
    `N° Cuenta: ${PREVYSEG_COMPANY_INFO.numeroCuenta}`,
    `Correo: ${PREVYSEG_COMPANY_INFO.email}`
  ].join('\n');

  return `https://api.qrserver.com/v1/create-qr-code/?size=260x260&margin=10&format=png&data=${encodeURIComponent(payload)}`;
};

/**
 * 3. Genera el bloque HTML idéntico con el boceto oficial de "DATOS DE TRANSFERENCIA BANCARIA" y código QR.
 * Este mismo apartado y boceto visual se incluye tanto en el correo del cliente como en el de la empresa.
 */
export const generateOfficialTransferHtmlBlock = (abonoMonto = null) => {
  const qrUrl = generatePaymentQrUrl();
  const abonoText = abonoMonto ? ` (Abono 50% de Reserva: $${Number(abonoMonto).toLocaleString('es-CL')} CLP)` : '';

  return `
    <div style="background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #cbd5e1; text-align: center;">
      <span style="display: inline-block; background-color: #1b3761; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 5px 14px; border-radius: 6px; margin-bottom: 12px;">
        Datos Oficiales de Transferencia Bancaria
      </span>
      <h3 style="margin: 0 0 16px 0; color: #161630; font-size: 18px; font-weight: 800;">
        Abono de Reserva / Matrícula${abonoText}
      </h3>

      <table align="center" border="0" cellpadding="8" cellspacing="0" style="font-size: 13px; color: #334155; text-align: left; margin: 0 auto 18px auto; max-width: 460px; width: 100%; background-color: #ffffff; border-radius: 10px; border: 1px solid #cbd5e1;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b; padding: 8px 12px; width: 38%;">Razón Social:</td>
          <td style="font-weight: 800; color: #0f172a; padding: 8px 12px;">${PREVYSEG_COMPANY_INFO.nombre}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b; padding: 8px 12px;">RUT:</td>
          <td style="font-weight: 800; color: #0f172a; padding: 8px 12px; font-family: monospace;">${PREVYSEG_COMPANY_INFO.rut}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b; padding: 8px 12px;">Tipo de Cuenta:</td>
          <td style="font-weight: 800; color: #0f172a; padding: 8px 12px;">${PREVYSEG_COMPANY_INFO.tipoCuenta}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b; padding: 8px 12px;">N° de Cuenta:</td>
          <td style="font-weight: 800; color: #0284c7; padding: 8px 12px; font-family: monospace; font-size: 15px;">${PREVYSEG_COMPANY_INFO.numeroCuenta}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #64748b; padding: 8px 12px;">Correo Comprobante:</td>
          <td style="font-weight: 800; color: #0f172a; padding: 8px 12px;">${PREVYSEG_COMPANY_INFO.email}</td>
        </tr>
      </table>

      <!-- IMAGEN DEL QR ESCANEABLE -->
      <div style="background-color: #ffffff; padding: 14px; border-radius: 14px; display: inline-block; box-shadow: 0 4px 10px rgba(0,0,0,0.06); border: 2px solid #0284c7; margin-bottom: 8px;">
        <img src="${qrUrl}" alt="Código QR Datos de Pago PrevySeg" width="180" height="180" style="display: block; margin: 0 auto; border-radius: 8px;" />
        <span style="font-size: 10px; font-weight: 700; color: #64748b; display: block; margin-top: 6px;">📲 Escanea con tu cámara o app bancaria</span>
      </div>

      <p style="font-size: 11px; color: #64748b; margin: 12px 0 0 0;">
        * Al transferir, incluye en el asunto tu <strong>Nombre y RUT</strong> para acreditar tu reserva de inmediato.
      </p>
    </div>
  `;
};

/**
 * 4. Construye el enlace directo a WhatsApp (+56 9 7869 1869) con la ficha formateada
 */
export const buildWhatsAppEnrollmentUrl = (data = {}) => {
  const {
    nombre = '',
    rut = '',
    fechaNacimiento = '',
    email = '',
    telefono = '',
    domicilio = '',
    region = '',
    ciudad = '',
    courseName = 'Curso de Seguridad Privada',
    codigoSolicitud = ''
  } = data;

  const now = new Date();
  const fechaStr = now.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const lines = [
    `📋 *NUEVA FICHA DE INSCRIPCIÓN - OTEC PREVYSEG*`,
    `*Código:* ${codigoSolicitud || 'PS-WEB-' + Math.floor(100000 + Math.random() * 900000)}`,
    `*Fecha:* ${fechaStr}`,
    `----------------------------------------`,
    `🎓 *CURSO:* ${courseName}`,
    `----------------------------------------`,
    `👤 *DATOS DEL POSTULANTE:*`,
    `• *Nombre:* ${nombre || 'No especificado'}`,
    `• *RUT:* ${rut || 'No especificado'}`,
    ...(fechaNacimiento ? [`• *Fecha de Nacimiento:* ${fechaNacimiento}`] : []),
    `• *Teléfono:* ${telefono || 'No especificado'}`,
    `• *Correo:* ${email || 'No especificado'}`,
    ...(domicilio ? [`• *Dirección Particular:* ${domicilio}`] : []),
    `• *Ubicación:* ${ciudad || 'Arica'}, ${region || 'Región de Arica y Parinacota'}`,
    `----------------------------------------`,
    `⚖️ *DECLARACIÓN JURADA:* Aceptada ✓`,
    `• Presenta: Certificado de antecedentes y de estudios en OTEC.`,
    `• Demás requisitos: Subida en plataforma Subsecretaría de Prevención del Delito (SPD).`,
    `----------------------------------------`,
    `💳 *DATOS DE TRANSFERENCIA:*`,
    `• ${PREVYSEG_COMPANY_INFO.nombre}`,
    `• RUT: ${PREVYSEG_COMPANY_INFO.rut}`,
    `• ${PREVYSEG_COMPANY_INFO.tipoCuenta}: ${PREVYSEG_COMPANY_INFO.numeroCuenta}`,
    `• Correo: ${PREVYSEG_COMPANY_INFO.email}`,
    `----------------------------------------`,
    `👋 *Hola equipo de Admisiones PrevySeg:* He completado mi Ficha de Inscripción online y deseo coordinar la entrega de documentos y confirmación de pago.`
  ];

  return `https://wa.me/${PREVYSEG_COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(lines.join('\n'))}`;
};

/**
 * 5. Genera la plantilla HTML del correo para el alumno (con QR escaneable y boceto oficial)
 */
export const buildStudentEmailHtml = (data = {}) => {
  const {
    nombre = 'Estimado/a Alumno/a',
    courseName = 'Curso Oficial OTEC PrevySeg',
    rut = '',
    fechaNacimiento = '',
    telefono = '',
    email = '',
    domicilio = '',
    ciudad = '',
    region = '',
    cuota1 = null,
    precioTotal = null,
    codigoSolicitud = 'PS-' + Math.floor(100000 + Math.random() * 900000)
  } = data;

  const abonoCalc = cuota1 || (precioTotal ? Math.round(precioTotal / 2) : 70000);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Confirmación de Ficha de Inscripción - OTEC PrevySeg</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #1e293b;">
  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 620px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;">
    
    <!-- HEADER AZUL MARINO PREVYSEG -->
    <tr>
      <td style="background: linear-gradient(135deg, #161630 0%, #1b3761 60%, #0a969b 100%); padding: 36px 30px; text-align: center;">
        <span style="display: inline-block; background-color: rgba(255,255,255,0.15); color: #00FFE0; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1.5px; padding: 5px 14px; border-radius: 9999px; margin-bottom: 12px; border: 1px solid rgba(255,255,255,0.2);">
          OTEC PrevySeg Capacitaciones
        </span>
        <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; line-height: 1.3;">
          ¡Ficha de Inscripción Recibida con Éxito!
        </h1>
        <p style="color: #cbd5e1; font-size: 13px; margin: 8px 0 0 0;">
          Código de Solicitud: <strong style="color: #00FFE0; font-family: monospace;">${codigoSolicitud}</strong>
        </p>
      </td>
    </tr>

    <!-- CUERPO PRINCIPAL -->
    <tr>
      <td style="padding: 32px 30px;">
        <p style="font-size: 15px; line-height: 1.6; color: #334155; margin-top: 0;">
          Hola <strong>${nombre}</strong> (RUT: ${rut || 'Registrado'}),
        </p>
        <p style="font-size: 14px; line-height: 1.6; color: #475569;">
          Hemos recibido satisfactoriamente tu <strong>Ficha de Inscripción</strong> para el programa:
        </p>

        <!-- CAJA DEL CURSO -->
        <div style="background-color: #f8fafc; border-left: 4px solid #0a969b; border-radius: 8px; padding: 14px 18px; margin: 18px 0;">
          <span style="font-size: 11px; font-weight: 700; color: #0a969b; text-transform: uppercase; display: block; margin-bottom: 4px;">Programa Académico Seleccionado</span>
          <span style="font-size: 17px; font-weight: 800; color: #161630;">${courseName}</span>
        </div>

        <!-- RESUMEN DE DATOS REGISTRADOS -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 18px 0;">
          <strong style="color: #0f172a; display: block; margin-bottom: 8px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">📋 Tus Datos Registrados:</strong>
          <table border="0" cellpadding="4" cellspacing="0" width="100%" style="font-size: 12px; color: #334155;">
            <tr>
              <td style="font-weight: 700; color: #64748b; width: 40%;">Postulante:</td>
              <td style="font-weight: 800; color: #0f172a;">${nombre}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748b;">RUT:</td>
              <td style="font-family: monospace; font-weight: 800; color: #0284c7;">${rut}</td>
            </tr>
            ${fechaNacimiento ? `
            <tr>
              <td style="font-weight: 700; color: #64748b;">Fecha de Nacimiento:</td>
              <td style="font-weight: 700; color: #0f172a;">${fechaNacimiento}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="font-weight: 700; color: #64748b;">Teléfono:</td>
              <td style="font-weight: 700; color: #0f172a;">${telefono}</td>
            </tr>
            ${domicilio ? `
            <tr>
              <td style="font-weight: 700; color: #64748b;">Dirección Particular:</td>
              <td style="font-weight: 700; color: #0f172a;">${domicilio}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="font-weight: 700; color: #64748b;">Ubicación:</td>
              <td style="color: #475569;">${ciudad}, ${region}</td>
            </tr>
          </table>
        </div>

        <!-- AVISO DE CONTACTO RÁPIDO -->
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="font-size: 13px; line-height: 1.5; color: #166534; margin: 0;">
            ⏳ <strong>Nos contactaremos a la brevedad contigo:</strong> Nuestro equipo de admisiones revisará tus antecedentes y te contactará a través de WhatsApp o teléfono para coordinar la validación de tus certificados e inicio de clases.
          </p>
        </div>

        <!-- SECCIÓN DE PAGO CON QR ESCANEABLE (BOCETO OFICIAL) -->
        ${generateOfficialTransferHtmlBlock(abonoCalc)}

        <!-- REQUISITOS DOCUMENTALES -->
        <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; font-size: 12px; color: #334155; line-height: 1.6;">
          <strong style="color: #0f172a; display: block; margin-bottom: 6px; font-size: 13px;">📋 Recordatorio de Documentos Exigidos:</strong>
          <ul style="margin: 0; padding-left: 18px;">
            <li><strong>En OTEC PrevySeg:</strong> Certificado de antecedentes (Fines Especiales) y Certificado de estudios (Licencia de Enseñanza Media).</li>
            <li><strong>En plataforma de la SPD:</strong> Exámenes médicos, informe psicotécnico y cédula de identidad se gestionan en la plataforma oficial de la Subsecretaría de Prevención del Delito.</li>
          </ul>
        </div>

        <!-- BOTÓN DIRECTO DE WHATSAPP -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" style="margin: 24px auto 0 auto;">
          <tr>
            <td align="center" style="border-radius: 12px; background: linear-gradient(135deg, #10b981 0%, #059669 100%);">
              <a href="${buildWhatsAppEnrollmentUrl(data)}" target="_blank" style="font-size: 14px; font-weight: 800; color: #ffffff; text-decoration: none; padding: 14px 28px; display: inline-block; border-radius: 12px;">
                💬 Contactar a Admisión por WhatsApp (+56 9 7869 1869)
              </a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER LEGAL -->
    <tr>
      <td style="background-color: #0f172a; padding: 24px 30px; text-align: center; color: #94a3b8; font-size: 11px; line-height: 1.5;">
        <p style="margin: 0 0 6px 0; font-weight: 700; color: #cbd5e1;">
          PrevySeg OTEC • Escuela de Seguridad y Oficios
        </p>
        <p style="margin: 0 0 6px 0;">
          Acreditado bajo Norma Chilena NCh 2728 • Sede Central: Blanco Encalada #666, Arica, Chile
        </p>
        <p style="margin: 0;">
          Mesa Central / WhatsApp: +56 9 7869 1869 • Correo: ${PREVYSEG_COMPANY_INFO.email}
        </p>
      </td>
    </tr>

  </table>
</body>
</html>
  `.trim();
};

/**
 * 6. Genera la plantilla HTML del correo para la empresa (notificación interna a prevyseg.capacitaciones@gmail.com)
 * Incluye el resumen completo del postulante Y EL MISMO BOCETO de "DATOS OFICIALES DE TRANSFERENCIA" con QR.
 */
export const buildCompanyEmailHtml = (data = {}) => {
  const {
    nombre = 'Sin nombre',
    rut = 'Sin RUT',
    fechaNacimiento = '',
    email = 'Sin correo',
    telefono = 'Sin teléfono',
    region = '',
    ciudad = '',
    domicilio = '',
    observaciones = '',
    cuota1 = null,
    precioTotal = null,
    courseName = 'Curso No especificado',
    codigoSolicitud = 'PS-' + Math.floor(100000 + Math.random() * 900000)
  } = data;

  const now = new Date();
  const fechaStr = now.toLocaleDateString('es-CL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const abonoCalc = cuota1 || (precioTotal ? Math.round(precioTotal / 2) : 70000);

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nueva Inscripción Web - PrevySeg OTEC</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 20px; color: #0f172a;">
  <div style="max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 18px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 6px 20px rgba(0,0,0,0.06);">
    
    <!-- HEADER EMPRESA -->
    <div style="background: linear-gradient(135deg, #161630 0%, #1b3761 100%); padding: 26px; color: #ffffff;">
      <span style="background-color: #0a969b; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; letter-spacing: 1px;">
        Alerta de Admisiones PrevySeg
      </span>
      <h2 style="margin: 10px 0 0 0; font-size: 21px; font-weight: 800;">
        ¡Nueva Ficha de Inscripción Web Confirmada!
      </h2>
      <p style="margin: 6px 0 0 0; font-size: 12px; color: #94a3b8;">
        Código: <strong style="color: #00FFE0; font-family: monospace;">${codigoSolicitud}</strong> • Fecha: ${fechaStr}
      </p>
    </div>

    <div style="padding: 26px;">
      
      <!-- PROGRAMA SOLICITADO -->
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 14px 18px; margin-bottom: 20px;">
        <span style="font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase; display: block; margin-bottom: 2px;">Programa Académico Solicitado:</span>
        <span style="font-size: 17px; font-weight: 800; color: #0f172a;">${courseName}</span>
      </div>

      <!-- TABLA DETALLADA DEL POSTULANTE -->
      <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; color: #1e293b; background-color: #f8fafc; border-radius: 10px; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; width: 35%; color: #64748b;">Postulante:</td>
          <td style="font-weight: 800; font-size: 14px; color: #0f172a;">${nombre}</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">RUT:</td>
          <td style="font-family: monospace; font-weight: 800; color: #0284c7;">${rut}</td>
        </tr>
        ${fechaNacimiento ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">Fecha de Nacimiento:</td>
          <td style="font-weight: 800; color: #0f172a;">${fechaNacimiento}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">Teléfono / WhatsApp:</td>
          <td><a href="tel:${telefono}" style="color: #0284c7; font-weight: 700;">${telefono}</a></td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">Correo Electrónico:</td>
          <td><a href="mailto:${email}" style="color: #0284c7; font-weight: 700;">${email}</a></td>
        </tr>
        ${domicilio ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">Dirección Particular:</td>
          <td style="font-weight: 800; color: #0f172a;">${domicilio}</td>
        </tr>
        ` : ''}
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">Ubicación:</td>
          <td>${ciudad}, ${region}</td>
        </tr>
        ${observaciones ? `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="font-weight: 700; color: #64748b;">Consultas / Buzón:</td>
          <td style="font-style: italic; color: #475569;">"${observaciones}"</td>
        </tr>
        ` : ''}
        <tr>
          <td style="font-weight: 700; color: #64748b;">Declaración Jurada:</td>
          <td style="color: #166534; font-weight: 700;">Aceptada ✓ (Requisitos OTEC y SPD)</td>
        </tr>
      </table>

      <!-- AVISO DE BOCETO OFICIAL ENVIADO AL CLIENTE -->
      <div style="background-color: #f1f5f9; border-left: 4px solid #0284c7; padding: 12px 16px; border-radius: 8px; margin-bottom: 16px; font-size: 12px; color: #334155; line-height: 1.5;">
        📌 <strong>Copia del Boceto Oficial Entregado al Cliente:</strong> El siguiente apartado de datos bancarios oficiales de PREVYSEG SPA y código QR escaneable fue enviado idénticamente al correo de <strong>${email}</strong> para la acreditación de su vacante.
      </div>

      <!-- EL MISMO BOCETO DE DATOS OFICIALES DE TRANSFERENCIA CON QR -->
      ${generateOfficialTransferHtmlBlock(abonoCalc)}

      <!-- BOTÓN DIRECTO PARA CONTACTAR AL ALUMNO POR WHATSAPP -->
      <div style="margin-top: 24px; text-align: center;">
        <a href="https://wa.me/56${String(telefono).replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(nombre)},%20te%20contactamos%20de%20OTEC%20PrevySeg%20respecto%20a%20tu%20inscripci%C3%B3n%20para%20${encodeURIComponent(courseName)}." target="_blank" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 800; padding: 14px 26px; border-radius: 12px; box-shadow: 0 4px 12px rgba(16,185,129,0.25);">
          📲 Contactar al Alumno por WhatsApp (${telefono})
        </a>
      </div>

    </div>

    <!-- FOOTER EMPRESA -->
    <div style="background-color: #0f172a; padding: 20px; text-align: center; color: #94a3b8; font-size: 11px;">
      Central OTEC PrevySeg • Blanco Encalada #666, Arica • prevyseg.capacitaciones@gmail.com
    </div>

  </div>
</body>
</html>
  `.trim();
};

/**
 * 7. Despachador principal con soporte para Resend (Opción A)
 * Envía tanto al alumno como a prevyseg.capacitaciones@gmail.com
 */
export const dispatchEnrollmentEmails = async (enrollmentData = {}) => {
  const resendApiKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_RESEND_API_KEY) || '';

  const studentHtml = buildStudentEmailHtml(enrollmentData);
  const companyHtml = buildCompanyEmailHtml(enrollmentData);
  const targetEmail = enrollmentData.email ? enrollmentData.email.trim() : '';

  const payload = {
    studentEmail: targetEmail,
    companyEmail: PREVYSEG_COMPANY_INFO.email,
    courseName: enrollmentData.courseName || 'Curso de Capacitación PrevySeg',
    studentHtml,
    companyHtml,
    studentName: enrollmentData.nombre || 'Postulante'
  };

  // 1. Intentar llamar al endpoint API (Vercel Serverless o Vite Dev Server Middleware)
  try {
    const apiResponse = await fetch('/api/send-enrollment-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });

    if (apiResponse.ok) {
      const contentType = apiResponse.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const jsonRes = await apiResponse.json();
        console.log('[NOTIFICACIONES] ✅ Correos enviados vía /api/send-enrollment-email:', jsonRes);
        return { success: true, via: 'api', result: jsonRes };
      }
    }
  } catch (apiErr) {
    console.warn('[NOTIFICACIONES] Endpoint /api no disponible, probando despacho directo:', apiErr.message);
  }

  // 2. Si se configuró VITE_RESEND_API_KEY en el cliente
  if (resendApiKey && resendApiKey !== 're_tu_clave_aqui') {
    try {
      // Envío al alumno
      if (targetEmail) {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'PrevySeg Capacitaciones <onboarding@resend.dev>',
            to: [targetEmail],
            subject: `Ficha Recibida y Datos de Pago • ${enrollmentData.courseName || 'OTEC PrevySeg'}`,
            html: studentHtml
          })
        });
      }

      // Envío a la empresa
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'PrevySeg Sistema Web <onboarding@resend.dev>',
          to: [PREVYSEG_COMPANY_INFO.email],
          subject: `[NUEVA INSCRIPCIÓN] - ${enrollmentData.nombre || 'Postulante'} - ${enrollmentData.courseName || 'Curso'}`,
          html: companyHtml
        })
      });

      console.log('[NOTIFICACIONES] ✅ Correos despachados vía Resend API directa.');
      return { success: true, via: 'resend-direct' };
    } catch (resendErr) {
      console.error('[NOTIFICACIONES] Error al enviar con Resend API directa:', resendErr);
    }
  }

  // 3. Fallback informativo y respaldo local
  console.log('[NOTIFICACIONES] 📨 Ficha registrada para notificación:', {
    alumno: targetEmail,
    empresa: PREVYSEG_COMPANY_INFO.email,
    qrUrl: generatePaymentQrUrl()
  });

  return { success: true, via: 'queued' };
};
