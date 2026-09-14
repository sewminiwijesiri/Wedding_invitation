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

    // Luxury Champagne & Rose Gold Flower Petal Palette
    const petalPalettes = [
      { top: "rgba(255, 248, 238, 0.9)", bottom: "rgba(235, 215, 190, 0.75)" },
      { top: "rgba(248, 236, 220, 0.9)", bottom: "rgba(215, 185, 155, 0.75)" },
      { top: "rgba(255, 242, 235, 0.85)", bottom: "rgba(230, 200, 185, 0.7)" },
      { top: "rgba(245, 228, 208, 0.9)", bottom: "rgba(200, 168, 138, 0.8)" }
    ];

    const particleCount = 36;
    const petals = [];

    for (let i = 0; i < particleCount; i++) {
      const palette = petalPalettes[Math.floor(Math.random() * petalPalettes.length)];
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 6 + 6, // 6px to 12px petal length
        speedY: Math.random() * 0.25 + 0.15, // ultra slow, graceful falling speed
        swaySpeed: Math.random() * 0.012 + 0.004,
        swayAmount: Math.random() * 0.8 + 0.4,
        swayAngle: Math.random() * Math.PI * 2,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.012,
        flipSpeed: Math.random() * 0.015 + 0.005,
        flipAngle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.45 + 0.35,
        colorTop: palette.top,
        colorBottom: palette.bottom
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      petals.forEach((p) => {
        // Update position & sway
        p.swayAngle += p.swaySpeed;
        p.flipAngle += p.flipSpeed;
        p.rotation += p.rotationSpeed;

        p.y += p.speedY;
        p.x += Math.sin(p.swayAngle) * p.swayAmount;

        // 3D tumbling scale distortion
        const scaleX = Math.cos(p.flipAngle);
        const scaleY = 1;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(scaleX, scaleY);

        // Draw organic flower petal using dual Bezier curves
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.45, p.size * 0.9, p.size * 0.65, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.9, p.size * 0.65, -p.size * 0.85, -p.size * 0.45, 0, -p.size);
        ctx.closePath();

        // Gradient shading across petal
        const grad = ctx.createLinearGradient(0, -p.size, 0, p.size);
        grad.addColorStop(0, p.colorTop);
        grad.addColorStop(1, p.colorBottom);

        ctx.fillStyle = grad;
        ctx.globalAlpha = p.opacity;
        ctx.shadowColor = "rgba(160, 130, 95, 0.25)";
        ctx.shadowBlur = 4;
        ctx.fill();

        ctx.restore();

        // Reset petal when falling past bottom
        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
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
