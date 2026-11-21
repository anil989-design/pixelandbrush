import { useState } from "react";

const PortfolioCard = ({img,title,desc,tag,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="h-100 rv" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        borderRadius:18,overflow:"hidden",border:`1px solid ${hov?"rgba(249,115,22,.48)":"rgba(168,85,247,.16)"}`,
        transition:"transform .5s cubic-bezier(.22,1,.36,1),box-shadow .5s,border-color .3s",
        transform:hov?"translateY(-12px) scale(1.015)":"none",
        boxShadow:hov?"0 30px 85px rgba(249,115,22,.22),0 0 30px rgba(147,51,234,.2)":"none",
        display:"flex",flexDirection:"column"
      }}>
      <div style={{height:200,position:"relative",overflow:"hidden",background:"#120924"}}>
        <img src={img} alt={`${title} – ${tag} project by Pixel & Brush`} loading="lazy" decoding="async" width="800" height="800" style={{width:"100%",height:"100%",objectFit:"cover",transform:hov?"scale(1.08)":"scale(1)",transition:"transform .6s cubic-bezier(.22,1,.36,1)"}}/>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(124,58,237,.32),rgba(249,115,22,.15))",opacity:hov?.35:.6,transition:"opacity .5s"}}/>
        {hov&&<div style={{position:"absolute",left:0,right:0,height:"50%",background:"linear-gradient(transparent,rgba(249,115,22,.14),transparent)",animation:"scanline 1.6s linear infinite"}}/>}
      </div>
      <div style={{background:"rgba(12,6,26,.97)",padding:"1.7rem",flexGrow:1,display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
        <div>
          <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.05rem",letterSpacing:"-.01em",marginBottom:".35rem"}}>{title}</h3>
          <p style={{color:"#a79ab8",fontSize:".83rem",marginBottom:".85rem",lineHeight:1.62}}>{desc}</p>
        </div>
        <div>
          <span style={{background:"rgba(249,115,22,.12)",border:"1px solid rgba(249,115,22,.32)",color:"#fb923c",fontSize:".68rem",padding:".22rem .75rem",borderRadius:6,textTransform:"uppercase",letterSpacing:".08em",fontWeight:700}}>{tag}</span>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
