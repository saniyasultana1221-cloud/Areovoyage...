import React, { useEffect, useRef } from 'react';

interface CosmicStarfieldProps {
  className?: string;
  density?: number;
  speed?: number;
}

export const CosmicStarfield: React.FC<CosmicStarfieldProps> = ({
  className = 'absolute inset-0 pointer-events-none z-0 overflow-hidden',
  density = 120,
  speed = 0.2,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Generate Stars
    interface Star {
      x: number;
      y: number;
      size: number;
      baseAlpha: number;
      alpha: number;
      twinkleSpeed: number;
      twinkleOffset: number;
      color: string;
      vx: number;
      vy: number;
    }

    const starColors = ['#FFFFFF', '#FDE68A', '#F59E0B', '#38BDF8', '#E0F2FE'];
    const stars: Star[] = [];

    const totalStars = Math.floor((width * height) / 10000) * (density / 100) + 60;

    for (let i = 0; i < totalStars; i++) {
      const color = starColors[Math.floor(Math.random() * starColors.length)];
      const size = Math.random() * 1.6 + 0.4;
      const baseAlpha = Math.random() * 0.6 + 0.3;
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        baseAlpha,
        alpha: baseAlpha,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        color,
        vx: (Math.random() - 0.5) * speed * 0.15,
        vy: (Math.random() - 0.5) * speed * 0.15,
      });
    }

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Subtle Cosmic Nebula Dust Clouds
      const grad1 = ctx.createRadialGradient(width * 0.2, height * 0.3, 0, width * 0.2, height * 0.3, width * 0.5);
      grad1.addColorStop(0, 'rgba(245, 158, 11, 0.035)');
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      const grad2 = ctx.createRadialGradient(width * 0.8, height * 0.7, 0, width * 0.8, height * 0.7, width * 0.5);
      grad2.addColorStop(0, 'rgba(56, 189, 248, 0.025)');
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Render & Twinkle Stars
      stars.forEach((star) => {
        star.x += star.vx;
        star.y += star.vy;

        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset);
        star.alpha = star.baseAlpha + twinkle * 0.25;
        star.alpha = Math.max(0.1, Math.min(1, star.alpha));

        ctx.fillStyle = star.color;
        ctx.globalAlpha = star.alpha;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra soft glow around larger stars
        if (star.size > 1.2) {
          ctx.globalAlpha = star.alpha * 0.3;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed]);

  return <canvas ref={canvasRef} className={className} />;
};
