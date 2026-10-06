import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  BookOpen, 
  Clock, 
  Award, 
  CheckCircle2, 
  Calendar, 
  Sparkles, 
  Shield, 
  Wrench, 
  ArrowRight,
  GraduationCap,
  Layers,
  FileText,
  UserCheck,
  Check,
  Briefcase,
  Target,
  Percent,
  AlertCircle,
  DollarSign,
  Video,
  Play,
  Share2,
  PhoneCall,
  Users,
  MessageCircle,
  Hourglass,
  ExternalLink,
  BookMarked
} from 'lucide-react';
import { getCourseSyllabus } from '../data/syllabusData';
import ConvinceBossModal from './ConvinceBossModal';
import UserTestingModal from './UserTestingModal';

const CourseCurriculumModal = ({ 
  isOpen, 
  onClose, 
  course, 
  onSelectCourse 
}) => {
  // Pestañas exactas: 'resumen' | 'objetivos' | 'requisitos' | 'temario' | 'profesores' | 'video'
  const [activeTab, setActiveTab] = useState('resumen');
  const [bonificacionSence, setBonificacionSence] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [showConvinceBoss, setShowConvinceBoss] = useState(false);
  const [showUserTesting, setShowUserTesting] = useState(false);

  if (!isOpen || !course) return null;

  const syllabus = getCourseSyllabus(course);
  const isSecurity = course.school === 'seguridad';

  const modulesList = syllabus?.modules || [];
  const specificObjectives = syllabus?.specificObjectives || [];
  const requirements = syllabus?.requirements || course.requisitos || [];
  const teachers = syllabus?.teachers || [];
  const bibliography = syllabus?.bibliography || [];
  const videoData = syllabus?.videoData;

  const priceValue = syllabus?.price || course.price || '$140.000 CLP';
  const durationText = syllabus?.durationDetail || course.duration || '90 horas cronológicas';
  const weeksText = syllabus?.weeks || '2 semanas';
  const nextDateText = syllabus?.nextDate || course.fecha_inicio || '19/10/2026';

  const handleEnrollClick = () => {
    if (onSelectCourse) {
      onSelectCourse(course);
    }
    onClose();
  };

  const handleWhatsAppContact = () => {
    const text = encodeURIComponent(`Hola OTEC PrevySeg, deseo consultar información y fechas de matrícula para el curso "${syllabus?.subtitle || course.title}".`);
    window.open(`https://wa.me/56987654321?text=${text}`, '_blank');
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-[#161630]/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 md:p-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl xl:max-w-[1060px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[86vh] max-h-[680px] min-h-[540px] border border-[#1b3761]/20"
          >
            {/* ================= HEADER DEL MODAL (PALETA OFICIAL PREVYSEG) ================= */}
            <div className="shrink-0 py-3 px-4 sm:py-3.5 sm:px-6 text-white relative overflow-hidden bg-gradient-to-r from-[#161630] via-[#1b3761] to-[#0a969b]">
              {/* Decoración geométrica */}
              <div className="absolute top-0 right-0 w-80 h-80 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
                  <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
                  <path d="M40 0 L200 160 L200 190 L10 0 Z" fill="#0a969b" />
                </svg>
              </div>

              {/* Botón de cierre */}
              <button
                type="button"
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-3.5 sm:right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-sm z-20 border border-white/15"
                aria-label="Cerrar ficha"
              >
                <X size={16} />
              </button>

              <div className="relative z-10 space-y-1.5 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-black tracking-widest uppercase bg-[#0a969b]/25 text-[#00FFE0] border border-[#0a969b]/40 backdrop-blur-xs">
                    {isSecurity ? <Shield size={11} /> : <Wrench size={11} />}
                    <span>{isSecurity ? 'Escuela de Seguridad Privada' : 'Escuela de Oficios y SENCE'}</span>
                  </span>

                  <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                    {course.category}
                  </span>

                  <span className="text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#0a969b]/20 text-white border border-[#0a969b]/35">
                    {syllabus?.totalHours || 40} Horas Oficiales
                  </span>

                  {/* Acceso a Pruebas de Uso (Requerimiento 5) */}
                  <button
                    type="button"
                    onClick={() => setShowUserTesting(true)}
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#0a969b]/30 hover:bg-[#0a969b]/50 text-white border border-[#0a969b]/50 text-[9px] sm:text-[10px] font-black tracking-wide cursor-pointer transition-all ml-auto sm:ml-0 shadow-xs"
                    title="Ver protocolo de evaluación con muestra de 2 personas"
                  >
                    <Users size={10} className="text-[#00FFE0]" />
                    <span>Pruebas de Uso (2 Personas) ✓</span>
                  </button>
                </div>

                <h2 className="text-lg sm:text-xl lg:text-2xl font-black text-white tracking-tight leading-snug">
                  {syllabus?.subtitle || course.title}
                </h2>

                {syllabus?.subtitle && (
                  <p className="text-[11px] sm:text-xs text-slate-200 font-medium">
                    {course.title}
                  </p>
                )}
              </div>
            </div>

            {/* ================= NAVEGACIÓN POR PESTAÑAS (COLORES OFICIALES PREVYSEG) ================= */}
            <div className="shrink-0 px-3 sm:px-5 py-2 bg-slate-100/90 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
              {/* TAB 1: RESUMEN */}
              <button
                type="button"
                onClick={() => setActiveTab('resumen')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  activeTab === 'resumen'
                    ? 'bg-[#0a969b] text-white shadow-sm border-b-2 border-[#161630]'
                    : 'bg-white text-[#1b3761] hover:bg-[#0a969b]/10 border border-slate-200'
                }`}
              >
                <span>Resumen</span>
              </button>

              {/* TAB 2: OBJETIVOS */}
              <button
                type="button"
                onClick={() => setActiveTab('objetivos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  activeTab === 'objetivos'
                    ? 'bg-[#0a969b] text-white shadow-sm border-b-2 border-[#161630]'
                    : 'bg-white text-[#1b3761] hover:bg-[#0a969b]/10 border border-slate-200'
                }`}
              >
                <span>Objetivos</span>
              </button>

              {/* TAB 3: REQUISITOS */}
              <button
                type="button"
                onClick={() => setActiveTab('requisitos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  activeTab === 'requisitos'
                    ? 'bg-[#0a969b] text-white shadow-sm border-b-2 border-[#161630]'
                    : 'bg-white text-[#1b3761] hover:bg-[#0a969b]/10 border border-slate-200'
                }`}
              >
                <span>Requisitos</span>
              </button>

              {/* TAB 4: TEMARIO */}
              <button
                type="button"
                onClick={() => setActiveTab('temario')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  activeTab === 'temario'
                    ? 'bg-[#0a969b] text-white shadow-sm border-b-2 border-[#161630]'
                    : 'bg-white text-[#1b3761] hover:bg-[#0a969b]/10 border border-slate-200'
                }`}
              >
                <span>Temario ({modulesList.length})</span>
              </button>

              {/* TAB 5: PROFESORES Y BIBLIOGRAFÍA */}
              <button
                type="button"
                onClick={() => setActiveTab('profesores')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  activeTab === 'profesores'
                    ? 'bg-[#1b3761] text-white shadow-sm border-b-2 border-[#0a969b]'
                    : 'bg-white text-[#1b3761] hover:bg-[#0a969b]/10 border border-slate-200'
                }`}
              >
                <GraduationCap size={13} className={activeTab === 'profesores' ? 'text-[#00FFE0]' : 'text-[#0a969b]'} />
                <span>Docentes & Bibliografía</span>
              </button>

              {/* TAB 6: VIDEO EXPLICATIVO RRSS */}
              <button
                type="button"
                onClick={() => setActiveTab('video')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                  activeTab === 'video'
                    ? 'bg-[#161630] text-white shadow-sm border-b-2 border-[#0a969b]'
                    : 'bg-white text-[#161630] hover:bg-[#0a969b]/10 border border-slate-200'
                }`}
              >
                <Video size={13} className={activeTab === 'video' ? 'text-[#00FFE0]' : 'text-[#0a969b]'} />
                <span>Video Explicativo RRSS</span>
              </button>
            </div>

            {/* ================= CONTENIDO PRINCIPAL: 2 COLUMNAS (ALTURA FIJA Y ESTABLE) ================= */}
            <div className="flex-1 min-h-0 overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 p-4 sm:p-5">

              {/* COLUMNA IZQUIERDA: CONTENIDO DE LA PESTAÑA ACTIVA (ESTABLE SIN CAMBIO DE TAMAÑO) */}
              <div className="lg:col-span-7 xl:col-span-8 h-full overflow-y-auto pr-2 sm:pr-3 space-y-3.5 custom-scrollbar">


                {/* 1. PESTAÑA: RESUMEN */}
                {activeTab === 'resumen' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#0a969b]/5 border border-[#0a969b]/20 space-y-3">
                      <div className="flex items-center gap-2 text-[#1b3761] font-black text-sm">
                        <FileText size={17} className="text-[#0a969b]" />
                        <span>Resumen General del Curso:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        {syllabus?.summary || course.description}
                      </p>
                    </div>

                    {/* Ficha Rápida Institucional */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Certificación</span>
                        <span className="text-xs font-black text-[#161630] block leading-snug">
                          {syllabus?.certification || 'Diploma Oficial OTEC PrevySeg'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Jornada / Días</span>
                        <span className="text-xs font-black text-[#161630] block leading-snug">
                          {syllabus?.schedule || course.horario || 'Lunes a Sábado'}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs col-span-2 sm:col-span-1">
                        <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">Facilidad de Pago</span>
                        <span className="text-xs font-black text-[#0a969b] block leading-snug">
                          {syllabus?.paymentFacility || '2 cuotas del 50%'}
                        </span>
                      </div>
                    </div>

                    {/* Destacados / Campo Ocupacional */}
                    {syllabus?.workFields && syllabus.workFields.length > 0 && (
                      <div className="p-4 rounded-2xl bg-[#1b3761]/5 border border-[#1b3761]/15 space-y-2">
                        <span className="text-xs font-black text-[#1b3761] flex items-center gap-1.5 uppercase tracking-wide">
                          <Briefcase size={14} className="text-[#0a969b]" />
                          <span>Campo Laboral y Empleabilidad:</span>
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {syllabus.workFields.map((wf, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                              <CheckCircle2 size={13} className="text-[#0a969b] flex-shrink-0" />
                              <span>{wf}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. PESTAÑA: OBJETIVOS */}
                {activeTab === 'objetivos' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-4 sm:p-5 rounded-2xl bg-[#0a969b]/10 border border-[#0a969b]/25 space-y-2">
                      <span className="text-xs font-black text-[#1b3761] flex items-center gap-1.5 uppercase tracking-wide">
                        <Target size={16} className="text-[#0a969b]" />
                        <span>Objetivo General:</span>
                      </span>
                      <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                        {syllabus?.objective || `Capacitar y habilitar al alumno con las competencias operativas y técnicas requeridas para el curso ${course.title}.`}
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1b3761] block">
                        Objetivos Específicos del Aprendizaje:
                      </span>
                      <div className="space-y-2">
                        {specificObjectives.length > 0 ? (
                          specificObjectives.map((obj, idx) => (
                            <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 hover:border-[#0a969b]/40 transition-all shadow-2xs">
                              <span className="w-5 h-5 rounded-full bg-[#0a969b]/15 text-[#1b3761] text-[10px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <p className="text-xs text-slate-700 leading-relaxed">
                                {obj}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                            Objetivos específicos disponibles según pauta pedagógica SENCE / SPD.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. PESTAÑA: REQUISITOS */}
                {activeTab === 'requisitos' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-3.5 rounded-xl bg-[#1b3761]/5 border border-[#1b3761]/15 text-xs text-[#161630] flex items-center gap-2">
                      <AlertCircle size={16} className="text-[#0a969b] flex-shrink-0" />
                      <span>Requisitos obligatorios según la legislación chilena y normativas vigentes de fiscalización.</span>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1b3761] block">
                        Documentos y Condiciones de Admisión Exigidas:
                      </span>
                      <div className="space-y-2">
                        {requirements.map((req, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-start gap-3 hover:border-[#0a969b]/40 transition-all shadow-2xs">
                            <CheckCircle2 size={16} className="text-[#0a969b] flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-slate-800 leading-relaxed font-medium">
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-center justify-between">
                      <span>¿Tienes dudas con tus documentos o apostillas?</span>
                      <button
                        type="button"
                        onClick={handleWhatsAppContact}
                        className="text-[#0a969b] hover:text-[#077478] font-bold underline cursor-pointer"
                      >
                        Asesoría documental gratuita →
                      </button>
                    </div>
                  </div>
                )}

                {/* 4. PESTAÑA: TEMARIO */}
                {activeTab === 'temario' && (
                  <div className="space-y-3 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1b3761]">
                        Estructura Modular del Programa ({modulesList.length} Módulos):
                      </span>
                      <span className="text-[11px] font-bold text-[#0a969b]">
                        {durationText}
                      </span>
                    </div>

                    <div className="space-y-2.5">
                      {modulesList.map((mod, idx) => {
                        const isObject = typeof mod === 'object' && mod !== null;
                        const modNum = isObject ? mod.number : String(idx + 1).padStart(2, '0');
                        const modTitle = isObject ? mod.title : mod;
                        const modTopics = isObject ? mod.topics || [] : [];

                        return (
                          <div 
                            key={idx}
                            className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#0a969b]/50 transition-all shadow-2xs space-y-2"
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="w-7 h-7 rounded-lg bg-[#161630] text-[#0a969b] text-xs font-black flex items-center justify-center flex-shrink-0 font-mono">
                                {modNum}
                              </span>
                              <h4 className="text-xs sm:text-sm font-bold text-[#161630] leading-snug">
                                {modTitle}
                              </h4>
                            </div>

                            {modTopics.length > 0 && (
                              <ul className="pl-9 space-y-1">
                                {modTopics.map((topic, tIdx) => (
                                  <li key={tIdx} className="text-xs text-slate-600 list-disc leading-relaxed">
                                    {topic}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 5. PESTAÑA: PROFESORES Y BIBLIOGRAFÍA */}
                {activeTab === 'profesores' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1b3761] flex items-center gap-1.5">
                        <GraduationCap size={15} className="text-[#0a969b]" />
                        <span>Cuerpo Docente / Relatores Asignados:</span>
                      </span>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {teachers.map((tea, idx) => (
                          <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                            <div className="flex items-center gap-3">
                              <img 
                                src={tea.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'} 
                                alt={tea.name}
                                className="w-12 h-12 rounded-xl object-cover border border-[#1b3761]/20 shadow-xs"
                              />
                              <div>
                                <h4 className="text-xs sm:text-sm font-black text-[#161630]">{tea.name}</h4>
                                <span className="text-[11px] font-bold text-[#0a969b] block">{tea.role}</span>
                                <span className="text-[10px] text-slate-500 block leading-tight">{tea.credentials}</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                              {tea.bio}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bibliografía y Marco Normativo */}
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#161630] flex items-center gap-1.5">
                        <BookMarked size={14} className="text-[#0a969b]" />
                        <span>Bibliografía y Marco Normativo Oficial:</span>
                      </span>
                      <ul className="space-y-1.5 pt-1">
                        {bibliography.map((bib, idx) => (
                          <li key={idx} className="text-xs text-slate-700 flex items-start gap-2">
                            <span className="text-[#0a969b] font-bold">•</span>
                            <span className="leading-relaxed">{bib}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* 6. PESTAÑA: VIDEO EXPLICATIVO RRSS */}
                {activeTab === 'video' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="p-3.5 rounded-xl bg-[#0a969b]/10 border border-[#0a969b]/25 text-[#161630] flex items-start gap-2.5">
                      <Video size={16} className="text-[#0a969b] flex-shrink-0 mt-0.5" />
                      <div className="text-xs">
                        <strong className="block text-[#1b3761] font-bold">
                          Espacio Oficial de Cápsulas Audiovisuales de RRSS
                        </strong>
                        <p className="text-[11px] text-slate-700 mt-0.5">
                          La encargada de RRSS de OTEC PrevySeg realiza cuatro videos mensuales explicando en detalle cada curso a desarrollar.
                        </p>
                      </div>
                    </div>

                    {/* Mockup de Reproductor de Video Interactivo */}
                    <div className="relative rounded-2xl overflow-hidden bg-[#161630] aspect-video shadow-lg flex items-center justify-center border border-[#1b3761]/40 group">
                      {isPlayingVideo ? (
                        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-white text-center space-y-3 bg-gradient-to-br from-[#161630] to-[#1b3761]">
                          <div className="w-12 h-12 rounded-full bg-[#0a969b] flex items-center justify-center animate-pulse shadow-md">
                            <Play size={20} className="fill-white ml-0.5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">
                              {videoData?.title || `Cápsula Informativa Oficial: ${course.title}`}
                            </h4>
                            <p className="text-xs text-slate-300 mt-1">
                              Conduce: {videoData?.presenter || 'Camila Valenzuela (Encargada de RRSS PrevySeg)'}
                            </p>
                          </div>
                          <span className="text-[10px] px-2.5 py-1 rounded-full bg-white/10 text-[#00FFE0] font-mono">
                            Reproducción simulada en HD • Duración: {videoData?.duration || '03:30 min'}
                          </span>
                        </div>
                      ) : (
                        <>
                          <img 
                            src={course.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&auto=format&fit=crop&q=80'} 
                            alt="Video Thumbnail"
                            className="w-full h-full object-cover opacity-45 group-hover:scale-105 transition-all duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#161630] via-[#161630]/50 to-transparent" />
                          
                          <button
                            type="button"
                            onClick={() => setIsPlayingVideo(true)}
                            className="absolute w-16 h-16 rounded-full bg-[#0a969b] hover:bg-[#087f84] text-white flex items-center justify-center shadow-xl transition-all cursor-pointer hover:scale-110 z-10"
                            aria-label="Reproducir cápsula"
                          >
                            <Play size={24} className="fill-white ml-1" />
                          </button>

                          <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0a969b] text-white inline-block mb-1">
                              {videoData?.frequency || 'Ciclo de 4 videos mensuales'}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold truncate text-white">
                              {videoData?.title || `Cápsula Informativa: ${course.title}`}
                            </h4>
                            <span className="text-[11px] text-slate-200">
                              {videoData?.presenter || 'Encargada de Redes Sociales PrevySeg'} • {videoData?.duration || '03:45 min'}
                            </span>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Descripción de lo que explica el video */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-2">
                      <span className="text-xs font-black uppercase tracking-wider text-[#1b3761] block">
                        Contenidos explicados en esta cápsula audiovisual:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed">
                        {videoData?.description || 'En este video explicativo se detalla la metodología, los requisitos normativos, el campo de inserción laboral y las facilidades de financiamiento.'}
                      </p>
                      {videoData?.topicsCovered && (
                        <ul className="space-y-1 pt-1">
                          {videoData.topicsCovered.map((tc, idx) => (
                            <li key={idx} className="text-xs text-slate-600 flex items-center gap-1.5">
                              <CheckCircle2 size={12} className="text-[#0a969b] flex-shrink-0" />
                              <span>{tc}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                )}

              </div>

              {/* COLUMNA DERECHA: CARD LATERAL DE COMPRA Y CONVOCATORIA (PALETA OFICIAL PREVYSEG) */}
              <div className="lg:col-span-5 xl:col-span-4 h-full overflow-y-auto pr-1 custom-scrollbar">
                <div className="rounded-2xl bg-white border border-slate-200 shadow-md overflow-hidden flex flex-col">
                  
                  {/* Banner Superior con Gradiente PrevySeg */}
                  <div className="bg-gradient-to-r from-[#1b3761] to-[#0a969b] text-white font-black text-[11px] text-center py-2 px-3 uppercase tracking-wide">
                    Próxima convocatoria: {nextDateText}
                  </div>

                  {/* Cuerpo de la Card */}
                  <div className="p-3.5 sm:p-4 space-y-3">
                    {/* Items con Iconos Oficiales PrevySeg */}
                    <div className="space-y-2 text-xs text-slate-700 border-b border-slate-100 pb-3">
                      {/* Duración en semanas */}
                      <div className="flex items-center gap-2.5">
                        <Hourglass size={14} className="text-[#0a969b] flex-shrink-0" />
                        <span className="font-bold text-[#161630] text-[11px]">{weeksText} ({syllabus?.classesCount || 'Clases intensivas'})</span>
                      </div>

                      {/* Horas de estudio */}
                      <div className="flex items-center gap-2.5">
                        <Clock size={14} className="text-[#0a969b] flex-shrink-0" />
                        <span className="font-bold text-[#161630] text-[11px]">{syllabus?.totalHours || 40} horas de estudio</span>
                      </div>

                      {/* Inicio */}
                      <div className="flex items-center gap-2.5">
                        <Calendar size={14} className="text-[#0a969b] flex-shrink-0" />
                        <span className="font-bold text-[#161630] text-[11px]">Inicio: {nextDateText}</span>
                      </div>
                    </div>

                    {/* Precio y Franquicia SENCE */}
                    <div className="space-y-0.5">
                      <div className="text-xl sm:text-2xl font-black text-[#161630] tracking-tight">
                        {priceValue}
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">
                        IVA no incluido • Franquicia SENCE disponible
                      </div>
                      {course.depositPrice && (
                        <span className="inline-block text-[10px] font-bold text-[#0a969b] bg-[#0a969b]/10 px-2 py-0.5 rounded-md border border-[#0a969b]/25 mt-1">
                          {course.depositPrice.includes('cuotas') ? course.depositPrice : `Abono 50%: ${course.depositPrice}`}
                        </span>
                      )}
                    </div>

                    {/* Checkbox: Contratar gestión bonificación / SENCE (+10%) */}
                    <label className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer select-none hover:bg-slate-100 transition-all">
                      <input 
                        type="checkbox" 
                        checked={bonificacionSence}
                        onChange={(e) => setBonificacionSence(e.target.checked)}
                        className="mt-0.5 w-3.5 h-3.5 rounded text-[#0a969b] focus:ring-[#0a969b] border-slate-300 cursor-pointer"
                      />
                      <span className="text-[10px] text-slate-700 leading-tight">
                        Contratar gestión bonificación Franquicia SENCE (+10%)
                      </span>
                    </label>

                    {/* BOTÓN 1: AÑADIR AL CARRITO / INSCRIBIRME (Turquesa PrevySeg) */}
                    <button
                      type="button"
                      onClick={handleEnrollClick}
                      className="w-full py-2.5 px-3 rounded-lg text-xs font-black text-white bg-[#0a969b] hover:bg-[#077478] transition-all flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md cursor-pointer transform active:scale-98"
                    >
                      <span>🛒 Añadir al carrito / Inscribirme</span>
                    </button>

                    {/* BOTÓN 2: CONTACTAR (Azul Corporativo PrevySeg) */}
                    <button
                      type="button"
                      onClick={handleWhatsAppContact}
                      className="w-full py-2 px-3 rounded-lg text-xs font-bold text-[#1b3761] bg-white hover:bg-[#0a969b]/10 border border-[#1b3761]/30 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <MessageCircle size={13} className="text-[#0a969b]" />
                      <span>Contactar Asesor WhatsApp</span>
                    </button>

                    {/* BOTÓN 3: ¡CONVENCE A TU JEFE! */}
                    <button
                      type="button"
                      onClick={() => setShowConvinceBoss(true)}
                      className="w-full py-1.5 px-3 rounded-lg text-[11px] font-bold text-[#1b3761] bg-[#1b3761]/10 hover:bg-[#1b3761]/20 border border-[#1b3761]/25 transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Share2 size={12} className="text-[#0a969b]" />
                      <span>¡Convence a tu jefe! / Ficha Empresa</span>
                    </button>

                  </div>

                  {/* Footer de la Card Lateral */}
                  <div className="px-3 py-1.5 bg-slate-50 border-t border-slate-100 text-[9px] text-slate-500 text-center">
                    Acreditación NCh 2728:2015 SGS Chile • OTEC PrevySeg Arica
                  </div>
                </div>
              </div>

            </div>

            {/* ================= FOOTER DEL MODAL ================= */}
            <div className="shrink-0 px-4 sm:px-5 py-2.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-slate-600 text-[11px]">
                <span className="flex items-center gap-1">
                  <CheckCircle2 size={12} className="text-[#0a969b]" />
                  <span>Sede Arica: Blanco Encalada #666</span>
                </span>
                <span className="hidden sm:inline text-slate-300">•</span>
                <span className="hidden sm:inline">Fono: +56 9 8765 4321</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  onClick={handleEnrollClick}
                  className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-[#1b3761] hover:bg-[#161630] transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Ir al Formulario de Inscripción</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Modal ¡Convence a tu Jefe! */}
      <ConvinceBossModal 
        isOpen={showConvinceBoss}
        onClose={() => setShowConvinceBoss(false)}
        course={course}
        syllabus={syllabus}
      />

      {/* Modal de Pruebas de Uso (2 Personas) */}
      <UserTestingModal 
        isOpen={showUserTesting}
        onClose={() => setShowUserTesting(false)}
        courseTitle={syllabus?.subtitle || course.title}
      />
    </>
  );
};

export default CourseCurriculumModal;
