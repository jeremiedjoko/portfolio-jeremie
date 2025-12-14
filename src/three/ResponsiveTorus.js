import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";

// --- Composant pour rendre la caméra responsive ---
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    if (size.width < 768) {
      camera.position.set(2, 2, 6.5);
      camera.fov = 75;
    } else {
      camera.position.set(2.5, 2.5, 4.5);
      camera.fov = 60;
    }
    camera.updateProjectionMatrix();
  }, [size, camera]);

  return null;
}

// --- Composant pour rendre le Torus responsive ---
function ResponsiveTorus() {
  const { size } = useThree();
  const scale = size.width < 768 ? 0.7 : 1; // plus petit sur mobile

  return (
    <Float speed={2} rotationIntensity={1.3} floatIntensity={1.5}>
      <mesh rotation={[0.6, 0.7, 0.2]} scale={scale}>
        <torusKnotGeometry args={[1, 0.25, 128, 32]} />
        <meshStandardMaterial
          color="#7C3AED"
          metalness={0.75}
          roughness={0.25}
          emissive="#5B21B6"
          emissiveIntensity={0.6}
        />
      </mesh>
    </Float>
  );
}

// --- Composant principal ---
export default function PortfolioScene() {
  return (
    <>
      {/* Canvas 3D en arrière-plan */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [2.5, 2.5, 4], fov: 60 }} style={{ pointerEvents: "none" }}>
          <ResponsiveCamera />
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.3} />
          <pointLight position={[-5, -5, -5]} intensity={0.6} />

          <Stars radius={120} depth={60} count={2500} factor={4} saturation={0} fade speed={1} />

          <ResponsiveTorus />

          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.2} />
        </Canvas>
      </div>

      {/* Contenu interactif au-dessus du Canvas */}
      <div className="relative z-10 p-4">
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Envoyer Email
        </button>
        <p className="text-white mt-2">
          Mon texte sur le portfolio
        </p>
      </div>
    </>
  );
}
