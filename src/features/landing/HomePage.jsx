import { useCallback, useEffect, useRef, useState } from "react";
import BackToTop from "../../components/effects/BackToTop";
import Cursor from "../../components/effects/Cursor";
import HexMesh from "../../components/effects/HexMesh";
import Loader from "../../components/effects/Loader";
import ScrollProgress from "../../components/effects/ScrollProgress";
import WhatsAppButton from "../../components/effects/WhatsAppButton";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";
import Ticker from "../../components/layout/Ticker";
import { STORAGE_KEYS } from "../../config/constants";
import { PAGE_META } from "../../config/seo";
import usePageMeta from "../../hooks/usePageMeta";
import useReveal from "../../hooks/useReveal";
import GlobalStyles from "../../styles/GlobalStyles";
import { readStorage, writeStorage } from "../../utils/storage";
import AboutSection from "./sections/AboutSection";
import ContactSection from "./sections/ContactSection";
import CtaSection from "./sections/CtaSection";
import FaqSection from "./sections/FaqSection";
import HeroSection from "./sections/HeroSection";
import PortfolioSection from "./sections/PortfolioSection";
import PricingSection from "./sections/PricingSection";
import ProcessSection from "./sections/ProcessSection";
import ServicesSection from "./sections/ServicesSection";
import TestimonialsSection from "./sections/TestimonialsSection";

/**
 * Landing page. Only owns the intro/loader state – every section keeps its own state, so
 * interactions (typing in the form, opening an FAQ) never re-render the rest of the page.
 * The animated intro plays once per browser session; repeat visits go straight to the page.
 */
export default function HomePage() {
  const [introSeen] = useState(() => readStorage(STORAGE_KEYS.introSeen, "session") === "1");
  const [loading, setLoading] = useState(!introSeen);
  const [navVis, setNavVis] = useState(introSeen);
  const [heroVis, setHeroVis] = useState(introSeen);
  const revealTimer = useRef(null);

  useReveal();
  usePageMeta(PAGE_META.home);
  useEffect(() => () => clearTimeout(revealTimer.current), []);

  // Arriving from another page via "/#section" – scroll once the sections have rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = setTimeout(() => document.getElementById(id)?.scrollIntoView(), 100);
    return () => clearTimeout(t);
  }, []);

  const handleLoaderDone = useCallback(() => {
    writeStorage(STORAGE_KEYS.introSeen, "1", "session");
    setLoading(false);
    revealTimer.current = setTimeout(() => {
      setNavVis(true);
      setHeroVis(true);
    }, 80);
  }, []);

  return (
    <div style={{ background: "#060912", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <GlobalStyles />
      <HexMesh />
      <Cursor />
      <ScrollProgress />
      <BackToTop />
      <WhatsAppButton />
      {loading && <Loader onDone={handleLoaderDone} />}
      <Navbar vis={navVis} />

      <main>
        <HeroSection heroVis={heroVis} />
        <Ticker />
        <AboutSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <TestimonialsSection />
        <ProcessSection />
        <FaqSection />
        <CtaSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
