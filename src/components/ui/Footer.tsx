export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-white/5 bg-surface relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-white/40 text-sm">
          © {new Date().getFullYear()} Heby T Paul. All rights reserved.
        </p>
        <p className="text-white/30 text-xs font-mono">
          Built with Next.js, React, Tailwind & Framer Motion
        </p>
      </div>
    </footer>
  );
}
