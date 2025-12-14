import { useThree } from "@react-three/fiber";
import { Float } from "@react-three/drei";

function ResponsiveTorus() {
  const { size } = useThree();
  const isMobile = size.width < 768;

  return (
    <Float
      speed={isMobile ? 1.2 : 2}
      rotationIntensity={isMobile ? 0.8 : 1.3}
      floatIntensity={isMobile ? 0.6 : 1.5}
    >
      <mesh 
        rotation={[0.6, 0.7, 0.2]} 
        position={[0, -0.5, -1]} // reculé derrière le texte
        scale={isMobile ? 0.7 : 1} // ajustement supplémentaire si besoin
      >
        <torusKnotGeometry
          args={[
            isMobile ? 0.55 : 1,     
            isMobile ? 0.18 : 0.25, 
            128,
            32
          ]}
        />
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

export default ResponsiveTorus;
