"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Rao Muhammad Hashim",
    role: "CEO & Founder , Techora",
    review:
      "Sadia Jabeen worked on multiple projects including Cartonyx, IMS, Shaista Art Gallery, Techora website, and the Techora Employee Management System. She proved to be dedicated, hardworking, and consistent in delivering her tasks on time. We found her to be a reliable and committed intern with strong potential for professional growth.",
    img: "/images/Sir-Hashim-Rao.webp",
  },
  {
    name: "Muhammad Hammad Aslam",
    role: "Head HR , Techora",
    review:
      "Sadia Jabeen worked with us as a remote intern and contributed to projects including Cartonyx, IMS, Shaista Art Gallery, the Techora website, and the Techora Employee Management System. She remained disciplined, dedicated, and reliable while working remotely, consistently meeting deadlines and expectations. We found her to be a hardworking and committed intern with strong professional potential.",
    img: "/images/Sir_Hammad_Aslam_HR.webp",
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-bg text-text"
    >
      <motion.h2
        className="text-4xl font-bold mb-16"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        People I Worked With
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 max-w-6xl w-full mt-10">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name + 1}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 * 0.2 }}
            viewport={{ once: true }}
            className="bg-bg/10 backdrop-blur-lg border border-text/20 rounded-2xl p-6 flex flex-col items-center text-center transform transition duration-500 hover:scale-105 hover:-rotate-1"
          >
            <div className="p-0.75 rounded-full bg-(--gradient) shadow-[0_0_20px_rgba(99,102,241,0.6)] mb-4">
              <Image
                src={t.img}
                alt={t.name}
                width={80}
                height={80}
                className="rounded-full object-cover bg-bg"
                loading="lazy"
              />
            </div>

            <p className="text-text/40 italic mb-4">{t.review}</p>
            <h3 className="text-lg font-semibold text-[#6366f1]">{t.name}</h3>
            <p className="text-sm text-text/30 ">{t.role}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
