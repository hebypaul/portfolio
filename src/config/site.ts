export const siteConfig = {
  name: "Heby T Paul",
  title: "Full Stack Developer",
  description: "I design and build fast, scalable web applications for startups, businesses, and product teams—from polished interfaces to production-ready full-stack systems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hebypaul.vercel.app",
  location: "Kochi, India",
  email: "hebytpaul1111@gmail.com",
  links: {
    github: "https://github.com/hebypaul",
    linkedin: "https://linkedin.com/in/hebytpaul",
    x: "https://x.com/HebyPaul",
  },
  availability: "Available for freelance projects & remote opportunities",
};

export type SiteConfig = typeof siteConfig;
