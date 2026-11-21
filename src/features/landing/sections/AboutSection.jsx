import TiltCard from "../../../components/common/TiltCard";
import web from "../../../assets/web.png";
import mobile from "../../../assets/mobile.png";
import backend from "../../../assets/backend.png";
import creator from "../../../assets/creator.png";

const SERVICES = [
  { title: "Web Design & GUI", icon: web },
  { title: "Graphic Design & Branding", icon: creator },
  { title: "AI Automation & IT", icon: backend },
  { title: "Digital Marketing Strategy", icon: mobile },
];

const CV_SKILLS = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Adobe InDesign",
  "Logo Design & Branding",
  "Social Media Creatives",
  "Web Design & GUI",
  "AI Automation",
  "Digital Marketing",
  "Cyber Security",
  "Linux Foundation Certified",
];

const AboutSection = () => {
  return (
    <section
      id="about"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "5rem clamp(1.5rem, 5vw, 4rem)",
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
          Introduction
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(30px, 5vw, 60px)",
            margin: 0,
          }}
        >
          Overview.
        </h2>
      </div>

      <p
        style={{
          marginTop: "1rem",
          color: "#c4b5dc",
          fontSize: 17,
          maxWidth: 850,
          lineHeight: "30px",
        }}
      >
        I am a creative <strong style={{ color: "#fff" }}>Graphic Designer</strong> and founder of{" "}
        <strong style={{ color: "#fb923c" }}>Pixel &amp; Brush</strong> based in{" "}
        <strong style={{ color: "#fff" }}>Stratford, London, United Kingdom</strong>, with a keen eye for detail and a
        drive to turn concepts into impactful visuals. With expertise in{" "}
        <strong style={{ color: "#fff" }}>Adobe Photoshop, Illustrator, and InDesign</strong>, I increased client
        engagement by <strong style={{ color: "#fbbf24" }}>90%</strong> through innovative branding and social media
        graphics. Today I help businesses grow with{" "}
        <strong style={{ color: "#fff" }}>web design, branding, and AI automation</strong> that saves time and cuts
        repetitive work, while studying <strong style={{ color: "#c084fc" }}>BA (Hons) Business Management</strong> at{" "}
        <strong style={{ color: "#fff" }}>Ravensbourne University London</strong>.
      </p>

      {/* Core Skills & Certifications Pills from CV */}
      <div style={{ marginTop: "1.6rem", display: "flex", flexWrap: "wrap", gap: "0.6rem" }}>
        {CV_SKILLS.map((skill) => (
          <span
            key={skill}
            style={{
              background: "rgba(147,51,234,0.14)",
              border: "1px solid rgba(249,115,22,0.32)",
              color: "#f4f1fa",
              padding: "0.35rem 0.9rem",
              borderRadius: 100,
              fontSize: 13,
              fontWeight: 600,
            }}
          >
            {skill}
          </span>
        ))}
      </div>

      <div
        style={{
          marginTop: "4.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 250px))",
          justifyContent: "center",
          gap: "2.5rem",
        }}
      >
        {SERVICES.map((service) => (
          <TiltCard key={service.title} style={{ width: "100%" }}>
            <div
              className="green-pink-gradient"
              style={{
                width: "100%",
                padding: 1.5,
                borderRadius: 20,
                boxShadow: "0px 25px 80px -15px rgba(249,115,22,0.22)",
              }}
            >
              <div
                style={{
                  background: "#140a28",
                  borderRadius: 19,
                  padding: "1.25rem 2.2rem",
                  minHeight: 280,
                  display: "flex",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <img
                  src={service.icon}
                  alt={service.title}
                  width="64"
                  height="64"
                  style={{ width: 64, height: 64, objectFit: "contain" }}
                />
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: "center",
                    margin: 0,
                  }}
                >
                  {service.title}
                </h3>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
