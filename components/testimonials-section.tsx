"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

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
      rotateZ: -3
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

  const testimonials = [
    {
      name: "Mme Nawal Fathi",
      role: "Maman de Youssef, 9 ans",
      text: "Depuis que mon fils a rejoint Grand Cœur, j'ai vu un vrai changement. Il est plus calme, plus heureux et il adore participer aux activités. L'équipe est toujours souriante et très à l'écoute. Merci du fond du cœur !",
      icon: "💝",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Mme Fatima Ben Ali",
      role: "Maman de Lina, 7 ans",
      text: "Je recommande Grand Cœur à tous les parents qui cherchent une école où leurs enfants sont compris et respectés. Ma fille s'y sent en sécurité et aimée. Chaque progrès est une petite victoire partagée avec toute l'équipe.",
      icon: "🌟",
      color: "from-red-500 to-red-600",
    },
    {
      name: "Mme Soad Fikri",
      role: "Maman d'Omar, 8 ans",
      text: "Ce qui m'a le plus touchée, c'est la patience et la douceur des enseignants. Mon enfant a retrouvé confiance en lui grâce à leur accompagnement. On sent vraiment que tout est fait avec amour.",
      icon: "🏠",
      color: "from-red-500 to-red-600",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Floating Hearts and Stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              opacity: [0.05, 0.15, 0.05],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          >
            {i % 2 === 0 ? '♥' : '⭐'}
          </motion.div>
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
            Témoignages des Parents
          </motion.h2>

          <AnimatedText 
            text="Des mots du cœur qui témoignent de la transformation et du bonheur de nos familles"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          />
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto relative">
          <div className="relative min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="absolute inset-0"
                initial={{ opacity: 0, x: 100, rotateY: 45, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, rotateY: -45, scale: 0.8 }}
                transition={{ duration: 0.8, ease: "easeInOut", type: "spring", stiffness: 100 }}
              >
                <div className="bg-gradient-to-br from-white to-red-50/30 rounded-3xl p-10 md:p-12 shadow-2xl relative overflow-hidden">
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${testimonials[currentIndex].color} opacity-5 rounded-full blur-3xl`} />
                  
                  {/* Quote Icon */}
                  <motion.div
                    className="absolute top-8 right-8"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    <Quote className="w-16 h-16 text-red-200" />
                    {/* Pulsing ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-red-200"
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

                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-6"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 100 }}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.6 }
                    }}
                  >
                    {testimonials[currentIndex].icon}
                  </motion.div>

                  {/* Testimonial Text */}
                  <motion.div
                    className="text-xl md:text-2xl text-gray-700 leading-relaxed italic mb-8 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <AnimatedText 
                      text={`"${testimonials[currentIndex].text}"`}
                      className=""
                    />
                  </motion.div>

                  {/* Author Info */}
                  <motion.div
                    className="border-t border-red-200 pt-6 relative z-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${testimonials[currentIndex].color} rounded-full flex items-center justify-center shadow-lg`}>
                        <Star className="w-6 h-6 text-white" fill="currentColor" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-800">
                          {testimonials[currentIndex].name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonials[currentIndex].role}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <motion.button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          <motion.button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center text-red-600 hover:bg-red-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setCurrentIndex(index)
                  setIsAutoPlaying(false)
                }}
                className={`rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-gradient-to-r from-red-500 to-red-700'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

