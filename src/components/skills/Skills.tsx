"use client";

import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Frontend",
    skills: ["Next.js", "React", "TypeScript", "JavaScript", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "PostgreSQL", "Supabase", "Redis", "SQL"],
  },
  {
    label: "AI & Tools",
    skills: ["Python", "MCP", "LangGraph", "Git", "Linux"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-surface relative z-10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-mono text-primary tracking-widest uppercase">Technologies</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Tools I Work With</h2>
        </motion.div>

        {/* Skill Groups */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
            >
              <h3 className="text-xs font-mono text-white/40 tracking-widest uppercase mb-6">
                {group.label}
              </h3>
              <ul className="space-y-3">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="text-white/70 text-base font-light pl-4 border-l border-white/10 hover:border-primary/50 hover:text-white transition-all duration-200"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
