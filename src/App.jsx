import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutUs from './components/AboutUs';
import Services from './components/Services';
import ExecutionSection from './components/ExecutionSection';
import StatsSection from './components/StatsSection';
import NewsSection from './components/NewsSection';
import ContactFooter from './components/ContactFooter';
import NetworkBackground from './components/NetworkBackground';
import ScrollToTop from './components/ScrollToTop';
import LMSLayout from './lms/LMSLayout';
import { supabase, logoutUser } from './config/supabase';
import {
  ContactModal,
  PlatformModal,
  SearchModal,
  ArticleModal,
  EnrollmentModal
} from './components/Modals';
import SchoolDetailModal from './components/SchoolDetailModal';
import OnlineCoursesView from './components/OnlineCoursesView';
import PresencialCoursesView from './components/PresencialCoursesView';
import SenceExecutiveSummary from './components/SenceExecutiveSummary';
import SecuritySchoolView from './components/SecuritySchoolView';
import TradesSchoolView from './components/TradesSchoolView';
import SchoolsPreviewSection from './components/SchoolsPreviewSection';

function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'seguridad' | 'oficios' | 'online' | 'presencial'
  const [activeSchool, setActiveSchool] = useState('seguridad'); // 'seguridad' | 'oficios'
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [platformModalMode, setPlatformModalMode] = useState('login');
  const [platformInitialRut, setPlatformInitialRut] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSchoolModal, setSelectedSchoolModal] = useState(null); // 'seguridad' | 'oficios' | null

  // Estado de usuario autenticado en LMS y pestaña inicial
  const [currentLMSUser, setCurrentLMSUser] = useState(null);
  const [lmsInitialTab, setLmsInitialTab] = useState('area-personal');
  const [authChecking, setAuthChecking] = useState(true);

  // Controla si el usuario está viendo activamente el LMS (por defecto false para mostrar siempre la portada)
  const [isLMSActive, setIsLMSActive] = useState(false);

  // Escuchar y verificar sesión activa en Supabase Auth al cargar
  useEffect(() => {
    let mounted = true;

    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && mounted) {
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (profile && mounted) {
            const isEmployer = profile.rol === 'EMPLOYER' || profile.rol === 'EMPLEADOR' || profile.rol === 'EMPRESA';
            const enriched = {
              ...profile,
              user: profile.rut,
              cargo: profile.rol === 'ADMIN'
                ? 'Director Ejecutivo / Administrador OTEC'
                : isEmployer
                  ? 'Gerencia de Selección & RRHH • Empresa Verificada'
                  : profile.rol === 'TEACHER'
                    ? 'Docente Instructor SPD'
                    : 'Estudiante / Alumno Regular',
            };
            setCurrentLMSUser(enriched);
            setLmsInitialTab(
              profile.rol === 'ADMIN'
                ? 'ajustes-sitio'
                : isEmployer
                  ? 'mis-ofertas'
                  : profile.rol === 'TEACHER'
                    ? 'docente-panel'
                    : 'area-personal'
            );
          }
        }
      } catch (err) {
        console.error('Error verificando sesión:', err);
      } finally {
        if (mounted) setAuthChecking(false);
      }
    }

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setCurrentLMSUser(null);
        setIsLMSActive(false);
      }
    });

    return () => {
      mounted = false;
      subscription?.unsubscribe();
    };
  }, []);

  const handleOpenContactWithCourse = (courseName) => {
    setSelectedCourse(courseName || '');
    setIsContactOpen(true);
  };

  const handleOpenEnrollmentWithCourse = (courseName) => {
    setSelectedCourse(courseName || '');
    setIsEnrollmentOpen(true);
  };

  const handleOpenPlatform = (mode = 'login', initialRut = '') => {
    if (currentLMSUser) {
      setIsLMSActive(true);
    } else {
      setPlatformModalMode(mode);
      if (initialRut) {
        setPlatformInitialRut(initialRut);
      }
      setIsPlatformOpen(true);
    }
  };

  const handleLearnMore = () => {
    const servicesElement = document.getElementById('servicios');
    if (servicesElement) {
      servicesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = (userData, targetTab) => {
    setCurrentLMSUser(userData);
    const isEmp = userData.rol === 'EMPLOYER' || userData.rol === 'EMPLEADOR' || userData.rol === 'EMPRESA';
    const resolvedTab = targetTab || (
      userData.rol === 'ADMIN'
        ? 'ajustes-sitio'
        : isEmp
          ? 'mis-ofertas'
          : userData.rol === 'TEACHER'
            ? 'docente-panel'
            : 'area-personal'
    );
    setLmsInitialTab(resolvedTab);
    setIsPlatformOpen(false);
    setIsLMSActive(true);
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentLMSUser(null);
    setIsLMSActive(false);
  };

  // Manejo de navegación entre vistas principales (Inicio, Seguridad, Oficios, Online, Presencial)
  const handleNavigateView = (view, targetSection) => {
    setCurrentView(view);
    if (view === 'home') {
      if (targetSection) {
        window.history.pushState(null, '', `#${targetSection}`);
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 120);
      } else {
        window.history.pushState(null, '', '#inicio');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (view === 'seguridad') {
      window.history.pushState(null, '', targetSection ? `#${targetSection}` : '#seguridad');
      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 140);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (view === 'oficios') {
      window.history.pushState(null, '', targetSection ? `#${targetSection}` : '#oficios');
      if (targetSection) {
        setTimeout(() => {
          const el = document.getElementById(targetSection);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 140);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (view === 'online') {
      window.history.pushState(null, '', '#online');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'presencial') {
      window.history.pushState(null, '', '#presencial');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Soporte para navegación vía Hash URL (#inicio, #seguridad, #oficios, #online, #presencial, etc.)
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'seguridad' || hash === 'escuela-seguridad') {
        setCurrentView('seguridad');
      } else if (hash === 'oficios' || hash === 'escuela-oficios') {
        setCurrentView('oficios');
      } else if (hash === 'online' || hash === 'cursos-online') {
        setCurrentView('online');
      } else if (hash === 'presencial' || hash === 'cursos-presenciales') {
        setCurrentView('presencial');
      } else if (hash === 'inicio' || hash === 'noticias' || hash === 'quienes-somos' || hash === 'contacto' || hash === 'escuelas') {
        setCurrentView('home');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Solo si el usuario explícitamente activó el LMS tras iniciar sesión, mostramos el LMS Layout
  if (isLMSActive && currentLMSUser) {
    return (
      <LMSLayout
        currentUser={currentLMSUser}
        initialTab={lmsInitialTab}
        onLogout={handleLogout}
        onReturnHome={() => setIsLMSActive(false)}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#0284c7] selection:text-white">

      {/* Dynamic Network Node Canvas Background */}
      <NetworkBackground />

      {/* 1. Header (Sticky Top Bar + Main Navigation with react-scroll) */}
      <Header
        currentUser={currentLMSUser}
        onLogout={handleLogout}
        onOpenPlatform={() => handleOpenPlatform('login')}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenEnrollment={() => handleOpenEnrollmentWithCourse('')}
        onOpenSchoolDetail={(school) => setSelectedSchoolModal(school)}
        activeSchool={activeSchool}
        onSwitchSchool={setActiveSchool}
        currentView={currentView}
        onNavigateView={handleNavigateView}
      />

      {/* Main Page Layout */}
      <main className="flex-grow relative z-10">

        {currentView === 'seguridad' && (
          <SecuritySchoolView
            onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
            onReturnHome={() => handleNavigateView('home')}
            onGoToTrades={() => handleNavigateView('oficios')}
          />
        )}

        {currentView === 'oficios' && (
          <TradesSchoolView
            onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
            onReturnHome={() => handleNavigateView('home')}
            onGoToSecurity={() => handleNavigateView('seguridad')}
          />
        )}

        {currentView === 'online' && (
          <OnlineCoursesView
            onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
            onReturnHome={() => handleNavigateView('home')}
            onOpenSchoolDetail={(school) => setSelectedSchoolModal(school)}
          />
        )}

        {currentView === 'presencial' && (
          <PresencialCoursesView
            onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
            onReturnHome={() => handleNavigateView('home')}
            onOpenSchoolDetail={(school) => setSelectedSchoolModal(school)}
          />
        )}

        {currentView === 'home' && (
          <>
            {/* Section #inicio (Hero Institucional OTEC PrevySeg) */}
            <Hero
              onOpenContact={() => handleOpenContactWithCourse('')}
              onOpenEnrollment={() => handleOpenEnrollmentWithCourse('')}
              onOpenSchoolDetail={(school) => handleNavigateView(school)}
              activeSchool={activeSchool}
              onSwitchSchool={setActiveSchool}
            />

            {/* Resumen Ejecutivo Corto de Beneficios SENCE al Inicio */}
            <SenceExecutiveSummary
              onOpenContact={() => handleOpenContactWithCourse('')}
            />

            {/* Section #quienes-somos (Presentación OTEC: Misión Oficial, Visión, Valores, NCh 2728 SGS) */}
            <AboutUs
              onSelectSchool={(school, targetSection) => handleNavigateView(school, targetSection)}
            />

            {/* Presentación Ejecutiva de las 2 Escuelas con Acceso Directo */}
            <SchoolsPreviewSection
              onNavigateSchool={(school) => handleNavigateView(school)}
            />

            {/* Stats Section (Indicadores y Métricas Oficiales de la OTEC) */}
            <StatsSection />
          </>
        )}

      </main>

      {/* Section #contacto & Footer */}
      <ContactFooter
        onOpenContactModal={() => handleOpenContactWithCourse('')}
        onOpenEnrollmentModal={() => handleOpenEnrollmentWithCourse('')}
      />

      {/* Floating Scroll To Top Button */}
      <ScrollToTop />

      {/* Interactive Modals */}
      <SchoolDetailModal
        isOpen={Boolean(selectedSchoolModal)}
        school={selectedSchoolModal}
        onClose={() => setSelectedSchoolModal(null)}
        onSelectCourse={(courseTitle) => handleOpenEnrollmentWithCourse(courseTitle)}
        onEnterStudentView={() => {
          setSelectedSchoolModal(null);
          if (currentLMSUser) {
            setIsLMSActive(true);
          } else {
            handleOpenPlatform('login');
          }
        }}
        currentUser={currentLMSUser}
      />

      <EnrollmentModal
        isOpen={isEnrollmentOpen}
        onClose={() => setIsEnrollmentOpen(false)}
        defaultCourse={selectedCourse}
        onOpenPlatform={(data) => {
          setIsEnrollmentOpen(false);
          handleOpenPlatform('login', data?.rut || '');
        }}
      />

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultCourse={selectedCourse}
      />

      <PlatformModal
        isOpen={isPlatformOpen}
        initialMode={platformModalMode}
        initialRut={platformInitialRut}
        onClose={() => setIsPlatformOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectCourse={(course) => handleOpenEnrollmentWithCourse(course)}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenContact={() => handleOpenEnrollmentWithCourse(selectedArticle?.category || '')}
      />

    </div>
  );
}

export default App;
