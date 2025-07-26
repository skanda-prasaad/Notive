// src/pages/ContentLibrary.tsx

import { useState, useEffect, useCallback } from "react";
import axios from "../services/axios";
import ContentCard from "../components/ContentCard";
import AddContentModal from "../components/AddContentModal";
import { useSearchParams, useLocation } from "react-router-dom";
import ShareLinkModal from "../components/ShareLinkModal";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  content?: string;
  userId: string;
  createdAt: string;
  paraCategory?: string;
  updatedAt: string;
}

interface ContentApiResponse {
  message: string;
  content: ContentItem[];
}

export default function ContentLibrary() {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation(); // Used for auto-opening modal
  const [hasProcessedOpenModalURL, setHasProcessedOpenModalURL] =
    useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);

  const fetchdata = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const category = searchParams.get("category");
      const platform = searchParams.get("platform");

      const queryParams: { [key: string]: string } = {};
      if (category) {
        queryParams.category = category;
      }
      if (platform) {
        queryParams.platform = platform;
      }

      const response = await axios.get<ContentApiResponse>("/api/v1/content", {
        params: queryParams,
      });

      if (response.data && Array.isArray(response.data.content)) {
        setContent(response.data.content);
      } else {
        setError("Received unexpected data format from server.");
      }
    } catch (err: any) {
      console.error("Error fetching content:", err);
      if (err.response) {
        if (err.response.status === 401) {
          setError(
            "Your session has expired or you are not authorized. Please log in again."
          );
        } else if (err.response.data && err.response.data.message) {
          setError(`Server error: ${err.response.data.message}`);
        } else {
          setError("An unexpected server error occurred. Please try again.");
        }
      } else if (err.request) {
        setError(
          "Network error: Could not reach the server. Check your internet connection."
        );
      } else {
        setError("An unknown error occurred while setting up the request.");
      }
    } finally {
      setLoading(false);
    }
  }, [searchParams, setContent, setError, setLoading]);

  useEffect(() => {
    fetchdata();

    const params = new URLSearchParams(location.search);
    const openModalParam = params.get("openAddModal");

    if (openModalParam === "true" && !hasProcessedOpenModalURL) {
      setIsAddModalOpen(true);
      setHasProcessedOpenModalURL(true);

      params.delete("openAddModal");
      setSearchParams(params, { replace: true });
    }
  }, [fetchdata, location.search, setSearchParams, hasProcessedOpenModalURL]);

  function handleAddModal() {
    setIsAddModalOpen(true);
  }
  function handleShareModal() {
    setIsShareModalOpen(true);
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-white">
          Your Content Library
        </h1>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors duration-200"
          onClick={handleAddModal}
        >
          <span className="text-xl">➕</span> Add Content
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-lg transition-colors duration-200"
          onClick={handleShareModal}
        >
          <span className="text-xl"></span> Share content
        </button>
      </div>

      {loading ? (
        <div className="text-center text-xl text-gray-300">
          Loading your content...
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-400">Error: {error}</div>
      ) : content.length === 0 ? (
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-md border border-violet-700/50 text-center text-gray-300 text-lg">
          No content yet! Start by adding your first thought.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.map((item) => (
            <ContentCard
              key={item._id}
              item={item}
              onContentDelete={fetchdata}
            />
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddContentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onContentAdd={fetchdata}
        />
      )}
      {isShareModalOpen && (
        <ShareLinkModal 
        isOpen = {isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        />
      )}
    </div>
  );
}
