import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Laptop, 
  Shield, 
  Wrench, 
  Clock, 
  Calendar, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  ChevronRight, 
  BookOpen, 
  Globe, 
  Sparkles, 
  Home, 
  Check, 
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { getSavedCourses } from '../data/coursesData';
import CourseCurriculumModal from './CourseCurriculumModal';

const OnlineCoursesView = ({ onSelectCourse, onReturnHome, onOpenSchoolDetail }) => {
  const [courses, setCourses] = useState(getSavedCourses());
  const [selectedSchool, setSelectedSchool] = useState('all'); // 'all' | 'seguridad' | 'oficios'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState(null);

  // Escuchar cambios reactivos en tiempo real desde el LMS / Administración
  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setCourses(e.detail);
      } else {
        setCourses(getSavedCourses());
      }
    };
    window.addEventListener('prevyseg-courses-updated', handleUpdate);
    return () => window.removeEventListener('prevyseg-courses-updated', handleUpdate);
  }, []);

  // Filtrar exclusivamente los cursos que tienen habilitada la modalidad ONLINE / VIRTUAL
  const onlineCourses = useMemo(() => {
    return courses.filter(course => {
      // Regla de visibilidad y modalidad online:
      // Si el administrador colocó que NO permite virtual (permiteVirtual === false), NO aparece aquí
      const isOnline = course.activo !== false && course.permiteVirtual !== false;
      if (!isOnline) return false;

      // Filtro de escuela
      if (selectedSchool !== 'all' && course.school !== selectedSchool) return false;

      // Filtro de búsqueda
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = (course.title || course.titulo || '').toLowerCase().includes(q);
        const matchesCat = (course.category || '').toLowerCase().includes(q);
        const matchesDesc = (course.description || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesCat && !matchesDesc) return false;
      }

      return true;
    });
  }, [courses, selectedSchool, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">

      {/* ================= HERO BANNER ONLINE ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#071626] via-[#0A2540] to-[#0A4DA2] text-white pt-10 pb-16 px-4 sm:px-8 border-b border-white/10 shadow-lg">
        {/* Decoraciones de Fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-400/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">

          {/* Breadcrumbs y Botón Volver */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <button
                type="button"
                onClick={onReturnHome}
                className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Home size={13} />
                <span>Inicio</span>
              </button>
              <span>/</span>
              <span className="text-[#00FFE0] font-bold">Cursos Modalidad Online</span>
            </div>

            <button
              type="button"
              onClick={onReturnHome}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <span>← Volver a Todos los Cursos (Inicio)</span>
            </button>
          </div>

          {/* Título Principal y Subtítulo */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/15 text-[#00FFE0] text-xs font-extrabold uppercase border border-cyan-400/30">
              <Laptop size={14} />
              <span>Modalidad E-Learning • Cobertura Nacional</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              Cursos en Modalidad Online & Aula Virtual
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
              Fórmate desde cualquier lugar de Chile (Arica a Punta Arenas). Plataforma interactiva disponible 24/7, clases sincrónicas en vivo por Zoom, material descargable y certificación con validez oficial SENCE y Subsecretaría de Prevención del Delito.
            </p>
          </div>

          {/* Chips de Garantía Online */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center gap-2.5">
              <Globe size={18} className="text-[#00FFE0] flex-shrink-0" />
              <div>
                <span className="font-extrabold block">100% Sin Desplazamientos</span>
                <span className="text-[11px] text-slate-300">Disponible para todo el territorio nacional</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center gap-2.5">
              <Laptop size={18} className="text-[#00FFE0] flex-shrink-0" />
              <div>
                <span className="font-extrabold block">Campus Virtual 24/7</span>
                <span className="text-[11px] text-slate-300">Acceso a clases, manuales y evaluaciones</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-sm flex items-center gap-2.5">
              <CheckCircle2 size={18} className="text-[#00FFE0] flex-shrink-0" />
              <div>
                <span className="font-extrabold block">Certificación Oficial</span>
                <span className="text-[11px] text-slate-300">Diplomas verificables con código SENCE</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CONTENIDO Y FILTROS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 mt-8 space-y-8">

        {/* Barra de Filtros */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Switch de Escuelas */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              type="button"
              onClick={() => setSelectedSchool('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedSchool === 'all'
                  ? 'bg-slate-900 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Todos los Cursos Online ({courses.filter(c => c.activo !== false && c.permiteVirtual !== false).length})
            </button>

            <button
              type="button"
              onClick={() => setSelectedSchool('seguridad')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                selectedSchool === 'seguridad'
                  ? 'bg-[#0A7D8C] text-white shadow'
                  : 'bg-sky-50 text-sky-900 hover:bg-sky-100 border border-sky-200'
              }`}
            >
              <Shield size={14} />
              <span>Seguridad Privada Online</span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedSchool('oficios')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                selectedSchool === 'oficios'
                  ? 'bg-[#00A896] text-white shadow'
                  : 'bg-teal-50 text-teal-900 hover:bg-teal-100 border border-teal-200'
              }`}
            >
              <Wrench size={14} />
              <span>Oficios SENCE Online</span>
            </button>
          </div>

          {/* Buscador de Cursos */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar curso online..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-[#0A4DA2] focus:bg-white"
            />
          </div>

        </div>

        {/* Grilla de Cursos Online */}
        {onlineCourses.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-200 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto">
              <Laptop size={28} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">
              No se encontraron cursos online con estos filtros
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Prueba cambiando la búsqueda o restableciendo los filtros para ver todos los cursos disponibles en aula virtual.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedSchool('all');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Ver Todos los Cursos Online
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {onlineCourses.map((course) => {
              const isSecurity = course.school === 'seguridad';
              const isExclusiveOnline = course.permitePresencial === false;
              const isAvailable = course.disponible && course.cupos > 0;
              const isProx = Boolean(course.proximamente);

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedCourseForCurriculum(course)}
                  className={`rounded-3xl overflow-hidden bg-white border shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    isSecurity
                      ? 'border-slate-200 hover:border-[#00C4D8]/60 hover:shadow-sky-500/10'
                      : 'border-slate-200 hover:border-[#00A896]/60 hover:shadow-emerald-500/10'
                  }`}
                  title="Haz clic para ver toda la información y módulos del curso"
                >
                  <div>
                    {/* Imagen y Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Hint visual interactivo al posar el cursor */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 font-extrabold text-[11px] shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <BookOpen size={13} className="text-[#0284c7]" />
                          <span>Más Información y Contenido</span>
                        </span>
                      </div>

                      {/* Badge Superior Izquierdo: Modalidad Online */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg backdrop-blur-md text-[10px] font-black uppercase bg-[#071626]/95 text-[#00FFE0] border border-cyan-400/40 shadow-md">
                          <Laptop size={11} className="text-[#00FFE0]" />
                          <span>{isExclusiveOnline ? '100% Online Exclusivo' : 'Aula Virtual Habilitada'}</span>
                        </span>

                        <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[9px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {course.category}
                        </span>
                      </div>

                      {/* Badge Superior Derecho: Escuela */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className={`text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md border ${
                          isSecurity
                            ? 'bg-[#0A7D8C] border-[#00C4D8]/40'
                            : 'bg-[#00A896] border-[#00FFE0]/40'
                        }`}>
                          {isSecurity ? 'Seguridad' : 'Oficios'}
                        </span>
                      </div>
                    </div>

                    {/* Contenido de la Tarjeta */}
                    <div className="p-6 space-y-3">
                      {/* Duración y Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                          <Clock size={13} className="text-[#0284c7]" />
                          <span>{course.duration}</span>
                        </span>

                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-sky-100 text-[#0284c7] border border-sky-300">
                          {course.badgeText}
                        </span>
                      </div>

                      {/* Título Oficial */}
                      <h3 className="text-base font-bold text-[#071626] group-hover:text-[#0A4DA2] transition-colors line-clamp-2 leading-snug">
                        {course.title}
                      </h3>

                      {/* Fechas de Inicio y Término */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200">
                        <Calendar size={12} className="text-[#0A4DA2] flex-shrink-0" />
                        <span className="truncate">
                          <strong>Inicio:</strong> {course.fecha_inicio} • <strong>Término:</strong> {course.fecha_termino}
                        </span>
                      </div>

                      {/* Descripción Breve */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Botón Destacado: Más Información y Contenido */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourseForCurriculum(course);
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border shadow-xs bg-gradient-to-r from-sky-50 via-sky-100/70 to-blue-50 text-[#072B4F] border-sky-300/80 hover:bg-sky-100 hover:border-sky-400"
                        title="Ver contenido, horas, modalidad y temario completo"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen size={15} className="text-[#0284c7]" />
                          <span className="font-extrabold text-xs">Más Información (Horas, Modalidad y Módulos)</span>
                        </span>
                        <span className="text-[10px] font-black uppercase flex items-center gap-0.5 tracking-wider text-[#0284c7]">
                          <span>Ver Ficha</span>
                          <ChevronRight size={13} />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Arancel y Botón Inscribirme */}
                  <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Arancel Oficial:
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        {course.price}
                      </div>
                      <div className="text-[11px] font-bold text-[#0A7D8C]">
                        Abona hoy: {course.depositPrice}
                      </div>
                    </div>

                    {isProx ? (
                      <motion.button
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectCourse(course.title);
                        }}
                        className="text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 flex-shrink-0 transition-all bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-600 shadow-amber-600/30 border border-amber-300/40 cursor-pointer"
                        title="Consultar fecha y preinscribirse"
                      >
                        <Clock size={14} />
                        <span>PRÓXIMAMENTE</span>
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: isAvailable ? 1.04 : 1 }}
                        whileTap={{ scale: isAvailable ? 0.96 : 1 }}
                        disabled={!isAvailable}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isAvailable) {
                            onSelectCourse(course.title);
                          }
                        }}
                        className={`text-white text-xs font-black py-2.5 px-4 rounded-xl shadow-md flex items-center gap-1.5 flex-shrink-0 transition-all ${
                          !isAvailable
                            ? 'bg-slate-300 text-slate-500 cursor-not-allowed border border-slate-300 shadow-none'
                            : 'bg-gradient-to-r from-[#071626] to-[#0A7D8C] hover:from-[#0B2032] hover:to-[#009688] shadow-[#071626]/30 border border-[#00C4D8]/30 cursor-pointer'
                        }`}
                      >
                        <span>{isAvailable ? 'Inscribirme Online' : 'Sin Cupos'}</span>
                        <ArrowRight size={14} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </section>

      {/* Modal Interactivo de Ficha Curricular y Módulos Oficiales */}
      <CourseCurriculumModal
        isOpen={Boolean(selectedCourseForCurriculum)}
        onClose={() => setSelectedCourseForCurriculum(null)}
        course={selectedCourseForCurriculum}
        onSelectCourse={(courseTitle) => {
          setSelectedCourseForCurriculum(null);
          onSelectCourse(courseTitle);
        }}
      />

    </div>
  );
};

export default OnlineCoursesView;
