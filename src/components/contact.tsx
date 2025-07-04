import { User, Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import SectionTitle from "./section-title";
import Section from "./section";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "valentinomanzo@gmail.com",
      href: "mailto:valentinomanzo@gmail.com",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: Phone,
      label: "Téléphone",
      value: "+33 7 83 87 33 80",
      href: "tel:+33783873380",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: MapPin,
      label: "Localisation",
      value: "Genève, Suisse",
      href: "https://maps.google.com/?q=Grenoble,France",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      href: "https://linkedin.com/in/votre-profil",
      color: "hover:bg-gray-800",
      description: "Connectez-vous professionnellement"
    },
    {
      icon: Github,
      name: "GitHub", 
      href: "https://github.com/votre-username",
      color: "hover:bg-gray-800",
      description: "Découvrez mes projets"
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <Section id="contact" className="bg-slate-800">
      <SectionTitle title="Contact" icon={User} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Informations de contact */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-white mb-6">
            Restons en contact
          </h3>
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            N'hésitez pas à me contacter pour toute question, opportunité de collaboration ou simplement pour échanger sur vos projets.
          </p>

          {/* Informations de contact */}
          <div className="space-y-4 mb-8">
            {contactInfo.map((info, index) => (
              <motion.a
                key={info.label}
                href={info.href}
                target={info.href.startsWith('http') ? '_blank' : undefined}
                rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                  <info.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    {info.label}
                  </p>
                  <p className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                    {info.value}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Réseaux sociaux */}
          <div>
            <h4 className="text-lg font-medium text-white mb-4">Retrouvez-moi sur</h4>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group w-14 h-14 rounded-xl bg-white/10 ${social.color} flex items-center justify-center border border-white/20 transition-all duration-300`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  title={social.description}
                >
                  <social.icon className="w-6 h-6 text-white" />
                </motion.a>
              ))}
            </div>
          </div>

         
        </motion.div>

        {/* Formulaire de contact */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <h3 className="text-xl font-semibold text-white mb-6">
              Envoyez-moi un message
            </h3>

            {isSubmitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h4 className="text-xl font-semibold text-white mb-2">Message envoyé !</h4>
                <p className="text-gray-300">Merci pour votre message. Je vous répondrai dans les plus brefs délais.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all"
                    placeholder="Objet de votre message"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all resize-none"
                    placeholder="Décrivez votre projet ou votre demande..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 disabled:from-gray-500 disabled:to-gray-600 text-white font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer le message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </Section>
  );
}