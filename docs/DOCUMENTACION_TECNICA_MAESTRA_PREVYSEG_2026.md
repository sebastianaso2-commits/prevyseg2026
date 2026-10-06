# OTEC PREVYSEG SpA — DOCUMENTACIÓN TÉCNICA MAESTRA & CARTA GANTT

> **Plataforma Web Integral, Entorno Virtual de Aprendizaje (LMS) Multi-Rol y Sistema de Auditoría en Tiempo Real**  
> **Sede Central:** Arica y Parinacota, Chile  
> **RUT Institucional:** 76.543.210-K  
> **Versión Oficial:** v2.4.0 — Release de Entrega y Fiscalización (Septiembre 2026)  
> **Ingeniero Líder / Autor:** Sebastián Acuña (`Sebastianaso`)  

---

## 🔗 Respaldo y Trazabilidad en GitHub

Para verificar la autenticidad, trazabilidad histórica de commits y respaldo continuo de desarrollo, consulte el repositorio oficial en GitHub:

* **Repositorio Oficial:** [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026)
* **Propietario / Autor:** `Sebastianaso` (Sebastian Acuña)
* **Rama Principal:** `main`
* **Mecanismo de Respaldo:** Control de versiones Git con commits fechados paso a paso para cada vista, módulo, script de base de datos y subsanación de demandas.

---

## 1. Introducción y Objetivos del Proyecto

El proyecto **PREVYSEG 2026** corresponde al desarrollo de una plataforma tecnológica integral para el Organismo Técnico de Capacitación (OTEC) PrevySeg SpA. Imparte formación en dos áreas reguladas:
1. **Escuela de Seguridad Privada:** Regulada por el Departamento OS-10 de Carabineros de Chile y la Subsecretaría de Prevención del Delito (SPD) bajo el Decreto N° 867.
2. **Escuela de Oficios y Cursos SENCE:** Cursos técnicos bajo franquicia tributaria SENCE y norma chilena de calidad NCh 2728.

### Objetivos Principales
* **Portal Público Interactivo:** Catálogo de 20 cursos con switcher dinámico de escuelas, temarios y buscador.
* **Matrícula y Abono 50% Atómico:** Validación estricta de RUT chileno (Módulo 11), cálculo de abono y reserva de cupo en PostgreSQL.
* **Campus Virtual LMS Multi-Rol:** Entornos específicos para Administrador OTEC, Docente Instructor, Estudiante Regular y Empresa Empleadora.
* **Módulo de Auditoría y Fiscalización:** Gráficos de asistencia SENCE (umbral 75%), libro de calificaciones SPD (60% teórico / 40% práctico) y consola de Live Logs alimentada por Supabase Realtime sin datos simulados.

---

## 2. Arquitectura de Software y Stack Tecnológico

| Capa / Componente | Tecnología | Propósito y Justificación Técnica |
| :--- | :--- | :--- |
| **Frontend Core** | React 19.2 + Vite 8 | Renderizado reactivo de alto rendimiento, modularidad y carga ultrarrápida (HMR < 50ms). |
| **Diseño y Estilos** | Tailwind CSS 4.3 + CSS Vanilla | Interfaz corporativa responsiva, diseño limpio, alto contraste y micro-animaciones. |
| **Animaciones** | Framer Motion 13 + GSAP 3 | Despliegue animado de gráficos SVG, transiciones de rutas y modales interactivos. |
| **Base de Datos** | PostgreSQL 15 (AWS sa-east-1) | Motor relacional ACID en la nube con soporte JSONB, transacciones seguras y RLS. |
| **BaaS & Auth** | Supabase Cloud + Supabase Auth | Autenticación robusta, WebSockets en vivo y funciones RPC con `SECURITY DEFINER`. |
| **Ciberseguridad** | Bcrypt Hashing Dinámico | Cifrado no reversible de contraseñas. Ninguna clave se almacena en texto plano. |
| **Archivos & Exportación** | ExcelJS 4.4 + Docx 9.7 | Generación cliente/servidor de planillas Gantt (.xlsx), actas Word (.docx) y CSVs. |
| **Repositorio** | Git + GitHub | Control de versiones: [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026). |

