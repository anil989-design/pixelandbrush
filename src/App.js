import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

/* ── Global Styles & Sunset Ember Theme ───────────────────────────────────── */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Syne:wght@700;800;900&display=swap');

    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    html { scroll-behavior: smooth; }
    body {
      background: #08070B;
      color: #F1F5F9;
      font-family: 'Outfit', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x: hidden;
      cursor: none;
      letter-spacing: -0.01em;
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: #08070B; }
    ::-webkit-scrollbar-thumb { background: #271E36; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #F97316; }

    a { text-decoration: none; color: inherit; transition: all .25s ease; }
    a:hover { color: inherit; }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Syne', 'Plus Jakarta Sans', sans-serif;
      font-weight: 800;
      color: #FFFFFF;
      letter-spacing: -0.03em;
    }

    /* Keyframes */
    @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(1deg)} }
    @keyframes emberPulse { 0%,100%{opacity:.5;transform:scale(1)} 50%{opacity:.85;transform:scale(1.06)} }
    @keyframes liveDot { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.3;transform:scale(.75)} }
    @keyframes ticker { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes gradientShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes whatsappPulse { 0%,100%{transform:scale(1);box-shadow:0 10px 25px rgba(37,211,102,0.35)} 50%{transform:scale(1.08);box-shadow:0 18px 35px rgba(37,211,102,0.55)} }
    @keyframes emberGlow { 0%,100%{border-color:rgba(249,115,22,0.25)} 50%{border-color:rgba(245,158,11,0.55)} }

    /* Sunset Ember Typography & Gradients */
    .glow-headline {
      background: linear-gradient(135deg, #FFFFFF 15%, #FED7AA 45%, #F97316 75%, #F59E0B 100%);
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 6s ease infinite;
    }
    .accent-coral {
      background: linear-gradient(135deg, #F97316 0%, #F59E0B 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .accent-gold {
      background: linear-gradient(135deg, #FBBF24 0%, #EA580C 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Bento Card Architecture */
    .bento-card {
      background: rgba(18, 14, 26, 0.72);
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 24px;
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      transition: all .35s cubic-bezier(.16, 1, .3, 1);
      position: relative;
      overflow: hidden;
    }
    .bento-card::before {
      content: "";
      position: absolute;
      top: 0; left: 0; right: 0; height: 1px;
      background: linear-gradient(90deg, transparent, rgba(249, 115, 22, 0.25), transparent);
    }
    .bento-card:hover {
      background: rgba(26, 20, 38, 0.88);
      border-color: rgba(249, 115, 22, 0.45);
      transform: translateY(-6px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 30px rgba(249, 115, 22, 0.15);
    }

    .bento-card-glow {
      border: 1px solid rgba(249, 115, 22, 0.4);
      background: radial-gradient(circle at 50% 0%, rgba(249, 115, 22, 0.15) 0%, rgba(18, 14, 26, 0.85) 75%);
    }

    /* Pill Badges */
    .pill-badge {
      display: inline-flex;
      align-items: center;
      gap: .5rem;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(255, 255, 255, 0.09);
      padding: .35rem .9rem;
      border-radius: 100px;
      font-size: .78rem;
      font-weight: 600;
      color: #CBD5E1;
      backdrop-filter: blur(10px);
      transition: all .25s ease;
    }
    .pill-badge:hover {
      background: rgba(249, 115, 22, 0.12);
      border-color: rgba(249, 115, 22, 0.35);
      color: #FED7AA;
    }

    /* Filter Tabs */
    .filter-tab {
      padding: .6rem 1.4rem;
      border-radius: 100px;
      font-size: .88rem;
      font-weight: 600;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid rgba(255, 255, 255, 0.08);
      color: #94A3B8;
      cursor: pointer;
      transition: all .25s ease;
    }
    .filter-tab:hover {
      color: #FFFFFF;
      background: rgba(255, 255, 255, 0.08);
    }
    .filter-tab.active {
      background: linear-gradient(135deg, #EA580C, #F59E0B);
      border-color: transparent;
      color: #FFFFFF;
      box-shadow: 0 4px 20px rgba(234, 88, 12, 0.45);
    }

    /* Form Inputs */
    .cyber-input {
      background: rgba(13, 10, 20, 0.88) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      color: #FFFFFF !important;
      border-radius: 14px !important;
      padding: .9rem 1.2rem !important;
      font-size: .95rem !important;
      font-family: 'Outfit', sans-serif !important;
      transition: all .25s ease !important;
    }
    .cyber-input:focus {
      border-color: #F97316 !important;
      background: rgba(20, 15, 30, 0.98) !important;
      box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.25) !important;
      color: #FFFFFF !important;
    }
    .cyber-input::placeholder {
      color: #71717A !important;
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position: fixed; top: 0; right: 0; bottom: 0; width: 310px;
      background: rgba(8, 7, 12, 0.98); border-left: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(32px); z-index: 1050;
      padding: 5rem 2rem 2rem; display: flex; flex-direction: column; gap: 1rem;
      transform: translateX(100%); transition: transform .35s cubic-bezier(.16, 1, .3, 1);
    }
    .mobile-drawer.open { transform: translateX(0); }
    .mobile-overlay {
      position: fixed; inset: 0; z-index: 1040; background: rgba(0, 0, 0, .75);
      opacity: 0; pointer-events: none; transition: opacity .3s;
    }
    .mobile-overlay.open { opacity: 1; pointer-events: all; }

    @media (max-width: 992px) {
      .desktop-nav { display: none !important; }
      .mobile-menu-btn { display: flex !important; }
    }
    @media (max-width: 768px) {
      body { cursor: auto; }
    }
  `}</style>
);

/* ── Custom Interactive Sunset Glow Cursor ────────────────────────────────── */
const CustomCursor = () => {
  const dot = useRef(null);
  const ring = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const lag = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMove);

    const handleEnter = () => {
      if (ring.current) {
        ring.current.style.transform = "scale(2)";
        ring.current.style.borderColor = "rgba(249, 115, 22, 0.85)";
        ring.current.style.background = "rgba(249, 115, 22, 0.08)";
      }
    };
    const handleLeave = () => {
      if (ring.current) {
        ring.current.style.transform = "scale(1)";
        ring.current.style.borderColor = "rgba(249, 115, 22, 0.4)";
        ring.current.style.background = "transparent";
      }
    };

    document.querySelectorAll("a, button, input, select, textarea, .filter-tab, .bento-card").forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    let frameId;
    const render = () => {
      lag.current.x += (pos.current.x - lag.current.x) * 0.16;
      lag.current.y += (pos.current.y - lag.current.y) * 0.16;
      if (dot.current) {
        dot.current.style.left = `${pos.current.x - 4}px`;
        dot.current.style.top = `${pos.current.y - 4}px`;
      }
      if (ring.current) {
        ring.current.style.left = `${lag.current.x - 18}px`;
        ring.current.style.top = `${lag.current.y - 18}px`;
      }
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <>
      <div ref={dot} style={{ position: "fixed", width: 8, height: 8, background: "#F97316", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transition: "opacity .2s", boxShadow: "0 0 10px #F97316" }} />
      <div ref={ring} style={{ position: "fixed", width: 36, height: 36, border: "1.5px solid rgba(249,115,22,0.4)", borderRadius: "50%", pointerEvents: "none", zIndex: 9998, transition: "transform .25s ease, border-color .25s ease, background .25s ease" }} />
    </>
  );
};

/* ── Interactive Scroll Progress ─────────────────────────────────────────── */
const ScrollProgressBar = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const el = document.documentElement;
      setProgress((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        zIndex: 9997,
        width: `${progress}%`,
        background: "linear-gradient(90deg, #EA580C, #F59E0B, #EF4444)",
        boxShadow: "0 0 12px rgba(249,115,22,0.6)",
        pointerEvents: "none",
        transition: "width .05s linear",
      }}
    />
  );
};

/* ── Back to Top ─────────────────────────────────────────────────────────── */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed",
        bottom: "5.5rem",
        right: "1.8rem",
        zIndex: 500,
        width: 48,
        height: 48,
        borderRadius: "14px",
        background: "rgba(18, 14, 26, 0.85)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        color: "#F1F5F9",
        fontSize: "1.2rem",
        cursor: "pointer",
        backdropFilter: "blur(16px)",
        boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all .3s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#F97316";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.color = "#F97316";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.color = "#F1F5F9";
      }}
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

/* ── Direct WhatsApp Hook ────────────────────────────────────────────────── */
const WhatsAppButton = () => (
  <a
    href="https://wa.me/447700000000?text=Hi%20Pixel%20%26%20Brush%2C%20I%27d%20love%20to%20collaborate%20on%20a%20new%20project!"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    style={{
      position: "fixed",
      bottom: "1.8rem",
      right: "1.8rem",
      zIndex: 500,
      width: 54,
      height: 54,
      borderRadius: "16px",
      background: "#25D366",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.6rem",
      color: "#FFFFFF",
      textDecoration: "none",
      animation: "whatsappPulse 3s ease-in-out infinite",
      transition: "all .3s ease",
    }}
  >
    <i className="bi bi-whatsapp"></i>
  </a>
);

/* ── Sunset Ember Ambient Aura Background ────────────────────────────────── */
const AmbientStudioAura = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    {/* Sunset Flame Radial Mesh */}
    <div style={{ position: "absolute", top: "-10%", left: "20%", width: "70vw", height: "60vw", background: "radial-gradient(ellipse, rgba(249, 115, 22, 0.12) 0%, rgba(245, 158, 11, 0.04) 50%, transparent 70%)", filter: "blur(90px)", animation: "emberPulse 10s ease-in-out infinite" }} />
    {/* Coral Red Accent */}
    <div style={{ position: "absolute", top: "45%", right: "-15%", width: "55vw", height: "55vw", background: "radial-gradient(circle, rgba(239, 68, 68, 0.08) 0%, rgba(249, 115, 22, 0.02) 60%, transparent 75%)", filter: "blur(100px)", animation: "emberPulse 12s ease-in-out infinite 2s" }} />
    {/* Subtle Warm Dot Grid */}
    <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(249, 115, 22, 0.07) 1px, transparent 1px)", backgroundSize: "36px 36px", opacity: 0.6 }} />
  </div>
);

/* ── Primary Kinetic Button ──────────────────────────────────────────────── */
const ActionButton = ({ children, primary, outline, href, onClick, disabled, className = "", style = {} }) => {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: ".6rem",
        padding: ".9rem 2rem",
        borderRadius: "14px",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: ".95rem",
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        textDecoration: "none",
        transition: "all .3s cubic-bezier(.16, 1, .3, 1)",
        letterSpacing: "-0.01em",
        opacity: disabled ? 0.6 : 1,
        ...(primary
          ? {
              background: "linear-gradient(135deg, #EA580C 0%, #F59E0B 100%)",
              color: "#FFFFFF",
              boxShadow: "0 10px 25px rgba(234, 88, 12, 0.4)",
            }
          : outline
          ? {
              background: "rgba(255, 255, 255, 0.04)",
              color: "#FFFFFF",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
            }
          : {
              background: "rgba(255, 255, 255, 0.06)",
              color: "#F1F5F9",
              border: "1px solid rgba(255, 255, 255, 0.08)",
            }),
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          if (primary) {
            e.currentTarget.style.boxShadow = "0 15px 35px rgba(249, 115, 22, 0.55)";
            e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
          } else {
            e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.5)";
            e.currentTarget.style.background = "rgba(249, 115, 22, 0.08)";
            e.currentTarget.style.transform = "translateY(-3px)";
          }
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          if (primary) {
            e.currentTarget.style.boxShadow = "0 10px 25px rgba(234, 88, 12, 0.4)";
            e.currentTarget.style.transform = "none";
          } else {
            e.currentTarget.style.borderColor = outline ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)";
            e.currentTarget.style.background = outline ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.06)";
            e.currentTarget.style.transform = "none";
          }
        }
      }}
    >
      {children}
    </Tag>
  );
};

/* ── Metric Counter ──────────────────────────────────────────────────────── */
const MetricCounter = ({ end, suffix = "" }) => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          let curr = 0;
          const step = end / 35;
          const timer = setInterval(() => {
            curr += step;
            if (curr >= end) {
              setValue(end);
              clearInterval(timer);
            } else {
              setValue(Math.round(curr));
            }
          }, 35);
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{value}{suffix}</span>;
};

/* ── Modern Section Header ───────────────────────────────────────────────── */
const SectionHeading = ({ tag, title, subtitle, center = false }) => (
  <div className={`mb-5 ${center ? "text-center mx-auto" : ""}`} style={{ maxWidth: 720 }}>
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".5rem",
        background: "rgba(249, 115, 22, 0.1)",
        border: "1px solid rgba(249, 115, 22, 0.28)",
        padding: ".35rem .95rem",
        borderRadius: "100px",
        marginBottom: "1.2rem",
      }}
    >
      <span style={{ width: 6, height: 6, background: "#F59E0B", borderRadius: "50%" }} />
      <span style={{ color: "#FB923C", fontSize: ".76rem", fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase" }}>
        {tag}
      </span>
    </div>
    <h2 style={{ fontSize: "clamp(2.2rem, 3.8vw, 3.2rem)", lineHeight: 1.12, marginBottom: "1rem" }}>
      {title}
    </h2>
    {subtitle && <p style={{ color: "#A1A1AA", fontSize: "1.05rem", lineHeight: 1.7, margin: 0 }}>{subtitle}</p>}
  </div>
);

/* ── Dynamic Navbar ──────────────────────────────────────────────────────── */
const HeaderNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 25);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: isScrolled ? ".75rem 0" : "1.4rem 0",
          transition: "all .35s ease",
        }}
      >
        <div className="container px-4 px-lg-5">
          <div
            style={{
              background: isScrolled ? "rgba(14, 11, 20, 0.9)" : "rgba(18, 14, 26, 0.5)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "20px",
              padding: ".75rem 1.4rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: isScrolled ? "0 15px 35px rgba(0,0,0,0.45)" : "none",
              transition: "all .3s ease",
            }}
          >
            {/* Studio Logo */}
            <a href="/" style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #EA580C, #F59E0B)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF",
                  fontWeight: 900,
                  fontSize: "1rem",
                  fontFamily: "'Syne', sans-serif",
                  boxShadow: "0 6px 18px rgba(234, 88, 12, 0.45)",
                }}
              >
                PB
              </div>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#FFFFFF", letterSpacing: "-0.02em" }}>
                PIXEL <span style={{ color: "#F97316" }}>&amp;</span> BRUSH
              </span>
            </a>

            {/* Desktop Navigation Links */}
            <div className="desktop-nav d-flex align-items-center gap-4">
              {[
                { label: "Studio", href: "#studio" },
                { label: "Capabilities", href: "#services" },
                { label: "Selected Works", href: "#portfolio" },
                { label: "Pricing", href: "#pricing" },
                { label: "FAQ", href: "#faq" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{ color: "#A1A1AA", fontSize: ".9rem", fontWeight: 600, letterSpacing: "-0.01em" }}
                  onMouseEnter={(e) => (e.target.style.color = "#F97316")}
                  onMouseLeave={(e) => (e.target.style.color = "#A1A1AA")}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="desktop-nav d-flex align-items-center gap-2">
              <a
                href="/login"
                style={{
                  padding: ".65rem 1.2rem",
                  borderRadius: "12px",
                  color: "#D4D4D8",
                  fontSize: ".88rem",
                  fontWeight: 600,
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "rgba(255,255,255,0.02)",
                  transition: "all .2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = "#FFFFFF";
                  e.target.style.borderColor = "rgba(249,115,22,0.4)";
                  e.target.style.background = "rgba(249,115,22,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = "#D4D4D8";
                  e.target.style.borderColor = "rgba(255,255,255,0.08)";
                  e.target.style.background = "rgba(255,255,255,0.02)";
                }}
              >
                Client Portal
              </a>
              <ActionButton primary href="#contact" style={{ padding: ".65rem 1.4rem", fontSize: ".88rem" }}>
                Book Call →
              </ActionButton>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="mobile-menu-btn d-none align-items-center justify-content-center"
              onClick={() => setIsMobileOpen(true)}
              aria-label="Open Navigation Menu"
              style={{
                width: 42,
                height: 42,
                borderRadius: "12px",
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "#FFFFFF",
                fontSize: "1.3rem",
                cursor: "pointer",
              }}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-overlay ${isMobileOpen ? "open" : ""}`} onClick={() => setIsMobileOpen(false)} />
      <div className={`mobile-drawer ${isMobileOpen ? "open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: "#FFFFFF" }}>
            PIXEL &amp; BRUSH
          </span>
          <button
            onClick={() => setIsMobileOpen(false)}
            style={{ background: "none", border: "none", color: "#A1A1AA", fontSize: "1.4rem", cursor: "pointer" }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
        {[
          { label: "Studio Overview", href: "#studio" },
          { label: "Capabilities", href: "#services" },
          { label: "Selected Works", href: "#portfolio" },
          { label: "Pricing & Sprints", href: "#pricing" },
          { label: "Process & FAQ", href: "#faq" },
          { label: "Contact Us", href: "#contact" },
        ].map((item) => (
          <a
            key={item.label}
            href={item.href}
            onClick={() => setIsMobileOpen(false)}
            style={{ padding: ".85rem 0", color: "#D4D4D8", fontSize: "1.1rem", fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
            {item.label}
          </a>
        ))}
        <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <a
            href="/login"
            onClick={() => setIsMobileOpen(false)}
            style={{
              textAlign: "center",
              padding: ".9rem",
              borderRadius: "14px",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#FFFFFF",
              fontWeight: 700,
            }}
          >
            Client Sign In
          </a>
          <ActionButton primary href="#contact" onClick={() => setIsMobileOpen(false)}>
            Start a Project →
          </ActionButton>
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
/* ── MAIN PORTFOLIO COMPONENT ────────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  /* Contact Form States */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Next-Gen Web Architecture");
  const [budget, setBudget] = useState("£500 - £1,500");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  /* Data: Services & Capabilities */
  const capabilities = [
    {
      icon: "bi-code-slash",
      tag: "Engineering",
      title: "Next-Gen Web Architecture",
      desc: "Blazing fast React, Next.js, and Supabase cloud applications with 99+ Lighthouse scores and bulletproof conversion funnels.",
      features: ["Custom React & Next.js Full-Stack", "Automated Supabase Cloud Backends", "Sub-Second Speed Optimization", "Headless CMS & API Architecture"],
      highlight: true,
    },
    {
      icon: "bi-palette2",
      tag: "Aesthetics",
      title: "Luxury Brand & UI/UX Systems",
      desc: "Distinct visual identities, interactive Figma design systems, and modern 3D visual language that turns first-time visitors into loyal advocates.",
      features: ["Bespoke Visual Brand Identity", "Interactive High-Fidelity Figma", "Comprehensive Design Systems", "Iconography & Motion Guidelines"],
      highlight: false,
    },
    {
      icon: "bi-rocket-takeoff-fill",
      tag: "Growth",
      title: "Social Growth & Viral Strategy",
      desc: "Organic compounding social engines and performance copywriting engineered to establish immediate authority in your market.",
      features: ["High-Converting Social Campaigns", "Editorial & Content Calendars", "Audience Acquisition Strategy", "Conversion Funnel Optimization"],
      highlight: false,
    },
  ];

  /* Data: Selected Works */
  const projects = [
    {
      id: "kashish",
      img: "/projects/KA.png",
      title: "Kashish Makeup Studio",
      client: "Kashish Sentury",
      category: "web",
      categoryLabel: "Web Engineering · Booking Engine",
      desc: "Full bespoke studio platform featuring an interactive beauty catalogue, automated appointment scheduling, and instant WhatsApp booking sync.",
      metric: "+120% Bookings",
      tags: ["React", "Supabase", "UI/UX", "Booking API"],
    },
    {
      id: "vijaya",
      img: "/projects/vijaya.jpg",
      title: "Vijaya Pharma",
      client: "Aditya Acharya",
      category: "brand",
      categoryLabel: "Brand Identity · Digital Transformation",
      desc: "Comprehensive corporate brand system, regulatory-compliant web architecture, and unified digital packaging guidelines.",
      metric: "100% Brand Uplift",
      tags: ["Figma", "Identity Suite", "Design System"],
    },
    {
      id: "kangaroo",
      img: "/projects/kangaroo.jpg",
      title: "Kangaroo Education Foundation",
      client: "Dipesh Aryal",
      category: "growth",
      categoryLabel: "Growth Strategy · Social Engine",
      desc: "Strategic multi-channel digital acquisition campaign resulting in a 300% surge in qualified international student consultations within 60 days.",
      metric: "300% Lead Growth",
      tags: ["Growth", "Social Strategy", "CRO"],
    },
  ];

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  /* Data: Pricing Tiers */
  const pricingPlans = [
    {
      name: "Sprint Launch",
      tag: "Early Stage & Founders",
      price: "£299",
      timeline: "5-7 Days Delivery",
      desc: "Rapid, high-impact launch package for startups and creators looking to make an unforgettable first impression.",
      features: [
        "Bespoke 5-Page Responsive Web Experience",
        "Sub-Second Speed & SEO Optimization",
        "Supabase Contact & Inquiry Pipeline",
        "Custom Kinetic Typography & Animations",
        "30-Day Post-Launch Support",
      ],
      highlight: false,
      cta: "Launch Sprint",
    },
    {
      name: "Growth Scale",
      tag: "Most Popular",
      price: "£699",
      timeline: "2-3 Weeks Delivery",
      desc: "The definitive full-stack package for established brands ready to outclass competitors and scale inbound revenue.",
      features: [
        "Up to 10 Bespoke High-Converting Pages",
        "Dynamic Supabase Backend & Database",
        "Full Brand Identity & Figma Design Kit",
        "Exclusive Client Portal Management",
        "Interactive Animation & Micro-interactions",
        "Priority 60-Day Technical Aftercare",
      ],
      highlight: true,
      cta: "Claim Growth Package",
    },
    {
      name: "Studio Partner",
      tag: "Full Scale Domination",
      price: "£1,299",
      timeline: "Custom Agile Sprint",
      desc: "End-to-end transformation uniting custom web software, complete luxury branding, and managed social growth.",
      features: [
        "Unlimited Custom Pages & Micro-apps",
        "Custom Web App / Portal Architecture",
        "Complete Visual Brand & Asset Guidelines",
        "3 Months Managed Social & Growth Strategy",
        "Direct Senior Architect 24/7 Slack Access",
        "Guaranteed Performance & SLA Support",
      ],
      highlight: false,
      cta: "Partner With Us",
    },
  ];

  /* Data: Real Client Testimonials */
  const testimonials = [
    {
      quote:
        "Pixel & Brush completely elevated our studio's market presence. The design is jaw-dropping and our client bookings doubled within the very first month of launch.",
      name: "Kashish Sentury",
      role: "Founder & Creative Director",
      company: "Kashish Makeup Studio",
      avatar: "K",
      gradient: "linear-gradient(135deg, #F97316, #EF4444)",
    },
    {
      quote:
        "Working with Anil was flawless. The visual brand captures our exact clinical standards, and the website has earned immense praise from our industry partners worldwide.",
      name: "Aditya Acharya",
      role: "Managing Director",
      company: "Vijaya Pharma",
      avatar: "A",
      gradient: "linear-gradient(135deg, #F59E0B, #EA580C)",
    },
    {
      quote:
        "Our student inquiries and organic reach skyrocketed by over 300% in two months. The execution speed and obsessive attention to detail is world-class.",
      name: "Dipesh Aryal",
      role: "Managing Director",
      company: "Kangaroo Education",
      avatar: "D",
      gradient: "linear-gradient(135deg, #EF4444, #F97316)",
    },
  ];

  /* Data: FAQ */
  const faqs = [
    {
      q: "How fast can you deliver my project?",
      a: "Our Sprint Launch websites are completed and deployed within 5 to 7 days. Comprehensive full-stack platforms and brand overhauls typically take 2 to 4 weeks with weekly milestone previews.",
    },
    {
      q: "Do I get full ownership of code and design files?",
      a: "Yes, 100%. Upon final delivery, all GitHub repositories, Figma source files, domain configurations, and Supabase database assets are permanently transferred to your ownership.",
    },
    {
      q: "How does project communication work?",
      a: "You get access to a private Client Portal right on this site where you can view live project milestones, download files, chat directly with Anil, and approve revisions with zero friction.",
    },
    {
      q: "Do you take on international projects outside the UK?",
      a: "Yes! While Pixel & Brush is based in the UK, over 40% of our clients are in North America, Europe, and Asia. We coordinate seamlessly across global timezones.",
    },
    {
      q: "What support is included after the site goes live?",
      a: "Every single build includes 30 to 60 days of free technical aftercare, including uptime monitoring, bug fixes, speed audits, and minor copy adjustments.",
    },
  ];

  /* ── Contact Submission Handler ── */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Anti-spam Honeypot Check
    if (honeypot) {
      setFormStatus("success");
      return;
    }

    // Rate Limiting Cooldown (30 seconds)
    const lastSent = parseInt(localStorage.getItem("pb_contact_cooldown") || "0", 10);
    const now = Date.now();
    if (now - lastSent < 30000) {
      const remaining = Math.ceil((30000 - (now - lastSent)) / 1000);
      setFormError(`Please wait ${remaining} seconds before submitting another enquiry.`);
      return;
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 254);
    const cleanMessage = `[Budget: ${budget}] ${message.trim().slice(0, 3000)}`;

    if (!cleanName || !cleanEmail || !message.trim()) {
      setFormError("Please fill out all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    setFormStatus("sending");

    try {
      const { error } = await supabase.from("messages").insert([
        {
          sender_name: cleanName,
          sender_email: cleanEmail,
          service_needed: service,
          message: cleanMessage,
        },
      ]);

      if (error) {
        setFormError("Unable to submit directly. Please email us directly at anilpte232@gmail.com.");
        setFormStatus("error");
        return;
      }

      localStorage.setItem("pb_contact_cooldown", Date.now().toString());
      setFormStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setFormStatus("idle"), 8000);
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again or email anilpte232@gmail.com.");
      setFormStatus("error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", position: "relative", background: "#08070B", overflowX: "hidden" }}>
      <GlobalStyles />
      <AmbientStudioAura />
      <CustomCursor />
      <ScrollProgressBar />
      <BackToTop />
      <WhatsAppButton />
      <HeaderNavigation />

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── HERO BENTO & SUNSET EMBER SHOWCASE ───────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "9.5rem 0 5.5rem", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <div className="row align-items-center justify-content-between g-5">
            {/* Left Hero Column */}
            <div className="col-12 col-lg-7">
              {/* Live Status Pill */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: ".65rem",
                  background: "rgba(249, 115, 22, 0.1)",
                  border: "1px solid rgba(249, 115, 22, 0.3)",
                  padding: ".45rem 1.1rem",
                  borderRadius: "100px",
                  marginBottom: "1.8rem",
                  boxShadow: "0 0 20px rgba(249, 115, 22, 0.15)",
                }}
              >
                <span
                  style={{
                    width: 8,
                    height: 8,
                    background: "#10B981",
                    borderRadius: "50%",
                    boxShadow: "0 0 10px #10B981",
                    animation: "liveDot 2s ease infinite",
                  }}
                />
                <span style={{ color: "#FED7AA", fontSize: ".8rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
                  UK Creative Tech Studio · Available for New Projects
                </span>
              </div>

              {/* Kinetic Main Headline */}
              <h1
                style={{
                  fontSize: "clamp(2.8rem, 5.2vw, 4.4rem)",
                  lineHeight: 1.05,
                  marginBottom: "1.5rem",
                  letterSpacing: "-0.035em",
                }}
              >
                We Craft <span className="glow-headline">Digital Masterpieces</span> That Defy The Ordinary.
              </h1>

              {/* High-Impact Subtitle */}
              <p
                style={{
                  color: "#A1A1AA",
                  fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)",
                  lineHeight: 1.68,
                  maxWidth: 580,
                  marginBottom: "2.4rem",
                  fontWeight: 400,
                }}
              >
                Pixel &amp; Brush merges modern web engineering, luxury brand design, and growth strategy into high-velocity digital experiences that win customers and dominate markets.
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-3 align-items-center mb-5">
                <ActionButton primary href="#contact" style={{ padding: "1rem 2.4rem", fontSize: "1.02rem" }}>
                  Start a Project <i className="bi bi-arrow-right"></i>
                </ActionButton>
                <ActionButton outline href="#portfolio" style={{ padding: "1rem 2.2rem", fontSize: "1.02rem" }}>
                  Explore Work <i className="bi bi-arrow-up-right"></i>
                </ActionButton>
              </div>

              {/* Live Metric Stats */}
              <div className="row g-4 pt-4 border-top" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
                <div className="col-4">
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", color: "#FFFFFF" }}>
                    <MetricCounter end={15} suffix="+" />
                  </div>
                  <div style={{ color: "#71717A", fontSize: ".76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginTop: ".2rem" }}>
                    Shipped Works
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", color: "#F97316" }}>
                    <MetricCounter end={100} suffix="%" />
                  </div>
                  <div style={{ color: "#71717A", fontSize: ".76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginTop: ".2rem" }}>
                    On-Time Launch
                  </div>
                </div>
                <div className="col-4">
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "clamp(1.9rem, 3.2vw, 2.6rem)", color: "#FBBF24" }}>
                    <MetricCounter end={3} suffix=".2x" />
                  </div>
                  <div style={{ color: "#71717A", fontSize: ".76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginTop: ".2rem" }}>
                    Client Growth
                  </div>
                </div>
              </div>
            </div>

            {/* Right Hero Column / Creator Bento Showcase */}
            <div className="col-12 col-lg-5">
              <div style={{ position: "relative", maxWidth: 420, margin: "0 auto" }}>
                {/* Floating Micro-Badge 1 */}
                <div
                  style={{
                    position: "absolute",
                    top: "6%",
                    left: "-8%",
                    zIndex: 5,
                    background: "rgba(18, 14, 26, 0.88)",
                    border: "1px solid rgba(249, 115, 22, 0.35)",
                    padding: ".7rem 1.1rem",
                    borderRadius: "16px",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                    textAlign: "left",
                    animation: "floatSlow 6s ease-in-out infinite",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem", marginBottom: ".2rem" }}>
                    <span style={{ width: 8, height: 8, background: "#10B981", borderRadius: "50%" }}></span>
                    <span style={{ color: "#FB923C", fontSize: ".74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>
                      Direct Senior Lead
                    </span>
                  </div>
                  <div style={{ color: "#FFFFFF", fontSize: ".92rem", fontWeight: 700 }}>Zero Junior Hand-offs</div>
                </div>

                {/* Floating Micro-Badge 2 */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "10%",
                    right: "-8%",
                    zIndex: 5,
                    background: "rgba(18, 14, 26, 0.88)",
                    border: "1px solid rgba(245, 158, 11, 0.35)",
                    padding: ".7rem 1.1rem",
                    borderRadius: "16px",
                    backdropFilter: "blur(20px)",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
                    textAlign: "left",
                    animation: "floatSlow 5s ease-in-out 1s infinite",
                  }}
                >
                  <div style={{ color: "#34D399", fontSize: ".74rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em" }}>
                    ⚡ Rapid Delivery
                  </div>
                  <div style={{ color: "#FFFFFF", fontSize: ".92rem", fontWeight: 700 }}>5 - 14 Days Sprints</div>
                </div>

                {/* Portrait Frame */}
                <div
                  style={{
                    position: "relative",
                    borderRadius: "32px",
                    overflow: "hidden",
                    background: "linear-gradient(180deg, rgba(234, 88, 12, 0.25) 0%, rgba(18, 14, 26, 0.95) 100%)",
                    border: "1px solid rgba(255, 255, 255, 0.12)",
                    aspectRatio: "4/5",
                    boxShadow: "0 30px 70px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <img
                    src="/me.png"
                    alt="Anil Pandey - Founder & Principal Technologist"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.7))",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      background: "linear-gradient(to top, #08070B 25%, transparent 100%)",
                      padding: "2.5rem 1.8rem 1.2rem",
                    }}
                  >
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#FFFFFF" }}>
                      Anil Pandey
                    </div>
                    <div style={{ color: "#A1A1AA", fontSize: ".86rem", fontWeight: 500, marginTop: ".1rem" }}>
                      Lead Technologist &amp; Brand Strategist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── KINETIC TECH & SKILLS MARQUEE ─────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          overflow: "hidden",
          borderTop: "1px solid rgba(255, 255, 255, 0.06)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "1.2rem 0",
          background: "rgba(18, 14, 26, 0.4)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ display: "flex", gap: "3.5rem", whiteSpace: "nowrap", animation: "ticker 30s linear infinite" }}>
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="d-flex gap-5 align-items-center">
              {[
                "BESPOKE WEB APPS",
                "LUXURY BRAND IDENTITY",
                "SUPABASE CLOUD",
                "REACT 19 & NEXT.JS",
                "3D FIGMA PROTOTYPING",
                "HIGH-CONVERSION ARCHITECTURE",
                "VIRAL SOCIAL SYSTEMS",
                "ZERO-BLOAT SPEED",
              ].map((text, i) => (
                <div key={i} className="d-flex align-items-center gap-3">
                  <span style={{ color: "#F97316", fontSize: ".85rem" }}>✦</span>
                  <span style={{ color: "#D4D4D8", fontSize: ".9rem", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase" }}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── STUDIO BENTO GRID (CAPABILITIES & ADVANTAGE) ─────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="services" style={{ padding: "8.5rem 0 6rem", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <SectionHeading
            tag="Core Capabilities"
            title="Engineered for Impact, Speed &amp; Revenue"
            subtitle="We replace slow agencies and fragmented freelancers with an elite, full-stack creative technology studio."
          />

          <div className="row g-4">
            {capabilities.map((svc, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div
                  className={`bento-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between ${
                    svc.highlight ? "bento-card-glow" : ""
                  }`}
                >
                  <div>
                    <div className="d-flex justify-content-between align-items-start mb-4">
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "16px",
                          background: svc.highlight ? "rgba(234, 88, 12, 0.2)" : "rgba(255, 255, 255, 0.05)",
                          border: `1px solid ${svc.highlight ? "rgba(249, 115, 22, 0.4)" : "rgba(255, 255, 255, 0.1)"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: svc.highlight ? "#F97316" : "#FED7AA",
                          fontSize: "1.5rem",
                        }}
                      >
                        <i className={`bi ${svc.icon}`}></i>
                      </div>
                      <span className="pill-badge">{svc.tag}</span>
                    </div>

                    <h3 style={{ fontSize: "1.45rem", marginBottom: ".9rem" }}>{svc.title}</h3>
                    <p style={{ color: "#A1A1AA", fontSize: ".95rem", lineHeight: 1.68, marginBottom: "2rem" }}>
                      {svc.desc}
                    </p>

                    <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
                      <div style={{ color: "#71717A", fontSize: ".76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: ".08em", marginBottom: "1rem" }}>
                        Deliverables &amp; Tech
                      </div>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".65rem" }}>
                        {svc.features.map((item, idx) => (
                          <li key={idx} style={{ display: "flex", alignItems: "center", gap: ".65rem", fontSize: ".9rem", color: "#E4E4E7" }}>
                            <i className="bi bi-check2-circle text-warning"></i> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <ActionButton outline href="#contact" className="w-100">
                    Enquire for {svc.tag} →
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── SELECTED WORK / INTERACTIVE PORTFOLIO ────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="portfolio" style={{ padding: "8rem 0", background: "rgba(14, 11, 20, 0.5)", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end gap-4 mb-5">
            <SectionHeading
              tag="Selected Works"
              title="Transformative Results for Ambitious Brands"
              subtitle="Explore bespoke web systems, luxury visual identities, and social growth campaigns delivered by our studio."
            />

            {/* Category Filter Tabs */}
            <div className="d-flex flex-wrap gap-2 mb-4 mb-md-5">
              {[
                { id: "all", label: "All Works" },
                { id: "web", label: "Web Engineering" },
                { id: "brand", label: "Brand Design" },
                { id: "growth", label: "Growth Strategy" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={`filter-tab ${activeFilter === tab.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredProjects.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div className="bento-card h-100 overflow-hidden d-flex flex-column">
                  {/* Image Preview Container */}
                  <div style={{ position: "relative", height: 240, overflow: "hidden", background: "#120E1A" }}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform .6s cubic-bezier(.16, 1, .3, 1)",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: "1rem",
                        right: "1rem",
                        background: "rgba(8, 7, 12, 0.88)",
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: ".3rem .85rem",
                        borderRadius: "100px",
                        fontSize: ".75rem",
                        fontWeight: 700,
                        color: "#FBBF24",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {item.metric}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 p-xl-4 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <div style={{ color: "#71717A", fontSize: ".76rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: ".4rem" }}>
                        {item.categoryLabel}
                      </div>
                      <h3 style={{ fontSize: "1.3rem", marginBottom: ".6rem" }}>{item.title}</h3>
                      <p style={{ color: "#A1A1AA", fontSize: ".9rem", lineHeight: 1.6, marginBottom: "1.4rem" }}>
                        {item.desc}
                      </p>
                      <div className="d-flex flex-wrap gap-2 mb-4">
                        {item.tags.map((t, idx) => (
                          <span key={idx} className="pill-badge" style={{ fontSize: ".72rem", padding: ".25rem .65rem" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <a
                      href="#contact"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: ".45rem",
                        color: "#FB923C",
                        fontSize: ".9rem",
                        fontWeight: 700,
                      }}
                    >
                      Request Project Blueprint <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── CLIENT REVIEWS / TESTIMONIALS ────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "8.5rem 0", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <SectionHeading
            center
            tag="Founder Endorsements"
            title="Trusted by High-Velocity Leaders"
            subtitle="Direct feedback from founders and executive directors who transformed their digital presence with Pixel &amp; Brush."
          />

          <div className="row g-4 align-items-stretch">
            {testimonials.map((t, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="bento-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between">
                  <div>
                    {/* 5-Star Rating */}
                    <div className="d-flex gap-1 mb-3" style={{ color: "#F59E0B", fontSize: ".95rem" }}>
                      {[...Array(5)].map((_, star) => (
                        <i key={star} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <p style={{ color: "#F1F5F9", fontSize: "1rem", lineHeight: 1.75, fontStyle: "italic", marginBottom: "2.2rem" }}>
                      "{t.quote}"
                    </p>
                  </div>

                  <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{ borderColor: "rgba(255, 255, 255, 0.08) !important" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "14px",
                        background: t.gradient,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#FFFFFF",
                        fontWeight: 900,
                        fontSize: "1.1rem",
                        fontFamily: "'Syne', sans-serif",
                        flexShrink: 0,
                        boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                      }}
                    >
                      {t.avatar}
                    </div>
                    <div>
                      <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "1rem" }}>{t.name}</div>
                      <div style={{ color: "#71717A", fontSize: ".82rem", fontWeight: 600 }}>
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── TRANSPARENT INVESTMENT & SPRINTS ─────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" style={{ padding: "8.5rem 0", background: "rgba(14, 11, 20, 0.5)", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <SectionHeading
            center
            tag="Transparent Investment"
            title="Fixed Sprints. No Hidden Retainers."
            subtitle="Choose the exact sprint tier suited for your current growth trajectory. Every package includes free post-launch support."
          />

          <div className="row g-4 justify-content-center align-items-stretch">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div
                  className={`bento-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between position-relative ${
                    plan.highlight ? "bento-card-glow" : ""
                  }`}
                  style={
                    plan.highlight
                      ? {
                          borderColor: "rgba(249, 115, 22, 0.6)",
                          boxShadow: "0 25px 60px rgba(234, 88, 12, 0.25)",
                        }
                      : {}
                  }
                >
                  {plan.highlight && (
                    <div
                      style={{
                        position: "absolute",
                        top: -12,
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #EA580C, #F59E0B)",
                        padding: ".35rem 1.2rem",
                        borderRadius: "100px",
                        fontSize: ".75rem",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        letterSpacing: ".08em",
                        textTransform: "uppercase",
                        boxShadow: "0 6px 20px rgba(234, 88, 12, 0.5)",
                      }}
                    >
                      ⚡ Most Requested
                    </div>
                  )}

                  <div>
                    <div style={{ color: "#FB923C", fontSize: ".8rem", fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".4rem" }}>
                      {plan.tag}
                    </div>
                    <h3 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>{plan.name}</h3>

                    <div className="d-flex align-items-baseline gap-2 mb-2">
                      <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 900, fontSize: "3.2rem", color: "#FFFFFF" }}>
                        {plan.price}
                      </span>
                      <span style={{ color: "#71717A", fontSize: ".86rem", fontWeight: 600 }}>/ {plan.timeline}</span>
                    </div>

                    <p style={{ color: "#A1A1AA", fontSize: ".9rem", lineHeight: 1.6, marginBottom: "2rem" }}>
                      {plan.desc}
                    </p>

                    <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "1.5rem", marginBottom: "2.2rem" }}>
                      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".75rem" }}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} style={{ display: "flex", alignItems: "center", gap: ".65rem", fontSize: ".9rem", color: "#E4E4E7" }}>
                            <i className="bi bi-check-circle-fill text-warning" style={{ fontSize: ".95rem" }}></i>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <ActionButton
                    primary={plan.highlight}
                    outline={!plan.highlight}
                    href="#contact"
                    className="w-100"
                    onClick={() => {
                      setService(plan.name);
                    }}
                  >
                    {plan.cta} →
                  </ActionButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── FAQ KNOWLEDGE BASE ──────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" style={{ padding: "8.5rem 0", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <div className="row g-5 align-items-start">
            <div className="col-12 col-lg-5">
              <SectionHeading
                tag="FAQ Knowledge"
                title="Common Inquiries &amp; Workflow"
                subtitle="Everything you need to know about our sprints, delivery timelines, code ownership, and communication."
              />

              <div className="bento-card p-4 d-flex align-items-center gap-3">
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: "14px",
                    background: "rgba(249, 115, 22, 0.15)",
                    border: "1px solid rgba(249, 115, 22, 0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#F97316",
                    fontSize: "1.4rem",
                    flexShrink: 0,
                  }}
                >
                  <i className="bi bi-chat-dots"></i>
                </div>
                <div>
                  <div style={{ fontWeight: 800, color: "#FFFFFF", fontSize: "1rem" }}>Have a bespoke requirement?</div>
                  <div style={{ color: "#A1A1AA", fontSize: ".86rem" }}>We respond to consultations within 2 hours.</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="d-flex flex-column gap-3">
                {faqs.map((faq, i) => (
                  <div key={i} className="bento-card overflow-hidden" style={{ transition: "all .25s ease" }}>
                    <button
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        padding: "1.3rem 1.6rem",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "1rem",
                      }}
                    >
                      <span style={{ fontWeight: 700, fontSize: "1.05rem", fontFamily: "'Outfit', sans-serif" }}>{faq.q}</span>
                      <i className={`bi bi-chevron-${openFaqIndex === i ? "up text-warning" : "down text-muted"}`}></i>
                    </button>
                    {openFaqIndex === i && (
                      <div style={{ padding: "0 1.6rem 1.5rem", color: "#A1A1AA", fontSize: ".95rem", lineHeight: 1.7 }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── HIGH-CONVERTING CONTACT TERMINAL ─────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "9rem 0", background: "rgba(14, 11, 20, 0.5)", position: "relative", zIndex: 1 }}>
        <div className="container px-4 px-lg-5">
          <div className="row g-5 align-items-start">
            {/* Contact Details Column */}
            <div className="col-12 col-lg-5">
              <SectionHeading
                tag="Direct Consultation"
                title="Let's Build Something Exceptional"
                subtitle="Book an agile sprint or outline your project requirements below. We review every enquiry personally within 24 hours."
              />

              <div className="d-flex flex-column gap-3 mt-4">
                {[
                  { icon: "bi-envelope-at-fill", label: "Direct Studio Email", value: "anilpte232@gmail.com", href: "mailto:anilpte232@gmail.com" },
                  { icon: "bi-whatsapp", label: "Instant WhatsApp Direct", value: "+44 (UK Direct)", href: "https://wa.me/447700000000" },
                  { icon: "bi-geo-alt-fill", label: "Studio Headquarters", value: "London & UK (Global Remote Client Delivery)", href: null },
                ].map((item, i) => (
                  <div key={i} className="bento-card p-3 d-flex align-items-center gap-3">
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        background: "rgba(249, 115, 22, 0.12)",
                        border: "1px solid rgba(249, 115, 22, 0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#F97316",
                        fontSize: "1.2rem",
                        flexShrink: 0,
                      }}
                    >
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div>
                      <div style={{ color: "#71717A", fontSize: ".75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>
                        {item.label}
                      </div>
                      {item.href ? (
                        <a
                          href={item.href}
                          style={{ color: "#FFFFFF", fontSize: ".92rem", fontWeight: 700 }}
                          onMouseEnter={(e) => (e.target.style.color = "#F97316")}
                          onMouseLeave={(e) => (e.target.style.color = "#FFFFFF")}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <span style={{ color: "#FFFFFF", fontSize: ".92rem", fontWeight: 700 }}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form Terminal */}
            <div className="col-12 col-lg-7">
              <div className="bento-card p-4 p-xl-5">
                <h3 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Project Consultation Intake</h3>

                {formStatus === "success" && (
                  <div
                    style={{
                      background: "rgba(16, 185, 129, 0.15)",
                      border: "1px solid rgba(16, 185, 129, 0.35)",
                      borderRadius: "12px",
                      padding: "1.1rem 1.3rem",
                      color: "#6EE7B7",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".8rem",
                      fontSize: ".95rem",
                      fontWeight: 600,
                    }}
                  >
                    <i className="bi bi-check-circle-fill text-success fs-5"></i>
                    Thank you! Your project enquiry has been securely transmitted. We will reply within 24 hours.
                  </div>
                )}

                {formError && (
                  <div
                    style={{
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.35)",
                      borderRadius: "12px",
                      padding: "1.1rem 1.3rem",
                      color: "#FCA5A5",
                      marginBottom: "1.5rem",
                      display: "flex",
                      alignItems: "center",
                      gap: ".8rem",
                      fontSize: ".95rem",
                      fontWeight: 600,
                    }}
                  >
                    <i className="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
                    {formError}
                  </div>
                )}

                <form onSubmit={handleContactSubmit}>
                  {/* Invisible Honeypot */}
                  <div style={{ display: "none" }} aria-hidden="true">
                    <input
                      type="text"
                      name="company_website_hp"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex="-1"
                      autoComplete="off"
                    />
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: ".82rem", color: "#A1A1AA", fontWeight: 700, marginBottom: ".4rem", display: "block" }}>
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        maxLength={100}
                        required
                        placeholder="e.g. Maya Lin"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control cyber-input"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: ".82rem", color: "#A1A1AA", fontWeight: 700, marginBottom: ".4rem", display: "block" }}>
                        Business Email Address *
                      </label>
                      <input
                        type="email"
                        maxLength={254}
                        required
                        placeholder="maya@studio.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control cyber-input"
                      />
                    </div>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: ".82rem", color: "#A1A1AA", fontWeight: 700, marginBottom: ".4rem", display: "block" }}>
                        Service Tier Needed
                      </label>
                      <select value={service} onChange={(e) => setService(e.target.value)} className="form-select cyber-input">
                        <option value="Next-Gen Web Architecture">Next-Gen Web Architecture</option>
                        <option value="Luxury Brand & UI/UX Systems">Luxury Brand &amp; UI/UX Systems</option>
                        <option value="Social Growth & Viral Strategy">Social Growth &amp; Viral Strategy</option>
                        <option value="Sprint Launch (£299)">Sprint Launch (£299)</option>
                        <option value="Growth Scale (£699)">Growth Scale (£699)</option>
                        <option value="Studio Partner (£1,299)">Studio Partner (£1,299)</option>
                      </select>
                    </div>
                    <div className="col-12 col-sm-6">
                      <label style={{ fontSize: ".82rem", color: "#A1A1AA", fontWeight: 700, marginBottom: ".4rem", display: "block" }}>
                        Estimated Budget
                      </label>
                      <select value={budget} onChange={(e) => setBudget(e.target.value)} className="form-select cyber-input">
                        <option value="£300 - £700">£300 – £700</option>
                        <option value="£700 - £1,500">£700 – £1,500</option>
                        <option value="£1,500 - £3,000+">£1,500 – £3,000+</option>
                        <option value="Monthly Retainer">Monthly Retainer</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label style={{ fontSize: ".82rem", color: "#A1A1AA", fontWeight: 700, marginBottom: ".4rem", display: "block" }}>
                      Project Goals &amp; Overview *
                    </label>
                    <textarea
                      maxLength={3000}
                      required
                      placeholder="Tell us about your brand, timeline, and what you aim to achieve..."
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="form-control cyber-input"
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <ActionButton primary disabled={formStatus === "sending"} className="w-100" style={{ padding: "1.1rem", fontSize: "1.05rem" }}>
                    {formStatus === "sending" ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Transmitting Project Blueprint...
                      </>
                    ) : (
                      <>
                        Submit Project Consultation <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    )}
                  </ActionButton>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <footer
        style={{
          background: "rgba(6, 5, 9, 0.98)",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          padding: "5rem 0 2.5rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div className="container px-4 px-lg-5">
          <div className="row g-4 mb-5">
            <div className="col-12 col-lg-4">
              <a href="/" style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.2rem" }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, #EA580C, #F59E0B)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontWeight: 900,
                    fontSize: ".95rem",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  PB
                </div>
                <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: "#FFFFFF" }}>
                  PIXEL &amp; BRUSH
                </span>
              </a>
              <p style={{ color: "#A1A1AA", fontSize: ".9rem", lineHeight: 1.7, maxWidth: 320, marginBottom: "1.5rem" }}>
                Award-winning digital studio engineering high-velocity websites, luxury brand identities, and compounding growth systems.
              </p>
              <div className="d-flex gap-2">
                {[
                  { icon: "bi-linkedin", href: "https://linkedin.com", title: "LinkedIn" },
                  { icon: "bi-instagram", href: "https://instagram.com", title: "Instagram" },
                  { icon: "bi-github", href: "https://github.com", title: "GitHub" },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.title}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "12px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#A1A1AA",
                      fontSize: "1.1rem",
                      transition: "all .25s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(249, 115, 22, 0.2)";
                      e.currentTarget.style.borderColor = "rgba(249, 115, 22, 0.5)";
                      e.currentTarget.style.color = "#F97316";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255, 255, 255, 0.04)";
                      e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.08)";
                      e.currentTarget.style.color = "#A1A1AA";
                    }}
                  >
                    <i className={`bi ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-6 col-lg-2 offset-lg-1">
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: ".9rem", marginBottom: "1.2rem", fontFamily: "'Syne', sans-serif" }}>
                Capabilities
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {["Web Architecture", "Brand Identity", "UI/UX Design", "Social Growth", "Client Portal"].map((item, idx) => (
                  <li key={idx}>
                    <a
                      href="#services"
                      style={{ color: "#A1A1AA", fontSize: ".88rem" }}
                      onMouseEnter={(e) => (e.target.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.target.style.color = "#A1A1AA")}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: ".9rem", marginBottom: "1.2rem", fontFamily: "'Syne', sans-serif" }}>
                Explore
              </div>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: ".75rem" }}>
                {[
                  ["Selected Works", "#portfolio"],
                  ["Transparent Pricing", "#pricing"],
                  ["Client Sign In", "/login"],
                  ["Admin Terminal", "/admin"],
                  ["Start a Sprint", "#contact"],
                ].map(([label, href], idx) => (
                  <li key={idx}>
                    <a
                      href={href}
                      style={{ color: "#A1A1AA", fontSize: ".88rem" }}
                      onMouseEnter={(e) => (e.target.style.color = "#FFFFFF")}
                      onMouseLeave={(e) => (e.target.style.color = "#A1A1AA")}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-lg-3">
              <div style={{ color: "#FFFFFF", fontWeight: 800, fontSize: ".9rem", marginBottom: "1.2rem", fontFamily: "'Syne', sans-serif" }}>
                Direct Studio Access
              </div>
              <div style={{ color: "#A1A1AA", fontSize: ".88rem", lineHeight: 1.6, marginBottom: ".9rem" }}>
                Available for worldwide remote contracts &amp; UK client consultations.
              </div>
              <a href="mailto:anilpte232@gmail.com" style={{ color: "#F97316", fontSize: ".9rem", fontWeight: 700, display: "block", marginBottom: "1.2rem" }}>
                anilpte232@gmail.com
              </a>
              <ActionButton outline href="#contact" className="w-100" style={{ padding: ".75rem 1rem", fontSize: ".88rem" }}>
                Schedule Consultation →
              </ActionButton>
            </div>
          </div>

          <div
            className="pt-4 border-top d-flex flex-wrap justify-content-between align-items-center gap-3"
            style={{ borderColor: "rgba(255, 255, 255, 0.06) !important" }}
          >
            <div style={{ color: "#71717A", fontSize: ".85rem" }}>
              © {new Date().getFullYear()} Pixel &amp; Brush Digital Studio. Crafted with precision in the United Kingdom 🇬🇧.
            </div>
            <div style={{ color: "#71717A", fontSize: ".8rem", letterSpacing: ".06em", textTransform: "uppercase" }}>
              ALL RIGHTS RESERVED
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
