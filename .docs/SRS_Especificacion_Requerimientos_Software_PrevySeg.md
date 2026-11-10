# 📘 Especificación de Requerimientos de Software (SRS / ERS)

## Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS
### Ecosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción

**Código Documental:** `ERS-PREVYSEG-2026-V2.6-FINAL`  
**Institución / Centro de Práctica:** Organismo Técnico de Capacitación PrevySeg SpA (RUT: 76.256.947-7 • Registro SENCE N° 1238088725 • Norma Chilena NCh 2728:2015)  
**Sede Central:** Blanco Encalada N° 666, 2do Piso, Arica, Chile  
**Estudiante en Práctica Profesional:** Sebastián Ignacio Acuña Valderrama (RUT: 21.778.425-5) — Carrera de Ingeniería en Informática | IP Santo Tomás Sede Arica  
**Supervisora del Centro de Práctica:** Viviane Montesillo — Dirección General OTEC PrevySeg SpA  
**Docente Guía Santo Tomás:** Paola Andrea Cifuentes Berríos — Santo Tomás Sede Arica  
**Estándar de Ingeniería:** ISO/IEC/IEEE 29148:2018 / IEEE Std 830-1998 / ISO/IEC 25010  
**Fecha de Emisión y Cierre Conforme:** Noviembre de 2026 — Arica, Chile  
**Estado:** ✅ APROBADO 100% — AUDITADO, PROBADO Y CONFORME A ACTA DE ENTREGA  

---

## 🗂️ 1. Control de Versiones del Documento

| Versión | Fecha | Autor / Rol | Descripción del Cambio | Aprobador / Firma |
| :---: | :---: | :--- | :--- | :---: |
| **v1.0.0** | 01/09/2026 | Sebastián Acuña | Levantamiento inicial de requerimientos funcionales para portal web y vitrina de cursos. | Supervisión OTEC |
| **v1.5.0** | 08/09/2026 | Sebastián Acuña | Especificación funcional del Campus Virtual LMS, autenticación con RUT y roles RBAC. | Dirección Académica |
| **v2.0.0** | 22/09/2026 | Sebastián Acuña | Depuración a cursos SENCE, emisión de diplomas y confidencialidad Ley N° 19.628. | Dirección General |
| **v2.4.0** | 15/10/2026 | Sebastián Acuña | Consolidación de seguridad pgcrypto Bcrypt 256-bit y calculadora de Franquicia SENCE (tramos UTM). | Supervisión Práctica |
| **v2.6.0** | 10/11/2026 | Sebastián Ignacio Acuña Valderrama | **VERSIÓN FINAL DE PRODUCCIÓN Y CIERRE DE CICLO:**<br>• Catálogo Oficial Cerrado de 20 cursos (10 Seguridad Ley N° 21.659 y 10 Oficios Macro Zona Norte).<br>• Regularización de instructores acreditados OS-10 (Marco Gallardo Sáez e Ing. Patricio Melgarejo Araníbar).<br>• Persistencia Atómica en PostgreSQL Supabase mediante procedimiento `process_enrollment_registration` (regla de matrícula única sin registros huérfanos).<br>• Ficha de Admisión con 8 campos obligatorios (Nombre, RUT, Fecha Nacimiento, Correo, Teléfono, Dirección Particular, Región, Ciudad/Comuna).<br>• Declaración Jurada formal con ticket interactivo y separación de exigencias (OTEC vs SPD).<br>• Motor dual de notificaciones simultáneas en tiempo real (Gmail SMTP con App Password y Resend API en paralelo).<br>• Bloque corporativo oficial de transferencia bancaria (PREVYSEG SPA, RUT 76.256.947-7, Cta Cte 1000163399) y código QR dinámico.<br>• Redirección automática instantánea a WhatsApp Admisiones (+56 9 7869 1869) sin bloqueo de popups.<br>• Deshabilitación de pasarela de pago web para canalización exclusiva por transferencia asistida. | Viviane Montesillo (OTEC)<br>Paola Cifuentes (Santo Tomás) |

---

## 🎯 2. Introducción, Alcance y Marco Regulatorio

