"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { name: "About",      href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects",   href: "#projects" },
  { name: "Skills",     href: "#skills" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // useScroll drives the background/backdrop purely through Framer Motion transforms —
  // no React setState on scroll, no re-renders, runs off the main thread.
  const { scrollY } = useScroll();
  const bgOpacity   = useTransform(scrollY, [0, 80], [0, 0.6]);
  const blurOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4">
        {/* Animated glass background — driven by scroll transform, NOT useState */}
        <motion.div
          className="absolute inset-0 bg-black backdrop-blur-md border-b border-white/5"
          style={{ opacity: bgOpacity }}
          aria-hidden
        />
        {/* Extra blur layer fades in */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          style={{ opacity: blurOpacity }}
          aria-hidden
        />

        {/* Logo */}
        <a
          href="#"
          className="relative text-xl font-bold text-white tracking-tighter z-10"
          data-cursor-text="HOME"
          onClick={(e) => handleClick(e, "body")}
        >
          H.P.
        </a>

        {/* Desktop Nav */}
        <nav className="relative z-10 hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-medium text-white/70 hover:text-white transition-colors"
              data-cursor-text="GO"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <button
          className="relative z-10 md:hidden p-2 text-white"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile full-screen Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                onClick={(e) => handleClick(e, link.href)}
                className="text-3xl font-bold text-white"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
