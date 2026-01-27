import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, Phone, ShieldCheck, MapPin, Gavel, Heart, Building,
  FileText, Briefcase, Copyright, MessageCircle, Menu, X
} from "lucide-react";

const FIRM_CONFIG = {
  name: "HERNANDEZ Y ASOCIADOS",
  tagline: "Abogados de Chihuahua",
  // ESTA ES LA LÍNEA QUE CAMBIAS:
  apiEndpoint: "https://web-abogados.onrender.com/api/contacto", 
  // ... resto del código
  contact: {
    phone: "6144681949",
    displayPhone: "614-468-19-49",
    whatsappMsg: "Hola, necesito asesoría legal urgente en Chihuahua.",
    location: "Chihuahua, México",
    mapUrl: "https://maps.app.goo.gl/rrBaeX2kh1u7p21h7"
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
  const [isLoading, setIsLoading] = useState(false); // Estado para el envío
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

  // --- LÓGICA DE CONEXIÓN CON EL SERVIDOR ---
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        e.target.reset(); // Limpiar formulario
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
    <div className="min-h-screen bg-[#0a0a0b] text-slate-300 selection:bg-amber-200/20 font-sans antialiased">
      
      {/* BOTONES FLOTANTES */}
      <AnimatePresence>
        {showFloatBtn && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3"
          >
            <a 
              href={`https://wa.me/${FIRM_CONFIG.contact.phone}?text=${encodeURIComponent(FIRM_CONFIG.contact.whatsappMsg)}`}
              target="_blank" rel="noopener noreferrer"
              className="bg-[#25D366] p-4 rounded-full shadow-2xl text-white active:scale-90 transition-transform"
            >
              <MessageCircle size={24} />
            </a>
            <button 
              onClick={scrollToForm}
              className="bg-amber-400 p-4 rounded-full shadow-2xl text-black active:scale-90 transition-transform"
            >
              <Scale size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVBAR */}
      <nav className="fixed w-full z-50 border-b border-white/5 bg-[#0a0a0b]/90 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3">
            <Scale className="text-amber-400 w-5 h-5 sm:w-6 sm:h-6" />
            <div className="leading-none">
              <span className="text-white font-serif text-base sm:text-xl tracking-wide uppercase block">HERNANDEZ Y ASOCIADOS</span>
              <p className="text-[8px] sm:text-[9px] text-amber-400/80 tracking-[2px] mt-1 uppercase font-bold">{FIRM_CONFIG.tagline}</p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => document.getElementById('services').scrollIntoView({behavior:'smooth'})} className="text-[11px] uppercase tracking-widest hover:text-white transition-colors">Práctica</button>
            <button onClick={scrollToForm} className="bg-amber-400/10 border border-amber-400/30 px-5 py-2 text-[10px] uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all">AGENDE SU CITA</button>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                <button onClick={() => {document.getElementById('services').scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false);}} className="text-sm uppercase tracking-widest transition-colors">Áreas de Práctica</button>
                <button onClick={() => {document.getElementById('contact').scrollIntoView({behavior:'smooth'}); setMobileMenuOpen(false);}} className="text-sm uppercase tracking-widest transition-colors">Ubicación</button>
                <button onClick={scrollToForm} className="w-full bg-amber-400 text-black py-4 font-bold rounded-lg uppercase text-xs tracking-widest">AGENDE SU CITA</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div initial={{opacity:0, x:-20}} animate={{opacity:1, x:0}}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white leading-[1.1] mb-6">
              Estamos para defenderlo <br className="hidden sm:block" /> 
              <span className="italic text-amber-200/90 font-light">en sus asuntos legales</span>
            </h1>
            
            <div className="flex flex-row gap-8 sm:gap-12 border-t border-white/10 pt-8">
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-white">{FIRM_CONFIG.stats.years}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold">Años de Pericia</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-serif text-white">{FIRM_CONFIG.stats.successRate}</span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-tight">Sentencias Favorables</span>
              </div>
            </div>
          </motion.div>

          {/* FORMULARIO CON ATRIBUTOS NAME */}
          <div ref={formRef} className="scroll-mt-24">
            <div className="bg-[#121214] border border-white/10 p-6 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden">
              <h3 className="text-base sm:text-lg font-serif text-white mb-6 uppercase tracking-wider text-center">NOSOTROS LE MARCAMOS EN MENOS DE 2 HORAS</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <input 
                  name="nombre" 
                  type="text" 
                  required 
                  placeholder="Nombre Completo" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 outline-none focus:border-amber-400 transition-colors text-base" 
                />
                <input 
                  name="telefono" 
                  type="tel" 
                  required 
                  placeholder="Teléfono (614)" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-4 px-4 outline-none focus:border-amber-400 transition-colors text-base" 
                />
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-amber-400 font-bold ml-1">Detalles de su caso:</label>
                  <textarea 
                    name="caso" 
                    required 
                    rows="4" 
                    placeholder="¿Qué aconteció en su situación jurídica?" 
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-4 outline-none focus:border-amber-400 text-base resize-none"
                  ></textarea>
                </div>
                <motion.button 
                  whileTap={{ scale: 0.96 }} 
                  disabled={isLoading}
                  className="w-full bg-amber-400 text-black font-bold py-5 rounded-lg uppercase text-[11px] tracking-[2px] shadow-lg shadow-amber-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "ENVIANDO..." : "SOLICITAR ATENCION AHORA"}
                </motion.button>
              </form>

              {/* Pantalla de éxito */}
              <AnimatePresence>
                {isSubmitted && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#121214] flex flex-col items-center justify-center p-6 text-center z-10"
                  >
                    <ShieldCheck className="w-16 h-16 text-amber-400 mb-4" />
                    <h4 className="text-xl font-serif text-white">Solicitud Recibida</h4>
                    <p className="text-sm text-slate-400 mt-2">Un especialista revisará su caso a la brevedad.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ÁREAS DE PRÁCTICA */}
      <section id="services" className="py-20 px-4 bg-[#0e0e10]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-white mb-12 text-center">Nuestra Especialización</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-[#0a0a0b] p-8 border border-white/5 rounded-xl hover:border-amber-400/30 transition-all group">
                <s.icon className="w-6 h-6 text-amber-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-serif text-white mb-3">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contact" className="py-20 px-4 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-serif text-white">Contacto Directo</h2>
            <a href={`tel:${FIRM_CONFIG.contact.phone}`} className="inline-flex items-center gap-4 p-5 bg-amber-400 text-black rounded-2xl w-full sm:w-auto justify-center font-bold active:scale-95 transition-transform">
              <Phone size={24} />
              <span className="text-xl">{FIRM_CONFIG.contact.displayPhone}</span>
            </a>
          </div>
          
          <div className="h-[300px] w-full rounded-2xl overflow-hidden border border-white/10 grayscale">
            <iframe 
              src={FIRM_CONFIG.contact.mapUrl} 
              className="w-full h-full"
              title="Ubicación"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-4 border-t border-white/5 text-center">
        <div className="flex flex-col items-center gap-6">
          <Scale className="text-amber-400/40 w-8 h-8" />
          <p className="text-[10px] text-slate-600 tracking-[3px] uppercase">
            © {new Date().getFullYear()} {FIRM_CONFIG.name}<br/>Chihuahua, México.
          </p>
        </div>
      </footer>
    </div>
  );
}