import firstTestimonial from "../../../assets/Tars Ken.webp";
import secondTestimonial from "../../../assets/image.webp";
import thirdTestimonial from "../../../assets/third testimonial.webp";

const FEEDBACKS = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Anil proved me wrong.",
    name: "MD Mustaqeem",
    designation: "Ecommerce",
    company: "QuickMart",
    image: firstTestimonial,
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Anil does.",
    name: "Abdul Raheman",
    designation: "Ecommerce Business",
    company: "justbuyz",
    image: secondTestimonial,
  },
  {
    testimonial:
      "After Anil optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "James Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: thirdTestimonial,
  },
];

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
          marginTop: "3rem",
          background: "#100d25",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            background: "#151030",
            borderRadius: 16,
            padding: "clamp(2.5rem, 5vw, 4rem) clamp(1.5rem, 5vw, 4rem)",
            minHeight: 300,
          }}
        >
          <div>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 18px)",
                color: "#aaa6c3",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: 0,
              }}
            >
              What others say
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
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 320px))",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {FEEDBACKS.map((item) => (
            <div
              key={item.name}
              style={{
                background: "#090325",
                padding: "2.5rem",
                borderRadius: 24,
                width: "100%",
              }}
            >
              <p
                style={{
                  color: "#ffffff",
                  fontWeight: 900,
                  fontSize: 48,
                  margin: 0,
                  lineHeight: 1,
                }}
              >
                "
              </p>

              <div style={{ marginTop: "0.25rem" }}>
                <p
                  style={{
                    color: "#ffffff",
                    letterSpacing: "0.05em",
                    fontSize: 18,
                    lineHeight: 1.6,
                  }}
                >
                  {item.testimonial}
                </p>

                <div
                  style={{
                    marginTop: "1.75rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "0.25rem",
                  }}
                >
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <p style={{ color: "#ffffff", fontWeight: 500, fontSize: 16, margin: 0 }}>
                      <span className="blue-text-gradient">@</span> {item.name}
                    </p>
                    <p style={{ marginTop: "0.25rem", color: "#aaa6c3", fontSize: 12, margin: 0 }}>
                      {item.designation} of {item.company}
                    </p>
                  </div>

                  <img
                    src={item.image}
                    alt={`feedback_by-${item.name}`}
                    width="40"
                    height="40"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
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
