<?php
/**
 * PROCESADOR DE INICIO DE SESIÓN
 * Utiliza este archivo si deseas gestionar la sesión en tu propio backend PHP.
 */

session_start();

// Si no es petición POST, redirigir
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: ../demo.html');
    exit;
}

// Obtener y sanitizar datos
$username = isset($_POST['username']) ? trim($_POST['username']) : '';
$password = isset($_POST['password']) ? trim($_POST['password']) : '';
$remember = isset($_POST['remember']) ? true : false;

// Validar que los campos no vengan vacíos
if (empty($username) || empty($password)) {
    $_SESSION['login_error'] = 'Debes ingresar un usuario y contraseña válidos.';
    header('Location: ../demo.html?error=campos_vacios');
    exit;
}

/**
 * --------------------------------------------------------------------------
 * AQUÍ VA TU LÓGICA DE AUTENTICACIÓN
 * --------------------------------------------------------------------------
 * Puedes conectar a:
 * 1. Base de datos MySQL propia
 * 2. API externa o Google Sheets
 * 3. Servicio LDAP o Active Directory
 * 
 * Ejemplo de validación básica:
 */

// Validación segura con variables de entorno del servidor (o consulta a base de datos)
$usuario_valido = getenv('PREVYSEG_ADMIN_USER');
$password_valida = getenv('PREVYSEG_ADMIN_PASS');

if (!empty($usuario_valido) && !empty($password_valida) && $username === $usuario_valido && hash_equals($password_valida, $password)) {
    // Autenticación correcta: iniciamos sesión
    $_SESSION['usuario_autenticado'] = true;
    $_SESSION['usuario_nombre'] = $username;
    $_SESSION['login_time'] = time();

    if ($remember) {
        // Cookie de recordatorio por 30 días
        setcookie('usuario_recordado', $username, time() + (30 * 24 * 60 * 60), "/");
    }

    // Redirigir al panel de Aulas Virtuales
    header('Location: ../aulas-virtuales.html');
    exit;

} else {
    // Credenciales incorrectas
    $_SESSION['login_error'] = 'Usuario o contraseña incorrectos.';
    header('Location: ../demo.html?error=credenciales_invalidas');
    exit;
}

