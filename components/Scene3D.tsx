'use client';

import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, PerspectiveCamera } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';

function AnimatedSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#0066ff"
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
    </Float>
  );
}

function AnimatedTorus() {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.3}>
      <mesh position={[3, 1, -2]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusGeometry args={[1, 0.3, 16, 100]} />
        <meshStandardMaterial
          color="#00a8ff"
          emissive="#00f0ff"
          emissiveIntensity={0.3}
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

function AnimatedIcosahedron() {
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh position={[-3, -1, -1]} rotation={[0, Math.PI / 6, 0]}>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#00a8ff"
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesCount = 1000;
  const positions = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function SceneContent() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 10]} />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        rotateSpeed={0.5}
      />

      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />

      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

      <ParticleField />
      <AnimatedSphere />
      <AnimatedTorus />
      <AnimatedIcosahedron />
    </>
  );
}

export default function Scene3D() {
  // Prevent hydration mismatch
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="fixed inset-0 -z-10 bg-darker">
        <div className="absolute inset-0 bg-gradient-to-br from-darker via-dark to-darker animate-pulse" />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
