

const FaqItem = ({q,a,isOpen,toggle}) => (
  <div style={{borderBottom:"1px solid rgba(37,99,235,.1)"}}>
    <button onClick={toggle} style={{width:"100%",textAlign:"left",background:"none",border:"none",padding:"1.4rem 0",cursor:"pointer",color:"#e8edf7",display:"flex",justifyContent:"space-between",alignItems:"center",gap:"1rem"}}>
      <span style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:"1rem",lineHeight:1.4}}>{q}</span>
      <span style={{color:"#2563eb",fontSize:"1.4rem",flexShrink:0,transform:isOpen?"rotate(45deg)":"rotate(0deg)",transition:"transform .35s cubic-bezier(.22,1,.36,1)",display:"inline-block"}}>+</span>
    </button>
    <div style={{maxHeight:isOpen?500:0,overflow:"hidden",transition:"max-height .4s cubic-bezier(.22,1,.36,1)"}}>
      <p className={isOpen?"faq-answer":""} style={{color:"#8a93ab",fontSize:".9rem",lineHeight:1.76,paddingBottom:"1.4rem"}}>{a}</p>
    </div>
  </div>
);

export default FaqItem;
