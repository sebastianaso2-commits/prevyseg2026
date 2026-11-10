# 📜 ACTA DE ENTREGA Y RECEPCIÓN CONFORME DE PROYECTO
### Práctica Profesional — Ingeniería en Informática | IP Santo Tomás Sede Arica
#### Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS
**Ecosistema PrevySeg 2026 — Versión 2.6.0 Final de Producción**

---

## 📌 DATOS GENERALES DEL PROYECTO

| Campo | Información Oficial Registrada |
| :--- | :--- |
| **Proyecto:** | Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS |
| **Versión Final:** | Ecosistema PrevySeg 2026 (Versión 2.6.0 Final de Producción) |
| **Código Documental:** | `ACTA-ENTREGA-PREVYSEG-ST-2026-FINAL` |
| **Estudiante en Práctica:** | **Sebastián Ignacio Acuña Valderrama** (RUT: `21.778.425-5`) |
| **Carrera e Institución:** | Ingeniería en Informática — Instituto Profesional Santo Tomás Sede Arica |
| **Centro de Práctica / Mandante:** | **OTEC PrevySeg SpA** (RUT Oficial: `76.256.947-7` • Registro SENCE N° `1238088725` • Norma Chilena NCh `2728:2015`) |
| **Sede Central:** | Blanco Encalada N° 666, 2do Piso, Arica y Parinacota, Chile |
| **Supervisora del Centro:** | **Viviane Montesillo** — Dirección General OTEC PrevySeg SpA |
| **Docente Guía Santo Tomás:** | **Paola Andrea Cifuentes Berríos** — IP Santo Tomás Sede Arica |
| **Fecha de Recepción y Cierre:** | **Noviembre de 2026** — Arica, Chile |
| **Estado:** | **✅ APROBADO 100% — RECEPCIÓN CONFORME Y AUDITADA** |

---

## 1. DECLARACIÓN DE RECEPCIÓN Y CONFORMIDAD

Por medio de la presente acta, el **Organismo Técnico de Capacitación PrevySeg SpA**, representado por su Dirección General y Supervisión de Práctica Profesional, deja constancia formal de haber recibido a **entera satisfacción y plena conformidad** el proyecto de software y plataforma digital desarrollado por el estudiante **Sebastián Ignacio Acuña Valderrama** en el marco de su Práctica Profesional para optar al título de **Ingeniero en Informática** del Instituto Profesional Santo Tomás Sede Arica.

La institución mandante declara que el software ha sido **exhaustivamente auditado, probado en entornos de producción local y cloud, y puesto en marcha operativa**, cumpliendo cabalmente con todos los objetivos funcionales, de seguridad criptográfica, integración multicanal y normativos exigidos para el **Ecosistema Tecnológico PrevySeg 2026**.

---

## 2. CUMPLIMIENTO EXHAUSTIVO DE REQUERIMIENTOS Y ÚLTIMAS SOLICITUDES DE CAMBIO

Se certifica formalmente que el estudiante respondió con alta proactividad, rigor metodológico y en los plazos estipulados, dando **cumplimiento al 100% de los requerimientos originales y a todas las solicitudes de cambio y evoluciones técnicas más recientes implementadas en el sistema**, destacando de manera explícita:

### 1. Ficha de Admisión Oficial con 8 Campos Obligatorios y Validación en Tiempo Real
* Captura estructurada y validación sincrónica de integridad campo a campo:
  1. **Nombre Completo:** Validación de caracteres mínimos y formato alfabético.
  2. **RUT / Cédula de Identidad:** Validación matemática estricta con algoritmo **Módulo 11** y formateador automático dinámico a estructura `XX.XXX.XXX-X` mientras el usuario tipea.
  3. **Fecha de Nacimiento:** *[Último requerimiento incorporado]* Campo obligatorio con validación etaria y límite a fecha actual, indispensable para la formalización del registro académico oficial.
  4. **Correo Electrónico:** Validación sintáctica formal bajo estándar RFC 5322 para asegurar la recepción de comprobantes.
  5. **Teléfono / WhatsApp:** Prefijo nacional `+56 9` para coordinación y seguimiento telefónico.
  6. **Dirección Particular:** *[Último requerimiento incorporado]* Calle, número, pasaje, villa o departamento de residencia actual del postulante para la ficha contractual.
  7. **Región de Residencia:** Menú interactivo con las 16 regiones de Chile.
  8. **Ciudad / Comuna:** Selección inteligente y contextual según la región escogida o ingreso asistido.
* Bloqueo inteligente del botón de envío si falta cualquiera de los 8 datos o si alguno posee formato inválido.

