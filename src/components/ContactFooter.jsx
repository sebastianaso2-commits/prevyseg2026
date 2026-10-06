import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Phone,
  MessageSquare,
  MapPin,
  Mail,
  ArrowRight,
  Shield,
  Clock,
  Send
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// WhatsApp SVG Icon
const WhatsAppIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const ContactFooter = ({ onOpenContactModal }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo('.contact-heading',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-heading', start: 'top 85%', once: true }
        }
      );

      // Animate contact cards stagger
      gsap.fromTo('.contact-card',
        { opacity: 0, y: 30, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-cards-grid', start: 'top 85%', once: true }
        }
      );

      // Animate map
      gsap.fromTo('.contact-map',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-map', start: 'top 85%', once: true }
        }
      );

      // Animate CTA button
      gsap.fromTo('.contact-cta',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: '.contact-cta', start: 'top 90%', once: true }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: Phone,
      label: 'Teléfono Principal',
      value: '+56 9 8231 2128',
      href: 'tel:+56982312128',
      color: '#0A4DA2',
    },
    {
      icon: Phone,
      label: 'Teléfono Secundario',
      value: '+56 9 7869 1869',
      href: 'tel:+56978691869',
      color: '#00A896',
    },
    {
      icon: 'whatsapp',
      label: 'WhatsApp Directo',
      value: '+56 9 7869 1869',
      href: 'https://api.whatsapp.com/send?phone=56978691869&text=Hola%20PrevySeg,%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n.',
      color: '#25D366',
      external: true,
    },
    {
      icon: MapPin,
      label: 'Dirección Sede Arica',
      value: 'Blanco Encalada #666, Arica',
      href: 'https://maps.google.com/?q=Manuel+Blanco+Encalada+666+Arica',
      color: '#E3000F',
      external: true,
    },
  ];

  return (
    <footer
      ref={sectionRef}
      id="contacto"
      className="relative overflow-hidden text-white"
      style={{ backgroundColor: '#072B4F' }}
    >
      {/* Wave Transition from Slate-50 above to Solid Deep Navy */}
      <div className="w-full overflow-hidden leading-none relative z-10 -mt-1 bg-slate-50">
        <svg
          viewBox="0 0 1440 80"
          className="w-full h-8 sm:h-12 md:h-16 block"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,0 C320,60 640,80 960,40 C1200,10 1360,50 1440,70 L1440,80 L0,80 Z"
            fill="#072B4F"
          />
        </svg>
      </div>

      {/* ========== TOP SECTION: Deep Navy CTA with Rich Contrast ========== */}
      <div
        className="relative pt-12 pb-20 px-4 sm:px-8"
        style={{ backgroundColor: '#072B4F' }}
      >
        {/* Decorative background glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[10%] w-[450px] h-[450px] bg-sky-500/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-[10%] w-[400px] h-[400px] bg-teal-500/15 rounded-full blur-[100px]" />
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">

          {/* Heading with Maximum Contrast */}
          <div className="contact-heading text-center max-w-4xl mx-auto mb-14 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-400/20 border border-teal-300/50 text-teal-300 text-xs font-black tracking-widest uppercase shadow-md backdrop-blur-sm">
              <Mail size={14} className="text-teal-300" />
              <span>Contáctanos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-black text-white leading-tight tracking-tight drop-shadow-lg">
              Para Mayor Información Sobre Nuestros Programas,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 font-black">
                Comunícate Con Nosotros.
              </span>
            </h2>
            <p className="text-sky-100 text-base sm:text-lg max-w-xl mx-auto font-medium drop-shadow-sm">
              Estamos disponibles de Lunes a Viernes, 09:00 - 19:00 hrs. Respuesta en menos de 24 horas.
            </p>
          </div>

          {/* CTA Button */}
          <div className="contact-cta flex justify-center mb-16">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(0, 194, 178, 0.45)' }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenContactModal}
              className="bg-gradient-to-r from-[#00A896] via-teal-500 to-[#0284c7] hover:from-teal-400 hover:to-sky-500 text-white font-black text-base py-4 px-10 rounded-2xl shadow-2xl transition-all duration-300 flex items-center gap-3 cursor-pointer group border border-teal-300/50"
            >
              <Mail size={20} className="group-hover:rotate-12 transition-transform duration-300 text-teal-100" />
              <span>Envíanos Un Mensaje</span>
              <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform duration-300 text-teal-100" />
            </motion.button>
          </div>

          {/* Contact Cards Grid - Ultra High Contrast Solid Cards */}
          <div className="contact-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {contactItems.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <a
                  key={idx}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noreferrer' : undefined}
                  className="contact-card group relative rounded-2xl p-5 transition-all duration-300 cursor-pointer shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-900/30 border border-slate-700/80 hover:border-teal-400/80"
                  style={{ backgroundColor: '#041d35' }}
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110 flex-shrink-0 shadow-md border"
                      style={{
                        backgroundColor: `${item.color}25`,
                        borderColor: `${item.color}50`
                      }}
                    >
                      {item.icon === 'whatsapp' ? (
                        <span style={{ color: item.color }}><WhatsAppIcon size={22} /></span>
                      ) : (
                        <IconComp size={22} style={{ color: item.color }} />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-wider font-extrabold text-teal-300 mb-1 drop-shadow-sm">
                        {item.label}
                      </p>
                      <p className="text-sm sm:text-base font-black text-white group-hover:text-cyan-200 transition-colors truncate">
                        {item.value}
                      </p>
                    </div>
                  </div>
                  {/* Hover accent line */}
                  <div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: item.color,
                      width: '0%',
                    }}
                  />
                  <style>{`
                    .contact-card:hover > div:last-of-type { width: 60% !important; }
                  `}</style>
                </a>
              );
            })}
          </div>

          {/* Central Area with Vector Graphics and Google Maps */}
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">

            {/* Left Vector Illustration: Mailbox with letters */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
              <div className="w-56 h-56 relative animate-float">
                <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-xl">
                  {/* Post */}
                  <rect x="94" y="110" width="12" height="85" rx="4" fill="#cbd5e1" />
                  {/* Mailbox base plate */}
                  <rect x="80" y="185" width="40" height="8" rx="3" fill="#64748b" />
                  {/* Mailbox Body */}
                  <path d="M40 70 C40 45, 65 30, 110 30 C155 30, 160 55, 160 70 L160 115 L40 115 Z" fill="#10b981" />
                  <rect x="40" y="70" width="120" height="45" rx="4" fill="#059669" />
                  <circle cx="100" cy="92" r="5" fill="#fcd34d" />
                  {/* Flag */}
                  <rect x="150" y="45" width="6" height="30" fill="#f59e0b" />
                  <polygon points="156,45 178,55 156,65" fill="#ef4444" />
                  {/* Envelopes flying out */}
                  <g transform="translate(15, 20) rotate(-15)">
                    <rect x="10" y="30" width="48" height="32" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <polyline points="10,30 34,48 58,30" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  </g>
                  <g transform="translate(30, 10) rotate(10)">
                    <rect x="25" y="25" width="44" height="28" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <polyline points="25,25 47,40 69,25" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                    <line x1="30" y1="36" x2="42" y2="36" stroke="#00c2b2" strokeWidth="2" />
                  </g>
                  <g transform="translate(60, 5) rotate(25)">
                    <rect x="35" y="20" width="40" height="26" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
                    <polyline points="35,20 55,34 75,20" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>
            </div>

            {/* Center: Google Maps */}
            <div className="contact-map lg:col-span-6 w-full">
              <div className="rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-navy-deep aspect-[16/10] relative">
                <iframe
                  title="Ubicación PrevySeg Arica"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.9348007421113!2d-70.3226999238318!3d-18.47952878260662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x915aa99014b2d87b%3A0x8673a5a7dcad9fa!2sManuel%20Blanco%20Encalada%20666%2C%20Arica%2C%20Arica%20y%20Parinacota!5e0!3m2!1ses!2scl!4v1710000000000!5m2!1ses!2scl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Right Vector Illustration: Person on Mobile chatting */}
            <div className="hidden lg:flex lg:col-span-3 justify-center items-center">
              <div className="w-56 h-56 relative animate-float" style={{ animationDelay: '1.5s' }}>
                <svg viewBox="0 0 200 200" className="w-full h-full filter drop-shadow-xl">
                  {/* Big Smartphone Frame */}
                  <rect x="50" y="20" width="100" height="160" rx="14" fill="#1e293b" stroke="#cbd5e1" strokeWidth="3" />
                  <rect x="56" y="32" width="88" height="136" rx="6" fill="#0f172a" />
                  <circle cx="100" cy="26" r="2.5" fill="#64748b" />
                  {/* Chat bubble 1 */}
                  <rect x="64" y="45" width="55" height="20" rx="6" fill="#0284c7" />
                  <line x1="70" y1="52" x2="105" y2="52" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="70" y1="58" x2="95" y2="58" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  {/* Chat bubble 2 */}
                  <rect x="80" y="75" width="55" height="20" rx="6" fill="#10b981" />
                  <line x1="86" y1="82" x2="125" y2="82" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="86" y1="88" x2="110" y2="88" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  {/* Chat bubble 3 */}
                  <rect x="64" y="105" width="55" height="20" rx="6" fill="#00c2b2" />
                  <line x1="70" y1="112" x2="105" y2="112" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                  <line x1="70" y1="118" x2="90" y2="118" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ========== BOTTOM FOOTER ========== */}
      <div
        className="px-4 sm:px-8 py-8 border-t border-white/10"
        style={{ backgroundColor: '#041d35' }}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-300 font-medium">
            © {new Date().getFullYear()} PrevySeg Capacitaciones OTEC. Todos los derechos reservados. Arica, Chile.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/otecprevyseg" target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300 transition-colors text-xs font-semibold">
              Instagram
            </a>
            <span className="text-white/20">|</span>
            <a href="mailto:prevyseg.capacitaciones@gmail.com" className="text-slate-300 hover:text-teal-300 transition-colors text-xs font-semibold">
              Email
            </a>
            <span className="text-white/20">|</span>
            <a href="https://api.whatsapp.com/send?phone=56978691869&text=Hola%20PrevySeg,%20me%20gustar%C3%ADa%20solicitar%20m%C3%A1s%20informaci%C3%B3n." target="_blank" rel="noreferrer" className="text-slate-300 hover:text-teal-300 transition-colors text-xs font-semibold">
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default ContactFooter;
