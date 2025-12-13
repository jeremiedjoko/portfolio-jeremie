// src/three/FloatingPanel.js
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function FloatingPanel({ position = [0, 0, 0], color = "#00ffea", children }) {
  const ref = useRef();

  // Animation simple : oscillation
  useFrame(({ clock }) => {
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime()) * 0.5;
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[2, 1, 0.2]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
