"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Quote, Star, Check } from "lucide-react"
import Image from "next/image"

export function TestimonialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const testimonials = [
    {
      name: "Nawal Fathi",
      role: "Parent d'élève",
      child: "Maman de Youssef, 9 ans",
      date: "Il y a 2 mois",
      text: "Depuis que mon fils a rejoint Grand Cœur, j'ai vu un vrai changement. Il est plus calme, plus heureux et il adore participer aux activités. L'équipe est toujours souriante et très à l'écoute. Merci du fond du cœur !",
      rating: 5,
      verified: true,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Fatima Ben Ali",
      role: "Parent d'élève",
      child: "Maman de Lina, 7 ans",
      date: "Il y a 3 mois",
      text: "Je recommande Grand Cœur à tous les parents qui cherchent une école où leurs enfants sont compris et respectés. Ma fille s'y sent en sécurité et aimée. Chaque progrès est une petite victoire partagée avec toute l'équipe.",
      rating: 5,
      verified: true,
      avatar: "/placeholder-user.jpg",
    },
    {
      name: "Soad Fikri",
      role: "Parent d'élève",
      child: "Maman d'Omar, 8 ans",
      date: "Il y a 1 mois",
      text: "Ce qui m'a le plus touchée, c'est la patience et la douceur des enseignants. Mon enfant a retrouvé confiance en lui grâce à leur accompagnement. On sent vraiment que tout est fait avec amour.",
      rating: 5,
      verified: true,
      avatar: "/placeholder-user.jpg",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-rose-50 via-orange-50 to-yellow-50 relative overflow-hidden" ref={ref}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-red-200/40 to-orange-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-200/40 to-rose-200/40 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut" as const,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header with Vector Strokes */}
        <motion.div
          className="text-center mb-16 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Top Vector Stroke */}
          <motion.svg
            className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-16 hidden md:block"
            viewBox="0 0 300 60"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.3 }}
          >
            <motion.path
              d="M 20,30 Q 80,10 150,30 T 280,30"
              stroke="url(#testimonialGradient1)"
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 20,30 Q 80,10 150,30 T 280,30",
                  "M 20,30 Q 80,45 150,30 T 280,30",
                  "M 20,30 Q 80,10 150,30 T 280,30"
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
            />
            <defs>
              <linearGradient id="testimonialGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </motion.svg>

          {/* Floating Hearts */}
          <motion.div
            className="absolute -top-8 left-1/4 text-3xl"
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
          >
            💝
          </motion.div>
          <motion.div
            className="absolute -top-8 right-1/4 text-3xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -10, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
          >
            ❤️
          </motion.div>

          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 bg-clip-text text-transparent relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ce que disent les parents
            
            {/* Sparkles around title */}
            <motion.span
              className="absolute -top-6 -right-8 text-2xl"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
            >
              ✨
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Des témoignages authentiques qui racontent l'impact de Grand Cœur sur la vie de nos enfants et leurs familles
          </motion.p>

          {/* Trust Indicators with Better Design */}
          <motion.div
            className="flex items-center justify-center gap-8 mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-100">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="font-bold text-gray-900 text-lg">5.0</span>
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-orange-100">
              <span className="font-semibold text-gray-700">{testimonials.length} témoignages vérifiés</span>
            </div>
          </motion.div>

          {/* Bottom Vector Stroke */}
          <motion.svg
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-12 hidden md:block"
            viewBox="0 0 200 50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 2, delay: 0.5 }}
          >
            <motion.path
              d="M 10,25 Q 60,10 100,25 T 190,25"
              stroke="url(#testimonialGradient2)"
              strokeWidth="5"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 10,25 Q 60,10 100,25 T 190,25",
                  "M 10,25 Q 60,35 100,25 T 190,25",
                  "M 10,25 Q 60,10 100,25 T 190,25"
                ]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" as const }}
            />
            <defs>
              <linearGradient id="testimonialGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </motion.svg>
        </motion.div>

        {/* Testimonials Grid with Enhanced Design */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="group relative"
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + index * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{ y: -12, scale: 1.02, transition: { duration: 0.3 } }}
            >
              {/* Organic background blob */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-100 to-rose-100 opacity-50 blur-2xl rounded-[60%_40%_50%_50%/70%_30%_70%_30%]"
                animate={{
                  borderRadius: [
                    "60% 40% 50% 50% / 70% 30% 70% 30%",
                    "50% 50% 40% 60% / 30% 70% 30% 70%",
                    "60% 40% 50% 50% / 70% 30% 70% 30%"
                  ],
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" as const }}
              />

              <div className="relative bg-white/95 backdrop-blur-sm rounded-[32px] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white overflow-hidden">
                {/* Decorative corner elements */}
                <motion.div
                  className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-200/30 to-pink-200/30 rounded-full blur-2xl"
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
                />

                {/* Header with stars and date */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <motion.div 
                    className="flex gap-1 bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200"
                    whileHover={{ scale: 1.05 }}
                  >
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.8 + index * 0.15 + i * 0.1, type: "spring" }}
                      >
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      </motion.div>
                    ))}
                  </motion.div>
                  <span className="text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {testimonial.date}
                  </span>
                </div>

                {/* Large decorative quote with gradient */}
                <motion.div
                  className="relative mb-4"
                  animate={{
                    rotate: [0, 5, 0],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  <Quote className="w-12 h-12 text-transparent bg-gradient-to-br from-red-300 to-orange-300 bg-clip-text opacity-40" strokeWidth={1.5} />
                </motion.div>

                {/* Testimonial text with better typography */}
                <p className="text-gray-800 leading-relaxed mb-6 text-base font-medium relative z-10">
                  <span className="text-red-500 font-bold text-xl">"</span>
                  {testimonial.text}
                  <span className="text-red-500 font-bold text-xl">"</span>
                </p>

                {/* Vector stroke decoration */}
                <motion.svg
                  className="absolute bottom-24 right-4 w-20 h-16 opacity-20"
                  viewBox="0 0 80 60"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 1 + index * 0.2 }}
                >
                  <motion.path
                    d="M 10,30 Q 30,10 50,30 T 70,30"
                    stroke="url(#cardGradient)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <defs>
                    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ef4444" />
                    </linearGradient>
                  </defs>
                </motion.svg>

                {/* Author info with enhanced design */}
                <div className="pt-6 border-t-2 border-gradient-to-r from-orange-100 via-red-100 to-pink-100 relative z-10">
                  <div className="flex items-center gap-4">
                    {/* Avatar with organic shape */}
                    <div className="relative">
                      <motion.div
                        className="w-16 h-16 rounded-[40%_60%_50%_50%/60%_40%_60%_40%] bg-gradient-to-br from-red-200 to-orange-200 flex items-center justify-center overflow-hidden ring-4 ring-white shadow-lg"
                        animate={{
                          borderRadius: [
                            "40% 60% 50% 50% / 60% 40% 60% 40%",
                            "50% 50% 60% 40% / 40% 60% 40% 60%",
                            "40% 60% 50% 50% / 60% 40% 60% 40%"
                          ],
                        }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as const }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          width={64}
                          height={64}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                      
                      {/* Verified badge with animation */}
                      {testimonial.verified && (
                        <motion.div
                          className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center ring-3 ring-white shadow-lg"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.2 + index * 0.15, type: "spring", stiffness: 200 }}
                          whileHover={{ scale: 1.2, rotate: 360 }}
                        >
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}

                      {/* Floating heart on hover */}
                      <motion.div
                        className="absolute -top-2 -right-2 text-xl opacity-0 group-hover:opacity-100"
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 10, 0],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
                      >
                        💖
                      </motion.div>
                    </div>

                    {/* Name and role with better hierarchy */}
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-base mb-1 flex items-center gap-2">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-700 font-medium leading-tight bg-gradient-to-r from-orange-50 to-red-50 px-2 py-1 rounded-lg inline-block mb-1">
                        {testimonial.child}
                      </div>
                      <div className="text-xs text-gray-600 font-medium">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Animated border gradient */}
                <motion.div
                  className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(239, 68, 68, 0.3), rgba(236, 72, 153, 0.3))",
                    padding: "2px",
                    WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
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
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust section with enhanced design */}
        <motion.div
          className="mt-20 text-center relative"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {/* Decorative vector strokes */}
          <motion.svg
            className="absolute -top-6 left-1/4 w-32 h-12 hidden md:block"
            viewBox="0 0 150 50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.4 }}
          >
            <motion.path
              d="M 10,25 Q 50,10 90,25 T 140,25"
              stroke="url(#bottomStrokeGradient1)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 10,25 Q 50,10 90,25 T 140,25",
                  "M 10,25 Q 50,35 90,25 T 140,25",
                  "M 10,25 Q 50,10 90,25 T 140,25"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const }}
            />
            <defs>
              <linearGradient id="bottomStrokeGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.svg
            className="absolute -top-6 right-1/4 w-32 h-12 hidden md:block"
            viewBox="0 0 150 50"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.5 }}
          >
            <motion.path
              d="M 10,25 Q 50,10 90,25 T 140,25"
              stroke="url(#bottomStrokeGradient2)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M 10,25 Q 50,10 90,25 T 140,25",
                  "M 10,25 Q 50,35 90,25 T 140,25",
                  "M 10,25 Q 50,10 90,25 T 140,25"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" as const, delay: 0.5 }}
            />
            <defs>
              <linearGradient id="bottomStrokeGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.div
            className="inline-flex items-center gap-4 px-8 py-5 bg-white/90 backdrop-blur-lg rounded-[28px] border-3 border-white shadow-2xl relative overflow-hidden"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-100/50 via-red-100/50 to-pink-100/50 opacity-60"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            />

            {/* Check icon with animation */}
            <motion.div
              className="relative w-14 h-14 bg-gradient-to-br from-red-500 to-orange-500 rounded-[40%_60%_50%_50%/60%_40%_60%_40%] flex items-center justify-center shadow-xl z-10"
              animate={{
                borderRadius: [
                  "40% 60% 50% 50% / 60% 40% 60% 40%",
                  "50% 50% 60% 40% / 40% 60% 40% 60%",
                  "40% 60% 50% 50% / 60% 40% 60% 40%"
                ],
                rotate: [0, 360],
              }}
              transition={{ 
                borderRadius: { duration: 8, repeat: Infinity, ease: "easeInOut" as const },
                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              }}
            >
              <Check className="w-7 h-7 text-white" strokeWidth={3.5} />
              
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border-3 border-orange-300"
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut" as const,
                }}
              />
            </motion.div>

            {/* Text content */}
            <div className="text-left relative z-10">
              <div className="text-base font-bold text-gray-900 mb-1 flex items-center gap-2">
                Tous les témoignages sont vérifiés
                <motion.span
                  className="text-xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0],
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
                >
                  ✓
                </motion.span>
              </div>
              <div className="text-sm text-gray-700 font-medium">
                Partagés avec amour par de vraies familles de Grand Cœur
              </div>
            </div>

            {/* Decorative sparkle */}
            <motion.div
              className="absolute top-2 right-2 text-2xl z-10"
              animate={{
                rotate: [0, 180, 360],
                scale: [1, 1.3, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" as const }}
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Bottom floating hearts */}
          <div className="flex justify-center gap-8 mt-8">
            {['💕', '💝', '❤️', '💖'].map((emoji, i) => (
              <motion.div
                key={i}
                className="text-3xl"
                animate={{
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut" as const,
                  delay: i * 0.2,
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

