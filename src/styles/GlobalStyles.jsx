const GlobalStyles = () => (
  <style>{`
    @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior:smooth; color-scheme:dark; }
    body {
      background:#07040e;
      color:#f4f1fa;
      font-family:'Poppins', 'Outfit', sans-serif;
      overflow-x:hidden;
    }
    ::-webkit-scrollbar { width:5px; }
    ::-webkit-scrollbar-track { background:#07040e; }
    ::-webkit-scrollbar-thumb { background:linear-gradient(180deg,#9333ea,#f97316); border-radius:4px; }

    a { text-decoration: none; color: inherit; }
    a:hover { color: inherit; }
    h1, h2, h3, h4, h5, h6 { font-family: 'Poppins', 'Baloo 2', sans-serif; color: #ffffff; }

    /* Pixel & Brush Logo Color Gradients (Electric Violet -> Magenta -> Sunset Brush Orange) */
    .black-gradient {
      background: #07040e;
      background: linear-gradient(135deg, #2a124c, #07040e);
    }
    .violet-gradient {
      background: #9333ea;
      background: linear-gradient(180deg, #f97316 0%, #9333ea 55%, rgba(60, 51, 80, 0) 100%);
    }
    .green-pink-gradient {
      background: #f97316;
      background: linear-gradient(135deg, #7c3aed 0%, #ec4899 48%, #f97316 82%, #fbbf24 100%);
    }
    .orange-text-gradient {
      background: linear-gradient(to top, #ea580c, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .green-text-gradient {
      background: linear-gradient(to top, #a855f7, #e879f9);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .blue-text-gradient {
      background: linear-gradient(to top, #f97316, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .pink-text-gradient {
      background: linear-gradient(to top, #db2777, #fb7185);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .white-text-gradient {
      background: linear-gradient(to top, #d8b4fe, #ffffff);
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
        box-shadow: 0em -2.6em 0em 0em #fb923c, 1.8em -1.8em 0 0em rgba(249,115,22,0.2), 2.5em 0em 0 0em rgba(168,85,247,0.2), 1.75em 1.75em 0 0em rgba(168,85,247,0.2), 0em 2.5em 0 0em rgba(168,85,247,0.2), -1.8em 1.8em 0 0em rgba(168,85,247,0.2), -2.6em 0em 0 0em rgba(249,115,22,0.5), -1.8em -1.8em 0 0em rgba(249,115,22,0.7);
      }
      50% {
        box-shadow: 0em -2.6em 0em 0em rgba(168,85,247,0.2), 1.8em -1.8em 0 0em rgba(168,85,247,0.2), 2.5em 0em 0 0em rgba(249,115,22,0.5), 1.75em 1.75em 0 0em rgba(249,115,22,0.7), 0em 2.5em 0 0em #fb923c, -1.8em 1.8em 0 0em rgba(168,85,247,0.2), -2.6em 0em 0 0em rgba(168,85,247,0.2), -1.8em -1.8em 0 0em rgba(168,85,247,0.2);
      }
    }

    @keyframes scrollDotBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(24px); }
    }

    /* Timeline responsive layout in Pixel & Brush colors */
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
      background: linear-gradient(180deg, #a855f7, #ec4899, #f97316);
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
      background: #170b2c;
      color: #fff;
      border-radius: 14px;
      padding: 1.75rem 2rem;
      border: 1px solid rgba(249,115,22,0.24);
      border-bottom: 3px solid #f97316;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      position: relative;
    }
    .pb-timeline-date {
      width: 44%;
      padding-top: 1rem;
      color: #c4b5dc;
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
      border: 3px solid #f97316;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2;
      box-shadow: 0 0 0 4px rgba(147,51,234,0.3);
      overflow: hidden;
    }

    @media (max-width: 900px) {
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

    .pb-form-control {
      background: #170b2c !important;
      border: 1px solid rgba(168,85,247,0.25) !important;
      color: #ffffff !important;
      border-radius: 10px !important;
      padding: 1rem 1.4rem !important;
      font-size: 0.95rem !important;
      font-weight: 500 !important;
      font-family: 'Poppins', sans-serif !important;
      outline: none !important;
    }
    .pb-form-control:focus {
      border-color: #f97316 !important;
      box-shadow: 0 0 0 2px rgba(249,115,22,0.35) !important;
      background: #1f0f3a !important;
    }
    .pb-form-control::placeholder {
      color: #a79ab8 !important;
    }
  `}</style>
);

export default GlobalStyles;
