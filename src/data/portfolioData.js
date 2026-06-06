import { GITHUB_URL } from "../styles/theme";

export const PROFILE = {
  name: "Jérémie Landry Djoko",
  title: "Cyber Security Engineer & Full-Stack Developer",
  tagline: "Cybersecurity · Web Development · UI/UX Design",
  status: "Available for internships and roles",
  location: "Abomey-Calavi, Benin",
  email: "jeremiedjoko@gmail.com",
  phone: "(+229) 46 94 16 09",
  linkedin: "https://www.linkedin.com/in/jeremiedjoko/",
  github: GITHUB_URL,
  cvPath: "/JEREMIE-LANDRY-DJOKO-CV.pdf",
};

export const SKILLS = {
  security: [
    { label: "Suricata IDS/IPS", value: 90 },
    { label: "Wireshark / Traffic Analysis", value: 92 },
    { label: "ELK Stack", value: 84 },
    { label: "Metasploit / Pentest", value: 78 },
    { label: "BurpSuite / Web Security", value: 76 },
    { label: "FortiGate / Firewall", value: 80 },
    { label: "Nmap / Reconnaissance", value: 88 },
    { label: "OSINT & Threat Intel", value: 74 },
  ],
  dev: [
    { label: "Python / Scripting", value: 88 },
    { label: "React.js / Three.js", value: 82 },
    { label: "Flask / Django", value: 78 },
    { label: "HTML · CSS · JavaScript", value: 90 },
    { label: "PHP / Laravel", value: 72 },
    { label: "Flutter / Dart", value: 70 },
    { label: "MySQL / PostgreSQL", value: 80 },
    { label: "Linux / Bash / Admin", value: 90 },
  ],
  design: [
    { label: "Figma / UI Prototyping", value: 78 },
    { label: "Design System & Tokens", value: 76 },
    { label: "Visual Identity / Branding", value: 72 },
    { label: "Responsive / Mobile First", value: 84 },
  ],
};

export const TOOLS = [
  "Suricata", "Wireshark", "Nmap", "Metasploit", "BurpSuite", "ELK Stack", "OWAPS", "OSINT",
  "Python", "Bash", "React", "Three.js", "Flask", "Flutter", "Figma",
  "FortiGate", "NFQUEUE", "Git", "Docker", "MySQL", "Linux",
  "Kali Linux", "Framer Motion", "Spline 3D", "PHP", "Laravel",
];

