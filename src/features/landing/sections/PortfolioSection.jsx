import TiltCard from "../../../components/common/TiltCard";

const PROJECTS = [
  {
    name: "Kashish Makeup Studio",
    description:
      "Full website overhaul with online booking, interactive service menu, and local SEO architecture that doubled client bookings after launch.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "white-text-gradient" },
      { name: "booking-ui", color: "pink-text-gradient" },
      { name: "seo", color: "green-text-gradient" },
    ],
    image: "/projects/KA.webp",
    link: "/#contact",
  },
  {
    name: "Vijaya Pharma",
    description:
      "Complete corporate digital transformation including brand identity, responsive web platform, product catalog, and multi-channel digital presence.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "branding", color: "orange-text-gradient" },
      { name: "ui-ux", color: "pink-text-gradient" },
      { name: "analytics", color: "green-text-gradient" },
    ],
    image: "/projects/vijaya.webp",
    link: "/#contact",
  },
  {
    name: "Kangaroo Education Foundation",
    description:
      "Data-driven social media and digital growth strategy delivering 300% follower growth and high-intent student enquiries within 60 days.",
    tags: [
      { name: "digital-strategy", color: "blue-text-gradient" },
      { name: "growth", color: "green-text-gradient" },
      { name: "creative-design", color: "pink-text-gradient" },
    ],
    image: "/projects/kangaroo.webp",
    link: "/#contact",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div>
        <p
          style={{
            fontSize: "clamp(14px, 1.6vw, 18px)",
            color: "#aaa6c3",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.35rem",
          }}
        >
          My work
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 60px)",
            margin: 0,
          }}
        >
          Projects.
        </h2>
      </div>

      <p
        style={{
          marginTop: "0.85rem",
          color: "#aaa6c3",
          fontSize: 17,
          maxWidth: 780,
          lineHeight: "30px",
        }}
      >
        Following projects showcase our skills and experience through real-world examples of our work at{" "}
        <strong style={{ color: "#fff" }}>Pixel and Brush</strong>. Each project reflects our ability to solve complex
        business challenges, work with modern technologies, and deliver measurable growth.
      </p>

      <div
        style={{
          marginTop: "4rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "2rem",
        }}
      >
        {PROJECTS.map((project) => (
          <TiltCard key={project.name} max={18} scale={1.02}>
            <div
              style={{
                background: "#151030",
                padding: "1.35rem",
                borderRadius: 18,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxShadow: "0px 35px 120px -15px #211e35",
              }}
            >
              <div>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: 230,
                    borderRadius: 14,
                    overflow: "hidden",
                    background: "#090325",
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    width="800"
                    height="800"
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 14,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                    }}
                  >
                    <a
                      href={project.link}
                      aria-label={`Inquire about ${project.name}`}
                      className="black-gradient"
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "#fff",
                        fontSize: "1rem",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
                      }}
                    >
                      <i className="bi bi-arrow-up-right" />
                    </a>
                  </div>
                </div>

                <div style={{ marginTop: "1.25rem" }}>
                  <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: 23, marginBottom: "0.5rem" }}>
                    {project.name}
                  </h3>
                  <p style={{ color: "#aaa6c3", fontSize: 14, lineHeight: 1.65 }}>
                    {project.description}
                  </p>
                </div>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.55rem" }}>
                {project.tags.map((tag) => (
                  <span
                    key={`${project.name}-${tag.name}`}
                    className={tag.color}
                    style={{ fontSize: 14, fontWeight: 500 }}
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
