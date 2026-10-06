import React, { useState, useEffect, useMemo } from 'react';
import { 
  Award, 
  ArrowRight, 
  Edit3,
  Sliders, 
  Calendar, 
  Clock,
  MapPin,
  Building2,
  Laptop,
  Shield,
  Wrench,
  Filter
} from 'lucide-react';
import { getSavedCourses } from '../../data/coursesData';
import CourseManagerModal from '../../components/CourseManagerModal';
import CreateCourseModal from '../../components/CreateCourseModal';

const CoursesView = ({ onSelectCourse, isEditMode }) => {
  const [courses, setCourses] = useState(getSavedCourses());
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [schoolFilter, setSchoolFilter] = useState('all'); // 'all' | 'seguridad' | 'oficios'
  const [modalityFilter, setModalityFilter] = useState('all'); // 'all' | 'presencial' | 'virtual' | 'ambas'

  useEffect(() => {
    const handleUpdate = (e) => {
      if (e.detail) setCourses(e.detail);
      else setCourses(getSavedCourses());
    };
    window.addEventListener('prevyseg-courses-updated', handleUpdate);
    return () => window.removeEventListener('prevyseg-courses-updated', handleUpdate);
  }, []);

  const visibleCourses = useMemo(() => {
    return courses.filter(course => isEditMode || course.activo !== false);
  }, [courses, isEditMode]);

  const filteredCourses = useMemo(() => {
    return visibleCourses.filter(course => {
      // Filtro de escuela
      if (schoolFilter !== 'all' && course.school !== schoolFilter) {
        return false;
      }
      // Filtro de modalidad
      const hasPresencial = course.permitePresencial !== false;
      const hasVirtual = course.permiteVirtual !== false;

      if (modalityFilter === 'presencial') {
        return hasPresencial;
      }
      if (modalityFilter === 'virtual') {
        return hasVirtual;
      }
      if (modalityFilter === 'ambas') {
        return hasPresencial && hasVirtual;
      }
      return true;
    });
  }, [visibleCourses, schoolFilter, modalityFilter]);

  return (
    <div className="space-y-6">
      {/* Banner / Header */}
      <div className="bg-gradient-to-r from-sky-50 via-teal-50 to-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-[#0284c7] text-xs font-bold border border-sky-200">
            <Award size={14} />
            <span>Organismo Técnico de Capacitación (OTEC)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Catálogo Oficial de Cursos SENCE
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            Bienvenido al entorno virtual de formación. Selecciona un curso para gestionar participantes, revisar configuraciones del aula o consultar informes de avance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => setIsManagerOpen(true)}
            className="bg-[#071626] hover:bg-[#0B2032] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
            title="Modificar cupos, fechas, disponibilidad y etiquetas de modalidad"
          >
            <Sliders size={15} className="text-[#00FFE0]" />
            <span>Modificar Modalidades, Cupos y Fechas</span>
          </button>

          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-bold px-4 py-3 rounded-xl shadow-md flex items-center gap-2 cursor-pointer flex-shrink-0"
            title="Crear un nuevo curso y definir si será Online, Presencial o Ambas"
          >
            <Edit3 size={15} />
            <span>＋ Crear Nuevo Curso</span>
          </button>
        </div>
      </div>

      {/* Barra de Filtros por Escuela y Modalidad (Presencial / Virtual) */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        {/* Filtro por Escuela */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 flex items-center gap-1 mr-1">
            <Filter size={13} />
            <span>Escuela:</span>
          </span>
          <button
            onClick={() => setSchoolFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              schoolFilter === 'all'
                ? 'bg-[#071626] text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas ({visibleCourses.length})
          </button>
          <button
            onClick={() => setSchoolFilter('seguridad')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              schoolFilter === 'seguridad'
                ? 'bg-[#071626] text-[#00C4D8] shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Shield size={13} />
            <span>Seguridad ({visibleCourses.filter(c => c.school === 'seguridad').length})</span>
          </button>
          <button
            onClick={() => setSchoolFilter('oficios')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              schoolFilter === 'oficios'
                ? 'bg-[#071626] text-[#00FFE0] shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Wrench size={13} />
            <span>Oficios ({visibleCourses.filter(c => c.school === 'oficios').length})</span>
          </button>
        </div>

        {/* Filtro por Etiqueta de Modalidad */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-bold text-slate-400 mr-1">Etiqueta:</span>
          <button
            onClick={() => setModalityFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              modalityFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setModalityFilter('presencial')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              modalityFilter === 'presencial'
                ? 'bg-emerald-600 text-white shadow-2xs'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <Building2 size={12} />
            <span>Presencial</span>
          </button>
          <button
            onClick={() => setModalityFilter('virtual')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              modalityFilter === 'virtual'
                ? 'bg-[#0284c7] text-white shadow-2xs'
                : 'bg-sky-50 text-[#0284c7] border border-sky-200 hover:bg-sky-100'
            }`}
          >
            <Laptop size={12} />
            <span>Virtual</span>
          </button>
          <button
            onClick={() => setModalityFilter('ambas')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
              modalityFilter === 'ambas'
                ? 'bg-gradient-to-r from-emerald-600 to-sky-600 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>Ambas</span>
          </button>
        </div>
      </div>

      {/* Grid of Courses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => {
          const isProx = Boolean(course.proximamente);

          return (
            <div
              key={course.id}
              onClick={() => onSelectCourse(course.title)}
              className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-300 cursor-pointer flex flex-col justify-between group hover:-translate-y-1 hover:shadow-md ${
                isProx ? 'border-amber-300 hover:border-amber-400' : 'border-slate-200 hover:border-sky-400'
              }`}
            >
              <div>
                {/* Category Badge Header */}
                <div className="bg-slate-50 p-3.5 border-b border-slate-200 flex justify-between items-center">
                  <span className="text-[11px] font-bold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded border border-sky-200">
                    {course.category}
                  </span>
                  <span className="text-xs font-bold text-teal-700">
                    {course.price}
                  </span>
                </div>

                {/* Title, Modality Tags and Badges */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-sm font-semibold text-slate-900 leading-snug group-hover:text-[#0284c7] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  {/* ETIQUETAS DE MODALIDAD: PRESENCIAL Y/O VIRTUAL */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                    {course.permitePresencial !== false && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs">
                        <Building2 size={11} className="text-emerald-700" />
                        <span>Presencial</span>
                      </span>
                    )}
                    {course.permiteVirtual !== false && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-sky-100 text-[#0284c7] border border-sky-300 shadow-2xs">
                        <Laptop size={11} className="text-[#0284c7]" />
                        <span>Virtual</span>
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-[10px]">
                    {isProx ? (
                      <span className="inline-flex items-center gap-1 font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-300 shadow-2xs">
                        <Clock size={11} className="text-amber-700 animate-pulse" />
                        <span>PRÓXIMAMENTE</span>
                      </span>
                    ) : course.disponible && course.cupos > 0 ? (
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span>{course.cupos} cupos</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        <span>Agotado</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      <Calendar size={11} className="text-amber-600" />
                      <span>Inicio: {course.fecha_inicio}</span>
                    </span>
                  </div>

                  {/* Cobertura Geográfica y Modalidades Regionales */}
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-600 bg-slate-100/90 px-2.5 py-1 rounded-lg border border-slate-200/80">
                    <MapPin size={11} className="text-rose-500 flex-shrink-0" />
                    <span className="truncate">
                      <strong className="text-emerald-700">Arica:</strong> Presencial/Virtual • <strong className="text-sky-700">Regiones:</strong> 100% Virtual
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-medium">
                  {course.priceDetail}
                </span>

                {isProx ? (
                  <span className="text-xs font-black text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 px-3 py-1 rounded-xl flex items-center gap-1.5 transition-colors shadow-2xs">
                    <Clock size={12} className="text-amber-700" />
                    <span>PRÓXIMAMENTE</span>
                  </span>
                ) : (
                  <span className="text-xs font-bold text-[#0284c7] group-hover:text-sky-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Ver Curso <ArrowRight size={13} />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CourseManagerModal
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
      />

      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        initialSchool={schoolFilter !== 'all' ? schoolFilter : 'seguridad'}
      />
    </div>
  );
};

export default CoursesView;
