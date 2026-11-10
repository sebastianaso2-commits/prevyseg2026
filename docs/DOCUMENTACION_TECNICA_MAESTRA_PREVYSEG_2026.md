# 🏢 OTEC PREVYSEG SpA — DOCUMENTACIÓN TÉCNICA MAESTRA
## Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS
### Ecosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción

> **Institución / Centro de Práctica:** Organismo Técnico de Capacitación PrevySeg SpA  
> **RUT Institucional Oficial:** 76.256.947-7 • **Registro SENCE N°:** 1238088725 • **Certificación:** NCh 2728:2015  
> **Sede Central:** Blanco Encalada N° 666, 2do Piso, Arica y Parinacota, Chile  
> **Estudiante en Práctica Profesional:** Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5) — Ingeniería en Informática, IP Santo Tomás Sede Arica  
> **Supervisora del Centro de Práctica:** Viviane Montesillo — Dirección General OTEC PrevySeg SpA  
> **Docente Guía de Práctica Profesional:** Paola Andrea Cifuentes Berríos — Santo Tomás Sede Arica  
> **Fecha de Recepción Conforme y Cierre:** Noviembre de 2026 — Arica, Chile  
> **Estado:** ✅ APROBADO 100% — AUDITADO, PROBADO Y CONFORME A ACTA DE ENTREGA  

---

## 🔗 Respaldo y Trazabilidad en GitHub

Para verificar la autenticidad, trazabilidad histórica de commits y respaldo continuo de desarrollo, consulte el repositorio oficial en GitHub:

* **Repositorio Oficial:** [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026)
* **Propietario / Autor:** `Sebastianaso` (Sebastián Ignacio Acuña Valderrama)
* **Rama Principal:** `main`
* **Mecanismo de Respaldo:** Control de versiones Git con commits estructurados y fechados paso a paso para cada vista, componente reactivo, scripts de base de datos, persistencia atómica y subsanación de demandas.

---

## 1. Introducción y Objetivos del Proyecto

El proyecto **PREVYSEG 2026 (Versión 2.6.0 Final de Producción)** corresponde al diseño, construcción, aseguramiento de calidad y puesta en producción de un ecosistema tecnológico integral para el Organismo Técnico de Capacitación **OTEC PrevySeg SpA**, con sede en la Región de Arica y Parinacota, Chile.

La institución imparte formación académica y capacitación profesional regulada en dos grandes áreas:
1. **Escuela de Seguridad Privada:** Regulada por la **Ley N° 21.659** y el **Decreto N° 867**, fiscalizada por la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile y la Subsecretaría de Prevención del Delito (SPD). Impartida por instructores oficiales acreditados: **Marco Antonio Gallardo Sáez** e **Ing. Patricio Melgarejo Araníbar**.
2. **Escuela de Oficios Industriales y Técnicos (Macro Zona Norte):** Cursos técnicos bajo Franquicia Tributaria SENCE (**Ley N° 19.518**) y la Norma Chilena de Calidad **NCh 2728:2015**.