### 2.1 Propósito del Sistema
Formalizar, delimitar y auditar cabalmente las especificaciones de ingeniería de software del **Ecosistema PrevySeg 2026 (Versión 2.6.0 Final)**, comprendiendo el Portal Web Corporativo, la Ficha Oficial de Admisión y Pre-Inscripción Atómica, los Canales de Atención Multicanal en Tiempo Real y el Campus Virtual LMS para el Organismo Técnico de Capacitación **OTEC PrevySeg SpA**.

### 2.2 Alcance del Sistema (System Scope)
1. **Catálogo Oficial Cerrado de 20 Cursos:**
   - **Escuela de Seguridad Privada (10 programas):** Formación de Guardias de Seguridad (Ley N° 21.659 / Decreto N° 867), Perfeccionamiento de Guardias OS-10, Supervisor de Seguridad Privada, Operador de Consola CCTV, Seguridad Bancaria y Transporte de Valores, Seguridad en Eventos Masivos, Jefe de Seguridad, Encargado de Seguridad de Entidades Obligadas, Seguridad en Puertos y Recintos Portuarios (ISPS), y Ciberseguridad Aplicada a Seguridad Física.
   - **Escuela de Oficios Industriales y Técnicos (10 programas):** Operación Segura de Maquinaria Pesada, Montaje y Mantenimiento Eléctrico Industrial, Soldadura Calificada 1G a 4G, Logística de Bodegas y Cadena de Suministro, Asistente Administrativo Contable, Manipulación Higiénica de Alimentos (BPM), Técnicas de Primeros Auxilios y RCP Avanzado, Atención y Cuidados de Adulto Mayor, Conducción Defensiva de Alta Montaña, y Gestión Ambiental y Manejo de Residuos Peligrosos.
2. **Cuerpo Docente Oficial OS-10:**
   - Integración curricular de los instructores acreditados ante la Prefectura de Seguridad Privada OS-10 de Carabineros de Chile: **Marco Antonio Gallardo Sáez** e **Ing. Patricio Melgarejo Araníbar**.
3. **Ficha de Admisión Oficial con 8 Campos Obligatorios y Validación en Vivo:**
   - 1. Nombre Completo
   - 2. RUT / Cédula de Identidad con algoritmo matemático Módulo 11 y formateo en tiempo real (`XX.XXX.XXX-X`)
   - 3. Fecha de Nacimiento (Validación etaria oficial)
   - 4. Correo Electrónico (validación estricta RFC 5322)
   - 5. Teléfono / WhatsApp (+56 9 ...)
   - 6. Dirección Particular (Calle, número, pasaje, villa o depto de residencia actual)
   - 7. Región de Residencia (16 regiones de Chile)
   - 8. Ciudad / Comuna (Seleccionable por región o manual)
4. **Declaración Jurada de Conocimiento de Requisitos con Ticket Interactivo:**
   - Aceptación obligatoria bajo fe de juramento, diferenciando antecedentes exigidos en OTEC PrevySeg (Certificado de Antecedentes para Fines Especiales y Certificado de Estudios de Enseñanza Media validado por MINEDUC) y antecedentes gestionados ante la plataforma oficial de la Subsecretaría de Prevención del Delito (evaluación médica, informe psicotécnico de idoneidad y cédula).
5. **Persistencia Atómica y Regla de Matrícula Única en PostgreSQL (Supabase):**
   - Procedimiento almacenado `process_enrollment_registration` con transacciones ACID, evitando duplicidad, inscripciones huérfanas y garantizando que un alumno mantenga una sola matrícula activa en la cohorte.
6. **Motor Dual de Notificaciones Simultáneas en Tiempo Real:**
   - Soporte dual para **Gmail SMTP Directo** (con autenticación de dos pasos y Google App Password para `prevysegconfirm@gmail.com`) y **Resend API**.
   - Despacho simultáneo en paralelo (`Promise.all`) con cabecera `keepalive: true` hacia el correo del postulante y la casilla corporativa de la empresa (`prevyseg.capacitaciones@gmail.com`).
   - Inclusión en ambos correos del bloque corporativo oficial de **Datos de Transferencia Bancaria** (PREVYSEG SPA, RUT 76.256.947-7, Cuenta Corriente 1000163399 Banco Estado / Chile, correo comprobante) junto con **Código QR escaneable** generado dinámicamente.
