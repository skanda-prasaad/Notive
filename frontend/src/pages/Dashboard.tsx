// src/pages/Dashboard.tsx

import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import toast from "react-hot-toast";
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
} from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DashboardCounts {
  total: number;
  para: {
    projects: number;
    areas: number;
    resources: number;
    archives: number;
  };
  platforms: { [key: string]: number | undefined };
}

interface DashboardCountsApiResponse {
  message: string;
  counts: DashboardCounts;
}

export default function Dashboard() {
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
      dribbble: 0,
      figma: 0,
      google_docs: 0,
      linkedin: 0,
      medium: 0,
      spotify: 0,
      stackoverflow: 0,
      twitter: 0,
      codepen: 0,
      excalidraw: 0,
      miro: 0,
      notion: 0,
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getIconComponent = (type: string) => {
    const icons: Record<string, React.ReactElement> = {
      dashboard_total: <FaBookOpen className="text-purple-400" />,
      youtube: <FaYoutube className="text-red-500" />,
      github: <FaGithub className="text-white" />,
      instagram: <FaInstagram className="text-pink-500" />,
      article: <FaRegFileAlt className="text-blue-400" />,
      video: <FaVideo className="text-purple-400" />,
      note: <FaStickyNote className="text-green-400" />,
      projects: <FaRocket className="text-indigo-400" />,
      areas: <FaGlobeAmericas className="text-teal-400" />,
      resources: <FaBox className="text-yellow-400" />,
      archives: <FaArchive className="text-gray-400" />,
      dribbble: <FaDribbble className="text-pink-600" />,
      figma: <FaFigma className="text-red-400" />,
      google_docs: <FaGoogle className="text-blue-500" />,
      linkedin: <FaLinkedin className="text-blue-600" />,
      medium: <FaMedium className="text-green-500" />,
      spotify: <FaSpotify className="text-green-400" />,
      stackoverflow: <FaStackOverflow className="text-orange-500" />,
      twitter: <FaTwitter className="text-blue-400" />,
      codepen: <FaCode className="text-gray-300" />,
      excalidraw: <FaBars className="text-purple-300" />,
      miro: <FaBars className="text-blue-300" />,
      notion: <IoIosJournal className="text-gray-300" />,
    };
    return icons[type.toLowerCase()] || <FaLink className="text-gray-400" />;
  };

  const fetchDashboardCounts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<DashboardCountsApiResponse>(
        "/api/v1/dashboard/counts"
      );
      if (response.data?.counts) {
        setDashboardCounts(response.data.counts);
      } else {
        setError("Unexpected server response format.");
      }
    } catch (err: any) {
      if (err.response?.status === 401) {
        toast.error("Session expired. Please log in.", { id: "dashboard_err" });
        navigate("/login");
      } else if (err.response?.data?.message) {
        toast.error(`Dashboard error: ${err.response.data.message}`, {
          id: "dashboard_err",
        });
        setError(`Server error: ${err.response.data.message}`);
      } else if (err.request) {
        toast.error("Network error loading dashboard.", {
          id: "dashboard_err",
        });
        setError("Network error. Check your connection.");
      } else {
        toast.error("Unknown error loading dashboard.", {
          id: "dashboard_err",
        });
        setError("Unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchDashboardCounts();
  }, [fetchDashboardCounts]);

  const filteredPlatforms = useMemo(
    () =>
      Object.entries(dashboardCounts.platforms).filter(
        ([, count]) => typeof count === "number" && count > 0
      ),
    [dashboardCounts.platforms]
  );

  const platformChartData = {
    labels: filteredPlatforms.map(
      ([key]) => key.charAt(0).toUpperCase() + key.slice(1)
    ),
    datasets: [
      {
        label: "Content Count",
        data: filteredPlatforms.map(([, count]) => count!),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(199, 199, 199, 0.6)",
          "rgba(100, 100, 200, 0.6)",
          "rgba(200, 100, 100, 0.6)",
          "rgba(100, 200, 100, 0.6)",
          "rgba(200, 200, 100, 0.6)",
          "rgba(100, 200, 200, 0.6)",
          "rgba(150, 50, 150, 0.6)",
          "rgba(50, 150, 50, 0.6)",
          "rgba(50, 50, 150, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(199, 199, 199, 1)",
          "rgba(100, 100, 200, 1)",
          "rgba(200, 100, 100, 1)",
          "rgba(100, 200, 100, 1)",
          "rgba(200, 200, 100, 1)",
          "rgba(100, 200, 200, 1)",
          "rgba(150, 50, 150, 1)",
          "rgba(50, 150, 50, 1)",
          "rgba(50, 50, 150, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: { color: "#e2e8f0" },
      },
      title: {
        display: true,
        text: "Content by Source Platform",
        color: "#f8fafc",
        font: { size: 16 },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = context.dataset.label || "";
            if (label) label += ": ";
            if (context.parsed.y !== null) label += context.parsed.y;
            return label;
          },
        },
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        backgroundColor: "#f1f5f9",
      },
    },
    scales: {
      x: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
      y: {
        ticks: { color: "#e2e8f0" },
        grid: { color: "rgba(255, 255, 255, 0.1)" },
      },
    },
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-1 sm:mb-2">
        Welcome back to your <span className="text-purple-400">Notive</span>!
      </h1>
      <p className="text-base sm:text-lg text-gray-300">
        Your knowledge hub is ready to expand.
      </p>

      {loading ? (
        <div className="text-center text-lg sm:text-xl text-gray-300 py-12">
          Loading your brain's summary...
        </div>
      ) : error ? (
        <div className="text-center text-lg sm:text-xl text-red-400 py-12">
          Error: {error}
        </div>
      ) : (
        <div className="space-y-8">
          {/* Total Content */}
          <div className="bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-md border border-violet-700/50 flex flex-col items-start max-w-full sm:max-w-xs">
            <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">
              {getIconComponent("dashboard_total")}
            </span>
            <h3 className="text-base sm:text-lg font-semibold text-gray-100">
              Total Thoughts
            </h3>
            <p className="text-3xl sm:text-4xl font-bold text-purple-300">
              {dashboardCounts.total}
            </p>
          </div>

          {/* Platforms Chart */}
          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl shadow-md border border-violet-700/50">
            {filteredPlatforms.length > 0 ? (
              <div className="w-full h-[300px] sm:h-[350px]">
                <Bar data={platformChartData} options={chartOptions} />
              </div>
            ) : (
              <p className="text-center text-gray-300 text-base sm:text-lg py-12">
                No platform content to display yet.
              </p>
            )}
          </div>

          {/* PARA Summary */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Your Brain's Structure (P.A.R.A.)
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {Object.entries(dashboardCounts.para).map(([category, count]) => (
                <div
                  key={category}
                  className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-md border border-violet-700/50 flex flex-col items-start"
                >
                  <span className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                    {getIconComponent(category)}
                  </span>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-100 capitalize">
                    {category}
                  </h3>
                  <p className="text-3xl sm:text-4xl font-bold text-purple-300">
                    {count}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/10 backdrop-blur-md p-5 sm:p-8 rounded-xl shadow-md border border-violet-700/50">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
              Quick Actions
            </h2>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <button
                onClick={() => navigate("/content?openAddModal=true")}
                className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg w-full sm:w-auto"
              >
                <span className="text-lg">➕</span> Add New Thought
              </button>
              <button
                onClick={() => navigate("/content")}
                className="flex items-center justify-center sm:justify-start gap-2 px-5 py-3 bg-violet-800 hover:bg-violet-900 text-gray-200 rounded-lg shadow-lg w-full sm:w-auto"
              >
                <span className="text-lg">🔎</span> Explore My Library
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
