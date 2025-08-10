// src/components/landing/CallToAct.tsx - FINAL FIXED

import { Link } from "react-router-dom";

export default function CallToAction() {
  return (
    <section
      id="cta"
      className="py-16 px-6 text-center mx-4 md:mx-auto max-w-4xl my-10
      rounded-2xl shadow-xl border backdrop-blur-md bg-white/5 border-white/10 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
        Ready to take control of your knowledge?
      </h2>

      <p className="text-base md:text-lg mb-6 text-gray-300">
        Start building your second brain today with{" "}
        <span className="font-semibold text-purple-400">Notive</span>.
      </p>

      <Link
        to="/signup"
        className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-lg transition"
      >
        Get Started for Free →
      </Link>
    </section>
  );
}