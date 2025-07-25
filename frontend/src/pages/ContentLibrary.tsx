// src/pages/ContentLibrary.tsx

import { useEffect, useState, useCallback } from "react"; // <-- ADD useCallback here!
import axios from "../services/axios";
import ContentCard from "../components/ContentCard";
import AddContentModal from "../components/AddContentModal";
import { useSearchParams } from "react-router-dom"; // Use react-router-dom for consistency

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

  // WRAP fetchdata in useCallback
  const fetchdata = useCallback(async () => {
    // <-- ADD useCallback here, and the arrow function syntax
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
    // DEPENDENCY ARRAY FOR use
    // These are the things 'fetchdata' uses from its outside scope
  }, [searchParams, setContent, setError, setLoading]); // <-- ADD THIS DEPENDENCY ARRAY FOR useCallback!

  useEffect(() => {
    fetchdata();
  }, [fetchdata]); // <-- Now, useEffect depends on 'fetchdata' (which is stable thanks to useCallback)

  function handleAddModal() {
    setIsAddModalOpen(true);
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
              onContentDelete={fetchdata} // fetchdata is stable now
            />
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddContentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onContentAdd={fetchdata} // fetchdata is stable now
        />
      )}
    </div>
  );
}
