"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Heart, Users, BookOpen, Smile } from "lucide-react"

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
    <section id="about" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-300 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-red-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
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
            Qui sommes-nous ?
          </motion.h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/diverse-children-with-disabilities-playing-and-lea.jpg"
                alt="Enfants heureux à Grand Cœur"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-gradient-to-r from-red-500 to-red-700 text-white px-8 py-4 rounded-full shadow-xl"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold">10+</div>
                <div className="text-sm">Ans d'expérience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
                <motion.div
                  className="prose prose-lg max-w-none"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <div className="text-xl text-gray-700 leading-relaxed mb-6">
                    <AnimatedText 
                      text="Grand Cœur est un centre spécialisé dédié aux enfants porteurs de troubles du spectre autistique (TSA) et de trisomie 21."
                      className=""
                    />
                  </div>
                  <AnimatedText 
                    text="Fondé avec amour et passion, notre mission est d'offrir à chaque enfant un cadre éducatif adapté, bienveillant et stimulant, répondant à ses besoins spécifiques."
                    className="text-lg text-gray-600 leading-relaxed"
                  />
                </motion.div>
          </motion.div>
        </div>

                {/* Features Grid */}
                <motion.div
                  className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  {features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      className="bg-gradient-to-br from-red-50 to-red-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all group relative overflow-hidden"
                      initial={{ opacity: 0, y: 30, rotateY: -15 }}
                      animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      whileHover={{ 
                        y: -10, 
                        scale: 1.02,
                        rotateY: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Animated background glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileHover={{ scale: 1.1, opacity: 1 }}
                      />
                      
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform relative z-10"
                        whileHover={{ 
                          rotate: 360,
                          scale: 1.2,
                          transition: { duration: 0.6 }
                        }}
                        animate={{
                          boxShadow: [
                            "0 0 0 0 rgba(229, 62, 62, 0.4)",
                            "0 0 0 10px rgba(229, 62, 62, 0)",
                            "0 0 0 0 rgba(229, 62, 62, 0)"
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
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      <motion.h3 
                        className="text-xl font-bold text-gray-800 mb-3 relative z-10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.4 + index * 0.1 }}
                      >
                        {feature.title}
                      </motion.h3>
                      
                      <motion.p 
                        className="text-gray-600 relative z-10"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 1.6 + index * 0.1 }}
                      >
                        {feature.description}
                      </motion.p>

                      {/* Floating particles */}
                      <motion.div
                        className="absolute top-2 right-2 text-red-300 text-lg opacity-0 group-hover:opacity-100"
                        animate={{
                          y: [0, -5, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        ✨
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
      </div>
    </section>
  )
}

