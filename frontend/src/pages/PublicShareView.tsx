// src/pages/PublicShareView.tsx

import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../services/axios";
import ContentCard from "../components/ContentCard";
import toast from "react-hot-toast";

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

interface PublicShareApiResponse {
  username: string;
  content: ContentItem[];
}

export default function PublicShareView() {
  const { shareLink } = useParams();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [sharerName, setSharerName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSharedContent = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<PublicShareApiResponse>(
        `/api/v1/brain/~${shareLink}`
      );

      if (response.data && Array.isArray(response.data.content)) {
        setContent(response.data.content);
        setSharerName(response.data.username);
      } else {
        setError("Invalid response data for shared content.");
      }
    } catch (err: any) {
      console.error("Error fetching shared content:", err);
      if (err.response) {
        if (err.response.status === 404) {
          setError("Share link not found or content is no longer shared.");
          toast.error("Link not found/shared.", { id: "public_share_error" });
        } else if (err.response.data && err.response.data.message) {
          setError(`Server Error: ${err.response.data.message}`);
          toast.error(`Error: ${err.response.data.message}`, {
            id: "public_share_error",
          });
        } else {
          setError("An unexpected server error occurred.");
          toast.error("An unexpected error occurred.", {
            id: "public_share_error",
          });
        }
      } else if (err.request) {
        setError("Network error: Could not reach the server.");
        toast.error("Network error. Check connection.", {
          id: "public_share_error",
        });
      } else {
        setError("An unknown error occurred.");
        toast.error("Unknown error.", { id: "public_share_error" });
      }
    } finally {
      setLoading(false);
    }
  }, [shareLink, setContent, setSharerName, setLoading, setError]);

  useEffect(() => {
    fetchSharedContent();
  }, [fetchSharedContent]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-indigo-950 text-gray-100 p-8">
      {loading ? (
        <div className="text-center text-xl text-gray-300">
          Loading shared content...
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-400">Error: {error}</div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {" "}
          {/* Centralized content area */}
          <h1 className="text-4xl font-extrabold text-white">
            Public Shared Brain
          </h1>
          {sharerName && (
            <p className="text-gray-300 text-lg mb-4">
              Shared by{" "}
              <span className="font-semibold text-purple-300">
                {sharerName}
              </span>
            </p>
          )}
          {content.length === 0 ? (
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-md border border-violet-700/50 text-center text-gray-300 text-lg">
              No content available via this link.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
              {content.map((item) => (
                <ContentCard key={item._id} item={item} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
