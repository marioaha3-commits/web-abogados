import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { 
  Phone, 
  ShieldCheck, 
  Scale, 
  UserCheck, 
  Clock, 
  MessageSquare,
  Gavel,
  Heart,
  Building,
  Star,
  CheckCircle
} from "lucide-react";

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    caseType: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    setFormData({ name: '', phone: '', caseType: '' });
    
    setTimeout(() => {
      setShowSuccess(false);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      {/* Header */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-3"
          >
            <div className="bg-blue-900 p-2 rounded-lg">
              <Scale className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Abogados de Chihuahua</h1>
              <p className="text-blue-700 font-medium">Asesoría Legal Profesional</p>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-6"
          >
            <a href="#services" className="font-medium text-gray-700 hover:text-blue-700 transition-colors">Servicios</a>
            <a href="#about" className="font-medium text-gray-700 hover:text-blue-700 transition-colors">Sobre Nosotros</a>
            <a href="#contact" className="font-medium text-gray-700 hover:text-blue-700 transition-colors">Contacto</a>
            <div className="flex items-center text-blue-700 font-bold">
              <Phone className="h-5 w-5 mr-2" />
              <span>(614) 468-19-49</span>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section 
        variants={container}
        initial="hidden"
        animate="show"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900 to-indigo-900 text-white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={item} className="space-y-6">
            <div className="inline-block bg-blue-800 text-blue-200 text-sm font-semibold px-4 py-1 rounded-full">
              Asesoría Legal De Alto Nivel
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Expertos en Derecho con <span className="text-blue-300">Resultados Comprobados</span>
            </h2>
            <p className="text-xl text-blue-100">
              Deje su información y uno de nuestros abogados especializados se comunicará con usted en menos de 2 horas para analizar su caso.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="flex items-start space-x-3">
                <ShieldCheck className="h-6 w-6 text-blue-300 flex-shrink-0" />
                <span>Confidencialidad Garantizada</span>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="h-6 w-6 text-blue-300 flex-shrink-0" />
                <span>Respuesta en Menos de 2 Horas</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={item}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden p-6 md:p-8"
          >
            <div className="text-center mb-8">
              <div className="inline-block bg-blue-100 p-3 rounded-full mb-4">
                <MessageSquare className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Agende su Consulta</h3>
              <p className="text-gray-600 mt-2">Complete el formulario y nos pondremos en contacto</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Su nombre"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono de Contacto <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                  placeholder="Ej: 614 123 4567"
                  pattern="[0-9\s]{10,15}"
                />
              </div>
              
              <div>
                <label htmlFor="caseType" className="block text-sm font-medium text-gray-700 mb-1">
                  ¿Que sucedió?, Platiquenos sobre su caso <span className="text-red-500">*</span>
                </label>
                <select
                  id="caseType"
                  name="caseType"
                  value={formData.caseType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition bg-white"
                >
                  <option value="">Seleccione una opción</option>
                  <option value="penal">Derecho Penal</option>
                  <option value="familiar">Derecho Familiar</option>
                  <option value="civil">Derecho Civil</option>
                  <option value="laboral">Derecho Laboral</option>
                  <option value="mercantil">Derecho Mercantil</option>
                  <option value="otros">Otros Asuntos Legales</option>
                </select>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex">
                  <ShieldCheck className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="ml-2 text-sm text-blue-800">
                    Su información está protegida y solo será utilizada para contactarle sobre su caso legal.
                  </p>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>Recibir Llamada Gratuita</span>
                </div>
              </motion.button>
            </form>
            
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl text-center"
              >
                <div className="flex items-center justify-center mb-2">
                  <div className="bg-green-100 p-2 rounded-full mr-3">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-800">¡Gracias por confiar en nosotros!</h4>
                </div>
                <p className="text-green-700">
                  Nuestro equipo se comunicará con usted en menos de 2 horas para analizar su caso.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section 
        id="services"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white"
      >
        <div className="max-w-7xl mx-auto text-center mb-16">
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Áreas de Práctica Legal
          </motion.h2>
          <motion.p variants={item} className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nuestros abogados especializados brindan asesoría profesional en múltiples ramas del derecho
          </motion.p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Gavel, title: "Derecho Penal", desc: "Defensa en casos de delitos federales y estatales, libertad bajo fianza, apelaciones y más." },
            { icon: Heart, title: "Derecho Familiar", desc: "Divorcios, custodia infantil, pensiones alimenticias, adopciones y mediación familiar." },
            { icon: Building, title: "Derecho Civil", desc: "Conflictos contractuales, propiedad, herencias, indemnizaciones y responsabilidad civil." }
          ].map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -10 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-md border border-blue-50 transition-all duration-300 hover:shadow-xl"
            >
              <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                <service.icon className="h-8 w-8 text-blue-700" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Trust Section */}
      <motion.section 
        id="about"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 to-blue-100"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div variants={item} className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Por qué Elegir a Nuestros Abogados
              </h2>
              <p className="text-xl text-gray-700 mb-6">
                Con más de 15 años de experiencia en el sistema jurídico de Chihuahua, ofrecemos soluciones legales efectivas con un enfoque personalizado.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: ShieldCheck, title: "Confidencialidad Total", desc: "Su caso se maneja con la máxima discreción y privacidad garantizada." },
                { icon: UserCheck, title: "Atención Personalizada", desc: "Un abogado dedicado exclusivamente a su caso desde el primer contacto." },
                { icon: Star, title: "Resultados Comprobados", desc: "Más del 95% de nuestros clientes obtienen resultados favorables en sus casos." },
                { icon: Clock, title: "Disponibilidad 24/7", desc: "Atendemos emergencias legales en cualquier momento del día o la noche." }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  className="flex space-x-4 p-4 bg-white rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="bg-blue-100 p-2 rounded-lg flex-shrink-0">
                    <item.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div variants={item} className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white">
                <div className="text-5xl font-bold">15+</div>
                <div className="text-xl font-medium mt-1">Años de Experiencia</div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Nuestros abogados tienen amplia experiencia en los tribunales de Chihuahua y conocen a fondo el sistema legal local.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
                <div className="text-5xl font-bold">95%</div>
                <div className="text-xl font-medium mt-1">Casos Exitosos</div>
              </div>
              <div className="p-6">
                <p className="text-gray-600">
                  Nuestra tasa de éxito habla por sí sola. Trabajamos incansablemente para obtener los mejores resultados para nuestros clientes.
                </p>
              </div>
            </div>
            
            <div className="col-span-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-50">
              <div className="bg-gray-900 p-6 text-white">
                <div className="flex items-center">
                  <div className="bg-blue-600 p-3 rounded-lg mr-4">
                    <Scale className="h-8 w-8" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">Compromiso con la Justicia</div>
                    <div className="text-blue-200">Nuestro lema: "Tu derecho, nuestra pasión"</div>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 italic">
                  "En cada caso que manejamos, no solo defendemos los intereses de nuestros clientes, sino que contribuimos a un sistema legal más justo y equitativo para todos en Chihuahua."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section 
        id="contact"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white"
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div variants={item} className="inline-block bg-blue-900 text-blue-200 text-sm font-semibold px-4 py-1 rounded-full mb-6">
            Listos para Ayudarle
          </motion.div>
          <motion.h2 variants={item} className="text-3xl md:text-4xl font-bold mb-6">
            Contáctenos Hoy Mismo
          </motion.h2>
          <motion.p variants={item} className="text-xl text-blue-100 max-w-3xl mx-auto mb-12">
            No deje para mañana lo que puede resolver hoy. Nuestro equipo está listo para escuchar su caso y brindarle la mejor estrategia legal.
          </motion.p>
          
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <div className="flex items-center bg-blue-800/30 backdrop-blur-sm p-4 rounded-xl border border-blue-700/50">
              <Phone className="h-6 w-6 text-blue-400 mr-3" />
              <div>
                <div className="font-bold">(614) 123-4567</div>
                <div className="text-blue-200 text-sm">Llámenos las 24 horas</div>
              </div>
            </div>
            <div className="flex items-center bg-blue-800/30 backdrop-blur-sm p-4 rounded-xl border border-blue-700/50">
              <MessageSquare className="h-6 w-6 text-blue-400 mr-3" />
              <div>
                <div className="font-bold">contacto@abogadosdechihuahua.mx</div>
                <div className="text-blue-200 text-sm">Respuesta en menos de 2 horas</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            variants={item}
            whileHover={{ scale: 1.02 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl cursor-pointer transition-all duration-300"
            onClick={() => document.querySelector('#services').scrollIntoView({ behavior: 'smooth' })}
          >
            <div className="flex items-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>Agendar Consulta Gratuita</span>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-blue-900 p-2 rounded-lg">
                <Scale className="h-8 w-8 text-white" />
              </div>
              <div className="font-bold text-xl text-white">Abogados de Chihuahua</div>
            </div>
            <p className="mb-4">
              Expertos legales comprometidos con la justicia y la defensa de sus derechos en Chihuahua y toda la región norte de México.
            </p>
            <div className="flex space-x-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-gray-800 w-10 h-10 rounded-full flex items-center justify-center text-blue-400 hover:text-white transition-colors cursor-pointer">
                  <span className="font-bold">{i}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Servicios Legales</h3>
            <ul className="space-y-3">
              {[
                "Derecho Penal",
                "Derecho Familiar",
                "Derecho Civil",
                "Derecho Laboral",
                "Derecho Mercantil",
                "Asesoría Legal General"
              ].map((service, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-white transition-colors flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Información de Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-900 p-2 rounded-lg mr-3 mt-1">
                  <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
                </div>
                <div>
                  <div className="font-medium text-white">Oficina Principal</div>
                  <div>Av. Juárez 3421, Zona Centro, Chihuahua, Chih.</div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-900 p-2 rounded-lg mr-3 mt-1">
                  <Phone className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Teléfono</div>
                  <div>(614) 123-4567</div>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-900 p-2 rounded-lg mr-3 mt-1">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                </div>
                <div>
                  <div className="font-medium text-white">Correo Electrónico</div>
                  <div>contacto@abogadosdechihuahua.mx</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Abogados de Chihuahua. Todos los derechos reservados.</p>
          <p className="mt-2 text-sm">Esta página web es únicamente con fines informativos. No constituye asesoría legal formal.</p>
        </div>
      </footer>
    </div>
  );
}