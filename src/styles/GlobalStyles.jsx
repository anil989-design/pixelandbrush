const GlobalStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; color-scheme:dark; }
    body {
      background:#050816;
      color:#f3f3f3;
      font-family:'Poppins', 'Outfit', sans-serif;
      overflow-x:hidden;
    }
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:#050816; }
    ::-webkit-scrollbar-thumb { background:#915EFF; border-radius:4px; }

    a { text-decoration: none; color: inherit; }
    a:hover { color: inherit; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', 'Baloo 2', sans-serif; color: #ffffff; }

    /* 3D Portfolio Gradients (from Huzaif-Ahmed-Portfolio) */
    .black-gradient {
      background: #000000;
      background: linear-gradient(to right, #434343, #000000);
    }
    .violet-gradient {
      background: #804dee;
      background: linear-gradient(180deg, #804dee 0%, rgba(60, 51, 80, 0) 100%);
    }
    .green-pink-gradient {
      background: #00cea8;
      background: linear-gradient(90.13deg, #00cea8 1.9%, #bf61ff 97.5%);
    }
    .orange-text-gradient {
      background: linear-gradient(to top, #f12711, #f5af19);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .green-text-gradient {
      background: linear-gradient(to top, #11998e, #38ef7d);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .blue-text-gradient {
      background: linear-gradient(to top, #2f80ed, #56ccf2);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .pink-text-gradient {
      background: linear-gradient(to top, #ec008c, #fc6767);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .white-text-gradient {
      background: linear-gradient(to top, #d1d5db, #ffffff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    /* 3D Canvas Spinner */
    .canvas-loader {
      font-size: 10px;
      width: 1em;
      height: 1em;
      border-radius: 50%;
      position: relative;
      text-indent: -9999em;
      animation: mulShdSpin 1.1s infinite ease;
      transform: translateZ(0);
    }
    @keyframes mulShdSpin {
      0%, 100% {
        box-shadow: 0em -2.6em 0em 0em #ffffff, 1.8em -1.8em 0 0em rgba(255,255,255,0.2), 2.5em 0em 0 0em rgba(255,255,255,0.2), 1.75em 1.75em 0 0em rgba(255,255,255,0.2), 0em 2.5em 0 0em rgba(255,255,255,0.2), -1.8em 1.8em 0 0em rgba(255,255,255,0.2), -2.6em 0em 0 0em rgba(255,255,255,0.5), -1.8em -1.8em 0 0em rgba(255,255,255,0.7);
      }
      25% {
        box-shadow: 0em -2.6em 0em 0em rgba(255,255,255,0.5), 1.8em -1.8em 0 0em rgba(255,255,255,0.7), 2.5em 0em 0 0em #ffffff, 1.75em 1.75em 0 0em rgba(255,255,255,0.2), 0em 2.5em 0 0em rgba(255,255,255,0.2), -1.8em 1.8em 0 0em rgba(255,255,255,0.2), -2.6em 0em 0 0em rgba(255,255,255,0.2), -1.8em -1.8em 0 0em rgba(255,255,255,0.2);
      }
      50% {
        box-shadow: 0em -2.6em 0em 0em rgba(255,255,255,0.2), 1.8em -1.8em 0 0em rgba(255,255,255,0.2), 2.5em 0em 0 0em rgba(255,255,255,0.5), 1.75em 1.75em 0 0em rgba(255,255,255,0.7), 0em 2.5em 0 0em #ffffff, -1.8em 1.8em 0 0em rgba(255,255,255,0.2), -2.6em 0em 0 0em rgba(255,255,255,0.2), -1.8em -1.8em 0 0em rgba(255,255,255,0.2);
      }
      75% {
        box-shadow: 0em -2.6em 0em 0em rgba(255,255,255,0.2), 1.8em -1.8em 0 0em rgba(255,255,255,0.2), 2.5em 0em 0 0em rgba(255,255,255,0.2), 1.75em 1.75em 0 0em rgba(255,255,255,0.2), 0em 2.5em 0 0em rgba(255,255,255,0.5), -1.8em 1.8em 0 0em rgba(255,255,255,0.7), -2.6em 0em 0 0em #ffffff, -1.8em -1.8em 0 0em rgba(255,255,255,0.2);
      }
    }

    @keyframes scrollDotBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(24px); }
    }
    @keyframes floatY { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes whatsappBounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.12)} }
    @keyframes faqOpen { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:none} }

    .rv {
      opacity:1;
      transform:none;
    }

    /* Timeline responsive layout */
    .pb-timeline {
      position: relative;
      max-width: 1120px;
      margin: 0 auto;
      padding: 2rem 0;
    }
    .pb-timeline::before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      left: 50%;
      width: 4px;
      margin-left: -2px;
      background: #ffffff;
    }
    .pb-timeline-item {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      margin-bottom: 3.5rem;
    }
    .pb-timeline-item:nth-child(even) {
      flex-direction: row-reverse;
    }
    .pb-timeline-card {
      width: 44%;
      background: #1d1836;
      color: #fff;
      border-radius: 12px;
      padding: 1.75rem 2rem;
      box-shadow: 0 3px 0 #ddd, 0 20px 50px rgba(0,0,0,0.45);
      position: relative;
    }
    .pb-timeline-date {
      width: 44%;
      padding-top: 1rem;
      color: #aaa6c3;
      font-size: 15px;
      font-weight: 600;
    }
    .pb-timeline-item:nth-child(odd) .pb-timeline-date {
      text-align: left;
    }
    .pb-timeline-item:nth-child(even) .pb-timeline-date {
      text-align: right;
    }
    .pb-timeline-icon {
      position: absolute;
      left: 50%;
      top: 0.4rem;
      transform: translateX(-50%);
      width: 56px;
      height: 56px;
      border-radius: 50%;
      border: 4px solid #ffffff;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      box-shadow: 0 0 0 4px rgba(145,94,255,0.25);
      overflow: hidden;
    }

    @media (max-width: 900px) {
      .nav-links { display:none !important; }
      .nav-btns  { display:none !important; }
      .hamburger { display:flex !important; }
      .pb-timeline::before { left: 28px; }
      .pb-timeline-item,
      .pb-timeline-item:nth-child(even) {
        flex-direction: column;
        padding-left: 76px;
      }
      .pb-timeline-card,
      .pb-timeline-date {
        width: 100%;
        text-align: left !important;
      }
      .pb-timeline-date {
        padding-top: 0.5rem;
      }
      .pb-timeline-icon {
        left: 28px;
        width: 48px;
        height: 48px;
      }
    }

    .mobile-drawer {
      position:fixed; top:0; right:0; bottom:0; width:285px;
      background:#050816; border-left:1px solid rgba(145,94,255,.3);
      backdrop-filter:blur(30px); z-index:800;
      padding:5.5rem 1.8rem 2rem; display:flex; flex-direction:column; gap:.4rem;
      transform:translateX(100%); transition:transform .4s cubic-bezier(.22,1,.36,1);
    }
    .mobile-drawer.open { transform:translateX(0); }
    .mobile-overlay {
      position:fixed; inset:0; z-index:799; background:rgba(0,0,0,.6);
      opacity:0; pointer-events:none; transition:opacity .35s;
    }
    .mobile-overlay.open { opacity:1; pointer-events:all; }

    .pb-form-control {
      background: #151030 !important;
      border: none !important;
      color: #ffffff !important;
      border-radius: 10px !important;
      padding: 1rem 1.4rem !important;
      font-size: 0.95rem !important;
      font-weight: 500 !important;
      font-family: 'Poppins', sans-serif !important;
      outline: none !important;
    }
    .pb-form-control:focus {
      box-shadow: 0 0 0 2px #915EFF !important;
      background: #1a143b !important;
    }
    .pb-form-control::placeholder {
      color: #aaa6c3 !important;
    }
  `}</style>
);

export default GlobalStyles;
