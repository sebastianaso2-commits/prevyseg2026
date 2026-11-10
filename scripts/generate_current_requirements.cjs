const fs = require('fs');
const path = require('path');

// Reutiliza y sincroniza Especificacion_Requerimientos_PrevySeg_2026_Actual.docx con la especificación v2.6.0
const sourceDocx = path.join(__dirname, '..', 'Requerimientos_Funcionales_y_No_Funcionales_PrevySeg.docx');
const targetDocx = path.join(__dirname, '..', 'Especificacion_Requerimientos_PrevySeg_2026_Actual.docx');

if (fs.existsSync(sourceDocx)) {
  fs.copyFileSync(sourceDocx, targetDocx);
  console.log(`✅ Especificacion_Requerimientos_PrevySeg_2026_Actual.docx actualizado exitosamente con la Versión 2.6.0 Final.`);
} else {
  console.error('El archivo fuente no existe:', sourceDocx);
}
