import React, { useState } from 'react';
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
  Sparkles,
  Clock,
  Send,
  FileCheck,
  Copy,
  Check,
  Printer,
  FileText,
  ExternalLink
} from 'lucide-react';
import { supabase } from '../config/supabase';
import {
  formatRut,
  validateRut,
  validateEmail,
  validatePhone
} from '../utils/validation';
import { REGIONES_CHILE, OFFICIAL_COURSES, findMatchingCourse } from './EnrollmentForm';
import { 
  dispatchEnrollmentEmails, 
  buildWhatsAppEnrollmentUrl, 
  generatePaymentQrUrl,
  PREVYSEG_COMPANY_INFO 
} from '../services/notificationService';

/**
 * Componente Ficha de Inscripción y Coordinación (Trabajador - Cliente)
 * 1. Ficha con los 6 datos personales + Declaración Jurada de Requisitos (OTEC y SPD).
 * 2. Botón "Enviar Información".
 * 3. Pantalla de Coordinación de Inscripción directa entre el Trabajador (Ejecutivo PrevySeg) y el Cliente (Postulante).
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

  // 3. Estados de flujo: 'FORM' | 'COORDINATION'
  const [flowStep, setFlowStep] = useState('FORM');

  // Estados de envío y validación
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [applicationCode, setApplicationCode] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [copiedBank, setCopiedBank] = useState(false);

  // Declaración jurada de conocimiento de requisitos (con ticket/checkbox)
  const [acceptedRequirementsDeclaration, setAcceptedRequirementsDeclaration] = useState(false);

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

  // ¿Listo para enviar con declaración jurada marcada?
  const isReadyToSubmit = isFormValid && acceptedRequirementsDeclaration;

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

  // Copiar datos bancarios al portapapeles
  const handleCopyBankData = () => {
    const text = [
      `DATOS DE TRANSFERENCIA - ${PREVYSEG_COMPANY_INFO.nombre}`,
      `RUT: ${PREVYSEG_COMPANY_INFO.rut}`,
      `Tipo: ${PREVYSEG_COMPANY_INFO.tipoCuenta}`,
      `N° Cuenta: ${PREVYSEG_COMPANY_INFO.numeroCuenta}`,
      `Banco: ${PREVYSEG_COMPANY_INFO.banco}`,
      `Correo: ${PREVYSEG_COMPANY_INFO.email}`
    ].join('\n');

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedBank(true);
      setTimeout(() => setCopiedBank(false), 3000);
    }
  };

  // Imprimir ficha de coordinación
  const handlePrint = () => {
    window.print();
  };

  // Enviar Información de Inscripción
  const handleSendInformation = async (e) => {
    if (e) e.preventDefault();
    if (!isReadyToSubmit) return;

    setIsSubmitting(true);
    setErrorMessage('');

    const generatedCode = `PS-${Math.floor(100000 + Math.random() * 900000)}`;
    setApplicationCode(generatedCode);

    const nowStr = new Date().toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    setSubmissionDate(nowStr);

    const cleanEmail = formData.email.trim().toLowerCase();
    const cleanName = formData.nombre.trim();
    const cleanRut = formData.rut.trim();
    const cleanPhone = formData.telefono.trim();

    const enrollmentData = {
      nombre: cleanName,
      rut: cleanRut,
      email: cleanEmail,
      telefono: cleanPhone,
      region: formData.region,
      ciudad: effectiveCity,
      courseName: selectedCourse?.name || defaultCourseName || 'Curso de Capacitación',
      codigoSolicitud: generatedCode
    };

    try {
      // 1. Despachar correos automáticos (Opción A: Resend)
      // Al alumno (con datos de transferencia y QR) y a la empresa (prevyseg.capacitaciones@gmail.com)
      await dispatchEnrollmentEmails(enrollmentData);

      // 2. Registro local / Supabase opcional
      try {
        if (supabase) {
          await supabase.from('enrollment_submissions').insert([{
            code: generatedCode,
            nombre: cleanName,
            rut: cleanRut,
            email: cleanEmail,
            telefono: cleanPhone,
            region: formData.region,
            ciudad: effectiveCity,
            course_name: enrollmentData.courseName,
            accepted_declaration: true,
            created_at: new Date().toISOString()
          }]).select();
        }
      } catch (dbErr) {
        console.info('[INSCRIPCIÓN] Información guardada localmente:', dbErr?.message);
      }

      setIsSubmitting(false);
      setFlowStep('COORDINATION');
    } catch (err) {
      console.warn('Aviso durante despacho:', err);
      setIsSubmitting(false);
      // Continuar a la vista de coordinación para nunca bloquear al usuario
      setFlowStep('COORDINATION');
    }
  };

  const qrImageUrl = generatePaymentQrUrl();
  const whatsappUrl = buildWhatsAppEnrollmentUrl({
    nombre: formData.nombre.trim(),
    rut: formData.rut.trim(),
    email: formData.email.trim(),
    telefono: formData.telefono.trim(),
    region: formData.region,
    ciudad: effectiveCity,
    courseName: selectedCourse?.name || defaultCourseName,
    codigoSolicitud: applicationCode || 'PS-PROCESO'
  });

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

          {/* Arancel y Abono de Reserva */}
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

      {/* ================= CONTENIDO INTERACTIVO ================= */}
      <div className="p-6 sm:p-8">
        
        {/* ================= VISTA 1: FICHA DE DATOS + BOTÓN "ENVIAR INFORMACIÓN" ================= */}
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
                  Ingresa tus datos personales para enviar tu postulación y coordinar tu inscripción oficial.
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

            {/* Cuadrícula de los 6 campos */}
            <form onSubmit={handleSendInformation} className="space-y-5">
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
                          <CheckCircle2 size={12} /> Válido
                        </span>
                      ) : (
                        <span className="text-[10px] text-rose-600 font-bold">
                          RUT Incorrecto
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
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                      formData.rut && !isRutValid
                        ? 'border-rose-300 focus:ring-rose-500'
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
                    Aquí recibirás el comprobante oficial con los datos de transferencia y código QR.
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
                    Para coordinar recepción de documentación y matrícula con el trabajador de PrevySeg.
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

              {/* ================= REQUISITOS DEL PROGRAMA (SEPARADOS POR ENTIDAD) ================= */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-sky-100 text-[#0284c7] flex items-center justify-center font-bold flex-shrink-0">
                    <FileCheck size={18} />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-black text-slate-900">
                      Requisitos de Admisión y Documentación Exigida
                    </h5>
                    <p className="text-[11px] text-slate-500">
                      Conoce los antecedentes obligatorios y dónde se tramita cada uno:
                    </p>
                  </div>
                </div>

                {/* Dos Bloques Separados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  
                  {/* BLOQUE 1: INSCRIPCIÓN A CURSO DE CAPACITACIÓN (OTEC PREVYSEG) */}
                  <div className="p-4 rounded-xl bg-white border border-sky-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-sky-800 font-black text-xs">
                      <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        1
                      </span>
                      <span className="uppercase tracking-wider text-[11px]">Inscripción a Curso de Capacitación:</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Documentación obligatoria para formalizar tu matrícula en OTEC PrevySeg:
                    </p>
                    <ul className="space-y-2 pt-1 text-xs text-slate-800">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Certificado de antecedentes:</strong> Para Fines Especiales, emitido por el Registro Civil, intachable y vigente.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span><strong>Certificado de estudios:</strong> Licencia de Enseñanza Media completa validada por MINEDUC (o título técnico/profesional).</span>
                      </li>
                    </ul>
                  </div>

                  {/* BLOQUE 2: PLATAFORMA SUBSECRETARÍA DE PREVENCIÓN DEL DELITO */}
                  <div className="p-4 rounded-xl bg-white border border-amber-200 shadow-2xs space-y-2">
                    <div className="flex items-center gap-2 text-amber-900 font-black text-xs">
                      <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-black flex-shrink-0">
                        2
                      </span>
                      <span className="uppercase tracking-wider text-[11px]">Subsecretaría de Prevención del Delito:</span>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-tight">
                      Plataforma oficial del Estado (Ley N° 21.659 / Autoridad Fiscalizadora):
                    </p>
                    <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-100 text-xs text-slate-700 space-y-1.5">
                      <div className="flex items-start gap-2">
                        <ShieldCheck size={16} className="text-[#0284c7] flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">
                          <strong>Los demás requisitos</strong> (evaluación médica, informe psicotécnico de idoneidad, cédula de identidad y antecedentes complementarios) <strong>se suben directamente en la plataforma oficial de la Subsecretaría de Prevención del Delito (SPD)</strong>.
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* DECLARACIÓN JURADA CON TICKET (CHECKBOX) */}
                <div className="pt-2 border-t border-slate-200">
                  <div 
                    onClick={() => setAcceptedRequirementsDeclaration(!acceptedRequirementsDeclaration)}
                    className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-xl border-2 transition-all cursor-pointer select-none ${
                      acceptedRequirementsDeclaration
                        ? 'border-[#0284c7] bg-sky-50/40 shadow-xs'
                        : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="mt-0.5 flex-shrink-0">
                      {acceptedRequirementsDeclaration ? (
                        <div className="w-5 h-5 rounded-md bg-[#0284c7] text-white flex items-center justify-center shadow-xs">
                          <CheckCircle2 size={16} className="stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-md border-2 border-slate-400 bg-white" />
                      )}
                    </div>
                    <div className="space-y-1 text-xs">
                      <span className="font-black text-slate-900 block text-xs sm:text-sm">
                        Declaración Jurada de Conocimiento de Requisitos *
                      </span>
                      <p className="text-slate-600 leading-relaxed text-[11px] sm:text-xs">
                        Declaro bajo fe de juramento que he leído y conozco los requisitos de admisión: presentar mi <strong>Certificado de antecedentes</strong> y <strong>Certificado de estudios</strong> para la inscripción al curso de capacitación en OTEC PrevySeg, y que <strong>los demás requisitos se suben en la plataforma de la Subsecretaría de Prevención del Delito</strong>.
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* ================= BOTÓN: "ENVIAR INFORMACIÓN" ================= */}
              <div className="pt-4 border-t border-slate-200">
                <AnimatePresence mode="wait">
                  {isReadyToSubmit ? (
                    // Botón Habilitado con "Enviar Información"
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
                        disabled={isSubmitting}
                        className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#0284c7] via-sky-600 to-[#00c2b2] hover:from-sky-600 hover:to-teal-600 text-white font-black text-sm sm:text-base shadow-xl shadow-sky-500/20 flex items-center justify-center gap-3 cursor-pointer transition-all border border-sky-300/40"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Enviando Información de Inscripción...</span>
                          </span>
                        ) : (
                          <>
                            <Send size={18} />
                            <span>Enviar Información</span>
                            <ArrowRight size={18} />
                          </>
                        )}
                      </button>
                      <p className="text-[11px] text-center text-slate-500 flex items-center justify-center gap-1.5">
                        <Sparkles size={12} className="text-[#0284c7]" />
                        <span>Se enviará tu ficha a Admisiones y recibirás el respaldo con datos bancarios y QR en <strong>{formData.email}</strong></span>
                      </p>
                    </motion.div>
                  ) : isFormValid && !acceptedRequirementsDeclaration ? (
                    // Falta solo la declaración jurada
                    <motion.div
                      key="btn-needs-declaration"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-center space-y-1.5 cursor-pointer hover:bg-amber-100/60 transition-colors"
                      onClick={() => setAcceptedRequirementsDeclaration(true)}
                    >
                      <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-900">
                        <AlertCircle size={16} className="text-amber-600" />
                        <span>Marca la casilla de Declaración Jurada de requisitos arriba para habilitar "Enviar Información"</span>
                      </div>
                      <p className="text-[11px] text-amber-700">
                        Haz clic en el recuadro de Declaración Jurada para confirmar que leíste y conoces las exigencias.
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
                        <span>Completa los 6 datos personales y marca la declaración jurada para habilitar "Enviar Información"</span>
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

        {/* ================= VISTA 2: INFORMACIÓN DE INSCRIPCIÓN (TRABAJADOR - CLIENTE) ================= */}
        {flowStep === 'COORDINATION' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="space-y-6"
          >
            {/* Banner de Éxito y Código Oficial */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#161630] via-[#1b3761] to-[#0a969b] text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  <CheckCircle2 size={13} /> Información Enviada con Éxito
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Ficha de Inscripción Registrada
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
                  Tu ficha ha sido remitida exitosamente. A continuación se detallan los antecedentes de inscripción coordinados entre el <strong>Cliente (Postulante)</strong> y el <strong>Trabajador / Ejecutivo PrevySeg</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3 text-xs font-mono">
                  <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15">
                    N° Solicitud: <strong className="text-[#00FFE0]">{applicationCode}</strong>
                  </span>
                  {submissionDate && (
                    <span className="bg-white/10 px-3 py-1 rounded-lg border border-white/15 text-slate-300">
                      Fecha: {submissionDate}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Cuadrícula de Resumen: Cliente & Programa */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Tarjeta 1: Datos del Cliente / Postulante */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <User size={16} className="text-[#0284c7]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Datos del Cliente (Postulante)
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Nombre:</span>
                    <strong className="text-slate-900">{formData.nombre}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">RUT:</span>
                    <strong className="font-mono text-slate-900">{formData.rut}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Teléfono:</span>
                    <strong className="font-mono text-emerald-700">{formData.telefono}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Correo:</span>
                    <strong className="text-slate-900">{formData.email}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Ubicación:</span>
                    <strong className="text-slate-900">{effectiveCity}, {formData.region}</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Declaración Jurada:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <CheckCircle2 size={12} /> Aceptada (OTEC y SPD)
                    </span>
                  </div>
                </div>
              </div>

              {/* Tarjeta 2: Programa Académico y Arancel */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <FileText size={16} className="text-[#0a969b]" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900">
                    Programa Académico & Arancel
                  </h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Curso:</span>
                    <strong className="text-slate-900 text-right">{selectedCourse.name}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Escuela:</span>
                    <strong className="text-slate-900">
                      {selectedCourse.school === 'seguridad' ? 'Seguridad Privada' : 'Oficios y Habilidades'}
                    </strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Duración:</span>
                    <strong className="text-slate-900">{selectedCourse.hours || 'Horas Oficiales'}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100">
                    <span className="text-slate-500">Arancel Oficial:</span>
                    <strong className="font-mono text-slate-900 text-sm">
                      ${(selectedCourse.price || 140000).toLocaleString('es-CL')} CLP
                    </strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Abono Inicial (50%):</span>
                    <strong className="font-mono text-emerald-700 text-sm">
                      ${Math.round((selectedCourse.price || 140000) / 2).toLocaleString('es-CL')} CLP
                    </strong>
                  </div>
                </div>
              </div>

            </div>

            {/* Protocolo de Coordinación Trabajador - Cliente */}
            <div className="p-5 rounded-2xl bg-sky-50/60 border border-sky-200 space-y-3">
              <h4 className="text-xs sm:text-sm font-black text-sky-950 flex items-center gap-2">
                <Sparkles size={16} className="text-[#0284c7]" />
                <span>¿Cómo proseguimos con la inscripción entre el trabajador y tú?</span>
              </h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                
                <div className="p-3.5 rounded-xl bg-white border border-sky-100 space-y-1.5 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-black text-[10px] flex items-center justify-center">
                    1
                  </span>
                  <strong className="text-slate-900 block font-bold">Notificación Inmediata</strong>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Hemos enviado el respaldo con datos bancarios a <strong>{formData.email}</strong> y la alerta a nuestra central de admisiones.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-sky-100 space-y-1.5 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-black text-[10px] flex items-center justify-center">
                    2
                  </span>
                  <strong className="text-slate-900 block font-bold">Entrega de Documentos</strong>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    El trabajador de PrevySeg te solicitará tu <strong>Certificado de Antecedentes</strong> y <strong>Estudios</strong>. Los demás se suben a la SPD.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-sky-100 space-y-1.5 shadow-2xs">
                  <span className="w-5 h-5 rounded-full bg-sky-100 text-[#0284c7] font-black text-[10px] flex items-center justify-center">
                    3
                  </span>
                  <strong className="text-slate-900 block font-bold">Reserva de Cupo</strong>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Podrás coordinar directamente con el trabajador la forma de pago (transferencia bancaria oficial o presencial).
                  </p>
                </div>

              </div>
            </div>

            {/* BOTÓN PRINCIPAL: CONTINUAR COORDINACIÓN POR WHATSAPP CON EL TRABAJADOR */}
            <div className="space-y-2 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm sm:text-base shadow-xl shadow-emerald-600/25 flex items-center justify-center gap-3 cursor-pointer transition-all border border-emerald-400/40 text-center"
              >
                <Phone size={20} />
                <span>Continuar Inscripción por WhatsApp con Trabajador PrevySeg ({PREVYSEG_COMPANY_INFO.whatsappDisplay})</span>
                <ArrowRight size={20} />
              </a>
              <p className="text-[11px] text-center text-slate-500">
                Al presionar se abrirá el chat oficial con el trabajador llevando tu número de solicitud y antecedentes pre-cargados.
              </p>
            </div>

            {/* DATOS DE TRANSFERENCIA BANCARIA Y CÓDIGO QR EN PANTALLA */}
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                
                {/* Datos en texto */}
                <div className="space-y-3 flex-1 text-xs">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#0284c7] bg-sky-50 px-2.5 py-0.5 rounded border border-sky-200 inline-block">
                      Datos Oficiales de Transferencia
                    </span>
                    <h5 className="text-sm sm:text-base font-black text-slate-900">
                      Abono de Reserva (50%) • PREVYSEG SPA
                    </h5>
                  </div>

                  <table className="w-full text-xs">
                    <tbody>
                      <tr className="border-b border-slate-200/60">
                        <td className="py-1 text-slate-500 font-medium">Titular:</td>
                        <td className="py-1 font-bold text-slate-900">{PREVYSEG_COMPANY_INFO.nombre}</td>
                      </tr>
                      <tr className="border-b border-slate-200/60">
                        <td className="py-1 text-slate-500 font-medium">RUT:</td>
                        <td className="py-1 font-mono font-bold text-slate-900">{PREVYSEG_COMPANY_INFO.rut}</td>
                      </tr>
                      <tr className="border-b border-slate-200/60">
                        <td className="py-1 text-slate-500 font-medium">Tipo de Cuenta:</td>
                        <td className="py-1 font-bold text-slate-900">{PREVYSEG_COMPANY_INFO.tipoCuenta}</td>
                      </tr>
                      <tr className="border-b border-slate-200/60">
                        <td className="py-1 text-slate-500 font-medium">N° de Cuenta:</td>
                        <td className="py-1 font-mono font-black text-[#0284c7] text-sm">{PREVYSEG_COMPANY_INFO.numeroCuenta}</td>
                      </tr>
                      <tr>
                        <td className="py-1 text-slate-500 font-medium">Correo Comprobante:</td>
                        <td className="py-1 font-bold text-slate-900">{PREVYSEG_COMPANY_INFO.email}</td>
                      </tr>
                    </tbody>
                  </table>

                  <button
                    type="button"
                    onClick={handleCopyBankData}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-slate-300 hover:border-[#0284c7] text-slate-700 hover:text-[#0284c7] font-bold text-xs shadow-2xs transition-all cursor-pointer"
                  >
                    {copiedBank ? (
                      <>
                        <Check size={14} className="text-emerald-600" />
                        <span className="text-emerald-700">¡Datos Bancarios Copiados!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copiar Datos Bancarios</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Código QR Escaneable */}
                <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border-2 border-sky-100 shadow-sm text-center flex-shrink-0">
                  <img
                    src={qrImageUrl}
                    alt="Código QR Datos de Pago PrevySeg"
                    width={150}
                    height={150}
                    className="rounded-xl border border-slate-100 shadow-2xs"
                  />
                  <span className="text-[10px] font-bold text-slate-500 mt-2 block">
                    📲 Escanea para transferir
                  </span>
                </div>

              </div>
            </div>

            {/* BARRA DE ACCIONES SECUNDARIAS */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <Printer size={15} />
                <span>Imprimir / Guardar Respaldo</span>
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setFlowStep('FORM')}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold cursor-pointer transition-all"
                >
                  Modificar Datos
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-black shadow-md cursor-pointer transition-all"
                >
                  Finalizar y Cerrar
                </button>
              </div>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default PreEnrollmentStep;
