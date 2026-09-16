import { useState, useEffect, useRef } from "react";
import { supabase } from "./supabaseClient";

/* ── Global Styles & Typography ───────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body {
      background:#070A11;
      color:#E2E8F0;
      font-family:'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      overflow-x:hidden;
      cursor:none;
      letter-spacing: -0.01em;
    }

    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:#070A11; }
    ::-webkit-scrollbar-thumb { background:#1E293B; border-radius:4px; }
    ::-webkit-scrollbar-thumb:hover { background:#3B82F6; }

    /* Bootstrap Overrides */
    a { text-decoration: none; color: inherit; transition: all .25s ease; }
    a:hover { color: inherit; }
    h1, h2, h3, h4, h5, h6 {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-weight: 700;
      color: #FFFFFF;
      letter-spacing: -0.025em;
    }

    /* Keyframes */
    @keyframes floatSlow   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatPulse  { 0%,100%{opacity:.4;transform:scale(1)} 50%{opacity:.7;transform:scale(1.08)} }
    @keyframes pulseDot    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
    @keyframes ticker      { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes shimmerText { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes cardFadeUp  { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }
    @keyframes glowSweep   { 0%{left:-100%} 100%{left:200%} }
    @keyframes whatsappHop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }

    /* Reveal Animation Classes */
    .rv {
      opacity:0;
      transform:translateY(28px);
      transition:opacity .75s cubic-bezier(.16,1,.3,1), transform .75s cubic-bezier(.16,1,.3,1);
      will-change:opacity,transform;
    }
    .rv.vis { opacity:1; transform:none; }

    /* Gradient Typography */
    .grad-text {
      background: linear-gradient(135deg, #FFFFFF 20%, #93C5FD 70%, #38BDF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .grad-accent {
      background: linear-gradient(135deg, #60A5FA 0%, #38BDF8 50%, #818CF8 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* Glassmorphism Cards */
    .glass-card {
      background: rgba(15, 23, 42, 0.65);
      border: 1px solid rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-radius: 18px;
      transition: all .35s cubic-bezier(.16,1,.3,1);
    }
    .glass-card:hover {
      background: rgba(19, 29, 54, 0.85);
      border-color: rgba(96, 165, 250, 0.35);
      transform: translateY(-6px);
      box-shadow: 0 20px 45px rgba(0, 0, 0, 0.4), 0 0 35px rgba(59, 130, 246, 0.15);
    }

    /* Form Inputs */
    .pro-input {
      background: rgba(10, 15, 26, 0.85) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      color: #FFFFFF !important;
      border-radius: 10px !important;
      padding: .85rem 1.1rem !important;
      font-size: .92rem !important;
      font-family: 'Inter', sans-serif !important;
      transition: all .25s ease !important;
    }
    .pro-input:focus {
      border-color: #3B82F6 !important;
      background: rgba(15, 23, 42, 0.98) !important;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2) !important;
      color: #FFFFFF !important;
    }
    .pro-input::placeholder {
      color: #64748B !important;
    }

    /* Mobile Drawer */
    .mobile-drawer {
      position:fixed; top:0; right:0; bottom:0; width:300px;
      background:rgba(8, 12, 22, 0.98); border-left:1px solid rgba(255,255,255,0.08);
      backdrop-filter:blur(32px); z-index:1050;
      padding:5rem 2rem 2rem; display:flex; flex-direction:column; gap:.8rem;
      transform:translateX(100%); transition:transform .35s cubic-bezier(.16,1,.3,1);
    }
    .mobile-drawer.open { transform:translateX(0); }
    .mobile-overlay {
      position:fixed; inset:0; z-index:1040; background:rgba(0,0,0,.65);
      opacity:0; pointer-events:none; transition:opacity .3s;
    }
    .mobile-overlay.open { opacity:1; pointer-events:all; }

    @media (max-width:992px) {
      .desktop-nav { display:none !important; }
      .mobile-menu-btn { display:flex !important; }
    }
    @media (max-width:768px) {
      body { cursor:auto; }
    }
  `}</style>
);

/* ── Minimalist Cursor ────────────────────────────────────────────────────── */
const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const p = useRef({x:-100,y:-100}), l = useRef({x:-100,y:-100});
  useEffect(() => {
    const mv = e => { p.current = {x:e.clientX,y:e.clientY}; };
    window.addEventListener("mousemove", mv);
    const expand = () => ring.current && (ring.current.style.transform="scale(1.8)", ring.current.style.borderColor="rgba(96,165,250,0.8)");
    const shrink = () => ring.current && (ring.current.style.transform="scale(1)", ring.current.style.borderColor="rgba(59,130,246,0.45)");
    document.querySelectorAll("a,button,input,select,textarea").forEach(el => {
      el.addEventListener("mouseenter", expand);
      el.addEventListener("mouseleave", shrink);
    });
    let raf;
    const loop = () => {
      l.current.x += (p.current.x - l.current.x) * .14;
      l.current.y += (p.current.y - l.current.y) * .14;
      if (dot.current)  { dot.current.style.left=p.current.x-4+"px"; dot.current.style.top=p.current.y-4+"px"; }
      if (ring.current) { ring.current.style.left=l.current.x-18+"px"; ring.current.style.top=l.current.y-18+"px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",mv); };
  },[]);
  return (<>
    <div ref={dot} style={{position:"fixed",width:8,height:8,background:"#60A5FA",borderRadius:"50%",pointerEvents:"none",zIndex:9999,transition:"opacity .2s"}}/>
    <div ref={ring} style={{position:"fixed",width:36,height:36,border:"1.5px solid rgba(59,130,246,0.45)",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transition:"transform .25s ease, border-color .25s ease"}}/>
  </>);
};

/* ── Scroll Progress Indicator ───────────────────────────────────────────── */
const ScrollProgress = () => {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement;
      setW((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div style={{
      position:"fixed",top:0,left:0,height:3,zIndex:9997,
      width:`${w}%`,
      background:"linear-gradient(90deg,#2563EB,#38BDF8,#818CF8)",
      boxShadow:"0 0 10px rgba(56,189,248,0.5)",
      pointerEvents:"none",
      transition:"width .06s linear",
    }}/>
  );
};

/* ── Back to Top ─────────────────────────────────────────────────────────── */
const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 450);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{
        position:"fixed",bottom:"5.5rem",right:"1.8rem",zIndex:500,
        width:46,height:46,borderRadius:"12px",
        background:"rgba(15,23,42,0.85)",
        border:"1px solid rgba(255,255,255,0.12)",
        color:"#E2E8F0",fontSize:"1.1rem",cursor:"pointer",
        backdropFilter:"blur(16px)",
        boxShadow:"0 10px 25px rgba(0,0,0,0.35)",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"all .3s ease",
      }}
      onMouseEnter={e=>{e.currentTarget.style.borderColor="#3B82F6";e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.color="#38BDF8";}}
      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.transform="none";e.currentTarget.style.color="#E2E8F0";}}>
      <i className="bi bi-chevron-up"></i>
    </button>
  );
};

/* ── WhatsApp Floating Button ────────────────────────────────────────────── */
const WhatsApp = () => (
  <a
    href="https://wa.me/447700000000?text=Hi%20Pixel%20%26%20Brush%2C%20I%27d%20love%20to%20discuss%20a%20project!"
    target="_blank" rel="noopener noreferrer"
    aria-label="Direct WhatsApp Message"
    style={{
      position:"fixed",bottom:"1.8rem",right:"1.8rem",zIndex:500,
      width:52,height:52,borderRadius:"14px",
      background:"#25D366",
      boxShadow:"0 10px 25px rgba(37,211,102,0.35)",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:"1.5rem",color:"#FFFFFF",textDecoration:"none",
      animation:"whatsappHop 3s ease-in-out infinite",
      transition:"all .3s ease",
    }}
    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 15px 35px rgba(37,211,102,0.55)";e.currentTarget.style.transform="scale(1.08)";}}
    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 10px 25px rgba(37,211,102,0.35)";e.currentTarget.style.transform="none";}}>
    <i className="bi bi-whatsapp"></i>
  </a>
);

/* ── Ambient Studio Spotlight Background ─────────────────────────────────── */
const StudioAura = () => (
  <div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",overflow:"hidden"}}>
    {/* Primary Sapphire Cone */}
    <div style={{position:"absolute",top:"-15%",left:"25%",width:"65vw",height:"55vw",background:"radial-gradient(ellipse,rgba(37,99,235,0.12) 0%,rgba(14,165,233,0.03) 50%,transparent 70%)",filter:"blur(80px)",animation:"floatPulse 8s ease-in-out infinite"}}/>
    {/* Secondary Indigo Accent */}
    <div style={{position:"absolute",top:"40%",right:"-10%",width:"50vw",height:"50vw",background:"radial-gradient(circle,rgba(99,102,241,0.08) 0%,transparent 65%)",filter:"blur(90px)",animation:"floatPulse 10s ease-in-out infinite"}}/>
    {/* Subtle Grid Texture */}
    <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",backgroundSize:"60px 60px",opacity:0.6}}/>
  </div>
);

/* ── Button Component ────────────────────────────────────────────────────── */
const Button = ({children,primary,href,onClick,disabled,className="",outline}) => {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{
        display:"inline-flex",alignItems:"center",justifyContent:"center",gap:".6rem",
        padding:".85rem 1.8rem",borderRadius:"10px",
        fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:600,fontSize:".92rem",
        cursor:disabled?"not-allowed":"pointer",border:"none",textDecoration:"none",
        transition:"all .25s ease",
        letterSpacing:"-0.01em",
        opacity:disabled?.6:1,
        ...(primary
          ? {
              background:"linear-gradient(135deg,#2563EB,#1D4ED8)",
              color:"#FFFFFF",
              boxShadow:"0 8px 24px rgba(37,99,235,0.35)",
            }
          : outline
          ? {
              background:"rgba(255,255,255,0.03)",
              color:"#FFFFFF",
              border:"1px solid rgba(255,255,255,0.12)",
              backdropFilter:"blur(10px)",
            }
          : {
              background:"rgba(255,255,255,0.06)",
              color:"#E2E8F0",
              border:"1px solid rgba(255,255,255,0.08)",
            }),
      }}
      onMouseEnter={e=>{
        if(!disabled){
          if(primary){e.currentTarget.style.boxShadow="0 12px 30px rgba(37,99,235,0.55)";e.currentTarget.style.transform="translateY(-2px)";}
          else{e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";e.currentTarget.style.background="rgba(255,255,255,0.08)";e.currentTarget.style.transform="translateY(-2px)";}
        }
      }}
      onMouseLeave={e=>{
        if(!disabled){
          if(primary){e.currentTarget.style.boxShadow="0 8px 24px rgba(37,99,235,0.35)";e.currentTarget.style.transform="none";}
          else{e.currentTarget.style.borderColor=outline?"rgba(255,255,255,0.12)":"rgba(255,255,255,0.08)";e.currentTarget.style.background=outline?"rgba(255,255,255,0.03)":"rgba(255,255,255,0.06)";e.currentTarget.style.transform="none";}
        }
      }}>
      {children}
    </Tag>
  );
};

/* ── Animated Metric Counter ─────────────────────────────────────────────── */
const Metric = ({end,suffix=""}) => {
  const [n,setN]=useState(0);
  const ref=useRef(null),started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true; let v=0;
        const id=setInterval(()=>{v+=end/40;if(v>=end){setN(end);clearInterval(id);}else setN(Math.round(v));},30);
      }
    },{threshold:.2});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[end]);
  return <span ref={ref}>{n}{suffix}</span>;
};

/* ── Section Header ──────────────────────────────────────────────────────── */
const SectionHeader = ({badge,title,subtitle,center=false}) => (
  <div className={`mb-5 ${center ? "text-center mx-auto" : ""}`} style={{maxWidth:680}}>
    <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.2)",padding:".3rem .85rem",borderRadius:"100px",marginBottom:"1rem"}}>
      <span style={{width:6,height:6,background:"#38BDF8",borderRadius:"50%"}}/>
      <span style={{color:"#60A5FA",fontSize:".75rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase"}}>{badge}</span>
    </div>
    <h2 style={{fontSize:"clamp(2rem, 3.5vw, 2.8rem)",lineHeight:1.15,marginBottom:".9rem"}}>
      {title}
    </h2>
    {subtitle && <p style={{color:"#94A3B8",fontSize:"1.02rem",lineHeight:1.68,margin:0}}>{subtitle}</p>}
  </div>
);

/* ── Navigation ──────────────────────────────────────────────────────────── */
const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:1000,
        padding: scrolled ? ".8rem 0" : "1.4rem 0",
        transition:"all .35s ease",
      }}>
        <div className="container px-4 px-lg-5">
          <div style={{
            background: scrolled ? "rgba(11, 17, 30, 0.85)" : "rgba(15, 23, 42, 0.4)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: ".7rem 1.4rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: scrolled ? "0 10px 30px rgba(0,0,0,0.35)" : "none",
            transition: "all .3s ease",
          }}>
            {/* Brand Logo */}
            <a href="/" style={{display:"flex",alignItems:"center",gap:".75rem"}}>
              <div style={{
                width:36,height:36,borderRadius:"10px",
                background:"linear-gradient(135deg,#2563EB,#38BDF8)",
                display:"flex",alignItems:"center",justifyContent:"center",
                color:"#FFFFFF",fontWeight:800,fontSize:".95rem",
                boxShadow:"0 4px 14px rgba(37,99,235,0.4)"
              }}>PB</div>
              <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"#FFFFFF",letterSpacing:"-0.02em"}}>
                Pixel <span style={{color:"#38BDF8"}}>&amp;</span> Brush
              </span>
            </a>

            {/* Desktop Links */}
            <div className="desktop-nav d-flex align-items-center gap-4">
              {["Services", "Work", "Pricing", "Process", "FAQ", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase() === "work" ? "portfolio" : item.toLowerCase()}`}
                  style={{color:"#94A3B8",fontSize:".88rem",fontWeight:500,letterSpacing:"-0.01em"}}
                  onMouseEnter={e=>e.target.style.color="#FFFFFF"}
                  onMouseLeave={e=>e.target.style.color="#94A3B8"}
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="desktop-nav d-flex align-items-center gap-2">
              <a
                href="/login"
                style={{
                  padding:".6rem 1.1rem",borderRadius:"8px",
                  color:"#94A3B8",fontSize:".86rem",fontWeight:600,
                  border:"1px solid rgba(255,255,255,0.06)",
                  background:"rgba(255,255,255,0.02)",
                  transition:"all .2s ease"
                }}
                onMouseEnter={e=>{e.target.style.color="#FFFFFF";e.target.style.borderColor="rgba(255,255,255,0.15)";}}
                onMouseLeave={e=>{e.target.style.color="#94A3B8";e.target.style.borderColor="rgba(255,255,255,0.06)";}}
              >
                Client Portal
              </a>
              <Button primary href="#contact">
                Start a Project
              </Button>
            </div>

            {/* Mobile Toggle Button */}
            <button
              className="mobile-menu-btn d-none align-items-center justify-content-center"
              onClick={() => setMenuOpen(true)}
              aria-label="Open Navigation Menu"
              style={{
                width:40,height:40,borderRadius:"10px",
                background:"rgba(255,255,255,0.05)",
                border:"1px solid rgba(255,255,255,0.1)",
                color:"#FFFFFF",fontSize:"1.2rem",cursor:"pointer"
              }}
            >
              <i className="bi bi-list"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-overlay ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(false)}/>
      <div className={`mobile-drawer ${menuOpen ? "open" : ""}`}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1.5rem"}}>
          <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.2rem",color:"#FFFFFF"}}>Pixel &amp; Brush</span>
          <button onClick={() => setMenuOpen(false)} style={{background:"none",border:"none",color:"#94A3B8",fontSize:"1.4rem",cursor:"pointer"}}><i className="bi bi-x-lg"></i></button>
        </div>
        {["Services", "Pricing", "Portfolio", "Process", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setMenuOpen(false)}
            style={{padding:".75rem 0",color:"#94A3B8",fontSize:"1.05rem",fontWeight:500,borderBottom:"1px solid rgba(255,255,255,0.05)"}}
          >
            {item}
          </a>
        ))}
        <div style={{marginTop:"2rem",display:"flex",flexDirection:"column",gap:".8rem"}}>
          <a href="/login" onClick={() => setMenuOpen(false)} style={{textAlign:"center",padding:".85rem",borderRadius:"10px",border:"1px solid rgba(255,255,255,0.12)",color:"#FFFFFF",fontWeight:600}}>
            Client Portal
          </a>
          <Button primary href="#contact" onClick={() => setMenuOpen(false)}>
            Start a Project →
          </Button>
        </div>
      </div>
    </>
  );
};

