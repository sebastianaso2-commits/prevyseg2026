import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Wrench,
  Clock, 
  Calendar, 
  Search, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Building2, 
  Laptop, 
  Sparkles, 
  Award, 
  ArrowLeft,
  Users,
  Check,
  Filter,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  ArrowDown
} from 'lucide-react';
import { getSavedCourses } from '../data/coursesData';
import CourseCurriculumModal from './CourseCurriculumModal';
import ExecutionSection from './ExecutionSection';
import NewsSection from './NewsSection';

// Slides fotográficos oficiales de Seguridad
import heroImg from '../assets/images/hero_graduation.jpg';
import securityGuards from '../assets/images/security_guards.jpg';
import securitySupervisor from '../assets/images/security_supervisor.jpg';
import cctvOperator from '../assets/images/cctv_operator.jpg';
import portImg from '../assets/images/course_port_security_1788545050484.jpg';
import cyberImg from '../assets/images/course_cybersecurity_1788545064007.jpg';

const SECURITY_SLIDES = [
  { img: securityGuards, title: 'Formación de Guardias de Seguridad (Ley 21.659)', tag: 'Acreditación Oficial SPD' },
  { img: securitySupervisor, title: 'Formación de Vigilantes Privados (Banca y Valores)', tag: 'Alta Seguridad' },
  { img: portImg, title: 'Formación de Seguridad Marítimo Portuaria (Directemar)', tag: 'Código PBIP TPA' },
  { img: cctvOperator, title: 'Operador de CCTV Codificado por SENCE', tag: 'Tecnología & Sistemas' },
  { img: cyberImg, title: 'CCTV y Alarmas de Seguridad Privada', tag: 'Sistemas Electrónicos' },
  { img: heroImg, title: 'Supervisor de Seguridad Privada', tag: 'Liderazgo y Turnos SPD' }
];

