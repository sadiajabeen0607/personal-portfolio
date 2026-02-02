"use client";

import Image from "next/image";
import Logo from "../public/logo.png";
import ThemeToggle from "./ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { FiMenu } from "react-icons/fi";
import OverlayMenu from "./OverlayMenu";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [forceVisible, setForceVisible] = useState(false);
  const [active, setActive] = useState("Home");
  const [bgVisible, setBgVisible] = useState(false);

  const lastScrollY = useRef(0);
  const timerId = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      links.forEach((link) => {
        const section = document.querySelector(link.href);
        if (section) {
          const top = section.getBoundingClientRect().top;
          if (top <= 120 && top >= -200) {
            setActive(link.name);
          }
        }
      });
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const homeSection = document.querySelector("#home");
    if (!homeSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setForceVisible(true);
          setVisible(true);
        } else {
          setForceVisible(false);
        }
      },
      {
        threshold: 0,
        rootMargin: "-120px 0px 0px 0px", // navbar height
      }
    );

    observer.observe(homeSection);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (forceVisible) {
      setVisible(true);
      setBgVisible(true);
      return;
    }

    if (currentScrollY > lastScrollY.current) {
      // Scrolling down
      setVisible(false);
      setBgVisible(false);
    } else {
      // Scrolling up
      setVisible(true);
      setBgVisible(true);

      if (timerId.current) clearTimeout(timerId.current);

      timerId.current = window.setTimeout(() => {
        setVisible(false);
        setBgVisible(false);
      }, 3000);
    }

    lastScrollY.current = currentScrollY;
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", handleScroll);
    if (timerId.current) clearTimeout(timerId.current);
  };
}, [forceVisible]);


  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300
      ${visible ? "translate-y-0" : "-translate-y-full"} ${bgVisible ? "bg-bg/70 dark:bg-surface/70 backdrop-blur-md" : "bg-transparent"}`}
      >
        <div className="px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <Image src={Logo} alt="logo" className="w-8 h-14" />
            <span className="text-2xl font-bold gradient-text hidden sm:block">
              Sadia.
            </span>
          </div>

          {/* DESKTOP NAV LINKS */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => {
              const isActive = active === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setActive(link.name)}
                  className={`group relative text-sm font-medium
                  text-text hover:text-(--accent) transition-colors
                  ${isActive ? "text-(--accent)" : ""}
                `}
                >
                  {link.name}

                  {/* underline */}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 w-full bg-(--accent)
                    transition-all duration-300 origin-left
                    ${
                      isActive
                        ? "scale-x-100 opacity-100"
                        : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"
                    }
                  `}
                  />
                </a>
              );
            })}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <a href="#contact" className="btn-gradient">
                Contact Me
              </a>
            </div>

            <ThemeToggle />

            {/* MOBILE HAMBURGER */}
            <button
              className="lg:hidden text-3xl text-text"
              onClick={() => setOpen(true)}
              aria-label="Open Menu"
            >
              <FiMenu />
            </button>
          </div>
        </div>
      </nav>

      <OverlayMenu
        isOpen={open}
        onClose={() => setOpen(false)}
        active={active}
      />
    </>
  );
}