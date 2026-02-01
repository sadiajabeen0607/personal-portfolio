"use client"

import { motion } from "framer-motion"

const projectsSummary = [
  {
    name: "CARTONYX",
    link: "https://cartonnyx.store",
    role: "Full Stack Developer",
    overview:
      "Digital product management and workflow web application. Developed responsive front-end, backend modules, API integrations, debugging, and performance improvements.",
    skills: ["HTML", "CSS", "JavaScript", "API Integration", "Full-stack Development"],
  },
  {
    name: "IMS",
    link: "https://ims.techora.pk",
    role: "Full Stack Developer & Debugger",
    overview:
      "Web-based inventory, billing, and stock management solution. Handled backend logic, database optimization, debugging, and UX improvements.",
    skills: ["PHP", "MySQL", "Debugging", "Backend Optimization", "Full-stack Development"],
  },
]

export default function PortfolioSummary() {
  return (
    <section className="py-20 bg-bg text-text" id="portfolio-summary">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">
          Portfolio Summary
        </h2>

        <div className="space-y-8">
          {projectsSummary.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="bg-surface border border-border rounded-xl p-6 shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-primary">{proj.name}</h3>
              <span className="text-muted">{proj.role}</span>
              <p className="mt-2">{proj.overview}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {proj.skills.map((skill, i) => (
                  <span key={i} className="bg-primary/20 text-primary px-2 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
              <a
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-primary hover:underline"
              >
                View Project
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
