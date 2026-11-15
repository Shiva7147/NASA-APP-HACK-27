import React, { useEffect, useRef } from 'react';

// Generates the ethereal stippled point-cloud particle connection (matching Reference Image 1)
export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    // Particle definition
    let particles = [];
    const NUM_PARTICLES = Math.min(width > 768 ? 900 : 450, 1100);

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        // Curve path across the screen (the cosmic thread)
        const t = Math.random();
        const curveY = height * 0.45 + Math.sin(t * Math.PI * 2.2) * (height * 0.18) + (Math.random() - 0.5) * 120;
        const curveX = t * width;

        particles.push({
          x: curveX,
          y: curveY,
          originX: curveX,
          originY: curveY,
          size: Math.random() < 0.85 ? Math.random() * 1.4 + 0.5 : Math.random() * 2.4 + 1.2,
          speed: Math.random() * 0.6 + 0.2,
          alpha: Math.random() * 0.75 + 0.25,
          angle: Math.random() * Math.PI * 2,
          driftSpeed: (Math.random() - 0.5) * 0.3,
          isHeroDust: Math.random() < 0.35,
        });
      }
    };

    initParticles();

    // Mouse interaction
    let mouse = { x: -1000, y: -1000, radius: 120 };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let frame = 0;
    const render = () => {
      frame++;
      // Deep space black clearing with faint trail
      ctx.fillStyle = 'rgba(3, 3, 5, 0.28)';
      ctx.fillRect(0, 0, width, height);

      // Render cosmic background stars
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave oscillation
        p.angle += 0.015 * p.speed;
        p.x += Math.sin(p.angle) * 0.35 + p.driftSpeed;
        p.y += Math.cos(p.angle) * 0.35;

        // Wrap around horizontally
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        // Mouse repelling/attraction subtle pull
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 1.5;
          p.x -= (dx / dist) * force * 3;
          p.y -= (dy / dist) * force * 3;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        const pulse = 0.8 + Math.sin(frame * 0.02 + i) * 0.2;
        ctx.fillStyle = `rgba(240, 243, 255, ${p.alpha * pulse})`;
        ctx.fill();

        // Connect nearby particles to form ethereal molecular web
        if (p.isHeroDust && i % 3 === 0) {
          for (let j = i + 1; j < Math.min(i + 6, particles.length); j++) {
            const p2 = particles[j];
            const djx = p.x - p2.x;
            const djy = p.y - p2.y;
            const d = Math.sqrt(djx * djx + djy * djy);
            if (d < 55) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(220, 230, 255, ${(1 - d / 55) * 0.12})`;
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-auto z-0 opacity-70"
    />
  );
}
