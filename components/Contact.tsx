"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import ParticlesBackground from "./ParticlesBackground";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { PiMapPinFill } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY!;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    idea: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "budget" && value && !/^\d+$/.test(value)) return;

    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: "" }));
  };

  const validateForm = () => {
    const requiredField: (keyof typeof formData)[] = [
      "name",
      "email",
      "service",
      "idea",
    ];
    const newErrors: Record<string, string> = {};

    requiredField.forEach((f) => {
      if (!formData[f].trim()) {
        newErrors[f] = "Required Field";
      }
    });

    if (formData.service !== "other" && !formData.budget.trim()) {
      newErrors.budget = "Required Field";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;
    setStatus("sending");

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...formData,
          from_name: formData.name,
          reply_to: formData.email,
        },
        PUBLIC_KEY,
      );
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        service: "",
        budget: "",
        idea: "",
      });
    } catch (error) {
      console.error("Email Js Error", error);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full min-h-screen bg-bg overflow-hidden text-text py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10"
    >
      <ParticlesBackground />

      <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-10">
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center p-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <h2 className="text-4xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Ready to Collaborate?
          </h2>

          {/* Description */}
          <p className="text-(--muted) text-xl md:text-2xl mb-10 leading-relaxed">
            I&apos;m currently available for freelance work and full-time
            opportunities. Whether you have a project in mind or just want to
            connect, feel free to reach out.
          </p>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Email */}
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center text-lg">
                <MdEmail className="text-[#22d3ee] w-8 h-8" />
              </div>
              <div>
                <p className="font-semibold text-2xl text-[#22d3ee]">Email</p>
                <p className="text-xl text-(--muted)">
                  sadiajabeen0607@gmail.com
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center text-lg">
                <FaPhoneAlt className="text-[#22d3ee] w-8 h-8" />
              </div>
              <div>
                <p className="font-semibold text-2xl text-[#22d3ee]">Phone</p>
                <p className="text-xl text-(--muted)">+92 349 4127274</p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-6">
              <div className="flex items-center justify-center text-lg">
                <PiMapPinFill className="text-[#22d3ee] w-8 h-8" />
              </div>
              <div>
                <p className="font-semibold text-2xl text-[#22d3ee]">
                  Location
                </p>
                <p className="text-xl text-(--muted)">Remote · Global</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-1/2 bg-bg/5 p-8 rounded-2xl shadow-lg border border-white/10"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="flex flex-col">
              <label className="mb-1">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className={`p-3 rounded-md bg-bg/10 border ${errors.name ? "border-red-500" : "border-gray-500"} text-text focus:outline-none focus:border-text`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs">{errors.name}</p>
              )}
            </div>
            {/* Email */}
            <div className="flex flex-col">
              <label className="mb-1">
                Your Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className={`p-3 rounded-md bg-bg/10 border ${errors.email ? "border-red-500" : "border-gray-500"} text-text focus:outline-none focus:border-text`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            {/* Service Needed */}
            <div className="flex flex-col">
              <label className="mb-1">
                Service Needed <span className="text-red-500">*</span>
              </label>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className={`p-3 rounded-md bg-bg/10 border ${errors.service ? "border-red-500" : "border-gray-500"} text-text focus:outline-none focus:border-text`}
              >
                <option value="" className="text-text" disabled>
                  Select a Service
                </option>
                <option value="web development" className="text-text">
                  Web Development
                </option>
                <option value="frontend development" className="text-text">
                  Frontend Development
                </option>
                <option value="backend development" className="text-text">
                  backend Development
                </option>
                <option value="full stack development" className="text-text">
                  Full Stack Development
                </option>
                <option value="other" className="text-text">
                  other
                </option>
              </select>
              {errors.service && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>

            {formData.service && formData.service !== "other" && (
              <div className="flex flex-col">
                <label className="mb-1">
                  Budget <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="budget"
                  placeholder="Your budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`p-3 rounded-md bg-bg/10 border ${errors.budget ? "border-red-500" : "border-gray-500"} text-text focus:outline-none focus:border-text`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-xs">{errors.budget}</p>
                )}
              </div>
            )}

            <div className="flex flex-col">
              <label className="mb-1">
                Explain your idea <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                name="idea"
                placeholder="Enter Your Idea"
                value={formData.idea}
                onChange={handleChange}
                className={`p-3 rounded-md bg-bg/10 border ${errors.idea ? "border-red-500" : "border-gray-500"} text-text focus:outline-none focus:border-text`}
              />
              {errors.idea && (
                <p className="text-red-500 text-xs">{errors.idea}</p>
              )}
            </div>

            {status && (
              <p
                className={`text-sm ${status === "success" ? "text-green-400" : status === "error" ? "text-red-400" : "text-yellow-400"}`}
              >
                {status === "sending"
                  ? "sending..."
                  : status === "success"
                    ? "Message send successfully"
                    : "Something went wrong"}
              </p>
            )}

            <motion.button
              className="btn-gradient disabled:opacity-60 font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={status === "sending"}
              type="submit"
            >
              {status === "sending" ? "sending..." : "Send Message"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
