import tekisky from "../../../assets/company/tekisky.png";

const EXPERIENCES = [
  {
    title: "Full-Stack Developer",
    company_name: "Pixel and Brush",
    icon: tekisky,
    iconBg: "#383E56",
    date: "Jan 2023 - present",
    points: [
      "Developing and maintaining web applications using MERN technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section
      id="work"
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
            textAlign: "center",
            margin: 0,
          }}
        >
          What I have done so far
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(30px, 5vw, 60px)",
            textAlign: "center",
            margin: 0,
          }}
        >
          Work Experience.
        </h2>
      </div>

      <div style={{ marginTop: "5rem" }} className="pb-timeline">
        {EXPERIENCES.map((experience, index) => (
          <div key={`experience-${index}`} className="pb-timeline-item">
            <div className="pb-timeline-card">
              <div>
                <h3 style={{ color: "#ffffff", fontSize: 24, fontWeight: 700, margin: 0 }}>
                  {experience.title}
                </h3>
                <p
                  style={{
                    color: "#aaa6c3",
                    fontSize: 16,
                    fontWeight: 600,
                    margin: 0,
                  }}
                >
                  {experience.company_name}
                </p>
              </div>

              <ul
                style={{
                  marginTop: "1.25rem",
                  listStyleType: "disc",
                  marginLeft: "1.25rem",
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {experience.points.map((point, idx) => (
                  <li
                    key={`experience-point-${idx}`}
                    style={{
                      color: "#f3f3f3",
                      fontSize: 14,
                      paddingLeft: "0.25rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pb-timeline-icon" style={{ background: experience.iconBg }}>
              <img
                src={experience.icon}
                alt={experience.company_name}
                style={{ width: "90%", height: "90%", objectFit: "contain" }}
              />
            </div>

            <div className="pb-timeline-date">{experience.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
