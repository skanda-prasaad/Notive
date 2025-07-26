// src/components/ShareLinkModal.tsx

import { useState, useEffect } from "react";
import axios from "../services/axios";

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
          } else if (err.response.data && err.response.data.message) {
            setError(`Server Error: ${err.response.data.message}`);
          } else {
            setError("An unexpected server error occurred.");
          }
        } else if (err.request) {
          setError(
            "Network error: Could not reach the server. Check your internet connection."
          );
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (isOpen && !shareLink) {
      generateShareLink();
    }
  }, [isOpen, shareLink]);

  const handleCopyLink = async () => {
    if (shareLink) {
      try {
        await navigator.clipboard.writeText(shareLink);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy link:", err);
        alert("Failed to copy link. Please copy manually.");
      }
    }
  };

  const handleStopSharing = async () => {
    // Async for await axios.post
    const confirmed = window.confirm(
      "Are you sure you want to stop sharing your content?"
    );
    if (confirmed) {
      setLoading(true); // Start loading when attempting to stop sharing
      setError(null); // Clear errors

      try {
        const response = await axios.post("/api/v1/brain/share", {
          share: false,
        });
        if (response.status === 200) {
          setShareLink(null); // Clear the shareLink state
          alert("Sharing stopped successfully!"); // User feedback
          onClose(); // Close the modal
        } else {
          setError("Unexpected response from server when stopping sharing."); // Fallback
        }
      } catch (err: any) {
        console.error("Error stopping sharing:", err);
        if (err.response) {
          if (err.response.status === 401) {
            setError("Unauthorized: Please log in again.");
          } else if (err.response.data && err.response.data.message) {
            setError(`Server Error: ${err.response.data.message}`);
          } else {
            setError("An unexpected server error occurred.");
          }
        } else if (err.request) {
          setError(
            "Network error: Could not reach the server. Check your internet connection."
          );
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false); // Stop loading regardless of outcome
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

        {/* Display content based on loading/error/shareLink state */}
        {loading ? (
          <div className="text-center text-xl text-gray-300 py-8">
            {shareLink ? "Stopping Sharing..." : "Generating link..."}
          </div>
        ) : error ? (
          <div className="bg-red-900/30 text-red-300 p-3 rounded-md mb-4 text-center">
            {error}
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
          // This block runs if not loading, no error, and no shareLink (e.g., after successful stop sharing)
          <div className="text-center text-xl text-gray-300 py-8">
            No share link currently active. Click "Generate" to create one.
            {/* You could add a button here to generate the link again if you want */}
          </div>
        )}
      </div>
    </div>
  );
}
