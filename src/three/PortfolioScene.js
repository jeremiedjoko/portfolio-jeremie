import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

/* ─────────────────────────────────────────
   HOOK: IntersectionObserver par section
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
  return section;
}

/* ─────────────────────────────────────────
   HOOK: gyroscope / touch sur mobile
───────────────────────────────────────── */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.current.x = (x / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(y / window.innerHeight - 0.5) * 2;
    };
    const onGyro = (e) => {
      pointer.current.x = (e.gamma || 0) / 30;
      pointer.current.y = (e.beta  || 0) / 30 - 1;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("deviceorientation", onGyro, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("deviceorientation", onGyro);
    };
  }, []);
  return pointer;
}

/* ─────────────────────────────────────────
   TRANSITION MANAGER
───────────────────────────────────────── */
function useObjectState(index, currentSection) {
  const opacity = useRef(index === 0 ? 1 : 0);
  const scale   = useRef(index === 0 ? 1 : 0.3);
  const posY    = useRef(index === 0 ? 0 : -2);

  useFrame((_, delta) => {
    const visible = currentSection === index;
    opacity.current = THREE.MathUtils.lerp(opacity.current, visible ? 1 : 0, delta * 3);
    scale.current   = THREE.MathUtils.lerp(scale.current,   visible ? 1 : 0.3, delta * 3);
    posY.current    = THREE.MathUtils.lerp(posY.current,    visible ? 0 : (currentSection > index ? 2 : -2), delta * 3);
  });

  return { opacity, scale, posY };
}

