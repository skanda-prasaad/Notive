import { Link, useNavigate } from "react-router-dom";
import api from "../services/axios";
import { useState } from "react";

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
  const [dark, setDark] = useState(true);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const res = await api.post("/api/v1/signup", form);
      if (res.status === 201) {
        alert("Signup successful");
        navigate("/login");
      }
    } catch (err: unknown) {
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { status?: number } }).response?.status ===
          "number"
      ) {
        const status = (err as { response: { status: number } }).response
          .status;

        if (status === 403) {
          alert("User already exists.");
        } else if (status === 411) {
          alert("Invalid input. Check your details.");
        } else {
          alert("Something went wrong. Try again.");
        }

        console.error("Error:", (err as { message?: string }).message);
      } else {
        alert("Unexpected error. Please try again.");
        console.error("Unknown error:", err);
      }
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
        {/* Branding */}
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo.png" alt="NeuroNest Logo" className="w-8 h-8" />
            <h1 className="text-2xl font-bold tracking-tight">NeuroNest</h1>
          </div>
          <p className={`text-sm ${dark ? "text-gray-300" : "text-gray-600"}`}>
            Your second brain — organized, visual, and forever yours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
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
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
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
            placeholder="Create Password"
            onChange={handleChange}
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
          >
            Create Account
          </button>
        </form>

        {/* Theme toggle + redirect */}
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
    </div>
  );
}
