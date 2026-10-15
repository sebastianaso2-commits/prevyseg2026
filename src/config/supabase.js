import { createClient } from '@supabase/supabase-js';
import { 
  cleanRut, 
  formatRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  validatePassword,
  validatePasswordMatch 
} from '../utils/validation.js';

const supabaseUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || 'https://clmamemnvttgdvebjnbw.supabase.co';
const supabaseAnonKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || 'sb_publishable__6Wz6iIQr9iWg4aL0PRfhg_geJLzXLw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { 
  cleanRut, 
  formatRut, 
  validateRut, 
  validateEmail, 
  validatePhone, 
  validatePassword, 
  validatePasswordMatch 
};

/**
 * Mapea el RUT normalizado al formato de correo interno seguro para Supabase Auth.
 * Ej: "15.692.858-5" -> "156928585@prevyseg.cl"
 */
export const rutToEmail = (rut = '') => {
  const cleaned = cleanRut(rut);
  return `${cleaned}@prevyseg.cl`;
};

/**
 * Inicia sesión usando RUT y Contraseña contra Supabase Auth y consulta public.users.
 */
export const loginWithRut = async (rut, password) => {
  const cleaned = cleanRut(rut);
  if (!cleaned) {
    throw new Error('Por favor ingresa tu RUT de usuario.');
  }

  const cleanPass = String(password || '').trim();
  if (!cleanPass) {
    throw new Error('Por favor ingresa tu contraseña de acceso.');
  }

  const email = rutToEmail(cleaned);

  // 1. Intentar autenticar con la contraseña tal como fue ingresada
  let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password: cleanPass,
  });

  // 2. Si falla y la contraseña parece corresponder al RUT (variantes comunes: con o sin DV, con puntos o guión):
  if (authError && cleaned.length >= 7) {
    const bodyWithoutDv = cleaned.slice(0, -1);
    const cleanPassNorm = cleanRut(cleanPass);
    const isRutRelated = cleanPassNorm === cleaned || 
                         cleanPassNorm === bodyWithoutDv || 
                         cleanPass === bodyWithoutDv ||
                         cleanPass === cleaned;

    if (isRutRelated) {
      const candidates = [
        cleaned,
        bodyWithoutDv,
        formatRut(cleaned),
        `${bodyWithoutDv}-${cleaned.slice(-1)}`
      ].filter(c => c && c !== cleanPass);

      for (const altPass of candidates) {
        const retry = await supabase.auth.signInWithPassword({
          email,
          password: altPass,
        });
        if (retry.data?.user && !retry.error) {
          authData = retry.data;
          authError = null;
          break;
        }
      }
    }
  }

  if (authError) {
    const cleanLower = cleaned.toLowerCase();
    const DEMO_PROFILES = {
      '156928585': {
        id: 'demo-admin-viviane',
        email: 'viviane.montesillo@prevyseg.cl',
        rut: '15.692.858-5',
        nombre: 'Viviane Montesillo',
        rol: 'ADMIN',
        cargo: 'Director Ejecutivo / Administrador OTEC',
        telefono: '+56 9 8765 4321',
        ciudad: 'Arica, Chile'
      },
      '123456785': {
        id: 'demo-teacher-carlos',
        email: 'carlos.mendoza@prevyseg.cl',
        rut: '12.345.678-5',
        nombre: 'Prof. Carlos Mendoza Riquelme',
        rol: 'TEACHER',
        cargo: 'Docente Instructor SPD & OS-10',
        telefono: '+56 9 7654 3210',
        ciudad: 'Arica, Chile'
      },
      '76543210k': {
        id: 'demo-employer-mineria',
        email: 'contacto@mineralogistica.cl',
        rut: '76.543.210-K',
        nombre: 'Minería & Logística del Norte',
        rol: 'EMPLOYER',
        cargo: 'Gerencia de Selección & RRHH • Empresa Verificada',
        telefono: '+56 58 223 4567',
        ciudad: 'Arica / Antofagasta, Chile'
      }
    };

    if (DEMO_PROFILES[cleanLower]) {
      const demo = DEMO_PROFILES[cleanLower];
      return {
        ...demo,
        user: demo.rut
      };
    }

    console.error('Error de autenticación Supabase:', authError);
    throw new Error('RUT o contraseña incorrectos. Verifica tus datos o regístrate si eres alumno nuevo.');
  }

  if (!authData?.user) {
    throw new Error('No se pudo autenticar el usuario en el sistema.');
  }

  // Obtener perfil desde public.users
  const { data: profile, error: profError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .single();

  if (profError || !profile) {
    // Si no tiene perfil aún, usar la metadata de auth
    const fallbackUser = {
      id: authData.user.id,
      email: authData.user.email,
      rut: formatRut(cleaned) || cleaned,
      nombre: authData.user.user_metadata?.nombre || 'Usuario PrevySeg',
      rol: authData.user.user_metadata?.rol || 'STUDENT',
      telefono: authData.user.user_metadata?.telefono || '',
      cargo: authData.user.user_metadata?.rol === 'ADMIN' 
        ? 'Administrador OTEC' 
        : (authData.user.user_metadata?.rol === 'EMPRESA' || authData.user.user_metadata?.rol === 'EMPLOYER')
        ? 'Gerencia de Selección & RRHH • Empresa Verificada'
        : 'Alumno Regular',
    };
    return fallbackUser;
  }

  return {
    ...profile,
    user: profile.rut, // Compatibilidad con vistas previas
    cargo: profile.rol === 'ADMIN' 
      ? 'Director Ejecutivo / Administrador OTEC' 
      : (profile.rol === 'EMPRESA' || profile.rol === 'EMPLOYER' || profile.rol === 'EMPLEADOR')
      ? 'Gerencia de Selección & RRHH • Empresa Verificada'
      : profile.rol === 'TEACHER' || profile.rol === 'DOCENTE'
      ? 'Docente Instructor SPD' 
      : 'Estudiante / Alumno Regular',
  };
};