/* ─────────────────────────────────────────
   OBJET 1 — HERO: Globe réseau animé
───────────────────────────────────────── */
function GlobeNetwork({ section, pointer }) {
  const groupRef = useRef();
  const { opacity, scale, posY } = useObjectState(0, section);

  const { points, lineGeoms } = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 80; i++) {
      const phi   = Math.acos(-1 + (2 * i) / 80);
      const theta = Math.sqrt(80 * Math.PI) * phi;
      pts.push(new THREE.Vector3(
        2 * Math.sin(phi) * Math.cos(theta),
        2 * Math.sin(phi) * Math.sin(theta),
        2 * Math.cos(phi)
      ));
    }
    const geoms = [];
    for (let i = 0; i < pts.length; i++)
      for (let j = i + 1; j < pts.length; j++)
        if (pts[i].distanceTo(pts[j]) < 1.1)
          geoms.push(new THREE.BufferGeometry().setFromPoints([pts[i], pts[j]]));
    return { points: pts, lineGeoms: geoms };
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.25;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, pointer.current.y * 0.3, delta * 2
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z, pointer.current.x * 0.15, delta * 2
    );
    groupRef.current.position.y = posY.current;
    groupRef.current.scale.setScalar(scale.current);
    groupRef.current.traverse(c => {
      if (c.material) {
        c.material.transparent = true;
        c.material.opacity = opacity.current;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[2, 48, 48]} />
        <meshStandardMaterial color="#6EE7F7" wireframe transparent opacity={0.05} />
      </mesh>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.04, 8, 8]} />
          <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={2} transparent />
        </mesh>
      ))}
      {lineGeoms.map((g, i) => (
        <line key={i} geometry={g}>
          <lineBasicMaterial color="#6EE7F7" transparent opacity={0.25} />
        </line>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 2 — À PROPOS: Shield néon pulsant
───────────────────────────────────────── */
function NeonShield({ section, pointer }) {
  const groupRef = useRef();
  const { opacity, scale, posY } = useObjectState(1, section);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 2.2); s.lineTo(1.7, 1.2); s.lineTo(1.7, -0.3);
    s.lineTo(0, -2.2); s.lineTo(-1.7, -0.3); s.lineTo(-1.7, 1.2);
    s.closePath();
    return s;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.current.x * 0.5, delta * 2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.current.y * 0.3, delta * 2);
    groupRef.current.position.y = posY.current;
    groupRef.current.scale.setScalar(scale.current);
    const pulse = 0.4 + Math.sin(state.clock.elapsedTime * 2.5) * 0.3;
    groupRef.current.traverse(c => {
      if (c.material) {
        c.material.opacity = opacity.current;
        if (c.material.emissive) c.material.emissiveIntensity = pulse;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <extrudeGeometry args={[shape, { depth: 0.4, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08 }]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.6}
          metalness={0.95} roughness={0.05} transparent opacity={0.5} />
      </mesh>
      {/* Contour néon */}
      <mesh scale={[1.04, 1.04, 1.04]}>
        <extrudeGeometry args={[shape, { depth: 0.42, bevelEnabled: true, bevelSize: 0.08, bevelThickness: 0.08 }]} />
        <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={1}
          wireframe transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 3 — PROJETS: Circuit avec flux
───────────────────────────────────────── */
function CircuitBoard({ section, pointer }) {
  const groupRef = useRef();
  const fluxRef  = useRef([]);
  const { opacity, scale, posY } = useObjectState(2, section);
  const time = useRef(0);

  const { gridLines, nodes } = useMemo(() => {
    const lines = [];
    for (let i = -4; i <= 4; i++) {
      lines.push([new THREE.Vector3(-4 * 0.45, i * 0.45, 0), new THREE.Vector3(4 * 0.45, i * 0.45, 0)]);
      lines.push([new THREE.Vector3(i * 0.45, -4 * 0.45, 0), new THREE.Vector3(i * 0.45, 4 * 0.45, 0)]);
    }
    const nds = Array.from({ length: 18 }, () => ({
      x: (Math.random() - 0.5) * 3.2,
      y: (Math.random() - 0.5) * 3.2,
    }));
    return { gridLines: lines, nodes: nds };
  }, []);

  useFrame((state, delta) => {
    time.current += delta;
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.current.x * 0.4, delta * 2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.current.y * 0.25 - 0.3, delta * 2);
    groupRef.current.position.y = posY.current;
    groupRef.current.scale.setScalar(scale.current);
    groupRef.current.traverse(c => {
      if (c.material) c.material.opacity = opacity.current * (c.isMesh ? 0.9 : 0.35);
    });
    // Flux animés
    fluxRef.current.forEach((f, i) => {
      if (!f) return;
      const t = ((time.current * 0.8 + i * 0.3) % 1);
      f.position.x = -1.8 + t * 3.6;
      f.position.y = (i % 9 - 4) * 0.45;
      f.material.opacity = opacity.current * Math.sin(t * Math.PI);
    });
  });

  return (
    <group ref={groupRef}>
      {gridLines.map((pts, i) => {
        const g = new THREE.BufferGeometry().setFromPoints(pts);
        return <line key={i} geometry={g}><lineBasicMaterial color="#6EE7F7" transparent opacity={0.2} /></line>;
      })}
      {nodes.map((n, i) => (
        <mesh key={i} position={[n.x, n.y, 0.06]}>
          <boxGeometry args={[0.12, 0.12, 0.12]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={1.5} transparent />
        </mesh>
      ))}
      {/* Flux de données */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={`flux-${i}`} ref={el => fluxRef.current[i] = el}
          position={[-1.8, (i - 4) * 0.45, 0.08]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={3} transparent />
        </mesh>
      ))}
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 4 — COMPÉTENCES: Sphère particules
───────────────────────────────────────── */
function ParticleSphere({ section, pointer }) {
  const pointsRef = useRef();
  const { opacity, scale, posY } = useObjectState(3, section);

  const positions = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const phi   = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r     = 2 + (Math.random() - 0.5) * 0.5;
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += delta * 0.4;
    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x, pointer.current.y * 0.4, delta * 2
    );
    pointsRef.current.position.y = posY.current;
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.06;
    pointsRef.current.scale.setScalar(scale.current * pulse);
    pointsRef.current.material.opacity = opacity.current;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#7C3AED" size={0.05} transparent sizeAttenuation />
    </points>
  );
}

/* ─────────────────────────────────────────
   OBJET 5 — EXPÉRIENCES: Cadenas dramatique
───────────────────────────────────────── */
function Padlock({ section, pointer }) {
  const groupRef = useRef();
  const ansaRef  = useRef();
  const { opacity, scale, posY } = useObjectState(4, section);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.current.x * 0.6, delta * 2);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.current.y * 0.3, delta * 2);
    groupRef.current.position.y = posY.current;
    groupRef.current.scale.setScalar(scale.current);
    groupRef.current.traverse(c => {
      if (c.material) { c.material.transparent = true; c.material.opacity = opacity.current; }
    });
    // Anse qui oscille
    if (ansaRef.current) {
      ansaRef.current.position.y = 0.8 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Corps */}
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[1.8, 1.5, 0.8]} />
        <meshStandardMaterial color="#7C3AED" emissive="#5B21B6" emissiveIntensity={0.5}
          metalness={0.95} roughness={0.05} transparent />
      </mesh>
      {/* Trou de serrure */}
      <mesh position={[0, -0.45, 0.41]}>
        <cylinderGeometry args={[0.18, 0.18, 0.1, 16]} />
        <meshStandardMaterial color="#030712" transparent />
      </mesh>
      {/* Anse */}
      <group ref={ansaRef} position={[0, 0.8, 0]}>
        <mesh>
          <torusGeometry args={[0.62, 0.14, 20, 40, Math.PI]} />
          <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={1}
            metalness={0.9} roughness={0.1} transparent />
        </mesh>
      </group>
      {/* Reflet néon */}
      <mesh position={[0, -0.5, 0]} scale={[1.02, 1.02, 1.02]}>
        <boxGeometry args={[1.8, 1.5, 0.8]} />
        <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={0.5}
          wireframe transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   OBJET 6 — CONTACT: Cristal multi-facettes
───────────────────────────────────────── */
function Crystal({ section, pointer }) {
  const groupRef = useRef();
  const innerRef = useRef();
  const { opacity, scale, posY } = useObjectState(5, section);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.5;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, pointer.current.y * 0.3, delta * 2
    );
    groupRef.current.position.y = posY.current;
    groupRef.current.scale.setScalar(scale.current);
    groupRef.current.traverse(c => {
      if (c.material) { c.material.transparent = true; c.material.opacity = opacity.current * 0.9; }
    });
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 1.2;
      innerRef.current.rotation.x += delta * 0.7;
      const pulse = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      innerRef.current.material.emissiveIntensity = pulse;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cristal extérieur */}
      <mesh>
        <octahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={0.2}
          metalness={0.8} roughness={0.1} transparent opacity={0.3} />
      </mesh>
      {/* Wireframe extérieur */}
      <mesh>
        <octahedronGeometry args={[2.02, 0]} />
        <meshStandardMaterial color="#6EE7F7" emissive="#6EE7F7" emissiveIntensity={0.8}
          wireframe transparent opacity={0.6} />
      </mesh>
      {/* Cristal intérieur rotatif */}
      <mesh ref={innerRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.5}
          metalness={0.9} roughness={0.05} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/* ─────────────────────────────────────────
   LUMIÈRES DYNAMIQUES
───────────────────────────────────────── */
function DynamicLights({ section }) {
  const light1 = useRef();
  const light2 = useRef();

  const colors = [
    ["#6EE7F7", "#7C3AED"],
    ["#7C3AED", "#6EE7F7"],
    ["#6EE7F7", "#00ff88"],
    ["#7C3AED", "#ff6b6b"],
    ["#6EE7F7", "#7C3AED"],
    ["#00ffcc", "#7C3AED"],
  ];

  useFrame((state, delta) => {
    if (!light1.current || !light2.current) return;
    const t = state.clock.elapsedTime;
    light1.current.position.x = Math.sin(t * 0.5) * 5;
    light1.current.position.z = Math.cos(t * 0.5) * 5;
    light2.current.position.x = Math.cos(t * 0.4) * 5;
    light2.current.position.z = Math.sin(t * 0.4) * 5;
    light1.current.color.set(colors[section][0]);
    light2.current.color.set(colors[section][1]);
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight ref={light1} position={[5, 5, 5]} intensity={3} distance={15} />
      <pointLight ref={light2} position={[-5, -3, -5]} intensity={2} distance={15} />
      <pointLight position={[0, 0, 6]} intensity={1} color="#ffffff" distance={10} />
    </>
  );
}

/* ─────────────────────────────────────────
   SCÈNE PRINCIPALE
───────────────────────────────────────── */
function Scene() {
  const section = useScrollSection();
  const pointer = usePointer();

  return (
    <>
      <DynamicLights section={section} />
      <Stars radius={150} depth={80} count={3000} factor={5} saturation={0} fade speed={0.6} />
      <GlobeNetwork  section={section} pointer={pointer} />
      <NeonShield    section={section} pointer={pointer} />
      <CircuitBoard  section={section} pointer={pointer} />
      <ParticleSphere section={section} pointer={pointer} />
      <Padlock       section={section} pointer={pointer} />
      <Crystal       section={section} pointer={pointer} />
    </>
  );
}

/* ─────────────────────────────────────────
   EXPORT
───────────────────────────────────────── */
export default function PortfolioScene() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
