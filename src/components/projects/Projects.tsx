"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    title: "Berakah",
    description: "AI-powered platform that transforms technical blog posts into high-engagement social media content.",
    image: "", // ADD IMAGE HERE (e.g., "/projects/berakah.jpg")
    tags: ["TypeScript", "AI", "Platform"],
    githubUrl: "https://github.com/hebypaul/Berakah",
    liveUrl: "#"
  },
  {
    title: "Tutoria",
    description: "An online learning platform built for modern educational experiences.",
    image: "", // ADD IMAGE HERE (e.g., "/projects/tutoria.jpg")
    tags: ["JavaScript", "E-Learning", "Full Stack"],
    githubUrl: "https://github.com/hebypaul/tutoria",
    liveUrl: "#"
  },
  {
    title: "Travel Advisor Web App",
    description: "A comprehensive travel advisory application.",
    image: "", // ADD IMAGE HERE (e.g., "/projects/travel.jpg")
    tags: ["JavaScript", "React", "Travel"],
    githubUrl: "https://github.com/hebypaul/Travel-Advisor-Web-App",
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
          <span className="block text-sm font-mono text-primary tracking-widest uppercase mb-4">Selected Work</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">Featured Projects</h2>
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
