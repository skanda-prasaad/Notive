// src/pages/SignupPage.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/axios";
import toast from 'react-hot-toast';

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/signup", form);
      if (res.status === 201) {
        toast.success("Signup successful! Please log in.", { id: 'signup_success' });
        navigate("/login");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 403) {
          toast.error("User with this email already exists.", { id: 'signup_error' });
        } else if (err.response.status === 400) { 
          toast.error(`Validation Error: ${err.response.data.message || "Please check your input."}`, { id: 'signup_error' });
        } else if (err.response.data && err.response.data.message) {
          toast.error(`Server error: ${err.response.data.message}`, { id: 'signup_error' });
        } else {
          toast.error("An unexpected server error occurred.", { id: 'signup_error' });
        }
      } else if (err.request) {
        toast.error("Network error: Could not reach the server.", { id: 'signup_error' });
      } else {
        toast.error("An unknown error occurred during signup.", { id: 'signup_error' });
      }
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-900 to-gray-900 text-white"> {/* Applied dark theme */}
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border backdrop-blur-md bg-white/5 border-white/10"> {/* Applied modal-like card style */}
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo.png" alt="NeuroNest Logo" className="w-8 h-8 filter invert" />
            <h1 className="text-2xl font-bold tracking-tight">NeuroNest</h1>
          </div>
          <p className="text-sm text-gray-300">
            Join NeuroNest — your personal knowledge hub.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="sr-only">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-purple-500 hover:underline font-medium"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}