### 2. Declaración Jurada Formal con Ticket Interactivo y Separación Normativa (OTEC vs SPD)
* Inclusión de una casilla de verificación obligatoria con **fe de juramento legal** para el postulante.
* **Desglose normativo transparente en dos bloques visuales:**
  * **Inscripción a Curso en OTEC PrevySeg:** Certificado de Antecedentes para Fines Especiales (Registro Civil, intachable y vigente) y Certificado de Estudios de Enseñanza Media (validado por MINEDUC).
  * **Plataforma Subsecretaría de Prevención del Delito (SPD):** Aclaración explícita de que los demás exámenes (evaluación médica, informe psicotécnico de idoneidad y cédula) se tramitan directamente ante la autoridad fiscalizadora según la Ley N° 21.659.
* Imposibilidad de continuar sin la aceptación formal de este ticket de conocimiento.

### 3. Motor Dual de Notificaciones Simultáneas en Tiempo Real (Gmail SMTP Directo + Resend API)
* Despacho automático, sincrónico e instantáneo al momento exacto de pulsar el botón *"Enviar Información"*.
* **Entrega concurrente en paralelo (`Promise.all` con cabecera `keepalive: true`):**
  * **Copia al Alumno:** Despachada dinámicamente al correo personal ingresado en la ficha con su comprobante de reserva y código de solicitud `PS-XXXXXX`.
  * **Copia Corporativa de Respaldo:** Despachada de forma simultánea a la casilla oficial de la empresa: **`prevyseg.capacitaciones@gmail.com`**, garantizando que el equipo administrativo reciba el aviso de inmediato.
* Arquitectura de alta disponibilidad: Integración de **Gmail SMTP directo** mediante credenciales de aplicación seguras (`prevysegconfirm@gmail.com`) y **Resend API** como motor paralelo redundante.

### 4. Boceto Oficial Idéntico de Datos de Transferencia Bancaria y Código QR Escaneable
* Despliegue visual en pantalla y en el cuerpo HTML de ambos correos (alumno y empresa) del bloque bancario oficial institucional:
  * **Razón Social:** PREVYSEG SPA
  * **RUT Institucional:** `76.256.947-7`
  * **Tipo de Cuenta:** Cuenta Corriente
  * **Número de Cuenta:** `1000163399`
  * **Entidad Bancaria:** Banco Estado / Banco de Chile
  * **Correo Oficial de Comprobantes:** `prevyseg.capacitaciones@gmail.com`
  * **Código QR Dinámico:** Código QR escaneable generado dinámicamente vía API para pago asistido e inmediato desde aplicaciones bancarias móviles.

### 5. Redirección Instantánea a WhatsApp Admisiones (+56 9 7869 1869)
* Disparo sincrónico del protocolo `window.open` hacia la línea directa de admisiones al presionar el botón de envío, **eliminando el bloqueo de ventanas emergentes (popups)** en Google Chrome, Microsoft Edge, Mozilla Firefox, Safari y navegadores móviles Android/iOS.
* Mensaje preformateado y codificado URI que incluye el desglose de los 8 datos ingresados, el código de seguimiento `PS-XXXXXX` y la aceptación de la declaración jurada.

### 6. Deshabilitación de Pasarela de Pagos Web Directa (Canal Asistido)
* Desactivación de pasarela automática webpay/transbank no presencial para resguardar la transparencia financiera y evitar cobros huérfanos, canalizando el proceso exclusivamente a través del **Abono del 50% vía transferencia bancaria asistida** con verificación humana por parte de las ejecutivas de admisión.

### 7. Catálogo Oficial Cerrado de 20 Cursos (Seguridad Privada y Oficios Industriales)
* Parametrización y despliegue exacto de **20 programas formativos autorizados**:
  * **Escuela de Seguridad Privada (10 cursos bajo Ley N° 21.659 / Decreto N° 867):** Formación de Guardias OS-10, Perfeccionamiento de Guardias, Supervisor de Seguridad, Operador CCTV, Seguridad Bancaria y Valores, Eventos Masivos, Jefe de Seguridad, Entidades Obligadas, Seguridad Portuaria ISPS y Ciberseguridad Física.
  * **Escuela de Oficios Industriales (10 cursos SENCE Macro Zona Norte):** Maquinaria Pesada, Electricidad Industrial, Soldadura 1G a 4G, Logística de Bodegas, Asistente Contable, BPM Alimentos, Primeros Auxilios/RCP, Cuidado Adulto Mayor, Conducción Alta Montaña y Manejo RESPEL.
* Cada curso cuenta con arancel oficial en CLP, horas cronológicas y desglose de abono del 50% (Cuota 1 y Cuota 2).

### 8. Cuerpo Docente Oficial OS-10 Acreditado
* Vinculación curricular y acreditación ante Carabineros de Chile de los instructores oficiales:
  * **Marco Antonio Gallardo Sáez**
  * **Ing. Patricio Melgarejo Araníbar**

