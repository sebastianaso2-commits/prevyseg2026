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

                  // 1. Enviar correo al alumno
                  if (data.studentEmail) {
                    const studentRes = await fetch('https://api.resend.com/emails', {
                      method: 'POST',
                      headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        from: 'PrevySeg Capacitaciones <onboarding@resend.dev>',
                        to: [data.studentEmail.trim()],
                        subject: `Ficha Recibida y Datos de Pago • ${data.courseName || 'OTEC PrevySeg'}`,
                        html: data.studentHtml
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
                      to: [data.companyEmail || 'prevyseg.capacitaciones@gmail.com'],
                      subject: `[NUEVA INSCRIPCIÓN WEB] - ${data.studentName || 'Postulante'} - ${data.courseName || 'Curso'}`,
                      html: data.companyHtml
                    })
                  });
                  responses.company = await companyRes.json();

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