### Objetivos Centrales de Ingeniería
* **Catálogo Oficial Cerrado de 20 Cursos:** Vitrina interactiva con 10 programas de formación en seguridad privada y 10 oficios industriales para la Macro Zona Norte con desglose de aranceles y abono del 50%.
* **Ficha de Admisión Oficial con 8 Campos Obligatorios:** Captura rigurosa y validación en vivo de: 1. Nombre Completo, 2. RUT con algoritmo Módulo 11 en tiempo real, 3. Fecha de Nacimiento (validación etaria), 4. Correo Electrónico (RFC 5322), 5. Teléfono / WhatsApp (+56 9...), 6. Dirección Particular, 7. Región de Residencia (16 regiones) y 8. Ciudad / Comuna.
* **Declaración Jurada Formal con Ticket Interactivo:** Separación clara y didáctica de los requisitos exigidos para formalizar matrícula en OTEC PrevySeg (Certificado de Antecedentes para Fines Especiales y Licencia Media MINEDUC) vs los requisitos gestionados ante la plataforma oficial de la Subsecretaría de Prevención del Delito (evaluación médica, examen psicotécnico de idoneidad y cédula de identidad).
* **Persistencia Atómica en PostgreSQL (Supabase):** Procedimiento almacenado `process_enrollment_registration` con transacciones ACID que garantiza matrícula única por cohorte sin registros huérfanos ni duplicados.
* **Motor Dual de Notificaciones Simultáneas en Tiempo Real:** Despacho automatizado mediante **Gmail SMTP Directo** (con autenticación de dos pasos y Google App Password para `prevysegconfirm@gmail.com`) y **Resend API** en paralelo (`Promise.all` con `keepalive: true`), entregando copia simultánea al postulante y a la casilla corporativa `prevyseg.capacitaciones@gmail.com`.
* **Bloque Oficial de Transferencia Bancaria y Código QR Dinámico:** Inserción en pantalla y en ambos correos de los datos oficiales de PREVYSEG SPA (RUT 76.256.947-7, Cuenta Corriente 1000163399 Banco Estado / Chile) junto a código QR escaneable generado dinámicamente vía API.
* **Redirección Instantánea a WhatsApp Admisiones (+56 9 7869 1869):** Apertura sincrónica sin bloqueo de ventanas emergentes (popups) con la ficha precargada de los 8 campos y código único de solicitud `PS-XXXXXX`.
* **Deshabilitación de Pasarela Web Directa:** Priorización de la transferencia bancaria con respaldo y coordinación humana asistida por admisiones.
* **Campus Virtual LMS Multi-Rol:** Entornos aislados por rol (`ADMIN`, `TEACHER`, `STUDENT`, `EMPRESA`) con seguimiento curricular, lecciones interactivas y bolsa de empleo regional.
* **Certificación y Confidencialidad Ley N° 19.628:** Aprobación administrativa (Visto Bueno), verificación criptográfica antifraude con código QR y confidencialidad absoluta (diplomas emitidos cualitativamente con mención "APROBADO" sin exponer notas numéricas).

---

## 2. Arquitectura de Software y Stack Tecnológico

| Capa / Componente | Tecnología | Propósito y Justificación Técnica |
| :--- | :--- | :--- |
| **Frontend Core** | React 19.2 + Vite 8 | Renderizado reactivo de alto rendimiento, modularidad de componentes y carga ultrarrápida (HMR < 50ms). |
| **Diseño y Estilos** | Tailwind CSS 4.3 + CSS Vanilla | Interfaz corporativa responsiva, diseño limpio, alto contraste WCAG 2.1 AA y micro-animaciones fluidas. |
| **Animaciones & Motion** | Framer Motion 13 + GSAP 3 | Despliegue interactivo de gráficos SVG, transiciones de rutas y modales inmersivos. |
| **Base de Datos Cloud** | PostgreSQL 15 (AWS sa-east-1) | Motor relacional ACID con transacciones seguras, RPCs con `SECURITY DEFINER` y Row Level Security (RLS). |
| **BaaS & Autenticación** | Supabase Cloud + Supabase Auth | Autenticación robusta, WebSockets Realtime para Live Logs y sincronización atómica de perfiles. |
| **Ciberseguridad** | Bcrypt Hashing 256-bit (`pgcrypto`) | Cifrado unidireccional no reversible de contraseñas con factor de costo 10. Prohibición de texto plano. |
| **Motor de Correo Dual** | Gmail SMTP (Nodemailer) + Resend API | Despacho concurrente de notificaciones en tiempo real al alumno y a `prevyseg.capacitaciones@gmail.com`. |
| **Canales en Tiempo Real**| WhatsApp Directo API + QR Dinámico | Conmutación instantánea hacia WhatsApp (+56 9 7869 1869 / +56 9 8231 2128) y códigos QR bancarios. |
| **Generación de Archivos**| ExcelJS 4.4 + Docx 9.7 | Exportación de planillas Gantt (.xlsx), documentación técnica (.docx) y reportes de auditoría (.csv). |
| **Control de Versiones** | Git + GitHub | Trazabilidad histórica integral: [https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026). |

