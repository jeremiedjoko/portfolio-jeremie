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
      .then(
        () => {
          setStatus("Message envoyé avec succès ✅");
          form.current.reset();
        },
        () => {
          setStatus("Erreur lors de l'envoi ❌");
        }
      );
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
      <header className="relative z-50 px-5 py-4 flex items-center justify-between backdrop-blur-sm border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#6EE7F7] to-[#7C3AED] flex items-center justify-center shadow-lg shadow-purple-900/40">
            <span className="font-black text-sm text-white">JD</span>
          </div>
          <div>
            <p className="font-bold text-sm leading-tight tracking-wide">JEREMIE LANDRY DJOKO</p>
            <p className="text-[10px] text-white/40 leading-tight">Analyste Cyber-sécurité • Blue Team & Red Team</p>
          </div>
        </div>

        <nav className="hidden md:flex gap-6 text-sm text-white/60">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</a>
          ))}
        </nav>

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

      <main className="relative z-10 max-w-5xl mx-auto px-5 pb-24">

        {/* ── HERO ── */}
        <section id="hero" className="pt-12 pb-16 space-y-6">
          <div className="absolute inset-x-0 top-0 h-[110vh] bg-gradient-to-b from-[#030712]/70 via-[#030712]/40 to-transparent pointer-events-none -z-10" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 text-emerald-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Disponible pour un stage
          </div>

          <h2 className="text-[clamp(2rem,8vw,3.5rem)] font-black leading-[1.05] tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-[#6EE7F7] via-white to-[#7C3AED]">
            Sécurité Informatique<br />& Développement Web
          </h2>

          <p className="text-white/60 text-base leading-relaxed max-w-xl">
            Diplômé de l'IFRI de l'Université d'Abomey-Calavi...
          </p>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="py-12 border-t border-white/5">
          <div className="relative rounded-2xl p-4 bg-[#030712]/75 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">À propos</h3>

            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Titulaire d'une licence...
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { title: "Formation", body: "Licence IFRI-UAC (2025)" },
                { title: "Langages", body: "Python · Bash · C++ · HTML · CSS · PHP · SQL · MySQL" },
                { title: "Outils & OS", body: "Wireshark · Suricata · Metasploit · BurpSuite · Nmap" },
              ].map(c => (
                <div key={c.title} className="p-4 rounded-xl bg-white/[0.04] ring-1 ring-white/8">
                  <p className="text-xs font-semibold mb-2">{c.title}</p>
                  <p className="text-xs text-white/50">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section id="projects" className="py-12 border-t border-white/5">
          <div className="relative rounded-2xl p-4 bg-[#030712]/75 backdrop-blur-sm">

            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-bold">Projets</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Exfiltration Detection", desc: "Suricata + ELK", tags: ["Suricata"] },
              ].map((p, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white/[0.04]">
                  <h4 className="font-semibold">{p.title}</h4>
                  <p className="text-xs text-white/50">{p.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── SKILLS ── */}
        <section id="skills" className="py-12 border-t border-white/5">
          <div className="relative rounded-2xl p-4 bg-[#030712]/75 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-6">Compétences</h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {tags.map(t => (
                <span key={t} className="text-xs text-center py-2 px-3 rounded-xl bg-white/[0.04]">
                  {t}
                </span>
              ))}
            </div>

          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section id="experience" className="py-12 border-t border-white/5">
          <div className="relative rounded-2xl p-4 bg-[#030712]/75 backdrop-blur-sm">

            <h3 className="text-xl font-bold mb-6">Expériences</h3>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/[0.04]">
                Port Autonome de Cotonou
              </div>
            </div>

          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="py-12 border-t border-white/5">
          <div className="relative rounded-2xl p-4 bg-[#030712]/75 backdrop-blur-sm">

            <h3 className="text-xl font-bold mb-4">Contact</h3>

            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              <input name="from_name" className="w-full p-2 bg-white/5 rounded" />
              <input name="reply_to" className="w-full p-2 bg-white/5 rounded" />
              <textarea name="message" className="w-full p-2 bg-white/5 rounded" />
              <button className="w-full py-3 bg-purple-600 rounded">Envoyer</button>
              {status && <p className="text-xs text-center">{status}</p>}
            </form>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-8 pb-4 text-center text-xs text-white/20 border-t border-white/5">
          © {new Date().getFullYear()} Jérémie Djoko
        </footer>

      </main>

      <div className="fixed inset-0 pointer-events-none -z-10 bg-gradient-to-b from-[#0a0a1a] to-[#030712]" />
    </div>
  );
}
