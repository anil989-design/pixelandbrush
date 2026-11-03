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
      <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:500,padding:"1.1rem clamp(1.5rem,5vw,4rem)",display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(3,3,10,.88)":"transparent",backdropFilter:sc?"blur(22px)":"none",borderBottom:sc?"1px solid rgba(37,99,235,.1)":"1px solid transparent",transition:"all .5s ease",opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(-20px)"}}>
        <a href="/" aria-label="Pixel & Brush home" style={{textDecoration:"none"}}><div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.2rem",letterSpacing:".04em",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Pixel<span style={{opacity:.55}}>&</span>Brush</div></a>
        <div className="nav-links" style={{display:"flex",gap:"2.5rem",alignItems:"center",flexWrap:"wrap"}}>
          {NAV_LINKS.map(([l,h])=>(
            <a key={l} href={h} style={{color:"#8a93ab",textDecoration:"none",fontSize:".8rem",letterSpacing:".1em",textTransform:"uppercase",fontWeight:600,transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>
          ))}
        </div>
        <div className="nav-btns" style={{display:"flex",gap:"1rem"}}>
          <Button href="/login">Client Login</Button>
          <Button primary href="/#contact">Get Started</Button>
        </div>
        <button className="hamburger" onClick={()=>setOpen(o=>!o)} aria-label="Toggle navigation" style={{display:"none",flexDirection:"column",gap:5,background:"none",border:"none",cursor:"pointer",padding:"6px",zIndex:810}}>
          {[0,1,2].map(i=>(<span key={i} style={{display:"block",width:24,height:2,background:"#60a5fa",borderRadius:2,transition:"all .3s",transform:open?(i===0?"rotate(45deg) translate(5px,5px)":i===1?"scaleX(0)":"rotate(-45deg) translate(5px,-5px)"):"none",opacity:open&&i===1?0:1}}/>))}
        </button>
      </nav>
      <div className={`mobile-overlay${open?" open":""}`} onClick={close}/>
      <div className={`mobile-drawer${open?" open":""}`}>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.2rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:"1.2rem"}}>Pixel&Brush</div>
        {NAV_LINKS.map(([l,h])=>(
          <a key={l} href={h} onClick={close} style={{color:"#8a93ab",textDecoration:"none",fontSize:".98rem",letterSpacing:".05em",fontWeight:600,padding:".85rem 0",borderBottom:"1px solid rgba(37,99,235,.07)",display:"block",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#e8edf7"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{l}</a>
        ))}
        <div style={{marginTop:"1.6rem",display:"flex",flexDirection:"column",gap:".9rem"}}>
          <a href="/login" onClick={close} style={{textAlign:"center",padding:".88rem",border:"1px solid rgba(37,99,235,.35)",borderRadius:6,color:"#e8edf7",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem"}}>Client Login</a>
          <a href="/#contact" onClick={close} style={{textAlign:"center",padding:".88rem",background:"linear-gradient(135deg,#1e3a8a,#2563eb)",borderRadius:6,color:"#fff",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem",boxShadow:"0 0 20px rgba(37,99,235,.35)"}}>Get Started →</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