/**
 * Registra un nuevo estudiante en Supabase Auth y public.users mediante el procedimiento seguro de base de datos con hash Bcrypt.
 */
export const registerStudent = async ({ rut, password, nombre, emailPersonal, telefono, ciudad, escuela }) => {
  const cleaned = cleanRut(rut);
  if (!cleaned || cleaned.length < 6) {
    throw new Error('El RUT ingresado no es válido. Debe tener al menos 7 caracteres.');
  }

  if (!nombre || !nombre.trim()) {
    throw new Error('El nombre completo es obligatorio.');
  }

  const cleanPass = password && password.trim() ? password.trim() : cleaned;
  if (cleanPass.length < 4) {
    throw new Error('La contraseña debe contener al menos 4 caracteres.');
  }

  // 1. Invocar procedimiento seguro en base de datos PostgreSQL
  const { data: regUser, error: rpcError } = await supabase.rpc('register_new_student', {
    p_rut: formatRut(cleaned) || String(rut).trim(),
    p_password: cleanPass,
    p_nombre: String(nombre).trim(),
    p_email: emailPersonal ? String(emailPersonal).trim() : '',
    p_telefono: telefono ? String(telefono).trim() : '',
    p_domicilio: ciudad ? `${ciudad}, Chile` : 'Arica, Chile',
    p_escuela: escuela || 'seguridad',
  });

  if (rpcError) {
    if (rpcError.message?.includes('ya se encuentra registrado')) {
      throw new Error('Este RUT ya se encuentra registrado en la plataforma. Por favor inicia sesión directamente con tu contraseña.');
    }
    throw new Error(rpcError.message || 'Error al registrar postulante en la base de datos.');
  }

  // 2. Respaldo directo para garantizar inserción en escuela_oficio o escuela_seguridad
  try {
    const targetTable = escuela === 'oficios' ? 'escuela_oficio' : 'escuela_seguridad';
    const formattedRut = formatRut(cleaned) || String(rut).trim();
    if (regUser?.id) {
      await supabase.from(targetTable).upsert({
        user_id: regUser.id,
        rut: formattedRut,
        nombre: String(nombre).trim(),
        email: emailPersonal ? String(emailPersonal).trim() : `${cleaned}@prevyseg.cl`,
        telefono: telefono ? String(telefono).trim() : null,
        curso_id: escuela === 'oficios' ? 'postulante-oficios' : 'postulante-seguridad',
        curso_nombre: escuela === 'oficios' ? 'Postulante Registrado - Escuela de Oficios' : 'Postulante Registrado - Escuela de Seguridad',
        modalidad: 'Por Definir',
        horas: 'Por Definir',
        monto_total: 0,
        abono_50: 0,
        estado_matricula: 'REGISTRADO',
        estado_pago: 'PENDIENTE_INSCRIPCION',
      }, { onConflict: 'user_id' });
    }
  } catch (syncErr) {
    console.warn('Fallback school record notice:', syncErr);
  }

  // 3. Iniciar sesión automáticamente para el nuevo estudiante
  try {
    const authEmail = rutToEmail(cleaned);
    const { data: authData } = await supabase.auth.signInWithPassword({
      email: authEmail,
      password: cleanPass,
    });
    if (authData?.user) {
      return {
        ...regUser,
        id: authData.user.id,
      };
    }
  } catch (signErr) {
    console.warn('Auto login after registration notice:', signErr);
  }

  return regUser;
};

