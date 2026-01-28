import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, Phone, ShieldCheck, MapPin, Gavel, Heart, Building,
  FileText, Briefcase, Copyright, MessageCircle, Menu, X
} from "lucide-react";

const FIRM_CONFIG = {
  name: "HERNANDEZ Y ASOCIADOS",
  tagline: "Abogados de Chihuahua",
  apiEndpoint: `${import.meta.env.VITE_API_URL || 'https://asociados-backend.onrender.com'}/api/contacto`,
  contact: {
    phone: "6144681949",
    displayPhone: "614-468-19-49",
    whatsappMsg: "Hola, necesito asesoría legal urgente en Chihuahua.",
    location: "Chihuahua, México",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116545.45293214734!2d-106.1643924!3d28.6329957!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea4497334757c9%3A0x67341b525d8084a4!2sChihuahua%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1700000000000!5m2!1ses-419!2smx"
  },
  stats: { years: "20+", successRate: "90%" }
};

const SERVICES = [
  { icon: Gavel, title: "Derecho Penal", desc: "Delitos contra la Vida, Patrimonio, Familia y Libertad." },
  { icon: Heart, title: "Derecho Familiar", desc: "Divorcios, Pensión Alimenticia, Custodia y Sucesiones." },
  { icon: Building, title: "Derecho Civil", desc: "Contratos, Daños, Desahucios y Juicios Reivindicatorios." },
  { icon: FileText, title: "Amparo", desc: "Protección contra actos de autoridad y detenciones." },
  { icon: Briefcase, title: "Derecho Laboral", desc: "Despidos, Indemnizaciones y Accidentes de Trabajo." },
  { icon: Copyright, title: "Propiedad Industrial", desc: "Marcas, Patentes, Derechos de Autor y Software." }
];

