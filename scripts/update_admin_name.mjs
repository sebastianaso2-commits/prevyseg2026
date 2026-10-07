import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function updateAdminName() {
  console.log('Connecting to PostgreSQL database...');
  await client.connect();

  try {
    const adminId = '51f9ed12-20b3-4d8e-8373-75078f521370';

    // 1. Update public.users
    const pubRes = await client.query(
      `UPDATE public.users 
       SET nombre = 'Viviane Montesillo' 
       WHERE id = $1 
       RETURNING id, rut, nombre, rol, email;`,
      [adminId]
    );
    console.log('✅ public.users updated:', pubRes.rows[0]);

    // 2. Update auth.users
    const authRes = await client.query(
      `UPDATE auth.users 
       SET raw_user_meta_data = jsonb_set(raw_user_meta_data, '{nombre}', '"Viviane Montesillo"'),
           updated_at = now()
       WHERE id = $1
       RETURNING id, email, raw_user_meta_data;`,
      [adminId]
    );
    console.log('✅ auth.users updated:', authRes.rows[0].raw_user_meta_data);

    // 3. Update auth.identities
    const idenRes = await client.query(
      `UPDATE auth.identities 
       SET identity_data = jsonb_set(identity_data, '{nombre}', '"Viviane Montesillo"'),
           updated_at = now()
       WHERE user_id = $1
       RETURNING id, user_id, identity_data;`,
      [adminId]
    );
    console.log('✅ auth.identities updated:', idenRes.rows[0].identity_data);

    console.log('🎉 Successfully changed administrator name to Viviane Montesillo!');
  } catch (err) {
    console.error('❌ Error updating admin name:', err);
  } finally {
    await client.end();
  }
}

updateAdminName();