const PROJECTS_EN = [
  {
    id: "01", category: "CYBERSECURITY", title: "Data Exfiltration Detection & Prevention System",
    subtitle: "Port Autonome de Cotonou · Bachelor Thesis · 2025",
    problem: "The PAC network needed real-time visibility into data leaving the perimeter across multiple protocols.",
    solution: "Built a custom IDS/IPS with Suricata, ELK, and NFQUEUE blocking on a 3-VM lab (Kali, Windows 11, Ubuntu).",
    result: "97%+ detection accuracy across 6 exfiltration channels, deployed and validated on live infrastructure.",
    tags: ["Suricata IDS/IPS", "ELK Stack", "NFQUEUE", "Python", "Wireshark"],
    status: "Deployed", statusColor: "#4ade80", accent: "#7C3AED", highlight: true, github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "02", category: "CYBERSECURITY · AI", title: "ML Model for DNS/HTTP Exfiltration Detection",
    subtitle: "Machine Learning · 2025",
    problem: "Signature-based rules alone missed subtle DNS and HTTP covert channels in traffic captures.",
    solution: "Trained a supervised classifier with feature engineering on Wireshark exports and integrated it into the Suricata pipeline.",
    result: "94% accuracy on the test set with real-time suspicion scoring in production-style runs.",
    tags: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    status: "Prototype", statusColor: "#60a5fa", accent: "#6EE7F7", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "03", category: "MOBILE DEVELOPMENT", title: "CyberAlert · Real-Time IDS Mobile Dashboard",
    subtitle: "Flutter · Firebase FCM · 2025",
    problem: "Security teams needed IDS alerts on the go without logging into the SOC console.",
    solution: "Designed the UI in Figma, then built a cross-platform app with push notifications, severity filters, and PDF exports.",
    result: "Full incident workflow on Android and iOS with Firebase Cloud Messaging and Firestore sync.",
    tags: ["Flutter", "Dart", "Firebase FCM", "Figma"],
    status: "Prototype", statusColor: "#60a5fa", accent: "#a78bfa", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "04", category: "WEB DEVELOPMENT", title: "Comotorage · Carpooling Platform",
    subtitle: "Flask · MySQL · MVC · 2024",
    problem: "Users needed reliable ride matching with trust and security built into the platform.",
    solution: "Delivered a Flask MVC app with automatic matching (±30 min), ratings, CSRF/XSS protection, and secure sessions.",
    result: "Production-ready carpooling flow with clean architecture and hardened authentication.",
    tags: ["Flask", "MySQL", "Python", "JavaScript"],
    status: "Complete", statusColor: "#4ade80", accent: "#34d399", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "05", category: "CYBERSECURITY · WEB", title: "SecureAPI · REST API Security Audit & Hardening",
    subtitle: "OWASP Top 10 · Pentest · 2024",
    problem: "A REST API exposed critical flaws: SQLi, IDOR, weak auth, and missing rate limits.",
    solution: "Ran a full OWASP-aligned pentest, scored findings with CVSS, then patched JWT handling, validation, and logging.",
    result: "Zero critical vulnerabilities remaining after remediation.",
    tags: ["BurpSuite", "OWASP Top 10", "Python", "JWT"],
    status: "Complete", statusColor: "#4ade80", accent: "#f97316", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "06", category: "UI/UX · 3D WEB", title: "3D Premium Portfolio · This Website",
    subtitle: "React · Three.js · Framer Motion · Spline · 2025",
    problem: "I needed a portfolio that reflects both my security background and my eye for interface design.",
    solution: "Designed the system in Figma, then built this site with Spline 3D, scroll-driven motion, and modular React sections.",
    result: "Immersive, bilingual portfolio with lazy loading and performance-focused delivery.",
    tags: ["React", "Three.js", "Framer Motion", "Spline 3D", "Figma"],
    status: "Deployed", statusColor: "#4ade80", accent: "#ec4899", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "07", category: "CYBERSECURITY · SCRIPTING", title: "NetScan Pro · Automated Network Reconnaissance",
    subtitle: "Python · Nmap · OSINT · 2024",
    problem: "Manual recon during audits was slow and reports were inconsistent across engagements.",
    solution: "Built a Python CLI combining Nmap, WHOIS, geolocation, and auto-generated HTML reports with risk scoring.",
    result: "Used in CTF events and internal audits with repeatable, shareable output.",
    tags: ["Python", "Nmap", "OSINT", "Bash"],
    status: "Complete", statusColor: "#4ade80", accent: "#06b6d4", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "08", category: "UI/UX · BRANDING", title: "AfriSecure · SaaS Cybersecurity UI/UX Design",
    subtitle: "Figma · Design System · 2025",
    problem: "An African cybersecurity startup needed a credible brand and landing experience before launch.",
    solution: "Ran user research, wireframes, a full design system, and high-fidelity mockups with GSAP-ready handoff.",
    result: "Complete visual identity and responsive HTML/CSS/JS prototype ready for development.",
    tags: ["Figma", "UI Design", "Design System", "GSAP"],
    status: "Complete", statusColor: "#4ade80", accent: "#7C3AED", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "09", category: "CYBERSECURITY · NLP", title: "PhishGuard · Behavioral Phishing Detector",
    subtitle: "Python · NLP · 2024",
    problem: "Simulated phishing campaigns were slipping through basic mail filters in the lab environment.",
    solution: "Built heuristics plus NLP tokenization and domain reputation checks as a pre-filter on a local mail server.",
    result: "100% detection on lab simulations with under 2% false positives.",
    tags: ["Python", "NLP", "Email Security", "Heuristics"],
    status: "Prototype", statusColor: "#60a5fa", accent: "#f43f5e", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "10", category: "SIEM · HOME LAB", title: "HomeSOC · Personal Security Operations Center",
    subtitle: "Raspberry Pi · ELK Stack · 2024",
    problem: "I wanted hands-on SOC experience without enterprise hardware budgets.",
    solution: "Deployed ELK on a Raspberry Pi 4 with Filebeat ingestion, Kibana dashboards, Suricata rules, and automated alerts.",
    result: "Fully documented home SOC intended as an open-source reference for learners.",
    tags: ["Raspberry Pi", "ELK Stack", "Kibana", "SIEM"],
    status: "Complete", statusColor: "#4ade80", accent: "#22c55e", github: GITHUB_URL, demo: GITHUB_URL,
  }
];

