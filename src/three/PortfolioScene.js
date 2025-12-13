// src/three/PortfolioScene.js
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { Suspense } from "react";

function PortfolioScene() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {/* Éléments 3D du portfolio */}
      <Suspense fallback={null}>
        <mesh position={[-2, 0, 0]}>
          <boxGeometry args={[1.5, 1.5, 1.5]} />
          <meshStandardMaterial color="#8e2de2" />
        </mesh>
        <mesh position={[2, 0, 0]}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#4a00e0" />
        </mesh>
      </Suspense>

      {/* Effets cyber futuristes */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />

      {/* Contrôle caméra */}
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
import FloatingPanel from "./FloatingPanel";

// Remplace les meshes simples par des panneaux flottants
<Suspense fallback={null}>
  <FloatingPanel position={[-3, 1, 0]} color="#8e2de2" />
  <FloatingPanel position={[0, 0, 0]} color="#4a00e0" />
  <FloatingPanel position={[3, -1, 0]} color="#ff006e" />
</Suspense>

    </Canvas>
  );
}

export default PortfolioScene;
