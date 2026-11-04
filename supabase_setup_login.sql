-- ============================================================
-- SCRIPT DEFINITIVO DE LOGIN PREVYSEG
-- Pegar en: Supabase Dashboard > SQL Editor > New Query
-- ============================================================

-- 1. Crear tabla de credenciales LMS
CREATE TABLE IF NOT EXISTS public.lms_user_credentials (
  id              uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  rut             text UNIQUE NOT NULL,       -- solo dígitos, ej: '217784255'
  rut_formatted   text NOT NULL,              -- con formato, ej: '21.778.425-5'
  password        text NOT NULL,              -- contraseña en texto plano
  nombre          text NOT NULL,
  email           text,
  rol             text DEFAULT 'STUDENT' CHECK (rol IN ('STUDENT','TEACHER','ADMIN','EMPLOYER')),
  curso_nombre    text,
  cargo           text,
  user_id         uuid,
  active          boolean DEFAULT true,
  created_at      timestamptz DEFAULT now()
);

-- 2. Activar RLS (seguridad de filas) en la tabla
ALTER TABLE public.lms_user_credentials ENABLE ROW LEVEL SECURITY;
-- Nadie puede leer la tabla directamente (solo via la función SECURITY DEFINER)
DROP POLICY IF EXISTS "no direct read" ON public.lms_user_credentials;
CREATE POLICY "no direct read" ON public.lms_user_credentials
  FOR ALL USING (false);

-- 3. Función RPC de verificación de login
CREATE OR REPLACE FUNCTION public.verify_lms_login(p_rut text, p_pass text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_clean text;
  v_rec   public.lms_user_credentials%ROWTYPE;
BEGIN
  -- Normalizar: dejar solo dígitos y la letra K
  v_clean := lower(regexp_replace(p_rut, '[^0-9kK]', '', 'g'));

  SELECT * INTO v_rec
  FROM public.lms_user_credentials
  WHERE rut = v_clean
    AND password = p_pass
    AND active = true;

  IF NOT FOUND THEN
    RETURN json_build_object('success', false, 'error', 'RUT o contraseña incorrectos');
  END IF;

  RETURN json_build_object(
    'success',      true,
    'id',           v_rec.id::text,
    'rut',          v_rec.rut_formatted,
    'nombre',       v_rec.nombre,
    'email',        COALESCE(v_rec.email, ''),
    'rol',          v_rec.rol,
    'cargo',        COALESCE(v_rec.cargo, 'Estudiante Activo'),
    'curso_nombre', COALESCE(v_rec.curso_nombre, '')
  );
END;
$$;

-- 4. Dar acceso a roles anon y authenticated
GRANT EXECUTE ON FUNCTION public.verify_lms_login(text, text) TO anon, authenticated;

-- 5. Insertar usuarios existentes
-- NOTA: Agrega aquí a TODOS los usuarios reales que deben poder ingresar

INSERT INTO public.lms_user_credentials
  (rut, rut_formatted, password, nombre, email, rol, cargo, curso_nombre, user_id)
VALUES
  -- Sebastián (alumno real)
  (
    '217784255',
    '21.778.425-5',
    'seba123',
    'Sebastián',
    'sebastianmotox21@gmail.com',
    'STUDENT',
    'Estudiante Activo • Técnicas de operación CCTV y alarmas',
    'Técnicas de operación CCTV y alarmas de seguridad privada',
    'b48995f6-6aec-4e86-813b-22524cc2f769'
  )
ON CONFLICT (rut) DO UPDATE
  SET password     = EXCLUDED.password,
      nombre       = EXCLUDED.nombre,
      email        = EXCLUDED.email,
      active       = true,
      cargo        = EXCLUDED.cargo,
      curso_nombre = EXCLUDED.curso_nombre;

-- Para agregar más usuarios copia y ejecuta:
-- INSERT INTO public.lms_user_credentials (rut, rut_formatted, password, nombre, email, rol, cargo, curso_nombre)
-- VALUES ('182345678', '18.234.567-8', 'SU_CLAVE', 'Carlos Muñoz Rivera', 'carlos.munoz@gmail.com', 'STUDENT', 'Estudiante Activo', 'CCTV')
-- ON CONFLICT (rut) DO UPDATE SET password = EXCLUDED.password, active = true;

-- Verificar que todo quedó bien:
SELECT rut_formatted, nombre, rol, active FROM public.lms_user_credentials;

