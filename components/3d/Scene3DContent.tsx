'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import { BufferGeometry, BufferAttribute, Mesh } from 'three';

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={2}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#00f0ff"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
          emissive="#0066ff"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

function TorusKnot() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={[3, -1, -2]} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
        <torusKnotGeometry args={[0.6, 0.2, 128, 16]} />
        <meshStandardMaterial
          color="#00a8ff"
          roughness={0.3}
          metalness={0.7}
          emissive="#00f0ff"
          emissiveIntensity={0.1}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Icosahedron() {
  return (
    <Float speed={1.8} rotationIntensity={0.8} floatIntensity={1.5}>
      <mesh position={[-3, 1, -1]} rotation={[Math.PI / 6, 0, Math.PI / 6]}>
        <icosahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#0066ff"
          roughness={0.4}
          metalness={0.6}
          emissive="#00a8ff"
          emissiveIntensity={0.15}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particlesCount = 500;
  const geometryRef = useRef<BufferGeometry>(null);

  useMemo(() => {
    if (geometryRef.current) {
      const positions = new Float32Array(particlesCount * 3);
      for (let i = 0; i < particlesCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      }
      geometryRef.current.setAttribute('position', new BufferAttribute(positions, 3));
    }
  }, []);

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <pointsMaterial
        size={0.02}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function Ring() {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -3]}>
      <ringGeometry args={[2.5, 2.6, 64]} />
      <meshBasicMaterial
        color="#00f0ff"
        transparent
        opacity={0.3}
        side={2}
      />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0066ff" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        color="#00a8ff"
      />
      
      <AnimatedSphere />
      <TorusKnot />
      <Icosahedron />
      <Particles />
      <Ring />
      
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <Environment preset="night" />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function Scene3DContent() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
