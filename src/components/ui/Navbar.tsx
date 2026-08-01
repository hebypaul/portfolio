"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "About",      href: "#about" },
  { name: "Work",       href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Skills",     href: "#skills" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  // Track active section and scroll state without blocking the main thread excessively
  useEffect(() => {
    let scrollTimeout: ReturnType<typeof setTimeout> | undefined;
    const handleScroll = () => {
      if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
          setScrolled(window.scrollY > 50);
          scrollTimeout = undefined;
        }, 50); // Throttled scroll listener
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update active section when it enters the viewport sufficiently
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      {
        rootMargin: "-20% 0px -40% 0px",
        threshold: 0,
      }
    );

    // Initial check for scroll
    handleScroll();

    // Observe all sections
    links.forEach((link) => {
      const el = document.querySelector(link.href);
      if (el) observer.observe(el);
    });

    // Special observer for the very top to clear active section
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection("");
      },
      { rootMargin: "-10% 0px -90% 0px" }
    );
    const body = document.querySelector("body");
    if (body) heroObserver.observe(body);

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
      observer.disconnect();
      heroObserver.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* 
        A subtle, performant gradient mask that sits at the top of the screen to ensure
        the navbar is always readable against complex backgrounds, without being a harsh line.
      */}
      <div 
        className={cn(
          "fixed top-0 left-0 right-0 h-32 pointer-events-none transition-opacity duration-700 z-40",
          scrolled ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, rgba(5,5,5,0) 100%)"
        }}
        aria-hidden
      />

      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-6 pointer-events-none">
        
        {/* Logo - Fixed Left */}
        <a
          href="#"
          className="relative text-xl font-bold text-white tracking-tighter pointer-events-auto mix-blend-difference z-50"
          data-cursor-text="HOME"
          onClick={(e) => handleClick(e, "body")}
        >
          Heby Paul
        </a>

        {/* Desktop Nav - Floating Center Pill */}
        <nav className={cn(
          "hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-2 px-3 py-2 rounded-full pointer-events-auto transition-all duration-500",
          scrolled ? "bg-surface/60 backdrop-blur-xl border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" : "bg-transparent border-transparent"
        )}>
          {links.map((link) => {
            const isActive = activeSection === link.href;
            
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors duration-300",
                  isActive ? "text-white" : "text-white/60 hover:text-white"
                )}
                data-cursor-text="GO"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Action / Mobile Toggle */}
        <div className="flex items-center gap-4 pointer-events-auto z-50">
          <a
            href="#contact"
            onClick={(e) => handleClick(e, "#contact")}
            className="hidden md:inline-flex items-center justify-center text-sm font-bold text-background bg-white px-5 py-2.5 rounded-full hover:scale-105 transition-transform duration-300"
            data-cursor-text="HELLO"
          >
            Let&apos;s Talk
          </a>

          <button
            className="md:hidden p-3 -mr-3 text-white mix-blend-difference"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 bg-background/80 flex flex-col justify-center px-8 md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {links.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={(e) => handleClick(e, link.href)}
                  className="text-4xl font-bold text-white tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </nav>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="absolute bottom-12 left-8 right-8 flex flex-col gap-4"
            >
              <div className="h-px bg-white/10 w-full mb-4" />
              <a href="mailto:hebytpaul@gmail.com" className="text-white/60 hover:text-white">hebytpaul@gmail.com</a>
              <div className="flex gap-4 text-white/60">
                <a href="https://x.com/HebyPaul" target="_blank" rel="noopener noreferrer" className="hover:text-white">X</a>
                <a href="https://linkedin.com/in/hebytpaul" target="_blank" rel="noopener noreferrer" className="hover:text-white">LinkedIn</a>
                <a href="https://github.com/hebypaul" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
