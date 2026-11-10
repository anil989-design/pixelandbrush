import { CONTACT } from "../../config/constants";

const Footer = () => {
  return (
  <footer style={{padding:"3.5rem 0 2rem",borderTop:"1px solid rgba(37,99,235,.1)",position:"relative",zIndex:1,background:"rgba(4,3,12,.85)"}}>
    <div className="container px-4 px-lg-5">
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",letterSpacing:".04em",marginBottom:".7rem"}}>Pixel & Brush</div>
          <p style={{color:"#6f7a96",fontSize:".83rem",lineHeight:1.7,maxWidth:240,marginBottom:".6rem"}}>Digital creative studio based in the UK — helping brands own their space online.</p>
          <p style={{fontSize:".83rem",marginBottom:"1.3rem"}}>
            <a href="/about" style={{color:"#8a93ab",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.currentTarget.style.color="#60a5fa"} onMouseLeave={e=>e.currentTarget.style.color="#8a93ab"}>Founded by Anil Pandey</a>
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Services</div>
          {["Web Development","Social Media","Graphic Design","Full Package"].map(l=>(<a key={l} href="/#services" style={{display:"block",color:"#8a93ab",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>))}
        </div>
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Company</div>
          {[["About","/about"],["Portfolio","/#portfolio"],["Pricing","/#pricing"],["Process","/#process"],["Contact","/#contact"],["Client Login","/login"]].map(([l,h])=>(<a key={l} href={h} style={{display:"block",color:"#8a93ab",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>))}
        </div>
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#2563eb",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Contact</div>
          <a href={`mailto:${CONTACT.email}`} style={{display:"block",color:"#8a93ab",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{CONTACT.email}</a>
          <p style={{color:"#8a93ab",fontSize:".84rem",marginBottom:"1.2rem"}}>United Kingdom</p>
          <a href="/#contact" style={{display:"inline-flex",alignItems:"center",gap:".4rem",color:"#60a5fa",fontSize:".84rem",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,transition:"opacity .3s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Start a project →</a>
        </div>
      </div>
      
      <div className="row pt-3 border-top align-items-center" style={{borderColor:"rgba(37,99,235,.07) !important"}}>
        <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
          <p style={{color:"#3a4260",fontSize:".76rem",fontFamily:"'Baloo 2',sans-serif",margin:0}}>© {new Date().getFullYear()} Pixel &amp; Brush. All rights reserved. United Kingdom.</p>
        </div>
        <div className="col-12 col-md-6 text-center text-md-end">
          <p style={{color:"#3a4260",fontSize:".72rem",fontFamily:"'Baloo 2',sans-serif",letterSpacing:".08em",margin:0}}>CRAFTED WITH ❤ IN THE UK</p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
