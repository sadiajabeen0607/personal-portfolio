"use client"

import { motion } from "framer-motion"

const achievements = [
  "Offered a full-time position immediately after internship",
  "Successfully led development of Cartonyx & IMS projects",
  "Mentored interns and junior developers",
  "Contributed to debugging, optimization, and deployment of live projects",
]

export default function Achievements() {
  return (
    <section className="py-20 bg-bg text-text" id="achievements">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-10 text-center text-primary">
          Achievements
        </h2>
        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 gap-6 list-disc list-inside"
        >
          {achievements.map((ach, idx) => (
            <li key={idx} className="bg-surface border border-border p-4 rounded-lg shadow hover:shadow-lg transition">
              {ach}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}
