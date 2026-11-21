import { useState, useEffect } from "react";
import Button from "../common/Button";

/** [label, href] – section links are root-relative ("/#…") so they also work from /about. */
const NAV_LINKS = [["About","/about"],["Services","/#services"],["Pricing","/#pricing"],["Portfolio","/#portfolio"],["Process","/#process"],["Contact","/#contact"]];

const Navbar = ({vis}) => {
  const [sc,setSc]=useState(false);
  const [open,setOpen]=useState(false);
  useEffect(()=>{ const fn=()=>setSc(window.scrollY>50); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  const close=()=>setOpen(false);
  return (
    <>
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,padding:"1.05rem clamp(1.5rem,5vw,4rem)",display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(7,4,14,.9)":"transparent",backdropFilter:sc?"blur(22px)":"none",borderBottom:sc?"1px solid rgba(249,115,22,.16)":"1px solid transparent",transition:"all .5s ease",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(-20px)"}}>
        <a href="/" aria-label="Pixel and Brush home" style={{textDecoration:"none",display:"inline-flex",alignItems:"center",gap:".65rem"}}>
          <img src="/logo-icon.webp" alt="Pixel and Brush logo" width="40" height="40" style={{width:40,height:40,borderRadius:10,display:"block",boxShadow:"0 0 18px rgba(249,115,22,.3),0 0 12px rgba(147,51,234,.35)",border:"1px solid rgba(249,115,22,.3)"}} />
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.25rem",letterSpacing:".02em",display:"inline-flex",alignItems:"baseline",gap:".32rem"}}>
            <span style={{color:"#ffffff"}}>Pixel</span>
            <span style={{color:"#a1a1aa",fontStyle:"italic",fontWeight:400,fontSize:".78em",fontFamily:"'Outfit',sans-serif"}}>and</span>
            <span style={{background:"linear-gradient(135deg,#fbbf24,#f97316,#ea580c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Brush</span>
          </div>
        </a>
        <div className="nav-links" style={{display:"flex",gap:"2.5rem",alignItems:"center",flexWrap:"wrap"}}>
          {NAV_LINKS.map(([l,h])=>(
            <a key={l} href={h} style={{color:"#a79ab8",textDecoration:"none",fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:600,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#fb923c"} onMouseLeave={e=>e.target.style.color="#a79ab8"}>{l}</a>
          ))}
        </div>
        <div className="nav-btns" style={{display:"flex",gap:"1rem"}}>
          <Button href="/login">Client Login</Button>
          <Button primary href="/#contact">Get Started</Button>
        </div>
        <button className="hamburger" onClick={()=>setOpen(o=>!o)} aria-label="Toggle navigation" style={{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:"6px",zIndex:810}}>
          {[0,1,2].map(i=>(<span key={i} style={{display:"block",width:24,height:2,background:"linear-gradient(90deg,#a855f7,#f97316)",borderRadius:2,transition:"all .3s",transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===1?"scaleX(0)":"rotate(-45deg) translate(5px,-5px)"):"none",opacity:open&&i===1?0:1}}/>))}
        </button>
      </nav>
      <div className={`mobile-overlay${open?" open":""}`} onClick={close}/>
      <div className={`mobile-drawer${open?" open":""}`}>
        <div style={{display:"flex",alignItems:"center",gap:".6rem",marginBottom:"1.2rem"}}>
          <img src="/logo-icon.webp" alt="Pixel and Brush logo" width="36" height="36" style={{width:36,height:36,borderRadius:9,display:"block",border:"1px solid rgba(249,115,22,.3)"}} />
          <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.2rem",display:"inline-flex",alignItems:"baseline",gap:".3rem"}}>
            <span style={{color:"#ffffff"}}>Pixel</span>
            <span style={{color:"#a1a1aa",fontStyle:"italic",fontWeight:400,fontSize:".78em",fontFamily:"'Outfit',sans-serif"}}>and</span>
            <span style={{background:"linear-gradient(135deg,#fbbf24,#f97316,#ea580c)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Brush</span>
          </div>
        </div>
        {NAV_LINKS.map(([l,h])=>(
          <a key={l} href={h} onClick={close} style={{color:"#a79ab8",textDecoration:"none",fontSize:".98rem",letterSpacing:".05em",fontWeight:600,padding:".85rem 0",borderBottom:"1px solid rgba(168,85,247,.1)",display:"block",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#fb923c"} onMouseLeave={e=>e.target.style.color="#a79ab8"}>{l}</a>
        ))}
        <div style={{marginTop:"1.6rem",display:"flex",flexDirection:"column",gap:".9rem"}}>
          <a href="/login" onClick={close} style={{textAlign:"center",padding:".88rem",border:"1px solid rgba(249,115,22,.38)",borderRadius:8,color:"#f4f1fa",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem"}}>Client Login</a>
          <a href="/#contact" onClick={close} style={{textAlign:"center",padding:".88rem",background:"linear-gradient(135deg,#7c3aed,#db2777,#f97316)",borderRadius:8,color:"#fff",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem",boxShadow:"0 0 22px rgba(249,115,22,.35)"}}>Get Started →</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
