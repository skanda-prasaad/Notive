import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export default function AuthenticatedLayout({
  children,
}: AuthenticatedLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You have been logged out!");
    navigate("/login");
  };

  const isCategoryOrPlatformActive = (
    paramName: string,
    paramValue: string
  ): boolean => {
    const searchParam = new URLSearchParams(location.search);
    const currentParamValue = searchParam.get(paramName);
    return currentParamValue === paramValue;
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
            <NavLink
              to="/dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-purple-700 text-white shadow-md"
                    : "hover:bg-violet-800 text-gray-300"
                }`
              }
            >
              <span className="text-xl">📊</span>
              <span className="font-medium">Dashboard</span>
            </NavLink>

            <NavLink
              to="/content"
              // No 'end' prop here, custom logic handles its active state
              className={() => {
                const isActiveContentLibrary =
                  location.pathname.startsWith("/content");
                return `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActiveContentLibrary
                    ? "bg-purple-700 text-white shadow-md"
                    : "hover:bg-violet-800 text-gray-300"
                }`;
              }}
            >
              <span className="text-xl">📚</span>
              <span className="font-medium">Content Library</span>
            </NavLink>
          </div>

          <div className="mt-6 pt-4 border-t border-violet-800">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-2">
              Your Brain's Structure
            </h3>
            <div className="space-y-1">
              <NavLink
                to="/content?category=projects"
                className={() =>
                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isCategoryOrPlatformActive("category", "projects")
                      ? "bg-purple-700 text-white shadow-md"
                      : "hover:bg-violet-800 text-gray-300"
                  }`
                }
              >
                <span className="text-xl">🚀</span>
                <span>Projects</span>
              </NavLink>
              <NavLink
                to="/content?category=areas"
                className={() =>
                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isCategoryOrPlatformActive("category", "areas")
                      ? "bg-purple-700 text-white shadow-md"
                      : "hover:bg-violet-800 text-gray-300"
                  }`
                }
              >
                <span className="text-xl">🌍</span>
                <span>Areas</span>
              </NavLink>
              <NavLink
                to="/content?category=resources"
                className={() =>
                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isCategoryOrPlatformActive("category", "resources")
                      ? "bg-purple-700 text-white shadow-md"
                      : "hover:bg-violet-800 text-gray-300"
                  }`
                }
              >
                <span className="text-xl">📦</span>
                <span>Resources</span>
              </NavLink>
              <NavLink
                to="/content?category=archives"
                className={() =>
                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isCategoryOrPlatformActive("category", "archives")
                      ? "bg-purple-700 text-white shadow-md"
                      : "hover:bg-violet-800 text-gray-300"
                  }`
                }
              >
                <span className="text-xl">📜</span>
                <span>Archives</span>
              </NavLink>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-violet-800">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-2 px-2">
              Source Platforms
            </h3>
            <div className="space-y-1">
              <NavLink
                to="/content?platform=youtube"
                className={() =>
                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isCategoryOrPlatformActive("platform", "youtube")
                      ? "bg-purple-700 text-white shadow-md"
                      : "hover:bg-violet-800 text-gray-300"
                  }`
                }
              >
                <span className="text-xl">▶️</span>
                <span>YouTube</span>
              </NavLink>
              <NavLink
                to="/content?platform=github"
                className={() =>
                  `flex items-center gap-3 w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isCategoryOrPlatformActive("platform", "github")
                      ? "bg-purple-700 text-white shadow-md"
                      : "hover:bg-violet-800 text-gray-300"
                  }`
                }
              >
                <span className="text-xl">🐙</span>
                <span>GitHub</span>
              </NavLink>
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
