import { useEffect, useRef } from "react";

/**
 * Top-of-page reading progress bar.
 * Updates the DOM node directly (inside requestAnimationFrame) so scrolling never triggers
 * React re-renders.
 */
const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const pct = max > 0 ? (el.scrollTop / max) * 100 : 0;
      if (barRef.current) barRef.current.style.width = `${pct}%`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 3,
        width: 0,
        zIndex: 9997,
        background: "linear-gradient(90deg,#1e3a8a,#2563eb,#22d3ee)",
        boxShadow: "0 0 12px rgba(34,211,238,.6)",
        pointerEvents: "none",
        transition: "width .08s linear",
      }}
    />
  );
};

export default ScrollProgress;
