import React from "react";
import { useNavigate } from "react-router-dom";
import SidebarNavLink from "./SidebarNavLink";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out!");
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 text-gray-100">
      <aside className="w-64 bg-gray-900 border-r border-violet-800 flex flex-col p-4 shadow-lg">
        <div className="flex items-center gap-2 mb-8 px-2 py-3 rounded-lg bg-violet-900/20">
          <img
            src="/logo.png"
            alt="NeuroNest Logo"
            className="w-8 h-8 filter invert"
          />
          <h1 className="text-2xl font-bold tracking-tight text-white">
            NeuroNest
          </h1>
        </div>

        <nav className="flex-grow space-y-4">
          <div className="space-y-2">
            <SidebarNavLink
              to="/dashboard"
              icon={<span className="text-xl">📊</span>}
              label="Dashboard"
            />
            <SidebarNavLink
              to="/content"
              icon={<span className="text-xl">📚</span>}
              label="Content Library"
            />
          </div>

          <div className="mt-6 pt-4 border-t border-violet-800">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-2">
              Your Brain's Structure
            </h3>
            <div className="space-y-1">
              <SidebarNavLink
                to="/content?category=projects"
                icon={<span className="text-xl">🚀</span>}
                label="Projects"
                paramName="category"
                paramValue="projects"
              />
              <SidebarNavLink
                to="/content?category=areas"
                icon={<span className="text-xl">🌍</span>}
                label="Areas"
                paramName="category"
                paramValue="areas"
              />
              <SidebarNavLink
                to="/content?category=resources"
                icon={<span className="text-xl">📦</span>}
                label="Resources"
                paramName="category"
                paramValue="resources"
              />
              <SidebarNavLink
                to="/content?category=archives"
                icon={<span className="text-xl">📜</span>}
                label="Archives"
                paramName="category"
                paramValue="archives"
              />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-violet-800">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-2">
              Source Platforms
            </h3>
            <div className="space-y-1">
              <SidebarNavLink
                to="/content?platform=youtube"
                icon={<span className="text-xl">▶️</span>}
                label="YouTube"
                paramName="platform"
                paramValue="youtube"
              />
              <SidebarNavLink
                to="/content?platform=github"
                icon={<span className="text-xl">🐙</span>}
                label="GitHub"
                paramName="platform"
                paramValue="github"
              />
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

      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
