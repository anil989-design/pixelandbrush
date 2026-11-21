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
              background: "#100d25",
              padding: "2rem",
              borderRadius: 16,
            }}
          >
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 18px)",
                color: "#aaa6c3",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
              }}
            >
              Get in touch
            </p>
            <h3
              style={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "clamp(30px, 5vw, 60px)",
                margin: 0,
              }}
            >
              Contact.
            </h3>

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
                Thank you. I will get back to you as soon as possible.
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
                marginTop: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
              }}
            >
              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "1rem" }}>
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
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "1rem" }}>
                  Your email
                </span>
                <input
                  type="email"
                  name="email"
                  value={fields.email}
                  onChange={setField("email")}
                  placeholder="What's your web address?"
                  className="pb-form-control"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ color: "#ffffff", fontWeight: 500, marginBottom: "1rem" }}>
                  Your Message
                </span>
                <textarea
                  rows={7}
                  name="message"
                  value={fields.message}
                  onChange={setField("message")}
                  placeholder="What you want to say?"
                  className="pb-form-control"
                />
              </label>

              <button
                type="submit"
                disabled={formStatus === "sending"}
                style={{
                  background: "#151030",
                  padding: "0.75rem 2rem",
                  borderRadius: 12,
                  outline: "none",
                  border: "none",
                  width: "fit-content",
                  color: "#ffffff",
                  fontWeight: 700,
                  boxShadow: "0 4px 6px -1px #050816",
                  cursor: "pointer",
                }}
              >
                {formStatus === "sending" ? "Sending..." : "Send"}
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
