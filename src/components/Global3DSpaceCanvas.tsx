import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Global3DSpaceCanvasProps {
  className?: string;
}

export const Global3DSpaceCanvas: React.FC<Global3DSpaceCanvasProps> = ({
  className = 'fixed inset-0 pointer-events-none z-0 overflow-hidden',
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    camera.position.z = 600;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Layer 1: High-Density Deep 3D Starfield (Exactly matching the screenshot)
    const starsCount = 2800;
    const starsGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starsCount * 3);
    const colors = new Float32Array(starsCount * 3);
    const scales = new Float32Array(starsCount);

    const palette = [
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#FFFFFF'),
      new THREE.Color('#FDE68A'), // warm celestial gold
      new THREE.Color('#BAE6FD'), // pale nebula cyan
      new THREE.Color('#E0E7FF'), // soft blue-white
    ];

    for (let i = 0; i < starsCount; i++) {
      const i3 = i * 3;
      // Spread across generous 3D sphere volume
      const r = THREE.MathUtils.randFloat(150, 1400);
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);

      positions[i3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = r * Math.cos(phi);

      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;

      scales[i] = Math.random() * 1.5 + 0.5;
    }

    starsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starsGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Crisp high-DPI point sprite texture
    const starCanvas = document.createElement('canvas');
    starCanvas.width = 32;
    starCanvas.height = 32;
    const ctx = starCanvas.getContext('2d');
    if (ctx) {
      const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 15);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(16, 16, 15, 0, Math.PI * 2);
      ctx.fill();
    }
    const starTexture = new THREE.CanvasTexture(starCanvas);

    const starsMat = new THREE.PointsMaterial({
      size: 2.2,
      map: starTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 4. Layer 2: Close Floating Foreground 3D Stars for Deep Parallax
    const fgStarsCount = 200;
    const fgGeo = new THREE.BufferGeometry();
    const fgPositions = new Float32Array(fgStarsCount * 3);
    for (let i = 0; i < fgStarsCount * 3; i += 3) {
      fgPositions[i] = (Math.random() - 0.5) * 800;
      fgPositions[i + 1] = (Math.random() - 0.5) * 800;
      fgPositions[i + 2] = THREE.MathUtils.randFloat(300, 580);
    }
    fgGeo.setAttribute('position', new THREE.BufferAttribute(fgPositions, 3));
    const fgMat = new THREE.PointsMaterial({
      size: 3.2,
      map: starTexture,
      color: 0xfffaed,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const fgStarField = new THREE.Points(fgGeo, fgMat);
    scene.add(fgStarField);

    // 5. Interactive 3D Parallax & Scroll Listeners
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let scrollY = window.scrollY || 0;
    let targetScrollY = scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 60;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 60;
    };

    const handleScroll = () => {
      targetScrollY = window.scrollY || 0;
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // 6. 3D Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Slow organic 3D rotation of celestial sphere
      starField.rotation.y = elapsed * 0.015;
      starField.rotation.x = Math.sin(elapsed * 0.008) * 0.05;

      fgStarField.rotation.y = elapsed * 0.022;
      fgStarField.rotation.x = Math.cos(elapsed * 0.01) * 0.06;

      // Mouse Parallax Lerp
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      // Scroll Parallax Lerp - Smoothly shift 3D camera with page scroll
      scrollY += (targetScrollY - scrollY) * 0.08;

      camera.position.x = currentMouseX;
      camera.position.y = -currentMouseY - (scrollY * 0.08);
      camera.lookAt(0, -scrollY * 0.08, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      starsGeo.dispose();
      starsMat.dispose();
      fgGeo.dispose();
      fgMat.dispose();
      starTexture.dispose();
    };
  }, []);

  return <div ref={mountRef} className={className} />;
};
