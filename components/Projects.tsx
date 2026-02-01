"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import Image from "next/image";

const useIsMobile = (query = "(max-width: 639px)") => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return isMobile;
};

export default function Projects() {
  const isMobile = useIsMobile();
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const mountedRef = useRef(false);
  const [showTech, setShowTech] = useState<number | null>(null);

  const projects = useMemo(
    () => [
      // COMPANY PROJECTS (PRIVATE)
      {
        type: "company",
        title: "Cartonyx",
        tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        bgColor: "#0d4d3d",
        images: {
          desktop: "/images/cartonyx-desktop.png",
          mobile: "/images/cartonyx-mobile.png",
        },
      },
      {
        type: "company",
        title: "IMS",
        tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
        bgColor: "#0d4d3d",
        images: {
          desktop: "/images/ims-desktop.png",
          mobile: "/images/ims-mobile.png",
        },
      },
      {
        type: "company",
        title: "Shaista Art Gallery",
        tech: ["Next.js", "Tailwind css"],
        bgColor: "#0d4d3d",
        images: {
          desktop: "/images/shaista-desktop.png",
          mobile: "/images/shaista-mobile.png",
        },
      },

      // PERSONAL PROJECTS
      {
        type: "personal",
        title: "Mystery Message",
        tech: ["Next.js", "MongoDB", "TypeScript", "Tailwind"],
        live: "https://mystery-message-six-gamma.vercel.app/",
        github: "https://github.com/sadiajabeen0607/mystery-message",
        bgColor: "#0d4d3d",
        images: {
          desktop: "/images/mystery-desktop.png",
          mobile: "/images/mystery-mobile.png",
        },
      },
      {
        type: "personal",
        title: "Nike Store",
        tech: ["Html", "javaScript", "Tailwind css"],
        live: "https://nike-store-commerce-app.vercel.app/",
        github: "https://github.com/sadiajabeen0607/nike-store-commerce-app",
        bgColor: "#0d4d3d",
        images: {
          desktop: "/images/nike-store.png",
          mobile: "/images/nike-store-mobile.png",
        },
      },
    ],
    [],
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"],
  });

  const thresholds = projects.map((_, i) => (i + 1) / projects.length);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!mountedRef.current) return;
    const idx = thresholds.findIndex((t) => v <= t);
    setActiveIndex(idx === -1 ? thresholds.length - 1 : idx);
  });

  const activeProject = projects[activeIndex];

  return (
    <section
      id="projects"
      ref={sceneRef}
      className="
    relative text-text
    bg-bg transition-colors duration-500
  "
      style={{
        height: `${100 * projects.length}vh`,
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center">
        <h2 className="text-3xl font-semibold z-10 text-center mt-8 text-text">
          My Projects
        </h2>

        <div className="relative w-full flex-1 flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 ${
                activeIndex === idx ? "opacity-100 z-20" : "opacity-0 z-0"
              }`}
              style={{ width: "85%", maxWidth: "1200px" }}
            >
              <AnimatePresence mode="wait">
                {activeIndex === idx && (
                  <motion.h3
                    key={project.title}
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="block text-center text-[clamp(2rem,6vw,5rem)] italic font-semibold text-transparent bg-clip-text bg-linear-to-r from-[#15177c] via-[#6366f1] to-[#22d3ee] drop-shadow-lg"
                  >
                    {project.title}
                  </motion.h3>
                )}
              </AnimatePresence>

              <div
                onClick={() => {
                  if (isMobile) {
                    setShowTech(showTech === idx ? null : idx);
                  }
                }}
                className={`group relative w-full overflow-hidden bg-text/20 shadow-2xl md:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7)] ${isMobile ? "mb-6 rounded-lg" : "mb-10 sm:mb-12 rounded-xl"} h-[62vh] sm:h-[66vh]`}
                style={{ zIndex: 10, transition: "box-shadow 250ms ease" }}
              >
                <Image
                  src={
                    isMobile ? project.images.mobile : project.images.desktop
                  }
                  alt={project.title}
                  fill
                  className="object-fill drop-shadow-xl md:drop-shadow-2xl"
                  style={{
                    zIndex: 10,
                    filter: "drop-shadow(0, 16px, 40px rgba(0,0,0,0.65))",
                    transition: "filter 200ms ease",
                  }}
                  loading="lazy"
                />
                <div
                  className="pointer-events-none absolute inset-0 "
                  style={{
                    zIndex: 11,
                    background:
                      "linear-gradient(100deg, rgba(0,0,0,0.12) 0% , rgba(0,0,0,0) 40%)",
                  }}
                ></div>
                <AnimatePresence>
                  {activeIndex === idx && (
                    <div
                      className={` absolute bottom-0 left-0 right-0
                        flex flex-wrap justify-center gap-3
                        bg-bg/60 backdrop-blur
                        p-4
                        opacity-0
                        group-hover:opacity-100
                        group-hover:translate-y-0
                        translate-y-6
                        transition-all duration-300 mb-4 ${
                          isMobile
                            ? showTech === idx
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-6"
                            : "opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0"
                        }`}
                      style={{ zIndex: 20 }}
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-4 py-2 rounded-full text-sm bg-bg/20 border border-[#15177c] text-[#15177c]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>

              {/* TECH DIV (ANIMATED) */}
            </div>
          ))}
        </div>

        {/* BUTTONS ONLY FOR PERSONAL PROJECTS */}
        {activeProject.type === "personal" ? (
          <div className="absolute bottom-20 flex gap-4 z-30">
            <a
              target="_blank"
              href={activeProject.live}
              className="px-6 py-3 font-semibold rounded-lg bg-text"
            >
              View Live
            </a>
            <a
              target="_blank"
              href={activeProject.github}
              className="px-6 py-3 font-semibold rounded-lg border"
            >
              GitHub
            </a>
          </div>
        ) : (
          <div className="absolute bottom-20 flex gap-4 z-30">
            <p
              className="px-6 py-3 font-semibold rounded-lg bg-text"
            >
              Company Project – Private
            </p>
            
          </div>
        )}
      </div>
    </section>
  );
}
