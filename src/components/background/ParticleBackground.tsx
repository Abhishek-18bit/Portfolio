'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1500; // dense but performance-safe particle count

  // Keep track of scroll dynamics
  const lastScrollY = useRef(0);
  const scrollVelocity = useRef(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY.current;
      // Convert scroll delta to velocity with a scaling factor
      scrollVelocity.current = diff * 0.025;
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate initial particle coordinates, color distribution, and speeds
  const [positions, colors, seeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const sd = new Float32Array(count); // unique seed for noise offset variation

    for (let i = 0; i < count; i++) {
      // Spawn within viewport boundary space: x[-10 to 10], y[-8 to 8], z[-12 to 1]
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = Math.random() * -13;

      // Premium luxury dark cyberpunk colors: Purple (#A855F7) and Orange (#F97316)
      const isPurple = Math.random() > 0.45;
      cols[i * 3] = isPurple ? 168 / 255 : 249 / 255;
      cols[i * 3 + 1] = isPurple ? 85 / 255 : 115 / 255;
      cols[i * 3 + 2] = isPurple ? 247 / 255 : 22 / 255;

      sd[i] = Math.random() * 100; // random offset seed
    }
    return [pos, cols, sd];
  }, []);

  // Make a reference copy of original positions to compute drift deltas
  const originalPositions = useMemo(() => {
    return new Float32Array(positions);
  }, [positions]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;
    const posArray = posAttr.array as Float32Array;

    const time = state.clock.getElapsedTime();
    
    // Smoothly decay scroll velocity
    scrollVelocity.current *= 0.92;

    // Mouse coordinates in 3D frustum space (estimated at Z = -5)
    const mx = state.pointer.x * 9.0;
    const my = state.pointer.y * 7.0;

    for (let i = 0; i < count; i++) {
      const px = posArray[i * 3];
      const py = posArray[i * 3 + 1];
      const pz = posArray[i * 3 + 2];
      const seed = seeds[i];

      // 1. Fluid Vector Field (Trigonometric Curl Noise Simulation)
      // Combines multiple sine/cosine waves depending on Z-depth, Y/X positions and seed offsets
      const vx = Math.sin(py * 0.4 + time * 0.4 + seed) * 0.008 + Math.cos(pz * 0.2 + time * 0.3) * 0.004;
      const vy = Math.cos(px * 0.4 - time * 0.4 + seed) * 0.008 + Math.sin(pz * 0.2 + time * 0.3) * 0.004;
      const vz = Math.sin(px * 0.2 + time * 0.3 + seed) * 0.004 + Math.cos(py * 0.2 - time * 0.2) * 0.004;

      // 2. Mouse Vortex Swirl interaction
      // Particles swirl perpendicular to mouse vector and get drawn in slightly when close
      const dx = mx - px;
      const dy = my - py;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      let mxForce = 0;
      let myForce = 0;
      const threshold = 3.2; // interaction range

      if (dist < threshold) {
        const influence = (1.0 - dist / threshold) * 0.035;
        // Perpendicular vector for swirl rotation
        const perpX = -dy / (dist + 0.1);
        const perpY = dx / (dist + 0.1);
        
        mxForce = perpX * influence + dx * influence * 0.08;
        myForce = perpY * influence + dy * influence * 0.08;
      }

      // 3. Scroll Velocity vertical drift
      // Pushes particles opposite to scroll direction (creates vertical parallax)
      const scrollDrift = -scrollVelocity.current * (1.0 + Math.abs(pz) * 0.1);

      // 4. Combine Forces & Update positions
      let newX = px + vx + mxForce;
      let newY = py + vy + myForce + scrollDrift;
      let newZ = pz + vz + Math.abs(scrollVelocity.current) * 0.02; // slide forward slightly on scroll

      // 5. Frustum boundary wrapping to maintain constant density
      if (Math.abs(newX) > 11.5) newX = -Math.sign(newX) * 11.0;
      if (Math.abs(newY) > 9.5) newY = -Math.sign(newY) * 9.0;
      if (newZ > 1.5) newZ = -12.5;
      if (newZ < -13.5) newZ = 1.0;

      posArray[i * 3] = newX;
      posArray[i * 3 + 1] = newY;
      posArray[i * 3 + 2] = newZ;
    }

    posAttr.needsUpdate = true;

    // Gentle camera parallax sway following pointer coordinates
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.6,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.6,
      0.03
    );
    state.camera.lookAt(0, 0, -5);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

export default function ParticleBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#0A0A0A] select-none">
      <Canvas camera={{ position: [0, 0, 1], fov: 65 }} gl={{ antialias: false }}>
        <BackgroundParticles />
      </Canvas>
    </div>
  );
}
