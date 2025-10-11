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
        ease: "easeOut"
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

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
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

        {/* Programs Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 mb-16">
          {programs.map((program, index) => (
                    <motion.div
                      key={program.title}
                      className="group relative"
                      initial={{ opacity: 0, y: 50, rotateX: -15 }}
                      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                      transition={{ duration: 0.6, delay: 0.6 + index * 0.1, type: "spring", stiffness: 100 }}
                    >
                      <motion.div
                        className={`relative bg-gradient-to-br ${program.bgColor} p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all overflow-hidden`}
                        whileHover={{ 
                          y: -15, 
                          scale: 1.03,
                          rotateX: 5,
                          transition: { duration: 0.3 }
                        }}
                        transition={{ duration: 0.3 }}
                      >
                {/* Background Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
                
                        {/* Icon */}
                        <motion.div
                          className={`relative w-16 h-16 bg-gradient-to-br ${program.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}
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
                          <program.icon className="w-8 h-8 text-white" />
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

                        {/* Content */}
                        <motion.h3 
                          className="text-xl font-bold text-gray-800 mb-3 leading-tight"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 0.8 + index * 0.1 }}
                        >
                          {program.title}
                        </motion.h3>
                        <motion.p 
                          className="text-gray-600 text-sm leading-relaxed"
                          initial={{ opacity: 0, y: 20 }}
                          animate={isInView ? { opacity: 1, y: 0 } : {}}
                          transition={{ delay: 1.0 + index * 0.1 }}
                        >
                          {program.description}
                        </motion.p>

                        {/* Floating Sparkle */}
                        <motion.div
                          className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100"
                          animate={{
                            y: [0, -10, 0],
                            rotate: [0, 180, 360],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          ✨
                        </motion.div>

                        {/* Animated border */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100"
                          animate={{
                            background: [
                              "linear-gradient(45deg, rgba(229, 62, 62, 0.2), rgba(197, 48, 48, 0.2))",
                              "linear-gradient(225deg, rgba(197, 48, 48, 0.2), rgba(229, 62, 62, 0.2))",
                              "linear-gradient(45deg, rgba(229, 62, 62, 0.2), rgba(197, 48, 48, 0.2))"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Info Card */}
        <motion.div
          className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="text-center">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-6"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-10 h-10 text-white" fill="currentColor" />
            </motion.div>
            
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Une Approche Holistique et Bienveillante
            </h3>
            
                    <AnimatedText 
                      text="Nos programmes s'appuient sur une équipe pluridisciplinaire d'éducateurs spécialisés, d'orthophonistes, de psychomotriciens et de thérapeutes. Chaque activité est pensée pour créer un environnement où votre enfant peut grandir en confiance et révéler tout son potentiel."
                      className="text-lg text-gray-600 leading-relaxed"
                    />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

