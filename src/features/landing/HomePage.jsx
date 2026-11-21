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
import TechSection from "./sections/TechSection";
import TestimonialsSection from "./sections/TestimonialsSection";

export default function HomePage() {
  usePageMeta(PAGE_META.home);

  return (
    <div style={{ position: "relative", zIndex: 0, background: "#07040e", minHeight: "100vh", overflowX: "hidden" }}>
      <GlobalStyles />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <TechSection />
      <PortfolioSection />
      <TestimonialsSection />
      <div style={{ position: "relative", zIndex: 0 }}>
        <ContactSection />
        <StarsCanvas />
        <Footer />
      </div>
    </div>
  );
}
