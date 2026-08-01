"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";

const profilePic: string | null = "/profile.png";

const capabilities = [
  {
    number: "01",
    title: "Full-Stack Development",
    description:
      "Production-ready applications with Next.js, React, Node.js, and PostgreSQL — from authentication to deployment.",
  },
  {
    number: "02",
    title: "AI & Agentic Systems",
    description:
      "Building intelligent tooling with MCP, LangGraph, and modern AI architectures that solve real problems.",
  },
  {
    number: "03",
    title: "Open Source & Cloud-Native",
    description:
      "Active contributor to Meshery at Layer5, working on scalable cloud-native infrastructure and management systems.",
  },
];



export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  const handleScrollTo = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-surface relative z-10 overflow-hidden"
    >
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto">
        {/* ── Top: Section Label ── */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className="text-sm font-mono text-primary tracking-widest uppercase">
            About
          </span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* ── Main Grid: Photo Left, Content Right ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column — Photo + Location */}
          <div className="lg:col-span-4">
            <div className="sticky top-32">
              {/* Profile Image */}
              <div className="relative aspect-3/4 w-full max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden border border-white/10">
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent z-10" />
                {profilePic ? (
                  <Image
                    src={profilePic}
                    alt="Heby T Paul — Full Stack Developer based in Kochi, India"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 90vw, 320px"
                    priority={false}
                  />
                ) : (
                  <div className="w-full h-full bg-surface flex items-center justify-center">
                    <span className="text-white/20 font-mono text-xs">
                      [ PHOTO ]
                    </span>
                  </div>
                )}
              </div>

              {/* Location & Availability — below photo, compact */}
              <div className="mt-6 space-y-3 text-sm text-white/50 max-w-sm mx-auto lg:mx-0">
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-primary shrink-0" />
                  <span>Kochi, Kerala, India</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span>Available for remote opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — All Content */}
          <div className="lg:col-span-8">
            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-snug mb-8"
            >
              I build web applications where{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
                solid engineering
              </span>{" "}
              meets thoughtful product design.
            </motion.h2>

            {/* Professional Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.6,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="space-y-5 mb-16 md:mb-20 max-w-2xl"
            >
              <p className="text-lg text-white/70 font-light leading-relaxed">
                I am a Full Stack developer focused on building scalable,
                maintainable web applications — from frontend interfaces to
                backend APIs and database architecture. My work spans modern
                frameworks like Next.js and React to server-side infrastructure
                with Node.js, PostgreSQL, and Redis.
              </p>
              <p className="text-lg text-white/70 font-light leading-relaxed">
                Beyond product development, I actively contribute to open source
                through the Layer5 community, working on{" "}
                <a
                  href="https://github.com/meshery/meshery"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-accent/50"
                >
                  Meshery
                </a>
                , a cloud-native management platform. I am also exploring the
                next wave of AI tooling — building with MCP, LangGraph, and
                agentic architectures.
              </p>
            </motion.div>

            {/* ── Capabilities ── */}
            <div className="mb-16 md:mb-20">
              <h3 className="text-xs font-mono text-white/40 tracking-widest uppercase mb-8">
                What I Do
              </h3>
              <div className="space-y-0">
                {capabilities.map((cap, i) => (
                  <motion.div
                    key={cap.number}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group py-6 border-t border-white/10 last:border-b flex gap-6"
                  >
                    <span className="text-xs font-mono text-white/25 pt-1 shrink-0">
                      {cap.number}
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                        {cap.title}
                      </h4>
                      <p className="text-white/50 text-sm leading-relaxed max-w-lg">
                        {cap.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>



            {/* ── CTA ── */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#contact"
                onClick={(e) => handleScrollTo(e, "#contact")}
                data-cursor-text="HELLO"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white text-background font-bold text-sm rounded-full hover:scale-105 transition-transform duration-300 group"
              >
                <span>Let&apos;s Work Together</span>
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </a>
              <a
                href="#projects"
                onClick={(e) => handleScrollTo(e, "#projects")}
                data-cursor-text="WORK"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/15 text-white/70 font-medium text-sm rounded-full hover:border-white/30 hover:text-white transition-all duration-300"
              >
                View My Work
              </a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
