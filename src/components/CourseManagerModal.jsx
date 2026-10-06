import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Check, 
  Sliders, 
  Calendar, 
  Users, 
  Shield, 
  Wrench, 
  Sparkles, 
  RotateCcw,
  Save,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Building2,
  Laptop,
  PlusCircle
} from 'lucide-react';
import { getSavedCourses, updateCourseItem, resetCoursesToDefault } from '../data/coursesData';
import CreateCourseModal from './CreateCourseModal';

const CourseManagerModal = ({ isOpen, onClose }) => {
  const [courses, setCourses] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('seguridad');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    disponible: true,
    proximamente: false,
    cupos: 20,
    fecha_inicio: '',
    fecha_termino: '',
    permitePresencial: true,
    permiteVirtual: true
  });
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setCourses(getSavedCourses());
    }
  }, [isOpen]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredCourses = courses.filter(c => c.school === selectedSchool);

  const handleStartEdit = (course) => {
    setEditingId(course.id);
    setEditForm({
      disponible: course.disponible,
      proximamente: Boolean(course.proximamente),
      cupos: course.cupos,
      fecha_inicio: course.fecha_inicio || '',
      fecha_termino: course.fecha_termino || '',
      permitePresencial: course.permitePresencial !== false,
      permiteVirtual: course.permiteVirtual !== false
    });
  };

  const handleSave = (courseId) => {
    let pres = editForm.permitePresencial;
    let virt = editForm.permiteVirtual;
    if (!pres && !virt) {
      pres = true;
      virt = true;
    }
    const targetCourse = courses.find(c => c.id === courseId);
    const updated = updateCourseItem(courseId, {
      title: targetCourse?.title || targetCourse?.titulo,
      school: targetCourse?.school,
      activo: true,
      disponible: editForm.disponible,
      proximamente: Boolean(editForm.proximamente),
      cupos: Number(editForm.cupos),
      fecha_inicio: editForm.fecha_inicio.trim(),
      fecha_termino: editForm.fecha_termino.trim(),
      permitePresencial: pres,
      permiteVirtual: virt
    });
    if (updated) {
      setCourses(updated);
      setEditingId(null);
      showToast('¡Curso y etiquetas de modalidad actualizados exitosamente!');
    }
  };

  const handleQuickToggleAvailability = (course) => {
    const newStatus = !course.disponible;
    const updated = updateCourseItem(course.id, { 
      title: course.title || course.titulo,
      school: course.school,
      disponible: newStatus, 
      proximamente: false 
    });
    if (updated) {
      setCourses(updated);
      showToast(`Estado cambiado a: ${newStatus ? 'Disponible' : 'No Disponible'}`);
    }
  };

  const handleQuickToggleProximamente = (course) => {
    const nextProx = !course.proximamente;
    const updated = updateCourseItem(course.id, { 
      title: course.title || course.titulo,
      school: course.school,
      activo: true,
      proximamente: nextProx, 
      disponible: nextProx ? false : course.disponible 
    });
    if (updated) {
      setCourses(updated);
      showToast(`Estado cambiado a: ${nextProx ? 'PRÓXIMAMENTE' : 'Estado Normal'}`);
    }
  };

  // Conmutación rápida directa de etiqueta Presencial
  const handleTogglePresencial = (course) => {
    const currentPres = course.permitePresencial !== false;
    const currentVirt = course.permiteVirtual !== false;
    const nextVal = !currentPres;
    if (!nextVal && !currentVirt) {
      showToast('El curso debe tener al menos una modalidad activa (Presencial o Virtual)');
      return;
    }
    const updated = updateCourseItem(course.id, { permitePresencial: nextVal });
    if (updated) {
      setCourses(updated);
      showToast(`Etiqueta "Presencial" ${nextVal ? 'ACTIVADA' : 'DESACTIVADA'}`);
    }
  };

  // Conmutación rápida directa de etiqueta Virtual
  const handleToggleVirtual = (course) => {
    const currentPres = course.permitePresencial !== false;
    const currentVirt = course.permiteVirtual !== false;
    const nextVal = !currentVirt;
    if (!nextVal && !currentPres) {
      showToast('El curso debe tener al menos una modalidad activa (Presencial o Virtual)');
      return;
    }
    const updated = updateCourseItem(course.id, { permiteVirtual: nextVal });
    if (updated) {
      setCourses(updated);
      showToast(`Etiqueta "Virtual" ${nextVal ? 'ACTIVADA' : 'DESACTIVADA'}`);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('¿Deseas restablecer todos los cursos a sus valores iniciales?')) {
      const def = resetCoursesToDefault();
      if (def) {
        setCourses(def);
        setEditingId(null);
        showToast('Cursos restablecidos a valores de fábrica');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-slate-200"
      >
        {/* Top Header */}
        <div className="p-6 bg-gradient-to-r from-[#071626] via-[#0A4DA2] to-[#00A896] text-white flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-[#00FFE0]">
              <Sliders size={15} />
              <span>PANEL ADMINISTRATIVO OTEC PREVYSEG</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              Gestor de Disponibilidad, Cupos y Fechas
            </h2>
            <p className="text-xs text-white/80">
              Modifica en tiempo real la disponibilidad, cantidad de vacantes y fechas de inicio/término de cada capacitación.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* School Tabs & Action Bar */}
        <div className="p-4 bg-slate-100 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-2xs gap-1">
            <button
              onClick={() => setSelectedSchool('seguridad')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSchool === 'seguridad'
                  ? 'bg-[#071626] text-[#00C4D8] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield size={14} />
              <span>Seguridad Privada ({courses.filter(c => c.school === 'seguridad').length})</span>
            </button>
            <button
              onClick={() => setSelectedSchool('oficios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedSchool === 'oficios'
                  ? 'bg-[#071626] text-[#00FFE0] shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Wrench size={14} />
              <span>Oficios SENCE ({courses.filter(c => c.school === 'oficios').length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCreateOpen(true)}
              className="text-xs font-bold text-white bg-gradient-to-r from-[#0A4DA2] to-[#00A896] hover:from-[#071626] hover:to-[#00FFE0] hover:text-slate-900 flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
              title="Crear un nuevo curso y definir su modalidad (Online, Presencial o Ambas)"
            >
              <PlusCircle size={14} />
              <span>＋ Crear Nuevo Curso</span>
            </button>

            <button
              onClick={handleResetAll}
              className="text-xs font-semibold text-slate-500 hover:text-red-600 flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
              title="Restablecer cupos y fechas originales"
            >
              <RotateCcw size={13} />
              <span>Restablecer Fábrica</span>
            </button>
          </div>
        </div>

        {/* Toast Notification */}
        {toastMessage && (
          <div className="bg-emerald-600 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-xs">
            <CheckCircle2 size={15} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Course List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 divide-y divide-slate-100">
          {filteredCourses.map((course) => {
            const isEditing = editingId === course.id;

            return (
              <div key={course.id} className="pt-4 first:pt-0">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-all">
                  
                  {/* Left: Info */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                        {course.category}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {course.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                        <MapPin size={10} className="text-rose-500" />
                        <span>Arica: Presencial/Virtual • Regiones: 100% Virtual</span>
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 leading-snug">
                      {course.title}
                    </h4>

                    {/* Current Badges */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                      {/* Estado */}
                      {course.proximamente ? (
                        <button
                          onClick={() => handleQuickToggleProximamente(course)}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black cursor-pointer bg-amber-100 text-amber-900 border border-amber-300 shadow-2xs hover:bg-amber-200 transition-all"
                          title="Haz clic para alternar estado Próximamente"
                        >
                          <Clock size={12} className="text-amber-700 animate-pulse" />
                          <span>PRÓXIMAMENTE</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => handleQuickToggleAvailability(course)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-black cursor-pointer transition-transform hover:scale-105 ${
                            course.disponible
                              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                              : 'bg-rose-100 text-rose-800 border border-rose-300'
                          }`}
                          title="Haz clic para cambiar disponibilidad"
                        >
                          <span className={`w-2 h-2 rounded-full ${course.disponible ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                          <span>{course.disponible ? 'DISPONIBLE' : 'NO DISPONIBLE'}</span>
                        </button>
                      )}

                      {/* Botón rápido para marcar PRÓXIMAMENTE */}
                      <button
                        type="button"
                        onClick={() => handleQuickToggleProximamente(course)}
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1 ${
                          course.proximamente
                            ? 'bg-amber-500 text-white border-amber-500 hover:bg-amber-600'
                            : 'bg-white text-slate-600 border-slate-300 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-300'
                        }`}
                        title="Alternar botón PRÓXIMAMENTE"
                      >
                        <Clock size={10} />
                        <span>{course.proximamente ? 'Quitar Pronto' : '+ Pronto'}</span>
                      </button>

                      {/* Cupos */}
                      <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
                        <Users size={13} className="text-sky-600" />
                        <span><strong>{course.cupos}</strong> cupos</span>
                      </span>

                      {/* Fechas */}
                      <span className="inline-flex items-center gap-1 text-slate-600 font-medium">
                        <Calendar size={13} className="text-amber-600" />
                        <span>{course.fecha_inicio} al {course.fecha_termino}</span>
                      </span>
                    </div>

                    {/* Etiquetas de Modalidad Modificables: Presencial y/o Virtual */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 mt-1">
                      <span className="text-[10px] font-black uppercase text-slate-400">Modalidad:</span>
                      
                      {/* Botón rápido Presencial */}
                      <button
                        type="button"
                        onClick={() => handleTogglePresencial(course)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shadow-2xs ${
                          course.permitePresencial !== false
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 line-through opacity-60 hover:opacity-100 hover:bg-slate-200'
                        }`}
                        title={course.permitePresencial !== false ? 'Presencial ACTIVA (Haz clic para desactivar)' : 'Presencial INACTIVA (Haz clic para activar)'}
                      >
                        <Building2 size={12} className={course.permitePresencial !== false ? 'text-emerald-700' : 'text-slate-400'} />
                        <span>Presencial</span>
                        {course.permitePresencial !== false && <span className="text-emerald-600 font-bold ml-0.5">✓</span>}
                      </button>

                      {/* Botón rápido Virtual */}
                      <button
                        type="button"
                        onClick={() => handleToggleVirtual(course)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer shadow-2xs ${
                          course.permiteVirtual !== false
                            ? 'bg-sky-100 text-[#0284c7] border border-sky-300 hover:bg-sky-200'
                            : 'bg-slate-100 text-slate-400 border border-slate-200 line-through opacity-60 hover:opacity-100 hover:bg-slate-200'
                        }`}
                        title={course.permiteVirtual !== false ? 'Virtual ACTIVA (Haz clic para desactivar)' : 'Virtual INACTIVA (Haz clic para activar)'}
                      >
                        <Laptop size={12} className={course.permiteVirtual !== false ? 'text-[#0284c7]' : 'text-slate-400'} />
                        <span>Virtual</span>
                        {course.permiteVirtual !== false && <span className="text-[#0284c7] font-bold ml-0.5">✓</span>}
                      </button>

                      <span className="text-[10px] text-slate-400 hidden sm:inline italic">
                        (Haz clic en los botones para alternar Presencial y/o Virtual)
                      </span>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => isEditing ? setEditingId(null) : handleStartEdit(course)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white hover:bg-[#071626] hover:text-white border border-slate-300 text-slate-700 shadow-2xs transition-all cursor-pointer"
                    >
                      {isEditing ? 'Cancelar' : 'Modificar'}
                    </button>
                  </div>
                </div>

                {/* Inline Editing Form */}
                <AnimatePresence>
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4 overflow-hidden"
                    >
                      {/* SECCIÓN DE ETIQUETAS DE MODALIDAD: PRESENCIAL Y/O VIRTUAL */}
                      <div className="bg-white p-4 rounded-xl border border-blue-200 shadow-2xs space-y-2.5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                          <label className="text-xs font-black text-slate-800 uppercase flex items-center gap-1.5">
                            <Sliders size={14} className="text-[#0A4DA2]" />
                            <span>Etiquetas de Modalidad Asignadas (Presencial y/o Virtual):</span>
                          </label>
                          <span className="text-[10px] text-slate-500 font-medium">
                            Puedes activar Presencial, Virtual, o ambas modalidades simultáneamente
                          </span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {/* Opción Presencial */}
                          <button
                            type="button"
                            onClick={() => {
                              const next = !editForm.permitePresencial;
                              if (!next && !editForm.permiteVirtual) {
                                showToast('El curso debe tener al menos una modalidad activa');
                                return;
                              }
                              setEditForm({ ...editForm, permitePresencial: next });
                            }}
                            className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                              editForm.permitePresencial
                                ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-400/30 text-emerald-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${
                                editForm.permitePresencial ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                <Building2 size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-black">Etiqueta "Presencial"</div>
                                <div className="text-[10px] font-normal text-slate-600">Sede Central Arica / Talleres / Terreno</div>
                              </div>
                            </div>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${
                              editForm.permitePresencial ? 'bg-emerald-600 text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {editForm.permitePresencial ? 'ACTIVADA ✓' : 'INACTIVA'}
                            </span>
                          </button>

                          {/* Opción Virtual */}
                          <button
                            type="button"
                            onClick={() => {
                              const next = !editForm.permiteVirtual;
                              if (!next && !editForm.permitePresencial) {
                                showToast('El curso debe tener al menos una modalidad activa');
                                return;
                              }
                              setEditForm({ ...editForm, permiteVirtual: next });
                            }}
                            className={`p-3 rounded-xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                              editForm.permiteVirtual
                                ? 'bg-sky-50/90 border-sky-400 ring-2 ring-sky-400/30 text-sky-950 font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black ${
                                editForm.permiteVirtual ? 'bg-[#0284c7] text-white' : 'bg-slate-200 text-slate-500'
                              }`}>
                                <Laptop size={16} />
                              </div>
                              <div>
                                <div className="text-xs font-black">Etiqueta "Virtual"</div>
                                <div className="text-[10px] font-normal text-slate-600">Aula Virtual 24/7 / Zoom Sincrónico</div>
                              </div>
                            </div>
                            <span className={`text-[10px] font-black px-2.5 py-1 rounded-md ${
                              editForm.permiteVirtual ? 'bg-[#0284c7] text-white shadow-xs' : 'bg-slate-200 text-slate-600'
                            }`}>
                              {editForm.permiteVirtual ? 'ACTIVADA ✓' : 'INACTIVA'}
                            </span>
                          </button>
                        </div>

                        {/* Vista previa en tiempo real de las etiquetas */}
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-600 font-medium">
                          <span>Vista previa de etiquetas:</span>
                          {editForm.permitePresencial && (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded text-[10px]">
                              <Building2 size={10} /> Presencial
                            </span>
                          )}
                          {editForm.permiteVirtual && (
                            <span className="inline-flex items-center gap-1 font-bold text-[#0284c7] bg-sky-100 border border-sky-300 px-2 py-0.5 rounded text-[10px]">
                              <Laptop size={10} /> Virtual
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        
                        {/* 1. Disponibilidad & Próximamente */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Estado de Matrícula:
                          </label>
                          <div className="flex flex-col gap-1.5 pt-1">
                            <button
                              type="button"
                              onClick={() => setEditForm({ ...editForm, disponible: !editForm.disponible, proximamente: false })}
                              className={`w-full py-1.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                editForm.disponible && !editForm.proximamente
                                  ? 'bg-emerald-600 text-white shadow-xs'
                                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                              }`}
                            >
                              <Check size={14} />
                              <span>{editForm.disponible && !editForm.proximamente ? 'Disponible' : 'Marcar Disponible'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => setEditForm({ ...editForm, proximamente: !editForm.proximamente, disponible: editForm.proximamente ? true : false })}
                              className={`w-full py-1.5 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 cursor-pointer transition-all ${
                                editForm.proximamente
                                  ? 'bg-amber-500 text-white shadow-xs ring-2 ring-amber-400/40'
                                  : 'bg-slate-200 text-slate-700 hover:bg-amber-100'
                              }`}
                            >
                              <Clock size={14} />
                              <span>{editForm.proximamente ? '✓ PRÓXIMAMENTE' : 'Marcar Próximamente'}</span>
                            </button>
                          </div>
                        </div>

                        {/* 2. Cupos Restantes */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Cupos Restantes:
                          </label>
                          <input
                            type="number"
                            min="0"
                            max="200"
                            value={editForm.cupos}
                            onChange={(e) => setEditForm({ ...editForm, cupos: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-bold focus:ring-2 focus:ring-[#0A4DA2] focus:outline-none"
                            placeholder="Ej: 15"
                          />
                        </div>

                        {/* 3. Fecha Inicio */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Fecha de Inicio:
                          </label>
                          <input
                            type="text"
                            value={editForm.fecha_inicio}
                            onChange={(e) => setEditForm({ ...editForm, fecha_inicio: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0A4DA2] focus:outline-none"
                            placeholder="Ej: 15 de Octubre, 2026"
                          />
                        </div>

                        {/* 4. Fecha Término */}
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-700 uppercase">
                            Fecha de Término:
                          </label>
                          <input
                            type="text"
                            value={editForm.fecha_termino}
                            onChange={(e) => setEditForm({ ...editForm, fecha_termino: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs font-semibold focus:ring-2 focus:ring-[#0A4DA2] focus:outline-none"
                            placeholder="Ej: 20 de Noviembre, 2026"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2 border-t border-blue-200">
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSave(course.id)}
                          className="px-5 py-2 rounded-xl text-xs font-black bg-[#0A4DA2] hover:bg-[#073570] text-white shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
                        >
                          <Save size={14} />
                          <span>Guardar Cambios</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles size={14} className="text-[#00A896]" />
            <span>Los cambios se reflejan inmediatamente en las tarjetas de cursos y en la ficha de inscripción.</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#071626] text-white font-bold hover:bg-[#0B2032] transition-colors cursor-pointer"
          >
            Cerrar Gestor
          </button>
        </div>
      </motion.div>

      {/* Modal de Creación de Curso con Selector de Modalidad */}
      <CreateCourseModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        initialSchool={selectedSchool}
        onSuccess={() => {
          setCourses(getSavedCourses());
          showToast('¡Curso creado exitosamente!');
        }}
      />
    </div>
  );
};

export default CourseManagerModal;
