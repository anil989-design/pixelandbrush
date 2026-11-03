import Button from "../../../components/common/Button";
import Counter from "../../../components/common/Counter";
import SplitHeading from "../../../components/common/SplitHeading";
import PhotoCutout from "../components/PhotoCutout";

const HeroSection = ({ heroVis }) => {
  return (
  <section style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"8rem 0 5rem",position:"relative",overflow:"hidden",zIndex:1}}>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(5rem,17vw,15rem)",color:"rgba(37,99,235,.04)",whiteSpace:"nowrap",pointerEvents:"none",userSelect:"none",letterSpacing:"-.02em",zIndex:0}}>DIGITAL</div>
    
    <div className="container px-4 px-lg-5 position-relative" style={{zIndex:2}}>
      <div className="row align-items-center justify-content-between g-5">
        <div className="col-12 col-lg-7">
          <div style={{display:"inline-flex",alignItems:"center",gap:".5rem",background:"rgba(37,99,235,.09)",border:"1px solid rgba(37,99,235,.24)",padding:".38rem 1rem",borderRadius:100,marginBottom:"1.8rem",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(14px)",transition:"all .8s .1s cubic-bezier(.22,1,.36,1)"}}>
            <span style={{width:7,height:7,background:"#22d3ee",borderRadius:"50%",animation:"blink 1.5s ease infinite",flexShrink:0}}/>
            <span style={{color:"#60a5fa",fontSize:".7rem",letterSpacing:".14em",textTransform:"uppercase",fontWeight:600}}>Available for new projects</span>
          </div>
          {/* Semantic H1 – margins/font reset so it renders exactly like the previous <div>. */}
          <h1 style={{margin:0,fontSize:"inherit",fontWeight:"inherit",lineHeight:"inherit",color:"inherit",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(26px)",transition:"all .9s .22s cubic-bezier(.22,1,.36,1)"}}>
            <SplitHeading as="span" text="We Craft" delay={0}/>
            <SplitHeading as="span" text="Digital World" delay={0.15} shimmer={true}/>
          </h1>
          <p style={{fontFamily:"'Outfit',sans-serif",fontWeight:300,fontSize:"clamp(1.1rem,2.2vw,1.4rem)",color:"#9aa6c4",lineHeight:1.65,maxWidth:480,margin:"1.6rem 0 2.4rem",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(14px)",transition:"all .85s .42s cubic-bezier(.22,1,.36,1)"}}>
            Web development, graphic design &amp; social media management — for businesses ready to own their digital space.
          </p>
          <div style={{display:"flex",flexWrap:"wrap",gap:"1rem",opacity:heroVis?1:0,transform:heroVis?"none":"translateY(14px)",transition:"all .8s .58s cubic-bezier(.22,1,.36,1)"}}>
            <Button primary href="#contact">Start a Project →</Button>
            <Button href="#portfolio">View Our Work</Button>
          </div>
          <div className="row g-4 mt-4 pt-3 border-top" style={{borderColor:"rgba(37,99,235,.1) !important",opacity:heroVis?1:0,transition:"opacity 1s .78s ease"}}>
            {[{n:15,s:"+",l:"Projects Delivered"},{n:100,s:"%",l:"Client Satisfaction"},{n:3,s:"x",l:"Avg Engagement Boost"}].map((st,i)=>(
              <div key={i} className="col-4">
                <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(1.6rem,3vw,2.4rem)",background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}><Counter end={st.n} suffix={st.s}/></div>
                <div style={{color:"#6f7a96",fontSize:".68rem",letterSpacing:".1em",textTransform:"uppercase",marginTop:".18rem"}}>{st.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 col-lg-5 text-center" style={{opacity:heroVis?1:0,transform:heroVis?"none":"translateX(28px) scale(.94)",transition:"all 1s .65s cubic-bezier(.22,1,.36,1)"}}>
          <PhotoCutout/>
        </div>
      </div>
    </div>

    <div style={{position:"absolute",bottom:"2.5rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:".5rem",opacity:.28,zIndex:1}}>
      <span style={{fontSize:".62rem",letterSpacing:".18em",textTransform:"uppercase",color:"#6f7a96",fontFamily:"'Baloo 2',sans-serif",fontWeight:600}}>Scroll</span>
      <div style={{width:1,height:42,background:"linear-gradient(#2563eb,transparent)",animation:"floatY 2s ease-in-out infinite"}}/>
    </div>
  </section>
  );
};

export default HeroSection;
