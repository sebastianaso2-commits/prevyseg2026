# 📸 Guía Maestra: Capturas para Evidencias Visuales del Portafolio
**Portafolio Reflexivo y Bitácora Técnica de Práctica Profesional — Santo Tomás**
**Proyecto:** Sistema Integral de Gestión Académica, Matrícula Atómica y Campus Virtual LMS para OTEC PrevySeg SpA  
**Estudiante:** Sebastián Ignacio Acuña Valderrama  
**Docente Guía:** Paola Andrea Cifuentes Berrios  

---

## 🚀 Inicio Rápido
Para tomar las capturas reales desde tu navegador:
1. Abre la terminal en el proyecto y ejecuta:
   ```bash
   npm run dev
   ```
2. Entra en tu navegador a: `http://localhost:5173`
3. Usa el atajo de Windows **`Win + Shift + S`** para recortar la pantalla y luego pega (**`Ctrl + V`**) directamente en el archivo Word:
   📄 **[Portafolio_Reflexivo_Bitacora_Practica_PrevySeg_Santo_Tomas.docx](Portafolio_Reflexivo_Bitacora_Practica_PrevySeg_Santo_Tomas.docx)**

---

## 📋 Índice de Evidencias Visuales por Página

| N° | Competencia | Página en Documento | Nombre de la Evidencia | Dónde Tomar la Captura |
|:---|:---|:---:|:---|:---|
| **1** | Competencia Específica 1 | **Pág. 29** | Interfaz SPA, Switcher y Escuela de Seguridad con Filtros de Modalidad | Web: Hero de Seguridad y botón filtro "Próximamente" |
| **2** | Competencia Específica 2 | **Pág. 32** | Stored Procedure `process_enrollment_registration` y Esquema Relacional | Supabase SQL Editor o archivo `deploy_process_enrollment.mjs` |
| **3** | Competencia Específica 3 | **Pág. 36** | Malla Curricular con Docentes Oficiales OS-10 y Hashing Bcrypt | Web: Modal "Ver Temario" del curso de Guardia OS-10 |
| **4** | Competencia Específica 4 | **Pág. 39-40** | Calculadora de Tramos SENCE, WhatsApp Dual y Gestor de Cursos | Web: Tabla de Tramos SENCE o Menú WhatsApp flotante |
| **5** | Competencia de Empleabilidad | **Pág. 43** | Carta Gantt WBS de 30 Días y Commits de Respaldo Identificables | Excel: `Carta_Gantt_PrevySeg_2026_Actual.xlsx` o terminal Git |
| **6** | Competencia de Sello Valórico | **Pág. 46** | Transparencia Abono 50%, Ley 19.628 y Certificados QR Antifraude | Web: Ficha de Matrícula (Paso 3) o Diploma con QR en LMS |

---

### 1. Evidencia Visual Competencia 1 (Página 29)
* **Nombre de la Evidencia:** `Interfaz SPA React 19, Switcher de Escuelas y Vista Especializada de Escuela de Seguridad con Filtros de Modalidad`
* **Paso a paso para la captura:**
  1. En la web (`http://localhost:5173`), haz clic en el botón conmutable superior **"Escuela de Seguridad Privada"**.
  2. Verás el Hero institucional de Seguridad con su carrusel fotográfico y sellos OS-10.
  3. Baja al catálogo y haz clic en el botón de filtro **"Próximamente"**: se encenderá el contador amarillo de cursos futuros.
  4. Toma la captura con `Win + Shift + S`.
* **Componente fuente:** `src/components/SecuritySchoolView.jsx`

---

### 2. Evidencia Visual Competencia 2 (Página 32)
* **Nombre de la Evidencia:** `Procedimiento Almacenado Atómico process_enrollment_registration y Esquema Relacional en PostgreSQL`
* *(En el Word hay un diagrama ASCII que debes reemplazar por esta captura)*
* **Paso a paso para la captura:**
  * **Opción A (Supabase Dashboard - Recomendada):**
    1. Entra a tu proyecto en Supabase (`https://supabase.com/dashboard`).
    2. Ve a **SQL Editor** o **Database -> Functions**.
    3. Abre `process_enrollment_registration` donde se aprecia el código PL/pgSQL con `SECURITY DEFINER` y las tablas `escuela_seguridad`, `escuela_oficio` y `enrollments`. Toma la captura ahí.
  * **Opción B (Desde VS Code):**
    1. Abre en VS Code el archivo `scripts/deploy_process_enrollment.mjs`.
    2. Captura el bloque donde se declara la función SQL y los triggers transaccionales.

---

