// src/components/landing/Features.tsx - FINAL FIXED

import FeatureCard from "./FeatureCard";
import { Brain, Layers, Clock, Share2, Shield, Search } from "lucide-react";

const features = [
  {
    icon: <Brain />,
    title: "Second Brain Structure",
    description: "Organize your content into Projects, Areas, Resources, and Archives (P.A.R.A.).",
  },
  {
    icon: <Layers />,
    title: "Effortless Capture",
    description: "Save articles, videos, and notes from any platform with a single click.",
  },
  {
    icon: <Clock />,
    title: "Instant Retrieval",
    description: "Find any thought instantly with a powerful search that understands your context.",
  },
  {
    icon: <Share2 />,
    title: "Secure Sharing",
    description: "Collaborate and share your knowledge with others securely and privately.",
  },
  {
    icon: <Shield />,
    title: "Private & Yours",
    description: "Your data is yours alone. We ensure a secure and private environment for your thoughts.",
  },
  {
    icon: <Search />,
    title: "Seamless Integration",
    description: "Connect your content from YouTube, GitHub, Medium, and more into one single hub.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 px-4 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-white">
          Features Built for Your Productivity
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}