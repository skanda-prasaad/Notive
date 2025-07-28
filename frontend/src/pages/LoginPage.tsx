// src/pages/LoginPage.tsx

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../services/axios";
import toast from "react-hot-toast";

type Signin = {
  email: string;
  password: string;
};

type LoginResponse = {
  message: string;
  token: string;
};

export default function LoginPage() {
  const [form, setForm] = useState<Signin>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(true); // Assuming you still have dark/light mode toggle
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post<LoginResponse>("/api/v1/signin", form);

      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful!", { id: "login_success" });
        navigate("/dashboard");
      } else {
        setError("Login failed. No token received.");
        toast.error("Login failed. No token received.", { id: "login_fail" });
      }
    } catch (err: any) {
      console.error("Login error:", err);

      let message = "Something went wrong. Please try again.";
      if (err.response) {
        const status = err.response.status;
        if (status === 404) {
          message = "Login service not found. Please try again later.";
          toast.error(message, { id: "login_fail" });
        } else if (status === 401 || status === 403) {
          message = "Invalid email or password.";
          toast.error(message, { id: "login_fail" });
        } else if (status >= 500) {
          message = "Server error. Please try again later.";
          toast.error(message, { id: "login_fail" });
        }
      } else if (err.request) {
        message = "Network error: Please check your internet connection.";
        toast.error(message, { id: "login_fail" });
      } else {
        message = "An unexpected error occurred.";
        toast.error(message, { id: "login_fail" });
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        dark
          ? "bg-gradient-to-br from-gray-950 via-purple-900 to-gray-900"
          : "bg-gradient-to-br from-white via-purple-100 to-gray-100"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300
        ${
          dark
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white/90 border-gray-200 text-gray-900"
        }`}
      >
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo.png" alt="NeuroNest Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">NeuroNest</h1>
          </div>
          <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
            Welcome back — let's unlock your second brain.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={form.email}
            required
            className={`w-full px-4 py-3 rounded-lg border transition
              ${
                dark
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={form.password}
            required
            className={`w-full px-4 py-3 rounded-lg border transition
              ${
                dark
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>

        <div className="mt-6 text-center text-sm space-y-2">
          <button
            onClick={() => setDark(!dark)}
            className={`underline hover:text-purple-500 transition ${
              dark ? "text-gray-400" : "text-gray-700"
            }`}
          >
            Switch to {dark ? "Light" : "Dark"} Mode
          </button>
          <p className={`${dark ? "text-gray-400" : "text-gray-600"}`}>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-500 hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
