// src/components/landing/Footer.tsx - FINAL FIXED

export default function Footer() {
  return (
    <footer className="px-6 py-10 border-t border-white/10 backdrop-blur-md bg-white/5 text-gray-400">
      <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 text-center">
        <p className="text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="text-white font-semibold">NeuroNest</span>. All rights reserved.
          Built with <span className="text-red-500">❤️</span> by{" "}
          <span className="text-white font-semibold">Skanda</span>.
        </p>

        <div className="flex gap-6 text-sm">
          <a
            href="https://github.com/skanda-prasaad"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/skanda31/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}