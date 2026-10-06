import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, 
  MessageSquare, 
  Edit3, 
  Settings, 
  Users, 
  FileText, 
  HelpCircle, 
  Layers, 
  BookOpen, 
  LogOut, 
  User as UserIcon, 
  ChevronDown, 
  Home, 
  ShieldCheck, 
  ExternalLink,
  Sliders,
  FolderKanban,
  Lock,
  SlidersHorizontal,
  ShieldAlert,
  GraduationCap,
  Briefcase,
  Sparkles,
  Award,
  KeyRound,
  FileCheck2,
  Video,
  UploadCloud,
  Clock,
  Menu,
  X,
  ChevronRight,
  CheckCircle2,
  LayoutDashboard,
  Building2,
  Search
} from 'lucide-react';

import CoursesView from './views/CoursesView';
import prevysegLogo from '../assets/images/prevyseg_logo.png';
import SettingsView from './views/SettingsView';
import ParticipantsView from './views/ParticipantsView';
import ReportsView from './views/ReportsView';
import QuestionBankView from './views/QuestionBankView';
import ContentBankView from './views/ContentBankView';
import PersonalAreaView from './views/PersonalAreaView';
import MyCoursesView from './views/MyCoursesView';
import AdminGeneralView from './views/AdminGeneralView';
import SiteAdminView from './views/SiteAdminView';
import ExtraCoursesView from './views/ExtraCoursesView';
import JobBoardView from './views/JobBoardView';
import CourseClassroomView from './views/CourseClassroomView';
import CertificateApprovalView from './views/CertificateApprovalView';
import TeacherPortalView from './views/TeacherPortalView';
import StudentLiveClassesView from './views/StudentLiveClassesView';
import EmployerPortalView from './views/EmployerPortalView';

