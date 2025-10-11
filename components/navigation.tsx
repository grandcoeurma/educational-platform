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
        const offsetTop = element.offsetTop - 80 // Account for fixed navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        })
      }
    }, 100)
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white/95 backdrop-blur-md"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center space-x-2 md:space-x-3 group flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleSmoothScroll(e, "home")}
          >
            <div className="relative w-10 h-10 md:w-16 md:h-16">
              <Image
                src="/logo.png"
                alt="Grand Cœur Logo"
                width={64}
                height={64}
                className="object-contain group-hover:scale-110 transition-transform"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="hidden sm:block">
              <span className={`text-lg md:text-2xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent ${
                !isScrolled && "drop-shadow-md"
              }`}>
                Grand Cœur
              </span>
              <p className="text-xs text-gray-600 hidden md:block">L'école qui croit en chaque talent</p>
            </div>
            {/* Mobile logo text */}
            <div className="sm:hidden">
              <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
                Grand Cœur
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.id)}
                className={`text-xs xl:text-sm font-medium transition-all relative whitespace-nowrap ${
                  activeSection === link.id
                    ? "text-red-600 font-semibold"
                    : isScrolled 
                      ? "text-gray-700 hover:text-red-600" 
                      : "text-gray-800 hover:text-red-600"
                }`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                {link.label}
                {/* Active indicator */}
                {activeSection === link.id && (
                  <motion.div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
                    layoutId="activeIndicator"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={(e) => handleSmoothScroll(e, "contact")}
              className="px-4 xl:px-6 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all text-xs xl:text-sm whitespace-nowrap"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contactez-nous
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg bg-red-100 z-50 relative flex-shrink-0"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            ) : (
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden bg-white/98 backdrop-blur-lg shadow-xl border-t border-red-100 absolute top-full left-0 right-0 z-40"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`block py-3 px-4 rounded-lg transition-colors ${
                    activeSection === link.id
                      ? "bg-red-100 text-red-600 font-semibold"
                      : "text-gray-700 hover:bg-red-50"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="block py-3 px-4 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-lg text-center font-medium"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
              >
                Contactez-nous
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

