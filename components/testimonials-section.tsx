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
    <section id="testimonials" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Ce que disent les parents
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Témoignages authentiques de familles accompagnées par Grand Cœur
          </motion.p>

          {/* Trust Indicators */}
          <motion.div
            className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-600"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="font-semibold">5.0</span>
            </div>
            <div className="h-4 w-px bg-gray-300" />
            <span>{testimonials.length} témoignages vérifiés</span>
          </motion.div>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              {/* Header with stars and date */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{testimonial.date}</span>
              </div>

              {/* Quote icon */}
              <Quote className="w-8 h-8 text-red-200 mb-4" />

              {/* Testimonial text */}
              <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">
                "{testimonial.text}"
              </p>

              {/* Author info */}
              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-100 to-orange-100 flex items-center justify-center overflow-hidden ring-2 ring-white shadow-md">
                      <Image
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    {/* Verified badge */}
                    {testimonial.verified && (
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center ring-2 ring-white">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Name and role */}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-600 leading-tight mt-0.5">
                      {testimonial.child}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom trust section */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-full border border-red-100">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-md">
              <Check className="w-5 h-5 text-white" strokeWidth={3} />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-gray-900">
                Tous les témoignages sont vérifiés
              </div>
              <div className="text-xs text-gray-600">
                Partagés par de vraies familles de notre école
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

