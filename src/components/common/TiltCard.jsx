import { useRef, useState } from "react";

/**
 * React 19 compatible 3D perspective tilt card (replaces legacy react-tilt which uses removed findDOMNode).
 */
export default function TiltCard({ children, className = "", style = {}, max = 22, scale = 1.03 }) {
  const ref = useRef(null);
  const [transform, setTransform] = useState("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * max * 2;
    const rotateX = (0.5 - y) * max * 2;
    setTransform(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale},${scale},${scale})`);
  };

  const handleLeave = () => {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)");
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        ...style,
        transform,
        transition: transform.includes("scale3d(1,1,1)")
          ? "transform 450ms cubic-bezier(0.03, 0.98, 0.52, 0.99)"
          : "transform 80ms linear",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
