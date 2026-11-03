import Button from "../../../components/common/Button";
import { CONTACT } from "../../../config/constants";
import { SOCIAL } from "../../../config/seo";
import useContactForm from "../hooks/useContactForm";
import SectionLabel from "../../../components/common/SectionLabel";

const ContactSection = () => {
  const { fields, setField, honeypot, setHoneypot, formStatus, formError, sendMessage, preload } =
    useContactForm();

  return (
  <section id="contact" style={{padding:"8rem 0",position:"relative",zIndex:1}}>
    <div className="container px-4 px-lg-5">
      <div className="row g-5 align-items-start">
        <div className="col-12 col-lg-5">
          <div className="rv" data-dir="left">
            <SectionLabel text="Get In Touch"/>
            <h2 style={{fontFamily:"'Baloo 2',sans-serif",fontWeight:800,fontSize:"clamp(2.2rem,4.5vw,3.5rem)",letterSpacing:"-.02em",marginBottom:"1rem",lineHeight:1.05}}>Let's Build<br/><span style={{background:"linear-gradient(135deg,#60a5fa,#22d3ee)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Something Great</span></h2>
            <p style={{color:"#8a93ab",lineHeight:1.75,marginBottom:"2rem",maxWidth:360,fontFamily:"'Outfit',sans-serif",fontSize:".95rem"}}>Tell us about your project and we will get back to you within 24 hours.</p>
          </div>
          <div className="rv" data-dir="left" data-delay=".1">
            {[
              {iconClass:"bi bi-envelope-fill",label:CONTACT.email,href:`mailto:${CONTACT.email}`},
              {iconClass:"bi bi-linkedin",label:"linkedin.com/in/anilpanday-digital",href:SOCIAL.linkedin,target:"_blank",rel:"noopener noreferrer"},
              {iconClass:"bi bi-geo-alt-fill",label:"United Kingdom",href:null}
            ].map((c,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem"}}>
                <div style={{width:44,height:44,background:"rgba(37,99,235,.09)",border:"1px solid rgba(37,99,235,.18)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.1rem",color:"#60a5fa",flexShrink:0}}>
                  <i className={c.iconClass}></i>
                </div>
                {c.href?<a href={c.href} target={c.target} rel={c.rel} style={{color:"#8a93ab",fontSize:".86rem",textDecoration:"none",transition:"color .3s"}} onMouseEnter={e=>e.target.style.color="#60a5fa"} onMouseLeave={e=>e.target.style.color="#8a93ab"}>{c.label}</a>:<span style={{color:"#8a93ab",fontSize:".86rem"}}>{c.label}</span>}
              </div>
            ))}
          </div>
        </div>
        
        <div className="col-12 col-lg-7">
          <div className="rv" data-dir="right" data-delay=".15">
            <div onFocusCapture={preload} style={{background:"rgba(8,4,20,.88)",border:"1px solid rgba(37,99,235,.1)",borderRadius:18,padding:"2.6rem",display:"flex",flexDirection:"column",gap:"1.2rem"}}>
              {formStatus==="success"&&(<div style={{background:"rgba(16,185,129,.1)",border:"1px solid rgba(16,185,129,.28)",borderRadius:10,padding:"1rem 1.2rem",color:"#6ee7b7",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,fontSize:".9rem",display:"flex",gap:".6rem",alignItems:"center"}}><i className="bi bi-check-circle-fill"></i> Message sent! We'll be in touch within 24 hours.</div>)}
              {formError&&(<div style={{background:"rgba(239,68,68,.1)",border:"1px solid rgba(239,68,68,.28)",borderRadius:10,padding:"1rem 1.2rem",color:"#f87171",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,fontSize:".9rem",display:"flex",gap:".6rem",alignItems:"center"}}><i className="bi bi-exclamation-triangle-fill"></i> {formError}</div>)}

              {/* Honeypot Bot Trap */}
              <div style={{display:"none"}} aria-hidden="true">
                <input type="text" name="company_website_hp" value={honeypot} onChange={e=>setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off"/>
              </div>

              <div className="row g-3">
                <div className="col-12 col-sm-6">
                  <label htmlFor="contact-name" style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,marginBottom:".38rem",display:"block"}}>Your Name</label>
                  <input type="text" maxLength={100} placeholder="John Smith" id="contact-name" name="name" autoComplete="name" value={fields.name} onChange={setField("name")} className="form-control pb-form-control"/>
                </div>
                <div className="col-12 col-sm-6">
                  <label htmlFor="contact-email" style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,marginBottom:".38rem",display:"block"}}>Email Address</label>
                  <input type="email" maxLength={254} placeholder="john@company.com" id="contact-email" name="email" autoComplete="email" value={fields.email} onChange={setField("email")} className="form-control pb-form-control"/>
                </div>
              </div>

              <div>
                <label htmlFor="contact-service" style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,marginBottom:".38rem",display:"block"}}>Service Needed</label>
                <select id="contact-service" name="service" value={fields.service} onChange={setField("service")} className="form-select pb-form-control">
                  <option value="Web Development">Web Development</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Full Package">Full Package</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-message" style={{fontSize:".68rem",color:"#6f7a96",letterSpacing:".1em",textTransform:"uppercase",fontFamily:"'Baloo 2',sans-serif",fontWeight:600,marginBottom:".38rem",display:"block"}}>About Your Project</label>
                <textarea maxLength={3000} placeholder="Brief description of what you need..." rows={4} id="contact-message" name="message" value={fields.message} onChange={setField("message")} className="form-control pb-form-control" style={{resize:"vertical"}}/>
              </div>

              <Button primary onClick={sendMessage} disabled={formStatus==="sending"} className="w-100">{formStatus==="sending"?"Sending…":"Send Message →"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default ContactSection;