---

## 3. Especificación Exhaustiva de Roles de Usuario (RBAC)

### A. Administrador OTEC / Dirección Ejecutiva (`ADMIN`)
* **Responsabilidad:** Control total institucional, administración del LMS, fiscalización y auditoría SENCE.
* **Vistas y Módulos Habilitados:**
  * `AdminGeneralView.jsx`: Métricas globales, ingresos por abonos y accesos rápidos de supervisión.
  * `SiteAdminView.jsx`: Parámetros globales del LMS, configuración de escuelas y categorías formativas.
  * `SettingsView.jsx`: Conmutador de modalidades (presencial / online) por curso y asignación de docentes.
  * `ParticipantsView.jsx`: Padrón completo de participantes, filtros avanzados, exportación a CSV/Excel y modal dedicado para resetear contraseñas con hash Bcrypt (`change_user_password`).
  * `CertificateApprovalView.jsx`: Fiscalización de requisitos (asistencia SENCE ≥ 75% y aprobación académica), otorgamiento de Visto Bueno y emisión de diplomas digitales con código QR antifraude.
  * `ReportsView.jsx`: Módulo de fiscalización con 6 informes: marcas de asistencia sincrónica SENCE, finalización de cursos, libro de calificaciones SPD, Live Logs en tiempo real vía Supabase WebSockets, participación por módulo y score de conformidad técnica (99.2%).
  * `QuestionBankView.jsx` & `ContentBankView.jsx`: Repositorios institucionales de reactivos y material pedagógico.

### B. Docente Instructor OS-10 (`TEACHER` / `DOCENTE`)
* **Responsabilidad:** Impartición de lecciones, libro de calificaciones SPD/SENCE y acompañamiento del alumno.
* **Instructores Acreditados:** **Marco Antonio Gallardo Sáez** e **Ing. Patricio Melgarejo Araníbar**.
* **Vistas y Módulos Habilitados:**
  * `TeacherPortalView.jsx`:
    * Libro de Notas y Calificaciones Oficiales (ponderación 60% Teórico / 40% Práctico).
    * Publicación de comunicados y avisos urgentes a la clase.
    * Repositorio de materiales didácticos (subida y gestión de guías en PDF y videos instructivos).
    * Bandeja de mensajería para resolver dudas y consultas de estudiantes.

### C. Estudiante Regular (`STUDENT` / `ALUMNO`)
* **Responsabilidad:** Cursado de actividades, visualización de clases e-learning y evaluaciones.
* **Vistas y Módulos Habilitados:**
  * `PersonalAreaView.jsx`: Resumen de cursos matriculados, porcentaje de avance curricular, estado SENCE y banner de diplomas emitidos.
  * `StudentLiveClassesView.jsx`: Enlaces e ingresos directos a sesiones sincrónicas en vivo.
  * `CourseClassroomView.jsx`: Aula virtual interactiva con temario modular, lecciones y visor multimedia.
  * `JobBoardView.jsx`: Consulta de ofertas laborales exclusivas en Arica y Parinacota con postulación directa con RUT verificado.

### D. Empresa / Empleador (`EMPRESA` / `EMPLOYER`)
* **Responsabilidad:** Reclutamiento de egresados certificados (guardias OS-10 y operadores CCTV) y cotización SENCE.
* **Vistas y Módulos Habilitados:**
  * `EmployerPortalView.jsx`: Publicación de vacantes laborales, visualización de postulantes y validación del estado de certificación de los alumnos.
  * `SenceTramosSection.jsx`: Calculadora de Franquicia Tributaria SENCE por tramos UTM (100%, 50%, 15% y pago particular).

