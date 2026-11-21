import TiltCard from "../../../components/common/TiltCard";
import webIcon from "../../../assets/web.png";
import mobileIcon from "../../../assets/mobile.png";
import backendIcon from "../../../assets/backend.png";
import creatorIcon from "../../../assets/creator.png";

const ROLE_CARDS = [
  {
    title: "Full-Stack Web Developer",
    icon: webIcon,
  },
  {
    title: "UI / UX & Brand Designer",
    icon: creatorIcon,
  },
  {
    title: "AI & Python Solutions",
    icon: backendIcon,
  },
  {
    title: "Digital Strategy & Growth",
    icon: mobileIcon,
  },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      style={{
        maxWidth: 1280,
        margin: "0 auto",
        padding: "6rem clamp(1.5rem, 5vw, 4rem)",
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
          Introduction
        </p>
        <h2
          style={{
            color: "#ffffff",
            fontWeight: 900,
            fontSize: "clamp(32px, 5vw, 60px)",
            margin: 0,
          }}
        >
          Overview.
        </h2>
      </div>

      <p
        style={{
          marginTop: "1rem",
          color: "#aaa6c3",
          fontSize: 17,
          maxWidth: 780,
          lineHeight: "30px",
        }}
      >
        I'm <strong style={{ color: "#fff" }}>Anil Pandey</strong>, founder of{" "}
        <strong style={{ color: "#fb923c" }}>Pixel and Brush</strong> in London and a Business Management with
        International student at <strong style={{ color: "#fff" }}>Ravensbourne University London</strong>. I build
        high-impact websites, brand identities, 3D interactive experiences, and AI-powered analytics tools like{" "}
        <strong style={{ color: "#915EFF" }}>FinAI</strong> using React, Three.js, Python, and modern web technologies.
        Let's work together to bring your ideas to life!
      </p>

      <div
        style={{
          marginTop: "4.5rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "2.25rem",
        }}
      >
        {ROLE_CARDS.map((card) => (
          <TiltCard key={card.title} max={25} scale={1.04}>
            <div
              className="green-pink-gradient"
              style={{
                width: "100%",
                padding: 1,
                borderRadius: 20,
                boxShadow: "0px 35px 120px -15px #211e35",
              }}
            >
              <div
                style={{
                  background: "#151030",
                  borderRadius: 20,
                  padding: "1.5rem 2.2rem",
                  minHeight: 280,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <img
                  src={card.icon}
                  alt={card.title}
                  width="64"
                  height="64"
                  loading="lazy"
                  style={{ width: 64, height: 64, objectFit: "contain" }}
                />
                <h3
                  style={{
                    color: "#ffffff",
                    fontSize: 20,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.35,
                  }}
                >
                  {card.title}
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