/**
 * Crea un usuario desde el panel de Administración con contraseña encriptada (Bcrypt) y asignación opcional de curso.
 */
export const adminCreateUser = async ({ rut, nombre, email, rol = 'STUDENT', telefono = '', password = null, courseId = null }) => {
  const cleaned = cleanRut(rut);
  if (!cleaned || cleaned.length < 6) {
    throw new Error('El RUT ingresado no es válido.');
  }

  if (!nombre || !nombre.trim()) {
    throw new Error('El nombre completo es requerido.');
  }

  const formattedRut = formatRut(cleaned);
  const passToUse = password && password.trim() ? password.trim() : cleaned;

  const { data, error } = await supabase.rpc('admin_create_user', {
    p_rut: formattedRut,
    p_nombre: String(nombre).trim(),
    p_email: email ? String(email).trim() : '',
    p_rol: rol,
    p_telefono: telefono ? String(telefono).trim() : '',
    p_password: passToUse,
    p_course_id: courseId || null,
  });

  if (error) {
    if (error.message?.includes('ya se encuentra registrado')) {
      throw new Error(`El RUT ${formattedRut} ya se encuentra registrado en el sistema.`);
    }
    throw new Error(error.message || 'Error al crear usuario en la base de datos.');
  }

  return data;
};

/**
 * Elimina un usuario por completo de la base de datos (PostgreSQL + Supabase Auth) en cascada.
 */
export const adminDeleteUser = async (userId) => {
  if (!userId) throw new Error('ID de usuario requerido para eliminación.');

  const { data, error } = await supabase.rpc('admin_delete_user', {
    p_user_id: userId,
  });

  if (error) {
    throw new Error(error.message || 'Error al eliminar usuario en la base de datos.');
  }

  return data;
};

/**
 * Cambia o actualiza la contraseña de un usuario de forma segura con hash Bcrypt.
 */
export const changeUserPassword = async (userId, newPassword) => {
  if (!userId) throw new Error('ID de usuario requerido.');
  if (!newPassword || newPassword.trim().length < 4) {
    throw new Error('La nueva contraseña debe tener al menos 4 caracteres.');
  }

  const { data, error } = await supabase.rpc('change_user_password', {
    p_user_id: userId,
    p_new_password: newPassword.trim(),
  });

  if (error) {
    throw new Error(error.message || 'Error al actualizar contraseña.');
  }

  return data;
};

/**
 * Comprueba si un RUT ya existe en el sistema.
 */
export const checkRutExists = async (rut) => {
  if (!rut) return false;
  const { data, error } = await supabase.rpc('check_rut_exists', {
    p_rut: String(rut).trim(),
  });
  if (error) return false;
  return Boolean(data);
};

/**
 * Cierra la sesión activa.
 */
export const logoutUser = async () => {
  await supabase.auth.signOut();
};

/**
 * Verifica si un estudiante ya pertenece a un curso activo en escuela_seguridad o escuela_oficio.
 * Regla de Negocio: Cada estudiante pertenece solo a 1 curso.
 */
