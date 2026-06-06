import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Particle field ── */
function Particles({ count = 300 }) {
  const mesh = useRef();
  const positions = React.useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += 0.004;
      if (pos[i * 3 + 1] > 5) pos[i * 3 + 1] = -5;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#ffffff" transparent opacity={0.3} />
    </points>
  );
}

/* ── Robot body ── */
function Robot({ pointer }) {
  const group = useRef();
  const head  = useRef();
  const eyeL  = useRef();
  const eyeR  = useRef();
  const leftArm  = useRef();
  const rightArm = useRef();

  const darkMat = new THREE.MeshStandardMaterial({ color: "#111118", metalness: 0.95, roughness: 0.08 });
  const midMat  = new THREE.MeshStandardMaterial({ color: "#1c1c2a", metalness: 0.9,  roughness: 0.15 });
  const glowMat = new THREE.MeshStandardMaterial({ color: "#00d4ff", emissive: "#00d4ff", emissiveIntensity: 0.8, metalness: 0.4, roughness: 0.3 });
  const eyeMat  = new THREE.MeshStandardMaterial({ color: "#ffffff", emissive: "#ffffff", emissiveIntensity: 2.0 });
  const accentMat = new THREE.MeshStandardMaterial({ color: "#a78bfa", emissive: "#a78bfa", emissiveIntensity: 0.5 });

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();

    // Smooth follow pointer
    group.current.rotation.y += (pointer.current.x * 0.6 - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (-pointer.current.y * 0.15 - group.current.rotation.x) * 0.05;

    // Idle float
    group.current.position.y = Math.sin(t * 0.6) * 0.07;

    // Head look
    if (head.current) {
      head.current.rotation.y = Math.sin(t * 0.4) * 0.15 + pointer.current.x * 0.2;
      head.current.rotation.x = Math.sin(t * 0.3) * 0.06;
    }

    // Eye glow pulse
    if (eyeL.current && eyeR.current) {
      const intensity = 1.8 + Math.sin(t * 2.5) * 0.5;
      eyeL.current.material.emissiveIntensity = intensity;
      eyeR.current.material.emissiveIntensity = intensity;
    }

    // Arm idle swing
    if (leftArm.current)  leftArm.current.rotation.z  =  0.15 + Math.sin(t * 0.7) * 0.08;
    if (rightArm.current) rightArm.current.rotation.z = -0.15 - Math.sin(t * 0.7) * 0.08;
  });

  return (
    <group ref={group} position={[0, -0.2, 0]} castShadow>

      {/* ── Torso ── */}
      <mesh castShadow material={darkMat}>
        <boxGeometry args={[0.72, 0.88, 0.38]} />
      </mesh>
      {/* Chest panel */}
      <mesh position={[0, 0.18, 0.2]} material={midMat} castShadow>
        <boxGeometry args={[0.38, 0.22, 0.05]} />
      </mesh>
      {/* Chest glow strip */}
      <mesh position={[0, 0.12, 0.21]} material={glowMat}>
        <boxGeometry args={[0.14, 0.04, 0.02]} />
      </mesh>
      {/* Torso accent lines */}
      <mesh position={[0.2, 0.0, 0.2]} material={accentMat}>
        <boxGeometry args={[0.04, 0.32, 0.02]} />
      </mesh>
      <mesh position={[-0.2, 0.0, 0.2]} material={accentMat}>
        <boxGeometry args={[0.04, 0.32, 0.02]} />
      </mesh>

      {/* ── Neck ── */}
      <mesh position={[0, 0.56, 0]} material={midMat} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.18, 20]} />
      </mesh>

      {/* ── Head ── */}
      <group ref={head} position={[0, 0.82, 0]}>
        <mesh castShadow material={darkMat}>
          <boxGeometry args={[0.5, 0.46, 0.44]} />
        </mesh>
        {/* Visor */}
        <mesh position={[0, 0.06, 0.23]} material={midMat}>
          <boxGeometry args={[0.4, 0.12, 0.02]} />
        </mesh>
        {/* Eyes */}
        <mesh ref={eyeL} position={[-0.1, 0.06, 0.23]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
        </mesh>
        <mesh ref={eyeR} position={[0.1, 0.06, 0.23]}>
          <sphereGeometry args={[0.055, 20, 20]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.0} />
        </mesh>
        {/* Head glow top */}
        <mesh position={[0, 0.24, 0]} material={glowMat}>
          <boxGeometry args={[0.3, 0.03, 0.34]} />
        </mesh>
      </group>

      {/* ── Left arm ── */}
      <group ref={leftArm} position={[-0.52, 0.26, 0]}>
        {/* Shoulder */}
        <mesh castShadow material={midMat}>
          <sphereGeometry args={[0.18, 20, 20]} />
        </mesh>
        {/* Upper arm */}
        <mesh position={[0, -0.3, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.17, 0.4, 0.17]} />
        </mesh>
        {/* Elbow */}
        <mesh position={[0, -0.56, 0]} material={midMat}>
          <sphereGeometry args={[0.11, 16, 16]} />
        </mesh>
        {/* Forearm */}
        <mesh position={[0, -0.78, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.14, 0.36, 0.14]} />
        </mesh>
        {/* Arm accent */}
        <mesh position={[0, -0.3, 0.09]} material={glowMat}>
          <boxGeometry args={[0.04, 0.2, 0.02]} />
        </mesh>
        {/* Hand */}
        <mesh position={[0, -1.0, 0]} material={midMat}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      {/* ── Right arm ── */}
      <group ref={rightArm} position={[0.52, 0.26, 0]}>
        <mesh castShadow material={midMat}>
          <sphereGeometry args={[0.18, 20, 20]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.17, 0.4, 0.17]} />
        </mesh>
        <mesh position={[0, -0.56, 0]} material={midMat}>
          <sphereGeometry args={[0.11, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.78, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.14, 0.36, 0.14]} />
        </mesh>
        <mesh position={[0, -0.3, 0.09]} material={glowMat}>
          <boxGeometry args={[0.04, 0.2, 0.02]} />
        </mesh>
        <mesh position={[0, -1.0, 0]} material={midMat}>
          <sphereGeometry args={[0.1, 16, 16]} />
        </mesh>
      </group>

      {/* ── Hips ── */}
      <mesh position={[0, -0.52, 0]} castShadow material={midMat}>
        <boxGeometry args={[0.58, 0.18, 0.34]} />
      </mesh>

      {/* ── Left leg ── */}
      <group position={[-0.2, -0.62, 0]}>
        <mesh material={midMat} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.2, 0.44, 0.2]} />
        </mesh>
        <mesh position={[0, -0.58, 0]} material={midMat}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.82, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.17, 0.4, 0.18]} />
        </mesh>
        <mesh position={[0, -0.25, 0.1]} material={accentMat}>
          <boxGeometry args={[0.04, 0.18, 0.02]} />
        </mesh>
        <mesh position={[0, -1.08, 0.05]} castShadow material={darkMat}>
          <boxGeometry args={[0.24, 0.1, 0.32]} />
        </mesh>
      </group>

      {/* ── Right leg ── */}
      <group position={[0.2, -0.62, 0]}>
        <mesh material={midMat} castShadow>
          <sphereGeometry args={[0.15, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.2, 0.44, 0.2]} />
        </mesh>
        <mesh position={[0, -0.58, 0]} material={midMat}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        <mesh position={[0, -0.82, 0]} castShadow material={darkMat}>
          <boxGeometry args={[0.17, 0.4, 0.18]} />
        </mesh>
        <mesh position={[0, -0.25, 0.1]} material={accentMat}>
          <boxGeometry args={[0.04, 0.18, 0.02]} />
        </mesh>
        <mesh position={[0, -1.08, 0.05]} castShadow material={darkMat}>
          <boxGeometry args={[0.24, 0.1, 0.32]} />
        </mesh>
      </group>

    </group>
  );
}

