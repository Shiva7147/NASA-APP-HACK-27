import React, { useEffect, useRef } from 'react';

export default function CosmicStarfield({ quantity = 240, staticNoise = false }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate stars with depth layers
    const stars = Array.from({ length: quantity }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      size: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      pulse: Math.random() * Math.PI,
      layer: Math.floor(Math.random() * 3) + 1,
    }));

    // Mouse coordinates
    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Radio wave rings expanding from Earth coordinate (center-left)
    const rings = [
      { r: 40, maxR: 420, speed: 0.6, alpha: 0.4 },
      { r: 160, maxR: 420, speed: 0.6, alpha: 0.25 },
      { r: 280, maxR: 420, speed: 0.6, alpha: 0.15 },
    ];

    // Wave ribbon particles inspired by particulate cosmic dust landscapes
    const waveParticles = Array.from({ length: 420 }, (_, i) => ({
      u: (i / 420), // normalized position along the wave curve
      spreadY: (Math.random() - 0.5) * 80,
      size: Math.random() * 1.8 + 0.4,
      alpha: Math.random() * 0.4 + 0.1,
      phaseOffset: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.0008 + 0.0003,
    }));

    let waveTime = 0;

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      waveTime += 0.012;

      // 1. Draw subtle spherical radio wave propagation pulses from DSN origin
      const originX = w * 0.22;
      const originY = h * 0.38;

      rings.forEach((ring) => {
        ring.r += ring.speed;
        if (ring.r > ring.maxR) {
          ring.r = 10;
        }
        const fade = (1 - ring.r / ring.maxR);
        ctx.beginPath();
        ctx.arc(originX, originY, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${fade * 0.07})`;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // 2. Draw Stars
      stars.forEach((star) => {
        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = w;
        if (star.x > w) star.x = 0;
        if (star.y < 0) star.y = h;
        if (star.y > h) star.y = 0;

        const dx = mouse.x - star.x;
        const dy = mouse.y - star.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          star.x -= (dx / dist) * force * 1.2;
          star.y -= (dy / dist) * force * 1.2;
        }

        star.pulse += 0.02;
        const dynamicAlpha = Math.max(0.1, star.alpha + Math.sin(star.pulse) * 0.25);

        ctx.fillStyle = `rgba(255, 255, 255, ${dynamicAlpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Draw Particulate Cosmic Dust Ribbon (Image 1 & 2 inspired)
      waveParticles.forEach((p) => {
        p.u = (p.u + p.speed) % 1;
        const px = p.u * w;
        
        // Base sine wave trajectory sweeping across the canvas
        const baseY = h * 0.52 + Math.sin(p.u * Math.PI * 2.5 + waveTime) * 60 + Math.cos(p.u * Math.PI * 4 - waveTime * 0.7) * 30;
        const py = baseY + p.spreadY + Math.sin(waveTime + p.phaseOffset) * 12;

        const dx = mouse.x - px;
        const dy = mouse.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let finalX = px;
        let finalY = py;

        if (dist < 100) {
          const force = (100 - dist) / 100;
          finalX -= (dx / dist) * force * 20;
          finalY -= (dy / dist) * force * 20;
        }

        // Fading at the boundaries
        const edgeFade = Math.sin(p.u * Math.PI);
        const a = p.alpha * edgeFade;

        ctx.fillStyle = `rgba(255, 255, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(finalX, finalY, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [quantity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none select-none z-0"
    />
  );
}
