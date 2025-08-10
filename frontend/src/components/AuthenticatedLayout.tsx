import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavLink from "./SidebarNavLink";
import toast from "react-hot-toast";
import NotiveLogo from "../assets/logo.png";

// Icons
import {
  FaYoutube,
  FaGithub,
  FaInstagram,
  FaRegFileAlt,
  FaVideo,
  FaStickyNote,
  FaRocket,
  FaGlobeAmericas,
  FaBox,
  FaArchive,
  FaLink,
  FaBars,
  FaDribbble,
  FaFigma,
  FaGoogle,
  FaLinkedin,
  FaMedium,
  FaSpotify,
  FaStackOverflow,
  FaTwitter,
  FaCode,
  FaBookOpen,
  FaTimes,
} from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const getSidebarIconComponent = (key: string): React.ReactElement => {
    switch (key.toLowerCase()) {
      case "dashboard":
        return <FaBookOpen className="text-purple-400" />;
      case "content":
        return <FaBookOpen className="text-green-400" />;
      case "projects":
        return <FaRocket className="text-indigo-400" />;
      case "areas":
        return <FaGlobeAmericas className="text-teal-400" />;
      case "resources":
        return <FaBox className="text-yellow-400" />;
      case "archives":
        return <FaArchive className="text-gray-400" />;
      case "youtube":
        return <FaYoutube className="text-red-500" />;
      case "github":
        return <FaGithub className="text-white" />;
      case "instagram":
        return <FaInstagram className="text-pink-500" />;
      case "article":
        return <FaRegFileAlt className="text-blue-400" />;
      case "video":
        return <FaVideo className="text-purple-400" />;
      case "note":
        return <FaStickyNote className="text-green-400" />;
      case "dribbble":
        return <FaDribbble className="text-pink-600" />;
      case "figma":
        return <FaFigma className="text-red-400" />;
      case "google_docs":
        return <FaGoogle className="text-blue-500" />;
      case "linkedin":
        return <FaLinkedin className="text-blue-600" />;
      case "medium":
        return <FaMedium className="text-green-500" />;
      case "spotify":
        return <FaSpotify className="text-green-400" />;
      case "stackoverflow":
        return <FaStackOverflow className="text-orange-500" />;
      case "twitter":
        return <FaTwitter className="text-blue-400" />;
      case "codepen":
        return <FaCode className="text-gray-300" />;
      case "excalidraw":
        return <FaBars className="text-purple-300" />;
      case "miro":
        return <FaBars className="text-blue-300" />;
      case "notion":
        return <IoIosJournal className="text-gray-300" />;
      default:
        return <FaLink className="text-gray-400" />;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("You have been logged out!", { id: "logout_success" });
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 text-gray-100">
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white/5 backdrop-blur-md border border-white/10 flex flex-col p-4 shadow-lg z-50 transform transition-transform duration-300 ease-in-out
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }
        md:relative md:flex md:w-64 overflow-y-auto hide-scrollbar`}
      >
        <button
          onClick={closeMobileMenu}
          className="absolute top-4 right-4 text-gray-400 hover:text-white md:hidden"
        >
          <FaTimes className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2 mb-8 px-2 py-3 rounded-lg bg-violet-900/20">
          <img src={NotiveLogo} alt="Notive Logo" className="w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight">Notive</h1>
        </div>

        <nav className="flex-grow space-y-4">
          <div className="space-y-2">
            <SidebarNavLink
              to="/dashboard"
              icon={getSidebarIconComponent("dashboard")}
              label="Dashboard"
              onClick={closeMobileMenu}
            />
            <SidebarNavLink
              to="/content"
              icon={getSidebarIconComponent("content")}
              label="Content Library"
              onClick={closeMobileMenu}
            />
          </div>

          <div className="mt-6 pt-4 border-t border-violet-800">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-2">
              Your Brain's Structure
            </h3>
            <div className="space-y-1">
              {["projects", "areas", "resources", "archives"].map((key) => (
                <SidebarNavLink
                  key={key}
                  to={`/content?category=${key}`}
                  icon={getSidebarIconComponent(key)}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  paramName="category"
                  paramValue={key}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-violet-800">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-2">
              Source Platforms
            </h3>
            <div className="space-y-1">
              {[
                "youtube",
                "github",
                "instagram",
                "linkedin",
                "twitter",
                "medium",
                "notion",
                "figma",
                "dribbble",
                "spotify",
                "stackoverflow",
                "codepen",
                "excalidraw",
                "miro",
                "google_docs",
              ].map((platform) => (
                <SidebarNavLink
                  key={platform}
                  to={`/content?platform=${platform}`}
                  icon={getSidebarIconComponent(platform)}
                  label={platform
                    .replace("_", " ")
                    .replace(/^\w/, (c) => c.toUpperCase())}
                  paramName="platform"
                  paramValue={platform}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </div>
        </nav>

        <div className="mt-auto pt-4 border-t border-violet-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full justify-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors duration-200"
          >
            <span className="text-xl">🚪</span>
            <span>Log out</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto hide-scrollbar">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="md:hidden fixed top-4 left-4 z-40 p-2 rounded-lg bg-gray-800 text-white shadow-lg"
        >
          <FaBars className="w-6 h-6" />
        </button>
        {children}
      </main>
    </div>
  );
}
