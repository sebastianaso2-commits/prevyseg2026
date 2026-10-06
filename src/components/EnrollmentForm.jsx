import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  CreditCard,
  Send,
  Printer,
  Building2,
  Phone,
  Mail,
  MapPin,
  User,
  Calendar,
  DollarSign,
  Check,
  Sparkles,
  Lock,
  ExternalLink,
  ChevronDown,
  Info,
  Award,
  Clock,
  QrCode,
  CheckSquare,
  Square,
  HelpCircle,
  FileCheck,
  Zap,
  ArrowRight,
  BadgeAlert,
  Eye,
  EyeOff,
  Key,
  LogIn,
  Globe,
  Laptop
} from 'lucide-react';
import { 
  supabase, 
  adminCreateUser, 
  registerStudent,
  changeUserPassword,
  processEnrollmentRegistration,
  formatRut, 
  cleanRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  checkStudentSingleCourse,
  enrollStudentInSchool,
  isCctvSpecialCourse,
  requestCctvApproval
} from '../config/supabase';
import { getSavedCourses, getCourseModalities } from '../data/coursesData';

// ================= LISTADO OFICIAL DE REGIONES Y CIUDADES DE CHILE =================
export const REGIONES_CHILE = [
  { id: 'arica', name: 'Región de Arica y Parinacota (XV)', isArica: true, cities: ['Arica', 'Valle de Azapa', 'Valle de Lluta', 'Putre', 'Camarones', 'General Lagos'] },
  { id: 'tarapaca', name: 'Región de Tarapacá (I)', isArica: false, cities: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Pica', 'Huara', 'Camiña', 'Colchane'] },
  { id: 'antofagasta', name: 'Región de Antofagasta (II)', isArica: false, cities: ['Antofagasta', 'Calama', 'Tocopilla', 'Mejillones', 'Taltal', 'San Pedro de Atacama', 'Sierra Gorda', 'María Elena'] },
  { id: 'atacama', name: 'Región de Atacama (III)', isArica: false, cities: ['Copiapó', 'Vallenar', 'Caldera', 'Chañaral', 'Huasco'] },
  { id: 'coquimbo', name: 'Región de Coquimbo (IV)', isArica: false, cities: ['La Serena', 'Coquimbo', 'Ovalle', 'Illapel', 'Vicuña'] },
  { id: 'valparaiso', name: 'Región de Valparaíso (V)', isArica: false, cities: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Quillota', 'Los Andes', 'San Felipe'] },
  { id: 'metropolitana', name: 'Región Metropolitana (Santiago)', isArica: false, cities: ['Santiago', 'Puente Alto', 'Maipú', 'La Florida', 'San Bernardo', 'Providencia', 'Las Condes'] },
  { id: 'ohiggins', name: "Región de O'Higgins (VI)", isArica: false, cities: ['Rancagua', 'Machalí', 'Rengo', 'San Fernando'] },
  { id: 'maule', name: 'Región del Maule (VII)', isArica: false, cities: ['Talca', 'Curicó', 'Linares', 'Constitución'] },
  { id: 'nuble', name: 'Región de Ñuble (XVI)', isArica: false, cities: ['Chillán', 'San Carlos', 'Chillán Viejo'] },
  { id: 'biobio', name: 'Región del Biobío (VIII)', isArica: false, cities: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Los Ángeles', 'Coronel'] },
  { id: 'araucania', name: 'Región de La Araucanía (IX)', isArica: false, cities: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Angol'] },
  { id: 'los_rios', name: 'Región de Los Ríos (XIV)', isArica: false, cities: ['Valdivia', 'La Unión', 'Río Bueno'] },
  { id: 'los_lagos', name: 'Región de Los Lagos (X)', isArica: false, cities: ['Puerto Montt', 'Puerto Varas', 'Osorno', 'Castro', 'Ancud'] },
  { id: 'aysen', name: 'Región de Aysén (XI)', isArica: false, cities: ['Coyhaique', 'Puerto Aysén'] },
  { id: 'magallanes', name: 'Región de Magallanes (XII)', isArica: false, cities: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] }
];

// ================= LISTA OFICIAL DE CURSOS DE LA FICHA PREVYSEG =================
export const OFFICIAL_COURSES = [
  // --- ESCUELA DE SEGURIDAD PRIVADA ---
  {
    id: 'seg-01',
    name: 'Formación de guardias de seguridad',
    code: 'OS10-FORM-01',
    type: 'spd',
    school: 'seguridad',
    category: 'Formación Inicial SPD',
    hours: '90 Horas Cronológicas (2 Semanas • Lun a Sáb)',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Presencial / Semipresencial',
    description: 'Curso oficial exigido por la Ley 21.659. Prepara al alumno en legislación, primeros auxilios, defensa personal y examen ante la Autoridad Fiscalizadora.',
    certificationNote: 'PrevySeg entrega la capacitación preparatoria completa. La credencial oficial SPD es otorgada tras rendir el examen ante Carabineros OS-10.'
  },
  {
    id: 'seg-02',
    name: 'Formación de vigilantes privados',
    code: 'OS10-VIG-02',
    type: 'spd',
    school: 'seguridad',
    category: 'Formación Inicial SPD',
    hours: '100 Horas',
    price: 190000,
    cuota1: 95000,
    cuota2: 95000,
    modality: 'Presencial con Polígono de Tiro',
    description: 'Instrucción especializada para entidades bancarias, transporte de valores y recintos estratégicos con porte de armas regulado.',
    certificationNote: 'Instrucción con tiro práctico y examen ante la Autoridad Fiscalizadora.'
  },
  {
    id: 'seg-03',
    name: 'Formación de guardia de seguridad marítimo portuario',
    code: 'DIR-FORM-03',
    type: 'spd',
    school: 'seguridad',
    category: 'Formación Inicial Directemar',
    hours: '90 Horas',
    price: 130000,
    cuota1: 65000,
    cuota2: 65000,
    modality: 'Presencial / Recintos Portuarios',
    description: 'Resguardo y control de accesos en muelles, terminales marítimos y recintos portuarios bajo Código PBIP y Directemar.',
    certificationNote: 'Acreditación oficial para faenas marítimo-portuarias ante Directemar.'
  },
  {
    id: 'seg-04',
    name: 'Formación para porteros, nocheros, rondines u otro de similar carácter',
    code: 'OS10-PORT-04',
    type: 'spd',
    school: 'seguridad',
    category: 'Formación Inicial SENCE',
    hours: '50 Horas',
    price: 95000,
    cuota1: 47500,
    cuota2: 47500,
    modality: 'Online Asíncrono + Práctico',
    description: 'Control de libro de novedades, rondas nocturnas perimetrales y protocolos de emergencia en condominios y empresas.',
    certificationNote: 'Certificación OTEC PrevySeg con Reconocimiento SENCE.'
  },
  {
    id: 'seg-05',
    name: 'Perfeccionamiento de guardias de seguridad',
    code: 'OS10-PERF-05',
    type: 'spd',
    school: 'seguridad',
    category: 'Perfeccionamiento SPD',
    hours: '36 Horas',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Semipresencial (Reentrenamiento Trienal)',
    description: 'Reentrenamiento obligatorio cada 3 años para renovación de credencial ante la Subsecretaría de Prevención del Delito.',
    certificationNote: 'Preparación para el examen trienal de renovación ante la SPD.'
  },
  {
    id: 'seg-06',
    name: 'Perfeccionamiento de guardia de seguridad marítimo portuario',
    code: 'DIR-PERF-06',
    type: 'spd',
    school: 'seguridad',
    category: 'Perfeccionamiento Directemar',
    hours: '40 Horas',
    price: 100000,
    cuota1: 50000,
    cuota2: 50000,
    modality: 'Presencial / Directemar',
    description: 'Actualización en inspección de naves, contenedores y faenas portuarias bajo normativa PBIP.',
    certificationNote: 'Revalidación oficial ante la Autoridad Marítima Directemar.'
  },
  {
    id: 'seg-07',
    name: 'Perfeccionamiento para porteros, nocheros, rondines u otro de similar carácter',
    code: 'OS10-PPERF-07',
    type: 'spd',
    school: 'seguridad',
    category: 'Perfeccionamiento SENCE',
    hours: '30 Horas',
    price: 75000,
    cuota1: 37500,
    cuota2: 37500,
    modality: 'Online Flexible',
    description: 'Actualización periódica para personal de control y conserjería con foco en emergencias residenciales.',
    certificationNote: 'Certificación Continua OTEC PrevySeg.'
  },
  {
    id: 'seg-08',
    name: 'Técnicas de operación de circuitos cerrados de televisión (CCTV codificado por SENCE)',
    code: 'CCTV-SENCE-08',
    type: 'spd',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    hours: '60 Horas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Online Sincrónico + Software VMS',
    description: 'Operación profesional de software VMS, cámaras domo PTZ, reconocimiento facial y trazabilidad forense para centrales de monitoreo.',
    certificationNote: 'Certificación Oficial SENCE OTEC PrevySeg.'
  },
  {
    id: 'seg-10',
    name: 'Supervisor de seguridad privada',
    code: 'SUP-SPD-10',
    type: 'spd',
    school: 'seguridad',
    category: 'Tecnología y Sistemas de Seguridad',
    hours: '120 Horas',
    price: 180000,
    cuota1: 90000,
    cuota2: 90000,
    modality: '100% Online Aula Virtual',
    description: 'Gestión de turnos, confección de Directivas de Funcionamiento conforme a la Ley 21.659 y liderazgo operativo en terreno.',
    certificationNote: 'Certificación de Competencias de Supervisor OTEC PrevySeg.'
  },

  // --- ESCUELA DE OFICIOS Y HABILIDADES ---
  {
    id: 'of-01',
    name: 'Resolución de conflictos y manejo de situaciones difíciles',
    code: 'OF-CONF-01',
    type: 'oficio',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    hours: '40 Horas Online Asíncrona',
    price: 95000,
    cuota1: 47500,
    cuota2: 47500,
    modality: 'Online Asíncrona (Plataforma 24/7)',
    description: 'Estrategias de negociación, contención emocional, mediación de controversias laborales y resolución constructiva en entornos de trabajo exigentes.',
    certificationNote: 'Certificación Directa OTEC PrevySeg con Código SENCE.'
  },
  {
    id: 'of-02',
    name: 'Técnicas de manejo de resolución de conflictos',
    code: 'OF-CONF-02',
    type: 'oficio',
    school: 'oficios',
    category: 'Desarrollo de Habilidades Laborales',
    hours: '8 Horas Presencial',
    price: 55000,
    cuota1: 27500,
    cuota2: 27500,
    modality: 'Presencial Intensivo en Sede',
    description: 'Taller práctico con dinámicas de rol y simulación para el manejo asertivo del estrés y control de crisis interpersonal.',
    certificationNote: 'Certificado de Taller Práctico Intensivo OTEC PrevySeg.'
  },
  {
    id: 'of-03',
    name: 'Manejo y uso de plaguicidas agrícolas',
    code: 'OF-AGRO-03',
    type: 'oficio',
    school: 'oficios',
    category: 'Área Agropecuaria',
    hours: '40 Horas',
    price: 120000,
    cuota1: 60000,
    cuota2: 60000,
    modality: 'Semipresencial (Teoría + Campo)',
    description: 'Protocolos de dosificación segura, equipos de protección EPP, calibración de pulverizadores y primeros auxilios ante intoxicaciones conforme a norma SAG.',
    certificationNote: 'Certificación Preparatoria para Credencial de Aplicador SAG.'
  },
  {
    id: 'of-04',
    name: 'Operaciones básicas de carga, descarga y protocolos de seguridad en recintos portuarios',
    code: 'OF-PORT-04',
    type: 'oficio',
    school: 'oficios',
    category: 'Área Logística y Operaciones',
    hours: '50 Horas',
    price: 140000,
    cuota1: 70000,
    cuota2: 70000,
    modality: 'Semipresencial con Terreno Portuario',
    description: 'Técnicas de estiba y desestiba, manejo de cargas críticas en muelles, señalética de maniobras y uso seguro de eslingas en recintos portuarios.',
    certificationNote: 'Certificación Laboral OTEC PrevySeg con Respaldo SENCE.'
  },
  {
    id: 'of-05',
    name: 'Procedimientos de higiene, seguridad y prevención de riesgos en procesos de manipulación de alimentos',
    code: 'OF-ALIM-05',
    type: 'oficio',
    school: 'oficios',
    category: 'Área Alimentación',
    hours: '40 Horas',
    price: 85000,
    cuota1: 42500,
    cuota2: 42500,
    modality: 'Online + Taller Higiénico',
    description: 'Buenas Prácticas de Manufactura (BPM), control de puntos críticos (HACCP), inocuidad y desinfección conforme a la Seremi de Salud.',
    certificationNote: 'Certificación Oficial para Carnet de Manipulador de Alimentos.'
  },
  {
    id: 'of-06',
    name: 'Técnicas de depilación con cera miel',
    code: 'OF-EST-06',
    type: 'oficio',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    hours: '30 Horas Prácticas',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Presencial en Taller Estético',
    description: 'Anatomía folicular, temperatura adecuada de cera miel natural, extracción sin dolor, asepsia profesional y cuidados post-depilatorios.',
    certificationNote: 'Diploma de Competencia Práctica OTEC PrevySeg.'
  },
  {
    id: 'of-07',
    name: 'Técnicas de manicure',
    code: 'OF-EST-07',
    type: 'oficio',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    hours: '35 Horas Prácticas',
    price: 95000,
    cuota1: 47500,
    cuota2: 47500,
    modality: 'Presencial en Taller Estético',
    description: 'Manicure rusa y tradicional, limado anatómico, esmaltado semipermanente UV/LED, cuidado de la uña natural y diseños en tendencia.',
    certificationNote: 'Diploma de Competencia Práctica OTEC PrevySeg.'
  },
  {
    id: 'of-08',
    name: 'Técnicas de maquillaje carnaval',
    code: 'OF-EST-08',
    type: 'oficio',
    school: 'oficios',
    category: 'Área Estética y Servicios',
    hours: '30 Horas Prácticas',
    price: 90000,
    cuota1: 45000,
    cuota2: 45000,
    modality: 'Presencial Especializado',
    description: 'Técnicas de maquillaje artístico resistente a sudor y clima, aplicación de pedrería, glitter y pigmentos para bailarines de carnavales.',
    certificationNote: 'Diploma de Competencia Práctica OTEC PrevySeg.'
  },
  {
    id: 'of-09',
    name: 'Cuidado adulto mayor y personas postradas',
    code: 'OF-SALUD-09',
    type: 'oficio',
    school: 'oficios',
    category: 'Área de Salud',
    hours: '60 Horas Teórico-Prácticas',
    price: 130000,
    cuota1: 65000,
    cuota2: 65000,
    modality: 'Semipresencial con Prácticas Asistidas',
    description: 'Movilización de personas postradas, prevención de úlceras por decúbito, aseo en cama, control de signos vitales y administración asistida de medicamentos.',
    certificationNote: 'Certificación Asistencial OTEC PrevySeg con Respaldo SENCE.'
  },
  {
    id: 'of-10',
    name: 'Cajero bancario, administración de condominios',
    code: 'OF-ADM-10',
    type: 'oficio',
    school: 'oficios',
    category: 'Área de Administración',
    hours: '50 Horas',
    price: 110000,
    cuota1: 55000,
    cuota2: 55000,
    modality: 'Online Sincrónico + Simulador',
    description: 'Detección de billetes falsos, cuadratura diaria de caja, gestión de gastos comunes y administración bajo la Nueva Ley de Copropiedad Inmobiliaria.',
    certificationNote: 'Certificación OTEC PrevySeg de Cajero y Administrador.'
  }
];

// 10 Documentos Oficiales de la Ficha física
export const OFFICIAL_DOCUMENTS = [
  { id: 1, name: 'FOTOCOPIA CI (AMBOS LADOS)', detail: 'Copia legible y vigente de cédula por ambos lados.', requiredFor: 'todos' },
  { id: 2, name: 'CERT. ANTECEDENTES FINES ESPECIALES', detail: 'Emitido en línea con ClaveÚnica (Registro Civil) con menos de 30 días.', requiredFor: 'spd' },
  { id: 3, name: 'CERTIFICADO ESTUDIO 4° MEDIO (MINEDUC) / CERTIFICADO OS-10', detail: 'Licencia de Enseñanza Media con código QR o certificado previo.', requiredFor: 'todos' },
  { id: 4, name: 'CERTIFICADO MÉDICO', detail: 'Aptitud física compatible para el curso emitida por médico cirujano.', requiredFor: 'todos' },
  { id: 5, name: 'CERTIFICADO PSICOLÓGICO O PSIQUIATRA', detail: 'Informe de idoneidad y estabilidad mental (exigido para seguridad).', requiredFor: 'spd' },
  { id: 6, name: 'SITUACIÓN MILITAR AL DÍA (SI CORRESPONDE)', detail: 'Certificado emitido por la DGMN (para varones menores de 45 años).', requiredFor: 'spd' },
  { id: 7, name: 'CERTIFICADO O COMPROBANTE DE RESIDENCIA DEFINITIVA SI ES EXTRANJERO', detail: 'Permanencia definitiva otorgada por SERMIG.', requiredFor: 'extranjero' },
  { id: 8, name: 'DECLARACIÓN JURADA SIMPLE LEY 21.659', detail: 'Formato unificado oficial de 1 sola hoja PrevySeg.', requiredFor: 'spd' },
  { id: 9, name: 'CERTIFICADO VIGENCIA GGSS (REENTRENAMIENTO)', detail: 'Acreditar vigencia previa en cursos de perfeccionamiento.', requiredFor: 'perf' },
  { id: 10, name: 'CONTRATO DE TRABAJO Y SEGURO DE VIDA (SOLO EN CASO DE EMPRESA)', detail: 'Requerido exclusivamente si la postulación es financiada por empresa.', requiredFor: 'empresa' }
];

// Funciones de Normalización y Búsqueda Robusta de Cursos
export const normalizeCourseName = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
};

export const findMatchingCourse = (query) => {
  if (!query) return OFFICIAL_COURSES[0];
  
  // 1. Por ID directo
  const byId = OFFICIAL_COURSES.find(c => c.id === query);
  if (byId) return byId;

  const targetNorm = normalizeCourseName(query);
  if (!targetNorm) return OFFICIAL_COURSES[0];

  // 2. Por coincidencia exacta normalizada
  const exactNorm = OFFICIAL_COURSES.find(c => normalizeCourseName(c.name) === targetNorm);
  if (exactNorm) return exactNorm;

  // 3. Por subcadena
  const subMatch = OFFICIAL_COURSES.find(c => {
    const cNorm = normalizeCourseName(c.name);
    return cNorm.includes(targetNorm) || targetNorm.includes(cNorm);
  });
  if (subMatch) return subMatch;

  // 4. Por palabras clave relevantes (longitud >= 4 caracteres)
  const words = query
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(w => w.length >= 4);

  if (words.length > 0) {
    let bestMatch = null;
    let maxMatches = 0;
    for (const c of OFFICIAL_COURSES) {
      const cLower = c.name
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
      const matchCount = words.filter(w => cLower.includes(w)).length;
      if (matchCount > maxMatches) {
        maxMatches = matchCount;
        bestMatch = c;
      }
    }
    if (bestMatch && maxMatches > 0) {
      return bestMatch;
    }
  }

  return OFFICIAL_COURSES[0];
};

const EnrollmentForm = ({ defaultCourseName = '', onFinished, onOpenPlatform }) => {
  // 1. Selector de Curso con sincronización reactiva
  const [selectedCourseId, setSelectedCourseId] = useState(() => {
    return findMatchingCourse(defaultCourseName).id;
  });
  const [isChangingCourse, setIsChangingCourse] = useState(false);

  // Sincronizar reactivamente cuando defaultCourseName cambie desde fuera
  useEffect(() => {
    if (defaultCourseName) {
      const matched = findMatchingCourse(defaultCourseName);
      if (matched) {
        setSelectedCourseId(matched.id);
        setIsChangingCourse(false);
      }
    }
  }, [defaultCourseName]);

  // Sincronizar con cursos guardados y editados desde administración
  const [customCourses, setCustomCourses] = useState(() => getSavedCourses());

  useEffect(() => {
    const handleCoursesUpdated = () => {
      setCustomCourses(getSavedCourses());
    };
    window.addEventListener('prevyseg-courses-updated', handleCoursesUpdated);
    return () => window.removeEventListener('prevyseg-courses-updated', handleCoursesUpdated);
  }, []);

  // Obtener curso actual con modalidades reactivas (Presencial y/o Virtual)
  const baseCourse = OFFICIAL_COURSES.find(c => c.id === selectedCourseId) || OFFICIAL_COURSES[0];
  const customCourseMatch = customCourses.find(c => c.id === selectedCourseId || c.title === baseCourse.name);
  const courseModalities = getCourseModalities(customCourseMatch || baseCourse);
  const currentCourse = {
    ...baseCourse,
    permitePresencial: courseModalities.permitePresencial,
    permiteVirtual: courseModalities.permiteVirtual,
    disponible: customCourseMatch ? customCourseMatch.disponible : baseCourse.disponible,
    proximamente: customCourseMatch ? Boolean(customCourseMatch.proximamente) : false,
  };
  const isSpdCourse = currentCourse.school === 'seguridad';
  const courseFullName = currentCourse.name;

  // 2. Datos del Alumno (Alumno Dependiente) y Cuenta de Acceso
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    fechaNacimiento: '',
    pais: 'Chile',
    region: 'Región de Arica y Parinacota (XV)',
    ciudad: 'Arica',
    modalidadPreferencia: 'presencial_virtual', // 'presencial_virtual' | 'virtual_total'
    telefono: '',
    domicilio: '',
    email: '',
    password: '',
    confirmPassword: '',
    lugarTrabajo: 'Particular',
    condicionLaboral: 'particular', // 'particular' | 'empresa'
    empresaNombre: '',
    observaciones: ''
  });

  const [otherCityName, setOtherCityName] = useState('');

  // Ciudad efectiva (si seleccionó 'OTRA', usamos lo que escribió)
  const effectiveCity = formData.ciudad === 'OTRA' ? (otherCityName.trim() || 'Otra Localidad') : formData.ciudad;

  // Detección automática de procedencia: Arica (presencial/virtual) vs Otras Regiones (100% virtual)
  const isFromArica = React.useMemo(() => {
    const reg = (formData.region || '').toLowerCase();
    const ciu = (effectiveCity || '').toLowerCase();
    const dom = (formData.domicilio || '').toLowerCase();
    return reg.includes('arica') || ciu.includes('arica') || ciu.includes('azapa') || ciu.includes('lluta') || dom.includes('arica') || ciu.includes('parinacota');
  }, [formData.region, effectiveCity, formData.domicilio]);

  // Modalidad calculada en base a las modalidades configuradas por el admin y la procedencia del estudiante
  const computedModality = React.useMemo(() => {
    const { permitePresencial, permiteVirtual } = currentCourse;

    // 1. Exclusivo Presencial
    if (permitePresencial && !permiteVirtual) {
      return isFromArica
        ? 'Presencial (Sede Central Arica Blanco Encalada 666)'
        : 'Presencial (Requiere asistencia presencial en Sede Central Arica)';
    }

    // 2. Exclusivo Virtual
    if (!permitePresencial && permiteVirtual) {
      return '100% Virtual Online (Aula Virtual 24/7 y Clases Zoom)';
    }

    // 3. Ambas modalidades habilitadas (Presencial y Virtual)
    if (isFromArica) {
      return formData.modalidadPreferencia === 'virtual_total'
        ? '100% Virtual Online (Opción a Distancia Arica)'
        : 'Presencial y Virtual (Sede Central Arica Blanco Encalada 666)';
    }
    return `Totalmente Virtual (100% Online - Clases Sincrónicas Zoom)`;
  }, [currentCourse.permitePresencial, currentCourse.permiteVirtual, isFromArica, formData.modalidadPreferencia]);

  // Estados de contraseña
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showCreatedPasswordInSuccess, setShowCreatedPasswordInSuccess] = useState(false);

  // 3. Abonos y Pagos
  const [paymentOption, setPaymentOption] = useState('cuota1'); // 'cuota1' (50%) | 'total' (100%)
  const [paymentMethod, setPaymentMethod] = useState('tarjeta'); // 'tarjeta' | 'transferencia' | 'efectivo'
  
  // Tarjetas
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardName: '',
    cardExpiry: '12/28',
    cardCvv: '•••'
  });

  // Estados de proceso
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [enrollmentCode, setEnrollmentCode] = useState('');
  const [showSuccessScreen, setShowSuccessScreen] = useState(false);
  const [singleCourseError, setSingleCourseError] = useState(null);
  const [registeredSchool, setRegisteredSchool] = useState('seguridad');
  
  // Cálculo de montos
  const totalAmount = currentCourse.price;
  const cuota1Amount = currentCourse.cuota1; // 50%
  const cuota2Amount = currentCourse.cuota2; // 50%
  const amountToPayNow = paymentOption === 'cuota1' ? cuota1Amount : totalAmount;
  const pendingAmount = paymentOption === 'cuota1' ? cuota2Amount : 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'rut') {
      setSingleCourseError(null);
      setFormData(prev => ({ ...prev, rut: formatRut(value) }));
    } else if (name === 'password' || name === 'confirmPassword') {
      setPasswordError('');
      setFormData(prev => ({ ...prev, [name]: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleProcessEnrollmentAndPayment = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSingleCourseError(null);
    setPasswordError('');

    // Validar contraseña para la cuenta del aula virtual
    if (!formData.password || formData.password.trim().length < 4) {
      setPasswordError('Por favor define una contraseña de al menos 4 caracteres para tu cuenta del aula virtual.');
      setIsSubmitting(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Las contraseñas ingresadas no coinciden. Por favor verifícalas antes de continuar.');
      setIsSubmitting(false);
      return;
    }

    const generatedCode = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    setEnrollmentCode(generatedCode);

    try {
      if (formData.rut && formData.rut.trim()) {
        const cleanR = cleanRut(formData.rut);
        const formattedRut = formatRut(cleanR) || formData.rut.trim();

        // 1. Determinar escuela de destino (oficios o seguridad)
        const targetSchool = currentCourse.school === 'oficios' ? 'oficios' : 'seguridad';
        setRegisteredSchool(targetSchool);

        // 2. Procesar registro de usuario y matrícula en la base de datos de forma atómica en PostgreSQL
        const fullAddress = `${formData.domicilio.trim() || 'Dirección Particular'}, ${effectiveCity}, ${formData.region}, Chile`;
        const result = await processEnrollmentRegistration({
          rut: formattedRut,
          nombre: formData.nombre.trim() || 'Postulante PrevySeg',
          email: formData.email.trim(),
          telefono: formData.telefono.trim(),
          domicilio: fullAddress,
          password: formData.password.trim(),
          courseId: currentCourse.id,
          courseName: currentCourse.name,
          modalidad: computedModality,
          horas: currentCourse.hours,
          totalAmount,
          cuota50: amountToPayNow,
          school: targetSchool,
        });

        if (result?.school) {
          setRegisteredSchool(result.school);
        }

        // Si el curso es CCTV, registrar automáticamente la solicitud de visto bueno en PostgreSQL
        if (isCctvSpecialCourse(currentCourse)) {
          try {
            await requestCctvApproval({
              userId: result?.user_id || null,
              rut: formattedRut,
              nombre: formData.nombre.trim(),
              email: formData.email.trim(),
              telefono: formData.telefono.trim(),
              notas: 'Matrícula web completada. Pendiente de evaluación y visto bueno en Gestión de Cursos CCTV.'
            });
          } catch (cctvErr) {
            console.warn('Aviso: Registro de solicitud CCTV:', cctvErr);
          }
        }
      }

      setIsSubmitting(false);
      setPaymentCompleted(true);
      setShowSuccessScreen(true);
    } catch (err) {
      console.error('Enrollment registration error:', err);
      setIsSubmitting(false);

      if (err.message && (err.message.includes('matrícula activa') || err.message.includes('solo puede pertenecer a un curso'))) {
        setSingleCourseError({
          rut: formData.rut,
          courseName: 'Curso Previamente Asignado',
          schoolName: currentCourse.school === 'oficios' ? 'Escuela de Seguridad' : 'Escuela de Oficios'
        });
      } else {
        setPasswordError(err.message || 'Error al guardar la matrícula en la base de datos. Por favor intenta nuevamente.');
      }
      return;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Construir mensaje directo a WhatsApp Oficial de PrevySeg
  const whatsappNumber = "56982312128"; // Contacto oficial de Admisión

  const whatsappMessage = encodeURIComponent(
    `*📋 NUEVA FICHA DE INSCRIPCIÓN - PREVYSEG OTEC*\n` +
    `*N° Solicitud:* ${enrollmentCode || 'PS-DIGITAL'}\n` +
    `----------------------------------------\n` +
    `*🎓 CURSO:* ${courseFullName}\n` +
    `*Escuela:* ${currentCourse.school === 'seguridad' ? 'Escuela de Seguridad Privada' : 'Escuela de Oficios y Habilidades'}\n` +
    `*Modalidad Asignada:* ${computedModality}\n` +
    `*Duración:* ${currentCourse.hours}\n` +
    `*Tipo Certificación:* ${isSpdCourse ? 'Capacitación Preparatoria Examen SPD' : 'Certificación Directa OTEC PrevySeg'}\n\n` +
    `*👤 DATOS DEL ALUMNO Y CUENTA:*\n` +
    `• *Nombre:* ${formData.nombre || 'No especificado'}\n` +
    `• *RUT (Usuario de Aula):* ${formData.rut || 'No especificado'}\n` +
    `• *Ciudad / Región:* ${effectiveCity}, ${formData.region}\n` +
    `• *Domicilio:* ${formData.domicilio || 'No especificado'}\n` +
    `• *Teléfono:* ${formData.telefono || 'No especificado'}\n` +
    `• *Correo:* ${formData.email || 'No especificado'}\n` +
    `• *Condición:* ${formData.condicionLaboral === 'particular' ? 'Particular' : `Empresa: ${formData.empresaNombre}`}\n\n` +
    `*💳 PLAN DE ABONO (50%):*\n` +
    `• *Valor Total:* $${totalAmount.toLocaleString('es-CL')} CLP\n` +
    `• *Abono Inicial (Cuota N°1):* $${cuota1Amount.toLocaleString('es-CL')} CLP\n` +
    `• *Saldo al Inicio (Cuota N°2):* $${cuota2Amount.toLocaleString('es-CL')} CLP\n` +
    `• *Opción Elegida:* ${paymentOption === 'cuota1' ? 'Abono 50% ($' + cuota1Amount.toLocaleString('es-CL') + ')' : 'Pago Total 100%'}\n` +
    `• *Medio de Pago:* ${paymentMethod.toUpperCase()}\n` +
    `• *Estado Abono:* ${paymentCompleted ? 'ABONO CONFIRMADO ONLINE ✓' : 'PENDIENTE DE CONFIRMACIÓN'}\n` +
    `----------------------------------------\n` +
    `👋 *¡Hola equipo de Admisiones PrevySeg!* He completado mi Ficha de Inscripción online. Deseo coordinar la entrega y validación de mis documentos vía WhatsApp.`
  );

  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${whatsappMessage}`;

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden print:bg-white print:text-black print:border-none print:shadow-none">
      
      {/* ================= PANTALLA DE ÉXITO TRAS ABONAR ================= */}
      <AnimatePresence>
        {showSuccessScreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-8 sm:p-12 text-center space-y-6 bg-gradient-to-b from-sky-50 via-white to-slate-50"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto border-2 border-emerald-300 shadow-lg">
              <CheckCircle2 size={44} className="animate-bounce" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="inline-block bg-teal-50 text-teal-800 text-xs font-black uppercase px-3 py-1 rounded-full border border-teal-200 tracking-wider">
                Ficha de Inscripción Registrada
              </span>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                ¡Inscripción y Abono del 50% Registrado!
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Tu postulación para <strong className="text-slate-900">{courseFullName}</strong> ha sido reservada con éxito con el código <strong className="text-[#0284c7] font-mono">{enrollmentCode}</strong>.
              </p>
            </div>

            {/* Resumen del Pago / Abono & Escuela Asignada */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 max-w-lg mx-auto text-left text-xs sm:text-sm space-y-3 font-mono text-slate-800 shadow-sm">
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Alumno:</span>
                <span className="font-bold text-slate-900">{formData.nombre || 'Postulante'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">RUT:</span>
                <span className="font-bold text-slate-900">{formData.rut || 'No informado'}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Ciudad y Región:</span>
                <span className="font-bold text-slate-900">{effectiveCity}, {formData.region}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Modalidad Asignada:</span>
                <span className="font-black text-emerald-800 text-xs text-right">
                  {computedModality}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Escuela Asignada:</span>
                <span className="font-black text-slate-900">
                  {registeredSchool === 'seguridad' ? '🛡️ Escuela de Seguridad (escuela_seguridad)' : '⚙️ Escuela de Oficios (escuela_oficio)'}
                </span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-2">
                <span className="text-slate-500">Abono Realizado (Cuota N°1):</span>
                <span className="font-black text-[#0284c7] text-base">${amountToPayNow.toLocaleString('es-CL')} CLP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Saldo Pendiente (Cuota N°2 al iniciar):</span>
                <span className="font-bold text-amber-700">${pendingAmount.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            {/* CREDENCIALES DE ACCESO AL AULA VIRTUAL */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 border-2 border-sky-400 text-white max-w-lg mx-auto text-left space-y-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-sky-800/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-400/30">
                    <Lock size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-sky-300 tracking-wider block">Cuenta Creada con Éxito</span>
                    <h4 className="text-sm sm:text-base font-black text-white">Tus Credenciales de Aula Virtual</h4>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/40">
                  Activa ✓
                </span>
              </div>

              <div className="space-y-2.5 text-xs font-mono">
                <div className="flex items-center justify-between bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400">Usuario (RUT):</span>
                  <span className="text-sky-300 font-bold text-sm">{formData.rut || 'RUT Registrado'}</span>
                </div>
                <div className="flex items-center justify-between bg-slate-800/90 p-3 rounded-xl border border-slate-700">
                  <span className="text-slate-400">Contraseña:</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-300 font-bold text-sm">
                      {showCreatedPasswordInSuccess ? (formData.password || cleanRut(formData.rut)) : '••••••••'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setShowCreatedPasswordInSuccess(prev => !prev)}
                      className="text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
                      title={showCreatedPasswordInSuccess ? 'Ocultar contraseña' : 'Ver contraseña'}
                    >
                      {showCreatedPasswordInSuccess ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Tus datos han quedado vinculados. Puedes usar este botón para ir directo a la <strong>Plataforma Virtual</strong> con tu usuario y contraseña.
              </p>

              <button
                type="button"
                onClick={() => {
                  if (onOpenPlatform) {
                    onOpenPlatform({ rut: formData.rut });
                  } else {
                    window.dispatchEvent(new CustomEvent('open-platform-login', { detail: { rut: formData.rut } }));
                  }
                  if (onFinished) onFinished();
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-sky-500 via-[#0284c7] to-[#00c2b2] hover:from-sky-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
              >
                <LogIn size={16} />
                <span>Ingresar a la Plataforma Virtual Ahora</span>
              </button>
            </div>

            {/* AVISO IMPORTANTE DE CONTACTO POR WHATSAPP */}
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 max-w-2xl mx-auto text-left space-y-3 shadow-md">
              <div className="flex items-center gap-2.5 text-emerald-900 font-extrabold text-sm sm:text-base">
                <Phone size={22} className="text-emerald-600 flex-shrink-0 animate-pulse" />
                <span>RECEPCIÓN Y VALIDACIÓN DE DOCUMENTOS POR WHATSAPP</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                ¡Ya estás registrado! Nuestro equipo de admisiones de <strong className="text-slate-900">PrevySeg</strong> se pondrá en contacto contigo a través de <strong>WhatsApp (+56 9 8231 2128)</strong> para solicitarte y validar las fotografías o PDFs de tus documentos obligatorios (Cédula de Identidad, Certificado de Antecedentes, etc.).
              </p>
              <div className="pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
                >
                  <Send size={16} />
                  <span>Enviar Comprobante y Documentos por WhatsApp Ahora</span>
                </a>
              </div>
            </div>

            {/* Acciones Secundarias */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={handlePrint}
                className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
              >
                <Printer size={15} className="text-[#0284c7]" />
                <span>Imprimir / Descargar Comprobante PDF</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowSuccessScreen(false);
                  if (onFinished) onFinished();
                }}
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                Cerrar o Volver
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FORMULARIO COMPLETO ================= */}
      {!showSuccessScreen && (
        <form onSubmit={handleProcessEnrollmentAndPayment} className="p-6 sm:p-10 space-y-10">
          
          {/* 1. ENCABEZADO INSTITUCIONAL OFICIAL */}
          <div className="border-b border-slate-200 pb-6 space-y-4">
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0284c7] via-sky-500 to-[#00c2b2] flex items-center justify-center text-white font-black text-3xl shadow-lg">
                  PS
                </div>
                <div>
                  <span className="text-[11px] font-black uppercase text-[#0284c7] tracking-widest block">
                    FICHA DE INSCRIPCIÓN OFICIAL
                  </span>
                  <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    PrevySeg
                  </h1>
                  <p className="text-xs text-slate-500">
                    Organismos Técnicos de Capacitación • Acreditación SENCE N° 1238088725
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 flex items-center gap-2 cursor-pointer transition-all shadow-sm"
                  title="Imprimir Ficha Oficial"
                >
                  <Printer size={14} className="text-[#0284c7]" />
                  <span className="hidden sm:inline">Imprimir Ficha PDF</span>
                </button>
                <span className="text-[11px] font-mono text-[#0284c7] bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 font-bold">
                  Abono 50% Online
                </span>
              </div>
            </div>

            {/* Datos de contacto de la sede física */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-slate-100/70 p-4 rounded-xl border border-slate-200 text-slate-700">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-[#0284c7] flex-shrink-0" />
                <span><strong>Dir:</strong> Blanco Encalada N°666, 2do Piso, Arica</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#0284c7] flex-shrink-0" />
                <span><strong>Fijo / Cel:</strong> 222166822 • 982312128 • 978691869</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-amber-600 flex-shrink-0" />
                <span><strong>Mail:</strong> prevyseg.capacitaciones@gmail.com</span>
              </div>
            </div>
          </div>

          {/* ================= 1.- CURSO SELECCIONADO PARA POSTULACIÓN ================= */}
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black border ${
                  currentCourse.school === 'seguridad'
                    ? 'bg-sky-50 text-[#0284c7] border-sky-200'
                    : 'bg-emerald-50 text-[#00A896] border-emerald-200'
                }`}>
                  1
                </span>
                <span>1.- CURSO SELECCIONADO PARA POSTULACIÓN</span>
              </h2>

              <button
                type="button"
                onClick={() => setIsChangingCourse(!isChangingCourse)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
              >
                <span>{isChangingCourse ? 'Cerrar selector' : 'Cambiar de curso'}</span>
                <ChevronDown size={14} className={`transition-transform duration-200 ${isChangingCourse ? 'rotate-180' : ''}`} />
              </button>
            </div>

            {/* Selector desplegable alternativo (Solo si el usuario presiona 'Cambiar de curso') */}
            <AnimatePresence>
              {isChangingCourse && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="p-4 rounded-2xl bg-slate-100 border border-slate-300 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">
                      Selecciona otro programa de capacitación si deseas cambiar tu postulación:
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">20 Programas Oficiales</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-[10px] font-black text-sky-800 uppercase tracking-wider block mb-1">
                        🛡️ Escuela de Seguridad Privada (SPD / OS-10)
                      </span>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => {
                          setSelectedCourseId(e.target.value);
                          setIsChangingCourse(false);
                        }}
                        className="w-full bg-white border border-sky-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {OFFICIAL_COURSES.filter(c => c.school === 'seguridad').map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} — ${c.price.toLocaleString('es-CL')}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block mb-1">
                        ⚙️ Escuela de Oficios y Habilidades (SENCE)
                      </span>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => {
                          setSelectedCourseId(e.target.value);
                          setIsChangingCourse(false);
                        }}
                        className="w-full bg-white border border-emerald-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      >
                        {OFFICIAL_COURSES.filter(c => c.school === 'oficios').map(c => (
                          <option key={c.id} value={c.id}>
                            {c.name} — ${c.price.toLocaleString('es-CL')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Tarjeta Destacada del Curso Seleccionado (Limpia y Compacta) */}
            <div className={`p-5 sm:p-6 rounded-2xl border transition-all ${
              currentCourse.school === 'seguridad'
                ? 'bg-gradient-to-br from-sky-50/80 via-white to-blue-50/40 border-sky-300/90 shadow-lg shadow-sky-500/5'
                : 'bg-gradient-to-br from-emerald-50/80 via-white to-teal-50/40 border-emerald-300/90 shadow-lg shadow-emerald-500/5'
            }`}>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider ${
                      currentCourse.school === 'seguridad'
                        ? 'bg-[#071626] text-[#00C4D8] border border-[#0A7D8C]/50'
                        : 'bg-[#071626] text-[#00FFE0] border border-[#00A896]/50'
                    }`}>
                      {currentCourse.school === 'seguridad' ? '🛡️ Escuela de Seguridad Privada' : '⚙️ Escuela de Oficios y SENCE'}
                    </span>
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {currentCourse.category}
                    </span>
                    {currentCourse.permitePresencial && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <Building2 size={12} className="text-emerald-700" />
                        <span>Presencial</span>
                      </span>
                    )}
                    {currentCourse.permiteVirtual && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 border border-sky-300">
                        <Laptop size={12} className="text-[#0284c7]" />
                        <span>Virtual</span>
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-slate-600 bg-slate-100/90 px-2.5 py-0.5 rounded-md border border-slate-200">
                      {currentCourse.modality} • {currentCourse.hours}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
                    {currentCourse.name}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {currentCourse.description}
                  </p>

                  {currentCourse.certificationNote && (
                    <div className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5 pt-1">
                      <Award size={14} className={currentCourse.school === 'seguridad' ? 'text-[#0284c7]' : 'text-[#00A896]'} />
                      <span>{currentCourse.certificationNote}</span>
                    </div>
                  )}
                </div>

                {/* Arancel Oficial Total y Abono 50% */}
                <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm min-w-[220px]">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Arancel Oficial Total:</span>
                    <span className="text-lg sm:text-xl font-black text-slate-900 font-mono">
                      ${currentCourse.price.toLocaleString('es-CL')} CLP
                    </span>
                  </div>
                  <div className={`px-3.5 py-1.5 rounded-xl border font-mono text-xs font-black flex items-center gap-1.5 ${
                    currentCourse.school === 'seguridad'
                      ? 'bg-sky-50 text-[#0284c7] border-sky-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    <span className="text-[10px] font-bold uppercase">Abono 50%:</span>
                    <span>${currentCourse.cuota1.toLocaleString('es-CL')} CLP</span>
                  </div>
                </div>
              </div>

              {/* Cuadro Normativo Acreditación */}
              <div className="mt-4 pt-3 border-t border-slate-200">
                {isSpdCourse ? (
                  <div className="flex items-start gap-2 text-[11px] text-sky-900 bg-sky-50/70 p-2.5 rounded-xl border border-sky-200">
                    <ShieldCheck size={16} className="text-[#0284c7] flex-shrink-0 mt-0.5" />
                    <span><strong>Acreditación SPD:</strong> PrevySeg imparte la instrucción preparatoria completa. La credencial oficial SPD es otorgada tras rendir el examen reglamentario ante la Autoridad Fiscalizadora.</span>
                  </div>
                ) : (
                  <div className="flex items-start gap-2 text-[11px] text-emerald-900 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-200">
                    <Award size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Certificación Directa PrevySeg OTEC:</strong> Incluye Diploma Oficial con código de verificación SENCE y validación curricular nacional bajo Norma NCh 2728:2015.</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ================= 2.- ALUMNO DEPENDIENTE (DATOS PERSONALES) ================= */}
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  2
                </span>
                <span>2.- ALUMNO DEPENDIENTE (DATOS PERSONALES)</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Ficha física Sección 2</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              
              {/* Nombre Completo */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <User size={14} className="text-[#0284c7]" />
                  <span>NOMBRE COMPLETO *</span>
                </label>
                <input
                  type="text"
                  required
                  name="nombre"
                  placeholder="Ej. MARCO FRANCISCO NAHUELQUEO AILLAPÁN"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* RUT / Documento */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">RUT / DOCUMENTO *</label>
                <input
                  type="text"
                  required
                  name="rut"
                  placeholder="Ej. 18.643.817-5"
                  value={formData.rut}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* Alerta si el estudiante ya pertenece a un curso activo */}
              {singleCourseError && (
                <div className="sm:col-span-2 lg:col-span-3 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-xs text-amber-950 space-y-2 animate-pulse">
                  <div className="flex items-center gap-2 font-black text-amber-900 text-sm">
                    <BadgeAlert size={20} className="text-amber-600 flex-shrink-0" />
                    <span>ALUMNO YA MATRICULADO (REGLA INSTITUCIONAL: 1 CURSO POR ESTUDIANTE)</span>
                  </div>
                  <p className="leading-relaxed">
                    El RUT <strong>{singleCourseError.rut}</strong> ya cuenta con una matrícula activa en el curso: <strong className="text-slate-900 underline">{singleCourseError.courseName}</strong> ({singleCourseError.schoolName}).
                  </p>
                  <p className="text-slate-600 text-[11px]">
                    En PrevySeg cada estudiante pertenece a un único curso a la vez para asegurar una formación rigurosa y su certificación oficial. Puedes acceder directamente a tu aula virtual para continuar tus clases o contactar a coordinación académica si requieres un cambio de programa.
                  </p>
                </div>
              )}

              {/* Fecha de Nacimiento */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#0284c7]" />
                  <span>FECHA DE NACIMIENTO *</span>
                </label>
                <input
                  type="date"
                  required
                  name="fechaNacimiento"
                  value={formData.fechaNacimiento}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* País de Nacimiento */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">PAÍS DE NACIMIENTO *</label>
                <input
                  type="text"
                  required
                  name="pais"
                  placeholder="Chile / Perú / Bolivia / Colombia / etc."
                  value={formData.pais}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* Teléfono / WhatsApp */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Phone size={14} className="text-emerald-600" />
                  <span>TELÉFONO / WHATSAPP *</span>
                </label>
                <input
                  type="tel"
                  required
                  name="telefono"
                  placeholder="Ej. 990640464"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Correo Electrónico */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Mail size={14} className="text-[#0284c7]" />
                  <span>CORREO ELECTRÓNICO *</span>
                </label>
                <input
                  type="email"
                  required
                  name="email"
                  placeholder="nahuelqueo.marco@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* Región de Residencia (100% Seleccionable) */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin size={14} className="text-rose-500" />
                    <span>REGIÓN DE RESIDENCIA *</span>
                  </span>
                  <span className="text-[10px] bg-sky-50 text-[#0284c7] font-black px-2 py-0.5 rounded-md border border-sky-200">
                    16 Regiones
                  </span>
                </label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={(e) => {
                    const selRegion = REGIONES_CHILE.find(r => r.name === e.target.value);
                    const newCity = selRegion?.cities[0] || 'Arica';
                    setFormData(prev => ({
                      ...prev,
                      region: e.target.value,
                      ciudad: newCity
                    }));
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer font-medium"
                >
                  {REGIONES_CHILE.map(r => (
                    <option key={r.id} value={r.name}>{r.name}</option>
                  ))}
                </select>
              </div>

              {/* Ciudad / Comuna (100% Seleccionable) */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Building2 size={14} className="text-[#0284c7]" />
                    <span>CIUDAD / COMUNA *</span>
                  </span>
                  <span className="text-[10px] bg-emerald-50 text-emerald-700 font-black px-2 py-0.5 rounded-md border border-emerald-200">
                    Seleccionable
                  </span>
                </label>
                <select
                  name="ciudad"
                  value={formData.ciudad}
                  onChange={(e) => setFormData(prev => ({ ...prev, ciudad: e.target.value }))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer font-medium"
                >
                  {(REGIONES_CHILE.find(r => r.name === formData.region)?.cities || ['Arica']).map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="OTRA">➕ Otra ciudad, pueblo o localidad...</option>
                </select>

                {formData.ciudad === 'OTRA' && (
                  <input
                    type="text"
                    required
                    placeholder="Escribe el nombre de tu ciudad o pueblo..."
                    value={otherCityName}
                    onChange={(e) => setOtherCityName(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 mt-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                )}
              </div>

              {/* Domicilio Completo (Calle y Número) */}
              <div className="space-y-1.5 sm:col-span-2 lg:col-span-3">
                <label className="font-bold text-slate-700 flex items-center gap-1.5">
                  <MapPin size={14} className="text-slate-400" />
                  <span>DOMICILIO COMPLETO (CALLE, NÚMERO, DEPTO / POBLACIÓN) *</span>
                </label>
                <input
                  type="text"
                  required
                  name="domicilio"
                  placeholder="Ej. Av. Robinson Rojas #4616, Población Cardenal Silva Henríquez"
                  value={formData.domicilio}
                  onChange={handleInputChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              {/* BANNER DINÁMICO DE MODALIDAD SEGÚN UBICACIÓN GEOGRÁFICA Y CONFIGURACIÓN DEL CURSO */}
              <div className="sm:col-span-2 lg:col-span-3">
                {currentCourse.permitePresencial && !currentCourse.permiteVirtual ? (
                  // Caso 1: Curso Exclusivamente Presencial
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border-2 border-emerald-300 shadow-xs space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">
                            ✓ Modalidad Exclusiva del Curso
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-emerald-950">
                            Modalidad Asignada: 100% Presencial
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-xs self-start sm:self-auto">
                        Sede Central Arica
                      </span>
                    </div>
                    <p className="text-xs text-emerald-900 leading-relaxed">
                      Este curso cuenta con instrucción práctica en terreno y se imparte exclusivamente en nuestra <strong>Sede Central PrevySeg</strong> (Blanco Encalada N°666, 2do Piso, Arica). {!isFromArica && (
                        <span className="font-semibold text-amber-900 block mt-1">
                          Nota: Al encontrarte registrado en {effectiveCity} ({formData.region}), recuerda que este programa requiere tu asistencia física a las clases en Arica.
                        </span>
                      )}
                    </p>
                  </div>
                ) : !currentCourse.permitePresencial && currentCourse.permiteVirtual ? (
                  // Caso 2: Curso Exclusivamente Virtual
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/70 to-indigo-50 border-2 border-sky-300 shadow-xs space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-black flex-shrink-0">
                          <Laptop size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider block">
                            ✓ Modalidad Exclusiva del Curso
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-sky-950">
                            Modalidad Asignada: 100% Virtual Online
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-[#0284c7] text-white shadow-xs self-start sm:self-auto">
                        Aula Virtual + Zoom
                      </span>
                    </div>
                    <p className="text-xs text-sky-900 leading-relaxed">
                      Este programa está diseñado en formato <strong>100% Virtual Online</strong>. Te conectas desde <strong>{effectiveCity}</strong> ({formData.region}) a través de nuestra plataforma e-learning y clases sincrónicas en vivo por Zoom sin necesidad de desplazamientos.
                    </p>
                  </div>
                ) : isFromArica ? (
                  // Caso 3a: Ambas modalidades habilitadas y alumno en Arica
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 border-2 border-emerald-300 shadow-xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-black flex-shrink-0">
                          <Building2 size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider block">
                            ✓ Ubicación Sede Central Detectada ({effectiveCity})
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-emerald-950">
                            Modalidad Habilitada: Presencial y Virtual
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-emerald-600 text-white shadow-xs self-start sm:self-auto">
                        Sede Arica + Aula Virtual
                      </span>
                    </div>

                    <p className="text-xs text-emerald-900 leading-relaxed">
                      Como resides en la ciudad de <strong>Arica</strong>, tienes derecho a realizar tus clases en modalidad <strong>Presencial</strong> en nuestra sede (Blanco Encalada N°666, 2do Piso, Arica) con acceso simultáneo al <strong>Aula Virtual</strong>.
                    </p>

                    {/* Selector de preferencia para el alumno de Arica */}
                    <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-emerald-950 font-medium">
                      <span className="text-slate-600 text-[11px] font-bold">Tu modalidad de estudio:</span>
                      <label className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-emerald-300 shadow-2xs">
                        <input
                          type="radio"
                          name="modalidadPreferencia"
                          value="presencial_virtual"
                          checked={formData.modalidadPreferencia !== 'virtual_total'}
                          onChange={() => setFormData(prev => ({ ...prev, modalidadPreferencia: 'presencial_virtual' }))}
                        />
                        <span className="font-bold text-emerald-900">Presencial en Sede Arica + Aula Virtual (Recomendada)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
                        <input
                          type="radio"
                          name="modalidadPreferencia"
                          value="virtual_total"
                          checked={formData.modalidadPreferencia === 'virtual_total'}
                          onChange={() => setFormData(prev => ({ ...prev, modalidadPreferencia: 'virtual_total' }))}
                        />
                        <span>100% Virtual Online (Si no puedes asistir a sede)</span>
                      </label>
                    </div>
                  </div>
                ) : (
                  // Caso 3b: Ambas modalidades pero alumno fuera de Arica
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-sky-50 via-blue-50/70 to-indigo-50 border-2 border-sky-300 shadow-xs space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#0284c7] text-white flex items-center justify-center font-black flex-shrink-0">
                          <Globe size={18} />
                        </div>
                        <div>
                          <span className="text-[10px] font-black uppercase text-sky-800 tracking-wider block">
                            ✓ Ubicación Regional Detectada ({effectiveCity}, {formData.region})
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-sky-950">
                            Modalidad Asignada: Totalmente Virtual (100% Online)
                          </h4>
                        </div>
                      </div>
                      <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-[#0284c7] text-white shadow-xs self-start sm:self-auto">
                        100% Online Sincrónico Zoom
                      </span>
                    </div>

                    <p className="text-xs text-sky-900 leading-relaxed">
                      Por encontrarte fuera de Arica en <strong>{effectiveCity}</strong>, tu programa se imparte en modalidad <strong>Totalmente Virtual</strong>: asistes a clases sincrónicas en vivo transmitidas vía Zoom con tu profesor y accedes al Aula Virtual SENCE 24/7 sin necesidad de trasladarte ni costear viajes.
                    </p>
                  </div>
                )}
              </div>

              {/* Lugar de Trabajo / Condición */}
              <div className="space-y-2 sm:col-span-3 bg-slate-100/80 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-bold text-slate-800">LUGAR DE TRABAJO (SI ES EL CASO):</span>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="condicionLaboral"
                      value="particular"
                      checked={formData.condicionLaboral === 'particular'}
                      onChange={() => setFormData(prev => ({ ...prev, condicionLaboral: 'particular', empresaNombre: '' }))}
                    />
                    <span>Particular</span>
                  </label>
                  <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                    <input
                      type="radio"
                      name="condicionLaboral"
                      value="empresa"
                      checked={formData.condicionLaboral === 'empresa'}
                      onChange={() => setFormData(prev => ({ ...prev, condicionLaboral: 'empresa' }))}
                    />
                    <span>Empresa Empleadora / Patrocinado</span>
                  </label>
                </div>

                {formData.condicionLaboral === 'empresa' && (
                  <input
                    type="text"
                    required
                    placeholder="Nombre o Razón Social de la Empresa..."
                    value={formData.empresaNombre}
                    onChange={(e) => setFormData(prev => ({ ...prev, empresaNombre: e.target.value }))}
                    className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                )}
              </div>

            </div>
          </div>

          {/* ================= 2.1.- CREACIÓN DE CUENTA DE ACCESO AL AULA VIRTUAL ================= */}
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-teal-50 text-[#00A896] flex items-center justify-center text-xs font-black border border-teal-200">
                  <Lock size={14} />
                </span>
                <span>CREAR CUENTA DE ACCESO AL AULA VIRTUAL</span>
              </h2>
              <span className="text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-bold flex items-center gap-1.5 w-fit">
                <Sparkles size={13} className="text-emerald-600" />
                Acceso Inmediato al Registrarte
              </span>
            </div>

            {/* Tarjeta orientadora con el RUT como usuario */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 via-teal-50/50 to-slate-50 border border-sky-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-black text-slate-800">
                  <User size={15} className="text-[#0284c7]" />
                  <span>TU USUARIO SERÁ TU RUT:</span>
                  <span className="font-mono bg-white px-2.5 py-0.5 rounded-lg border border-sky-300 text-[#0284c7] font-bold text-sm">
                    {formData.rut || 'Ingresa tu RUT en la sección anterior'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Con este RUT y la contraseña que crees a continuación, tus datos quedarán guardados de forma segura en la base de datos y podrás ingresar de inmediato a la plataforma virtual para ver tu curso, clases y avances.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              
              {/* Contraseña */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Key size={14} className="text-[#0284c7]" />
                    <span>CREAR CONTRASEÑA *</span>
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">(mínimo 4 caracteres)</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    name="password"
                    placeholder="Escribe tu contraseña secreta..."
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                    title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirmar Contraseña */}
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>CONFIRMAR CONTRASEÑA *</span>
                  </span>
                  {formData.password && formData.confirmPassword && (
                    formData.password === formData.confirmPassword ? (
                      <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                        <Check size={12} /> Coinciden
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-rose-500">
                        No coinciden
                      </span>
                    )
                  )}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    name="confirmPassword"
                    placeholder="Repite tu contraseña..."
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-11 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(prev => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1 cursor-pointer transition-colors"
                    title={showConfirmPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

            </div>

            {/* Error de contraseña si no coincide o es muy corta */}
            {passwordError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
                <span>{passwordError}</span>
              </div>
            )}
          </div>

          {/* ================= 3.- ABONOS (50% CUOTA INICIAL) & PASARELA DE PAGO ================= */}
          <div className="space-y-5 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  3
                </span>
                <span>3.- ABONOS (PLAN DE CUOTAS DEL 50%)</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Ficha física Sección 3</span>
            </div>

            {/* Selector de Plan de Abono */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Cuota N° 1: 50% de Abono */}
              <div 
                onClick={() => setPaymentOption('cuota1')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  paymentOption === 'cuota1'
                    ? 'bg-sky-50/80 border-[#0284c7] shadow-lg shadow-sky-500/10 ring-2 ring-[#0284c7]/30'
                    : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-sky-100 text-sky-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-sky-200 mb-1">
                      OPCIÓN RECOMENDADA (50%)
                    </span>
                    <h4 className="text-sm font-black text-slate-900">CUOTA Nº 1 ENTREGA DE DOC. / RESERVA</h4>
                    <p className="text-xs text-slate-600">Pagas el 50% ahora para abrir expediente y reservar cupo oficial SENCE.</p>
                  </div>
                  {paymentOption === 'cuota1' && (
                    <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold shadow-sm">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-xs text-slate-500 font-mono">Abono Inicial Hoy:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-[#0284c7] font-mono">
                      ${cuota1Amount.toLocaleString('es-CL')}
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">Saldo 50% ($ {cuota2Amount.toLocaleString('es-CL')}) al inicio</span>
                  </div>
                </div>
              </div>

              {/* Cuota Total: 100% */}
              <div 
                onClick={() => setPaymentOption('total')}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                  paymentOption === 'total'
                    ? 'bg-sky-50/80 border-[#0284c7] shadow-lg shadow-sky-500/10 ring-2 ring-[#0284c7]/30'
                    : 'bg-slate-50 border-slate-200 hover:border-sky-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1">
                      PAGO COMPLETO (100%)
                    </span>
                    <h4 className="text-sm font-black text-slate-900">CUOTA Nº 1 + CUOTA Nº 2 (TOTALIDAD)</h4>
                    <p className="text-xs text-slate-600">Cancelas la totalidad del arancel en una sola transacción sin cuotas pendientes.</p>
                  </div>
                  {paymentOption === 'total' && (
                    <div className="w-6 h-6 rounded-full bg-[#0284c7] text-white flex items-center justify-center font-bold shadow-sm">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200 flex justify-between items-end">
                  <span className="text-xs text-slate-500 font-mono">Total a Pagar Hoy:</span>
                  <div className="text-right">
                    <span className="text-2xl font-black text-slate-900 font-mono">
                      ${totalAmount.toLocaleString('es-CL')}
                    </span>
                    <span className="text-[10px] text-emerald-600 block font-mono">Arancel 100% Cancelado</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Medios de Pago */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Selecciona el Medio de Pago para el Abono:
                </span>
                
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'tarjeta', label: '💳 Tarjetas (Webpay / Débito / Crédito)', icon: CreditCard },
                    { id: 'transferencia', label: '🏦 Transferencia Electrónica', icon: Building2 },
                    { id: 'efectivo', label: '💵 Pago Presencial en Sede', icon: DollarSign },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                        paymentMethod === m.id
                          ? 'bg-[#0284c7] text-white border-sky-400 shadow-md'
                          : 'bg-white text-slate-600 border-slate-200 hover:text-slate-900'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Opción 1: Tarjetas Webpay Plus */}
              {paymentMethod === 'tarjeta' && (
                <div className="space-y-4 pt-1">
                  <div className="p-4 bg-sky-50 rounded-2xl border border-sky-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-slate-500 block font-bold uppercase">Monto a cargar con Tarjeta:</span>
                      <span className="text-2xl font-black text-[#0284c7] font-mono">
                        ${amountToPayNow.toLocaleString('es-CL')} CLP
                      </span>
                    </div>
                    <div className="text-xs text-sky-800 font-mono bg-sky-100 px-3 py-1.5 rounded-xl border border-sky-200">
                      🔒 Pasarela Webpay Plus • Transbank Encriptada
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="font-semibold text-slate-700 block mb-1">Número de Tarjeta</label>
                      <input
                        type="text"
                        value={cardData.cardNumber}
                        onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Vencimiento (MM/AA)</label>
                      <input
                        type="text"
                        value={cardData.cardExpiry}
                        onChange={(e) => setCardData({ ...cardData, cardExpiry: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">CVV / CVC</label>
                      <input
                        type="text"
                        value={cardData.cardCvv}
                        onChange={(e) => setCardData({ ...cardData, cardCvv: e.target.value })}
                        className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Opción 2: Transferencia Bancaria */}
              {paymentMethod === 'transferencia' && (
                <div className="p-4 bg-white rounded-2xl border border-slate-200 space-y-3 text-xs">
                  <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Building2 size={16} className="text-[#0284c7]" />
                    <span>Datos Oficiales para Transferencia Electrónica:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700 bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-xs">
                    <div><strong className="text-slate-500">Banco:</strong> Banco Santander / Banco Estado</div>
                    <div><strong className="text-slate-500">Tipo de Cuenta:</strong> Cuenta Corriente</div>
                    <div><strong className="text-slate-500">N° Cuenta:</strong> 74-88921-01</div>
                    <div><strong className="text-slate-500">RUT Titular:</strong> 77.123.456-K</div>
                    <div><strong className="text-slate-500">Nombre Titular:</strong> OTEC PREVYSEG SPA</div>
                    <div><strong className="text-slate-500">Correo:</strong> prevyseg.capacitaciones@gmail.com</div>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    * Al transferir, incluye en el asunto tu <strong>Nombre y RUT</strong>. Una vez completada la inscripción, podrás enviar el comprobante directamente al WhatsApp de admisiones.
                  </p>
                </div>
              )}

              {/* Opción 3: Efectivo en Sede */}
              {paymentMethod === 'efectivo' && (
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                  <h4 className="font-bold text-amber-900 text-sm">Pago Presencial en Sede Arica:</h4>
                  <p>
                    Puedes abonar tu 50% o el total en efectivo o tarjeta física en nuestras oficinas de atención:
                  </p>
                  <div className="font-bold text-slate-900 bg-white p-3 rounded-xl border border-amber-200">
                    📍 Blanco Encalada N°666, 2do Piso, Arica (Lunes a Viernes de 09:00 a 19:00 hrs).
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* ================= 4.- BUZÓN DE PREGUNTAS O DUDAS ================= */}
          <div className="space-y-4 border-t border-slate-200 pt-6">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center text-xs font-black border border-sky-200">
                  4
                </span>
                <span>4.- BUZÓN DE PREGUNTAS O DUDAS</span>
              </h2>
              <span className="text-xs text-slate-500 font-mono">Consultas y requerimientos</span>
            </div>

            <textarea
              name="observaciones"
              rows="3"
              placeholder="Escribe aquí cualquier pregunta, duda sobre el curso, disponibilidad de horarios o consulta que tengas..."
              value={formData.observaciones}
              onChange={handleInputChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] resize-none"
            />

            {/* Aviso informativo de contacto para documentación */}
            <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 flex items-start gap-3 shadow-sm">
              <Phone size={18} className="text-teal-600 flex-shrink-0 mt-0.5 animate-pulse" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-teal-900 block">
                  Aviso Importante sobre Documentación:
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Una vez que te inscribas, nuestro equipo de admisiones de <strong className="text-slate-900">PrevySeg</strong> se comunicará directamente contigo vía <strong>WhatsApp o teléfono</strong> por si llegases a necesitar presentar o validar algún documento específico según tu curso o capacitación.
                </p>
              </div>
            </div>
          </div>



          {/* ================= BOTÓN PRINCIPAL DE ENVÍO Y ABONO ================= */}
          <div className="border-t border-slate-200 pt-6 space-y-4">
            
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-sky-50 border border-sky-200">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs text-sky-800 font-bold uppercase block">
                  Total a abonar para completar inscripción:
                </span>
                <span className="text-3xl font-black text-slate-900 font-mono">
                  ${amountToPayNow.toLocaleString('es-CL')} CLP
                </span>
                <span className="text-[11px] text-slate-600 block">
                  {paymentOption === 'cuota1' ? 'Abono 50% (Cuota N°1 Reserva)' : 'Pago Total 100%'} • {currentCourse.name}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.04, boxShadow: '0 0 25px rgba(2, 132, 199, 0.3)' }}
                whileTap={{ scale: 0.96 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#0284c7] to-[#00c2b2] hover:from-sky-600 hover:to-teal-600 text-white font-black text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all border border-sky-300/40"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Procesando Ficha y Abono...</span>
                  </span>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Confirmar Ficha y Abonar ${amountToPayNow.toLocaleString('es-CL')}</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </motion.button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 text-center">
              <span className="flex items-center gap-1.5">
                <Lock size={13} className="text-emerald-600" />
                <span>Datos protegidos bajo Ley N° 19.628</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Phone size={13} className="text-emerald-600" />
                <span>Contacto directo vía WhatsApp (+56 9 8231 2128)</span>
              </span>
            </div>

          </div>

        </form>
      )}

    </div>
  );
};

export default EnrollmentForm;
