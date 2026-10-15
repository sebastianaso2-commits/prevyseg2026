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

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-100 text-[11px] text-slate-700">
                <Sparkles size={13} className="text-[#0a969b] flex-shrink-0" />
                <span><strong>¿Cómo funciona?</strong> El porcentaje que financia SENCE se define según el <strong>sueldo bruto mensual del trabajador</strong> que realiza el curso:</span>
              </div>
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

          {/* Tramos SENCE en Píldoras Ejecutivas con Dinero Real y Explicación */}
          <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">

            {/* Tramo 1 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/90 hover:border-emerald-300 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100/70 border border-emerald-200 px-2 py-0.5 rounded-md">
                    Hasta $1.660.000 / mes
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">Hasta 25 UTM</span>
                </div>
                <span className="text-base sm:text-lg font-black text-[#0a969b] block">
                  100% SENCE (Costo $0)
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                <strong>Financiamiento íntegro gratuito:</strong> Para la mayoría de guardias, conserjes y operarios. La empresa descuenta el 100% del arancel en sus impuestos.
              </p>
            </div>

            {/* Tramo 2 */}
            <div className="p-3.5 rounded-2xl bg-[#0a969b]/5 border border-[#0a969b]/30 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#0a969b] bg-white border border-[#0a969b]/25 px-2 py-0.5 rounded-md">
                    $1.660.000 a $3.330.000
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">25 a 50 UTM</span>
                </div>
                <span className="text-base sm:text-lg font-black text-[#1b3761] block">
                  50% SENCE
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                <strong>Cobertura de la mitad:</strong> Para supervisores y mandos medios. SENCE financia el 50% del valor hora oficial y la empresa copaga el otro 50%.
              </p>
            </div>

            {/* Tramo 3 */}
            <div className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-slate-700 bg-slate-200/60 px-2 py-0.5 rounded-md">
                    Sobre $3.330.000 / mes
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono">+50 UTM</span>
                </div>
                <span className="text-base sm:text-lg font-black text-[#161630] block">
                  15% SENCE
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                <strong>Tramo ejecutivo:</strong> Para gerencias y cargos de alta renta. Permite deducir un 15% del arancel como crédito tributario en la renta anual.
              </p>
            </div>

            {/* Tramo 4 */}
            <div className="p-3.5 rounded-2xl bg-amber-50/40 hover:bg-amber-50/80 border border-amber-200/70 flex flex-col justify-between transition-all">
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                    Cuadrillas y Grupos
                  </span>
                  <span className="text-[9px] text-amber-700/70 font-semibold">Convenios</span>
                </div>
                <span className="text-base sm:text-lg font-black text-amber-600 block">
                  Descuento por Volumen
                </span>
              </div>
              <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                <strong>Aranceles corporativos rebajados:</strong> Para empresas que capacitan cuadrillas completas (5, 10 o más trabajadores) o pagan arancel directo.
              </p>
            </div>

          </div>

          {/* Nota al pie explicativa */}
          <div className="mt-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-500 pt-2.5 border-t border-slate-100">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-[#0a969b] flex-shrink-0" />
              <span>Valores calculados en base a 1 UTM ≈ $66.500 CLP. La cobertura aplica directamente sobre el arancel del curso.</span>
            </span>
            <span className="font-semibold text-[#1b3761] whitespace-nowrap">
              Sede Arica: Blanco Encalada #666
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SenceExecutiveSummary;
