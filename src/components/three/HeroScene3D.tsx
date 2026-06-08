'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function ParticleGlobe() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 3,000 points on a sphere
  const [positions, colors] = useMemo(() => {
    const count = 3200;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const radius = 2.0;

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Color nodes: Purple (#A855F7) & Orange (#F97316)
      const isPurple = Math.random() > 0.45;
      cols[i * 3] = isPurple ? 168 / 255 : 249 / 255;
      cols[i * 3 + 1] = isPurple ? 85 / 255 : 115 / 255;
      cols[i * 3 + 2] = isPurple ? 247 / 255 : 22 / 255;
    }
    return [pos, cols];
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (pointsRef.current) {
      // Slow rotation
      pointsRef.current.rotation.y = elapsed * 0.04;
      pointsRef.current.rotation.x = elapsed * 0.02;

      // Breathing scale oscillation
      const scale = 1.0 + Math.sin(elapsed * 1.5) * 0.04;
      pointsRef.current.scale.setScalar(scale);
    }

    // Camera pointer tracking (smooth lerping)
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 1.8,
      0.05
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 1.8,
      0.05
    );
    state.camera.lookAt(0, 0, 0);
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
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Light Trails orbiting the globe
function OrbitingTrails() {
  const trail1Ref = useRef<THREE.Mesh>(null);
  const trail2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 1.2;

    if (trail1Ref.current) {
      trail1Ref.current.position.x = Math.cos(time) * 2.6;
      trail1Ref.current.position.z = Math.sin(time) * 2.6;
      trail1Ref.current.position.y = Math.sin(time) * 0.8;
    }

    if (trail2Ref.current) {
      trail2Ref.current.position.x = Math.sin(time + Math.PI) * 2.6;
      trail2Ref.current.position.z = Math.cos(time + Math.PI) * 2.6;
      trail2Ref.current.position.y = Math.cos(time + Math.PI) * 1.2;
    }
  });

  return (
    <>
      {/* Trail 1: Orange neon */}
      <mesh ref={trail1Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#FB923C" />
        <pointLight color="#F97316" intensity={15} distance={5} decay={2} />
      </mesh>

      {/* Trail 2: Purple neon */}
      <mesh ref={trail2Ref}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#A855F7" />
        <pointLight color="#7C3AED" intensity={15} distance={5} decay={2} />
      </mesh>
    </>
  );
}

// Global floating particles surrounding space
function SpaceParticles() {
  const count = 300;
  const [positions] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return [pos];
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.005;
      ref.current.rotation.x = state.clock.getElapsedTime() * 0.003;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#ffffff"
        transparent
        opacity={0.3}
        depthWrite={false}
      />
    </points>
  );
}

export default function HeroScene3D() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[550px] relative z-10 select-none">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }} gl={{ antialias: true }}>
        <ambientLight intensity={0.15} />
        <directionalLight position={[2, 4, 3]} intensity={0.4} />
        
        <ParticleGlobe />
        <OrbitingTrails />
        <SpaceParticles />
        
        {/* Soft backlighting */}
        <pointLight position={[0, 0, -2]} color="#7C3AED" intensity={4} distance={6} />
      </Canvas>
    </div>
  );
}
