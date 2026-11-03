import SectionLabel from "../../../components/common/SectionLabel";
import ServiceCard from "../components/ServiceCard";
import { services } from "../data/services";

const ServicesSection = () => {
  return (
  <section id="services" style={{padding:"8rem 0",position:"relative",zIndex:1,background:"rgba(4,3,12,.5)"}}>
    <div className="container px-4 px-lg-5">
      <div className="rv mb-5" data-dir="left">
        <SectionLabel text="What We Do"/>
        <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",marginBottom:"1.2rem",lineHeight:1.08}}>Services Built for<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Modern Businesses</span></h2>
        <p style={{color:"#8a93ab",maxWidth:460,lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>Everything your brand needs to dominate the digital space — under one focused roof.</p>
      </div>
      <div className="row g-4">
        {services.map((s,i)=>(
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <ServiceCard {...s}/>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default ServicesSection;
