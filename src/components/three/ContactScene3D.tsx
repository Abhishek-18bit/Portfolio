'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

// Main Refractive Crystal Shape
function Crystal() {
  const crystalRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (crystalRef.current) {
      // Rotation influenced by mouse pointer coordinates
      crystalRef.current.rotation.y = elapsed * 0.15 + state.pointer.x * 0.5;
      crystalRef.current.rotation.x = elapsed * 0.10 + state.pointer.y * 0.3;

      // Floating sine wave animation
      crystalRef.current.position.y = Math.sin(elapsed * 1.2) * 0.15;
    }
  });

  return (
    <mesh ref={crystalRef}>
      {/* Octahedron creates a clean double-pointed crystal structure */}
      <octahedronGeometry args={[1.3, 0]} />
      <meshPhysicalMaterial
        color="#E8D5FF"
        emissive="#7C3AED"
        emissiveIntensity={0.15}
        roughness={0.05}
        metalness={0.1}
        transmission={1.0} // Enable transmission refraction
        thickness={1.5}
        ior={1.55} // Glass index of refraction
        clearcoat={1.0}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
}

// Smaller Orbiting geometric shapes
function OrbitingShapes() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime() * 0.8;

    // Cube orbit
    if (cubeRef.current) {
      cubeRef.current.position.x = Math.cos(time) * 2.2;
      cubeRef.current.position.z = Math.sin(time) * 2.2;
      cubeRef.current.position.y = Math.sin(time * 1.5) * 0.4;
      cubeRef.current.rotation.x = time * 0.5;
      cubeRef.current.rotation.y = time * 0.8;
    }

    // Torus orbit (opposite direction)
    if (torusRef.current) {
      torusRef.current.position.x = Math.sin(time + Math.PI) * 2.2;
      torusRef.current.position.z = Math.cos(time + Math.PI) * 2.2;
      torusRef.current.position.y = Math.cos(time * 1.5) * 0.4;
      torusRef.current.rotation.x = -time * 0.4;
      torusRef.current.rotation.z = time * 0.6;
    }
  });

  return (
    <>
      {/* Floating Orange Cube */}
      <mesh ref={cubeRef}>
        <boxGeometry args={[0.32, 0.32, 0.32]} />
        <meshPhysicalMaterial
          color="#FB923C"
          roughness={0.1}
          metalness={0.8}
          clearcoat={1.0}
        />
      </mesh>

      {/* Floating Purple Torus */}
      <mesh ref={trail => torusRef.current = trail as THREE.Mesh}>
        <torusGeometry args={[0.22, 0.08, 12, 24]} />
        <meshPhysicalMaterial
          color="#A855F7"
          roughness={0.15}
          metalness={0.6}
          clearcoat={1.0}
        />
      </mesh>
    </>
  );
}

export default function ContactScene3D() {
  return (
    <div className="w-full h-full min-h-[350px] relative select-none">
      <Canvas camera={{ position: [0, 0, 4.0], fov: 50 }}>
        {/* Cinematic Lighting system */}
        <ambientLight intensity={0.2} />
        
        {/* Orange Point Light */}
        <pointLight position={[5, 4, 3]} intensity={6.0} color="#F97316" decay={1.5} />
        
        {/* Purple Point Light */}
        <pointLight position={[-5, -4, -3]} intensity={6.0} color="#7C3AED" decay={1.5} />

        {/* Rim Light for backlighting highlights */}
        <directionalLight position={[0, 0, -4]} intensity={2.0} color="#A855F7" />

        <Crystal />
        <OrbitingShapes />
      </Canvas>
    </div>
  );
}
