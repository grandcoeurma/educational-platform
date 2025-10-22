"use client"

import { useEffect, useState } from "react"

/**
 * Hook to detect if animations should be disabled on mobile devices
 * Returns true if device is mobile (≤768px) or user prefers reduced motion
 */
export function useDisableAnimations() {
  const [shouldDisableAnimations, setShouldDisableAnimations] = useState(false)

  useEffect(() => {
    // Check if mobile viewport
    const isMobile = window.innerWidth <= 768
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Check if mobile user agent (additional check)
    const isMobileUserAgent = /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent)

    setShouldDisableAnimations(isMobile || prefersReducedMotion || isMobileUserAgent)

    // Listen for resize events
    const handleResize = () => {
      const mobile = window.innerWidth <= 768
      setShouldDisableAnimations(mobile || prefersReducedMotion || isMobileUserAgent)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return shouldDisableAnimations
}

/**
 * Returns animation config that's disabled on mobile
 * Usage: <motion.div {...getAnimationConfig(shouldDisable)} />
 */
export function getAnimationConfig(shouldDisable: boolean, config?: any) {
  if (shouldDisable) {
    return {
      initial: {},
      animate: {},
      exit: {},
      transition: { duration: 0 }
    }
  }
  return config || {}
}
