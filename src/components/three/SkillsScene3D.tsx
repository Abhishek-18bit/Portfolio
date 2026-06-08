'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';

interface NodeData {
  name: string;
  pos: [number, number, number];
  color: string;
}

const NODES: NodeData[] = [
  { name: 'React', pos: [0, 1.4, 0], color: '#A855F7' },
  { name: 'Next.js', pos: [-1.4, 0.4, 0.4], color: '#FB923C' },
  { name: 'TypeScript', pos: [1.4, 0.4, -0.4], color: '#A855F7' },
  { name: 'Node.js', pos: [-1.1, -0.9, -0.3], color: '#FB923C' },
  { name: 'PostgreSQL', pos: [1.1, -0.9, 0.3], color: '#A855F7' },
  { name: 'Docker', pos: [0, -0.2, 0.9], color: '#FB923C' },
];

// Connection indices between nodes
const CONNECTIONS = [
  [0, 1], // React -> Next.js
  [0, 2], // React -> TypeScript
  [1, 3], // Next.js -> Node.js
  [2, 4], // TypeScript -> PostgreSQL
  [3, 4], // Node.js -> PostgreSQL
  [5, 0], // Docker -> React
  [5, 1], // Docker -> Next.js
  [5, 2], // Docker -> TypeScript
  [5, 3], // Docker -> Node.js
  [5, 4], // Docker -> PostgreSQL
];

const CATEGORY_MAP: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'TypeScript'],
  Backend: ['Node.js', 'PostgreSQL', 'Docker'],
  Languages: ['TypeScript', 'React', 'Node.js'],
  'DSA & Algorithms': ['React', 'TypeScript', 'PostgreSQL'],
  Tools: ['Docker', 'Next.js', 'Node.js'],
};

// Orbiting electron sub-particles for nodes
interface ElectronsProps {
  center: [number, number, number];
  color: string;
  isHighlighted: boolean;
}

function OrbitingElectrons({ center, color, isHighlighted }: ElectronsProps) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 2;

  useFrame((state) => {
    if (groupRef.current) {
      const speed = isHighlighted ? 3.0 : 1.2;
      groupRef.current.rotation.y = state.clock.getElapsedTime() * speed;
      groupRef.current.rotation.z = state.clock.getElapsedTime() * (speed * 0.5);
    }
  });

  const materialColor = isHighlighted ? color : '#444444';

  return (
    <group ref={groupRef} position={center}>
      {[...Array(count)].map((_, i) => {
        const angle = (i * Math.PI * 2) / count;
        const radius = 0.38;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return (
          <mesh key={i} position={[x, 0, z]}>
            <sphereGeometry args={[0.015, 8, 8]} />
            <meshBasicMaterial color={materialColor} transparent opacity={isHighlighted ? 0.9 : 0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

interface SkillNodeProps extends NodeData {
  activeCategory: string;
}

function SkillNode({ name, pos, color, activeCategory }: SkillNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  // Check if node belongs to the active category
  const isHighlighted = useMemo(() => {
    return CATEGORY_MAP[activeCategory]?.includes(name) ?? false;
  }, [activeCategory, name]);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    if (meshRef.current) {
      // Scale calculation: Highlighted nodes are larger
      let targetScale = isHighlighted ? 1.25 : 0.75;
      if (hovered) targetScale *= 1.25;

      const pulse = 1.0 + Math.sin(elapsed * (isHighlighted ? 4.0 : 2.0)) * 0.04;
      meshRef.current.scale.setScalar(
        THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale * pulse, 0.1)
      );
    }
  });

  const isPurpleAccent = name === 'React' || name === 'TypeScript' || name === 'PostgreSQL';

  return (
    <>
      <mesh
        ref={meshRef}
        position={pos}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhysicalMaterial
          color={isHighlighted ? color : '#222222'}
          emissive={isHighlighted ? color : '#111111'}
          emissiveIntensity={hovered ? 2.5 : isHighlighted ? 1.2 : 0.15}
          roughness={0.15}
          metalness={0.8}
          clearcoat={1.0}
          transmission={isHighlighted ? 0.2 : 0.0}
          thickness={0.5}
        />
        
        {/* Node label styled as a holographic glass HUD tag */}
        <Html distanceFactor={5.5} center>
          <div 
            className={`select-none font-mono text-[9px] font-bold px-2 py-1 rounded border shadow-2xl backdrop-blur-md whitespace-nowrap pointer-events-none transition-all duration-300 transform origin-center uppercase tracking-widest ${
              isHighlighted
                ? isPurpleAccent
                  ? 'border-purple-500/40 bg-purple-950/20 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.25)] scale-110'
                  : 'border-orange-500/40 bg-orange-950/20 text-orange-300 shadow-[0_0_12px_rgba(249,115,22,0.25)] scale-110'
                : 'border-white/5 bg-[#0A0A0A]/80 text-neutral-500 scale-90 opacity-60'
            }`}
          >
            <span className="opacity-50 mr-1.5">{isHighlighted ? '●' : '○'}</span>
            {name}
          </div>
        </Html>
      </mesh>

      <OrbitingElectrons center={pos} color={color} isHighlighted={isHighlighted} />
    </>
  );
}

// Data packets traveling along connection lines
interface PacketProps {
  start: [number, number, number];
  end: [number, number, number];
  color: string;
  speed: number;
  offset: number;
  isActive: boolean;
}

function DataPacket({ start, end, color, speed, offset, isActive }: PacketProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const elapsed = state.clock.getElapsedTime();
      const progress = ((elapsed * speed + offset) % 1.0);
      
      meshRef.current.position.x = THREE.MathUtils.lerp(start[0], end[0], progress);
      meshRef.current.position.y = THREE.MathUtils.lerp(start[1], end[1], progress);
      meshRef.current.position.z = THREE.MathUtils.lerp(start[2], end[2], progress);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.025, 8, 8]} />
      <meshBasicMaterial color={isActive ? color : '#333333'} transparent opacity={isActive ? 0.8 : 0.1} />
    </mesh>
  );
}