export default function LawFirmLander() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFloatBtn, setShowFloatBtn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setShowFloatBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = () => {
    setMobileMenuOpen(false);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const data = {
      nombre: formData.get('nombre'),
      telefono: formData.get('telefono'),
      caso: formData.get('caso')
    };

    try {
      const response = await fetch(FIRM_CONFIG.apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Error al enviar la solicitud.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      alert("No se pudo conectar con el servidor. Por favor, intente vía WhatsApp.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0b] text-slate-300 selection:bg-amber-200/20 font-sans antialiased overflow-x-hidden">
      
      {/* BOTONES FLOTANTES - Mobile-first sizing */}
      <AnimatePresence>
        {showFloatBtn && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-5 right-5 z-[100] flex flex-col gap-4"
          >
            <a 
              href={`https://wa.me/${FIRM_CONFIG.contact.phone}?text=${encodeURIComponent(FIRM_CONFIG.contact.whatsappMsg)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] p-4 rounded-full shadow-2xl text-white active:scale-95 transition-transform touch-manipulation hover:shadow-[#25D366]/50"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-7 h-7" />
            </a>
            <button 
              onClick={scrollToForm}
              className="bg-amber-400 p-4 rounded-full shadow-2xl text-black active:scale-95 transition-transform touch-manipulation hover:shadow-amber-400/50"
              aria-label="Agendar cita"
            >
              <Scale className="w-7 h-7" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR - Mobile-first approach */}
      <nav className="fixed w-full z-[110] border-b border-white/5 bg-[#0a0a0b]/95 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-5 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <Scale className="text-amber-400 w-7 h-7 flex-shrink-0" />
            <div className="leading-tight min-w-0 flex-1">
              <span className="text-white font-serif text-sm font-bold tracking-wide block truncate">
                HERNANDEZ Y ASOCIADOS
              </span>
              <p className="text-[10px] text-amber-400/80 tracking-[1.3px] mt-0.5 uppercase font-bold truncate">
                {FIRM_CONFIG.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})} 
              className="text-[11px] uppercase tracking-widest hover:text-white transition-colors py-2"
            >
              Práctica
            </button>
            <button 
              onClick={scrollToForm} 
              className="bg-amber-400/10 border border-amber-400/30 px-4 py-2 text-[10px] uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all rounded-lg"
            >
              AGENDE SU CITA
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2.5 touch-manipulation flex-shrink-0" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="text-white w-6 h-6" /> : <Menu className="text-white w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0e0e10] border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-5 gap-4 items-stretch">
                <button 
                  onClick={() => {
                    document.getElementById('services')?.scrollIntoView({behavior:'smooth'});
                    setMobileMenuOpen(false);
                  }} 
                  className="text-base font-medium uppercase tracking-wider py-3.5 hover:bg-white/5 rounded-lg transition-colors touch-manipulation text-center"
                >
                  Áreas de Práctica
                </button>
                <button 
                  onClick={() => {
                    document.getElementById('contact')?.scrollIntoView({behavior:'smooth'});
                    setMobileMenuOpen(false);
                  }} 
                  className="text-base font-medium uppercase tracking-wider py-3.5 hover:bg-white/5 rounded-lg transition-colors touch-manipulation text-center"
                >
                  Ubicación
                </button>
                <button 
                  onClick={scrollToForm} 
                  className="w-full bg-amber-400 text-black py-4 font-bold rounded-lg uppercase text-sm tracking-wider mt-1 touch-manipulation"
                >
                  AGENDE SU CITA
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION - Mobile-first: larger base sizes, scale down for desktop */}
      <section className="relative pt-24 pb-10 px-5 lg:pt-28 lg:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
          <motion.div 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}}
            className="lg:pr-8"
          >
            {/* Mobile: 32px, Desktop: scales up */}
            <h1 className="text-[32px] leading-[1.2] font-serif text-white mb-5 md:text-4xl lg:text-5xl">
              Estamos para defenderlo{' '}
              <span className="italic text-amber-200/90 font-light block mt-2">
                en sus asuntos legales
              </span>
            </h1>
            
            {/* Stats - Mobile-first sizing */}
            <div className="flex flex-row justify-start gap-8 border-t border-white/10 pt-5 mt-4">
              <div className="min-w-[100px]">
                <span className="block text-4xl font-serif text-white font-bold md:text-3xl">
                  {FIRM_CONFIG.stats.years}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mt-1.5 block md:text-[10px]">
                  Años de Experiencia
                </span>
              </div>
              <div className="min-w-[100px]">
                <span className="block text-4xl font-serif text-white font-bold md:text-3xl">
                  {FIRM_CONFIG.stats.successRate}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mt-1.5 block leading-tight md:text-[10px]">
                  Sentencias Favorables
                </span>
              </div>
            </div>
          </motion.div>

          {/* FORMULARIO - Mobile-first: base size 16px inputs (no iOS zoom) */}
          <div ref={formRef} className="scroll-mt-20 md:scroll-mt-28">
            <div className="bg-[#121214] border border-white/10 p-6 rounded-2xl shadow-xl relative overflow-hidden md:p-5 lg:p-6">
              <h3 className="text-sm font-serif text-white mb-5 uppercase tracking-[1.3px] text-center leading-relaxed md:text-xs lg:text-sm">
                LE CONTACTAREMOS EN MENOS DE 2 HORAS
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-3.5">
                {/* Base: 16px (no zoom), override with md: for desktop */}
                <input 
                  name="nombre" 
                  type="text" 
                  required 
                  placeholder="Nombre completo" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-base outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-500 transition-colors touch-manipulation md:py-3.5"
                  aria-label="Nombre completo"
                />
                <input 
                  name="telefono" 
                  type="tel" 
                  required 
                  placeholder="Teléfono con lada" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-base outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-500 transition-colors touch-manipulation md:py-3.5"
                  aria-label="Teléfono con lada"
                />
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wider text-amber-300 font-bold ml-1 flex items-center md:text-[10px]">
                    <MessageCircle className="w-3.5 h-3.5 mr-1.5 md:w-3 md:h-3" />
                    Detalles de su caso:
                  </label>
                  <textarea 
                    name="caso" 
                    required 
                    rows="4" 
                    placeholder="Explique brevemente su situación legal..." 
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-base outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 placeholder:text-slate-500 resize-none touch-manipulation md:p-3.5"
                    aria-label="Detalles del caso"
                  ></textarea>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.97 }} 
                  disabled={isLoading}
                  className="w-full bg-amber-400 text-black font-bold py-4 rounded-xl uppercase text-xs tracking-[1.3px] shadow-md hover:shadow-lg disabled:opacity-60 transition-all touch-manipulation mt-2 md:py-3.5 md:text-[11px]"
                  type="submit"
                >
                  {isLoading ? "ENVIANDO..." : "SOLICITAR ATENCIÓN INMEDIATA"}
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#121214] flex flex-col items-center justify-center p-6 text-center z-10 rounded-2xl"
                  >
                    <ShieldCheck className="w-16 h-16 text-amber-400 mb-3 md:w-14 md:h-14" />
                    <h4 className="text-xl font-serif text-white font-bold">
                      Solicitud Recibida
                    </h4>
                    <p className="text-sm text-slate-300 mt-2.5 max-w-[280px]">
                      Un especialista revisará su caso y se contactará con usted en menos de 2 horas.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS DE PRÁCTICA - Mobile-first grid */}
      <section id="services" className="py-12 px-5 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[28px] font-serif text-white mb-8 text-center leading-tight md:text-2xl lg:text-3xl">
            Nuestras Áreas de Especialización
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {SERVICES.map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#0a0a0b] p-6 border border-white/5 rounded-2xl active:bg-white/5 transition-all group touch-manipulation md:p-5"
              >
                <s.icon className="w-7 h-7 text-amber-400 mb-3 group-hover:scale-110 transition-transform md:w-6 md:h-6" />
                <h3 className="text-lg font-serif text-white mb-2">
                  {s.title}
                </h3>
                <p className="text-[15px] text-slate-400 leading-relaxed md:text-sm">
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO - Mobile-first button sizing */}
      <section id="contact" className="py-12 px-5 border-t border-white/5 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-center space-y-4">
            <h2 className="text-[28px] font-serif text-white leading-tight md:text-2xl lg:text-3xl">
              Contacto Directo
            </h2>
            <a 
              href={`tel:${FIRM_CONFIG.contact.phone}`} 
              className="inline-flex items-center justify-center gap-3 p-5 bg-amber-400 text-black rounded-xl w-full max-w-[380px] mx-auto font-bold text-xl shadow-lg active:scale-[0.98] transition-transform touch-manipulation md:p-4 md:text-lg md:max-w-[400px]"
              aria-label={`Llamar a ${FIRM_CONFIG.contact.displayPhone}`}
            >
              <Phone className="w-6 h-6 md:w-[22px] md:h-[22px]" />
              <span>{FIRM_CONFIG.contact.displayPhone}</span>
            </a>
            <p className="text-slate-400 max-w-md mx-auto text-sm px-4 leading-relaxed">
              Llámenos ahora para una consulta urgente o visite nuestras oficinas en Chihuahua, México
            </p>
          </div>
          
          <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 md:h-[280px] lg:h-[350px]">
            <iframe 
              src={FIRM_CONFIG.contact.mapUrl} 
              className="w-full h-full border-0"
              title="Ubicación de oficinas"
              allowFullScreen=""
              loading="lazy"
              aria-label="Mapa de ubicación en Chihuahua"
            />
          </div>
        </div>
      </section>

      {/* FOOTER - Mobile-first text sizing */}
      <footer className="py-8 px-5 border-t border-white/5 text-center bg-[#080809]">
        <div className="flex flex-col items-center gap-3">
          <Scale className="text-amber-400/30 w-8 h-8 md:w-7 md:h-7" />
          <p className="text-xs text-slate-500 tracking-[1.3px] uppercase leading-relaxed max-w-[320px] md:text-[11px] md:max-w-[300px]">
            © {new Date().getFullYear()} {FIRM_CONFIG.name}<br/>
            Abogados especialistas en Chihuahua, México
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-4 md:gap-3 px-4">
            <button 
              onClick={() => document.getElementById('services')?.scrollIntoView({behavior:'smooth'})}
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors touch-manipulation py-1.5 md:text-[10px]"
            >
              Áreas de Práctica
            </button>
            <button 
              onClick={scrollToForm}
              className="text-xs text-slate-400 hover:text-amber-300 transition-colors touch-manipulation py-1.5 md:text-[10px]"
            >
              Contacto
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}