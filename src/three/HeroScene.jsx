import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

/* ── Pointer tracker ── */
function usePointer() {
  const ptr = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      ptr.current.x = (x / window.innerWidth  - 0.5) * 2;
      ptr.current.y = -(y / window.innerHeight - 0.5) * 2;
    };
    const onGyro = (e) => {
      ptr.current.x = (e.gamma || 0) / 30;
      ptr.current.y = (e.beta  || 0) / 60;
    };
    window.addEventListener("mousemove",        onMove, { passive: true });
    window.addEventListener("touchmove",        onMove, { passive: true });
    window.addEventListener("deviceorientation",onGyro, { passive: true });
    return () => {
      window.removeEventListener("mousemove",        onMove);
      window.removeEventListener("touchmove",        onMove);
      window.removeEventListener("deviceorientation",onGyro);
    };
  }, []);
  return ptr;
}

/* ── Orbiting particle ring ── */
function ParticleRing({ count = 180, radius = 2.2 }) {
  const mesh = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const spread = (Math.random() - 0.5) * 0.25;
      arr[i * 3]     = Math.cos(angle) * (radius + spread);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      arr[i * 3 + 2] = Math.sin(angle) * (radius + spread);
    }
    return arr;
  }, [count, radius]);

  useFrame((_, delta) => {
    if (mesh.current) mesh.current.rotation.y += delta * 0.12;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#a0c4ff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

/* ── Floating wire sphere ── */
function WireSphere({ pointer }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.current.y * 0.4, delta * 2);
    mesh.current.rotation.y += delta * 0.15;
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, mesh.current.rotation.y + pointer.current.x * 0.01, delta * 2);
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1.55, 32, 32]} />
      <meshBasicMaterial color="#1a2a4a" wireframe transparent opacity={0.25} />
    </mesh>
  );
}

/* ── Core distorted sphere ── */
function CoreSphere({ pointer }) {
  const mesh = useRef();
  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x = THREE.MathUtils.lerp(mesh.current.rotation.x, pointer.current.y * 0.35, delta * 2.5);
    mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, pointer.current.x * 0.35 + mesh.current.rotation.y, delta * 2.5);
    mesh.current.rotation.y += delta * 0.08;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.5}>
      <Sphere ref={mesh} args={[1.2, 128, 128]}>
        <MeshDistortMaterial
          color="#0f172a"
          distort={0.35}
          speed={1.8}
          roughness={0.1}
          metalness={0.9}
          envMapIntensity={1}
        >
          <color attach="color" args={["#0f172a"]} />
        </MeshDistortMaterial>
      </Sphere>
    </Float>
  );
}

/* ── Glow halo ── */
function GlowHalo() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.material.opacity = 0.06 + Math.sin(clock.elapsedTime * 0.8) * 0.03;
    }
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[2.0, 32, 32]} />
      <meshBasicMaterial color="#3b82f6" transparent opacity={0.07} side={THREE.BackSide} />
    </mesh>
  );
}

/* ── Scene ── */
function Scene({ pointer }) {
  return (
    <>
      <Stars radius={80} depth={60} count={3000} factor={3} fade speed={0.4} />
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 4, 4]}  intensity={12} color="#60a5fa" />
      <pointLight position={[-4, -2, -4]} intensity={6}  color="#818cf8" />
      <pointLight position={[0, 6, 0]}  intensity={8}  color="#e0f2fe" />
      <GlowHalo />
      <WireSphere pointer={pointer} />
      <CoreSphere pointer={pointer} />
      <ParticleRing />
    </>
  );
}

/* ── Export ── */
export default function HeroScene() {
  const pointer = usePointer();
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      style={{ width: "100%", height: "100%" }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene pointer={pointer} />
    </Canvas>
  );
}