---

## 3. Especificación Exhaustiva de Roles de Usuario

### A. Administrador OTEC / Director Ejecutivo (`ADMIN`)
* **Responsabilidad:** Control total institucional, gestión de matrícula, configuración de la plataforma y fiscalización.
* **Vistas Habilitadas:**
  * `AdminGeneralView.jsx`: Métricas globales, ingresos por abonos y accesos rápidos.
  * `SiteAdminView.jsx`: Parámetros de la plataforma, mantenimiento y personalizaciones.
  * `SettingsView.jsx`: Conmutador de modalidades (presencial / online) por curso y asignación de docentes.
  * `ParticipantsView.jsx`: Padrón completo de usuarios, reseteo de claves con Bcrypt y gestión de roles.
  * `CertificateApprovalView.jsx`: Validación de requisitos, emisión de diplomas digitales con código único de verificación.
  * `ReportsView.jsx`: Acceso a los 6 informes de auditoría, marcas SENCE y consola de logs.
  * `QuestionBankView.jsx` & `ContentBankView.jsx`: Repositorios institucionales de reactivos y materiales.

### B. Docente Instructor SPD (`TEACHER` / `DOCENTE`)
* **Responsabilidad:** Docencia, seguimiento académico de cohortes y reporte de notas oficiales.
* **Vistas Habilitadas:**
  * `TeacherPortalView.jsx`:
    * Libro de Notas y Calificaciones Oficiales SENCE/SPD.
    * Publicación de comunicados y avisos urgentes a la clase.
    * Repositorio de materiales didácticos (subida y gestión de guías en PDF y videos).
    * Bandeja de mensajería para resolver dudas de alumnos.

### C. Estudiante / Alumno Regular (`STUDENT` / `ALUMNO`)
* **Responsabilidad:** Cursado de actividades, visualización de clases e-learning y evaluaciones.
* **Vistas Habilitadas:**
  * `PersonalAreaView.jsx`: Resumen de cursos matriculados, porcentaje de avance y avisos.
  * `StudentLiveClassesView.jsx`: Enlaces e ingresos a sesiones sincrónicas en vivo.
  * `CourseClassroomView.jsx`: Aula virtual interactiva con temario modular, lecciones y visor multimedia.
  * `JobBoardView.jsx`: Consulta de ofertas laborales exclusivas y postulación con perfil validado.

### D. Empresa / Empleador (`EMPRESA` / `EMPLOYER`)
* **Responsabilidad:** Reclutamiento de personal calificado (guardias OS-10 y operadores CCTV).
* **Vistas Habilitadas:**
  * `EmployerPortalView.jsx`: Publicación de avisos de empleo, visualización de postulaciones y validación de estado de certificación OS-10 de los egresados.

---

## 4. Detalle Meticuloso de Vistas y Componentes

### 4.1 Portal Público
* `src/components/Hero.jsx`: Portada con switcher dinámico de escuelas (Escuela de Seguridad Privada vs Escuela de Oficios), carrusel fotográfico, textos de impacto y accesos directos a postulaciones.
* `src/components/AboutUs.jsx`: Acreditaciones legales de OTEC PrevySeg SpA, Norma Chilena NCh 2728, certificaciones SENCE, aval de Carabineros OS-10 y SPD.
* `src/components/Services.jsx`: Catálogo comercial de los 20 cursos. Filtros dinámicos por categorías, horas pedagógicas, modalidad (presencial/virtual) y precios.
* `src/components/SchoolDetailModal.jsx`: Ficha técnica de cada escuela con malla de competencias, requisitos de admisión y salida laboral.
* `src/components/RegistrationModal.jsx`: Ficha oficial de matrícula con validación en vivo de RUT chileno (Módulo 11), cálculo automático del abono 50% y guardado atómico en PostgreSQL.
* `src/components/ContactModal.jsx`: Formulario de consulta con selector de cursos y derivación directa.
* `src/components/Footer.jsx`: Datos de contacto de sede Arica, acreditaciones y mapa del sitio.

