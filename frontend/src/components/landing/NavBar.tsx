import { Link } from "react-router-dom";

interface NavBarProps {
  dark: boolean;
  setDark: (val: boolean) => void;
}

export default function NavBar({ dark, setDark }: NavBarProps) {
  const handleThemeToggle = () => setDark(!dark);

  return (
    <div
      className={`sticky top-0 z-50 flex justify-between items-center px-6 py-4 shadow-sm rounded-b-xl
        ${
          dark
            ? "bg-white/5 border-b border-white/10 backdrop-blur-md text-white"
            : "bg-white/70 border-b border-gray-200 backdrop-blur-md text-gray-900"
        }
        transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img src="/logo.png" alt="logo" className="w-9 h-9" />
        <span
          className={`text-xl font-semibold tracking-tight ${
            dark ? "text-white" : "text-gray-900"
          } font-sans`}
        >
          NeuroNest
        </span>
      </div>

      {/* Links & Buttons */}
      <div className="flex items-center gap-5">
        <Link
          to="/features"
          className={`text-sm font-medium ${
            dark
              ? "text-gray-300 hover:text-white"
              : "text-gray-700 hover:text-black"
          } transition`}
        >
          Features
        </Link>

        <Link
          to="/login"
          className={`text-sm font-medium ${
            dark
              ? "text-gray-300 hover:text-white"
              : "text-gray-700 hover:text-black"
          } transition`}
        >
          Login
        </Link>

        <Link
          to="/signup"
          className="px-4 py-1.5 rounded-md text-sm font-semibold text-white bg-purple-600 hover:bg-purple-700 transition inline-block text-center"
        >
          Sign Up
        </Link>

        {/* Theme Toggle */}
        <button
          onClick={handleThemeToggle}
          className={`p-2 rounded-full border border-transparent hover:border-gray-500 transition ${
            dark ? "text-white" : "text-gray-700"
          }`}
          aria-label="Toggle dark mode"
        >
          {dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 
                  0-4.136 2.635-7.64 6.375-9.093a.75.75 0 01.976.937 
                  A7.501 7.501 0 0019.5 15.75a.75.75 0 01.937.976z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M17.657 17.657l1.061 
                  1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M17.657 
                  6.343l1.061-1.061M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
