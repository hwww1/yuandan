import React, { useEffect, useRef } from 'react';

const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1; // Slower explosion for elegance
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.life = 100;
        this.color = color;
        this.size = Math.random() * 2 + 0.5;
        this.decay = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.95; // friction
        this.vy *= 0.95;
        this.vy += 0.03; // gravity
        this.life -= this.decay;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(this.life / 100, 0);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    const createFirework = (x: number, y: number) => {
        // Modern, pastel and gold colors
        const colors = ['#FFD700', '#FFA500', '#FFC0CB', '#E6E6FA', '#F0F8FF', '#FF4500']; 
        const color = colors[Math.floor(Math.random() * colors.length)];
        const particleCount = 60;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(x, y, color));
        }
    };

    // Periodic random fireworks
    const autoInterval = setInterval(() => {
        if (Math.random() < 0.4) { // 40% chance per tick
            createFirework(
                Math.random() * canvas.width, 
                Math.random() * canvas.height * 0.5 // Upper half only
            );
        }
    }, 1200);

    const animate = () => {
      // Create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleClick = (e: MouseEvent) => {
        createFirework(e.clientX, e.clientY);
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handleClick);
      clearInterval(autoInterval);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 mix-blend-screen" />;
};

export default Fireworks;