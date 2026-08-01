"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "../ui/Icons";

const socials = [
  { name: "GitHub", href: "https://github.com/hebypaul", icon: GithubIcon },
  { name: "LinkedIn", href: "https://linkedin.com/in/hebytpaul", icon: LinkedinIcon },
  { name: "X", href: "https://x.com/HebyPaul", icon: TwitterIcon },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 lg:py-40 px-6 md:px-12 lg:px-24 bg-background relative z-10 overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <span className="block text-sm font-mono text-primary tracking-widest uppercase mb-4">What&apos;s Next?</span>
          <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">Let&apos;s Talk</h2>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-12">
            I am currently open for new opportunities. Whether you have a project in mind, an opportunity to discuss, or just want to connect, my inbox is always open.
          </p>
          
          <a href="mailto:hebytpaul1111@gmail.com" data-cursor-text="EMAIL" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-background rounded-full font-bold hover:scale-105 transition-transform duration-300 group mb-16">
            <Mail size={20} />
            <span>Send a Message</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <div className="flex justify-center gap-8">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 text-white/50 hover:text-white transition-colors duration-300"
                data-cursor-text={s.name.toUpperCase()}
              >
                <span className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-white/30 transition-colors">
                  <s.icon size={24} />
                </span>
                <span className="text-xs font-mono tracking-widest uppercase">{s.name}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
