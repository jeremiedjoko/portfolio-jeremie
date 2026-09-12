import React, { useRef, useState } from "react";

export function TiltCard({ children, style, className = "", ...props }) {
  const ref = useRef();
  const [coords, setCoords] = useState({ x: 0, y: 0, px: 0, py: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate relative mouse position inside the card (-width/2 to +width/2)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate tilt degrees (max 10 degrees for elegant subtle effect)
    const rX = (mouseY / height) * -10;
    const rY = (mouseX / width) * 10;
    
    // Percentage for glow radial gradient center
    const px = ((e.clientX - rect.left) / width) * 100;
    const py = ((e.clientY - rect.top) / height) * 100;
    
    setCoords({ x: rX, y: rY, px, py });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0, px: 0, py: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        ...style,
        transform: `perspective(1000px) rotateX(${coords.x}deg) rotateY(${coords.y}deg)`,
        transition: isHovered 
          ? "transform 0.05s ease-out, box-shadow 0.15s, border-color 0.15s" 
          : "transform 0.4s ease-out, box-shadow 0.4s, border-color 0.4s",
        position: "relative",
      }}
      {...props}
    >
      {children}
      {/* Light aura overlay centered on cursor */}
      <div 
        style={{
          position: "absolute", 
          inset: 0,
          background: `radial-gradient(circle 160px at ${coords.px}% ${coords.py}%, rgba(var(--accent-1-rgb), 0.12), transparent 80%)`,
          pointerEvents: "none", 
          zIndex: 5, 
          borderRadius: "inherit",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease",
        }} 
      />
    </div>
  );
}
