import { useLang } from "../context/LangContext";
import { t } from "../data/translations";
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import { useIsMobile } from "../hooks/useMediaQuery";
import { colors } from "../styles/theme";

function useInView(threshold = 0.15) {
  const ref = useRef();
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

export default function ContactSection() {
  const { lang } = useLang();
  const tr = t[lang].contact;
  const isMobile = useIsMobile();
  const form = useRef();
  const [status, setStatus] = useState("");
  const [ref, inView] = useInView(0.1);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus(tr.sending);
    emailjs
      .sendForm("service_i81kced", "template_m4eluzk", form.current, "-L2XTDmSnie6p6MFc")
      .then(() => {
        setStatus(tr.success);
        form.current.reset();
      })
      .catch(() => setStatus(tr.error));
  };

  return (
    <section id="contact" style={{ position: "relative", background: colors.bg, padding: 0, overflow: "hidden" }}>
      <div style={{ position: "relative", width: "100%", display: "flex", justifyContent: "center", paddingTop: isMobile ? 48 : 80, overflow: "hidden" }}>
        {!isMobile && (
          <>
            <motion.div
              initial={{ opacity: 0.3, width: "10rem" }}
              whileInView={{ opacity: 1, width: "26rem" }}
              transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              style={{ position: "absolute", top: 0, right: "50%", height: "13rem", background: "conic-gradient(from 70deg at center top, #7C3AED, transparent, transparent)", maskImage: "linear-gradient(to bottom, white, transparent)" }}
            />
            <motion.div
              initial={{ opacity: 0.3, width: "10rem" }}
              whileInView={{ opacity: 1, width: "26rem" }}
              transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
              viewport={{ once: true }}
              style={{ position: "absolute", top: 0, left: "50%", height: "13rem", background: "conic-gradient(from 290deg at center top, transparent, transparent, #7C3AED)", maskImage: "linear-gradient(to bottom, white, transparent)" }}
            />
          </>
        )}
        {isMobile && (
          <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "80%", height: 120, background: "radial-gradient(ellipse, rgba(124,58,237,0.2), transparent 70%)", pointerEvents: "none" }} />
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          viewport={{ once: true }}
          style={{ position: "relative", zIndex: 10, textAlign: "center", padding: `0 clamp(20px, 5vw, 48px) ${isMobile ? 24 : 40}px` }}
        >
          <p className="pf-section-label" style={{ color: "rgba(167,139,250,0.75)" }}>{tr.label}</p>
          <h2 className="pf-section-title" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            {tr.title1} <span>{tr.title2}</span>
          </h2>
          <p className="pf-section-desc" style={{ marginTop: 12 }}>{tr.desc}</p>
        </motion.div>
      </div>

      <div ref={ref} style={{ maxWidth: 860, margin: "0 auto", padding: `0 clamp(20px, 5vw, 48px) ${isMobile ? 72 : 100}px` }}>
        <div className="pf-contact-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="pf-contact-panel"
          >
            <p className="pf-form-label" style={{ color: "rgba(167,139,250,0.6)", marginBottom: 24 }}>{tr.coordLabel}</p>
            {tr.fields.map((c) => (
              <div key={c.label} style={{ marginBottom: 20 }}>
                <p className="pf-form-label">{c.label}</p>
                {c.href ? (
                  <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" style={{ fontSize: 13, color: c.color, textDecoration: "none" }}>
                    {c.value}
                  </a>
                ) : (
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.55)" }}>{c.value}</p>
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="pf-contact-panel"
          >
            <p className="pf-form-label" style={{ color: "rgba(124,58,237,0.6)", marginBottom: 24 }}>{tr.formLabel}</p>
            <form ref={form} onSubmit={sendEmail} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "from_name", label: tr.name, type: "text", placeholder: tr.namePh },
                { name: "reply_to", label: tr.email, type: "email", placeholder: tr.emailPh },
              ].map((f) => (
                <div key={f.name}>
                  <label className="pf-form-label" style={{ display: "block", marginBottom: 6 }}>{f.label}</label>
                  <input name={f.name} type={f.type} required placeholder={f.placeholder} className="pf-input" />
                </div>
              ))}
              <div>
                <label className="pf-form-label" style={{ display: "block", marginBottom: 6 }}>{tr.message}</label>
                <textarea name="message" required rows={4} placeholder={tr.messagePh} className="pf-input pf-textarea" />
              </div>
              <motion.button type="submit" className="pf-btn pf-btn-primary" style={{ width: "100%", marginTop: 4 }} whileTap={{ scale: 0.98 }}>
                {tr.send}
              </motion.button>
              {status && (
                <p style={{ fontSize: 12, textAlign: "center", color: status === tr.success ? colors.green : "#f87171", marginTop: 4 }}>
                  {status}
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
