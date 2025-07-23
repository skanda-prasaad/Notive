import FeatureCard from "./FeatureCard";
import { Sparkles, Brain, Layers, Clock, Share2, Shield } from "lucide-react"; // or any icons you use

const features = [
  {
    icon: <Sparkles />,
    title: "Clean & Minimal",
    description: "No clutter. Just your thoughts organized beautifully.",
  },
  {
    icon: <Brain />,
    title: "Second Brain",
    description: "Structure notes like your mind. Fast, natural, powerful.",
  },
  {
    icon: <Layers />,
    title: "Nested Notes",
    description: "Go deep. Create infinite layers of context and content.",
  },
  {
    icon: <Clock />,
    title: "Auto Save",
    description: "Never worry about losing thoughts again.",
  },
  {
    icon: <Share2 />,
    title: "Quick Sharing",
    description: "Share notes securely in one click.",
  },
  {
    icon: <Shield />,
    title: "Private & Secure",
    description: "Your data. Fully encrypted. Forever yours.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          Powerful Features Built for Your Mind
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
