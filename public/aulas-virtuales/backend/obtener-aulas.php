<?php
/**
 * API ENDPOINT: OBTENER AULAS VIRTUALES / CURSOS
 * Devuelve el catálogo de aulas virtuales activas en formato JSON.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$jsonFile = __DIR__ . '/cursos.json';

if (!file_exists($jsonFile)) {
    http_response_code(404);
    echo json_encode(['error' => 'Archivo de cursos no encontrado']);
    exit;
}

$cursos = json_decode(file_get_contents($jsonFile), true);

// Filtro opcional por categoría
if (isset($_GET['categoria']) && !empty($_GET['categoria'])) {
    $cat = strtolower(trim($_GET['categoria']));
    $cursos = array_filter($cursos, function($c) use ($cat) {
        return strtolower($c['categoria']) === $cat;
    });
}

// Filtro opcional por estado
if (isset($_GET['estado']) && !empty($_GET['estado'])) {
    $estado = strtolower(trim($_GET['estado']));
    $cursos = array_filter($cursos, function($c) use ($estado) {
        return strtolower($c['estado']) === $estado;
    });
}

echo json_encode(array_values($cursos), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
