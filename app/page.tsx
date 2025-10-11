import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { VisionMissionSection } from "@/components/vision-mission-section"
import { DailyLifeSection } from "@/components/daily-life-section"
import { ProgramsSection } from "@/components/programs-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <VisionMissionSection />
      <DailyLifeSection />
      <ProgramsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
