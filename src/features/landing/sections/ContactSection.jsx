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
        padding: "4rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div className="row g-5 align-items-center flex-column-reverse flex-xl-row">
        <div className="col-12 col-xl-6">
          <div
            onFocusCapture={preload}
            style={{
              background: "#120824",
              border: "1px solid rgba(249,115,22,0.25)",
              padding: "2.25rem",
              borderRadius: 20,
              boxShadow: "0 25px 70px rgba(0,0,0,0.55)",
            }}
          >
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 18px)",
                color: "#fb923c",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: 700,
                margin: 0,
              }}
            >
              Stratford, London · chhetrianil232@gmail.com
            </p>
            <h3
              style={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "clamp(30px, 5vw, 56px)",
                margin: 0,
              }}
            >
              Contact.
            </h3>

            <div style={{ marginTop: "0.75rem", display: "flex", flexWrap: "wrap", gap: "1rem", fontSize: 13 }}>
              <a
                href="mailto:chhetrianil232@gmail.com"
                style={{ color: "#c4b5dc", textDecoration: "none" }}
              >
                <i className="bi bi-envelope-fill" style={{ color: "#fb923c", marginRight: 6 }} />
                chhetrianil232@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/anilpanday-digital"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#c4b5dc", textDecoration: "none" }}
              >
                <i className="bi bi-linkedin" style={{ color: "#c084fc", marginRight: 6 }} />
                linkedin.com/in/anilpanday-digital
              </a>
            </div>

            {formStatus === "success" && (
              <div
                style={{
                  marginTop: "1rem",
                  background: "rgba(16,185,129,.15)",
                  border: "1px solid rgba(16,185,129,.35)",
                  borderRadius: 10,
                  padding: "0.9rem 1.1rem",
                  color: "#6ee7b7",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                Thank you! Your message has been sent to Anil Panday.
              </div>
            )}
            {formError && (
              <div
                style={{
                  marginTop: "1rem",
                  background: "rgba(239,68,68,.15)",
                  border: "1px solid rgba(239,68,68,.35)",
                  borderRadius: 10,
                  padding: "0.9rem 1.1rem",
                  color: "#f87171",
                  fontWeight: 600,
                  fontSize: 14,
                }}
              >
                {formError}
              </div>
            )}

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
                marginTop: "2rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.65rem" }}>
                  Your Name
                </span>
                <input
                  type="text"
                  name="name"
                  value={fields.name}
                  onChange={setField("name")}
                  placeholder="What's your good name?"
                  className="pb-form-control"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.65rem" }}>
                  Your email
                </span>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={setField("email")}
                  placeholder="What's your email address?"
                  className="pb-form-control"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "0.65rem" }}>
                  Your Message
                </span>
                <textarea
                  rows={6}
                  name="message"
                  value={fields.message}
                  onChange={setField("message")}
                  placeholder="Tell me about your project or role..."
                  className="pb-form-control"
                />
              </label>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                style={{
                  background: "linear-gradient(135deg,#7c3aed 0%,#db2777 45%,#f97316 100%)",
                  padding: "0.85rem 2.2rem",
                  borderRadius: 12,
                  outline: "none",
                  border: "none",
                  width: "fit-content",
                  color: "#ffffff",
                  fontWeight: 700,
                  boxShadow: "0 8px 24px rgba(249,115,22,0.35)",
                  cursor: "pointer",
                }}
              >
                {formStatus === "sending" ? "Sending..." : "Send Message →"}
              </button>
            </form>
          </div>
        </div>

        <div className="col-12 col-xl-6" style={{ height: "clamp(350px, 50vw, 550px)" }}>
          <EarthCanvas />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
