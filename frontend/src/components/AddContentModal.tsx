// src/components/AddContentModal.tsx

import React, { useState } from "react";
import axios from "../services/axios";
import toast from "react-hot-toast";

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
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
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
      console.error("Error submitting content:", err);
      if (err.response) {
        if (err.response.status === 400) {
          setError(
            `Validation Error: ${
              err.response.data.message || "Please check your input."
            }`
          );
          toast.error(
            `Validation Error: ${err.response.data.message || "Check input."}`,
            { id: "add_error" }
          );
        } else if (err.response.status === 401) {
          setError("Unauthorized: Please log in again.");
          toast.error("Session expired. Please log in.", { id: "add_error" });
        } else if (err.response.data && err.response.data.message) {
          setError(`Server Error: ${err.response.data.message}`);
          toast.error(`Server Error: ${err.response.data.message}`, {
            id: "add_error",
          });
        } else {
          setError("An unexpected server error occurred.");
          toast.error("Error adding thought.", { id: "add_error" });
        }
      } else if (err.request) {
        setError(
          "Network error: Could not reach the server. Check your internet connection."
        );
        toast.error("Network error adding thought.", { id: "add_error" });
      } else {
        setError("An unknown error occurred.");
        toast.error("Unknown error adding thought.", { id: "add_error" });
      }
    } finally {
      setLoading(false);
    }
  }

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
          Add New Thought
        </h2>

        {error && (
          <div className="bg-red-900/30 text-red-300 p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={handleInput}
              value={form.title}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <input
              type="url"
              name="link"
              id="link"
              placeholder="Link (e.g., https://example.com/video)"
              onChange={handleInput}
              value={form.link}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="content" className="sr-only">
              Notes/Content
            </label>
            <textarea
              name="content"
              id="content"
              placeholder="Any notes or detailed thoughts (optional)"
              onChange={handleInput}
              value={form.content}
              rows={3}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="type" className="sr-only">
              Content Type
            </label>
            <select
              name="type"
              id="type"
              onChange={handleInput}
              value={form.type}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
              disabled={loading}
            >
              <option value="">Select Content Type</option>
              <option value="article">Article 📄</option>
              <option value="video">Video 🎥</option>
              <option value="youtube">YouTube ▶️</option>
              <option value="github">GitHub 🐙</option>
              <option value="instagram">Instagram 📸</option>
              <option value="note">Note 📝</option>
            </select>
          </div>

          <div>
            <label htmlFor="paraCategory" className="sr-only">
              P.A.R.A. Category
            </label>
            <select
              name="paraCategory"
              id="paraCategory"
              onChange={handleInput}
              value={form.paraCategory}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            >
              <option value="">Select P.A.R.A. Category</option>
              <option value="projects">Projects 🚀</option>
              <option value="areas">Areas 🌍</option>
              <option value="resources">Resources 📦</option>
              <option value="archives">Archives 📜</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Adding Thought..." : "Add Thought"}{" "}
          </button>
        </form>
      </div>
    </div>
  );
}
