import { useEffect, useState } from "react";
import axios from "../services/axios";

interface ContentItem {
  _id: string;
  title: string;
  link: string;
  type: string;
  content?: string;
  userId: string;
  createdAt: string;
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

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get<ContentApiResponse>("api/v1/content");
        if (response.data && Array.isArray(response.data.content)) {
          setContent(response.data.content);
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
    };
    fetchdata();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-4xl font-extrabold text-white mb-4">
        Your Content Library
      </h1>

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
        <div className="space-y-4">
          {content.map((item) => (
            <div
              key={item._id}
              className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-sm border border-violet-700/30"
            >
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="text-gray-300 text-sm">Type: {item.type}</p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:underline"
              >
                {item.link}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
