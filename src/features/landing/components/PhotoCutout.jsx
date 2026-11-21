const PhotoCutout = () => (
  <div style={{position:"relative",width:"clamp(240px,26vw,360px)",flexShrink:0,animation:"photoFloat 5s ease-in-out infinite",margin:"0 auto"}}>
    <div style={{position:"absolute",bottom:"-8%",left:"10%",right:"10%",height:"55%",background:"radial-gradient(ellipse,rgba(249,115,22,.38) 0%,rgba(147,51,234,.28) 45%,transparent 75%)",filter:"blur(28px)",animation:"glowPulse 3s ease-in-out infinite",zIndex:0}}/>
    <div style={{position:"relative",zIndex:1,background:"linear-gradient(160deg,rgba(124,58,237,.22),rgba(249,115,22,.12))",border:"1px solid rgba(249,115,22,.32)",borderRadius:"50% 50% 46% 46% / 40% 40% 60% 60%",overflow:"hidden",aspectRatio:"3/4",display:"flex",alignItems:"flex-end",justifyContent:"center",backdropFilter:"blur(2px)"}}>
      <div style={{width:"88%",height:"95%",background:"linear-gradient(160deg,rgba(147,51,234,.18),rgba(249,115,22,.09))",borderRadius:"50% 50% 0 0",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <img src="/me.webp" alt="Anil Pandey, Founder of Pixel & Brush in London" width="720" height="960" fetchPriority="high" decoding="async" style={{width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top"}}/>
      </div>
    </div>
    <div style={{position:"absolute",inset:"-8%",border:"1px dashed rgba(249,115,22,.24)",borderRadius:"50% 50% 46% 46% / 40% 40% 60% 60%",animation:"floatY 6s ease-in-out infinite",zIndex:0}}/>
    {[{t:"3x",l:"Avg Growth",pos:{bottom:"8%",right:"-8%"}},{t:"15+",l:"Projects",pos:{top:"12%",left:"-10%"}}].map((b,i)=>(
      <div key={i} style={{position:"absolute",...b.pos,background:"rgba(14,8,28,.92)",border:"1px solid rgba(249,115,22,.38)",borderRadius:12,padding:".55rem .95rem",zIndex:2,backdropFilter:"blur(12px)",boxShadow:"0 12px 28px rgba(0,0,0,.45)"}}>
        <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.3rem",background:"linear-gradient(135deg,#c084fc,#f97316,#fbbf24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{b.t}</div>
        <div style={{color:"#a79ab8",fontSize:".62rem",letterSpacing:".08em",textTransform:"uppercase",fontFamily:"'Outfit',sans-serif"}}>{b.l}</div>
      </div>
    ))}
  </div>
);

export default PhotoCutout;
