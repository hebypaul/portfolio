import dynamic from "next/dynamic";
import Hero from "@/components/hero/Hero";
import { siteConfig } from "@/config/site";

// Below-the-fold sections: lazy-loaded so they don't inflate the initial JS bundle.
// Each section is chunked separately for maximum granularity.
const About      = dynamic(() => import("@/components/about/About"));
const Experience = dynamic(() => import("@/components/experience/Experience"));
const Projects   = dynamic(() => import("@/components/projects/Projects"));
const Skills     = dynamic(() => import("@/components/skills/Skills"));
const Contact    = dynamic(() => import("@/components/contact/Contact"));
const Footer     = dynamic(() => import("@/components/ui/Footer"));

export default function Home() {
  return (
    <main id="main" className="flex min-h-screen flex-col bg-background selection:bg-primary selection:text-white">
      {/* Hero is synchronous — it is above the fold and is the LCP element */}
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
      {/* JSON-LD Structured Data for Person & WebSite (SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Person",
              name: siteConfig.name,
              url: siteConfig.url,
              jobTitle: siteConfig.title,
              sameAs: [
                siteConfig.links.github,
                siteConfig.links.linkedin,
                siteConfig.links.x,
              ],
              knowsAbout: [
                "Web Development",
                "Next.js",
                "React",
                "TypeScript",
                "Node.js",
                "AI-enabled Applications"
              ]
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: siteConfig.name,
              url: siteConfig.url,
              publisher: {
                "@type": "Person",
                name: siteConfig.name
              }
            }
          ])
        }}
      />
    </main>
  );
}
