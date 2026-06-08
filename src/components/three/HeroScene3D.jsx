import { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

// ===== Torus Knot =====
function TorusKnot({ mouseX, mouseY }) {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.15 + mouseY * 0.3;
      meshRef.current.rotation.y = time * 0.2 + mouseX * 0.3;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.32, 128, 32]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#001a1f"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
    </Float>
  );
}

// ===== Floating Cubes — positions are memoized to avoid re-renders =====
const CUBE_DATA = Array.from({ length: 8 }, (_, i) => ({
  position: [
    (i % 4 - 1.5) * 2.5,
    (Math.floor(i / 4) - 0.5) * 3,
    -3 + (i % 3) * 0.5,
  ],
  scale: 0.15 + (i % 3) * 0.1,
  speed: 0.3 + (i % 5) * 0.1,
  color: i % 2 === 0 ? '#00E5FF' : '#7C3AED',
  wireframe: i % 3 !== 0,
}));

function FloatingCubes() {
  const meshRefs = useRef([]);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    meshRefs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.x = time * CUBE_DATA[i].speed;
        mesh.rotation.y = time * CUBE_DATA[i].speed * 0.7;
        mesh.position.y = CUBE_DATA[i].position[1] + Math.sin(time * CUBE_DATA[i].speed + i) * 0.3;
      }
    });
  });

  return (
    <>
      {CUBE_DATA.map((cube, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={cube.position}
          scale={cube.scale}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={cube.color}
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.8}
            wireframe={cube.wireframe}
          />
        </mesh>
      ))}
    </>
  );
}

// ===== Energy Orb =====
function EnergyOrb() {
  const meshRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.position.x = Math.sin(time * 0.4) * 2;
      meshRef.current.position.y = Math.cos(time * 0.3) * 1.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[0.4, 64, 64]} position={[2, 1, -1]}>
      <MeshDistortMaterial
        color="#7C3AED"
        emissive="#3D1C8A"
        emissiveIntensity={0.5}
        roughness={0}
        metalness={1}
        distort={0.5}
        speed={3}
        transparent
        opacity={0.85}
      />
    </Sphere>
  );
}

// ===== Camera Rig =====
function CameraRig({ mouseX, mouseY }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ===== Full 3D Scene =====
function Scene({ mouseX, mouseY }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#00E5FF" />
      <pointLight position={[-3, 2, 2]} intensity={1} color="#7C3AED" />
      <pointLight position={[3, -2, -2]} intensity={0.8} color="#00E5FF" />
      <Stars radius={50} depth={50} count={2000} factor={2} saturation={0} fade speed={1} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <TorusKnot mouseX={mouseX} mouseY={mouseY} />
      <FloatingCubes />
      <EnergyOrb />
    </>
  );
}

// ===== Mobile Fallback =====
function Scene3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className="w-64 h-64 rounded-full animate-pulse-slow"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.25) 0%, rgba(124,58,237,0.15) 50%, transparent 70%)',
          boxShadow: '0 0 80px rgba(0,229,255,0.2)',
        }}
      />
    </div>
  );
}

// ===== Main Export =====
const HeroScene3D = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  if (isMobile) return <Scene3DFallback />;

  return (
    <div className="relative w-full h-full">
      {/* Glow behind canvas */}
      <div
        className="absolute inset-0 m-auto w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(0,229,255,0.12) 0%, rgba(124,58,237,0.08) 50%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <Scene mouseX={mousePos.x} mouseY={mousePos.y} />
        </Suspense>
      </Canvas>

      {/* Edge fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(5,8,22,0) 40%, rgba(5,8,22,0.4) 100%)',
        }}
      />
    </div>
  );
};

export default HeroScene3D;
