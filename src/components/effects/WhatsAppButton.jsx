import { CONTACT } from "../../config/constants";

const WhatsAppButton = () => (
  <a
    href={`https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(CONTACT.whatsappMessage)}`}
    target="_blank" rel="noopener noreferrer"
    aria-label="Chat on WhatsAppButton"
    style={{
      position:"fixed",bottom:"1.8rem",right:"1.8rem",zIndex:600,
      width:52,height:52,borderRadius:"50%",
      background:"#25D366",
      boxShadow:"0 0 22px rgba(37,211,102,.5)",
      display:"flex",alignItems:"center",justifyContent:"center",
      fontSize:"1.5rem",color:"#fff",textDecoration:"none",
      animation:"whatsappBounce 2.5s ease-in-out infinite",
      transition:"box-shadow .3s,transform .3s",
    }}
    onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 36px rgba(37,211,102,.8)";e.currentTarget.style.transform="scale(1.1)";e.currentTarget.style.animation="none";}}
    onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 22px rgba(37,211,102,.5)";e.currentTarget.style.transform="none";e.currentTarget.style.animation="whatsappBounce 2.5s ease-in-out infinite";}}>
    <i className="bi bi-whatsapp"></i>
  </a>
);

export default WhatsAppButton;
