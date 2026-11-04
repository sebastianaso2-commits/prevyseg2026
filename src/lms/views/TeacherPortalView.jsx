import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  FileText, 
  UploadCloud, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Download, 
  Eye, 
  Send, 
  Plus, 
  Trash2, 
  Sparkles, 
  BookOpen, 
  Video, 
  Award, 
  AlertCircle, 
  HelpCircle, 
  Check, 
  X, 
  Search, 
  Filter, 
  ShieldCheck, 
  ChevronRight,
  Radio,
  Copy,
  ExternalLink,
  Save,
  RefreshCw,
  Play,
  CheckCheck,
  UserCheck
} from 'lucide-react';

const TeacherPortalView = ({ currentUser, onSelectCourse, activeTab: propActiveTab, onTabChange }) => {
  // Normalizar pestaña: 'interaccion' o 'archivos' se unifican en 'interaccion-materiales'
  const normalizeTab = (tab) => {
    if (!tab || tab === 'interaccion' || tab === 'archivos' || tab === 'docente-panel') {
      return 'interaccion-materiales';
    }
    return tab;
  };

  const [internalActiveTab, setInternalActiveTab] = useState('interaccion-materiales');
  const activeTab = normalizeTab(propActiveTab || internalActiveTab);
  const setActiveTab = (tab) => {
    if (onTabChange) {
      onTabChange(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };

  const [selectedCourseId, setSelectedCourseId] = useState('c1');
  const [subSectionFilter, setSubSectionFilter] = useState('todos'); // 'todos' | 'avisos' | 'consultas' | 'materiales'
  const [copiedField, setCopiedField] = useState(null);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState(false);

  // Cursos asignados al docente
  const assignedCourses = [
    {
      id: 'c1',
      title: 'Curso de Formación Guardia de Seguridad (Credencial SPD / OS-10)',
      codeSence: '1238008921',
      studentsCount: 26,
      attendanceAvg: 92,
      schedule: 'Lunes, Miércoles y Viernes 19:00 - 21:30 hrs',
      modality: 'Sincrónico Online SENCE'
    },
    {
      id: 'c2',
      title: 'Operador de Central de Cámaras de Televigilancia (CCTV)',
      codeSence: '1238087964',
      studentsCount: 18,
      attendanceAvg: 88,
      schedule: 'Martes y Jueves 19:30 - 22:00 hrs',
      modality: 'E-learning Sincrónico'
    },
    {
      id: 'c3',
      title: 'Operador y Conducción Segura de Grúa Horquilla (Clase D)',
      codeSence: '1238090112',
      studentsCount: 15,
      attendanceAvg: 95,
      schedule: 'Sábados 09:00 - 14:00 hrs',
      modality: 'Escuela de Oficios'
    }
  ];

  const currentCourse = assignedCourses.find(c => c.id === selectedCourseId) || assignedCourses[0];

  // =========================================================================
  // 1. ESTADO DE GESTIÓN Y CREACIÓN DE LA SALA ZOOM (Sincronizado con Alumnos)
  // =========================================================================
  const [zoomConfig, setZoomConfig] = useState(() => {
    try {
      const saved = localStorage.getItem('prevyseg_active_zoom_room');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      zoomUrl: 'https://zoom.us/j/84920194821',
      meetingId: '849 2019 4821',
      passcode: 'SALA-VIRTUAL',
      isLiveNow: true,
      title: 'Clase Nº 7: Legislación de Seguridad Privada y Nueva Ley Nº 21.659',
      module: 'Módulo 2: Marco Jurídico y Derechos Humanos',
      connectedStudents: 26,
      startTime: '19:00 hrs',
      endTime: '21:30 hrs'
    };
  });

  // Guardar configuración de Zoom para que los alumnos la vean en tiempo real
  const handleSaveZoomConfig = (e) => {
    if (e) e.preventDefault();
    try {
      localStorage.setItem('prevyseg_active_zoom_room', JSON.stringify(zoomConfig));
      window.dispatchEvent(new Event('prevyseg_zoom_updated'));
      setSaveSuccessMsg(true);
      setTimeout(() => setSaveSuccessMsg(false), 3500);
      alert('✓ ¡Sala Zoom guardada y publicada! Los estudiantes verán inmediatamente el enlace y los datos de acceso actualizados en su aula virtual.');
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleLiveState = () => {
    const updated = { ...zoomConfig, isLiveNow: !zoomConfig.isLiveNow };
    setZoomConfig(updated);
    try {
      localStorage.setItem('prevyseg_active_zoom_room', JSON.stringify(updated));
      window.dispatchEvent(new Event('prevyseg_zoom_updated'));
    } catch (err) {
      console.error(err);
    }
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  // =========================================================================
  // 2. ESTADO DE ASISTENCIA Y LIBRO DE CLASES SENCE (Control exclusivo del docente)
  // =========================================================================
  const [attendanceList, setAttendanceList] = useState(() => {
    try {
      const saved = localStorage.getItem('prevyseg_class_attendance');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      { id: 1, name: 'Matías Silva Lagos', rut: '21.778.425-6', status: 'presente', entryTime: '18:58 hrs', connectionScore: '98%' },
      { id: 2, name: 'Camila Morales Valenzuela', rut: '19.845.120-K', status: 'presente', entryTime: '19:02 hrs', connectionScore: '94%' },
      { id: 3, name: 'Rodrigo Fuentes Tapia', rut: '18.332.901-4', status: 'presente', entryTime: '19:00 hrs', connectionScore: '96%' },
      { id: 4, name: 'Andrés Pizarro Castro', rut: '20.144.922-3', status: 'atraso', entryTime: '19:28 hrs', connectionScore: '78%' },
      { id: 5, name: 'Valentina Soto Henríquez', rut: '22.012.334-1', status: 'presente', entryTime: '18:55 hrs', connectionScore: '100%' },
      { id: 6, name: 'Carlos Mendoza Vera', rut: '17.654.321-8', status: 'justificado', entryTime: '-', connectionScore: 'Licencia Médica' },
      { id: 7, name: 'Daniela Albornoz Garrido', rut: '20.551.902-1', status: 'ausente', entryTime: '-', connectionScore: '0%' },
      { id: 8, name: 'Felipe Carvajal Rozas', rut: '19.123.876-5', status: 'presente', entryTime: '19:04 hrs', connectionScore: '95%' }
    ];
  });

  const [attendanceSigned, setAttendanceSigned] = useState(false);

  const handleSetStudentStatus = (studentId, newStatus) => {
    setAttendanceList(prev => prev.map(item => 
      item.id === studentId ? { ...item, status: newStatus } : item
    ));
  };

  const handleMarkAllPresent = () => {
    setAttendanceList(prev => prev.map(item => ({
      ...item,
      status: 'presente',
      entryTime: item.entryTime === '-' ? '19:00 hrs' : item.entryTime,
      connectionScore: item.connectionScore === '0%' ? '90%' : item.connectionScore
    })));
  };

  const handleSaveAttendanceSignature = () => {
    try {
      localStorage.setItem('prevyseg_class_attendance', JSON.stringify(attendanceList));
      setAttendanceSigned(true);
      alert(`✓ ¡Libro de Clases SENCE Firmado y Guardado Digitalmente! \nDocente Titular: ${currentUser?.nombre || 'Mayor (R) Marcelo Valenzuela'} \nFecha y Hora: ${new Date().toLocaleString('es-CL')} \nCumplimiento Normativo NCh 2728 validado.`);
    } catch (e) {
      console.error(e);
    }
  };

  // Cálculo de estadísticas de asistencia
  const totalStudents = attendanceList.length;
  const presentCount = attendanceList.filter(s => s.status === 'presente' || s.status === 'atraso').length;
  const absentCount = attendanceList.filter(s => s.status === 'ausente').length;
  const justifiedCount = attendanceList.filter(s => s.status === 'justificado').length;
  const attendanceRate = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  // =========================================================================
  // 3. ESTADOS DE INTERACCIÓN & MATERIALES (Unificado en 1 solo apartado)
  // =========================================================================
  const [messages, setMessages] = useState([
    {
      id: 1,
      student: 'Matías Silva Lagos',
      rut: '21.778.425-6',
      courseId: 'c1',
      date: 'Hoy, 14:20 hrs',
      topic: 'Consulta sobre Declaración Jurada SPD',
      message: 'Profesor, buenas tardes. Quería consultar si la declaración jurada en 1 sola hoja debe llevar firma ante notario o solo mi firma simple y huella.',
      status: 'pendiente',
      response: ''
    },
    {
      id: 2,
      student: 'Camila Morales Valenzuela',
      rut: '19.845.120-K',
      courseId: 'c1',
      date: 'Hoy, 11:05 hrs',
      topic: 'Justificación inasistencia sesión de ayer',
      message: 'Estimado profesor, adjunto certificado médico por inasistencia al módulo de Legislación de ayer.',
      status: 'respondido',
      response: 'Recibido Camila. Tu justificación fue registrada en el libro de clases digital SENCE. Revisa la grabación de la clase en el aula.'
    },
    {
      id: 3,
      student: 'Rodrigo Fuentes Tapia',
      rut: '18.332.901-4',
      courseId: 'c1',
      date: 'Ayer, 18:40 hrs',
      topic: 'Duda examen teórico Módulo 2',
      message: 'Profesor, ¿cuántas preguntas tendrá el simulador de examen final de SPD (Subsecretaría de Prevención del Delito)?',
      status: 'pendiente',
      response: ''
    }
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: '📢 Recordatorio: Clase Sincrónica N° 7 por Zoom hoy a las 19:00 hrs',
      date: 'Hoy, 07 de Septiembre, 2026',
      content: 'Estimados alumnos, hoy revisaremos el Módulo 2 sobre Legislación de Seguridad Privada y Ley N° 21.659. Recuerden conectarse puntuales por la sala oficial Zoom.',
      author: currentUser?.nombre || 'Mayor (R) Marcelo Valenzuela'
    },
    {
      id: 2,
      title: '📁 Nuevo Material Didáctico: Manual Oficial GGSS OS-10',
      date: '02 de Septiembre, 2026',
      content: 'Se ha subido el manual completo de formación 2026 en formato PDF. Queda a disposición en el repositorio para estudio previo.',
      author: currentUser?.nombre || 'Docente Titular'
    }
  ]);

  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [newAnnouncementTitle, setNewAnnouncementTitle] = useState('');
  const [newAnnouncementContent, setNewAnnouncementContent] = useState('');

  const [materials, setMaterials] = useState([
    {
      id: 1,
      title: 'Manual de Legislación de Seguridad Privada (Normativa SPD 2026).pdf',
      category: 'Guía Teórica',
      size: '8.4 MB',
      uploadDate: '01/09/2026',
      downloads: 26
    },
    {
      id: 2,
      title: 'Presentación PPT: Protocolos de Prevención de Riesgos y Control de Accesos.pptx',
      category: 'Diapositivas PPT',
      size: '14.2 MB',
      uploadDate: '28/08/2026',
      downloads: 24
    },
    {
      id: 3,
      title: 'Formato Declaración Jurada Simple Unificada (1 Sola Hoja).pdf',
      category: 'Documentos Oficiales',
      size: '450 KB',
      uploadDate: '25/08/2026',
      downloads: 26
    },
    {
      id: 4,
      title: 'Guía Práctica: Primeros Auxilios, RCP y Manejo de Crisis.pdf',
      category: 'Guía Práctica',
      size: '3.1 MB',
      uploadDate: '20/08/2026',
      downloads: 19
    }
  ]);

  const [newMaterialTitle, setNewMaterialTitle] = useState('');
  const [newMaterialCategory, setNewMaterialCategory] = useState('Guía Teórica');

  // Calificaciones
  const [grades] = useState([
    { id: 1, name: 'Matías Silva Lagos', rut: '21.778.425-6', m1: 6.8, m2: 6.5, m3: 6.2, exam: 6.5, attendance: 95, status: 'Aprobado' },
    { id: 2, name: 'Camila Morales Valenzuela', rut: '19.845.120-K', m1: 6.0, m2: 5.8, m3: 6.2, exam: 6.0, attendance: 90, status: 'Aprobado' },
    { id: 3, name: 'Rodrigo Fuentes Tapia', rut: '18.332.901-4', m1: 5.2, m2: 5.5, m3: 5.0, exam: 5.3, attendance: 85, status: 'Aprobado' },
    { id: 4, name: 'Andrés Pizarro Castro', rut: '20.144.922-3', m1: 4.5, m2: 4.8, m3: 5.0, exam: 4.7, attendance: 82, status: 'En Observación' },
    { id: 5, name: 'Valentina Soto Henríquez', rut: '22.012.334-1', m1: 7.0, m2: 6.9, m3: 6.8, exam: 6.9, attendance: 100, status: 'Aprobado Sobresaliente' }
  ]);

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    setMessages(messages.map(m => 
      m.id === selectedMessage.id 
        ? { ...m, status: 'respondido', response: replyText.trim() }
        : m
    ));

    setSelectedMessage(null);
    setReplyText('');
    alert('✓ Respuesta enviada exitosamente al alumno. Notificado a su buzón de mensajería institucional.');
  };

  const handleCreateAnnouncement = (e) => {
    e.preventDefault();
    if (!newAnnouncementTitle || !newAnnouncementContent) return;

    const newA = {
      id: Date.now(),
      title: newAnnouncementTitle,
      date: 'Hoy, ' + new Date().toLocaleDateString('es-CL'),
      content: newAnnouncementContent,
      author: currentUser?.nombre || 'Docente Titular'
    };

    setAnnouncements([newA, ...announcements]);
    setNewAnnouncementTitle('');
    setNewAnnouncementContent('');
    setShowNewAnnouncementModal(false);
    alert('✓ Comunicado oficial publicado inmediatamente a toda la clase.');
  };

  const handleUploadMaterial = (fileName) => {
    const newDoc = {
      id: Date.now(),
      title: fileName || (newMaterialTitle.trim() ? `${newMaterialTitle}.pdf` : 'Guia_Estudio_PrevySeg.pdf'),
      category: newMaterialCategory,
      size: '3.4 MB',
      uploadDate: new Date().toLocaleDateString('es-CL'),
      downloads: 0
    };

    setMaterials([newDoc, ...materials]);
    setNewMaterialTitle('');
    alert(`✓ ¡Archivo "${newDoc.title}" subido al repositorio! Ya está disponible para descarga de los alumnos.`);
  };

  const handleDeleteMaterial = (id) => {
    if (confirm('¿Deseas eliminar este material didáctico del repositorio?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* 1. Header Banner del Docente */}
      <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-white p-6 sm:p-8 rounded-3xl border border-sky-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-100 text-[#0284c7] text-xs font-bold border border-sky-200">
            <ShieldCheck size={14} className="text-[#0284c7]" />
            <span>Panel de Instrucción Académica • Acreditación SPD / SENCE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Portal del Docente: <span className="text-[#0284c7]">{currentUser?.nombre || 'Mayor (R) Marcelo Valenzuela'}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Gestión integral de la sala Zoom, libro de clases digital para toma de asistencia oficial y administración unificada de comunicados, consultas y materiales.
          </p>
        </div>

        {/* Selector de Curso Asignado */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 min-w-[280px] space-y-1.5 shadow-sm">
          <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
            Curso Activo en Instrucción:
          </label>
          <select
            value={selectedCourseId}
            onChange={(e) => setSelectedCourseId(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-xs font-bold text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:border-sky-500 focus:bg-white cursor-pointer"
          >
            {assignedCourses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
          <div className="flex justify-between items-center text-[10px] text-slate-500 pt-1">
            <span>Código SENCE: <strong className="text-sky-700">{currentCourse.codeSence}</strong></span>
            <span>Matrícula: <strong className="text-emerald-700">{currentCourse.studentsCount} alumnos</strong></span>
          </div>
        </div>
      </div>

      {/* 2. Submenú de Navegación del Docente (Organizado y con Apartados Solicitados) */}
      <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 overflow-x-auto gap-1">
        {/* Pestaña Unificada: Interacción & Materiales */}
        <button
          onClick={() => setActiveTab('interaccion-materiales')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'interaccion-materiales'
              ? 'bg-[#0284c7] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <MessageSquare size={15} />
          <span>Interacción & Materiales de Clase</span>
          {messages.filter(m => m.status === 'pendiente').length > 0 && (
            <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2 py-0.2 rounded-full">
              {messages.filter(m => m.status === 'pendiente').length} pendientes
            </span>
          )}
        </button>

        {/* Pestaña: Gestión Sala Zoom en Vivo */}
        <button
          onClick={() => setActiveTab('aula-vivo')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'aula-vivo'
              ? 'bg-[#0284c7] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Video size={15} />
          <span>Gestión Sala Zoom en Vivo</span>
          {zoomConfig.isLiveNow ? (
            <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full uppercase animate-pulse">
              🔴 En Vivo
            </span>
          ) : (
            <span className="bg-slate-300 text-slate-700 text-[9px] font-bold px-1.5 py-0.2 rounded-full">
              Pausada
            </span>
          )}
        </button>

        {/* Pestaña: Libro de Clases & Asistencia SENCE */}
        <button
          onClick={() => setActiveTab('asistencia')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'asistencia'
              ? 'bg-[#0284c7] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Clock size={15} />
          <span>Libro de Clases & Asistencia SENCE</span>
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded-full border border-emerald-300">
            {attendanceRate}%
          </span>
        </button>

        {/* Pestaña: Calificaciones & Evaluaciones */}
        <button
          onClick={() => setActiveTab('calificaciones')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'calificaciones'
              ? 'bg-[#0284c7] text-white shadow-sm'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Award size={15} />
          <span>Calificaciones & Evaluaciones</span>
        </button>
      </div>

      {/* 3. CONTENIDO DE LA PESTAÑA ACTIVA */}
      <AnimatePresence mode="wait">
        
        {/* ========================================================================= */}
        {/* PESTAÑA 1: INTERACCIÓN DE ALUMNOS & MATERIALES Y ARCHIVOS (UNIFICADO)    */}
        {/* ========================================================================= */}
        {activeTab === 'interaccion-materiales' && (
          <motion.div
            key="tab-interaccion-materiales"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Barra Resumen Superior */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Consultas de Alumnos</p>
                  <p className="text-xl font-black text-slate-900 mt-0.5">{messages.length} Registradas</p>
                  <p className="text-xs text-amber-600 font-bold">
                    {messages.filter(m => m.status === 'pendiente').length} Pendientes de responder
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold">
                  <MessageSquare size={20} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Avisos & Comunicados</p>
                  <p className="text-xl font-black text-slate-900 mt-0.5">{announcements.length} Publicados</p>
                  <p className="text-xs text-teal-600 font-semibold">Visibles para todos los alumnos</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-[#00c2b2] flex items-center justify-center font-bold">
                  <Sparkles size={20} />
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase text-slate-500">Materiales en Repositorio</p>
                  <p className="text-xl font-black text-slate-900 mt-0.5">{materials.length} Archivos</p>
                  <p className="text-xs text-emerald-600 font-semibold">PDFs, Guías y Diapositivas</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <UploadCloud size={20} />
                </div>
              </div>
            </div>

            {/* Selector de sub-sección para filtrar rápidamente o ver todo junto */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-slate-200 p-3 rounded-2xl shadow-xs">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Filter size={14} className="text-[#0284c7]" />
                <span>Mostrar en este apartado:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'todos', label: '📋 Todo en Uno (Vista Integral)' },
                  { id: 'consultas', label: `💬 Consultas de Alumnos (${messages.filter(m => m.status === 'pendiente').length})` },
                  { id: 'avisos', label: '📢 Tablón de Comunicados' },
                  { id: 'materiales', label: `📁 Materiales & Archivos (${materials.length})` }
                ].map(sub => (
                  <button
                    key={sub.id}
                    onClick={() => setSubSectionFilter(sub.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      subSectionFilter === sub.id
                        ? 'bg-[#072B4F] text-white shadow-xs'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {sub.label}
                  </button>
                ))}
              </div>
            </div>

            {/* SECCIÓN 1: TABLÓN DE COMUNICADOS OFICIALES */}
            {(subSectionFilter === 'todos' || subSectionFilter === 'avisos') && (
              <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <Sparkles size={17} className="text-[#00c2b2]" />
                      <span>Tablón de Comunicados y Avisos Oficiales del Curso</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Mensajes directos que aparecen en la portada del aula virtual de cada estudiante matriculado.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowNewAnnouncementModal(true)}
                    className="bg-[#00A896] hover:bg-teal-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <Plus size={15} />
                    <span>Publicar Nuevo Comunicado</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {announcements.map(ann => (
                    <div key={ann.id} className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100/70 border border-slate-200 space-y-1.5 transition-colors">
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-bold text-slate-900">{ann.title}</h4>
                        <span className="text-[10px] text-slate-500 bg-white px-2.5 py-0.5 rounded-md border border-slate-200 font-mono">
                          {ann.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 leading-relaxed">{ann.content}</p>
                      <div className="text-[10px] text-sky-700 font-bold pt-1">
                        Publicado por: {ann.author}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN 2: BANDEJA DE CONSULTAS Y PREGUNTAS DE ALUMNOS */}
            {(subSectionFilter === 'todos' || subSectionFilter === 'consultas') && (
              <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <MessageSquare size={17} className="text-[#0284c7]" />
                      <span>Bandeja de Consultas e Interacción con Estudiantes</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Dudas académicas, justificaciones y preguntas enviadas por los alumnos.
                    </p>
                  </div>
                  <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    {messages.length} mensajes en total
                  </span>
                </div>

                <div className="space-y-3">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`p-5 rounded-2xl border transition-all space-y-3 ${
                        msg.status === 'pendiente'
                          ? 'bg-amber-50/60 border-amber-300 shadow-xs'
                          : 'bg-slate-50/70 border-slate-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{msg.student}</span>
                          <span className="text-[11px] font-mono text-slate-500">({msg.rut})</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500">{msg.date}</span>
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            msg.status === 'pendiente'
                              ? 'bg-amber-100 text-amber-800 border-amber-300'
                              : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          }`}>
                            {msg.status === 'pendiente' ? 'Pendiente de Respuesta' : 'Respondido'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs font-bold text-sky-800">
                        Asunto: {msg.topic}
                      </div>

                      <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-xl border border-slate-200">
                        "{msg.message}"
                      </p>

                      {msg.response && (
                        <div className="text-xs text-emerald-900 bg-emerald-50 p-3 rounded-xl border border-emerald-200 space-y-1">
                          <div className="font-bold flex items-center gap-1.5 text-emerald-700">
                            <CheckCircle2 size={13} /> Tu Respuesta Enviada:
                          </div>
                          <p className="text-slate-700">{msg.response}</p>
                        </div>
                      )}

                      {msg.status === 'pendiente' && (
                        <div className="flex justify-end pt-1">
                          <button
                            onClick={() => {
                              setSelectedMessage(msg);
                              setReplyText('');
                            }}
                            className="bg-[#0284c7] hover:bg-sky-600 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5 transition-all active:scale-95"
                          >
                            <Send size={13} />
                            <span>Responder al Alumno</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SECCIÓN 3: REPOSITORIO & CARGA DE MATERIALES DIDÁCTICOS (ARCHIVOS) */}
            {(subSectionFilter === 'todos' || subSectionFilter === 'materiales') && (
              <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl space-y-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                      <UploadCloud size={18} className="text-[#00A896]" />
                      <span>Materiales & Repositorio de Archivos Didácticos</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sube manuales, diapositivas y guías que los estudiantes descargarán desde su apartado de clases en vivo.
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                    {materials.length} documentos activos
                  </span>
                </div>

                {/* Formulario de Subida Directa */}
                <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/50 border border-sky-200 space-y-3">
                  <h4 className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Plus size={14} className="text-[#0284c7]" />
                    <span>Cargar Nuevo Material Didáctico</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <input
                        type="text"
                        placeholder="Título del documento (Ej: Manual Operativo de Rondín y Vigilancia)"
                        value={newMaterialTitle}
                        onChange={(e) => setNewMaterialTitle(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-sky-500"
                      />
                    </div>

                    <div className="sm:col-span-3">
                      <select
                        value={newMaterialCategory}
                        onChange={(e) => setNewMaterialCategory(e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-sky-500 cursor-pointer"
                      >
                        <option value="Guía Teórica">Guía Teórica</option>
                        <option value="Diapositivas PPT">Diapositivas PPT</option>
                        <option value="Documentos Oficiales">Documentos Oficiales</option>
                        <option value="Guía Práctica">Guía Práctica</option>
                        <option value="Evaluación Modelo">Evaluación Modelo</option>
                      </select>
                    </div>

                    <div className="sm:col-span-3">
                      <label className="w-full bg-[#0284c7] hover:bg-sky-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-xs cursor-pointer flex items-center justify-center gap-2 transition-all active:scale-95">
                        <UploadCloud size={14} />
                        <span>Examinar y Subir</span>
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.ppt,.pptx"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleUploadMaterial(e.target.files[0].name);
                            }
                          }}
                        />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Grilla de Materiales Subidos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {materials.map(mat => (
                    <div
                      key={mat.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-sky-400 transition-all flex flex-col justify-between gap-3 shadow-2xs group"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start gap-2">
                          <span className="text-xs font-bold text-slate-900 group-hover:text-[#0284c7] transition-colors leading-snug">
                            {mat.title}
                          </span>
                          <span className="text-[10px] bg-white text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-200 whitespace-nowrap">
                            {mat.category}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          Tamaño: {mat.size} • Subido: {mat.uploadDate}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-slate-200/80">
                        <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1">
                          <CheckCircle2 size={13} /> {mat.downloads} descargas de alumnos
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => alert(`Previsualizando archivo: ${mat.title}`)}
                            className="text-xs font-bold text-[#0284c7] hover:text-sky-700 flex items-center gap-1 cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>Ver</span>
                          </button>

                          <button
                            onClick={() => handleDeleteMaterial(mat.id)}
                            className="text-xs font-bold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer ml-1"
                            title="Eliminar Archivo"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 2: GESTIÓN Y CREACIÓN DE SALA ZOOM (DOCENTE CREA LA SALA)        */}
        {/* ========================================================================= */}
        {activeTab === 'aula-vivo' && (
          <motion.div
            key="tab-aula-vivo"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header explicativo */}
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Video size={14} className="text-cyan-600" />
                  <span>Configuración de Videoconferencia Sincrónica (Zoom Único)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Creación y Lanzamiento de Sala Zoom
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  Como docente, aquí creas y modificas los accesos de Zoom. Al guardar, los estudiantes matriculados verán el botón directo para ingresar.
                </p>
              </div>

              {/* Botón Principal para Iniciar como Anfitrión */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={zoomConfig.zoomUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-gradient-to-r from-[#00A896] via-teal-500 to-[#0284c7] hover:from-teal-400 hover:to-sky-500 text-white font-black text-xs sm:text-sm py-3 px-6 rounded-2xl shadow-lg shadow-teal-500/20 flex items-center gap-2 cursor-pointer transition-all active:scale-95 border border-teal-300/40"
                >
                  <Video size={16} />
                  <span>Iniciar Zoom como Anfitrión (Host)</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Grid: Formulario de Configuración a la izquierda + Vista Previa a la derecha */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Formulario de Creación / Configuración (7 cols) */}
              <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Save size={16} className="text-[#0284c7]" />
                    <span>Parámetros de la Reunión Zoom</span>
                  </h3>

                  {/* Interruptor de Estado En Vivo */}
                  <button
                    type="button"
                    onClick={handleToggleLiveState}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all cursor-pointer border ${
                      zoomConfig.isLiveNow
                        ? 'bg-red-500 text-white border-red-600 shadow-xs'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${zoomConfig.isLiveNow ? 'bg-white animate-ping' : 'bg-slate-400'}`}></span>
                    <span>{zoomConfig.isLiveNow ? '🔴 Sesión en Vivo: ACTIVA' : '⏳ Sesión en Vivo: PAUSADA'}</span>
                  </button>
                </div>

                <form onSubmit={handleSaveZoomConfig} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tema / Título de la Clase Sincrónica:
                    </label>
                    <input
                      type="text"
                      required
                      value={zoomConfig.title}
                      onChange={(e) => setZoomConfig({ ...zoomConfig, title: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                      placeholder="Ej: Clase N° 7: Legislación de Seguridad Privada y Nueva Ley N° 21.659"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Módulo Temático del Programa:
                    </label>
                    <input
                      type="text"
                      required
                      value={zoomConfig.module}
                      onChange={(e) => setZoomConfig({ ...zoomConfig, module: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                      placeholder="Ej: Módulo 2: Marco Jurídico y Derechos Humanos"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                      <Video size={13} className="text-[#0284c7]" />
                      <span>Enlace de Conexión Zoom (URL Oficial):</span>
                    </label>
                    <input
                      type="url"
                      required
                      value={zoomConfig.zoomUrl}
                      onChange={(e) => setZoomConfig({ ...zoomConfig, zoomUrl: e.target.value })}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono focus:outline-none focus:border-sky-500 focus:bg-white"
                      placeholder="https://zoom.us/j/84920194821"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        ID de Reunión Zoom:
                      </label>
                      <input
                        type="text"
                        required
                        value={zoomConfig.meetingId}
                        onChange={(e) => setZoomConfig({ ...zoomConfig, meetingId: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                        placeholder="849 2019 4821"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Código de Acceso / Password:
                      </label>
                      <input
                        type="text"
                        required
                        value={zoomConfig.passcode}
                        onChange={(e) => setZoomConfig({ ...zoomConfig, passcode: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-mono font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                        placeholder="SALA-VIRTUAL"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Horario de Conexión Sincrónica:
                      </label>
                      <input
                        type="text"
                        value={zoomConfig.startTime + ' - ' + zoomConfig.endTime}
                        onChange={(e) => {
                          const parts = e.target.value.split('-');
                          setZoomConfig({
                            ...zoomConfig,
                            startTime: parts[0]?.trim() || '19:00 hrs',
                            endTime: parts[1]?.trim() || '21:30 hrs'
                          });
                        }}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white"
                        placeholder="19:00 hrs - 21:30 hrs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Alumnos en Sala (Estimado):
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={zoomConfig.connectedStudents}
                        onChange={(e) => setZoomConfig({ ...zoomConfig, connectedStudents: Number(e.target.value) })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-bold focus:outline-none focus:border-sky-500 focus:bg-white"
                      />
                    </div>
                  </div>

                  {saveSuccessMsg && (
                    <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                      <span>¡Sala Zoom actualizada y sincronizada en tiempo real para todos los alumnos!</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-[#0284c7] hover:bg-sky-600 text-white font-black text-xs px-6 py-3 rounded-xl shadow-md cursor-pointer flex items-center gap-2 transition-all active:scale-95"
                    >
                      <Save size={15} />
                      <span>Guardar y Publicar Sala Zoom a los Alumnos</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Vista Previa de la Tarjeta del Estudiante (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    👁️ Vista Previa en Vivo (Lo que ve el Alumno):
                  </span>
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-mono">
                    Sincronización Automática
                  </span>
                </div>

                {/* Tarjeta Dark Blue idéntica a la vista de estudiante */}
                <div className="rounded-3xl bg-gradient-to-br from-[#072B4F] via-[#041d35] to-[#0b2545] border border-slate-700 text-white p-6 shadow-xl space-y-4 relative overflow-hidden">
                  <div className="flex items-center gap-2">
                    {zoomConfig.isLiveNow ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/20 border border-red-400 text-red-300 text-[10px] font-black uppercase">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        🔴 Sesión en Vivo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/20 border border-amber-400 text-amber-300 text-[10px] font-bold uppercase">
                        <Clock size={11} />
                        Programada {zoomConfig.startTime}
                      </span>
                    )}
                    <span className="text-[10px] text-teal-300 bg-teal-950/60 px-2.5 py-1 rounded-full border border-teal-800 font-mono">
                      SENCE: {currentCourse.codeSence}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-teal-300">
                      {zoomConfig.module}
                    </span>
                    <h4 className="text-sm font-black text-white leading-snug">
                      {zoomConfig.title}
                    </h4>
                  </div>

                  {/* Botón único de Zoom */}
                  <div className="pt-1">
                    <div className="bg-gradient-to-r from-[#00A896] to-[#0284c7] text-white font-black text-xs py-2.5 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 border border-teal-300/40 opacity-90">
                      <Video size={15} />
                      <span>Ingresar a Clase por Zoom</span>
                      <ExternalLink size={12} />
                    </div>
                  </div>

                  {/* Credenciales de Acceso */}
                  <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-700 space-y-2 text-xs">
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-bold">ID Reunión:</span>
                      <span className="font-mono text-white font-bold">{zoomConfig.meetingId}</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px]">
                      <span className="text-slate-400 font-bold">Contraseña:</span>
                      <span className="font-mono text-white font-bold">{zoomConfig.passcode}</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-800/80 border border-teal-500/30 text-[11px] text-slate-300 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-teal-400 flex-shrink-0" />
                    <span>Control de asistencia oficial exclusivo del profesor en el Libro SENCE.</span>
                  </div>
                </div>

                <div className="p-4 bg-sky-50 border border-sky-200 rounded-2xl text-xs text-sky-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-[#0284c7]" />
                    <span>Plataforma Única: Zoom Oficial</span>
                  </p>
                  <p className="text-[11px] text-slate-600">
                    Se utiliza una sola plataforma de videoconferencia conforme a las directrices de acreditación OTEC PrevySeg.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 3: LIBRO DE CLASES & ASISTENCIA SENCE (TOMA DIRECTA POR DOCENTE)  */}
        {/* ========================================================================= */}
        {activeTab === 'asistencia' && (
          <motion.div
            key="tab-asistencia"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            {/* Header del Libro de Clases */}
            <div className="bg-white border border-slate-200 p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
                  <Clock size={14} className="text-emerald-600" />
                  <span>Control de Asistencia Oficial y Pase de Lista Digital SENCE</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  Libro de Clases Sincrónico • Sesión N° 7
                </h2>
                <p className="text-xs sm:text-sm text-slate-600">
                  La asistencia es controlada exclusivamente por el Docente Titular. Los alumnos no marcan asistencia para garantizar el control estricto de conexión efectiva.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={handleMarkAllPresent}
                  className="bg-sky-50 hover:bg-sky-100 text-[#0284c7] font-bold text-xs px-4 py-2.5 rounded-xl border border-sky-200 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                >
                  <UserCheck size={14} />
                  <span>Marcar Todos Presentes</span>
                </button>

                <button
                  onClick={handleSaveAttendanceSignature}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <ShieldCheck size={15} />
                  <span>{attendanceSigned ? '✓ Asistencia Firmada Digitalmente' : 'Firmar y Guardar Asistencia SENCE'}</span>
                </button>
              </div>
            </div>

            {/* KPI Cards de Asistencia en Tiempo Real */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-slate-500">Total Nómina</span>
                <p className="text-xl font-black text-slate-900 mt-1">{totalStudents} Alumnos</p>
                <p className="text-[10px] text-slate-400">100% Matriculados</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-emerald-800">Presentes</span>
                <p className="text-xl font-black text-emerald-700 mt-1">{attendanceList.filter(s => s.status === 'presente').length}</p>
                <p className="text-[10px] text-emerald-600 font-bold">Conexión activa</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-amber-800">Atrasos</span>
                <p className="text-xl font-black text-amber-700 mt-1">{attendanceList.filter(s => s.status === 'atraso').length}</p>
                <p className="text-[10px] text-amber-700 font-bold">Ingreso tardío</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 shadow-2xs">
                <span className="text-[10px] font-bold uppercase text-sky-800">Justificados</span>
                <p className="text-xl font-black text-sky-700 mt-1">{justifiedCount}</p>
                <p className="text-[10px] text-sky-600">Licencia médica</p>
              </div>

              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 shadow-2xs col-span-2 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase text-rose-800">% Asistencia</span>
                <p className="text-xl font-black text-rose-700 mt-1">{attendanceRate}%</p>
                <p className="text-[10px] text-emerald-700 font-bold">Mínimo SENCE: 85%</p>
              </div>
            </div>

            {/* Planilla Interactiva de Asistencia Alumno por Alumno */}
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <Clock size={16} className="text-[#0284c7]" />
                  <span>Pase de Lista Sincrónica en Vivo - {currentCourse.title}</span>
                </h3>
                <span className="text-[11px] font-mono text-slate-500">
                  Sesión: 07 Septiembre 2026 • 19:00 hrs
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Estudiante</th>
                      <th className="p-3.5">RUT</th>
                      <th className="p-3.5 text-center">Hora Conexión</th>
                      <th className="p-3.5 text-center">Monitoreo</th>
                      <th className="p-3.5 text-center">Estado de Asistencia (Docente)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {attendanceList.map(student => (
                      <tr key={student.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">
                          {student.name}
                        </td>
                        <td className="p-3.5 font-mono text-slate-500">
                          {student.rut}
                        </td>
                        <td className="p-3.5 text-center font-mono text-slate-600">
                          {student.entryTime}
                        </td>
                        <td className="p-3.5 text-center font-bold text-slate-700">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            student.connectionScore.includes('100%') || student.connectionScore.includes('9')
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : student.connectionScore.includes('Licencia')
                              ? 'bg-sky-50 text-sky-700 border border-sky-200'
                              : 'bg-slate-100 text-slate-500'
                          }`}>
                            {student.connectionScore}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <div className="flex items-center justify-center gap-1.5">
                            {/* Botón Presente */}
                            <button
                              type="button"
                              onClick={() => handleSetStudentStatus(student.id, 'presente')}
                              className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase transition-all cursor-pointer border ${
                                student.status === 'presente'
                                  ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                                  : 'bg-white hover:bg-emerald-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              ✓ Presente
                            </button>

                            {/* Botón Atraso */}
                            <button
                              type="button"
                              onClick={() => handleSetStudentStatus(student.id, 'atraso')}
                              className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase transition-all cursor-pointer border ${
                                student.status === 'atraso'
                                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                  : 'bg-white hover:bg-amber-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              ⏱ Atraso
                            </button>

                            {/* Botón Justificado */}
                            <button
                              type="button"
                              onClick={() => handleSetStudentStatus(student.id, 'justificado')}
                              className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase transition-all cursor-pointer border ${
                                student.status === 'justificado'
                                  ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                                  : 'bg-white hover:bg-sky-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              📄 Justif.
                            </button>

                            {/* Botón Ausente */}
                            <button
                              type="button"
                              onClick={() => handleSetStudentStatus(student.id, 'ausente')}
                              className={`px-3 py-1 rounded-lg font-black text-[10px] uppercase transition-all cursor-pointer border ${
                                student.status === 'ausente'
                                  ? 'bg-rose-600 text-white border-rose-700 shadow-xs'
                                  : 'bg-white hover:bg-rose-50 text-slate-600 border-slate-200'
                              }`}
                            >
                              ✕ Ausente
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5 font-semibold text-emerald-800">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Firma Digital Docente Habilitada conforme a la Norma Chilena NCh 2728:2015</span>
                </span>
                <button
                  onClick={handleSaveAttendanceSignature}
                  className="bg-[#0284c7] hover:bg-sky-600 text-white font-bold px-4 py-2 rounded-xl shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>Guardar Cambios del Libro</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 4: CALIFICACIONES & EVALUACIONES                                 */}
        {/* ========================================================================= */}
        {activeTab === 'calificaciones' && (
          <motion.div
            key="tab-calificaciones"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Libro de Notas y Calificaciones Oficiales</h3>
                  <p className="text-xs text-slate-600">Escala de 1.0 a 7.0. Nota mínima de aprobación SENCE: 4.0.</p>
                </div>
                <button
                  onClick={() => alert('✓ ¡Calificaciones guardadas y sincronizadas con el sistema SENCE!')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-sm flex items-center gap-2 cursor-pointer transition-all"
                >
                  <CheckCircle2 size={15} />
                  <span>Sincronizar Notas con SENCE</span>
                </button>
              </div>

              {/* Grades Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-3.5">Estudiante</th>
                      <th className="p-3.5">RUT</th>
                      <th className="p-3.5 text-center">M1 (Legislación)</th>
                      <th className="p-3.5 text-center">M2 (Seguridad)</th>
                      <th className="p-3.5 text-center">M3 (Técnicas)</th>
                      <th className="p-3.5 text-center">Examen Final</th>
                      <th className="p-3.5 text-center">Asistencia</th>
                      <th className="p-3.5 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {grades.map(g => (
                      <tr key={g.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 font-bold text-slate-900">{g.name}</td>
                        <td className="p-3.5 font-mono text-slate-500">{g.rut}</td>
                        <td className="p-3.5 text-center font-bold text-sky-700">{g.m1}</td>
                        <td className="p-3.5 text-center font-bold text-sky-700">{g.m2}</td>
                        <td className="p-3.5 text-center font-bold text-sky-700">{g.m3}</td>
                        <td className="p-3.5 text-center font-black text-emerald-700 text-sm">{g.exam}</td>
                        <td className="p-3.5 text-center font-semibold text-slate-700">{g.attendance}%</td>
                        <td className="p-3.5 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            g.status.includes('Aprobado')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}>
                            {g.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* MODAL PARA RESPONDER A ALUMNO */}
      <AnimatePresence>
        {selectedMessage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative space-y-4"
            >
              <button
                onClick={() => setSelectedMessage(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200 uppercase">
                  Respuesta a Consulta
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Responder a {selectedMessage.student}
                </h3>
                <p className="text-xs text-slate-500 font-mono">
                  RUT: {selectedMessage.rut} • Asunto: {selectedMessage.topic}
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700">
                <span className="font-bold text-slate-800 block mb-1">Mensaje del Estudiante:</span>
                "{selectedMessage.message}"
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tu Respuesta / Retroalimentación:</label>
                <textarea
                  rows="4"
                  required
                  placeholder="Escribe aquí tu explicación técnica o indicaciones para el alumno..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-sky-500 focus:bg-white resize-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer border border-slate-200"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSendReply}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-[#0284c7] hover:bg-sky-600 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
                >
                  <Send size={13} />
                  <span>Enviar Respuesta</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL PARA PUBLICAR COMUNICADO OFICIAL */}
      <AnimatePresence>
        {showNewAnnouncementModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative space-y-4"
            >
              <button
                onClick={() => setShowNewAnnouncementModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200 uppercase">
                  Comunicado Oficial a la Clase
                </span>
                <h3 className="text-lg font-bold text-slate-900">
                  Publicar Aviso en "{currentCourse.title}"
                </h3>
              </div>

              <form onSubmit={handleCreateAnnouncement} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Título del Anuncio</label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Fechas de Examen Práctico / Grabación de Clase"
                    value={newAnnouncementTitle}
                    onChange={(e) => setNewAnnouncementTitle(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Detalle del Comunicado</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Escribe las instrucciones o información para todos los estudiantes inscritos..."
                    value={newAnnouncementContent}
                    onChange={(e) => setNewAnnouncementContent(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNewAnnouncementModal(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl cursor-pointer border border-slate-200"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-bold text-white bg-[#00c2b2] hover:bg-teal-500 rounded-xl shadow cursor-pointer flex items-center gap-1.5"
                  >
                    <Send size={13} />
                    <span>Publicar a Toda la Clase</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default TeacherPortalView;
