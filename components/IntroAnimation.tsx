"use client";

import { motion } from "framer-motion";

const name = "Sadia Jabeen";

export default function IntroAnimation({ onFinish }: { onFinish: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden
      bg-linear-to-br from-slate-950 via-slate-900 to-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 4.5, duration: 1 }}
      onAnimationComplete={onFinish}
    >
      {/* Soft Glow */}
      <div className="absolute w-150 h-150 bg-cyan-400/10 rounded-full blur-[140px]" />

      <div className="relative text-center">
        {/* Name (Letter Reveal + Gradient) */}
        <motion.h1
          className="flex justify-center text-5xl md:text-7xl font-extrabold"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {name.split("").map((char, i) => (
            <motion.span
              key={i}
              className="bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#f472b6]
              bg-clip-text text-transparent"
              variants={{
                hidden: { y: 50, opacity: 0 },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: { duration: 0.6, ease: "easeOut" },
                },
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-4 text-xs md:text-sm uppercase tracking-[0.35em] text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          Full Stack Developer
        </motion.p>

        {/* Loading Bar */}
        <motion.div
          className="mt-10 h-0.5 w-56 bg-slate-700 mx-auto overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="h-full bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#f472b6]"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
