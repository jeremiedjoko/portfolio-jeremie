import {
  Shield,
  Eye,
  Zap,
  Puzzle,
  Server,
  Code2,
  Smartphone,
  Palette,
  Terminal,
} from "lucide-react";

const ICONS = {
  shield: Shield,
  eye: Eye,
  zap: Zap,
  puzzle: Puzzle,
  server: Server,
  code: Code2,
  smartphone: Smartphone,
  palette: Palette,
  terminal: Terminal,
};

export function SkillIcon({ name, size = 20, color = "currentColor" }) {
  const Icon = ICONS[name] || Code2;
  return <Icon size={size} color={color} strokeWidth={1.75} aria-hidden />;
}
