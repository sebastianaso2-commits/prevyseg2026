import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const SenceTramosSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo('.sence-header',
        { opacity: 0, y: 20 },
        { 
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.sence-header', start: 'top 85%', once: true }
        }
      );

      // Cards stagger animation
      gsap.fromTo('.sence-card',
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.sence-cards-container', start: 'top 80%', once: true }
        }
      );

      // Footer note animation
      gsap.fromTo('.sence-footer',
        { opacity: 0, x: -20 },
        { 
          opacity: 1, x: 0, duration: 0.5, delay: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: '.sence-cards-container', start: 'top 80%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tramos = [
    {
      pct: '100% SENCE',
      utm: 'Hasta 25 UTM',
      desc: 'Financiamiento total sin costo para la empresa en remuneraciones hasta 25 UTM.',
      color: '#0A4DA2',
      lightBg: 'rgba(10,77,162,0.05)',
      isHighlighted: false,
    },
    {
      pct: '50% SENCE',
      utm: '25 a 50 UTM',
      desc: 'Cubre el 50% del valor hora SENCE para trabajadores en tramo medio.',
      color: '#00A896',
      lightBg: 'rgba(0,168,150,0.05)',
      isHighlighted: true,
    },
    {
      pct: '15% SENCE',
      utm: 'Sobre 50 UTM',
      desc: 'Aporte del 15% imputable al impuesto corporativo para rentas superiores.',
      color: '#0284c7',
      lightBg: 'rgba(2,132,199,0.05)',
      isHighlighted: false,
    },
    {
      pct: 'Pago Directo',
      utm: 'Desc. Volumen',
      desc: 'Convenios corporativos y aranceles preferenciales por cantidad de alumnos.',
      color: '#F2A900',
      lightBg: 'rgba(242,169,0,0.05)',
      isHighlighted: false,
    }
  ];

  return (
    <section 
      id="beneficios-sence"
      ref={sectionRef}
      className="py-20 px-4 sm:px-8 bg-gradient-to-b from-slate-100 via-sky-50/20 to-slate-100 relative border-t border-slate-200 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="relative bg-white border border-slate-200 rounded-[2rem] p-6 sm:p-10 shadow-xl shadow-slate-200/50 overflow-hidden">
          {/* Decorative background blur */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px] pointer-events-none translate-y-1/3 -translate-x-1/3" />
      
      {/* Section Subheader */}
      <div className="sence-header flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pb-8 relative z-10">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 text-[#0284c7] text-xs font-bold border border-sky-200 shadow-sm">
            <Award size={14} className="text-[#0284c7]" />
            <span>Afiliación y Registro OTEC SENCE #1238088725</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Tramos de Franquicia Tributaria SENCE
            <Sparkles size={20} className="text-amber-500 animate-pulse" />
          </h3>
          <p className="text-sm sm:text-base text-slate-500 max-w-3xl leading-relaxed">
            Beneficio tributario normado por la Ley N° 19.518 que permite a las empresas capacitar a sus guardias y personal de seguridad deduciendo los costos del impuesto a la renta.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-sky-200 text-xs text-slate-800 font-bold flex-shrink-0 shadow-lg shadow-sky-500/10">
          <ShieldCheck size={18} className="text-[#00c2b2]" />
          <span>NCh 2728 Certificada</span>
        </div>
      </div>

      {/* 4 Tramos Cards Grid with GSAP Animations */}
      <div className="sence-cards-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10 border-t border-slate-100 pt-8">
        {tramos.map((tramo, idx) => (
          <div
            key={idx}
            className={`sence-card group relative p-6 sm:p-8 rounded-3xl border-2 transition-all duration-500 flex flex-col justify-between bg-white overflow-hidden cursor-pointer ${
              tramo.isHighlighted 
                ? 'border-[#00c2b2] shadow-xl shadow-teal-500/20' 
                : 'border-slate-100 hover:border-slate-300 shadow-md hover:shadow-xl'
            }`}
          >
            {/* Hover Background Color Fill */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ backgroundColor: tramo.lightBg }}
            />

            {/* Top Highlight Line */}
            <div 
              className={`absolute top-0 left-0 right-0 h-1.5 transition-all duration-500 ${tramo.isHighlighted ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
              style={{ backgroundColor: tramo.color }}
            />

            <div className="space-y-2 relative z-10">
              <h4 
                className="text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-300"
                style={{ color: tramo.color }}
              >
                {tramo.pct}
              </h4>
              <div 
                className="inline-block px-3 py-1 rounded-md text-xs font-bold tracking-wider uppercase transition-colors duration-300"
                style={{ 
                  backgroundColor: tramo.isHighlighted ? tramo.color : `${tramo.color}15`,
                  color: tramo.isHighlighted ? 'white' : tramo.color 
                }}
              >
                {tramo.utm}
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed pt-5 mt-5 border-t border-slate-100 relative z-10 group-hover:text-slate-700 transition-colors">
              {tramo.desc}
            </p>

            {/* Animated Icon on Hover */}
            <div 
              className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
              style={{ color: tramo.color }}
            >
              <ArrowRight size={20} />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Note */}
      <div className="sence-footer flex items-center gap-2.5 text-xs sm:text-sm text-slate-500 font-medium pt-8 mt-4 relative z-10">
        <div className="p-1.5 rounded-full bg-emerald-100/50">
          <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
        </div>
        <span>Todos los cursos de <strong className="text-slate-900">PrevySeg</strong> cuentan con código SENCE activo y registro validado ante la Subsecretaría de Prevención del Delito (SPD).</span>
      </div>

        </div>
      </div>
    </section>
  );
};

export default SenceTramosSection;
