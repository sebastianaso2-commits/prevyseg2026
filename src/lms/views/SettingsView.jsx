import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Save,
  RotateCcw,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Code,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  CheckCircle2,
  Shield,
  Wrench,
  Search,
  BookOpen,
  AlertCircle,
  RefreshCw,
  Layers,
  Clock,
  MapPin,
  Globe,
  Building2,
  Laptop,
  Compass,
  Sliders,
  EyeOff,
  PlusCircle
} from 'lucide-react';
import { supabase, isCctvSpecialCourse } from '../../config/supabase';
import { getSavedCourses, updateCourseItem } from '../../data/coursesData';
import CourseManagerModal from '../../components/CourseManagerModal';
import CreateCourseModal from '../../components/CreateCourseModal';
import CctvActivationManager from '../components/CctvActivationManager';

// =========================================================================
// CATEGORÍAS COMPLETAS IMPLEMENTADAS (SEGURIDAD Y OFICIOS)
// =========================================================================
const CATEGORIAS_SEGURIDAD = [
  'Formación Inicial',
  'Perfeccionamiento',
  'Tecnología y Sistemas de Seguridad',
  'Seguridad Marítimo Portuaria',
  'Perfeccionamiento de Guardias',
  'Tecnología CCTV y Alarmas',
  'Seguridad Privada / Cursos SPD (Subsecretaría de Prevención del Delito)'
];

const CATEGORIAS_OFICIOS = [
  'Desarrollo de Habilidades Laborales',
  'Área Agropecuaria',
  'Área Logística y Operaciones',
  'Área Alimentación',
  'Área Estética y Servicios',
  'Área de Salud',
  'Área de Administración'
];

