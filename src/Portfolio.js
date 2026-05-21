// Portfolio.jsx
import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";
import PortfolioScene from "./three/PortfolioScene";

export default function Portfolio() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");
    emailjs
      .sendForm("service_i81kced", "template_m4eluzk", form.current, "-L2XTDmSnie6p6MFc")
      .then(() => { setStatus("Message envoyé avec succès ✅"); form.current.reset(); },
            () => { setStatus("Erreur lors de l'envoi ❌"); });
  };

  const navLinks = [
    { href: "#about", label: "À propos" },
    { href: "#projects", label: "Projets" },
    { href: "#skills", label: "Compétences" },
    { href: "#experience", label: "Expériences" },
    { href: "#contact", label: "Contact" },
  ];

  const tags = ["Suricata", "Wireshark", "Nmap", "Metasploit", "BurpSuite", "Linux", "Python", "Bash"];

  return (
    <div className="min-h-screen bg-[#030712] text-gray-100 font-sans overflow-x-hidden" style={{ position: "relative" }}>

      {/* ── 3D BACKGROUND ── */}
      <PortfolioScene />

      {/* ── NAVBAR ── */}
      <header className="relative z-50 px-5 py-4 flex items-center justify-between backdrop-blur-sm border-b border-white/5" style={{ position: "relative", zIndex: 50 }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6EE7F7] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-900/40">
            <span className="font-black text-sm text-white">JD</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight tracking-wide">JEREMIE LANDRY DJOKO</p>
            <p className="text-[10px] text-white/40 leading-tight">Analyste Cyber-sécurité • Blue Team & Red Team</p>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm text-white/60">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </nav>

        {/* Hamburger */}
        <button className="md:hidden relative z-50 w-9 h-9 flex flex-col justify-center items-center gap-1.5"
          onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </header>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="relative z-40 md:hidden flex flex-col px-5 py-4 gap-4 bg-[#030712]/95 backdrop-blur-xl border-b border-white/5">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}
              className="text-white/80 text-base py-1 border-b border-white/5 last:border-0">{l.label}</a>
          ))}
        </div>
      )}

      {/* ── MAIN ── */}
      <main className="relative z-10 max-w-5xl mx-auto px-5 pb-24">

        {/* ── HERO ── */}
        <section id="hero" className="pt-12 pb-16 space-y-6">
          {/* Fond semi-opaque pour lisibilité */}
          <div className="absolute inset-x-0 top-0 h-[110vh] bg-gradient-to-b from-[#030712]/70 via-[#030712]/40 to-transparent pointer-events-none -z-10" />
          {/* Badge statut */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponible pour un stage
          </div>

          <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#6EE7F7] via-white to-[#7C3AED]">
            Sécurité Informatique<br />& Développement Web
          </h2>

          <p className="text-white/60 text-base leading-relaxed max-w-xl">
            Diplômé de l'IFRI de l'Université d'Abomey-Calavi, passionné par la Cyber-Sécurité & l'IA. Je conçois et déploie des solutions pour
            sécuriser les systèmes et réseaux et les sites web.
          </p>

          <div className="flex flex-wrap gap-3">
            <a href="#projects"
              className="px-5 py-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 text-sm font-medium hover:bg-white/10 transition-all active:scale-95">
              Voir mes projets
            </a>
            <a href="/JEREMIE-LANDRY-DJOKO-CV.pdf" download
              className="px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white text-sm font-semibold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-purple-900/40">
              Télécharger CV
            </a>
          </div>

          <div className="flex flex-col gap-1 text-sm text-white/40">
            <span>📍 Abomey-Calavi, Bénin</span>
            <a href="mailto:jeremiedjoko@gmail.com" className="hover:text-white/70 transition-colors">
              ✉️ jeremiedjoko@gmail.com
            </a>
          </div>

          {/* Dernier projet card — hero uniquement */}
          <div className="mt-4 p-4 rounded-2xl bg-white/[0.04] ring-1 ring-white/8 backdrop-blur-sm">
            <p className="text-xs text-white/30 uppercase tracking-widest mb-2">Dernier projet</p>
            <p className="font-bold text-sm leading-snug">
              Système de détection & prévention d'exfiltration — Port Autonome de Cotonou
            </p>
            <p className="text-white/50 text-xs mt-1">
              Suricata IDS/IPS · ELK Stack · NFQUEUE · Linux Router
            </p>
            <div className="mt-3 flex gap-2">
              <a href="#contact" className="text-xs px-3 py-1.5 rounded-lg bg-white/5 ring-1 ring-white/10">Me contacter</a>
              <a href="#projects" className="text-xs px-3 py-1.5 rounded-lg bg-[#7C3AED]/80 text-white">Voir plus</a>
            </div>
          </div>
        </section>

        {/* ── À PROPOS ── */}
        <section id="about" className="py-12 border-t border-white/5">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED] mb-4">
            À propos
          </h3>
          <p className="text-white/60 text-sm leading-relaxed mb-6">
            Titulaire d'une licence professionnelle en sécurité informatique (IFRI-UAC, 2025),
            avec une expérience pratique acquise lors de stages et de Labs. Je maîtrise
            l'administration réseau, l'analyse de trafic, la configuration d'IDS/IPS,
            le développement d'outils en Python et Bash, l'OSINT et le développement web.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { title: "Formation", body: "Licence en Sécurité Informatique — IFRI-UAC (2025)" },
              { title: "Langages", body: "Python · Bash · C++ · HTML · CSS · PHP · SQL · MySQL" },
              { title: "Outils & OS", body: "Wireshark · Suricata · Metasploit · BurpSuite · Nmap · FortiGate · Linux" },
            ].map(c => (
              <div key={c.title} className="p-4 rounded-xl bg-white/[0.04] ring-1 ring-white/8">
                <p className="text-xs font-semibold text-white/80 mb-2">{c.title}</p>
                <p className="text-xs text-white/50 leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJETS ── */}
        <section id="projects" className="py-12 border-t border-white/5">
          <div className="flex items-baseline justify-between mb-6">
            <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">
              Projets
            </h3>
            <span className="text-xs text-white/30">Cybersécurité & Dev</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                title: "Système de détection & prévention d'exfiltration",
                desc: "Prototype pour le Port Autonome de Cotonou : détection d'exfiltration via DNS/HTTP, règles Suricata personnalisées, workflow alert-to-action.",
                tags: ["Suricata IDS/IPS", "NFQUEUE", "Linux Router"],
                btns: ["Code", "Documentation"],
              },
              {
                title: "Application mobile — Dashboard & Notifications",
                desc: "App Flutter pour recevoir des alertes FCM, tableau de bord des incidents et export PDF.",
                tags: ["Firebase FCM", "Flutter", "Export PDF"],
                btns: ["Prototype", "Screenshots"],
              },
              {
                title: "Scripts d'exfiltration (analyse pédagogique)",
                desc: "Analyse et détection de scripts d'exfiltration DNS/HTTP. Règles de détection et playbooks.",
                tags: ["Analyse trafic", "Signatures Suricata"],
                btns: ["Rapport", "Playbook"],
              },
              {
                title: "FortiGate — Filtrage logique",
                desc: "Déploiement FortiGate pour filtrer l'accès réseau au Ministère de l'Agriculture.",
                tags: ["FortiGate", "Segmentation réseau"],
                btns: ["Configuration", "Résultats"],
              },
              {
                title: "Comotorage (Flask)",
                desc: "App web de covoiturage avec matching automatique ±30 min, backend Flask/MySQL.",
                tags: ["Flask", "MySQL", "Matching auto"],
                btns: ["Code", "Demo"],
              },
              {
                title: "Projet IA — Détection d'exfiltration",
                desc: "Modèle ML pour détecter les exfiltrations DNS/HTTP en temps réel avec alertes.",
                tags: ["Machine Learning", "Détection temps réel"],
                btns: ["Code", "Résultats"],
              },
            ].map((p, i) => (
              <article key={i}
                className="group p-5 rounded-2xl bg-white/[0.04] ring-1 ring-white/8 backdrop-blur-sm hover:ring-[#7C3AED]/40 transition-all duration-300">
                <h4 className="font-semibold text-sm leading-snug mb-2">{p.title}</h4>
                <p className="text-xs text-white/50 leading-relaxed mb-3">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C3AED]/20 text-purple-300 ring-1 ring-purple-500/20">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-white/5 ring-1 ring-white/10 hover:bg-white/10 transition">{p.btns[0]}</button>
                  <button className="text-xs px-3 py-1.5 rounded-lg bg-[#7C3AED]/80 text-white hover:bg-[#7C3AED] transition">{p.btns[1]}</button>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── COMPÉTENCES ── */}
        <section id="skills" className="py-12 border-t border-white/5">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED] mb-6">
            Compétences
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 rounded-xl bg-white/[0.04] ring-1 ring-white/8">
              <p className="text-xs font-semibold text-white/80 mb-3">Cybersécurité & Réseaux</p>
              <ul className="text-xs text-white/50 space-y-1.5">
                <li>• Analyse de trafic (Wireshark, Nmap)</li>
                <li>• IDS/IPS (Suricata, Snort)</li>
                <li>• Tests d'intrusion (Metasploit, BurpSuite)</li>
                <li>• Pare-feu FortiGate & routage Linux</li>
              </ul>
            </div>
            <div className="p-4 rounded-xl bg-white/[0.04] ring-1 ring-white/8">
              <p className="text-xs font-semibold text-white/80 mb-3">Développement & Scripting</p>
              <ul className="text-xs text-white/50 space-y-1.5">
                <li>• Python, Bash, C++</li>
                <li>• Web: HTML, CSS, PHP, SQL</li>
                <li>• Automatisation et parsing de logs</li>
                <li>• IA/ML appliqué à la cybersécurité</li>
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {tags.map(t => (
              <span key={t} className="text-xs text-center py-2 px-3 rounded-xl bg-white/[0.04] ring-1 ring-white/8 text-white/60">
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* ── EXPÉRIENCES ── */}
        <section id="experience" className="py-12 border-t border-white/5">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED] mb-6">
            Expériences
          </h3>
          <div className="space-y-4">
            {[
              {
                org: "Port Autonome de Cotonou",
                role: "Stage — 3 mois",
                desc: "Conception d'une solution de prévention et détection des exfiltrations via canaux cachés. Rédaction du playbook opérationnel, règles Suricata, Stack ELK pour la corrélation.",
              },
              {
                org: "Ministère de l'Agriculture (MAEP)",
                role: "Stage — 1 mois",
                desc: "Maintenance informatique, configuration d'équipements réseau et filtrage logique via FortiGate.",
              },
            ].map((e, i) => (
              <div key={i} className="p-4 rounded-xl bg-white/[0.04] ring-1 ring-white/8">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-semibold text-sm">{e.org}</p>
                  <span className="text-[10px] text-white/40 whitespace-nowrap">{e.role}</span>
                </div>
                <p className="text-xs text-white/50 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-12 border-t border-white/5">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED] mb-4">
            Contact
          </h3>
          <p className="text-white/50 text-sm mb-5">
            Disponible pour toute opportunité de stage, projet ou collaboration.
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/60 mb-6">
            <a href="mailto:jeremiedjoko@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <span>📧</span> jeremiedjoko@gmail.com
            </a>
            <span className="flex items-center gap-2">📞 (+229) 46 94 16 09</span>
            <span className="flex items-center gap-2">📍 Abomey-Calavi, Bénin</span>
            <a href="https://www.linkedin.com/in/jeremiedjoko/" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 hover:text-white transition-colors">
              <span>💼</span> linkedin.com/in/jeremiedjoko
            </a>
          </div>

          <form ref={form} onSubmit={sendEmail}
            className="p-5 rounded-2xl bg-white/[0.04] ring-1 ring-white/8 space-y-4">
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Nom</label>
              <input name="from_name" required placeholder="Ton nom"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 text-sm placeholder:text-white/20 focus:outline-none focus:ring-[#7C3AED]/50 transition" />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Email</label>
              <input name="reply_to" type="email" required placeholder="ton@email.com"
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 text-sm placeholder:text-white/20 focus:outline-none focus:ring-[#7C3AED]/50 transition" />
            </div>
            <div>
              <label className="text-xs text-white/50 block mb-1.5">Message</label>
              <textarea name="message" required rows={4} placeholder="Écris ton message..."
                className="w-full px-3 py-2.5 rounded-xl bg-white/5 ring-1 ring-white/10 text-sm placeholder:text-white/20 focus:outline-none focus:ring-[#7C3AED]/50 transition resize-none" />
            </div>
            <button type="submit"
              className="w-full py-3 rounded-xl bg-[#7C3AED] text-white font-semibold text-sm hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-purple-900/40">
              Envoyer
            </button>
            {status && <p className="text-xs text-center text-white/50">{status}</p>}
          </form>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pt-8 pb-4 text-center text-xs text-white/20 border-t border-white/5">
          © {new Date().getFullYear()} Jérémie Landry Djoko — Analyste Cyber-Sécurité
        </footer>

      </main>

      {/* Background subtle gradient */}
      <div aria-hidden className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#030712] to-[#030712]" />
      </div>
    </div>
  );
}