/* ══════════════════════════════════════════════════════════════════════════ */
/* ── MAIN APPLICATION COMPONENT ──────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [openFaq, setOpenFaq] = useState(null);

  /* Form State */
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("Web Development & Architecture");
  const [message, setMessage] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formError, setFormError] = useState("");
  const [honeypot, setHoneypot] = useState("");

  /* Reveal Observer */
  useEffect(() => {
    const els = document.querySelectorAll(".rv");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("vis");
        }
      });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Data Collections */
  const services = [
    {
      icon: "bi-laptop",
      title: "Web Engineering & Architecture",
      desc: "High-performance websites and custom web applications built for speed, SEO domination, and seamless conversion. Zero bloated templates.",
      deliverables: ["Custom Full-Stack Development", "Technical SEO Architecture", "Supabase & API Integration", "Core Web Vitals 95+ Guarantee"]
    },
    {
      icon: "bi-palette-fill",
      title: "Brand Identity & UI/UX Design",
      desc: "Distinct visual identities, design systems, and conversion-optimized interfaces that position your brand at the absolute pinnacle of your industry.",
      deliverables: ["Logo & Brand Guidelines", "Interactive Figma Prototypes", "Marketing Collateral & Assets", "Design System Systems"]
    },
    {
      icon: "bi-graph-up-arrow",
      title: "Growth & Social Media Strategy",
      desc: "Data-driven creative strategy and social media management engineered to compound brand authority and generate consistent qualified leads.",
      deliverables: ["Monthly Content Calendars", "High-Converting Copywriting", "Audience Growth Campaigns", "ROI & Analytics Reporting"]
    },
  ];

  const portfolio = [
    {
      img: "/projects/KA.png",
      title: "Kashish Makeup Studio",
      category: "Web Engineering · Online Booking",
      desc: "Full bespoke studio website with an interactive service catalogue and automated appointment booking system.",
      badge: "Web Development"
    },
    {
      img: "/projects/vijaya.jpg",
      title: "Vijaya Pharma",
      category: "Brand Identity · Full Transformation",
      desc: "Comprehensive pharmaceutical visual identity, regulatory-compliant website, and multi-channel marketing assets.",
      badge: "Full Package"
    },
    {
      img: "/projects/kangaroo.jpg",
      title: "Kangaroo Education Foundation",
      category: "Social Growth · Digital Strategy",
      desc: "Targeted digital transformation delivering 300% qualified student enquiry growth within 60 days.",
      badge: "Social Strategy"
    },
  ];

  const pricingPlans = [
    {
      name: "Starter Launch",
      price: "£299",
      period: "Fixed Investment",
      desc: "Ideal for early-stage companies and professionals seeking a high-converting digital footprint.",
      features: [
        "Custom 5-Page Responsive Website",
        "Technical SEO & Speed Optimization",
        "Integrated Secure Contact Pipeline",
        "Mobile-First Experience",
        "30-Day Post-Launch Support"
      ],
      highlight: false,
      cta: "Select Starter"
    },
    {
      name: "Growth Scaler",
      price: "£699",
      period: "Most Popular",
      desc: "The complete package for established businesses ready to outrank and outperform competitors.",
      features: [
        "Up to 10 Bespoke Web Pages",
        "CMS Integration & Dynamic Content",
        "Full Brand Identity Polish",
        "Dedicated Client Portal Access",
        "Advanced Analytics & Tracking",
        "Priority 60-Day Aftercare"
      ],
      highlight: true,
      cta: "Claim Growth Package"
    },
    {
      name: "Enterprise Transformation",
      price: "£1,299",
      period: "Full Scale",
      desc: "Comprehensive digital domination combining custom web engineering, full branding, and growth management.",
      features: [
        "Unlimited Custom Pages & Flows",
        "E-Commerce or Web Application Engine",
        "Complete Brand Identity Suite",
        "3 Months Managed Social Strategy",
        "Dedicated Engineering Lead",
        "24/7 Priority SLA Support"
      ],
      highlight: false,
      cta: "Schedule Consultation"
    }
  ];

  const testimonials = [
    {
      quote: "Pixel & Brush completely elevated our studio's market position. The new platform is breathtaking and our client bookings doubled in the very first month.",
      name: "Kashish Sentury",
      role: "Founder & Creative Director",
      company: "Kashish Makeup Studio",
    },
    {
      quote: "Working with Anil was effortless. The strategic brand identity captures our exact clinical standards, and the website has earned immense praise from our partners.",
      name: "Aditya Acharya",
      role: "Managing Director",
      company: "Vijaya Pharma",
    },
    {
      quote: "Our social presence and organic reach expanded by over 300% in two months. The quality of execution and attention to detail is world-class.",
      name: "Dipesh Aryal",
      role: "Managing Director",
      company: "Kangaroo Education",
    }
  ];

  const steps = [
    {
      num: "01",
      title: "Strategic Discovery",
      desc: "We analyze your business objectives, target audience, and competitors to formulate an uncompromising project blueprint."
    },
    {
      num: "02",
      title: "Architecture & Design",
      desc: "Every pixel and user journey is prototyped in Figma with continuous stakeholder feedback and precision craft."
    },
    {
      num: "03",
      title: "Senior Engineering",
      desc: "Clean, performant code built with modern frameworks, rock-solid security, and lightning-fast load times."
    },
    {
      num: "04",
      title: "Launch & Growth",
      desc: "Zero-downtime deployment, technical validation, and 30 days of included executive aftercare support."
    }
  ];

  const faqList = [
    {
      q: "What is your typical project delivery timeline?",
      a: "Standard bespoke websites are delivered within 2 to 4 weeks. Larger web applications and comprehensive brand packages typically take 4 to 6 weeks. You receive a guaranteed fixed delivery timeline during our discovery consultation."
    },
    {
      q: "Do I own all code, assets, and intellectual property?",
      a: "100% yes. Upon project completion, full ownership of all source code, design assets, and database accounts is permanently transferred to you."
    },
    {
      q: "How does communication work during development?",
      a: "You receive direct access to your dedicated Client Portal where you can review live milestone progress, exchange messages, upload assets, and approve project stages in real-time."
    },
    {
      q: "Do you work with international clients outside the United Kingdom?",
      a: "Yes. While our headquarters are in the UK, over 40% of our portfolio clients are located across North America, Europe, and Asia. All communication and project handovers are seamlessly coordinated remotely."
    },
    {
      q: "What ongoing support is provided after launch?",
      a: "Every project includes 30 days of complimentary technical aftercare to ensure smooth operation. We also offer ongoing retainer support for continuous updates, SEO monitoring, and content maintenance."
    }
  ];

  /* ── Form Submission Handler ── */
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Honeypot anti-spam check
    if (honeypot) {
      setFormStatus("success");
      return;
    }

    // Rate limit cooldown (30s)
    const lastSent = parseInt(localStorage.getItem("pb_contact_cooldown") || "0", 10);
    const now = Date.now();
    if (now - lastSent < 30000) {
      const remaining = Math.ceil((30000 - (now - lastSent)) / 1000);
      setFormError(`Please wait ${remaining} seconds before submitting another enquiry.`);
      return;
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 254);
    const cleanMessage = message.trim().slice(0, 3000);

    if (!cleanName || !cleanEmail || !cleanMessage) {
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
      const { error } = await supabase.from("messages").insert([{
        sender_name: cleanName,
        sender_email: cleanEmail,
        service_needed: service,
        message: cleanMessage
      }]);

      if (error) {
        setFormError("Unable to submit message. Please email us directly at anilpte232@gmail.com.");
        setFormStatus("error");
        return;
      }

      localStorage.setItem("pb_contact_cooldown", Date.now().toString());
      setFormStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setFormStatus("idle"), 7000);
    } catch (err) {
      setFormError("An unexpected error occurred. Please try again later.");
      setFormStatus("error");
    }
  };

  return (
    <div style={{minHeight:"100vh",position:"relative",background:"#070A11",overflowX:"hidden"}}>
      <G/>
      <StudioAura/>
      <Cursor/>
      <ScrollProgress/>
      <BackToTop/>
      <WhatsApp/>
      <Navigation/>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── HERO SECTION ────────────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{padding:"9.5rem 0 6rem",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <div className="row align-items-center justify-content-between g-5">
            {/* Left Content */}
            <div className="col-12 col-lg-7">
              {/* Trust Badge */}
              <div style={{
                display:"inline-flex",alignItems:"center",gap:".6rem",
                background:"rgba(59,130,246,0.08)",border:"1px solid rgba(59,130,246,0.22)",
                padding:".4rem 1rem",borderRadius:"100px",marginBottom:"1.8rem"
              }}>
                <span style={{width:8,height:8,background:"#38BDF8",borderRadius:"50%",animation:"pulseDot 2s ease infinite"}}/>
                <span style={{color:"#93C5FD",fontSize:".78rem",fontWeight:700,letterSpacing:".06em",textTransform:"uppercase"}}>
                  UK Digital Studio · Accepting Q4 Client Work
                </span>
              </div>

              {/* Main Headline */}
              <h1 style={{
                fontSize:"clamp(2.6rem, 4.8vw, 4.2rem)",
                lineHeight:1.08,
                marginBottom:"1.4rem",
                letterSpacing:"-0.03em"
              }}>
                We Engineer <span className="grad-text">High-Impact</span> Digital Experiences &amp; Brands.
              </h1>

              {/* Sub-headline */}
              <p style={{
                color:"#94A3B8",
                fontSize:"clamp(1.05rem, 1.8vw, 1.25rem)",
                lineHeight:1.68,
                maxWidth:560,
                marginBottom:"2.4rem",
                fontWeight:400
              }}>
                Pixel &amp; Brush is a boutique UK digital studio. We build bespoke websites, elevated brand identities, and high-growth social media systems for ambitious businesses worldwide.
              </p>

              {/* CTAs */}
              <div className="d-flex flex-wrap gap-3 align-items-center mb-5">
                <Button primary href="#contact" style={{padding:"1rem 2.2rem",fontSize:"1rem"}}>
                  Start Your Project <i className="bi bi-arrow-right"></i>
                </Button>
                <Button outline href="#portfolio" style={{padding:"1rem 2rem",fontSize:"1rem"}}>
                  Explore Selected Work <i className="bi bi-arrow-up-right"></i>
                </Button>
              </div>

              {/* Metrics Row */}
              <div className="row g-4 pt-4 border-top" style={{borderColor:"rgba(255,255,255,0.08) !important"}}>
                <div className="col-4">
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3vw,2.4rem)",color:"#FFFFFF"}}>
                    <Metric end={15} suffix="+"/>
                  </div>
                  <div style={{color:"#64748B",fontSize:".75rem",fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginTop:".2rem"}}>
                    Delivered Projects
                  </div>
                </div>
                <div className="col-4">
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3vw,2.4rem)",color:"#FFFFFF"}}>
                    <Metric end={100} suffix="%"/>
                  </div>
                  <div style={{color:"#64748B",fontSize:".75rem",fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginTop:".2rem"}}>
                    On-Time Delivery
                  </div>
                </div>
                <div className="col-4">
                  <div style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"clamp(1.8rem,3vw,2.4rem)",color:"#FFFFFF"}}>
                    <Metric end={3} suffix=".2x"/>
                  </div>
                  <div style={{color:"#64748B",fontSize:".75rem",fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginTop:".2rem"}}>
                    Avg Client ROI
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column / Architectural Portrait Showcase */}
            <div className="col-12 col-lg-5 text-center">
              <div style={{position:"relative",maxWidth:380,margin:"0 auto"}}>
                {/* Floating Architectural Badge 1 */}
                <div style={{
                  position:"absolute",top:"8%",left:"-12%",zIndex:4,
                  background:"rgba(15,23,42,0.85)",border:"1px solid rgba(255,255,255,0.12)",
                  padding:".65rem 1rem",borderRadius:"12px",backdropFilter:"blur(16px)",
                  boxShadow:"0 12px 30px rgba(0,0,0,0.4)",textAlign:"left",animation:"floatSlow 6s ease-in-out infinite"
                }}>
                  <div style={{color:"#38BDF8",fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>Direct Senior Access</div>
                  <div style={{color:"#FFFFFF",fontSize:".9rem",fontWeight:700}}>No Junior Hand-offs</div>
                </div>

                {/* Floating Architectural Badge 2 */}
                <div style={{
                  position:"absolute",bottom:"12%",right:"-10%",zIndex:4,
                  background:"rgba(15,23,42,0.85)",border:"1px solid rgba(255,255,255,0.12)",
                  padding:".65rem 1rem",borderRadius:"12px",backdropFilter:"blur(16px)",
                  boxShadow:"0 12px 30px rgba(0,0,0,0.4)",textAlign:"left",animation:"floatSlow 5s ease-in-out 1s infinite"
                }}>
                  <div style={{color:"#4ADE80",fontSize:".72rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em"}}>Guaranteed SLA</div>
                  <div style={{color:"#FFFFFF",fontSize:".9rem",fontWeight:700}}>30-Day Aftercare Included</div>
                </div>

                {/* Frame & Cutout */}
                <div style={{
                  position:"relative",
                  borderRadius:"28px",
                  overflow:"hidden",
                  background:"linear-gradient(180deg, rgba(30,58,138,0.25) 0%, rgba(15,23,42,0.8) 100%)",
                  border:"1px solid rgba(255,255,255,0.12)",
                  aspectRatio:"4/5",
                  boxShadow:"0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
                }}>
                  <img
                    src="/me.png"
                    alt="Anil - Founder & Principal Designer"
                    style={{
                      width:"100%",height:"100%",
                      objectFit:"cover",objectPosition:"center top",
                      filter:"drop-shadow(0 15px 25px rgba(0,0,0,0.6))"
                    }}
                  />
                  <div style={{
                    position:"absolute",bottom:0,left:0,right:0,
                    background:"linear-gradient(to top, #070A11 15%, transparent 100%)",
                    padding:"2rem 1.5rem .8rem"
                  }}>
                    <div style={{fontWeight:800,fontSize:"1.1rem",color:"#FFFFFF"}}>Anil Pandey</div>
                    <div style={{color:"#94A3B8",fontSize:".8rem",fontWeight:500}}>Lead Engineer &amp; Creative Strategist</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── CLIENT TICKER MARQUEE ────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <div style={{
        overflow:"hidden",
        borderTop:"1px solid rgba(255,255,255,0.06)",
        borderBottom:"1px solid rgba(255,255,255,0.06)",
        padding:"1.1rem 0",
        background:"rgba(15,23,42,0.4)",
        position:"relative",zIndex:1
      }}>
        <div style={{display:"flex",gap:"3rem",whiteSpace:"nowrap",animation:"ticker 35s linear infinite"}}>
          {[...Array(2)].map((_, idx) => (
            <div key={idx} className="d-flex gap-5 align-items-center">
              {["Full-Stack Web Engineering", "Bespoke Brand Identity", "Conversion Rate Optimization", "UI/UX Architecture", "Scalable Cloud Systems", "High-Growth Social Strategy"].map((text, i) => (
                <div key={i} className="d-flex align-items-center gap-3">
                  <span style={{color:"#38BDF8",fontSize:".75rem"}}>✦</span>
                  <span style={{color:"#94A3B8",fontSize:".86rem",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>
                    {text}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── SERVICES / EXPERTISE ─────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="services" style={{padding:"8rem 0",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <SectionHeader
            badge="Our Capabilities"
            title="Engineered for Scalability &amp; Revenue"
            subtitle="We replace disjointed freelancers with a unified, senior-led digital agency delivering excellence at every step."
          />

          <div className="row g-4">
            {services.map((svc, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="glass-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div style={{
                      width:52,height:52,borderRadius:"12px",
                      background:"rgba(59,130,246,0.12)",border:"1px solid rgba(59,130,246,0.25)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"#38BDF8",fontSize:"1.4rem",marginBottom:"1.5rem"
                    }}>
                      <i className={`bi ${svc.icon}`}></i>
                    </div>
                    <h3 style={{fontSize:"1.35rem",marginBottom:".9rem"}}>{svc.title}</h3>
                    <p style={{color:"#94A3B8",fontSize:".92rem",lineHeight:1.68,marginBottom:"1.8rem"}}>
                      {svc.desc}
                    </p>
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"1.4rem",marginBottom:"2rem"}}>
                      <div style={{color:"#64748B",fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",marginBottom:".8rem"}}>
                        Key Deliverables
                      </div>
                      <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:".55rem"}}>
                        {svc.deliverables.map((item, idx) => (
                          <li key={idx} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".88rem",color:"#CBD5E1"}}>
                            <i className="bi bi-check2 text-primary"></i> {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button outline href="#contact" className="w-100">
                    Enquire for {svc.title.split(" ")[0]} →
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── SELECTED WORK / CASE STUDIES ─────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="portfolio" style={{padding:"8rem 0",background:"rgba(11,17,30,0.5)",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <SectionHeader
            badge="Selected Works"
            title="Proven Results for Real Businesses"
            subtitle="Explore how we have designed, built, and accelerated high-impact brands across diverse industries."
          />

          <div className="row g-4">
            {portfolio.map((item, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div className="glass-card h-100 overflow-hidden d-flex flex-column">
                  <div style={{position:"relative",height:220,overflow:"hidden",background:"#0F172A"}}>
                    <img
                      src={item.img}
                      alt={item.title}
                      style={{
                        width:"100%",height:"100%",objectFit:"cover",
                        transition:"transform .5s cubic-bezier(.16,1,.3,1)"
                      }}
                      onMouseEnter={e=>e.currentTarget.style.transform="scale(1.06)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}
                    />
                    <div style={{
                      position:"absolute",top:"1rem",right:"1rem",
                      background:"rgba(7,10,17,0.85)",border:"1px solid rgba(255,255,255,0.12)",
                      padding:".25rem .75rem",borderRadius:"100px",fontSize:".75rem",fontWeight:600,color:"#38BDF8",
                      backdropFilter:"blur(8px)"
                    }}>
                      {item.badge}
                    </div>
                  </div>
                  <div className="p-4 d-flex flex-column justify-content-between flex-grow-1">
                    <div>
                      <div style={{color:"#64748B",fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".06em",marginBottom:".4rem"}}>
                        {item.category}
                      </div>
                      <h3 style={{fontSize:"1.2rem",marginBottom:".6rem"}}>{item.title}</h3>
                      <p style={{color:"#94A3B8",fontSize:".88rem",lineHeight:1.6,marginBottom:"1.4rem"}}>
                        {item.desc}
                      </p>
                    </div>
                    <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:".4rem",color:"#60A5FA",fontSize:".86rem",fontWeight:600}}>
                      Request Case Study Blueprint <i className="bi bi-arrow-right"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── CLIENT TESTIMONIALS ──────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section style={{padding:"8rem 0",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <SectionHeader
            center
            badge="Client Feedback"
            title="Trusted by Visionary Founders"
            subtitle="Here is what founders and business leaders say about working with Pixel &amp; Brush."
          />

          <div className="row g-4 align-items-stretch">
            {testimonials.map((t, i) => (
              <div key={i} className="col-12 col-lg-4">
                <div className="glass-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between">
                  <div>
                    <div className="d-flex gap-1 mb-3" style={{color:"#F59E0B",fontSize:".95rem"}}>
                      {[...Array(5)].map((_, star) => (
                        <i key={star} className="bi bi-star-fill"></i>
                      ))}
                    </div>
                    <p style={{color:"#CBD5E1",fontSize:".98rem",lineHeight:1.75,fontStyle:"italic",marginBottom:"2rem"}}>
                      "{t.quote}"
                    </p>
                  </div>
                  <div className="d-flex align-items-center gap-3 pt-3 border-top" style={{borderColor:"rgba(255,255,255,0.08) !important"}}>
                    <div style={{
                      width:44,height:44,borderRadius:"50%",
                      background:"linear-gradient(135deg,#2563EB,#38BDF8)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"#FFFFFF",fontWeight:800,fontSize:"1rem",flexShrink:0
                    }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{color:"#FFFFFF",fontWeight:700,fontSize:".95rem"}}>{t.name}</div>
                      <div style={{color:"#64748B",fontSize:".8rem",fontWeight:500}}>{t.role} · {t.company}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── THE BLUEPRINT / PROCESS ──────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="process" style={{padding:"8rem 0",background:"rgba(11,17,30,0.5)",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <SectionHeader
            badge="The Process"
            title="Predictable, Seamless, Transparent"
            subtitle="From initial discovery to launch, our streamlined 4-step framework guarantees execution on time and within budget."
          />

          <div className="row g-4">
            {steps.map((s, i) => (
              <div key={i} className="col-12 col-sm-6 col-lg-3">
                <div className="glass-card p-4 h-100">
                  <div style={{
                    fontFamily:"'Plus Jakarta Sans',sans-serif",
                    fontWeight:800,fontSize:"2.2rem",color:"#38BDF8",
                    opacity:0.85,marginBottom:"1rem"
                  }}>
                    {s.num}
                  </div>
                  <h3 style={{fontSize:"1.15rem",marginBottom:".6rem"}}>{s.title}</h3>
                  <p style={{color:"#94A3B8",fontSize:".88rem",lineHeight:1.65,margin:0}}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── TRANSPARENT PRICING ──────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="pricing" style={{padding:"8rem 0",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <SectionHeader
            center
            badge="Transparent Packages"
            title="Clear Investments, Zero Hidden Fees"
            subtitle="Choose the right package for your stage of growth. Every tier includes free 30-day post-launch technical support."
          />

          <div className="row g-4 justify-content-center align-items-stretch">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="col-12 col-md-6 col-lg-4">
                <div
                  className="glass-card p-4 p-xl-5 h-100 d-flex flex-column justify-content-between position-relative"
                  style={plan.highlight ? {
                    borderColor:"rgba(59,130,246,0.5)",
                    background:"linear-gradient(180deg, rgba(30,58,138,0.2) 0%, rgba(15,23,42,0.85) 100%)",
                    boxShadow:"0 20px 50px rgba(37,99,235,0.2)"
                  } : {}}
                >
                  {plan.highlight && (
                    <div style={{
                      position:"absolute",top:-12,left:"50%",transform:"translateX(-50%)",
                      background:"linear-gradient(135deg,#2563EB,#38BDF8)",
                      padding:".3rem 1.1rem",borderRadius:"100px",fontSize:".75rem",fontWeight:700,
                      color:"#FFFFFF",letterSpacing:".08em",textTransform:"uppercase",boxShadow:"0 4px 15px rgba(37,99,235,0.4)"
                    }}>
                      ⭐ Most Popular
                    </div>
                  )}
                  <div>
                    <div style={{color:"#60A5FA",fontSize:".8rem",fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginBottom:".5rem"}}>
                      {plan.name}
                    </div>
                    <div className="d-flex align-items-baseline gap-2 mb-2">
                      <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"3rem",color:"#FFFFFF"}}>
                        {plan.price}
                      </span>
                      <span style={{color:"#64748B",fontSize:".85rem",fontWeight:500}}>
                        / {plan.period}
                      </span>
                    </div>
                    <p style={{color:"#94A3B8",fontSize:".88rem",lineHeight:1.6,marginBottom:"1.8rem"}}>
                      {plan.desc}
                    </p>
                    <div style={{borderTop:"1px solid rgba(255,255,255,0.06)",paddingTop:"1.4rem",marginBottom:"2rem"}}>
                      <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:".65rem"}}>
                        {plan.features.map((feat, idx) => (
                          <li key={idx} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".88rem",color:"#CBD5E1"}}>
                            <i className="bi bi-check-circle-fill text-primary" style={{fontSize:".95rem"}}></i>
                            {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Button primary={plan.highlight} outline={!plan.highlight} href="#contact" className="w-100">
                    {plan.cta}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── FAQ ACCORDION ────────────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="faq" style={{padding:"8rem 0",background:"rgba(11,17,30,0.5)",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <div className="row g-5 align-items-start">
            <div className="col-12 col-lg-5">
              <SectionHeader
                badge="Knowledge Base"
                title="Frequently Asked Questions"
                subtitle="Everything you need to know about our billing, deliverables, communication, and engineering workflow."
              />
              <div className="glass-card p-4 d-flex align-items-center gap-3">
                <div style={{width:44,height:44,borderRadius:"10px",background:"rgba(59,130,246,0.15)",display:"flex",alignItems:"center",justifyContent:"center",color:"#38BDF8",fontSize:"1.3rem"}}>
                  <i className="bi bi-headset"></i>
                </div>
                <div>
                  <div style={{fontWeight:700,color:"#FFFFFF",fontSize:".95rem"}}>Have a unique question?</div>
                  <div style={{color:"#94A3B8",fontSize:".84rem"}}>We respond to enquiries within 2 hours.</div>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="d-flex flex-column gap-3">
                {faqList.map((faq, i) => (
                  <div key={i} className="glass-card overflow-hidden" style={{transition:"all .25s ease"}}>
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{
                        width:"100%",textAlign:"left",background:"none",border:"none",
                        padding:"1.3rem 1.5rem",color:"#FFFFFF",cursor:"pointer",
                        display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1rem"
                      }}
                    >
                      <span style={{fontWeight:700,fontSize:"1rem",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>{faq.q}</span>
                      <i className={`bi bi-chevron-${openFaq === i ? "up text-primary" : "down text-muted"}`}></i>
                    </button>
                    {openFaq === i && (
                      <div style={{padding:"0 1.5rem 1.4rem",color:"#94A3B8",fontSize:".92rem",lineHeight:1.7}}>
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
      {/* ── CONTACT & CONSULTATION FLOW ──────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" style={{padding:"9rem 0",position:"relative",zIndex:1}}>
        <div className="container px-4 px-lg-5">
          <div className="row g-5 align-items-start">
            {/* Contact Details */}
            <div className="col-12 col-lg-5">
              <SectionHeader
                badge="Start a Conversation"
                title="Let's Build Something Exceptional"
                subtitle="Book a consultation or submit your project requirements below. We review every enquiry and reply within 24 hours."
              />

              <div className="d-flex flex-column gap-3 mt-4">
                {[
                  {icon:"bi-envelope-fill",label:"Direct Email",value:"anilpte232@gmail.com",href:"mailto:anilpte232@gmail.com"},
                  {icon:"bi-linkedin",label:"LinkedIn Professional",value:"linkedin.com/in/Anil pandey",href:"https://linkedin.com"},
                  {icon:"bi-geo-alt-fill",label:"Operating Headquarters",value:"London & United Kingdom (Global Remote)",href:null}
                ].map((item, i) => (
                  <div key={i} className="glass-card p-3 d-flex align-items-center gap-3">
                    <div style={{
                      width:42,height:42,borderRadius:"10px",
                      background:"rgba(59,130,246,0.1)",border:"1px solid rgba(59,130,246,0.2)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"#38BDF8",fontSize:"1.1rem"
                    }}>
                      <i className={`bi ${item.icon}`}></i>
                    </div>
                    <div>
                      <div style={{color:"#64748B",fontSize:".75rem",fontWeight:600,textTransform:"uppercase",letterSpacing:".05em"}}>{item.label}</div>
                      {item.href ? (
                        <a href={item.href} style={{color:"#E2E8F0",fontSize:".9rem",fontWeight:600}} onMouseEnter={e=>e.target.style.color="#60A5FA"} onMouseLeave={e=>e.target.style.color="#E2E8F0"}>
                          {item.value}
                        </a>
                      ) : (
                        <span style={{color:"#E2E8F0",fontSize:".9rem",fontWeight:600}}>{item.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-12 col-lg-7">
              <div className="glass-card p-4 p-xl-5">
                <h3 style={{fontSize:"1.4rem",marginBottom:"1.5rem"}}>Project Enquiry Form</h3>

                {formStatus === "success" && (
                  <div style={{
                    background:"rgba(34,197,94,0.15)",border:"1px solid rgba(34,197,94,0.3)",
                    borderRadius:"10px",padding:"1rem 1.2rem",color:"#86EFAC",marginBottom:"1.5rem",
                    display:"flex",alignItems:"center",gap:".75rem",fontSize:".92rem",fontWeight:600
                  }}>
                    <i className="bi bi-check-circle-fill text-success fs-5"></i>
                    Thank you! Your enquiry has been received. We will be in touch within 24 hours.
                  </div>
                )}

                {formError && (
                  <div style={{
                    background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",
                    borderRadius:"10px",padding:"1rem 1.2rem",color:"#FCA5A5",marginBottom:"1.5rem",
                    display:"flex",alignItems:"center",gap:".75rem",fontSize:".92rem",fontWeight:600
                  }}>
                    <i className="bi bi-exclamation-triangle-fill text-danger fs-5"></i>
                    {formError}
                  </div>
                )}

                <form onSubmit={handleContactSubmit}>
                  {/* Invisible Honeypot */}
                  <div style={{display:"none"}} aria-hidden="true">
                    <input type="text" name="company_website_hp" value={honeypot} onChange={e=>setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off"/>
                  </div>

                  <div className="row g-3 mb-3">
                    <div className="col-12 col-sm-6">
                      <label style={{fontSize:".8rem",color:"#94A3B8",fontWeight:600,marginBottom:".4rem",display:"block"}}>Your Full Name *</label>
                      <input
                        type="text"
                        maxLength={100}
                        required
                        placeholder="e.g. Alexander Vance"
                        value={name}
                        onChange={e=>setName(e.target.value)}
                        className="form-control pro-input"
                      />
                    </div>
                    <div className="col-12 col-sm-6">
                      <label style={{fontSize:".8rem",color:"#94A3B8",fontWeight:600,marginBottom:".4rem",display:"block"}}>Business Email Address *</label>
                      <input
                        type="email"
                        maxLength={254}
                        required
                        placeholder="alexander@company.com"
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                        className="form-control pro-input"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label style={{fontSize:".8rem",color:"#94A3B8",fontWeight:600,marginBottom:".4rem",display:"block"}}>Primary Service of Interest</label>
                    <select
                      value={service}
                      onChange={e=>setService(e.target.value)}
                      className="form-select pro-input"
                    >
                      <option value="Web Engineering & Architecture">Web Engineering &amp; Architecture</option>
                      <option value="Brand Identity & UI/UX Design">Brand Identity &amp; UI/UX Design</option>
                      <option value="Growth & Social Media Strategy">Growth &amp; Social Media Strategy</option>
                      <option value="Full Enterprise Transformation">Full Enterprise Transformation (All Services)</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label style={{fontSize:".8rem",color:"#94A3B8",fontWeight:600,marginBottom:".4rem",display:"block"}}>Project Scope &amp; Vision *</label>
                    <textarea
                      maxLength={3000}
                      required
                      placeholder="Briefly describe your goals, timeline, and current challenges..."
                      rows={4}
                      value={message}
                      onChange={e=>setMessage(e.target.value)}
                      className="form-control pro-input"
                      style={{resize:"vertical"}}
                    />
                  </div>

                  <Button primary disabled={formStatus==="sending"} className="w-100" style={{padding:"1rem",fontSize:"1rem"}}>
                    {formStatus === "sending" ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Transmitting Enquiry...
                      </>
                    ) : (
                      <>
                        Submit Project Consultation Request <i className="bi bi-arrow-right ms-2"></i>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <footer style={{
        background:"rgba(7,10,17,0.95)",
        borderTop:"1px solid rgba(255,255,255,0.08)",
        padding:"5rem 0 2.5rem",
        position:"relative",zIndex:1
      }}>
        <div className="container px-4 px-lg-5">
          <div className="row g-4 mb-5">
            <div className="col-12 col-lg-4">
              <a href="/" style={{display:"flex",alignItems:"center",gap:".75rem",marginBottom:"1.2rem"}}>
                <div style={{
                  width:34,height:34,borderRadius:"8px",
                  background:"linear-gradient(135deg,#2563EB,#38BDF8)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:"#FFFFFF",fontWeight:800,fontSize:".9rem"
                }}>PB</div>
                <span style={{fontFamily:"'Plus Jakarta Sans',sans-serif",fontWeight:800,fontSize:"1.15rem",color:"#FFFFFF"}}>
                  Pixel &amp; Brush
                </span>
              </a>
              <p style={{color:"#94A3B8",fontSize:".88rem",lineHeight:1.7,maxWidth:320,marginBottom:"1.5rem"}}>
                Boutique UK digital studio delivering award-winning websites, brand identities, and growth engineering for ambitious modern brands.
              </p>
              <div className="d-flex gap-2">
                {[
                  {icon:"bi-linkedin",href:"https://linkedin.com",title:"LinkedIn"},
                  {icon:"bi-instagram",href:"https://instagram.com",title:"Instagram"},
                  {icon:"bi-github",href:"https://github.com",title:"GitHub"}
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.title}
                    style={{
                      width:38,height:38,borderRadius:"10px",
                      background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",
                      display:"flex",alignItems:"center",justifyContent:"center",
                      color:"#94A3B8",fontSize:"1rem",transition:"all .25s ease"
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(59,130,246,0.15)";e.currentTarget.style.borderColor="rgba(59,130,246,0.4)";e.currentTarget.style.color="#38BDF8";}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(255,255,255,0.04)";e.currentTarget.style.borderColor="rgba(255,255,255,0.08)";e.currentTarget.style.color="#94A3B8";}}
                  >
                    <i className={`bi ${s.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="col-6 col-lg-2 offset-lg-1">
              <div style={{color:"#FFFFFF",fontWeight:700,fontSize:".88rem",marginBottom:"1.2rem",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Capabilities</div>
              <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:".7rem"}}>
                {["Web Engineering", "Brand Identity", "UI/UX Architecture", "Growth Strategy", "Client Portal"].map((item, idx) => (
                  <li key={idx}>
                    <a href="#services" style={{color:"#94A3B8",fontSize:".85rem"}} onMouseEnter={e=>e.target.style.color="#FFFFFF"} onMouseLeave={e=>e.target.style.color="#94A3B8"}>{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-6 col-lg-2">
              <div style={{color:"#FFFFFF",fontWeight:700,fontSize:".88rem",marginBottom:"1.2rem",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Navigation</div>
              <ul style={{listStyle:"none",padding:0,margin:0,display:"flex",flexDirection:"column",gap:".7rem"}}>
                {[
                  ["Selected Work", "#portfolio"],
                  ["Pricing & Packages", "#pricing"],
                  ["Agency Process", "#process"],
                  ["Client Sign In", "/login"],
                  ["Start a Project", "#contact"]
                ].map(([label, href], idx) => (
                  <li key={idx}>
                    <a href={href} style={{color:"#94A3B8",fontSize:".85rem"}} onMouseEnter={e=>e.target.style.color="#FFFFFF"} onMouseLeave={e=>e.target.style.color="#94A3B8"}>{label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-12 col-lg-3">
              <div style={{color:"#FFFFFF",fontWeight:700,fontSize:".88rem",marginBottom:"1.2rem",fontFamily:"'Plus Jakarta Sans',sans-serif"}}>Direct Studio Contact</div>
              <div style={{color:"#94A3B8",fontSize:".86rem",lineHeight:1.6,marginBottom:".8rem"}}>
                Available for worldwide remote contracts &amp; UK client consultations.
              </div>
              <a href="mailto:anilpte232@gmail.com" style={{color:"#38BDF8",fontSize:".88rem",fontWeight:600,display:"block",marginBottom:"1rem"}}>
                anilpte232@gmail.com
              </a>
              <Button outline href="#contact" className="w-100" style={{padding:".65rem 1rem",fontSize:".85rem"}}>
                Book 15-Min Discovery →
              </Button>
            </div>
          </div>

          <div className="pt-4 border-top d-flex flex-wrap justify-content-between align-items-center gap-3" style={{borderColor:"rgba(255,255,255,0.06) !important"}}>
            <div style={{color:"#64748B",fontSize:".82rem"}}>
              © {new Date().getFullYear()} Pixel &amp; Brush Digital Studio. All rights reserved. Registered in the United Kingdom.
            </div>
            <div style={{color:"#64748B",fontSize:".78rem",letterSpacing:".05em",textTransform:"uppercase"}}>
              BUILT WITH PRECISION IN THE UK 🇬🇧
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