const PROJECTS_FR = [
  {
    id: "01", category: "CYBERSÉCURITÉ", title: "Système de Détection et Prévention d'Exfiltration",
    subtitle: "Port Autonome de Cotonou · Mémoire de Licence · 2025",
    problem: "Le réseau du PAC nécessitait une visibilité en temps réel sur les données quittant le périmètre via de multiples protocoles.",
    solution: "Déploiement d'un IDS/IPS avec Suricata, ELK et blocage NFQUEUE sur un lab de 3 VM (Kali, Windows 11, Ubuntu).",
    result: "Précision de détection >97% sur 6 canaux d'exfiltration, déployé et validé sur l'infrastructure de production.",
    tags: ["Suricata IDS/IPS", "ELK Stack", "NFQUEUE", "Python", "Wireshark"],
    status: "Déployé", statusColor: "#4ade80", accent: "#7C3AED", highlight: true, github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "02", category: "CYBERSÉCURITÉ · IA", title: "Modèle ML pour la détection d'exfiltration DNS/HTTP",
    subtitle: "Machine Learning · 2025",
    problem: "Les règles basées sur les signatures manquaient les canaux cachés subtils DNS et HTTP dans les captures.",
    solution: "Entraînement d'un classificateur supervisé avec ingénierie des caractéristiques sur les exports Wireshark.",
    result: "Précision de 94% sur l'ensemble de test avec un score de suspicion en temps réel en production.",
    tags: ["Python", "Scikit-learn", "Pandas", "Machine Learning"],
    status: "Prototype", statusColor: "#60a5fa", accent: "#6EE7F7", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "03", category: "DÉVELOPPEMENT MOBILE", title: "CyberAlert · Dashboard Mobile IDS en Temps Réel",
    subtitle: "Flutter · Firebase FCM · 2025",
    problem: "Les équipes de sécurité avaient besoin d'alertes IDS en mobilité sans se connecter au SOC.",
    solution: "Design de l'interface sur Figma, puis création de l'app avec notifications push et export PDF.",
    result: "Flux de gestion d'incidents complet sur Android et iOS avec synchronisation Firestore.",
    tags: ["Flutter", "Dart", "Firebase FCM", "Figma"],
    status: "Prototype", statusColor: "#60a5fa", accent: "#a78bfa", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "04", category: "DÉVELOPPEMENT WEB", title: "Comotorage · Plateforme de Covoiturage",
    subtitle: "Flask · MySQL · MVC · 2024",
    problem: "Les utilisateurs avaient besoin d'une plateforme de covoiturage fiable et sécurisée.",
    solution: "Création d'une application Flask MVC avec matching automatique, notes, protection CSRF/XSS et sessions.",
    result: "Plateforme prête pour la production avec architecture propre et authentification renforcée.",
    tags: ["Flask", "MySQL", "Python", "JavaScript"],
    status: "Terminé", statusColor: "#4ade80", accent: "#34d399", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "05", category: "CYBERSÉCURITÉ · WEB", title: "SecureAPI · Audit et Sécurisation d'API REST",
    subtitle: "OWASP Top 10 · Pentest · 2024",
    problem: "Une API exposait des failles critiques : SQLi, IDOR, authentification faible.",
    solution: "Réalisation d'un pentest aligné OWASP, scoring CVSS, et correction de la gestion JWT.",
    result: "Zéro vulnérabilité critique restante après correction des failles.",
    tags: ["BurpSuite", "OWASP Top 10", "Python", "JWT"],
    status: "Terminé", statusColor: "#4ade80", accent: "#f97316", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "06", category: "UI/UX · WEB 3D", title: "Portfolio Premium 3D · Ce site",
    subtitle: "React · Three.js · Framer Motion · Spline · 2025",
    problem: "Besoin d'un portfolio reflétant mon profil cybersécurité et mon œil pour le design d'interface.",
    solution: "Design sur Figma, puis création de ce site bilingue avec Spline 3D et animations au scroll.",
    result: "Portfolio immersif, avec chargement asynchrone et optimisé pour les performances.",
    tags: ["React", "Three.js", "Framer Motion", "Spline 3D", "Figma"],
    status: "Déployé", statusColor: "#4ade80", accent: "#ec4899", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "07", category: "CYBERSÉCURITÉ · SCRIPTING", title: "NetScan Pro · Reconnaissance Réseau Automatisée",
    subtitle: "Python · Nmap · OSINT · 2024",
    problem: "La reconnaissance manuelle lors des audits était lente et les rapports incohérents.",
    solution: "Création d'un outil CLI Python combinant Nmap, WHOIS et génération de rapports HTML avec scoring.",
    result: "Outil utilisé en CTF et audits internes avec des résultats rapides et reproductibles.",
    tags: ["Python", "Nmap", "OSINT", "Bash"],
    status: "Terminé", statusColor: "#4ade80", accent: "#06b6d4", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "08", category: "UI/UX · BRANDING", title: "AfriSecure · Design UI/UX SaaS Cybersécurité",
    subtitle: "Figma · Design System · 2025",
    problem: "Une startup de cybersécurité avait besoin d'une identité visuelle forte avant son lancement.",
    solution: "Recherche utilisateur, wireframes, design system et maquettes haute fidélité avec GSAP.",
    result: "Identité visuelle complète et prototype HTML/CSS/JS responsive.",
    tags: ["Figma", "UI Design", "Design System", "GSAP"],
    status: "Terminé", statusColor: "#4ade80", accent: "#7C3AED", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "09", category: "CYBERSÉCURITÉ · NLP", title: "PhishGuard · Détecteur Comportemental de Phishing",
    subtitle: "Python · NLP · 2024",
    problem: "Les campagnes de phishing simulées passaient à travers les filtres mail de base du lab.",
    solution: "Création de heuristiques et de tokenisation NLP avec vérification de réputation de domaine.",
    result: "Détection à 100% sur les simulations avec moins de 2% de faux positifs.",
    tags: ["Python", "NLP", "Email Security", "Heuristics"],
    status: "Prototype", statusColor: "#60a5fa", accent: "#f43f5e", github: GITHUB_URL, demo: GITHUB_URL,
  },
  {
    id: "10", category: "SIEM · HOME LAB", title: "HomeSOC · Centre d'Opérations de Sécurité",
    subtitle: "Raspberry Pi · ELK Stack · 2024",
    problem: "Besoin d'expérience pratique SOC sans le budget matériel d'entreprise.",
    solution: "Déploiement de ELK sur un Raspberry Pi 4 avec ingestion Filebeat, dashboards Kibana, et Suricata.",
    result: "Home SOC entièrement documenté pour servir de référence open-source.",
    tags: ["Raspberry Pi", "ELK Stack", "Kibana", "SIEM"],
    status: "Terminé", statusColor: "#4ade80", accent: "#22c55e", github: GITHUB_URL, demo: GITHUB_URL,
  }
];

