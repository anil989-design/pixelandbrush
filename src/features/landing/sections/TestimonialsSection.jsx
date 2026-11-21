import { testimonials } from "../data/testimonials";

const TestimonialsSection = () => {
  return (
    <section
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "4rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div
        style={{
          background: "#100d25",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            background: "#151030",
            borderRadius: 16,
            padding: "3.5rem clamp(1.5rem, 5vw, 4rem)",
            minHeight: 280,
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
            What others say
          </p>
          <h2
            style={{
              color: "#ffffff",
              fontWeight: 900,
              fontSize: "clamp(32px, 5vw, 60px)",
              margin: 0,
            }}
          >
            Testimonials.
          </h2>
        </div>

        <div
          style={{
            marginTop: "-5rem",
            padding: "0 clamp(1.5rem, 5vw, 4rem) 3.5rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: "2rem",
          }}
        >
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                background: "#090325",
                padding: "2.25rem",
                borderRadius: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 25px 70px rgba(0,0,0,0.45)",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#ffffff",
                    fontWeight: 900,
                    fontSize: 48,
                    lineHeight: 0.9,
                    marginBottom: "0.5rem",
                  }}
                >
                  "
                </p>
                <p
                  style={{
                    color: "#ffffff",
                    letterSpacing: "0.03em",
                    fontSize: 16,
                    lineHeight: 1.7,
                  }}
                >
                  {t.quote}
                </p>
              </div>

              <div
                style={{
                  marginTop: "1.75rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: 15, margin: 0 }}>
                    <span className="blue-text-gradient">@</span> {t.name}
                  </p>
                  <p style={{ marginTop: 4, color: "#aaa6c3", fontSize: 12, marginBottom: 0 }}>
                    {t.role} of {t.company}
                  </p>
                </div>

                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #915EFF, #f97316)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {t.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
