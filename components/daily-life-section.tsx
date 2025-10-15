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

  return (
    <section id="daily-life" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-red-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Section Title with Vector Strokes */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Decorative Frame with Vector Strokes */}
          <div className="relative inline-block">
            {/* Top Vector Stroke */}
            <motion.svg
              className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-20 pointer-events-none"
              viewBox="0 0 320 80"
              initial={{ opacity: 0, y: -20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <defs>
                <linearGradient id="topStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 60 Q 80 10, 160 40 T 310 60"
                fill="none"
                stroke="url(#topStroke)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
              />
              {/* Floating sparkles along the stroke */}
              {[0.2, 0.5, 0.8].map((offset, i) => (
                <motion.circle
                  key={i}
                  cx={10 + 300 * offset}
                  cy={40}
                  r="3"
                  fill="#f97316"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? {
                    scale: [0, 1.5, 1],
                    opacity: [0, 1, 0.7],
                  } : {}}
                  transition={{
                    duration: 1,
                    delay: 0.8 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
              ))}
            </motion.svg>

            {/* Main Title with Enhanced Background */}
            <motion.div
              className="relative px-12 py-8 rounded-[40px] bg-gradient-to-br from-white via-red-50/30 to-orange-50/30 backdrop-blur-sm border-2 border-red-100 shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 50px rgba(239, 68, 68, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Organic Background Blobs */}
              <motion.div
                className="absolute -inset-2 bg-gradient-to-br from-red-200/20 via-orange-200/20 to-red-200/20 rounded-[40%_60%_50%_50%/50%_50%_60%_40%] blur-xl -z-10"
                animate={{
                  rotate: [0, 360],
                  borderRadius: [
                    "40% 60% 50% 50% / 50% 50% 60% 40%",
                    "60% 40% 60% 40% / 40% 60% 40% 60%",
                    "40% 60% 50% 50% / 50% 50% 60% 40%"
                  ],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />

              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-red-400 to-orange-400 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute -bottom-3 -right-3 w-6 h-6 bg-gradient-to-br from-orange-400 to-red-400 rounded-full opacity-60"
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [360, 180, 0],
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              <motion.h2
                className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-600 bg-clip-text text-transparent relative z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                La Vie à Grand Cœur
              </motion.h2>

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={isInView ? { width: "60%", opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.8 }}
              />
            </motion.div>

            {/* Bottom Vector Stroke */}
            <motion.svg
              className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-96 h-20 pointer-events-none"
              viewBox="0 0 384 80"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <defs>
                <linearGradient id="bottomStroke" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="50%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              <motion.path
                d="M 10 20 Q 96 50, 192 30 T 374 20"
                fill="none"
                stroke="url(#bottomStroke)"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, delay: 0.7, ease: "easeInOut" }}
              />
              {/* Animated hearts along bottom stroke */}
              {[0.25, 0.5, 0.75].map((offset, i) => (
                <motion.text
                  key={i}
                  x={10 + 364 * offset}
                  y={30}
                  fontSize="16"
                  textAnchor="middle"
                  fill="#ef4444"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={isInView ? {
                    scale: [0, 1.2, 1],
                    opacity: [0, 1, 0.8],
                    y: [30, 25, 30],
                  } : {}}
                  transition={{
                    duration: 1.5,
                    delay: 1 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 2.5,
                  }}
                >
                  ♥
                </motion.text>
              ))}
            </motion.svg>

            {/* Side decorative strokes */}
            <motion.svg
              className="absolute top-1/2 -left-20 w-16 h-32 pointer-events-none hidden lg:block"
              viewBox="0 0 64 128"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.path
                d="M 50 10 Q 20 64, 50 118"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.9 }}
              />
            </motion.svg>

            <motion.svg
              className="absolute top-1/2 -right-20 w-16 h-32 pointer-events-none hidden lg:block"
              viewBox="0 0 64 128"
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.path
                d="M 14 10 Q 44 64, 14 118"
                fill="none"
                stroke="#ef4444"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : {}}
                transition={{ duration: 1.2, delay: 0.9 }}
              />
            </motion.svg>
          </div>

          {/* Enhanced Description */}
          <motion.div
            className="mt-20 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <motion.div
              className="relative px-8 py-6 rounded-[32px] bg-gradient-to-br from-white to-red-50/40 border border-red-100 shadow-lg max-w-3xl"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 40px rgba(239, 68, 68, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              {/* Orbiting sparkles */}
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-orange-400 rounded-full"
                  style={{
                    top: "50%",
                    left: "50%",
                  }}
                  animate={{
                    x: [0, Math.cos((i * 120 * Math.PI) / 180) * 200],
                    y: [0, Math.sin((i * 120 * Math.PI) / 180) * 80],
                    scale: [1, 0.5, 1],
                    opacity: [0.7, 0.3, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: i * 0.4,
                    ease: "easeInOut",
                  }}
                />
              ))}

              <AnimatedText 
                text="Chaque journée est une nouvelle aventure d'apprentissage, de joie et de découverte."
                className="text-xl text-gray-700 font-medium"
              />
            </motion.div>
          </motion.div>
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

          {/* Playful Image Layout with Organic Shapes - Inspired by latest-pic.png */}
          <motion.div
            className="relative flex justify-center items-center min-h-[600px]"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Top-left curved abstract shape (pink wave) */}
              <motion.div
                className="absolute -top-20 -left-12 w-80 h-40 bg-gradient-to-br from-pink-200/60 to-pink-300/40 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-sm"
                initial={{ opacity: 0, x: -50, y: -30 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 1, delay: 1 }}
                whileHover={{
                  scale: 1.05,
                  rotate: 5,
                  transition: { duration: 0.4 }
                }}
              />

              {/* Main organic blob-shaped frame for the image */}
              <motion.div
                className="relative z-10 w-full"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {/* Organic blob container with morphing animation */}
                <motion.div
                  className="relative overflow-hidden shadow-2xl"
                  style={{
                    borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
                  }}
                  animate={{
                    borderRadius: [
                      "60% 40% 30% 70% / 60% 30% 70% 40%",
                      "30% 60% 70% 40% / 50% 60% 30% 70%",
                      "60% 40% 30% 70% / 60% 30% 70% 40%"
                    ],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  whileHover={{
                    scale: 1.03,
                    transition: { duration: 0.4 }
                  }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src="/la-vie.jpg"
                      alt="La vie quotidienne à Grand Cœur"
                      fill
                      className="object-cover"
                    />
                    {/* Warm light overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-transparent to-orange-200/10" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Colorful vector circles - Red-toned theme */}
              {/* Large red circle (large, left) */}
              <motion.div
                className="absolute -left-16 top-1/3 w-32 h-32 border-8 border-red-500 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{
                  scale: 1.15,
                  rotate: 15,
                  borderWidth: "12px",
                  transition: { duration: 0.3 }
                }}
              />

              {/* Large orange circle (bottom-right) */}
              <motion.div
                className="absolute -bottom-12 right-12 w-48 h-48 border-[16px] border-orange-500 rounded-full z-20"
                initial={{ opacity: 0, scale: 0, rotate: -45 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.8, delay: 1.6 }}
                whileHover={{
                  scale: 1.1,
                  rotate: -10,
                  borderColor: "#f97316",
                  transition: { duration: 0.4 }
                }}
              />

              {/* Small rose circle (left) */}
              <motion.div
                className="absolute bottom-24 -left-4 w-16 h-16 border-6 border-rose-500 rounded-full"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.8 }}
                whileHover={{
                  scale: 1.2,
                  rotate: -20,
                  y: -5,
                  transition: { duration: 0.3 }
                }}
              />

              {/* Small red-orange circle (top-right) */}
              <motion.div
                className="absolute -top-4 right-16 w-12 h-12 border-4 border-red-400 rounded-full"
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 2 }}
                whileHover={{
                  scale: 1.25,
                  rotate: 25,
                  x: 5,
                  transition: { duration: 0.3 }
                }}
              />

              {/* Small solid red circle (top-center) */}
              <motion.div
                className="absolute -top-8 left-1/2 w-8 h-8 bg-red-500 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -8, 0],
                } : {}}
                transition={{ 
                  opacity: { duration: 0.4, delay: 2.2 },
                  scale: { duration: 0.4, delay: 2.2 },
                  y: { duration: 2.5, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.4,
                  boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)",
                  transition: { duration: 0.3 }
                }}
              />

              {/* Medium solid orange circle (bottom-left area) */}
              <motion.div
                className="absolute bottom-8 left-8 w-12 h-12 bg-orange-400 rounded-full shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1,
                  rotate: [0, 360],
                } : {}}
                transition={{ 
                  opacity: { duration: 0.4, delay: 2.4 },
                  scale: { duration: 0.4, delay: 2.4 },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
                whileHover={{
                  scale: 1.3,
                  rotate: 180,
                  y: -8,
                  transition: { duration: 0.4 }
                }}
              />

              {/* Small pink-red circle (right side) */}
              <motion.div
                className="absolute top-1/4 -right-6 w-10 h-10 border-4 border-pink-500 rounded-full"
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 2.6 }}
                whileHover={{
                  scale: 1.3,
                  rotate: -30,
                  x: 10,
                  transition: { duration: 0.3 }
                }}
              />

              {/* Abstract curved shape (bottom area) */}
              <motion.div
                className="absolute -bottom-16 left-1/4 w-32 h-20 bg-gradient-to-r from-orange-200/50 to-red-200/40 rounded-[50%] blur-sm transform -rotate-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { 
                  opacity: 1, 
                  y: 0,
                  rotate: [-12, -8, -12],
                } : {}}
                transition={{ 
                  opacity: { duration: 0.6, delay: 1.5 },
                  y: { duration: 0.6, delay: 1.5 },
                  rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: -5,
                  transition: { duration: 0.4 }
                }}
              />

              {/* Playful floating badge with warm colors */}
              <motion.div
                className="absolute -top-12 -right-12 bg-white rounded-[32px] px-6 py-4 shadow-2xl border-2 border-orange-200 z-30"
                initial={{ opacity: 0, scale: 0, rotate: 180 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0,
                  y: [0, -8, 0],
                } : {}}
                transition={{ 
                  opacity: { duration: 0.6, delay: 1.8 },
                  scale: { duration: 0.6, delay: 1.8, type: "spring", stiffness: 200 },
                  rotate: { duration: 0.6, delay: 1.8 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.5 }
                }}
                whileHover={{ 
                  scale: 1.08,
                  rotate: -5,
                  y: -12,
                  transition: { duration: 0.3, y: { duration: 0.3 } }
                }}
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
                    animate={{
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <Heart className="w-6 h-6 text-white" fill="currentColor" />
                  </motion.div>
                  <div>
                    <div className="text-lg font-bold text-gray-800">Avec amour</div>
                    <div className="text-xs text-gray-600">Chaque jour</div>
                  </div>
                </div>
              </motion.div>

              {/* Additional playful dots */}
              {[
                { size: "w-4 h-4", color: "bg-rose-400", top: "15%", right: "5%", delay: 2.8 },
                { size: "w-3 h-3", color: "bg-orange-400", top: "45%", right: "-2%", delay: 3 },
                { size: "w-5 h-5", color: "bg-red-400", bottom: "20%", right: "8%", delay: 3.2 },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${dot.size} ${dot.color} rounded-full shadow-md`}
                  style={{ top: dot.top, bottom: dot.bottom, right: dot.right }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0],
                  } : {}}
                  transition={{ 
                    opacity: { duration: 0.3, delay: dot.delay },
                    scale: { duration: 0.3, delay: dot.delay },
                    y: { duration: 2 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: dot.delay }
                  }}
                  whileHover={{
                    scale: 1.5,
                    y: -15,
                    transition: { duration: 0.3, y: { duration: 0.3 } }
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