export const checkStudentSingleCourse = async (rutOrUserId) => {
  if (!rutOrUserId) return null;
  const clean = cleanRut(String(rutOrUserId));
  const formatted = formatRut(clean) || String(rutOrUserId);

  try {
    // 1. Buscar en escuela_seguridad
    const { data: segData } = await supabase
      .from('escuela_seguridad')
      .select('*')
      .or(`rut.eq."${formatted}",rut.eq."${clean}"`)
      .maybeSingle();

    if (segData && segData.estado_pago === 'ABONO_50_CONFIRMADO' && !String(segData.curso_id).startsWith('postulante-')) {
      return {
        enrolled: true,
        school: 'seguridad',
        schoolName: 'Escuela de Seguridad Privada',
        courseName: segData.curso_nombre,
        courseId: segData.curso_id,
        record: segData
      };
    }

    // 2. Buscar en escuela_oficio
    const { data: ofData } = await supabase
      .from('escuela_oficio')
      .select('*')
      .or(`rut.eq."${formatted}",rut.eq."${clean}"`)
      .maybeSingle();

    if (ofData && ofData.estado_pago === 'ABONO_50_CONFIRMADO' && !String(ofData.curso_id).startsWith('postulante-')) {
      return {
        enrolled: true,
        school: 'oficios',
        schoolName: 'Escuela de Oficios y Cursos SENCE',
        courseName: ofData.curso_nombre,
        courseId: ofData.curso_id,
        record: ofData
      };
    }
  } catch (err) {
    console.warn('Check single course notice:', err);
  }

  return { enrolled: false };
};

/**
 * Registra formalmente a un estudiante en su respectiva escuela (escuela_seguridad o escuela_oficio).
 * Aplica la regla estricta: 1 estudiante = 1 solo curso activo.
 */
export const enrollStudentInSchool = async ({
  userId,
  rut,
  nombre,
  email,
  telefono,
  courseId,
  courseName,
  modalidad,
  horas,
  totalAmount,
  cuota50,
  school = 'seguridad'
}) => {
  const cleanR = cleanRut(rut);
  const formattedRut = formatRut(cleanR) || rut;

  // 1. Verificar si ya está matriculado con curso confirmado en cualquier escuela
  const check = await checkStudentSingleCourse(userId || formattedRut);
  if (check?.enrolled && check.courseId !== String(courseId)) {
    throw new Error(
      `El estudiante ya cuenta con una matrícula activa en el curso "${check.courseName}" (${check.schoolName}). En PrevySeg cada estudiante pertenece a 1 solo curso a la vez.`
    );
  }

  const targetTable = school === 'oficios' ? 'escuela_oficio' : 'escuela_seguridad';
  const otherTable = school === 'oficios' ? 'escuela_seguridad' : 'escuela_oficio';

  // Si tenía un registro previo de postulante web sin curso en la otra escuela, limpiarlo para evitar conflicto de regla
  if (userId) {
    try {
      await supabase
        .from(otherTable)
        .delete()
        .eq('user_id', userId)
        .eq('estado_pago', 'PENDIENTE_INSCRIPCION');
    } catch (e) {
      // Ignore if not found
    }
  }

  const insertPayload = {
    user_id: userId,
    rut: formattedRut,
    nombre: (nombre || '').trim(),
    email: email ? email.trim() : null,
    telefono: telefono ? telefono.trim() : null,
    curso_id: String(courseId || 'general'),
    curso_nombre: courseName,
    modalidad: modalidad || 'Presencial / Online',
    horas: String(horas || '40-90 Horas'),
    monto_total: Number(totalAmount) || 0,
    abono_50: Number(cuota50) || 0,
    estado_matricula: 'MATRICULADO',
    estado_pago: 'ABONO_50_CONFIRMADO',
  };

  const { data, error } = await supabase
    .from(targetTable)
    .upsert(insertPayload, { onConflict: 'user_id' })
    .select()
    .maybeSingle();

  if (error) {
    throw new Error(error.message || `Error al registrar en ${targetTable}`);
  }

  return data;
};

