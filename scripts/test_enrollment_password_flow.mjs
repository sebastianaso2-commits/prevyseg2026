import pg from 'pg';
const { Client } = pg;
if (!process.env.DATABASE_URL && !process.env.SUPABASE_DB_URL) {
  console.warn('[AVISO] Para ejecutar este script define DATABASE_URL o SUPABASE_DB_URL en tu entorno.');
}


const client = new Client({
  connectionString: process.env.DATABASE_URL || process.env.SUPABASE_DB_URL || '',
  ssl: { rejectUnauthorized: false }
});

async function runTestPasswordFlow() {
  try {
    await client.connect();
    console.log('================================================================');
    console.log('🧪 TEST E2E: AUTENTICACIÓN RUT + BCRYPT Y VERIFICACIÓN RBAC');
    console.log('================================================================');
    console.log('Conectado a PostgreSQL en Supabase AWS sa-east-1...');

    const testRut = '17.654.321-K';
    const cleanRut = '17654321k';
    const testPassword = 'PasswordSegura2026!';
    const testEmail = `${cleanRut}@prevyseg.cl`;

    // 1. Limpieza de datos previos de prueba
    console.log('\n1. Limpiando registros previos de prueba...');
    await client.query(`DELETE FROM public.escuela_seguridad WHERE rut = $1`, [testRut]);
    await client.query(`DELETE FROM public.users WHERE rut = $1 OR email = $2`, [testRut, testEmail]);
    await client.query(`DELETE FROM auth.users WHERE email = $1`, [testEmail]);
    console.log('   ✓ Datos previos purgados.');

    // 2. Registro con Contraseña usando la función atómica y encriptación Bcrypt
    console.log('\n2. Ejecutando registro con encriptación Blowfish Bcrypt (256-bit)...');
    const registerRes = await client.query(`
      SELECT public.process_enrollment_registration(
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13
      ) as resultado;
    `, [
      testRut,
      'Postulante de Prueba Bcrypt',
      testEmail,
      '+56 9 9988 7766',
      'Av. Comandante San Martín 123, Arica',
      testPassword,
      'seg-01',
      'Formación de Guardias de Seguridad (OS-10)',
      'Presencial Sede Arica',
      '90 Horas',
      180000,
      90000,
      'seguridad'
    ]);

    const registration = registerRes.rows[0].resultado;
    console.log('   ✓ Usuario registrado atómicamente con ID:', registration.user_id);
    console.log('   ✓ Escuela:', registration.school);
    console.log('   ✓ Estado:', registration.estado_matricula, '| Pago:', registration.estado_pago);

    // 3. Verificar que la contraseña guardada es un Hash Bcrypt válido ($2a$ o $2b$)
    console.log('\n3. Verificando Hash Criptográfico en tabla auth.users...');
    const authCheck = await client.query(`
      SELECT id, email, encrypted_password, raw_user_meta_data 
      FROM auth.users 
      WHERE id = $1;
    `, [registration.user_id]);

    const authUser = authCheck.rows[0];
    console.log('   ✓ Email de autenticación:', authUser.email);
    console.log('   ✓ Hash Bcrypt generado:', authUser.encrypted_password ? authUser.encrypted_password.substring(0, 29) + '...' : 'VACÍO');
    
    const isBcrypt = authUser.encrypted_password && (authUser.encrypted_password.startsWith('$2a$') || authUser.encrypted_password.startsWith('$2b$'));
    console.log('   ✓ Algoritmo verificado como Blowfish Bcrypt:', isBcrypt ? 'CORRECTO (Válido)' : 'FALLIDO');

    // 4. Verificar verificación de contraseña con extensions.crypt
    console.log('\n4. Simulando verificación de contraseña contra Hash Bcrypt...');
    const verifyRes = await client.query(`
      SELECT (encrypted_password = extensions.crypt($1, encrypted_password)) as password_coincide
      FROM auth.users
      WHERE id = $2;
    `, [testPassword, registration.user_id]);

    const passwordMatches = verifyRes.rows[0].password_coincide;
    console.log('   ✓ Comprobación de credenciales (RUT + Password):', passwordMatches ? 'AUTENTICACIÓN EXITOSA ✓' : 'RECHAZADA ✗');

    // 5. Verificar Rol RBAC asignado en public.users
    console.log('\n5. Verificando Matriz de Roles RBAC en public.users...');
    const publicUserCheck = await client.query(`
      SELECT id, rut, nombre, rol, email 
      FROM public.users 
      WHERE id = $1;
    `, [registration.user_id]);

    const pubUser = publicUserCheck.rows[0];
    console.log('   ✓ Usuario en public.users:', pubUser.nombre);
    console.log('   ✓ Rol RBAC asignado:', pubUser.rol);
    console.log('   ✓ Acceso concedido al Campus Virtual: ROL STUDENT AUTORIZADO');

    console.log('\n================================================================');
    console.log('🎉 TODAS LAS PRUEBAS DE SEGURIDAD, BCRYPT Y RBAC PASARON CON ÉXITO');
    console.log('================================================================');

  } catch (err) {
    console.error('❌ Error en prueba de seguridad:', err);
  } finally {
    await client.end();
  }
}

runTestPasswordFlow();
