import { useState, useEffect, useRef } from "react";

const Counter = ({end,suffix=""}) => {
  const [n,setN]=useState(0);
  const ref=useRef(null),started=useRef(false);
  useEffect(()=>{
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting&&!started.current){
        started.current=true; let v=0;
        const id=setInterval(()=>{v+=end/50;if(v>=end){setN(end);clearInterval(id);}else setN(Math.round(v));},28);
      }
    },{threshold:.3});
    if(ref.current) obs.observe(ref.current);
    return()=>obs.disconnect();
  },[end]);
  return <span ref={ref}>{n}{suffix}</span>;
};

export default Counter;