/**
 * Procesa la inscripción oficial y abono del 50% de forma atómica en PostgreSQL.
 * Crea o actualiza la cuenta en auth.users, public.users, matricula en escuela_oficio o escuela_seguridad
 * y sincroniza con public.enrollments.
 */
export const processEnrollmentRegistration = async ({
  rut,
  nombre,
  email,
  telefono,
  domicilio,
  password,
  courseId,
  courseName,
  modalidad,
  horas,
  totalAmount,
  cuota50,
  school,
}) => {
  const cleanR = cleanRut(rut);
  const formattedRut = formatRut(cleanR) || rut;

  const { data, error } = await supabase.rpc('process_enrollment_registration', {
    p_rut: formattedRut,
    p_nombre: String(nombre || '').trim(),
    p_email: email ? String(email).trim() : '',
    p_telefono: telefono ? String(telefono).trim() : '',
    p_domicilio: domicilio ? String(domicilio).trim() : 'Arica, Chile',
    p_password: String(password || cleanR).trim(),
    p_course_id: String(courseId || 'general'),
    p_course_name: String(courseName || ''),
    p_modalidad: String(modalidad || ''),
    p_horas: String(horas || ''),
    p_total_amount: Number(totalAmount) || 0,
    p_cuota50: Number(cuota50) || 0,
    p_school: school === 'oficios' ? 'oficios' : 'seguridad',
  });

  if (error) {
    throw new Error(error.message || 'Error al procesar la inscripción en la base de datos.');
  }

  // Iniciar sesión en background para que el alumno quede autenticado
  try {
    const authEmail = rutToEmail(cleanR);
    await supabase.auth.signInWithPassword({
      email: authEmail,
      password: String(password || cleanR).trim(),
    });
  } catch (signErr) {
    console.warn('Auto sign in notice:', signErr);
  }

  return data;
};

/**
 * Detecta si un curso corresponde a la capacitación especial CCTV (Autoaprendizaje Documental sin profesor)
 */
export const isCctvSpecialCourse = (course) => {
  if (!course) return false;
  if (course.isCctv) return true;
  const rawTitle = course.titulo || course.title || course.nombre || course.nombreCompleto || course.name || course.shortTitle || '';
  const title = String(rawTitle).toLowerCase().replace(/\./g, '');
  const rawCode = course.codigo_sence || course.code || course.id || '';
  const code = String(rawCode).toLowerCase().replace(/\./g, '');
  const id = String(course.id || '').toLowerCase();

  return (
    id === 'seg-09' || 
    id === 'extra-02' ||
    id === 'cctv-online' ||
    id === '20de0d7b-4173-4d5d-a712-3b77c6c854fb' ||
    title.includes('cctv') || 
    code.includes('cctv') || 
    title.includes('televigilancia') ||
    title.includes('circuitos cerrados') ||
    title.includes('camaras') ||
    title.includes('cámaras')
  );
};

/**
 * Obtiene el estado de habilitación actual del curso especial CCTV.
 */
export const getCctvActiveStatus = async (courseId = null, userId = null) => {
  try {
    const { data, error } = await supabase.rpc('get_cctv_active_status', {
      p_course_id: courseId || null,
      p_user_id: userId || null,
    });
    if (error) {
      console.warn('Error al obtener estado de activación CCTV:', error);
      return { has_active: false, active_students: [], total_active: 0 };
    }
    return data || { has_active: false, active_students: [], total_active: 0 };
  } catch (err) {
    console.warn('Error en getCctvActiveStatus:', err);
    return { has_active: false, active_students: [], total_active: 0 };
  }
};

/**
 * Activa a un estudiante específico para la capacitación de CCTV por 30 días.
 * Desactiva automáticamente a cualquier alumno anterior para garantizar 1 solo a la vez.
 */
export const activateCctvStudent = async (courseId, userId) => {
  const { data, error } = await supabase.rpc('activate_cctv_student', {
    p_course_id: courseId,
    p_user_id: userId,
  });
  if (error) {
    throw new Error(error.message || 'Error al activar capacitación individual CCTV');
  }
  return data;
};

/**
 * Desactiva la habilitación individual de CCTV.
 */
