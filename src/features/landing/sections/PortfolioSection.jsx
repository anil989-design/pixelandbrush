import SectionLabel from "../../../components/common/SectionLabel";
import PortfolioCard from "../components/PortfolioCard";
import { portfolio } from "../data/portfolio";

const PortfolioSection = () => {
  return (
  <section id="portfolio" style={{padding:"8rem 0",background:"rgba(9,4,18,.6)",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="rv mb-5" data-dir="right">
        <SectionLabel text="Our Work"/>
        <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.4rem,4.5vw,3.8rem)",letterSpacing:"-.02em",marginBottom:"1.2rem",lineHeight:1.08}}>
          Recent{" "}<span style={{background:"linear-gradient(135deg,#c084fc,#ec4899,#f97316,#fbbf24)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Projects</span>
        </h2>
        <p style={{color:"#a79ab8",maxWidth:460,lineHeight:1.74,fontFamily:"'Outfit',sans-serif",fontSize:"1rem"}}>A curated selection of websites, brands, and campaigns we have delivered.</p>
      </div>
      <div className="row g-4">
        {portfolio.map((p,i)=>(
          <div key={i} className="col-12 col-md-6 col-lg-4">
            <PortfolioCard {...p}/>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default PortfolioSection;
