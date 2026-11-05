import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'local-api-send-enrollment-email',
        configureServer(server) {
          server.middlewares.use('/api/send-enrollment-email', async (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => { body += chunk; });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const gmailUser = env.GMAIL_USER || process.env.GMAIL_USER || 'prevysegconfirm@gmail.com';
                  const gmailPass = env.GMAIL_APP_PASSWORD || process.env.GMAIL_APP_PASSWORD;

                  // ==========================================
                  // 1. PRIORIDAD: GMAIL SMTP DIRECTO (NODEMAILER)
                  // No requiere dominios propios, 100% gratuito
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

                      // Enviar correo al alumno dinámico
                      if (data.studentEmail) {
                        mailPromises.push(transporter.sendMail({
                          from: `"PrevySeg Capacitaciones" <${gmailUser}>`,
                          to: data.studentEmail.trim(),
                          subject: `Ficha Recibida y Datos de Pago • ${data.courseName || 'OTEC PrevySeg'}`,
                          html: data.studentHtml
                        }).then(r => ({ student: r })));
                      }

                      // Enviar correo de respaldo a la empresa
                      mailPromises.push(transporter.sendMail({
                        from: `"PrevySeg Sistema Web" <${gmailUser}>`,
                        to: data.companyEmail || 'prevyseg.capacitaciones@gmail.com',
                        subject: `[NUEVA INSCRIPCIÓN WEB] - ${data.studentName || 'Postulante'} - ${data.courseName || 'Curso'}`,
                        html: data.companyHtml
                      }).then(r => ({ company: r })));

                      const results = await Promise.all(mailPromises);
                      console.log('[NOTIFICACIONES] ✅ Correos enviados en simultáneo vía Gmail SMTP:', results);

                      res.statusCode = 200;
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify({ success: true, provider: 'gmail', results }));
                      return;
                    } catch (gmailErr) {
                      console.error('[NOTIFICACIONES GMAIL ERROR]:', gmailErr);
                    }
                  }

                  // ==========================================
                  // 2. ALTERNATIVA: RESEND API
                  // ==========================================
                  const apiKey = env.RESEND_API_KEY || env.VITE_RESEND_API_KEY || process.env.RESEND_API_KEY;

                  if (!apiKey || apiKey === 're_tu_clave_aqui') {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({
                      success: true,
                      simulated: true,
                      message: 'Ficha registrada localmente. Configura tu API Key de Resend en .env para envio real en vivo.'
                    }));
                    return;
                  }

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

                  // 1. Enviar correo al alumno
                  if (data.studentEmail) {
                    const studentRes = await fetch('https://api.resend.com/emails', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        from: fromSender,
                        to: [data.studentEmail.trim()],
                        subject: `Ficha Recibida y Datos de Pago • ${data.courseName || 'OTEC PrevySeg'}`,
                        html: data.studentHtml
                      })
                    });
                    const studentJson = await studentRes.json();
                    responses.student = studentJson;

                    // Si Resend bloquea por estar en modo sandbox gratuito, detectamos el correo del dueño
                    if (studentJson?.statusCode === 403 && studentJson?.message) {
                      const match = studentJson.message.match(/to your own email address \(([^)]+)\)/);
                      if (match && match[1]) registeredOwnerEmail = match[1];

                      // Reenviar copia de prueba al correo registrado en Resend
                      const fbRes = await fetch('https://api.resend.com/emails', {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${apiKey}`,
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                          from: 'PrevySeg Capacitaciones <onboarding@resend.dev>',
                          to: [registeredOwnerEmail],
                          subject: `[PRUEBA ALUMNO: ${data.studentEmail}] Ficha y Datos de Pago • ${data.courseName || 'PrevySeg'}`,
                          html: data.studentHtml
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
                      to: [data.companyEmail || 'prevyseg.capacitaciones@gmail.com'],
                      subject: `[NUEVA INSCRIPCIÓN WEB] - ${data.studentName || 'Postulante'} - ${data.courseName || 'Curso'}`,
                      html: data.companyHtml
                    })
                  });
                  const companyJson = await companyRes.json();
                  responses.company = companyJson;

                  // Si Resend bloquea por estar en modo sandbox gratuito, enviamos la notificación al dueño
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
                        subject: `[NOTIFICACIÓN ADMISIÓN EMPRESA] - ${data.studentName || 'Postulante'} - ${data.courseName || 'Curso'}`,
                        html: data.companyHtml
                      })
                    });
                    responses.companyFallback = await fbCompRes.json();
                  }

                  res.statusCode = 200;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ success: true, responses }));
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              res.statusCode = 200;
              res.end();
            }
          });
        }
      }
    ],
  };
});
