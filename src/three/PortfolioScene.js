import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";

export default function PortfolioScene() {
  return (
    <>
      {/* Canvas 3D en arrière-plan */}
      <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [2.5, 2.5, 4], fov: 60 }} style={{ pointerEvents: "none" }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.3} />
          <pointLight position={[-5, -5, -5]} intensity={0.6} />

          <Stars
            radius={120}
            depth={60}
            count={2500}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />

          <Float speed={2} rotationIntensity={1.3} floatIntensity={1.5}>
            <mesh rotation={[0.6, 0.7, 0.2]}>
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

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={1.2}
          />
        </Canvas>
      </div>
    </>
  );
              }
