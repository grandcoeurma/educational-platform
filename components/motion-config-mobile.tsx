"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export function MobileMotionConfig({ children }: { children: ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // On mobile: disable all animations by setting transition to instant
  if (isMobile) {
    return (
      <MotionConfig transition={{ duration: 0, delay: 0 }}>
        {children}
      </MotionConfig>
    );
  }

  // On desktop: use default animations
  return <>{children}</>;
}
