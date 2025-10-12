"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { MapPin, Phone, Mail, Send, Clock, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Word-by-word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut" as const
      }
    }
  }

  const AnimatedText = ({ text, className }: { text: string, className: string }) => {
    const words = text.split(" ")
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    )
  }
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert("Message envoyé avec succès! Nous vous contacterons bientôt.")
    setFormData({ name: "", email: "", phone: "", message: "" })
    setIsSubmitting(false)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Centre Grand Cœur\n123 Avenue de l'Espoir\nCasablanca, Maroc",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "+212 5 22 XX XX XX",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@grandcoeur.ma",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-200/20 to-red-300/20 blur-3xl"
            style={{
              width: `${Math.random() * 300 + 150}px`,
              height: `${Math.random() * 300 + 150}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 15 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-block mb-6"
            animate={{
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto shadow-2xl">
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </div>
          </motion.div>

            <motion.h2 
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
            Contactez-nous
            </motion.h2>

            <AnimatedText 
              text="Nous sommes là pour vous écouter et vous accompagner. Votre enfant mérite le meilleur."
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            />
          </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
            className="space-y-8"
          >
            {/* Info Cards */}
            {contactInfo.map((info, index) => (
                    <motion.div 
                key={info.title}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group relative overflow-hidden"
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ 
                  y: -8, 
                  scale: 1.03,
                  rotateX: 5,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-start gap-4">
                        <motion.div 
                    className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform relative`}
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.2,
                      transition: { duration: 0.6 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 10px 30px rgba(229, 62, 62, 0.3)",
                        "0 20px 40px rgba(229, 62, 62, 0.5)",
                        "0 10px 30px rgba(229, 62, 62, 0.3)"
                      ]
                    }}
                    transition={{
                      boxShadow: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }
                    }}
                  >
                    <info.icon className="w-7 h-7 text-white" />
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-red-300"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{info.title}</h3>
                    <p className="text-gray-600 whitespace-pre-line">{info.content}</p>
                      </div>
                      </div>
                    </motion.div>
            ))}

            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
            >
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden group">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                  >
                <Label htmlFor="name" className="text-gray-700 font-semibold">Nom complet</Label>
                    <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                  className="mt-2 border-red-200 focus:border-red-500 focus:ring-red-500"
                  placeholder="Votre nom"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.1 }}
                  >
                <Label htmlFor="email" className="text-gray-700 font-semibold">Email</Label>
                    <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                  className="mt-2 border-red-200 focus:border-red-500 focus:ring-red-500"
                  placeholder="votre.email@exemple.com"
                    />
                  </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                >
                <Label htmlFor="phone" className="text-gray-700 font-semibold">Téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  className="mt-2 border-red-200 focus:border-red-500 focus:ring-red-500"
                  placeholder="+212 6XX XX XX XX"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 }}
              >
                <Label htmlFor="message" className="text-gray-700 font-semibold">Message</Label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  rows={5}
                  className="mt-2 w-full px-3 py-2 border border-red-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                  placeholder="Parlez-nous de votre enfant et de vos besoins..."
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Envoi en cours...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Send className="w-5 h-5" />
                      Envoyer le message avec ♥
                    </span>
                  )}
                    </Button>
                  </motion.div>
            </form>
            </motion.div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          className="mt-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-2xl overflow-hidden"
            whileHover={{ scale: 1.01, transition: { duration: 0.3 } }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Notre Localisation</h3>
                <p className="text-gray-600">Centre Grand Cœur, Casablanca</p>
              </div>
            </div>

            {/* Map Container */}
            <div className="relative w-full h-[450px] rounded-2xl overflow-hidden border-4 border-red-100 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3324.0!2d-7.634389!3d33.511556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzPCsDMwJzQxLjYiTiA3wrAzOCcwMy44Ilc!5e0!3m2!1sen!2s!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-0 hover:grayscale-0 transition-all duration-300"
              />
              
              {/* Map Overlay Info Card */}
              <motion.div
                className="absolute bottom-6 left-6 bg-white rounded-2xl p-4 shadow-2xl max-w-xs"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.5 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Centre Grand Cœur</h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      123 Avenue de l'Espoir<br />
                      Casablanca, Maroc
                    </p>
                    <motion.a
                      href="https://www.google.com/maps/search/?api=1&query=33.511556,-7.634389"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs font-semibold text-red-600 hover:text-red-700"
                      whileHover={{ x: 3 }}
                    >
                      Obtenir l'itinéraire →
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Additional Info Below Map */}
            <div className="mt-6 grid sm:grid-cols-3 gap-4">
              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Distance</p>
                  <p className="text-sm font-bold text-gray-900">Centre-ville</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.7 }}
              >
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Parking</p>
                  <p className="text-sm font-bold text-gray-900">Disponible</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center gap-3 p-4 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <div className="w-10 h-10 bg-rose-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-gray-600 font-medium">Accès</p>
                  <p className="text-sm font-bold text-gray-900">Facile</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

