import React, { useState, useRef, useEffect } from 'react';
import {
  PieChart,
  BarChart3,
  SlidersHorizontal,
  Star,
  ArrowRight,
  Shield,
  Wrench,
  Award,
  CheckCircle2,
  Info,
  Building2,
  FileCheck,
  Scale
} from 'lucide-react';
import { SecuritySchoolEmblem, TradesSchoolEmblem } from './logos/SchoolLogos';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutUs = ({ onSelectSchool }) => {
  const sectionRef = useRef(null);
  const [activeTab, setActiveTab] = useState('otec'); // 'otec' | 'oficios' | 'seguridad'
  const [hoveredCard, setHoveredCard] = useState(null);

  // Definición de contenidos por cada una de las 3 pestañas
  const tabData = {
    otec: {
      tag: 'ORGANISMO TÉCNICO DE CAPACITACIÓN',
      title: 'Información General OTEC PrevySeg',
      subtitle: 'Acreditados por SENCE bajo la Norma Chilena de Calidad NCh 2728:2015 SGS',
      accentColor: '#0A4DA2',
      badgeBg: 'bg-blue-50 text-[#0A4DA2] border-blue-200',
      noticeText: 'Aclaración Oficial: En la OTEC no entregamos títulos profesionales universitarios; somos un Organismo Técnico de Capacitación acreditado en Chile por el Servicio Nacional de Capacitación y Empleo (Sence) para ofrecer cursos y programas de formación laboral con validez oficial.',
      qualityHighlight: 'Nuestro fuerte institucional es estar certificados bajo la Norma Chilena NCh 2728:2015 por la casa certificadora internacional SGS (Certificado CL 13/20100689), garantizando un Sistema de Gestión de Calidad con auditorías periódicas y mejora continua.',
      cards: [
        {
          title: 'Misión',
          subtitle: 'Capacitación en Oficios y Competencias Laborales',
          icon: PieChart,
          color: '#0A4DA2',
          lightBg: 'rgba(10, 77, 162, 0.04)',
          stat: '+15 Años',
          statLabel: 'Trayectoria',
          text: 'Prevyseg ofrece programas de capacitación diseñados para fortalecer competencias laborales en diversas áreas productivas. Nuestros cursos permiten desarrollar habilidades prácticas que facilitan la inserción y el crecimiento en el mundo laboral.'
        },
        {
          title: 'Visión',
          subtitle: 'Liderazgo en la Macro Zona Norte',
          icon: BarChart3,
          color: '#00A896',
          lightBg: 'rgba(0, 168, 150, 0.04)',
          stat: '98%',
          statLabel: 'Aprobación',
          text: 'Ser el Organismo Técnico de Capacitación líder y de referencia en Arica y la Macro Zona Norte, reconocidos por la excelencia pedagógica, tecnología aplicada y alta empleabilidad de nuestros egresados.'
        },
        {
          title: 'Norma de Calidad & Valores',
          subtitle: 'Certificación NCh 2728:2015 SGS',
          icon: SlidersHorizontal,
          color: '#F2A900',
          lightBg: 'rgba(242, 169, 0, 0.04)',
          stat: 'NCh 2728',
          statLabel: 'Certificado SGS',
          text: 'Compromiso estricto con el Manual de Calidad NCh 2728:2015, integridad, disciplina, vocación de servicio y constante actualización profesional como pilares fundamentales en cada programa de instrucción.'
        }
      ]
    },
    oficios: {
      tag: 'ESCUELA DE OFICIOS Y COMPETENCIAS LABORALES',
      title: 'Escuela de Oficios Industriales y Técnicos',
      subtitle: 'Formación 100% práctica en talleres con certificación directa OTEC PrevySeg',
      accentColor: '#00A896',
      badgeBg: 'bg-teal-50 text-[#00A896] border-teal-200',
      noticeText: 'Formación Práctica: Desarrollamos habilidades aplicadas en talleres reales de gastronomía, carpintería, grúa horquilla, electricidad y soldadura para una rápida inserción al mercado laboral y proyectos de emprendimiento.',
      qualityHighlight: 'Cursos reconocidos con código SENCE para personas particulares y tramos de franquicia tributaria empresarial (Impulsa Personas).',
      cards: [
        {
          title: 'Misión de Oficios',
          subtitle: 'Desarrollo de Habilidades Aplicadas',
          icon: Wrench,
          color: '#00A896',
          lightBg: 'rgba(0, 168, 150, 0.05)',
          stat: '100%',
          statLabel: 'Práctico en Taller',
          text: 'Instruir y entrenar a técnicos y operarios en habilidades manuales e industriales de alta demanda, asegurando que adquieran destrezas reales para desempeñarse eficazmente en faenas, talleres y servicios.'
        },
        {
          title: 'Visión de Oficios',
          subtitle: 'Motor de Empleabilidad y Emprendimiento',
          icon: BarChart3,
          color: '#0A7D8C',
          lightBg: 'rgba(10, 125, 140, 0.05)',
          stat: '8+',
          statLabel: 'Especialidades',
          text: 'Consolidarnos como el centro de formación técnica y de oficios preferido por industrias, contratistas y emprendedores de la Macro Zona Norte por la disciplina y destreza de nuestros egresados.'
        },
        {
          title: 'Sello de Oficios',
          subtitle: 'Certificación Directa OTEC PrevySeg',
          icon: Award,
          color: '#F2A900',
          lightBg: 'rgba(242, 169, 0, 0.05)',
          stat: 'SENCE',
          statLabel: 'Validez Nacional',
          text: 'Certificación directa e inmediata emitida por OTEC PrevySeg con respaldo NCh 2728, protocolos de seguridad en obra, manejo de herramientas de última generación y competencias homologables.'
        }
      ]
    },
    seguridad: {
      tag: 'ESCUELA DE SEGURIDAD PRIVADA',
      title: 'Escuela de Seguridad y Vigilancia Privada',
      subtitle: 'Instrucción técnica y jurídica conforme a la Ley 21.659 y protocolos SPD / OS-10',
      accentColor: '#071626',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
      noticeText: 'Acreditación Oficial SPD: PrevySeg entrega la capacitación preparatoria completa. Para obtener la tarjeta oficial de Guardia de Seguridad, la Subsecretaría de Prevención del Delito (SPD) aplica el examen evaluativo externo presencial.',
      qualityHighlight: 'Instructores acreditados con amplia trayectoria en Carabineros de Chile, Armada (Directemar) y especialistas en control de crisis y legislación de seguridad privada.',
      cards: [
        {
          title: 'Misión de Seguridad',
          subtitle: 'Instrucción Táctica y Legal Rigurosa',
          icon: Shield,
          color: '#0A4DA2',
          lightBg: 'rgba(10, 77, 162, 0.05)',
          stat: 'Ley 21.659',
          statLabel: 'Marco Jurídico',
          text: 'Formar y capacitar integralmente a profesionales de seguridad privada con los más altos estándares técnicos, tácticos y éticos, brindando herramientas que aseguren un desempeño eficiente y comprometido con la ley.'
        },
        {
          title: 'Visión de Seguridad',
          subtitle: 'Referencia en Acreditaciones Oficiales',
          icon: BarChart3,
          color: '#00C4D8',
          lightBg: 'rgba(0, 196, 216, 0.05)',
          stat: '99%',
          statLabel: 'Éxito en Examen',
          text: 'Ser la escuela de seguridad privada con mayor tasa de aprobación y prestigio en exámenes de la Autoridad Fiscalizadora en Chile, formando guardias y vigilantes altamente calificados.'
        },
        {
          title: 'Valores y Disciplina',
          subtitle: 'Ética y Protocolos de Seguridad',
          icon: Scale,
          color: '#071626',
          lightBg: 'rgba(7, 22, 38, 0.05)',
          stat: '100%',
          statLabel: 'Apego a Derecho',
          text: 'Compromiso inquebrantable con los derechos humanos, legítima defensa, vocación de resguardo de bienes y personas, primeros auxilios y honestidad absoluta en cada intervención.'
        }
      ]
    }
  };

  const currentTabInfo = tabData[activeTab];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance animation
      gsap.fromTo('.about-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.about-title', start: 'top 85%', once: true }
        }
      );

      // Staggered cards entrance
      gsap.fromTo('.about-card',
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out',
          scrollTrigger: { trigger: '.about-cards-container', start: 'top 85%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="quienes-somos"
      className="relative py-24 sm:py-28 px-4 sm:px-8 bg-white overflow-hidden border-t border-slate-100 scroll-mt-24"
    >
      {/* Anchor compatible para enlaces #informacion */}
      <div id="informacion" className="absolute -top-20 left-0" />
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute top-20 right-[5%] w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-[5%] w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Section Header */}
        <div className="about-title text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 text-[#0284c7] text-xs font-bold tracking-widest uppercase border border-sky-100 shadow-sm">
            <Star size={12} className="fill-[#0284c7]" />
            Nuestra Identidad Institucional
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            Pilares de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0284c7] via-[#0A4DA2] to-[#00A896]">
              PrevySeg
            </span>
          </h2>

          <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Organismo Técnico de Capacitación (OTEC) acreditado por SENCE y certificado bajo la
            <strong className="text-slate-900 font-bold"> Norma Chilena de Calidad NCh 2728:2015 SGS</strong>.
          </p>
        </div>

        {/* ================= SELECTOR DE 3 PESTAÑAS (REQUERIMIENTO OFICIAL) ================= */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 shadow-inner max-w-full overflow-x-auto gap-1">

            {/* Pestaña 1: Información General OTEC */}
            <button
              type="button"
              onClick={() => setActiveTab('otec')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${activeTab === 'otec'
                  ? 'bg-white text-[#0A4DA2] shadow-md border border-slate-200/80'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <Building2 size={16} className={activeTab === 'otec' ? 'text-[#0A4DA2]' : 'text-slate-400'} />
              <span>Información General OTEC</span>
            </button>

            {/* Pestaña 2: Escuela de Oficios */}
            <button
              type="button"
              onClick={() => setActiveTab('oficios')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${activeTab === 'oficios'
                  ? 'bg-gradient-to-r from-[#00A896] to-[#008B8B] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <Wrench size={16} className={activeTab === 'oficios' ? 'text-white' : 'text-[#00A896]'} />
              <span>Escuela de Oficios</span>
            </button>

            {/* Pestaña 3: Escuela de Seguridad */}
            <button
              type="button"
              onClick={() => setActiveTab('seguridad')}
              className={`flex items-center gap-2 px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer whitespace-nowrap ${activeTab === 'seguridad'
                  ? 'bg-[#071626] text-white shadow-md'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
            >
              <Shield size={16} className={activeTab === 'seguridad' ? 'text-[#00C4D8]' : 'text-[#0A4DA2]'} />
              <span>Escuela de Seguridad</span>
            </button>
          </div>
        </div>

        {/* ================= BANNER INFORMATIVO CLAVE (DEFINICIÓN OTEC & CALIDAD NCh 2728) ================= */}
        <div className="mb-12 bg-gradient-to-r from-slate-50 via-sky-50/50 to-teal-50/30 rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="w-full space-y-4 relative z-10">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`text-[10px] sm:text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full border ${currentTabInfo.badgeBg}`}>
                    {currentTabInfo.tag}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                    <CheckCircle2 size={12} />
                    Acreditación SENCE N°1238088725
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 flex items-center gap-1.5">
                    <Award size={12} />
                    Certificado SGS CL 13/20100689
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
                  {currentTabInfo.title}
                </h3>
              </div>

              {/* Acceso directo a la vista correspondiente al seleccionar Oficios o Seguridad */}
              {activeTab !== 'otec' && onSelectSchool && (
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      const targetSchool = activeTab === 'oficios' ? 'oficios' : 'seguridad';
                      const targetSection = activeTab === 'oficios' ? 'catalogo-oficios' : 'catalogo-seguridad';
                      onSelectSchool(targetSchool, targetSection);
                    }}
                    className={`px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.03] active:scale-[0.97] ${activeTab === 'oficios'
                        ? 'bg-gradient-to-r from-[#00A896] to-[#008B8B] hover:brightness-110 text-white shadow-teal-900/20 ring-2 ring-[#00FFE0]/30'
                        : 'bg-[#071626] hover:bg-[#0B2032] text-[#00FFE0] shadow-slate-900/20 ring-2 ring-[#00C4D8]/30'
                      }`}
                  >
                    <span>
                      {activeTab === 'oficios'
                        ? 'Ver todas las capacitaciones de Escuela de Oficios'
                        : 'Ver todas las capacitaciones de Escuela de Seguridad'}
                    </span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              )}
            </div>

            {/* Mensaje de definición oficial OTEC que ocupa el recuadro completo (w-full) */}
            <div className="w-full p-5 sm:p-7 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center flex-shrink-0 border border-sky-100 shadow-sm mt-0.5">
                  <Info size={22} className="text-[#0284c7]" />
                </div>
                <div className="space-y-3 flex-1">
                  <p className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                    {currentTabInfo.noticeText}
                  </p>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 pt-3">
                    {currentTabInfo.qualityHighlight}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= TARJETAS DE PILARES (MISIÓN, VISIÓN, VALORES/CALIDAD) ================= */}
        <div className="about-cards-container grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {currentTabInfo.cards.map((card, index) => {
            const IconComp = card.icon;
            const isHovered = hoveredCard === index;
            return (
              <div
                key={card.title}
                className="about-card"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className="relative flex flex-col items-center text-center p-8 lg:p-10 rounded-3xl border-2 transition-all duration-300 group overflow-hidden h-full"
                  style={{
                    borderColor: isHovered ? card.color : '#e2e8f0',
                    backgroundColor: isHovered ? card.lightBg : '#ffffff',
                    boxShadow: isHovered
                      ? `0 20px 40px -12px ${card.color}25, 0 0 0 1px ${card.color}20`
                      : '0 4px 6px -1px rgba(0,0,0,0.04)',
                    transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-1 rounded-b-full transition-all duration-500"
                    style={{
                      backgroundColor: card.color,
                      width: isHovered ? '60%' : '20%',
                    }}
                  />

                  {/* Icon Container */}
                  <div
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 relative"
                    style={{
                      backgroundColor: `${card.color}15`,
                      transform: isHovered ? 'scale(1.08) rotate(-2deg)' : 'scale(1)',
                    }}
                  >
                    <IconComp
                      size={34}
                      style={{ color: card.color }}
                      className="transition-all duration-300"
                    />
                  </div>

                  {/* Title & Subtitle */}
                  <h3
                    className="text-2xl font-black mb-1.5 tracking-tight transition-colors duration-300"
                    style={{ color: isHovered ? card.color : '#0f172a' }}
                  >
                    {card.title}
                  </h3>

                  {card.subtitle && (
                    <p className="text-[11px] uppercase tracking-wider font-bold text-slate-600 mb-4">
                      {card.subtitle}
                    </p>
                  )}

                  {/* Stat badge */}
                  <div
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-5 transition-all duration-300"
                    style={{
                      backgroundColor: `${card.color}15`,
                      color: card.color,
                    }}
                  >
                    <span className="text-sm font-extrabold">{card.stat}</span>
                    <span className="text-[10px] uppercase tracking-wider opacity-80">{card.statLabel}</span>
                  </div>

                  {/* Text con la redacción exacta de la captura */}
                  <p className="text-slate-600 text-sm sm:text-[15px] leading-relaxed flex-grow">
                    {card.text}
                  </p>

                  {/* Sello de Respaldo */}
                  <div className="pt-6 mt-6 border-t border-slate-100 w-full flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600">
                    <CheckCircle2 size={13} style={{ color: card.color }} />
                    <span>Estándar de Calidad PrevySeg</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= RESUMEN DE COMPROMISO INSTITUCIONAL ================= */}
        <div className="mt-14 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-6 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600 shadow-sm">
            <span className="font-bold text-slate-800">Organismo Técnico de Capacitación PrevySeg:</span>
            <span>Regulado por SENCE</span>
            <span>•</span>
            <span>Norma NCh 2728:2015 SGS</span>
            <span>•</span>
            <span>Sede Arica: Blanco Encalada N°666, 2do Piso</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
