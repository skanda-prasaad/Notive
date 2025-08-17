
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "../services/axios";
import toast from "react-hot-toast";
import Notivelogo from "../assets/logo.png";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

type FieldErrors = {
  [key: string]: string[];
};

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: [] });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    try {
      const res = await axios.post("/api/v1/signup", form);
      if (res.status === 201) {
        toast.success("Signup successful! Please log in.", {
          id: "signup_success",
        });
        navigate("/login");
      }
    } catch (err: any) {
      if (err.response) {
        if (err.response.status === 403) {
          toast.error("User with this email already exists.", {
            id: "signup_error",
          });
        } else if (err.response.status === 400) {
          const fieldErrors: FieldErrors = {};
          const zodErrors = err.response.data.errors;

          if (Array.isArray(zodErrors)) {
            zodErrors.forEach((e: any) => {
              const field = e.path?.[0];
              if (field) {
                if (!fieldErrors[field]) fieldErrors[field] = [];
                fieldErrors[field].push(e.message);
              }
            });
          }

          setErrors(fieldErrors);
          toast.error("Please fix the highlighted errors.", {
            id: "signup_error",
          });
        } else if (err.response.data?.message) {
          toast.error(`Server error: ${err.response.data.message}`, {
            id: "signup_error",
          });
        } else {
          toast.error("An unexpected server error occurred.", {
            id: "signup_error",
          });
        }
      } else if (err.request) {
        toast.error("Network error: Could not reach the server.", {
          id: "signup_error",
        });
      } else {
        toast.error("An unknown error occurred during signup.", {
          id: "signup_error",
        });
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-purple-900 to-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-xl border backdrop-blur-md bg-white/5 border-white/10">
        <div className="mb-8 text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <img
              src={Notivelogo}
              alt="Notive Logo"
              className="w-12 h-12 rounded-2xl"
            />
            <h1 className="text-2xl font-bold tracking-tight">Notive</h1>
          </div>
          <p className="text-sm text-gray-300">
            Join Notive — your personal knowledge hub.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.name ? "border-red-500" : "border-white/20"
              } bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
            {errors.name && (
              <p className="text-red-400 text-sm mt-1">
                {errors.name.join(", ")}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.email ? "border-red-500" : "border-white/20"
              } bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
              required
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">
                {errors.email.join(", ")}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className={`w-full px-4 py-3 pr-12 rounded-lg border ${
                  errors.password ? "border-red-500" : "border-white/20"
                } bg-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-sm mt-1">
                {errors.password.join(", ")}
              </p>
            )}
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
