import { useEffect, useState } from "react";

/**
 * Branded intro splash. Shortened from 2.6s to ~1.7s and shown once per session (see HomePage).
 * It lets the page-wide <HexMesh/> show through instead of mounting a second canvas animation.
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
        background: "rgba(6,9,18,.84)",
        backdropFilter: "blur(6px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.6rem",
        opacity: phase === "out" ? 0 : 1,
        transform: phase === "out" ? "scale(1.03)" : "scale(1)",
        transition: phase === "out" ? "opacity .6s ease,transform .6s ease" : "none",
      }}
    >
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "1.6rem" }}>
        {showName && (
          <div
            style={{
              fontFamily: "'Baloo 2',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,7vw,3.8rem)",
              letterSpacing: ".08em",
              background: "linear-gradient(90deg,#2563eb,#60a5fa,#e8edf7,#60a5fa,#22d3ee)",
              backgroundSize: "300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "nameReveal .8s cubic-bezier(.22,1,.36,1) forwards,gradShift 4s ease infinite",
              textTransform: "uppercase",
            }}
          >
            PIXEL &amp; BRUSH
          </div>
        )}
        {showTag && (
          <div style={{ color: "#6f7a96", fontSize: ".72rem", letterSpacing: ".28em", textTransform: "uppercase", animation: "taglineIn .6s ease forwards" }}>
            Digital Creative Agency · UK
          </div>
        )}
      </div>
    </div>
  );
};

export default Loader;
