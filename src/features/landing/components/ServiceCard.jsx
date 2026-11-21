import { useState } from "react";
import Button from "../../../components/common/Button";

const ServiceCard = ({iconClass,title,desc,features,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="h-100 rv sc" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:hov?"rgba(24,11,46,.96)":"rgba(12,6,26,.84)",
        border:`1px solid ${hov?"rgba(249,115,22,.55)":"rgba(168,85,247,.16)"}`,
        borderRadius:18,padding:"2.6rem 2.1rem",position:"relative",overflow:"hidden",
        transition:"all .45s cubic-bezier(.22,1,.36,1)",
        boxShadow:hov?"0 22px 65px rgba(249,115,22,.18),0 0 30px rgba(147,51,234,.18),inset 0 1px 0 rgba(251,146,60,.16)":"none",
        transform:hov?"translateY(-10px)":"none",
        display:"flex",flexDirection:"column"
      }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:"linear-gradient(90deg,#7c3aed,#ec4899,#f97316,#fbbf24)",transform:`scaleX(${hov?1:0})`,transition:"transform .45s cubic-bezier(.22,1,.36,1)",transformOrigin:"left"}}/>
      <div style={{position:"absolute",width:180,height:180,background:"radial-gradient(circle,rgba(249,115,22,.16),rgba(147,51,234,.08),transparent 70%)",top:-50,right:-50,opacity:hov?1:0,transition:"opacity .45s",pointerEvents:"none"}}/>
      <div style={{fontSize:"2.2rem",marginBottom:"1.3rem",color:hov?"#fb923c":"#c084fc",filter:`drop-shadow(0 0 12px rgba(249,115,22,${hov?.75:.2}))`,transition:"color .3s,filter .3s"}}>
        <i className={iconClass}></i>
      </div>
      <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.25rem",letterSpacing:"-.01em",marginBottom:".65rem"}}>{title}</h3>
      <p style={{color:"#a79ab8",fontSize:".88rem",lineHeight:1.74,marginBottom:"1.5rem",flexGrow:1}}>{desc}</p>
      <ul style={{listStyle:"none",paddingLeft:0,display:"flex",flexDirection:"column",gap:".45rem",marginBottom:"1.8rem"}}>
        {features.map((f,i)=>(<li key={i} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".83rem",color:"#b8adc9"}}><span style={{color:"#f97316",flexShrink:0}}>▸</span>{f}</li>))}
      </ul>
      <Button href="#contact">Enquire →</Button>
    </div>
  );
};

export default ServiceCard;
