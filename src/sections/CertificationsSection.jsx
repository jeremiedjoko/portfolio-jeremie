import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Download, FileCheck2 } from "lucide-react";
import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import { colors, layout } from "../styles/theme";

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

const ACCENTS = { security: "#7C3AED", cloud: "#06b6d4", ai: "#ec4899", data: "#f97316" };

const CERTIFICATIONS = [
  { category: "security", title: "Foundations of Cybersecurity", issuer: "Google · Coursera", file: "/certificates/foundations-cybersecurity-google.pdf" },
  { category: "security", title: "Introduction to Computers, OS and Security", issuer: "Microsoft · Coursera", file: "/certificates/intro-computers-security-microsoft.pdf" },
  { category: "security", title: "Introduction à la cybersécurité", issuer: "Cisco Networking Academy", file: null },
  { category: "security", title: "Fondamentaux du Certified Ethical Hacker (CEH)", issuer: "Cybrary", file: null },
  { category: "security", title: "Fondamentaux du CompTIA Security+", issuer: "Cybrary", file: null },

  { category: "cloud", title: "IoT Wireless & Cloud Computing Emerging Technologies", issuer: "Yonsei University · Coursera", file: "/certificates/iot-yonsei.pdf" },
  { category: "cloud", title: "Linux : Installation et administration", issuer: "LinkedIn Learning", file: "/certificates/linux-install-admin-linkedin.pdf" },
  { category: "cloud", title: "Linux : L'architecture système", issuer: "LinkedIn Learning", file: "/certificates/linux-architecture-linkedin.jpg" },
  { category: "cloud", title: "Linux : Les commandes du terminal", issuer: "LinkedIn Learning", file: "/certificates/linux-terminal-linkedin.pdf" },

  { category: "ai", title: "Claude 101", issuer: "Anthropic", file: "/certificates/claude-101-anthropic.pdf" },
  { category: "ai", title: "Claude Code 101", issuer: "Anthropic", file: "/certificates/claude-code-101-anthropic.pdf" },
  { category: "ai", title: "Claude Code in Action", issuer: "Anthropic", file: "/certificates/claude-code-in-action-anthropic.pdf" },
  { category: "ai", title: "Introduction to Claude Cowork", issuer: "Anthropic", file: "/certificates/claude-cowork-anthropic.pdf" },
  { category: "ai", title: "Using AI to Boost Your Creative Potential", issuer: "LinkedIn Learning", file: "/certificates/ai-creative-potential-linkedin.pdf" },

  { category: "data", title: "Telling Stories with Data", issuer: "LinkedIn Learning", file: "/certificates/telling-stories-data-linkedin.jpg" },
];

export default function CertificationsSection() {
  const { lang } = useLang();
  const tr = t[lang].certifications;
  const [ref, inView] = useInView(0.05);

  return (
    <section id="certifications" style={{ background: colors.bg, padding: layout.sectionPad, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
      <div style={{ maxWidth: layout.maxWidth, margin: "0 auto", padding: layout.containerPad }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }} style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="pf-section-label" style={{ color: "rgba(124,58,237,0.75)" }}>{tr.label}</p>
          <h2 className="pf-section-title">
            {tr.title1} <span>{tr.title2}</span>
          </h2>
          <p className="pf-section-desc">{tr.desc}</p>
        </motion.div>

        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
          {CERTIFICATIONS.map((c, i) => {
            const accent = ACCENTS[c.category];
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: (i % 6) * 0.05 }}
                style={{
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12,
                  padding: "16px 18px",
                  background: "rgba(255,255,255,0.02)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 8, background: `${accent}15`, border: `1px solid ${accent}25`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <FileCheck2 size={16} color={accent} />
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1.35 }}>{c.title}</p>
                    <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{c.issuer}</p>
                  </div>
                </div>

                {c.file ? (
                  <a
                    href={c.file}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", marginTop: "auto" }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: accent, border: `1px solid ${accent}35`, background: `${accent}10`, borderRadius: 100, padding: "6px 12px" }}>
                      <Download size={13} aria-hidden />
                      {tr.download}
                    </span>
                  </a>
                ) : (
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: "auto" }}>{tr.noFile}</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
