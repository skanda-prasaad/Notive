interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    return (
        <div className="p-6 rounded-2xl shadow-lg border transition-all duration-300
          bg-white dark:bg-white/5
          border-gray-200 dark:border-white/10 hover:shadow-xl">

            <div className="text-purple-600 dark:text-purple-400 mb-4 text-3xl">
                {icon}
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300">
                {description}
            </p>
        </div>
    );
}
