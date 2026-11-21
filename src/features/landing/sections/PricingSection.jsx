import SectionLabel from "../../../components/common/SectionLabel";
import PricingCard from "../components/PricingCard";
import { pricingPlans } from "../data/pricing";

const PricingSection = () => {
  return (
  <section id="pricing" style={{padding:"8rem 0",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="rv text-center mb-5" data-dir="up">
        <SectionLabel text="Transparent Pricing"/>
        <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1rem"}}>
          Clear Packages,{" "}
          <span style={{background:"linear-gradient(135deg,#c084fc,#ec4899,#f97316,#fbbf24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>No Hidden Costs</span>
        </h2>
        <p style={{color:"#a79ab8",lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem",maxWidth:480,margin:"0 auto"}}>Fixed-price packages so you always know exactly what you're getting. All projects include free 30-day aftercare.</p>
      </div>
      
      <div className="row g-4 justify-content-center align-items-stretch">
        {pricingPlans.map((p,i)=>(
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <PricingCard {...p}/>
          </div>
        ))}
      </div>
      
      <div className="rv text-center mt-5">
        <p style={{color:"#8f84a6",fontSize:".86rem"}}>Need something custom? <a href="#contact" style={{color:"#fb923c",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700}}>Let's talk →</a></p>
      </div>
    </div>
  </section>
  );
};

export default PricingSection;
