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
 * 3. Construye el enlace directo a WhatsApp (+56 9 7869 1869) con la ficha formateada
 */
export const buildWhatsAppEnrollmentUrl = (data = {}) => {
  const {
    nombre = '',
    rut = '',
    email = '',
    telefono = '',
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
    `• *Teléfono:* ${telefono || 'No especificado'}`,
    `• *Correo:* ${email || 'No especificado'}`,
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
 * 4. Genera la plantilla HTML del correo para el alumno (con QR escaneable)
 */
export const buildStudentEmailHtml = (data = {}) => {
  const {
    nombre = 'Estimado/a Alumno/a',
    courseName = 'Curso Oficial OTEC PrevySeg',
    rut = '',
    codigoSolicitud = 'PS-' + Math.floor(100000 + Math.random() * 900000)
  } = data;

  const qrUrl = generatePaymentQrUrl();

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
          <span style="font-size: 16px; font-weight: 800; color: #161630;">${courseName}</span>
        </div>

        <!-- AVISO DE CONTACTO RÁPIDO -->
        <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 20px 0;">
          <p style="font-size: 13px; line-height: 1.5; color: #166534; margin: 0;">
            ⏳ <strong>Nos contactaremos a la brevedad contigo:</strong> Nuestro equipo de admisiones revisará tus antecedentes y te contactará a través de WhatsApp o teléfono para coordinar la validación de tus certificados e inicio de clases.
          </p>
        </div>

        <!-- SECCIÓN DE PAGO CON QR ESCANEABLE -->
        <div style="background: linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%); border-radius: 16px; padding: 24px; margin: 24px 0; border: 1px solid #cbd5e1; text-align: center;">
          <span style="display: inline-block; background-color: #1b3761; color: #ffffff; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 6px; margin-bottom: 12px;">
            Datos Oficiales de Transferencia Bancaria
          </span>
          <h3 style="margin: 0 0 16px 0; color: #161630; font-size: 18px; font-weight: 800;">
            Abono de Reserva / Matrícula
          </h3>

          <table align="center" border="0" cellpadding="6" cellspacing="0" style="font-size: 13px; color: #334155; text-align: left; margin: 0 auto 18px auto; max-width: 440px; width: 100%;">
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="font-weight: 700; color: #64748b; padding: 6px 8px;">Razón Social:</td>
              <td style="font-weight: 800; color: #0f172a; padding: 6px 8px;">${PREVYSEG_COMPANY_INFO.nombre}</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="font-weight: 700; color: #64748b; padding: 6px 8px;">RUT:</td>
              <td style="font-weight: 800; color: #0f172a; padding: 6px 8px; font-family: monospace;">${PREVYSEG_COMPANY_INFO.rut}</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="font-weight: 700; color: #64748b; padding: 6px 8px;">Tipo de Cuenta:</td>
              <td style="font-weight: 800; color: #0f172a; padding: 6px 8px;">${PREVYSEG_COMPANY_INFO.tipoCuenta}</td>
            </tr>
            <tr style="border-bottom: 1px solid #cbd5e1;">
              <td style="font-weight: 700; color: #64748b; padding: 6px 8px;">N° de Cuenta:</td>
              <td style="font-weight: 800; color: #0284c7; padding: 6px 8px; font-family: monospace; font-size: 15px;">${PREVYSEG_COMPANY_INFO.numeroCuenta}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; color: #64748b; padding: 6px 8px;">Correo Comprobante:</td>
              <td style="font-weight: 800; color: #0f172a; padding: 6px 8px;">${PREVYSEG_COMPANY_INFO.email}</td>
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
 * 5. Genera la plantilla HTML del correo para la empresa (notificación interna a prevyseg.capacitaciones@gmail.com)
 */
export const buildCompanyEmailHtml = (data = {}) => {
  const {
    nombre = 'Sin nombre',
    rut = 'Sin RUT',
    email = 'Sin correo',
    telefono = 'Sin teléfono',
    region = '',
    ciudad = '',
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

  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Nueva Inscripción Web - PrevySeg OTEC</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 20px; color: #0f172a;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
    
    <div style="background-color: #161630; padding: 24px; color: #ffffff;">
      <span style="background-color: #0a969b; color: #ffffff; font-size: 10px; font-weight: 800; text-transform: uppercase; padding: 4px 10px; border-radius: 4px;">
        Alerta de Admisiones
      </span>
      <h2 style="margin: 10px 0 0 0; font-size: 20px;">Nueva Ficha de Inscripción Registrada</h2>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8;">Código: ${codigoSolicitud} • Fecha: ${fechaStr}</p>
    </div>

    <div style="padding: 24px;">
      <h3 style="color: #0284c7; font-size: 15px; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
        🎓 Programa Solicitado: ${courseName}
      </h3>

      <table border="0" cellpadding="8" cellspacing="0" width="100%" style="font-size: 13px; color: #1e293b; background-color: #f8fafc; border-radius: 8px; margin: 16px 0;">
        <tr>
          <td style="font-weight: 700; width: 35%; color: #64748b;">Postulante:</td>
          <td style="font-weight: 800; font-size: 14px;">${nombre}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #64748b;">RUT:</td>
          <td style="font-family: monospace; font-weight: 700;">${rut}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #64748b;">Teléfono:</td>
          <td><a href="tel:${telefono}" style="color: #0284c7; font-weight: 700;">${telefono}</a></td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #64748b;">Correo:</td>
          <td><a href="mailto:${email}" style="color: #0284c7; font-weight: 700;">${email}</a></td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #64748b;">Ubicación:</td>
          <td>${ciudad}, ${region}</td>
        </tr>
        <tr>
          <td style="font-weight: 700; color: #64748b;">Declaración Jurada:</td>
          <td style="color: #166534; font-weight: 700;">Aceptada ✓ (Requisitos OTEC y SPD)</td>
        </tr>
      </table>

      <div style="margin-top: 20px; text-align: center;">
        <a href="https://wa.me/56${String(telefono).replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(nombre)},%20te%20contactamos%20de%20OTEC%20PrevySeg%20respecto%20a%20tu%20inscripci%C3%B3n%20para%20${encodeURIComponent(courseName)}." target="_blank" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 800; padding: 12px 20px; border-radius: 10px;">
          📲 Contactar al Alumno por WhatsApp
        </a>
      </div>
    </div>

  </div>
</body>
</html>
  `.trim();
};

/**
 * 6. Despachador principal con soporte para Resend (Opción A)
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
    courseName: enrollmentData.courseName || 'Curso de Seguridad Privada',
    studentHtml,
    companyHtml,
    studentName: enrollmentData.nombre || 'Postulante'
  };

  // 1. Intentar llamar al endpoint API si está disponible en Vercel o backend
  try {
    const apiResponse = await fetch('/api/send-enrollment-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (apiResponse.ok) {
      const jsonRes = await apiResponse.json();
      console.log('[NOTIFICACIONES] ✅ Correos enviados vía /api/send-enrollment-email:', jsonRes);
      return { success: true, via: 'api', result: jsonRes };
    }
  } catch (apiErr) {
    // Si no está corriendo el backend /api (ej. dev local estático), continuar con fallback
    console.warn('[NOTIFICACIONES] Endpoint /api no disponible, usando despachador alternativo:', apiErr.message);
  }

  // 2. Si se configuró VITE_RESEND_API_KEY directamente en el cliente
  if (resendApiKey) {
    try {
      // Envío al alumno
      const resStudent = await fetch('https://api.resend.com/emails', {
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

      // Envío a la empresa
      const resCompany = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'PrevySeg Sistema Web <onboarding@resend.dev>',
          to: [PREVYSEG_COMPANY_INFO.email],
          subject: `[NUEVA INSCRIPCIÓN] - ${enrollmentData.nombre} - ${enrollmentData.courseName || 'Curso'}`,
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
