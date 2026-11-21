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
        backgroundImage: `url(${heroBg})`,
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
          top: 120,
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
            marginTop: "1.25rem",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#915EFF",
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

        <div style={{ marginTop: "1.25rem" }}>
          <h1
            style={{
              fontWeight: 900,
              color: "#ffffff",
              fontSize: "clamp(40px, 5.5vw, 80px)",
              lineHeight: 1.15,
              marginTop: "0.5rem",
            }}
          >
            Hi, I'm <span style={{ color: "#915EFF" }}>Anil</span>
          </h1>
          <p
            style={{
              color: "#dfd9ff",
              fontWeight: 500,
              fontSize: "clamp(16px, 2.2vw, 30px)",
              lineHeight: 1.35,
              marginTop: "0.5rem",
            }}
          >
            I develop modern, user <br />
            interfaces and web applications
          </p>
        </div>
      </div>

      <ComputersCanvas />

      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
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
              border: "4px solid #aaa6c3",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 8,
            }}
          >
            <div
              style={{
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: "#aaa6c3",
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