7. **Redirección Automática e Inmediata a WhatsApp:**
   - Disparo sincrónico sin bloqueo de ventanas emergentes (popups) hacia la línea oficial de admisiones (+56 9 7869 1869) con el texto preformateado de los 8 campos, código único de solicitud `PS-XXXXXX` y declaración jurada aceptada.
8. **Seguridad Criptográfica y Control de Acceso (RBAC):**
   - Encriptación Blowfish Bcrypt (256-bit, costo 10) en PostgreSQL (`pgcrypto`) para todas las contraseñas.
   - Roles aislados: `ADMIN`, `TEACHER`, `STUDENT`.
   - Diplomas con verificación criptográfica QR antifraude y confidencialidad absoluta de notas numéricas según Ley N° 19.628.

### 2.3 Marco Normativo y Legal
- **Norma Chilena NCh 2728:2015:** Sistema de Gestión de la Calidad para Organismos Técnicos de Capacitación (OTEC PrevySeg SpA).
- **Ley N° 21.659 (Nueva Ley de Seguridad Privada) y Decreto Ley N° 3.607:** Regulación y fiscalización de formación impartida por instructores acreditados ante Carabineros OS-10 y la Subsecretaría de Prevención del Delito (SPD).
- **Ley N° 19.518:** Estatuto de Capacitación y Empleo (Franquicia Tributaria SENCE y tramos UTM).
- **Ley N° 19.628:** Protección de la Vida Privada (Emisión cualitativa de certificados de aprobación sin publicar calificaciones numéricas).

---

## 👥 3. Matriz de Actores y Perfiles del Sistema

| Actor / Rol | Descripción y Competencias | Responsabilidades Principales |
| :--- | :--- | :--- |
| **Administrador OTEC (`ADMIN`)** | Dirección Ejecutiva y Personal Administrativo de PrevySeg SpA. | Control integral del LMS, padrón de participantes, reseteo de claves Bcrypt, otorgamiento de visto bueno de certificados y parametrización de cursos. |
| **Docente Instructor OS-10 (`TEACHER`)** | Instructores acreditados ante Carabineros de Chile (Marco Gallardo Sáez / Patricio Melgarejo). | Impartición de lecciones, libro de calificaciones SPD/SENCE, publicación de guías curriculares y resolución de dudas formativas. |
| **Estudiante Regular (`STUDENT`)** | Postulantes matriculados en cursos de seguridad u oficios. | Acceso al aula virtual 24/7, visualización de clases sincrónicas, descarga de material didáctico, postulación a bolsa laboral y descarga de diplomas con QR. |
| **Postulante / Público General** | Personas naturales interesadas en certificar competencias. | Llenado de Ficha de Admisión (8 datos), aceptación de Declaración Jurada, recepción de comprobante con QR bancario y contacto directo por WhatsApp. |
| **Empresa Patrocinante / RRHH** | Gerencias de Recursos Humanos y Contratistas Industriales. | Cotización de cursos con franquicia tributaria SENCE mediante calculadora de tramos UTM y coordinación de nóminas de trabajadores. |

---

## ⚙️ 4. Matriz Exhaustiva de Requerimientos Funcionales (RF)

