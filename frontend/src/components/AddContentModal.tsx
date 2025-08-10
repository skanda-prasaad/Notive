import React, { useState } from "react";
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
  FaDribbble,
  FaFigma,
  FaGoogle,
  FaLinkedin,
  FaMedium,
  FaSpotify,
  FaStackOverflow,
  FaTwitter,
  FaCode,
  FaBars,
  FaDropbox, // Added FaDropbox import
} from "react-icons/fa";
import { IoIosJournal } from "react-icons/io";

const contentTypes = {
  youtube: { label: "YouTube", icon: <FaYoutube className="text-red-500" /> },
  github: { label: "GitHub", icon: <FaGithub className="text-gray-300" /> }, // Changed from text-white to text-gray-300 for visibility
  instagram: {
    label: "Instagram",
    icon: <FaInstagram className="text-pink-500" />,
  },
  article: {
    label: "Article",
    icon: <FaRegFileAlt className="text-blue-400" />,
  },
  video: { label: "Video", icon: <FaVideo className="text-purple-400" /> },
  note: { label: "Note", icon: <FaStickyNote className="text-green-400" /> },
  dribbble: {
    label: "Dribbble",
    icon: <FaDribbble className="text-pink-600" />,
  },
  figma: { label: "Figma", icon: <FaFigma className="text-red-400" /> },
  google_docs: {
    label: "Google Docs",
    icon: <FaGoogle className="text-blue-500" />,
  },
  linkedin: {
    label: "LinkedIn",
    icon: <FaLinkedin className="text-blue-600" />,
  },
  medium: { label: "Medium", icon: <FaMedium className="text-green-500" /> },
  spotify: { label: "Spotify", icon: <FaSpotify className="text-green-400" /> },
  stackoverflow: {
    label: "Stack Overflow",
    icon: <FaStackOverflow className="text-orange-500" />,
  },
  twitter: { label: "Twitter", icon: <FaTwitter className="text-blue-400" /> },
  codepen: { label: "CodePen", icon: <FaCode className="text-gray-300" /> },
  excalidraw: {
    label: "Excalidraw",
    icon: <FaBars className="text-purple-300" />,
  },
  miro: { label: "Miro", icon: <FaBars className="text-blue-300" /> },
  notion: { label: "Notion", icon: <IoIosJournal className="text-gray-300" /> },
  dropbox: { label: "Dropbox", icon: <FaDropbox className="text-blue-400" /> }, // Added Dropbox
};

const paraCategories = {
  projects: {
    label: "Projects",
    icon: <FaRocket className="text-indigo-400" />,
  },
  areas: {
    label: "Areas",
    icon: <FaGlobeAmericas className="text-teal-400" />,
  },
  resources: {
    label: "Resources",
    icon: <FaBox className="text-yellow-400" />,
  },
  archives: {
    label: "Archives",
    icon: <FaArchive className="text-gray-400" />,
  },
};

interface AddContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContentAdd: () => void;
}

type AddContentForm = {
  title: string;
  link: string;
  content: string;
  type: string;
  paraCategory?: string;
};

export default function AddContentModal({
  isOpen,
  onClose,
  onContentAdd,
}: AddContentModalProps) {
  const [form, setForm] = useState<AddContentForm>({
    title: "",
    link: "",
    content: "",
    type: "",
    paraCategory: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  function handleInput(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("api/v1/content", form);
      if (response.status === 200 || response.status === 201) {
        onContentAdd();
        onClose();
        setForm({
          title: "",
          link: "",
          content: "",
          type: "",
          paraCategory: "",
        });
        toast.success("Thought added successfully!", { id: "add_success" });
      } else {
        setError(
          "Unexpected response from server. Content might not be saved."
        );
        toast.error("Unexpected error adding thought.", { id: "add_error" });
      }
    } catch (err: any) {
      setError("An error occurred.");
      toast.error("Error adding thought.", { id: "add_error" });
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 p-6 rounded-xl shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Add New Thought
        </h2>
        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={handleInput}
            value={form.title}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading}
          />
          <input
            type="url"
            name="link"
            placeholder="Link (e.g., https://example.com/video)"
            onChange={handleInput}
            value={form.link}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
            disabled={loading}
          />
          <textarea
            name="content"
            placeholder="Any notes or detailed thoughts (optional)"
            onChange={handleInput}
            value={form.content}
            rows={3}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading}
          />
          <select
            name="type"
            onChange={handleInput}
            value={form.type}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 max-h-48 overflow-y-auto"
            required
            disabled={loading}
          >
            <option value="">Select Content Type</option>
            {Object.entries(contentTypes).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-gray-800 text-white">
                {label}
              </option>
            ))}
          </select>
          <select
            name="paraCategory"
            onChange={handleInput}
            value={form.paraCategory}
            className="w-full px-4 py-3 rounded-lg border bg-gray-800 border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 max-h-48 overflow-y-auto"
            disabled={loading}
          >
            <option value="">Select P.A.R.A. Category</option>
            {Object.entries(paraCategories).map(([key, { label }]) => (
              <option key={key} value={key} className="bg-gray-800 text-white">
                {label}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Adding Thought..." : "Add Thought"}
          </button>
        </form>
      </div>
    </div>
  );
}
