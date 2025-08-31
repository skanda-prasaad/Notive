import Hero from "../components/landing/Hero";
import NavBar from "../components/landing/NavBar";
import DashboardPreview from "../components/landing/Preview";
import Features from "../components/landing/Features";
import CallToAction from "../components/landing/CallToAct";
import Footer from "../components/landing/Footer";

export default function Homepage() {
  return (
    <div className="min-h-screen w-full relative bg-white overflow-hidden font-sans bg-gradient-to-br from-gray-950 via-purple-900 to-gray-900 text-white">
      <div className="relative z-10">
        <NavBar />
        <div>
          <Hero />
        </div>
        <div>
          <DashboardPreview />
        </div>
        <div>
          <Features />
        </div>
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