| Código | Módulo | Requerimiento Funcional | Descripción Técnica y Criterio de Aceptación | Prioridad | Actor |
| :---: | :--- | :--- | :--- | :---: | :--- |
| **RF-01** | Catálogo | **Catálogo Cerrado de 20 Cursos Oficiales** | Despliegue de exactamente 10 programas de seguridad (Ley N° 21.659) y 10 cursos de oficios industriales con arancel, horas cronológicas y desglose de abono del 50%. | **Must Have** | Público / Alumnos |
| **RF-02** | Académico | **Cuerpo Docente Oficial OS-10** | Presentación curricular de los instructores acreditados ante Carabineros de Chile (Marco Antonio Gallardo Sáez e Ing. Patricio Melgarejo Araníbar) vinculados a la malla. | **Must Have** | Alumnos / OTEC |
| **RF-03** | Admisión | **Ficha de Admisión de 8 Campos Obligatorios** | Captura y validación de 8 datos personales: Nombre completo, RUT, Fecha de Nacimiento, Correo, Teléfono/WhatsApp, Dirección Particular, Región (16 regiones) y Ciudad/Comuna. | **Must Have** | Postulante |
| **RF-04** | Validación | **Algoritmo Módulo 11 para Cédula / RUT** | Validación matemática en tiempo real del dígito verificador y formateador automático dinámico a formato `XX.XXX.XXX-X` mientras el usuario tipea. | **Must Have** | Todos |
| **RF-05** | Normativo | **Declaración Jurada con Ticket Interactivo** | Casilla obligatoria con fe de juramento que desglosa los requisitos de admisión en OTEC PrevySeg (antecedentes especiales y estudios) vs requisitos en plataforma de la SPD. | **Must Have** | Postulante |
| **RF-06** | Notificaciones | **Motor Dual de Correo en Tiempo Real** | Despacho automático simultáneo mediante Gmail SMTP (`prevysegconfirm@gmail.com`) y Resend API hacia el alumno y hacia `prevyseg.capacitaciones@gmail.com`. | **Must Have** | Sistema / Correo |
| **RF-07** | Financiero | **Boceto Oficial de Transferencia y Código QR** | Inserción en pantalla y en ambos correos de los datos bancarios oficiales de PREVYSEG SPA (RUT 76.256.947-7, Cta Cte 1000163399) y código QR escaneable generado vía API. | **Must Have** | Postulante / OTEC |
| **RF-08** | Admisión | **Redirección Instantánea a WhatsApp** | Apertura inmediata y sincrónica al pulsar "Enviar Información" hacia la línea oficial (+56 9 7869 1869) con el texto pre-llenado de los 8 datos y sin bloqueo de popups. | **Must Have** | Postulante |
| **RF-09** | Financiero | **Deshabilitación de Pasarela de Pagos Web** | Desactivación de pasarela directa en línea; el sistema prioriza la transferencia bancaria con respaldo y la coordinación humana asistida por admisiones. | **Must Have** | OTEC / Postulante |
| **RF-10** | Persistencia | **Procedimiento Atómico `process_enrollment_registration`** | Función PL/pgSQL con transacciones seguras que registra usuario, cohorte y matrícula en Supabase, impidiendo registros huérfanos y asegurando matrícula única. | **Must Have** | Sistema / BD |
| **RF-11** | Seguridad | **Criptografía Blowfish Bcrypt 256-bit** | Encriptación unidireccional con costo 10 usando `pgcrypto` en PostgreSQL para todas las credenciales de acceso. Cero almacenamiento en texto plano. | **Must Have** | Seguridad / BD |
| **RF-12** | Seguridad | **Procedimiento `admin_create_user` y `change_user_password`** | Funciones administrativas para enrolamiento de cuentas y reseteo/cambio seguro de claves re-hasheadas con Bcrypt en `auth.users` y `public.users`. | **Must Have** | Administrador |
| **RF-13** | Comercial | **Calculadora de Franquicia Tributaria SENCE** | Módulo de cálculo automático de cobertura según tramos de ingresos en UTM (100% hasta 25 UTM, 50% entre 25 y 50 UTM, 15% sobre 50 UTM y particular). | **Must Have** | Empresas / RRHH |
| **RF-14** | Comercial | **Enrutamiento Multicanal de WhatsApp** | Conmutación inteligente de líneas oficiales de atención: Admisiones Generales (+56 9 7869 1869) y Coordinación Académica (+56 9 8231 2128). | **Must Have** | Todos |
| **RF-15** | Acceso | **Modal de Acceso 1-Click Demo** | Interfaz modal con alternancia de visibilidad de contraseña (ojo/candado) y accesos rápidos precargados para evaluación de roles ADMIN, TEACHER y STUDENT. | **Must Have** | Todos |
| **RF-16** | LMS Admin | **Gestión de Participantes y Claves** | Consola administrativa con filtros por curso, cohorte, búsqueda por RUT, exportación y modal dedicado para restablecimiento de claves encriptadas. | **Must Have** | Administrador |
| **RF-17** | LMS Alumno | **Área Personal y Progreso Curricular** | Dashboard del alumno con porcentaje de avance, estado de matrícula SENCE y acceso directo a lecciones. | **Must Have** | Estudiante |
| **RF-18** | LMS Alumno | **Aula Virtual y Visor Multimedia de Lecciones** | Entorno didáctico modular con visor de contenidos interactivos, material descargable y cuestionarios formativos. | **Must Have** | Estudiante |
| **RF-19** | Certificación | **Visto Bueno Administrativo de Diplomas** | Módulo de fiscalización interna para auditar asistencia y evaluaciones antes de autorizar la emisión de certificados. | **Must Have** | Administrador |
| **RF-20** | Certificación | **Confidencialidad Ley N° 19.628** | Diplomas públicos emitidos con aprobación cualitativa ("APROBADO") sin exhibir notas numéricas, protegiendo los datos personales del estudiante. | **Must Have** | Sistema / OTEC |
| **RF-21** | Certificación | **Verificación Criptográfica QR Antifraude** | Generación de código QR en diplomas que enlaza a endpoint público de validación de autenticidad y vigencia institucional. | **Must Have** | Empleadores / OS-10 |
| **RF-22** | Empleabilidad | **Bolsa de Empleo Regional Arica y Parinacota** | Vitrina de ofertas de trabajo en empresas de seguridad e industrias de la región con postulación directa del alumno con su RUT verificado. | **Should Have** | Estudiante / Empresas |

