"use client";
import { motion, type Variants } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa6";
import HeroRight from "./HeroRight";
import ParticlesBackground from "./ParticlesBackground";

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

export default function Hero() {
  const roles = useMemo(
    () => [
      "Full Stack Developer",
      "Frontend Developer",
      "Backend Developer",
      "MERN Stack Developer",
      "Next.js Developer",
    ],
    [],
  );

  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[index];
    const timeout = setTimeout(
      () => {
        if (!deleting && subIndex < current.length) setSubIndex((v) => v + 1);
        else if (!deleting && subIndex === current.length)
          setTimeout(() => setDeleting(true), 1200);
        else if (deleting && subIndex > 0) setSubIndex((v) => v - 1);
        else if (deleting && subIndex === 0) {
          setDeleting(false);
          setIndex((r) => (r + 1) % roles.length);
        }
      },
      deleting ? 40 : 60,
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, roles]);

  return (
    <>
    <section id="home" className="w-full h-screen relative overflow-hidden">
    <ParticlesBackground />
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-500px max-h-500px rounded-full bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#ec4899] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[120px] md:blur-[150px] animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[70vw] sm:w-[50vw] md:w-[40vw] h-[70vw] sm:h-[50vw] md:h-[40vw] max-w-500px max-h-500px rounded-full bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#ec4899] opacity-30 sm:opacity-20 md:opacity-10 blur-[100px] sm:blur-[120px] md:blur-[150px] animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 h-full w-full max-w-400 mx-auto px-4 grid grid-cols-1 lg:grid-cols-2">
        <div className="flex flex-col justify-center h-full text-center lg:text-left relative">
          <div className="w-full lg:pr-24 mx-auto max-w-3xl">
            <motion.div
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-text tracking-wide min-h-[1.6em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>{roles[index].substring(0, subIndex)}</span>
              <span
                className="inline-block w-0.5 ml-1 animate-pulse text-text align-middle"
                style={{ height: "1em" }}
              >
                |
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#ec4899] drop-shadow-lg">
                Hello, I&apos;m
              </span>
              <br />
              <span className="block font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-text">
                Sadia Jabeen
              </span>
            </motion.h1>
            <motion.p
              className="mt-6 text-base sm:text-lg md:text-xl text-muted max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Full Stack Developer with hands-on experience building modern,
              scalable web applications using Next.js, MERN stack, and PHP.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <a
                href="#projects"
                className="btn-gradient shadow-lg hover:scale-105"
              >
                View My Work
              </a>
              <a
                href="/Sadia_Jabeen_Resume.pdf"
                download
                className="
                px-6 py-3 rounded-full text-lg font-medium
                text-[#22d3ee]
                hover:scale-105 transition-all shadow-xl
                border border-[#22d3ee]
              "
              >
                My Resume
              </a>
            </motion.div>

            <div className="mt-10 flex gap-6 text-2xl md:text-3xl justify-center lg:justify-start">
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
                  className="
                  text-muted
                "
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex items-center justify-center">
          <HeroRight />
        </div>
      </div>
    </section>
    </>
  );
}
