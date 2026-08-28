import { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient";

/* ── Global Styles ───────────────────────────────────────────────────────── */
const G = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@500;600;700;800&family=Outfit:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { background:#060912; color:#e8edf7; font-family:'Outfit',sans-serif; overflow-x:hidden; cursor:none; }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:#060912; }
    ::-webkit-scrollbar-thumb { background:#1e3a8a; border-radius:2px; }

    @keyframes floatY    { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-16px)} }
    @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes ticker    { from{transform:translateX(0)} to{transform:translateX(-50%)} }
    @keyframes scanline  { 0%{top:-30%;opacity:.7} 100%{top:130%;opacity:0} }
    @keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
    @keyframes nameReveal { 0%{opacity:0;clip-path:inset(0 100% 0 0)} 100%{opacity:1;clip-path:inset(0 0% 0 0)} }
    @keyframes taglineIn  { 0%{opacity:0;transform:translateY(14px)} 100%{opacity:1;transform:translateY(0)} }
    @keyframes photoFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
    @keyframes glowPulse  { 0%,100%{opacity:.5} 50%{opacity:1} }
    @keyframes charIn {
      0%   { opacity:0; transform:translateY(60px) rotateX(-90deg); filter:blur(8px); }
      60%  { opacity:1; filter:blur(0); }
      100% { opacity:1; transform:translateY(0) rotateX(0deg); }
    }
    @keyframes shimmerSweep { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes hexShimmer { 0%{opacity:.04} 50%{opacity:.13} 100%{opacity:.04} }
    @keyframes hexPulse   { 0%,100%{stroke-opacity:.04} 50%{stroke-opacity:.22} }
    @keyframes bgRay      { 0%{transform:rotate(0deg) scaleY(1);opacity:.06} 50%{transform:rotate(180deg) scaleY(1.2);opacity:.13} 100%{transform:rotate(360deg) scaleY(1);opacity:.06} }
    @keyframes matrixRain { 0%{transform:translateY(-100%);opacity:1} 100%{transform:translateY(200vh);opacity:0} }
    @keyframes vortexSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    @keyframes gridPulse  { 0%,100%{opacity:.03} 50%{opacity:.09} }
    @keyframes neonFlicker { 0%,19%,21%,23%,25%,54%,56%,100%{text-shadow:0 0 8px #60a5fa,0 0 20px #2563eb,0 0 40px #1e3a8a} 20%,24%,55%{text-shadow:none} }
    @keyframes strokeDraw { from{stroke-dashoffset:1000;opacity:0} to{stroke-dashoffset:0;opacity:1} }
    @keyframes dotMeet    { 0%{opacity:0;transform:scale(0)} 60%{opacity:1;transform:scale(1.4)} 100%{opacity:1;transform:scale(1)} }
    @keyframes loaderOut  { to{opacity:0;transform:scale(1.03)} }
    @keyframes starPop {
      0%   { opacity:0; transform:scale(0) rotate(-30deg); }
      60%  { opacity:1; transform:scale(1.15) rotate(5deg); }
      100% { opacity:1; transform:scale(1) rotate(0); }
    }
    @keyframes ctaGlow {
      0%,100% { box-shadow:0 0 40px rgba(37,99,235,.2),inset 0 1px 0 rgba(96,165,250,.06); }
      50%     { box-shadow:0 0 90px rgba(34,211,238,.25),inset 0 1px 0 rgba(34,211,238,.12); }
    }
    @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
    @keyframes typeIn { from{width:0} to{width:100%} }
    @keyframes faqOpen { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
    @keyframes pricePop { 0%{transform:scale(.96)} 60%{transform:scale(1.02)} 100%{transform:scale(1)} }
    @keyframes whatsappBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
    @keyframes toastIn { from{opacity:0;transform:translateX(100px)} to{opacity:1;transform:none} }

    .char-wrap { display:inline-block; overflow:hidden; vertical-align:bottom; }
    .char { display:inline-block; animation:charIn .7s cubic-bezier(.22,1,.36,1) both; }
    .shimmer-text {
      background:linear-gradient(90deg,#60a5fa 0%,#e8edf7 30%,#22d3ee 50%,#e8edf7 70%,#60a5fa 100%);
      background-size:200% auto;
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      animation:shimmerSweep 3s linear infinite;
    }
    .rv {
      opacity:0;
      transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1);
      will-change:opacity,transform;
    }
    .rv.up    { transform:translateY(52px) scale(.97); }
    .rv.down  { transform:translateY(-52px) scale(.97); }
    .rv.left  { transform:translateX(-52px) scale(.97); }
    .rv.right { transform:translateX(52px)  scale(.97); }
    .rv.sc    { transform:scale(.88); }
    .rv.vis   { opacity:1; transform:none; }

    .mobile-drawer {
      position:fixed; top:0; right:0; bottom:0; width:285px;
      background:rgba(4,5,15,.98); border-left:1px solid rgba(37,99,235,.22);
      backdrop-filter:blur(30px); z-index:800;
      padding:5.5rem 1.8rem 2rem; display:flex; flex-direction:column; gap:.4rem;
      transform:translateX(100%); transition:transform .4s cubic-bezier(.22,1,.36,1);
    }
    .mobile-drawer.open { transform:translateX(0); }
    .mobile-overlay {
      position:fixed; inset:0; z-index:799; background:rgba(0,0,0,.55);
      opacity:0; pointer-events:none; transition:opacity .35s;
    }
    .mobile-overlay.open { opacity:1; pointer-events:all; }

    .faq-answer { animation:faqOpen .3s ease both; }
    .price-card-pop { animation:pricePop .45s cubic-bezier(.22,1,.36,1) both; }

    @media (max-width:900px) {
      .nav-links { display:none !important; }
      .nav-btns  { display:none !important; }
      .hamburger { display:flex !important; }
    }
    @media (max-width:768px) {
      body { cursor:auto; }
    }
  `}</style>
);

/* ── Bidirectional scroll reveal ─────────────────────────────────────────── */
const useReveal = () => {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".rv"));
    const map = new Map();
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const coming = e.isIntersecting;
        if (coming) {
          const d = parseFloat(e.target.dataset.delay || 0);
          setTimeout(() => e.target.classList.add("vis"), d * 1000);
        } else {
          if (map.has(e.target)) {
            e.target.classList.remove("vis");
            const rect = e.target.getBoundingClientRect();
            const isBelow = rect.top > window.innerHeight / 2;
            const base = e.target.dataset.dir || "up";
            e.target.classList.remove("up","down","left","right","sc");
            if (base === "left" || base === "right") {
              e.target.classList.add(isBelow ? "left" : "right");
            } else {
              e.target.classList.add(isBelow ? "up" : "down");
            }
          }
        }
        map.set(e.target, coming);
      });
    }, { threshold: 0.1 });
    els.forEach(el => { el.classList.add(el.dataset.dir || "up"); obs.observe(el); });
    return () => obs.disconnect();
  }, []);
};

/* ── Cursor ──────────────────────────────────────────────────────────────── */
const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const p = useRef({x:0,y:0}), l = useRef({x:0,y:0});
  useEffect(() => {
    const mv = e => { p.current = {x:e.clientX,y:e.clientY}; };
    window.addEventListener("mousemove", mv);
    const g = () => ring.current && (ring.current.style.transform="scale(2)");
    const s = () => ring.current && (ring.current.style.transform="scale(1)");
    document.querySelectorAll("a,button,[data-hover]").forEach(el => {
      el.addEventListener("mouseenter",g); el.addEventListener("mouseleave",s);
    });
    let raf;
    const loop = () => {
      l.current.x += (p.current.x - l.current.x) * .1;
      l.current.y += (p.current.y - l.current.y) * .1;
      if (dot.current)  { dot.current.style.left=p.current.x-5+"px"; dot.current.style.top=p.current.y-5+"px"; }
      if (ring.current) { ring.current.style.left=l.current.x-20+"px"; ring.current.style.top=l.current.y-20+"px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",mv); };
  },[]);
  return (<>
    <div ref={dot}  style={{position:"fixed",width:10,height:10,background:"#60a5fa",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"screen"}}/>
    <div ref={ring} style={{position:"fixed",width:40,height:40,border:"1.5px solid #2563eb",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transition:"transform .35s cubic-bezier(.22,1,.36,1)",mixBlendMode:"screen"}}/>
  </>);
};

/* ── Scroll Progress Bar ─────────────────────────────────────────────────── */
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
      background:"linear-gradient(90deg,#1e3a8a,#2563eb,#22d3ee)",
      boxShadow:"0 0 12px rgba(34,211,238,.6)",
      pointerEvents:"none",
      transition:"width .08s linear",
    }}/>
  );
};

/* ── Back to Top ─────────────────────────────────────────────────────────── */
const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{
        position:"fixed",bottom:"5.5rem",right:"1.8rem",zIndex:600,
        width:46,height:46,borderRadius:"50%",
        background:"linear-gradient(135deg,#1e3a8a,#2563eb)",
        border:"1px solid rgba(37,99,235,.55)",
        color:"#fff",fontSize:"1.1rem",cursor:"pointer",
        boxShadow:"0 0 22px rgba(37,99,235,.45)",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"box-shadow .3s,transform .3s",
      }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 36px rgba(37,99,235,.7)";e.currentTarget.style.transform="scale(1.1)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 22px rgba(37,99,235,.45)";e.currentTarget.style.transform="none";}}>
      ↑
    </button>
  );
};

/* ── WhatsApp Button ─────────────────────────────────────────────────────── */
const WhatsApp = () => (
  <a
    href="https://wa.me/447700000000?text=Hi%20Pixel%20%26%20Brush%2C%20I%27d%20love%20to%20discuss%20a%20project!"
    target="_blank" rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    style={{
      position:"fixed",bottom:"1.8rem",right:"1.8rem",zIndex:600,
      width:52,height:52,borderRadius:"50%",
      background:"#25D366",
      boxShadow:"0 0 22px rgba(37,211,102,.5)",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:"1.5rem",textDecoration:"none",
      animation:"whatsappBounce 2.5s ease-in-out infinite",
      transition:"box-shadow .3s,transform .3s",
    }}
    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 36px rgba(37,211,102,.8)";e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.animation="none";}}
    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 22px rgba(37,211,102,.5)";e.currentTarget.style.transform="none";e.currentTarget.style.animation="whatsappBounce 2.5s ease-in-out infinite";}}>
    💬
  </a>
);

/* ── Background Canvas ───────────────────────────────────────────────────── */
const HexMesh = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    const HEX = 38;
    const cols = Math.ceil(W/(HEX*1.75))+2;
    const rows = Math.ceil(H/(HEX*1.55))+2;
    const hexes = [];
    for(let r=0;r<rows;r++) for(let c=0;c<cols;c++) {
      hexes.push({
        x: c*HEX*1.75-HEX, y: r*HEX*1.55+(c%2===0?0:HEX*.78)-HEX,
        phase: Math.random()*Math.PI*2, speed: .0003+Math.random()*.0005,
        bright: Math.random()<.05, color: Math.random()<.15?"34,211,238":"40,90,200",
      });
    }
    const COLS = Math.floor(W/20);
    const drops = Array.from({length:COLS},()=>({
      y: Math.random()*-H, speed: 1.5+Math.random()*3,
      opacity: .03+Math.random()*.05, char: ()=>String.fromCharCode(0x30A0+Math.random()*96),
    }));
    const rings = Array.from({length:5},(_,i)=>({
      r:80+i*90, speed:.0003*(i%2===0?1:-1),
      angle:Math.random()*Math.PI*2, opacity:.04+i*.015, dashes:6+i*2,
    }));
    const drawHex=(x,y,size,alpha,col)=>{
      ctx.beginPath();
      for(let i=0;i<6;i++){
        const a=(Math.PI/180)*(60*i-30);
        i===0?ctx.moveTo(x+size*Math.cos(a),y+size*Math.sin(a)):ctx.lineTo(x+size*Math.cos(a),y+size*Math.sin(a));
      }
      ctx.closePath(); ctx.strokeStyle=`rgba(${col},${alpha})`; ctx.lineWidth=.7; ctx.stroke();
      if(alpha>.12){ctx.fillStyle=`rgba(${col},${alpha*.15})`;ctx.fill();}
    };
    let t=0,raf;
    const draw=()=>{
      ctx.clearRect(0,0,W,H); t++;
      const cx=W/2,cy=H*.45;
      for(let i=0;i<12;i++){
        const a=(i/12)*Math.PI*2+t*.001; const len=Math.min(W,H)*.55;
        const alpha=.04+.03*Math.sin(t*.008+i);
        const grad=ctx.createLinearGradient(cx,cy,cx+Math.cos(a)*len,cy+Math.sin(a)*len);
        grad.addColorStop(0,"rgba(37,99,235,"+alpha+")"); grad.addColorStop(1,"rgba(34,211,238,0)");
        ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(a)*len,cy+Math.sin(a)*len);
        ctx.strokeStyle=grad;ctx.lineWidth=1.5;ctx.stroke();
      }
      hexes.forEach(h=>{
        const wave=Math.sin(t*h.speed*1000+h.phase);
        const alpha=h.bright?(.05+.15*(wave*.5+.5)):(.015+.05*(wave*.5+.5));
        drawHex(h.x,h.y,HEX-2,alpha,h.color);
      });
      rings.forEach(rng=>{
        rng.angle+=rng.speed;
        ctx.save();ctx.translate(cx,cy);ctx.rotate(rng.angle);
        ctx.setLineDash([12,rng.r*Math.PI*2/rng.dashes-12]);
        ctx.beginPath();ctx.arc(0,0,rng.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(37,99,235,${rng.opacity})`;
        ctx.lineWidth=1;ctx.stroke();ctx.setLineDash([]);ctx.restore();
      });
      drops.forEach((d,i)=>{
        ctx.font="12px monospace";ctx.fillStyle=`rgba(34,211,238,${d.opacity})`;
        ctx.fillText(d.char(),i*20,d.y);d.y+=d.speed; if(d.y>H){d.y=Math.random()*-200;}
      });
      raf=requestAnimationFrame(draw);
    };
    draw();
    const resize=()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize);};
  },[]);
  return <canvas ref={canvasRef} style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none"}}/>;
};