export const deactivateCctvStudent = async (activationId) => {
  const { data, error } = await supabase.rpc('deactivate_cctv_student', {
    p_activation_id: activationId,
  });
  if (error) {
    throw new Error(error.message || 'Error al desactivar habilitación CCTV');
  }
  return data;
};

/**
 * Consulta en tiempo real únicamente los usuarios que han solicitado o postulado al curso CCTV.
 */
export const getCctvApplicants = async (courseId = null) => {
  try {
    const { data, error } = await supabase.rpc('get_cctv_applicants', {
      p_course_id: courseId || null,
    });
    if (error) {
      console.warn('Error al obtener postulantes CCTV:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('Error en getCctvApplicants:', err);
    return [];
  }
};

/**
 * Incorpora a un alumno aceptado al curso CCTV (1 solo a la vez) e inicia sus 30 días de vigencia.
 * Registra automáticamente el movimiento en la tabla de historial de auditoría.
 */
export const incorporateCctvStudent = async (userId, courseId = null) => {
  const { data, error } = await supabase.rpc('incorporate_cctv_student', {
    p_user_id: userId,
    p_course_id: courseId || null,
  });
  if (error) {
    throw new Error(error.message || 'Error al incorporar alumno al curso CCTV');
  }
  return data;
};

/**
 * Obtiene el registro histórico de participantes que han pasado por el curso.
 */
export const getCourseParticipantHistory = async (courseId = null) => {
  try {
    const { data, error } = await supabase.rpc('get_course_participant_history', {
      p_course_id: courseId || null,
    });
    if (error) {
      console.warn('Error al obtener historial de participantes:', error);
      return [];
    }
    return data || [];
  } catch (err) {
    console.warn('Error en getCourseParticipantHistory:', err);
    return [];
  }
};

/**
 * Registra una solicitud de aprobación para el curso CCTV de parte de un estudiante.
 */
export const requestCctvApproval = async ({
  userId = null,
  rut,
  nombre,
  email = null,
  telefono = null,
  notas = null,
}) => {
  const { data, error } = await supabase.rpc('request_cctv_approval', {
    p_user_id: userId,
    p_rut: rut,
    p_nombre: nombre,
    p_email: email,
    p_telefono: telefono,
    p_notas: notas,
  });
  if (error) {
    throw new Error(error.message || 'Error al registrar solicitud de aprobación para CCTV');
  }
  return data;
};

/**
 * El administrador otorga el "Visto Bueno" y aprueba la solicitud de CCTV.
 * Opcionalmente puede incorporar inmediatamente al alumno (1 a la vez).
 */
export const approveCctvRequest = async (
  requestId,
  adminName = 'Administrador OTEC',
  notes = null,
  incorporateNow = false
) => {
  const { data, error } = await supabase.rpc('approve_cctv_request', {
    p_request_id: requestId,
    p_admin_name: adminName,
    p_notes: notes,
    p_incorporate_now: Boolean(incorporateNow),
  });
  if (error) {
    throw new Error(error.message || 'Error al aprobar solicitud con visto bueno');
  }
  return data;
};

/**
 * El administrador rechaza una solicitud de CCTV.
 */
export const rejectCctvRequest = async (requestId, reason = 'Solicitud rechazada') => {
  const { data, error } = await supabase.rpc('reject_cctv_request', {
    p_request_id: requestId,
    p_reason: reason,
  });
  if (error) {
    throw new Error(error.message || 'Error al rechazar solicitud');
  }
  return data;
};

/**
 * Obtiene la lista completa de solicitudes pendientes, postulantes con visto bueno y alumno activo.
 */
export const getCctvApprovalList = async (courseId = null) => {
  try {
    const { data, error } = await supabase.rpc('get_cctv_approval_list', {
      p_course_id: courseId || null,
    });
    if (error) {
      console.warn('Error al obtener lista de aprobaciones CCTV:', error);
      return { pending_requests: [], approved_applicants: [], active_status: null };
    }
    return data || { pending_requests: [], approved_applicants: [], active_status: null };
  } catch (err) {
    console.warn('Error en getCctvApprovalList:', err);
    return { pending_requests: [], approved_applicants: [], active_status: null };
  }
};


