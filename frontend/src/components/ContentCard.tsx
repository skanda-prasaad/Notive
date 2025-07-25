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

interface ContentItemProp {
  item: ContentItem;
  onContentDelete: () => void;
}

export default function ContentCard({
  item,
  onContentDelete,
}: ContentItemProp) {
  const getPlatformIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "youtube":
        return "▶️";
      case "github":
        return "🐙";
      case "instagram":
        return "📸";
      case "video":
        return "🎥";
      case "article":
        return "📄";
      case "note":
        return "📝";
      case "project":
        return "🚀";
      case "area":
        return "🌍";
      case "resource":
        return "📦";
      case "archive":
        return "📜";
      default:
        return "🔗";
    }
  };

  const handleCopyLink = () => {
    if (item.link) {
      navigator.clipboard
        .writeText(item.link)
        .then(() => alert("Copied Link"))
        .catch((err) => console.error("failed" + err));
    }
    {
      alert("No link to copy");
    }
  };
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this thought?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(`api/v1/content/${item._id}`);
        if (response.status === 200) {
          onContentDelete();
          alert("Thought deleted successfully!"); // Confirmation message
        } else {
          alert("Unexpected response from server during deletion.");
        }
      } catch (err: any) {
        console.error("Error deleting content:", err);
        if (err.response) {
          if (err.response.status === 401) {
            alert("Unauthorized: Please log in again.");
          } else if (err.response.data && err.response.data.message) {
            alert(`Deletion Failed: ${err.response.data.message}`);
          } else {
            alert("An unexpected server error occurred during deletion.");
          }
        } else if (err.request) {
          alert(
            "Network error: Could not reach the server. Check your connection."
          );
        } else {
          alert("An unknown error occurred.");
        }
      }
    }
  };
  return (
    <div className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg border border-violet-700/50 flex flex-col justify-between h-56">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{getPlatformIcon(item.type)}</span>
          <h3 className="text-xl font-semibold text-white truncate w-full">
            {item.title || "Untitled Thought"}
          </h3>
        </div>
        <p className="text-gray-300 text-sm line-clamp-2">
          {item.content || "No detailed notes available."}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-violet-700/30">
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 text-sm truncate max-w-[calc(100%-80px)]"
        >
          {item.link
            ? new URL(item.link).hostname.replace("www.", "") || item.link
            : "No Link"}
        </a>
        <div className="flex gap-2">
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-full hover:bg-violet-800 transition-colors duration-200 text-gray-300"
            title="Copy Link"
          >
            📋
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full hover:bg-red-800 transition-colors duration-200 text-gray-300"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
}
