'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';

function BackgroundParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  // Generate random points in a large 3D volume
  const [positions, colors, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Position volume: x[-8 to 8], y[-8 to 8], z[-10 to 2]
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 2] = Math.random() * -12;

      // Color nodes: Purple (#A855F7) & Orange (#F97316)
      const isPurple = Math.random() > 0.45;
      cols[i * 3] = isPurple ? 168 / 255 : 249 / 255;
      cols[i * 3 + 1] = isPurple ? 85 / 255 : 115 / 255;
      cols[i * 3 + 2] = isPurple ? 247 / 255 : 22 / 255;

      spd[i] = 0.005 + Math.random() * 0.012;
    }
    return [pos, cols, spd];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;

    // Drifting particles towards camera
    for (let i = 0; i < count; i++) {
      let z = posAttr.getZ(i);
      z += speeds[i];

      // Loop back if particle goes past the camera
      if (z > 2) {
        z = -12;
      }
      posAttr.setZ(i, z);
    }
    posAttr.needsUpdate = true;

    // Slow rotation
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.003;

    // Mouse Parallax drift
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.8,
      0.03
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.8,
      0.03
    );
    state.camera.lookAt(0, 0, -4);
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
