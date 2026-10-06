import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Shield,
  Wrench,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  GraduationCap,
  FileCheck,
  Laptop,
  Award,
  Hammer,
  FileBadge,
  Building,
  Users
} from 'lucide-react';
import { DEFAULT_NEWS } from '../data/newsData';

const NewsSection = ({
  activeSchool = 'seguridad',
  onSwitchSchool,
  onOpenEnrollmentWithCourse,
  hideSchoolSwitcher = false
}) => {
  const [selectedSchool, setSelectedSchool] = useState(activeSchool || 'seguridad');

  useEffect(() => {
    if (activeSchool) {
      setSelectedSchool(activeSchool);
    }
  }, [activeSchool]);

  const handleSchoolChange = (school) => {
    setSelectedSchool(school);
    if (onSwitchSchool) {
      onSwitchSchool(school);
    }
  };

  const isSec = selectedSchool === 'seguridad';
  const currentNews = isSec ? DEFAULT_NEWS[0] : DEFAULT_NEWS[1];

  return (
    <section 
      id="noticias" 
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative border-t border-slate-200 overflow-hidden scroll-mt-28"
    >
      {/* Anchor compatible para antiguos enlaces */}
      <div id="experiencias" className="absolute -top-20 left-0" />

      {/* Fondos luminosos sutiles adaptados a la escuela activa */}
      <div className={`absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none -translate-y-1/3 translate-x-1/3 transition-colors duration-700 ${
        isSec ? 'bg-sky-400/10' : 'bg-emerald-400/10'
      }`} />
      <div className={`absolute bottom-0 left-0 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none translate-y-1/3 -translate-x-1/3 transition-colors duration-700 ${
        isSec ? 'bg-cyan-400/10' : 'bg-teal-400/10'
      }`} />

      <div className="max-w-5xl mx-auto space-y-10 relative z-10">

        {/* =========================================================================
            1. ENCABEZADO DE SECCIÓN
        ========================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/5 border border-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider shadow-2xs">
            <BookOpen size={14} className={isSec ? 'text-[#0284c7]' : 'text-[#00A896]'} />
            <span>Centro Informativo & Novedades Oficiales</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            Noticias y Actualidad <span className={isSec ? 'text-[#0284c7]' : 'text-[#00A896]'}>PrevySeg</span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Mantente al día con los cambios regulatorios oficiales de la Subsecretaría de Prevención del Delito y los nuevos estándares SENCE.
          </p>
        </div>

        {/* =========================================================================
            2. SWITCHER DE ESCUELAS CON APARTADOS DIFERENCIADOS (SI NO ESTÁ OCULTO)
        ========================================================================= */}
        {!hideSchoolSwitcher && (
          <div className="bg-white rounded-3xl p-2.5 sm:p-3 border border-slate-200 shadow-lg shadow-slate-200/50 max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              
              {/* Pestaña: Escuela de Seguridad Privada */}
              <button
                onClick={() => handleSchoolChange('seguridad')}
                type="button"
                className={`relative flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                  isSec 
                    ? 'bg-gradient-to-r from-[#072B4F] to-[#0A4DA2] text-white border-[#0A4DA2] shadow-md shadow-sky-900/20 ring-2 ring-[#00FFE0]/30' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  isSec ? 'bg-white/10 text-cyan-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Shield size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      isSec ? 'text-cyan-300' : 'text-slate-500'
                    }`}>
                      Apartado Oficial
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      isSec ? 'bg-[#00FFE0]/20 text-[#00FFE0] border border-[#00FFE0]/40' : 'bg-slate-200 text-slate-600'
                    }`}>
                      Activo
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm truncate">
                    Escuela de Seguridad Privada
                  </h3>
                </div>
                {isSec && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00FFE0] animate-pulse flex-shrink-0" />
                )}
              </button>

              {/* Pestaña: Escuela de Oficios y Empleabilidad */}
              <button
                onClick={() => handleSchoolChange('oficios')}
                type="button"
                className={`relative flex items-center gap-3 p-3.5 rounded-2xl text-left transition-all duration-300 cursor-pointer border ${
                  !isSec 
                    ? 'bg-gradient-to-r from-[#064e3b] to-[#047857] text-white border-emerald-600 shadow-md shadow-emerald-950/20 ring-2 ring-emerald-300/30' 
                    : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className={`p-2 rounded-xl flex-shrink-0 ${
                  !isSec ? 'bg-white/10 text-emerald-300' : 'bg-slate-200 text-slate-600'
                }`}>
                  <Wrench size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className={`text-[10px] font-black uppercase tracking-wider ${
                      !isSec ? 'text-emerald-300' : 'text-slate-500'
                    }`}>
                      Apartado Oficial
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                      !isSec ? 'bg-emerald-300/20 text-emerald-200 border border-emerald-300/40' : 'bg-slate-200 text-slate-600'
                    }`}>
                      Activo
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm truncate">
                    Escuela de Oficios & SENCE
                  </h3>
                </div>
                {!isSec && (
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-300 animate-pulse flex-shrink-0" />
                )}
              </button>

            </div>
          </div>
        )}

        {/* =========================================================================
            3. VISTA DEL CONTENIDO (ADAPTABLE A CADA ESCUELA)
        ========================================================================= */}
        <AnimatePresence mode="wait">
          <motion.article
            key={selectedSchool}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden"
          >
            {/* Header Visual con Imagen y Titular Principal */}
            <div className="relative overflow-hidden bg-slate-900 aspect-[21/8] min-h-[220px] sm:min-h-[290px]">
              <img
                src={currentNews.image}
                alt={currentNews.title}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
              
              {/* Badges superiores */}
              <div className="absolute top-5 left-5 right-5 flex flex-wrap items-center justify-between gap-2">
                <span className={`text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-md backdrop-blur-md ${
                  isSec 
                    ? 'bg-[#00A896]/95 text-[#00FFE0] border border-[#00A896]/50' 
                    : 'bg-emerald-600/95 text-emerald-100 border border-emerald-400/50'
                }`}>
                  {currentNews.category}
                </span>
                <span className="text-white/85 text-xs font-semibold flex items-center gap-1.5 bg-black/40 px-3 py-1 rounded-full backdrop-blur-md">
                  <Calendar size={13} className={isSec ? 'text-cyan-400' : 'text-emerald-400'} />
                  {currentNews.date}
                </span>
              </div>

              {/* Título Principal Exacto */}
              <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8 sm:right-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight drop-shadow-md">
                  {currentNews.title}
                </h1>
              </div>
            </div>

            {/* Cuerpo del Artículo */}
            <div className="p-6 sm:p-10 space-y-8 text-slate-800">

              {/* Bajada / Párrafo principal */}
              <div className={`p-5 sm:p-6 rounded-2xl shadow-xs border-l-4 ${
                isSec 
                  ? 'bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border-[#0284c7]' 
                  : 'bg-gradient-to-r from-emerald-50 via-teal-50 to-green-50 border-[#00A896]'
              }`}>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
                  {currentNews.lead}
                </p>
              </div>

              {/* Los 4 Puntos Clave */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentNews.points.map((point, idx) => {
                  // Iconografía contextual según el punto y la escuela
                  const icon = isSec ? (
                    idx === 0 ? <GraduationCap size={18} /> :
                    idx === 1 ? <FileCheck size={18} /> :
                    idx === 2 ? <Laptop size={18} /> : <Award size={18} />
                  ) : (
                    idx === 0 ? <Hammer size={18} /> :
                    idx === 1 ? <FileBadge size={18} /> :
                    idx === 2 ? <Building size={18} /> : <Users size={18} />
                  );

                  return (
                    <div 
                      key={point.title}
                      className={`rounded-2xl p-5 border transition-all shadow-xs hover:shadow-md space-y-2 group ${
                        isSec 
                          ? 'bg-slate-50 hover:bg-white border-slate-200 hover:border-sky-300' 
                          : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-base">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                          isSec 
                            ? 'bg-sky-100 text-[#0284c7] group-hover:bg-[#0284c7] group-hover:text-white' 
                            : 'bg-emerald-100 text-[#00A896] group-hover:bg-[#00A896] group-hover:text-white'
                        }`}>
                          {icon}
                        </div>
                        <span className={`transition-colors ${
                          isSec ? 'group-hover:text-[#0284c7]' : 'group-hover:text-[#00A896]'
                        }`}>
                          {point.title}:
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed pl-10.5">
                        {point.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Banner de Cierre y Llamado a la Acción */}
              <div className={`text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left ${
                isSec 
                  ? 'bg-gradient-to-r from-[#072B4F] to-[#0A4DA2]' 
                  : 'bg-gradient-to-r from-[#064e3b] to-[#047857]'
              }`}>
                <div className="space-y-1">
                  <p className="text-base sm:text-lg font-extrabold text-slate-100 leading-snug">
                    {currentNews.closingText}
                  </p>
                  <p className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    isSec ? 'text-cyan-300' : 'text-emerald-300'
                  }`}>
                    {currentNews.cta}
                  </p>
                </div>

                <button
                  onClick={() => onOpenEnrollmentWithCourse?.(currentNews.relatedCourse)}
                  className={`w-full sm:w-auto px-7 py-3.5 rounded-xl font-black text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 cursor-pointer flex items-center justify-center gap-2 flex-shrink-0 ${
                    isSec 
                      ? 'bg-gradient-to-r from-[#00C4D8] to-[#00A896] hover:from-[#00E5FF] hover:to-[#00C4D8] text-slate-950 shadow-cyan-500/25' 
                      : 'bg-gradient-to-r from-[#00FFE0] to-[#00C4D8] hover:from-white hover:to-[#00FFE0] text-emerald-950 shadow-emerald-500/25'
                  }`}
                >
                  <span>Matricularme Ahora</span>
                  <ArrowRight size={16} />
                </button>
              </div>

            </div>
          </motion.article>
        </AnimatePresence>

      </div>
    </section>
  );
};

export default NewsSection;
