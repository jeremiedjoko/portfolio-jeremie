import React from "react";
import { motion } from "framer-motion";

export function LampContainer({ children, className = "" }) {
  return (
    <div style={{
      position: "relative", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      overflow: "hidden", background: "#030712", width: "100%",
      minHeight: "100vh",
    }} className={className}>
      <div style={{
        position: "relative", display: "flex", width: "100%", flex: 1,
        transform: "scaleY(1.25)", alignItems: "center",
        justifyContent: "center", isolation: "isolate", zIndex: 0,
      }}>
        {/* Left cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: "auto", right: "50%",
            height: "14rem", overflow: "visible", width: "30rem",
            backgroundImage: "conic-gradient(from 70deg at center top, #06b6d4, transparent, transparent)",
            color: "#fff",
          }}
        >
          <div style={{ position:"absolute", width:"100%", left:0, background:"#030712", height:"10rem", bottom:0, zIndex:20, maskImage:"linear-gradient(to top, white, transparent)" }} />
          <div style={{ position:"absolute", width:"10rem", height:"100%", left:0, background:"#030712", bottom:0, zIndex:20, maskImage:"linear-gradient(to right, white, transparent)" }} />
        </motion.div>
        {/* Right cone */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute", inset: "auto", left: "50%",
            height: "14rem", width: "30rem",
            backgroundImage: "conic-gradient(from 290deg at center top, transparent, transparent, #06b6d4)",
            color: "#fff",
          }}
        >
          <div style={{ position:"absolute", width:"10rem", height:"100%", right:0, background:"#030712", bottom:0, zIndex:20, maskImage:"linear-gradient(to left, white, transparent)" }} />
          <div style={{ position:"absolute", width:"100%", right:0, background:"#030712", height:"10rem", bottom:0, zIndex:20, maskImage:"linear-gradient(to top, white, transparent)" }} />
        </motion.div>
        <div style={{ position:"absolute", top:"50%", height:"12rem", width:"100%", transform:"translateY(3rem) scaleX(1.5)", background:"#030712", filter:"blur(24px)" }} />
        <div style={{ position:"absolute", top:"50%", zIndex:50, height:"12rem", width:"100%", background:"transparent", opacity:0.1, backdropFilter:"blur(12px)" }} />
        <div style={{ position:"absolute", inset:"auto", zIndex:50, height:"9rem", width:"28rem", transform:"translateY(-50%)", borderRadius:"50%", background:"#06b6d4", opacity:0.5, filter:"blur(48px)" }} />
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ position:"absolute", inset:"auto", zIndex:30, height:"9rem", width:"16rem", transform:"translateY(-6rem)", borderRadius:"50%", background:"#22d3ee", filter:"blur(24px)" }}
        />
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{ position:"absolute", inset:"auto", zIndex:50, height:"2px", width:"30rem", transform:"translateY(-7rem)", background:"#22d3ee" }}
        />
        <div style={{ position:"absolute", inset:"auto", zIndex:40, height:"11rem", width:"100%", transform:"translateY(-12.5rem)", background:"#030712" }} />
      </div>
      <div style={{ position:"relative", zIndex:50, display:"flex", transform:"translateY(-20rem)", flexDirection:"column", alignItems:"center", padding:"0 20px" }}>
        {children}
      </div>
    </div>
  );
}