---

## 🛡️ 5. Matriz de Requerimientos No Funcionales (RNF - ISO/IEC 25010)

| Código | Dimensión ISO 25010 | Requisito y Criterio de Calidad | Métrica Objetivo |
| :---: | :--- | :--- | :--- |
| **RNF-01** | **Seguridad Criptográfica** | Todas las contraseñas deben estar hasheadas con Blowfish Bcrypt ($2a$10$). Prohibido almacenar texto plano bajo cualquier condición. | 100% claves con hash Bcrypt |
| **RNF-02** | **Integridad de Datos** | Persistencia atómica de matrícula e idempotencia (`ON CONFLICT`) entre `auth.users`, `auth.identities` y `public.users`. | 0 fallos de integridad referencial |
| **RNF-03** | **Seguridad (RBAC)** | Aislamiento estricto de vistas y acciones administrativas según el rol autenticado (`ADMIN`, `TEACHER`, `STUDENT`). | 100% rutas y acciones protegidas |
| **RNF-04** | **Eficiencia de Rendimiento** | Tiempo de renderizado inicial (FCP) inferior a 1.2 segundos y compilación limpia con Vite. | FCP ≤ 1.2s • 0 errores de build |
| **RNF-05** | **Disponibilidad Operacional** | Disponibilidad del servicio 24/7 con un Acuerdo de Nivel de Servicio (SLA) del 99.8% mensual. | Uptime ≥ 99.8% |
| **RNF-06** | **Usabilidad y Accesibilidad** | Interfaz corporativa con contraste WCAG 2.1 Nivel AA (`bg-slate-50`, `bg-white`, `text-slate-900`) y micro-animaciones fluidas. | Ratio de contraste ≥ 4.5:1 |
| **RNF-07** | **Compatibilidad Cross-Browser** | Funcionamiento verificado en Chrome, Edge, Firefox, Safari y navegadores móviles Android/iOS. | 100% navegadores estándar |
| **RNF-08** | **Mantenibilidad del Código** | Arquitectura modular desacoplada en React con librerías dedicadas (`src/config/supabase.js`, `src/services/notificationService.js`, `src/utils/validation.js`). | Modularidad sin deuda técnica |
| **RNF-09** | **Cumplimiento Normativo SENCE** | Trazabilidad y auditoría de participantes bajo la Norma Chilena NCh 2728:2015. | Auditoría SENCE 100% conforme |
| **RNF-10** | **Privacidad Legal (Ley 19.628)** | Certificados emitidos con acreditación cualitativa ("APROBADO") sin notas numéricas. | 0% notas expuestas en diplomas |
| **RNF-11** | **Tolerancia a Fallos** | Captura de excepciones en tiempo de ejecución con React Error Boundaries y fallback inteligente de correo (Gmail SMTP ↔ Resend). | 0 pantallas en blanco |
| **RNF-12** | **Trazabilidad en Control de Versiones** | Registro histórico en Git con commits semánticos sincronizados en GitHub (`Sebastianaso/PrevySeg2026`). | Trazabilidad 100% en rama `main` |

