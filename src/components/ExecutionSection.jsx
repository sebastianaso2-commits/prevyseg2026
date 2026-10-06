import React, { useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  ChevronRight, 
  Award, 
  Zap, 
  Shield, 
  Wrench, 
  Sparkles,
  Layers,
  Check
} from 'lucide-react';
import promoSecurityImg from '../assets/images/security_promo.jpg';
import promoTradesImg from '../assets/images/course_logistics_1788545116792.jpg';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExecutionSection = ({ onLearnMore, activeSchool = 'seguridad' }) => {
  const sectionRef = useRef(null);
  const isSecurity = activeSchool === 'seguridad';

  // Contenido correlativo, adaptado y llamativo según la escuela activa
  const schoolContent = isSecurity ? {
    tag: 'Seguridad Privada & Acreditación SPD',
    tagIcon: Shield,
    tagBadgeClass: 'bg-sky-50 text-[#0284c7] border-sky-200',
    titlePrefix: 'Garantizamos Estándares de',
    titleHighlight: 'Seguridad y Confianza',
    titleGradient: 'from-[#071626] via-[#0A4DA2] to-[#00C4D8]',
    waveColor: 'text-[#00C4D8]/40',
    leadText: (
      <>
        En <strong className="text-[#0284c7] font-black">PrevySeg</strong> formamos guardias, vigilantes y supervisores con una preparación rigurosa, táctica y jurídica conforme a la Ley 21.659 y exigencias de Carabineros OS-10 y Directemar.
      </>
    ),
    checkmarks: [
      {
        title: 'Instructores con Trayectoria en Fuerzas de Orden y Seguridad',
        desc: 'Ex uniformados y especialistas certificados en tácticas operativas, tiro práctico, legislación y defensa personal.'
      },
      {
        title: 'Salas Equipadas y Simuladores de CCTV en Tiempo Real',
        desc: 'Software VMS profesional, domos PTZ y consolas para entrenamiento en centrales de monitoreo y televigilancia.'
      },
      {
        title: 'Acreditación Oficial Válida ante la SPD y Directemar',
        desc: 'Preparación integral para rendir y aprobar el examen evaluativo reglamentario ante la Autoridad Fiscalizadora.'
      },
      {
        title: 'Metodología Teórico-Práctica en Manejo de Crisis',
        desc: 'Protocolos de legítima defensa, resolución constructiva de conflictos y primeros auxilios asistenciales en terreno.'
      },
      {
        title: 'Bolsa de Empleo Activa con Alta Tasa de Contratación',
        desc: 'Alianzas y convenios con empresas de seguridad privada, recintos portuarios, minería y retail en Arica.'
      },
      {
        title: 'Asesoría Integral en Tramitación y Renovación OS-10',
        desc: 'Acompañamiento continuo en la carpeta de antecedentes y revalidación trienal de credenciales de seguridad.'
      }
    ],
    buttonText: 'Conocer Metodología de Seguridad',
    buttonGradient: 'from-[#071626] to-[#0A7D8C] hover:from-[#0B2032] hover:to-[#00C4D8]',
    buttonShadow: 'shadow-[#071626]/25 hover:shadow-sky-500/40',
    checkIconColor: 'text-[#0284c7]',
    checkIconBg: 'bg-sky-50 group-hover:bg-[#0284c7]',
    cardBorderHover: 'hover:border-sky-300 hover:shadow-sky-500/5',
    imgSrc: promoSecurityImg,
    imgAlt: 'Oficial de Seguridad Privada PrevySeg',
    glowGradient: 'from-[#0284c7]/20 to-[#00c2b2]/20',
    statNumber: '15+ Años de Liderazgo',
    statLabel: 'Formando a los mejores profesionales de seguridad en Arica',
    badgeGradient: 'from-[#071626] to-[#0A7D8C]'
  } : {
    tag: 'Escuela de Oficios & Competencias Laborales',
    tagIcon: Wrench,
    tagBadgeClass: 'bg-emerald-50 text-[#00A896] border-emerald-200',
    titlePrefix: 'Garantizamos Destrezas Prácticas en',
    titleHighlight: 'Oficios de Alta Demanda',
    titleGradient: 'from-[#071626] via-[#0A7D8C] to-[#00A896]',
    waveColor: 'text-[#00A896]/40',
    leadText: (
      <>
        En <strong className="text-[#00A896] font-black">PrevySeg</strong> capacitamos técnicos y operarios en talleres prácticos y faena real, desarrollando competencias laborales bajo Norma NCh 2728:2015 y código SENCE para una rápida inserción y crecimiento en el mercado laboral.
      </>
    ),
    checkmarks: [
      {
        title: 'Talleres 100% Prácticos en Terreno y Sede de Instrucción',
        desc: 'Metodología intensiva "aprender haciendo" con herramientas, maquinarias, insumos y escenarios industriales reales.'
      },
      {
        title: 'Certificación y Diploma Directo PrevySeg OTEC',
        desc: 'Entrega inmediata de Diploma Oficial con código QR de verificación curricular nacional sin esperas burocráticas.'
      },
      {
        title: 'Programas Técnicos con Código SENCE y Calidad SGS NCh 2728',
        desc: 'Cursos con respaldo oficial para personas particulares y franquicia tributaria empresarial (Impulsa Personas).'
      },
      {
        title: 'Especialidades Técnicas de Inserción Inmediata y Emprendimiento',
        desc: 'Carga portuaria, sanidad agrícola SAG, manipulación higiénica Seremi, estética profesional y cuidados asistenciales.'
      },
      {
        title: 'Docentes y Maestros Guía con Experiencia Real en Faena',
        desc: 'Especialistas activos en el sector productivo de la Macro Zona Norte que transmiten estándares de calidad y seguridad.'
      },
      {
        title: 'Bolsa de Empleo y Fomento al Emprendimiento Autónomo',
        desc: 'Contacto directo con empresas contratistas de Arica y herramientas clave para iniciar tu propio servicio o taller independiente.'
      }
    ],
    buttonText: 'Conocer Cursos de Oficios',
    buttonGradient: 'from-[#071626] to-[#00A896] hover:from-[#0B2032] hover:to-[#0A7D8C]',
    buttonShadow: 'shadow-[#071626]/25 hover:shadow-teal-500/40',
    checkIconColor: 'text-[#00A896]',
    checkIconBg: 'bg-emerald-50 group-hover:bg-[#00A896]',
    cardBorderHover: 'hover:border-emerald-300 hover:shadow-emerald-500/5',
    imgSrc: promoTradesImg,
    imgAlt: 'Técnico Operario Escuela de Oficios PrevySeg',
    glowGradient: 'from-[#00A896]/20 to-[#0A7D8C]/20',
    statNumber: '100% Práctico en Taller',
    statLabel: 'Diploma Oficial OTEC PrevySeg con Reconocimiento SENCE Nacional',
    badgeGradient: 'from-[#071626] to-[#00A896]'
  };

  const TagIcon = schoolContent.tagIcon;

  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const ctx = gsap.context(() => {
      // Badge and Heading animation
      gsap.fromTo(
        '.exec-heading',
        { opacity: 0, y: 25 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          ease: 'power3.out', 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 85%', 
            once: true 
          } 
        }
      );

      // Checkmarks stagger animation
      gsap.fromTo(
        '.exec-check',
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.06, 
          ease: 'power2.out', 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 80%', 
            once: true 
          } 
        }
      );

      // Button animation
      gsap.fromTo(
        '.exec-btn',
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5, 
          ease: 'power2.out', 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 85%', 
            once: true 
          } 
        }
      );

      // Right image container animation
      gsap.fromTo(
        '.exec-img-container',
        { opacity: 0, scale: 0.96 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: 'power3.out', 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 80%', 
            once: true 
          } 
        }
      );

      // Floating badge animation
      gsap.fromTo(
        '.exec-floating-badge',
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          delay: 0.3, 
          ease: 'power3.out', 
          scrollTrigger: { 
            trigger: sectionRef.current, 
            start: 'top 80%', 
            once: true 
          } 
        }
      );

      // Floating animation loop for the badge
      gsap.to('.exec-floating-badge', {
        y: -8,
        duration: 2.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        delay: 1.2
      });
      
    }, sectionRef);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, [activeSchool]);

  return (
    <section ref={sectionRef} className="py-24 px-4 sm:px-8 bg-white relative overflow-hidden border-t border-slate-100">
      
      {/* Decorative Background Elements */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3 transition-colors duration-700 ${
        isSecurity ? 'bg-sky-500/5' : 'bg-teal-500/5'
      }`} />
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3 transition-colors duration-700 ${
        isSecurity ? 'bg-blue-500/5' : 'bg-emerald-500/5'
      }`} />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* Left Column: Text & Checkmarks */}
        <div className="lg:col-span-7 space-y-9 text-left">
          
          <div className="exec-heading space-y-4">
            <div className={`inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border shadow-sm ${schoolContent.tagBadgeClass}`}>
              <TagIcon size={14} className="animate-pulse" />
              <span>{schoolContent.tag}</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-extrabold text-slate-900 leading-[1.15] tracking-tight">
              {schoolContent.titlePrefix} <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${schoolContent.titleGradient} relative`}>
                {schoolContent.titleHighlight}
                <svg className={`absolute -bottom-2 left-0 w-full h-3 ${schoolContent.waveColor} opacity-70`} viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7C49.5 2 103 -1.5 198 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl font-medium">
              {schoolContent.leadText}
            </p>
          </div>

          {/* Checkmarks List (Con Título y Descripción correlativa) */}
          <div className="exec-check-container grid grid-cols-1 gap-3.5">
            {schoolContent.checkmarks.map((item, index) => (
              <div 
                key={index}
                className={`exec-check flex items-start gap-4 group p-4 rounded-2xl bg-white border border-slate-200/80 ${schoolContent.cardBorderHover} shadow-sm hover:shadow-xl transition-all duration-300 cursor-default`}
              >
                <div className={`mt-0.5 flex-shrink-0 w-8 h-8 rounded-full ${schoolContent.checkIconBg} flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-sm`}>
                  <CheckCircle2 size={18} className={`${schoolContent.checkIconColor} group-hover:text-white transition-colors`} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-slate-900 text-sm sm:text-base font-bold leading-snug group-hover:text-slate-950 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <div className="exec-btn pt-2">
            <button
              onClick={onLearnMore}
              className={`group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r ${schoolContent.buttonGradient} rounded-2xl shadow-xl ${schoolContent.buttonShadow} hover:-translate-y-1 overflow-hidden cursor-pointer`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 text-xs sm:text-sm tracking-widest uppercase">{schoolContent.buttonText}</span>
              <ChevronRight size={18} className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>
        </div>

        {/* Right Column: Promotional Image with Glassmorphism */}
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="exec-img-container relative w-full max-w-lg aspect-[4/5] rounded-[2.5rem] p-3 bg-white/50 backdrop-blur-sm border border-white/20 shadow-2xl">
            
            {/* Ambient Glow Behind Image */}
            <div className={`absolute -inset-4 bg-gradient-to-tr ${schoolContent.glowGradient} rounded-[3rem] blur-3xl opacity-50 -z-10`} />
            
            {/* Image Wrapper */}
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden border border-slate-200/50 group">
              <img
                src={schoolContent.imgSrc}
                alt={schoolContent.imgAlt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            </div>

            {/* Floating Stat Badge */}
            <div className="exec-floating-badge absolute -bottom-8 -left-6 right-6 sm:right-auto sm:w-[330px] bg-white/95 backdrop-blur-2xl p-4 sm:p-5 rounded-3xl border-2 border-white shadow-[0_20px_50px_rgba(2,132,199,0.15)] flex items-center gap-4 z-20">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-sky-500/20 animate-ping rounded-xl" />
                <div className={`w-13 h-13 rounded-xl bg-gradient-to-br ${schoolContent.badgeGradient} flex items-center justify-center text-white relative z-10 shadow-lg`}>
                  <Award size={26} />
                </div>
              </div>
              <div className="flex-1">
                <div className="text-slate-900 font-black text-base sm:text-lg leading-tight">{schoolContent.statNumber}</div>
                <div className="text-slate-500 text-xs font-medium leading-tight mt-1">{schoolContent.statLabel}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ExecutionSection;
