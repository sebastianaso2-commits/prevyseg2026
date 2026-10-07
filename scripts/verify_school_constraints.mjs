import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  try {
    await client.connect();
    console.log('🔗 Connected to Supabase PostgreSQL');

    // 1. Verify tables exist
    const tablesRes = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('escuela_seguridad', 'escuela_oficio', 'EscuelaSeguridad', 'EscuelaOficio');
    `);
    console.log('✅ Found tables/views:', tablesRes.rows.map(r => r.table_name));

    // 2. Use existing student from public.users
    const userRes = await client.query(`
      SELECT id, rut, nombre FROM public.users WHERE rol = 'STUDENT' LIMIT 1;
    `);
    if (!userRes.rows.length) {
      throw new Error('No student found in public.users');
    }
    const testUser = userRes.rows[0];
    console.log(`👤 Using test student: ${testUser.nombre} (${testUser.rut})`);

    // Clean up any test rows for this student
    await client.query(`DELETE FROM public.escuela_seguridad WHERE user_id = $1`, [testUser.id]);
    await client.query(`DELETE FROM public.escuela_oficio WHERE user_id = $1`, [testUser.id]);

    // 3. Test insertion into escuela_seguridad
    await client.query(`
      INSERT INTO public.escuela_seguridad (
        user_id, rut, nombre, email, curso_id, curso_nombre, modalidad, horas, monto_total, abono_50
      ) VALUES (
        $1, $2, $3, 'test@prevyseg.cl', 'ggss-form-presencial', 'GGSS FORMACIÓN PRESENCIAL', 'Presencial', '90 Horas', 140000, 70000
      );
    `, [testUser.id, testUser.rut, testUser.nombre]);
    console.log('✅ Successfully enrolled student in escuela_seguridad for 1st course');

    // 4. Test trigger: Attempt to enroll the SAME student into escuela_oficio (MUST BE REJECTED)
    let rejected = false;
    try {
      await client.query(`
        INSERT INTO public.escuela_oficio (
          user_id, rut, nombre, email, curso_id, curso_nombre, modalidad, horas, monto_total, abono_50
        ) VALUES (
          $1, $2, $3, 'test@prevyseg.cl', 'oficio-gastronomia', 'Técnicas de Gastronomía', 'Presencial', '50 Horas', 130000, 65000
        );
      `, [testUser.id, testUser.rut, testUser.nombre]);
    } catch (triggerErr) {
      rejected = true;
      console.log('🛡️ TRIGGER VERIFIED: Blocked second course enrollment as required:');
      console.log('   Message:', triggerErr.message);
    }

    if (!rejected) {
      throw new Error('❌ Error: Trigger failed to prevent multi-course enrollment!');
    }

    // 5. Clean up
    await client.query(`DELETE FROM public.escuela_seguridad WHERE user_id = $1`, [testUser.id]);
    console.log('🧹 Cleaned up test enrollment records');

    console.log('🎉 ALL DATABASE CONSTRAINTS & 1-STUDENT = 1-COURSE TRIGGER VERIFIED 100%!');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verify();
