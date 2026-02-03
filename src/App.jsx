import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Scale, Phone, ShieldCheck, MapPin, Gavel, Heart, Building,
  FileText, Briefcase, Copyright, MessageCircle, Menu, X
} from "lucide-react";

const FIRM_CONFIG = {
  name: "ABOGADOS DE CHIHUAHUA",
  tagline: "ESPECIALISTAS",
  apiEndpoint: `${import.meta.env.VITE_API_URL || 'https://asociados-backend.onrender.com'}/api/contacto`,
  contact: {
    phone: "6144681949",
    displayPhone: "614-468-19-49",
    whatsappMsg: "Hola, necesito asesoría legal en Chihuahua.",
    location: "Chihuahua, México",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d437.7669578384289!2d-106.07230696814854!3d28.625695900000007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86ea5cae8df17427%3A0xbd722b964806026!2sC.%2016a%202612%2C%20Pac%C3%ADfico%2C%20Zona%20Centro%20II%2C%2031030%20Chihuahua%2C%20Chih.!5e0!3m2!1ses-419!2smx!4v1769576894697!5m2!1ses-419!2smx"
  },
  stats: { years: "20+", successRate: "95%" }
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
  const [showFloatBtn, setShowFloatBtn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowFloatBtn(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    setMobileMenuOpen(false);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
              onClick={scrollToContact}
              className="bg-amber-400 p-4 rounded-full shadow-2xl text-black active:scale-95 transition-transform touch-manipulation hover:shadow-amber-400/50"
              aria-label="Contacto"
            >
              <Phone className="w-7 h-7" />
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
                ABOGADOS DE CHIHUAHUA
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
              onClick={scrollToContact} 
              className="bg-amber-400/10 border border-amber-400/30 px-4 py-2 text-[10px] uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all rounded-lg"
            >
              CONTACTO
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
                    document.getElementById('about')?.scrollIntoView({behavior:'smooth'});
                    setMobileMenuOpen(false);
                  }} 
                  className="text-base font-medium uppercase tracking-wider py-3.5 hover:bg-white/5 rounded-lg transition-colors touch-manipulation text-center"
                >
                  Sobre Nosotros
                </button>
                <button 
                  onClick={scrollToContact} 
                  className="w-full bg-amber-400 text-black py-4 font-bold rounded-lg uppercase text-sm tracking-wider mt-1 touch-manipulation"
                >
                  CONTACTO
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION - Mobile-first: larger base sizes, scale down for desktop */}
      <section className="relative pt-24 pb-10 px-5 lg:pt-28 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{opacity:0, y:20}} 
            animate={{opacity:1, y:0}}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Mobile: 32px, Desktop: scales up */}
            <h1 className="text-[32px] leading-[1.2] font-serif text-white mb-5 md:text-4xl lg:text-5xl">
              Estamos para defenderlo{' '}
              <span className="italic text-amber-200/90 font-light block mt-2">
                en sus asuntos legales
              </span>
            </h1>
            <p className="text-lg text-slate-400 mb-6 md:text-base lg:text-xl">
              Lo contactamos de inmediato con un especialista para su caso
            </p>

{/* Stats - Mobile-first sizing */}
<div className="flex flex-row justify-center gap-8 border-t border-white/10 pt-5 mt-6 max-w-md mx-auto"></div>
            {/* Stats - Mobile-first sizing */}
            <div className="flex flex-row justify-center gap-8 border-t border-white/10 pt-5 mt-6 max-w-md mx-auto">
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

            {/* CONTACTO DIRECTO */}
            <div id="contact" className="mt-10 space-y-4 max-w-md mx-auto scroll-mt-20">
              <h3 className="text-[18px] font-serif text-white leading-tight md:text-base lg:text-lg">
                Contacto Directo
              </h3>
              <a 
                href={`tel:${FIRM_CONFIG.contact.phone}`} 
                className="inline-flex items-center justify-center gap-3 p-5 bg-amber-400 text-black rounded-xl w-full font-bold text-xl shadow-lg active:scale-[0.98] transition-transform touch-manipulation md:p-4 md:text-lg"
                aria-label={`Llamar a ${FIRM_CONFIG.contact.displayPhone}`}
              >
                <Phone className="w-6 h-6 md:w-[22px] md:h-[22px]" />
                <span>{FIRM_CONFIG.contact.displayPhone}</span>
              </a>
              <a 
                href={`https://wa.me/${FIRM_CONFIG.contact.phone}?text=${encodeURIComponent(FIRM_CONFIG.contact.whatsappMsg)}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 p-5 bg-[#25D366] text-white rounded-xl w-full font-bold text-xl shadow-lg active:scale-[0.98] transition-transform touch-manipulation md:p-4 md:text-lg"
                aria-label="Contactar por WhatsApp"
              >
                <MessageCircle className="w-6 h-6 md:w-[22px] md:h-[22px]" />
                <span>Enviar WhatsApp</span>
              </a>
              <p className="text-slate-400 text-sm leading-relaxed">
                Llámenos ahora para una consulta urgente
              </p>
            </div>
          </motion.div>
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

      {/* SOBRE NOSOTROS - New section */}
      <section id="about" className="py-12 px-5 border-t border-white/5 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="text-center space-y-4">
            <h2 className="text-[28px] font-serif text-white leading-tight md:text-2xl lg:text-3xl">
              Sobre Nosotros
            </h2>
            <div className="max-w-3xl mx-auto space-y-5 text-slate-300">
              <p className="text-base leading-relaxed md:text-[15px]">
                <strong className="text-amber-400">Hernández y Asociados</strong> es un despacho jurídico con más de 20 años de experiencia brindando servicios legales de excelencia en Chihuahua, México. Nuestro compromiso es defender los derechos de nuestros clientes con profesionalismo, ética y dedicación.
              </p>
              <p className="text-base leading-relaxed md:text-[15px]">
                Contamos con un equipo de abogados especializados en diversas áreas del derecho, lo que nos permite ofrecer soluciones integrales y personalizadas para cada caso. Nuestra misión es proporcionar asesoría legal de la más alta calidad, manteniendo siempre la transparencia y comunicación constante con nuestros clientes.
              </p>
              <p className="text-base leading-relaxed md:text-[15px]">
                Con un historial del 95% de sentencias favorables, nos enorgullece ser la primera opción para individuos y empresas que buscan representación legal confiable en Chihuahua y sus alrededores.
              </p>
            </div>
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
              onClick={scrollToContact}
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