---

## 4. Detalle Meticuloso de Vistas y Componentes

### 4.1 Portal Público
* `src/components/Hero.jsx`: Portada corporativa con switcher dinámico de escuelas (Escuela de Seguridad Privada vs Escuela de Oficios Industriales), carrusel institucional, textos de impacto y accesos directos a postulación.
* `src/components/AboutUs.jsx`: Acreditaciones legales de OTEC PrevySeg SpA, Norma Chilena NCh 2728:2015, Registro SENCE N° 1238088725, aval de Carabineros OS-10 y Subsecretaría de Prevención del Delito (SPD).
* `src/components/Services.jsx` / `CoursesSection.jsx`: Catálogo comercial de los 20 cursos cerrados. Filtros reactivos por escuelas, horas pedagógicas, modalidad y aranceles.
* `src/components/PreEnrollmentStep.jsx`: Ficha oficial de postulación con los **8 campos obligatorios**, validación matemática Módulo 11 de RUT en vivo, formateo automático `XX.XXX.XXX-X`, validación de correo RFC 5322, fecha de nacimiento con control etario, dirección particular, selección de región (16 regiones) y ciudad/comuna; ticket interactivo de **Declaración Jurada**, despacho al **motor dual de correos** con datos bancarios oficiales y código QR, y redirección instantánea a WhatsApp Admisiones (+56 9 7869 1869).
* `src/components/SenceTramosSection.jsx`: Calculadora interactiva de cobertura SENCE por tramos UTM y enlaces directos a las dos líneas oficiales de WhatsApp (+56 9 7869 1869 y +56 9 8231 2128).
* `src/components/Footer.jsx`: Datos oficiales de contacto en Blanco Encalada N° 666, Arica, acreditaciones SENCE / OS-10 y enlaces de navegación.

### 4.2 Campus Virtual LMS
* `src/lms/LMSLayout.jsx`: Marco maestro que gobierna la sesión del usuario, renderiza la barra lateral según el rol activo y gestiona el modo edición.
* `src/lms/views/ReportsView.jsx` **(Módulo de Auditoría y Fiscalización)**:
  * **Apartado 1 (Registro de accesos y marcas horarias SENCE):** Gráfico de cumplimiento frente al umbral legal del 75%, horas acreditadas y tabla de marcas horarias oficiales exportable a CSV.
  * **Apartado 2 (Informe de finalización y avance curricular):** Gráfico circular de estado de alumnos (Aprobados, Cursando, Pendientes) y distribución por tramos.
  * **Apartado 3 (Libro de calificaciones SPD):** Histograma de notas en escala chilena 1.0 a 7.0, ponderación 60% Teórico / 40% Práctico y planilla oficial descargable.
  * **Apartado 4 (Live Logs del sistema):** Stream en vivo de eventos reales en PostgreSQL vía Supabase Realtime con buscador por RUT, filtros de categoría y exportación de bitácora.
  * **Apartado 5 (Participación por módulo formativo):** Gráficos de interacciones y completitud curricular en M1, M2, M3 y M4.
  * **Apartado 6 (Auditoría técnica SENCE & SPD):** Score oficial de conformidad (99.2%), matriz de controles de infraestructura y acta técnica para fiscalizadores.
* `src/lms/views/ExtraCoursesView.jsx`: Módulo especializado para el curso de Televigilancia CCTV con régimen de autoaprendizaje documental de 30 días, visto bueno administrativo, exclusividad de cupo individual e historial de alumnos.

---

## 5. Base de Datos PostgreSQL y Esquema de Tablas

