

const Ticker = () => {
  const items = ["Web Development","·","Social Media","·","Graphic Design","·","Brand Identity","·","UI/UX Design","·","Digital Strategy","·","SEO Optimisation","·","Content Creation","·"];
  const all = [...items,...items];
  return (
    <div style={{overflow:"hidden",borderTop:"1px solid rgba(37,99,235,.1)",borderBottom:"1px solid rgba(37,99,235,.1)",padding:".8rem 0",background:"rgba(37,99,235,.02)",position:"relative",zIndex:1}}>
      <div style={{display:"flex",gap:"2.5rem",whiteSpace:"nowrap",animation:"ticker 30s linear infinite"}}>
        {all.map((t,i)=><span key={i} style={{color:t==="·"?"#2563eb":"#3a4258",fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".8rem",letterSpacing:".14em",textTransform:"uppercase"}}>{t}</span>)}
      </div>
    </div>
  );
};

export default Ticker;
