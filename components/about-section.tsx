"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Heart, Users, BookOpen, Smile, Sparkles, Award, Target } from "lucide-react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // Word-by-word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 15,
      rotateX: -45
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
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

  const features = [
    {
      icon: Heart,
      title: "Avec amour",
      description: "Chaque enfant est accueilli avec bienveillance et respect",
    },
    {
      icon: Users,
      title: "Accompagnement personnalisé",
      description: "Un suivi adapté aux besoins spécifiques de chaque enfant",
    },
    {
      icon: BookOpen,
      title: "Apprentissage adapté",
      description: "Des méthodes pédagogiques innovantes et inclusives",
    },
    {
      icon: Smile,
      title: "Environnement stimulant",
      description: "Un cadre sécurisant favorisant l'épanouissement",
    },
  ]

  return (
    <section id="about" className="py-16 md:py-20 bg-gradient-to-br from-[#fffaf9] via-white to-[#fff5f5] relative overflow-hidden" ref={ref}>
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-red-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-tl from-red-300/20 to-orange-200/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Floating Vector Elements */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/20 rounded-full"
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Modern Section Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ letterSpacing: '-0.02em' }}
          >
            Qui sommes-nous ?
          </motion.h2>
          
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-full mx-auto"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
        </motion.div>

        {/* Main Content - Modern Grid Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Text Content - Enhanced with Vector Strokes */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 relative order-2 md:order-1"
          >
            {/* Decorative Vector Strokes Around Text */}
            {/* Top Left Curved Stroke */}
            <motion.svg
              className="absolute -top-12 -left-8 w-32 h-32 pointer-events-none"
              viewBox="0 0 120 120"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.path
                d="M 10,60 Q 30,20 60,30 T 110,50"
                stroke="url(#textStroke1)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 10,60 Q 30,20 60,30 T 110,50",
                    "M 10,60 Q 30,35 60,30 T 110,50",
                    "M 10,60 Q 30,20 60,30 T 110,50"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="textStroke1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Right Side Playful Stroke */}
            <motion.svg
              className="absolute -top-6 -right-12 w-40 h-40 pointer-events-none"
              viewBox="0 0 160 160"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2, delay: 0.7 }}
            >
              <motion.path
                d="M 20,80 Q 60,40 80,80 T 140,100"
                stroke="url(#textStroke2)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 20,80 Q 60,40 80,80 T 140,100",
                    "M 20,80 Q 60,55 80,80 T 140,100",
                    "M 20,80 Q 60,40 80,80 T 140,100"
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="textStroke2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Bottom Wavy Stroke */}
            <motion.svg
              className="absolute -bottom-8 left-1/4 w-48 h-24 pointer-events-none"
              viewBox="0 0 200 100"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.6 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <motion.path
                d="M 10,50 Q 50,30 100,50 T 190,50"
                stroke="url(#textStroke3)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 10,50 Q 50,30 100,50 T 190,50",
                    "M 10,50 Q 50,65 100,50 T 190,50",
                    "M 10,50 Q 50,30 100,50 T 190,50"
                  ]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="textStroke3" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Floating Sparkles */}
            {[
              { left: "-10px", top: "30%", delay: 0 },
              { right: "-5px", top: "50%", delay: 1 },
              { left: "20%", bottom: "20%", delay: 2 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ ...pos }}
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                }}
              >
                <Sparkles className="w-5 h-5 text-red-400" />
              </motion.div>
            ))}

            {/* Enhanced Main Description Card */}
            <motion.div
              className="bg-gradient-to-br from-white via-red-50/30 to-white backdrop-blur-sm p-10 rounded-[32px] shadow-2xl border-2 border-red-100 relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                boxShadow: "0 25px 50px rgba(239, 68, 68, 0.15)",
                y: -5 
              }}
            >
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100/50 to-transparent rounded-bl-[100px]" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100/40 to-transparent rounded-tr-[80px]" />
              
              <div className="space-y-6 relative z-10">
                {/* Intro Badge */}
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-lg"
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.7, type: "spring" }}
                >
                  <Heart className="w-4 h-4 text-white fill-white" />
                  <span className="text-sm font-bold text-white">Notre Mission</span>
                </motion.div>

                {/* Enhanced Headline */}
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight">
                    <AnimatedText 
                      text="Un centre d'excellence pour l'épanouissement de chaque enfant"
                      className=""
                    />
                  </h3>
                  
                  <motion.div 
                    className="h-1.5 w-24 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-full shadow-md"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 96 } : {}}
                    transition={{ duration: 1, delay: 1 }}
                  />
                </div>

                {/* Rich Description */}
                <div className="space-y-4">
                  <p className="text-lg md:text-xl text-gray-800 leading-relaxed font-medium">
                    <AnimatedText 
                      text="Grand Cœur est un centre spécialisé dédié aux enfants porteurs de troubles du spectre autistique (TSA) et de trisomie 21."
                      className=""
                    />
                  </p>
                  
                  <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                    <AnimatedText 
                      text="Fondé avec amour et passion, notre mission est d'offrir à chaque enfant un cadre éducatif adapté, bienveillant et stimulant, répondant à ses besoins spécifiques pour favoriser son développement et son autonomie."
                      className=""
                    />
                  </p>

                  {/* Key Points */}
                  <motion.div 
                    className="grid gap-3 mt-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.2 }}
                  >
                    {[
                      { icon: Target, text: "Approche personnalisée et bienveillante" },
                      { icon: Users, text: "Équipe pluridisciplinaire expérimentée" },
                      { icon: Sparkles, text: "Environnement sécurisé et stimulant" }
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        className="flex items-center gap-3 p-3 bg-white/60 rounded-2xl border border-red-100/50"
                        initial={{ x: -20, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: 1.3 + idx * 0.1 }}
                        whileHover={{ x: 5, backgroundColor: "rgba(254, 242, 242, 0.8)" }}
                      >
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-sm md:text-base font-semibold text-gray-800">{item.text}</span>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Animated Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 rounded-[32px]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>

          {/* Image Gallery - Organic Wavy Shape Design */}
          <motion.div
            className="relative order-1 md:order-2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="relative h-[500px]">
              {/* Organic Background Blobs - Red Tones */}
              <motion.div
                className="absolute -top-8 -left-8 w-72 h-72 bg-gradient-to-br from-red-400/30 to-rose-500/30 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl"
                animate={{
                  rotate: [0, 360],
                  borderRadius: [
                    "40% 60% 70% 30% / 40% 50% 60% 50%",
                    "60% 40% 30% 70% / 50% 60% 40% 60%",
                    "40% 60% 70% 30% / 40% 50% 60% 50%"
                  ],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              
              <motion.div
                className="absolute -bottom-12 -right-12 w-80 h-80 bg-gradient-to-br from-red-500/30 to-orange-500/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl"
                animate={{
                  rotate: [360, 0],
                  borderRadius: [
                    "60% 40% 30% 70% / 60% 30% 70% 40%",
                    "30% 60% 70% 40% / 50% 60% 30% 70%",
                    "60% 40% 30% 70% / 60% 30% 70% 40%"
                  ],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute top-1/2 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-red-500/20 rounded-[70%_30%_50%_50%/60%_40%_60%_40%] blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  borderRadius: [
                    "70% 30% 50% 50% / 60% 40% 60% 40%",
                    "50% 50% 30% 70% / 40% 60% 40% 60%",
                    "70% 30% 50% 50% / 60% 40% 60% 40%"
                  ],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Main Image with Organic Mask */}
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
              >
                {/* Organic SVG Mask Container */}
                <div className="absolute inset-0" style={{ clipPath: "url(#organicShape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="organicShape" clipPathUnits="objectBoundingBox">
                        <motion.path
                          d="M 0.15,0.05 Q 0.45,0 0.75,0.08 T 0.95,0.25 Q 1,0.5 0.92,0.72 T 0.7,0.95 Q 0.4,1 0.18,0.88 T 0.05,0.6 Q 0,0.35 0.15,0.05 Z"
                          animate={{
                            d: [
                              "M 0.15,0.05 Q 0.45,0 0.75,0.08 T 0.95,0.25 Q 1,0.5 0.92,0.72 T 0.7,0.95 Q 0.4,1 0.18,0.88 T 0.05,0.6 Q 0,0.35 0.15,0.05 Z",
                              "M 0.1,0.08 Q 0.4,0.02 0.72,0.12 T 0.92,0.3 Q 0.98,0.52 0.88,0.75 T 0.65,0.92 Q 0.38,0.98 0.15,0.85 T 0.08,0.55 Q 0.02,0.3 0.1,0.08 Z",
                              "M 0.15,0.05 Q 0.45,0 0.75,0.08 T 0.95,0.25 Q 1,0.5 0.92,0.72 T 0.7,0.95 Q 0.4,1 0.18,0.88 T 0.05,0.6 Q 0,0.35 0.15,0.05 Z"
                            ]
                          }}
                          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </clipPath>
                    </defs>
                  </svg>
                  
                  <div className="w-full h-full relative">
                    <Image
                      src="/who-are-we.jpg"
                      alt="Environnement d'apprentissage à Grand Cœur"
                      fill
                      className="object-cover"
                    />
                    {/* Red gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-rose-500/5 to-orange-500/5" />
                  </div>
                </div>

                {/* Animated Vector Strokes Around Image - Red Tones */}
                {/* Top Stroke */}
                <motion.svg
                  className="absolute -top-6 left-1/4 w-48 h-12"
                  viewBox="0 0 200 50"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 0.8 }}
                >
                  <motion.path
                    d="M 10,25 Q 60,10 100,25 T 190,25"
                    stroke="url(#gradient1)"
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 10,25 Q 60,10 100,25 T 190,25",
                        "M 10,25 Q 60,35 100,25 T 190,25",
                        "M 10,25 Q 60,10 100,25 T 190,25"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Right Stroke */}
                <motion.svg
                  className="absolute top-1/4 -right-8 w-16 h-56"
                  viewBox="0 0 50 200"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 1 }}
                >
                  <motion.path
                    d="M 25,10 Q 35,60 25,100 T 25,190"
                    stroke="url(#gradient2)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 25,10 Q 35,60 25,100 T 25,190",
                        "M 25,10 Q 15,60 25,100 T 25,190",
                        "M 25,10 Q 35,60 25,100 T 25,190"
                      ]
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="50%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Bottom Left Stroke */}
                <motion.svg
                  className="absolute -bottom-4 -left-6 w-40 h-16"
                  viewBox="0 0 180 60"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 2, delay: 1.2 }}
                >
                  <motion.path
                    d="M 10,30 Q 50,45 90,30 T 170,30"
                    stroke="url(#gradient3)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round"
                    animate={{
                      d: [
                        "M 10,30 Q 50,45 90,30 T 170,30",
                        "M 10,30 Q 50,15 90,30 T 170,30",
                        "M 10,30 Q 50,45 90,30 T 170,30"
                      ]
                    }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <defs>
                    <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#dc2626" />
                      <stop offset="50%" stopColor="#f43f5e" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Playful Brush Stroke Accents - Red Tones */}
                <motion.div
                  className="absolute -top-8 right-1/4 w-20 h-20"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="40" fill="url(#circleGradient)" opacity="0.6" />
                    <defs>
                      <radialGradient id="circleGradient">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </motion.div>

                <motion.div
                  className="absolute bottom-1/4 -left-10 w-24 h-24"
                  animate={{
                    rotate: [360, 0],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="50" r="35" fill="url(#orangeGradient)" opacity="0.5" />
                    <defs>
                      <radialGradient id="orangeGradient">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                      </radialGradient>
                    </defs>
                  </svg>
                </motion.div>
              </motion.div>

              {/* Floating Badge with Red Colors */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-white via-red-50 to-white rounded-[30px] shadow-2xl p-6 border-4 border-red-100"
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 8 }}
                style={{
                  boxShadow: "0 20px 60px rgba(239, 68, 68, 0.25)"
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-red-500 via-orange-500 to-rose-500 rounded-[20px] flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(239, 68, 68, 0.6)",
                        "0 0 30px rgba(249, 115, 22, 0.6)",
                        "0 0 20px rgba(244, 63, 94, 0.6)",
                        "0 0 20px rgba(239, 68, 68, 0.6)"
                      ]
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Heart className="w-7 h-7 text-white fill-white" />
                  </motion.div>
                  <div>
                    <div className="text-2xl font-black bg-gradient-to-r from-red-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                      Grand Cœur
                    </div>
                    <div className="text-xs text-gray-700 font-semibold">Centre Spécialisé</div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Colorful Dots - Red Tones */}
              {[
                { color: "bg-red-400", top: "10%", left: "15%", delay: 0 },
                { color: "bg-orange-400", top: "25%", right: "10%", delay: 0.5 },
                { color: "bg-rose-400", bottom: "20%", left: "20%", delay: 1 },
                { color: "bg-pink-400", top: "60%", right: "15%", delay: 1.5 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-3 h-3 ${dot.color} rounded-full`}
                  style={{ ...dot }}
                  animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.5, 1],
                    opacity: [0.6, 1, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: dot.delay,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