const LMSLayout = ({ currentUser, onLogout, onReturnHome, initialTab }) => {
  // 1. Identificación 100% Dinámica de Roles basada en base de datos: Administrador, Empleador, Profesor y Estudiante
  const userRole = (currentUser?.rol || '').toUpperCase().trim();
  
  const isRoleAdmin = userRole === 'ADMIN' || 
                      userRole === 'ADMINISTRADOR' ||
                      currentUser?.cargo?.toLowerCase().includes('administrador') || 
                      currentUser?.cargo?.toLowerCase().includes('director');

  const isRoleEmployer = !isRoleAdmin && (
    userRole === 'EMPLOYER' || 
    userRole === 'EMPLEADOR' || 
    userRole === 'EMPRESA' || 
    currentUser?.cargo?.toLowerCase().includes('empleador') || 
    currentUser?.cargo?.toLowerCase().includes('empresa') || 
    currentUser?.cargo?.toLowerCase().includes('reclutador') ||
    currentUser?.cargo?.toLowerCase().includes('rrhh')
  );

  const isRoleTeacher = !isRoleAdmin && !isRoleEmployer && (
    userRole === 'TEACHER' || 
    userRole === 'DOCENTE' || 
    userRole === 'PROFESOR' || 
    currentUser?.cargo?.toLowerCase().includes('docente') || 
    currentUser?.cargo?.toLowerCase().includes('profesor')
  );

  const isRoleStudent = !isRoleAdmin && !isRoleTeacher && !isRoleEmployer;

  // 2. Tab por defecto según el rol:
  const defaultTabForRole = isRoleAdmin 
    ? 'ajustes-sitio' 
    : isRoleEmployer
    ? (initialTab || 'mis-ofertas')
    : isRoleTeacher 
    ? (initialTab === 'docente-panel' || initialTab === 'interaccion' || !initialTab ? 'interaccion-materiales' : initialTab)
    : (initialTab || 'area-personal');

  const [activeNavTab, setActiveNavTab] = useState(defaultTabForRole);
  
  // Estado del Aula Virtual Activa (para reproducir clases)
  const [activeClassroomCourse, setActiveClassroomCourse] = useState(null);

  const [isEditMode, setIsEditMode] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Redireccionar si se desactiva el Modo Edición estando en Banco de Preguntas o Contenido
  useEffect(() => {
    if (!isEditMode && (activeNavTab === 'preguntas' || activeNavTab === 'contenido')) {
      setActiveNavTab('ajustes-sitio');
    }
  }, [isEditMode, activeNavTab]);

  // 3. Definición de Menús Laterales Específicos para cada Rol con Iconos Intuitivos
  
  // A. MENÚ ADMINISTRADOR (Tema Morado / Indigo)
  const adminMenuItems = [
    { 
      id: 'ajustes-sitio', 
      label: 'Ajustes del Sitio', 
      desc: 'Parámetros y Plataforma',
      icon: SlidersHorizontal,
      color: 'text-purple-400'
    },
    { 
      id: 'configuracion', 
      label: 'Gestión de Cursos', 
      desc: 'Mallas y Programas SENCE',
      icon: BookOpen,
      color: 'text-sky-400'
    },
    { 
      id: 'participantes', 
      label: 'Usuarios y Alumnos', 
      desc: 'Matrículas y Roles',
      icon: Users,
      color: 'text-emerald-400'
    },
    { 
      id: 'certificados', 
      label: 'Emisión de Certificados', 
      desc: 'Acreditación SPD / SENCE',
      icon: Award,
      color: 'text-amber-400'
    },
    { 
      id: 'informes', 
      label: 'Informes & Auditoría', 
      desc: 'Asistencia y Marcación',
      icon: FileText,
      color: 'text-cyan-400'
    },
    // Secciones avanzadas: sólo visibles cuando el Administrador activa el "Modo Edición"
    ...(isEditMode ? [
      { 
        id: 'preguntas', 
        label: 'Banco de Preguntas', 
        desc: 'Exámenes y Reactivos',
        icon: HelpCircle,
        color: 'text-pink-400'
      },
      { 
        id: 'contenido', 
        label: 'Banco de Contenido', 
        desc: 'Archivos y SCORM',
        icon: Layers,
        color: 'text-indigo-400'
      },
    ] : [])
  ];

  // B. MENÚ PROFESOR / DOCENTE (Tema Azul Cielo / Marino)
  const teacherMenuItems = [
    { 
      id: 'interaccion-materiales', 
      label: 'Interacción & Materiales', 
      desc: 'Avisos, Mensajes y Repositorio de PDFs',
      icon: MessageSquare,
      color: 'text-sky-400'
    },
    { 
      id: 'aula-vivo', 
      label: 'Gestión Sala Zoom', 
      desc: 'Crear, Iniciar y Configurar Clase',
      icon: Video,
      color: 'text-cyan-400'
    },
    { 
      id: 'asistencia', 
      label: 'Libro de Clases SENCE', 
      desc: 'Control y Toma de Asistencia en Vivo',
      icon: Clock,
      color: 'text-emerald-400'
    },
    { 
      id: 'calificaciones', 
      label: 'Calificaciones & Notas', 
      desc: 'Planilla Oficial SENCE',
      icon: Award,
      color: 'text-amber-400'
    },
  ];

  // C. MENÚ ESTUDIANTE / ALUMNO (Tema Verde Azulado / Esmeralda)
  const studentMenuItems = [
    { 
      id: 'area-personal', 
      label: 'Área Personal', 
      desc: 'Mi Resumen Académico',
      icon: LayoutDashboard,
      color: 'text-teal-400'
    },
    { 
      id: 'aula-vivo', 
      label: 'Clases en Vivo & Zoom', 
      desc: 'Videollamadas, Horarios y Materiales',
      icon: Video,
      color: 'text-cyan-400'
    },
    { 
      id: 'mis-cursos', 
      label: 'Mis Cursos', 
      desc: 'Aula Virtual & Avance',
      icon: BookOpen,
      color: 'text-sky-400'
    },
    { 
      id: 'capacitaciones-extras', 
      label: 'Capacitaciones Extras', 
      desc: 'Cursos Complementarios',
      icon: GraduationCap,
      color: 'text-indigo-400'
    },
    { 
      id: 'bolsa-empleo', 
      label: 'Bolsa de Empleo', 
      desc: 'Ofertas Macro Zona Norte',
      icon: Briefcase,
      color: 'text-emerald-400'
    },
  ];

  // D. MENÚ EMPLEADOR / EMPRESAS (Tema Dorado / Ámbar Corporativo)
  const employerMenuItems = [
    { 
      id: 'mis-ofertas', 
      label: 'Mis Ofertas Laborales', 
      desc: 'Publicar y Gestionar Vacantes',
      icon: Briefcase,
      color: 'text-amber-400'
    },
    { 
      id: 'postulantes', 
      label: 'Postulantes & Alumnos', 
      desc: 'Revisión de Perfiles y CVs',
      icon: Users,
      color: 'text-orange-400'
    },
    { 
      id: 'talento', 
      label: 'Búsqueda de Egresados', 
      desc: 'Oficios & Seguridad Certificados',
      icon: Search,
      color: 'text-yellow-400'
    },
  ];

  // Selección de items y estilos según el rol actual
  const currentMenuItems = isRoleAdmin 
    ? adminMenuItems 
    : isRoleEmployer
    ? employerMenuItems
    : isRoleTeacher 
    ? teacherMenuItems 
    : studentMenuItems;

  const roleStyles = isRoleAdmin ? {
    themeName: 'admin',
    badgeText: 'Panel Administrador OTEC',
    badgeClass: 'bg-purple-50 border-purple-200 text-purple-700 shadow-sm',
    activeNavClass: 'bg-purple-50 text-purple-900 border-purple-300 shadow-sm font-bold',
    activeIconBg: 'bg-purple-600 text-white shadow-sm',
    avatarGradient: 'bg-gradient-to-tr from-purple-600 to-indigo-600',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-purple-200',
    tagText: 'text-purple-700 font-mono',
    breadcrumbColor: 'text-purple-700',
    statusTag: 'SENCE & SPD Conectado ✓'
  } : isRoleEmployer ? {
    themeName: 'employer',
    badgeText: 'Portal Empresas & Empleadores',
    badgeClass: 'bg-amber-50 border-amber-200 text-amber-800 shadow-sm',
    activeNavClass: 'bg-amber-50 text-amber-900 border-amber-300 shadow-sm font-bold',
    activeIconBg: 'bg-[#d97706] text-white shadow-sm',
    avatarGradient: 'bg-gradient-to-tr from-[#d97706] to-amber-500',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-amber-200',
    tagText: 'text-amber-800 font-mono',
    breadcrumbColor: 'text-amber-700',
    statusTag: 'Empresa Verificada PrevySeg ✓'
  } : isRoleTeacher ? {
    themeName: 'teacher',
    badgeText: 'Panel Docente / Instructor',
    badgeClass: 'bg-sky-50 border-sky-200 text-sky-700 shadow-sm',
    activeNavClass: 'bg-sky-50 text-sky-900 border-sky-300 shadow-sm font-bold',
    activeIconBg: 'bg-[#0284c7] text-white shadow-sm',
    avatarGradient: 'bg-gradient-to-tr from-[#0284c7] to-sky-400',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-sky-200',
    tagText: 'text-sky-700 font-mono',
    breadcrumbColor: 'text-sky-700',
    statusTag: 'Firma Digital Docente Habilitada ✓'
  } : {
    themeName: 'student',
    badgeText: 'Portal del Estudiante',
    badgeClass: 'bg-teal-50 border-teal-200 text-teal-700 shadow-sm',
    activeNavClass: 'bg-teal-50 text-teal-900 border-teal-300 shadow-sm font-bold',
    activeIconBg: 'bg-[#00c2b2] text-white shadow-sm',
    avatarGradient: 'bg-gradient-to-tr from-[#00c2b2] to-emerald-500',
    scrollbarThumb: '[&::-webkit-scrollbar-thumb]:bg-teal-200',
    tagText: 'text-teal-700 font-mono',
    breadcrumbColor: 'text-teal-700',
    statusTag: 'ClaveÚnica & SENCE Alumno Activo ✓'
  };

  const handleSelectCourse = (course) => {
    setActiveClassroomCourse(course || 'Curso de formación Guardia de Seguridad online');
  };

  const handleSidebarItemClick = (itemId) => {
    if (itemId === 'aula-vivo') {
      setActiveClassroomCourse('Curso de Formación Guardia de Seguridad (Credencial SPD)');
      setActiveNavTab('aula-vivo');
    } else {
      setActiveClassroomCourse(null);
      setActiveNavTab(itemId);
    }
    setMobileSidebarOpen(false);
  };

  const userInitials = currentUser?.nombre 
    ? currentUser.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  const activeItemLabel = currentMenuItems.find(i => i.id === activeNavTab)?.label || 'Panel';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row font-['Inter',sans-serif] selection:bg-[#00c2b2] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. BARRA LATERAL IZQUIERDA UNIFICADA Y DESPLAZABLE (DESKTOP)             */}
      {/* ========================================================================= */}
      <aside className={`hidden lg:flex lg:flex-col w-72 bg-white border-r border-slate-200 sticky top-0 h-screen z-40 overflow-y-auto scroll-smooth p-5 shadow-sm space-y-6 [&::-webkit-scrollbar]:w-1.5 ${roleStyles.scrollbarThumb} [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent`}>
        
        {/* Header Institucional de la Barra Lateral */}
        <div className="space-y-3 pb-4 border-b border-slate-200 flex-shrink-0">
          <div 
            onClick={onReturnHome}
            className="cursor-pointer select-none group py-1"
            title="Volver al Sitio Web PrevySeg"
          >
            <img 
              src={prevysegLogo} 
              alt="PrevySeg - Organismos Técnicos de Capacitación" 
              className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wider ${roleStyles.badgeClass}`}>
            <ShieldCheck size={13} />
            <span>{roleStyles.badgeText}</span>
          </div>
        </div>

        {/* Lista de Menú Lateral del Rol con Iconos Claros */}
        <div className="space-y-1.5 flex-1">
          <div className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider px-3 pb-1">
            {isRoleAdmin ? 'Gestión OTEC & Auditoría' : isRoleEmployer ? 'Gestión de Reclutamiento' : isRoleTeacher ? 'Módulos de Instrucción' : 'Mi Portal Académico'}
          </div>

          {currentMenuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeNavTab === item.id && !activeClassroomCourse;
            const isAulaActive = item.id === 'aula-vivo' && activeClassroomCourse;

            return (
              <button
                key={item.id}
                onClick={() => handleSidebarItemClick(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-bold transition-all cursor-pointer text-left group ${
                  (isActive || isAulaActive)
                    ? `${roleStyles.activeNavClass} border` 
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    (isActive || isAulaActive) 
                      ? roleStyles.activeIconBg 
                      : 'bg-slate-100 text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-200'
                  }`}>
                    <IconComponent size={16} />
                  </div>
                  <div>
                    <div className={`leading-tight ${(isActive || isAulaActive) ? 'text-slate-900 font-black' : 'text-slate-700'}`}>
                      {item.label}
                    </div>
                    <div className="text-[10px] text-slate-500 font-normal leading-tight">
                      {item.desc}
                    </div>
                  </div>
                </div>

                {(isActive || isAulaActive) && (
                  <ChevronRight size={14} className="opacity-80 text-slate-700" />
                )}
              </button>
            );
          })}
        </div>

        {/* Footer de la Barra Lateral (Modo Edición para Admin + Perfil + Salida) */}
        <div className="pt-4 border-t border-slate-200 space-y-3 flex-shrink-0">
          
          {/* Switch Modo Edición (Solo Administrador) */}
          {isRoleAdmin && (
            <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                <Edit3 size={13} className="text-amber-500" />
                <span>Modo Edición</span>
              </span>
              <button
                type="button"
                onClick={() => setIsEditMode(!isEditMode)}
                className={`relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ${
                  isEditMode ? 'bg-purple-600' : 'bg-slate-300'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
                    isEditMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Tarjeta de Perfil del Usuario */}
          <div className="flex items-center gap-2.5 p-2 bg-slate-50 rounded-2xl border border-slate-200">
            <div className={`w-8 h-8 rounded-full ${roleStyles.avatarGradient} text-white font-bold text-xs flex items-center justify-center flex-shrink-0 shadow`}>
              {userInitials}
            </div>
            <div className="overflow-hidden text-left text-xs flex-1">
              <div className="font-bold text-slate-900 truncate">{currentUser?.nombre || 'Usuario PrevySeg'}</div>
              <div className={`text-[10px] font-mono truncate ${roleStyles.tagText}`}>{currentUser?.rut || '15692858-5'}</div>
            </div>
          </div>

          {/* Botones de Acción y Salida */}
          <div className="flex gap-2">
            <button
              onClick={onReturnHome}
              className="flex-1 bg-white hover:bg-slate-100 text-slate-700 hover:text-slate-900 p-2.5 rounded-xl text-[11px] font-bold border border-slate-200 flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-sm"
              title="Volver a la Web Pública"
            >
              <Home size={13} className="text-[#00c2b2]" />
              <span>Web Pública</span>
            </button>

            <button
              onClick={onLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 p-2.5 rounded-xl text-[11px] font-bold border border-red-200 flex items-center justify-center cursor-pointer transition-colors shadow-sm"
              title="Cerrar Sesión"
            >
              <LogOut size={14} />
            </button>
          </div>

        </div>

      </aside>

      {/* ========================================================================= */}
      {/* 2. HEADER MÓVIL (PANTALLAS PEQUEÑAS)                                      */}
      {/* ========================================================================= */}
      <header className="lg:hidden bg-white border-b border-slate-200 p-4 sticky top-0 z-50 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 bg-slate-100 rounded-xl text-slate-700 border border-slate-200 cursor-pointer hover:bg-slate-200 transition-colors"
          >
            {mobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div onClick={onReturnHome} className="cursor-pointer py-1 select-none">
            <img 
              src={prevysegLogo} 
              alt="PrevySeg" 
              className="h-7 w-auto object-contain"
            />
          </div>
        </div>

        <div className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${roleStyles.badgeClass}`}>
          {activeItemLabel}
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 p-4 space-y-2 z-40 shadow-lg"
          >
            {currentMenuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeNavTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSidebarItemClick(item.id)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-left ${
                    isActive ? roleStyles.activeNavClass : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <IconComponent size={16} />
                  <span>{item.label}</span>
                </button>
              );
            })}
            <div className="pt-2 border-t border-slate-200 flex justify-between gap-2">
              <button onClick={onReturnHome} className="flex-1 bg-slate-100 hover:bg-slate-200 p-2.5 rounded-xl text-xs font-bold text-slate-700">Web Pública</button>
              <button onClick={onLogout} className="bg-red-50 hover:bg-red-100 p-2.5 rounded-xl text-xs font-bold text-red-600 border border-red-200">Cerrar Sesión</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 3. ÁREA DE CONTENIDO PRINCIPAL SEGÚN EL ROL                               */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Bar Superior del Área de Trabajo */}
        <div className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className={`font-bold uppercase tracking-wider text-[10px] ${roleStyles.breadcrumbColor}`}>
              {isRoleAdmin ? 'Administración OTEC' : isRoleEmployer ? 'Bolsa de Empleo y Contratación' : isRoleTeacher ? 'Instrucción Docente' : 'Campus Virtual'}
            </span>
            <span>/</span>
            <span className="text-slate-900 font-bold">
              {activeClassroomCourse ? 'Aula Virtual Sincrónica en Vivo' : activeItemLabel}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isEditMode && isRoleAdmin && (
              <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-300 flex items-center gap-1 shadow-sm">
                <Edit3 size={11} /> Edición Activa
              </span>
            )}
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 hidden sm:inline-block shadow-sm">
              {roleStyles.statusTag}
            </span>
          </div>
        </div>

        {/* Vistas Dinámicas */}
        <main className="p-4 sm:p-6 lg:p-8 flex-1 max-w-[1500px] w-full mx-auto">
          <AnimatePresence mode="wait">
            
            {/* Reproductor de Aula Virtual si está activa */}
            {activeClassroomCourse ? (
              <motion.div
                key="classroom"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <CourseClassroomView 
                  courseTitle={activeClassroomCourse} 
                  onBack={() => setActiveClassroomCourse(null)} 
                />
              </motion.div>
            ) : isRoleAdmin ? (
              
              /* ================= 1. VISTAS DEL ADMINISTRADOR ================= */
              <motion.div
                key={`admin-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeNavTab === 'ajustes-sitio' && (
                  <SiteAdminView currentUser={currentUser} />
                )}
                {activeNavTab === 'configuracion' && (
                  <SettingsView isEditMode={isEditMode} currentUser={currentUser} />
                )}
                {activeNavTab === 'participantes' && (
                  <ParticipantsView isEditMode={isEditMode} />
                )}
                {activeNavTab === 'certificados' && (
                  <CertificateApprovalView currentUser={currentUser} />
                )}
                {activeNavTab === 'informes' && (
                  <ReportsView isEditMode={isEditMode} currentUser={currentUser} />
                )}
                {activeNavTab === 'preguntas' && (
                  <QuestionBankView isEditMode={isEditMode} />
                )}
                {activeNavTab === 'contenido' && (
                  <ContentBankView isEditMode={isEditMode} />
                )}
              </motion.div>

            ) : isRoleEmployer ? (

              /* ================= 2. VISTAS DEL EMPLEADOR / EMPRESAS ================= */
              <motion.div
                key={`employer-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <EmployerPortalView 
                  currentUser={currentUser} 
                  activeTab={activeNavTab}
                  onTabChange={(tab) => setActiveNavTab(tab)}
                  onSelectCourse={handleSelectCourse}
                />
              </motion.div>

            ) : isRoleTeacher ? (

              /* ================= 3. VISTAS DEL PROFESOR / DOCENTE ================= */
              <motion.div
                key={`teacher-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                <TeacherPortalView 
                  currentUser={currentUser} 
                  onSelectCourse={handleSelectCourse} 
                  activeTab={activeNavTab}
                  onTabChange={(tab) => setActiveNavTab(tab)}
                />
              </motion.div>

            ) : (

              /* ================= 3. VISTAS DEL ESTUDIANTE / ALUMNO ================= */
              <motion.div
                key={`student-${activeNavTab}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {activeNavTab === 'area-personal' && (
                  <PersonalAreaView 
                    currentUser={currentUser} 
                    onSelectCourse={handleSelectCourse} 
                    onNavigateTab={(tab) => setActiveNavTab(tab)} 
                  />
                )}
                {activeNavTab === 'aula-vivo' && (
                  <StudentLiveClassesView currentUser={currentUser} onSelectCourse={handleSelectCourse} />
                )}
                {activeNavTab === 'mis-cursos' && (
                  <MyCoursesView currentUser={currentUser} onSelectCourse={handleSelectCourse} isEditMode={false} />
                )}
                {activeNavTab === 'capacitaciones-extras' && (
                  <ExtraCoursesView currentUser={currentUser} />
                )}
                {activeNavTab === 'bolsa-empleo' && (
                  <JobBoardView currentUser={currentUser} />
                )}
              </motion.div>

            )}

          </AnimatePresence>
        </main>

        {/* Footer del LMS */}
        <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs py-3.5 px-6 text-center">
          <span>PrevySeg LMS - Integración SENCE NCh 2728 & Subsecretaría de Prevención del Delito (SPD) • © 2026</span>
        </footer>

      </div>

    </div>
  );
};

export default LMSLayout;
