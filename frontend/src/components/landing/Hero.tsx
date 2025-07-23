interface HeroProps {
    dark?: boolean;
}

export default function Hero({ dark = true }: HeroProps) {
    return (
        <section className="min-h-[80vh] flex items-center justify-center px-6 py-20 transition-colors duration-300">

            <div className={`max-w-3xl w-full text-center rounded-2xl shadow-xl border p-10 md:p-16 space-y-8 backdrop-blur-md ${dark ? 'bg-white/5 border-white/10 text-white' : 'bg-white/90 border-gray-200 text-gray-900'
                }`}>

                <h1
                    className={`text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg transition-colors duration-300 ${dark ? 'text-white' : 'text-gray-900'
                        }`}
                >
                    Ready to Build Your{' '}
                    <span className={dark ? 'text-purple-400' : 'text-purple-700'}>Second Brain?</span>
                </h1>
                <p
                    className={`text-lg md:text-2xl font-medium transition-colors duration-300 ${dark ? 'text-gray-300' : 'text-gray-700'
                        }`}
                >
                    Join hundreds of users already mastering their knowledge with{' '}
                    <span className={dark ? 'text-white font-semibold' : 'text-purple-900 font-semibold'}>NeuroNest</span>.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                    <a
                        href="/signup"
                        className={`px-8 py-3 rounded-lg text-lg font-bold shadow-md transition ${dark
                            ? 'bg-purple-600 hover:bg-purple-700 text-white'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                            }`}
                    >
                        Start for Free Today
                    </a>
                    <a
                        href="#features"
                        className={`px-8 py-3 rounded-lg text-lg font-semibold border shadow-md transition ${dark
                            ? 'border-gray-400/40 hover:border-white/80 text-gray-200 hover:text-white bg-white/10 hover:bg-white/20'
                            : 'border-gray-300 hover:border-purple-400 text-gray-700 hover:text-purple-900 bg-white hover:bg-purple-50'
                            }`}
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </section>
    );
}
