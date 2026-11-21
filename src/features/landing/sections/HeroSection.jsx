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
      {/* Top Hero Headline + Purple Vertical Line (Huzaif-Ahmed-Portfolio Hero.jsx) */}
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
            marginTop: "0.5rem",
          }}
        >
          <div
            style={{
              width: 20,
              height: 20,
              borderRadius: "50%",
              background: "#915EFF",
              boxShadow: "0 0 18px #915EFF",
            }}
          />
          <div
            className="violet-gradient"
            style={{
              width: 4,
              height: "clamp(160px, 28vh, 300px)",
            }}
          />
        </div>

        <div>
          <h1
            style={{
              fontWeight: 900,
              color: "#ffffff",
              fontSize: "clamp(2.4rem, 5.5vw, 4.75rem)",
              lineHeight: 1.15,
              marginTop: "0.25rem",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Hi, I'm <span style={{ color: "#915EFF" }}>Anil</span>
          </h1>
          <p
            style={{
              color: "#dfd9ff",
              fontWeight: 500,
              fontSize: "clamp(1rem, 2.1vw, 1.7rem)",
              lineHeight: 1.45,
              marginTop: "0.5rem",
              maxWidth: 680,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Founder of <span style={{ color: "#fb923c", fontWeight: 700 }}>Pixel and Brush</span> — I develop 3D visuals,{" "}
            <br className="d-none d-sm-inline" />
            modern user interfaces, AI &amp; web applications
          </p>
        </div>
      </div>

      {/* Interactive 3D Desktop Workstation GLTF Canvas */}
      <ComputersCanvas />

      {/* Bottom Animated Scroll Pill */}
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
              border: "4px solid #aaa6c3",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: 6,
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
