// src/pages/Dashboard.tsx

import { useState, useEffect, useCallback } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router";

// Define the interfaces for the data received from the backend
interface DashboardCounts {
  total: number;
  para: {
    projects: number;
    areas: number;
    resources: number;
    archives: number;
  };
  platforms: {
    youtube: number;
    github: number;
    instagram: number;
    article: number;
    video: number;
    note: number;
    // Add other platforms you included in your backend here, initialized to 0
  };
}

interface DashboardCountsApiResponse {
  message: string;
  counts: DashboardCounts; // This matches the 'counts' key from your backend response
}

export default function Dashboard() {
  // State to hold the dashboard counts, initialized with default zeros
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts>({
    total: 0,
    para: { projects: 0, areas: 0, resources: 0, archives: 0 },
    platforms: {
      youtube: 0,
      github: 0,
      instagram: 0,
      article: 0,
      video: 0,
      note: 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Helper to get platform/category icon (reusing logic from ContentCard)
  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "dashboard_total":
        return "🧠";
      case "youtube":
        return "▶️";
      case "github":
        return "🐙";
      case "instagram":
        return "📸";
      case "article":
        return "📄";
      case "video":
        return "🎥";
      case "note":
        return "📝";
      case "projects":
        return "🚀";
      case "areas":
        return "🌍";
      case "resources":
        return "📦";
      case "archives":
        return "📜";
      default:
        return "💡";
    }
  };

  // Function to fetch dashboard counts
  const fetchDashboardCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Call your new backend endpoint for dashboard counts
      const response = await axios.get<DashboardCountsApiResponse>(
        "/api/v1/dashboard/counts"
      );

      if (response.data && response.data.counts) {
        setDashboardCounts(response.data.counts); // Set the fetched counts
      } else {
        setError(
          "Received unexpected data format from server for dashboard counts."
        );
      }
    } catch (err: any) {
      console.error("Error fetching dashboard counts:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setError("Your session has expired. Please log in again.");
        } else if (err.response.data && err.response.data.message) {
          setError(`Server error: ${err.response.data.message}`);
        } else {
          setError(
            "An unexpected server error occurred while fetching dashboard counts."
          );
        }
      } else if (err.request) {
        setError(
          "Network error: Could not reach the server. Check your connection."
        );
      } else {
        setError("An unknown error occurred while fetching dashboard counts.");
      }
    } finally {
      setLoading(false);
    }
  }, [setDashboardCounts, setError, setLoading]);
  useEffect(() => {
    fetchDashboardCounts();
  }, [fetchDashboardCounts]);
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <h1 className="text-4xl font-extrabold text-white mb-2">
        Welcome back to your <span className="text-purple-400">NeuroNest</span>!
      </h1>
      <p className="text-lg text-gray-300">
        Your knowledge hub is ready to expand.
      </p>

      {/* Conditional Rendering for Loading, Error, or Counts Display */}
      {loading ? (
        <div className="text-center text-xl text-gray-300">
          Loading your brain's summary...
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-400">Error: {error}</div>
      ) : (
        <div className="space-y-8">
          {" "}
          {/* Container for all dashboard sections */}
          {/* Total Content Card */}
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md border border-violet-700/50 flex flex-col items-start max-w-xs">
            <span className="text-4xl mb-3">{getIcon("dashboard_total")}</span>
            <h3 className="text-lg font-semibold text-gray-100">
              Total Thoughts
            </h3>
            <p className="text-4xl font-bold text-purple-300">
              {dashboardCounts.total}
            </p>
          </div>
          {/* P.A.R.A. Summary Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Your Brain's Structure (P.A.R.A.)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(dashboardCounts.para).map(([category, count]) => (
                <div
                  key={category}
                  className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md border border-violet-700/50 flex flex-col items-start"
                >
                  <span className="text-4xl mb-3">{getIcon(category)}</span>
                  <h3 className="text-lg font-semibold text-gray-100 capitalize">
                    {category}
                  </h3>
                  <p className="text-4xl font-bold text-purple-300">{count}</p>
                </div>
              ))}
            </div>
          </div>
          {/* Platform Summary Section */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Thoughts by Source
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(dashboardCounts.platforms).map(
                ([platform, count]) => (
                  <div
                    key={platform}
                    className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md border border-violet-700/50 flex flex-col items-start"
                  >
                    <span className="text-4xl mb-3">{getIcon(platform)}</span>
                    <h3 className="text-lg font-semibold text-gray-100 capitalize">
                      {platform}
                    </h3>
                    <p className="text-4xl font-bold text-purple-300">
                      {count}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
          {/* Quick Actions (Can add actual buttons/links later) */}
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-md border border-violet-700/50">
            <h2 className="text-2xl font-bold text-white mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => navigate('/content?openAddModal=true')} // Add handler to open modal
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors duration-200"
              >
                <span className="text-xl">➕</span> Add New Thought
              </button>
              <button
                onClick={() => navigate('/content')} // Add handler to navigate
                className="flex items-center gap-2 px-6 py-3 bg-violet-800 hover:bg-violet-900 text-gray-200 rounded-lg shadow-lg transition-colors duration-200"
              >
                <span className="text-xl">🔎</span> Explore My Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
