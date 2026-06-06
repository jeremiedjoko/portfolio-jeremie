import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EXPERIENCES } from "../data/portfolioData";
import { colors, layout } from "../styles/theme";

function useInView(threshold = 0.1) {
  const ref = useRef();
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

export default function ExperienceSection() {
  const { lang } = useLang();
  const tr = t[lang].experience;
  const [ref, inView] = useInView(0.05);
  const degree = tr.degree;

  const currentExperiences = EXPERIENCES[lang] || EXPERIENCES.en;

  return (
    <section id="experience" style={{ background: colors.bg, padding: layout.sectionPad, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div ref={ref} style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: layout.containerPad }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="pf-section-label" style={{ color: "rgba(167,139,250,0.75)" }}>{tr.label}</p>
          <h2 className="pf-section-title">
            {tr.title1} <span>{tr.title2}</span>
          </h2>
        </motion.div>

        <div className="pf-exp-grid">
          <div>
            <p className="pf-exp-col-label">{tr.educationLabel}</p>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="pf-exp-card"
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 100, background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)", color: "#a78bfa", letterSpacing: 1 }}>{degree.type}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{degree.period}</span>
              </div>
              <h3 style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 4 }}>{degree.role}</h3>
              <p style={{ fontSize: 13, color: "rgba(124,58,237,0.8)", marginBottom: 14 }}>{degree.org}</p>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {degree.bullets.map((b) => (
                  <li key={b} style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.75, marginBottom: 6, display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ color: "#7C3AED", marginTop: 6, flexShrink: 0 }}>›</span> {b}
                  </li>
                ))}
              </ul>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginTop: 16 }}>
                {degree.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 100, background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#a78bfa" }}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <div>
            <p className="pf-exp-col-label">{tr.workLabel}</p>
            {currentExperiences.map((exp, i) => (
              <motion.div
                key={exp.org}
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.15 + 0.1 }}
                className="pf-exp-card"
                style={{ marginBottom: 14 }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ fontSize: 10, padding: "3px 10px", borderRadius: 100, background: `${exp.accent}15`, border: `1px solid ${exp.accent}30`, color: exp.accent, letterSpacing: 1 }}>
                    {i === 0 ? tr.featured : tr.internship}
                  </span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>{exp.period}</span>
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 4 }}>{exp.role}</h3>
                <p style={{ fontSize: 13, color: `${exp.accent}CC`, marginBottom: 4 }}>{exp.org}</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginBottom: 14 }}>{exp.supervisor}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.75, marginBottom: 16 }}>{exp.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {exp.tags.map((tag) => (
                    <span key={tag} style={{ fontSize: 11, padding: "4px 11px", borderRadius: 100, background: `${exp.accent}10`, border: `1px solid ${exp.accent}25`, color: `${exp.accent}CC` }}>{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
