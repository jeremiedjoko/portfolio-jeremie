import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { PROJECTS } from "../data/portfolioData";
import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import { colors, fonts, layout } from "../styles/theme";
import { useProjectViews } from "../hooks/useProjectViews";
import { Eye } from "lucide-react";

function useInView(threshold = 0.05) {
  const ref = useRef();
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

function ProjectCard({ project, index, tr, inView }) {
  const views = useProjectViews(project.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      className="pf-project-card"
      style={{ borderColor: "rgba(255,255,255,0.07)" }}
    >
      <div
        style={{
          height: 160,
          position: "relative",
          overflow: "hidden",
          background: `linear-gradient(135deg, ${project.accent}22, ${colors.bgElevated})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at 30% 40%, ${project.accent}30, transparent 65%)`,
          }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(3,7,18,0.95) 100%)" }} />
        {project.highlight && (
          <span className="pf-badge" style={{ position: "absolute", top: 12, left: 12 }}>{tr.featured}</span>
        )}
        <span
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            padding: "4px 10px",
            borderRadius: 100,
            background: `${project.statusColor}20`,
            border: `1px solid ${project.statusColor}50`,
            fontSize: 10,
            color: project.statusColor,
            letterSpacing: 0.8,
          }}
        >
          {project.status}
        </span>
        <p style={{ position: "absolute", bottom: 12, left: 16, fontSize: 9, letterSpacing: 2.5, color: `${project.accent}CC`, textTransform: "uppercase" }}>
          {project.category}
        </p>
        {views !== null && (
          <span
            style={{
              position: "absolute",
              bottom: 12,
              right: 16,
              display: "inline-flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              color: "rgba(255,255,255,0.5)",
            }}
          >
            <Eye size={11} aria-hidden />
            {views}
          </span>
        )}
      </div>

      <div style={{ padding: "20px 22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: fonts.body, fontWeight: 700, fontSize: 15, color: "#fff", lineHeight: 1.35, marginBottom: 4, letterSpacing: "-0.3px" }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>{project.subtitle}</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, flex: 1 }}>
          {[
            { label: tr.problem, text: project.problem },
            { label: tr.solution, text: project.solution },
            { label: tr.result, text: project.result },
          ].map((row) => (
            <div key={row.label}>
              <p style={{ fontSize: 10, letterSpacing: 1.2, textTransform: "uppercase", color: project.accent, marginBottom: 3, fontWeight: 600 }}>{row.label}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{row.text}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
          {project.tags.slice(0, 4).map((tag) => (
            <span key={tag} className="pf-tag-sm">{tag}</span>
          ))}
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <motion.span
            className="pf-btn pf-btn-card"
            style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, color: project.accent, borderColor: `${project.accent}35`, background: `${project.accent}10` }}
            whileHover={{ borderColor: `${project.accent}60` }}
            whileTap={{ scale: 0.98 }}
          >
            {tr.viewCode}
            <ExternalLink size={14} aria-hidden />
          </motion.span>
        </a>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const { lang } = useLang();
  const tr = t[lang].projects;
  const [showAll, setShowAll] = useState(false);
  const [ref, inView] = useInView(0.05);

  const currentProjects = PROJECTS[lang] || PROJECTS.en;
  const visible = showAll ? currentProjects : currentProjects.slice(0, 6);

  return (
    <section id="projects" style={{ background: colors.bg, padding: layout.sectionPad }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: layout.containerPad }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="pf-section-label" style={{ color: "rgba(110,231,247,0.75)" }}>{tr.label}</p>
          <h2 className="pf-section-title">
            {tr.title1} <span>{tr.title2}</span>
          </h2>
          <p className="pf-section-desc">{tr.desc}</p>
        </motion.div>

        <div ref={ref} className="pf-projects-grid">
          {visible.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} tr={tr} inView={inView} />
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <motion.button
            type="button"
            onClick={() => setShowAll((s) => !s)}
            className="pf-btn pf-btn-outline"
            whileTap={{ scale: 0.98 }}
          >
            {showAll ? tr.showLess : tr.showAll(currentProjects.length - 6)}
          </motion.button>
        </div>
      </div>
    </section>
  );
}