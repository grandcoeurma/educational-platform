"use client"

import { motion } from "framer-motion"
import { Heart, Facebook, Instagram, Mail, Phone, MapPin } from "lucide-react"
import Image from "next/image"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  const quickLinks = [
    { href: "#home", label: "Accueil", id: "home" },
    { href: "#about", label: "Qui sommes-nous", id: "about" },
    { href: "#vision", label: "Vision & Mission", id: "vision" },
    { href: "#daily-life", label: "La Vie à Grand Cœur", id: "daily-life" },
    { href: "#programs", label: "Programmes", id: "programs" },
    { href: "#testimonials", label: "Témoignages", id: "testimonials" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook", color: "hover:text-blue-500" },
    { icon: Instagram, href: "#", label: "Instagram", color: "hover:text-red-400" },
    { icon: Mail, href: "mailto:contact@grandcoeur.ma", label: "Email", color: "hover:text-red-500" },
  ]

  return (
    <footer className="bg-gradient-to-br from-red-100 via-red-200 to-red-300 text-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-400 to-red-500 blur-3xl"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                className="relative w-16 h-16"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Grand Cœur Logo"
                  width={64}
                  height={64}
                  className="object-contain drop-shadow-lg"
                  style={{ mixBlendMode: 'screen' }}
                />
              </motion.div>
              <div>
                        <h3 className="text-3xl font-bold bg-gradient-to-r from-red-300 to-red-400 bg-clip-text text-transparent">
                          Grand Cœur
                        </h3>
                <p className="text-sm text-gray-600">L'école spécialisée qui croit en chaque talent</p>
              </div>
            </div>
            
            <p className="text-gray-600 leading-relaxed mb-6 max-w-md">
              Un centre dédié aux enfants porteurs de TSA et de trisomie 21, où chaque enfant 
              trouve sa place dans un environnement bienveillant et stimulant.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  className={`w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center ${social.color} transition-all`}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-red-700">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.id)}
                    className="text-gray-600 hover:text-red-600 transition-colors inline-block hover:translate-x-2 duration-300"
                  >
                    → {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold mb-6 text-red-700">Contact</h4>
            <ul className="space-y-4 text-gray-600">
              <motion.li
                className="flex items-start gap-3"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                <span className="text-sm">
                  Centre Grand Cœur<br />
                  123 Avenue de l'Espoir<br />
                  Casablanca, Maroc
                </span>
              </motion.li>
              <motion.li
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm">+212 5 22 XX XX XX</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-3"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-red-600 flex-shrink-0" />
                <span className="text-sm">contact@grandcoeur.ma</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-300/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 text-sm text-center md:text-left">
            © {currentYear} Grand Cœur. Tous droits réservés.
          </p>
          
          <div className="flex items-center gap-2 text-sm text-gray-600">
            Fait avec{" "}
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-red-600"
            >
              ♥
            </motion.span>{" "}
            pour nos enfants
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

