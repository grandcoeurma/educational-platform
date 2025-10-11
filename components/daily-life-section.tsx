"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Heart, Star, Smile } from "lucide-react"

export function DailyLifeSection() {
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
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
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
    <section id="daily-life" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-red-400 rounded-full blur-3xl" />
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
            La Vie à Grand Cœur
          </motion.h2>

          <AnimatedText 
            text="Chaque journée est une nouvelle aventure d'apprentissage, de joie et de découverte."
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div
              className="prose prose-lg max-w-none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <AnimatedText 
                text="Nos enfants évoluent dans un environnement sécurisé et bienveillant où chaque progrès est célébré avec fierté."
                className="text-xl text-gray-700 leading-relaxed mb-6"
              />
            </motion.div>

            {/* Features */}
            <motion.div
              className="grid grid-cols-1 gap-6 mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              {[
                {
                  icon: Heart,
                  title: "Environnement sécurisé",
                  description: "Un cadre de confiance où chaque enfant se sent en sécurité",
                },
                {
                  icon: Star,
                  title: "Progrès célébrés",
                  description: "Chaque petite victoire est reconnue et encouragée",
                },
                {
                  icon: Smile,
                  title: "Joie quotidienne",
                  description: "Des moments de bonheur partagés chaque jour",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-red-50 to-red-100 group relative overflow-hidden"
                  initial={{ opacity: 0, x: -20, rotateY: -10 }}
                  animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ 
                    scale: 1.02,
                    rotateY: 5,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Animated background glow */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileHover={{ scale: 1.1, opacity: 1 }}
                  />
                  
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center flex-shrink-0 relative z-10"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.6 }
                    }}
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(229, 62, 62, 0.4)",
                        "0 0 0 8px rgba(229, 62, 62, 0)",
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
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-lg font-semibold text-gray-800 mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.4 + index * 0.1 }}
                    >
                      {feature.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 text-sm"
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 1.6 + index * 0.1 }}
                    >
                      {feature.description}
                    </motion.p>
                  </div>

                  {/* Floating particles */}
                  <motion.div
                    className="absolute top-2 right-2 text-red-300 text-lg opacity-0 group-hover:opacity-100"
                    animate={{
                      y: [0, -3, 0],
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
          </motion.div>

          {/* Modern Image Layout */}
          <motion.div
            className="relative flex justify-center items-center"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {/* Modern Image Container with Layered Design */}
            <div className="relative w-full max-w-lg">
              {/* Background Decorative Circle */}
              <motion.div
                className="absolute -inset-6 bg-gradient-to-br from-red-100 to-red-200 rounded-full opacity-25"
                animate={{
                  rotate: [0, -360],
                }}
                transition={{
                  duration: 25,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              
              {/* Main Image Container */}
              <motion.div
                className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-white p-3"
                whileHover={{ 
                  scale: 1.03,
                  rotateY: 3,
                  transition: { duration: 0.3 }
                }}
                initial={{ rotateY: -8 }}
                animate={{ rotateY: 0 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <Image
                    src="/who-are-we.jpg"
                    alt="La vie quotidienne à Grand Cœur"
                    fill
                    className="object-cover"
                  />
                  {/* Modern Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/25 via-transparent to-transparent" />
                  
                  {/* Floating Hearts Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute text-red-300/50 text-xl"
                        style={{
                          left: `${15 + i * 25}%`,
                          top: `${20 + i * 15}%`,
                        }}
                        animate={{
                          y: [0, -15, 0],
                          opacity: [0.4, 0.9, 0.4],
                          scale: [1, 1.3, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          delay: i * 0.7,
                          ease: "easeInOut",
                        }}
                      >
                        ♥
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Modern Floating Badge */}
              <motion.div
                className="absolute -top-8 -right-8 bg-white rounded-2xl p-5 shadow-2xl border border-red-100 z-20"
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 1.5, type: "spring", stiffness: 150 }}
                whileHover={{ 
                  scale: 1.08,
                  rotate: -3,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-700 rounded-xl flex items-center justify-center"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(229, 62, 62, 0.4)",
                        "0 0 0 10px rgba(229, 62, 62, 0)",
                        "0 0 0 0 rgba(229, 62, 62, 0)"
                      ]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Heart className="w-7 h-7 text-white" fill="currentColor" />
                  </motion.div>
                  <div>
                    <div className="text-xl font-bold text-gray-800">Avec amour</div>
                    <div className="text-sm text-gray-600">Chaque jour</div>
                  </div>
                </div>
              </motion.div>

              {/* Modern Decorative Elements */}
              <motion.div
                className="absolute -top-10 -left-10 w-24 h-24 bg-gradient-to-br from-red-300/25 to-red-500/25 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              <motion.div
                className="absolute -bottom-10 -left-6 w-20 h-20 bg-gradient-to-br from-red-400/20 to-red-600/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.6, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5,
                }}
              />

              <motion.div
                className="absolute top-1/2 -right-8 w-16 h-16 bg-gradient-to-br from-red-200/30 to-red-400/30 rounded-full blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
