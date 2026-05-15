// Portfolio.jsx
import React, { useRef, useState } from "react";
//import { Canvas } from "@react-three/fiber";
//import { OrbitControls, Stars, Float } from "@react-three/drei";
import emailjs from "emailjs-com";
import PortfolioScene from "./three/PortfolioScene";

export default function Portfolio() {
  const form = useRef();
  const [status, setStatus] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  /* ===================== EMAIL ===================== */
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    emailjs
      .sendForm(
        "service_i81kced",
        "template_m4eluzk",
        form.current,
        "-L2XTDmSnie6p6MFc"
      )
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

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#020617] to-[#040414] text-gray-100 font-sans">
        
        {/* Header / Navbar */}
        <header className="relative z-50 max-w-6xl mx-auto p-6">
          <nav className="flex items-center justify-between">
            
            {/* Logo + Nom */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6EE7F7] to-[#7C3AED] shadow-xl flex items-center justify-center ring-1 ring-white/5">
                <span className="font-extrabold tracking-tight text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-[#7C3AED]">
                  JD
                </span>
              </div>

              <div>
                <h1 className="text-xl font-semibold">
                  JEREMIE LANDRY DJOKO
                </h1>

                <p className="text-sm text-white/60">
                  Analyste Cyber-sécurité • Blue Team & Red Team • Dév Web
                </p>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex flex-row items-center gap-4 text-sm">
              <a href="#about" className="text-white hover:text-white/90">
                À propos
              </a>

              <a href="#projects" className="text-white hover:text-white/90">
                Projets
              </a>

              <a href="#skills" className="text-white hover:text-white/90">
                Compétences
              </a>

              <a href="#experience" className="text-white hover:text-white/90">
                Expériences
              </a>

              <a href="#contact" className="text-white hover:text-white/90">
                Contact
              </a>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </nav>

          {/* Mobile menu dropdown */}
          {menuOpen && (
            <div className="relative z-50 md:hidden mt-3 flex flex-col gap-3 text-sm pb-2">
              <a
                href="#about"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-white/90"
              >
                À propos
              </a>

              <a
                href="#projects"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-white/90"
              >
                Projets
              </a>

              <a
                href="#skills"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-white/90"
              >
                Compétences
              </a>

              <a
                href="#experience"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-white/90"
              >
                Expériences
              </a>

              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="text-white hover:text-white/90"
              >
                Contact
              </a>
            </div>
          )}
        </header>

        {/* SCENE 3D */}
        <div className="absolute inset-0 -z-10">
          <PortfolioScene />
        </div>

        {/* Main Content */}
        <div className="relative z-10 p-4">
          <div className="flex flex-wrap items-center gap-4">
            <main className="max-w-6xl mx-auto px-6 pb-24">

              {/* HERO */}
              <section
                id="hero"
                className="grid md:grid-cols-2 gap-8 items-center mt-8"
              >
                <div className="space-y-6">
                  <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">
                    Sécurité Informatique & Développement Web
                  </h2>

                  <p className="text-lg text-white/75">
                    Je suis diplômé d'une licence en Sécurité Informatique
                    (IFRI-UAC, 2026). Passionné par la Cyber-Sécurité & l'IA,
                    l'administration réseau et le développement d'outils
                    d'analyse.
                  </p>

                  <div className="flex gap-4">
                    <a
                      href="#projects"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20 hover:scale-[1.02] transition"
                    >
                      Voir mes projets
                    </a>

                    <a
                      href="/JEREMIE-LANDRY-DJOKO-CV.pdf"
                      download
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#7C3AED] text-black font-semibold hover:brightness-110 transition"
                    >
                      Télécharger CV
                    </a>
                  </div>

                  <div className="mt-4 text-sm text-white/60">
                    <span className="block">
                      📍 Abomey-Calavi, Bénin
                    </span>

                    <span className="block">
                      ✉️{" "}
                      <a
                        href="mailto:jeremiedjoko@gmail.com"
                        className="underline"
                      >
                        jeremiedjoko@gmail.com
                      </a>{" "}
                      • 📞 (+229) 46 94 16 09
                    </span>
                  </div>
                </div>
              </section>

              {/* FOOTER */}
              <footer className="mt-16 text-center text-sm text-white/50 pb-12">
                © {new Date().getFullYear()} Jérémie Landry Djoko —
                Analyste Cyber-Sécurité
              </footer>

            </main>
          </div>
        </div>

        {/* Background */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none -z-10"
        >
          <svg
            className="w-full h-full opacity-5"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop
                  offset="0%"
                  stopColor="#6EE7F7"
                  stopOpacity="0.15"
                />

                <stop
                  offset="100%"
                  stopColor="#7C3AED"
                  stopOpacity="0.15"
                />
              </linearGradient>
            </defs>

            <rect width="100%" height="100%" fill="url(#g1)" />
          </svg>
        </div>
      </div>
    </>
  );
}
