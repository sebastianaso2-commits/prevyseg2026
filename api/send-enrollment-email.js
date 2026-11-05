/**
 * SERVERLESS API ENDPOINT (Vercel / Node)
 * /api/send-enrollment-email
 * Despacha los correos con Resend API en el servidor protegiendo la API Key.
 */

export default async function handler(req, res) {
  // Configuración de cabeceras CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const {
    studentEmail,
    companyEmail = 'prevyseg.capacitaciones@gmail.com',
    studentHtml,
    companyHtml,
    courseName = 'Curso de Capacitación',
    studentName = 'Postulante'
  } = req.body || {};

  const gmailUser = process.env.GMAIL_USER || 'prevysegconfirm@gmail.com';
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  // ==========================================
  // 1. PRIORIDAD: GMAIL SMTP DIRECTO (NODEMAILER)
  // ==========================================
  if (gmailPass && gmailPass !== 'tu_clave_de_aplicacion_aqui') {
    try {
      const nodemailerModule = await import('nodemailer');
      const nodemailer = nodemailerModule.default || nodemailerModule;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, '')
        }
      });

      const mailPromises = [];

      if (studentEmail) {
        mailPromises.push(transporter.sendMail({
          from: `"PrevySeg Capacitaciones" <${gmailUser}>`,
          to: studentEmail.trim(),
          subject: `Ficha Recibida y Datos de Pago • ${courseName}`,
          html: studentHtml
        }).then(r => ({ student: r })));
      }

      mailPromises.push(transporter.sendMail({
        from: `"PrevySeg Sistema Web" <${gmailUser}>`,
        to: companyEmail.trim(),
        subject: `[NUEVA INSCRIPCIÓN WEB] - ${studentName} - ${courseName}`,
        html: companyHtml
      }).then(r => ({ company: r })));

      const results = await Promise.all(mailPromises);
      return res.status(200).json({ success: true, provider: 'gmail', results });
    } catch (gmailErr) {
      console.error('[SERVERLESS GMAIL ERROR]:', gmailErr);
    }
  }

  // ==========================================
  // 2. ALTERNATIVA: RESEND API
  // ==========================================
  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    console.warn('[SERVERLESS RESEND] AVISO: Variable RESEND_API_KEY no definida en el servidor.');
    return res.status(200).json({
      success: true,
      simulated: true,
      message: 'Ficha registrada. Configura RESEND_API_KEY en las variables de entorno de Vercel para despacho en vivo.'
    });
  }

  try {
    const responses = {};
    let registeredOwnerEmail = 'sebastianmotox21@gmail.com';
    let fromSender = 'PrevySeg Capacitaciones <onboarding@resend.dev>';
    let fromCompanySender = 'PrevySeg Sistema Web <onboarding@resend.dev>';

    // Detectar si ya existe un dominio verificado (ej: prevyseg.cl)
    try {
      const domainsRes = await fetch('https://api.resend.com/domains', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const domainsJson = await domainsRes.json();
      const verifiedDomain = domainsJson?.data?.find(d => d.status === 'verified');
      if (verifiedDomain) {
        fromSender = `PrevySeg Capacitaciones <admision@${verifiedDomain.name}>`;
        fromCompanySender = `PrevySeg Sistema Web <admision@${verifiedDomain.name}>`;
      }
    } catch (domErr) {
      // Mantener remitente sandbox
    }

    // 1. Enviar correo al alumno con datos de pago y QR
    if (studentEmail) {
      const studentRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromSender,
          to: [studentEmail.trim()],
          subject: `Ficha Recibida y Datos de Pago • ${courseName}`,
          html: studentHtml
        })
      });
      const studentJson = await studentRes.json();
      responses.student = studentJson;

      // Si Resend bloquea por cuenta en modo sandbox sin dominio verificado
      if (studentJson?.statusCode === 403 && studentJson?.message) {
        const match = studentJson.message.match(/to your own email address \(([^)]+)\)/);
        if (match && match[1]) registeredOwnerEmail = match[1];

        const fbRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'PrevySeg Capacitaciones <onboarding@resend.dev>',
            to: [registeredOwnerEmail],
            subject: `[PRUEBA ALUMNO: ${studentEmail}] Ficha y Datos de Pago • ${courseName}`,
            html: studentHtml
          })
        });
        responses.studentFallback = await fbRes.json();
      }
    }

    // 2. Enviar correo a la empresa
    const companyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromCompanySender,
        to: [companyEmail.trim()],
        subject: `[NUEVA INSCRIPCIÓN WEB] - ${studentName} - ${courseName}`,
        html: companyHtml
      })
    });
    const companyJson = await companyRes.json();
    responses.company = companyJson;

    // Si Resend bloquea por estar en modo sandbox gratuito, enviamos copia al correo del administrador
    if (companyJson?.statusCode === 403 && registeredOwnerEmail) {
      const fbCompRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'PrevySeg Sistema Web <onboarding@resend.dev>',
          to: [registeredOwnerEmail],
          subject: `[NOTIFICACIÓN ADMISIÓN EMPRESA] - ${studentName} - ${courseName}`,
          html: companyHtml
        })
      });
      responses.companyFallback = await fbCompRes.json();
    }

    return res.status(200).json({ success: true, responses });
  } catch (error) {
    console.error('[SERVERLESS RESEND ERROR]:', error);
    return res.status(500).json({ error: error.message || 'Error al conectar con Resend' });
  }
}

