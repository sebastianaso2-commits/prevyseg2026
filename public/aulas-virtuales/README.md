# Módulo de Inicio de Sesión y Aulas Virtuales

Este paquete contiene todo el código extraído y desacoplado del botón **«PLATAFORMA VIRTUAL»**, el sistema de autenticación y la **vista completa de «Aulas Virtuales» (Dashboard del Estudiante / LMS)** con los cursos reales de PrevySeg (Seguridad Privada, CCTV, Manejo de Conflictos, Agrícola, etc.).

---

## 📂 Estructura del Paquete

```text
modulo-login-plataforma/
│
├── demo.html                           # Vista previa interactiva de Login (haz doble clic para probar)
├── aulas-virtuales.html                # VISTA COMPLETA DE AULAS VIRTUALES (Dashboard del estudiante)
├── README.md                           # Documentación de integración
│
├── components/                         # Componentes Frontend desacoplados
│   ├── boton-plataforma-virtual.html   # Botón "PLATAFORMA VIRTUAL" de la cabecera
│   ├── formulario-login.html           # Tarjeta de formulario de acceso
│   ├── modal-login.html                # Ventana emergente (modal) de login
│   ├── styles.css                      # Estilos CSS de Login y Botón
│   ├── aulas.css                       # Estilos CSS de la vista de Aulas Virtuales
│   ├── login.js                        # Validaciones y control del modal de login
│   └── aulas.js                        # Filtro en tiempo real por categoría y búsqueda de cursos
│
├── backend/                            # Datos y Backend
│   ├── cursos.json                     # Catálogo real de cursos / aulas virtuales de PrevySeg
│   ├── obtener-aulas.php               # API REST que entrega los cursos en formato JSON
│   ├── procesar-login.php              # Procesador de autenticación en PHP
│   └── sesion.php                      # Control de sesión activa y logout
│
└── wordpress/                          # Opcional para proyectos en WordPress
    ├── boton-functions-snippet.php     # Código para inyectar el botón en functions.php
    └── wp-login-original.php           # Archivo original wp-login.php de WordPress
```

---

## 🎓 ¿Qué incluye la vista de Aulas Virtuales?

1. **Barra superior del estudiante:** Identificación del alumno, RUT y botón de cierre de sesión.
2. **Resumen y estadísticas:** Indicadores de cursos inscritos, completados y promedio general.
3. **Filtros interactivos:**
   * Por categoría: *Todas las Aulas*, *Seguridad Privada*, *Agrícola*, *Sistemas Internos*.
   * Por estado: *En Progreso*, *Completadas*.
   * **Buscador en tiempo real** por palabra clave.
4. **Tarjetas de Cursos (Aulas):**
   * Nombre del curso y Código SENCE oficial.
   * Barra de progreso porcentual dinámica.
   * Instructor y cantidad de módulos cursados.
   * Botón para entrar al aula o ver temario.
5. **Modal de Detalle del Aula:** Muestra los módulos (Marco Legal, Videoclase, Emergencias, Evaluación final) y botón de acceso directo.

---

## 🚀 Cómo probarlo en tu computadora

1. **Para ver el Login:** Haz doble clic en [`demo.html`](demo.html).
2. **Para ver las Aulas Virtuales:** Haz doble clic en [`aulas-virtuales.html`](aulas-virtuales.html) en tu navegador.
