import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TOOLS } from "../data/portfolioData";
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

const ACCENTS = ["#7C3AED", "#06b6d4", "#ec4899", "#f97316"];

export default function SkillsSection() {
  const { lang } = useLang();
  const tr = t[lang].skills;
  const [ref, inView] = useInView(0.05);
  const skillGroups = tr.groups.map((g, i) => ({ ...g, accent: ACCENTS[i] }));

  return (
    <section id="skills" style={{ background: colors.bg, padding: layout.sectionPad, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: layout.containerPad }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="pf-section-label" style={{ color: "rgba(6,182,212,0.75)" }}>{tr.label}</p>
          <h2 className="pf-section-title">
            {tr.title1} <span>{tr.title2}</span>
          </h2>
          <p className="pf-section-desc">{tr.desc}</p>
        </motion.div>

        <div ref={ref} className="pf-skills-grid">
          {skillGroups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="pf-skill-card"
              whileHover={{ borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)" }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: `${g.accent}15`, border: `1px solid ${g.accent}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <SkillIcon name={g.icon} size={20} color={g.accent} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", lineHeight: 1.2 }}>{g.title}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{g.desc}</p>
                  </div>
                </div>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontWeight: 700 }}>{g.num}</span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {g.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: 12, padding: "5px 12px", borderRadius: 100, background: `${g.accent}10`, border: `1px solid ${g.accent}20`, color: `${g.accent}CC` }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", paddingTop: 32, marginTop: 32, borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          {TOOLS.map((tag, i) => (
            <motion.span
              key={tag}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 + i * 0.02 }}
              className="pf-tag-sm"
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
