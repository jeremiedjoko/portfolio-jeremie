import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import { PROFILE } from "../data/portfolioData";
import React from "react";
import { colors, layout } from "../styles/theme";

const socials = [
  {
    label: "LinkedIn",
    href: PROFILE.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: PROFILE.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: `mailto:${PROFILE.email}`,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
];

export default function FooterSection() {
  const { lang } = useLang();
  const tr = t[lang];
  const navLinks = [
    { href: "#about", label: tr.nav.about },
    { href: "#projects", label: tr.nav.projects },
    { href: "#skills", label: tr.nav.skills },
    { href: "#certifications", label: tr.nav.certifications },
    { href: "#experience", label: tr.nav.experience },
    { href: "#contact", label: tr.nav.contact },
  ];

  return (
    <footer style={{ background: colors.bg, borderTop: "1px solid rgba(255,255,255,0.05)", padding: "48px 0 32px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: layout.containerPad }}>
        <div className="pf-footer-top">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div className="pf-logo-sm">JD</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", letterSpacing: 0.3 }}>JEREMIE LANDRY DJOKO</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>{tr.navbar.subtitle}</div>
            </div>
          </div>

          <nav className="pf-footer-nav">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="pf-footer-link">
                {l.label}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", gap: 12 }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="pf-social-btn">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.22)", letterSpacing: 0.4 }}>
            © {new Date().getFullYear()} JEREMIE LANDRY DJOKO {tr.footer.rights}
          </p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", marginTop: 6 }}>{tr.footer.built}</p>
        </div>
      </div>
    </footer>
  );
}
