import EarthCanvas from "../../../components/canvas/EarthCanvas";
import useContactForm from "../hooks/useContactForm";

const ContactSection = () => {
  const { fields, setField, honeypot, setHoneypot, formStatus, formError, sendMessage, preload } =
    useContactForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <section
      id="contact"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div className="row g-5 align-items-center flex-column-reverse flex-xl-row">
        {/* Left: Contact Form Card (Huzaif-Ahmed-Portfolio Contact.jsx) */}
        <div className="col-12 col-xl-6">
          <div
            onFocusCapture={preload}
            style={{
              background: "#100d25",
              padding: "2.5rem",
              borderRadius: 20,
              boxShadow: "0px 35px 120px -15px #211e35",
            }}
          >
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 18px)",
                color: "#aaa6c3",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: "0.35rem",
              }}
            >
              Get in touch
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "clamp(32px, 5vw, 56px)",
                margin: 0,
              }}
            >
              Contact.
            </h2>

            {formStatus === "success" && (
              <div
                style={{
                  marginTop: "1.2rem",
                  background: "rgba(16,185,129,.12)",
                  border: "1px solid rgba(16,185,129,.32)",
                  borderRadius: 10,
                  padding: "1rem 1.2rem",
                  color: "#6ee7b7",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  display: "flex",
                  gap: ".6rem",
                  alignItems: "center",
                }}
              >
                <i className="bi bi-check-circle-fill" /> Thank you. I will get back to you as soon as possible.
              </div>
            )}
            {formError && (
              <div
                style={{
                  marginTop: "1.2rem",
                  background: "rgba(239,68,68,.12)",
                  border: "1px solid rgba(239,68,68,.32)",
                  borderRadius: 10,
                  padding: "1rem 1.2rem",
                  color: "#f87171",
                  fontWeight: 600,
                  fontSize: ".9rem",
                  display: "flex",
                  gap: ".6rem",
                  alignItems: "center",
                }}
              >
                <i className="bi bi-exclamation-triangle-fill" /> {formError}
              </div>
            )}

            {/* Honeypot Bot Trap */}
            <div style={{ display: "none" }} aria-hidden="true">
              <input
                type="text"
                name="company_website_hp"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
              />
            </div>

            <form
              onSubmit={handleSubmit}
              style={{
                marginTop: "2.2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.6rem",
              }}
            >
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.75rem" }}>
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  maxLength={100}
                  value={fields.name}
                  onChange={setField("name")}
                  placeholder="What's your good name?"
                  className="pb-form-control"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.75rem" }}>
                  Your email
                </span>
                <input
                  type="email"
                  name="email"
                  maxLength={254}
                  value={fields.email}
                  onChange={setField("email")}
                  placeholder="What's your web address?"
                  className="pb-form-control"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.75rem" }}>
                  Service Needed
                </span>
                <select
                  name="service"
                  value={fields.service}
                  onChange={setField("service")}
                  className="pb-form-control"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Social Media Management">Social Media Management</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Full Package">Full Package</option>
                </select>
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.75rem" }}>
                  Your Message
                </span>
                <textarea
                  rows={6}
                  name="message"
                  maxLength={3000}
                  value={fields.message}
                  onChange={setField("message")}
                  placeholder="What you want to say?"
                  className="pb-form-control"
                  style={{ resize: "vertical" }}
                />
              </label>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                style={{
                  background: "#151030",
                  padding: "0.9rem 2.2rem",
                  borderRadius: 12,
                  border: "1px solid rgba(145,94,255,0.35)",
                  width: "fit-content",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                  boxShadow: "0 4px 20px rgba(5, 8, 22, 0.8)",
                  transition: "background 0.25s, transform 0.25s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#915EFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#151030";
                }}
              >
                {formStatus === "sending" ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>

        {/* Right: Interactive 3D Rotating Planet Earth Canvas */}
        <div className="col-12 col-xl-6" style={{ height: "clamp(360px, 50vw, 560px)" }}>
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
