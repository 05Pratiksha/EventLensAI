"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, useTexture } from "@react-three/drei";
import * as THREE from "three";

// Mouse interactive wrapper to achieve parallax
function CameraRig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// Background stars/particles
function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 300;

  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return arr;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.03;
      ref.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#8b5cf6"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

// 3D Photo Card
function PhotoCard({ url, position, rotationSpeed }: { url: string; position: [number, number, number]; rotationSpeed: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const texture = useTexture(url);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed * 0.2;
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.8 + position[0]) * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[1.2, 1.6]} />
      {texture ? (
        <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.8} />
      ) : (
        <meshBasicMaterial color="#3b82f6" side={THREE.DoubleSide} transparent opacity={0.5} wireframe />
      )}
    </mesh>
  );
}

// Glowing Scan Ring
function ScanRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      // Pulsate size slightly
      const scale = 1.8 + Math.sin(state.clock.getElapsedTime() * 3) * 0.05;
      ringRef.current.scale.set(scale, scale, 1);
      // Spin slowly
      ringRef.current.rotation.z += 0.01;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <ringGeometry args={[1.1, 1.2, 64]} />
      <meshBasicMaterial color="#a78bfa" side={THREE.DoubleSide} transparent opacity={0.9} />
    </mesh>
  );
}

// Selfie matching animation sequence
function MatchingSelfie() {
  const selfieRef = useRef<THREE.Mesh>(null);
  const [phase, setPhase] = useState("entering"); // entering -> scanning -> matched -> loop
  
  const selfieTexture = useTexture("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400");
  const matchedTexture = useTexture("https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400");

  useFrame((state) => {
    if (!selfieRef.current) return;

    const time = state.clock.getElapsedTime();
    const cycle = time % 8; // 8-second total animation loop

    if (cycle < 3) {
      // Phase 1: Moving towards center (0s to 3s)
      setPhase("entering");
      const progress = cycle / 3;
      selfieRef.current.position.z = THREE.MathUtils.lerp(-4, 0, progress);
      selfieRef.current.position.x = THREE.MathUtils.lerp(-2, 0, progress);
      selfieRef.current.scale.setScalar(THREE.MathUtils.lerp(0.4, 0.8, progress));
      selfieRef.current.rotation.y = THREE.MathUtils.lerp(0.5, 0, progress);
      if (selfieRef.current.material) {
        (selfieRef.current.material as THREE.MeshBasicMaterial).opacity = 0.9;
      }
    } else if (cycle >= 3 && cycle < 5.5) {
      // Phase 2: Scanning under ring (3s to 5.5s)
      setPhase("scanning");
      selfieRef.current.position.z = 0;
      selfieRef.current.position.x = 0;
      selfieRef.current.scale.setScalar(0.8 + Math.sin(time * 10) * 0.02);
      selfieRef.current.rotation.y = 0;
      if (selfieRef.current.material) {
        (selfieRef.current.material as THREE.MeshBasicMaterial).opacity = 0.9 + Math.sin(time * 10) * 0.1;
      }
    } else {
      // Phase 3: Matched & Fly out (5.5s to 8s)
      setPhase("matched");
      const progress = (cycle - 5.5) / 2.5;
      selfieRef.current.position.z = THREE.MathUtils.lerp(0, 4, progress);
      selfieRef.current.position.x = THREE.MathUtils.lerp(0, 2, progress);
      selfieRef.current.scale.setScalar(THREE.MathUtils.lerp(0.8, 0.2, progress));
      if (selfieRef.current.material) {
        (selfieRef.current.material as THREE.MeshBasicMaterial).opacity = 0.9;
      }
    }
  });

  return (
    <mesh ref={selfieRef}>
      <planeGeometry args={[1, 1.3]} />
      <meshBasicMaterial 
        map={phase === "matched" ? matchedTexture : selfieTexture} 
        transparent 
        opacity={0.9} 
      />
    </mesh>
  );
}

export default function HeroScene() {
  const images = [
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=400",
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=400",
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=400",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400",
  ];

  return (
    <div className="w-full h-full min-h-[450px] lg:min-h-[550px] relative">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} dpr={[1, 2]}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        
        {/* Background drifting stars */}
        <Particles />
        
        {/* Active Scanning ring simulation */}
        <ScanRing />
        <MatchingSelfie />

        {/* Floating environmental photo cards */}
        <PhotoCard url={images[0]} position={[-2.8, 1.5, -2]} rotationSpeed={0.3} />
        <PhotoCard url={images[1]} position={[2.8, 1.2, -1.8]} rotationSpeed={-0.4} />
        <PhotoCard url={images[2]} position={[-2.6, -1.5, -1.5]} rotationSpeed={-0.2} />
        <PhotoCard url={images[3]} position={[2.6, -1.6, -1.2]} rotationSpeed={0.5} />

        <CameraRig />
      </Canvas>

      {/* Decorative overlay glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(10,10,11,0.9)_100%)] pointer-events-none" />
    </div>
  );
}
