import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLang } from "./context/LangContext";
import { t } from "./data/translations";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import ProjectsSection from "./sections/ProjectsSection";
import SkillsSection from "./sections/SkillsSection";
import CertificationsSection from "./sections/CertificationsSection";
import ExperienceSection from "./sections/ExperienceSection";
import ContactSection from "./sections/ContactSection";
import FooterSection from "./sections/FooterSection";
import { colors } from "./styles/theme";

function LangToggle() {
  const { lang, toggleLang } = useLang();
  const isFR = lang === "fr";
  return (
    <motion.button
      type="button"
      onClick={toggleLang}
      aria-label={isFR ? "Switch to English" : "Passer en français"}
      whileTap={{ scale: 0.97 }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 13px",
        borderRadius: 100,
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(255,255,255,0.85)",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 0.8,
        cursor: "pointer",
      }}
    >
      <span style={{ opacity: isFR ? 1 : 0.45, transition: "opacity 0.2s" }}>FR</span>
      <span style={{ opacity: 0.3, fontSize: 10 }}>|</span>
      <span style={{ opacity: isFR ? 0.45 : 1, transition: "opacity 0.2s" }}>EN</span>
    </motion.button>
  );
}

function Navbar() {
  const { lang } = useLang();
  const tr = t[lang];
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const NAV = [
    { href: "#about", label: tr.nav.about },
    { href: "#projects", label: tr.nav.projects },
    { href: "#skills", label: tr.nav.skills },
    { href: "#certifications", label: tr.nav.certifications },
    { href: "#experience", label: tr.nav.experience },
    { href: "#contact", label: tr.nav.contact },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="pf-header"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          background: scrolled ? "rgba(3,7,18,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
          transition: "all 0.35s ease",
        }}
      >
        <a href="#hero" style={{ display: "flex", alignItems: "center", gap: 13, textDecoration: "none" }}>
          <div className="pf-logo-sm" style={{ width: 42, height: 42, borderRadius: 12, boxShadow: "0 4px 16px rgba(124,58,237,0.35)" }}>JD</div>
          <div className="pf-logo-text">
            <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>JEREMIE LANDRY DJOKO</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginTop: 1 }}>{tr.navbar.subtitle}</div>
          </div>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 28 }} className="pf-nav-desktop">
          {NAV.map((l) => (
            <a key={l.href} href={l.href} className="pf-footer-link" style={{ fontSize: 14 }}>
              {l.label}
            </a>
          ))}
          <LangToggle />
        </div>

        <div style={{ display: "none", alignItems: "center", gap: 12 }} className="pf-nav-mobile-row">
          <LangToggle />
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 5 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: 22,
                  height: 1.5,
                  background: "rgba(255,255,255,0.6)",
                  transition: "all 0.25s",
                  transform:
                    menuOpen && i === 0
                      ? "rotate(45deg) translate(4.5px,4.5px)"
                      : menuOpen && i === 2
                        ? "rotate(-45deg) translate(4.5px,-4.5px)"
                        : "none",
                  opacity: menuOpen && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 99,
            background: "rgba(3,7,18,0.98)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            backdropFilter: "blur(24px)",
            padding: "24px clamp(20px, 5vw, 40px)",
            display: "flex",
            flexDirection: "column",
            gap: 22,
          }}
        >
          {NAV.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{ fontSize: 16, color: "rgba(255,255,255,0.65)", textDecoration: "none" }}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}

export default function Portfolio() {
  return (
    <div style={{ background: colors.bg, minHeight: "100vh" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <CertificationsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  );
}
