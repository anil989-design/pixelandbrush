import TiltCard from "../../../components/common/TiltCard";

const PROJECTS = [
  {
    name: "Kashish Makeup Studio",
    description:
      "Full website overhaul with online booking, services menu, and luxury brand visuals — doubling client bookings after launch.",
    tags: [
      { name: "web-design", color: "orange-text-gradient" },
      { name: "react", color: "white-text-gradient" },
      { name: "branding", color: "pink-text-gradient" },
      { name: "seo", color: "green-text-gradient" },
    ],
    image: "/projects/KA.webp",
    link: "#contact",
  },
  {
    name: "Bijaya Pharma",
    description:
      "Complete brand identity, responsive website, IT systems integration, and multi-channel digital marketing management.",
    tags: [
      { name: "brand-identity", color: "orange-text-gradient" },
      { name: "web-dev", color: "white-text-gradient" },
      { name: "digital-marketing", color: "pink-text-gradient" },
      { name: "it-systems", color: "green-text-gradient" },
    ],
    image: "/projects/vijaya.webp",
    link: "#contact",
  },
  {
    name: "Kangaroo Education Foundation",
    description:
      "High-converting social media creatives, Adobe Photoshop/Illustrator brand campaigns, and content strategy achieving 300% follower growth in 60 days.",
    tags: [
      { name: "graphic-design", color: "orange-text-gradient" },
      { name: "social-media", color: "pink-text-gradient" },
      { name: "adobe-suite", color: "green-text-gradient" },
    ],
    image: "/projects/kangaroo.webp",
    link: "#contact",
  },
];

const PortfolioSection = () => {
  return (
    <section
      id="portfolio"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "4rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 0,
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
          Pixel &amp; Brush Portfolio
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(30px, 5vw, 60px)",
            margin: 0,
          }}
        >
          Projects.
        </h2>
      </div>

      <div style={{ width: "100%", display: "flex" }}>
        <p
          style={{
            marginTop: "0.75rem",
            color: "#c4b5dc",
            fontSize: 17,
            maxWidth: 768,
            lineHeight: "30px",
          }}
        >
          A curated selection of websites, brand identities, and digital marketing campaigns delivered by{" "}
          <strong style={{ color: "#fff" }}>Anil Panday</strong> at{" "}
          <strong style={{ color: "#fb923c" }}>Pixel &amp; Brush</strong>.
        </p>
      </div>

      <div
        className="works-container"
        style={{
          marginTop: "4.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 360px))",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        {PROJECTS.map((project, index) => (
          <div key={`project-${index}`} className="project-card">
            <TiltCard
              max={22}
              scale={1.02}
              style={{
                background: "#140a28",
                border: "1px solid rgba(249,115,22,0.22)",
                padding: "1.25rem",
                borderRadius: 18,
                width: "100%",
                height: "100%",
                boxShadow: "0px 25px 80px -15px rgba(0,0,0,0.6)",
              }}
            >
              <div style={{ position: "relative", width: "100%", height: 230 }}>
                <img
                  src={project.image}
                  alt={project.name}
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
                    inset: 0,
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "0.75rem",
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
                      border: "1px solid rgba(249,115,22,0.45)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "#fb923c",
                      cursor: "pointer",
                    }}
                  >
                    <i className="bi bi-arrow-up-right" />
                  </a>
                </div>
              </div>

              <div style={{ marginTop: "1.25rem" }}>
                <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: 22, margin: 0 }}>
                  {project.name}
                </h3>
                <p style={{ marginTop: "0.5rem", color: "#c4b5dc", fontSize: 14, lineHeight: 1.6 }}>
                  {project.description}
                </p>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <p
                    key={`${project.name}-${tag.name}`}
                    className={tag.color}
                    style={{ fontSize: 14, fontWeight: 600, margin: 0 }}
                  >
                    #{tag.name}
                  </p>
                ))}
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
