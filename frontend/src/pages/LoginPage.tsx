// src/pages/LoginPage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
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
  const [form, setForm] = useState<Signin>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
      let message = "Something went wrong. Please try again.";
      if (err.response) {
        if (err.response.status === 401 || err.response.status === 403) {
          message = "Invalid email or password.";
        } else if (err.response.status >= 500) {
          message = "Server error. Please try again later.";
        }
      } else if (err.request) {
        message = "Network error. Please check your internet connection.";
      }
      toast.error(message, { id: "login_fail" });
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-950 via-purple-900 to-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border backdrop-blur-md bg-white/5 border-white/10">
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img src="/logo.png" alt="Notive Logo" className="w-8 h-8 filter invert" />
            <h1 className="text-2xl font-bold tracking-tight">Notive</h1>
          </div>
          <p className="text-sm text-gray-300">
            Welcome back — your personal knowledge hub.
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
            className="w-full px-4 py-3 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              value={form.password}
              required
              className="w-full px-4 py-3 pr-12 rounded-lg border bg-white/10 border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg text-white font-semibold bg-purple-600 hover:bg-purple-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log In"}
          </button>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-500 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
