import { useEffect, useState } from "react";

/**
 * Branded intro splash featuring the official Pixel and Brush emblem and color palette.
 */
const Loader = ({ onDone }) => {
  const [showName, setShowName] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const timers = [
      setTimeout(() => setShowName(true), 120),
      setTimeout(() => setShowTag(true), 420),
      setTimeout(() => setPhase("out"), 1100),
      setTimeout(() => {
        setPhase("done");
        onDone();
      }, 1700),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 10000,
        background: "rgba(7,4,14,.92)",
        backdropFilter: "blur(8px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.4rem",
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "scale(1.03)" : "scale(1)",
        transition: phase === "out" ? "opacity .6s ease,transform .6s ease" : "none",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
        {showName && (
          <img
            src="/logo-icon.webp"
            alt="Pixel and Brush"
            width="84"
            height="84"
            style={{
              width: 84,
              height: 84,
              borderRadius: 20,
              boxShadow: "0 0 36px rgba(249,115,22,.35), 0 0 24px rgba(147,51,234,.35)",
              animation: "nameReveal .8s cubic-bezier(.22,1,.36,1) forwards",
            }}
          />
        )}
        {showName && (
          <div
            style={{
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.1rem,6vw,3.5rem)",
              letterSpacing: ".03em",
              animation: "nameReveal .8s cubic-bezier(.22,1,.36,1) forwards",
              display: "flex",
              alignItems: "baseline",
              gap: ".45rem",
            }}
          >
            <span style={{ color: "#ffffff" }}>Pixel</span>
            <span style={{ color: "#a1a1aa", fontStyle: "italic", fontWeight: 400, fontSize: ".7em", fontFamily: "'Outfit',sans-serif" }}>and</span>
            <span style={{ background: "linear-gradient(135deg,#fbbf24,#f97316,#ea580c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Brush</span>
          </div>
        )}
        {showTag && (
          <div style={{ color: "#a79ab8", fontSize: ".74rem", letterSpacing: ".34em", textTransform: "uppercase", animation: "taglineIn .6s ease forwards" }}>
            CREATE • DESIGN • INSPIRE
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
