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

    // 1. Enviar correo al alumno con datos de pago y QR
    if (studentEmail) {
      const studentRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'PrevySeg Capacitaciones <onboarding@resend.dev>',
          to: [studentEmail.trim()],
          subject: `Ficha Recibida y Datos de Pago • ${courseName}`,
          html: studentHtml
        })
      });
      responses.student = await studentRes.json();
    }

    // 2. Enviar correo a la empresa
    const companyRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'PrevySeg Sistema Web <onboarding@resend.dev>',
        to: [companyEmail.trim()],
        subject: `[NUEVA INSCRIPCIÓN WEB] - ${studentName} - ${courseName}`,
        html: companyHtml
      })
    });
    responses.company = await companyRes.json();

    return res.status(200).json({ success: true, responses });
  } catch (error) {
    console.error('[SERVERLESS RESEND ERROR]:', error);
    return res.status(500).json({ error: error.message || 'Error al conectar con Resend' });
  }
}
