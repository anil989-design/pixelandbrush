const EXPERIENCES = [
  {
    title: "Founder & Full-Stack Digital Developer",
    company_name: "Pixel and Brush · London, UK",
    icon: "/logo-icon.webp",
    iconBg: "#151030",
    date: "2024 - Present",
    points: [
      "Designing and developing high-converting React, Three.js, and responsive web applications for UK and international clients.",
      "Crafting complete brand identities, UI/UX design systems, and data-driven social media campaigns that delivered up to 300% audience growth.",
      "Delivered full-package digital transformations for Kashish Makeup Studio, Vijaya Pharma, and Kangaroo Education Foundation.",
      "Managing end-to-end client delivery through a custom real-time Supabase Client & Admin Portal.",
    ],
  },
  {
    title: "Creator & AI / Python Developer",
    company_name: "FinAI — Student Finance & Analytics Project",
    icon: "/logo-icon.webp",
    iconBg: "#383E56",
    date: "2025 - Present",
    points: [
      "Architected FinAI to help London university students track cash-flow runway, burn rate, and weekly budget variance.",
      "Built automated Python transaction categorization and Exploratory Data Analysis (EDA) pipelines.",
      "Integrated AI summarization workflows to turn raw student spending data into plain-English financial guidance.",
    ],
  },
  {
    title: "BSc Business Management with International",
    company_name: "Ravensbourne University London",
    icon: "/anil-pandey-headshot-square.jpg",
    iconBg: "#1d1836",
    date: "London, United Kingdom",
    points: [
      "Bridging international business strategy, financial management, and quantitative business analytics with modern software engineering.",
      "Focusing on Artificial Intelligence, AI Agents & Automation, Python data analysis, and digital entrepreneurship.",
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
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
        <p
          style={{
            fontSize: "clamp(14px, 1.6vw, 18px)",
            color: "#aaa6c3",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "0.35rem",
          }}
        >
          What I have done so far
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 60px)",
            margin: 0,
          }}
        >
          Work Experience.
        </h2>
      </div>

      <div className="pb-timeline">
        {EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="pb-timeline-item">
            <div className="pb-timeline-card">
              <h3 style={{ color: "#ffffff", fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
                {exp.title}
              </h3>
              <p style={{ color: "#aaa6c3", fontSize: 15, fontWeight: 600, margin: 0 }}>
                {exp.company_name}
              </p>
              <ul style={{ marginTop: "1.1rem", paddingLeft: "1.2rem", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {exp.points.map((pt, i) => (
                  <li
                    key={i}
                    style={{
                      color: "#f3f3f3",
                      fontSize: 14,
                      lineHeight: 1.65,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            <div className="pb-timeline-icon" style={{ background: exp.iconBg }}>
              <img
                src={exp.icon}
                alt={exp.company_name}
                width="44"
                height="44"
                loading="lazy"
                style={{ width: "86%", height: "86%", objectFit: "cover", borderRadius: "50%" }}
              />
            </div>

            <div className="pb-timeline-date">{exp.date}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
