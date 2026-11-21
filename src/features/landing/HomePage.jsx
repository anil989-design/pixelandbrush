import BackToTop from "../../components/effects/BackToTop";
import ScrollProgress from "../../components/effects/ScrollProgress";
import WhatsAppButton from "../../components/effects/WhatsAppButton";
import StarsCanvas from "../../components/canvas/StarsCanvas";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import { PAGE_META } from "../../config/seo";
import usePageMeta from "../../hooks/usePageMeta";
import GlobalStyles from "../../styles/GlobalStyles";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import ExperienceSection from "./sections/ExperienceSection";
import HeroSection from "./sections/HeroSection";
import PortfolioSection from "./sections/PortfolioSection";
import PricingSection from "./sections/PricingSection";
import TechSection from "./sections/TechSection";
import TestimonialsSection from "./sections/TestimonialsSection";

export default function HomePage() {
  usePageMeta(PAGE_META.home);

  return (
    <div style={{ position: "relative", zIndex: 0, background: "#050816", minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />
      <ScrollProgress />
      <BackToTop />
      <WhatsAppButton />

      <Navbar vis />

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <TechSection />
        <PortfolioSection />
        <PricingSection />
        <TestimonialsSection />

        <div style={{ position: "relative", zIndex: 0 }}>
          <ContactSection />
          <StarsCanvas />
          <Footer />
        </div>
      </main>
    </div>
  );
}