---

## 🔗 6. Matriz de Trazabilidad de Requerimientos (RTM)

| Requerimientos | Módulo / Funcionalidad | Componentes / Archivos en Repositorio | Método de Verificación |
| :--- | :--- | :--- | :--- |
| **RF-01, RF-02** | Catálogo 20 Cursos & Docentes OS-10 | [`src/components/CoursesSection.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/components/CoursesSection.jsx), [`src/components/EnrollmentForm.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/components/EnrollmentForm.jsx) | Auditoría de grilla, 20 temarios y docentes OS-10 |
| **RF-03, RF-04, RF-05** | Ficha 8 Campos & Declaración Jurada | [`src/components/PreEnrollmentStep.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/components/PreEnrollmentStep.jsx), [`src/utils/validation.js`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/utils/validation.js) | Prueba de validación de 8 datos y ticket de juramento |
| **RF-06, RF-07** | Motor Dual Email & QR Bancario | [`src/services/notificationService.js`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/services/notificationService.js), [`vite.config.js`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/vite.config.js), [`api/send-enrollment-email.js`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/api/send-enrollment-email.js) | Prueba en vivo de entrega simultánea con Gmail SMTP y QR |
| **RF-08, RF-09** | WhatsApp Directo & Cierre de Pasarela | [`src/components/PreEnrollmentStep.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/components/PreEnrollmentStep.jsx) | Verificación de apertura inmediata sin bloqueo de popups |
| **RF-10, RF-11, RF-12** | Persistencia Atómica & Bcrypt | [`src/config/supabase.js`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/config/supabase.js), [`supabase_setup_login.sql`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/supabase_setup_login.sql) | Inspección de transacciones ACID y hashes en BD |
| **RF-13, RF-14** | Calculadora SENCE & WhatsApps | [`src/components/SenceTramosSection.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/components/SenceTramosSection.jsx) | Verificación de tramos UTM y enlaces a ambas líneas |
| **RF-15, RF-16** | Acceso Demo & Gestión Participantes | [`src/components/Modals.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/components/Modals.jsx), [`src/lms/views/ParticipantsView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/lms/views/ParticipantsView.jsx) | Prueba de login 1-click y reseteo de contraseñas |
| **RF-17, RF-18** | Campus Virtual & Aulas Interactivas | [`src/lms/views/PersonalAreaView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/lms/views/PersonalAreaView.jsx), [`src/lms/views/CourseClassroomView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/lms/views/CourseClassroomView.jsx) | Inspección de avance curricular y visualizador didáctico |
| **RF-19, RF-20, RF-21** | Certificación, Ley 19.628 & QR | [`src/lms/views/CertificateApprovalView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/lms/views/CertificateApprovalView.jsx) | Auditoría de Visto Bueno, confidencialidad y validación QR |
| **RF-22** | Bolsa de Empleo Regional | [`src/lms/views/JobBoardView.jsx`](file:///c:/Users/ashle/OneDrive/Escritorio/Todo%20prevyseg/prevyseg/src/lms/views/JobBoardView.jsx) | Prueba de postulación laboral con RUT verificado |

---

## ✍️ 7. Aprobación Formal y Validación de Entrega

En conformidad con el **Acta de Entrega y Recepción Conforme de Proyecto de Práctica Profesional** suscrita en Arica, Chile, se aprueba la presente Especificación de Requerimientos de Software al 100% de cumplimiento:

```
_________________________________________          _________________________________________          _________________________________________
     SEBASTIÁN IGNACIO ACUÑA                             VIVIANE MONTESILLO                                PAOLA ANDREA CIFUENTES BERRÍOS
           VALDERRAMA                                   Supervisora de Práctica /                               Docente Guía de Práctica Profesional
   Alumno en Práctica Profesional                           Dirección General                                         IP Santo Tomás — Sede Arica
Ingeniería en Informática — Santo Tomás Arica              OTEC PrevySeg SpA
```

*Noviembre de 2026 — Arica y Parinacota, Chile • Ecosistema PrevySeg 2026 Versión 2.6.0 Final de Producción*
