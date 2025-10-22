"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

// Carousel slides data
const slides = [
  {
    id: 1,
    image: "/home-page-1.jpg",
    alt: "Children learning at Grand Cœur",
    badge: "École spécialisée",
    title: "Grand Cœur",
    cards: [
      {
        icon: "star",
        text: "Une école où chaque enfant brille à sa manière"
      },
      {
        icon: "heart",
        text: "L'école spécialisée qui croit en chaque talent"
      }
    ]
  },
  {
    id: 2,
    image: "/home-page-2.jpg",
    alt: "Un lieu d'amour et d'apprentissage",
    badge: "Notre Mission",
    title: "Grand Cœur",
    cards: [
      {
        icon: "heart",
        text: "Un lieu d'amour, d'apprentissage et de confiance"
      }
    ]
  },
  {
    id: 3,
    image: "/home-page-3.jpg",
    alt: "Programmes spécialisés",
    badge: "Programmes Adaptés",
    title: "Grand Cœur",
    cards: [
      {
        icon: "star",
        text: "Programmes adaptés pour les enfants atteints d'autisme et de trisomie 21"
      }
    ]
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 64; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Carousel Background Images */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].alt}
            fill
            className="object-cover"
            priority={currentSlide === 0}
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/20" />
        </motion.div>
      </AnimatePresence>

      {/* Cloud Border Top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-white">
        <div className="absolute -top-4 left-0 right-0 h-8 bg-white rounded-b-full"></div>
      </div>

      {/* Content Container with AnimatePresence for slide transitions */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentSlide}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative max-w-3xl w-full"
              >
                {/* Content - Modern, Sleek Redesign */}
                <div className="relative z-10 space-y-6 md:space-y-8">
                  {/* Elegant Badge */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
                    className="inline-block"
                  >
                    <div className="relative group">
                      <motion.div
                        className="px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 rounded-full border border-red-200/50 shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                          >
                            <Sparkles className="w-4 h-4 text-red-500" />
                          </motion.div>
                          <span className="text-sm md:text-base font-semibold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                            {slides[currentSlide].badge}
                          </span>
                        </div>
                      </motion.div>
                      {/* Glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-red-400/20 rounded-full blur-xl -z-10"
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  {/* Modern Title Layout */}
                  <div className="space-y-3">
                    {/* Main Hero Title - Grand Cœur */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 1, 
                        delay: 0.4, 
                        type: "spring",
                        stiffness: 80,
                        damping: 15
                      }}
                      className="relative"
                    >
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none">
                        <motion.span
                          className="inline-block bg-gradient-to-br from-red-600 via-red-700 to-red-900 bg-clip-text text-transparent"
                          style={{
                            textShadow: '0 0 40px rgba(220, 38, 38, 0.3)',
                            letterSpacing: '-0.03em'
                          }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.3 }}
                        >
                          {slides[currentSlide].title}
                        </motion.span>
                      </h1>
                      {/* Decorative underline */}
                      <motion.div
                        className="h-1.5 bg-gradient-to-r from-red-500 via-red-600 to-transparent rounded-full mt-2"
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                      />
                    </motion.div>
                  </div>

                  {/* Elegant Divider */}
                  <motion.div
                    className="flex items-center gap-3 py-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <motion.div
                      className="w-12 h-[2px] bg-gradient-to-r from-transparent via-red-400 to-red-600 rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    />
                    <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                    <motion.div
                      className="w-12 h-[2px] bg-gradient-to-r from-red-600 via-red-400 to-transparent rounded-full"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                    />
                  </motion.div>

                  {/* Feature Messages - Modern Cards */}
                  <div className="space-y-4 pt-2">
                    {slides[currentSlide].cards.map((card, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 1.0 + index * 0.2 }}
                        className="relative group"
                      >
                        <div className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-red-100/50 shadow-sm hover:shadow-md transition-all">
                          {card.icon === "star" ? (
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                              <Star className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0 mt-0.5" />
                            </motion.div>
                          ) : (
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Heart className="w-5 h-5 text-red-500 fill-red-500 flex-shrink-0 mt-0.5" />
                            </motion.div>
                          )}
                          <p className="text-base md:text-lg lg:text-xl font-medium text-gray-800 leading-relaxed">
                            {card.text}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button - Premium Design */}
                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    <motion.a
                      href="#about"
                      onClick={(e) => handleSmoothScroll(e, "about")}
                      className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white text-base md:text-lg font-bold rounded-full shadow-[0_8px_30px_rgba(220,38,38,0.4)] overflow-hidden"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 12px 40px rgba(220, 38, 38, 0.5)"
                      }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Shimmer effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                        initial={{ x: "-200%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 0.8 }}
                      />
                      <span className="relative z-10">Découvrir notre mission</span>
                      <motion.svg
                        className="relative z-10 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </motion.svg>
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Carousel Navigation Controls */}
      <div className="absolute bottom-20 md:bottom-24 left-1/2 transform -translate-x-1/2 z-30 flex items-center gap-4">
        {/* Previous Button */}
        <motion.button
          onClick={goToPrevious}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </motion.button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all rounded-full ${
                currentSlide === index
                  ? "w-8 h-2 bg-white"
                  : "w-2 h-2 bg-white/50 hover:bg-white/75"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          onClick={goToNext}
          className="p-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30 hover:bg-white/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white"
        >
          <svg
            className="w-6 h-6 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
