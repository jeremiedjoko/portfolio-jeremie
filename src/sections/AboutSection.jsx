import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { STATS, PROFILE } from "../data/portfolioData";
import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import { SkillIcon } from "../components/ui/SkillIcon";
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

export default function AboutSection() {
  const { lang } = useLang();
  const tr = t[lang].about;
  const [ref, inView] = useInView(0.1);

  return (
    <section id="about" style={{ background: colors.bg, padding: layout.sectionPad }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: layout.containerPad }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 56 }}>
          <p className="pf-section-label" style={{ color: "rgba(124,58,237,0.75)" }}>{tr.label}</p>
          <h2 className="pf-section-title">
            {tr.title1} <span>{tr.title2}</span>
          </h2>
        </motion.div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="pf-about-grid"
          style={{ marginBottom: 64 }}
        >
          <div>
            <p className="pf-body-text" style={{ marginBottom: 18 }}>{tr.bio1}</p>
            <p className="pf-body-text" style={{ marginBottom: 18 }}>{tr.bio2}</p>
            <p className="pf-body-text">{tr.bio3}</p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{ borderRadius: 16, background: "rgba(255,255,255,0.03)", border: `1px solid ${colors.border}`, overflow: "hidden" }}
          >
            {tr.infoRows.map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "16px 22px",
                  borderBottom: i < tr.infoRows.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <span style={{ fontSize: 10, letterSpacing: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", width: 110, flexShrink: 0 }}>{row.label}</span>
                <span style={{ fontSize: 14, color: row.green ? colors.green : "rgba(255,255,255,0.7)", fontWeight: row.green ? 500 : 400 }}>{row.value}</span>
              </div>
            ))}
            <div style={{ padding: "16px 22px" }}>
              <a href={PROFILE.cvPath} download style={{ textDecoration: "none" }}>
                <motion.button className="pf-btn pf-btn-primary" style={{ width: "100%" }} whileTap={{ scale: 0.98 }}>
                  {tr.downloadCV}
                </motion.button>
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 64 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="pf-stat-card">
              <div className="pf-stat-num">{s.num}</div>
              <div className="pf-stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
          <p style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,0.25)", textTransform: "uppercase", marginBottom: 20, textAlign: "center" }}>{tr.definesWork}</p>
          <div className="pf-qualities-grid">
            {tr.qualities.map((q) => (
              <motion.div
                key={q.title}
                className="pf-quality-card"
                whileHover={{ borderColor: "rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.04)" }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.25)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14 }}>
                  <SkillIcon name={q.icon} size={20} color="#a78bfa" />
                </div>
                <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{q.title}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{q.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
