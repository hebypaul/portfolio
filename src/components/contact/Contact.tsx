"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 lg:px-24 bg-background relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-sm font-mono text-primary tracking-widest uppercase mb-4">What's Next?</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">Get In Touch</h3>
          <p className="text-xl text-white/60 font-light max-w-2xl mx-auto mb-12">
            I'm currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <a href="mailto:hello@example.com" data-cursor-text="EMAIL" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-accent transition-colors duration-300 group">
            <Mail size={20} />
            <span>Say Hello</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
