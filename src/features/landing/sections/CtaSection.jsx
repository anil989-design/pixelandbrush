import Button from "../../../components/common/Button";

const CtaSection = () => {
  return (
  <section style={{padding:"7rem 0",position:"relative",zIndex:1,overflow:"hidden"}}>
    <div style={{position:"absolute",inset:0,background:"radial-gradient(ellipse 80% 60% at 50% 50%,rgba(37,99,235,.06),transparent)",pointerEvents:"none"}}/>
    <div className="container px-4 px-lg-5">
      <div className="rv sc mx-auto text-center" style={{maxWidth:780,background:"rgba(8,6,24,.94)",border:"1px solid rgba(37,99,235,.2)",borderRadius:24,padding:"4.5rem clamp(2rem,6vw,5rem)",backdropFilter:"blur(24px)",animation:"ctaGlow 5s ease-in-out infinite",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#2563eb,#22d3ee,transparent)"}}/>
        <div style={{position:"absolute",bottom:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(37,99,235,.3),rgba(34,211,238,.3),transparent)"}}/>
        <div style={{position:"absolute",top:"-50%",left:"50%",transform:"translateX(-50%)",width:"60%",height:"100%",background:"radial-gradient(ellipse,rgba(37,99,235,.09),transparent 70%)",pointerEvents:"none"}}/>
        <h2 style={{position:"relative",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2rem,4.5vw,3.4rem)",letterSpacing:"-.02em",marginBottom:"1rem",lineHeight:1.08}}>Ready to Stand Out<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>From the Competition?</span></h2>
        <p style={{position:"relative",color:"#8a93ab",marginBottom:"2.4rem",fontFamily:"'Outfit',sans-serif",fontSize:"1.05rem",lineHeight:1.72,maxWidth:480,margin:"0 auto 2.4rem"}}>First consultation is completely free. No commitment required.</p>
        <div style={{display:"flex",gap:"1rem",justifyContent:"center",flexWrap:"wrap",position:"relative"}}>
          <Button primary href="#contact">Book a Free Call →</Button>
          <Button href="#portfolio">See Our Work</Button>
        </div>
      </div>
    </div>
  </section>
  );
};

export default CtaSection;
