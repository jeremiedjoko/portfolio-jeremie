// Portfolio.jsx
import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import emailjs from "emailjs-com";
import PortfolioScene from "./three/PortfolioScene";




/* ===================== 3D BACKGROUND ===================== */
function ThreeSceneWrapper() {
  return (
    <div className="fixed inset-0 -z-20">
      <Canvas camera={{ position: [2.5, 2.5, 4], fov: 60 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.3} />
        <pointLight position={[-5, -5, -5]} intensity={0.6} />

        <Stars
          radius={120}
          depth={60}
          count={2500}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        <Float speed={2} rotationIntensity={1.2} floatIntensity={1.5}>
          <mesh rotation={[0.6, 0.7, 0.2]}>
            <torusKnotGeometry args={[1, 0.25, 128, 32]} />
            <meshStandardMaterial
              color="#7C3AED"
              metalness={0.75}
              roughness={0.25}
              emissive="#5B21B6"
              emissiveIntensity={0.6}
            />
          </mesh>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}

export default function Portfolio() {
  const form = useRef();
  const [status, setStatus] = useState("");

  /* ===================== EMAIL ===================== */
  const sendEmail = (e) => {
    e.preventDefault();
    setStatus("Envoi en cours...");

    emailjs
      .sendForm(
        "service_i81kced", // ton Service ID
        "template_m4eluzk", // ton Template ID
        form.current,
        "-L2XTDmSnie6p6MFc" // ta Public Key
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
        <header className="max-w-6xl mx-auto p-6">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#6EE7F7] to-[#7C3AED] shadow-xl flex items-center justify-center ring-1 ring-white/5">
                <span className="font-extrabold tracking-tight text-lg text-transparent bg-clip-text bg-gradient-to-r from-white to-[#7C3AED]">
                  JD
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold">JEREMIE LANDRY DJOKO</h1>
                <p className="text-sm text-white/60">
                  Analyste Cyber-sécurité • Blue Team & Red Team • Dév Web
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <a href="#about" className="hover:text-white/90">
                À propos
              </a>
              <a href="#projects" className="hover:text-white/90">
                Projets
              </a>
              <a href="#skills" className="hover:text-white/90">
                Compétences
              </a>
              <a href="#experience" className="hover:text-white/90">
                Expériences
              </a>
              <a href="#contact" className="hover:text-white/90">
                Contact
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
<PortfolioScene />
<div className="relative z-10 p-4">
        <main className="max-w-6xl mx-auto px-6 pb-24">

          {/* Hero Section */}
          <section
            id="hero"
            className="grid md:grid-cols-2 gap-8 items-center mt-8"
          >
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">
                Sécurité Informatique & Développement Web
              </h2>
              <p className="text-lg text-white/75">
                Je suis diplômé en licence de Sécurité Informatique (IFRI-UAC,
                2025). Passionné par la Cyber-sécurité & l'IA, l'administration
                réseau et le développement d'outils d'analyse. Je conçois des
                solutions pratiques et robustes pour sécuriser les systèmes et
                réseaux et pour faciliter la vie au quotidien.
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
                <span className="block">📍 Abomey-Calavi, Bénin</span>
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

            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0f1724] to-[#020617] shadow-2xl transform -rotate-2" />
              <div className="relative p-6 rounded-2xl ring-1 ring-white/6">
                <div className="bg-[#061728] p-4 rounded-lg border border-white/5">
                  <h3 className="text-sm text-white/60">Dernier projet</h3>
                  <h4 className="font-bold text-lg mt-2">
                    Système de détection & prévention d'exfiltration (Port
                    Autonome de Cotonou)
                  </h4>
                  <p className="mt-2 text-sm text-white/70">
                    Conception d'une solution basée sur Suricata et routeur
                    Linux pour détecter les exfiltrations DNS/HTTP, mise en
                    place d'une stratégie IDS/IPS et d'un workflow
                    alert-to-action.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <span className="py-1 px-2 rounded-md bg-white/4">Suricata</span>
                    <span className="py-1 px-2 rounded-md bg-white/4">NFQUEUE</span>
                    <span className="py-1 px-2 rounded-md bg-white/4">Linux Router</span>
                    <span className="py-1 px-2 rounded-md bg-white/4">Detection & IPS</span>
                    <span className="py-1 px-2 rounded-md bg-white/4">ELK Stack</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-3">
                  <a
                    href="#contact"
                    className="text-sm px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20"
                  >
                    Me contacter
                  </a>
                  <a
                    href="#projects"
                    className="text-sm px-3 py-2 rounded-md bg-[#7C3AED] text-black"
                  >
                    Voir plus
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-[#021024]/40 to-transparent ring-1 ring-white/6"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">
              À propos
            </h3>
            <p className="mt-4 text-white/70">
              Titulaire d'une licence professionnelle en sécurité informatique
              avec une solide formation théorique (IFRI-UAC, Licence, 2025) et
              une expérience pratique acquise lors de stages, de travaux
              pratiques ou de Labs. Je maîtrise l'administration réseau, l'analyse
              de trafic, la configuration d'IDS/IPS et le développement d'outils
              en Python et Bash, l'OSINT, la veille technologique et le
              développement web. Mon objectif : concevoir des solutions réelles
              pour protéger les infrastructures critiques.
            </p>

            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-[#071025]/60 ring-1 ring-white/4">
                <h4 className="font-semibold">Formation</h4>
                <p className="text-sm text-white/60 mt-2">
                  Licence en Sécurité Informatique — IFRI-UAC (2025)
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#071025]/60 ring-1 ring-white/4">
                <h4 className="font-semibold">Langages</h4>
                <p className="text-sm text-white/60 mt-2">
                  Python, Bash, C++, HTML, CSS, PHP, SQL, MySQL
                </p>
              </div>
              <div className="p-4 rounded-lg bg-[#071025]/60 ring-1 ring-white/4">
                <h4 className="font-semibold">Outils & OS</h4>
                <p className="text-sm text-white/60 mt-2">
                  Wireshark, Metasploit, Suricata, BurpSuite, Nmap, Snort,
                  FortiGate, React Js, Flask , Bootstrap, Git /
                  GitHub, Linux, Windows
                </p>
              </div>
            </div>
          </section>
          {/* Projects Section */}
          <section id="projects" className="mt-12">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">
                Projets
              </h3>
              <p className="text-sm text-white/60"> Orientés CyberSécurité & Dev</p>
            </div>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              {/* Card 1 */}
              <article className="p-5 rounded-xl bg-[#061328]/60 ring-1 ring-white/6 backdrop-blur-md transform hover:scale-[1.01] transition">
                <h4 className="font-semibold text-lg">
                  Système de détection & prévention d'exfiltration
                </h4>
                <p className="text-sm text-white/70 mt-2">
                  Conception et prototype pour le Port Autonome de Cotonou :
                  détection d'exfiltration via DNS/HTTP, règles Suricata personnalisées,
                  workflow alert-to-action et tableau de bord de monitoring.
                </p>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Suricata en mode IDS/IPS (NFQUEUE)</li>
                  <li>Routage et filtrage sur routeur Linux</li>
                  <li>Analyse de trafic et playbook d'incident</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a className="px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20">Code</a>
                  <a className="px-3 py-2 rounded-md bg-[#7C3AED] text-black">Documentation</a>
                </div>
              </article>

              {/* Card 2 */}
              <article className="p-5 rounded-xl bg-[#061328]/60 ring-1 ring-white/6 backdrop-blur-md transform hover:scale-[1.01] transition">
                <h4 className="font-semibold text-lg">
                  Application mobile - Dashboard & Notifications
                </h4>
                <p className="text-sm text-white/70 mt-2">
                  Prototype d'application mobile (Flutter) pour recevoir des alertes via FCM,
                  afficher un tableau de bord des incidents et exporter des rapports PDF.
                </p>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Firebase Cloud Messaging (FCM)</li>
                  <li>Dashboard des alertes (par jour / semaine / mois)</li>
                  <li>Export PDF des incidents</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a className="px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20">Prototype</a>
                  <a className="px-3 py-2 rounded-md bg-[#7C3AED] text-black">Screenshots</a>
                </div>
              </article>

              {/* Card 3 */}
              <article className="p-5 rounded-xl bg-[#061328]/60 ring-1 ring-white/6 backdrop-blur-md transform hover:scale-[1.01] transition">
                <h4 className="font-semibold text-lg">Scripts d'exfiltration (analyse pédagogique)</h4>
                <p className="text-sm text-white/70 mt-2">
                  Analyse et détection de scripts d'exfiltration sur DNS/HTTP.
                  Développement de règles de détection et playbooks pour bloquer les canaux cachés.
                </p>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Analyse comportementale du trafic</li>
                  <li>Règles Suricata et signatures personnalisées</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a className="px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20">Rapport</a>
                  <a className="px-3 py-2 rounded-md bg-[#7C3AED] text-black">Playbook</a>
                </div>
              </article>

              {/* Card 4 */}
              <article className="p-5 rounded-xl bg-[#061328]/60 ring-1 ring-white/6 backdrop-blur-md transform hover:scale-[1.01] transition">
                <h4 className="font-semibold text-lg">FortiGate - Filtrage logique</h4>
                <p className="text-sm text-white/70 mt-2">
                  Mise en place d'un FortiGate (logique) pour filtrer l'accès aux sites
                  sur le réseau du Ministère de l'Agriculture : journaux, règles et segmentation simple.
                </p>
                <div className="mt-4 flex gap-3">
                  <a className="px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20">Configuration</a>
                  <a className="px-3 py-2 rounded-md bg-[#7C3AED] text-black">Résultats</a>
                </div>
              </article>

              {/* Card 5 */}
              <article className="p-5 rounded-xl bg-[#061328]/60 ring-1 ring-white/6 backdrop-blur-md transform hover:scale-[1.01] transition">
                <h4 className="font-semibold text-lg">Projet académique - Comotorage (Flask)</h4>
                <p className="text-sm text-white/70 mt-2">
                  Application web de covoiturage développée avec Flask.
                  Permet aux utilisateurs de proposer ou rechercher des trajets
                  et reçoit des suggestions de correspondance automatiquement.
                </p>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Matching automatique des trajets avec tolérance ±30 minutes</li>
                  <li>Backend Flask avec MySQL pour gestion des utilisateurs et trajets</li>
                  <li>Interface web responsive pour consulter les correspondances</li>
                  <li>Notifications et suivi des trajets</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a className="px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20">Code</a>
                  <a className="px-3 py-2 rounded-md bg-[#7C3AED] text-black">Demo / Documentation</a>
                </div>
              </article>

              {/* Card 6 */}
              <article className="p-5 rounded-xl bg-[#061328]/60 ring-1 ring-white/6 backdrop-blur-md transform hover:scale-[1.01] transition">
                <h4 className="font-semibold text-lg">Projet IA - Détection d'exfiltration de données</h4>
                <p className="text-sm text-white/70 mt-2">
                  Développement et entraînement d’un modèle d’intelligence artificielle
                  pour détecter les exfiltrations de données sur des canaux cachés (DNS/HTTP).
                  Permet de générer des alertes en temps réel et d’analyser le trafic réseau.
                </p>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Prétraitement et analyse de données réseau</li>
                  <li>Entraînement du modèle IA et évaluation de la précision</li>
                  <li>Détection en temps réel des comportements anormaux</li>
                  <li>Intégration avec workflow de monitoring</li>
                </ul>
                <div className="mt-4 flex gap-3">
                  <a className="px-3 py-2 rounded-md bg-[#0f1724]/60 ring-1 ring-[#6EE7F7]/20">Code</a>
                  <a className="px-3 py-2 rounded-md bg-[#7C3AED] text-black">Rapport / Résultats</a>
                </div>
              </article>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="mt-12 p-6 rounded-2xl bg-[#02061a]/40 ring-1 ring-white/6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">Compétences</h3>
            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold">Cybersécurité & Réseaux</h4>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Analyse de trafic (Wireshark, Nmap)</li>
                  <li>IDS/IPS (Suricata, Snort)</li>
                  <li>Tests d'intrusion (Metasploit, BurpSuite)</li>
                  <li>Configuration de pare-feu (FortiGate) & routage Linux</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Développement & Scripting</h4>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside">
                  <li>Python, Bash, C++</li>
                  <li>Web: HTML, CSS, PHP, SQL</li>
                  <li>Automatisation et parsing de logs</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
              {["Suricata","Wireshark","Nmap","Metasploit","BurpSuite","Linux","Python","Bash"].map((tag) => (
                <span key={tag} className="inline-block py-1 px-3 rounded-full bg-white/5 text-xs">{tag}</span>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="mt-12">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">Expériences</h3>
            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg bg-[#071025]/60 ring-1 ring-white/6">
                <h4 className="font-semibold">Port Autonome de Cotonou — Stage (3 mois)</h4>
                <p className="text-sm text-white/70 mt-2">Conception d'une solution de prévention et détection des exfiltrations via canaux cachés. Rédaction du playbook opérationnel, règles Suricata et tests de détection, Mise en place de la Stack ELK  pour la corrélation. </p>
              </div>
              <div className="p-4 rounded-lg bg-[#071025]/60 ring-1 ring-white/6">
                <h4 className="font-semibold">Ministère de l'Agriculture — Stage (1 mois)</h4>
                 <p className="text-sm text-white/70 mt-2">Maintenance informatique, configuration d'équipements réseau et mise en place d'un filtrage logique via FortiGate.</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="mt-12 p-6 rounded-2xl bg-[#02061a]/40 ring-1 ring-white/6">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6EE7F7] to-[#7C3AED]">Contact</h3>
            <p className="mt-4 text-white/70">Vous pouvez me contacter pour toute opportunité de stage, projet ou collaboration :</p>
            <ul className="mt-3 text-white/60 space-y-1">
              <li>📧 Email : <a href="mailto:jeremiedjoko@gmail.com" className="underline">jeremiedjoko@gmail.com</a></li>
              <li>📞 Téléphone : (+229) 46 94 16 09</li>
              <li>📍 Abomey-Calavi, Bénin</li>
              <li>💼 LinkedIn : <a href="https://www.linkedin.com/in/jeremiedjoko/" className="underline" target="_blank">linkedin.com/in/jeremiedjoko</a></li>
            </ul>

            {/* Formulaire EmailJS */}
            <form ref={form} onSubmit={sendEmail} className="mt-6 p-4 rounded-lg bg-[#071025]/60 ring-1 ring-white/6">
              <label className="block text-sm text-white/70">Nom</label>
              <input name="from_name" className="mt-2 w-full p-2 rounded-md bg-transparent ring-1 ring-white/6" placeholder="Ton nom" required />

              <label className="block text-sm text-white/70 mt-3">Email</label>
              <input name="reply_to" type="email" className="mt-2 w-full p-2 rounded-md bg-transparent ring-1 ring-white/6" placeholder="ton@email.com" required />

              <label className="block text-sm text-white/70 mt-3">Message</label>
              <textarea name="message" className="mt-2 w-full p-2 rounded-md bg-transparent ring-1 ring-white/6" rows={4} placeholder="Écris ton message..." required />

              <div className="mt-4">
                <button type="submit" className="px-4 py-2 rounded-md bg-[#7C3AED] text-black">Envoyer</button>
              </div>

              {status && <p className="mt-2 text-sm text-white/70">{status}</p>}
            </form>
          </section>


          {/* Footer */}
          <footer className="mt-16 text-center text-sm text-white/50 pb-12">
            © {new Date().getFullYear()} Jérémie Landry Djoko — Diplômé en Licence de Sécurité Informatique
          </footer>
        </main>
</div>
        {/* Background grid neon effect */}
        <div aria-hidden className="fixed inset-0 pointer-events-none -z-10">
          <svg className="w-full h-full opacity-5" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0%" stopColor="#6EE7F7" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#g1)" />
          </svg>
        </div>
      </div>
    </>
  );
}

