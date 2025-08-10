import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 px-6 py-4 border-b border-white/10 backdrop-blur-lg bg-gradient-to-r from-purple-500/20 via-transparent to-pink-500/20 text-white transition-colors duration-300">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            <img src="/logo.png" alt="NeuroNest Logo" className="w-9 h-9" />
            <span className="text-2xl font-bold tracking-tight text-white">
              NeuroNest
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition font-medium"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("preview")}
              className="cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition font-medium"
            >
              Preview
            </button>
            <Link
              to="/login"
              className="cursor-pointer text-gray-300 hover:text-white hover:scale-105 transition font-medium"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/40 hover:scale-105 transition shadow-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="cursor-pointer"
            >
              <Menu className="w-7 h-7 text-white" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 flex transition-all duration-300 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Background Overlay */}
        <div
          className={`flex-1 bg-black/40 backdrop-blur-sm transition-opacity duration-300`}
          style={{ opacity: isMobileMenuOpen ? 1 : 0 }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Sliding Menu Panel */}
        <div
          className={`w-64 bg-white/10 backdrop-blur-xl border-l border-white/20 p-6 text-white shadow-2xl transform transition-transform duration-300 ease-out flex flex-col`}
          style={{
            transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="mb-6 self-end cursor-pointer"
          >
            <X className="w-7 h-7 text-white" />
          </button>

          <nav className="flex flex-col items-center gap-5 flex-1 justify-center">
            <button
              onClick={() => scrollToSection("features")}
              className="cursor-pointer text-white hover:text-purple-300 font-medium text-lg transition"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("preview")}
              className="cursor-pointer text-white hover:text-purple-300 font-medium text-lg transition"
            >
              Preview
            </button>
            <Link
              to="/login"
              className="cursor-pointer text-white hover:text-purple-300 font-medium text-lg transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="cursor-pointer mt-4 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 hover:shadow-purple-500/40 transition shadow-md text-center"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