/* ── Loader ──────────────────────────────────────────────────────────────── */
const Loader = ({onDone}) => {
  const [showName,setShowName]=useState(false);
  const [showTag,setShowTag]=useState(false);
  const [phase,setPhase]=useState("in");
  useEffect(()=>{
    setTimeout(()=>setShowName(true),200);
    setTimeout(()=>setShowTag(true),700);
    setTimeout(()=>setPhase("out"),1900);
    setTimeout(()=>{setPhase("done");onDone();},2600);
  },[onDone]);
  if(phase==="done") return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:10000,background:"#060912",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1.6rem",opacity:phase==="out"?0:1,transform:phase==="out"?"scale(1.03)":"scale(1)",transition:phase==="out"?"opacity .7s ease,transform .7s ease":"none"}}>
      <HexMesh/>
      <div style={{position:"relative",zIndex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"1.6rem"}}>
        {showName&&(<div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,7vw,3.8rem)",letterSpacing:".08em",background:"linear-gradient(90deg,#2563eb,#60a5fa,#e8edf7,#60a5fa,#22d3ee)",backgroundSize:"300%",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",animation:"nameReveal .8s cubic-bezier(.22,1,.36,1) forwards,gradShift 4s ease infinite",textTransform:"uppercase"}}>PIXEL & BRUSH</div>)}
        {showTag&&(<div style={{color:"#6f7a96",fontSize:".72rem",letterSpacing:".28em",textTransform:"uppercase",animation:"taglineIn .6s ease forwards"}}>Digital Creative Agency · UK</div>)}
      </div>
    </div>
  );
};

/* ── Magnetic Button ─────────────────────────────────────────────────────── */
const Btn = ({children,primary,href,onClick,disabled}) => {
  const ref = useRef(null);
  const onMove = e => {
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.22}px)`;
  };
  const Tag = href?"a":"button";
  return (
    <Tag ref={ref} href={href} onClick={onClick} disabled={disabled}
      onMouseMove={onMove} onMouseLeave={()=>ref.current&&(ref.current.style.transform="none")}
      style={{
        display:"inline-flex",alignItems:"center",gap:".5rem",
        padding:".88rem 2.2rem",borderRadius:5,
        fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".95rem",
        cursor:disabled?"not-allowed":"none",border:"none",textDecoration:"none",letterSpacing:".04em",
        transition:"transform .5s cubic-bezier(.22,1,.36,1),box-shadow .3s,opacity .3s",
        opacity:disabled?.6:1,
        ...(primary
          ?{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",boxShadow:"0 0 28px rgba(37,99,235,.45)"}
          :{background:"transparent",color:"#e8edf7",border:"1px solid rgba(37,99,235,.35)"}),
      }}>{children}</Tag>
  );
};

/* ── Counter ─────────────────────────────────────────────────────────────── */
const Ctr = ({end,suffix=""}) => {
  const [n,setN]=useState(0);
  const ref=useRef(null),started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true; let v=0;
        const id=setInterval(()=>{v+=end/50;if(v>=end){setN(end);clearInterval(id);}else setN(Math.round(v));},28);
      }
    },{threshold:.3});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[end]);
  return <span ref={ref}>{n}{suffix}</span>;
};

/* ── Ticker ──────────────────────────────────────────────────────────────── */
const Ticker = () => {
  const items = ["Web Development","·","Social Media","·","Graphic Design","·","Brand Identity","·","UI/UX Design","·","Digital Strategy","·","SEO Optimisation","·","Content Creation","·"];
  const all = [...items,...items];
  return (
    <div style={{overflow:"hidden",borderTop:"1px solid rgba(37,99,235,.1)",borderBottom:"1px solid rgba(37,99,235,.1)",padding:".8rem 0",background:"rgba(37,99,235,.02)",position:"relative",zIndex:1}}>
      <div style={{display:"flex",gap:"2.5rem",whiteSpace:"nowrap",animation:"ticker 30s linear infinite"}}>
        {all.map((t,i)=><span key={i} style={{color:t==="·"?"#2563eb":"#3a4258",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".8rem",letterSpacing:".14em",textTransform:"uppercase"}}>{t}</span>)}
      </div>
    </div>
  );
};

/* ── Split-char heading ──────────────────────────────────────────────────── */
const SplitHeading = ({text,size="clamp(3rem,8vw,6.5rem)",delay=0,shimmer=false}) => {
  const [vis,setVis]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const chars=text.split("");
  return (
    <div ref={ref} style={{fontFamily:"'Baloo 2',sans-serif",fontSize:size,letterSpacing:".04em",lineHeight:1.02,display:"block",perspective:"600px"}}>
      {chars.map((ch,i)=>(
        <span key={i} style={{
          animationDelay:vis?`${delay+i*0.045}s`:"9999s",animationPlayState:vis?"running":"paused",
          ...(shimmer?{}:{background:"linear-gradient(130deg,#e8edf7 0%,#60a5fa 55%,#22d3ee 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}),
        }} className={shimmer?"char shimmer-text":"char"}>
          {ch===" "?"\u00a0":ch}
        </span>
      ))}
    </div>
  );
};

/* ── Photo Cutout ────────────────────────────────────────────────────────── */
const PhotoCutout = () => (
  <div style={{position:"relative",width:"clamp(240px,26vw,360px)",flexShrink:0,animation:"photoFloat 5s ease-in-out infinite"}}>
    <div style={{position:"absolute",bottom:"-8%",left:"10%",right:"10%",height:"55%",background:"radial-gradient(ellipse,rgba(37,99,235,.42) 0%,transparent 70%)",filter:"blur(26px)",animation:"glowPulse 3s ease-in-out infinite",zIndex:0}}/>
    <div style={{position:"relative",zIndex:1,background:"linear-gradient(160deg,rgba(30,58,138,.18),rgba(34,211,238,.07))",border:"1px solid rgba(37,99,235,.25)",borderRadius:"50% 50% 46% 46% / 40% 40% 60% 60%",overflow:"hidden",aspectRatio:"3/4",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(2px)"}}>
      <div style={{width:"85%",height:"92%",background:"linear-gradient(160deg,rgba(37,99,235,.14),rgba(34,211,238,.06))",borderRadius:"50% 50% 0 0",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src="/me.png" alt="Anil" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      </div>
    </div>
    <div style={{position:"absolute",inset:"-8%",border:"1px dashed rgba(37,99,235,.18)",borderRadius:"50% 50% 46% 46% / 40% 40% 60% 60%",animation:"floatY 6s ease-in-out infinite",zIndex:0}}/>
    {[{t:"3x",l:"Avg Growth",pos:{bottom:"8%",right:"-8%"}},{t:"15+",l:"Projects",pos:{top:"12%",left:"-10%"}}].map((b,i)=>(
      <div key={i} style={{position:"absolute",...b.pos,background:"rgba(8,12,28,.92)",border:"1px solid rgba(37,99,235,.32)",borderRadius:10,padding:".55rem .9rem",zIndex:2,backdropFilter:"blur(10px)"}}>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.3rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{b.t}</div>
        <div style={{color:"#6f7a96",fontSize:".62rem",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"}}>{b.l}</div>
      </div>
    ))}
  </div>
);

/* ── Service Card ────────────────────────────────────────────────────────── */
const SvcCard = ({icon,title,desc,features,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="rv sc" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{background:hov?"rgba(22,12,48,.96)":"rgba(8,4,20,.82)",border:`1px solid ${hov?"rgba(37,99,235,.52)":"rgba(37,99,235,.09)"}`,borderRadius:16,padding:"2.6rem 2.1rem",position:"relative",overflow:"hidden",transition:"all .45s cubic-bezier(.22,1,.36,1)",boxShadow:hov?"0 22px 65px rgba(37,99,235,.2),inset 0 1px 0 rgba(96,165,250,.12)":"none",transform:hov?"translateY(-10px)":"none"}}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#1e3a8a,#22d3ee)",transform:`scaleX(${hov?1:0})`,transition:"transform .45s cubic-bezier(.22,1,.36,1)",transformOrigin:"left"}}/>
      <div style={{position:"absolute",width:180,height:180,background:"radial-gradient(circle,rgba(37,99,235,.14),transparent 70%)",top:-50,right:-50,opacity:hov?1:0,transition:"opacity .45s",pointerEvents:"none"}}/>
      <div style={{fontSize:"2.2rem",marginBottom:"1.3rem",filter:`drop-shadow(0 0 10px rgba(37,99,235,${hov?.85:.25}))`,transition:"filter .3s"}}>{icon}</div>
      <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.25rem",letterSpacing:"-.01em",marginBottom:".65rem"}}>{title}</h3>
      <p style={{color:"#8a93ab",fontSize:".88rem",lineHeight:1.74,marginBottom:"1.5rem"}}>{desc}</p>
      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".45rem",marginBottom:"1.8rem"}}>
        {features.map((f,i)=>(<li key={i} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".83rem",color:"#9898b8"}}><span style={{color:"#2563eb",flexShrink:0}}>▸</span>{f}</li>))}
      </ul>
      <Btn href="#contact">Enquire →</Btn>
    </div>
  );
};

/* ── Portfolio Card ──────────────────────────────────────────────────────── */
const PortCard = ({img,title,desc,tag,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="rv" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{borderRadius:16,overflow:"hidden",border:"1px solid rgba(37,99,235,.09)",transition:"transform .5s cubic-bezier(.22,1,.36,1),box-shadow .5s",transform:hov?"translateY(-12px) scale(1.015)":"none",boxShadow:hov?"0 30px 85px rgba(37,99,235,.24)":"none",cursor:"none"}}>
      <div style={{height:200,position:"relative",overflow:"hidden",background:"#0a0f1e"}}>
        <img src={img} alt={title} style={{width:"100%",height:"100%",objectFit:"cover",transform:hov?"scale(1.08)":"scale(1)",transition:"transform .6s cubic-bezier(.22,1,.36,1)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(30,58,138,.35),rgba(0,0,0,.2))",opacity:hov?.45:.65,transition:"opacity .5s"}}/>
        {hov&&<div style={{position:"absolute",left:0,right:0,height:"50%",background:"linear-gradient(transparent,rgba(37,99,235,.1),transparent)",animation:"scanline 1.6s linear infinite"}}/>}
      </div>
      <div style={{background:"rgba(8,4,20,.97)",padding:"1.7rem"}}>
        <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.05rem",letterSpacing:"-.01em",marginBottom:".35rem"}}>{title}</h3>
        <p style={{color:"#8a93ab",fontSize:".83rem",marginBottom:".85rem",lineHeight:1.62}}>{desc}</p>
        <span style={{background:"rgba(37,99,235,.09)",border:"1px solid rgba(37,99,235,.2)",color:"#60a5fa",fontSize:".68rem",padding:".22rem .7rem",borderRadius:4,textTransform:"uppercase",letterSpacing:".08em"}}>{tag}</span>
      </div>
    </div>
  );
};

/* ── Testimonial Card ────────────────────────────────────────────────────── */
const TestiCard = ({quote,name,role,company,delay}) => (
  <div className="rv sc" data-delay={delay} style={{background:"rgba(8,4,22,.88)",border:"1px solid rgba(37,99,235,.14)",borderRadius:18,padding:"2.2rem",position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(37,99,235,.6),rgba(34,211,238,.5),transparent)"}}/>
    <div style={{fontFamily:"Georgia,serif",fontSize:"3.5rem",lineHeight:.75,color:"rgba(37,99,235,.25)",marginBottom:"1rem",userSelect:"none"}}>"</div>
    <div style={{display:"flex",gap:".25rem",marginBottom:"1.1rem"}}>
      {[1,2,3,4,5].map(s=>(<span key={s} style={{color:"#f59e0b",fontSize:"1.05rem",display:"inline-block",animation:`starPop .4s ${s*.08}s cubic-bezier(.22,1,.36,1) both`}}>★</span>))}
    </div>
    <p style={{color:"#aab5cc",fontSize:".92rem",lineHeight:1.78,marginBottom:"1.8rem",fontStyle:"italic"}}>"{quote}"</p>
    <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
      <div style={{width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#1e3a8a,#22d3ee)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.1rem",flexShrink:0,color:"#fff"}}>{name.charAt(0)}</div>
      <div>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".95rem"}}>{name}</div>
        <div style={{color:"#6f7a96",fontSize:".75rem",marginTop:".1rem"}}>{role} · {company}</div>
      </div>
    </div>
  </div>
);

/* ── Pricing Card ────────────────────────────────────────────────────────── */
const PricingCard = ({name,price,desc,features,highlight,cta,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="rv sc" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:highlight?"linear-gradient(145deg,rgba(30,58,138,.45),rgba(34,211,238,.08))":"rgba(8,4,20,.82)",
        border:`1px solid ${hov||highlight?"rgba(37,99,235,.52)":"rgba(37,99,235,.09)"}`,
        borderRadius:18,padding:"2.6rem 2rem",position:"relative",overflow:"hidden",
        transition:"all .45s cubic-bezier(.22,1,.36,1)",
        boxShadow:highlight||hov?"0 28px 70px rgba(37,99,235,.22)":"none",
        transform:hov?"translateY(-10px)":"none",
      }}>
      {highlight&&(
        <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#1e3a8a,#22d3ee)",padding:".32rem 1.2rem",borderRadius:100,fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",whiteSpace:"nowrap"}}>⭐ Most Popular</div>
      )}
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#2563eb,#22d3ee,transparent)",opacity:highlight||hov?1:0,transition:"opacity .3s"}}/>
      <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".2em",textTransform:"uppercase",marginBottom:".7rem"}}>{name}</div>
      <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"2.8rem",marginBottom:".25rem"}}>
        {price}<span style={{fontSize:".85rem",color:"#6f7a96",fontWeight:400,fontFamily:"'Outfit',sans-serif"}}> /project</span>
      </div>
      <p style={{color:"#8a93ab",fontSize:".88rem",marginBottom:"1.8rem",lineHeight:1.65}}>{desc}</p>
      <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:".6rem",marginBottom:"2.2rem"}}>
        {features.map((f,i)=>(<li key={i} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".86rem",color:"#9898b8"}}><span style={{color:"#22d3ee",flexShrink:0}}>✓</span>{f}</li>))}
      </ul>
      <Btn primary={highlight} href="#contact">{cta||"Get Started →"}</Btn>
    </div>
  );
};

/* ── FAQ Item ────────────────────────────────────────────────────────────── */
const FaqItem = ({q,a,isOpen,toggle}) => (
  <div style={{borderBottom:"1px solid rgba(37,99,235,.1)"}}>
    <button onClick={toggle} style={{width:"100%",textAlign:"left",background:"none",border:"none",padding:"1.4rem 0",cursor:"pointer",color:"#e8edf7",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
      <span style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:"1rem",lineHeight:1.4}}>{q}</span>
      <span style={{color:"#2563eb",fontSize:"1.4rem",flexShrink:0,transform:isOpen?"rotate(45deg)":"rotate(0deg)",transition:"transform .35s cubic-bezier(.22,1,.36,1)",display:"inline-block"}}>+</span>
    </button>
    <div style={{maxHeight:isOpen?500:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.22,1,.36,1)"}}>
      <p className={isOpen?"faq-answer":""} style={{color:"#8a93ab",fontSize:".9rem",lineHeight:1.76,paddingBottom:"1.4rem"}}>{a}</p>
    </div>
  </div>
);

/* ── Nav ─────────────────────────────────────────────────────────────────── */
const Nav = ({vis}) => {
  const [sc,setSc]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{ const fn=()=>setSc(window.scrollY>50); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  const close=()=>setOpen(false);
  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,padding:"1.1rem clamp(1.5rem,5vw,4rem)",display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(3,3,10,.88)":"transparent",backdropFilter:sc?"blur(22px)":"none",borderBottom:sc?"1px solid rgba(37,99,235,.1)":"1px solid transparent",transition:"all .5s ease",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(-20px)"}}>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.2rem",letterSpacing:".04em",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Pixel<span style={{opacity:.55}}>&</span>Brush</div>
        <div className="nav-links" style={{display:"flex",gap:"2.5rem",alignItems:"center",flexWrap:"wrap"}}>
          {["Services","Pricing","Portfolio","Process","Contact"].map(l=>(
            <a key={l} href={`#${l.toLowerCase()}`} style={{color:"#8a93ab",textDecoration:"none",fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:600,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>
          ))}
        </div>
        <div className="nav-btns" style={{display:"flex",gap:"1rem"}}>
          <Btn href="/login">Client Login</Btn>
          <Btn primary href="#contact">Get Started</Btn>
        </div>
        <button className="hamburger" onClick={()=>setOpen(o=>!o)} aria-label="Toggle navigation" style={{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:"6px",zIndex:810}}>
          {[0,1,2].map(i=>(<span key={i} style={{display:"block",width:24,height:2,background:"#60a5fa",borderRadius:2,transition:"all .3s",transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===1?"scaleX(0)":"rotate(-45deg) translate(5px,-5px)"):"none",opacity:open&&i===1?0:1}}/>))}
        </button>
      </nav>
      <div className={`mobile-overlay${open?" open":""}`} onClick={close}/>
      <div className={`mobile-drawer${open?" open":""}`}>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.2rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"1.2rem"}}>Pixel&Brush</div>
        {["Services","Pricing","Portfolio","Process","Contact"].map(l=>(
          <a key={l} href={`#${l.toLowerCase()}`} onClick={close} style={{color:"#8a93ab",textDecoration:"none",fontSize:".98rem",letterSpacing:".05em",fontWeight:600,padding:".85rem 0",borderBottom:"1px solid rgba(37,99,235,.07)",display:"block",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>
        ))}
        <div style={{marginTop:"1.6rem",display:"flex",flexDirection:"column",gap:".9rem"}}>
          <a href="/login" onClick={close} style={{textAlign:"center",padding:".88rem",border:"1px solid rgba(37,99,235,.35)",borderRadius:6,color:"#e8edf7",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem"}}>Client Login</a>
          <a href="#contact" onClick={close} style={{textAlign:"center",padding:".88rem",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:6,color:"#fff",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem",boxShadow:"0 0 20px rgba(37,99,235,.35)"}}>Get Started →</a>
        </div>
      </div>
    </>
  );
};

/* ── Section Label ───────────────────────────────────────────────────────── */
const Label = ({text}) => (
  <p style={{color:"#2563eb",fontSize:".7rem",letterSpacing:".22em",textTransform:"uppercase",marginBottom:".65rem",fontFamily:"'Baloo 2',sans-serif",fontWeight:700}}>{text}</p>
);

/* ══════════════════════════════════════════════════════════════════════════ */
/* ── APP ─────────────────────────────────────────────────────────────────── */
/* ══════════════════════════════════════════════════════════════════════════ */
export default function App() {
  const [loading,setLoading]=useState(true);
  const [navVis,setNavVis]=useState(false);
  const [heroVis,setHeroVis]=useState(false);
  const [openFaq,setOpenFaq]=useState(null);
  const done=useCallback(()=>{setLoading(false);setTimeout(()=>{setNavVis(true);setHeroVis(true);},80);},[]);
  useReveal();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [service,setService]=useState("Web Development");
  const [message,setMessage]=useState("");
  const [formStatus,setFormStatus]=useState("idle");
  const [formError,setFormError]=useState("");
  const [honeypot,setHoneypot]=useState("");

  /* ── data ── */
  const services=[
    {icon:"💻",title:"Web Development",desc:"Custom websites engineered for performance, conversion, and lasting impressions. Mobile-first, SEO-ready, and built to scale.",features:["Responsive design","SEO optimisation","CMS integration","Speed & performance"],delay:0},
    {icon:"📱",title:"Social Media Management",desc:"Data-driven content strategy and community management that compounds your brand's digital presence month over month.",features:["Content calendar","Caption writing","Analytics reporting","Audience growth"],delay:.12},
    {icon:"🎨",title:"Graphic Design",desc:"Visual identities and marketing assets that communicate authority and make your brand completely unforgettable.",features:["Logo & brand identity","Social media graphics","Marketing materials","Brand guidelines"],delay:.24},
  ];

  const pricingPlans=[
    {name:"Starter",price:"£299",desc:"Perfect for small businesses launching their online presence for the first time.",features:["5-page website","Mobile responsive","Basic SEO setup","Contact form","1 revision round"],cta:"Get Started →",delay:0},
    {name:"Growth",price:"£699",desc:"For businesses ready to grow and make a real impression online.",features:["10-page website","Advanced SEO","CMS integration","Social media setup","Analytics dashboard","3 revision rounds","30-day support"],highlight:true,cta:"Most Popular →",delay:.1},
    {name:"Premium",price:"£1,299",desc:"Complete digital transformation for established brands.",features:["Unlimited pages","E-commerce ready","Full brand identity","3 months social media","Priority support","Monthly reporting","Custom integrations"],cta:"Let's Talk →",delay:.2},
  ];

  const portfolio=[
    {img:"/projects/KA.png",title:"Kashish Makeup Studio",desc:"Full website overhaul with online booking and services menu.",tag:"Web Dev",delay:0},
    {img:"/projects/vijaya.jpg",title:"Vijaya Pharma",desc:"Brand identity, website, and social media management.",tag:"Full Package",delay:.12},
    {img:"/projects/kangaroo.jpg",title:"Kangaroo Education Foundation",desc:"Social strategy — 300% follower growth in 60 days.",tag:"Social Media",delay:.24},
  ];

  const testimonials=[
    {quote:"Pixel & Brush completely transformed our online presence. The new website is stunning and our bookings have doubled since launch. Professional, fast, and genuinely passionate about their work.",name:"Kashish Sentury",role:"Owner",company:"Kashish Makeup Studio",delay:0},
    {quote:"Working with Anil was seamless from start to finish. The brand identity perfectly captures our values, and the website has received incredible feedback from our clients and partners.",name:"Aditya Acharya",role:"Director",company:"Vijaya Pharma",delay:.12},
    {quote:"Our social media was completely stagnant before Pixel & Brush took over. In just 60 days we had 300% more followers and actual enquiries coming through — the results speak for themselves.",name:"Dipesh Aryal",role:"Founder",company:"Kangaroo Education",delay:.24},
  ];

  const steps=[
    {n:"01",title:"Discovery Call",desc:"We learn about your business, goals, and vision. No jargon — just an honest conversation about what you need."},
    {n:"02",title:"Proposal & Scope",desc:"Clear, itemised proposal with fixed price, timeline, and deliverables. No hidden costs, no nasty surprises."},
    {n:"03",title:"Design & Build",desc:"We build with regular updates and check-ins. Your feedback shapes every single decision we make."},
    {n:"04",title:"Launch & Support",desc:"Your project goes live. 30 days of free aftercare support included with every single project we deliver."},
  ];

  const aboutFeatures=[
    {icon:"⚡",title:"Fast Turnaround",desc:"Most projects delivered in 2–4 weeks without compromising on quality."},
    {icon:"💰",title:"Fixed Pricing",desc:"No hourly billing. Know exactly what you pay before we start."},
    {icon:"🎯",title:"Results-Focused",desc:"Every decision we make is tied to your business goals and growth."},
    {icon:"🔒",title:"Full Ownership",desc:"You own everything — code, designs, accounts. Always."},
    {icon:"📞",title:"Direct Access",desc:"Work directly with the person building your project. No account managers."},
    {icon:"🌍",title:"UK-Based",desc:"Based in the United Kingdom, serving clients across the globe."},
  ];

  const faqItems=[
    {q:"How long does a website project take?",a:"Most websites are delivered within 2–4 weeks depending on complexity. E-commerce and custom web apps typically take 4–8 weeks. We'll give you a clear timeline during the proposal stage."},
    {q:"What do I need to get started?",a:"Just book a discovery call! We'll discuss your goals, gather all the information we need, and handle everything from there. You don't need to prepare anything in advance."},
    {q:"Do you offer ongoing support after launch?",a:"Yes — all projects include 30 days of free aftercare support. We also offer flexible monthly retainer packages for ongoing updates, content changes, and continued support."},
    {q:"What's included in the Full Package?",a:"The Full Package combines web development, graphic design, and social media management into one seamless service. You get a complete digital presence built and managed by one focused team."},
    {q:"Do you work with businesses outside the UK?",a:"Absolutely. While we're based in the UK, we work with clients globally. All communication and delivery is handled remotely with no extra charge for international clients."},
    {q:"Can I see examples of your work first?",a:"Of course! Check out our Portfolio section for recent case studies, or get in touch and we'll share additional examples relevant to your industry."},
  ];

  /* ── form ── */
  const inputSt={background:"rgba(3,3,10,.88)",border:"1px solid rgba(37,99,235,.14)",color:"#e8edf7",padding:".78rem 1rem",borderRadius:7,fontFamily:"'Baloo 2',sans-serif",fontSize:".88rem",outline:"none",transition:"border-color .3s"};
  const iF=e=>e.target.style.borderColor="#2563eb";
  const iB=e=>e.target.style.borderColor="rgba(37,99,235,.14)";

  const sendMessage=async()=>{
    setFormError("");

    // 1. Honeypot check (anti-bot)
    if(honeypot) {
      setFormStatus("success");
      return;
    }

    // 2. Client-side rate limiting (30s cooldown)
    const lastSent = parseInt(localStorage.getItem("pb_contact_cooldown") || "0", 10);
    const now = Date.now();
    if(now - lastSent < 30000) {
      const waitSec = Math.ceil((30000 - (now - lastSent)) / 1000);
      setFormError(`Please wait ${waitSec}s before sending another message.`);
      return;
    }

    const cleanName = name.trim().slice(0, 100);
    const cleanEmail = email.trim().slice(0, 254);
    const cleanMessage = message.trim().slice(0, 3000);

    if(!cleanName || !cleanEmail || !cleanMessage){
      setFormError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(cleanEmail)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    const validServices = ["Web Development", "Social Media Management", "Graphic Design", "Full Package"];
    const cleanService = validServices.includes(service) ? service : "Web Development";

    setFormStatus("sending");

    try {
      const {error}=await supabase.from("messages").insert([{
        sender_name: cleanName,
        sender_email: cleanEmail,
        service_needed: cleanService,
        message: cleanMessage
      }]);

      if(error){
        setFormError("Failed to send message. Please try again later or email us directly.");
        setFormStatus("error");
        return;
      }

      localStorage.setItem("pb_contact_cooldown", Date.now().toString());
      setFormStatus("success");
      setName("");setEmail("");setService("Web Development");setMessage("");
      setTimeout(()=>setFormStatus("idle"),6000);
    } catch(err) {
      setFormError("An unexpected error occurred. Please try again later.");
      setFormStatus("error");
    }
  };

  return (
    <div style={{background:"#060912",minHeight:"100vh",overflowX:"hidden",position:"relative"}}>
      <G/>
      <HexMesh/>
      <Cursor/>
      <ScrollProgress/>
      <BackToTop/>
      <WhatsApp/>
      {loading&&<Loader onDone={done}/>}
      <Nav vis={navVis}/>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"8rem clamp(1.5rem,5vw,4rem) 5rem",position:"relative",overflow:"hidden",zIndex:1}}>
        <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(5rem,17vw,15rem)",color:"rgba(37,99,235,.04)",whiteSpace:"nowrap",pointerEvents:"none",userSelect:"none",letterSpacing:"-.02em",zIndex:0}}>DIGITAL</div>
        <div style={{position:"relative",zIndex:2,display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",flexWrap:"wrap",gap:"4rem"}}>
          <div style={{flex:"1 1 320px",maxWidth:640}}>
            <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(37,99,235,.09)",border:"1px solid rgba(37,99,235,.24)",padding:".38rem 1rem",borderRadius:100,marginBottom:"1.8rem",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(14px)",transition:"all .8s .1s cubic-bezier(.22,1,.36,1)"}}>
              <span style={{width:7,height:7,background:"#22d3ee",borderRadius:"50%",animation:"blink 1.5s ease infinite",flexShrink:0}}/>
              <span style={{color:"#60a5fa",fontSize:".7rem",letterSpacing:".14em",textTransform:"uppercase",fontWeight:600}}>Available for new projects</span>
            </div>
            <div style={{opacity:heroVis?1:0,transform:heroVis?"none":"translateY(26px)",transition:"all .9s .22s cubic-bezier(.22,1,.36,1)"}}>
              <SplitHeading text="We Craft" delay={0}/>
              <SplitHeading text="Digital World" delay={0.15} shimmer={true}/>
            </div>
            <p style={{fontFamily:"'Outfit',sans-serif",fontWeight:300,fontSize:"clamp(1.1rem,2.2vw,1.4rem)",color:"#9aa6c4",lineHeight:1.65,maxWidth:480,margin:"1.6rem 0 2.4rem",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(14px)",transition:"all .85s .42s cubic-bezier(.22,1,.36,1)"}}>
              Web development, graphic design &amp; social media management — for businesses ready to own their digital space.
            </p>
            <div style={{display:"flex",flexWrap:"wrap",gap:"1rem",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(14px)",transition:"all .8s .58s cubic-bezier(.22,1,.36,1)"}}>
              <Btn primary href="#contact">Start a Project →</Btn>
              <Btn href="#portfolio">View Our Work</Btn>
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:"3rem",marginTop:"3.5rem",paddingTop:"2rem",borderTop:"1px solid rgba(37,99,235,.1)",opacity:heroVis?1:0,transition:"opacity 1s .78s ease"}}>
              {[{n:15,s:"+",l:"Projects Delivered"},{n:100,s:"%",l:"Client Satisfaction"},{n:3,s:"x",l:"Avg Engagement Boost"}].map((st,i)=>(
                <div key={i}>
                  <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"2.4rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}><Ctr end={st.n} suffix={st.s}/></div>
                  <div style={{color:"#6f7a96",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",marginTop:".18rem"}}>{st.l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{opacity:heroVis?1:0,transform:heroVis?"none":"translateX(28px) scale(.94)",transition:"all 1s .65s cubic-bezier(.22,1,.36,1)"}}><PhotoCutout/></div>
        </div>
        <div style={{position:"absolute",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:".5rem",opacity:.28,zIndex:1}}>
          <span style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"#6f7a96",fontFamily:"'Baloo 2',sans-serif",fontWeight:600}}>Scroll</span>
          <div style={{width:1,height:42,background:"linear-gradient(#2563eb,transparent)",animation:"floatY 2s ease-in-out infinite"}}/>
        </div>
      </section>

      <Ticker/>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section style={{padding:"7rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1}}>
        <div className="rv" data-dir="up" style={{textAlign:"center",maxWidth:640,margin:"0 auto 4rem"}}>
          <Label text="Why Pixel & Brush"/>
          <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,4vw,3.4rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1.1rem"}}>
            A Studio That Cares About<br/>
            <span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Your Growth</span>
          </h2>
          <p style={{color:"#8a93ab",lineHeight:1.76,fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>We're a small, focused digital studio based in the UK. Senior-level work at every stage — no junior hand-offs, no bloated overhead.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:"1.1rem",maxWidth:1100,margin:"0 auto"}}>
          {aboutFeatures.map((f,i)=>(
            <div key={i} className="rv" data-delay={i*.07} style={{background:"rgba(8,4,20,.7)",border:"1px solid rgba(37,99,235,.09)",borderRadius:14,padding:"1.5rem",display:"flex",gap:"1rem",alignItems:"flex-start",transition:"border-color .3s,background .3s,transform .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(37,99,235,.35)";e.currentTarget.style.background="rgba(16,8,36,.9)";e.currentTarget.style.transform="translateY(-4px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(37,99,235,.09)";e.currentTarget.style.background="rgba(8,4,20,.7)";e.currentTarget.style.transform="none";}}>
              <div style={{fontSize:"1.55rem",flexShrink:0}}>{f.icon}</div>
              <div>
                <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:".32rem"}}>{f.title}</div>
                <div style={{color:"#8a93ab",fontSize:".83rem",lineHeight:1.6}}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ SERVICES ═══════════════════ */}
      <section id="services" style={{padding:"8rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1,background:"rgba(4,3,12,.5)"}}>
        <div className="rv" data-dir="left">
          <Label text="What We Do"/>
          <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",marginBottom:"1.2rem",lineHeight:1.08}}>Services Built for<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Modern Businesses</span></h2>
          <p style={{color:"#8a93ab",maxWidth:460,lineHeight:1.74,marginBottom:"3.5rem",fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>Everything your brand needs to dominate the digital space — under one focused roof.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem"}}>
          {services.map((s,i)=><SvcCard key={i} {...s}/>)}
        </div>
      </section>

      {/* ═══════════════════ PRICING ═══════════════════ */}
      <section id="pricing" style={{padding:"8rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1}}>
        <div className="rv" data-dir="up" style={{textAlign:"center",marginBottom:"4rem"}}>
          <Label text="Transparent Pricing"/>
          <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1rem"}}>
            Clear Packages,{" "}
            <span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>No Hidden Costs</span>
          </h2>
          <p style={{color:"#8a93ab",lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem",maxWidth:480,margin:"0 auto"}}>Fixed-price packages so you always know exactly what you're getting. All projects include free 30-day aftercare.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.5rem",maxWidth:1100,margin:"0 auto",alignItems:"start"}}>
          {pricingPlans.map((p,i)=><PricingCard key={i} {...p}/>)}
        </div>
        <div className="rv" style={{textAlign:"center",marginTop:"3rem"}}>
          <p style={{color:"#6f7a96",fontSize:".86rem"}}>Need something custom? <a href="#contact" style={{color:"#60a5fa",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700}}>Let's talk →</a></p>
        </div>
      </section>

      {/* ═══════════════════ PORTFOLIO ═══════════════════ */}
      <section id="portfolio" style={{padding:"8rem clamp(1.5rem,5vw,4rem)",background:"rgba(5,3,14,.6)",position:"relative",zIndex:1}}>
        <div className="rv" data-dir="right">
          <Label text="Our Work"/>
          <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",marginBottom:"1.2rem",lineHeight:1.08}}>Recent Projects</h2>
          <p style={{color:"#8a93ab",maxWidth:460,lineHeight:1.74,marginBottom:"3.5rem",fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>A curated selection of websites, brands, and campaigns we have delivered.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(275px,1fr))",gap:"1.5rem"}}>
          {portfolio.map((p,i)=><PortCard key={i} {...p}/>)}
        </div>
      </section>

      {/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
      <section style={{padding:"8rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1}}>
        <div className="rv" data-dir="up" style={{textAlign:"center",marginBottom:"4rem"}}>
          <Label text="Client Stories"/>
          <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1rem"}}>
            What Our Clients{" "}<span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Say</span>
          </h2>
          <p style={{color:"#8a93ab",lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem",maxWidth:460,margin:"0 auto"}}>Real feedback from real businesses we've helped grow.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"1.5rem"}}>
          {testimonials.map((t,i)=><TestiCard key={i} {...t}/>)}
        </div>
      </section>

      {/* ═══════════════════ PROCESS ═══════════════════ */}
      <section id="process" style={{padding:"8rem clamp(1.5rem,5vw,4rem)",background:"rgba(4,2,12,.7)",position:"relative",zIndex:1}}>
        <div className="rv" data-dir="left">
          <Label text="How It Works"/>
          <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",marginBottom:"1.2rem",lineHeight:1.08}}>Simple. <span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Transparent.</span> Fast.</h2>
          <p style={{color:"#8a93ab",maxWidth:460,lineHeight:1.74,marginBottom:"4.5rem",fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>From first contact to final launch — a clear process with no surprises and no hidden fees.</p>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(210px,1fr))",gap:"0",position:"relative"}}>
          <div style={{position:"absolute",top:27,left:"calc(12.5% + 28px + 1.5rem)",right:"calc(12.5% + 28px + 1.5rem)",height:1,background:"linear-gradient(90deg,rgba(37,99,235,.3),rgba(34,211,238,.3),rgba(37,99,235,.3))",pointerEvents:"none",zIndex:0}}/>
          {steps.map((s,i)=>(
            <div key={i} className="rv" data-delay={i*.1} style={{padding:"0 1.8rem",position:"relative",zIndex:1}} onMouseEnter={e=>{const el=e.currentTarget.querySelector(".sn");if(el)el.style.boxShadow="0 0 28px rgba(37,99,235,.7),0 0 0 4px rgba(37,99,235,.15)";}} onMouseLeave={e=>{const el=e.currentTarget.querySelector(".sn");if(el)el.style.boxShadow="none";}}>
              <div className="sn" style={{width:54,height:54,borderRadius:"50%",background:"linear-gradient(135deg,rgba(30,58,138,.9),rgba(34,211,238,.35))",border:"1.5px solid rgba(37,99,235,.45)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1rem",color:"#22d3ee",marginBottom:"1.8rem",transition:"box-shadow .3s"}}>{s.n}</div>
              <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".68rem",color:"#22d3ee",letterSpacing:".18em",textTransform:"uppercase",marginBottom:".6rem"}}>Step {s.n}</div>
              <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.15rem",letterSpacing:"-.01em",marginBottom:".5rem"}}>{s.title}</h3>
              <p style={{color:"#8a93ab",fontSize:".86rem",lineHeight:1.68}}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FAQ ═══════════════════ */}
      <section style={{padding:"8rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"5rem",alignItems:"start",maxWidth:1100,margin:"0 auto"}}>
          <div className="rv" data-dir="left">
            <Label text="Got Questions?"/>
            <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,4vw,3.4rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1.1rem"}}>
              Frequently<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Asked Questions</span>
            </h2>
            <p style={{color:"#8a93ab",lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem",marginBottom:"1.5rem"}}>
              Can't find your answer?{" "}
              <a href="#contact" style={{color:"#60a5fa",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700}}>Get in touch →</a>
            </p>
            {/* decorative bubble */}
            <div style={{marginTop:"2rem",background:"rgba(37,99,235,.07)",border:"1px solid rgba(37,99,235,.18)",borderRadius:14,padding:"1.3rem 1.5rem",display:"flex",gap:"1rem",alignItems:"center"}}>
              <span style={{fontSize:"1.6rem"}}>💬</span>
              <div>
                <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem",marginBottom:".2rem"}}>Still have questions?</div>
                <div style={{color:"#8a93ab",fontSize:".82rem"}}>We respond within 2 hours on weekdays.</div>
              </div>
            </div>
          </div>
          <div className="rv" data-dir="right" data-delay=".1">
            {faqItems.map((item,i)=>(
              <FaqItem key={i} {...item} isOpen={openFaq===i} toggle={()=>setOpenFaq(openFaq===i?null:i)}/>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ CTA ═══════════════════ */}
      <section style={{padding:"7rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1,overflow:"hidden"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(37,99,235,.06),transparent)",pointerEvents:"none"}}/>
        <div className="rv sc" style={{maxWidth:780,margin:"0 auto",textAlign:"center",background:"rgba(8,6,24,.94)",border:"1px solid rgba(37,99,235,.2)",borderRadius:24,padding:"4.5rem clamp(2rem,6vw,5rem)",backdropFilter:"blur(24px)",animation:"ctaGlow 5s ease-in-out infinite",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#2563eb,#22d3ee,transparent)"}}/>
          <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(37,99,235,.3),rgba(34,211,238,.3),transparent)"}}/>
          <div style={{position:"absolute",top:"-50%",left:"50%",transform:"translateX(-50%)",width:"60%",height:"100%",background:"radial-gradient(ellipse,rgba(37,99,235,.09),transparent 70%)",pointerEvents:"none"}}/>
          <h2 style={{position:"relative",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2rem,4.5vw,3.4rem)",letterSpacing:"-.02em",marginBottom:"1rem",lineHeight:1.08}}>Ready to Stand Out<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>From the Competition?</span></h2>
          <p style={{position:"relative",color:"#8a93ab",marginBottom:"2.4rem",fontFamily:"'Outfit',sans-serif",fontSize:"1.05rem",lineHeight:1.72,maxWidth:480,margin:"0 auto 2.4rem"}}>First consultation is completely free. No commitment required.</p>
          <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
            <Btn primary href="#contact">Book a Free Call →</Btn>
            <Btn href="#portfolio">See Our Work</Btn>
          </div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" style={{padding:"8rem clamp(1.5rem,5vw,4rem)",position:"relative",zIndex:1}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"5rem",alignItems:"start"}}>
          <div>
            <div className="rv" data-dir="left">
              <Label text="Get In Touch"/>
              <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,4.5vw,3.5rem)",letterSpacing:"-.02em",marginBottom:"1rem",lineHeight:1.05}}>Let's Build<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Something Great</span></h2>
              <p style={{color:"#8a93ab",lineHeight:1.75,marginBottom:"2rem",maxWidth:360,fontFamily:"'Outfit',sans-serif",fontSize:".95rem"}}>Tell us about your project and we will get back to you within 24 hours.</p>
            </div>
            <div className="rv" data-dir="left" data-delay=".1">
              {[{icon:"✉️",label:"anilpte232@gmail.com",href:"mailto:anilpte232@gmail.com"},{icon:"💼",label:"linkedin.com/in/Anil pandey",href:"https://linkedin.com"},{icon:"📍",label:"United Kingdom",href:null}].map((c,i)=>(
                <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem"}}>
                  <div style={{width:44,height:44,background:"rgba(37,99,235,.09)",border:"1px solid rgba(37,99,235,.18)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1rem",flexShrink:0}}>{c.icon}</div>
                  {c.href?<a href={c.href} style={{color:"#8a93ab",fontSize:".86rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#60a5fa"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{c.label}</a>:<span style={{color:"#8a93ab",fontSize:".86rem"}}>{c.label}</span>}
                </div>
              ))}
            </div>
          </div>
          <div className="rv" data-dir="right" data-delay=".15">
            <div style={{background:"rgba(8,4,20,.88)",border:"1px solid rgba(37,99,235,.1)",borderRadius:16,padding:"2.6rem",display:"flex",flexDirection:"column",gap:"1.2rem"}}>
              {formStatus==="success"&&(<div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.28)",borderRadius:10,padding:"1rem 1.2rem",color:"#6ee7b7",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,fontSize:".9rem",display:"flex",gap:".6rem",alignItems:"center"}}>✅ Message sent! We'll be in touch within 24 hours.</div>)}
              {formError&&(<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.28)",borderRadius:10,padding:"1rem 1.2rem",color:"#f87171",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,fontSize:".9rem",display:"flex",gap:".6rem",alignItems:"center"}}>⚠️ {formError}</div>)}

              {/* Honeypot Bot Trap */}
              <div style={{display:"none"}} aria-hidden="true">
                <input type="text" name="company_website_hp" value={honeypot} onChange={e=>setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off"/>
              </div>

              {[
                {l:"Your Name",t:"text",p:"John Smith",v:name,fn:setName,max:100},
                {l:"Email Address",t:"email",p:"john@company.com",v:email,fn:setEmail,max:254}
              ].map((f,i)=>(
                <div key={i} style={{display:"flex",flexDirection:"column",gap:".38rem"}}>
                  <label style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600}}>{f.l}</label>
                  <input type={f.t} maxLength={f.max} placeholder={f.p} value={f.v} onChange={e=>f.fn(e.target.value)} onFocus={iF} onBlur={iB} style={inputSt}/>
                </div>
              ))}
              <div style={{display:"flex",flexDirection:"column",gap:".38rem"}}>
                <label style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600}}>Service Needed</label>
                <select value={service} onChange={e=>setService(e.target.value)} onFocus={iF} onBlur={iB} style={inputSt}>
                  <option>Web Development</option>
                  <option>Social Media Management</option>
                  <option>Graphic Design</option>
                  <option>Full Package</option>
                </select>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:".38rem"}}>
                <label style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600}}>About Your Project</label>
                <textarea maxLength={3000} placeholder="Brief description of what you need..." rows={4} value={message} onChange={e=>setMessage(e.target.value)} onFocus={iF} onBlur={iB} style={{...inputSt,resize:"vertical"}}/>
              </div>
              <Btn primary onClick={sendMessage} disabled={formStatus==="sending"}>{formStatus==="sending"?"Sending…":"Send Message →"}</Btn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer style={{padding:"3.5rem clamp(1.5rem,5vw,4rem) 2rem",borderTop:"1px solid rgba(37,99,235,.1)",position:"relative",zIndex:1,background:"rgba(4,3,12,.85)"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:"2.5rem",marginBottom:"3rem"}}>
          <div>
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".04em",marginBottom:".7rem"}}>Pixel & Brush</div>
            <p style={{color:"#6f7a96",fontSize:".83rem",lineHeight:1.7,maxWidth:210,marginBottom:"1.3rem"}}>Digital creative studio based in the UK — helping brands own their space online.</p>
            <div style={{display:"flex",gap:".7rem"}}>
              {[{label:"LI",href:"https://linkedin.com",title:"LinkedIn"},{label:"IG",href:"https://instagram.com",title:"Instagram"}].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.title} style={{width:36,height:36,background:"rgba(37,99,235,.1)",border:"1px solid rgba(37,99,235,.2)",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",color:"#8a93ab",fontSize:".68rem",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,textDecoration:"none",transition:"all .3s"}} onMouseEnter={e=>{e.currentTarget.style.background="rgba(37,99,235,.25)";e.currentTarget.style.color="#60a5fa";e.currentTarget.style.borderColor="rgba(37,99,235,.5)";}} onMouseLeave={e=>{e.currentTarget.style.background="rgba(37,99,235,.1)";e.currentTarget.style.color="#8a93ab";e.currentTarget.style.borderColor="rgba(37,99,235,.2)";}}>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Services</div>
            {["Web Development","Social Media","Graphic Design","Full Package"].map(l=>(<a key={l} href="#services" style={{display:"block",color:"#8a93ab",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>))}
          </div>
          <div>
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Company</div>
            {[["Portfolio","#portfolio"],["Pricing","#pricing"],["Process","#process"],["Contact","#contact"],["Client Login","/login"]].map(([l,h])=>(<a key={l} href={h} style={{display:"block",color:"#8a93ab",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>))}
          </div>
          <div>
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Contact</div>
            <a href="mailto:anilpte232@gmail.com" style={{display:"block",color:"#8a93ab",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>anilpte232@gmail.com</a>
            <p style={{color:"#8a93ab",fontSize:".84rem",marginBottom:"1.2rem"}}>United Kingdom</p>
            <a href="#contact" style={{display:"inline-flex",alignItems:"center",gap:".4rem",color:"#60a5fa",fontSize:".84rem",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,transition:"opacity .3s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Start a project →</a>
          </div>
        </div>
        <div style={{paddingTop:"1.5rem",borderTop:"1px solid rgba(37,99,235,.07)",display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
          <p style={{color:"#3a4260",fontSize:".76rem",fontFamily:"'Baloo 2',sans-serif"}}>© 2025 Pixel &amp; Brush. All rights reserved. United Kingdom.</p>
          <p style={{color:"#3a4260",fontSize:".72rem",fontFamily:"'Baloo 2',sans-serif",letterSpacing:".08em"}}>CRAFTED WITH ❤ IN THE UK</p>
        </div>
      </footer>
    </div>
  );
}
