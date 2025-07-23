export default function Footer() {
    return (
      <footer className="px-6 py-10 backdrop-blur-md border-t transition-all duration-300
        bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400">
        
        <div className="max-w-6xl mx-auto flex flex-col items-center space-y-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} <span className="text-gray-900 dark:text-white font-semibold">NeuroNest</span>. All rights reserved.
            Built with <span className="text-red-500">❤️</span> by <span className="text-gray-900 dark:text-white font-semibold">Skanda</span>.
          </p>
  
          <div className="flex gap-6 text-sm">
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer"
               className="hover:text-gray-900 dark:hover:text-white transition">
              GitHub
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer"
               className="hover:text-gray-900 dark:hover:text-white transition">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    );
  }
  