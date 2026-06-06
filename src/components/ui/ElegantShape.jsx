import React from "react";
import { motion } from "framer-motion";

export function ElegantShape({
  className = "",
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "rgba(255,255,255,0.05)",
  color = "rgba(255,255,255,0.12)",
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ duration: 2.4, delay, ease: [0.23, 0.86, 0.39, 0.96], opacity: { duration: 1.2 } }}
      style={{ position: "absolute" }}
      className={className}
    >
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ width, height, position: "relative" }}
      >
        <div style={{
          position: "absolute", inset: 0,
          borderRadius: 9999,
          background: `linear-gradient(135deg, ${gradient}, transparent)`,
          border: `1.5px solid ${color}`,
          boxShadow: `0 8px 32px 0 rgba(255,255,255,0.06)`,
          backdropFilter: "blur(2px)",
        }} />
      </motion.div>
    </motion.div>
  );
}
