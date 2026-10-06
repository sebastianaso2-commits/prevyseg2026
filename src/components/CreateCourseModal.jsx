import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  PlusCircle, 
  Laptop, 
  Building2, 
  Layers, 
  Shield, 
  Wrench, 
  Sparkles, 
  Calendar, 
  Users, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { addNewCourse } from '../data/coursesData';

const CreateCourseModal = ({ isOpen, onClose, initialSchool = 'seguridad', onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    school: initialSchool,
    category: 'Formación Inicial',
    modalityChoice: 'online', // 'online' | 'presencial' | 'ambas'
    duration: '40 Horas',
    price: '$120.000 CLP',
    depositPrice: '$60.000 CLP (50%)',
    cupos: 20,
    fecha_inicio: '15 de Noviembre, 2026',
    fecha_termino: '15 de Diciembre, 2026',
    horario: 'Lunes a Viernes 09:00 a 13:00 hrs',
    description: '',
    requisitos: 'Cédula de Identidad chilena vigente.\nMayor de 18 años.\nCertificado de antecedentes para fines especiales.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSchoolChange = (newSchool) => {
    setFormData(prev => ({
      ...prev,
      school: newSchool,
      category: newSchool === 'seguridad' ? 'Formación Inicial' : 'Área Alimentación'
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Por favor ingresa el título del curso');
      return;
    }

    setIsSubmitting(true);

    const permiteVirtual = formData.modalityChoice === 'online' || formData.modalityChoice === 'ambas';
    const permitePresencial = formData.modalityChoice === 'presencial' || formData.modalityChoice === 'ambas';

    const modalityText = formData.modalityChoice === 'online' 
      ? '100% Online E-Learning' 
      : formData.modalityChoice === 'presencial' 
      ? 'Presencial en Sede' 
      : 'Semipresencial (Online + Presencial)';

    const badgeText = formData.modalityChoice === 'online' 
      ? '100% Online' 
      : formData.modalityChoice === 'presencial' 
      ? 'Presencial Sede Arica' 
      : 'Modalidad Dual (Online / Presencial)';

    const requisitosArray = formData.requisitos
      .split('\n')
      .map(r => r.trim())
      .filter(Boolean);

    const newCourseObj = {
      title: formData.title.trim(),
      titulo: formData.title.trim(),
      school: formData.school,
      category: formData.category,
      duration: formData.duration.trim() || '40 Horas',
      modality: modalityText,
      permitePresencial,
      permiteVirtual,
      price: formData.price.trim() || '$120.000 CLP',
      depositPrice: formData.depositPrice.trim() || '$60.000 CLP (50%)',
      cupos: Number(formData.cupos) || 20,
      fecha_inicio: formData.fecha_inicio.trim() || '15 de Noviembre, 2026',
      fecha_termino: formData.fecha_termino.trim() || '15 de Diciembre, 2026',
      horario: formData.horario.trim(),
      badgeText,
      description: formData.description.trim() || 'Curso oficial impartido por OTEC PrevySeg con certificación reconocida.',
      requisitos: requisitosArray.length > 0 ? requisitosArray : ['Cédula de Identidad chilena vigente.', 'Mayor de 18 años.'],
      disponible: true,
      proximamente: false,
      activo: true
    };

    addNewCourse(newCourseObj);
    setIsSubmitting(false);
    setSuccessMsg('¡Curso creado exitosamente! Se reflejará automáticamente en la vista correspondiente.');

    setTimeout(() => {
      setSuccessMsg('');
      if (onSuccess) onSuccess(newCourseObj);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 relative flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#071626] via-[#0B2032] to-[#0A4DA2] text-white p-6 sm:p-7 relative flex-shrink-0">
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all cursor-pointer"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 shadow-inner">
              <PlusCircle size={24} />
            </div>
            <div>
              <span className="text-[11px] font-black uppercase tracking-wider text-cyan-300">
                Panel de Administración OTEC PrevySeg
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                Crear Nuevo Curso
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Elige la modalidad para que el curso aparezca en la vista <strong className="text-cyan-300">Online</strong>, <strong className="text-emerald-300">Presencial</strong> o en ambas, mostrándose siempre en la <strong className="text-white">Pestaña Principal</strong>.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 overflow-y-auto space-y-5 flex-grow">
          {successMsg && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 flex items-center gap-3 text-sm font-bold shadow-xs"
            >
              <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Selector de Escuela */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">
              1. Escuela Responsable
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSchoolChange('seguridad')}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                  formData.school === 'seguridad'
                    ? 'border-[#00FFE0] bg-[#071626] text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className={`p-2 rounded-xl ${formData.school === 'seguridad' ? 'bg-cyan-500/20 text-[#00FFE0]' : 'bg-slate-200 text-slate-600'}`}>
                  <Shield size={18} />
                </div>
                <div>
                  <div className="text-xs font-black">Escuela de Seguridad</div>
                  <div className={`text-[10px] ${formData.school === 'seguridad' ? 'text-cyan-200' : 'text-slate-500'}`}>Normativa SPD / OS-10</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleSchoolChange('oficios')}
                className={`p-3.5 rounded-2xl border-2 text-left flex items-center gap-3 transition-all cursor-pointer ${
                  formData.school === 'oficios'
                    ? 'border-emerald-400 bg-emerald-950 text-white shadow-md'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className={`p-2 rounded-xl ${formData.school === 'oficios' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-200 text-slate-600'}`}>
                  <Wrench size={18} />
                </div>
                <div>
                  <div className="text-xs font-black">Escuela de Oficios</div>
                  <div className={`text-[10px] ${formData.school === 'oficios' ? 'text-emerald-200' : 'text-slate-500'}`}>Norma NCh 2728 / SENCE</div>
                </div>
              </button>
            </div>
          </div>

          {/* SELECCIÓN CRÍTICA DE MODALIDAD (ONLINE VS PRESENCIAL VS AMBAS) */}
          <div className="bg-gradient-to-br from-slate-50 to-sky-50/50 p-4 rounded-2xl border border-sky-200">
            <label className="block text-xs font-black text-slate-900 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>2. Modalidad de Impartición (Controla en qué vista aparecerá)</span>
              <span className="text-[10px] text-sky-700 font-bold bg-sky-100 px-2 py-0.5 rounded-md">Regla de Filtrado</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Opción 1: Solo Online */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, modalityChoice: 'online' }))}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  formData.modalityChoice === 'online'
                    ? 'border-sky-500 bg-sky-500/10 text-sky-950 shadow-sm ring-2 ring-sky-400/30'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Laptop size={20} className={formData.modalityChoice === 'online' ? 'text-sky-600' : 'text-slate-400'} />
                <span className="text-xs font-black">Solo Online</span>
                <span className="text-[10px] text-slate-500">Aparece en vista Online</span>
              </button>

              {/* Opción 2: Solo Presencial */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, modalityChoice: 'presencial' }))}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  formData.modalityChoice === 'presencial'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-950 shadow-sm ring-2 ring-emerald-400/30'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Building2 size={20} className={formData.modalityChoice === 'presencial' ? 'text-emerald-600' : 'text-slate-400'} />
                <span className="text-xs font-black">Solo Presencial</span>
                <span className="text-[10px] text-slate-500">Aparece en vista Presencial</span>
              </button>

              {/* Opción 3: Ambas */}
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, modalityChoice: 'ambas' }))}
                className={`p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                  formData.modalityChoice === 'ambas'
                    ? 'border-indigo-500 bg-indigo-500/10 text-indigo-950 shadow-sm ring-2 ring-indigo-400/30'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                <Layers size={20} className={formData.modalityChoice === 'ambas' ? 'text-indigo-600' : 'text-slate-400'} />
                <span className="text-xs font-black">Ambas (Híbrido)</span>
                <span className="text-[10px] text-slate-500">Aparece en ambas vistas</span>
              </button>
            </div>

            {/* Banner explicativo del destino de visualización */}
            <div className="mt-3 p-2.5 rounded-xl bg-white border border-sky-100 flex items-center gap-2 text-xs">
              <CheckCircle2 size={16} className="text-sky-600 flex-shrink-0" />
              <div className="text-slate-700">
                {formData.modalityChoice === 'online' && (
                  <span>Se listará exclusivamente en <strong className="text-sky-700">Cursos Online</strong> y en la <strong className="text-slate-900">Página Principal</strong> (NO en Presenciales).</span>
                )}
                {formData.modalityChoice === 'presencial' && (
                  <span>Se listará exclusivamente en <strong className="text-emerald-700">Cursos Presenciales</strong> y en la <strong className="text-slate-900">Página Principal</strong> (NO en Online).</span>
                )}
                {formData.modalityChoice === 'ambas' && (
                  <span>Se listará en <strong className="text-sky-700">Cursos Online</strong>, en <strong className="text-emerald-700">Cursos Presenciales</strong> y en la <strong className="text-slate-900">Página Principal</strong>.</span>
                )}
              </div>
            </div>
          </div>

          {/* Título del Curso */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
              3. Nombre Oficial del Curso *
            </label>
            <input
              type="text"
              required
              placeholder="Ej: Curso Formación Guardia de Seguridad Privada"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-sm font-semibold text-slate-900 outline-none transition-all"
            />
          </div>

          {/* Categoría y Duración */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Categoría / Área
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                placeholder="Ej: Formación Inicial o Área Alimentación"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Duración
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="Ej: 90 Horas Cronológicas"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-medium outline-none"
              />
            </div>
          </div>

          {/* Precio y Cupos */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Precio Total
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="$120.000 CLP"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-semibold outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Abono Reserva (50%)
              </label>
              <input
                type="text"
                value={formData.depositPrice}
                onChange={(e) => setFormData(prev => ({ ...prev, depositPrice: e.target.value }))}
                placeholder="$60.000 CLP"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Cupos Disponibles
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={formData.cupos}
                onChange={(e) => setFormData(prev => ({ ...prev, cupos: e.target.value }))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-semibold outline-none"
              />
            </div>
          </div>

          {/* Fechas y Horario */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Fecha de Inicio
              </label>
              <input
                type="text"
                value={formData.fecha_inicio}
                onChange={(e) => setFormData(prev => ({ ...prev, fecha_inicio: e.target.value }))}
                placeholder="15 de Noviembre, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Fecha de Término
              </label>
              <input
                type="text"
                value={formData.fecha_termino}
                onChange={(e) => setFormData(prev => ({ ...prev, fecha_termino: e.target.value }))}
                placeholder="15 de Diciembre, 2026"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-medium outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
                Horario / Jornada
              </label>
              <input
                type="text"
                value={formData.horario}
                onChange={(e) => setFormData(prev => ({ ...prev, horario: e.target.value }))}
                placeholder="09:00 a 13:00 hrs"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-medium outline-none"
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
              Descripción del Programa
            </label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Escribe el objetivo general, competencias a desarrollar y beneficios del curso..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-normal outline-none"
            />
          </div>

          {/* Requisitos (un requisito por línea) */}
          <div>
            <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-1">
              Requisitos de Admisión (Uno por línea)
            </label>
            <textarea
              rows="3"
              value={formData.requisitos}
              onChange={(e) => setFormData(prev => ({ ...prev, requisitos: e.target.value }))}
              placeholder="Cédula de Identidad chilena vigente.&#10;Mayor de 18 años."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-cyan-500 text-sm font-mono outline-none"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl text-xs font-black text-white bg-gradient-to-r from-[#071626] to-[#0A4DA2] hover:from-[#0B2032] hover:to-[#00FFE0] hover:text-slate-900 shadow-md transition-all cursor-pointer flex items-center gap-2"
            >
              <PlusCircle size={16} />
              <span>{isSubmitting ? 'Guardando...' : 'Crear y Publicar Curso'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateCourseModal;
