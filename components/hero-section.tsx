"use client";

import { motion, useInView } from "framer-motion";
import { Heart, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  // Word-by-word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const AnimatedText = ({
    text,
    className,
  }: {
    text: string;
    className: string;
  }) => {
    const words = text.split(" ");
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
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  };

  return (
    <section
      ref={ref}
      id="home"
      className="relative h-screen overflow-hidden"
    >
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/home-page-1.jpg"
          alt="Children learning at Grand Cœur"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Cloud Border Top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-white">
        <div className="absolute -top-4 left-0 right-0 h-8 bg-white rounded-b-full"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-full">
            {/* Organic White Text Container - Left Positioned */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -100, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              {/* Organic Shape Background */}
              <motion.div
                className="relative bg-white/70 backdrop-blur-sm p-8 md:p-12 max-w-2xl shadow-2xl"
                style={{
                  clipPath: "polygon(0% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                  borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%"
                }}
                animate={{
                  borderRadius: [
                    "60% 40% 70% 30% / 40% 60% 30% 70%",
                    "40% 60% 30% 70% / 60% 40% 70% 30%",
                    "70% 30% 60% 40% / 30% 70% 40% 60%",
                    "60% 40% 70% 30% / 40% 60% 30% 70%"
                  ]
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Floating particles inside the container */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-red-300/30 rounded-full"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${30 + i * 10}%`,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [1, 1.5, 1],
                      }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>

                {/* Content */}
                <div className="relative z-10 text-center space-y-4">
                  {/* Small tag */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-gray-500 text-sm font-medium">École spécialisée</span>
                  </motion.div>

                  {/* Main Text Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <span className="text-gray-600 text-lg md:text-xl">Nous aidons à</span>
                  </motion.div>

                  <motion.h1
                    className="text-4xl md:text-6xl lg:text-7xl font-bold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.6, type: "spring", stiffness: 100 }}
                  >
                    <motion.span
                      className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
                      initial={{ backgroundPosition: "0% 50%" }}
                      animate={isInView ? { backgroundPosition: "100% 50%" } : {}}
                      transition={{ duration: 2, delay: 1 }}
                    >
                      Grand Cœur
                    </motion.span>
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <span className="text-gray-600 text-lg md:text-xl">Vos enfants</span>
                  </motion.div>

                  <motion.div
                    className="pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.0 }}
                  >
                    <AnimatedText
                      text="Une école où chaque enfant brille à sa manière"
                      className="text-gray-700 text-lg md:text-xl leading-relaxed"
                    />
                  </motion.div>

                  <motion.div
                    className="pt-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    <AnimatedText
                      text="Un lieu d'amour, d'apprentissage et de confiance"
                      className="text-gray-600 text-base md:text-lg"
                    />
                  </motion.div>

                  {/* CTA Button */}
                  <motion.div
                    className="pt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.4 }}
                  >
                    <motion.a
                      href="#about"
                      onClick={(e) => handleSmoothScroll(e, "about")}
                      className="inline-block px-8 py-4 bg-gradient-to-r from-red-500 to-red-700 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Découvrir notre mission
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>

              {/* Organic glow effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-200/20 to-red-300/20 blur-2xl -z-10"
                style={{
                  clipPath: "polygon(0% 0%, 85% 0%, 100% 15%, 100% 85%, 85% 100%, 15% 100%, 0% 85%, 0% 15%)",
                  borderRadius: "60% 40% 70% 30% / 40% 60% 30% 70%"
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          </div>
        </div>
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
