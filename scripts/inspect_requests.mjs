import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();

  console.log('--- COLUMNS IN escuela_seguridad ---');
  const esCols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'escuela_seguridad'");
  console.table(esCols.rows);

  console.log('\n--- ROWS IN escuela_seguridad ---');
  const esRows = await client.query("SELECT id, user_id, nombre, rut, email, curso_id, curso_nombre, estado_matricula, estado_pago FROM escuela_seguridad");
  console.table(esRows.rows);

  console.log('\n--- ENROLLMENTS WITH COURSES ---');
  const enrRows = await client.query(`
    SELECT e.id, e.user_id, u.nombre, u.rut, c.titulo, e.estado, e.progreso
    FROM enrollments e
    LEFT JOIN users u ON u.id = e.user_id
    LEFT JOIN courses c ON c.id = e.course_id
  `);
  console.table(enrRows.rows);

  await client.end();
}

main().catch(console.error);
