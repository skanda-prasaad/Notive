export default function DashboardPreview({ dark }: { dark: boolean }) {
    return (
        <section className={`py-8 px-4 flex justify-center transition-colors duration-300 ${dark ? 'text-white' : 'text-gray-900'
            }`}>

            <div className="max-w-5xl text-center space-y-8">
                <h2 className="text-4xl font-bold">Your Second Brain. Visually.</h2>
                <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-lg`}>
                    Here’s how NeuroNest helps you capture, categorize, and revisit thoughts effortlessly.
                </p>

                <div className="overflow-hidden rounded-2xl shadow-xl border border-gray-800">
                    <img
                        src="/images/dashboard-preview.png"
                        alt="Dashboard preview"
                        className="w-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
}
