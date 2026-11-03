import { useState, useEffect, useRef } from "react";

/** `as` lets callers render a <span> (display:block) when nesting inside an <h1>, keeping valid HTML. */
const SplitHeading = ({text,size="clamp(3rem,8vw,6.5rem)",delay=0,shimmer=false,as:Tag="div"}) => {
  const [vis,setVis]=useState(false);
  const ref=useRef(null);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{if(e.isIntersecting){setVis(true);obs.disconnect();}},{threshold:.1});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[]);
  const chars=text.split("");
  return (
    <Tag ref={ref} style={{fontFamily:"'Baloo 2',sans-serif",fontSize:size,letterSpacing:".04em",lineHeight:1.02,display:"block",perspective:"600px"}}>
      {chars.map((ch,i)=>(
        <span key={i} style={{
          animationDelay:vis?`${delay+i*0.045}s`:"9999s",animationPlayState:vis?"running":"paused",
          ...(shimmer?{}:{background:"linear-gradient(130deg,#e8edf7 0%,#60a5fa 55%,#22d3ee 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}),
        }} className={shimmer?"char shimmer-text":"char"}>
          {ch===" "?"\u00a0":ch}
        </span>
      ))}
    </Tag>
  );
};

export default SplitHeading;
