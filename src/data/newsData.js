import securityGuards from '../assets/images/security_guards.jpg';
import courseLogistics from '../assets/images/course_logistics_1788545116792.jpg';

// =========================================================================
// PREVYSEG 2026 - NOTICIAS OFICIALES POR ESCUELA
// =========================================================================

export const DEFAULT_NEWS = [
  // 1. ESCUELA DE SEGURIDAD PRIVADA
  {
    id: 'news-ley-21659',
    school: 'seguridad',
    title: '¡La Nueva Ley de Seguridad Privada ya está aquí! Profesionaliza tu futuro con OTEC PrevySeg',
    lead: 'La Ley 21.659 cambió las reglas: mayores exigencias, procesos online y credenciales que ahora duran 4 años. En OTEC PrevySeg adaptamos nuestros programas para que superes los nuevos estándares de la Subsecretaría de Prevención del Delito sin complicaciones.',
    category: 'Ley N° 21.659 SPD',
    date: 'Actualización Oficial 2026',
    timestamp: '2026-09-29T10:00:00Z',
    image: securityGuards,
    readTime: '2 min de lectura',
    badge: 'Normativa Oficial 2026',
    author: 'OTEC PrevySeg Arica',
    summary: 'La Ley 21.659 cambió las reglas: mayores exigencias, procesos online y credenciales que ahora duran 4 años. En OTEC PrevySeg adaptamos nuestros programas para que superes los nuevos estándares de la Subsecretaría de Prevención del Delito sin complicaciones.',
    points: [
      {
        title: 'Cursos especializados',
        description: 'Guardias (90 hrs), Vigilantes (106 hrs), Conserjes y Renovaciones.'
      },
      {
        title: 'Asesoría documental',
        description: 'Te guiamos paso a paso con los nuevos requisitos (4° medio, certificados médicos y antecedentes intachables).'
      },
      {
        title: 'Trámites cero papel',
        description: 'Te apoyamos con la plataforma digital del Gobierno para obtener tu credencial con ClaveÚnica.'
      },
      {
        title: 'Nuevos beneficios laborales',
        description: 'Tu acreditación durará 4 años y contarás con seguro de vida obligatorio al emplearte.'
      }
    ],
    closingText: 'La seguridad se profesionalizó y tu formación debe estar a la altura.',
    cta: '¡Asegura tu cupo y matricúlate hoy!',
    relatedCourse: 'Formación de Guardias de Seguridad (Ley 21.659)'
  },

  // 2. ESCUELA DE OFICIOS Y EMPLEABILIDAD
  {
    id: 'news-sence-oficios',
    school: 'oficios',
    title: '¡El nuevo estándar de SENCE ya rige la capacitación! Impulsa tu carrera con la Escuela de Oficios de PrevySeg',
    lead: 'SENCE actualizó sus normativas para elevar la calidad, infraestructura y certificación técnica en todo el país. En OTEC PrevySeg cumplimos con las exigencias más rigurosas bajo la norma NCh 2728, entregándote herramientas prácticas para que ingreses al mercado laboral con una ventaja real y demostrable.',
    category: 'Norma NCh 2728 • Respaldo SENCE',
    date: 'Actualización Oficial 2026',
    timestamp: '2026-09-29T10:00:00Z',
    image: courseLogistics,
    readTime: '2 min de lectura',
    badge: 'Estándar Oficial SENCE',
    author: 'Escuela de Oficios PrevySeg',
    summary: 'SENCE actualizó sus normativas para elevar la calidad, infraestructura y certificación técnica en todo el país. En OTEC PrevySeg cumplimos con las exigencias más rigurosas bajo la norma NCh 2728.',
    points: [
      {
        title: 'Oficios de alta demanda',
        description: 'Formación práctica en áreas técnicas, operativas y de servicios con rápida inserción laboral.'
      },
      {
        title: 'Certificación con respaldo SENCE',
        description: 'Diplomas con validez oficial que acreditan tus competencias y potencian tu currículum frente a las empresas.'
      },
      {
        title: 'Aprende haciendo en talleres equipados',
        description: 'Instalaciones con estándares técnicos actualizados, herramientas reales y protocolos de seguridad de primer nivel.'
      },
      {
        title: 'Beneficios para personas y empresas',
        description: 'Opciones accesibles para particulares y programas financiables con Franquicia Tributaria SENCE para empresas.'
      }
    ],
    closingText: 'Los oficios se modernizaron y el mercado exige especialistas certificados.',
    cta: '¡Asegura tu cupo y matricúlate hoy!',
    relatedCourse: 'Manejo y Uso de Plaguicidas Agrícolas (Norma SAG)'
  }
];

const STORAGE_KEY = 'prevyseg_news_2026_v4';

export const getSavedNews = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NEWS));
      return DEFAULT_NEWS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return DEFAULT_NEWS;
  } catch (err) {
    console.error('Error cargando noticias:', err);
    return DEFAULT_NEWS;
  }
};

export const saveNews = (newsList) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newsList));
    window.dispatchEvent(new CustomEvent('prevyseg-news-updated', { detail: newsList }));
    return true;
  } catch (err) {
    console.error('Error guardando noticias:', err);
    return false;
  }
};

export const resetNewsToDefault = () => {
  saveNews(DEFAULT_NEWS);
  return DEFAULT_NEWS;
};
