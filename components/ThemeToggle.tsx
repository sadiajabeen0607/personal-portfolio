"use client"

import { useEffect, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
  setMounted(true);
  const saved = localStorage.getItem("theme");

  if (saved === "dark") {
    setDark(true);
    document.documentElement.classList.add("dark");
  } else {
    setDark(false);
    document.documentElement.classList.remove("dark");
  }
}, []);

  if(!mounted) return null;

  const toggleTheme = () => {
    const isDark = !dark;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  return (
    <button onClick={toggleTheme}
    className="p-2 rounded-lg border border-border hover:bg-surface transition">
      {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
    </button>
  )
}