// Glowing lines connecting the nodes
function ConnectingLines({ activeCategory }: { activeCategory: string }) {
  const lineRef = useRef<THREE.LineSegments>(null);

  // Compute geometry vertices matching connections
  const [vertices, indices] = useMemo(() => {
    const verts: number[] = [];
    const inds: number[] = [];

    // Flatten positions
    NODES.forEach((node) => {
      verts.push(...node.pos);
    });

    CONNECTIONS.forEach(([start, end]) => {
      inds.push(start, end);
    });

    return [new Float32Array(verts), new Uint16Array(inds)];
  }, []);

  return (
    <>
      <lineSegments ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[vertices, 3]}
          />
          <bufferAttribute
            attach="index"
            args={[indices, 1]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#8B5CF6"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>

      {/* Render active data packets on pipelines */}
      {CONNECTIONS.map(([startIdx, endIdx], idx) => {
        const startNode = NODES[startIdx];
        const endNode = NODES[endIdx];
        
        // Active if both nodes belong to the active category
        const startActive = CATEGORY_MAP[activeCategory]?.includes(startNode.name) ?? false;
        const endActive = CATEGORY_MAP[activeCategory]?.includes(endNode.name) ?? false;
        const isActive = startActive || endActive;

        const packetColor = startNode.color;

        return (
          <group key={idx}>
            <DataPacket 
              start={startNode.pos} 
              end={endNode.pos} 
              color={packetColor} 
              speed={0.4} 
              offset={0.0} 
              isActive={isActive} 
            />
            <DataPacket 
              start={startNode.pos} 
              end={endNode.pos} 
              color={packetColor} 
              speed={0.4} 
              offset={0.5} 
              isActive={isActive} 
            />
          </group>
        );
      })}
    </>
  );
}

function NetworkGroup({ activeCategory }: { activeCategory: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Continuous slow rotation of the whole network
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.06;
      
      // Floating motion of the entire cluster
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.08;

      // Camera tilt based on pointer coordinates
      state.camera.position.x = THREE.MathUtils.lerp(
        state.camera.position.x,
        state.pointer.x * 1.5,
        0.05
      );
      state.camera.position.y = THREE.MathUtils.lerp(
        state.camera.position.y,
        state.pointer.y * 1.5 + 0.1,
        0.05
      );
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef}>
      <ConnectingLines activeCategory={activeCategory} />
      {NODES.map((node, i) => (
        <SkillNode key={i} {...node} activeCategory={activeCategory} />
      ))}
    </group>
  );
}

export default function SkillsScene3D({ activeCategory = 'Frontend' }: { activeCategory?: string }) {
  return (
    <div className="w-full h-full min-h-[350px] relative select-none">
      <Canvas camera={{ position: [0, 0, 4.0], fov: 48 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#FB923C" />
        <pointLight position={[-5, -5, -5]} intensity={1.2} color="#A855F7" />
        <directionalLight position={[0, 5, 0]} intensity={0.4} />
        
        <NetworkGroup activeCategory={activeCategory} />
      </Canvas>
    </div>
  );
}
