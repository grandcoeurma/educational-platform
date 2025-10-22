"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Menu, X } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      // Check which section is currently in view
      const sections = ["home", "about", "vision", "daily-life", "programs", "testimonials", "contact"]
      const scrollPosition = window.scrollY + 150 // Increased offset for better detection
      
      let currentSection = "home" // Default fallback
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop } = element
          if (scrollPosition >= offsetTop) {
            currentSection = section
            break
          }
        }
      }
      
      setActiveSection(currentSection)
    }
    
    // Initial call to set the correct section on page load
    handleScroll()
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen) {
        const target = event.target as HTMLElement
        const nav = document.querySelector('nav')
        if (nav && !nav.contains(target)) {
          setIsMobileMenuOpen(false)
        }
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside as any)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside as any)
    }
  }, [isMobileMenuOpen])

  const navLinks = [
    { href: "#home", label: "Accueil", id: "home" },
    { href: "#about", label: "Qui sommes-nous", id: "about" },
    { href: "#vision", label: "Vision & Mission", id: "vision" },
    { href: "#daily-life", label: "La Vie à Grand Cœur", id: "daily-life" },
    { href: "#programs", label: "Programmes", id: "programs" },
    { href: "#testimonials", label: "Témoignages", id: "testimonials" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    e.stopPropagation()
    
    // Close mobile menu immediately
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
    
    // Small delay to allow menu to close, then scroll
    setTimeout(() => {
      const element = document.getElementById(targetId)
      if (element) {
        const offsetTop = element.offsetTop - 64 // Account for fixed navbar height (h-14/h-16)
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? "bg-[#FFE8E8]/98 backdrop-blur-lg shadow-[0_4px_20px_rgba(229,62,62,0.08)]" 
          : "bg-[#FFE8E8]/95 backdrop-blur-md"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      style={{
        borderBottom: '1px solid rgba(229, 62, 62, 0.06)'
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-16">
          {/* Logo - Sharp & Elegant with Smooth Entrance */}
          <motion.a
            href="#home"
            className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0 relative"
            onClick={(e) => handleSmoothScroll(e, "home")}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ 
              duration: 1, 
              delay: 0.2,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {/* Logo glow effect on hover */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle, rgba(229,62,62,0.12) 0%, transparent 70%)',
                filter: 'blur(15px)',
                zIndex: -1
              }}
            />
            
            <motion.div 
              className="relative w-12 h-12 md:w-16 md:h-16"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 1.2, 
                delay: 0.3,
                type: "spring",
                stiffness: 100,
                damping: 12
              }}
            >
              <Image
                src="/logo.png"
                alt="Grand Cœur Logo"
                width={64}
                height={64}
                className="object-contain group-hover:scale-110 transition-transform duration-500 drop-shadow-[0_2px_8px_rgba(229,62,62,0.15)]"
                style={{ 
                  mixBlendMode: 'multiply',
                  filter: 'contrast(1.1) saturate(1.05)',
                  imageRendering: 'crisp-edges'
                }}
                priority
              />
            </motion.div>
            
            <div className="hidden sm:block">
              <motion.span 
                className={`text-sm md:text-base font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent ${
                  !isScrolled && "drop-shadow-[0_2px_4px_rgba(229,62,62,0.2)]"
                }`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  letterSpacing: '-0.02em',
                  fontWeight: 700
                }}
              >
                Grand Cœur
              </motion.span>
              <motion.p 
                className="text-[10px] text-gray-600 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                L'école qui croit en chaque talent
              </motion.p>
            </div>
            
            {/* Mobile logo text */}
            <div className="sm:hidden">
              <motion.span 
                className="text-sm font-bold bg-gradient-to-r from-red-600 via-red-700 to-red-800 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  letterSpacing: '-0.02em',
                  fontWeight: 700
                }}
              >
                Grand Cœur
              </motion.span>
            </div>
          </motion.a>

          {/* Desktop Navigation - Vector-style Animated */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.href}
                className="relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.6 + index * 0.08,
                  ease: [0.6, -0.05, 0.01, 0.99]
                }}
              >
                <motion.a
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`text-xs xl:text-sm font-medium transition-all relative whitespace-nowrap block ${
                    activeSection === link.id
                      ? "text-red-600 font-semibold"
                      : "text-gray-700 hover:text-red-600"
                  }`}
                  whileHover={{ 
                    scale: 1.05,
                    y: -2
                  }}
                  transition={{ duration: 0.2 }}
                  style={{
                    letterSpacing: '0.01em'
                  }}
                >
                  {/* Text with draw-in effect */}
                  <motion.span
                    className="relative inline-block"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.6 + index * 0.08
                    }}
                  >
                    {link.label}
                    
                    {/* Hover underline draw effect */}
                    <motion.span
                      className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 via-red-600 to-red-700 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </motion.span>
                </motion.a>
                
                {/* Active indicator with draw-in effect */}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-500 via-red-600 to-red-700 rounded-full"
                    layoutId="activeIndicator"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ 
                      duration: 0.4,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }}
                    style={{
                      boxShadow: '0 2px 8px rgba(229, 62, 62, 0.3)'
                    }}
                  />
                )}
              </motion.div>
            ))}
            
            {/* CTA Button with elegant animation */}
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="relative px-4 xl:px-6 py-2 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-full font-medium text-xs xl:text-sm whitespace-nowrap overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.6 + navLinks.length * 0.08,
                ease: [0.6, -0.05, 0.01, 0.99]
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 24px rgba(229, 62, 62, 0.35)'
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                boxShadow: '0 4px 16px rgba(229, 62, 62, 0.25)'
              }}
            >
              {/* Shimmer effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 0.6 }}
              />
              <span className="relative z-10">Contactez-nous</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button - Elegant & Warm */}
          <motion.button
            className="lg:hidden p-2 rounded-xl bg-gradient-to-br from-red-50 to-red-100/80 z-50 relative flex-shrink-0 border border-red-100/50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 4px 12px rgba(229, 62, 62, 0.15)'
            }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            type="button"
            aria-label="Toggle mobile menu"
          >
            <motion.div
              initial={false}
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              ) : (
                <Menu className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu - Warm & Elegant */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-[#FFE8E8]/98 backdrop-blur-xl shadow-[0_8px_32px_rgba(229,62,62,0.12)] border-t border-red-100/50 absolute top-full left-0 right-0 z-40"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.div 
              className="container mx-auto px-4 py-6 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`block py-3 px-4 rounded-xl transition-all relative overflow-hidden ${
                    activeSection === link.id
                      ? "bg-gradient-to-r from-red-50 to-red-100/80 text-red-600 font-semibold shadow-sm"
                      : "text-gray-700 hover:bg-red-50/50"
                  }`}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ 
                    delay: index * 0.08,
                    duration: 0.4,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Slide-in indicator for active item */}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-red-700 rounded-r"
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </motion.a>
              ))}
              
              {/* Mobile CTA Button */}
              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="block py-3 px-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white rounded-xl text-center font-medium relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: navLinks.length * 0.08,
                  duration: 0.4
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  boxShadow: '0 4px 16px rgba(229, 62, 62, 0.3)'
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                />
                <span className="relative z-10">Contactez-nous</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

