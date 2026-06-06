import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Spotlight } from "../components/ui/Spotlight";
import { ElegantShape } from "../components/ui/ElegantShape";
import { FloatingTechChips } from "../components/ui/FloatingTechChips";
import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import { PROFILE } from "../data/portfolioData";
import { useIsMobile, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { colors } from "../styles/theme";

const SplineScene = lazy(() =>
  import("../components/ui/SplineScene").then((m) => ({ default: m.SplineScene }))
);

const stackTags = ["Suricata", "ELK Stack", "Python", "React", "Figma", "Kali Linux"];
const fade = (i, reduced) => ({
  hidden: { opacity: 0, y: reduced ? 0 : 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: reduced ? 0.2 : 0.75, delay: reduced ? 0 : 0.2 + i * 0.1, ease: [0.25, 0.4, 0.25, 1] },
  },
});

export default function HeroSection() {
  const { lang } = useLang();
  const tr = t[lang].hero;
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const fadeOut = Math.max(0, 1 - scrollY / 500);
  const parallax = reduced ? 0 : scrollY * 0.22;

  return (
    <section
      ref={heroRef}
      id="hero"
      className="pf-hero"
      style={{
        position: "relative",
        minHeight: isMobile ? "auto" : "110vh",
        background: colors.bg,
        overflow: "hidden",
        display: "block",
        paddingTop: isMobile ? 88 : 72,
        paddingBottom: isMobile ? 48 : 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 60% at ${isMobile ? "50%" : "38%"} 50%, rgba(124,58,237,0.08), transparent)`,
          pointerEvents: "none",
        }}
      />

      {!isMobile && !reduced && (
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <ElegantShape delay={0.3} width={500} height={110} rotate={12} gradient="rgba(124,58,237,0.1)" color="rgba(124,58,237,0.18)" style={{ position: "absolute", left: "-6%", top: "15%" }} />
          <ElegantShape delay={0.5} width={340} height={80} rotate={-10} gradient="rgba(110,231,247,0.08)" color="rgba(110,231,247,0.15)" style={{ position: "absolute", right: "-3%", top: "68%" }} />
        </div>
      )}

      {!isMobile && <Spotlight size={240} />}
      <FloatingTechChips containerRef={heroRef} />

      {/* 3D robot: desktop only */}
      {!isMobile && (
        <div
          className="pf-hero-robot"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "150%",
            height: "100%",
            transform: `translateY(${parallax * 0.2}px)`,
            opacity: fadeOut,
            zIndex: 3,
            pointerEvents: "auto",
          }}
        >
          <Suspense
            fallback={
              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div className="pf-spinner" />
              </div>
            }
          >
            <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
          </Suspense>
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 100,
          zIndex: 2,
          background: "linear-gradient(0deg, #030712, transparent)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        className="pf-hero-content"
        style={{
          position: "relative",
          zIndex: 4,
          width: "100%",
          margin: 0,
          paddingLeft: "clamp(20px, 5vw, 56px)",
          paddingRight: isMobile ? "clamp(20px, 5vw, 56px)" : 0,
          opacity: fadeOut,
          transform: `translateY(${-parallax * 0.1}px)`,
          pointerEvents: "none",
          minHeight: isMobile ? undefined : "calc(110vh - 72px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          filter: "drop-shadow(0 4px 24px rgba(3,7,18,0.9)) drop-shadow(0 0 12px rgba(3,7,18,0.8))",
        }}
      >
        <div className="pf-hero-copy">
          <motion.div variants={fade(0, reduced)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 100, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", fontSize: 11, color: "rgba(255,255,255,0.55)", letterSpacing: 0.8, marginBottom: 24 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: colors.green, boxShadow: `0 0 8px ${colors.green}` }} className={reduced ? "" : "pf-pulse-dot"} />
            {tr.badge}
          </motion.div>

          <motion.div variants={fade(1, reduced)} className="pf-hero-title-wrap" style={{ marginBottom: 20 }}>
            <h1 className="pf-hero-title">
              <span className="pf-hero-title-line pf-hero-title-line--primary">{tr.titleLine1}</span>
              <span className="pf-hero-title-line pf-hero-title-line--accent">{tr.titleLine2}</span>
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", marginTop: 14, letterSpacing: 0.3 }}>{tr.name}</p>
            <p style={{ fontSize: 12, color: "rgba(110,231,247,0.85)", marginTop: 8, letterSpacing: 1, textTransform: "uppercase", fontWeight: 600 }}>{tr.role}</p>
          </motion.div>

          <motion.p variants={fade(2, reduced)} className="pf-hero-desc">
            {tr.desc}
          </motion.p>

          <motion.div variants={fade(3, reduced)} className="pf-hero-actions" style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
            <a href="#projects" style={{ textDecoration: "none", pointerEvents: "auto" }}>
              <motion.button
                className="pf-btn pf-btn-ghost"
                whileHover={reduced ? {} : { borderColor: "rgba(255,255,255,0.35)" }}
                whileTap={reduced ? {} : { scale: 0.98 }}
              >
                {tr.ctaProjects}
              </motion.button>
            </a>
            <a href={PROFILE.cvPath} download style={{ textDecoration: "none", pointerEvents: "auto" }}>
              <motion.button
                className="pf-btn pf-btn-primary"
                whileHover={reduced ? {} : { boxShadow: "0 8px 28px rgba(124,58,237,0.45)" }}
                whileTap={reduced ? {} : { scale: 0.98 }}
              >
                {tr.ctaCV}
              </motion.button>
            </a>
            <a href="#contact" style={{ textDecoration: "none", pointerEvents: "auto" }}>
              <motion.button
                className="pf-btn pf-btn-outline"
                whileHover={reduced ? {} : { borderColor: "rgba(255,255,255,0.25)" }}
                whileTap={reduced ? {} : { scale: 0.98 }}
              >
                {tr.ctaContact}
              </motion.button>
            </a>
          </motion.div>

          <motion.div variants={fade(4, reduced)} style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {stackTags.map((tag) => (
              <span key={tag} className="pf-tag">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {isMobile && (
        <div className="pf-hero-mobile-visual" style={{ opacity: fadeOut }}>
          <div className="pf-hero-orb" />
          <Suspense fallback={<div className="pf-spinner-wrap"><div className="pf-spinner" /></div>}>
            <div style={{ position: "relative", height: 200, marginTop: -40 }}>
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
            </div>
          </Suspense>
        </div>
      )}

      {!isMobile && (
        <div
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 3,
            opacity: fadeOut * 0.5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <div style={{ fontSize: 9, letterSpacing: 3, color: "rgba(255,255,255,0.18)" }}>{tr.scroll}</div>
          <div className={reduced ? "" : "pf-scroll-line"} />
        </div>
      )}
    </section>
  );
}
