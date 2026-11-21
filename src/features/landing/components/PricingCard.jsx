import { useState } from "react";
import Button from "../../../components/common/Button";

const PricingCard = ({name,price,desc,features,highlight,cta,delay}) => {
  const [hov,setHov]=useState(false);
  return (
    <div className="h-100 rv sc" data-delay={delay}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{
        background:highlight?"linear-gradient(145deg,rgba(124,58,237,.32),rgba(249,115,22,.14))":"rgba(12,6,26,.84)",
        border:`1px solid ${hov||highlight?"rgba(249,115,22,.55)":"rgba(168,85,247,.16)"}`,
        borderRadius:18,padding:"2.6rem 2rem",position:"relative",overflow:"hidden",
        transition:"all .45s cubic-bezier(.22,1,.36,1)",
        boxShadow:highlight||hov?"0 28px 70px rgba(249,115,22,.2),0 0 30px rgba(147,51,234,.2)":"none",
        transform:hov?"translateY(-10px)":"none",
        display:"flex",flexDirection:"column",justifyContent:"space-between"
      }}>
      <div>
        {highlight&&(
          <div style={{position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",background:"linear-gradient(135deg,#7c3aed,#db2777,#f97316)",padding:".32rem 1.2rem",borderRadius:100,fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",letterSpacing:".12em",textTransform:"uppercase",whiteSpace:"nowrap",color:"#fff"}}>⭐ Most Popular</div>
        )}
        <div style={{position:"absolute",top:0,left:0,right:0,height:2.5,background:"linear-gradient(90deg,transparent,#a855f7,#f97316,#fbbf24,transparent)",opacity:highlight||hov?1:0,transition:"opacity .3s"}}/>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".7rem",color:"#fb923c",letterSpacing:".2em",textTransform:"uppercase",marginBottom:".7rem"}}>{name}</div>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"2.8rem",marginBottom:".25rem"}}>
          {price}<span style={{fontSize:".85rem",color:"#8f84a6",fontWeight:400,fontFamily:"'Outfit',sans-serif"}}> /project</span>
        </div>
        <p style={{color:"#a79ab8",fontSize:".88rem",marginBottom:"1.8rem",lineHeight:1.65}}>{desc}</p>
        <ul style={{listStyle:"none",paddingLeft:0,display:"flex",flexDirection:"column",gap:".6rem",marginBottom:"2.2rem"}}>
          {features.map((f,i)=>(<li key={i} style={{display:"flex",alignItems:"center",gap:".6rem",fontSize:".86rem",color:"#b8adc9"}}><i className="bi bi-check2 flex-shrink-0" style={{color:"#fb923c"}}></i>{f}</li>))}
        </ul>
      </div>
      <Button primary={highlight} href="#contact" className="w-100">{cta||"Get Started →"}</Button>
    </div>
  );
};

export default PricingCard;
