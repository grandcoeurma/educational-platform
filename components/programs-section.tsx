"use client"

import { motion, useMotionValue, useAnimation, PanInfo } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Heart, Music, Palette, Activity, Brain, BookOpen, Users, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react"

export function ProgramsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isAutoScrolling, setIsAutoScrolling] = useState(true)
  const x = useMotionValue(0)
  const controls = useAnimation()
  const constraintsRef = useRef<HTMLDivElement>(null)

  // Handle infinite loop when reaching the end
  useEffect(() => {
    const unsubscribe = x.on("change", (latest) => {
      if (latest <= -2400 && isAutoScrolling) {
        x.set(0)
      }
    })
    return () => unsubscribe()
  }, [x, isAutoScrolling])

  // Word-by-word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.2
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.3,
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

  const programs = [
    {
      icon: Heart,
      title: "L'accompagnement éducatif et thérapeutique personnalisé",
      description: "Au centre Grand Cœur, chaque enfant bénéficie d'un programme individualisé, conçu selon ses besoins, ses capacités et son rythme. Nos activités sont à la fois éducatives, ludiques et thérapeutiques, visant à développer l'autonomie, la communication, les compétences sociales et motrices. Nous collaborons étroitement avec les familles pour assurer une continuité et un suivi de qualité.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: Music,
      title: "La musique",
      description: "La musique est un formidable outil d'expression, de communication et de stimulation sensorielle. Au centre Grand Cœur, des séances de musicothérapie sont animées par des professionnels spécialisés, dans un cadre sécurisant et adapté. Ces moments musicaux aident les enfants à développer leur attention, leur motricité, leur expression émotionnelle et leur interaction sociale, tout en s'amusant.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: Palette,
      title: "Le dessin",
      description: "Au centre Grand Cœur, le dessin est bien plus qu'un simple loisir : c'est un véritable outil de communication et de développement personnel. Encadrés par des professionnels, les enfants explorent les formes, les couleurs et la créativité pour exprimer leurs émotions, renforcer leur motricité fine et gagner en confiance en eux. Chaque création artistique devient un pas vers l'autonomie et l'épanouissement.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: Activity,
      title: "Sport adapté",
      description: "Le sport adapté contribue au bien-être physique et mental des enfants. Nos activités sportives sont conçues selon les capacités de chaque enfant afin de stimuler la motricité, la socialisation et le plaisir de bouger en toute sécurité.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: Brain,
      title: "Suivi psychique",
      description: "Chaque enfant bénéficie d'un suivi psychologique régulier assuré par des professionnels qualifiés. Ce soutien permet de comprendre et d'accompagner les émotions, de renforcer la stabilité affective et de favoriser un développement harmonieux.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: BookOpen,
      title: "Programme scolaire adapté",
      description: "Notre programme scolaire est conçu pour s'adapter au rythme et aux besoins de chaque enfant. Il intègre des méthodes pédagogiques innovantes pour encourager l'apprentissage, la curiosité et la réussite dans un environnement bienveillant.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: Users,
      title: "Psychomotricité",
      description: "La psychomotricité favorise le développement global de l'enfant à travers le mouvement, l'équilibre et la coordination. Nos séances ludiques permettent d'améliorer la motricité fine et globale tout en renforçant la confiance en soi et l'autonomie.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
    {
      icon: MessageCircle,
      title: "Orthophonie",
      description: "L'orthophonie aide les enfants à développer leurs capacités de communication, à améliorer la prononciation et à renforcer la compréhension du langage. Nos orthophonistes spécialisés travaillent avec chaque enfant selon ses besoins spécifiques, pour lui permettre de s'exprimer avec confiance au quotidien.",
      color: "from-red-500 to-red-600",
      bgColor: "from-red-50 to-red-100",
    },
  ]

  return (
    <section id="programs" className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-200/20 to-red-300/20 blur-2xl"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 50 - 25, 0],
              y: [0, Math.random() * 50 - 25, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 container mx-auto px-4"
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
            Nos Programmes et Activités
          </motion.h2>

          <AnimatedText 
            text="Chaque programme est conçu avec amour pour accompagner votre enfant dans son épanouissement unique"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Image Gallery with Organic Shapes */}
        <div className="container mx-auto px-4 mb-20">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {/* Sport Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-300/30 to-blue-500/30 rounded-[60%_40%_50%_50%/70%_30%_70%_30%] blur-2xl"
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
                <div className="absolute inset-0" style={{ clipPath: "url(#sportShape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="sportShape" clipPathUnits="objectBoundingBox">
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
                      src="/sport.jpg"
                      alt="Sport adapté"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-teal-500/10" />
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
                    stroke="url(#sportGradient)"
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
                    <linearGradient id="sportGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#06b6d4" />
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
                  ⚽
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Program1 Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-purple-300/30 to-pink-500/30 rounded-[50%_50%_60%_40%/40%_60%_50%_50%] blur-2xl"
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
                <div className="absolute inset-0" style={{ clipPath: "url(#program1Shape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="program1Shape" clipPathUnits="objectBoundingBox">
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
                      src="/program1.webp"
                      alt="Programme éducatif"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-rose-500/10" />
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
                    stroke="url(#program1Gradient)"
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
                    <linearGradient id="program1Gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#ec4899" />
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
                  📚
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Music Image */}
            <motion.div
              className="relative h-[350px] md:h-[400px]"
              initial={{ opacity: 0, y: 50, rotateY: 15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {/* Floating background shapes */}
              <motion.div
                className="absolute top-1/2 -left-10 w-36 h-36 bg-gradient-to-br from-orange-300/30 to-red-500/30 rounded-[70%_30%_40%_60%/50%_50%_60%_40%] blur-2xl"
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
                <div className="absolute inset-0" style={{ clipPath: "url(#musicShape)" }}>
                  <svg width="0" height="0">
                    <defs>
                      <clipPath id="musicShape" clipPathUnits="objectBoundingBox">
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
                      src="/music.webp"
                      alt="Musique"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-pink-500/10" />
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
                    stroke="url(#musicGradient)"
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
                    <linearGradient id="musicGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
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
                  🎵
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Horizontal Scrolling Carousel - Train Animation with Manual Controls */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-red-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-yellow-50 to-transparent z-10 pointer-events-none" />
          
          {/* Navigation Arrows */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={() => {
                setIsAutoScrolling(false)
                const currentX = x.get()
                controls.start({
                  x: currentX + 450,
                  transition: { duration: 0.5, ease: "easeOut" as const }
                })
              }}
              className="group bg-white hover:bg-red-50 p-4 rounded-full shadow-xl border-2 border-red-200 hover:border-red-400 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft className="w-6 h-6 text-red-600 group-hover:text-red-700" strokeWidth={3} />
            </motion.button>
          </div>

          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20">
            <motion.button
              onClick={() => {
                setIsAutoScrolling(false)
                const currentX = x.get()
                controls.start({
                  x: currentX - 450,
                  transition: { duration: 0.5, ease: "easeOut" as const }
                })
              }}
              className="group bg-white hover:bg-red-50 p-4 rounded-full shadow-xl border-2 border-red-200 hover:border-red-400 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight className="w-6 h-6 text-red-600 group-hover:text-red-700" strokeWidth={3} />
            </motion.button>
          </div>
          
          {/* Draggable track moving from right to left */}
          <motion.div
            ref={constraintsRef}
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -2400, right: 0 }}
            dragElastic={0.1}
            onDragStart={() => setIsAutoScrolling(false)}
            onDragEnd={(event, info: PanInfo) => {
              // Resume auto-scroll after drag with current position
              const currentX = x.get()
              setIsAutoScrolling(true)
              controls.start({
                x: [currentX, -2400],
                transition: {
                  duration: (2400 + currentX) / 60, // Adjust duration based on remaining distance
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }
              })
            }}
            animate={isAutoScrolling ? {
              x: [0, -2400],
            } : controls}
            transition={isAutoScrolling ? {
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            } : {}}
          >
            {/* Duplicate programs twice for seamless loop */}
            {[...programs, ...programs].map((program, index) => (
              <motion.div
                key={`program-${index}`}
                className="group relative flex-shrink-0 w-[350px] md:w-[420px]"
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <div className={`relative bg-gradient-to-br ${program.bgColor} p-8 rounded-[32px] shadow-xl hover:shadow-2xl transition-all overflow-hidden h-full border-2 border-white/50`}>
                  {/* Background Glow Effect */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}
                  />
                  
                  {/* Animated gradient border */}
                  <motion.div
                    className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100"
                    style={{
                      background: "linear-gradient(45deg, transparent, rgba(239, 68, 68, 0.3), transparent)",
                      backgroundSize: "200% 200%",
                    }}
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <motion.div
                      className={`relative w-20 h-20 bg-gradient-to-br ${program.color} rounded-[24px] flex items-center justify-center mb-6 shadow-2xl`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.15,
                        transition: { duration: 0.5 }
                      }}
                    >
                      <program.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                      
                      {/* Pulsing ring */}
                      <motion.div
                        className="absolute inset-0 rounded-[24px] border-3 border-red-300"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.6, 0, 0.6]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
                      {program.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed line-clamp-6">
                      {program.description}
                    </p>

                    {/* Floating Sparkle */}
                    <motion.div
                      className="absolute top-6 right-6 text-3xl opacity-0 group-hover:opacity-100"
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 180, 360],
                        scale: [1, 1.3, 1],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      ✨
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