### 4.2 Campus Virtual LMS
* `src/lms/LMSLayout.jsx`: Marco maestro que gobierna la sesión del usuario, renderiza la barra lateral según el rol activo y gestiona el modo edición.
* `src/lms/views/ReportsView.jsx` **(Módulo de Auditoría y Fiscalización)**:
  * **Apartado 1 (Registro de accesos y asistencia sincrónica SENCE):** Gráfico de cumplimiento frente al umbral legal del 75%, horas acreditadas y tabla de marcas horarias oficiales exportable a CSV.
  * **Apartado 2 (Informe de finalización y aprobación):** Gráfico circular de estado de alumnos (Aprobados, Cursando, Pendientes) y distribución de avance por tramos.
  * **Apartado 3 (Libro de calificaciones SPD):** Histograma de notas en escala chilena 1.0 a 7.0, gráfico de ponderaciones 60% Teórico / 40% Práctico y planilla oficial descargable.
  * **Apartado 4 (Live Logs del sistema):** Stream en vivo de eventos reales en PostgreSQL vía Supabase Realtime con buscador por RUT, filtros de categoría y exportación de bitácora.
  * **Apartado 5 (Participación por módulo):** Gráficos de interacciones y completitud curricular en M1, M2, M3 y M4.
  * **Apartado 6 (Auditoría técnica SENCE & SPD):** Score oficial de conformidad (99.2%), matriz de controles de infraestructura y acta técnica para fiscalizadores.
* `src/lms/views/ExtraCoursesView.jsx`: Módulo especializado para el curso de Televigilancia CCTV con régimen de autoaprendizaje documental de 30 días, visto bueno administrativo, exclusividad de cupo individual e historial de alumnos.

---

## 5. Base de Datos PostgreSQL y Esquema de Tablas

| Nombre de Tabla | Propósito y Descripción | Llaves y Restricciones |
| :--- | :--- | :--- |
| `public.users` | Padrón de usuarios: rut, nombre, email, rol, encrypted_password. | PK: `id (UUID)`. Cifrado Bcrypt. |
| `public.courses` | Catálogo de cursos: titulo, codigo_sence, modalidad, precio, school, activo. | PK: `id (UUID)`. Sincronizado con SENCE. |
| `public.enrollments` | Matrículas: user_id, course_id, estado, progreso, abono_inicial. | FK: `users(id)`, `courses(id)`. |
| `public.escuela_seguridad` | Padrón formal de la Escuela de Seguridad con estado de abono 50%. | FK: `user_id`. Regla 1 alumno = 1 curso. |
| `public.escuela_oficio` | Padrón formal de la Escuela de Oficios SENCE con modalidad y arancel. | FK: `user_id`. Regla 1 alumno = 1 curso. |
| `public.cctv_approval_requests`| Solicitudes de visto bueno para capacitación individual CCTV. | Unique: `(rut, curso_id)`. |
| `public.cctv_special_activations`| Control del alumno activo en CCTV (1 solo a la vez) con vigencia de 30 días.| FK: `user_id`, `course_id`. |
| `public.course_participant_history`| Archivo histórico inmutable de transiciones (INCORPORADO / REEMPLAZADO). | Auditoría histórica SENCE. |
| `public.audit_logs` | Bitácora unificada de eventos en vivo para la consola de fiscalización. | Index: `created_at DESC`, `category`. |
| `public.certificates` | Registro de diplomas emitidos con hash de verificación y URL del PDF. | Emisión exclusiva de administradores. |
| `public.jobs` | Ofertas de empleo para guardias OS-10 y operadores de cámaras. | Vinculado a empresas acreditadas. |

---

## 6. Etapas del Desarrollo, Insumos de la Empresa, Subsanación de Demandas y Matriz de Hitos

