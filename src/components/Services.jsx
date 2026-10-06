import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight,
  Shield,
  Wrench,
  Sparkles,
  Clock,
  CheckCircle2,
  Award,
  Calendar,
  Users,
  Check,
  ChevronRight,
  Building2,
  Laptop,
  FileCheck,
  BookOpen
} from 'lucide-react';
import { 
  SecuritySchoolLogo, 
  TradesSchoolLogo 
} from './logos/SchoolLogos';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SenceTramosSection from './SenceTramosSection';
import { DEFAULT_COURSES, getSavedCourses } from '../data/coursesData';
import CourseCurriculumModal from './CourseCurriculumModal';

gsap.registerPlugin(ScrollTrigger);

// Re-export compatible para LMS y modales
export const COURSES_DATA = DEFAULT_COURSES;

const Services = ({ onSelectCourse, onOpenSchoolDetail, activeSchool = 'seguridad', onSwitchSchool }) => {
  const [coursesList, setCoursesList] = useState(getSavedCourses());
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [expandedReqs, setExpandedReqs] = useState({});
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState(null);
  const sectionRef = useRef(null);

  const toggleReqs = (id) => {
    setExpandedReqs(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Escuchar actualizaciones en tiempo real de cupos, fechas y disponibilidad
  useEffect(() => {
    const handleCoursesUpdate = (e) => {
      if (e.detail && Array.isArray(e.detail)) {
        setCoursesList(e.detail);
      } else {
        setCoursesList(getSavedCourses());
      }
    };
    window.addEventListener('prevyseg-courses-updated', handleCoursesUpdate);
    return () => window.removeEventListener('prevyseg-courses-updated', handleCoursesUpdate);
  }, []);

  // Cursos filtrados por la escuela activa (ocultar borradores/desactivados)
  const schoolCourses = coursesList.filter(c => c.school === activeSchool && c.activo !== false);

  // Categorías de la escuela activa
  const categories = ['Todos', ...new Set(schoolCourses.map(c => c.category))];

  // Cursos finales según subcategoría seleccionada
  const finalCourses = selectedCategory === 'Todos'
    ? schoolCourses
    : schoolCourses.filter(c => c.category === selectedCategory);

  // Reset category al cambiar de escuela
  useEffect(() => {
    setSelectedCategory('Todos');
  }, [activeSchool]);

  // Animaciones de entrada con GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.escuelas-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '.escuelas-header', start: 'top 85%', once: true } }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeSchool]);

  return (
    <section 
      id="servicios" 
      ref={sectionRef} 
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-slate-50 to-white relative border-t border-slate-200 overflow-hidden scroll-mt-24"
    >
      {/* Anchor compatible para enlaces previos que apunten a #escuelas o #cursos */}
      <div id="escuelas" className="absolute -top-20 left-0" />
      <div id="cursos" className="absolute -top-20 left-0" />

      {/* Fondos luminosos decorativos con la paleta de los trípticos oficiales */}
      <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] pointer-events-none -translate-y-1/3 translate-x-1/3 transition-colors duration-700 ${
        activeSchool === 'seguridad' ? 'bg-[#00C4D8]/10' : 'bg-[#00A896]/10'
      }`} />
      <div className={`absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full blur-[130px] pointer-events-none -translate-x-1/3 transition-colors duration-700 ${
        activeSchool === 'seguridad' ? 'bg-[#0A7D8C]/12' : 'bg-[#071626]/10'
      }`} />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* =========================================================================
            ENCABEZADO PRINCIPAL: CATÁLOGO OFICIAL DE LA ESCUELA SELECCIONADA
        ========================================================================= */}
        <div className="escuelas-header text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#071626] text-white text-xs font-black tracking-widest uppercase shadow-md border border-[#0A7D8C]/50">
            <Award size={14} className={activeSchool === 'seguridad' ? 'text-[#00C4D8]' : 'text-[#00FFE0]'} />
            <span>
              {activeSchool === 'seguridad' ? 'ESCUELA DE SEGURIDAD PRIVADA • CATÁLOGO OFICIAL' : 'ESCUELA DE OFICIOS Y SENCE • CATÁLOGO OFICIAL'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]">
            Programas y Cursos de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#071626] via-[#0A7D8C] to-[#00A896]">
              {activeSchool === 'seguridad' ? 'Seguridad Privada' : 'Oficios y Habilidades Laborales'}
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
            {activeSchool === 'seguridad'
              ? 'Capacitaciones autorizadas y reguladas por la Subsecretaría de Prevención del Delito (SPD / Carabineros OS-10) bajo la Ley 21.659. Selecciona tu curso para abrir la Ficha de Admisión Oficial con abono del 50%.'
              : 'Capacitaciones prácticas en talleres y aula virtual con certificación directa OTEC PrevySeg bajo la Norma NCh 2728:2015 SGS y código SENCE. Selecciona tu curso para abrir la Ficha de Admisión Oficial con abono del 50%.'}
          </p>
        </div>

        {/* =========================================================================
            BANNER EXPLICATIVO DE LA ESCUELA ACTIVA
        ========================================================================= */}
        <AnimatePresence mode="wait">
          {activeSchool === 'seguridad' ? (
            <motion.div
              key="banner-seguridad"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071626] via-[#0B2032] to-[#0A7D8C]/20 border border-[#0A7D8C]/50 shadow-xl relative overflow-hidden text-white"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <SecuritySchoolLogo className="h-12 sm:h-14" variant="dark" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#E0F2FE]/90 leading-relaxed">
                    <strong className="text-[#00C4D8]">Programas Oficiales de Seguridad Privada:</strong> Formación Inicial, Perfeccionamiento Trienal y Especialización Tecnológica (CCTV SENCE, Alarmas y Supervisores) conforme a la <strong className="text-white">Ley 21.659</strong> y directivas de la Subsecretaría de Prevención del Delito (SPD).
                  </p>
                </div>

                <div className="flex flex-wrap lg:flex-col gap-2 flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B2032] border border-[#00C4D8]/40 text-[#00E5FF] text-xs font-bold shadow-xs">
                    <CheckCircle2 size={14} className="text-[#00C4D8]" />
                    <span>Acreditación SPD &amp; SENCE</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B2032] border border-[#00C4D8]/40 text-[#00E5FF] text-xs font-bold shadow-xs">
                    <CheckCircle2 size={14} className="text-[#00C4D8]" />
                    <span>Abono del 50% para reserva de cupo</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="banner-oficios"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#071626] via-[#0B2032] to-[#008B8B]/25 border border-[#00A896]/40 shadow-xl relative overflow-hidden text-white"
            >
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-3 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <TradesSchoolLogo className="h-12 sm:h-14" variant="dark" />
                  </div>
                  <p className="text-xs sm:text-sm text-[#E0F2FE]/90 leading-relaxed">
                    <strong className="text-[#00FFE0]">Escuela de Oficios y Habilidades Laborales:</strong> Formación práctica en Resolución de Conflictos, Área Agropecuaria, Operaciones Portuarias, Alimentación, Estética y Servicios, Salud y Administración, bajo <strong className="text-white">Norma de Calidad NCh 2728:2015 SGS</strong>.
                  </p>
                </div>

                <div className="flex flex-wrap lg:flex-col gap-2 flex-shrink-0">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B2032] border border-[#00A896]/40 text-[#00FFE0] text-xs font-bold shadow-xs">
                    <CheckCircle2 size={14} className="text-[#00A896]" />
                    <span>Certificado CL 13/20100689 SGS</span>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0B2032] border border-[#00A896]/40 text-[#00FFE0] text-xs font-bold shadow-xs">
                    <CheckCircle2 size={14} className="text-[#00A896]" />
                    <span>Desarrollo de Competencias Prácticas</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =========================================================================
            SUB-FILTROS POR CATEGORÍA DE LA ESCUELA SELECCIONADA
        ========================================================================= */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer border ${
                selectedCategory === cat
                  ? activeSchool === 'seguridad'
                    ? 'bg-[#071626] text-[#00E5FF] border-[#00C4D8] shadow-md scale-105'
                    : 'bg-[#071626] text-[#00FFE0] border-[#00A896] shadow-md scale-105'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* =========================================================================
            GRID DE CURSOS DE LA ESCUELA SELECCIONADA
        ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {finalCourses.map((course) => {
              const isProx = Boolean(course.proximamente);
              const isAvailable = !isProx && course.disponible && course.cupos > 0;

              return (
                <motion.div
                  key={course.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  whileHover={{ y: -6 }}
                  onClick={() => setSelectedCourseForCurriculum(course)}
                  className={`rounded-3xl overflow-hidden bg-white border shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
                    course.school === 'seguridad'
                      ? 'border-slate-200 hover:border-[#00C4D8]/60 hover:shadow-sky-500/10'
                      : 'border-slate-200 hover:border-[#00A896]/60 hover:shadow-emerald-500/10'
                  }`}
                  title="Haz clic para ver la información completa, horas, modalidad y módulos de este curso"
                >
                  <div>
                    {/* Imagen y Badges */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-900 group">
                      <img 
                        src={course.image} 
                        alt={course.title} 
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />

                      {/* Hint visual interactivo al posar el cursor */}
                      <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-slate-900 font-extrabold text-[11px] shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                          <BookOpen size={13} className={course.school === 'seguridad' ? 'text-[#0284c7]' : 'text-[#00A896]'} />
                          <span>Más Información y Contenido</span>
                        </span>
                      </div>

                      {/* Badge Superior Izquierdo con el Logo de la Escuela */}
                      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg backdrop-blur-md text-[10px] font-black uppercase shadow-md border ${
                          course.school === 'seguridad'
                            ? 'bg-[#071626]/95 text-[#00E5FF] border-[#00C4D8]/40'
                            : 'bg-[#071626]/95 text-[#00FFE0] border-[#00A896]/40'
                        }`}>
                          {course.school === 'seguridad' ? (
                            <>
                              <Shield size={12} className="text-[#00C4D8]" />
                              <span>Escuela de Seguridad</span>
                            </>
                          ) : (
                            <>
                              <Wrench size={12} className="text-[#00A896]" />
                              <span>Oficios y Cursos SENCE</span>
                            </>
                          )}
                        </div>

                        <span className="bg-white/95 backdrop-blur-md text-slate-800 text-[9px] font-bold px-2 py-0.5 rounded shadow-xs">
                          {course.category}
                        </span>
                      </div>

                      {/* Badge Superior Derecho: Destacado */}
                      {course.highlight && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className={`text-white text-[10px] font-extrabold px-2.5 py-1 rounded-md shadow-md border ${
                            course.school === 'seguridad'
                              ? 'bg-[#0A7D8C] border-[#00C4D8]/40'
                              : 'bg-[#00A896] border-[#00FFE0]/40'
                          }`}>
                            {course.highlight}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Título, Disponibilidad, Fechas y Descripción */}
                    <div className="p-6 space-y-3">
                      
                      {/* Duración y Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1.5">
                          <Clock size={13} className={course.school === 'seguridad' ? 'text-[#0A7D8C]' : 'text-[#00A896]'} />
                          <span>{course.duration}</span>
                        </span>

                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded ${
                          course.school === 'seguridad'
                            ? 'bg-[#0A7D8C]/12 text-[#0A7D8C] border border-[#0A7D8C]/30'
                            : 'bg-[#00A896]/12 text-[#008B8B] border border-[#00A896]/30'
                        }`}>
                          {course.badgeText}
                        </span>
                      </div>

                      {/* Título Oficial */}
                      <h3 className={`text-base font-bold leading-snug transition-colors line-clamp-2 ${
                        course.school === 'seguridad'
                          ? 'text-[#071626] group-hover:text-[#0A7D8C]'
                          : 'text-[#071626] group-hover:text-[#00A896]'
                      }`}>
                        {course.title}
                      </h3>

                      {/* Etiquetas de Modalidad: Presencial y/o Virtual */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        {course.permitePresencial !== false && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                            <Building2 size={11} className="text-emerald-700" />
                            <span>Presencial</span>
                          </span>
                        )}
                        {course.permiteVirtual !== false && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-100 text-[#0284c7] border border-sky-300 shadow-2xs">
                            <Laptop size={11} className="text-[#0284c7]" />
                            <span>Virtual</span>
                          </span>
                        )}
                      </div>

                      {/* Disponibilidad y Cupos Restantes */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {isProx ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                            <Clock size={12} className="text-amber-700 animate-pulse" />
                            <span>PRÓXIMAMENTE • Apertura Próxima</span>
                          </span>
                        ) : isAvailable ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>DISPONIBLE • {course.cupos} vacantes restantes</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>NO DISPONIBLE / CUPOS AGOTADOS</span>
                          </span>
                        )}
                      </div>

                      {/* Fechas de Inicio y Término */}
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-slate-100/80 px-2.5 py-1 rounded-xl border border-slate-200">
                        <Calendar size={12} className="text-[#0A4DA2] flex-shrink-0" />
                        <span className="truncate">
                          <strong>Inicio:</strong> {course.fecha_inicio} • <strong>Término:</strong> {course.fecha_termino}
                        </span>
                      </div>

                      {/* Horario y Días */}
                      {course.horario && (
                        <div className="flex items-start gap-2 text-xs text-sky-950 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/90 px-3 py-2 rounded-xl shadow-2xs">
                          <Clock size={15} className="text-[#0284c7] flex-shrink-0 mt-0.5" />
                          <div className="min-w-0">
                            <span className="font-extrabold text-[#072B4F] text-xs block leading-tight">
                              {course.dias ? `${course.dias} • ` : ''}{course.horario}
                            </span>
                            {course.jornada && (
                              <span className="text-[10px] text-sky-700 font-medium block leading-tight mt-0.5">
                                {course.jornada}
                              </span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Descripción Breve */}
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>

                      {/* Botón Destacado: Más Información y Contenido Completo */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCourseForCurriculum(course);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border shadow-xs ${
                          course.school === 'seguridad'
                            ? 'bg-sky-50/90 hover:bg-sky-100 text-sky-950 border-sky-300/80 hover:border-sky-400'
                            : 'bg-emerald-50/90 hover:bg-emerald-100 text-emerald-950 border-emerald-300/80 hover:border-emerald-400'
                        }`}
                        title="Ver contenido, horas, modalidad y temario completo"
                      >
                        <span className="flex items-center gap-2">
                          <BookOpen size={15} className={course.school === 'seguridad' ? 'text-[#0284c7]' : 'text-[#00A896]'} />
                          <span className="font-extrabold text-xs">Más Información (Horas, Modalidad y Módulos)</span>
                        </span>
                        <span className={`text-[10px] font-black uppercase flex items-center gap-0.5 tracking-wider ${
                          course.school === 'seguridad' ? 'text-[#0284c7]' : 'text-[#00A896]'
                        }`}>
                          <span>Ver Ficha</span>
                          <ChevronRight size={13} />
                        </span>
                      </button>

                      {/* Requisitos Legales Exigidos en Chile */}
                      {course.requisitos && course.requisitos.length > 0 && (
                        <div className="pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleReqs(course.id);
                            }}
                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-800 text-[11px] font-bold transition-all cursor-pointer border border-slate-200"
                          >
                            <span className="flex items-center gap-1.5">
                              <FileCheck size={13} className="text-[#0A7D8C]" />
                              <span>Requisitos exigidos en Chile ({course.requisitos.length})</span>
                            </span>
                            <span className="text-[#0A7D8C] text-[10px] font-extrabold">
                              {expandedReqs[course.id] ? '▲ Ocultar' : '▼ Ver Requisitos'}
                            </span>
                          </button>
                          <AnimatePresence>
                            {expandedReqs[course.id] && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-2 p-3.5 rounded-xl bg-sky-50/70 border border-sky-200/80 text-[11px] space-y-2 overflow-hidden"
                              >
                                <div className="font-extrabold text-[#072B4F] flex items-center gap-1.5">
                                  <Shield size={12} className="text-[#0284c7]" />
                                  <span>Requisitos según normativa chilena (Ley 21.659 / OS-10):</span>
                                </div>
                                <ul className="space-y-1.5 pl-3 list-disc text-slate-700 leading-snug">
                                  {course.requisitos.map((req, rIdx) => (
                                    <li key={rIdx}>{req}</li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Aranceles y Botón de Inscripción */}
                  <div className="p-6 pt-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Arancel Oficial:
                      </div>
                      <div className="text-lg font-black text-slate-900">
                        {course.price}
                      </div>
                      <div className={`text-[11px] font-bold ${
                        course.school === 'seguridad' ? 'text-[#0A7D8C]' : 'text-[#008B8B]'
                      }`}>
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
                            : course.school === 'seguridad'
                            ? 'bg-gradient-to-r from-[#071626] to-[#0A7D8C] hover:from-[#0B2032] hover:to-[#009688] shadow-[#071626]/30 border border-[#00C4D8]/30 cursor-pointer'
                            : 'bg-gradient-to-r from-[#071626] to-[#00A896] hover:from-[#0B2032] hover:to-[#0A7D8C] shadow-[#071626]/30 border border-[#00A896]/40 cursor-pointer'
                        }`}
                      >
                        <span>{isAvailable ? 'Inscribirme' : 'Sin Cupos'}</span>
                        <ArrowRight size={14} />
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

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
    </section>
  );
};

export default Services;
