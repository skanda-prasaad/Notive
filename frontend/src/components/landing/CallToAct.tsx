export default function CallToAction() {
    return (
      <section
        className="py-16 px-6 text-center mx-4 sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60 my-10
        rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300
        bg-white/80 dark:bg-white/5 border-gray-200 dark:border-white/10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Take control of your digital brain
        </h2>
  
        <p className="text-base md:text-lg mb-6 text-gray-700 dark:text-gray-300">
          Join 100+ developers who’ve started organizing their second brain with{" "}
          <span className="font-semibold text-purple-700 dark:text-purple-400">NeuroNest</span>.
        </p>
  
        <a
          href="/signup"
          className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-full shadow-md transition"
        >
          Get Started for Free →
        </a>
      </section>
    );
  }
  