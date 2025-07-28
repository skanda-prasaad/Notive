// src/components/ContentCard.tsx

import React from "react";
import axios from "../services/axios";
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
  FaRegClipboard,
  FaTrashAlt,
} from "react-icons/fa";

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

interface ContentCardProps {
  item: ContentItem;
  onContentDelete?: () => void;
}

export default function ContentCard({
  item,
  onContentDelete,
}: ContentCardProps) {
  const getIconComponent = (type: string): React.ReactElement => {
    switch (type.toLowerCase()) {
      case "youtube":
        return <FaYoutube className="text-red-500" />;
      case "github":
        return <FaGithub className="text-white" />;
      case "instagram":
        return <FaInstagram className="text-pink-500" />;
      case "article":
        return <FaRegFileAlt className="text-blue-400" />;
      case "video":
        return <FaVideo className="text-purple-400" />;
      case "note":
        return <FaStickyNote className="text-green-400" />;
      case "projects":
        return <FaRocket className="text-indigo-400" />;
      case "areas":
        return <FaGlobeAmericas className="text-teal-400" />;
      case "resources":
        return <FaBox className="text-yellow-400" />;
      case "archives":
        return <FaArchive className="text-gray-400" />;
      default:
        return <FaLink className="text-gray-400" />;
    }
  };

  const handleCopyLink = () => {
    if (item.link) {
      navigator.clipboard
        .writeText(item.link)
        .then(() =>
          toast.success("Link copied to clipboard!", { id: "copy_success" })
        )
        .catch(() => toast.error("Failed to copy link.", { id: "copy_error" }));
    } else {
      toast("No link available to copy.", { id: "no_link" });
    }
  };

  const handleDelete = () => {
    toast.custom(
      (t) => (
        <div
          className={`max-w-md w-full bg-gray-800 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-50 ${
            t.visible ? "animate-enter" : "animate-leave"
          }`}
        >
          <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <FaTrashAlt className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-gray-100">
                  Delete Thought?
                </p>
                <p className="mt-1 text-sm text-gray-300">
                  Are you sure you want to delete "{item.title}"? This cannot be
                  undone.
                </p>
              </div>
            </div>
          </div>
          <div className="flex border-l border-gray-700">
            <button
              onClick={async () => {
                try {
                  await axios.delete(`/api/v1/content/${item._id}`);
                  toast.dismiss(t.id);
                  toast.success("Thought deleted successfully!", {
                    id: "deleted",
                  });
                  onContentDelete?.();
                } catch (error) {
                  console.error("Delete failed:", error);
                  toast.dismiss(t.id);
                  toast.error("Failed to delete content.");
                }
              }}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-red-600 hover:text-red-500"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white/10 backdrop-blur-md px-6 py-5 rounded-xl shadow-lg border border-violet-700/50 flex flex-col justify-between min-h-[14rem]">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{getIconComponent(item.type)}</span>
          <h3 className="text-xl font-semibold text-white truncate w-full">
            {item.title || "Untitled Thought"}
          </h3>
        </div>
        <p className="text-gray-300 text-base line-clamp-3 mb-4">
          {item.content || "No detailed notes available."}
        </p>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-violet-700/30">
        <div className="flex flex-col flex-grow min-w-0 mr-2">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm whitespace-nowrap overflow-hidden text-ellipsis"
          >
            {item.link
              ? new URL(item.link).hostname.replace("www.", "")
              : "No Link"}
          </a>
          {item.createdAt && (
            <p className="text-gray-400 text-xs mt-1">
              Added on {formatDate(item.createdAt)}
            </p>
          )}
        </div>
        <div className="flex flex-shrink-0 gap-1">
          <button
            onClick={handleCopyLink}
            className="p-2.5 rounded-full hover:bg-violet-800 transition-colors duration-200 text-gray-300"
            title="Copy Link"
          >
            <FaRegClipboard className="h-5 w-5" />
          </button>
          <button
            onClick={handleDelete}
            className="p-2.5 rounded-full hover:bg-red-800 transition-colors duration-200 text-gray-300"
            title="Delete"
          >
            <FaTrashAlt className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
