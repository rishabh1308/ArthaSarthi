import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  FeaturesSection,
  AIShowcase,
  AnalyticsShowcase,
  TestimonialsSection,
  CTASection,
} from "@/components/landing/LandingSections";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-hero-gradient">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <AIShowcase />
        <AnalyticsShowcase />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
