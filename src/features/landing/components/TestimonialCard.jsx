

const TestimonialCard = ({quote,name,role,company,delay}) => (
  <div className="h-100 rv sc" data-delay={delay} style={{background:"rgba(8,4,22,.88)",border:"1px solid rgba(37,99,235,.14)",borderRadius:18,padding:"2.2rem",position:"relative",overflow:"hidden",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,rgba(37,99,235,.6),rgba(34,211,238,.5),transparent)"}}/>
    <div>
      <div style={{fontFamily:"Georgia,serif",fontSize:"3.5rem",lineHeight:.75,color:"rgba(37,99,235,.25)",marginBottom:"1rem",userSelect:"none"}}>"</div>
      <div style={{display:"flex",gap:".25rem",marginBottom:"1.1rem"}}>
        {[1,2,3,4,5].map(s=>(<span key={s} style={{color:"#f59e0b",fontSize:"1.05rem",display:"inline-block",animation:`starPop .4s ${s*.08}s cubic-bezier(.22,1,.36,1) both`}}>★</span>))}
      </div>
      <p style={{color:"#aab5cc",fontSize:".92rem",lineHeight:1.78,marginBottom:"1.8rem",fontStyle:"italic"}}>"{quote}"</p>
    </div>
    <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
      <div style={{width:46,height:46,borderRadius:"50%",background:"linear-gradient(135deg,#1e3a8a,#22d3ee)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.1rem",flexShrink:0,color:"#fff"}}>{name.charAt(0)}</div>
      <div>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".95rem"}}>{name}</div>
        <div style={{color:"#6f7a96",fontSize:".75rem",marginTop:".1rem"}}>{role} · {company}</div>
      </div>
    </div>
  </div>
);

export default TestimonialCard;
