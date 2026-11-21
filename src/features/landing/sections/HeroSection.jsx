import ComputersCanvas from "../../../components/canvas/ComputersCanvas";
import heroBg from "../../../assets/herobg.png";

const HeroSection = () => {
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 720,
        margin: "0 auto",
        backgroundImage: `linear-gradient(180deg, rgba(7,4,14,0.45) 0%, rgba(7,4,14,0.82) 100%), url(${heroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          top: 115,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "1.25rem",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#f97316",
              boxShadow: "0 0 18px #f97316",
            }}
          />
          <div
            className="violet-gradient"
            style={{
              width: 4,
              height: "clamp(160px, 28vh, 320px)",
            }}
          />
        </div>

        <div style={{ marginTop: "0.75rem" }}>
          <h1
            style={{
              fontWeight: 900,
              color: "#ffffff",
              fontSize: "clamp(36px, 5vw, 72px)",
              lineHeight: 1.15,
              marginTop: "0.25rem",
            }}
          >
            Hi, I'm{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#c084fc 0%,#ec4899 45%,#f97316 80%,#fbbf24 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Anil Panday
            </span>
          </h1>
          <p
            style={{
              color: "#e9d5ff",
              fontWeight: 500,
              fontSize: "clamp(15px, 2vw, 24px)",
              lineHeight: 1.45,
              marginTop: "0.5rem",
              maxWidth: 740,
            }}
          >
            Digital Designer &amp; Founder of{" "}
            <span style={{ color: "#fb923c", fontWeight: 700 }}>Pixel &amp; Brush</span> <br className="d-none d-sm-inline" />
            Web Design, Branding, Graphic Design &amp; AI Automation in London
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div
        style={{
          position: "absolute",
          bottom: "2.2rem",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 3,
        }}
      >
        <a href="#about" aria-label="Scroll to overview">
          <div
            style={{
              width: 35,
              height: 64,
              borderRadius: 24,
              border: "3px solid #fb923c",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 7,
            }}
          >
            <div
              style={{
                width: 11,
                height: 11,
                borderRadius: "50%",
                background: "#fb923c",
                animation: "scrollDotBounce 1.5s infinite ease-in-out",
              }}
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
