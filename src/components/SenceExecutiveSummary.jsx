import React from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Building2,
  FileText,
  Percent,
  MessageCircle
} from 'lucide-react';

const SenceExecutiveSummary = ({ onOpenContact }) => {
  const handleWhatsAppContact = () => {
    const text = encodeURIComponent('Hola OTEC PrevySeg, deseo consultar información sobre la franquicia tributaria SENCE y beneficios de capacitación para mi empresa.');
    window.open(`https://wa.me/56987654321?text=${text}`, '_blank');
  };

  return (
    <section className="relative z-20 py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto">

        {/* Banner Superior Compacto */}
        <div className="p-5 sm:p-6 rounded-3xl bg-white border border-[#1b3761]/20 shadow-xl shadow-slate-900/5 relative overflow-hidden">

          {/* Fondo sutil con acentos corporativos */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#0a969b]/10 via-[#1b3761]/5 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">

            {/* Columna Izquierda: Acreditación y Descripción Ejecutiva */}
            <div className="max-w-3xl space-y-2.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#0a969b]/15 text-[#0a969b] border border-[#0a969b]/30">
                  <ShieldCheck size={12} className="text-[#0a969b]" />
                  <span>REGISTRO OFICIAL SENCE #1238088725</span>
                </span>

                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-[#1b3761] border border-slate-200">
                  <Award size={12} className="text-[#1b3761]" />
                  <span>Certificación NCh 2728:2015 SGS Chile</span>
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-black text-[#161630] tracking-tight leading-tight">
                Capacitación con <span className="text-[#0a969b]">Franquicia Tributaria SENCE</span> para Empresas
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong>OTEC PrevySeg SpA</strong> es un Organismo Técnico de Capacitación formalmente acreditado. Todas las empresas en Chile pueden capacitar a sus trabajadores descontando hasta el <strong className="text-[#161630]">100% del arancel</strong> directamente del Impuesto a la Renta de Primera Categoría (Ley N° 19.518), sin costo directo neto.
              </p>
            </div>

            {/* Columna Derecha: Botón de Asesoría Directa */}
            <div className="flex-shrink-0 flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
              <button
                type="button"
                onClick={handleWhatsAppContact}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#0a969b] hover:bg-[#077478] text-white text-xs sm:text-sm font-extrabold shadow-md hover:shadow-lg transition-all cursor-pointer transform active:scale-98"
              >
                <MessageCircle size={16} />
                <span>Asesoría SENCE a Empresas</span>
              </button>
              <span className="text-[11px] text-slate-500 font-medium">
                Tramitación 100% guiada sin costo
              </span>
            </div>

          </div>

          {/* Tramos SENCE en Píldoras Ejecutivas Compactas */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-xs">

            {/* Tramo 1 */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:bg-slate-100/80 transition-colors">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#1b3761] block mb-0.5">
                  Hasta 25 UTM
                </span>
                <span className="text-base sm:text-lg font-black text-[#0a969b]">
                  100% SENCE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Financiamiento íntegro sin desembolso neto para la empresa.
              </p>
            </div>

            {/* Tramo 2 */}
            <div className="p-3 rounded-2xl bg-[#0a969b]/5 border border-[#0a969b]/25 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-[#0a969b] block mb-0.5">
                  25 a 50 UTM
                </span>
                <span className="text-base sm:text-lg font-black text-[#1b3761]">
                  50% SENCE
                </span>
              </div>
              <p className="text-[10px] text-slate-600 mt-1 leading-snug">
                Cubre el 50% del valor hora SENCE para remuneraciones medias.
              </p>
            </div>

            {/* Tramo 3 */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:bg-slate-100/80 transition-colors">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-600 block mb-0.5">
                  Sobre 50 UTM
                </span>
                <span className="text-base sm:text-lg font-black text-[#161630]">
                  15% SENCE
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Aporte imputable de 15% para rentas ejecutivas superiores.
              </p>
            </div>

            {/* Tramo 4 */}
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between hover:bg-slate-100/80 transition-colors">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 block mb-0.5">
                  Convenios
                </span>
                <span className="text-base sm:text-lg font-black text-amber-600">
                  Descuento Volumen
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                Aranceles preferenciales para cuadrillas y grupos de alumnos.
              </p>
            </div>

          </div>

          {/* Nota al pie */}
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#0a969b]" />
              <span>Programas validados ante la Subsecretaría de Prevención del Delito (SPD) y SENCE.</span>
            </span>
            <span className="hidden sm:inline font-semibold text-[#1b3761]">
              Sede Arica: Blanco Encalada #666
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SenceExecutiveSummary;
