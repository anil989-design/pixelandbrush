import { useState } from "react";
import SectionLabel from "../../../components/common/SectionLabel";
import FaqItem from "../components/FaqItem";
import { faqItems } from "../data/faq";

const FaqSection = () => {
  const [openFaq, setOpenFaq] = useState(null);
  return (
  <section style={{padding:"8rem 0",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="row g-5 align-items-start">
        <div className="col-12 col-lg-5">
          <div className="rv" data-dir="left">
            <SectionLabel text="Got Questions?"/>
            <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,4vw,3.4rem)",letterSpacing:"-.02em",lineHeight:1.08,marginBottom:"1.1rem"}}>
              Frequently<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Asked Questions</span>
            </h2>
            <p style={{color:"#8a93ab",lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem",marginBottom:"1.5rem"}}>
              Can't find your answer?{" "}
              <a href="#contact" style={{color:"#60a5fa",textDecoration:"none",fontFamily:"'Baloo 2',sans-serif",fontWeight:700}}>Get in touch →</a>
            </p>
            <div style={{marginTop:"2rem",background:"rgba(37,99,235,.07)",border:"1px solid rgba(37,99,235,.18)",borderRadius:14,padding:"1.3rem 1.5rem",display:"flex",gap:"1rem",alignItems:"center"}}>
              <span style={{fontSize:"1.6rem",color:"#22d3ee"}}><i className="bi bi-chat-dots-fill"></i></span>
              <div>
                <div style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".9rem",marginBottom:".2rem"}}>Still have questions?</div>
                <div style={{color:"#8a93ab",fontSize:".82rem"}}>We respond within 2 hours on weekdays.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-7">
          <div className="rv" data-dir="right" data-delay=".1">
            {faqItems.map((item,i)=>(
              <FaqItem key={i} {...item} isOpen={openFaq===i} toggle={()=>setOpenFaq(openFaq===i?null:i)}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default FaqSection;
