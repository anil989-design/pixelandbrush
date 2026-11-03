import SectionLabel from "../../../components/common/SectionLabel";
import { aboutFeatures } from "../data/about";

const AboutSection = () => {
  return (
  <section style={{padding:"7rem 0",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="rv text-center mx-auto mb-5" data-dir="up" style={{maxWidth:640}}>
        <SectionLabel text="Why Pixel & Brush"/>
        <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,4vw,3.4rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1.1rem"}}>
          A Studio That Cares About<br/>
          <span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Your Growth</span>
        </h2>
        <p style={{color:"#8a93ab",lineHeight:1.76,fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>We're a small, focused digital studio based in the UK. Senior-level work at every stage — no junior hand-offs, no bloated overhead.</p>
      </div>
      
      <div className="row g-3 g-md-4 justify-content-center">
        {aboutFeatures.map((f,i)=>(
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <div className="h-100 rv" data-delay={i*.07} style={{background:"rgba(8,4,20,.7)",border:"1px solid rgba(37,99,235,.09)",borderRadius:16,padding:"1.6rem",display:"flex",gap:"1.1rem",alignItems:"flex-start",transition:"border-color .3s,background .3s,transform .3s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(37,99,235,.35)";e.currentTarget.style.background="rgba(16,8,36,.9)";e.currentTarget.style.transform="translateY(-4px)";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(37,99,235,.09)";e.currentTarget.style.background="rgba(8,4,20,.7)";e.currentTarget.style.transform="none";}}>
              <div style={{fontSize:"1.6rem",color:"#60a5fa",flexShrink:0}}><i className={f.iconClass}></i></div>
              <div>
                <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:"1rem",marginBottom:".32rem"}}>{f.title}</div>
                <div style={{color:"#8a93ab",fontSize:".83rem",lineHeight:1.6}}>{f.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default AboutSection;
