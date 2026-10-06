import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Briefcase, CheckCircle2, Copy, Check, FileText, Send, Building2, ShieldCheck, DollarSign } from 'lucide-react';

const ConvinceBossModal = ({ isOpen, onClose, course, syllabus }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !course) return null;

  const courseTitle = syllabus?.subtitle || course.title;
  const courseHours = syllabus?.totalHours || course.duration;
  const coursePrice = syllabus?.price || course.price;

  const letterText = `ESTIMADA GERENCIA / JEFATURA DE PERSONAS Y RRHH:

Por medio de la presente, solicito formalmente la evaluación para cursar la capacitación "${courseTitle}", impartida por el Organismo Técnico de Capacitación OTEC PrevySeg SpA en Arica.

MOTIVACIÓN Y BENEFICIOS PARA LA EMPRESA:
1. Impacto Operativo Directo: Esta capacitación de ${courseHours} permitirá incorporar mejores prácticas, reducir riesgos operativos y aumentar la productividad en las tareas diarias de nuestro equipo.
2. Cumplimiento Normativo Vigente: El programa cumple con los estándares exigidos por la legislación chilena (Ley N° 21.659 de Seguridad Privada y Norma NCh 2728:2015 de Calidad OTEC).
3. Financiamiento con Franquicia Tributaria SENCE: Este curso es 100% imputable al Fondo de Capacitación de la empresa bajo la Ley N° 19.518, permitiendo deducir hasta el 100% del arancel (${coursePrice}) del Impuesto de Primera Categoría sin costo directo neto para la organización.
4. Flexibilidad y Certificación Oficial: El programa cuenta con horarios compatibles con la jornada laboral y entrega diplomas oficiales verificables para auditorías.

Agradezco de antemano su recepción y quedo a disposición para coordinar los datos de inscripción con el área de capacitación de OTEC PrevySeg (contacto@prevyseg.cl / Fono: +56 9 8765 4321).

Atentamente,
Colaborador / Postulante`;

  const handleCopy = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-200"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#161630] via-[#1b3761] to-[#0a969b] text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all cursor-pointer"
            >
              <X size={18} />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#0a969b]/25 text-[#00FFE0] border border-[#0a969b]/40 flex items-center gap-1">
                <Briefcase size={12} />
                <span>PROPUESTA PARA EMPRESAS</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                Franquicia Tributaria SENCE
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              ¡Convence a tu Jefe o Empresa!
            </h3>
            <p className="text-xs text-sky-100 mt-1">
              Preparamos esta propuesta formal para que tu empleador financie tu curso al 100% mediante franquicia SENCE.
            </p>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-slate-700">
            {/* Beneficios clave para la empresa */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#0a969b]/10 border border-[#0a969b]/30">
                <ShieldCheck size={18} className="text-[#0a969b] mb-1" />
                <span className="font-bold text-[#161630] block text-[11px]">100% Franquiciable</span>
                <span className="text-[10px] text-slate-600">Deducible del impuesto a la renta (Ley 19.518).</span>
              </div>
              <div className="p-3 rounded-xl bg-[#1b3761]/10 border border-[#1b3761]/25">
                <Building2 size={18} className="text-[#1b3761] mb-1" />
                <span className="font-bold text-[#161630] block text-[11px]">OTEC Acreditado</span>
                <span className="text-[10px] text-slate-600">Certificación NCh 2728:2015 por SGS Chile.</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200">
                <DollarSign size={18} className="text-amber-600 mb-1" />
                <span className="font-bold text-slate-900 block text-[11px]">Cero Gasto Neto</span>
                <span className="text-[10px] text-slate-600">La empresa recupera el valor de la capacitación.</span>
              </div>
            </div>

            {/* Carta modelo lista para copiar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider text-[#161630] flex items-center gap-1.5">
                  <FileText size={14} className="text-[#0a969b]" />
                  <span>Carta de Justificación Laboral para Enviar a tu Empresa:</span>
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold transition-all bg-[#0a969b] hover:bg-[#077478] text-white cursor-pointer shadow-xs"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
                </button>
              </div>

              <textarea
                readOnly
                value={letterText}
                rows={11}
                className="w-full p-3.5 rounded-xl bg-slate-50 border border-slate-300 font-mono text-[11px] text-slate-800 leading-relaxed focus:outline-none select-all"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] text-slate-500">
              ¿Dudas sobre cómo tramitar la franquicia SENCE? Nuestro equipo asesora directamente a tu empresa.
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-all cursor-pointer"
              >
                Cerrar
              </button>
              <a
                href={`https://wa.me/56987654321?text=${encodeURIComponent(`Hola OTEC PrevySeg, mi empresa desea postularme al curso "${courseTitle}" con Franquicia Tributaria SENCE. ¿Me podrían asesorar con los códigos y la inscripción?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0a969b] hover:bg-[#077478] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Send size={13} />
                <span>Asesoría SENCE WhatsApp</span>
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ConvinceBossModal;
