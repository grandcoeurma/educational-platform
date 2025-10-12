"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, Music, Palette, Activity, Brain, BookOpen, Users, MessageCircle } from "lucide-react"

export function ProgramsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

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

        {/* Horizontal Scrolling Carousel - Train Animation (Right to Left) */}
        <div className="relative overflow-hidden py-8">
          {/* Gradient Overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-red-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-yellow-50 to-transparent z-10 pointer-events-none" />
          
          {/* Single track moving from right to left */}
          <motion.div
            className="flex gap-6"
            animate={{
              x: [0, -2400],
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              },
            }}
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

        {/* Bottom Info Badge */}
        <motion.div
          className="text-center mt-12 container mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-red-100 shadow-md">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              ✨
            </motion.div>
            <span className="text-sm font-semibold text-gray-800">
              Survolez les cartes pour voir les animations
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

