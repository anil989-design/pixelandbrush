import { useRef } from "react";

const Button = ({children,primary,href,onClick,disabled,className=""}) => {
  const ref = useRef(null);
  const onMove = e => {
    if(!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.22}px,${(e.clientY-r.top-r.height/2)*.22}px)`;
  };
  const Tag = href?"a":"button";
  return (
    <Tag ref={ref} href={href} onClick={onClick} disabled={disabled}
      className={className}
      onMouseMove={onMove} onMouseLeave={()=>ref.current&&(ref.current.style.transform="none")}
      style={{
        display:"inline-flex",alignItems:"center",justifyContent:"center",gap:".5rem",
        padding:".88rem 2.2rem",borderRadius:8,
        fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".95rem",
        cursor:disabled?"not-allowed":"none",border:"none",textDecoration:"none",letterSpacing:".04em",
        transition:"transform .5s cubic-bezier(.22,1,.36,1),box-shadow .3s,opacity .3s",
        opacity:disabled?.6:1,
        ...(primary
          ?{background:"linear-gradient(135deg,#7c3aed 0%,#db2777 45%,#f97316 100%)",color:"#fff",boxShadow:"0 8px 28px rgba(249,115,22,.35),0 0 18px rgba(147,51,234,.25)"}
          :{background:"rgba(147,51,234,.08)",color:"#f4f1fa",border:"1px solid rgba(249,115,22,.38)"}),
      }}>{children}</Tag>
  );
};

export default Button;
