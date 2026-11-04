<?php
/**
 * CONTROL DE ESTADO DE SESIÓN Y LOGOUT
 */
session_start();

// Cierre de sesión (Logout)
if (isset($_GET['logout'])) {
    $_SESSION = array();

    if (ini_get("session.use_cookies")) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params["path"], $params["domain"],
            $params["secure"], $params["httponly"]
        );
    }

    session_destroy();

    // Eliminar cookie de recordatorio si existe
    if (isset($_COOKIE['usuario_recordado'])) {
        setcookie('usuario_recordado', '', time() - 3600, "/");
    }

    header('Location: ../demo.html?logout=success');
    exit;
}

// Función auxiliar para verificar si el usuario tiene sesión activa
function esta_autenticado() {
    return isset($_SESSION['usuario_autenticado']) && $_SESSION['usuario_autenticado'] === true;
}

// Ejemplo de comprobación:
// if (!esta_autenticado()) {
//     header('Location: ../demo.html?error=no_autorizado');
//     exit;
// }

