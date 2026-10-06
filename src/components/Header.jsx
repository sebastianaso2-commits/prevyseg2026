import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Search,
  Menu,
  X,
  LogOut,
  Laptop,
  Building2,
  ChevronDown,
  BookOpen,
  Layers,
  Sparkles,
  Shield,
  Wrench
} from 'lucide-react';
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons';
import prevysegLogo from '../assets/images/prevyseg_logo.png';

// Icono de red/nodos idéntico al de Plataforma Virtual
const VirtualPlatformIcon = ({ className = "w-3.5 h-3.5 text-cyan-300" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="2.8" fill="currentColor" />
    <circle cx="19" cy="6" r="2.2" fill="currentColor" />
    <circle cx="5" cy="8" r="2.2" fill="currentColor" />
    <circle cx="18" cy="18" r="2.2" fill="currentColor" />
    <line x1="12" y1="12" x2="19" y2="6" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="12" x2="5" y2="8" stroke="currentColor" strokeWidth="2" />
    <line x1="12" y1="12" x2="18" y2="18" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const Header = ({
  onOpenPlatform,
  onOpenSearch,
  onOpenEnrollment,
  currentUser,
  onLogout,
  currentView = 'home',
  onNavigateView
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdownOpen, setCoursesDropdownOpen] = useState(false);
  const [mobileCoursesOpen, setMobileCoursesOpen] = useState(false);
  const coursesDropdownRef = useRef(null);

  // Escuchar scroll para colapsar suavemente la top bar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cerrar dropdown al hacer click afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(e.target)) {
        setCoursesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (view, target) => {
    setCoursesDropdownOpen(false);
    setMobileMenuOpen(false);
    if (target === 'noticias') {
      const targetSchoolView = currentView === 'oficios' ? 'oficios' : 'seguridad';
      if (onNavigateView) {
        onNavigateView(targetSchoolView, 'noticias');
      }
      return;
    }
    if (onNavigateView) {
      onNavigateView(view, target);
    } else if (target) {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">

      {/* 1. TOP BAR ULTRA COMPACTA: Se oculta suavemente al hacer scroll hacia abajo para liberar espacio visual */}
      <div
        className={`bg-[#161630] text-white overflow-hidden transition-all duration-300 border-b border-[#0a969b]/25 ${isScrolled
            ? 'max-h-0 opacity-0 -translate-y-2 py-0 border-none pointer-events-none'
            : 'max-h-12 opacity-100 py-1.5 px-4 sm:px-8 text-[11px]'
          }`}
      >
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">

          {/* Acreditación SPD & SENCE y Redes Sociales */}
          <div className="flex items-center space-x-3 text-slate-200">
            <span className="bg-[#0a969b]/20 text-[#00FFE0] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md border border-[#0a969b]/60 tracking-wider shadow-2xs">
              Acreditación SPD & SENCE
            </span>
            <div className="h-3 w-px bg-white/20 hidden sm:block" />
            <div className="flex items-center space-x-2 text-white/80">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook PrevySeg"
                className="hover:text-[#38bdf8] transition-colors"
              >
                <FacebookIcon size={12} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram PrevySeg"
                className="hover:text-[#38bdf8] transition-colors"
              >
                <InstagramIcon size={12} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube PrevySeg"
                className="hover:text-[#38bdf8] transition-colors"
              >
                <YoutubeIcon size={12} />
              </a>
            </div>
          </div>

          {/* Información de Contacto Directa */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-white/90 font-medium">
            <a
              href="tel:+56978691869"
              className="flex items-center gap-1.5 hover:text-[#00FFE0] transition-colors"
            >
              <Phone size={11} className="text-[#00FFE0]" />
              <span className="font-semibold">+56 9 7869 1869</span>
            </a>
            <span className="text-white/20 hidden sm:inline">|</span>
            <a
              href="mailto:prevyseg.capacitaciones@gmail.com"
              className="hidden md:flex items-center gap-1.5 hover:text-[#00FFE0] transition-colors"
            >
              <Mail size={11} className="text-[#00FFE0]" />
              <span>prevyseg.capacitaciones@gmail.com</span>
            </a>
            <span className="text-white/20 hidden lg:inline">|</span>
            <span className="hidden lg:flex items-center gap-1 text-white/80">
              <MapPin size={11} className="text-[#00FFE0]" />
              <span>Arica, Chile</span>
            </span>
          </div>

        </div>
      </div>

      {/* 2. BARRA PRINCIPAL DE NAVEGACIÓN: En el EXACTO orden secuencial que el contenido de la página */}
      <nav
        className={`bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300 px-4 sm:px-8 ${isScrolled ? 'py-2 shadow-md shadow-slate-900/5' : 'py-2.5 shadow-xs'
          }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

          {/* Logo PrevySeg */}
          <button
            type="button"
            onClick={() => handleNavClick('home', 'inicio')}
            className="cursor-pointer group flex items-center select-none py-0.5 bg-transparent border-0 flex-shrink-0"
            title="PrevySeg - Organismo Técnico de Capacitación"
          >
            <img
              src={prevysegLogo}
              alt="PrevySeg"
              className="h-8 sm:h-9 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </button>

          {/* Menú Desktop: Ordenado 100% fiel al flujo descendente de la página */}
          <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-xs font-semibold">

            {/* 1. INICIO (Vista 1: OTEC PrevySeg Institucional) */}
            <button
              type="button"
              onClick={() => handleNavClick('home', 'inicio')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${currentView === 'home' && (!window.location.hash || window.location.hash === '#inicio' || window.location.hash === '')
                  ? 'text-[#0a969b] font-black bg-[#0a969b]/10'
                  : 'text-slate-600 hover:text-[#1b3761] hover:bg-slate-50'
                }`}
            >
              Inicio
            </button>

            {/* 2. INFORMACIÓN / QUIÉNES SOMOS */}
            <button
              type="button"
              onClick={() => handleNavClick('home', 'quienes-somos')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${currentView === 'home' && (window.location.hash === '#quienes-somos' || window.location.hash === '#informacion')
                  ? 'text-[#0a969b] font-black bg-[#0a969b]/10'
                  : 'text-slate-600 hover:text-[#1b3761] hover:bg-slate-50'
                }`}
            >
              Información
            </button>

            {/* 3. ESCUELA DE SEGURIDAD PRIVADA (Vista 2: Cursos OS-10 & SPD) */}
            <button
              type="button"
              onClick={() => handleNavClick('seguridad')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold ${currentView === 'seguridad'
                  ? 'text-[#0a969b] font-black bg-[#0a969b]/10 ring-1 ring-[#0a969b]/30'
                  : 'text-slate-600 hover:text-[#1b3761] hover:bg-slate-50'
                }`}
            >
              <Shield size={14} className={currentView === 'seguridad' ? 'text-[#0a969b]' : 'text-slate-400'} />
              <span>Escuela de Seguridad</span>
            </button>

            {/* 4. ESCUELA DE OFICIOS (Vista 3: Cursos SENCE & Productivos) */}
            <button
              type="button"
              onClick={() => handleNavClick('oficios')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 font-bold ${currentView === 'oficios'
                  ? 'text-[#0a969b] font-black bg-[#0a969b]/10 ring-1 ring-[#0a969b]/30'
                  : 'text-slate-600 hover:text-[#1b3761] hover:bg-slate-50'
                }`}
            >
              <Wrench size={14} className={currentView === 'oficios' ? 'text-[#0a969b]' : 'text-slate-400'} />
              <span>Escuela de Oficios</span>
            </button>

            {/* 5. NOTICIAS (Actualidad OTEC y Leyes) */}
            <button
              type="button"
              onClick={() => handleNavClick('home', 'noticias')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${currentView === 'home' && window.location.hash === '#noticias'
                  ? 'text-[#0a969b] font-black bg-[#0a969b]/10'
                  : 'text-slate-600 hover:text-[#1b3761] hover:bg-slate-50'
                }`}
            >
              Noticias
            </button>

            {/* 6. CONTACTO (Footer y Sedes) */}
            <button
              type="button"
              onClick={() => handleNavClick('home', 'contacto')}
              className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer font-bold ${currentView === 'home' && window.location.hash === '#contacto'
                  ? 'text-[#0a969b] font-black bg-[#0a969b]/10'
                  : 'text-slate-600 hover:text-[#1b3761] hover:bg-slate-50'
                }`}
            >
              Contacto
            </button>

          </div>

          {/* Zona Derecha: Buscador + Plataforma Virtual */}
          <div className="flex items-center gap-2 flex-shrink-0">

            {/* Buscador Compacto */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenSearch}
              className="w-8 h-8 rounded-xl border border-slate-200 hover:border-[#0a969b] text-slate-500 hover:text-[#0a969b] bg-slate-50 hover:bg-white flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
              aria-label="Buscar cursos"
              title="Buscar cursos (Ctrl+K)"
            >
              <Search size={14} />
            </motion.button>

            {/* Botón Profesional PLATAFORMA VIRTUAL */}
            <div className="flex items-center gap-1.5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onOpenPlatform}
                className="bg-gradient-to-r from-[#1b3761] via-[#161630] to-[#0a969b] hover:from-[#161630] hover:to-[#0a969b] text-white text-xs font-black uppercase tracking-wider py-2 px-3.5 sm:px-4 rounded-xl shadow-md hover:shadow-[0_0_20px_rgba(10,150,155,0.45)] border border-[#00FFE0]/35 hover:border-[#00FFE0] transition-all flex items-center gap-2 cursor-pointer"
                title="Ingresar a la Plataforma Virtual"
              >
                <VirtualPlatformIcon className="w-3.5 h-3.5 text-[#00FFE0]" />
                <span className="hidden sm:inline font-black">PLATAFORMA VIRTUAL</span>
                <span className="sm:hidden font-black">LMS</span>
                {currentUser && (
                  <span className="w-2 h-2 rounded-full bg-[#00FFE0] animate-ping ml-0.5" title="Sesión activa" />
                )}
              </motion.button>

              {currentUser && onLogout && (
                <button
                  onClick={onLogout}
                  className="text-slate-400 hover:text-red-500 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Cerrar sesión activa"
                  aria-label="Cerrar sesión"
                >
                  <LogOut size={15} />
                </button>
              )}
            </div>

            {/* Botón Mobile Menú Hamburguesa */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

          </div>
        </div>

        {/* 3. MENÚ DESPLEGABLE MOBILE: Organizado y en el Mismo Orden Exacto */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="lg:hidden mt-2 pt-3 border-t border-slate-200/80 flex flex-col space-y-3 pb-3 overflow-hidden bg-white/98 rounded-2xl p-3 shadow-lg"
            >
              {/* Navegación Principal en Orden Secuencial Idéntico */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-2">
                  Menú Principal
                </span>

                {/* 1. Inicio */}
                <button
                  type="button"
                  onClick={() => handleNavClick('home', 'inicio')}
                  className={`w-full text-left text-xs font-bold px-3 py-2 rounded-xl transition-all cursor-pointer ${currentView === 'home' && (!window.location.hash || window.location.hash === '#inicio') ? 'text-[#0A4DA2] bg-blue-50/70 font-black' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  1. Inicio
                </button>

                {/* 2. Información General / Quiénes Somos */}
                <button
                  type="button"
                  onClick={() => handleNavClick('home', 'quienes-somos')}
                  className="w-full text-left text-xs font-bold text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-xl transition-all cursor-pointer"
                >
                  2. Información Institucional
                </button>

                {/* 3. Escuela de Seguridad Privada */}
                <button
                  type="button"
                  onClick={() => handleNavClick('seguridad')}
                  className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${currentView === 'seguridad' ? 'bg-[#0a969b]/15 text-[#0a969b]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Shield size={15} className="text-[#0a969b]" />
                    <span>3. Escuela de Seguridad Privada</span>
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    OS-10 / SPD
                  </span>
                </button>

                {/* 4. Escuela de Oficios */}
                <button
                  type="button"
                  onClick={() => handleNavClick('oficios')}
                  className={`w-full text-left text-xs font-bold px-3 py-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${currentView === 'oficios' ? 'bg-[#0a969b]/15 text-[#0a969b]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  <span className="flex items-center gap-2">
                    <Wrench size={15} className="text-[#0a969b]" />
                    <span>4. Escuela de Oficios y Servicios</span>
                  </span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-700">
                    SENCE
                  </span>
                </button>

                {/* 5. Noticias */}
                <button
                  type="button"
                  onClick={() => handleNavClick('home', 'noticias')}
                  className="w-full text-left text-xs font-bold text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-xl transition-all cursor-pointer"
                >
                  5. Noticias PrevySeg
                </button>

                {/* 6. Contacto */}
                <button
                  type="button"
                  onClick={() => handleNavClick('home', 'contacto')}
                  className="w-full text-left text-xs font-bold text-slate-700 hover:bg-slate-50 px-3 py-2 rounded-xl transition-all cursor-pointer"
                >
                  6. Contacto & Sede
                </button>
              </div>

              {/* Botón Plataforma Virtual Mobile */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPlatform();
                  }}
                  className="w-full bg-gradient-to-r from-[#072B4F] to-[#0A4DA2] text-white text-xs font-black uppercase tracking-wider py-3 px-4 rounded-xl shadow-md text-center flex items-center justify-center gap-2 cursor-pointer"
                >
                  <VirtualPlatformIcon className="w-4 h-4 text-cyan-300" />
                  <span>PLATAFORMA VIRTUAL</span>
                  {currentUser && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
                  )}
                </button>
              </div>

              {currentUser && onLogout && (
                <div className="pt-1 text-center">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onLogout();
                    }}
                    className="text-xs font-bold text-red-600 hover:text-red-700 py-1 cursor-pointer"
                  >
                    Cerrar sesión activa ({currentUser.user || currentUser.email})
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;
