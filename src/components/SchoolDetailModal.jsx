import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Shield, 
  Wrench, 
  Clock, 
  CheckCircle2, 
  Award, 
  BookOpen, 
  FileText, 
  UserCheck, 
  GraduationCap, 
  ChevronRight, 
  Calendar, 
  DollarSign, 
  Info, 
  LogIn, 
  ArrowRight,
  Sparkles,
  Search,
  Check,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Percent
} from 'lucide-react';
import { SecuritySchoolEmblem, TradesSchoolEmblem } from './logos/SchoolLogos';
import { COURSES_DATA } from './Services';

import { SYLLABUS_DETAILS, getCourseSyllabus } from '../data/syllabusData';
import CourseCurriculumModal from './CourseCurriculumModal';

const SchoolDetailModal = ({ 
  school, 
  isOpen, 
  onClose, 
  onSelectCourse, 
  onEnterStudentView, 
  currentUser 
}) => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCourseId, setExpandedCourseId] = useState(null);
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState(null);

  if (!isOpen || !school) return null;

  const isSecurity = school === 'seguridad';
  const schoolCourses = COURSES_DATA.filter(c => c.school === school);

  // Obtener categorías únicas
  const categories = ['Todos', ...new Set(schoolCourses.map(c => c.category))];

  // Filtrado de cursos
  const filteredCourses = schoolCourses.filter(course => {
    const matchesCat = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
        >
          {/* ================= ENCABEZADO DE LA ESCUELA ================= */}
          <div className={`relative px-6 py-8 sm:px-10 sm:py-10 text-white overflow-hidden ${
            isSecurity
              ? 'bg-gradient-to-br from-[#071626] via-[#0B2032] to-[#0A7D8C]'
              : 'bg-gradient-to-br from-[#071626] via-[#0B2032] to-[#008B8B]'
          }`}>
            
            {/* Decoración geométrica de fondo */}
            <div className="absolute top-0 right-0 w-96 h-96 opacity-15 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
                <path d="M40 0 L200 160 L200 190 L10 0 Z" fill={isSecurity ? '#00C4D8' : '#00FFE0'} />
              </svg>
            </div>

            {/* Botón de Cierre */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 border border-white/10"
              aria-label="Cerrar ventana"
            >
              <X size={20} />
            </button>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                {isSecurity ? (
                  <SecuritySchoolEmblem className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0" />
                ) : (
                  <TradesSchoolEmblem className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0" />
                )}
                
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border ${
                      isSecurity 
                        ? 'bg-[#00C4D8]/20 text-[#00E5FF] border-[#00C4D8]/40' 
                        : 'bg-[#00FFE0]/20 text-[#00FFE0] border-[#00A896]/40'
                    }`}>
                      {isSecurity ? 'PREVYSEG • LEY N° 21.659' : 'PREVYSEG • CÓDIGO SENCE'}
                    </span>
                    <span className="text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                      Norma Calidad NCh 2728 SGS
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white">
                    {isSecurity ? 'Escuela de Seguridad Privada' : 'Escuela de Oficios y Cursos SENCE'}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                    {isSecurity 
                      ? 'Capacitación técnica y táctica preparatoria conforme a la Ley 21.659. Acreditación oficial ante la Subsecretaría de Prevención del Delito (SPD) y Carabineros OS-10.'
                      : 'Cursos técnicos y de oficios prácticos en talleres de alta tecnología con certificación directa OTEC PrevySeg con validez nacional SENCE para mejorar la empleabilidad laboral.'
                    }
                  </p>
                </div>
              </div>

              {/* Botón destacado: ENTRAR A LA VISTA DE ESTUDIANTE */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    if (onEnterStudentView) onEnterStudentView();
                  }}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <GraduationCap size={18} />
                  <span>{currentUser ? 'Ir a Mi Aula Virtual (Estudiante)' : 'Ingresar como Alumno / Aula Virtual'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>

            {/* Aviso de Regla de Negocio: 1 Estudiante = 1 Curso */}
            <div className="mt-6 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-[11px] sm:text-xs text-white/90">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={15} className={isSecurity ? 'text-[#00C4D8]' : 'text-[#00FFE0]'} />
                <span><strong>Regla de Certificación:</strong> Cada estudiante pertenece a un único curso activo para garantizar una atención y evaluación rigurosa.</span>
              </div>
              <span className="font-mono text-white/70">
                {schoolCourses.length} Capacitaciones Oficiales Disponibles
              </span>
            </div>
          </div>

          {/* ================= BARRA DE BÚSQUEDA Y FILTROS ================= */}
          <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            
            {/* Categorías */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
              {categories.map(category => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === category
                      ? isSecurity
                        ? 'bg-[#071626] text-white shadow-sm'
                        : 'bg-[#00A896] text-white shadow-sm'
                      : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Buscador de cursos */}
            <div className="relative min-w-[260px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o contenido..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#0284c7] shadow-sm"
              />
            </div>
          </div>

          {/* ================= CONTENIDO: LISTADO DE CAPACITACIONES CON DESCRIPCIONES ================= */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-grow">
            
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <BookOpen size={44} className="mx-auto text-slate-300" />
                <p className="text-sm font-semibold text-slate-600">No se encontraron capacitaciones con ese filtro.</p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('Todos'); setSearchQuery(''); }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold cursor-pointer hover:bg-slate-200"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredCourses.map(course => {
                  const syllabus = SYLLABUS_DETAILS[course.id] || null;
                  const isExpanded = expandedCourseId === course.id;

                  return (
                    <div 
                      key={course.id}
                      className={`rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white shadow-sm hover:shadow-md ${
                        isSecurity ? 'border-slate-200 hover:border-[#0A7D8C]' : 'border-slate-200 hover:border-[#00A896]'
                      }`}
                    >
                      <div>
                        {/* Cabecera del Curso con Imagen */}
                        <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                          <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                          
                          {/* Badges superiores */}
                          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                            <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white border border-white/20">
                              {course.badgeText}
                            </span>
                            <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg bg-[#0284c7] text-white shadow">
                              {course.duration}
                            </span>
                          </div>

                          {/* Título en la imagen */}
                          <div className="absolute bottom-3 left-3 right-3">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-300 block mb-1">
                              {course.category}
                            </span>
                            <h3 className="text-base sm:text-lg font-black text-white leading-snug drop-shadow-sm">
                              {course.title}
                            </h3>
                          </div>
                        </div>

                        {/* Descripción y Detalles */}
                        <div className="p-5 space-y-4">
                          <p className="text-xs text-slate-600 leading-relaxed">
                            {course.description}
                          </p>

                          {/* Disponibilidad y Fechas de Inicio/Término */}
                          <div className="flex flex-wrap items-center gap-2">
                            {course.disponible && course.cupos > 0 ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>DISPONIBLE • {course.cupos} vacantes restantes</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                                <span>CUPOS AGOTADOS / NO DISPONIBLE</span>
                              </span>
                            )}

                            <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                              <Calendar size={11} className="text-[#0A4DA2]" />
                              <span>{course.fecha_inicio} al {course.fecha_termino}</span>
                            </span>
                          </div>

                          {/* Días y Horarios del Curso */}
                          {(course.horario || syllabus?.schedule) && (
                            <div className="flex items-center gap-2 text-xs font-bold text-sky-950 bg-sky-50/90 px-3 py-1.5 rounded-xl border border-sky-200/80">
                              <Clock size={14} className="text-[#0284c7] flex-shrink-0" />
                              <span className="truncate">
                                <strong>{course.dias ? `${course.dias} • ` : ''}</strong>{course.horario || syllabus?.schedule}
                              </span>
                            </div>
                          )}

                          {/* Precios & Abono 50% */}
                          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                            <div>
                              <span className="text-[10px] uppercase font-bold text-slate-600 block">Arancel Oficial</span>
                              <span className="font-extrabold text-slate-900 text-sm">{course.price}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-[10px] uppercase font-black text-[#0284c7] block">Abono Inicial (50%)</span>
                              <span className="font-black text-[#0284c7] text-sm">{course.depositPrice}</span>
                            </div>
                          </div>

                          {/* Ficha Desplegable de Temario y Requisitos */}
                          {syllabus && (
                            <div>
                              <button
                                type="button"
                                onClick={() => setExpandedCourseId(isExpanded ? null : course.id)}
                                className="w-full py-2 px-3 rounded-xl bg-slate-100/80 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                              >
                                <span className="flex items-center gap-1.5">
                                  <BookOpen size={14} className="text-[#0284c7]" />
                                  <span>{isExpanded ? 'Ocultar Temario y Requisitos' : 'Ver Temario Oficial, Horarios y Requisitos'}</span>
                                </span>
                                <span className="text-[11px] text-[#0284c7] font-semibold">
                                  {isExpanded ? '▲ Menos' : '▼ Detallar'}
                                </span>
                              </button>

                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 p-4 rounded-xl bg-sky-50/60 border border-sky-100 text-xs space-y-3.5"
                                >
                                  {/* Horarios y Días Oficiales */}
                                  {(syllabus.schedule || course.horario) && (
                                    <div className="p-3 rounded-xl bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200/90 text-slate-800 flex items-start gap-2.5">
                                      <Clock size={16} className="text-[#0284c7] flex-shrink-0 mt-0.5" />
                                      <div className="space-y-0.5">
                                        <span className="font-extrabold text-[#072B4F] text-xs block">
                                          Horario y Régimen de Días:
                                        </span>
                                        <p className="text-slate-800 text-xs font-semibold leading-snug">
                                          {syllabus.schedule || `${course.dias ? `${course.dias} • ` : ''}${course.horario}`}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Objetivo si existe */}
                                  {syllabus.objective && (
                                    <div className="p-3 rounded-xl bg-sky-50 border border-sky-200/80 text-[11px] text-slate-700">
                                      <strong className="text-[#072B4F] block font-bold mb-0.5">Objetivo del Curso:</strong>
                                      <p className="leading-snug">{syllabus.objective}</p>
                                    </div>
                                  )}

                                  {/* Módulos Formativos */}
                                  <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-2">
                                      <FileText size={13} className="text-[#0284c7]" />
                                      <span>Módulos Formativos (Plan de Estudio):</span>
                                    </h4>
                                    <div className="space-y-2">
                                      {syllabus.modules?.map((mod, idx) => {
                                        const isObj = typeof mod === 'object' && mod !== null;
                                        const num = isObj ? mod.number : String(idx + 1).padStart(2, '0');
                                        const title = isObj ? mod.title : mod;
                                        const topics = isObj ? mod.topics || [] : [];
                                        return (
                                          <div key={idx} className="p-2.5 bg-white rounded-xl border border-sky-100 shadow-2xs space-y-1">
                                            <div className="flex items-center gap-2">
                                              <span className="w-5 h-5 rounded-md bg-[#071626] text-[#00FFE0] text-[10px] font-black flex items-center justify-center font-mono flex-shrink-0">
                                                {num}
                                              </span>
                                              <span className="font-extrabold text-slate-900 text-xs">
                                                {title}
                                              </span>
                                            </div>
                                            {topics.length > 0 && (
                                              <ul className="pl-7 space-y-0.5 text-[11px] text-slate-600">
                                                {topics.map((t, ti) => (
                                                  <li key={ti} className="flex items-start gap-1 leading-snug">
                                                    <span className="w-1 h-1 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                                                    <span>{t}</span>
                                                  </li>
                                                ))}
                                              </ul>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>

                                  {/* Requisitos */}
                                  <div>
                                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 mb-1.5">
                                      <UserCheck size={13} className="text-emerald-600" />
                                      <span>Requisitos de Admisión:</span>
                                    </h4>
                                    <ul className="space-y-1 pl-4 list-disc text-slate-700">
                                      {syllabus.requirements.map((req, idx) => (
                                        <li key={idx} className="leading-tight">{req}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  {/* Tipo de Examen */}
                                  <div className="pt-2 border-t border-sky-200/60 text-[11px] text-slate-600">
                                    <strong className="text-slate-800">Tipo de Certificación: </strong>
                                    <span>{syllabus.examType}</span>
                                  </div>

                                  {/* Botón Ver Ficha Oficial Ampliada */}
                                  <button
                                    type="button"
                                    onClick={() => setSelectedCourseForCurriculum(course)}
                                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-600 to-[#0A7D8C] text-white text-xs font-black flex items-center justify-center gap-2 hover:brightness-110 shadow-sm transition-all cursor-pointer mt-2"
                                  >
                                    <BookOpen size={14} />
                                    <span>Ver Ficha Oficial Ampliada (Metodología, Evaluación y Módulos)</span>
                                  </button>
                                </motion.div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Botones de Acción */}
                      <div className="p-5 pt-0 flex items-center gap-2">
                        {/* Botón 1: Inscribirme */}
                        <button
                          type="button"
                          disabled={!course.disponible || course.cupos <= 0}
                          onClick={() => {
                            if (course.disponible && course.cupos > 0) {
                              onClose();
                              if (onSelectCourse) onSelectCourse(course.title);
                            }
                          }}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-black text-white flex items-center justify-center gap-1.5 transition-all shadow ${
                            !course.disponible || course.cupos <= 0
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                              : isSecurity 
                              ? 'bg-gradient-to-r from-[#071626] to-[#0A7D8C] hover:brightness-110 cursor-pointer' 
                              : 'bg-gradient-to-r from-[#071626] to-[#00A896] hover:brightness-110 cursor-pointer'
                          }`}
                        >
                          <span>{course.disponible && course.cupos > 0 ? 'Inscribirme (Abono 50%)' : 'Sin Cupos Disponibles'}</span>
                          <ChevronRight size={14} />
                        </button>

                        {/* Botón 2: Ver Aula de Alumno */}
                        <button
                          type="button"
                          onClick={() => {
                            onClose();
                            if (onEnterStudentView) onEnterStudentView(course);
                          }}
                          className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                          title="Acceder como alumno de este curso"
                        >
                          <GraduationCap size={15} className="text-[#0284c7]" />
                          <span className="hidden sm:inline">Aula Virtual</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>

          {/* ================= PIE DE LA VENTANA ================= */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Info size={15} className="text-[#0284c7] flex-shrink-0" />
              <span>Para dudas o convalidaciones: WhatsApp Oficial de Admisión <strong>+56 9 8231 2128</strong></span>
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-bold border border-slate-200 cursor-pointer shadow-sm"
            >
              Cerrar Ventana
            </button>
          </div>

        </motion.div>
      </motion.div>

      {/* Modal Ficha Curricular Detallada */}
      <CourseCurriculumModal
        isOpen={Boolean(selectedCourseForCurriculum)}
        onClose={() => setSelectedCourseForCurriculum(null)}
        course={selectedCourseForCurriculum}
        onSelectCourse={(courseTitle) => {
          setSelectedCourseForCurriculum(null);
          onClose();
          if (onSelectCourse) onSelectCourse(courseTitle);
        }}
      />
    </AnimatePresence>
  );
};

export default SchoolDetailModal;