const SettingsView = ({ _isEditMode, _currentUser }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const selectedCourseIdRef = useRef(null);
  const [activeSchoolFilter, setActiveSchoolFilter] = useState('all'); // 'all' | 'seguridad' | 'oficios'
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [testCity, setTestCity] = useState('Arica');
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    selectedCourseIdRef.current = selectedCourseId;
  }, [selectedCourseId]);

  // Comprobar en tiempo real si una ciudad pertenece a Arica o valles
  const isAricaTest = useMemo(() => {
    const q = (testCity || '').toLowerCase().trim();
    return q.includes('arica') || q.includes('azapa') || q.includes('lluta') || q.includes('parinacota') || q.includes('putre') || q.includes('camarones');
  }, [testCity]);

  // Form State para el curso seleccionado
  const [formData, setFormData] = useState({
    id: '',
    nombreCompleto: '',
    nombreCorto: '',
    school: 'seguridad',
    categoria: 'Formación Inicial',
    visibilidad: 'Mostrar',
    disponible: true,
    proximamente: false,
    cupos: 25,
    precio: 120000,
    duracion: '90 Horas',
    modalidad: 'Presencial / Semipresencial',
    permitePresencial: true,
    permiteVirtual: true,
    fechaInicio: '2026-10-14',
    fechaFin: '2026-11-20',
    idSence: 'OS10-FORM-01',
    codigoOtec: 'REG-OTEC-OS10-01',
    formatoCurso: 'Temas por Unidades Didácticas',
    numeroSecciones: '6',
    limiteSubida: '64MB',
    resumen: '',
  });

  const [openSections, setOpenSections] = useState({
    general: true,
    descripcion: true,
    formato: false,
  });

  // Poblador del formulario con datos del curso
  const populateForm = useCallback((course) => {
    if (!course) return;
    setFormData({
      id: course.id,
      nombreCompleto: course.titulo || course.title || '',
      nombreCorto: course.codigo_sence || course.id || '',
      school: course.school || 'seguridad',
      categoria: course.category || (course.school === 'oficios' ? 'Desarrollo de Habilidades Laborales' : 'Formación Inicial'),
      visibilidad: course.activo !== false ? 'Mostrar' : 'Ocultar',
      disponible: course.disponible !== false,
      proximamente: Boolean(course.proximamente),
      cupos: course.cupos ?? 20,
      precio: course.precio || 0,
      duracion: course.duracion || course.duration || '40 Horas',
      modalidad: course.modalidad || course.modality || 'Presencial',
      permitePresencial: course.permitePresencial !== false && course.permite_presencial !== false,
      permiteVirtual: course.permiteVirtual !== false && course.permite_virtual !== false,
      fechaInicio: course.fecha_inicio || '',
      fechaFin: course.fecha_termino || '',
      idSence: course.codigo_sence || '',
      codigoOtec: course.codigo_sence ? `REG-OTEC-${course.codigo_sence}` : 'REG-2026-AR-091',
      formatoCurso: 'Temas por Unidades Didácticas',
      numeroSecciones: '6',
      limiteSubida: '64MB',
      resumen: course.descripcion || course.description || '',
    });
  }, []);

  // Cargar cursos desde Supabase (o fallback a catálogo local sincronizado)
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .order('school', { ascending: false })
        .order('category', { ascending: true })
        .order('titulo', { ascending: true });

      if (error) throw error;

      const localSaved = getSavedCourses();

      let mappedCourses = [];
      if (data && data.length > 0) {
        mappedCourses = data.map(dbCourse => {
          const localMatch = localSaved.find(l => l.id === dbCourse.id || l.title === dbCourse.titulo || l.codigo_sence === dbCourse.codigo_sence);
          const pres = typeof dbCourse.permite_presencial === 'boolean'
            ? dbCourse.permite_presencial
            : (localMatch && typeof localMatch.permitePresencial === 'boolean' ? localMatch.permitePresencial : true);
          const virt = typeof dbCourse.permite_virtual === 'boolean'
            ? dbCourse.permite_virtual
            : (localMatch && typeof localMatch.permiteVirtual === 'boolean' ? localMatch.permiteVirtual : true);
          const prox = typeof dbCourse.proximamente === 'boolean'
            ? dbCourse.proximamente
            : (localMatch && typeof localMatch.proximamente === 'boolean' ? localMatch.proximamente : false);

          return {
            ...dbCourse,
            titulo: dbCourse.titulo || (localMatch ? localMatch.title : ''),
            title: dbCourse.titulo || (localMatch ? localMatch.title : ''),
            category: dbCourse.category || (localMatch ? localMatch.category : 'General'),
            school: dbCourse.school || (localMatch ? localMatch.school : 'seguridad'),
            codigo_sence: dbCourse.codigo_sence || (localMatch ? localMatch.codigo_sence : `SENCE-${dbCourse.id}`),
            modalidad: dbCourse.modalidad || (localMatch ? localMatch.modality : 'Presencial'),
            modality: dbCourse.modalidad || (localMatch ? localMatch.modality : 'Presencial'),
            duracion: dbCourse.duracion || (localMatch ? localMatch.duration : '40 Horas'),
            duration: dbCourse.duracion || (localMatch ? localMatch.duration : '40 Horas'),
            precio: dbCourse.precio !== undefined ? dbCourse.precio : (localMatch ? localMatch.price : 95000),
            cupos: dbCourse.cupos !== undefined ? dbCourse.cupos : (localMatch ? localMatch.cupos : 20),
            fecha_inicio: dbCourse.fecha_inicio || (localMatch ? localMatch.fecha_inicio : '2026-10-15'),
            fecha_termino: dbCourse.fecha_termino || (localMatch ? localMatch.fecha_termino : '2026-11-15'),
            descripcion: dbCourse.descripcion || (localMatch ? localMatch.description : ''),
            description: dbCourse.descripcion || (localMatch ? localMatch.description : ''),
            disponible: dbCourse.disponible !== false,
            proximamente: prox,
            permitePresencial: pres,
            permiteVirtual: virt,
            permite_presencial: pres,
            permite_virtual: virt,
            activo: dbCourse.activo !== false,
          };
        });
      } else {
        mappedCourses = localSaved.map((c, idx) => ({
          id: c.id || `local-${idx}`,
          titulo: c.title,
          title: c.title,
          school: c.school || 'seguridad',
          category: c.category || 'General',
          codigo_sence: c.codigo_sence || `SENCE-${c.id}`,
          modalidad: c.modality || 'Presencial',
          modality: c.modality || 'Presencial',
          permitePresencial: c.permitePresencial !== false,
          permiteVirtual: c.permiteVirtual !== false,
          permite_presencial: c.permitePresencial !== false,
          permite_virtual: c.permiteVirtual !== false,
          duracion: c.duration || '40 Horas',
          duration: c.duration || '40 Horas',
          precio: c.price || 95000,
          disponible: c.disponible !== false,
          proximamente: Boolean(c.proximamente),
          cupos: c.cupos || 20,
          fecha_inicio: c.fecha_inicio || '2026-10-15',
          fecha_termino: c.fecha_termino || '2026-11-15',
          descripcion: c.description || '',
          description: c.description || '',
          activo: true,
        }));
      }

      setCourses(mappedCourses);

      const currentId = selectedCourseIdRef.current;
      const targetCourse = currentId ? mappedCourses.find(c => c.id === currentId) : mappedCourses[0];
      if (targetCourse) {
        setSelectedCourseId(targetCourse.id);
        populateForm(targetCourse);
      }
    } catch (err) {
      console.warn('Fallo consulta a Supabase courses, usando datos locales:', err);
      const local = getSavedCourses();
      const mapped = local.map((c, idx) => ({
        id: c.id || `local-${idx}`,
        titulo: c.title,
        title: c.title,
        school: c.school || 'seguridad',
        category: c.category || 'General',
        codigo_sence: c.codigo_sence || `SENCE-${c.id}`,
        modalidad: c.modality || 'Presencial',
        modality: c.modality || 'Presencial',
        permitePresencial: c.permitePresencial !== false,
        permiteVirtual: c.permiteVirtual !== false,
        permite_presencial: c.permitePresencial !== false,
        permite_virtual: c.permiteVirtual !== false,
        duracion: c.duration || '40 Horas',
        duration: c.duration || '40 Horas',
        precio: c.price || 95000,
        disponible: c.disponible !== false,
        proximamente: Boolean(c.proximamente),
        cupos: c.cupos || 20,
        fecha_inicio: c.fecha_inicio || '2026-10-15',
        fecha_termino: c.fecha_termino || '2026-11-15',
        descripcion: c.description || '',
        description: c.description || '',
        activo: true,
      }));
      setCourses(mapped);
      const currentId = selectedCourseIdRef.current;
      const targetCourse = currentId ? mapped.find(c => c.id === currentId) : mapped[0];
      if (targetCourse) {
        setSelectedCourseId(targetCourse.id);
        populateForm(targetCourse);
      }
    } finally {
      setLoading(false);
    }
  }, [populateForm]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Escuchar eventos globales de actualización de cursos
  useEffect(() => {
    const handleCoursesUpdated = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setCourses(prev => {
          if (!prev || prev.length === 0) return e.detail;
          return prev.map(pCourse => {
            const match = e.detail.find(d => d.id === pCourse.id || d.title === pCourse.titulo || d.title === pCourse.title);
            if (!match) return pCourse;
            return {
              ...pCourse,
              ...match,
              id: pCourse.id, // Preservar el ID original de Supabase (UUID)
              titulo: match.titulo || match.title || pCourse.titulo || pCourse.title,
              title: match.title || match.titulo || pCourse.title || pCourse.titulo,
              activo: typeof match.activo === 'boolean' ? match.activo : (typeof pCourse.activo === 'boolean' ? pCourse.activo : true),
              codigo_sence: match.codigo_sence || pCourse.codigo_sence,
              disponible: typeof match.disponible === 'boolean' ? match.disponible : pCourse.disponible,
              proximamente: typeof match.proximamente === 'boolean' ? match.proximamente : pCourse.proximamente,
              permitePresencial: typeof match.permitePresencial === 'boolean' ? match.permitePresencial : pCourse.permitePresencial,
              permiteVirtual: typeof match.permiteVirtual === 'boolean' ? match.permiteVirtual : pCourse.permiteVirtual,
              cupos: match.cupos !== undefined ? match.cupos : pCourse.cupos,
              fecha_inicio: match.fecha_inicio || pCourse.fecha_inicio,
              fecha_termino: match.fecha_termino || pCourse.fecha_termino,
            };
          });
        });
      } else {
        fetchCourses();
      }
    };
    window.addEventListener('prevyseg-courses-updated', handleCoursesUpdated);
    return () => window.removeEventListener('prevyseg-courses-updated', handleCoursesUpdated);
  }, [fetchCourses]);

  // Cambio de curso seleccionado
  const handleSelectCourse = (course) => {
    setSelectedCourseId(course.id);
    populateForm(course);
  };

  // Conmutador rápido de PRÓXIMAMENTE en un clic
  const handleQuickToggleProximamente = async (course, e) => {
    if (e) e.stopPropagation();
    const nextVal = !course.proximamente;
    const isUUID = typeof course.id === 'string' && course.id.length > 20 && course.id.includes('-');

    try {
      if (isUUID) {
        await supabase
          .from('courses')
          .update({
            proximamente: nextVal,
            disponible: nextVal ? false : course.disponible
          })
          .eq('id', course.id);
      }

      updateCourseItem(course.id, {
        title: course.titulo || course.title,
        school: course.school,
        activo: true,
        proximamente: nextVal,
        disponible: nextVal ? false : course.disponible
      });

      setCourses(prev => prev.map(c => c.id === course.id ? {
        ...c,
        proximamente: nextVal,
        disponible: nextVal ? false : c.disponible
      } : c));

      if (formData.id === course.id) {
        setFormData(prev => ({
          ...prev,
          proximamente: nextVal,
          disponible: nextVal ? false : prev.disponible
        }));
      }
    } catch (err) {
      console.error('Error alternando proximamente:', err);
    }
  };

  // Conmutador rápido de Presencial en 1 clic con persistencia permanente en PostgreSQL
  const handleQuickTogglePresencial = async (course, e) => {
    if (e) e.stopPropagation();
    const currentP = course.permitePresencial !== false;
    const currentV = course.permiteVirtual !== false;
    const nextP = !currentP;
    if (!nextP && !currentV) return; // Mantener al menos una activa

    setCourses(prev => prev.map(c => c.id === course.id ? { ...c, permitePresencial: nextP } : c));
    if (formData.id === course.id) {
      setFormData(prev => ({ ...prev, permitePresencial: nextP }));
    }

    updateCourseItem(course.id, {
      title: course.titulo || course.title,
      permitePresencial: nextP
    });

    try {
      const isUUID = typeof course.id === 'string' && course.id.length > 20 && course.id.includes('-');
      if (isUUID) {
        await supabase.from('courses').update({ permite_presencial: nextP }).eq('id', course.id);
      } else {
        await supabase.from('courses').update({ permite_presencial: nextP }).ilike('titulo', `%${course.titulo || course.title}%`);
      }
    } catch (err) {
      console.warn('Error sincronizando presencial en PostgreSQL:', err);
    }
  };

  // Conmutador rápido de Virtual en 1 clic con persistencia permanente en PostgreSQL
  const handleQuickToggleVirtual = async (course, e) => {
    if (e) e.stopPropagation();
    const currentP = course.permitePresencial !== false;
    const currentV = course.permiteVirtual !== false;
    const nextV = !currentV;
    if (!nextV && !currentP) return; // Mantener al menos una activa

    setCourses(prev => prev.map(c => c.id === course.id ? { ...c, permiteVirtual: nextV } : c));
    if (formData.id === course.id) {
      setFormData(prev => ({ ...prev, permiteVirtual: nextV }));
    }

    updateCourseItem(course.id, {
      title: course.titulo || course.title,
      permiteVirtual: nextV
    });

    try {
      const isUUID = typeof course.id === 'string' && course.id.length > 20 && course.id.includes('-');
      if (isUUID) {
        await supabase.from('courses').update({ permite_virtual: nextV }).eq('id', course.id);
      } else {
        await supabase.from('courses').update({ permite_virtual: nextV }).ilike('titulo', `%${course.titulo || course.title}%`);
      }
    } catch (err) {
      console.warn('Error sincronizando virtual en PostgreSQL:', err);
    }
  };

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Filtrar cursos por escuela y buscador
  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      let matchSchool = true;
      if (activeSchoolFilter === 'ocultos') {
        matchSchool = c.activo === false;
      } else if (activeSchoolFilter !== 'all') {
        matchSchool = c.school === activeSchoolFilter;
      }
      const title = (c.titulo || c.title || '').toLowerCase();
      const code = (c.codigo_sence || '').toLowerCase();
      const cat = (c.category || '').toLowerCase();
      const q = searchQuery.toLowerCase().trim();
      const matchSearch = !q || title.includes(q) || code.includes(q) || cat.includes(q);
      return matchSchool && matchSearch;
    });
  }, [courses, activeSchoolFilter, searchQuery]);

  // Contadores por escuela
  const counts = useMemo(() => {
    const seg = courses.filter(c => c.school === 'seguridad').length;
    const ofi = courses.filter(c => c.school === 'oficios').length;
    const prox = courses.filter(c => c.proximamente).length;
    const ocultos = courses.filter(c => c.activo === false).length;
    return { seg, ofi, prox, ocultos, total: courses.length };
  }, [courses]);

  // Guardar Cambios en Supabase PostgreSQL y localmente
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setErrorMessage('');
    setSavedSuccess(false);

    try {
      const isUUID = typeof formData.id === 'string' && formData.id.length > 20 && formData.id.includes('-');

      const payload = {
        titulo: formData.nombreCompleto,
        codigo_sence: formData.idSence || formData.nombreCorto,
        school: formData.school,
        category: formData.categoria,
        modalidad: formData.modalidad,
        permite_presencial: formData.permitePresencial,
        permite_virtual: formData.permiteVirtual,
        duracion: formData.duracion,
        precio: parseFloat(formData.precio) || 0,
        activo: formData.visibilidad === 'Mostrar',
        disponible: Boolean(formData.disponible),
        proximamente: Boolean(formData.proximamente),
        cupos: parseInt(formData.cupos, 10) || 0,
        fecha_inicio: formData.fechaInicio,
        fecha_termino: formData.fechaFin,
        descripcion: formData.resumen,
      };

      if (isUUID) {
        const { error } = await supabase
          .from('courses')
          .update(payload)
          .eq('id', formData.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('courses')
          .update(payload)
          .ilike('titulo', `%${formData.nombreCompleto}%`);

        if (error) console.warn('Supabase update by title error:', error);
      }

      // Sincronizar catálogo local para actualización reactiva en la app
      updateCourseItem(formData.id, {
        title: formData.nombreCompleto,
        titulo: formData.nombreCompleto,
        category: formData.categoria,
        school: formData.school,
        codigo_sence: formData.idSence || formData.nombreCorto,
        activo: formData.visibilidad === 'Mostrar',
        disponible: formData.disponible,
        proximamente: formData.proximamente,
        cupos: parseInt(formData.cupos, 10) || 0,
        fecha_inicio: formData.fechaInicio,
        fecha_termino: formData.fechaFin,
        duration: formData.duracion,
        modality: formData.modalidad,
        permitePresencial: formData.permitePresencial,
        permiteVirtual: formData.permiteVirtual,
        description: formData.resumen,
        price: typeof formData.precio === 'number' ? `$${formData.precio.toLocaleString('es-CL')} CLP` : formData.precio,
      });

      // Actualizar estado local de la lista
      setCourses(prev => prev.map(c => (c.id === formData.id || c.titulo === formData.nombreCompleto || c.title === formData.nombreCompleto) ? {
        ...c,
        ...payload,
        titulo: formData.nombreCompleto,
        title: formData.nombreCompleto,
        activo: formData.visibilidad === 'Mostrar',
        permitePresencial: formData.permitePresencial,
        permiteVirtual: formData.permiteVirtual
      } : c));

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      console.error('Error al guardar curso:', err);
      setErrorMessage(err.message || 'Error al guardar cambios en la base de datos.');
    } finally {
      setIsSaving(false);
    }
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId || (formData.id && c.id === formData.id) || (formData.nombreCompleto && (c.titulo === formData.nombreCompleto || c.title === formData.nombreCompleto))) || courses[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* 1. ENCABEZADO Y RESUMEN GENERAL */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-slate-900 text-white p-6 sm:p-7 rounded-3xl border border-slate-700 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 text-xs font-bold border border-sky-400/30">
            <BookOpen size={14} className="text-[#00FFE0]" />
            <span>Gestión Curricular SENCE & Mallas Académicas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Gestión de Cursos y Estructura Formativa
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Administración integral de cohortes, códigos SENCE, vacantes, fechas y categorías de ambas escuelas oficiales. Activa el botón <strong>PRÓXIMAMENTE</strong> en los cursos no disponibles actualmente.
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-300 font-medium">
            <span className="bg-white/10 px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
              <Layers size={13} className="text-sky-400" />
              Total en BD: <strong>{counts.total} Cursos</strong>
            </span>
            <span className="bg-sky-500/20 text-sky-200 px-2.5 py-1 rounded-lg border border-sky-400/20 flex items-center gap-1.5">
              <Shield size={13} className="text-sky-400" />
              Seguridad: <strong>{counts.seg}</strong>
            </span>
            <span className="bg-amber-500/20 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-400/20 flex items-center gap-1.5">
              <Wrench size={13} className="text-amber-400" />
              Oficios: <strong>{counts.ofi}</strong>
            </span>
            <span className="bg-amber-500/30 text-amber-200 px-2.5 py-1 rounded-lg border border-amber-400/30 flex items-center gap-1.5 font-bold">
              <Clock size={13} className="text-amber-400 animate-pulse" />
              Próximamente: <strong>{counts.prox}</strong>
            </span>
            {counts.ocultos > 0 && (
              <span className="bg-rose-500/30 text-rose-200 px-2.5 py-1 rounded-lg border border-rose-400/30 flex items-center gap-1.5 font-bold">
                <EyeOff size={13} className="text-rose-400" />
                Ocultos: <strong>{counts.ocultos}</strong>
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-cyan-400 text-slate-950 font-black text-xs shadow-md hover:brightness-110 transition-all cursor-pointer"
            title="Crear un nuevo curso y definir si será Online, Presencial o Ambas"
          >
            <PlusCircle size={15} />
            <span>＋ Crear Nuevo Curso</span>
          </button>

          <button
            type="button"
            onClick={() => setIsManagerOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:border-[#0A4DA2] text-slate-700 hover:text-[#0A4DA2] text-xs font-bold shadow-2xs hover:shadow-md transition-all cursor-pointer group"
            title="Abrir gestor para modificar cupos, fechas y disponibilidad de cursos"
          >
            <Sliders size={15} className="text-[#0A4DA2] group-hover:rotate-90 transition-transform duration-300" />
            <span>⚙️ Modificar Disponibilidad, Cupos y Fechas</span>
          </button>

          <button
            type="button"
            onClick={fetchCourses}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            title="Recargar catálogo desde PostgreSQL"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            <span>Recargar BD</span>
          </button>
        </div>
      </div>

      {/* 2. BARRA DE SEPARACIÓN Y SELECTOR DE CURSOS POR ESCUELA */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">

        {/* Pestañas de Escuela: Separación de Seguridad con Oficios */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-3 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveSchoolFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSchoolFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-md scale-102'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
            >
              <Layers size={14} />
              <span>Todos los Cursos</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/20">
                {counts.total}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSchoolFilter('seguridad')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSchoolFilter === 'seguridad'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 scale-102'
                  : 'bg-sky-50 text-sky-800 hover:bg-sky-100 border border-sky-200'
                }`}
            >
              <Shield size={14} />
              <span>Escuela de Seguridad Privada</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-sky-200/50">
                {counts.seg}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSchoolFilter('oficios')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${activeSchoolFilter === 'oficios'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-102'
                  : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                }`}
            >
              <Wrench size={14} />
              <span>Escuela de Oficios</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-200/50">
                {counts.ofi}
              </span>
            </button>

            {counts.ocultos > 0 && (
              <button
                type="button"
                onClick={() => setActiveSchoolFilter(activeSchoolFilter === 'ocultos' ? 'all' : 'ocultos')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${activeSchoolFilter === 'ocultos'
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-102'
                    : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                  }`}
              >
                <EyeOff size={14} />
                <span>Ocultos en LMS</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-rose-200/60">
                  {counts.ocultos}
                </span>
              </button>
            )}
          </div>

          {/* Buscador de cursos */}
          <div className="relative w-full sm:w-72">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar curso o código..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-sky-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Carrusel/Grilla Compacta de Selección de Curso */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <span>Selecciona un curso para editar ({filteredCourses.length}):</span>
            </span>
            <span className="text-[11px] text-slate-500">
              {selectedCourse ? (
                <>Editando actualmente: <strong className="text-sky-700">{selectedCourse.titulo || selectedCourse.title}</strong></>
              ) : 'Ningún curso seleccionado'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 max-h-64 overflow-y-auto pr-1 p-1 bg-slate-50/70 rounded-2xl border border-slate-200">
            {filteredCourses.map((course) => {
              const isSelected = course.id === selectedCourseId;
              const isSeg = course.school === 'seguridad';
              const isProx = Boolean(course.proximamente);

              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => handleSelectCourse(course)}
                  className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between gap-1.5 relative ${isSelected
                      ? isSeg
                        ? 'bg-sky-50/90 border-sky-500 shadow-md ring-2 ring-sky-400/30'
                        : 'bg-amber-50/90 border-amber-500 shadow-md ring-2 ring-amber-400/30'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-100/60'
                    }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-md ${isSeg
                        ? 'bg-sky-100 text-sky-800 border border-sky-200'
                        : 'bg-amber-100 text-amber-900 border border-amber-200'
                      }`}>
                      {isSeg ? <Shield size={10} /> : <Wrench size={10} />}
                      <span>{isSeg ? 'Seguridad' : 'Oficios'}</span>
                    </span>

                    {/* Botón / Badge Próximamente y Oculto */}
                    <div className="flex items-center gap-1">
                      {course.activo === false && (
                        <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300 shadow-2xs">
                          <EyeOff size={10} />
                          <span>Oculto</span>
                        </span>
                      )}
                      {isProx ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-amber-500 text-white shadow-xs animate-pulse">
                          <Clock size={10} />
                          <span>PRONTO</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500 font-semibold truncate max-w-[90px]">
                          {course.codigo_sence || 'SENCE'}
                        </span>
                      )}
                    </div>
                  </div>

                  <h4 className={`text-xs font-bold line-clamp-2 leading-tight ${isSelected ? (isSeg ? 'text-sky-950' : 'text-amber-950') : 'text-slate-800'
                    }`}>
                    {course.titulo || course.title}
                  </h4>

                  {/* Etiquetas de Modalidad Asignadas con conmutación en 1 clic */}
                  <div className="flex flex-wrap items-center gap-1">
                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleQuickTogglePresencial(course, e)}
                      title="Alternar modalidad Presencial en 1 clic"
                      className={`inline-flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded border transition-all cursor-pointer ${course.permitePresencial !== false
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300 hover:bg-emerald-200'
                          : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-70 hover:opacity-100'
                        }`}
                    >
                      <Building2 size={9} className={course.permitePresencial !== false ? 'text-emerald-700' : 'text-slate-400'} />
                      <span>Presencial {course.permitePresencial !== false ? '✓' : ''}</span>
                    </span>

                    <span
                      role="button"
                      tabIndex={0}
                      onClick={(e) => handleQuickToggleVirtual(course, e)}
                      title="Alternar modalidad Virtual en 1 clic"
                      className={`inline-flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.5 rounded border transition-all cursor-pointer ${course.permiteVirtual !== false
                          ? 'bg-sky-100 text-[#0284c7] border-sky-300 hover:bg-sky-200'
                          : 'bg-slate-100 text-slate-400 border-slate-200 line-through opacity-70 hover:opacity-100'
                        }`}
                    >
                      <Laptop size={9} className={course.permiteVirtual !== false ? 'text-[#0284c7]' : 'text-slate-400'} />
                      <span>Virtual {course.permiteVirtual !== false ? '✓' : ''}</span>
                    </span>
                  </div>

                  {/* Etiqueta de Cobertura Regional */}
                  <div className="flex items-center gap-1 text-[9.5px] font-semibold text-slate-600 bg-slate-100/90 px-2 py-1 rounded-lg border border-slate-200/60">
                    <MapPin size={10} className="text-rose-500 flex-shrink-0" />
                    <span className="truncate">
                      <strong className="text-emerald-700">Arica:</strong> Presencial/Virtual • <strong className="text-sky-700">Regiones:</strong> 100% Virtual
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                    <span className="truncate max-w-[130px] font-medium text-slate-600">
                      {course.category}
                    </span>

                    <div className="flex items-center gap-1.5">
                      {isProx ? (
                        <span className="font-extrabold px-1.5 py-0.5 rounded text-[9px] bg-amber-100 text-amber-900 border border-amber-300">
                          Próximamente
                        </span>
                      ) : course.disponible && course.cupos > 0 ? (
                        <span className="font-bold px-1.5 py-0.5 rounded text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {course.cupos ?? 20} cupos
                        </span>
                      ) : (
                        <span className="font-bold px-1.5 py-0.5 rounded text-[9px] bg-rose-50 text-rose-700 border border-rose-200">
                          Agotado
                        </span>
                      )}

                      {/* Botón rápido para alternar PRÓXIMAMENTE */}
                      <span
                        role="button"
                        tabIndex={0}
                        onClick={(e) => handleQuickToggleProximamente(course, e)}
                        className={`text-[9px] font-black px-1.5 py-0.5 rounded border transition-colors cursor-pointer ${isProx
                            ? 'bg-amber-600 hover:bg-amber-700 text-white border-amber-600'
                            : 'bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-900 border-slate-200'
                          }`}
                        title="Alternar estado PRÓXIMAMENTE para este curso"
                      >
                        {isProx ? 'PRONTO' : '+ Pronto'}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* 3. MENSAJES DE ESTADO (EXITO / ERROR) */}
      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-center justify-between gap-3 animate-in fade-in shadow-sm">
          <div className="flex items-center gap-3">
            <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
            <div>
              <p className="font-bold text-emerald-950">¡Configuración guardada exitosamente!</p>
              <p className="text-emerald-800 mt-0.5">
                Los parámetros del curso <strong>"{formData.nombreCompleto}"</strong> han sido actualizados en la base de datos PostgreSQL y sincronizados con el catálogo general.
              </p>
            </div>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-900 text-xs flex items-center gap-3 animate-in fade-in shadow-sm">
          <AlertCircle size={20} className="text-rose-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-rose-950">Error al guardar los cambios</p>
            <p className="text-rose-800 mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* 4. FORMULARIO PRINCIPAL DE EDICIÓN DEL CURSO */}
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Banner de Curso en Edición */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${formData.school === 'seguridad'
                ? 'bg-sky-100 text-sky-700 border border-sky-200'
                : 'bg-amber-100 text-amber-800 border border-amber-200'
              }`}>
              {formData.school === 'seguridad' ? <Shield size={24} /> : <Wrench size={24} />}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${formData.school === 'seguridad'
                    ? 'bg-sky-100 text-sky-800'
                    : 'bg-amber-100 text-amber-800'
                  }`}>
                  {formData.school === 'seguridad' ? 'Escuela de Seguridad Privada' : 'Escuela de Oficios'}
                </span>

                {formData.proximamente && (
                  <span className="bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 shadow-xs">
                    <Clock size={10} />
                    <span>PRÓXIMAMENTE / PRONTO</span>
                  </span>
                )}

                <span className="text-xs text-slate-400">•</span>
                <span className="text-xs font-semibold text-slate-600">{formData.categoria}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-0.5 line-clamp-1">
                {formData.nombreCompleto || 'Configuración del Curso'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="submit"
              disabled={isSaving}
              className="bg-[#0284c7] hover:bg-sky-600 active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              <Save size={15} />
              <span>{isSaving ? 'Guardando en BD...' : 'Guardar Cambios y Publicar'}</span>
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PANEL EXCLUSIVO: HABILITACIÓN INDIVIDUAL DE CAPACITACIÓN CCTV (30 DÍAS)   */}
        {/* ========================================================================= */}
        {(isCctvSpecialCourse(selectedCourse) || isCctvSpecialCourse(formData)) && (
          <CctvActivationManager 
            course={selectedCourse || formData} 
            onStatusChange={(status) => {
              // Notificación de estado actualizado
            }} 
          />
        )}

        {/* 1. SECCIÓN GENERAL */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('general')}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer border-b border-slate-200"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              {openSections.general ? <ChevronDown size={18} className="text-[#0284c7]" /> : <ChevronRight size={18} />}
              <span>1. Datos Generales y Parámetros SENCE</span>
            </div>
            <span className="text-[11px] text-slate-500">Categoría, Escuela, Fechas y Cupos</span>
          </button>

          {openSections.general && (
            <div className="p-6 sm:p-8 space-y-6 divide-y divide-slate-100">

              {/* Campo: Nombre Completo */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-4 text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>Nombre completo del curso</span>
                  <span className="text-red-500">*</span>
                  <HelpCircle size={13} className="text-slate-400 hover:text-slate-600 cursor-pointer" title="Nombre oficial que aparecerá en diplomas y plataforma." />
                </label>
                <div className="md:col-span-8">
                  <input
                    type="text"
                    required
                    value={formData.nombreCompleto}
                    onChange={(e) => setFormData({ ...formData, nombreCompleto: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              {/* Campo: Escuela Formativa (Separación Seguridad vs Oficios) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
                <label className="md:col-span-4 text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>Escuela Formativa</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        school: 'seguridad',
                        categoria: CATEGORIAS_SEGURIDAD[0]
                      });
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${formData.school === 'seguridad'
                        ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-400/20 text-sky-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <Shield size={18} className={formData.school === 'seguridad' ? 'text-sky-600' : 'text-slate-400'} />
                    <div>
                      <div className="text-xs">Escuela de Seguridad</div>
                      <div className="text-[10px] text-slate-500 font-normal">Programas SPD & Directemar</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        school: 'oficios',
                        categoria: CATEGORIAS_OFICIOS[0]
                      });
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${formData.school === 'oficios'
                        ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/20 text-amber-950 font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <Wrench size={18} className={formData.school === 'oficios' ? 'text-amber-600' : 'text-slate-400'} />
                    <div>
                      <div className="text-xs">Escuela de Oficios</div>
                      <div className="text-[10px] text-slate-500 font-normal">Capacitación Laboral y Servicios</div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Campo: Categoría de Cursos (CON TODAS LAS CATEGORÍAS SEPARADAS) */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
                <div className="md:col-span-4">
                  <label className="text-xs font-bold text-slate-700 block">
                    Categoría de cursos
                  </label>
                  <span className="text-[11px] text-slate-500 block mt-0.5">
                    Todas las categorías de ambas escuelas
                  </span>
                </div>
                <div className="md:col-span-8 space-y-2">
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer font-medium"
                  >
                    {/* GRUPO 1: ESCUELA DE SEGURIDAD PRIVADA */}
                    <optgroup label="🛡️ ESCUELA DE SEGURIDAD PRIVADA" className="font-bold text-sky-800">
                      {CATEGORIAS_SEGURIDAD.map((cat) => (
                        <option key={cat} value={cat} className="font-normal text-slate-900 py-1">
                          {cat}
                        </option>
                      ))}
                    </optgroup>

                    {/* GRUPO 2: ESCUELA DE OFICIOS */}
                    <optgroup label="🛠️ ESCUELA DE OFICIOS" className="font-bold text-amber-800">
                      {CATEGORIAS_OFICIOS.map((cat) => (
                        <option key={cat} value={cat} className="font-normal text-slate-900 py-1">
                          {cat}
                        </option>
                      ))}
                    </optgroup>
                  </select>

                  <div className="flex items-center gap-2 text-[11px]">
                    <span className="text-slate-500">Categoría seleccionada:</span>
                    <span className={`font-bold px-2 py-0.5 rounded-full ${formData.school === 'seguridad'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-amber-100 text-amber-800'
                      }`}>
                      {formData.categoria}
                    </span>
                  </div>
                </div>
              </div>

              {/* Campo: Nombre Corto / Código Identificador */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
                <label className="md:col-span-4 text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <span>Código de Curso / Nombre corto</span>
                  <span className="text-red-500">*</span>
                </label>
                <div className="md:col-span-8">
                  <input
                    type="text"
                    required
                    value={formData.nombreCorto}
                    onChange={(e) => setFormData({ ...formData, nombreCorto: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 font-mono focus:outline-none focus:border-[#0284c7] focus:bg-white"
                  />
                </div>
              </div>

              {/* Campo: Visibilidad y Disponibilidad con Soporte PRÓXIMAMENTE / PRONTO */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pt-5">
                <label className="md:col-span-4 text-xs font-bold text-slate-700 pt-2">
                  Visibilidad y Disponibilidad
                </label>
                <div className="md:col-span-8 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Visibilidad en LMS:</span>
                      <select
                        value={formData.visibilidad}
                        onChange={(e) => setFormData({ ...formData, visibilidad: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
                      >
                        <option value="Mostrar">Mostrar (Público)</option>
                        <option value="Ocultar">Ocultar (Borrador)</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Estado de Matrícula:</span>
                      <select
                        value={formData.proximamente ? 'proximamente' : formData.disponible ? 'disponible' : 'no_disponible'}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val === 'proximamente') {
                            setFormData({ ...formData, proximamente: true, disponible: false });
                          } else if (val === 'disponible') {
                            setFormData({ ...formData, proximamente: false, disponible: true });
                          } else {
                            setFormData({ ...formData, proximamente: false, disponible: false });
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer font-medium"
                      >
                        <option value="disponible">🟢 Cupos Abiertos (Disponible)</option>
                        <option value="proximamente">🟡 Próximamente / Pronto</option>
                        <option value="no_disponible">🔴 No Disponible / Cupos Agotados</option>
                      </select>
                    </div>

                    <div>
                      <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Vacantes / Cupos:</span>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={formData.cupos}
                        onChange={(e) => setFormData({ ...formData, cupos: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                      />
                    </div>
                  </div>

                  {/* Botón directo de activación / conmutación rápida de PRÓXIMAMENTE */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                        <Clock size={14} className="text-amber-600" />
                        <span>Botón "PRÓXIMAMENTE / PRONTO":</span>
                      </span>
                      <p className="text-[11px] text-slate-500">
                        {formData.proximamente
                          ? 'Activado: Los estudiantes verán el botón y etiqueta "PRÓXIMAMENTE" para cursos en preparación.'
                          : 'Desactivado: El curso muestra disponibilidad normal para inscripción inmediata.'}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const next = !formData.proximamente;
                        setFormData({
                          ...formData,
                          proximamente: next,
                          disponible: next ? false : formData.disponible
                        });
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-xs flex-shrink-0 ${formData.proximamente
                          ? 'bg-amber-500 hover:bg-amber-600 text-white ring-2 ring-amber-400/40 shadow-amber-500/20'
                          : 'bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-900 border border-slate-300'
                        }`}
                    >
                      <Clock size={13} className={formData.proximamente ? 'text-white animate-pulse' : 'text-amber-600'} />
                      <span>{formData.proximamente ? '✓ BOTÓN: PRÓXIMAMENTE' : '+ Habilitar PRÓXIMAMENTE'}</span>
                    </button>
                  </div>

                </div>
              </div>

              {/* Campo: Cobertura Geográfica y Modalidades Regionales (Arica vs Otras Ciudades) */}
              <div className="space-y-4 pt-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <label className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin size={15} className="text-rose-500" />
                    <span>Cobertura Geográfica & Modalidades por Ciudad / Región</span>
                    <span className="text-red-500">*</span>
                  </label>
                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    <Globe size={11} className="text-sky-600" />
                    <span>Regla Oficial: Arica (Presencial/Virtual) • Regiones (100% Virtual)</span>
                  </span>
                </div>

                {/* Explicación Normativa */}
                <div className="p-3.5 bg-gradient-to-r from-sky-50/80 via-slate-50 to-emerald-50/80 rounded-2xl border border-sky-200 text-xs text-slate-700 leading-relaxed space-y-1.5">
                  <p className="font-semibold text-slate-900 flex items-center gap-1.5">
                    <Building2 size={14} className="text-[#0284c7]" />
                    <span>Protocolo de Impartición según Residencia del Estudiante:</span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    El sistema detecta automáticamente la ciudad o región del postulante. Si el estudiante reside en <strong>Arica</strong>, tiene acceso a modalidad <strong>Presencial y Virtual</strong> (sede Blanco Encalada N°666 y aula virtual). Si reside en <strong>otras ciudades, pueblos, campamentos mineros o regiones</strong> (Iquique, Antofagasta, Calama, Santiago, etc.), su modalidad asignada es <strong>Totalmente Virtual (100% Online)</strong> con clases sincrónicas en vivo por Zoom y plataforma SENCE 24/7.
                  </p>
                </div>

                {/* Dos Tarjetas Paralelas: Arica vs Regiones */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">

                  {/* Tarjeta 1: Arica */}
                  <div className="p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-2.5 relative overflow-hidden shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-black text-emerald-900">
                        <Building2 size={16} className="text-emerald-700" />
                        <span>Alumnos de Arica (Sede Central)</span>
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-emerald-600 text-white shadow-2xs">
                        Presencial & Virtual
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-emerald-950">
                      <p className="font-bold flex items-center gap-1">
                        <span>📍 Sede Central:</span>
                        <span className="font-normal">Blanco Encalada N°666, 2do Piso, Arica</span>
                      </p>
                      <p className="text-emerald-800 leading-normal">
                        ✓ Clases presenciales teórico-prácticas en sala y talleres especializados.
                      </p>
                      <p className="text-emerald-800 leading-normal">
                        ✓ Acceso simultáneo al Aula Virtual Moodle / SENCE para material y repasos.
                      </p>
                      <p className="text-emerald-800 leading-normal">
                        ✓ Instrucción y polígono táctico directo en Arica para cursos OS-10.
                      </p>
                    </div>
                  </div>

                  {/* Tarjeta 2: Otras Ciudades y Pueblos */}
                  <div className="p-4 rounded-2xl border-2 border-sky-300 bg-sky-50/50 space-y-2.5 relative overflow-hidden shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-xs font-black text-sky-900">
                        <Globe size={16} className="text-sky-700" />
                        <span>Otras Ciudades, Pueblos & Regiones</span>
                      </span>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-[#0284c7] text-white shadow-2xs">
                        100% Virtual Online
                      </span>
                    </div>

                    <div className="space-y-1 text-[11px] text-sky-950">
                      <p className="font-bold flex items-center gap-1">
                        <span>🌐 Cobertura:</span>
                        <span className="font-normal">Iquique, Antofagasta, Calama, Santiago y todo Chile</span>
                      </p>
                      <p className="text-sky-800 leading-normal">
                        ✓ Clases sincrónicas en vivo transmitidas vía Zoom con instructores oficiales.
                      </p>
                      <p className="text-sky-800 leading-normal">
                        ✓ Campus Virtual interactivo 24/7 para estudio asincrónico y cuestionarios.
                      </p>
                      <p className="text-sky-800 leading-normal">
                        ✓ Cero gastos de traslado o alojamiento. Certificación oficial con validez nacional.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Asignación de Etiquetas de Modalidad: Presencial y/o Virtual */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border-2 border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs font-black text-slate-900 uppercase flex items-center gap-1.5">
                      <Sliders size={14} className="text-[#0284c7]" />
                      <span>Etiquetas de Modalidad Asignadas a esta Capacitación:</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Modifica si el curso tendrá etiqueta "Presencial", "Virtual" o ambas
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Botón Switch Presencial */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !formData.permitePresencial;
                        if (!next && !formData.permiteVirtual) return;
                        setFormData({ ...formData, permitePresencial: next });
                      }}
                      className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${formData.permitePresencial
                          ? 'bg-emerald-50 border-emerald-500 text-emerald-950 shadow-xs ring-2 ring-emerald-400/20'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black ${formData.permitePresencial ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                          <Building2 size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-black">Etiqueta "Presencial"</div>
                          <div className="text-[10px] text-slate-500 font-normal">Habilitado para Sede Central Arica / Talleres</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${formData.permitePresencial ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                        {formData.permitePresencial ? 'ACTIVADA ✓' : 'INACTIVA'}
                      </span>
                    </button>

                    {/* Botón Switch Virtual */}
                    <button
                      type="button"
                      onClick={() => {
                        const next = !formData.permiteVirtual;
                        if (!next && !formData.permitePresencial) return;
                        setFormData({ ...formData, permiteVirtual: next });
                      }}
                      className={`p-3.5 rounded-xl border-2 text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${formData.permiteVirtual
                          ? 'bg-sky-50 border-[#0284c7] text-sky-950 shadow-xs ring-2 ring-sky-400/20'
                          : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black ${formData.permiteVirtual ? 'bg-[#0284c7] text-white' : 'bg-slate-200 text-slate-500'
                          }`}>
                          <Laptop size={18} />
                        </div>
                        <div>
                          <div className="text-xs font-black">Etiqueta "Virtual"</div>
                          <div className="text-[10px] text-slate-500 font-normal">Habilitado para Aula Virtual 24/7 y Zoom</div>
                        </div>
                      </div>
                      <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg ${formData.permiteVirtual ? 'bg-[#0284c7] text-white' : 'bg-slate-200 text-slate-600'
                        }`}>
                        {formData.permiteVirtual ? 'ACTIVADA ✓' : 'INACTIVA'}
                      </span>
                    </button>
                  </div>

                  {/* Vista previa en vivo */}
                  <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 font-medium border-t border-slate-100">
                    <span className="font-bold text-slate-700">Etiquetas visibles en catálogo:</span>
                    {formData.permitePresencial && (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded text-[11px]">
                        <Building2 size={11} /> Presencial
                      </span>
                    )}
                    {formData.permiteVirtual && (
                      <span className="inline-flex items-center gap-1 font-bold text-[#0284c7] bg-sky-100 border border-sky-300 px-2.5 py-0.5 rounded text-[11px]">
                        <Laptop size={11} /> Virtual
                      </span>
                    )}
                  </div>
                </div>

                {/* Campos de configuración editables para el curso */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="md:col-span-4">
                    <label className="text-xs font-bold text-slate-700 block">
                      Modalidad Declarada SENCE
                    </label>
                    <span className="text-[10px] text-slate-500 block">
                      Texto que figura en diplomas y catálogo
                    </span>
                  </div>
                  <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <select
                        value={formData.modalidad}
                        onChange={(e) => setFormData({ ...formData, modalidad: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 font-medium focus:outline-none focus:border-[#0284c7]"
                      >
                        <option value="Presencial y Virtual (Híbrida Regional)">Presencial en Arica / 100% Virtual en Regiones</option>
                        <option value="Presencial / Semipresencial">Presencial / Semipresencial</option>
                        <option value="Online Sincrónico + Asíncrono 24/7">Online Sincrónico + Asíncrono 24/7</option>
                        <option value="100% Online Aula Virtual">100% Online Aula Virtual SENCE</option>
                        <option value="Presencial con Terreno y Prácticas">Presencial con Terreno y Prácticas</option>
                      </select>
                    </div>
                    <div>
                      <input
                        type="text"
                        placeholder="ej. 90 Horas Cronológicas"
                        value={formData.duracion}
                        onChange={(e) => setFormData({ ...formData, duracion: e.target.value })}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7]"
                        title="Duración total del curso"
                      />
                    </div>
                  </div>
                </div>

                {/* Simulador Interactivo de Comprobación en Tiempo Real */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Compass size={14} className="text-[#0284c7]" />
                      <span>Simulador de Modalidad según Ciudad / Región del Alumno:</span>
                    </span>
                    <span className="text-[10px] text-slate-500">
                      Prueba cómo responde el sistema al matricular un estudiante
                    </span>
                  </div>

                  {/* Botones de ciudades rápidas */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 mr-1 font-semibold">Probar ciudad:</span>
                    {[
                      { name: 'Arica', label: '📍 Arica (Sede)' },
                      { name: 'Valle de Azapa', label: '🌴 Azapa / Lluta' },
                      { name: 'Iquique', label: '🏢 Iquique' },
                      { name: 'Alto Hospicio', label: '🏠 Alto Hospicio' },
                      { name: 'Antofagasta', label: '⛏️ Antofagasta' },
                      { name: 'Calama', label: '🏜️ Calama' },
                      { name: 'Santiago', label: '🏙️ Santiago' },
                      { name: 'Pozo Almonte', label: '🏡 Pueblo / Comuna' }
                    ].map(btn => (
                      <button
                        key={btn.name}
                        type="button"
                        onClick={() => setTestCity(btn.name)}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${testCity === btn.name
                            ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>

                  {/* Input libre y Resultado en vivo */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                    <div className="sm:col-span-5">
                      <input
                        type="text"
                        placeholder="O escribe cualquier ciudad o pueblo..."
                        value={testCity}
                        onChange={(e) => setTestCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-[#0284c7]"
                      />
                    </div>

                    <div className="sm:col-span-7">
                      {isAricaTest ? (
                        <div className="p-2.5 bg-emerald-500/10 border border-emerald-300 rounded-xl flex items-center gap-2.5 text-xs text-emerald-950 animate-in fade-in">
                          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                          <div>
                            <span className="font-extrabold text-emerald-900">Modalidad: Presencial y Virtual</span>
                            <span className="block text-[10px] text-emerald-800">
                              Estudiante de "{testCity}": Habilitado para clases en Sede Central (Blanco Encalada 666) y Aula Virtual.
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="p-2.5 bg-sky-500/10 border border-sky-300 rounded-xl flex items-center gap-2.5 text-xs text-sky-950 animate-in fade-in">
                          <Laptop size={16} className="text-[#0284c7] flex-shrink-0" />
                          <div>
                            <span className="font-extrabold text-sky-900">Modalidad: Totalmente Virtual (100% Online)</span>
                            <span className="block text-[10px] text-sky-800">
                              Estudiante de "{testCity}": Asignado automáticamente a Clases en vivo vía Zoom + Campus SENCE 24/7.
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

              </div>

              {/* Fechas de inicio y fin */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
                <label className="md:col-span-4 text-xs font-bold text-slate-700">
                  Fechas de impartición
                </label>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Fecha de Inicio:</span>
                    <input
                      type="text"
                      placeholder="ej. 14 de Octubre, 2026"
                      value={formData.fechaInicio}
                      onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Fecha de Finalización:</span>
                    <input
                      type="text"
                      placeholder="ej. 20 de Noviembre, 2026"
                      value={formData.fechaFin}
                      onChange={(e) => setFormData({ ...formData, fechaFin: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              {/* Identificador SENCE y Precio */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-5">
                <label className="md:col-span-4 text-xs font-bold text-slate-700">
                  Código SENCE y Arancel
                </label>
                <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Código SENCE Oficial:</span>
                    <input
                      type="text"
                      placeholder="ej. OS10-FORM-01"
                      value={formData.idSence}
                      onChange={(e) => setFormData({ ...formData, idSence: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 font-mono focus:outline-none focus:border-[#0284c7] focus:bg-white"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block mb-1 font-semibold">Arancel Curso (CLP):</span>
                    <input
                      type="text"
                      placeholder="ej. 120000"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-[#0284c7] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* 2. SECCIÓN DESCRIPCIÓN CON SIMULADOR TINYMCE */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('descripcion')}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer border-b border-slate-200"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              {openSections.descripcion ? <ChevronDown size={18} className="text-[#0284c7]" /> : <ChevronRight size={18} />}
              <span>2. Descripción del Curso y Objetivos Pedagógicos</span>
            </div>
            <span className="text-[11px] text-slate-500">Editor TinyMCE SENCE</span>
          </button>

          {openSections.descripcion && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                <label className="md:col-span-3 text-xs font-bold text-slate-700 pt-2">
                  Resumen y temario
                </label>

                {/* Simulador TinyMCE */}
                <div className="md:col-span-9 bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                  {/* TinyMCE Toolbar */}
                  <div className="bg-slate-100 px-3 py-2 border-b border-slate-200 flex flex-wrap items-center gap-1 text-slate-700 text-xs select-none">
                    <select className="bg-white border border-slate-300 rounded px-2 py-1 text-[11px] text-slate-800">
                      <option>Párrafo</option>
                      <option>Encabezado 1</option>
                      <option>Encabezado 2</option>
                      <option>Encabezado 3</option>
                    </select>

                    <div className="h-4 w-px bg-slate-300 mx-1"></div>

                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Negrita">
                      <Bold size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Cursiva">
                      <Italic size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Subrayado">
                      <Underline size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1"></div>

                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Lista con viñetas">
                      <List size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Lista numerada">
                      <ListOrdered size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1"></div>

                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Alinear a la izquierda">
                      <AlignLeft size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Centrar">
                      <AlignCenter size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Alinear a la derecha">
                      <AlignRight size={14} />
                    </button>

                    <div className="h-4 w-px bg-slate-300 mx-1"></div>

                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Insertar enlace">
                      <LinkIcon size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Insertar imagen">
                      <ImageIcon size={14} />
                    </button>
                    <button type="button" className="p-1 hover:bg-slate-200 rounded text-slate-700" title="Código HTML">
                      <Code size={14} />
                    </button>
                  </div>

                  {/* TinyMCE Textarea */}
                  <textarea
                    rows="6"
                    value={formData.resumen}
                    onChange={(e) => setFormData({ ...formData, resumen: e.target.value })}
                    placeholder="Escribe la descripción oficial, objetivos de aprendizaje y contenidos del programa formativo..."
                    className="w-full bg-white p-4 text-xs sm:text-sm text-slate-800 focus:outline-none resize-y leading-relaxed font-sans"
                  ></textarea>

                  {/* TinyMCE Status bar */}
                  <div className="bg-slate-50 px-3 py-1 text-[10px] text-slate-500 border-t border-slate-200 flex justify-between">
                    <span>TinyMCE 6.8 (Integración SENCE LMS PrevySeg)</span>
                    <span>{formData.resumen ? formData.resumen.split(/\s+/).filter(Boolean).length : 0} palabras</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. FORMATO Y ARCHIVOS */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <button
            type="button"
            onClick={() => toggleSection('formato')}
            className="w-full flex items-center justify-between p-4 sm:p-5 bg-white hover:bg-slate-50 transition-colors text-left cursor-pointer border-b border-slate-200"
          >
            <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
              {openSections.formato ? <ChevronDown size={18} className="text-[#0284c7]" /> : <ChevronRight size={18} />}
              <span>3. Formato del Aula Virtual y Límites de Archivo</span>
            </div>
            <span className="text-[11px] text-slate-500">Estructura didáctica y cuotas de subida</span>
          </button>

          {openSections.formato && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-4 text-xs font-bold text-slate-700">
                  Formato del aula virtual
                </label>
                <div className="md:col-span-8">
                  <select
                    value={formData.formatoCurso}
                    onChange={(e) => setFormData({ ...formData, formatoCurso: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
                  >
                    <option value="Temas por Unidades Didácticas">Formato por Temas (Módulos SENCE NCh 2728)</option>
                    <option value="Formato Semanal">Formato Semanal</option>
                    <option value="Formato de Actividad Única">Actividad Única (Taller Express)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <label className="md:col-span-4 text-xs font-bold text-slate-700">
                  Límite máximo de subida
                </label>
                <div className="md:col-span-8">
                  <select
                    value={formData.limiteSubida}
                    onChange={(e) => setFormData({ ...formData, limiteSubida: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#0284c7] focus:bg-white cursor-pointer"
                  >
                    <option value="16MB">16 MB</option>
                    <option value="32MB">32 MB</option>
                    <option value="64MB">64 MB (Recomendado para tareas y videos)</option>
                    <option value="128MB">128 MB (Paquetes SCORM interactivos)</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Footer Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            type="button"
            onClick={() => {
              if (selectedCourse) populateForm(selectedCourse);
            }}
            className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold cursor-pointer flex items-center gap-1.5"
          >
            <RotateCcw size={14} />
            <span>Restablecer Cambios</span>
          </button>

          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-sky-600 active:scale-95 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={15} />
            <span>{isSaving ? 'Guardando en Supabase...' : 'Guardar Cambios y Publicar'}</span>
          </button>
        </div>

      </form>

      {/* Modal Gestor de Disponibilidad, Cupos y Fechas */}
      <CourseManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
      />

      {/* Modal Creación de Nuevos Cursos con Selección de Modalidad */}
      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialSchool={activeSchoolFilter !== 'all' && activeSchoolFilter !== 'ocultos' ? activeSchoolFilter : 'seguridad'}
        onSuccess={() => fetchCourses()}
      />
    </div>
  );
};

export default SettingsView;
