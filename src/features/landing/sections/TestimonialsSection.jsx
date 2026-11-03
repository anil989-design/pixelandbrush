import SectionLabel from "../../../components/common/SectionLabel";
import TestimonialCard from "../components/TestimonialCard";
import { testimonials } from "../data/testimonials";

const TestimonialsSection = () => {
  return (
  <section style={{padding:"8rem 0",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="rv text-center mb-5" data-dir="up">
        <SectionLabel text="Client Stories"/>
        <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1rem"}}>
          What Our Clients{" "}<span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Say</span>
        </h2>
        <p style={{color:"#8a93ab",lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem",maxWidth:460,margin:"0 auto"}}>Real feedback from real businesses we've helped grow.</p>
      </div>
      <div className="row g-4 align-items-stretch">
        {testimonials.map((t,i)=>(
          <div key={i} className="col-12 col-md-4">
            <TestimonialCard {...t}/>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default TestimonialsSection;
