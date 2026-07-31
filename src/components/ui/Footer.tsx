export default function Footer() {
  return (
    <footer className="py-8 px-6 text-center border-t border-white/5 bg-surface relative z-10">
      <p className="text-white/40 text-sm">
        © {new Date().getFullYear()} Designed and Built with Next.js & WebGL.
      </p>
    </footer>
  );
}
