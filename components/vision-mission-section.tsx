"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Rocket, Heart, Users } from "lucide-react"

export function VisionMissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Word-by-word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.3
      }
    }
  }

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      rotateZ: -5
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateZ: 0,
      transition: {
        duration: 0.4,
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

  return (
    <section id="vision" className="py-20 bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-red-300 to-red-400 blur-2xl"
            style={{
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                  {/* Vision Card */}
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, x: -50, rotateY: -15 }}
                    animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      rotateY: 5,
                      transition: { duration: 0.3 }
                    }}
                  >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-3xl flex items-center justify-center mb-6 shadow-lg relative"
                        whileHover={{ 
                          rotate: 360, 
                          scale: 1.1,
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
                        <Target className="w-10 h-10 text-white" />
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl border-2 border-red-300"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>

              <h3 className="text-3xl font-bold mb-6 text-gray-800">Notre Vision</h3>
              
                      <div className="space-y-4">
                        <AnimatedText 
                          text="Offrir à chaque enfant porteur d'autisme ou de trisomie 21 un environnement où il peut s'épanouir, apprendre et être pleinement reconnu pour son unicité."
                          className="text-lg text-gray-700 leading-relaxed"
                        />

                        <AnimatedText 
                          text="Chez Grand Cœur, nous rêvons d'une société inclusive où la différence devient une richesse et non un obstacle."
                          className="text-lg text-gray-600 leading-relaxed"
                        />
                      </div>

              {/* Decorative Hearts */}
              <div className="absolute top-4 right-4 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      y: [0, -10, 0],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    className="text-red-300 text-2xl"
                  >
                    ♥
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

                  {/* Mission Card */}
                  <motion.div
                    className="bg-white/80 backdrop-blur-sm rounded-3xl p-10 shadow-2xl relative overflow-hidden group"
                    initial={{ opacity: 0, x: 50, rotateY: 15 }}
                    animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      y: -10, 
                      scale: 1.02,
                      rotateY: -5,
                      transition: { duration: 0.3 }
                    }}
                  >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            {/* Content */}
            <div className="relative z-10">
                      {/* Icon */}
                      <motion.div
                        className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl flex items-center justify-center mb-6 shadow-lg relative"
                        whileHover={{ 
                          rotate: 360, 
                          scale: 1.1,
                          transition: { duration: 0.6 }
                        }}
                        animate={{
                          boxShadow: [
                            "0 10px 30px rgba(197, 48, 48, 0.3)",
                            "0 20px 40px rgba(197, 48, 48, 0.5)",
                            "0 10px 30px rgba(197, 48, 48, 0.3)"
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
                        <Rocket className="w-10 h-10 text-white" />
                        {/* Pulsing ring */}
                        <motion.div
                          className="absolute inset-0 rounded-3xl border-2 border-red-400"
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 0, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                      </motion.div>

              <h3 className="text-3xl font-bold mb-6 text-gray-800">Notre Mission</h3>
              
                      <div className="space-y-4">
                        <AnimatedText 
                          text="Accompagner chaque enfant dans son développement global à travers une approche éducative personnalisée, bienveillante et fondée sur l'inclusion."
                          className="text-lg text-gray-700 leading-relaxed"
                        />

                        <AnimatedText 
                          text="Notre mission est de faire de Grand Cœur une référence nationale en matière d'éducation spécialisée, alliant excellence pédagogique, accompagnement humain et innovation dans les pratiques éducatives."
                          className="text-lg text-gray-600 leading-relaxed"
                        />
                      </div>

              {/* Decorative Stars */}
              <div className="absolute top-4 right-4 flex gap-2">
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: i * 0.4,
                    }}
                    className="text-red-300 text-2xl"
                  >
                    ⭐
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          className="mt-20 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[
            { icon: Heart, value: "100%", label: "Engagement et passion" },
            { icon: Users, value: "50+", label: "Familles accompagnées" },
            { icon: Target, value: "24/7", label: "Soutien aux familles" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-700 rounded-full flex items-center justify-center mx-auto mb-4"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-8 h-8 text-white" />
              </motion.div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

