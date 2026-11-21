import { useEffect, useRef } from "react";

const HexMesh = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const HEX = 38;
    const cols = Math.ceil(W / (HEX * 1.75)) + 2;
    const rows = Math.ceil(H / (HEX * 1.55)) + 2;
    const hexes = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const rand = Math.random();
        // Logo palette: Electric Violet (147,51,234), Magenta-Coral (236,72,153), Sunset Brush Orange (249,115,22)
        const color =
          rand < 0.22
            ? "249,115,22"
            : rand < 0.4
            ? "236,72,153"
            : "147,51,234";
        hexes.push({
          x: c * HEX * 1.75 - HEX,
          y: r * HEX * 1.55 + (c % 2 === 0 ? 0 : HEX * 0.78) - HEX,
          phase: Math.random() * Math.PI * 2,
          speed: 0.0003 + Math.random() * 0.0005,
          bright: Math.random() < 0.055,
          color,
        });
      }
    }
    const small = W < 768;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const COLS = small ? 0 : Math.floor(W / 24);
    const drops = Array.from({ length: COLS }, (_, idx) => ({
      y: Math.random() * -H,
      speed: 1.2 + Math.random() * 2.4,
      opacity: 0.025 + Math.random() * 0.045,
      isOrange: idx % 3 === 0,
      size: 4 + (idx % 3) * 2,
    }));
    const rings = Array.from({ length: 5 }, (_, i) => ({
      r: 80 + i * 90,
      speed: 0.0003 * (i % 2 === 0 ? 1 : -1),
      angle: Math.random() * Math.PI * 2,
      opacity: 0.04 + i * 0.015,
      dashes: 6 + i * 2,
      isWarm: i % 2 === 1,
    }));
    const drawHex = (x, y, size, alpha, col) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 180) * (60 * i - 30);
        i === 0
          ? ctx.moveTo(x + size * Math.cos(a), y + size * Math.sin(a))
          : ctx.lineTo(x + size * Math.cos(a), y + size * Math.sin(a));
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(${col},${alpha})`;
      ctx.lineWidth = 0.75;
      ctx.stroke();
      if (alpha > 0.12) {
        ctx.fillStyle = `rgba(${col},${alpha * 0.16})`;
        ctx.fill();
      }
    };
    let t = 0,
      raf,
      last = 0;
    const FRAME = 1000 / 30;
    const draw = (now = FRAME) => {
      if (!reduced) raf = requestAnimationFrame(draw);
      if (document.hidden || now - last < FRAME) return;
      last = now;
      ctx.clearRect(0, 0, W, H);
      t += 2;
      const cx = W / 2,
        cy = H * 0.45;
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2 + t * 0.001;
        const len = Math.min(W, H) * 0.55;
        const alpha = 0.04 + 0.03 * Math.sin(t * 0.008 + i);
        const grad = ctx.createLinearGradient(
          cx,
          cy,
          cx + Math.cos(a) * len,
          cy + Math.sin(a) * len
        );
        grad.addColorStop(0, `rgba(147,51,234,${alpha})`);
        grad.addColorStop(0.55, `rgba(249,115,22,${alpha * 0.65})`);
        grad.addColorStop(1, "rgba(251,191,36,0)");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * len, cy + Math.sin(a) * len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }
      hexes.forEach((h) => {
        const wave = Math.sin(t * h.speed * 1000 + h.phase);
        const alpha = h.bright
          ? 0.05 + 0.15 * (wave * 0.5 + 0.5)
          : 0.015 + 0.05 * (wave * 0.5 + 0.5);
        drawHex(h.x, h.y, HEX - 2, alpha, h.color);
      });
      rings.forEach((rng) => {
        rng.angle += rng.speed * 2;
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(rng.angle);
        ctx.setLineDash([12, (rng.r * Math.PI * 2) / rng.dashes - 12]);
        ctx.beginPath();
        ctx.arc(0, 0, rng.r, 0, Math.PI * 2);
        ctx.strokeStyle = rng.isWarm
          ? `rgba(249,115,22,${rng.opacity})`
          : `rgba(168,85,247,${rng.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      });
      // Floating digital pixel squares (inspired by the dispersing pixels on the "P" logo)
      drops.forEach((d, i) => {
        ctx.fillStyle = d.isOrange
          ? `rgba(249,115,22,${d.opacity})`
          : `rgba(168,85,247,${d.opacity})`;
        ctx.fillRect(i * 24, d.y, d.size, d.size);
        d.y += d.speed * 1.6;
        if (d.y > H) {
          d.y = Math.random() * -200;
        }
      });
    };
    draw();
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
};

export default HexMesh;
