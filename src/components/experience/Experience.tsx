"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const experiences = [
  {
    role: "Open Source Contributor",
    company: "Layer5 / Meshery",
    period: "Active",
    description: "Contributing to Meshery, an open-source cloud-native infrastructure management project. Delivering robust features and solving architecture problems.",
    link: "https://github.com/meshery/meshery/pulls?q=is%3Apr+author%3Ahebypaul",
    linkText: "View Contributions"
  },
  {
    role: "Full Stack Developer",
    company: "Freelance / Independent",
    period: "2023 - Present",
    description: "Build full-stack web applications from UI to database architecture. Deliver modern interfaces, robust APIs, and AI-enabled features for scalable business solutions."
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <span className="block text-sm font-mono text-primary tracking-widest uppercase mb-4">Journey</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">Experience</h2>
        </motion.div>

        <div className="relative border-l border-white/10 ml-4 md:ml-0">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="mb-12 pl-8 md:pl-12 relative"
            >
              {/* Timeline Dot */}
              <div className="absolute w-4 h-4 bg-primary rounded-full left-[-8.5px] top-1.5 shadow-[0_0_15px_rgba(59,130,246,0.5)] border-2 border-background" />
              
              <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                <span className="text-primary font-mono text-sm mt-1 md:mt-0">{exp.period}</span>
              </div>
              <h4 className="text-lg text-white/50 mb-4">{exp.company}</h4>
              <p className="text-white/70 leading-relaxed font-light mb-4">
                {exp.description}
              </p>
              {exp.link && (
                <a href={exp.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors duration-300">
                  {exp.linkText} <ArrowRight size={14} />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
