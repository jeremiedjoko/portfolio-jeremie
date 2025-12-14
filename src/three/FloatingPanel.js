// FloatingPanel.js
import React from "react";
import { Float } from "@react-three/drei";

export default function FloatingPanel({ children, position = [0, 0, 0] }) {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5} position={position}>
      {children}
    </Float>
  );
}
