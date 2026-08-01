"use client";

import { motion } from "framer-motion";

const skills = [
  "TypeScript", "Python", "JavaScript", "SQL", "Next.js", "React", "Tailwind CSS",
  "Node.js", "Supabase", "PostgreSQL", "Redis", "MCP", "LangGraph", "Linux"
];

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 md:px-12 lg:px-24 bg-surface relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Core Skills</h3>
        </motion.div>

        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 100 }}
              className="px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 hover:border-primary/50 transition-all cursor-default"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
