import { useEffect, useRef } from "react";

const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const p = useRef({x:0,y:0}), l = useRef({x:0,y:0});
  const coarse = window.matchMedia("(pointer: coarse)").matches; // no custom cursor on touch
  useEffect(() => {
    if (coarse) return undefined;
    const mv = e => { p.current = {x:e.clientX,y:e.clientY}; };
    window.addEventListener("mousemove", mv);
    const g = () => ring.current && (ring.current.style.transform="scale(2)");
    const s = () => ring.current && (ring.current.style.transform="scale(1)");
    document.querySelectorAll("a,button,[data-hover]").forEach(el => {
      el.addEventListener("mouseenter",g); el.addEventListener("mouseleave",s);
    });
    let raf;
    const loop = () => {
      l.current.x += (p.current.x - l.current.x) * .1;
      l.current.y += (p.current.y - l.current.y) * .1;
      if (dot.current)  { dot.current.style.left=p.current.x-5+"px"; dot.current.style.top=p.current.y-5+"px"; }
      if (ring.current) { ring.current.style.left=l.current.x-20+"px"; ring.current.style.top=l.current.y-20+"px"; }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove",mv); };
  },[coarse]);
  if (coarse) return null;
  return (<>
    <div ref={dot}  style={{position:"fixed",width:10,height:10,background:"#60a5fa",borderRadius:"50%",pointerEvents:"none",zIndex:9999,mixBlendMode:"screen"}}/>
    <div ref={ring} style={{position:"fixed",width:40,height:40,border:"1.5px solid #2563eb",borderRadius:"50%",pointerEvents:"none",zIndex:9998,transition:"transform .35s cubic-bezier(.22,1,.36,1)",mixBlendMode:"screen"}}/>
  </>);
};

export default Cursor;
