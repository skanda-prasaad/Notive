// src/components/ShareLinkModal.tsx

import{ useState, useEffect } from "react";
import axios from "../services/axios";
import toast from "react-hot-toast";

interface ShareLinkModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShareLinkResponse {
  hash: string;
}

export default function ShareLinkModal({
  isOpen,
  onClose,
}: ShareLinkModalProps) {
  const [shareLink, setShareLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateShareLink = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.post<ShareLinkResponse>(
          "/api/v1/brain/share",
          { share: true }
        );

        if (response.data && response.data.hash) {
          setShareLink(`http://localhost:5173/brain/~${response.data.hash}`);
        } else {
          setError("Failed to generate link: Hash not received from server.");
        }
      } catch (err: any) {
        console.error("Error generating share link:", err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized: Please log in again.");
            toast.error("Unauthorized: Please log in again.", {
              id: "share_error",
            });
          } else if (err.response.data && err.response.data.message) {
            setError(`Server Error: ${err.response.data.message}`);
            toast.error(`Server Error: ${err.response.data.message}`, {
              id: "share_error",
            });
          } else {
            setError("An unexpected server error occurred.");
            toast.error("An unexpected error occurred.", { id: "share_error" });
          }
        } else if (err.request) {
          setError(
            "Network error: Could not reach the server. Check your internet connection."
          );
          toast.error("Network error. Check connection.", {
            id: "share_error",
          });
        } else {
          setError("An unknown error occurred.");
          toast.error("Unknown error occurred.", { id: "share_error" });
        }
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && !shareLink) {
      generateShareLink();
    }
  }, [isOpen, shareLink, setShareLink, setLoading, setError]);

  const handleCopyLink = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        toast.success("Link copied to clipboard!", { id: "copy_success" });
      } catch (err) {
        console.error("Failed to copy link:", err);
        toast.error("Failed to copy link. Please copy manually.", {
          id: "copy_error",
        });
      }
    }
  };

  const handleStopSharing = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to stop sharing your content?"
    );
    if (confirmed) {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.post("/api/v1/brain/share", {
          share: false,
        });
        if (response.status === 200) {
          setShareLink(null);
          toast.success("Sharing stopped successfully!", {
            id: "share_stopped",
          });
          onClose();
        } else {
          setError("Unexpected response from server when stopping sharing.");
          toast.error("Error stopping sharing.", { id: "share_stopped_error" });
        }
      } catch (err: any) {
        console.error("Error stopping sharing:", err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized: Please log in again.");
            toast.error("Unauthorized. Please log in again.", {
              id: "share_stopped_error",
            });
          } else if (err.response.data && err.response.data.message) {
            setError(`Server Error: ${err.response.data.message}`);
            toast.error(`Server Error: ${err.response.data.message}`, {
              id: "share_stopped_error",
            });
          } else {
            setError("An unexpected server error occurred.");
            toast.error("Unexpected error occurred.", {
              id: "share_stopped_error",
            });
          }
        } else if (err.request) {
          setError(
            "Network error: Could not reach the server. Check your internet connection."
          );
          toast.error("Network error. Check connection.", {
            id: "share_stopped_error",
          });
        } else {
          setError("An unknown error occurred.");
          toast.error("Unknown error occurred.", { id: "share_stopped_error" });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Share Your Brain
        </h2>

        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-xl text-gray-300 py-8">
            {shareLink ? "Stopping Sharing..." : "Generating link..."}
          </div>
        ) : shareLink ? (
          <div className="space-y-4">
            <label
              htmlFor="shareLinkInput"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Your Shareable Link:
            </label>
            <input
              type="text"
              id="shareLinkInput"
              readOnly
              value={shareLink}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 cursor-text"
            />
            <button
              onClick={handleCopyLink}
              className="w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Copy Link
            </button>
            <button
              onClick={handleStopSharing}
              className="w-full py-3 rounded-lg text-white font-semibold bg-red-600 hover:bg-red-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Stop Sharing
            </button>
          </div>
        ) : (
          <div className="text-center text-xl text-gray-300 py-8">
            No share link currently active. Click "Generate" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
