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
  console.log('Resolviendo sobrecarga en get_cctv_active_status...');
  await client.query('DROP FUNCTION IF EXISTS public.get_cctv_active_status(uuid);');
  console.log('Sobrecarga resuelta exitosamente.');
  await client.end();
}

main().catch(console.error);
