import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, 
  Calendar, 
  Clock, 
  Download, 
  ExternalLink, 
  FileText, 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Play, 
  Sparkles, 
  AlertCircle, 
  MessageSquare, 
  ShieldCheck, 
  FolderDown,
  Layers,
  ChevronRight,
  Eye,
  FileCode,
  Award,
  Radio,
  Copy,
  Check,
  Search,
  Filter,
  PhoneCall,
  Info,
  Lock
} from 'lucide-react';
import { supabase, isCctvSpecialCourse, getCctvActiveStatus, requestCctvApproval } from '../../config/supabase';
import { OFFICIAL_COURSES } from '../../components/EnrollmentForm';
import CctvStudyPortal from '../components/CctvStudyPortal';

export const StudentLiveClassesView = ({ currentUser, onSelectCourse }) => {
  // 1. Estados de selección de curso
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(0);
  const [copiedField, setCopiedField] = useState(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [activeMaterialTab, setActiveMaterialTab] = useState('todos');
  const [searchMaterial, setSearchMaterial] = useState('');
  const [cctvStatus, setCctvStatus] = useState(null);
  const [studentCctvRequest, setStudentCctvRequest] = useState(null);
  const [requestingCctv, setRequestingCctv] = useState(false);
  
  // Cargar estado de habilitación de CCTV
  useEffect(() => {
    let isMounted = true;
    getCctvActiveStatus(null, currentUser?.id).then(status => {
      if (isMounted) setCctvStatus(status);
    });
    return () => { isMounted = false; };
  }, [currentUser?.id]);

  // Cargar estado de solicitud de aprobación del alumno para CCTV
  useEffect(() => {
    if (!currentUser?.rut && !currentUser?.id) return;
    let isMounted = true;
    const fetchMyRequest = async () => {
      try {
        const { data } = await supabase
          .from('cctv_approval_requests')
          .select('*')
          .or(`user_id.eq.${currentUser.id || '00000000-0000-0000-0000-000000000000'},rut.eq.${currentUser.rut || ''}`)
          .maybeSingle();
        if (isMounted) setStudentCctvRequest(data);
      } catch (err) {
        console.warn('Error al consultar estado de solicitud CCTV del alumno:', err);
      }
    };
    fetchMyRequest();
    return () => { isMounted = false; };
  }, [currentUser]);

  const handleStudentRequestCctv = async () => {
    setRequestingCctv(true);
    try {
      await requestCctvApproval({
        userId: currentUser?.id || null,
        rut: currentUser?.rut || currentUser?.user || '11.111.111-1',
        nombre: currentUser?.nombre || 'Estudiante PrevySeg',
        email: currentUser?.email || null,
        telefono: currentUser?.telefono || null,
        notas: 'Solicitud enviada por el estudiante desde el aula virtual'
      });
      setStudentCctvRequest({
        estado_aprobacion: 'PENDIENTE',
        visto_bueno: false,
        created_at: new Date().toISOString()
      });
    } catch (err) {
      console.error(err);
      alert('Error al enviar solicitud: ' + (err.message || 'Error en el servidor'));
    } finally {
      setRequestingCctv(false);
    }
  };

  // Modal de previsualización de documento
  const [previewDoc, setPreviewDoc] = useState(null);
  // Modal de reproductor de clase grabada
  const [selectedRecording, setSelectedRecording] = useState(null);

  // Estado de la sala Zoom activa (creada y administrada por el docente)
  const [activeZoomRoom, setActiveZoomRoom] = useState(() => {
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

  // Sincronización en tiempo real cuando el profesor actualiza la sala Zoom
  useEffect(() => {
    const handleZoomUpdate = () => {
      try {
        const saved = localStorage.getItem('prevyseg_active_zoom_room');
        if (saved) setActiveZoomRoom(JSON.parse(saved));
      } catch (e) {}
    };

    window.addEventListener('prevyseg_zoom_updated', handleZoomUpdate);
    window.addEventListener('storage', handleZoomUpdate);
    return () => {
      window.removeEventListener('prevyseg_zoom_updated', handleZoomUpdate);
      window.removeEventListener('storage', handleZoomUpdate);
    };
  }, []);

  // 2. Cursos matriculados (con fallback realista de PrevySeg)
  const studentCourses = [
    {
      id: 'ggss-form-online',
      title: 'GGSS Formación Guardia de Seguridad Online',
      code: 'OS10-FO-02',
      senceCode: '1238008921',
      category: 'Seguridad Privada SPD',
      type: 'spd',
      modality: 'Online Sincrónico SENCE',
      totalHours: '90 Horas',
      progress: 68,
      instructor: {
        name: 'Mayor (R) Marcelo Valenzuela Díaz',
        role: 'Docente Titular Acreditado SPD / OS-10',
        phone: '+56 9 8231 2128',
        email: 'docencia.valenzuela@prevyseg.cl'
      },
      schedule: {
        days: 'Lunes, Miércoles y Viernes',
        time: '19:00 - 21:30 hrs (Horario Chile)',
        hoursPerSession: '2.5 hrs pedagógicas',
        minAttendance: '85% Conexión Sincrónica Exigida'
      },
      meetingLinks: {
        zoomUrl: 'https://zoom.us/j/84920194821',
        meetingId: '849 2019 4821',
        passcode: 'SALA-VIRTUAL',
        meetUrl: 'https://meet.google.com/qwa-prevyseg-2026',
        jitsiUrl: 'https://meet.jit.si/PrevySeg-AulaVirtual-OS10-2026'
      },
      currentLiveStatus: {
        isLiveNow: true,
        title: 'Clase N° 7: Legislación de Seguridad Privada y Nueva Ley N° 21.659',
        module: 'Módulo 2: Marco Jurídico y Derechos Humanos',
        connectedStudents: 26,
        startTime: '19:00 hrs',
        endTime: '21:30 hrs'
      },
      upcomingSessions: [
        {
          num: 7,
          date: 'Hoy',
          fullDate: '07 Septiembre, 2026',
          time: '19:00 - 21:30 hrs',
          title: 'Legislación de Seguridad Privada y Ley N° 21.659',
          instructor: 'Mayor (R) M. Valenzuela',
          status: 'live'
        },
        {
          num: 8,
          date: 'Miércoles',
          fullDate: '09 Septiembre, 2026',
          time: '19:00 - 21:30 hrs',
          title: 'Procedimientos Operativos de Vigilancia y Control de Accesos',
          instructor: 'Mayor (R) M. Valenzuela',
          status: 'upcoming'
        },
        {
          num: 9,
          date: 'Viernes',
          fullDate: '11 Septiembre, 2026',
          time: '19:00 - 21:30 hrs',
          title: 'Técnicas de Rondín, Radiocomunicación y Registro de Incidentes',
          instructor: 'Instructor José Tapia',
          status: 'upcoming'
        },
        {
          num: 10,
          date: 'Lunes',
          fullDate: '14 Septiembre, 2026',
          time: '19:00 - 21:30 hrs',
          title: 'Taller Práctico de Primeros Auxilios, RCP y Manejo de DEA',
          instructor: 'Dra. Karen Morales',
          status: 'upcoming'
        },
        {
          num: 11,
          date: 'Miércoles',
          fullDate: '16 Septiembre, 2026',
          time: '19:00 - 21:30 hrs',
          title: 'Evacuación y Prevención ante Emergencias y Sismos (Zona Norte)',
          instructor: 'Ing. Rodrigo Sánchez',
          status: 'upcoming'
        },
        {
          num: 12,
          date: 'Viernes',
          fullDate: '18 Septiembre, 2026',
          time: '19:00 - 21:30 hrs',
          title: 'Simulacro de Examen Oficial Teórico ante la SPD / OS-10',
          instructor: 'Mayor (R) M. Valenzuela',
          status: 'upcoming'
        }
      ],
      materials: [
        {
          id: 'mat-01',
          category: 'manuales',
          title: 'Manual Oficial de Formación de Guardias de Seguridad Privada',
          filename: 'Manual_Oficial_GGSS_OS10_PrevySeg_2026.pdf',
          size: '8.4 MB',
          type: 'PDF',
          updatedAt: '02 Septiembre, 2026',
          author: 'Dirección Académica OTEC PrevySeg',
          description: 'Texto de estudio obligatorio que cubre las 90 horas del programa, incluyendo marco legal, primeros auxilios y técnicas de seguridad.',
          downloadUrl: '#'
        },
        {
          id: 'mat-02',
          category: 'manuales',
          title: 'Compendio Normativo: Ley N° 21.659 de Seguridad Privada y D.L. 3.607',
          filename: 'Compendio_Leyes_Seguridad_Privada_Chile.pdf',
          size: '2.3 MB',
          type: 'PDF',
          updatedAt: '28 Agosto, 2026',
          author: 'Área Legal PrevySeg',
          description: 'Cuerpo normativo actualizado con las atribuciones, deberes y sanciones legales vigentes para el personal de vigilancia.',
          downloadUrl: '#'
        },
        {
          id: 'mat-03',
          category: 'diapositivas',
          title: 'Presentación Clase 01-04: Marco Jurídico, Derechos y Deberes',
          filename: 'Diapositivas_Modulo_01_Marco_Juridico.pptx',
          size: '14.8 MB',
          type: 'PPTX',
          updatedAt: '03 Septiembre, 2026',
          author: 'Mayor (R) Marcelo Valenzuela',
          description: 'Diapositivas de clase con infografías y casos de estudio analizados en las sesiones de videoconferencia sincrónica.',
          downloadUrl: '#'
        },
        {
          id: 'mat-04',
          category: 'diapositivas',
          title: 'Presentación Clase 05-08: Control de Accesos y Detección de Amenazas',
          filename: 'Diapositivas_Modulo_02_Técnicas_Vigilancia.pptx',
          size: '18.2 MB',
          type: 'PPTX',
          updatedAt: '05 Septiembre, 2026',
          author: 'Mayor (R) Marcelo Valenzuela',
          description: 'Protocolos de cacheo, inspección vehicular, control de paquetería y uso de torniquetes y detectores de metales.',
          downloadUrl: '#'
        },
        {
          id: 'mat-05',
          category: 'guias',
          title: 'Balotario de 200 Preguntas para Examen Oficial ante la SPD',
          filename: 'Simulador_200_Preguntas_Examen_SPD_OS10.pdf',
          size: '3.6 MB',
          type: 'PDF',
          updatedAt: '04 Septiembre, 2026',
          author: 'Equipo Técnico Pedagógico',
          description: 'Banco de preguntas tipo test de opción múltiple con pauta de corrección para entrenamiento previo al examen de acreditación.',
          downloadUrl: '#'
        },
        {
          id: 'mat-06',
          category: 'guias',
          title: 'Guía de Actuación en Primeros Auxilios, RCP y Uso de Desfibrilador (DEA)',
          filename: 'Guia_Emergencias_Medicas_y_RCP_PrevySeg.pdf',
          size: '4.1 MB',
          type: 'PDF',
          updatedAt: '01 Septiembre, 2026',
          author: 'Dra. Karen Morales',
          description: 'Algoritmo de soporte vital básico para incidentes en recintos vigilados, centros comerciales y recintos portuarios.',
          downloadUrl: '#'
        },
        {
          id: 'mat-07',
          category: 'formularios',
          title: 'Ficha Modelo de Registro de Novedades y Libro de Guardia',
          filename: 'Formato_Libro_Novedades_Guardia.docx',
          size: '1.2 MB',
          type: 'DOCX',
          updatedAt: '30 Agosto, 2026',
          author: 'Instructor José Tapia',
          description: 'Plantilla estandarizada para el llenado formal de la bitácora operativa requerida por Carabineros de Chile.',
          downloadUrl: '#'
        }
      ],
      recordings: [
        {
          id: 'rec-06',
          classNum: 6,
          title: 'Resolución de Conflictos y Técnicas de Contención Verbal',
          date: '04 Septiembre, 2026',
          duration: '2h 15m',
          instructor: 'Mayor (R) M. Valenzuela',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: 'rec-05',
          classNum: 5,
          title: 'Decreto Ley N° 3.607 y Atribuciones de la Autoridad Fiscalizadora',
          date: '02 Septiembre, 2026',
          duration: '2h 08m',
          instructor: 'Mayor (R) M. Valenzuela',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        },
        {
          id: 'rec-04',
          classNum: 4,
          title: 'Derechos Humanos Aplicados a la Función de Seguridad',
          date: '31 Agosto, 2026',
          duration: '2h 00m',
          instructor: 'Mayor (R) M. Valenzuela',
          videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
        }
      ]
    },
    {
      id: 'cctv-online',
      title: 'Técnicas de operación CCTV y alarmas de seguridad privada',
      code: 'CCTV-ALARM-09',
      senceCode: 'CCTV-ALARM-09',
      category: 'Escuela de Seguridad Privada • Tecnología y Sistemas',
      type: 'seguridad',
      modality: 'Autoaprendizaje Documental (30 Días)',
      totalHours: '65 Horas',
      progress: 0,
      isSpecialCctv: true,
      instructor: {
        name: 'Sin Profesor Docente Asignado',
        role: 'Modalidad de Autoestudio Asincrónico con Manuales Técnicos',
        phone: '+56 9 8231 2128',
        email: 'soporte.alumnos@prevyseg.cl'
      },
      schedule: {
        days: 'Acceso Continuo 24/7 (30 Días Corridos)',
        time: 'Horario Libre / Autoformación',
        hoursPerSession: 'Estudio de biblioteca técnica a ritmo individual',
        minAttendance: 'Revisión y lectura del 100% de la documentación'
      },
      meetingLinks: {
        zoomUrl: '#',
        meetingId: 'No Aplica',
        passcode: 'No Aplica',
        meetUrl: '#',
        jitsiUrl: '#'
      },
      currentLiveStatus: {
        isLiveNow: false,
        title: 'Módulo de Autoestudio: Documentación Técnica de CCTV y Alarmas',
        module: 'Capacitación Individual sin Clases Sincrónicas',
        connectedStudents: 1,
        startTime: 'Acceso Continuo',
        endTime: 'Vence en 30 días'
      },
      upcomingSessions: [],
      materials: [],
      recordings: []
    }
  ];

  const currentCourse = studentCourses[selectedCourseIndex] || studentCourses[0];
  const isCurrentCourseCctv = isCctvSpecialCourse(currentCourse);
  const isCctvAuthorized = Boolean(
    currentUser?.rol === 'ADMIN' ||
    cctvStatus?.is_user_active ||
    cctvStatus?.user_id === currentUser?.id ||
    (cctvStatus?.active_students && cctvStatus.active_students.some(s => s.user_id === currentUser?.id || s.student_rut === currentUser?.rut))
  );

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2500);
    });
  };

  const handleMarkAttendance = () => {
    setAttendanceMarked(true);
    setTimeout(() => {
      alert(`✓ ¡Asistencia registrada exitosamente ante el sistema SENCE! \nEstudiante: ${currentUser?.nombre || 'Alumno'} \nFecha y Hora: ${new Date().toLocaleString('es-CL')}`);
    }, 400);
  };

  const handleSimulateDownload = (doc) => {
    alert(`Iniciando descarga segura de: "${doc.title}" (${doc.size})\nDesde el servidor institucional de PrevySeg.`);
  };

  const filteredMaterials = (currentCourse?.materials || []).filter((m) => {
    const matchesCategory = activeMaterialTab === 'todos' || m.category === activeMaterialTab;
    const matchesSearch = (m.title || '').toLowerCase().includes(searchMaterial.toLowerCase()) || 
                          (m.filename || '').toLowerCase().includes(searchMaterial.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* 1. Header Principal con Selector de Cursos Matriculados */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider">
            <Radio size={14} className="text-teal-600 animate-pulse" />
            <span>Aula Virtual Sincrónica en Vivo</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Clases en Vivo & Materiales Oficiales
          </h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Conéctate a tus sesiones por Zoom, revisa tus horarios semanales y descarga los manuales oficiales de tu curso.
          </p>
        </div>

        {/* Selector de Cursos si tiene más de uno */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
          <label className="text-xs font-bold text-slate-500 flex items-center gap-1.5 self-center sm:self-auto">
            <BookOpen size={14} className="text-[#0284c7]" />
            <span>Mi Curso Activo:</span>
          </label>
          <div className="relative">
            <select
              value={selectedCourseIndex}
              onChange={(e) => setSelectedCourseIndex(Number(e.target.value))}
              className="bg-slate-50 hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm py-2.5 px-4 pr-10 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#00A896] cursor-pointer appearance-none shadow-xs transition-all w-full"
            >
              {studentCourses.map((course, idx) => {
                const isCctv = isCctvSpecialCourse(course);
                const isUserActive = cctvStatus?.has_active && (cctvStatus.user_id === currentUser?.id || currentUser?.rol === 'ADMIN');
                
                return (
                  <option key={course.id} value={idx}>
                    {course.title} ({course.totalHours}) {isCctv ? (isUserActive ? '• [Autoestudio 30 Días ACTIVO ✓]' : '• [Acceso Individual]') : ''}
                  </option>
                );
              })}
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
              ▼
            </div>
          </div>
        </div>
      </div>

      {isCurrentCourseCctv ? (
        isCctvAuthorized ? (
          <CctvStudyPortal currentUser={currentUser} cctvStatus={cctvStatus?.user_activation || cctvStatus} />
        ) : (
          <div className="bg-white border-2 border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-sm space-y-5 animate-in fade-in">
            <div className="w-16 h-16 rounded-3xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto border border-amber-200">
              <Lock size={32} />
            </div>
            <div className="space-y-2">
              <span className="text-[11px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 px-3 py-1 rounded-full border border-amber-200">
                Capacitación Individual de Autoestudio CCTV
              </span>
              <h2 className="text-2xl font-black text-slate-900">
                Habilitación No Activa para tu Cuenta
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
                El curso de <strong>Técnicas de Operación CCTV y Alarmas de Seguridad Privada</strong> se imparte mediante una modalidad especial de autoestudio documental individual (sin clases virtuales sincrónicas ni profesor docente) y <strong>se habilita de manera personal</strong> por un plazo de 30 días a contar del visto bueno administrativo.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 text-left space-y-2 max-w-lg mx-auto">
              <strong className="block text-slate-900 font-bold">Estado de tu Solicitud de Capacitación CCTV:</strong>
              
              {studentCctvRequest?.visto_bueno ? (
                <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-300 text-teal-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-teal-800">
                    <CheckCircle2 size={16} className="text-teal-600" />
                    <span>¡Solicitud Aprobada con Visto Bueno Oficial!</span>
                  </div>
                  <p className="text-[11px] text-teal-700">
                    La administración otorgó el visto bueno a tu postulación. Tu cupo individual de 30 días será incorporado próximamente para comenzar tu autoestudio.
                  </p>
                </div>
              ) : studentCctvRequest?.estado_aprobacion === 'PENDIENTE' ? (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-950 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800">
                    <Clock size={16} className="text-amber-600 animate-spin" />
                    <span>Solicitud de Aprobación en Revisión</span>
                  </div>
                  <p className="text-[11px] text-amber-800">
                    Tu solicitud fue ingresada el {studentCctvRequest.created_at ? new Date(studentCctvRequest.created_at).toLocaleDateString('es-CL') : 'recientemente'} y se encuentra en revisión en la vista de administración (Gestión de Cursos CCTV) para otorgar el visto bueno.
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <p className="text-[11px] text-slate-600">
                    Para ingresar a este programa individual, debes enviar una solicitud de aprobación para que la administración evalúe y otorgue el visto bueno a tu cupo.
                  </p>
                  <button
                    type="button"
                    onClick={handleStudentRequestCctv}
                    disabled={requestingCctv}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-[#0284c7] hover:from-sky-500 hover:to-sky-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={14} />
                    <span>{requestingCctv ? 'Enviando solicitud...' : 'Enviar Solicitud de Aprobación para CCTV'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )
      ) : (
        <>
          {/* 2. Banner de Sesión en Vivo / Sala de Videoconferencia (HERO SECTION) */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#072B4F] via-[#041d35] to-[#0b2545] border border-slate-700 text-white p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Luces decorativas de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Lado Izquierdo: Información de la Clase de Hoy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-3">
              {activeZoomRoom.isLiveNow ? (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/20 border border-red-400/60 text-red-300 text-xs font-black uppercase tracking-wider animate-pulse shadow-md">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                  🔴 Sesión en Vivo Ahora
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/60 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <Clock size={13} />
                  {activeZoomRoom.startTime || currentCourse.currentLiveStatus.startTime}
                </span>
              )}

              <span className="text-xs font-bold text-teal-300 bg-teal-950/60 px-3 py-1 rounded-full border border-teal-800">
                Código SENCE: {currentCourse.senceCode}
              </span>

              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <Users size={14} className="text-cyan-400" />
                <span>{activeZoomRoom.connectedStudents || currentCourse.currentLiveStatus.connectedStudents} alumnos en sala</span>
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-teal-300">
                {activeZoomRoom.module || currentCourse.currentLiveStatus.module}
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-tight drop-shadow-sm">
                {activeZoomRoom.title || currentCourse.currentLiveStatus.title}
              </h2>
            </div>

            {/* Ficha del Docente / Instructor */}
            <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm max-w-md">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#0284c7] to-[#00A896] text-white flex items-center justify-center font-black text-base shadow-sm flex-shrink-0">
                {currentCourse.instructor.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-extrabold text-white truncate">
                  {currentCourse.instructor.name}
                </p>
                <p className="text-[11px] text-slate-300 truncate">
                  {currentCourse.instructor.role}
                </p>
              </div>
            </div>

            {/* Botón Único de Entrada a la Videoconferencia (1 Sola Plataforma: ZOOM) */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={activeZoomRoom.zoomUrl || currentCourse.meetingLinks.zoomUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-gradient-to-r from-[#00A896] via-teal-500 to-[#0284c7] hover:from-teal-400 hover:to-sky-500 text-white font-black text-sm py-3.5 px-7 rounded-2xl shadow-xl shadow-teal-500/25 flex items-center gap-2.5 transition-all active:scale-95 cursor-pointer border border-teal-300/40"
              >
                <Video size={19} />
                <span>Ingresar a Clase por Zoom</span>
                <ExternalLink size={15} className="opacity-90" />
              </a>

              {activeZoomRoom.isLiveNow && (
                <span className="text-xs text-emerald-300 font-bold flex items-center gap-1.5 bg-emerald-950/40 px-3 py-1.5 rounded-xl border border-emerald-800/60">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  Docente conectado en sala
                </span>
              )}
            </div>
          </div>

          {/* Lado Derecho: Tarjeta de Acceso Rápido & Credenciales Zoom */}
          <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 p-6 rounded-2xl backdrop-blur-md space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-teal-300 flex items-center gap-2">
                <ShieldCheck size={16} />
                <span>Datos de Conexión Segura</span>
              </h3>
              <span className="text-[10px] text-slate-400">Sala Oficial Zoom PrevySeg</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">ID de Reunión Zoom:</p>
                  <p className="font-mono text-sm font-bold text-white">
                    {activeZoomRoom.meetingId || currentCourse.meetingLinks.meetingId}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard((activeZoomRoom.meetingId || currentCourse.meetingLinks.meetingId).replace(/\s+/g, ''), 'id')}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copiar ID"
                >
                  {copiedField === 'id' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Código de Acceso / Password:</p>
                  <p className="font-mono text-sm font-bold text-white">
                    {activeZoomRoom.passcode || currentCourse.meetingLinks.passcode}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(activeZoomRoom.passcode || currentCourse.meetingLinks.passcode, 'pass')}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Copiar Contraseña"
                >
                  {copiedField === 'pass' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* Control Oficial de Asistencia: Exclusivo del Docente */}
            <div className="pt-2 border-t border-slate-700/80 space-y-2">
              <div className="p-3 rounded-xl bg-slate-800/90 border border-teal-500/30 flex items-start gap-3 shadow-inner">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <ShieldCheck size={18} />
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                    <span>Control de Asistencia Oficial Docente</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  </p>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    La asistencia se registra y valida exclusivamente por el Docente Titular en el Libro de Clases Digital SENCE durante la sesión.
                  </p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                Exigencia normativa: Asistir al menos al {currentCourse.schedule.minAttendance} para la emisión del certificado oficial.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 3. Grid de Dos Columnas: Horarios Semanales & Próximas Sesiones */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Columna Izquierda (5 cols): Tarjeta de Horarios y Días */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center font-bold">
                <Calendar size={20} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Horarios & Días de Clase</h3>
                <p className="text-xs text-slate-500">Cronograma oficial de la cohorte 2026</p>
              </div>
            </div>

            {/* Fichas de Horario */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Días Lectivos:</p>
                <p className="text-base font-black text-[#072B4F]">{currentCourse.schedule.days}</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Horario de Conexión:</p>
                <p className="text-base font-black text-[#00A896]">{currentCourse.schedule.time}</p>
                <p className="text-[11px] text-slate-500">{currentCourse.schedule.hoursPerSession}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200/80 space-y-1">
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600" />
                  <span>Exigencia SENCE & SPD:</span>
                </p>
                <p className="text-xs text-emerald-900 font-semibold">
                  {currentCourse.schedule.minAttendance}. Las conexiones quedan registradas en el Libro de Clases Digital.
                </p>
              </div>
            </div>

            {/* Contacto Directo con el Docente */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">¿Dudas con la clase?</span>
              <a
                href={`https://wa.me/56982312128?text=Hola%20profesor,%20soy%20alumno%20del%20curso%20${encodeURIComponent(currentCourse.title)}%20tengo%20una%20consulta.`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-[#00A896] hover:text-teal-700 font-bold"
              >
                <MessageSquare size={14} />
                <span>Consultar al Instructor</span>
              </a>
            </div>
          </div>

          {/* Grabaciones Anteriores (On-Demand) */}
          <div className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Play size={16} className="text-red-500" />
                <span>Clases Grabadas Anteriores</span>
              </h3>
              <span className="text-[11px] font-bold text-slate-500">Repaso On-Demand</span>
            </div>

            <div className="space-y-2.5">
              {currentCourse.recordings.map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 transition-all flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-black text-slate-900 truncate">
                      Clase #{rec.classNum}: {rec.title}
                    </p>
                    <p className="text-[10px] text-slate-500">
                      {rec.date} • Duración: {rec.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedRecording(rec)}
                    className="p-2 rounded-xl bg-white group-hover:bg-[#0284c7] text-slate-700 group-hover:text-white border border-slate-200 group-hover:border-transparent transition-all flex-shrink-0 cursor-pointer shadow-xs"
                    title="Ver Grabación"
                  >
                    <Play size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna Derecha (7 cols): Calendario de Próximas Sesiones */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Cronograma de Sesiones Sincrónicas</h3>
              <p className="text-xs text-slate-500">Temario programado para las próximas clases en vivo</p>
            </div>
            <span className="bg-sky-50 text-[#0284c7] font-bold text-xs px-3 py-1.5 rounded-full border border-sky-200">
              Cohorte 2026
            </span>
          </div>

          <div className="space-y-3">
            {currentCourse.upcomingSessions.map((session, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                  session.status === 'live'
                    ? 'bg-red-50/50 border-red-200 shadow-sm'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-start gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-xl font-black text-sm flex items-center justify-center flex-shrink-0 ${
                    session.status === 'live'
                      ? 'bg-red-500 text-white shadow-sm animate-pulse'
                      : 'bg-white border border-slate-200 text-[#072B4F]'
                  }`}>
                    #{session.num}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-extrabold text-[#00A896] uppercase">
                        {session.date} • {session.fullDate}
                      </span>
                      {session.status === 'live' && (
                        <span className="text-[9px] bg-red-500 text-white font-black px-1.5 py-0.5 rounded-sm uppercase">
                          En Vivo
                        </span>
                      )}
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                      {session.title}
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      {session.time} • Instructor: {session.instructor}
                    </p>
                  </div>
                </div>

                <div className="self-end sm:self-center">
                  {session.status === 'live' ? (
                    <a
                      href={activeZoomRoom.zoomUrl || currentCourse.meetingLinks.zoomUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold py-2 px-3.5 rounded-xl shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Video size={13} />
                      <span>Entrar por Zoom</span>
                    </a>
                  ) : (
                    <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-3 py-1.5 rounded-xl">
                      Programada
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 4. SECCIÓN DE MATERIALES DE USO (DOCUMENTOS, MANUALES Y ARCHIVOS) */}
      <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-3xl shadow-sm space-y-6">
        
        {/* Encabezado de Materiales */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2.5">
              <FolderDown size={24} className="text-[#00A896]" />
              <span>Materiales de Uso, Documentos & Guías Oficiales</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Archivos descargables, manuales normativos y presentaciones preparados por el cuerpo docente.
            </p>
          </div>

          <div className="text-xs font-bold text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
            Total Materiales: <strong className="text-slate-900">{currentCourse.materials.length} archivos</strong>
          </div>
        </div>

        {/* Filtros de Categoría y Buscador */}
        <div className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'todos', label: 'Todos los Materiales' },
              { id: 'manuales', label: 'Manuales Oficiales' },
              { id: 'diapositivas', label: 'Presentaciones PPTX' },
              { id: 'guias', label: 'Guías de Estudio & Balotarios' },
              { id: 'formularios', label: 'Formatos & Formularios' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveMaterialTab(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeMaterialTab === tab.id
                    ? 'bg-[#072B4F] text-white shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar material o documento..."
              value={searchMaterial}
              onChange={(e) => setSearchMaterial(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A896]"
            />
          </div>
        </div>

        {/* Grilla de Documentos y Archivos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMaterials.map((doc) => (
            <div
              key={doc.id}
              className="group bg-slate-50 hover:bg-white border border-slate-200 hover:border-teal-300 p-5 rounded-2xl transition-all duration-200 hover:shadow-md flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    doc.type === 'PDF' 
                      ? 'bg-rose-50 text-rose-600 border border-rose-200'
                      : doc.type === 'PPTX'
                      ? 'bg-amber-50 text-amber-600 border border-amber-200'
                      : 'bg-blue-50 text-blue-600 border border-blue-200'
                  }`}>
                    {doc.type}
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 bg-white px-2.5 py-1 rounded-md border border-slate-200">
                    {doc.size}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900 leading-snug group-hover:text-[#072B4F] transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono truncate mt-0.5">
                    {doc.filename}
                  </p>
                </div>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {doc.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between gap-2">
                <span className="text-[10px] text-slate-400">
                  Subido: {doc.updatedAt}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="p-2 rounded-lg bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                    title="Ver Detalles"
                  >
                    <Eye size={14} />
                  </button>

                  <button
                    onClick={() => handleSimulateDownload(doc)}
                    className="py-1.5 px-3 rounded-lg bg-[#00A896] hover:bg-teal-600 active:scale-95 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Download size={13} />
                    <span>Descargar</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMaterials.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 font-semibold">
              No se encontraron materiales que coincidan con la búsqueda.
            </p>
          </div>
        )}

      </div>
      </>
      )}

      {/* MODAL 1: PREVISUALIZACIÓN DE DOCUMENTO */}
      <AnimatePresence>
        {previewDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#00A896] flex items-center justify-center font-bold">
                    <FileText size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200 uppercase">
                      {previewDoc.type} • {previewDoc.size}
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      {previewDoc.title}
                    </h3>
                  </div>
                </div>
                <button 
                  onClick={() => setPreviewDoc(null)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg text-lg leading-none"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <p><strong>Archivo:</strong> {previewDoc.filename}</p>
                <p><strong>Autor/Docente:</strong> {previewDoc.author}</p>
                <p><strong>Fecha de Publicación:</strong> {previewDoc.updatedAt}</p>
                <p><strong>Descripción:</strong> {previewDoc.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-xs text-sky-800 flex items-start gap-2.5">
                <Info size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
                <span>
                  Este material es exclusivo para los alumnos matriculados en PrevySeg Capacitaciones OTEC bajo normativa NCh 2728 y Ley N° 19.628 de Protección de Datos.
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setPreviewDoc(null)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    handleSimulateDownload(previewDoc);
                    setPreviewDoc(null);
                  }}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00A896] hover:bg-teal-600 text-white flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Download size={14} />
                  <span>Descargar Archivo Ahora</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: REPRODUCTOR DE CLASE GRABADA */}
      <AnimatePresence>
        {selectedRecording && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 rounded-3xl max-w-2xl w-full p-6 text-white space-y-4 shadow-2xl border border-slate-700"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-teal-400">
                    Clase Grabada #{selectedRecording.classNum}
                  </span>
                  <h3 className="text-base font-black text-white">
                    {selectedRecording.title}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedRecording(null)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Pantalla simulada del reproductor de video */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 relative flex items-center justify-center">
                <div className="text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center mx-auto shadow-lg animate-pulse">
                    <Play size={28} className="ml-1" />
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    Grabación Oficial PrevySeg • {selectedRecording.date} ({selectedRecording.duration})
                  </p>
                  <span className="text-[10px] text-slate-500 bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
                    Instructor: {selectedRecording.instructor}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-400 pt-2">
                <span>Grabación almacenada en Zoom Cloud / Servidor PrevySeg</span>
                <button
                  onClick={() => setSelectedRecording(null)}
                  className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
                >
                  Cerrar Reproductor
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StudentLiveClassesView;
