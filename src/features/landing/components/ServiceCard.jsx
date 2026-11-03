import { useState } from "react";
import Button from "../../../components/common/Button";

const ServiceCard = ({iconClass,title,desc,features,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="h-100 rv sc" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:hov?"rgba(22,12,48,.96)":"rgba(8,4,20,.82)",
        border:`1px solid ${hov?"rgba(37,99,235,.52)":"rgba(37,99,235,.1)"}`,
        borderRadius:18,padding:"2.6rem 2.1rem",position:"relative",overflow:"hidden",
        transition:"all .45s cubic-bezier(.22,1,.36,1)",
        boxShadow:hov?"0 22px 65px rgba(37,99,235,.2),inset 0 1px 0 rgba(96,165,250,.12)":"none",
        transform:hov?"translateY(-10px)":"none",
        display:"flex",flexDirection:"column"
      }}>
      <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,#1e3a8a,#22d3ee)",transform:`scaleX(${hov?1:0})`,transition:"transform .45s cubic-bezier(.22,1,.36,1)",transformOrigin:"left"}}/>
      <div style={{position:"absolute",width:180,height:180,background:"radial-gradient(circle,rgba(37,99,235,.14),transparent 70%)",top:-50,right:-50,opacity:hov?1:0,transition:"opacity .45s",pointerEvents:"none"}}/>
      <div style={{fontSize:"2.2rem",marginBottom:"1.3rem",color:"#60a5fa",filter:`drop-shadow(0 0 10px rgba(37,99,235,${hov?.85:.25}))`,transition:"filter .3s"}}>
        <i className={iconClass}></i>
      </div>
      <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.25rem",letterSpacing:"-.01em",marginBottom:".65rem"}}>{title}</h3>
      <p style={{color:"#8a93ab",fontSize:".88rem",lineHeight:1.74,marginBottom:"1.5rem",flexGrow:1}}>{desc}</p>
      <ul style={{listStyle:"none",paddingLeft:0,display:"flex",flexDirection:"column",gap:".45rem",marginBottom:"1.8rem"}}>
        {features.map((f,i)=>(<li key={i} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".83rem",color:"#9898b8"}}><span style={{color:"#2563eb",flexShrink:0}}>▸</span>{f}</li>))}
      </ul>
      <Button href="#contact">Enquire →</Button>
    </div>
  );
};

export default ServiceCard;
