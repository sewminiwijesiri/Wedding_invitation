"use client";

import { useEffect, useRef } from "react";

export default function GoldPetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle pool
    const particleCount = 28;
    const particles = [];
    const colors = ["rgba(212, 175, 55, ", "rgba(236, 200, 122, ", "rgba(255, 235, 180, "];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2.2 + 0.8,
        colorBase: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.45 + 0.15,
        speedY: Math.random() * 0.45 + 0.2,
        speedX: (Math.random() - 0.5) * 0.35,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulse: Math.random() * Math.PI
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        p.pulse += p.pulseSpeed;
        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.15;
        const currentRadius = p.radius + Math.sin(p.pulse) * 0.4;

        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.2, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = `${p.colorBase}${Math.max(0, currentAlpha)})`;
        ctx.shadowColor = "#D4AF37";
        ctx.shadowBlur = 6;
        ctx.fill();

        p.y -= p.speedY;
        p.x += p.speedX;

        // Wrap around
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 900
      }}
    />
  );
}
