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
      
      {/* BOTONES FLOTANTES (Ajustados para pulgar móvil) */}
      <AnimatePresence>
        {showFloatBtn && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3"
          >
            <a 
              href={`https://wa.me/${FIRM_CONFIG.contact.phone}?text=${encodeURIComponent(FIRM_CONFIG.contact.whatsappMsg)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] p-3.5 rounded-full shadow-2xl text-white active:scale-90 transition-transform"
            >
              <MessageCircle size={22} />
            </a>
            <button 
              onClick={scrollToForm}
              className="bg-amber-400 p-3.5 rounded-full shadow-2xl text-black active:scale-90 transition-transform"
            >
              <Scale size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR RESPONSIVA */}
      <nav className="fixed w-full z-[110] border-b border-white/5 bg-[#0a0a0b]/90 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Scale className="text-amber-400 w-5 h-5" />
            <div className="leading-none">
              <span className="text-white font-serif text-sm sm:text-lg tracking-wide uppercase block">HERNANDEZ Y ASOCIADOS</span>
              <p className="text-[7px] sm:text-[9px] text-amber-400/80 tracking-[1.5px] mt-0.5 uppercase font-bold">{FIRM_CONFIG.tagline}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => document.getElementById('services').scrollIntoView({behavior:'smooth'})} className="text-[11px] uppercase tracking-widest hover:text-white transition-colors">Práctica</button>
            <button onClick={scrollToForm} className="bg-amber-400/10 border border-amber-400/30 px-5 py-2 text-[10px] uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all">AGENDE SU CITA</button>
          </div>

          <button className="md:hidden p-2 -mr-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="text-white" /> : <Menu className="text-white" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0e0e10] border-b border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-6 items-center text-center">
                <button onClick={() => {document.getElementById('services').scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false);}} className="text-xs uppercase tracking-widest">Áreas de Práctica</button>
                <button onClick={() => {document.getElementById('contact').scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false);}} className="text-xs uppercase tracking-widest">Ubicación</button>
                <button onClick={scrollToForm} className="w-full bg-amber-400 text-black py-4 font-bold rounded-lg uppercase text-[10px] tracking-widest">AGENDE SU CITA</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION (Ajuste de textos móviles) */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:20}} animate={{opacity:1, y:0}}>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-white leading-tight mb-6">
              Estamos para defenderlo <br className="hidden sm:block" /> 
              <span className="italic text-amber-200/90 font-light">en sus asuntos legales</span>
            </h1>
            
            <div className="flex flex-row gap-6 sm:gap-12 border-t border-white/10 pt-6">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-white">{FIRM_CONFIG.stats.years}</span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold">Años de Pericia</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-white">{FIRM_CONFIG.stats.successRate}</span>
                <span className="text-[8px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-tight">Sentencias Favorables</span>
              </div>
            </div>
          </motion.div>

          {/* FORMULARIO (Optimizado para input táctil) */}
          <div ref={formRef} className="scroll-mt-20">
            <div className="bg-[#121214] border border-white/10 p-5 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">
              <h3 className="text-xs sm:text-sm font-serif text-white mb-6 uppercase tracking-[2px] text-center">LE CONTACTAREMOS EN MENOS DE 2 HORAS</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                  name="nombre" 
                  type="text" 
                  required 
                  placeholder="Nombre" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 outline-none focus:border-amber-400 text-base" 
                />
                <input 
                  name="telefono" 
                  type="tel" 
                  required 
                  placeholder="Teléfono" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3.5 px-4 outline-none focus:border-amber-400 text-base" 
                />
                <div className="space-y-1.5">
                  <label className="text-[9px] uppercase tracking-widest text-amber-400 font-bold ml-1">Detalles de su caso:</label>
                  <textarea 
                    name="caso" 
                    required 
                    rows="3" 
                    placeholder="¿Cómo podemos ayudarle?" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-amber-400 text-base resize-none"
                  ></textarea>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.98 }} 
                  disabled={isLoading}
                  className="w-full bg-amber-400 text-black font-bold py-4 rounded-lg uppercase text-[10px] tracking-[2px] shadow-lg disabled:opacity-50"
                >
                  {isLoading ? "ENVIANDO..." : "SOLICITAR ATENCIÓN AHORA"}
                </motion.button>
              </form>

              <AnimatePresence>
                {isSubmitted && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#121214] flex flex-col items-center justify-center p-6 text-center z-10">
                    <ShieldCheck className="w-12 h-12 text-amber-400 mb-3" />
                    <h4 className="text-lg font-serif text-white">Solicitud Recibida</h4>
                    <p className="text-xs text-slate-400 mt-2">Un especialista revisará su caso pronto.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS DE PRÁCTICA (Grid responsivo) */}
      <section id="services" className="py-16 px-4 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-serif text-white mb-10 text-center">Nuestra Especialización</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#0a0a0b] p-6 border border-white/5 rounded-xl active:bg-white/5 transition-all group">
                <s.icon className="w-5 h-5 text-amber-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-base font-serif text-white mb-2">{s.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO (Botón de llamada ancho completo en móvil) */}
      <section id="contact" className="py-16 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-10">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-serif text-white">Contacto Directo</h2>
            <a href={`tel:${FIRM_CONFIG.contact.phone}`} className="inline-flex items-center gap-3 p-4 bg-amber-400 text-black rounded-xl w-full sm:w-auto justify-center font-bold active:scale-95 transition-transform">
              <Phone size={20} />
              <span className="text-lg">{FIRM_CONFIG.contact.displayPhone}</span>
            </a>
          </div>
          
          <div className="h-[250px] sm:h-[400px] w-full rounded-xl overflow-hidden border border-white/10 grayscale">
            <iframe 
              src={FIRM_CONFIG.contact.mapUrl} 
              className="w-full h-full border-0"
              title="Ubicación"
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-4 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-4">
          <Scale className="text-amber-400/40 w-6 h-6" />
          <p className="text-[9px] text-slate-600 tracking-[2px] uppercase leading-loose">
            © {new Date().getFullYear()} {FIRM_CONFIG.name}<br/>
            Chihuahua, México.
          </p>
        </div>
      </footer>
    </div>
  );
}