"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import Image from "next/image"
import { Target, Rocket, Heart, Users, Sparkles, Star, Zap } from "lucide-react"

export function VisionMissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isVisionHovered, setIsVisionHovered] = useState(false)
  const [isMissionHovered, setIsMissionHovered] = useState(false)

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
    <section id="vision" className="py-16 md:py-20 bg-gradient-to-br from-[#fffaf9] via-white to-[#fff5f5] relative overflow-hidden" ref={ref}>
      {/* Organic Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-red-300/20 to-orange-300/20 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-3xl"
          animate={{
            rotate: [0, 360],
            borderRadius: [
              "60% 40% 30% 70% / 60% 30% 70% 40%",
              "30% 60% 70% 40% / 50% 60% 30% 70%",
              "60% 40% 30% 70% / 60% 30% 70% 40%"
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        <motion.div
          className="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-gradient-to-br from-rose-300/20 to-pink-300/20 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-3xl"
          animate={{
            rotate: [360, 0],
            borderRadius: [
              "40% 60% 70% 30% / 40% 50% 60% 50%",
              "60% 40% 30% 70% / 50% 60% 40% 60%",
              "40% 60% 70% 30% / 40% 50% 60% 50%"
            ],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />

        {/* Floating Particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-400/30 rounded-full"
            style={{
              left: `${15 + i * 12}%`,
              top: `${10 + i * 11}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.8, 1],
            }}
            transition={{
              duration: 5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
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
            className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Vision & Mission
          </motion.h2>
          
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 rounded-full mx-auto shadow-md"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Vision Image - Left Side */}
          <motion.div
            className="absolute top-20 w-64 h-80 hidden xl:block z-20"
            style={{ left: "-8rem" }}
            initial={{ opacity: 0, x: -100, rotate: -5 }}
            animate={
              isInView 
                ? isVisionHovered 
                  ? { opacity: 1, x: 128, rotate: 0, zIndex: 50 }
                  : { opacity: 1, x: 0, rotate: 0, zIndex: 20 }
                : {}
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            onHoverStart={() => setIsVisionHovered(true)}
            onHoverEnd={() => setIsVisionHovered(false)}
          >
            <div className="relative w-full h-full">
              {/* Organic Background Blob */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-red-300/30 to-orange-300/30 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl"
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

              {/* Image Container with Organic Mask */}
              <motion.div
                className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.05, rotate: 3 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/vision_section.jpg"
                  alt="Teacher and child learning together"
                  fill
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-orange-500/10" />
              </motion.div>

              {/* Colorful Circular Accents */}
              {[
                { color: "bg-red-400", size: "w-12 h-12", top: "-6", right: "-6" },
                { color: "bg-orange-400", size: "w-8 h-8", bottom: "10", left: "-4" },
                { color: "bg-yellow-400", size: "w-6 h-6", top: "20", left: "-3" },
              ].map((accent, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${accent.color} ${accent.size} rounded-full opacity-60 blur-sm`}
                  style={{ top: accent.top, right: accent.right, bottom: accent.bottom, left: accent.left }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.6, 0.8, 0.6],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                />
              ))}

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-gradient-to-br from-red-500 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ✨ Vision
              </motion.div>
            </div>
          </motion.div>

          {/* Mission Image - Right Side */}
          <motion.div
            className="absolute top-40 w-64 h-80 hidden xl:block z-20"
            style={{ right: "-8rem" }}
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={
              isInView 
                ? isMissionHovered 
                  ? { opacity: 1, x: -128, rotate: 0, zIndex: 50 }
                  : { opacity: 1, x: 0, rotate: 0, zIndex: 20 }
                : {}
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
            onHoverStart={() => setIsMissionHovered(true)}
            onHoverEnd={() => setIsMissionHovered(false)}
          >
            <div className="relative w-full h-full">
              {/* Organic Background Blob */}
              <motion.div
                className="absolute -inset-4 bg-gradient-to-br from-rose-300/30 to-red-300/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-2xl"
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

              {/* Image Container with Organic Mask */}
              <motion.div
                className="relative w-full h-full rounded-[40px] overflow-hidden shadow-2xl border-4 border-white"
                whileHover={{ scale: 1.05, rotate: -3 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src="/mission_section.jpg"
                  alt="Happy learning environment"
                  fill
                  className="object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-red-500/10" />
              </motion.div>

              {/* Colorful Circular Accents */}
              {[
                { color: "bg-rose-400", size: "w-10 h-10", top: "-5", left: "-5" },
                { color: "bg-red-400", size: "w-8 h-8", bottom: "15", right: "-4" },
                { color: "bg-pink-400", size: "w-6 h-6", top: "30", right: "-3" },
              ].map((accent, i) => (
                <motion.div
                  key={i}
                  className={`absolute ${accent.color} ${accent.size} rounded-full opacity-60 blur-sm`}
                  style={{ top: accent.top, right: accent.right, bottom: accent.bottom, left: accent.left }}
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.6, 0.9, 0.6],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    delay: i * 0.6,
                  }}
                />
              ))}

              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-4 -left-4 bg-gradient-to-br from-rose-500 to-red-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-bold"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              >
                🚀 Mission
              </motion.div>
            </div>
          </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto relative z-30">
          {/* Vision Card - Enhanced and Creative */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Animated Vector Strokes Around Vision Card */}
            <motion.svg
              className="absolute -top-12 -left-12 w-40 h-40 pointer-events-none"
              viewBox="0 0 160 160"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.8 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              <motion.path
                d="M 30,80 Q 70,30 80,70 T 130,90"
                stroke="url(#visionStroke1)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 30,80 Q 70,30 80,70 T 130,90",
                    "M 30,80 Q 70,50 80,70 T 130,90",
                    "M 30,80 Q 70,30 80,70 T 130,90"
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="visionStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.svg
              className="absolute -bottom-8 -right-8 w-32 h-32 pointer-events-none"
              viewBox="0 0 120 120"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.7 }}
              transition={{ duration: 2, delay: 0.8 }}
            >
              <motion.path
                d="M 20,60 Q 50,30 80,60 T 100,60"
                stroke="url(#visionStroke2)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 20,60 Q 50,30 80,60 T 100,60",
                    "M 20,60 Q 50,75 80,60 T 100,60",
                    "M 20,60 Q 50,30 80,60 T 100,60"
                  ]
                }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="visionStroke2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Floating Sparkles */}
            {[
              { top: "-10px", right: "20%", delay: 0 },
              { bottom: "15%", left: "-10px", delay: 1 },
            ].map((pos, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ ...pos }}
                animate={{
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.4, 0.9, 0.4],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pos.delay,
                }}
              >
                <Sparkles className="w-6 h-6 text-red-400" />
              </motion.div>
            ))}

            <motion.div
              className="relative bg-gradient-to-br from-white via-red-50/40 to-white backdrop-blur-sm rounded-[40px] p-10 shadow-2xl border-2 border-red-100 overflow-hidden group"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(239, 68, 68, 0.2)"
              }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              {/* Decorative Corner Blobs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-200/30 to-transparent rounded-bl-[100px]" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-orange-200/30 to-transparent rounded-tr-[80px]" />

              {/* Animated Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-red-400/10 via-transparent to-orange-400/10 rounded-[40px]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              <div className="relative z-10">
                {/* Icon Container with Enhanced Animation */}
                <motion.div
                  className="relative w-24 h-24 mb-8"
                  whileHover={{ 
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: 1.1,
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-500 via-orange-500 to-red-600 rounded-[28px]"
                    animate={{
                      borderRadius: ["28px", "35px", "28px"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-red-400 to-orange-600 rounded-[28px] blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Target className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </div>
                  
                  {/* Orbiting Stars */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: "50%",
                        left: "50%",
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.5,
                      }}
                    >
                      <motion.div
                        style={{
                          x: 50,
                          y: -5,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.3,
                        }}
                      >
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Title */}
                <motion.h3 
                  className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  Notre Vision
                </motion.h3>
                
                <div className="space-y-5">
                  <motion.div
                    className="p-5 bg-white/60 rounded-3xl border border-red-100/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.8 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(254, 242, 242, 0.9)" }}
                  >
                    <AnimatedText 
                      text="Offrir à chaque enfant porteur d'autisme ou de trisomie 21 un environnement où il peut s'épanouir, apprendre et être pleinement reconnu pour son unicité."
                      className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed"
                    />
                  </motion.div>

                  <motion.div
                    className="p-5 bg-gradient-to-br from-red-50/50 to-white/60 rounded-3xl border border-red-100/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(254, 242, 242, 0.8)" }}
                  >
                    <AnimatedText 
                      text="Chez Grand Cœur, nous rêvons d'une société inclusive où la différence devient une richesse et non un obstacle."
                      className="text-base md:text-lg text-gray-700 leading-relaxed font-medium"
                    />
                  </motion.div>
                </div>

                {/* Animated Quote Mark */}
                <motion.div
                  className="absolute -top-6 -left-6 text-6xl text-red-200/40 font-serif leading-none"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  "
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mission Card - Enhanced and Creative */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            {/* Animated Vector Strokes Around Mission Card */}
            <motion.svg
              className="absolute -top-10 -right-10 w-36 h-36 pointer-events-none"
              viewBox="0 0 140 140"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.75 }}
              transition={{ duration: 2, delay: 0.7 }}
            >
              <motion.path
                d="M 20,70 Q 50,25 90,50 T 120,80"
                stroke="url(#missionStroke1)"
                strokeWidth="5"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 20,70 Q 50,25 90,50 T 120,80",
                    "M 20,70 Q 50,45 90,50 T 120,80",
                    "M 20,70 Q 50,25 90,50 T 120,80"
                  ]
                }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="missionStroke1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#f43f5e" />
                </linearGradient>
              </defs>
            </motion.svg>

            <motion.svg
              className="absolute -bottom-6 left-8 w-44 h-28 pointer-events-none"
              viewBox="0 0 180 110"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.65 }}
              transition={{ duration: 2, delay: 1 }}
            >
              <motion.path
                d="M 20,55 Q 60,25 90,55 T 160,55"
                stroke="url(#missionStroke2)"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                animate={{
                  d: [
                    "M 20,55 Q 60,25 90,55 T 160,55",
                    "M 20,55 Q 60,75 90,55 T 160,55",
                    "M 20,55 Q 60,25 90,55 T 160,55"
                  ]
                }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <defs>
                <linearGradient id="missionStroke2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#dc2626" />
                </linearGradient>
              </defs>
            </motion.svg>

            {/* Floating Elements */}
            {[
              { top: "10%", right: "-15px", delay: 0.5, Icon: Zap },
              { bottom: "20%", right: "-10px", delay: 1.5, Icon: Heart },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{ top: item.top, right: item.right, bottom: item.bottom }}
                animate={{
                  scale: [1, 1.4, 1],
                  rotate: [0, 15, -15, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: item.delay,
                }}
              >
                <item.Icon className="w-5 h-5 text-rose-400 fill-rose-400" />
              </motion.div>
            ))}

            <motion.div
              className="relative bg-gradient-to-br from-white via-rose-50/40 to-white backdrop-blur-sm rounded-[40px] p-10 shadow-2xl border-2 border-rose-100 overflow-hidden group"
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(244, 63, 94, 0.2)"
              }}
              transition={{ duration: 0.3, type: "spring" }}
            >
              {/* Decorative Corner Blobs */}
              <div className="absolute top-0 left-0 w-44 h-44 bg-gradient-to-br from-rose-200/30 to-transparent rounded-br-[110px]" />
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-red-200/30 to-transparent rounded-tl-[90px]" />

              {/* Animated Glow */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-transparent to-red-400/10 rounded-[40px]"
                animate={{
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
              
              <div className="relative z-10">
                {/* Icon Container with Rocket Taking Off Animation */}
                <motion.div
                  className="relative w-24 h-24 mb-8"
                  whileHover={{ 
                    rotate: [0, 10, -10, 5, -5, 0],
                    scale: 1.1,
                    transition: { duration: 0.6 }
                  }}
                  animate={{
                    y: [0, -300],
                    opacity: [1, 1, 1, 0.8, 0.5, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeIn",
                    repeatDelay: 2,
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-rose-500 via-red-500 to-rose-600 rounded-[28px]"
                    animate={{
                      borderRadius: ["28px", "32px", "28px"],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-rose-400 to-red-600 rounded-[28px] blur-xl opacity-50"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.3,
                    }}
                  />
                  
                  {/* Rocket with taking off animation */}
                  <motion.div 
                    className="relative w-full h-full flex items-center justify-center"
                    animate={{
                      rotate: [0, -3, 3, -2, 2, 0, -1, 1, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      repeatDelay: 2,
                    }}
                  >
                    <Rocket className="w-12 h-12 text-white" strokeWidth={2.5} />
                  </motion.div>

                  {/* Rocket Exhaust/Fire Trail */}
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full"
                    animate={{
                      opacity: [0.9, 0.8, 0.9, 0.7, 0.5, 0],
                      scaleY: [1.5, 1.8, 1.6, 1.9, 1.4, 0.5],
                      scaleX: [1, 1.1, 0.9, 1.2, 0.8, 0.5],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeIn",
                      repeatDelay: 2,
                    }}
                  >
                    <div className="w-10 h-16 bg-gradient-to-b from-orange-400 via-yellow-400 to-transparent blur-sm rounded-full" />
                  </motion.div>

                  {/* Smoke/Cloud trail */}
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute bottom-0 left-1/2 -translate-x-1/2"
                      animate={{
                        y: [0, 30 + i * 20, 80 + i * 30],
                        opacity: [0.7, 0.5, 0.3, 0.1, 0],
                        scale: [0.6, 1.2 + i * 0.2, 2 + i * 0.3],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: i * 0.8,
                        repeatDelay: 6,
                      }}
                    >
                      <div className="w-6 h-6 bg-gray-400/50 rounded-full blur-lg" />
                    </motion.div>
                  ))}

                  {/* Orbiting Hearts */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        top: "50%",
                        left: "50%",
                      }}
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 5 + i * 0.5,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.4,
                      }}
                    >
                      <motion.div
                        style={{
                          x: 50,
                          y: -5,
                        }}
                        animate={{
                          scale: [1, 1.4, 1],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          delay: i * 0.25,
                        }}
                      >
                        <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Enhanced Title */}
                <motion.h3 
                  className="text-3xl md:text-4xl font-black mb-6 bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 }}
                >
                  Notre Mission
                </motion.h3>
                
                <div className="space-y-5">
                  <motion.div
                    className="p-5 bg-white/60 rounded-3xl border border-rose-100/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 241, 242, 0.9)" }}
                  >
                    <AnimatedText 
                      text="Accompagner chaque enfant dans son développement global à travers une approche éducative personnalisée, bienveillante et fondée sur l'inclusion."
                      className="text-lg md:text-xl font-semibold text-gray-800 leading-relaxed"
                    />
                  </motion.div>

                  <motion.div
                    className="p-5 bg-gradient-to-br from-rose-50/50 to-white/60 rounded-3xl border border-rose-100/50 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 1.2 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(255, 241, 242, 0.8)" }}
                  >
                    <AnimatedText 
                      text="Notre mission est de faire de Grand Cœur une référence nationale en matière d'éducation spécialisée, alliant excellence pédagogique, accompagnement humain et innovation dans les pratiques éducatives."
                      className="text-base md:text-lg text-gray-700 leading-relaxed font-medium"
                    />
                  </motion.div>
                </div>

                {/* Animated Quote Mark */}
                <motion.div
                  className="absolute -bottom-4 -right-4 text-6xl text-rose-200/40 font-serif leading-none transform rotate-180"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  "
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  )
}

