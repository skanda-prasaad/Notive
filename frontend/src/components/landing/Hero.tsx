import { Link } from "react-router-dom";

interface HeroProps {
  dark?: boolean;
}

export default function Hero({ dark = true }: HeroProps) {
  return (
    <section className="min-h-[80vh] flex items-center justify-center px-6 py-20 transition-colors duration-300 relative overflow-hidden">
      {/* Subtle animated gradient background blur */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-20 -right-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-[pulse_6s_infinite]" />

      <div
        className={`relative z-10 max-w-3xl w-full text-center rounded-2xl shadow-xl border p-10 md:p-16 space-y-8 backdrop-blur-md ${
          dark
            ? "bg-white/5 border-white/10 text-white"
            : "bg-white/90 border-gray-200 text-gray-900"
        } animate-fadeIn`}
      >
        <h1
          className={`text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] transition-colors duration-300 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
          Your Digital Brain Organizer
          <span
            className={`block mt-3 font-extrabold ${
              dark ? "text-purple-400" : "text-purple-700"
            } animate-slideUp`}
          >
            Yours Always.
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl font-medium leading-relaxed max-w-2xl mx-auto transition-colors duration-300 ${
            dark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          Capture every idea, link & insight. Structure your knowledge effortlessly
          and recall instantly with <span className="font-semibold">Notive</span>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/signup"
            className={`px-8 py-3 rounded-lg text-lg font-bold shadow-md transition transform hover:scale-105 hover:shadow-purple-500/40 ${
              dark
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-purple-600 hover:bg-purple-700 text-white"
            }`}
          >
            Start for Free Today
          </Link>

          <a
            href="#features"
            className={`px-8 py-3 rounded-lg text-lg font-semibold border shadow-md transition transform hover:scale-105 hover:shadow-md ${
              dark
                ? "border-gray-400/40 hover:border-white/80 text-gray-200 hover:text-white bg-white/10 hover:bg-white/20"
                : "border-gray-300 hover:border-purple-400 text-gray-700 hover:text-purple-900 bg-white hover:bg-purple-50"
            }`}
          >
            Learn More
          </a>
        </div>
      </div>
    </section>
  );
}