const SecuritySchoolView = ({ onSelectCourse, onReturnHome, onGoToTrades }) => {
  const [courses, setCourses] = useState(getSavedCourses());
  const [modalityFilter, setModalityFilter] = useState('all'); // 'all' | 'presencial' | 'online'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourseForCurriculum, setSelectedCourseForCurriculum] = useState(null);
  const [currentBg, setCurrentBg] = useState(0);

  // Navegación de slides fotográficos de fondo
  const nextSlide = useCallback(() => {
    setCurrentBg((prev) => (prev + 1) % SECURITY_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentBg((prev) => (prev - 1 + SECURITY_SLIDES.length) % SECURITY_SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Escuchar en tiempo real cambios del Administrador (LMS o CourseManagerModal)
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

  // Contador de cursos en estado Próximamente
  const upcomingSecurityCount = useMemo(() => {
    return courses.filter(c => c.school === 'seguridad' && c.activo !== false && Boolean(c.proximamente)).length;
  }, [courses]);

  // Filtrar exclusivamente los cursos de la Escuela de Seguridad Privada
  const securityCourses = useMemo(() => {
    return courses.filter(course => {
      if (course.school !== 'seguridad') return false;
      if (course.activo === false) return false;

      // Filtro de modalidad
      if (modalityFilter === 'presencial' && course.permitePresencial === false) {
        return false;
      }
      if (modalityFilter === 'online' && course.permiteVirtual === false) {
        return false;
      }
      if (modalityFilter === 'proximamente' && !course.proximamente) {
        return false;
      }

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
  }, [courses, modalityFilter, searchQuery]);

  const scrollToCourses = () => {
    const el = document.getElementById('catalogo-seguridad');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      
      {/* ================= HERO COMPLETO: ESCUELA DE SEGURIDAD PRIVADA ================= */}
      <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center overflow-hidden pt-16 pb-20 bg-[#071626]">
        
        {/* Carrusel de Fondo Fotográfico */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {SECURITY_SLIDES.map((slide, idx) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentBg ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              style={{
                backgroundImage: `url(${slide.img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                transition: 'opacity 1s ease-in-out, transform 8s ease-out',
              }}
            />
          ))}
        </div>

        {/* Degradado Superpuesto Oficial PrevySeg */}
        <div 
          className="absolute inset-0 z-[1] transition-all duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(22,22,48,0.96) 0%, rgba(27,55,97,0.90) 45%, rgba(10,150,155,0.80) 100%)'
          }}
        />

        {/* Malla decorativa sutil */}
        <div
          className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Flechas de carrusel */}
        <button
          onClick={prevSlide}
          aria-label="Slide anterior"
          className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/80 hover:text-white items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          onClick={nextSlide}
          aria-label="Siguiente slide"
          className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white/80 hover:text-white items-center justify-center transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 shadow-lg"
        >
          <ChevronRight size={22} />
        </button>

        {/* Contenido del Hero de Seguridad */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-10 lg:py-16">
          <div className="max-w-3xl space-y-6">
            
            {/* Barra Superior: Switcher de Escuelas (Exacto diseño solicitado) y Retorno a Portada */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex p-1.5 rounded-2xl bg-black/50 backdrop-blur-xl border border-white/25 shadow-2xl gap-1.5">
                {/* Botón Escuela de Seguridad (ACTIVO) */}
                <div
                  className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 bg-gradient-to-r from-[#00C4D8] to-[#0a969b] text-[#071626] shadow-xl shadow-[#00C4D8]/30 scale-[1.02] ring-2 ring-white/40 cursor-default select-none"
                >
                  <Shield size={18} className="text-[#071626]" />
                  <span>Escuela de Seguridad Privada</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase bg-black/20 text-[#071626]">
                    SPD
                  </span>
                </div>

                {/* Botón Escuela de Oficios (CLICKABLE: INTERCAMBIO DIRECTO) */}
                {onGoToTrades && (
                  <button
                    type="button"
                    onClick={onGoToTrades}
                    className="flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer text-white/75 hover:text-white hover:bg-white/10"
                  >
                    <Wrench size={18} className="text-[#00FFE0]" />
                    <span>Escuela de Oficios SENCE</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-extrabold uppercase bg-white/10 text-white/70">
                      NCH 2728
                    </span>
                  </button>
                )}
              </div>

              {/* Botón Retorno a Portada OTEC PrevySeg */}
              <button
                type="button"
                onClick={onReturnHome}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer backdrop-blur-md border border-white/20"
              >
                <ArrowLeft size={14} />
                <span>Portada OTEC PrevySeg</span>
              </button>
            </div>

            {/* Badge Acreditación Oficial */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-white/95 text-xs font-semibold shadow-lg">
              <Award size={15} className="text-[#00FFE0]" />
              <span className="tracking-wide">
                Acreditación Oficial SPD (Prevención del Delito) • Carabineros OS-10 • Ley 21.659
              </span>
            </div>

            {/* Título Principal */}
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] tracking-tight text-white"
              style={{ textShadow: '0 2px 25px rgba(0,0,0,0.6)' }}
            >
              <span>Escuela de</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE0] via-[#0a969b] to-teal-200">
                Seguridad Privada
              </span>
            </h1>

            {/* Descripción oficial solicitada */}
            <p 
              className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl"
              style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
            >
              <strong className="font-bold text-white">PrevySeg Capacitaciones:</strong> Formación y perfeccionamiento técnico-legal riguroso para Guardias de Seguridad, Vigilantes Privados, Seguridad Portuaria (Directemar) y Supervisores, con preparación de excelencia para el examen oficial de la Autoridad Fiscalizadora.
            </p>

            {/* Botón CTA hacia los cursos y Garantías de Confianza */}
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-4">
              <button
                type="button"
                onClick={scrollToCourses}
                className="font-black text-sm px-7 py-4 rounded-xl shadow-2xl transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer hover:scale-[1.03] active:scale-[0.97] bg-gradient-to-r from-[#0a969b] to-teal-400 text-[#161630] hover:brightness-110 shadow-[#0a969b]/40 w-fit"
              >
                <span>Ver Capacitaciones de Seguridad</span>
                <ArrowDown size={18} />
              </button>

              <div className="flex flex-wrap items-center gap-4 text-xs text-white/80 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-[#00FFE0]" />
                  <span>Sede Arica: Blanco Encalada #666</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={13} className="text-amber-400" />
                  <span>Abono Inicial 50%</span>
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 2. APARTADO "GARANTIZAMOS ESTÁNDARES DE SEGURIDAD Y CONFIANZA" ================= */}
      <ExecutionSection 
        activeSchool="seguridad" 
        onLearnMore={scrollToCourses}
      />

      {/* ================= 3. SECCIÓN DE CATÁLOGO Y SWITCHER DE MODALIDAD ================= */}
      <section id="catalogo-seguridad" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8 scroll-mt-20">
        
        {/* Cabecera del Catálogo con Selector de Modalidad */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 p-6 rounded-3xl bg-white border border-slate-200/90 shadow-lg shadow-slate-900/5">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#0a969b] bg-[#0a969b]/10 px-3 py-1 rounded-full border border-[#0a969b]/25 inline-block">
              CURSOS ACTIVOS DE SEGURIDAD PRIVADA
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#161630]">
              Elige tu Modalidad de Formación
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Selecciona si deseas cursar en nuestra sede de Arica de forma presencial o a través de nuestra plataforma virtual e-learning.
            </p>
          </div>

          {/* Selector de Modalidad */}
          <div className="flex-shrink-0">
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200">
              <button
                type="button"
                onClick={() => setModalityFilter('all')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  modalityFilter === 'all'
                    ? 'bg-[#161630] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Todas
              </button>

              <button
                type="button"
                onClick={() => setModalityFilter('presencial')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalityFilter === 'presencial'
                    ? 'bg-[#1b3761] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 size={13} />
                <span>Presencial</span>
              </button>

              <button
                type="button"
                onClick={() => setModalityFilter('online')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalityFilter === 'online'
                    ? 'bg-[#0a969b] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Laptop size={13} />
                <span>Online</span>
              </button>

              <button
                type="button"
                onClick={() => setModalityFilter('proximamente')}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  modalityFilter === 'proximamente'
                    ? 'bg-amber-500 text-slate-950 shadow-xs'
                    : 'text-amber-800 hover:text-amber-950 hover:bg-amber-100/60'
                }`}
              >
                <Clock size={13} className={modalityFilter === 'proximamente' ? 'text-slate-950' : 'text-amber-700'} />
                <span>Próximamente</span>
                {upcomingSecurityCount > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    modalityFilter === 'proximamente' ? 'bg-black/20 text-slate-950' : 'bg-amber-200 text-amber-900'
                  }`}>
                    {upcomingSecurityCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Buscador y Contador */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar curso de seguridad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a969b]/40 text-slate-800"
            />
          </div>

          <div className="text-xs font-bold text-[#1b3761] flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0a969b] animate-pulse" />
            <span>{securityCourses.length} Programas de Seguridad Disponibles</span>
          </div>
        </div>

        {/* Cuadrícula de Cursos */}
        {securityCourses.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <AlertCircle size={40} className="mx-auto text-slate-400" />
            <h3 className="text-base font-bold text-slate-800">No se encontraron cursos con estos filtros</h3>
            <p className="text-xs text-slate-500">Prueba cambiando la modalidad o el término de búsqueda.</p>
            <button
              onClick={() => { setModalityFilter('all'); setSearchQuery(''); }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1b3761] hover:bg-[#161630] transition-colors cursor-pointer"
            >
              Restablecer Filtros
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityCourses.map((course) => {
              const allowsPresencial = course.permitePresencial !== false;
              const allowsOnline = course.permiteVirtual !== false;

              return (
                <div
                  key={course.id}
                  className={`rounded-3xl bg-white border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group ${
                    course.proximamente 
                      ? 'border-amber-300 ring-2 ring-amber-200/60 shadow-amber-500/10' 
                      : 'border-slate-200/90'
                  }`}
                >
                  {/* Imagen y Badges */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161630]/80 via-transparent to-transparent" />
                    
                    {/* Badges de Modalidad Disponibles */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {allowsPresencial && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-white/95 text-[#1b3761] shadow-xs flex items-center gap-1 backdrop-blur-xs">
                          <Building2 size={10} />
                          <span>Presencial</span>
                        </span>
                      )}
                      {allowsOnline && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0a969b] text-white shadow-xs flex items-center gap-1">
                          <Laptop size={10} />
                          <span>Online</span>
                        </span>
                      )}
                    </div>

                    {/* Badge Superior Derecho: Próximamente si aplica */}
                    {course.proximamente && (
                      <div className="absolute top-3 right-3 z-10">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md flex items-center gap-1 border border-amber-300 backdrop-blur-xs">
                          <Clock size={11} className="text-slate-950 animate-pulse" />
                          <span>PRÓXIMAMENTE</span>
                        </span>
                      </div>
                    )}

                    {/* Badge de Horas */}
                    <div className="absolute bottom-3 left-3">
                      <span className="text-[11px] font-bold text-white bg-black/50 px-2.5 py-0.5 rounded-md backdrop-blur-xs flex items-center gap-1">
                        <Clock size={11} className="text-[#00FFE0]" />
                        <span>{course.duration}</span>
                      </span>
                    </div>
                  </div>

                  {/* Contenido de la Tarjeta */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center justify-between text-[11px] font-semibold gap-1.5">
                        <span className="text-slate-500">{course.category}</span>
                        {course.proximamente ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-amber-50 text-amber-900 border border-amber-300 shadow-2xs">
                            <Clock size={10} className="text-amber-700 animate-pulse" />
                            <span>PRÓXIMAMENTE</span>
                          </span>
                        ) : course.disponible !== false ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>DISPONIBLE • {course.cupos || 20} cupos</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-50 text-rose-700 border border-rose-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                            <span>SIN CUPOS</span>
                          </span>
                        )}
                      </div>

                      {course.fecha_inicio && (
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                          <Calendar size={12} className="text-[#0a969b] flex-shrink-0" />
                          <span><strong>{course.proximamente ? 'Fecha Proyectada:' : 'Inicio:'}</strong> {course.fecha_inicio}</span>
                        </div>
                      )}

                      <h3 className="text-base font-black text-[#161630] leading-snug group-hover:text-[#0a969b] transition-colors">
                        {course.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {course.description}
                      </p>
                    </div>

                    {/* Precios y Botón de Ficha */}
                    <div className="pt-3 border-t border-slate-100 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 block font-medium">Arancel Oficial</span>
                          <span className="text-lg font-black text-[#161630]">{course.price}</span>
                        </div>
                        {course.depositPrice && (
                          <div className="text-right">
                            <span className="text-[10px] text-slate-400 block">Modalidad Cuotas</span>
                            <span className="text-xs font-bold text-[#0a969b] bg-[#0a969b]/10 px-2 py-0.5 rounded-md">
                              {course.depositPrice}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Botón Ver Ficha y Temario (Abre Modal de Pestañas con tamaño estable) */}
                      <button
                        type="button"
                        onClick={() => setSelectedCourseForCurriculum(course)}
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-black text-white bg-[#1b3761] hover:bg-[#0a969b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:shadow-md transform active:scale-98"
                      >
                        <BookOpen size={14} />
                        <span>Ver Ficha Técnica y Temario</span>
                      </button>

                      {/* Botón adicional si es Próximamente */}
                      {course.proximamente && (
                        <button
                          type="button"
                          onClick={() => {
                            if (onSelectCourse) onSelectCourse(course.title);
                            else setSelectedCourseForCurriculum(course);
                          }}
                          className="w-full py-2 px-3 rounded-xl text-xs font-black text-amber-950 bg-amber-400 hover:bg-amber-300 border border-amber-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          title="Consultar fecha de apertura y preinscribirse"
                        >
                          <Clock size={13} className="text-amber-950" />
                          <span>PRÓXIMAMENTE • Consultar Apertura</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </section>


      {/* ================= 3. APARTADO "NOTICIAS Y ACTUALIDAD PREVYSEG (SEGURIDAD)" ================= */}
      <NewsSection 
        activeSchool="seguridad"
        hideSchoolSwitcher={true}
        onOpenEnrollmentWithCourse={(courseTitle) => {
          if (onSelectCourse) onSelectCourse(courseTitle);
        }}
      />

      {/* Modal Curricular de 4 Pestañas */}
      {selectedCourseForCurriculum && (
        <CourseCurriculumModal
          isOpen={Boolean(selectedCourseForCurriculum)}
          course={selectedCourseForCurriculum}
          onClose={() => setSelectedCourseForCurriculum(null)}
          onSelectCourse={(course) => {
            if (onSelectCourse) onSelectCourse(course);
            setSelectedCourseForCurriculum(null);
          }}
        />
      )}

    </div>
  );
};

export default SecuritySchoolView;
