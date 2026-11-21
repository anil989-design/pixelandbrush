const EXPERIENCES = [
  {
    title: "Managing Director",
    company_name: "Pixel and Brush · London Area, United Kingdom",
    icon: "/logo-icon.webp",
    iconBg: "#170b2c",
    date: "October 2025 - Present",
    points: [
      "Founder & Managing Director of Pixel & Brush (pixelandbrush.vercel.app), delivering web design, branding, graphic design, and AI automation for businesses in the UK and internationally.",
      "Increased client engagement by 90% through innovative brand identities, Adobe Photoshop/Illustrator/InDesign creatives, and high-converting websites.",
      "Building AI automation workflows that save time and eliminate repetitive operational tasks for small businesses.",
    ],
  },
  {
    title: "Marketing Executive",
    company_name: "Saad Overseas · Butwal, Lumbini, Nepal",
    icon: "/logo-icon.webp",
    iconBg: "#241242",
    date: "June 2024 - Present",
    points: [
      "Leading digital marketing campaigns, brand positioning, and visual communication strategy.",
      "Designing promotional assets and managing multi-channel social media growth.",
    ],
  },
  {
    title: "IT Technician & Marketing Agent",
    company_name: "Bijaya Pharma Butwal · Butwal, Lumbini, Nepal",
    icon: "/projects/vijaya.webp",
    iconBg: "#170b2c",
    date: "January 2023 - March 2025",
    points: [
      "Directed brand identity, website presence, digital marketing campaigns, and technical IT operations for Bijaya Pharma.",
      "Bridged technical IT systems support with client-facing marketing and brand design.",
    ],
  },
  {
    title: "Graphic Designer",
    company_name: "Kangaroo Education Foundation · Butwal, Lumbini, Nepal",
    icon: "/projects/kangaroo.webp",
    iconBg: "#241242",
    date: "September 2022 - April 2024",
    points: [
      "Created high-impact social media graphics, print materials, and brand campaigns using Adobe Photoshop, Illustrator, and InDesign.",
      "Drove 300% social media follower growth and increased student enquiries through consistent visual storytelling.",
    ],
  },
  {
    title: "Information Technology Technician",
    company_name: "Guras Technology Pvt. Ltd. · Butwal, Lumbini, Nepal",
    icon: "/logo-icon.webp",
    iconBg: "#170b2c",
    date: "July 2022 - April 2023",
    points: [
      "Managed IT infrastructure, computer systems diagnostics, networking, and client technical support.",
    ],
  },
  {
    title: "Technician",
    company_name: "NSK Group Nepal",
    icon: "/logo-icon.webp",
    iconBg: "#241242",
    date: "August 2020 - April 2022",
    points: [
      "Performed hardware and software maintenance, technical troubleshooting, and operational systems support.",
    ],
  },
  {
    title: "BA (Hons) Business Management",
    company_name: "Ravensbourne University London · London, United Kingdom",
    icon: "/anil-pandey-headshot-square.jpg",
    iconBg: "#170b2c",
    date: "May 2025 - Present",
    points: [
      "Bachelor of Business Management (Business, Management, Marketing, and Related Support Services) in London, UK.",
      "Combining business management strategy with Artificial Intelligence (AI), Graphical User Interface (GUI) design, and Linux Foundation certified technical skills.",
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
            color: "#fb923c",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            textAlign: "center",
            fontWeight: 700,
            margin: 0,
          }}
        >
          My Career &amp; Education Journey
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

      <div style={{ marginTop: "4.5rem" }} className="pb-timeline">
        {EXPERIENCES.map((experience, index) => (
          <div key={`experience-${index}`} className="pb-timeline-item">
            <div className="pb-timeline-card">
              <div>
                <h3 style={{ color: "#ffffff", fontSize: 22, fontWeight: 700, margin: 0 }}>
                  {experience.title}
                </h3>
                <p
                  style={{
                    color: "#fb923c",
                    fontSize: 15,
                    fontWeight: 600,
                    marginTop: 4,
                    marginBottom: 0,
                  }}
                >
                  {experience.company_name}
                </p>
              </div>

              <ul
                style={{
                  marginTop: "1.1rem",
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
                      color: "#f4f1fa",
                      fontSize: 14,
                      paddingLeft: "0.25rem",
                      lineHeight: 1.65,
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
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
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
