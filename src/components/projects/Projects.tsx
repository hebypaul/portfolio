"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Ethereal E-Commerce",
    description: "A high-performance headless e-commerce platform built with Next.js, Shopify, and WebGL for interactive product viewers.",
    image: "", // Placeholder for procedural fallback
    tags: ["Next.js", "Three.js", "Shopify", "Tailwind"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Quantum Dashboard",
    description: "Real-time analytics dashboard with complex data visualization, glassmorphism UI, and WebSocket integrations.",
    image: "",
    tags: ["React", "D3.js", "Zustand", "Framer Motion"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "AI Canvas",
    description: "An interactive generative art platform where users can co-create with AI using custom WebGL shaders.",
    image: "",
    tags: ["WebGL", "TensorFlow.js", "GLSL", "React"],
    githubUrl: "#",
    liveUrl: "#"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-20"
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">Selected Work</h2>
          <h3 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Featured Projects</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} index={index} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
