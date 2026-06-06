import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useIsMobile, usePrefersReducedMotion } from "../../hooks/useMediaQuery";

const DESKTOP_CHIPS = [
  { label: "Suricata", x: "70%", y: "20%", rotate: -12, index: 0 },
  { label: "Python", x: "76%", y: "44%", rotate: 8, index: 1 },
  { label: "React", x: "66%", y: "64%", rotate: -6, index: 2 },
  { label: "ELK Stack", x: "80%", y: "30%", rotate: 14, index: 3 },
  { label: "Wireshark", x: "72%", y: "76%", rotate: -10, index: 4 },
];

const MOBILE_CHIPS = [
  { label: "Suricata", x: "6%", y: "14%", rotate: -8, index: 0 },
  { label: "React", x: "76%", y: "10%", rotate: 10, index: 1 },
  { label: "Python", x: "82%", y: "86%", rotate: -6, index: 2 },
];

function ChipLabel({ label }) {
  return (
    <div
      style={{
        padding: "10px 16px",
        borderRadius: 12,
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.14)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 0.5,
        color: "rgba(255,255,255,0.9)",
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </div>
  );
}

function ScrollChip({ chip, scrollYProgress, reduced }) {
  const start = chip.index * 0.09;
  const end = start + 0.18;

  const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
  const y = useTransform(scrollYProgress, [start, end], [140, 0]);
  const scale = useTransform(scrollYProgress, [start, end], [0.2, 1]);
  const rotate = useTransform(scrollYProgress, [start, end], [chip.rotate - 32, chip.rotate]);

  if (reduced) {
    return (
      <div
        style={{
          position: "absolute",
          left: chip.x,
          top: chip.y,
          rotate: `${chip.rotate}deg`,
          zIndex: 3,
          pointerEvents: "none",
        }}
      >
        <ChipLabel label={chip.label} />
      </div>
    );
  }

  return (
    <motion.div
      style={{
        position: "absolute",
        left: chip.x,
        top: chip.y,
        opacity,
        y,
        scale,
        rotate,
        zIndex: 3,
        pointerEvents: "none",
      }}
    >
      <ChipLabel label={chip.label} />
    </motion.div>
  );
}

export function FloatingTechChips({ containerRef }) {
  const isMobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const chips = isMobile ? MOBILE_CHIPS : DESKTOP_CHIPS;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  const progress = smoothProgress;

  return (
    <div
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 3 }}
      aria-hidden
    >
      {chips.map((chip) => (
        <ScrollChip key={chip.label} chip={chip} scrollYProgress={progress} reduced={reduced} />
      ))}
    </div>
  );
}
