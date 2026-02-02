"use client";

import { FaGithub } from "react-icons/fa";
import { motion, type Variants } from "framer-motion";

const socials = [
  { Icon: FaGithub, label: "X", href: "https://github.com/sadiajabeen0607" },
];

const glowVariant: Variants = {
  initial: { scale: 1, y: 0, filter: "drop-shadow(0 0 0 rgba(0,0,0,0))" },
  hover: {
    scale: 1.1,
    y: -3,
    filter:
      "drop-shadow(0 0 8px rgba(13, 88, 204, 0.8)) drop-shadow(0 0 18px rgba(16, 185, 129, 0.8))",
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  tap: { scale: 0.95, y: 0, transition: { duration: 0.08 } },
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-bg">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_75%_35%,rgba(13,88,204,0.25),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_55%_at_30%_70%,rgba(236,72,153,0.3),transparent_70%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 sm:px-8 lg:px-10 py-16 md:py-20 flex flex-col items-center text-center space-y-6"
      >
        <h1
          className="font-semibold leading-none text-text select-none text-center px-4"
          style={{
            fontSize: "clamp(3rem,5vw,14rem)",
            letterSpacing: "0.02em",
            lineHeight: 0.9,
            padding: "0 3vw",
            whiteSpace: "nowrap",
            textShadow: "0 2px 18px rgba(0,0,0,0.45)",
          }}
        >
          Sadia Jabeen
        </h1>
        <div className="h-0.75 w-24 md:w-32 rounded-full bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#ec4899]" />
        <div className="flex gap-5 text-2xl md:text-3xl">
          {socials.map(({ Icon, label, href }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              aria-label={label}
              rel="noopener noreferrer"
              variants={glowVariant}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="text-(--muted) transition-colors duration-200 inline-flex items-center justify-center"
            >
              <Icon />
            </motion.a>
          ))}
        </div>
        <p className="text-text italic max-w-xl">
          “Code with purpose. Build with passion.”
        </p>
        <p className="text-(--muted) text-xs">
          &copy; {new Date().getFullYear()} Sadia Jabeen. All rights reserved.
        </p>
      </motion.div>
    </footer>
  );
}
