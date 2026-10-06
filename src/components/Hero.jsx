import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Wrench,
  GraduationCap
} from 'lucide-react';
import gsap from 'gsap';

// Imágenes para el carrusel de fondo según la escuela
import heroImg from '../assets/images/hero_graduation.jpg';
import securityGuards from '../assets/images/security_guards.jpg';
import securitySupervisor from '../assets/images/security_supervisor.jpg';
import cctvOperator from '../assets/images/cctv_operator.jpg';
import securityPromo from '../assets/images/security_promo.jpg';
import portImg from '../assets/images/course_port_security_1788545050484.jpg';
import cyberImg from '../assets/images/course_cybersecurity_1788545064007.jpg';
import agricultureImg from '../assets/images/course_agriculture.jpg';
import aestheticImg from '../assets/images/course_aesthetic.jpg';
import elderlyImg from '../assets/images/course_elderly_care.jpg';
import bankCashierImg from '../assets/images/course_bank_cashier.jpg';
import foodImg from '../assets/images/course_gastronomy.jpg';
import conflictImg from '../assets/images/course_conflict_resolution_1788545038374.jpg';

const INSTITUTIONAL_SLIDES = [
  { img: heroImg, title: 'OTEC PrevySeg: Formación y Certificación de Excelencia Laboral', tag: 'SGS NCh 2728:2015' },
  { img: securityGuards, title: 'Escuela de Seguridad Privada (Ley 21.659 y Carabineros OS-10)', tag: 'Acreditación Oficial SPD' },
  { img: conflictImg, title: 'Escuela de Oficios Industriales y Servicios de Alta Demanda', tag: 'Respaldo Oficial SENCE' },
  { img: securitySupervisor, title: 'Formación de Vigilantes Privados y Seguridad Portuaria Directemar', tag: 'Alta Seguridad' },
  { img: agricultureImg, title: 'Cursos con Franquicia Tributaria SENCE e Impulsa Personas', tag: 'Normas SAG & Seremi' }
];

const Hero = ({
  onOpenContact,
  onOpenEnrollment,
  onOpenSchoolDetail,
  activeSchool = 'seguridad',
  onSwitchSchool
}) => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);
  const badgesRef = useRef(null);
  const overlayRef = useRef(null);

  const [currentBg, setCurrentBg] = useState(0);

  // Navegación de slides
  const nextSlide = useCallback(() => {
    setCurrentBg((prev) => (prev + 1) % INSTITUTIONAL_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentBg((prev) => (prev - 1 + INSTITUTIONAL_SLIDES.length) % INSTITUTIONAL_SLIDES.length);
  }, []);

  // Rotación automática cada 6 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Animaciones de entrada con GSAP
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );

      tl.fromTo(
        '.hero-badge',
        { opacity: 0, y: -15, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35 },
        '-=0.15'
      );

      tl.fromTo(
        '.hero-title-text',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.45 },
        '-=0.1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-16"
      style={{ backgroundColor: '#071626' }}
    >
      {/* Carrusel de Fondo Fotográfico Institucional */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {INSTITUTIONAL_SLIDES.map((slide, idx) => (
          <div
            key={slide.title}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentBg ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
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

      {/* Degradado Superpuesto Oficial PrevySeg Corporativo */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[1] transition-all duration-700"
        style={{
          background: 'linear-gradient(135deg, rgba(22,22,48,0.96) 0%, rgba(27,55,97,0.90) 45%, rgba(10,150,155,0.80) 100%)'
        }}
      />

      {/* Malla decorativa sutil */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Flechas de navegación del carrusel */}
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

      {/* ========== CONTENIDO PRINCIPAL INSTITUCIONAL ========== */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-8 py-14 lg:py-20">
        <div className="max-w-4xl space-y-6">

          {/* Badge Acreditación Institucional */}
          <div className="hero-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#161630]/80 border border-[#00FFE0]/35 backdrop-blur-md text-white text-xs font-semibold shadow-[0_0_20px_rgba(0,255,224,0.15)]">
            <Award size={15} className="text-[#00FFE0]" />
            <span className="tracking-wide">
              Organismo Técnico Acreditado SENCE N°A-4721 • Certificación SGS NCh 2728:2015 • Autorización SPD
            </span>
          </div>

          {/* Título Principal Institucional OTEC PrevySeg */}
          <h1
            ref={titleRef}
            className="hero-title-text text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.08] tracking-tight text-white"
            style={{ textShadow: '0 2px 25px rgba(0,0,0,0.6)' }}
          >
            <span>OTEC</span>{' '}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(90deg, #00FFE0 0%, #12b4ba 50%, #38bdf8 100%)',
              }}
            >
              PrevySeg
            </span>{' '}
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white/90 mt-1">
              Capacitaciones de Excelencia Laboral
            </span>
          </h1>

          {/* Descripción Institucional */}
          <p
            ref={descRef}
            className="text-white/90 text-sm sm:text-base lg:text-lg leading-relaxed max-w-3xl"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.4)' }}
          >
            <strong className="font-bold text-white">PrevySeg Capacitaciones:</strong> Organismo Técnico de Capacitación líder en Arica y la Macro Zona Norte. Impartimos programas de formación técnica y profesional con los más altos estándares pedagógicos y normativos bajo acreditación oficial SENCE y certificación de calidad internacional SGS NCh 2728:2015.
          </p>

          {/* Badges de Confianza Institucional en Tarjetas Pulidas */}
          <div ref={badgesRef} className="pt-3 flex flex-wrap items-center gap-3 text-xs font-medium">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161630]/70 backdrop-blur-md border border-[#00FFE0]/25 text-white/95 shadow-sm">
              <span className="w-2 h-2 rounded-full animate-pulse bg-[#00FFE0] shadow-[0_0_8px_#00FFE0]" />
              <span>Sede Central: Blanco Encalada #666, Arica</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161630]/70 backdrop-blur-md border border-[#00FFE0]/25 text-white/95 shadow-sm">
              <CheckCircle2 size={14} className="text-[#00FFE0]" />
              <span>Modalidad Presencial y Online SENCE</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161630]/70 backdrop-blur-md border border-amber-400/30 text-white/95 shadow-sm">
              <Sparkles size={14} className="text-amber-300" />
              <span>Franquicia Tributaria 100% Impulsa Personas</span>
            </div>
          </div>

          {/* Pill informativa del carrusel */}
          <div className="pt-2 inline-flex items-center gap-3 px-4 py-1.5 rounded-xl bg-[#161630]/80 backdrop-blur-md border border-[#00FFE0]/30 text-white/80 text-xs shadow-md">
            <span className="w-2 h-2 rounded-full bg-[#00FFE0] animate-pulse shadow-[0_0_8px_#00FFE0]" />
            <span className="font-black text-[#00FFE0]">
              {String(currentBg + 1).padStart(2, '0')} / {String(INSTITUTIONAL_SLIDES.length).padStart(2, '0')}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-white/90 truncate max-w-[260px] sm:max-w-md font-medium">
              {INSTITUTIONAL_SLIDES[currentBg].title}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
