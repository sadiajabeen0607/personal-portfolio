"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

const experiences = [
  {
    role: "Self-Taught Web Developer",
    company: "Independent Learning",
    duration: "2021",
    description: "Learned HTML, CSS, JavaScript and basic PHP through online resources, tutorials, and practice projects."
  },
  {
    role: "Web Development Trainee",
    company: "Infotech Institute, Talagang",
    duration: "2023",
    description: "Completed professional training in PHP and MySQL. Built small CRUD projects and gained strong understanding of backend development."
  },
  {
    role: "Web Developer (Intern → Junior Developer)",
    company: "Techora Company, Islamabad",
    duration: "2025 – Present",
    description: "Worked on real-world web applications, fixed bugs, developed new features and collaborated with team on live projects."
  }
];

const ExperienceItem = ({exp, idx, start, end, scrollYProgress, layout}) => {
  const scale = useTransform(scrollYProgress , [start , end], [0,1])
  const opacity = useTransform(scrollYProgress , [start , end], [0,1])

  const y = useTransform(scrollYProgress , [start , end], [idx%2 === 0 ? 30 : -30, 0])
  const x = useTransform(scrollYProgress , [start , end], [-24, 0])

  if(layout === "desktop") {
    return (
      <div className="relative flex flex-1 justify-center items-center min-w-0">
        <motion.div className="z-10 w-7 h-7 rounded-full bg-[#6366f1] shadow-[0_0_0_8px_rgba(255, 255, 255, 0.1)]" style={{scale, opacity}}></motion.div>
        <motion.div className={`absolute ${idx%2 === 0 ? "-top-8" : "-bottom-8"} w-0.75 bg-[#6366f1]/40`} style={{height:40, opacity}}></motion.div>

        <motion.article className={`absolute ${idx%2 === 0 ? "bottom-14" : "top-14"} bg-bg/90 backdrop-blur border border-[#6366f1]/70 rounded-xl p-7 w-80 shadow-lg `} style={{opacity, y, maxWidth: "90vw"}} transition={{duration:0.4, delay: idx*0.15}}>
          <h3 className="text-xl font-semibold text-[#6366f1]">{exp.role}</h3>
          <p className="text-md mb-3 text-(--muted)">{exp.company} | {exp.duration}</p>
          <p className="text-md wrap-break-word ">{exp.description}</p>
        </motion.article>
      </div>
    )
  }

  return (
    <div className="relative flex items-start">
      <motion.div className="absolute -left-3.5 top-3 z-10 w-7 h-7 rounded-full bg-[#6366f1] shadow-[0_0_0_8px_rgba(255, 255, 255, 0.1)]" style={{scale, opacity}}></motion.div>
      <motion.article className="glass backdrop-blur border border-text/70 rounded-xl p-5 w-[90vw] max-w-sm ml-6 shadow-lg" style={{opacity, x}} transition={{duration: 0.4, delay: idx*0.15}}>
      <h3 className="text-lg font-semibold wrap-break-word">{exp.role}</h3>
      <p className="text-sm mb-2 wrap-break-word">{exp.company} | {exp.duration}</p>
      <p className="text-sm wrap-break-word">{exp.description}</p>
      </motion.article>
    </div>
  )
}

export default function Experience() {

  const sceneRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const SCENE_HEIGHT_VH = isMobile ? 160*experiences.length : 120*experiences.length;
  const {scrollYProgress} = useScroll({
    target: sceneRef,
    offset: ["start start", "end end"]
  });

  const thresholds = useMemo(() => experiences.map((_, i) => (i+1)/experiences.length), [])
  const lineSize = useTransform(scrollYProgress, (v) => `${v*100}%`)
  
  return (
    <section id="experience" className="relative bg-bg text-text">
      <div ref={sceneRef} style={{height: `${SCENE_HEIGHT_VH}vh`, minHeight: "120vh"}} className="relative">
        <div className="sticky top-0 h-screen flex flex-col">
          <h2 className="text-4xl sm:text-5xl font-semibold mt-5 text-center text-transparent bg-clip-text bg-linear-to-r from-[#7bdfee] to-[#15177c] drop-shadow-lg">Experience</h2>
          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            {!isMobile && (
              <div className="relative w-full max-w-7xl">
                <div className="relative h-1.5 bg-[#6366f1]/15 rounded">
                  <motion.div className="absolute left-0 top-0 h-1.5 bg-[#6366f1] rounded origin-left" style={{width: lineSize }}></motion.div>
                </div>
                <div className="relative flex justify-between mt-0">
                  {experiences.map((exp, idx) => (
                    <ExperienceItem key={idx} exp={exp} idx={idx} start={idx === 0 ? 0 : thresholds[idx-1]} end={thresholds[idx]} scrollYProgress={scrollYProgress} layout="desktop" />
                  ))}
                </div>
              </div>
            )}

            {
              isMobile && (
                <div className="relative w-full max-w-md">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#6366f1] rounded">
                  <motion.div className="absolute top-0 left-0 w-1.5 bg-[#6366f1] rounded origin-top" style={{height: lineSize}}></motion.div>
                  </div>
                  <div className="relative flex flex-col gap-10 ml-10 mt-6 pb-28">
                    {experiences.map((exp, idx) => (
                      <ExperienceItem key={idx} exp={exp} idx={idx} start={idx === 0 ? 0 : thresholds[idx-1]} end={thresholds[idx]} scrollYProgress={scrollYProgress} layout="mobile"  />
                    ))}
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </section>
  )
}