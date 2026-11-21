import { CONTACT } from "../../config/constants";

const Footer = () => {
  return (
  <footer style={{padding:"3.5rem 0 2rem",borderTop:"1px solid rgba(249,115,22,.14)",position:"relative",zIndex:1,background:"rgba(6,3,12,.9)"}}>
    <div className="container px-4 px-lg-5">
      <div className="row g-4 mb-5">
        <div className="col-12 col-sm-6 col-lg-3">
          <a href="/" style={{display:"inline-flex",alignItems:"center",gap:".65rem",textDecoration:"none",marginBottom:".5rem"}}>
            <img src="/logo-icon.webp" alt="Pixel and Brush logo" width="38" height="38" style={{width:38,height:38,borderRadius:9,display:"block",boxShadow:"0 0 14px rgba(249,115,22,.28)",border:"1px solid rgba(249,115,22,.3)"}} />
            <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.3rem",letterSpacing:".02em",display:"inline-flex",alignItems:"baseline",gap:".32rem"}}>
              <span style={{color:"#ffffff"}}>Pixel</span>
              <span style={{color:"#a1a1aa",fontStyle:"italic",fontWeight:400,fontSize:".76em",fontFamily:"'Outfit',sans-serif"}}>and</span>
              <span style={{background:"linear-gradient(135deg,#fbbf24,#f97316,#ea580c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Brush</span>
            </div>
          </a>
          <div style={{color:"#a855f7",fontSize:".62rem",letterSpacing:".28em",textTransform:"uppercase",fontWeight:700,marginBottom:".7rem"}}>CREATE • DESIGN • INSPIRE</div>
          <p style={{color:"#8f84a6",fontSize:".83rem",lineHeight:1.7,maxWidth:240,marginBottom:".6rem"}}>Digital creative studio based in the UK — helping brands own their space online.</p>
          <p style={{fontSize:".83rem",marginBottom:"1.3rem"}}>
            <a href="/about" style={{color:"#a79ab8",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.currentTarget.style.color="#fb923c"} onMouseLeave={e=>e.currentTarget.style.color="#a79ab8"}>Founded by Anil Pandey</a>
          </p>
        </div>
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#f97316",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Services</div>
          {["Web Development","Social Media","Graphic Design","Full Package"].map(l=>(<a key={l} href="/#services" style={{display:"block",color:"#a79ab8",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#fb923c"} onMouseLeave={e=>e.target.style.color="#a79ab8"}>{l}</a>))}
        </div>
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#f97316",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Company</div>
          {[["About","/about"],["Portfolio","/#portfolio"],["Pricing","/#pricing"],["Process","/#process"],["Contact","/#contact"],["Client Login","/login"]].map(([l,h])=>(<a key={l} href={h} style={{display:"block",color:"#a79ab8",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#fb923c"} onMouseLeave={e=>e.target.style.color="#a79ab8"}>{l}</a>))}
        </div>
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#f97316",letterSpacing:".18em",textTransform:"uppercase",marginBottom:"1.1rem"}}>Contact</div>
          <a href={`mailto:${CONTACT.email}`} style={{display:"block",color:"#a79ab8",fontSize:".84rem",marginBottom:".55rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#fb923c"} onMouseLeave={e=>e.target.style.color="#a79ab8"}>{CONTACT.email}</a>
          <p style={{color:"#a79ab8",fontSize:".84rem",marginBottom:"1.2rem"}}>United Kingdom</p>
          <a href="/#contact" style={{display:"inline-flex",alignItems:"center",gap:".4rem",color:"#fb923c",fontSize:".84rem",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,transition:"opacity .3s"}} onMouseEnter={e=>e.currentTarget.style.opacity=".7"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>Start a project →</a>
        </div>
      </div>
      
      <div className="row pt-3 border-top align-items-center" style={{borderColor:"rgba(168,85,247,.12) !important"}}>
        <div className="col-12 col-md-6 text-center text-md-start mb-2 mb-md-0">
          <p style={{color:"#63587a",fontSize:".76rem",fontFamily:"'Baloo 2',sans-serif",margin:0}}>© {new Date().getFullYear()} Pixel &amp; Brush. All rights reserved. United Kingdom.</p>
        </div>
        <div className="col-12 col-md-6 text-center text-md-end">
          <p style={{color:"#63587a",fontSize:".72rem",fontFamily:"'Baloo 2',sans-serif",letterSpacing:".08em",margin:0}}>CREATE • DESIGN • INSPIRE · CRAFTED IN THE UK</p>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