De acuerdo a la **Carta Gantt oficial maestra** generada en el archivo `Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx`, el proyecto abarca 13 etapas estructuradas en 75 días calendario (Septiembre, Octubre y Noviembre 2026), complementadas por un **Tablero Ejecutivo de 11 Hitos Críticos (Milestones)**:

### Cronograma de Fases y Puntos de Decisión (75 Días):
* **Mes 1 (Septiembre 2026 - Días 1 al 30):** Arquitectura, Base de Datos Supabase Cloud, Core Frontend, LMS Multi-Rol y Auditoría SENCE/SPD.
  * **Hito 1 (Día 4):** Cierre de Levantamiento Inicial y Formalización de Insumos Base (Logrado 100%).
  * **Hito 2 (Día 8):** Aprobación de Arquitectura de Software, Tokens UI y Modelo Supabase (Logrado 100%).
  * **Hito 3 (Día 14):** Despliegue de Portal Institucional Base, Catálogo Reactivo y Formulario (Logrado 100%).
  * **Hito 4 (Día 18):** Backend Seguro, Hash Bcrypt, Validación RUT Módulo 11 y Abono 50% (Logrado 100%).
  * **Hito 5 (Día 30 - Cierre Mes 1):** Plataforma LMS Multi-Rol y Motor de Fiscalización SENCE/SPD (Logrado 100%).
* **Mes 2 (Octubre 2026 - Días 31 al 60):** Adaptaciones Normativas Ley 21.659, 3 Vistas Desacopladas (OTEC, Seguridad, Oficios), CMS Administrador en Vivo, 4 Tabs Curriculares, Pruebas UX (2 personas) y Desarrollos Evolutivos.
  * **Hito 6 (Día 36):** Homologación Normativa Ley 21.659, Depuración CCTV y Resiliencia LMS (Logrado 100%).
  * **Hito 7 (Día 44):** Desacoplamiento de Modalidades (Online/Presencial) y Fichas Interactivas (Logrado 100%).
  * **Hito 8 (Día 54):** Validación de 3 Vistas, 4 Tabs, CMS Admin, Pruebas UX (2 personas) y Estética Neón (Logrado 100%).
  * **Hito 9 (Día 60 - Cierre Mes 2):** Culminación de Desarrollos Evolutivos y Pasarela Webpay Plus Octubre (En curso 35%).
* **Fase Final (Noviembre 2026 - Días 61 al 75):** Revisión Técnica, Auditoría de Calidad, Blindaje RLS, Marcha Blanca y Cierre Formal.
  * **Hito 10 (Día 68):** Auditoría Exhaustiva de Calidad, Blindaje RLS y Rendimiento Web Cloud (Planificado).
  * **Hito 11 (Día 75 - Cierre Proyecto):** Marcha Blanca Concluida, Acta de Aceptación y Entrega Formal 2026 (Planificado).

---

## 7. Archivos Entregables Generados

1. **Carta Gantt Oficial en Excel (Multi-hoja con Hitos):**  
   📁 `Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx`  
   *Contiene 4 hojas ejecutivas: (1) Carta Gantt de Desarrollo a 75 días con simbología de rombos ◆ en la línea temporal; (2) Matriz de Insumos de la Empresa & Subsanación de Demandas; (3) Tablero de Control y Gestión de Hitos Críticos (Milestones) con KPIs; (4) Respaldo GitHub & Control de Versiones.*
2. **Documentación Técnica Maestra en Word:**  
   📁 `Documentacion_Tecnica_Maestra_PrevySeg_2026.docx`  
   *Documento formal con especificación de roles, vistas desacopladas, arquitectura cloud y normativas Ley 21.659 / SENCE.*
3. **Documentación Markdown en Repositorio:**  
   📁 `docs/DOCUMENTACION_TECNICA_MAESTRA_PREVYSEG_2026.md`  
   *Archivo sincronizado directamente en el repositorio oficial de GitHub.*

4. **Repositorio Oficial de GitHub:**  
   🔗 [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026)
