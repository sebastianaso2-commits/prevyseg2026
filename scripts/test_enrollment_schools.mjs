import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function test() {
  try {
    await client.connect();
    console.log('Connected to PostgreSQL for verification test.');

    // 1. Probar registro de estudiante para ESCUELA DE OFICIOS
    const testRutOficio = '19.876.543-2';
    const cleanRutOficio = '198765432';

    // Limpiar previo si existía
    await client.query(`DELETE FROM public.escuela_oficio WHERE rut = $1`, [testRutOficio]);
    await client.query(`DELETE FROM public.escuela_seguridad WHERE rut = $1`, [testRutOficio]);
    await client.query(`DELETE FROM public.users WHERE rut = $1`, [testRutOficio]);
    await client.query(`DELETE FROM auth.users WHERE email = $1`, [`${cleanRutOficio}@prevyseg.cl`]);

    console.log('Testing register_new_student with p_escuela = oficios...');
    const resOficio = await client.query(`
      SELECT public.register_new_student(
        $1, $2, $3, $4, $5, $6, $7
      ) as user_data;
    `, [testRutOficio, '123456', 'Alumno Prueba Oficio Portuario', 'prueba.oficio@gmail.com', '+56911223344', 'Arica', 'oficios']);

    const userOficio = resOficio.rows[0].user_data;
    console.log('Registered user (Oficio):', userOficio.nombre, userOficio.id);

    // Verificar en public.users
    const checkUserOficio = await client.query(`SELECT id, rut, nombre, rol FROM public.users WHERE id = $1`, [userOficio.id]);
    console.log('Verified in public.users:', checkUserOficio.rows[0]);

    // Verificar en public.escuela_oficio
    const checkEscuelaOficio = await client.query(`SELECT id, user_id, rut, nombre, curso_nombre, estado_matricula FROM public.escuela_oficio WHERE user_id = $1`, [userOficio.id]);
    console.log('Verified in public.escuela_oficio:', checkEscuelaOficio.rows[0]);

    if (!checkEscuelaOficio.rows[0]) {
      throw new Error('FAILED: Record not found in escuela_oficio!');
    }

    // 2. Simular matrícula en el curso 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios'
    console.log('Simulating full enrollment in Operaciones básicas de carga...');
    await client.query(`
      UPDATE public.escuela_oficio
      SET curso_id = 'of-04',
          curso_nombre = 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios',
          modalidad = 'Semipresencial con Terreno Portuario',
          horas = '50 Horas',
          monto_total = 140000,
          abono_50 = 70000,
          estado_matricula = 'MATRICULADO',
          estado_pago = 'ABONO_50_CONFIRMADO'
      WHERE user_id = $1;
    `, [userOficio.id]);

    const updatedEscuelaOficio = await client.query(`SELECT rut, curso_nombre, monto_total, abono_50, estado_pago FROM public.escuela_oficio WHERE user_id = $1`, [userOficio.id]);
    console.log('Updated enrollment in escuela_oficio:', updatedEscuelaOficio.rows[0]);

    // 3. Probar registro de estudiante para ESCUELA DE SEGURIDAD
    const testRutSeg = '18.765.432-1';
    const cleanRutSeg = '187654321';

    // Limpiar previo si existía
    await client.query(`DELETE FROM public.escuela_oficio WHERE rut = $1`, [testRutSeg]);
    await client.query(`DELETE FROM public.escuela_seguridad WHERE rut = $1`, [testRutSeg]);
    await client.query(`DELETE FROM public.users WHERE rut = $1`, [testRutSeg]);
    await client.query(`DELETE FROM auth.users WHERE email = $1`, [`${cleanRutSeg}@prevyseg.cl`]);

    console.log('Testing register_new_student with p_escuela = seguridad...');
    const resSeg = await client.query(`
      SELECT public.register_new_student(
        $1, $2, $3, $4, $5, $6, $7
      ) as user_data;
    `, [testRutSeg, '123456', 'Alumno Prueba Guardia SPD', 'prueba.seg@gmail.com', '+56999887766', 'Arica', 'seguridad']);

    const userSeg = resSeg.rows[0].user_data;
    console.log('Registered user (Seguridad):', userSeg.nombre, userSeg.id);

    // Verificar en public.escuela_seguridad
    const checkEscuelaSeg = await client.query(`SELECT id, user_id, rut, nombre, curso_nombre, estado_matricula FROM public.escuela_seguridad WHERE user_id = $1`, [userSeg.id]);
    console.log('Verified in public.escuela_seguridad:', checkEscuelaSeg.rows[0]);

    if (!checkEscuelaSeg.rows[0]) {
      throw new Error('FAILED: Record not found in escuela_seguridad!');
    }

    console.log('\n=============================================');
    console.log('ALL DATABASE DIFFERENTIATION TESTS PASSED ✓');
    console.log('=============================================');

  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

test();