/* ── Ground reflection plane ── */
function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial color="#080810" metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

/* ── Ambient glow orb ── */
function GlowOrb({ pointer }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.position.x = pointer.current.x * 1.2;
    mesh.current.position.y = 0.5 + Math.sin(t * 0.5) * 0.2;
    mesh.current.material.emissiveIntensity = 0.3 + Math.sin(t) * 0.1;
  });
  return (
    <mesh ref={mesh} position={[0, 0.5, -2]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshStandardMaterial
        color="#00d4ff"
        emissive="#00d4ff"
        emissiveIntensity={0.3}
        transparent
        opacity={0.06}
      />
    </mesh>
  );
}

/* ── Main exported component ── */
export default function HeroScene() {
  const pointer = useRef({ x: 0, y: 0 });
  const [hinted, setHinted] = React.useState(true);

  useEffect(() => {
    const onMove = (e) => {
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const y = e.touches ? e.touches[0].clientY : e.clientY;
      pointer.current.x = (x / window.innerWidth - 0.5) * 2;
      pointer.current.y = -(y / window.innerHeight - 0.5) * 2;
    };
    const onGyro = (e) => {
      pointer.current.x = (e.gamma || 0) / 45;
      pointer.current.y = (e.beta  || 0) / 45 - 1;
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

  return (
    <div
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      onMouseMove={() => setHinted(false)}
    >
      {/* Drag hint */}
      {hinted && (
        <div style={{
          position: "absolute", top: "50%", left: "60%",
          transform: "translate(-50%,-50%)",
          zIndex: 5, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 8,
          animation: "heroFloat 3s ease-in-out infinite",
          pointerEvents: "none",
        }}>
          <style>{`@keyframes heroFloat{0%,100%{transform:translate(-50%,-50%) translateY(0)}50%{transform:translate(-50%,-50%) translateY(-8px)}}`}</style>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5">
              <path d="M12 2v20M2 12h20" />
            </svg>
          </div>
          <span style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.2)", textTransform: "uppercase", fontFamily: "Inter, sans-serif" }}>
            Déplacer
          </span>
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [0, 0.8, 5.5], fov: 42 }}
        style={{ background: "transparent" }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
      >
        {/* Lights */}
        <ambientLight intensity={0.12} />
        <directionalLight
          position={[2.5, 5, 3]} intensity={2.8}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-near={0.5}
          shadow-camera-far={30}
        />
        <pointLight position={[-3, 2, -2]} intensity={1.4} color="#88aaff" />
        <pointLight position={[0, -1.5, 1.5]} intensity={2.0} color="#00d4ff" />
        <pointLight position={[2, 1, 2]} intensity={0.5} color="#ffffff" />

        <Stars radius={60} depth={40} count={1800} factor={2} fade speed={0.4} />
        <Particles />
        <Floor />
        <GlowOrb pointer={pointer} />
        <Robot pointer={pointer} />
      </Canvas>

      {/* Vignette overlay */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(8,8,16,0.85) 100%)",
      }} />
    </div>
  );
}
