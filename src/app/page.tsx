import Hero from "@/components/hero/Hero";
import About from "@/components/about/About";
import Experience from "@/components/experience/Experience";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Contact from "@/components/contact/Contact";
import Footer from "@/components/ui/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
