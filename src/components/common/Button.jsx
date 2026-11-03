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
        padding:".88rem 2.2rem",borderRadius:6,
        fontFamily:"'Baloo 2',sans-serif",fontWeight:700,fontSize:".95rem",
        cursor:disabled?"not-allowed":"none",border:"none",textDecoration:"none",letterSpacing:".04em",
        transition:"transform .5s cubic-bezier(.22,1,.36,1),box-shadow .3s,opacity .3s",
        opacity:disabled?.6:1,
        ...(primary
          ?{background:"linear-gradient(135deg,#1e3a8a,#2563eb)",color:"#fff",boxShadow:"0 0 28px rgba(37,99,235,.45)"}
          :{background:"transparent",color:"#e8edf7",border:"1px solid rgba(37,99,235,.35)"}),
      }}>{children}</Tag>
  );
};

export default Button;
