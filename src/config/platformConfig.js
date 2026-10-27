/**
 * ============================================================================
 * CONFIGURACIÓN DE REDIRECCIÓN A SISTEMA EXTERNO (PLATAFORMA VIRTUAL / LMS)
 * ============================================================================
 * 
 * Este archivo centraliza la conexión con el nuevo sistema externo de inicio
 * de sesión y aula virtual.
 * 
 * ¿DÓNDE COLOCAR LA URL DEL NUEVO SISTEMA?
 * Modifica la propiedad `url` en el objeto `EXTERNAL_PLATFORM_CONFIG` a continuación.
 */

export const EXTERNAL_PLATFORM_CONFIG = {
  // >>> [COLOCA AQUÍ LA URL DE TU NUEVO SISTEMA EXTERNO] <<<
  // Ejemplo: 'https://aulavirtual.prevyseg.cl/login' o 'https://moodle.miempresa.com'
  url: 'https://aulavirtual.prevyseg.cl',

  // Destino de apertura:
  // '_blank' -> Abre en una pestaña nueva (Recomendado para mantener abierto el sitio web)
  // '_self'  -> Redirige en la misma pestaña actual
  target: '_blank',
};

/**
 * Función que ejecuta la redirección hacia el nuevo sistema de aula virtual.
 * Se invoca automáticamente al presionar el botón "PLATAFORMA VIRTUAL".
 */
export const redirectToExternalPlatform = () => {
  const { url, target } = EXTERNAL_PLATFORM_CONFIG;

  if (!url) {
    console.warn('[PrevySeg] No se ha configurado la URL de la plataforma virtual externa.');
    return;
  }

  try {
    if (target === '_blank') {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = url;
    }
  } catch (error) {
    console.error('[PrevySeg] Error al redirigir a la plataforma virtual externa:', error);
    window.location.href = url;
  }
};
