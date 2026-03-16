"use client";

import { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

function FloatingGeometry() {
  const meshRef = useRef();
  const torusRef = useRef();
  const wireRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.3;
      meshRef.current.rotation.y += 0.003;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x = Math.cos(t * 0.2) * 0.4;
      torusRef.current.rotation.z += 0.004;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y += 0.002;
      wireRef.current.rotation.z = Math.sin(t * 0.1) * 0.2;
    }
  });

  const accentColor = useMemo(() => new THREE.Color('#FF6B2C'), []);
  const dimColor = useMemo(() => new THREE.Color('#333333'), []);

  return (
    <group position={[2, 0, 0]}>
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <Sphere ref={meshRef} args={[1.2, 64, 64]}>
          <MeshDistortMaterial
            color={accentColor}
            roughness={0.3}
            metalness={0.7}
            distort={0.2}
            speed={1.5}
            transparent
            opacity={0.08}
          />
        </Sphere>
      </Float>

      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.3}>
        <Torus ref={torusRef} args={[1.8, 0.015, 16, 100]}>
          <meshBasicMaterial color={accentColor} transparent opacity={0.1} />
        </Torus>
      </Float>

      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.5}>
        <Torus args={[2.2, 0.01, 16, 100]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
          <meshBasicMaterial color={dimColor} transparent opacity={0.06} />
        </Torus>
      </Float>

      <Float speed={0.6} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={wireRef}>
          <icosahedronGeometry args={[1.6, 1]} />
          <meshBasicMaterial color={dimColor} wireframe transparent opacity={0.03} />
        </mesh>
      </Float>

      {Array.from({ length: 15 }).map((_, i) => {
        const angle = (i / 15) * Math.PI * 2;
        const radius = 2 + Math.sin(i * 1.5) * 0.5;
        const yOff = Math.cos(i * 2.3) * 1.2;
        return (
          <Float key={i} speed={0.5 + (i % 4) * 0.2} floatIntensity={0.2}>
            <mesh position={[Math.cos(angle) * radius, yOff, Math.sin(angle) * radius]}>
              <sphereGeometry args={[0.015 + (i % 3) * 0.008, 8, 8]} />
              <meshBasicMaterial
                color={i % 3 === 0 ? accentColor : dimColor}
                transparent
                opacity={0.25}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 opacity-60">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ pointerEvents: 'none' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[10, 10, 10]} intensity={0.2} color="#FF6B2C" />
          <pointLight position={[-10, -5, 5]} intensity={0.08} color="#FF8C42" />
          <FloatingGeometry />
        </Suspense>
      </Canvas>
    </div>
  );
}