### 9. Persistencia Atómica en PostgreSQL Supabase (`process_enrollment_registration`)
* Implementación de procedimiento almacenado PL/pgSQL transaccional con garantías ACID que crea de manera atómica el usuario, cohorte y matrícula, **asegurando la regla de matrícula única por cohorte y eliminando al 100% los registros huérfanos**.

### 10. Seguridad Criptográfica Blowfish Bcrypt 256-bit y Control de Acceso (RBAC)
* Hasheo no reversible de contraseñas con factor de costo 10 (`pgcrypto`) en PostgreSQL. Prohibición absoluta de almacenamiento en texto plano.
* Procedimientos administrativos `admin_create_user` y `change_user_password` con privilegios `SECURITY DEFINER` para enrolamiento y reseteo inmediato de credenciales.
* Aislamiento estricto de rutas para perfiles: `ADMIN`, `TEACHER`, `STUDENT`, `EMPRESA`.

### 11. Calculadora de Franquicia SENCE y Enrutamiento Multicanal de WhatsApp
* Módulo interactivo con cálculo automático de cobertura tributaria según tramos UTM (100% hasta 25 UTM, 50% entre 25 y 50 UTM, 15% sobre 50 UTM y costo particular).
* Enrutamiento conmutado hacia las dos líneas telefónicas oficiales: **Admisiones Generales (+56 9 7869 1869)** y **Coordinación Académica (+56 9 8231 2128)**.

### 12. Campus Virtual LMS, Auditoría SENCE en Vivo y Confidencialidad Ley N° 19.628
* Consola de fiscalización con 6 informes técnicos: marcas horarias de asistencia SENCE (umbral 75%), finalización, libro de calificaciones SPD (60% teórico / 40% práctico) y Live Logs en tiempo real vía WebSockets de Supabase.
* Módulo especializado de autoaprendizaje de 30 días para Televigilancia CCTV con régimen de exclusividad de cupo individual.
* **Confidencialidad Ley N° 19.628:** Emisión de diplomas cualitativos con acreditación "APROBADO" sin exponer calificaciones numéricas y con código QR criptográfico para verificación antifraude.

---

## 3. CIERRE DEFINITIVO DE DESARROLLO Y ENTREGA DE ACCESOS

1. **Cierre de Ciclo de Desarrollo:** Con la entrega de la **Versión 2.6.0 Final de Producción** y la suscripción de la presente acta, se da por **concluida formal y exitosamente la etapa de desarrollo** encomendada al estudiante en su Práctica Profesional de Ingeniería en Informática.
2. **Congelamiento de Alcance (Scope Freeze):** Habiéndose verificado a satisfacción el cumplimiento íntegro de todos los requerimientos funcionales, no funcionales, adaptaciones normativas y solicitudes de cambio, se declara el **cierre técnico definitivo del sistema**. No se contemplan modificaciones ni agregados adicionales; cualquier requerimiento o módulo futuro que la OTEC requiera quedará fuera del marco de la presente práctica profesional.
3. **Traspaso Formal de Credenciales y Activos Digitales:** El estudiante hace entrega formal de la totalidad de accesos maestros, repositorios y documentación:
   * **Código Fuente Completo:** Repositorio oficial en GitHub sincronizado en rama `main` ([https://github.com/Sebastianaso/PrevySeg2026](https://github.com/Sebastianaso/PrevySeg2026)).
   * **Base de Datos Cloud:** Instancia en Supabase PostgreSQL (AWS `sa-east-1`) con esquemas, funciones RPC, extensiones `pgcrypto` y políticas RLS configuradas.
   * **Despliegue y Hosting:** Configuración de compilación en Vercel y ejecutables para ambiente Windows local.
   * **Documentación Técnica Maestra:** Documentos Word `.docx`, `.xlsx` y `.md` de Especificación de Requerimientos de Software (ISO/IEC/IEEE 29148:2018).

---

## ✍️ 4. APROBACIÓN FORMAL Y FIRMAS DE CONFORMIDAD

En señal de plena conformidad, aprobación técnica y académica del proyecto, y en testimonio de mutuo reconocimiento por el trabajo desarrollado, suscriben la presente acta en Arica, Chile, a **Noviembre de 2026**:

<br><br>

```
_________________________________________          _________________________________________          _________________________________________
     SEBASTIÁN IGNACIO ACUÑA                             VIVIANE MONTESILLO                                PAOLA ANDREA CIFUENTES BERRÍOS
            VALDERRAMA                                   Supervisora de Práctica /                               Docente Guía de Práctica Profesional
    Alumno en Práctica Profesional                           Dirección General                                         IP Santo Tomás — Sede Arica
Ingeniería en Informática — Santo Tomás Arica              OTEC PrevySeg SpA
```

<br>

---
*Acta de Recepción Conforme — OTEC PrevySeg SpA (RUT: 76.256.947-7) & IP Santo Tomás Sede Arica • Noviembre 2026*

