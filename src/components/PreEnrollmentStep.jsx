import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Lock,
  Edit3,
  Award,
  Clock,
  Send
} from 'lucide-react';
import { supabase } from '../config/supabase';
import {
  formatRut,
  validateRut,
  validateEmail,
  validatePhone
} from '../utils/validation';
import { REGIONES_CHILE, OFFICIAL_COURSES, findMatchingCourse } from './EnrollmentForm';

/**
 * Componente Paso 1: Ficha Reducida de Preinscripción & Verificación de Correo OTP con Supabase.
 * Contiene únicamente los 6 campos requeridos:
 * - NombreCompleto
 * - Rut
 * - Correo
 * - Telefono
 * - Region
 * - Ciudad
 */
export const PreEnrollmentStep = ({
  defaultCourseName = '',
  onVerified,
  onClose
}) => {
  // 1. Obtener curso seleccionado
  const selectedCourse = findMatchingCourse(defaultCourseName) || OFFICIAL_COURSES[0];

  // 2. Estado de los 6 datos solicitados
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    region: 'Región de Arica y Parinacota (XV)',
    ciudad: 'Arica'
  });
  const [otherCityName, setOtherCityName] = useState('');

  // Ciudad efectiva (si seleccionó 'OTRA')
  const effectiveCity = formData.ciudad === 'OTRA' ? (otherCityName.trim() || 'Otra Localidad') : formData.ciudad;

  // 3. Estados de flujo: 'FORM' | 'VERIFY_OTP'
  const [flowStep, setFlowStep] = useState('FORM');

  // Estados de envío y validación OTP
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successNotice, setSuccessNotice] = useState('');

  // 6 casillas fijas para el código OTP de 6 dígitos
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  // Temporizador de reenvío (60 segundos)
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (flowStep === 'VERIFY_OTP' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [flowStep, countdown]);

  // Validaciones en tiempo real
  const rutValidation = validateRut(formData.rut);
  const isRutValid = rutValidation.isValid;

  const emailValidation = validateEmail(formData.email);
  const isEmailValid = emailValidation.isValid;

  const phoneValidation = validatePhone(formData.telefono);
  const isPhoneValid = phoneValidation.isValid;

  const isNameValid = formData.nombre.trim().length >= 3;
  const isRegionValid = Boolean(formData.region);
  const isCityValid = formData.ciudad === 'OTRA' ? otherCityName.trim().length >= 2 : Boolean(formData.ciudad);

  // ¿Todos los 6 datos son 100% válidos?
  const isFormValid = isNameValid && isRutValid && isEmailValid && isPhoneValid && isRegionValid && isCityValid;

  // Contador de campos completados (de 6)
  const completedCount = [
    isNameValid,
    isRutValid,
    isEmailValid,
    isPhoneValid,
    isRegionValid,
    isCityValid
  ].filter(Boolean).length;

  // Manejo de cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrorMessage('');

    if (name === 'rut') {
      setFormData(prev => ({ ...prev, rut: formatRut(value) }));
    } else if (name === 'region') {
      const selRegion = REGIONES_CHILE.find(r => r.name === value);
      const newCity = selRegion?.cities[0] || 'Arica';
      setFormData(prev => ({
        ...prev,
        region: value,
        ciudad: newCity
      }));
      setOtherCityName('');
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Enviar Código de Verificación OTP usando Supabase Auth
  const handleSendOtp = async (e) => {
    if (e) e.preventDefault();
    if (!isFormValid) return;

    setIsSendingOtp(true);
    setErrorMessage('');
    setSuccessNotice('');

    try {
      const cleanEmail = formData.email.trim().toLowerCase();

      // Llamada oficial a Supabase Auth OTP
      const { data, error } = await supabase.auth.signInWithOtp({
        email: cleanEmail,
        options: {
          shouldCreateUser: true,
          data: {
            nombre: formData.nombre.trim(),
            rut: formData.rut.trim(),
            telefono: formData.telefono.trim(),
            region: formData.region,
            ciudad: effectiveCity
          }
        }
      });

      if (error) {
        console.error('Error enviando OTP Supabase:', error);
        if (error.message && error.message.includes('rate limit')) {
          setErrorMessage('Has alcanzado el límite de intentos temporales. Por favor espera unos minutos antes de solicitar otro código.');
        } else {
          setErrorMessage(error.message || 'Error al enviar el código de confirmación. Verifica tu correo.');
        }
        setIsSendingOtp(false);
        return;
      }

      // Éxito: pasar a la pantalla de verificación OTP
      setIsSendingOtp(false);
      setFlowStep('VERIFY_OTP');
      setCountdown(60);
      setCanResend(false);
      setOtpDigits(Array(6).fill(''));

      // Foco automático en la primera casilla después de la animación
      setTimeout(() => {
        if (inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 300);
    } catch (err) {
      console.error('Error en handleSendOtp:', err);
      setIsSendingOtp(false);
      setErrorMessage(err.message || 'Error inesperado al conectar con el servidor de correo.');
    }
  };

  // Reenviar código OTP
  const handleResendOtp = async () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    setErrorMessage('');
    setSuccessNotice('Reenviando código a tu correo...');

    try {
      const cleanEmail = formData.email.trim().toLowerCase();
      const { error } = await supabase.auth.signInWithOtp({
        email: cleanEmail
      });

      if (error) {
        setErrorMessage(error.message || 'No se pudo reenviar el código. Intenta nuevamente.');
      } else {
        setSuccessNotice('¡Nuevo código enviado con éxito a tu correo!');
        setTimeout(() => setSuccessNotice(''), 4000);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Error al reenviar el código.');
    }
  };

  // Manejo de entrada de casillas OTP (fijo 6 dígitos)
  const handleOtpChange = (index, value) => {
    const cleanVal = value.replace(/[^0-9]/g, '');
    if (!cleanVal && value !== '') return;

    const newDigits = [...otpDigits];
    newDigits[index] = cleanVal.slice(-1);
    setOtpDigits(newDigits);
    setErrorMessage('');

    // Si escribió un dígito, avanzar al siguiente input (hasta el 6to, index 5)
    if (cleanVal && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Si completó los 6 dígitos, auto-verificar de inmediato
    const allFilled = newDigits.every(d => d !== '');
    if (allFilled) {
      const token = newDigits.join('');
      executeVerifyOtp(token);
    }
  };

  // Manejo de tecla Retroceso (Backspace) en OTP
  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Soporte para pegar código de 6 dígitos desde el portapapeles
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9]/g, '');
    if (!pastedData) return;

    const newDigits = Array(6).fill('');
    for (let i = 0; i < Math.min(pastedData.length, 6); i++) {
      newDigits[i] = pastedData[i] || '';
    }
    setOtpDigits(newDigits);

    if (pastedData.length >= 6) {
      executeVerifyOtp(pastedData.slice(0, 6));
    } else {
      const nextIdx = Math.min(pastedData.length, 5);
      inputRefs.current[nextIdx]?.focus();
    }
  };

  // Ejecutar verificación del código con Supabase Auth (estricto 6 dígitos)
  const executeVerifyOtp = async (tokenToVerify) => {
    const token = tokenToVerify || otpDigits.join('');
    if (token.length < 6) {
      setErrorMessage('Por favor ingresa los 6 dígitos del código.');
      return;
    }

    setIsVerifyingOtp(true);
    setErrorMessage('');

    try {
      const cleanEmail = formData.email.trim().toLowerCase();

      const { data, error } = await supabase.auth.verifyOtp({
        email: cleanEmail,
        token: token.trim(),
        type: 'email'
      });

      if (error) {
        console.error('Error verificando OTP Supabase:', error);
        setIsVerifyingOtp(false);
        setErrorMessage('El código ingresado es incorrecto o ha expirado. Por favor verifica tu correo.');
        return;
      }

      // Verificación exitosa 100% confirmada
      setIsVerifyingOtp(false);
      setSuccessNotice('¡Correo verificado con éxito! Redirigiendo a tu ficha de inscripción...');

      setTimeout(() => {
        if (onVerified) {
          onVerified({
            nombre: formData.nombre.trim(),
            rut: formData.rut.trim(),
            email: cleanEmail,
            telefono: formData.telefono.trim(),
            region: formData.region,
            ciudad: effectiveCity,
            supabaseSession: data?.session || null,
            supabaseUser: data?.user || null
          });
        }
      }, 700);

    } catch (err) {
      console.error('Error en executeVerifyOtp:', err);
      setIsVerifyingOtp(false);
      setErrorMessage(err.message || 'Error al validar el código.');
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
      
      {/* ================= CABECERA DEL CURSO SELECCIONADO ================= */}
      <div className={`p-5 sm:p-6 border-b transition-all ${
        selectedCourse.school === 'seguridad'
          ? 'bg-gradient-to-r from-slate-900 via-[#071626] to-[#0A7D8C] text-white border-sky-900'
          : 'bg-gradient-to-r from-slate-900 via-[#062422] to-[#00A896] text-white border-teal-900'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md tracking-wider ${
                selectedCourse.school === 'seguridad'
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-400/30'
                  : 'bg-teal-500/20 text-teal-300 border border-teal-400/30'
              }`}>
                {selectedCourse.school === 'seguridad' ? '🛡️ Escuela de Seguridad Privada' : '⚙️ Escuela de Oficios y SENCE'}
              </span>
              <span className="text-[10px] text-slate-300 bg-white/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                <Clock size={11} />
                <span>{selectedCourse.hours || 'Horas Oficiales'}</span>
              </span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
              {selectedCourse.name}
            </h3>
            <p className="text-xs text-slate-300">
              Ficha oficial de postulación y reserva de cupo OTEC PrevySeg
            </p>
          </div>

          {/* Arancel y Abono del 50% */}
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 text-left sm:text-right">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Arancel Oficial:</span>
            <span className="text-base sm:text-lg font-black text-white font-mono block">
              ${(selectedCourse.price || 140000).toLocaleString('es-CL')} CLP
            </span>
            <span className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded inline-block mt-0.5">
              Abono 50%: ${Math.round((selectedCourse.price || 140000) / 2).toLocaleString('es-CL')} CLP
            </span>
          </div>
        </div>
      </div>

      {/* ================= CONTENIDO INTERACTIVO (PASO 1A: FORMULARIO vs PASO 1B: VERIFICACIÓN) ================= */}
      <div className="p-6 sm:p-8">
        
        {/* ================= VISTA 1: FICHA REDUCIDA A 6 CAMPOS ================= */}
        {flowStep === 'FORM' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Título de la sección y barra de progreso de los 6 campos */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-sky-50 text-[#0284c7] font-black text-xs flex items-center justify-center border border-sky-200">
                    1
                  </span>
                  <h4 className="text-base sm:text-lg font-black text-slate-900">
                    Ficha de Inscripción • Identificación del Alumno
                  </h4>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Ingresa tus 6 datos personales para validar tu correo y acceder a la matrícula oficial.
                </p>
              </div>

              {/* Indicador visual de 6 campos */}
              <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-50 px-3.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold">
                <span className="text-slate-500">Progreso:</span>
                <span className={`font-mono font-black ${completedCount === 6 ? 'text-emerald-600' : 'text-[#0284c7]'}`}>
                  {completedCount} de 6 datos
                </span>
                <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden ml-1">
                  <div
                    className="h-full bg-gradient-to-r from-[#0284c7] to-[#00c2b2] transition-all duration-300"
                    style={{ width: `${(completedCount / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Error si ocurre alguno */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Cuadrícula limpia y ordenada de los 6 campos (2 columnas) */}
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 text-xs">
                
                {/* 1. NOMBRE COMPLETO */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <User size={15} className="text-[#0284c7]" />
                      <span>1. Nombre Completo *</span>
                    </span>
                    {isNameValid && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Listo
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    required
                    name="nombre"
                    placeholder="Ej. Juan Carlos Pérez González"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] transition-all"
                  />
                </div>

                {/* 2. RUT */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={15} className="text-[#0284c7]" />
                      <span>2. RUT / Cédula de Identidad *</span>
                    </span>
                    {formData.rut && (
                      isRutValid ? (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> RUT Válido
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-600 font-bold">
                          RUT incompleto
                        </span>
                      )
                    )}
                  </label>
                  <input
                    type="text"
                    required
                    name="rut"
                    maxLength={12}
                    placeholder="Ej. 18.643.817-5"
                    value={formData.rut}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      formData.rut && !isRutValid
                        ? 'border-amber-300 focus:ring-amber-500'
                        : isRutValid
                          ? 'border-emerald-300 focus:ring-emerald-500'
                          : 'border-slate-200 focus:ring-[#0284c7]'
                    }`}
                  />
                </div>

                {/* 3. CORREO ELECTRÓNICO */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail size={15} className="text-[#0284c7]" />
                      <span>3. Correo Electrónico *</span>
                    </span>
                    {formData.email && (
                      isEmailValid ? (
                        <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                          <CheckCircle2 size={12} /> Formato Válido
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-600 font-bold">
                          Correo inválido
                        </span>
                      )
                    )}
                  </label>
                  <input
                    type="email"
                    required
                    name="email"
                    placeholder="tu.correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      formData.email && !isEmailValid
                        ? 'border-amber-300 focus:ring-amber-500'
                        : isEmailValid
                          ? 'border-emerald-300 focus:ring-emerald-500'
                          : 'border-slate-200 focus:ring-[#0284c7]'
                    }`}
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Aquí recibirás el código de confirmación oficial de 6 dígitos.
                  </span>
                </div>

                {/* 4. TELÉFONO / WHATSAPP */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone size={15} className="text-emerald-600" />
                      <span>4. Teléfono / WhatsApp *</span>
                    </span>
                    {formData.telefono && isPhoneValid && (
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 size={12} /> Listo
                      </span>
                    )}
                  </label>
                  <input
                    type="tel"
                    required
                    name="telefono"
                    placeholder="Ej. +56 9 8231 2128"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 block">
                    Para coordinar recepción de documentación y aula virtual.
                  </span>
                </div>

                {/* 5. REGIÓN DE RESIDENCIA */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-rose-500" />
                      <span>5. Región de Residencia *</span>
                    </span>
                    <span className="text-[10px] bg-sky-50 text-[#0284c7] font-bold px-1.5 py-0.5 rounded">
                      16 Regiones
                    </span>
                  </label>
                  <select
                    name="region"
                    value={formData.region}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer font-medium"
                  >
                    {REGIONES_CHILE.map(r => (
                      <option key={r.id} value={r.name}>{r.name}</option>
                    ))}
                  </select>
                </div>

                {/* 6. CIUDAD / COMUNA */}
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Building2 size={15} className="text-[#0284c7]" />
                      <span>6. Ciudad / Comuna *</span>
                    </span>
                    <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">
                      Seleccionable
                    </span>
                  </label>
                  <select
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] cursor-pointer font-medium"
                  >
                    {(REGIONES_CHILE.find(r => r.name === formData.region)?.cities || ['Arica']).map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                    <option value="OTRA">➕ Otra ciudad o localidad...</option>
                  </select>

                  {formData.ciudad === 'OTRA' && (
                    <input
                      type="text"
                      required
                      placeholder="Escribe el nombre de tu ciudad o pueblo..."
                      value={otherCityName}
                      onChange={(e) => setOtherCityName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 mt-2 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  )}
                </div>

              </div>

              {/* ================= BOTÓN REACTIVO DE CONFIRMACIÓN ================= */}
              <div className="pt-4 border-t border-slate-200">
                <AnimatePresence mode="wait">
                  {isFormValid ? (
                    // Botón Habilitado con Animación y Efecto Glow
                    <motion.div
                      key="btn-confirm-active"
                      initial={{ opacity: 0, y: 15, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-3"
                    >
                      <button
                        type="submit"
                        disabled={isSendingOtp}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2] hover:from-sky-600 hover:to-teal-600 text-white font-black text-sm sm:text-base shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3 cursor-pointer transition-all border border-sky-300/40"
                      >
                        {isSendingOtp ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Enviando Código de Confirmación a tu Correo...</span>
                          </span>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Confirmar Datos y Enviar Código al Correo</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5">
                        <Lock size={12} className="text-emerald-600" />
                        <span>Enviaremos un código numérico seguro de 6 dígitos a <strong>{formData.email}</strong></span>
                      </p>
                    </motion.div>
                  ) : (
                    // Mensaje Guía Mientras Completa los Datos
                    <motion.div
                      key="btn-confirm-disabled"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1.5"
                    >
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-600">
                        <Sparkles size={15} className="text-[#0284c7]" />
                        <span>Completa los 6 datos personales para habilitar el botón de confirmación</span>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        Asegúrate de ingresar un RUT y correo electrónico válidos.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </motion.div>
        )}

        {/* ================= VISTA 2: PANTALLA DE VERIFICACIÓN OTP (6 DÍGITOS) ================= */}
        {flowStep === 'VERIFY_OTP' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-lg mx-auto text-center space-y-6 py-2"
          >
            {/* Ícono animado */}
            <div className="w-16 h-16 rounded-3xl bg-sky-50 text-[#0284c7] flex items-center justify-center mx-auto border-2 border-sky-200 shadow-md">
              <Mail size={32} className="animate-bounce" />
            </div>

            {/* Títulos informativos */}
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                Capa de Seguridad PrevySeg
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Verifica tu Correo Electrónico
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Hemos enviado un código oficial de 6 dígitos a:
              </p>
              
              {/* Tarjeta con el correo y botón de editar */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 font-mono font-bold text-xs sm:text-sm text-slate-900">
                <Mail size={14} className="text-[#0284c7]" />
                <span>{formData.email}</span>
                <button
                  type="button"
                  onClick={() => setFlowStep('FORM')}
                  className="text-xs font-bold text-[#0284c7] hover:underline flex items-center gap-1 ml-2 cursor-pointer"
                  title="Cambiar correo si te equivocaste"
                >
                  <Edit3 size={12} />
                  <span>Modificar</span>
                </button>
              </div>
            </div>

            {/* Mensajes de error o éxito */}
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2 text-left">
                <AlertCircle size={16} className="text-rose-600 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {successNotice && (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2 text-left">
                <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0" />
                <span>{successNotice}</span>
              </div>
            )}

            {/* ================= CASILLAS DE CÓDIGO OTP (6 DÍGITOS FIJOS) ================= */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">
                Ingresa los 6 dígitos recibidos:
              </label>

              <div className="flex justify-center items-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={el => (inputRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleOtpChange(idx, e.target.value)}
                    onKeyDown={e => handleOtpKeyDown(idx, e)}
                    className="w-11 h-14 sm:w-13 sm:h-16 text-center font-black font-mono bg-slate-50 border-2 border-slate-200 rounded-2xl focus:bg-white focus:border-[#0284c7] focus:ring-4 focus:ring-sky-100 focus:outline-none transition-all text-slate-900 shadow-sm text-xl sm:text-2xl"
                  />
                ))}
              </div>
            </div>

            {/* Botón manual de validación */}
            <button
              type="button"
              disabled={isVerifyingOtp || otpDigits.some(d => !d)}
              onClick={() => executeVerifyOtp()}
              className={`w-full py-3.5 px-6 rounded-2xl font-black text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                otpDigits.every(d => d !== '')
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white cursor-pointer shadow-emerald-500/20'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              {isVerifyingOtp ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verificando con Supabase...</span>
                </span>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Validar Código y Continuar a la Matrícula</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Temporizador de reenvío de correo */}
            <div className="pt-2 text-xs text-slate-500 flex flex-col items-center gap-1.5">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="font-bold text-[#0284c7] hover:underline flex items-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw size={14} />
                  <span>¿No recibiste el correo? Haz clic para reenviar código</span>
                </button>
              ) : (
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Clock size={13} />
                  <span>Podrás solicitar otro código en: <strong className="font-mono text-slate-600">{countdown}s</strong></span>
                </span>
              )}
              <span className="text-[11px] text-slate-400">
                Revisa también tu bandeja de Spam o Correo no deseado si no lo ves de inmediato.
              </span>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default PreEnrollmentStep;
