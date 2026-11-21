import SectionLabel from "../../../components/common/SectionLabel";
import { steps } from "../data/process";

const ProcessSection = () => {
  return (
  <section id="process" style={{padding:"8rem 0",background:"rgba(9,4,18,.7)",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="rv mb-5" data-dir="left">
        <SectionLabel text="How It Works"/>
        <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",marginBottom:"1.2rem",lineHeight:1.08}}>Simple. <span style={{background:"linear-gradient(135deg,#c084fc,#ec4899,#f97316,#fbbf24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Transparent.</span> Fast.</h2>
        <p style={{color:"#a79ab8",maxWidth:460,lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>From first contact to final launch — a clear process with no surprises and no hidden fees.</p>
      </div>
      <div className="row g-4 position-relative">
        {steps.map((s,i)=>(
          <div key={i} className="col-12 col-sm-6 col-lg-3">
            <div className="h-100 rv" data-delay={i*.1} style={{padding:"0 .5rem",position:"relative",zIndex:1}} onMouseEnter={e=>{const el=e.currentTarget.querySelector(".sn");if(el)el.style.boxShadow="0 0 28px rgba(249,115,22,.65),0 0 0 4px rgba(249,115,22,.15)";}} onMouseLeave={e=>{const el=e.currentTarget.querySelector(".sn");if(el)el.style.boxShadow="none";}}>
              <div className="sn" style={{width:54,height:54,borderRadius:"50%",background:"linear-gradient(135deg,rgba(124,58,237,.75),rgba(249,115,22,.45))",border:"1.5px solid rgba(249,115,22,.5)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1rem",color:"#fbbf24",marginBottom:"1.8rem",transition:"box-shadow .3s"}}>{s.n}</div>
              <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".68rem",color:"#fb923c",letterSpacing:".18em",textTransform:"uppercase",marginBottom:".6rem"}}>Step {s.n}</div>
              <h3 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"1.15rem",letterSpacing:"-.01em",marginBottom:".5rem"}}>{s.title}</h3>
              <p style={{color:"#a79ab8",fontSize:".86rem",lineHeight:1.68}}>{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ProcessSection;
