import React from 'react';
import { Award, Users, ShieldCheck, Building2 } from 'lucide-react';

const StatsSection = () => {
  const stats = [
    {
      number: '+15',
      label: 'Años de Experiencia',
      detail: 'Liderando en la ciudad de Arica',
      icon: Award,
      color: '#0A4DA2', // brand blue
      bg: 'rgba(10, 77, 162, 0.1)',
      border: 'rgba(10, 77, 162, 0.2)'
    },
    {
      number: '+5.000',
      label: 'Alumnos Egresados',
      detail: 'Certificados y en funciones activas',
      icon: Users,
      color: '#00A896', // teal vibrant
      bg: 'rgba(0, 168, 150, 0.1)',
      border: 'rgba(0, 168, 150, 0.2)'
    },
    {
      number: '100%',
      label: 'Acreditación Oficial',
      detail: 'Cursos aprobados por SENCE y SPD (Subsecretaría de Prevención del Delito)',
      icon: ShieldCheck,
      color: '#0284c7', // light blue
      bg: 'rgba(2, 132, 199, 0.1)',
      border: 'rgba(2, 132, 199, 0.2)'
    },
    {
      number: '+50',
      label: 'Empresas Aliadas',
      detail: 'Convenios laborales en la región',
      icon: Building2,
      color: '#F2A900', // amber
      bg: 'rgba(242, 169, 0, 0.1)',
      border: 'rgba(242, 169, 0, 0.2)'
    },
  ];

  // Triplicar los elementos para crear la ilusión de scroll infinito continuo
  const infiniteStats = [...stats, ...stats, ...stats];

  return (
    <section className="py-12 bg-white border-y border-slate-100 shadow-sm relative z-10 overflow-hidden">

      {/* Decorative Blur Backgrounds */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-sky-500/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-[100vw] overflow-hidden">

        {/* Gradient fades on the edges for seamless carousel look */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee py-4 hover:[animation-play-state:paused]">
          {infiniteStats.map((stat, idx) => {
            const IconComp = stat.icon;
            return (
              <div
                key={idx}
                className="group flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 mx-3 w-[300px] sm:w-[420px] rounded-3xl bg-white border border-slate-100 shadow-lg shadow-slate-200/40 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden"
              >
                {/* Active Highlight Line */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ backgroundColor: stat.color }}
                />

                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm border"
                  style={{ backgroundColor: stat.bg, color: stat.color, borderColor: stat.border }}
                >
                  <IconComp size={32} strokeWidth={2.5} />
                </div>

                <div className="flex-1 min-w-0">
                  <div
                    className="text-4xl sm:text-[2.5rem] font-black tracking-tight leading-none mb-1 transition-colors duration-300"
                    style={{ color: '#0f172a' }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-sm font-extrabold uppercase tracking-wide leading-tight mb-1" style={{ color: stat.color }}>
                    {stat.label}
                  </div>
                  <div className="text-xs text-slate-500 font-medium leading-snug line-clamp-2 group-hover:text-slate-700 transition-colors">
                    {stat.detail}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Inline Styles for Marquee Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-33.3333%)); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}} />
    </section>
  );
};

export default StatsSection;