export const PROJECTS = {
  en: PROJECTS_EN,
  fr: PROJECTS_FR
};

const EXPERIENCES_EN = [
  {
    org: "Port Autonome de Cotonou",
    role: "Network Security Engineer Intern",
    period: "2025 · 3 months",
    supervisor: "Supervisor: M. Symphorien DOFFON · Co-director: Ing. Hervé AKAKPO",
    desc: "Mapped the network, identified exfiltration paths, deployed a custom IDS/IPS in production, drafted security policy, and trained IT staff on monitoring and incident response.",
    tags: ["Suricata", "ELK Stack", "Python", "NFQUEUE", "Linux"],
    accent: "#7C3AED",
  },
  {
    org: "Ministry of Agriculture (MAEP)",
    role: "Systems & Network Technician Intern",
    period: "2024 · 1 month",
    supervisor: "Directorate of Information Systems",
    desc: "Maintained workstations, configured switches and routers, deployed FortiGate rules, resolved network incidents, and produced technical documentation for end users.",
    tags: ["FortiGate", "Networking", "Windows Server", "Documentation"],
    accent: "#06b6d4",
  },
];

const EXPERIENCES_FR = [
  {
    org: "Port Autonome de Cotonou",
    role: "Stagiaire Ingénieur Sécurité Réseau",
    period: "2025 · 3 mois",
    supervisor: "Superviseur: M. Symphorien DOFFON · Co-directeur: Ing. Hervé AKAKPO",
    desc: "Cartographie du réseau, identification des voies d'exfiltration, déploiement d'un IDS/IPS personnalisé en production, rédaction de la politique de sécurité et formation de l'équipe informatique.",
    tags: ["Suricata", "ELK Stack", "Python", "NFQUEUE", "Linux"],
    accent: "#7C3AED",
  },
  {
    org: "Ministère de l'Agriculture (MAEP)",
    role: "Stagiaire Technicien Systèmes et Réseaux",
    period: "2024 · 1 mois",
    supervisor: "Direction des Systèmes d'Information",
    desc: "Maintenance des postes de travail, configuration des routeurs et switchs, déploiement de règles FortiGate, résolution d'incidents réseau et production de documentation technique.",
    tags: ["FortiGate", "Networking", "Windows Server", "Documentation"],
    accent: "#06b6d4",
  },
];

export const EXPERIENCES = {
  en: EXPERIENCES_EN,
  fr: EXPERIENCES_FR
};

export const STATS = [
  { num: "10+", label: "Projects delivered" },
  { num: "6", label: "Exfiltration protocols covered" },
  { num: "94%", label: "ML detection accuracy" },
  { num: "2", label: "Field internships" },
];
