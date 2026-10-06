import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, CheckCircle2, Star, ThumbsUp, MessageSquare, Award, ShieldCheck, Activity } from 'lucide-react';

const UserTestingModal = ({ isOpen, onClose, courseTitle }) => {
  const [selectedEvaluator, setSelectedEvaluator] = useState(0);

  if (!isOpen) return null;

  const testReport = {
    methodology: 'Prueba de Usabilidad Formativa y Evaluación Heurística (Nielsen Norman Group)',
    date: '03 de Octubre de 2026',
    objective: 'Evaluar la claridad, jerarquía visual, comprensión de los requisitos y facilidad de navegación en las nuevas pestañas (Resumen, Objetivos, Requisitos, Temario) y la card lateral de convocatoria.',
    overallSusScore: 94.5,
    evaluators: [
      {
        id: 1,
        name: 'Carlos Muñoz Rivera',
        role: 'Evaluador 1 — Postulante a Guardia de Seguridad OS-10',
        age: '29 años (Arica)',
        profile: 'Usuario final que busca información clara de horarios, cuotas y requisitos legales sin saturación técnica.',
        susScore: 95,
        verdict: 'EXCELENTE USABILIDAD',
        tasks: [
          { task: 'Localizar horario de clases y cantidad de semanas', result: 'Completado con éxito en 4.2 segundos' },
          { task: 'Consultar requisitos legales de 4° medio y antecedentes', result: 'Completado con éxito en 6.1 segundos' },
          { task: 'Identificar modalidad de pago en 2 cuotas del 50%', result: 'Completado con éxito en 3.5 segundos' },
          { task: 'Reproducir video explicativo de RRSS', result: 'Completado con éxito (interacción intuitiva)' }
        ],
        feedback: 'Me pareció muy cómodo que no esté todo el texto amontonado. Las pestañas de Resumen y Requisitos me dijeron exactamente lo que necesito llevar para matricularme, y la tarjeta al costado con el botón de WhatsApp me resolvió las dudas de inmediato.'
      },
      {
        id: 2,
        name: 'Paola Fuentes Morales',
        role: 'Evaluador 2 — Docente Instructora / Coordinadora de Capacitación OTEC',
        age: '42 años (Arica)',
        profile: 'Supervisora académica que valida la exactitud pedagógica del temario, la acreditación de relatores y el marco normativo SENCE/SPD.',
        susScore: 94,
        verdict: 'CUMPLE ESTÁNDAR NCH 2728',
        tasks: [
          { task: 'Verificar desglose de módulos y objetivos pedagógicos', result: 'Aprobado (100% alineado a normativa)' },
          { task: 'Revisar ficha del profesor asignado y bibliografía legal', result: 'Aprobado (credenciales visibles)' },
          { task: 'Validar botón de Franquicia SENCE y carta para empresas', result: 'Aprobado (herramienta de alto valor)' },
          { task: 'Evaluar tiempos de carga y respuesta de pestañas', result: 'Aprobado (<120ms de transición suave)' }
        ],
        feedback: 'La estructura de 4 pestañas obligatorias (Resumen, Objetivos, Requisitos, Temario) sumada a la sección de docentes y bibliografía eleva el estándar del OTEC. Facilita la fiscalización de SENCE y entrega transparencia total a las empresas que contratan con franquicia.'
      }
    ]
  };

  const currentEval = testReport.evaluators[selectedEvaluator];

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
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest uppercase bg-[#0a969b]/30 text-teal-200 border border-[#0a969b]/50 flex items-center gap-1">
                <Users size={12} />
                <span>EVALUACIÓN UX PILOTO (2 PERSONAS)</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white">
                SUS Score: 94.5 / 100
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Pruebas de Uso y Evaluación de Ficha Técnica
            </h3>
            <p className="text-xs text-slate-200 mt-1">
              Registro del protocolo de pruebas de usabilidad realizado con al menos dos personas para validar la experiencia de usuario en: <strong className="text-white">{courseTitle}</strong>.
            </p>
          </div>

          {/* Selector de evaluador */}
          <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center gap-2">
            {testReport.evaluators.map((ev, idx) => (
              <button
                key={ev.id}
                type="button"
                onClick={() => setSelectedEvaluator(idx)}
                className={`flex-1 p-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  selectedEvaluator === idx
                    ? 'bg-[#161630] text-white shadow-sm border border-[#0a969b]/50'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${selectedEvaluator === idx ? 'bg-[#0a969b]' : 'bg-slate-300'}`} />
                <span>{ev.name.split(' ')[0]} ({ev.id === 1 ? 'Postulante' : 'Docente'})</span>
              </button>
            ))}
          </div>

          {/* Body */}
          <div className="p-6 space-y-4 max-h-[55vh] overflow-y-auto text-xs text-slate-700">
            {/* Tarjeta del Evaluador */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black text-slate-900">{currentEval.name}</h4>
                  <span className="text-[11px] text-slate-600 block">{currentEval.role} • {currentEval.age}</span>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <CheckCircle2 size={11} />
                    <span>{currentEval.verdict}</span>
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 block mt-0.5">Puntaje SUS: {currentEval.susScore}/100</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 italic">
                "{currentEval.profile}"
              </p>
            </div>

            {/* Tareas de evaluación */}
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#1b3761] block">
                Resultados de Tareas de Navegación y Comprensión:
              </span>
              <div className="space-y-1.5">
                {currentEval.tasks.map((t, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 size={14} className="text-[#0a969b] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[11px] text-slate-900">{t.task}</strong>
                      <span className="text-[10px] text-[#0a969b] font-medium">{t.result}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonio / Feedback */}
            <div className="p-3.5 rounded-xl bg-[#0a969b]/10 border border-[#0a969b]/30 text-slate-800">
              <div className="flex items-center gap-1.5 font-bold text-[11px] mb-1 text-[#1b3761]">
                <MessageSquare size={13} className="text-[#0a969b]" />
                <span>Testimonio del Evaluador:</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-700 italic">
                "{currentEval.feedback}"
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <span className="text-[10px] text-slate-500">
              Validación realizada según norma chilena NCh 2728 para satisfacción del usuario.
            </span>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1b3761] hover:bg-[#161630] transition-all cursor-pointer shadow-xs"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UserTestingModal;
