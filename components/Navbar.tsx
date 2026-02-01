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

  const lastScrollY = useRef(0);
  const timerId = useRef(null);

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
      if (forceVisible) {
        setVisible(true);
        return;
      }

      const currentScrollY = window.scrollY;

      // scrolling down → hide
      if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      }
      // scrolling up → show for 3 sec
      else {
        setVisible(true);

        if (timerId.current) clearTimeout(timerId.current);

        timerId.current = setTimeout(() => {
          setVisible(false);
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
      ${visible ? "translate-y-0" : "-translate-y-full"}`}
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

// export default function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);
//   const [active, setActive] = useState("Home");

//   // Scroll effect + active section detection
//   useEffect(() => {
//     const onScroll = () => {
//       setScrolled(window.scrollY > 50);

//       links.forEach((link) => {
//         const section = document.querySelector(link.href);
//         if (section) {
//           const top = section.getBoundingClientRect().top;
//           if (top <= 120 && top >= -200) {
//             setActive(link.name);
//           }
//         }
//       });
//     };

//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 w-full z-50 transition-all duration-300
//         ${scrolled ? "bg-bg/80 backdrop-blur border-b border-border shadow-lg" : "bg-transparent"}
//       `}
//     >
//       <div className="max-w-6xl mx-auto px-6 h-20 flex justify-between items-center">
//         {/* Logo */}
//         <span className="text-xl font-bold gradient-text">Sadia.</span>

//         {/* Desktop */}
//         <div className="hidden md:flex items-center gap-8">
//           {links.map((link) => {
//             const isActive = active === link.name;
//             return (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setActive(link.name)}
//                 className={`group relative px-1 py-2 text-sm font-medium transition-colors duration-300
//                   ${isActive ? "text-accent" : "text-text hover:text-accent"}
//                 `}
//               >
//                 {link.name}

//                 {/* underline animation */}
//                 <span
//                   className={`absolute left-0 bottom-0 h-0.5 bg-(--accent)
//                     transition-all duration-300 ease-out
//                     opacity-100
//                     ${isActive ? "w-full" : "w-0 group-hover:w-full"}
//                   `}
//                 />
//               </a>
//             );
//           })}
//           <ThemeToggle />
//         </div>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden p-2 rounded-lg glass"
//         >
//           {open ? <HiX size={22} /> : <FiMenu size={22} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden glass mx-4 mt-2 rounded-xl p-4 space-y-4">
//           {links.map((link) => {
//             const isActive = active === link.name;
//             return (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => {
//                   setActive(link.name);
//                   setOpen(false);
//                 }}
//                 className={`relative block py-2 text-sm font-medium transition-all duration-300
//                   ${isActive ? "text-accent pl-4" : "text-text hover:text-accent hover:pl-4"}
//                 `}
//               >
//                 {link.name}
//                 <span
//                   className={`absolute left-0 top-1/2 h-1.5 w-1.5 rounded-full bg-accent
//                     -translate-y-1/2 transition-opacity duration-300
//                     ${isActive ? "opacity-100" : "opacity-0"}
//                   `}
//                 />
//               </a>
//             );
//           })}
//         </div>
//       )}
//     </nav>
//   );
// }