### 3. Evidencia Visual Competencia 3 (Página 36)
* **Nombre de la Evidencia:** `Modal de Malla Curricular con Docentes Oficiales OS-10 y Control de Acceso RBAC con Hashing Bcrypt`
* *(Reemplazar la foto del supervisor por la captura de la ventana modal)*
* **Paso a paso para la captura:**
  1. En el catálogo de la Escuela de Seguridad, busca el curso **"Formación de Guardias de Seguridad (GG.SS.) - OS-10"** o **"Supervisor de Seguridad Privada"**.
  2. Haz clic en el botón **"Ver Temario"** / **"Malla Curricular"**.
  3. En la ventana emergente que se abre, baja hasta la sección **"Cuerpo Docente Oficial Acreditado OS-10"**.
  4. Aparecerán los perfiles oficiales acreditados:
     - **Ing. Patricio Melgarejo Aranibar** *(Resolución OS-10 vigente hasta 2026)*
     - **Marco Antonio Gallardo Sáez** *(Resolución OS-10 vigente hasta 2027)*
  5. Toma la captura de esa ventana modal abierta.
* **Componentes fuente:** `src/components/CourseCurriculumModal.jsx` y `src/data/syllabusData.js`

---

### 4. Evidencia Visual Competencia 4 (Páginas 39-40)
* **Nombre de la Evidencia:** `Calculadora de Tramos SENCE (SenceTramosSection.jsx), Canales de WhatsApp Oficiales Duales y Modal Gestor de Cursos`
* *(Reemplazar la foto de la grúa horquilla por la captura de la interfaz de negocio)*
* **Paso a paso para la captura:**
  * **Opción A (Tabla interactiva de Tramos SENCE - Recomendada):**
    1. En la página web principal, haz scroll hacia abajo hasta la sección **"Beneficios SENCE y Franquicia Tributaria"**.
    2. Captura la tabla con los 3 tramos de cobertura:
       - **Tramo 1 (Hasta 25 UTM):** 100% financiamiento ($0 costo empresa).
       - **Tramo 2 (25 a 50 UTM):** 50% financiamiento.
       - **Tramo 3 (Sobre 50 UTM):** 15% financiamiento.
  * **Opción B (WhatsApp Dual):**
    1. Haz clic en el botón flotante verde de WhatsApp en la esquina inferior derecha.
    2. Captura el menú con las dos líneas: *Atención General (+56 9 9508 0503)* y *Coordinación de Seguridad (+56 9 8231 2128)*.
* **Componentes fuente:** `src/components/SenceTramosSection.jsx` y `src/components/Header.jsx`

---

### 5. Evidencia Visual Competencia de Empleabilidad (Página 43)
* **Nombre de la Evidencia:** `Carta Gantt Técnica de 30 Días (WBS) y Control de Versiones con Commits de Respaldo Identificables`
* *(Reemplazar el diagrama ASCII por la captura)*
* **Paso a paso para la captura:**
  * **Opción A (Carta Gantt oficial en Excel - Recomendada):**
    1. Abre en tu computador con Excel el archivo:
       📁 `Carta_Gantt_PrevySeg_2026_Actual.xlsx`
    2. Captura la planilla con las 7 fases WBS, las 35 actividades y las barras de cronograma.
  * **Opción B (Commits en Terminal o GitHub):**
    1. En la terminal ejecuta:
       ```bash
       git log --oneline -n 4
       ```
    2. O abre GitHub en la rama:
       `respaldo-plataforma-interna-modales` con el commit:
       *`chore(backup): respaldo prevyseg completo - version plataforma interna con modales de acceso y autenticacion`*.

---

### 6. Evidencia Visual Competencia de Sello Valórico (Página 46)
* **Nombre de la Evidencia:** `Módulo de Transparencia Financiera del Abono (50%), Cláusulas de Privacidad Ley N° 19.628 y Verificación Pública con QR`
* *(Reemplazar el diagrama ASCII por la captura)*
* **Paso a paso para la captura:**
  1. En el catálogo web, pulsa en **"Inscribirme"** en cualquier curso.
  2. Avanza en la ficha hasta el **Paso 3: Método de Pago y Resumen**.
  3. Verás en pantalla el desglose del arancel:
     - **Arancel Total**
     - **Cuota N° 1: Abono Inicial 50%** *(Reserva de cupo SENCE y apertura de expediente)*
     - **Cuota N° 2: 50% restante** *(Al inicio de clases)*
     - Recuadro legal obligatorio: **"Protección de Datos Personales (Ley N° 19.628)"**
  4. Toma la captura de esta pantalla completa.
* **Componente fuente:** `src/components/EnrollmentForm.jsx`

---

*Archivo generado automáticamente para respaldo y consulta permanente.*
