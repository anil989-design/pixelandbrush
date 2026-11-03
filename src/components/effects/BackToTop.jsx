import { useState, useEffect } from "react";

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
      style={{
        position:"fixed",bottom:"5.5rem",right:"1.8rem",zIndex:600,
        width:46,height:46,borderRadius:"50%",
        background:"linear-gradient(135deg,#1e3a8a,#2563eb)",
        border:"1px solid rgba(37,99,235,.55)",
        color:"#fff",fontSize:"1.1rem",cursor:"pointer",
        boxShadow:"0 0 22px rgba(37,99,235,.45)",
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"box-shadow .3s,transform .3s",
      }}
      onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 36px rgba(37,99,235,.7)";e.currentTarget.style.transform="scale(1.1)";}}
      onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 22px rgba(37,99,235,.45)";e.currentTarget.style.transform="none";}}>
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
