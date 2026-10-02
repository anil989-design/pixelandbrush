/**
 * Black Hole Physics / Visuals Canvas & WebGL Renderer
 */

export interface RendererOptions {
  canvas: HTMLCanvasElement;
}

export interface BlackHoleRenderer {
  ready: Promise<void>;
  dispose: () => void;
}

export function createRenderer({ canvas }: RendererOptions): BlackHoleRenderer {
  let isDisposed = false;
  let animationFrameId: number;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return {
      ready: Promise.resolve(),
      dispose: () => {},
    };
  }

  let width = 0;
  let height = 0;
  let time = 0;

  // Starfield particles
  interface Star {
    x: number;
    y: number;
    size: number;
    brightness: number;
    color: string;
    speed: number;
    angle: number;
    dist: number;
  }

  let stars: Star[] = [];
  const STAR_COUNT = 300;

  const initStars = () => {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 50 + Math.random() * (Math.max(width, height) * 0.8);
      stars.push({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        size: Math.random() * 2 + 0.5,
        brightness: Math.random() * 0.8 + 0.2,
        color: Math.random() > 0.6 ? "#38BDF8" : Math.random() > 0.3 ? "#F59E0B" : "#FFFFFF",
        speed: 0.002 + Math.random() * 0.005,
        angle,
        dist,
      });
    }
  };

  const handleResize = () => {
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    width = rect.width || window.innerWidth;
    height = rect.height || window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    initStars();
  };

  handleResize();
  window.addEventListener("resize", handleResize);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = width / 2;
  let targetMouseY = height / 2;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = e.clientX - rect.left;
    targetMouseY = e.clientY - rect.top;
  };

  window.addEventListener("mousemove", handleMouseMove);

  // Render loop
  const render = () => {
    if (isDisposed) return;

    time += 0.015;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const centerX = width / 2 + (mouseX - width / 2) * 0.15;
    const centerY = height / 2 + (mouseY - height / 2) * 0.15;
    const radius = Math.min(width, height) * 0.18;

    // 1. Deep space background
    ctx.fillStyle = "#030408";
    ctx.fillRect(0, 0, width, height);

    // 2. Gravitational Lensing & Ambient Accretion Glow
    const bgGlow = ctx.createRadialGradient(centerX, centerY, radius * 0.8, centerX, centerY, radius * 3.5);
    bgGlow.addColorStop(0, "rgba(249, 115, 22, 0.45)");
    bgGlow.addColorStop(0.2, "rgba(234, 88, 12, 0.25)");
    bgGlow.addColorStop(0.5, "rgba(99, 102, 241, 0.12)");
    bgGlow.addColorStop(1, "rgba(3, 4, 8, 0)");

    ctx.fillStyle = bgGlow;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 3.5, 0, Math.PI * 2);
    ctx.fill();

    // 3. Render Infalling & Orbiting Stars with Gravitational Deflection
    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.angle += star.speed * (150 / Math.max(50, star.dist));

      // Gravitational pull
      const r = star.dist;
      if (r < radius * 0.9) {
        star.dist = Math.max(width, height) * 0.7;
      }

      // Relativistic lensing displacement
      const lensedDist = r < radius * 1.5 ? r * (1 + 0.3 * Math.sin(time + i)) : r;
      const sx = Math.cos(star.angle) * lensedDist;
      const sy = Math.sin(star.angle) * lensedDist * 0.45; // Tilted orbital plane

      ctx.fillStyle = star.color;
      ctx.globalAlpha = Math.min(1, star.brightness * (r / (radius * 1.5)));
      ctx.beginPath();
      ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    ctx.globalAlpha = 1;

    // 4. Accretion Disk (Upper & Lower Relativistic Beaming)
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(-0.25);

    // Accretion disk rings
    const diskRings = 40;
    for (let i = 0; i < diskRings; i++) {
      const ringRadius = radius * (1.1 + (i / diskRings) * 2.2);
      const alpha = (1 - i / diskRings) * 0.35;
      const flicker = Math.sin(time * 3 + i * 0.4) * 0.08;

      ctx.beginPath();
      ctx.ellipse(0, 0, ringRadius, ringRadius * 0.32, 0, 0, Math.PI * 2);

      // Doppler shift: left side approaching (bluer/brighter), right side receding (redder/dimmer)
      const grad = ctx.createLinearGradient(-ringRadius, 0, ringRadius, 0);
      grad.addColorStop(0, `rgba(56, 189, 248, ${alpha + 0.2 + flicker})`);
      grad.addColorStop(0.35, `rgba(251, 146, 60, ${alpha + 0.15})`);
      grad.addColorStop(0.7, `rgba(239, 68, 68, ${alpha * 0.8})`);
      grad.addColorStop(1, `rgba(185, 28, 28, ${alpha * 0.4})`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 3.5;
      ctx.stroke();
    }
    ctx.restore();

    // 5. Photon Sphere / Einstein Ring
    const photonGrad = ctx.createRadialGradient(centerX, centerY, radius * 0.95, centerX, centerY, radius * 1.15);
    photonGrad.addColorStop(0, "rgba(255, 255, 255, 0.95)");
    photonGrad.addColorStop(0.3, "rgba(251, 191, 36, 0.8)");
    photonGrad.addColorStop(0.7, "rgba(249, 115, 22, 0.4)");
    photonGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = photonGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.15, 0, Math.PI * 2);
    ctx.fill();

    // 6. Event Horizon (Absolute Black Void)
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.98, 0, Math.PI * 2);
    ctx.fill();

    // 7. Subtle event horizon edge shadow
    ctx.strokeStyle = "rgba(249, 115, 22, 0.25)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.98, 0, Math.PI * 2);
    ctx.stroke();

    animationFrameId = requestAnimationFrame(render);
  };

  const readyPromise = new Promise<void>((resolve) => {
    animationFrameId = requestAnimationFrame(() => {
      render();
      resolve();
    });
  });

  return {
    ready: readyPromise,
    dispose: () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    },
  };
}
