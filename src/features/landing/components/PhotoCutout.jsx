

const PhotoCutout = () => (
  <div style={{position:"relative",width:"clamp(240px,26vw,360px)",flexShrink:0,animation:"photoFloat 5s ease-in-out infinite",margin:"0 auto"}}>
    <div style={{position:"absolute",bottom:"-8%",left:"10%",right:"10%",height:"55%",background:"radial-gradient(ellipse,rgba(37,99,235,.42) 0%,transparent 70%)",filter:"blur(26px)",animation:"glowPulse 3s ease-in-out infinite",zIndex:0}}/>
    <div style={{position:"relative",zIndex:1,background:"linear-gradient(160deg,rgba(30,58,138,.18),rgba(34,211,238,.07))",border:"1px solid rgba(37,99,235,.25)",borderRadius:"50% 50% 46% 46% / 40% 40% 60% 60%",overflow:"hidden",aspectRatio:"3/4",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(2px)"}}>
      <div style={{width:"88%",height:"95%",background:"linear-gradient(160deg,rgba(37,99,235,.14),rgba(34,211,238,.06))",borderRadius:"50% 50% 0 0",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src="/me.webp" alt="Anil Panday, Digital Designer in London" width="720" height="960" fetchPriority="high" decoding="async" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      </div>
    </div>
    <div style={{position:"absolute",inset:"-8%",border:"1px dashed rgba(37,99,235,.18)",borderRadius:"50% 50% 46% 46% / 40% 40% 60% 60%",animation:"floatY 6s ease-in-out infinite",zIndex:0}}/>
    {[{t:"3x",l:"Avg Growth",pos:{bottom:"8%",right:"-8%"}},{t:"15+",l:"Projects",pos:{top:"12%",left:"-10%"}}].map((b,i)=>(
      <div key={i} style={{position:"absolute",...b.pos,background:"rgba(8,12,28,.92)",border:"1px solid rgba(37,99,235,.32)",borderRadius:10,padding:".55rem .9rem",zIndex:2,backdropFilter:"blur(10px)"}}>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontSize:"1.3rem",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{b.t}</div>
        <div style={{color:"#6f7a96",fontSize:".62rem",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"}}>{b.l}</div>
      </div>
    ))}
  </div>
);

export default PhotoCutout;
