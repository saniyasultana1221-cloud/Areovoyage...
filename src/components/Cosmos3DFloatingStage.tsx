import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

export interface FloatingCardItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  size?: string; // e.g. 'w-36 h-48', 'w-44 h-32', 'w-38 h-38'
  position: string; // Tailwind absolute position
  rotation?: string; // initial tilt e.g. '-rotate-6'
  parallaxFactor?: number; // depth multiplier e.g. 15 to 35
  badge?: string; // e.g. '-35%' or 'VIP'
  category?: string;
}

interface Cosmos3DFloatingStageProps {
  centralWord?: string; // e.g. "COSMOS"
  titlePrefix?: string; // e.g. "Curated"
  titleSuffix?: string; // e.g. "Portfolio"
  subtitle?: string;
  taglineRoles?: string[]; // e.g. ['photographers', 'architects', 'luxury voyagers', 'curators']
  cards: FloatingCardItem[];
  filterTags?: string[];
  activeTag?: string;
  onTagSelect?: (tag: string) => void;
  onCardClick?: (card: FloatingCardItem) => void;
}

export const Cosmos3DFloatingStage: React.FC<Cosmos3DFloatingStageProps> = ({
  centralWord = 'COSMOS',
  titlePrefix = 'Curated',
  titleSuffix = 'Portfolio',
  subtitle = 'A visual discovery engine in 3D deep space across six continents.',
  taglineRoles = ['photographers', 'architects', 'luxury seekers', 'curators', 'wanderers'],
  cards,
  filterTags = [],
  activeTag = 'All',
  onTagSelect,
  onCardClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Dynamic Tagline Rotating Word
  const [roleIndex, setRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState('out');
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % taglineRoles.length);
        setFadeState('in');
      }, 350);
    }, 2800);
    return () => clearInterval(interval);
  }, [taglineRoles]);

  // Mouse Parallax Physics State
  const mouse = useRef({ x: 0, y: 0 });
  const smoothMouse = useRef({ x: 0, y: 0 });
  const [cardTransforms, setCardTransforms] = useState<{ [key: string]: { x: number; y: number; rx: number; ry: number } }>({});

  // 3D Particles with Three.js
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    camera.position.z = 240;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle Geometry
    const particleCount = 1200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#FDE68A'), // warm gold
      new THREE.Color('#F59E0B'), // amber
      new THREE.Color('#38BDF8'), // celestial blue
    ];

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      // Spread across 3D bounding box
      positions[idx] = (Math.random() - 0.5) * 600;
      positions[idx + 1] = (Math.random() - 0.5) * 400;
      positions[idx + 2] = (Math.random() - 0.5) * 400;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[idx] = col.r;
      colors[idx + 1] = col.g;
      colors[idx + 2] = col.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Canvas texture for glowing round star particles
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const ctx = starCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(253, 230, 138, 0.8)');
      grad.addColorStop(0.7, 'rgba(245, 158, 11, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 32, 32);
    }
    const texture = new THREE.CanvasTexture(starCanvas);

    const material = new THREE.PointsMaterial({
      size: 3.2,
      map: texture,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Inertial spring lerp for mouse
      smoothMouse.current.x += (mouse.current.x - smoothMouse.current.x) * 0.05;
      smoothMouse.current.y += (mouse.current.y - smoothMouse.current.y) * 0.05;

      // Rotate particles subtly
      particles.rotation.y = elapsedTime * 0.03 + smoothMouse.current.x * 0.15;
      particles.rotation.x = elapsedTime * 0.015 - smoothMouse.current.y * 0.15;

      // Parallax camera sway
      camera.position.x = smoothMouse.current.x * 25;
      camera.position.y = -smoothMouse.current.y * 25;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);

      // Compute card parallax offsets for HTML overlay
      const transforms: { [key: string]: { x: number; y: number; rx: number; ry: number } } = {};
      cards.forEach((c) => {
        const factor = c.parallaxFactor || 22;
        transforms[c.id] = {
          x: smoothMouse.current.x * factor,
          y: smoothMouse.current.y * factor,
          rx: -smoothMouse.current.y * (factor * 0.35),
          ry: smoothMouse.current.x * (factor * 0.35),
        };
      });
      setCardTransforms(transforms);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [cards]);

  // Track Mouse Movement over Container
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1
    mouse.current = { x, y };
  };

  const handleMouseLeave = () => {
    mouse.current = { x: 0, y: 0 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[740px] sm:min-h-[800px] lg:min-h-[840px] py-16 flex flex-col items-center justify-center text-center px-4 mb-16 overflow-hidden bg-transparent"
    >
      {/* 3D WebGL Interactive Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Ambient Celestial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* MINIMALIST GLASSMORPHISM HEADER & DYNAMIC TAGLINE BADGE */}
      {/* ========================================================================= */}
      <div className="relative z-30 mb-5 flex flex-col items-center gap-3">
        {/* Dynamic Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/15 backdrop-blur-md shadow-xl text-xs font-medium text-slate-300 transition duration-300 hover:border-amber-400/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>A discovery engine for</span>
          <span
            className={`font-bold text-amber-300 transition-all duration-300 inline-block ${
              fadeState === 'in' ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1.5'
            }`}
          >
            [{taglineRoles[roleIndex]}]
          </span>
        </div>

        {/* Minimalist Subtitle Pills Navigation */}
        {filterTags.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-lg">
            {filterTags.map((tag) => {
              const isActive = activeTag.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() => onTagSelect?.(tag)}
                  className={`px-3.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md transition duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/15 border border-amber-400/60 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'bg-white/[0.03] border border-white/10 text-slate-400 hover:text-white hover:border-white/25 hover:bg-white/[0.07]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* CENTRAL TYPOGRAPHY ("COSMOS") WITH LUMINOUS LIGHT SHEEN */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-lg mx-auto space-y-3 px-4 py-4 pointer-events-auto">
        {/* Subtle Watermark Tag */}
        <div className="text-[11px] font-black uppercase tracking-[0.3em] text-amber-400/80">
          {centralWord}
        </div>

        {/* Main Central Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-none drop-shadow-2xl">
          {titlePrefix}{' '}
          <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
            {titleSuffix}
          </span>
        </h2>

        {/* Subtitle */}
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* DYNAMIC FLOATING VISUAL CARDS IN 3D SPACE (EXACT 3x4 RECTANGLE SHAPES) */}
      {/* ========================================================================= */}
      {cards.map((card) => {
        const transform = cardTransforms[card.id] || { x: 0, y: 0, rx: 0, ry: 0 };
        return (
          <div
            key={card.id}
            style={{
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0px) rotateX(${transform.rx}deg) rotateY(${transform.ry}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className={`absolute ${card.position} z-10 hidden lg:block pointer-events-auto`}
          >
            <div
              onClick={() => onCardClick?.(card)}
              className={`transform ${card.rotation || 'rotate-0'} cursor-pointer group transition-all duration-500 ease-out hover:scale-110 hover:rotate-0 hover:z-50`}
              title={`Explore ${card.title}`}
            >
              {/* 3x4 Rectangle Shape Photo Card */}
              <div
                className={`relative ${card.size || 'w-36 sm:w-40 lg:w-44 xl:w-48'} aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_20px_45px_rgba(0,0,0,0.85),0_0_20px_rgba(245,158,11,0.08)] border border-white/20 transition-all duration-500 group-hover:border-amber-400/90 group-hover:shadow-[0_25px_55px_rgba(0,0,0,0.92),0_0_35px_rgba(245,158,11,0.4)]`}
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out"
                />

                {/* Optional Top Badge (e.g. Discount or VIP) */}
                {card.badge && (
                  <div className="absolute top-2.5 right-2.5 bg-amber-500 text-slate-950 font-black px-2 py-0.5 rounded-full text-[10px] shadow-lg">
                    {card.badge}
                  </div>
                )}

                {/* Glass Vignette Reveal on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
                  {card.subtitle && (
                    <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 block truncate">
                      {card.subtitle}
                    </span>
                  )}
                  <span className="text-xs font-bold text-white truncate block">
                    {card.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