| Nombre de Tabla | Propósito y Descripción | Llaves y Restricciones |
| :--- | :--- | :--- |
| `public.users` | Padrón de usuarios: rut, nombre, email, rol, encrypted_password. | PK: `id (UUID)`. Cifrado Bcrypt 256-bit (`pgcrypto`). |
| `public.courses` | Catálogo cerrado de 20 cursos: titulo, codigo_sence, modalidad, precio, school, activo. | PK: `id (UUID)`. Sincronizado con SENCE. |
| `public.enrollments` | Matrículas: user_id, course_id, estado, progreso, abono_inicial. | FK: `users(id)`, `courses(id)`. Unique: `(user_id, course_id)`. |
| `public.escuela_seguridad` | Padrón formal de la Escuela de Seguridad con estado de abono 50%. | FK: `user_id`. Regla 1 alumno = 1 curso activo. |
| `public.escuela_oficio` | Padrón formal de la Escuela de Oficios SENCE con modalidad y arancel. | FK: `user_id`. Regla 1 alumno = 1 curso activo. |
| `public.cctv_approval_requests`| Solicitudes de visto bueno para capacitación individual CCTV. | Unique: `(rut, curso_id)`. |
| `public.cctv_special_activations`| Control del alumno activo en CCTV (1 solo a la vez) con vigencia de 30 días.| FK: `user_id`, `course_id`. |
| `public.course_participant_history`| Archivo histórico inmutable de transiciones (INCORPORADO / REEMPLAZADO). | Auditoría histórica SENCE. |
| `public.audit_logs` | Bitácora unificada de eventos en vivo para la consola de fiscalización. | Index: `created_at DESC`, `category`. |
| `public.certificates` | Registro de diplomas emitidos con hash de verificación y URL del PDF. | Emisión exclusiva de administradores. Confidencialidad Ley 19.628. |
| `public.jobs` | Ofertas de empleo para guardias OS-10 y operadores de cámaras en Arica. | Vinculado a empresas acreditadas. |

---

## 6. Archivos Entregables Generados

1. **Especificación de Requerimientos de Software en Word (.docx):**  
   📁 `Especificacion_Requerimientos_PrevySeg_2026.docx`  
   *(Disponible en la raíz del proyecto, en `.docs/` y en `public/docs/` descargable vía web)*.
2. **Requerimientos Funcionales y No Funcionales en Word (.docx):**  
   📁 `Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx`  
   *(Documento formal con 22 RFs, 12 RNFs y matriz RTM de trazabilidad completa)*.
3. **Documentación Técnica Maestra en Word (.docx):**  
   📁 `Documentacion_Tecnica_Maestra_PrevySeg_2026.docx`  
   *(Manual integral de código, arquitectura cloud, roles RBAC y vinculación al repositorio)*.
4. **Carta Gantt Oficial en Excel (.xlsx con Hitos y Subsanación):**  
   📁 `Carta_Gantt_Desarrollo_PrevySeg_2026.xlsx`  
   *(Planilla ejecutiva multi-hoja a 75 días con simbología de hitos y matriz de insumos)*.
5. **Especificación de Requerimientos en Markdown:**  
   📁 `.docs/SRS_Especificacion_Requerimientos_Software_PrevySeg.md`  
   *(Documento técnico sincronizado directamente en el repositorio de GitHub)*.

---

## 7. Aprobación Formal y Validación de Entrega

En conformidad con el **Acta de Entrega y Recepción Conforme de Proyecto de Práctica Profesional** suscrita en Arica, Chile, se aprueba formalmente la presente Documentación Técnica Maestra al 100% de cumplimiento:

```
_________________________________________          _________________________________________          _________________________________________
     SEBASTIÁN IGNACIO ACUÑA                             VIVIANE MONTESILLO                                PAOLA ANDREA CIFUENTES BERRÍOS
            VALDERRAMA                                   Supervisora de Práctica /                               Docente Guía de Práctica Profesional
    Alumno en Práctica Profesional                           Dirección General                                         IP Santo Tomás — Sede Arica
Ingeniería en Informática — Santo Tomás Arica              OTEC PrevySeg SpA
```

*Noviembre de 2026 — Arica y Parinacota, Chile • Ecosistema PrevySeg 2026 Versión 2.6.0 Final de Producción*
