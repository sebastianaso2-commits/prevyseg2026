import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Wrench,
  ArrowRight,
  CheckCircle2,
  Building2,
  Laptop,
  Sparkles,
  Award,
  Users
} from 'lucide-react';
import securityGuards from '../assets/images/security_guards.jpg';
import foodImg from '../assets/images/course_gastronomy.jpg';

const SchoolsPreviewSection = ({ onNavigateSchool }) => {
  return (
    <section id="escuelas" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">

      {/* Elementos de fondo */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-[#0a969b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#1b3761]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">

        {/* Cabecera de la Sección */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#0a969b]/15 text-[#0a969b] border border-[#0a969b]/30">
            <Sparkles size={12} />
            <span>OFERTA ACADÉMICA ESPECIALIZADA</span>
          </span>

          <h2 className="text-2xl sm:text-4xl font-black text-[#161630] tracking-tight">
            Nuestras Dos <span className="text-[#0a969b]">Escuelas Formativas</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            En <strong>OTEC PrevySeg</strong> estructuramos nuestras capacitaciones en dos áreas técnicas de alto impacto para la empleabilidad en Arica y el país, disponibles en modalidades <strong>Presencial</strong> y <strong>Online</strong>.
          </p>
        </div>

        {/* Las 2 Grandes Tarjetas de Escuelas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* TARJETA 1: ESCUELA DE SEGURIDAD PRIVADA */}
          <div className="group rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              {/* Imagen con Badges */}
              <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-900">
                <img
                  src={securityGuards}
                  alt="Escuela de Seguridad Privada"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161630] via-[#161630]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0a969b] text-white shadow-md flex items-center gap-1.5">
                    <Shield size={12} />
                    <span>Acreditación OS-10 & SPD</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                    Ley N° 21.659
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-teal-300 text-xs font-bold mb-1">
                    <Building2 size={13} />
                    <span>Presencial Sede Arica • Online E-learning</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    Escuela de Seguridad Privada
                  </h3>
                </div>
              </div>

              {/* Contenido Descriptivo */}
              <div className="p-6 sm:p-7 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Formación legal y táctica conforme al nuevo marco de la <strong>Ley N° 21.659</strong>. Cursos de Guardias de Seguridad (90 hrs), Reentrenamiento (36 hrs), Vigilantes Privados, Seguridad Marítimo Portuaria (Directemar/PBIP), CCTV y Supervisores.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0" />
                    <span>100% de cumplimiento con directivas de Carabineros OS-10</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0" />
                    <span>Polígono de tiro acreditado y docentes instructores oficiales</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0" />
                    <span>Imputable a Franquicia Tributaria SENCE (+100% deducción)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Entrada a la Escuela */}
            <div className="p-6 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => onNavigateSchool('seguridad')}
                className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-black text-white bg-[#1b3761] hover:bg-[#0a969b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transform active:scale-98"
              >
                <span>Explorar Escuela de Seguridad (Presencial / Online)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* TARJETA 2: ESCUELA DE OFICIOS */}
          <div className="group rounded-3xl bg-white border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <div>
              {/* Imagen con Badges */}
              <div className="relative h-60 sm:h-72 overflow-hidden bg-slate-900">
                <img
                  src={foodImg}
                  alt="Escuela de Oficios y Desarrollo Laboral"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161630] via-[#161630]/40 to-transparent" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0a969b] text-white shadow-md flex items-center gap-1.5">
                    <Wrench size={12} />
                    <span>Acreditación SENCE</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/20 text-white backdrop-blur-xs">
                    Certificación NCh 2728
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="flex items-center gap-2 text-teal-300 text-xs font-bold mb-1">
                    <Laptop size={13} />
                    <span>Presencial Sede Arica • Online Asíncrono 24/7</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                    Escuela de Oficios y Servicios
                  </h3>
                </div>
              </div>

              {/* Contenido Descriptivo */}
              <div className="p-6 sm:p-7 space-y-4">
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Capacitación técnica en oficios de alta inserción laboral inmediata. Programas en Higiene y Manipulación de Alimentos, Asistente Administrativo, Cajero Bancario, Maquillaje y Estética, Cuidado del Adulto Mayor y Operaciones Logísticas.
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0" />
                    <span>Talleres prácticos e insumos de primer nivel en sede Arica</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0" />
                    <span>Diplomas oficiales certificados para currículum laboral</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0" />
                    <span>Plataforma virtual moderna y amigable para cursos online</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón de Entrada a la Escuela */}
            <div className="p-6 sm:p-7 pt-0">
              <button
                type="button"
                onClick={() => onNavigateSchool('oficios')}
                className="w-full py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-black text-white bg-[#1b3761] hover:bg-[#0a969b] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md hover:shadow-lg transform active:scale-98"
              >
                <span>Explorar Escuela de Oficios (Presencial / Online)</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SchoolsPreviewSection;
