import TiltCard from "../../../components/common/TiltCard";
import web from "../../../assets/web.png";
import mobile from "../../../assets/mobile.png";
import backend from "../../../assets/backend.png";
import creator from "../../../assets/creator.png";

const SERVICES = [
  { title: "Full-Stack Developer", icon: web },
  { title: "Frontend Developer", icon: mobile },
  { title: "Backend Developer", icon: backend },
  { title: "Ui UX Designer", icon: creator },
];

const AboutSection = () => {
  return (
    <section
      id="about"
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
          color: "#aaa6c3",
          fontSize: 17,
          maxWidth: 768,
          lineHeight: "30px",
        }}
      >
        I'm a skilled software developer with experience in JavaScript, and expertise in frameworks like React,
        Node.js, and Three.js. I'm a quick learner and collaborate closely with clients to create efficient, scalable,
        and user-friendly solutions that solve real-world problems. Let's work together to bring your ideas to life!
      </p>

      <div
        style={{
          marginTop: "5rem",
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
                padding: 1,
                borderRadius: 20,
                boxShadow: "0px 35px 120px -15px #211e35",
              }}
            >
              <div
                style={{
                  background: "#151030",
                  borderRadius: 20,
                  padding: "1.25rem 3rem",
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
