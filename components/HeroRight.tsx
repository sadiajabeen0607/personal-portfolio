"use client";
import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiMongodb,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";

const techs = [
  { Icon: SiReact, color: "#61DAFB", glow: "rgba(97,218,251,0.8)" },
  { Icon: SiNextdotjs, color: "#22d3ee", glow: "rgba(255,255,255,0.6)" },
  { Icon: SiNodedotjs, color: "#22c55e", glow: "rgba(34,197,94,0.8)" },
  { Icon: SiMongodb, color: "#4ade80", glow: "rgba(74,222,128,0.8)" },
  { Icon: SiTailwindcss, color: "#38bdf8", glow: "rgba(56,189,248,0.8)" },
];

export default function HeroRight() {
  return (
    <div className="relative w-110 h-110 flex items-center justify-center">

      {/* Neon Aura */}
      <div className="absolute inset-10 rounded-full bg-linear-to-r from-indigo-500 via-cyan-400 to-pink-500 blur-3xl opacity-30 animate-pulse" />

      {/* OUTER ORBIT */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 38, ease: "linear" }}
        className="absolute inset-0 rounded-full"
      >
        {techs.map(({ Icon, color, glow }, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              transform: `rotate(${i * (360 / techs.length)}deg) translateX(200px)`
            }}
            whileHover={{ scale: 1.3 }}
          >
            {/* Glow Ring */}
            <div
              className="absolute inset-0 rounded-full blur-xl"
              style={{ background: glow }}
            />

            {/* Icon Glass */}
            <div className="relative w-12 h-12 rounded-full glass flex items-center justify-center shadow-xl">
              <Icon size={26} style={{ color }} />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* INNER SLOW ORBIT */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        className="absolute inset-22.5 rounded-full border border-border/40"
      />

      {/* CORE CARD */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
        className="glass px-10 py-12 text-center relative z-10 w-70"
      >
        <h3 className="text-2xl font-bold gradient-text">
          Sadia Jabeen
        </h3>

        <p className="text-muted mt-1">
          Full Stack Developer
        </p>

        <p className="mt-4 text-sm text-muted leading-relaxed">
          Building scalable, high-performance web applications
          with modern full-stack technologies.
        </p>

        <div className="mt-6 inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium bg-accent-soft text-text">
          Open to Remote Work
        </div>
      </motion.div>
    </div>
  );
}
