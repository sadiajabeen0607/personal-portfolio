"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function About() {
  const glows = [
    "top-10 -left-10 w-[360px] h-[360px] opacity-20 blur-[120px]",
    "bottom-0 right-10 w-[420px] h-[420px] opacity-15 blur-[140px] delay-300",
    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] opacity-10 blur-[100px]",
  ];
  const stats = [
    { label: "Experience", value: "4+ years" },
    { label: "Speciality", value: "Full Stack" },
    { label: "Focus", value: "Performance & UX" },
  ];
  return (
    <section
      id="about"
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        {glows.map((c, i) => (
          <div
            key={i}
            className={`absolute rounded-full bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#ec4899] animate-pulse ${c}`}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-12 py-20 flex flex-col gap-12">
        <motion.div
          className="flex flex-col md:flex-row items-center md:items-stretch gap-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <motion.div
            className="relative w-40 h-40 md:w-50 md:h-50 rounded-2xl overflow-hidden shadow-2xl bg-linear-to-br from-[#6366f1]/20 via-[#22d3ee]/20 to-[#ec4899]/20 border border-[#6366f1]/25"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <Image
              src="/images/profile.png"
              alt="Sadia Jabeen"
              width={320}
              height={320}
              className="absolute inset-0"
            />
          </motion.div>

          <div className="flex flex-1 flex-col justify-center text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-[#6366f1] via-[#22d3ee] to-[#6366f1]">
              Sadia Jabeen
            </h2>
            <p className="mt-2 text-lg sm:text-xl text-text/90 font-semibold">
              Full Stack Developer
            </p>
            <p className="mt-4 text-text leading-relaxed text-base sm:text-lg max-w-2xl md:max-w-3xl">
              I build modern, scalable web applications using contemporary
              front-end and back-end technologies. I have hands-on experience
              working on production systems, contributing to development,
              debugging, and performance optimization. I focus on writing clean
              code, creating responsive interfaces, and delivering reliable,
              user-focused solutions.
            </p>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 max-w-xl">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  className="rounded-xl border border-text/10 bg-text/5 px-4 py-3 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4 }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="text-sm text-gray-400">{item.label}</div>
                  <div className="text-base font-semibold">{item.value}</div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start">
              <a
                href="#projects"
                className="
                  px-6 py-3 rounded-lg text-lg font-medium
                  border border-(--border)
                  text-(--text)
                  bg-transparent
                  transition-all duration-300 ease-out
                  hover:bg-(--text)
                  hover:text-(--bg)
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="
                  px-6 py-3 rounded-lg text-lg font-medium
                  bg-(--text)
                  text-(--bg)
                  transition-all duration-300 ease-out
                  hover:-translate-y-0.5
                  hover:shadow-xl
                "
              >
                Get in Touch
              </a>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-text mb-3">
            About Me
          </h3>
          <p className="text-text/90 text-base sm:text-lg leading-relaxed">
            I’m passionate about building meaningful digital experiences and
            enjoy working on products that solve real-world problems. I value
            consistency, attention to detail, and collaboration when bringing
            ideas to life.
          </p>

          <p className="mt-2 text-text/70 text-base sm:text-lg leading-relaxed">
            When I’m not coding, I focus on learning better design patterns and
            improving how users experience the products I build.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
