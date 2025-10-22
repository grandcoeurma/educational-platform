"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { MapPin, Phone, Mail, Send, Clock, Heart, Facebook, Instagram } from "lucide-react"
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
    fullName: "",
    phone: "",
    conditionType: "",
    address: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus({ 
          type: 'success', 
          message: data.message || 'Message envoyé avec succès! Nous vous contacterons bientôt.' 
        })
        setFormData({ fullName: "", phone: "", conditionType: "", address: "", message: "" })
      } else {
        setSubmitStatus({ 
          type: 'error', 
          message: data.error || 'Une erreur est survenue. Veuillez réessayer.' 
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'Impossible de se connecter au serveur. Veuillez réessayer plus tard.' 
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Adresse",
      content: "Centre grand cœur\nRoute bouskoura, N°109, 7km sidi Maârouf\nAin chok Casablanca",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Phone,
      title: "Téléphone",
      content: "0522 10 32 99\n0661 98 73 99",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: Mail,
      title: "Email",
      content: "contact@centregrandcoeur.com",
      color: "from-blue-500 to-cyan-500",
    },
  ]

  return (
    <section id="contact" className="py-6 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden" ref={ref}>
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
            className="text-center mb-6"
            initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
        >
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

        {/* Image Gallery Above Form - First Set */}
        <div className="mb-20">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* School1 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-red-300/30 to-rose-500/30 rounded-[60%_40%_50%_50%/70%_30%_70%_30%] blur-2xl"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 90, 0],
                  borderRadius: [
                    "60% 40% 50% 50% / 70% 30% 70% 30%",
                    "50% 50% 40% 60% / 30% 70% 30% 70%",
                    "60% 40% 50% 50% / 70% 30% 70% 30%"
                  ],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                {/* Organic SVG Mask */}
                <div className="absolute inset-0" style={{ clipPath: "url(#school1Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="school1Shape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.12,0.08 Q 0.48,0.02 0.78,0.12 T 0.93,0.32 Q 0.98,0.55 0.87,0.78 T 0.65,0.95 Q 0.35,1 0.15,0.85 T 0.07,0.58 Q 0.03,0.32 0.12,0.08 Z"
                          animate={{
                            d: [
                              "M 0.12,0.08 Q 0.48,0.02 0.78,0.12 T 0.93,0.32 Q 0.98,0.55 0.87,0.78 T 0.65,0.95 Q 0.35,1 0.15,0.85 T 0.07,0.58 Q 0.03,0.32 0.12,0.08 Z",
                              "M 0.08,0.12 Q 0.42,0.05 0.75,0.15 T 0.95,0.35 Q 0.97,0.58 0.85,0.82 T 0.6,0.92 Q 0.32,0.97 0.18,0.82 T 0.05,0.55 Q 0.02,0.28 0.08,0.12 Z",
                              "M 0.12,0.08 Q 0.48,0.02 0.78,0.12 T 0.93,0.32 Q 0.98,0.55 0.87,0.78 T 0.65,0.95 Q 0.35,1 0.15,0.85 T 0.07,0.58 Q 0.03,0.32 0.12,0.08 Z"
                            ]
                          }}
                          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/school1.jpeg"
                      alt="Centre Grand Cœur"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-rose-500/5 to-pink-500/10" />
                  </div>
                </div>

                {/* Vector Stroke - Top Right */}
                <motion.svg
                  className="absolute -top-4 right-1/4 w-32 h-10"
                  viewBox="0 0 150 40"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                >
                  <motion.path
                    d="M 10,20 Q 50,5 90,20 T 140,20"
                    stroke="url(#school1Gradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 10,20 Q 50,5 90,20 T 140,20",
                        "M 10,20 Q 50,30 90,20 T 140,20",
                        "M 10,20 Q 50,5 90,20 T 140,20"
                      ]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="school1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Sparkle decoration */}
                <motion.div
                  className="absolute top-4 left-4 text-3xl"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  🏫
                </motion.div>
              </motion.div>
            </motion.div>

            {/* School2 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-orange-300/30 to-red-500/30 rounded-[50%_50%_60%_40%/40%_60%_50%_50%] blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -120, 0],
                  borderRadius: [
                    "50% 50% 60% 40% / 40% 60% 50% 50%",
                    "40% 60% 50% 50% / 50% 50% 60% 40%",
                    "50% 50% 60% 40% / 40% 60% 50% 50%"
                  ],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                {/* Organic SVG Mask */}
                <div className="absolute inset-0" style={{ clipPath: "url(#school2Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="school2Shape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.18,0.05 Q 0.52,0 0.82,0.1 T 0.95,0.28 Q 1,0.52 0.9,0.75 T 0.68,0.93 Q 0.38,0.98 0.16,0.88 T 0.05,0.62 Q 0,0.38 0.18,0.05 Z"
                          animate={{
                            d: [
                              "M 0.18,0.05 Q 0.52,0 0.82,0.1 T 0.95,0.28 Q 1,0.52 0.9,0.75 T 0.68,0.93 Q 0.38,0.98 0.16,0.88 T 0.05,0.62 Q 0,0.38 0.18,0.05 Z",
                              "M 0.15,0.08 Q 0.48,0.03 0.78,0.13 T 0.92,0.32 Q 0.97,0.55 0.88,0.78 T 0.62,0.95 Q 0.35,0.97 0.15,0.85 T 0.03,0.58 Q 0.02,0.32 0.15,0.08 Z",
                              "M 0.18,0.05 Q 0.52,0 0.82,0.1 T 0.95,0.28 Q 1,0.52 0.9,0.75 T 0.68,0.93 Q 0.38,0.98 0.16,0.88 T 0.05,0.62 Q 0,0.38 0.18,0.05 Z"
                            ]
                          }}
                          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/school2.jpeg"
                      alt="Nos installations"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-rose-500/10" />
                  </div>
                </div>

                {/* Vector Stroke - Bottom Left */}
                <motion.svg
                  className="absolute -bottom-3 left-1/4 w-36 h-12"
                  viewBox="0 0 160 50"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
                  <motion.path
                    d="M 10,25 Q 50,10 90,25 T 150,25"
                    stroke="url(#school2Gradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 10,25 Q 50,10 90,25 T 150,25",
                        "M 10,25 Q 50,35 90,25 T 150,25",
                        "M 10,25 Q 50,10 90,25 T 150,25"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="school2Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Sparkle decoration */}
                <motion.div
                  className="absolute bottom-4 right-4 text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  💝
                </motion.div>
              </motion.div>
            </motion.div>

            {/* School3 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute top-1/2 -left-10 w-36 h-36 bg-gradient-to-br from-pink-300/30 to-rose-500/30 rounded-[70%_30%_40%_60%/50%_50%_60%_40%] blur-2xl"
                animate={{
                  scale: [1, 1.25, 1],
                  rotate: [0, 180, 360],
                  borderRadius: [
                    "70% 30% 40% 60% / 50% 50% 60% 40%",
                    "40% 60% 70% 30% / 60% 40% 50% 50%",
                    "70% 30% 40% 60% / 50% 50% 60% 40%"
                  ],
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                {/* Organic SVG Mask */}
                <div className="absolute inset-0" style={{ clipPath: "url(#school3Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="school3Shape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.2,0.07 Q 0.55,0.02 0.85,0.15 T 0.97,0.35 Q 1,0.6 0.88,0.82 T 0.62,0.96 Q 0.32,1 0.13,0.87 T 0.03,0.55 Q 0.01,0.3 0.2,0.07 Z"
                          animate={{
                            d: [
                              "M 0.2,0.07 Q 0.55,0.02 0.85,0.15 T 0.97,0.35 Q 1,0.6 0.88,0.82 T 0.62,0.96 Q 0.32,1 0.13,0.87 T 0.03,0.55 Q 0.01,0.3 0.2,0.07 Z",
                              "M 0.17,0.1 Q 0.5,0.04 0.82,0.18 T 0.95,0.38 Q 0.98,0.62 0.85,0.85 T 0.58,0.93 Q 0.3,0.97 0.15,0.83 T 0.05,0.52 Q 0.03,0.27 0.17,0.1 Z",
                              "M 0.2,0.07 Q 0.55,0.02 0.85,0.15 T 0.97,0.35 Q 1,0.6 0.88,0.82 T 0.62,0.96 Q 0.32,1 0.13,0.87 T 0.03,0.55 Q 0.01,0.3 0.2,0.07 Z"
                            ]
                          }}
                          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/school3.jpeg"
                      alt="Espace d'apprentissage"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-rose-500/5 to-red-500/10" />
                  </div>
                </div>

                {/* Vector Stroke - Left Side */}
                <motion.svg
                  className="absolute top-1/3 -left-2 w-10 h-32"
                  viewBox="0 0 40 120"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  <motion.path
                    d="M 20,10 Q 30,40 20,70 T 20,110"
                    stroke="url(#school3Gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 20,10 Q 30,40 20,70 T 20,110",
                        "M 20,10 Q 10,40 20,70 T 20,110",
                        "M 20,10 Q 30,40 20,70 T 20,110"
                      ]
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="school3Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ec4899" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Sparkle decoration */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl"
                  animate={{
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  ❤️
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
            className="space-y-4"
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

            {/* Social Media Links */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg relative overflow-hidden"
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.1, type: "spring", stiffness: 100 }}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                rotateX: 5,
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="font-bold text-lg text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
                Suivez-nous
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/centregrandcoeur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 transition-all group"
                >
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Facebook className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-800">Facebook</div>
                    <div className="text-sm text-gray-600">centre grand cœur</div>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/centre.grandcoeur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-pink-50 to-purple-100 hover:from-pink-100 hover:to-purple-200 transition-all group"
                >
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-800">Instagram</div>
                    <div className="text-sm text-gray-600">centre.grandcoeur</div>
                  </div>
                </a>
              </div>
            </motion.div>

            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, type: "spring", stiffness: 100 }}
            >
            <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl space-y-6 relative overflow-hidden group">
              {/* Decorative Background Elements */}
              <motion.div
                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-red-200/30 to-orange-200/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              />
              <motion.div
                className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-red-200/30 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                }}
              />

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
                  >
                <Label htmlFor="fullName" className="text-gray-700 font-semibold">Nom et prénom</Label>
                    <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                <Label htmlFor="phone" className="text-gray-700 font-semibold">Numéro de téléphone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  className="mt-2 border-red-200 focus:border-red-500 focus:ring-red-500"
                  placeholder="06XX XX XX XX"
                  />
                </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2 }}
                  >
                <Label htmlFor="conditionType" className="text-gray-700 font-semibold">Type de condition de l'enfant</Label>
                    <Input
                  id="conditionType"
                  value={formData.conditionType}
                  onChange={(e) => setFormData({ ...formData, conditionType: e.target.value })}
                      required
                  className="mt-2 border-red-200 focus:border-red-500 focus:ring-red-500"
                  placeholder="Ex: Autisme, Trisomie 21, etc."
                    />
                  </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.3 }}
              >
                <Label htmlFor="address" className="text-gray-700 font-semibold">Adresse</Label>
                <textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                  rows={3}
                  className="mt-2 w-full px-3 py-2 border border-red-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500 focus:outline-none resize-none"
                  placeholder="Votre adresse"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.4 }}
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
                transition={{ delay: 1.5 }}
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white py-6 text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
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

                  {/* Status Message */}
                  {submitStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 p-4 rounded-2xl text-center font-medium ${
                        submitStatus.type === 'success' 
                          ? 'bg-green-50 text-green-700 border-2 border-green-200' 
                          : 'bg-red-50 text-red-700 border-2 border-red-200'
                      }`}
                    >
                      {submitStatus.message}
                    </motion.div>
                  )}
            </form>
            </motion.div>
        </div>

        {/* Image Gallery Above Map - Second Set */}
        <div className="mt-16">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* School4 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-cyan-300/30 to-blue-500/30 rounded-[60%_40%_50%_50%/70%_30%_70%_30%] blur-2xl"
                animate={{
                  scale: [1, 1.15, 1],
                  rotate: [0, 90, 0],
                  borderRadius: [
                    "60% 40% 50% 50% / 70% 30% 70% 30%",
                    "50% 50% 40% 60% / 30% 70% 30% 70%",
                    "60% 40% 50% 50% / 70% 30% 70% 30%"
                  ],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                {/* Organic SVG Mask */}
                <div className="absolute inset-0" style={{ clipPath: "url(#school4Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="school4Shape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.12,0.08 Q 0.48,0.02 0.78,0.12 T 0.93,0.32 Q 0.98,0.55 0.87,0.78 T 0.65,0.95 Q 0.35,1 0.15,0.85 T 0.07,0.58 Q 0.03,0.32 0.12,0.08 Z"
                          animate={{
                            d: [
                              "M 0.12,0.08 Q 0.48,0.02 0.78,0.12 T 0.93,0.32 Q 0.98,0.55 0.87,0.78 T 0.65,0.95 Q 0.35,1 0.15,0.85 T 0.07,0.58 Q 0.03,0.32 0.12,0.08 Z",
                              "M 0.08,0.12 Q 0.42,0.05 0.75,0.15 T 0.95,0.35 Q 0.97,0.58 0.85,0.82 T 0.6,0.92 Q 0.32,0.97 0.18,0.82 T 0.05,0.55 Q 0.02,0.28 0.08,0.12 Z",
                              "M 0.12,0.08 Q 0.48,0.02 0.78,0.12 T 0.93,0.32 Q 0.98,0.55 0.87,0.78 T 0.65,0.95 Q 0.35,1 0.15,0.85 T 0.07,0.58 Q 0.03,0.32 0.12,0.08 Z"
                            ]
                          }}
                          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/school4.jpeg"
                      alt="Activités éducatives"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-indigo-500/10" />
                  </div>
                </div>

                {/* Vector Stroke - Top Right */}
                <motion.svg
                  className="absolute -top-4 right-1/4 w-32 h-10"
                  viewBox="0 0 150 40"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                >
                  <motion.path
                    d="M 10,20 Q 50,5 90,20 T 140,20"
                    stroke="url(#school4Gradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 10,20 Q 50,5 90,20 T 140,20",
                        "M 10,20 Q 50,30 90,20 T 140,20",
                        "M 10,20 Q 50,5 90,20 T 140,20"
                      ]
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="school4Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Sparkle decoration */}
                <motion.div
                  className="absolute top-4 left-4 text-3xl"
                  animate={{
                    rotate: [0, 180, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  🎓
                </motion.div>
              </motion.div>
            </motion.div>

            {/* School5 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-violet-300/30 to-purple-500/30 rounded-[50%_50%_60%_40%/40%_60%_50%_50%] blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -120, 0],
                  borderRadius: [
                    "50% 50% 60% 40% / 40% 60% 50% 50%",
                    "40% 60% 50% 50% / 50% 50% 60% 40%",
                    "50% 50% 60% 40% / 40% 60% 50% 50%"
                  ],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05, rotate: -2 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                {/* Organic SVG Mask */}
                <div className="absolute inset-0" style={{ clipPath: "url(#school5Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="school5Shape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.18,0.05 Q 0.52,0 0.82,0.1 T 0.95,0.28 Q 1,0.52 0.9,0.75 T 0.68,0.93 Q 0.38,0.98 0.16,0.88 T 0.05,0.62 Q 0,0.38 0.18,0.05 Z"
                          animate={{
                            d: [
                              "M 0.18,0.05 Q 0.52,0 0.82,0.1 T 0.95,0.28 Q 1,0.52 0.9,0.75 T 0.68,0.93 Q 0.38,0.98 0.16,0.88 T 0.05,0.62 Q 0,0.38 0.18,0.05 Z",
                              "M 0.15,0.08 Q 0.48,0.03 0.78,0.13 T 0.92,0.32 Q 0.97,0.55 0.88,0.78 T 0.62,0.95 Q 0.35,0.97 0.15,0.85 T 0.03,0.58 Q 0.02,0.32 0.15,0.08 Z",
                              "M 0.18,0.05 Q 0.52,0 0.82,0.1 T 0.95,0.28 Q 1,0.52 0.9,0.75 T 0.68,0.93 Q 0.38,0.98 0.16,0.88 T 0.05,0.62 Q 0,0.38 0.18,0.05 Z"
                            ]
                          }}
                          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/school5.jpeg"
                      alt="Environnement bienveillant"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-purple-500/5 to-fuchsia-500/10" />
                  </div>
                </div>

                {/* Vector Stroke - Bottom Left */}
                <motion.svg
                  className="absolute -bottom-3 left-1/4 w-36 h-12"
                  viewBox="0 0 160 50"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 0.8 }}
                >
                  <motion.path
                    d="M 10,25 Q 50,10 90,25 T 150,25"
                    stroke="url(#school5Gradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 10,25 Q 50,10 90,25 T 150,25",
                        "M 10,25 Q 50,35 90,25 T 150,25",
                        "M 10,25 Q 50,10 90,25 T 150,25"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="school5Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Sparkle decoration */}
                <motion.div
                  className="absolute bottom-4 right-4 text-3xl"
                  animate={{
                    y: [0, -10, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  💖
                </motion.div>
              </motion.div>
            </motion.div>

            {/* School6 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute top-1/2 -left-10 w-36 h-36 bg-gradient-to-br from-amber-300/30 to-yellow-500/30 rounded-[70%_30%_40%_60%/50%_50%_60%_40%] blur-2xl"
                animate={{
                  scale: [1, 1.25, 1],
                  rotate: [0, 180, 360],
                  borderRadius: [
                    "70% 30% 40% 60% / 50% 50% 60% 40%",
                    "40% 60% 70% 30% / 60% 40% 50% 50%",
                    "70% 30% 40% 60% / 50% 50% 60% 40%"
                  ],
                }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 150 }}
              >
                {/* Organic SVG Mask */}
                <div className="absolute inset-0" style={{ clipPath: "url(#school6Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="school6Shape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.2,0.07 Q 0.55,0.02 0.85,0.15 T 0.97,0.35 Q 1,0.6 0.88,0.82 T 0.62,0.96 Q 0.32,1 0.13,0.87 T 0.03,0.55 Q 0.01,0.3 0.2,0.07 Z"
                          animate={{
                            d: [
                              "M 0.2,0.07 Q 0.55,0.02 0.85,0.15 T 0.97,0.35 Q 1,0.6 0.88,0.82 T 0.62,0.96 Q 0.32,1 0.13,0.87 T 0.03,0.55 Q 0.01,0.3 0.2,0.07 Z",
                              "M 0.17,0.1 Q 0.5,0.04 0.82,0.18 T 0.95,0.38 Q 0.98,0.62 0.85,0.85 T 0.58,0.93 Q 0.3,0.97 0.15,0.83 T 0.05,0.52 Q 0.03,0.27 0.17,0.1 Z",
                              "M 0.2,0.07 Q 0.55,0.02 0.85,0.15 T 0.97,0.35 Q 1,0.6 0.88,0.82 T 0.62,0.96 Q 0.32,1 0.13,0.87 T 0.03,0.55 Q 0.01,0.3 0.2,0.07 Z"
                            ]
                          }}
                          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/school6.jpeg"
                      alt="Accompagnement personnalisé"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-yellow-500/5 to-orange-500/10" />
                  </div>
                </div>

                {/* Vector Stroke - Left Side */}
                <motion.svg
                  className="absolute top-1/3 -left-2 w-10 h-32"
                  viewBox="0 0 40 120"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, delay: 1 }}
                >
                  <motion.path
                    d="M 20,10 Q 30,40 20,70 T 20,110"
                    stroke="url(#school6Gradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 20,10 Q 30,40 20,70 T 20,110",
                        "M 20,10 Q 10,40 20,70 T 20,110",
                        "M 20,10 Q 30,40 20,70 T 20,110"
                      ]
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="school6Gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#eab308" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Sparkle decoration */}
                <motion.div
                  className="absolute top-4 right-4 text-3xl"
                  animate={{
                    rotate: [0, -15, 15, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  🌟
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Interactive Map Section */}
        <motion.div
          className="mt-20 max-w-6xl mx-auto"
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

