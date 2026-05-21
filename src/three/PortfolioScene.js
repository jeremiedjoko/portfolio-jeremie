import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────
   HOOK: scroll progress par section
───────────────────────────────────────── */
function useScrollSection() {
  const [section, setSection] = useState(0);

  useEffect(() => {
    const ids = ["hero", "about", "projects", "skills", "experience", "contact"];
    const observers = [];

    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setSection(i); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  return { section };
}

/* ─────────────────────────────────────────
   OBJET 1 — HERO: Globe réseau
───────────────────────────────────────── */
function GlobeNetwork({ visible }) {
  const groupRef = useRef();
  const opacity = useRef(0);

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 60; i++) {
      const phi = Math.acos(-1 + (2 * i) / 60);
      const theta = Math.sqrt(60 * Math.PI) * phi;
      pts.push(new THREE.Vector3(
        1.4 * Math.sin(phi) * Math.cos(theta),
        1.4 * Math.sin(phi) * Math.sin(theta),
        1.4 * Math.cos(phi)
      ));
    }
    return pts;
  }, []);

  const lineGeoms = useMemo(() => {
    const geoms = [];
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (points[i].distanceTo(points[j]) < 0.8) {
          const g = new THREE.BufferGeometry().setFromPoints([points[i], points[j]]);
          geoms.push(g);
        }
      }
    }
    return geoms;
  }, [points]);

  useFrame((state, delta) => {
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 2);
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.children.forEach(c => {
        if (c.material) c.material.opacity = opacity.current;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Sphère wireframe */}
      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshStandardMaterial color="#6EE7F7" wireframe transparent opacity={0.08} />
      </mesh>
      {/* Points */}
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={1}
            transparent opacity={0.9} />
        </mesh>
      ))}
      {/* Connexions */}
      {lineGeoms.map((g, i) => (
        <line key={i} geometry={g}>
          <lineBasicMaterial color="#6EE7F7" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 2 — À PROPOS: Shield néon
───────────────────────────────────────── */
function NeonShield({ visible }) {
  const meshRef = useRef();
  const opacity = useRef(0);

  useFrame((state, delta) => {
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 2);
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.material.opacity = opacity.current;
      meshRef.current.material.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 1.5);
    s.lineTo(1.2, 0.8);
    s.lineTo(1.2, -0.2);
    s.lineTo(0, -1.5);
    s.lineTo(-1.2, -0.2);
    s.lineTo(-1.2, 0.8);
    s.closePath();
    return s;
  }, []);

  return (
    <mesh ref={meshRef} rotation={[0, 0, 0]}>
      <extrudeGeometry args={[shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 }]} />
      <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.5}
        metalness={0.9} roughness={0.1} transparent opacity={0.9} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   OBJET 3 — PROJETS: Circuit board
───────────────────────────────────────── */
function CircuitBoard({ visible }) {
  const groupRef = useRef();
  const opacity = useRef(0);

  const lines = useMemo(() => {
    const result = [];
    const grid = 5;
    for (let i = -grid; i <= grid; i += 1) {
      result.push([new THREE.Vector3(-grid * 0.3, i * 0.3, 0), new THREE.Vector3(grid * 0.3, i * 0.3, 0)]);
      result.push([new THREE.Vector3(i * 0.3, -grid * 0.3, 0), new THREE.Vector3(i * 0.3, grid * 0.3, 0)]);
    }
    return result;
  }, []);

  useFrame((state, delta) => {
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 2);
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.4;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      groupRef.current.children.forEach(c => {
        if (c.material) c.material.opacity = opacity.current * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((pts, i) => {
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <line key={i} geometry={g}>
            <lineBasicMaterial color="#6EE7F7" transparent opacity={0.3} />
          </line>
        );
      })}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
          0.05
        ]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={1} transparent />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 4 — COMPÉTENCES: Sphère particules
───────────────────────────────────────── */
function ParticleSphere({ visible }) {
  const pointsRef = useRef();
  const opacity = useRef(0);

  const { positions } = useMemo(() => {
    const count = 800;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 1.5 + (Math.random() - 0.5) * 0.4;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return { positions: pos };
  }, []);

  useFrame((state, delta) => {
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 2);
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.5;
      pointsRef.current.rotation.x += delta * 0.2;
      pointsRef.current.material.opacity = opacity.current;
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05;
      pointsRef.current.scale.setScalar(scale);
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7C3AED" size={0.03} transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

/* ─────────────────────────────────────────
   OBJET 5 — EXPÉRIENCES: Cadenas
───────────────────────────────────────── */
function Padlock({ visible }) {
  const groupRef = useRef();
  const opacity = useRef(0);

  useFrame((state, delta) => {
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 2);
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.children.forEach(c => {
        if (c.material) c.material.opacity = opacity.current;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Corps */}
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[1.2, 1, 0.5]} />
        <meshStandardMaterial color="#7C3AED" emissive="#5B21B6" emissiveIntensity={0.4}
          metalness={0.9} roughness={0.1} transparent />
      </mesh>
      {/* Anse */}
      <mesh position={[0, 0.55, 0]}>
        <torusGeometry args={[0.42, 0.1, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={0.6}
          metalness={0.9} roughness={0.1} transparent />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 6 — CONTACT: Cristal géométrique
───────────────────────────────────────── */
function Crystal({ visible }) {
  const meshRef = useRef();
  const opacity = useRef(0);

  useFrame((state, delta) => {
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 2);
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.6;
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.material.opacity = opacity.current * 0.85;
      meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <octahedronGeometry args={[1.3, 0]} />
      <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={0.3}
        metalness={0.8} roughness={0.1} wireframe={false} transparent opacity={0.85} />
    </mesh>
  );
}

/* ─────────────────────────────────────────
   SCÈNE PRINCIPALE
───────────────────────────────────────── */
function Scene() {
  const { section } = useScrollSection();

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#6EE7F7" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#7C3AED" />
      <Stars radius={120} depth={60} count={2000} factor={4} saturation={0} fade speed={0.8} />

      <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0}>
        <GlobeNetwork visible={section === 0} />
        <NeonShield visible={section === 1} />
        <CircuitBoard visible={section === 2} />
        <ParticleSphere visible={section === 3} />
        <Padlock visible={section === 4} />
        <Crystal visible={section === 5} />
      </Float>
    </>
  );
}

/* ─────────────────────────────────────────
   EXPORT
───────────────────────────────────────── */
export default function PortfolioScene() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 4], fov: 55 }}>
        <Scene />
      </Canvas>
    </div>
  );
         }
