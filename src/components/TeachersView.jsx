import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Award,
  Shield,
  Wrench,
  HeartPulse,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  Users,
  Building2,
  Sparkles,
  Filter,
  Search,
  Scale,
  Stethoscope,
  Radio,
  FileCheck2
} from 'lucide-react';
import { UNIFIED_TEACHERS_TEAM } from '../data/syllabusData';

// Docentes completos de PrevySeg (Seguridad Privada + Escuela de Oficios + Psicología Clínica)
const ALL_DOCENTES = [
  ...UNIFIED_TEACHERS_TEAM.map(t => ({
    ...t,
    school: 'seguridad',
    coursesTaught: [
      'Formación de Guardias de Seguridad (90 hrs • Ley 21.659)',
      'Formación de Vigilantes Privados (100 hrs)',
      'Perfeccionamiento de Guardias OS-10',
      'Supervisor de Seguridad Privada'
    ]
  })),
  {
    name: 'Felipe I. Cisterna Farias',
    nombre: 'Felipe I. Cisterna Farias',
    role: 'Psicólogo Clínico • Relator Especialista',
    cargo: 'Psicólogo Clínico & Mediador Laboral',
    badge: 'Psicólogo Clínico Acreditado',
    area: 'Psicología Clínica · Resolución de Conflictos · Mediación Laboral',
    credentials: 'Psicólogo Clínico • Fundador de Tu Espacio Terapéutico',
    bio: 'Psicólogo Clínico especializado en contención emocional, manejo asertivo del estrés en ambientes de alta exigencia, resolución de crisis interpersonales y mediación laboral constructiva. Relator titular del curso oficial SENCE.',
    avatar: null,
    whatsapp: '56972210629',
    website: 'https://www.tuespacioterapeutico.cl',
    email: 'felipecisternaf@gmail.com',
    school: 'oficios',
    coursesTaught: [
      'Resolución de Conflictos y Manejo de Situaciones Difíciles (Código SENCE: 1238088725)'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'Todos los Docentes', icon: Users },
  { id: 'seguridad', label: 'Seguridad Privada (OS-10 / SPD)', icon: Shield },
  { id: 'legislacion', label: 'Legislación & DDHH', icon: Scale },
  { id: 'prevencion', label: 'Prevención & Emergencias', icon: FileCheck2 },
  { id: 'salud', label: 'Salud & Primeros Auxilios', icon: Stethoscope },
  { id: 'psicologia', label: 'Psicología & Mediación', icon: HeartPulse },
];

const TeachersView = ({
  onReturnHome,
  onGoToSecurity,
  onGoToTrades,
  onOpenEnrollment
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeachers = useMemo(() => {
    return ALL_DOCENTES.filter((t) => {
      const matchSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.credentials.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.bio.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchSearch) return false;

      if (selectedCategory === 'all') return true;
      if (selectedCategory === 'seguridad') return t.school === 'seguridad';
      if (selectedCategory === 'legislacion') {
        return t.area.toLowerCase().includes('legis') || t.area.toLowerCase().includes('ddhh') || t.area.toLowerCase().includes('derecho') || t.badge.toLowerCase().includes('abog');
      }
      if (selectedCategory === 'prevencion') {
        return t.area.toLowerCase().includes('prevenci') || t.area.toLowerCase().includes('emergencia') || t.area.toLowerCase().includes('instalaciones');
      }
      if (selectedCategory === 'salud') {
        return t.area.toLowerCase().includes('primeros auxilios') || t.area.toLowerCase().includes('enferm');
      }
      if (selectedCategory === 'psicologia') {
        return t.school === 'oficios' || t.name.includes('Felipe');
      }
      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      
      {/* ================= HERO SECTION DOCENTES ================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#161630] via-[#1b3761] to-[#0a969b] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        
        {/* Decoraciones geométricas */}
        <div className="absolute top-0 right-0 w-96 h-96 opacity-15 pointer-events-none">
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <circle cx="100" cy="100" r="85" stroke="white" strokeWidth="1.5" strokeDasharray="6 6" />
            <path d="M40 0 L200 160 L200 190 L10 0 Z" fill="#00FFE0" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 space-y-6">
          
          {/* Breadcrumb y botón regresar */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onReturnHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer border border-white/15 backdrop-blur-xs"
            >
              <ArrowLeft size={13} />
              <span>Volver al Inicio</span>
            </button>
            <span className="text-white/40 text-xs">/</span>
            <span className="text-[#00FFE0] text-xs font-bold tracking-wide uppercase">
              Cuerpo Docente & Relatores
            </span>
          </div>

          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest bg-[#0a969b]/30 text-[#00FFE0] border border-[#0a969b]/50 backdrop-blur-xs">
              <GraduationCap size={14} />
              <span>Cuerpo Académico Oficial • OTEC PrevySeg Arica</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Docentes e Instructores Especialistas
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
              Conoce al equipo de profesionales y relatores certificados que imparten nuestras cátedras bajo la <strong>Ley N° 21.659</strong>, normativas de <strong>Carabineros de Chile OS-10</strong>, acreditaciones <strong>SENCE</strong>, y estándares de calidad <strong>NCh 2728:2015 SGS Chile</strong>.
            </p>
          </div>

          {/* Badges de Garantía Institucional */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
            <div className="flex items-center gap-2 text-xs text-white/90">
              <CheckCircle2 size={16} className="text-[#00FFE0] flex-shrink-0" />
              <span>Acreditación OS-10 Vigente</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <CheckCircle2 size={16} className="text-[#00FFE0] flex-shrink-0" />
              <span>Relatores Codificados SENCE</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <CheckCircle2 size={16} className="text-[#00FFE0] flex-shrink-0" />
              <span>Norma NCh 2728:2015 SGS</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/90">
              <CheckCircle2 size={16} className="text-[#00FFE0] flex-shrink-0" />
              <span>Sede Central Blanco Encalada 666</span>
            </div>
          </div>

        </div>
      </section>

      {/* ================= CONTENIDO Y FILTROS ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 space-y-8">
        
        {/* Barra de Filtros y Búsqueda */}
        <div className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Categorías */}
          <div className="flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar py-1">
            {CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap shadow-2xs ${
                    isSelected
                      ? 'bg-[#1b3761] text-white shadow-sm border-b-2 border-[#0a969b]'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  <Icon size={13} className={isSelected ? 'text-[#00FFE0]' : 'text-[#0a969b]'} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Buscador */}
          <div className="relative w-full md:w-72 flex-shrink-0">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar docente o especialidad..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#0a969b]/40 text-slate-800"
            />
          </div>

        </div>

        {/* Resumen del Conteo */}
        <div className="flex items-center justify-between text-xs text-slate-600 px-1">
          <span className="font-bold">
            Mostrando {filteredTeachers.length} docente{filteredTeachers.length !== 1 ? 's' : ''} registrado{filteredTeachers.length !== 1 ? 's' : ''}
          </span>
          <span className="text-slate-400">
            PrevySeg Capacitaciones • Arica, Chile
          </span>
        </div>

        {/* ================= GRID DE TARJETAS DE DOCENTES ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((doc, idx) => {
            const isFelipe = doc.name.includes('Felipe');

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.05 }}
                className={`rounded-3xl bg-white border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group ${
                  isFelipe
                    ? 'border-emerald-300 ring-2 ring-emerald-200/50 shadow-emerald-500/10'
                    : 'border-slate-200/90 hover:border-[#0a969b]/40'
                }`}
              >
                {/* Cabecera de la Tarjeta */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    
                    <div className="flex items-start gap-3.5">
                      {/* Avatar / Icono */}
                      {isFelipe ? (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-600/20 flex-shrink-0">
                          <HeartPulse size={28} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#161630] to-[#1b3761] text-[#00FFE0] flex items-center justify-center font-bold shadow-md shadow-blue-900/10 flex-shrink-0">
                          <GraduationCap size={28} />
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h3 className="text-base font-black text-[#161630] leading-snug group-hover:text-[#0a969b] transition-colors">
                            {doc.name}
                          </h3>
                        </div>

                        <span className="text-[11px] font-bold text-[#0a969b] block leading-tight">
                          {doc.role}
                        </span>

                        <span className={`inline-block text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                          isFelipe
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-sky-50 text-sky-800 border-sky-200'
                        }`}>
                          {doc.badge}
                        </span>
                      </div>
                    </div>

                    {/* Credenciales Académicas */}
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Título & Postgrados:
                      </span>
                      <p className="font-semibold text-[#161630] text-[11px] leading-snug">
                        {doc.credentials}
                      </p>
                    </div>

                    {/* Área de Desempeño */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Área de Especialización:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {doc.area.split('·').map((subArea, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#0a969b]/10 text-[#1b3761] border border-[#0a969b]/20"
                          >
                            ✓ {subArea.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Reseña Biográfica */}
                    <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {doc.bio}
                    </p>

                    {/* Cursos que Imparte */}
                    {doc.coursesTaught && doc.coursesTaught.length > 0 && (
                      <div className="space-y-1.5 border-t border-slate-100 pt-3">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-500 block">
                          Cursos & Programas Asignados:
                        </span>
                        <ul className="space-y-1">
                          {doc.coursesTaught.map((c, cIdx) => (
                            <li key={cIdx} className="text-[11px] text-slate-700 flex items-start gap-1.5">
                              <BookOpen size={12} className="text-[#0a969b] flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  </div>

                  {/* Acciones de Contacto Especiales (Felipe Cisterna) */}
                  {isFelipe && (
                    <div className="pt-4 border-t border-emerald-100 space-y-2 mt-4">
                      <a
                        href={`https://wa.me/${doc.whatsapp}?text=Hola%20Felipe,%20te%20contacto%20desde%20la%20página%20web.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-3 rounded-xl text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 cursor-pointer"
                      >
                        <MessageCircle size={14} />
                        <span>Contactar por WhatsApp (+56 9 7221 0629)</span>
                      </a>

                      <a
                        href={doc.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-50 border border-emerald-200 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <ExternalLink size={13} />
                        <span>Sitio Web: Tu Espacio Terapéutico</span>
                      </a>
                    </div>
                  )}

                </div>

                {/* Footer de Tarjeta con Sello SGS */}
                <div className="px-5 py-2.5 bg-slate-50 border-t border-slate-100 text-[10px] text-slate-500 flex items-center justify-between">
                  <span className="font-bold text-[#1b3761]">Acreditado OTEC PrevySeg</span>
                  <span>Norma NCh 2728</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= SECCIÓN COMPROMISO DOCENTE Y CALIDAD ================= */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#161630] to-[#1b3761] text-white space-y-6">
          <div className="max-w-2xl space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#00FFE0] bg-white/10 px-3 py-1 rounded-full border border-white/20 inline-block">
              Excelencia Pedagógica & Acreditación Fiscalizadora
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Garantía de Instrucción Profesional en Arica
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Todos los docentes y relatores de OTEC PrevySeg cumplen rigurosamente con los requisitos de idoneidad cívica, formación universitaria o técnica superior, y registro al día ante la Autoridad Fiscalizadora de Carabineros OS-10 y el Servicio Nacional de Capacitación y Empleo (SENCE).
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="button"
              onClick={onGoToSecurity}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0a969b] hover:bg-[#077478] transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Shield size={14} />
              <span>Ver Cursos de Seguridad Privada</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={onGoToTrades}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Wrench size={14} />
              <span>Ver Escuela de Oficios</span>
              <ArrowRight size={13} />
            </button>

            <button
              type="button"
              onClick={onReturnHome}
              className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white transition-all cursor-pointer ml-auto"
            >
              Volver a la Portada
            </button>
          </div>
        </div>

      </section>

    </div>
  );
};

export default TeachersView;

