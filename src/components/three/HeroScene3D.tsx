'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

// 3D Gyroscopic Rings framing the core (scaled down to prevent canvas clipping)
function GyroscopicRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = elapsed * 0.25;
      ring1Ref.current.rotation.y = elapsed * 0.12;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = elapsed * -0.18;
      ring2Ref.current.rotation.z = elapsed * 0.15;
    }

    if (ring3Ref.current) {
      ring3Ref.current.rotation.x = elapsed * -0.1;
      ring3Ref.current.rotation.y = elapsed * 0.22;
      ring3Ref.current.rotation.z = elapsed * 0.08;
    }
  });

  return (
    <group>
      {/* Outer Gyro Ring 1 (Purple) */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[1.8, 0.011, 8, 96]} />
        <meshBasicMaterial color="#A855F7" transparent opacity={0.4} wireframe />
      </mesh>

      {/* Mid Gyro Ring 2 (Orange) */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[2.0, 0.011, 8, 96]} />
        <meshBasicMaterial color="#FB923C" transparent opacity={0.3} wireframe />
      </mesh>

      {/* Inner Tilted Ring 3 (Faint White) */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[1.65, 0.006, 6, 80]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.15} wireframe />
      </mesh>
    </group>
  );
}

// Glass Core Reactor inside the particle globe (highly refractive physical material)
function GlassCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (coreRef.current) {
      // Gentle spin
      coreRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Glowing Inner Energy Source */}
      <mesh>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshBasicMaterial color="#FB923C" />
        <pointLight color="#F97316" intensity={12} distance={4} decay={2} />
      </mesh>

      {/* Refractive Glass Outer Shell */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshPhysicalMaterial
          color="#A855F7"
          emissive="#7C3AED"
          emissiveIntensity={0.3}
          roughness={0.05}
          metalness={0.1}
          transmission={0.95} // High transparency
          thickness={1.6}     // Thickness causes realistic refraction bending
          ior={1.65}          // Index of refraction
          clearcoat={1.0}
          clearcoatRoughness={0.05}
        />
      </mesh>
    </group>
  );
}

function ParticleGlobe() {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate 3,200 points on a sphere (scaled down to 1.4 radius)
  const [positions, colors] = useMemo(() => {
    const count = 3200;
    const pos = new Float32Array(count * 3);
    const cols = new Float32Array(count * 3);
    const radius = 1.4;

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

  // Keep a reference of original particle positions for calculations
  const originalPositions = useMemo(() => {
    return new Float32Array(positions);
  }, [positions]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    const points = pointsRef.current;
    if (!points) return;

    // Slow rotation
    const ry = elapsed * 0.04;
    const rx = elapsed * 0.02;
    points.rotation.y = ry;
    points.rotation.x = rx;

    // Breathing scale oscillation
    const scale = 1.0 + Math.sin(elapsed * 1.5) * 0.04;
    points.scale.setScalar(scale);

    // Get position attribute to modify
    const geo = points.geometry;
    const posAttr = geo.attributes.position;
    if (!posAttr) return;

    const posArray = posAttr.array as Float32Array;
    const count = 3200;

    // Projected pointer local position (un-rotated to align with the globe's rotation)
    const mouseLocal = new THREE.Vector3(state.pointer.x * 1.8, state.pointer.y * 1.8, 0.8);
    const invRotation = new THREE.Euler(-rx, -ry, 0, 'YXZ');
    mouseLocal.applyEuler(invRotation);

    // Physics force field interaction loop (Repulsion)
    for (let i = 0; i < count; i++) {
      const px = originalPositions[i * 3];
      const py = originalPositions[i * 3 + 1];
      const pz = originalPositions[i * 3 + 2];

      // Sinusoidal noise simulation for organic fluid movement
      const noiseScale = 1.3;
      const noiseSpeed = 1.2;
      const nx = Math.sin(px * noiseScale + elapsed * noiseSpeed) * 0.08;
      const ny = Math.cos(py * noiseScale + elapsed * (noiseSpeed * 1.05)) * 0.08;
      const nz = Math.sin(pz * noiseScale + elapsed * (noiseSpeed * 0.95)) * 0.08;

      // Unperturbed morphing target position
      const tx = px + nx;
      const ty = py + ny;
      const tz = pz + nz;

      // Distance from particle to mouse in un-rotated local space
      const dx = mouseLocal.x - tx;
      const dy = mouseLocal.y - ty;
      const dz = mouseLocal.z - tz;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const radius = 0.65; // Repulsion threshold (scaled down to match globe size)
      if (dist < radius) {
        // Push particles away dynamically
        const force = (1.0 - dist / radius) * 0.22;
        posArray[i * 3] = tx - (dx / dist) * force;
        posArray[i * 3 + 1] = ty - (dy / dist) * force;
        posArray[i * 3 + 2] = tz - (dz / dist) * force;
      } else {
        // Smoothly interpolate to morphed coordinate positions
        posArray[i * 3] += (tx - posArray[i * 3]) * 0.12;
        posArray[i * 3 + 1] += (ty - posArray[i * 3 + 1]) * 0.12;
        posArray[i * 3 + 2] += (tz - posArray[i * 3 + 2]) * 0.12;
      }
    }
    posAttr.needsUpdate = true;

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
      trail1Ref.current.position.x = Math.cos(time) * 1.85;
      trail1Ref.current.position.z = Math.sin(time) * 1.85;
      trail1Ref.current.position.y = Math.sin(time) * 0.6;
    }

    if (trail2Ref.current) {
      trail2Ref.current.position.x = Math.sin(time + Math.PI) * 1.85;
      trail2Ref.current.position.z = Math.cos(time + Math.PI) * 1.85;
      trail2Ref.current.position.y = Math.cos(time + Math.PI) * 0.85;
    }
  });

  return (
    <>
      {/* Trail 1: Orange neon */}
      <mesh ref={trail1Ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial color="#FB923C" />
        <pointLight color="#F97316" intensity={15} distance={5} decay={2} />
      </mesh>

      {/* Trail 2: Purple neon */}
      <mesh ref={trail2Ref}>
        <sphereGeometry args={[0.05, 16, 16]} />
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
        
        {/* Glowing glass core reactor */}
        <GlassCore />

        {/* Shifting stardust particles */}
        <ParticleGlobe />
        
        {/* Orbiting wireframe rings */}
        <GyroscopicRings />

        {/* Light trails and space stars */}
        <OrbitingTrails />
        <SpaceParticles />
        
        {/* Soft backlighting */}
        <pointLight position={[0, 0, -2]} color="#7C3AED" intensity={4} distance={6} />
      </Canvas>
    </div>
  );
}
