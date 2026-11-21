import { testimonials } from "../data/testimonials";

const TestimonialsSection = () => {
  return (
    <section
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "4rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        style={{
          marginTop: "2rem",
          background: "#120824",
          border: "1px solid rgba(168,85,247,0.18)",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            background: "linear-gradient(135deg, rgba(124,58,237,0.22), rgba(249,115,22,0.12))",
            borderRadius: 16,
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)",
            minHeight: 290,
          }}
        >
          <div>
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
              What our clients say
            </p>
            <h2
              style={{
                color: "#ffffff",
                fontWeight: 900,
                fontSize: "clamp(30px, 5vw, 60px)",
                margin: 0,
              }}
            >
              Testimonials.
            </h2>
          </div>
        </div>

        <div
          style={{
            marginTop: "-5rem",
            paddingBottom: "3.5rem",
            paddingLeft: "clamp(1.5rem, 5vw, 4rem)",
            paddingRight: "clamp(1.5rem, 5vw, 4rem)",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 330px))",
            justifyContent: "center",
            gap: "2rem",
          }}
        >
          {testimonials.map((item) => (
            <div
              key={item.name}
              style={{
                background: "#0b0518",
                border: "1px solid rgba(249,115,22,0.22)",
                padding: "2.25rem",
                borderRadius: 24,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
              }}
            >
              <div>
                <p
                  style={{
                    color: "#fb923c",
                    fontWeight: 900,
                    fontSize: 48,
                    margin: 0,
                    lineHeight: 1,
                  }}
                >
                  "
                </p>
                <p
                  style={{
                    marginTop: "0.5rem",
                    color: "#f4f1fa",
                    letterSpacing: "0.02em",
                    fontSize: 16,
                    lineHeight: 1.7,
                  }}
                >
                  {item.quote}
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
                  <p style={{ color: "#ffffff", fontWeight: 600, fontSize: 16, margin: 0 }}>
                    <span className="orange-text-gradient">@</span> {item.name}
                  </p>
                  <p style={{ marginTop: "0.25rem", color: "#c4b5dc", fontSize: 12, margin: 0 }}>
                    {item.role} of {item.company}
                  </p>
                </div>

                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#7c3aed,#db2777,#f97316)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                    fontWeight: 800,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {item.name.charAt(0)}
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
