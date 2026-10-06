import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Send,
  User,
  Lock,
  Search,
  CheckCircle,
  ExternalLink,
  Calendar,
  ShieldCheck,
  Phone,
  Mail,
  BookOpen,
  Sparkles
} from 'lucide-react';
import { 
  loginWithRut, 
  registerStudent, 
  cleanRut, 
  formatRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  validatePassword, 
  validatePasswordMatch 
} from '../config/supabase';

// 1. Modal Envíanos Un Mensaje (Envío directo a WhatsApp +56 9 7869 1869)
export const ContactModal = ({ isOpen, onClose, defaultCourse = '' }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    curso: defaultCourse || 'Formación de Guardias de Seguridad',
    mensaje: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Destinatario oficial WhatsApp PrevySeg
    const targetWhatsAppNumber = '56978691869'; // +56 9 7869 1869

    const whatsappMessage = `👋 *¡Hola PrevySeg! Nueva Consulta Web:*

👤 *Nombre Completo:* ${formData.nombre.trim()}
📧 *Correo Electrónico:* ${formData.email.trim()}
📱 *Teléfono / WhatsApp:* ${formData.telefono.trim()}
🎓 *Programa de Interés:* ${formData.curso}
💬 *Mensaje o Consulta:*
${formData.mensaje.trim() || 'Deseo recibir información de fechas, requisitos y franquicia SENCE.'}

---
_Enviado desde el formulario oficial de Contacto Directo de PrevySeg._`;

    const encodedUrl = `https://api.whatsapp.com/send?phone=${targetWhatsAppNumber}&text=${encodeURIComponent(whatsappMessage)}`;
    setWhatsappLink(encodedUrl);

    // Abrir WhatsApp automáticamente en una pestaña nueva
    window.open(encodedUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      curso: defaultCourse || 'Formación de Guardias de Seguridad',
      mensaje: '',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative"
      >

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        {isSubmitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200 shadow-md">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">¡Mensaje Preparado con Éxito!</h3>
              <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                Tu mensaje para <strong className="text-slate-900">PrevySeg</strong> ha sido transferido al WhatsApp oficial <strong className="text-emerald-700 font-mono">+56 9 7869 1869</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-1.5 font-mono text-slate-700">
              <div><strong className="text-slate-500">De:</strong> {formData.nombre} ({formData.telefono})</div>
              <div><strong className="text-slate-500">Para:</strong> +56 9 7869 1869 (WhatsApp PrevySeg)</div>
              <div><strong className="text-slate-500">Curso:</strong> {formData.curso}</div>
            </div>

            <div className="space-y-2.5 pt-2">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer text-xs sm:text-sm"
              >
                <Send size={16} />
                <span>Abrir WhatsApp (+56 9 7869 1869)</span>
              </motion.a>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Enviar otro mensaje
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-1.5 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[#0284c7] text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} />
                <span>Contacto y Matrículas</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Envíanos Tu Consulta
              </h3>
              <p className="text-xs text-slate-500">
                Completa tus datos y nos comunicaremos contigo a la brevedad por WhatsApp o correo.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Juan Pérez Morales"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    required
                    placeholder="juan.perez@gmail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono / Celular</label>
                  <input
                    type="tel"
                    required
                    placeholder="+56 9 1234 5678"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Programa de Interés</label>
                <select
                  value={formData.curso}
                  onChange={(e) => setFormData({ ...formData, curso: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                >
                  <option value="_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725">_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725</option>
                  <option value="Técnicas de operación CCTV y alarmas de seguridad privada">Técnicas de operación CCTV y alarmas de seguridad privada (Autoestudio 30 Días)</option>
                  <option value="Curso de formación Guardia de Seguridad">Curso de formación Guardia de Seguridad</option>
                  <option value="Formación de Supervisor de Seguridad Privada *ONLINE*">Formación de Supervisor de Seguridad Privada *ONLINE*</option>
                  <option value="Capacitación ITIC">Capacitación ITIC</option>
                  <option value="Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273">Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273</option>
                  <option value="Otro">Otro requerimiento o capacitación para empresas</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mensaje o Consulta (Opcional)</label>
                <textarea
                  rows="3"
                  placeholder="Escribe aquí si necesitas financiamiento SENCE, fechas especiales o cotización por grupo de trabajadores..."
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all resize-none"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(16, 185, 129, 0.4)' }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-gradient-to-r from-[#10b981] to-emerald-600 hover:from-emerald-500 hover:to-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer border border-emerald-400/30"
              >
                <Send size={16} />
                <span>Enviar Consulta</span>
              </motion.button>
            </form>
          </div>
        )}

      </motion.div>
    </div>
  );
};

// 2. Modal Plataforma Virtual & Registro de Postulantes
export const PlatformModal = ({ isOpen, onClose, onLoginSuccess, initialMode = 'login', initialRut = '' }) => {
  const [authMode, setAuthMode] = useState(initialMode || 'login'); // 'login' | 'register'
  
  // Login State
  const [rut, setRut] = useState(initialRut || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Sincronizar RUT inicial cuando se reciba por prop o evento
  useEffect(() => {
    if (initialRut) {
      setRut(initialRut);
    }
  }, [initialRut, isOpen]);

  useEffect(() => {
    const handlePlatformEvent = (e) => {
      if (e?.detail?.rut) {
        setRut(e.detail.rut);
        setAuthMode('login');
      }
    };
    window.addEventListener('open-platform-login', handlePlatformEvent);
    return () => window.removeEventListener('open-platform-login', handlePlatformEvent);
  }, []);

  // Register State
  const [regData, setRegData] = useState({
    nombre: '',
    rut: '',
    telefono: '',
    email: '',
    password: '',
    confirmPassword: '',
    ciudad: 'Arica',
    escuela: 'seguridad',
  });
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  if (!isOpen) return null;

  // Real-time validations for registration
  const rutValidation = validateRut(regData.rut, { strictDv: false });
  const emailValidation = regData.email ? validateEmail(regData.email) : { isValid: true };
  const phoneValidation = regData.telefono ? validatePhone(regData.telefono) : { isValid: true };
  const passValidation = validatePassword(regData.password);
  const passMatch = validatePasswordMatch(regData.password, regData.confirmPassword);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const cleanR = cleanRut(rut);
    if (!cleanR || cleanR.length < 6) {
      setError('Por favor ingresa un RUT válido con formato 12.345.678-9');
      setLoading(false);
      return;
    }

    if (!password || password.trim().length === 0) {
      setError('Por favor ingresa tu contraseña de acceso.');
      setLoading(false);
      return;
    }

    try {
      const user = await loginWithRut(rut, password);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onLoginSuccess) {
          const defaultTab = user.rol === 'ADMIN' 
            ? 'ajustes-sitio' 
            : (user.rol === 'EMPLOYER' || user.rol === 'EMPLEADOR' || user.rol === 'EMPRESA')
            ? 'mis-ofertas'
            : user.rol === 'TEACHER' 
            ? 'docente-panel' 
            : 'area-personal';
          onLoginSuccess(user, defaultTab);
        }
      }, 600);
    } catch (err) {
      setError(err.message || 'Credenciales no válidas. Si aún no eres alumno, regístrate en la pestaña "Registrar Postulante".');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!regData.nombre || !regData.nombre.trim()) {
      setError('Por favor ingresa tu nombre completo.');
      setLoading(false);
      return;
    }

    const cleanR = cleanRut(regData.rut);
    if (!cleanR || cleanR.length < 7) {
      setError('El RUT ingresado no es válido. Debe contener al menos 7 dígitos y su dígito verificador.');
      setLoading(false);
      return;
    }

    const emailCheck = validateEmail(regData.email);
    if (!emailCheck.isValid) {
      setError(emailCheck.error || 'Correo electrónico no válido.');
      setLoading(false);
      return;
    }

    const phoneCheck = validatePhone(regData.telefono);
    if (!phoneCheck.isValid) {
      setError(phoneCheck.error || 'Teléfono no válido.');
      setLoading(false);
      return;
    }

    if (!regData.password || regData.password.trim().length < 4) {
      setError('Debes ingresar una contraseña de al menos 4 caracteres para tu cuenta.');
      setLoading(false);
      return;
    }

    if (regData.password !== regData.confirmPassword) {
      setError('Las contraseñas no coinciden. Por favor verifícalas antes de continuar.');
      setLoading(false);
      return;
    }

    try {
      const newStudent = await registerStudent({
        rut: formatRut(regData.rut) || regData.rut,
        password: regData.password,
        nombre: regData.nombre,
        telefono: regData.telefono,
        emailPersonal: regData.email,
        ciudad: regData.ciudad,
        escuela: regData.escuela,
      });

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        if (onLoginSuccess) {
          onLoginSuccess(newStudent, 'portal-admision');
        }
      }, 700);
    } catch (err) {
      setError(err.message || 'Error al registrar postulante.');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = (demoUser, demoPass) => {
    setRut(formatRut(demoUser) || demoUser);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white border border-slate-200 w-full max-w-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative max-h-[92vh] overflow-y-auto"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        <div className="text-center space-y-2 mb-6">
          <div className="w-14 h-14 bg-sky-50 text-[#0284c7] rounded-2xl flex items-center justify-center mx-auto border border-sky-200 shadow-md">
            <ShieldCheck size={32} className="text-[#0284c7]" />
          </div>
          <h3 className="text-2xl font-black text-slate-900">
            <span className="text-[#0284c7]">Prevy</span>
            <span className="text-[#00c2b2]">Seg</span> Virtual
          </h3>
          <p className="text-xs text-slate-500">
            Acceso Seguro para Administradores, Profesores y Estudiantes
          </p>
        </div>

        {/* Tab Switcher: Iniciar Sesión vs Registrar Postulante */}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200 mb-6">
          <button
            type="button"
            onClick={() => { setAuthMode('login'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              authMode === 'login'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Iniciar Sesión
          </button>
          <button
            type="button"
            onClick={() => { setAuthMode('register'); setError(''); }}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              authMode === 'register'
                ? 'bg-[#0284c7] text-white font-bold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={13} />
            <span>Registrar Postulante</span>
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce border border-emerald-200">
              <CheckCircle size={32} />
            </div>
            <h4 className="text-lg font-bold text-slate-900">
              {authMode === 'register' ? '¡Registro y Encriptación Exitosa!' : '¡Acceso Autorizado!'}
            </h4>
            <p className="text-xs text-slate-500">
              Ingresando al panel correspondiente...
            </p>
          </div>
        ) : authMode === 'login' ? (
          /* FORMULARIO DE INICIO DE SESIÓN */
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                <span className="font-bold">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">RUT de Usuario</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="Ej: 15.692.858-5"
                  value={rut}
                  onChange={(e) => {
                    setRut(formatRut(e.target.value));
                    setError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 font-mono transition-all"
                />
                <User size={16} className="absolute left-3.5 top-3 text-slate-400" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-semibold text-slate-700">Contraseña</label>
                <span className="text-[10px] text-slate-400 font-medium">Bcrypt Encriptada</span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 transition-all"
                />
                <Lock size={16} className="absolute left-3.5 top-3 text-slate-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <Lock size={15} className="text-[#0284c7]" /> : <Search size={15} />}
                </button>
              </div>
            </div>

            {/* Demo Credentials for Administration and Employers */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-bold block uppercase text-[10px] tracking-wider">Demostración de Roles Disponibles:</span>
                <span className="text-[9px] bg-sky-100 text-[#0284c7] font-bold px-1.5 py-0.5 rounded">1-Click Login</span>
              </div>
              <div className="flex flex-col gap-1.5 text-slate-700">
                
                {/* 1. Administrador */}
                <button
                  type="button"
                  onClick={() => handleFillDemo('15692858-5', '15692858')}
                  className="text-left text-purple-700 hover:text-purple-900 flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-purple-50 border border-purple-200 transition-colors"
                >
                  <span className="font-semibold">👑 Viviane Montesillo (ADMINISTRADOR OTEC)</span>
                  <span className="font-mono text-slate-500 text-[10px]">15.692.858-5</span>
                </button>

                {/* 2. Empresa / Empleador */}
                <button
                  type="button"
                  onClick={() => handleFillDemo('76543210-K', 'prevyseg2026')}
                  className="text-left text-amber-700 hover:text-amber-900 flex justify-between items-center cursor-pointer p-2 rounded-lg hover:bg-amber-50 border border-amber-200 transition-colors"
                >
                  <span className="font-semibold">🏢 Minería & Logística del Norte (EMPRESA / EMPLEADOR)</span>
                  <span className="font-mono text-slate-500 text-[10px]">76.543.210-K</span>
                </button>

              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(2, 132, 199, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#0284c7] to-[#0369a1] hover:from-sky-500 hover:to-sky-700 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer border border-sky-400/30 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verificando Contraseña Encriptada...</span>
                </span>
              ) : (
                <span>Ingresar al Portal Seguro</span>
              )}
              <ExternalLink size={14} />
            </motion.button>
          </form>
        ) : (
          /* FORMULARIO DE REGISTRO RÁPIDO DE POSTULANTE */
          <form onSubmit={handleRegister} className="space-y-3.5">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                <span className="font-bold">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre y Apellidos *</label>
              <input
                type="text"
                required
                placeholder="Ej: Carlos Vega Ramírez"
                value={regData.nombre}
                onChange={(e) => setRegData({ ...regData, nombre: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">RUT Chileno *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: 12.345.678-9"
                  value={regData.rut}
                  onChange={(e) => setRegData({ ...regData, rut: formatRut(e.target.value) })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
                />
                {regData.rut && regData.rut.length >= 7 && (
                  <div className="text-[10px] mt-0.5 font-medium flex items-center gap-1 text-emerald-600">
                    <span>✓ Formato RUT verificado</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Teléfono / WhatsApp *</label>
                <input
                  type="tel"
                  required
                  placeholder="+56 9 8765 4321"
                  value={regData.telefono}
                  onChange={(e) => setRegData({ ...regData, telefono: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Correo Electrónico *</label>
              <input
                type="email"
                required
                placeholder="postulante@gmail.com"
                value={regData.email}
                onChange={(e) => setRegData({ ...regData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
              />
            </div>

            {/* Contraseña & Confirmación con Medidor de Seguridad */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Crear Contraseña *</label>
                  {regData.password && (
                    <span className={`text-[10px] font-bold ${passValidation.color}`}>
                      {passValidation.label}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    required
                    placeholder="Mínimo 4 caracteres"
                    value={regData.password}
                    onChange={(e) => setRegData({ ...regData, password: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
                  />
                  <Lock size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showRegPassword ? <Lock size={14} className="text-teal-600" /> : <Search size={14} />}
                  </button>
                </div>
                {/* Barra de Fuerza de Contraseña */}
                {regData.password && (
                  <div className="w-full h-1 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${
                        passValidation.score <= 1 ? 'bg-rose-500' :
                        passValidation.score === 2 ? 'bg-amber-500' :
                        passValidation.score === 3 ? 'bg-teal-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${passValidation.barPercent}%` }}
                    />
                  </div>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-slate-700">Confirmar Contraseña *</label>
                  {regData.confirmPassword && (
                    <span className={`text-[10px] font-bold ${regData.password === regData.confirmPassword ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {regData.password === regData.confirmPassword ? '✓ Coinciden' : '✗ No coinciden'}
                    </span>
                  )}
                </div>
                <div className="relative">
                  <input
                    type={showRegConfirm ? 'text' : 'password'}
                    required
                    placeholder="Repite tu contraseña"
                    value={regData.confirmPassword}
                    onChange={(e) => setRegData({ ...regData, confirmPassword: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500 transition-all"
                  />
                  <Lock size={15} className="absolute left-3 top-2.5 text-slate-400" />
                  <button
                    type="button"
                    onClick={() => setShowRegConfirm(!showRegConfirm)}
                    className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    tabIndex={-1}
                  >
                    {showRegConfirm ? <Lock size={14} className="text-teal-600" /> : <Search size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Ciudad de Residencia</label>
                <select
                  value={regData.ciudad}
                  onChange={(e) => setRegData({ ...regData, ciudad: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                >
                  <option value="Arica">Arica y Parinacota</option>
                  <option value="Iquique">Iquique (Tarapacá)</option>
                  <option value="Antofagasta">Antofagasta</option>
                  <option value="Calama">Calama</option>
                  <option value="Otra">Otra Región</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Escuela de Interés</label>
                <select
                  value={regData.escuela}
                  onChange={(e) => setRegData({ ...regData, escuela: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:bg-white focus:outline-none focus:border-teal-500"
                >
                  <option value="seguridad">Escuela de Seguridad Privada (SPD)</option>
                  <option value="oficios">Escuela de Oficios (30 Días)</option>
                </select>
              </div>
            </div>

            <div className="p-2.5 bg-teal-50/70 border border-teal-200 rounded-xl flex items-center gap-2 text-[11px] text-teal-900">
              <ShieldCheck size={16} className="text-teal-600 flex-shrink-0" />
              <span>Tu contraseña será resguardada y encriptada con algoritmo <strong>Blowfish Bcrypt</strong>.</span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 0 20px rgba(0, 194, 178, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00c2b2] to-teal-500 hover:from-teal-500 hover:to-teal-600 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Encriptando y Registrando...</span>
                </span>
              ) : (
                <span>Crear Cuenta Segura & Acceder a Descargas</span>
              )}
              <Sparkles size={15} />
            </motion.button>
          </form>
        )}

        <div className="mt-5 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-500">
          Tus datos se encuentran resguardados bajo estricta reserva conforme a la Ley N° 19.628 y normativa SENCE.
        </div>
      </motion.div>
    </div>
  );
};


// 3. Modal Buscador Rápido
export const SearchModal = ({ isOpen, onClose, onSelectCourse }) => {
  const [query, setQuery] = useState('');

  const coursesList = [
    { name: '_2_66_2026 Resolución de Conflictos y Manejo de Situaciones Difíciles Código Sence: 1238088725', category: 'Seguridad Privada', price: '$85.000 CLP' },
    { name: 'Técnicas de operación CCTV y alarmas de seguridad privada', category: 'Seguridad Privada', price: '$140.000 CLP' },
    { name: 'Curso de formación Guardia de Seguridad', category: 'Seguridad Privada', price: '$140.000 CLP' },
    { name: 'Formación de Supervisor de Seguridad Privada *ONLINE*', category: 'Seguridad Privada', price: '$180.000 CLP' },
    { name: 'Capacitación ITIC', category: 'Sistemas internos', price: '$75.000 CLP' },
    { name: 'Asistencia Curso - Código Sence: 1238087964 ID Acción: 6731273', category: 'Asistencias', price: '$60.000 CLP' },
  ];

  if (!isOpen) return null;

  const filtered = coursesList.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.25 }}
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl p-6 relative"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        {/* Search input */}
        <div className="relative mb-6">
          <input
            type="text"
            autoFocus
            placeholder="Buscar cursos, especializaciones o requisitos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3.5 text-base text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500/40 focus:border-sky-500 shadow-sm transition-all"
          />
          <Search size={20} className="absolute left-4 top-4 text-slate-400" />
        </div>

        {/* Results */}
        <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01, x: 3 }}
                onClick={() => {
                  onSelectCourse(item.name);
                  onClose();
                }}
                className="p-4 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 transition-all cursor-pointer flex items-center justify-between group shadow-sm"
              >
                <div>
                  <div className="text-slate-900 text-sm font-semibold group-hover:text-[#0284c7] transition-colors">
                    {item.name}
                  </div>
                  <div className="text-xs text-slate-500">
                    {item.category}
                  </div>
                </div>
                <span className="text-xs font-bold text-[#0284c7] group-hover:text-sky-700">
                  Ver detalle →
                </span>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-8 text-slate-500 text-sm">
              No se encontraron cursos que coincidan con "<span className="text-slate-900 font-semibold">{query}</span>".
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};


// 4. Modal Artículo / Blog
export const ArticleModal = ({ article, onClose, onOpenContact }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        transition={{ duration: 0.3 }}
        className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
      >
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors z-10 cursor-pointer"
        >
          <X size={20} />
        </motion.button>

        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden aspect-[16/9] border border-slate-200 bg-slate-100">
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="text-[#0284c7] font-bold">{article.category}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Calendar size={12} /> {article.date}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 leading-snug">{article.title}</h2>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {article.summary}
          </p>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            En <strong className="text-slate-900">PrevySeg Capacitaciones</strong> entregamos una preparación teórico-práctica con instructores de amplia experiencia, garantizando que cada estudiante adquiera las competencias requeridas por la normativa chilena vigente y las demandas de seguridad del entorno laboral en Arica.
          </p>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold cursor-pointer transition-colors"
            >
              Cerrar
            </button>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                onClose();
                onOpenContact();
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#0284c7] to-[#0369a1] text-white text-xs font-bold cursor-pointer shadow-md shadow-sky-600/20 border border-sky-400/30"
            >
              Consultar por este Curso
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// 5. Modal Ficha de Inscripción & Abono 50% (Pop-up directo)
import EnrollmentForm from './EnrollmentForm';

export const EnrollmentModal = ({ isOpen, onClose, defaultCourse = '', onOpenPlatform }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.93, y: 20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full max-w-5xl my-auto relative max-h-[94vh] overflow-y-auto rounded-3xl"
      >
        {/* Floating Close button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="sticky top-4 right-4 ml-auto z-50 bg-white text-slate-600 hover:text-slate-900 p-2.5 rounded-full border border-slate-200 shadow-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all cursor-pointer flex items-center justify-center"
          title="Cerrar Ficha"
        >
          <X size={20} />
        </motion.button>

        <div className="-mt-12">
          <EnrollmentForm defaultCourseName={defaultCourse} onFinished={onClose} onOpenPlatform={onOpenPlatform} />
        </div>
      </motion.div>
    </div>
  );
};

