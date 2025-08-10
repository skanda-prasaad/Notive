// src/components/landing/Preview.tsx - FINAL FIXED
import dashboard from "../../assets/dashboard.png"
export default function DashboardPreview() {
  return (
    <section id="preview" className="py-20 px-4 md:px-6 flex justify-center text-white">
      <div className="max-w-5xl text-center space-y-8">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Your Second Brain. Visually.</h2>
        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
          See how Notive helps you capture, categorize, and revisit thoughts effortlessly with a clean, intuitive dashboard.
        </p>

        <div className="overflow-hidden rounded-2xl shadow-2xl border border-white/10 mt-12">
          <img
            src={dashboard}
            alt="Notive Dashboard preview"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}