import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { WORLD_CITIES, CityInfo } from '../data/worldDatabase';

interface Spatial3DGlobeProps {
  targetLocation?: { 
    lat: number; 
    lon: number; 
    name?: string; 
    cartesian3D?: { x: number; y: number; z: number };
  } | null;
  isDiving?: boolean;
  onTriggerDive?: (city: CityInfo) => void;
  onSelectCity?: (city: CityInfo) => void;
  [key: string]: any;
}

// High-Res NASA / Satellite Texture URLs (Served locally for 0ms load & zero latency)
const EARTH_DAY_URL = '/textures/earth_atmos_2048.jpg';
const EARTH_NORMAL_URL = '/textures/earth_normal_2048.jpg';
const EARTH_SPECULAR_URL = '/textures/earth_specular_2048.jpg';
const EARTH_CLOUDS_URL = '/textures/earth_clouds_1024.png';

// Helper to calculate Geo Distance in KM
function getGeoDistanceKM(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  return 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 6371;
}

export const Spatial3DGlobe: React.FC<Spatial3DGlobeProps> = ({ 
  targetLocation, 
  isDiving,
  onTriggerDive,
  onSelectCity
}) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Hover state for interactive tooltip
  const [hoveredCity, setHoveredCity] = useState<CityInfo | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Three.js instances refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const earthMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const pinSpritesRef = useRef<THREE.Sprite[]>([]);
  
  const targetRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: 0 });
  const currentRotationRef = useRef<{ x: number; y: number }>({ x: 0.2, y: 0 });
  const targetCameraZRef = useRef<number>(285);
  const currentCameraZRef = useRef<number>(285);
  const isDraggingRef = useRef(false);
  const clickStartRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  // Handle Hyperspace plunge into the city
  useEffect(() => {
    if (isDiving) {
      targetCameraZRef.current = 86; // Plunge through the clouds
    }
  }, [isDiving]);

  // Rotate smoothly to targeted city / country coordinates & keep comfortable orbit view without stutter
  useEffect(() => {
    if (!targetLocation) {
      targetCameraZRef.current = 285;
      return;
    }
    const { lat, lon } = targetLocation;
    const latRad = (lat * Math.PI) / 180;
    const lonRad = (lon * Math.PI) / 180;

    // Bring (lat, lon) directly to face camera at +Z
    const targetY = (Math.PI / 2) - lonRad;
    const targetX = latRad * 0.7;

    // Shortest-path continuous interpolation without angular wrap-around stutter
    const currentY = currentRotationRef.current.y;
    const diffY = ((targetY - currentY) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;

    targetRotationRef.current = {
      x: targetX,
      y: currentY + diffY,
    };

    // Stays framed in full view (Image 2) unless hypersonic plunge is triggered
    targetCameraZRef.current = isDiving ? 86 : 285;

    // Pause auto rotation briefly so user can view the targeted location
    isDraggingRef.current = true;
    const timer = setTimeout(() => {
      isDraggingRef.current = false;
    }, 7000);

    return () => clearTimeout(timer);
  }, [targetLocation, isDiving]);

  // Build Pure 3D Interactive WebGL Earth Globe
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera - Perfectly framed for centered Earth with comfortable margins (Image 2)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 285);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // Globe Group - Centered on screen
    const globeGroup = new THREE.Group();
    globeGroup.position.set(0, 0, 0);
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    const radius = 80;

    // =========================================================================
    // 1. EARTH MAIN SPHERE WITH LOCAL NASA SATELLITE TEXTURES (Instant 0ms Load)
    // =========================================================================
    const textureLoader = new THREE.TextureLoader();

    const dayTexture = textureLoader.load(EARTH_DAY_URL, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      earthMat.needsUpdate = true;
    });
    dayTexture.colorSpace = THREE.SRGBColorSpace;

    const normalTexture = textureLoader.load(EARTH_NORMAL_URL, () => {
      earthMat.needsUpdate = true;
    });

    const specularTexture = textureLoader.load(EARTH_SPECULAR_URL, () => {
      earthMat.needsUpdate = true;
    });

    const earthGeo = new THREE.SphereGeometry(radius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      map: dayTexture,
      normalMap: normalTexture,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: specularTexture,
      roughness: 0.65,
      metalness: 0.1,
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);
    earthMeshRef.current = earthMesh;

    // =========================================================================
    // 2. INDEPENDENT ROTATING CLOUD SPHERE (Local 0ms Texture)
    // =========================================================================
    const cloudsGeo = new THREE.SphereGeometry(radius * 1.018, 48, 48);
    const cloudsTexture = textureLoader.load(EARTH_CLOUDS_URL, () => {
      cloudsMat.needsUpdate = true;
    });
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsTexture,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });

    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);
    cloudsMeshRef.current = cloudsMesh;

    // =========================================================================
    // 4. CLEAN, DECENT, MINIMALIST SMALL GLOWING CITY POINTS (High-End Luxury)
    // =========================================================================
    // Create delicate high-DPI subtle glowing pinpoint dot texture
    const dotCanvas = document.createElement('canvas');
    dotCanvas.width = 64;
    dotCanvas.height = 64;
    const dotCtx = dotCanvas.getContext('2d');
    if (dotCtx) {
      // Soft ambient golden halo
      const glowGrad = dotCtx.createRadialGradient(32, 32, 0, 32, 32, 30);
      glowGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      glowGrad.addColorStop(0.2, 'rgba(251, 191, 36, 0.95)');
      glowGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.45)');
      glowGrad.addColorStop(0.85, 'rgba(217, 119, 6, 0.15)');
      glowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      dotCtx.fillStyle = glowGrad;
      dotCtx.beginPath();
      dotCtx.arc(32, 32, 30, 0, Math.PI * 2);
      dotCtx.fill();

      // Crisp solid center dot
      dotCtx.fillStyle = '#FFFFFF';
      dotCtx.beginPath();
      dotCtx.arc(32, 32, 4.5, 0, Math.PI * 2);
      dotCtx.fill();
    }

    const dotTexture = new THREE.CanvasTexture(dotCanvas);
    const pinSprites: THREE.Sprite[] = [];
    const pinRadius = radius + 0.45; // Sits neatly and naturally right on Earth's surface

    WORLD_CITIES.forEach((city) => {
      const latRad = (city.lat * Math.PI) / 180;
      const lonRad = (city.lon * Math.PI) / 180;

      // Exact 3D Position on Sphere Surface
      const x = pinRadius * Math.cos(latRad) * Math.cos(lonRad);
      const y = pinRadius * Math.sin(latRad);
      const z = -pinRadius * Math.cos(latRad) * Math.sin(lonRad);

      const spriteMat = new THREE.SpriteMaterial({
        map: dotTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });

      const sprite = new THREE.Sprite(spriteMat);
      sprite.position.set(x, y, z);
      
      // Clean, small, decent scale (small delicate point)
      const baseScale = city.name === 'Hyderabad' ? 1.85 : 1.45;
      sprite.scale.set(baseScale, baseScale, 1);
      sprite.userData = { city, baseScale };

      globeGroup.add(sprite);
      pinSprites.push(sprite);
    });

    pinSpritesRef.current = pinSprites;

    // =========================================================================
    // 5. ATMOSPHERIC HALO GLOW
    // =========================================================================
    const glowGeo = new THREE.SphereGeometry(radius * 1.14, 48, 48);
    const glowMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        void main() {
          float intensity = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.8);
          gl_FragColor = vec4(0.96, 0.62, 0.08, 1.0) * intensity * 1.5;
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
    });

    const glowMesh = new THREE.Mesh(glowGeo, glowMat);
    scene.add(glowMesh);

    // =========================================================================
    // 6. LIGHTING & STARFIELD
    // =========================================================================
    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.6);
    sunLight.position.set(180, 60, 150);
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x1a365d, 0.8);
    fillLight.position.set(-150, -40, -100);
    scene.add(fillLight);

    const ambientLight = new THREE.AmbientLight(0x0a1526, 0.9);
    scene.add(ambientLight);

    // =========================================================================
    // 6. RAYCASTER & INTERACTIVE CLICK / HOVER ON GLOBE (Throttled for Performance)
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    // Generous threshold for clicking small pinpoint markers easily
    raycaster.params.Sprite = { threshold: 3.5 };
    const mouse = new THREE.Vector2();
    let lastHoverCheck = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      clickStartRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle drag rotation
      if (isDraggingRef.current) {
        const deltaX = e.clientX - previousMousePositionRef.current.x;
        const deltaY = e.clientY - previousMousePositionRef.current.y;

        targetRotationRef.current.y += deltaX * 0.0055;
        targetRotationRef.current.x += deltaY * 0.0055;
        targetRotationRef.current.x = Math.max(-1.4, Math.min(1.4, targetRotationRef.current.x));

        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
        setHoveredCity(null);
        return;
      }

      // Throttle hover raycasting to ~30fps to keep interaction silky smooth without lag
      const now = performance.now();
      if (now - lastHoverCheck < 32) return;
      lastHoverCheck = now;

      // Raycast pins and globe for hover tooltip
      raycaster.setFromCamera(mouse, camera);
      const pinIntersects = raycaster.intersectObjects(pinSprites);

      if (pinIntersects.length > 0) {
        const targetObj = pinIntersects[0].object as THREE.Sprite;
        const city = targetObj.userData.city as CityInfo;
        if (city) {
          setHoveredCity(city);
          setTooltipPos({ x: e.clientX, y: e.clientY });
          container.style.cursor = 'pointer';
          return;
        }
      }

      // Check earth mesh surface hover
      if (earthMeshRef.current) {
        const earthIntersects = raycaster.intersectObject(earthMeshRef.current);
        if (earthIntersects.length > 0) {
          const hit = earthIntersects[0];
          const localPoint = globeGroup.worldToLocal(hit.point.clone());
          const lat = Math.asin(Math.max(-1, Math.min(1, localPoint.y / radius))) * (180 / Math.PI);
          const lon = Math.atan2(-localPoint.z, localPoint.x) * (180 / Math.PI);

          // Find nearest city
          let nearestCity: CityInfo | null = null;
          let minDistance = Infinity;

          WORLD_CITIES.forEach((c) => {
            const d = getGeoDistanceKM(lat, lon, c.lat, c.lon);
            if (d < minDistance) {
              minDistance = d;
              nearestCity = c;
            }
          });

          if (nearestCity && minDistance < 1000) {
            setHoveredCity(nearestCity);
            setTooltipPos({ x: e.clientX, y: e.clientY });
            container.style.cursor = 'pointer';
            return;
          }
        }
      }

      setHoveredCity(null);
      container.style.cursor = 'grab';
    };

    const handleMouseUp = (e: MouseEvent) => {
      isDraggingRef.current = false;
      const dx = Math.abs(e.clientX - clickStartRef.current.x);
      const dy = Math.abs(e.clientY - clickStartRef.current.y);
      const dt = Date.now() - clickStartRef.current.time;

      // Valid Click detected (not drag)
      if (dx < 7 && dy < 7 && dt < 350) {
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        // 1. Did user click directly on a small golden point?
        const pinIntersects = raycaster.intersectObjects(pinSprites);
        if (pinIntersects.length > 0) {
          const targetObj = pinIntersects[0].object as THREE.Sprite;
          const city = targetObj.userData.city as CityInfo;
          if (city) {
            if (onTriggerDive) onTriggerDive(city);
            else if (onSelectCity) onSelectCity(city);
            return;
          }
        }

        // 2. Did user click on the Earth surface near a city?
        if (earthMeshRef.current) {
          const earthIntersects = raycaster.intersectObject(earthMeshRef.current);
          if (earthIntersects.length > 0) {
            const hit = earthIntersects[0];
            const localPoint = globeGroup.worldToLocal(hit.point.clone());
            const lat = Math.asin(Math.max(-1, Math.min(1, localPoint.y / radius))) * (180 / Math.PI);
            const lon = Math.atan2(-localPoint.z, localPoint.x) * (180 / Math.PI);

            // Find closest city on Earth
            let nearestCity: CityInfo | null = null;
            let minDistance = Infinity;

            WORLD_CITIES.forEach((c) => {
              const d = getGeoDistanceKM(lat, lon, c.lat, c.lon);
              if (d < minDistance) {
                minDistance = d;
                nearestCity = c;
              }
            });

            // If clicked near a city (e.g. Hyderabad in India)
            if (nearestCity && minDistance < 1400) {
              if (onTriggerDive) onTriggerDive(nearestCity);
              else if (onSelectCity) onSelectCity(nearestCity);
            }
          }
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        clickStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY, time: Date.now() };
        previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = e.touches[0].clientY - previousMousePositionRef.current.y;

      targetRotationRef.current.y += deltaX * 0.0065;
      targetRotationRef.current.x += deltaY * 0.0065;
      targetRotationRef.current.x = Math.max(-1.4, Math.min(1.4, targetRotationRef.current.x));

      previousMousePositionRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      // If user holds Ctrl/Meta or pinch-to-zooms, zoom 3D globe camera
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        if (!cameraRef.current) return;
        cameraRef.current.position.z += e.deltaY * 0.12;
        cameraRef.current.position.z = Math.max(240, Math.min(360, cameraRef.current.position.z));
      }
      // Otherwise allow natural, buttery-smooth webpage scrolling down to next sections!
    };

    const isHoveringRef = { current: false };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      setHoveredCity(null);
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    container.addEventListener('wheel', handleWheel, { passive: false });

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Ultra-slow, calm and gentle drift and fully paused when user is hovering or inspecting
      if (!isDraggingRef.current && !isHoveringRef.current) {
        targetRotationRef.current.y += 0.0002;
      }

      // Buttery smooth shortest-path rotation interpolation
      const dy = targetRotationRef.current.y - currentRotationRef.current.y;
      currentRotationRef.current.y += dy * 0.09;

      const dx = targetRotationRef.current.x - currentRotationRef.current.x;
      currentRotationRef.current.x += dx * 0.09;

      // Fast Camera Smooth Zoom Interpolation
      currentCameraZRef.current += (targetCameraZRef.current - currentCameraZRef.current) * 0.10;
      if (cameraRef.current) {
        cameraRef.current.position.z = currentCameraZRef.current;
      }

      if (globeGroupRef.current) {
        globeGroupRef.current.rotation.x = currentRotationRef.current.x;
        globeGroupRef.current.rotation.y = currentRotationRef.current.y;
      }

      // Independent Clouds Rotation (ultra gentle)
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0001;
      }

      // Delicate subtle shimmer on points
      const shimmer = 1 + Math.sin(elapsed * 3.5) * 0.12;
      pinSprites.forEach((sp) => {
        const base = sp.userData.baseScale || 1.45;
        sp.scale.set(base * shimmer, base * shimmer, 1);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [onTriggerDive, onSelectCity]);

  return (
    <div className="relative w-full h-full">
      {/* ========================================================================= */}
      {/* LUXURY HERO TYPOGRAPHY WITH DARK CONTRAST SCRIM OVERLAY */}
      {/* ========================================================================= */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden px-4"
        aria-hidden="true"
      >
        {/* Dark Radial Scrim Backdrop to contrast against deep space */}
        <div 
          className="absolute w-[95%] sm:w-[85%] h-[320px] sm:h-[450px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(14, 22, 38, 0.75) 0%, rgba(7, 10, 16, 0.45) 55%, transparent 80%)',
            filter: 'blur(30px)',
          }}
        />

        {/* High-Contrast Luxury Hero Brandmark */}
        <span 
          className="font-serif tracking-[0.22em] text-white/[0.28] uppercase font-light text-center leading-none transform -translate-y-4 relative z-10"
          style={{
            fontFamily: "'Cinzel', 'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 9.5vw, 9.5rem)',
            textShadow: '0 0 50px rgba(245, 158, 11, 0.35), 0 0 100px rgba(0, 0, 0, 0.9), 0 2px 4px rgba(0, 0, 0, 0.8)',
            letterSpacing: 'clamp(0.12em, 0.22em, 0.30em)',
            maxWidth: '100%',
          }}
        >
          AEROVOYAGE
        </span>
      </div>

      {/* ========================================================================= */}
      {/* 3D WEBGL EARTH CANVAS MOUNT */}
      {/* ========================================================================= */}
      <div ref={mountRef} className="relative z-10 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* ========================================================================= */}
      {/* INTERACTIVE HOVER PIN TOOLTIP */}
      {/* ========================================================================= */}
      {hoveredCity && !isDiving && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full mb-3 animate-in fade-in zoom-in-95 duration-150"
          style={{ left: tooltipPos.x, top: tooltipPos.y - 14 }}
        >
          <div 
            className="px-4 py-2 rounded-full shadow-2xl border border-amber-400/60 flex items-center gap-2.5 text-sm font-bold text-white backdrop-blur-xl"
            style={{
              background: 'linear-gradient(180deg, rgba(28, 35, 48, 0.96) 0%, rgba(14, 19, 30, 0.98) 100%)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.85), 0 0 20px rgba(245,158,11,0.5)',
            }}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
            <span>{hoveredCity.flag} {hoveredCity.name}</span>
            <span className="text-xs text-amber-400 font-mono font-bold uppercase bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
              Click to Enter
            </span>
          </div>
        </div>
      )}

    </div>
  );
};
