const Ticker = () => {
  const items = ["Web Development","·","Social Media","·","Graphic Design","·","Brand Identity","·","UI/UX Design","·","Digital Strategy","·","SEO Optimisation","·","Content Creation","·"];
  const all = [...items,...items];
  return (
    <div style={{overflow:"hidden",borderTop:"1px solid rgba(249,115,22,.14)",borderBottom:"1px solid rgba(168,85,247,.14)",padding:".85rem 0",background:"linear-gradient(90deg,rgba(124,58,237,.05),rgba(249,115,22,.05))",position:"relative",zIndex:1}}>
      <div style={{display:"flex",gap:"2.5rem",whiteSpace:"nowrap",animation:"ticker 30s linear infinite"}}>
        {all.map((t,i)=><span key={i} style={{color:t==="·"?"#f97316":"#7c6f94",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".8rem",letterSpacing:".14em",textTransform:"uppercase"}}>{t}</span>)}
      </div>
    </div>
  );
};

export default Ticker;
