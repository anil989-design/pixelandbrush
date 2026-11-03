const GlobalStyles = () => (
  <style>{`

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; }
    body { background:#060912; color:#e8edf7; font-family:'Outfit',sans-serif; overflow-x:hidden; cursor:none; }
    ::-webkit-scrollbar { width:3px; }
    ::-webkit-scrollbar-track { background:#060912; }
    ::-webkit-scrollbar-thumb { background:#1e3a8a; border-radius:2px; }

    /* Bootstrap Reboot Overrides to preserve Cyberpunk Dark Theme */
    a { text-decoration: none; color: inherit; }
    a:hover { color: inherit; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Baloo 2', sans-serif; color: #e8edf7; }

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
    @keyframes faqOpen { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }
    @keyframes whatsappBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }

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

    /* Bootstrap Custom Dark Form Inputs */
    .pb-form-control {
      background: rgba(3,3,10,.88) !important;
      border: 1px solid rgba(37,99,235,.18) !important;
      color: #e8edf7 !important;
      border-radius: 8px !important;
      padding: .8rem 1rem !important;
      font-size: .9rem !important;
      font-family: 'Outfit', sans-serif !important;
      transition: border-color .3s, box-shadow .3s !important;
    }
    .pb-form-control:focus {
      border-color: #2563eb !important;
      box-shadow: 0 0 0 3px rgba(37,99,235,.2) !important;
      background: rgba(3,3,12,.95) !important;
    }
    .pb-form-control::placeholder {
      color: #4a5472 !important;
    }

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

export default GlobalStyles;
