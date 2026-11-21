import TiltCard from "../../../components/common/TiltCard";
import github from "../../../assets/github.png";
import project2 from "../../../assets/proj1.webp";
import gearXpert from "../../../assets/gearXpert.png";
import project3 from "../../../assets/project3.webp";

const PROJECTS = [
  {
    name: "Tekisky Mart",
    description:
      "Tekisky Mart is a web-based platform that allows users to search, explore, and purchase a wide range of products from various providers, offering a seamless and efficient shopping experience.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "tailwind", color: "white-text-gradient" },
      { name: "node", color: "pink-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
    ],
    image: project2,
    source_code_link: "https://github.com/",
  },
  {
    name: "GearXpert",
    description:
      "GearXpert is your ultimate destination for premium auto parts and accessories, Whether you're an automobile enthusiast or a professional, find everything you need to upgrade, repair.",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "emailJs", color: "green-text-gradient" },
      { name: "Gsap", color: "pink-text-gradient" },
    ],
    image: gearXpert,
    source_code_link: "https://github.com/",
  },
  {
    name: "GoGroove-Ecommerce",
    description:
      "Go-Groove is your ultimate destination for premium products across various categories. Whether you're a savvy shopper or a professional, enhance, and simplify your lifestyle—all in one place!",
    tags: [
      { name: "react", color: "blue-text-gradient" },
      { name: "express", color: "white-text-gradient" },
      { name: "node", color: "green-text-gradient" },
      { name: "mongodb", color: "green-text-gradient" },
    ],
    image: project3,
    source_code_link: "https://github.com/",
  },
];

const PortfolioSection = () => {
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
          My work
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
            color: "#aaa6c3",
            fontSize: 17,
            maxWidth: 768,
            lineHeight: "30px",
          }}
        >
          Following projects showcase my skills and experience through real-world examples of my work. Each project is
          briefly described with links to code repositories and live demos. It reflects my ability to solve complex
          problems, work with different technologies, and manage projects effectively.
        </p>
      </div>

      <div
        className="works-container"
        style={{
          marginTop: "5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 360px))",
          justifyContent: "center",
          gap: "1.75rem",
        }}
      >
        {PROJECTS.map((project, index) => (
          <div key={`project-${index}`} className="project-card">
            <TiltCard
              max={25}
              scale={1}
              style={{
                background: "#151030",
                padding: "1.25rem",
                borderRadius: 16,
                width: "100%",
                height: "100%",
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
                    objectPosition: "left",
                    borderRadius: 16,
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
                  <div
                    onClick={() => window.open(project.source_code_link, "_blank")}
                    className="black-gradient"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={github}
                      alt="source code"
                      style={{ width: "50%", height: "50%", objectFit: "contain" }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: "1.25rem" }}>
                <h3 style={{ color: "#ffffff", fontWeight: 700, fontSize: 24, margin: 0 }}>
                  {project.name}
                </h3>
                <p style={{ marginTop: "0.5rem", color: "#aaa6c3", fontSize: 14, lineHeight: 1.5 }}>
                  {project.description}
                </p>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.tags.map((tag) => (
                  <p
                    key={`${project.name}-${tag.name}`}
                    className={tag.color}
                    style={{ fontSize: 14, margin: 0 }}
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
