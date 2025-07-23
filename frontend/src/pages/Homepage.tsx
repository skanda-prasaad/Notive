import Hero from "../components/landing/Hero";
import NavBar from "../components/landing/NavBar";
import { useState } from "react";
import DashboardPreview from "../components/landing/Preview";
import Features from "../components/landing/Features";
import CallToAction from "../components/landing/CallToAct";
import Footer from "../components/landing/Footer";

export default function Homepage() {
  const [dark, setDark] = useState(true);

  return (
    <div className={`min-h-screen w-full relative overflow-hidden transition-colors duration-500 ${dark
        ? 'bg-gradient-to-br from-gray-950 via-purple-900 to-gray-900'
        : 'bg-gradient-to-br from-white via-purple-100 to-gray-100'
      }`}>

      {/* All page content layers on top of background */}
      <div className="relative z-10">
        <NavBar dark={dark} setDark={setDark} />
        <Hero dark={dark} />
        <DashboardPreview dark={dark} />
        <Features/>
        <CallToAction />
        <Footer />
      </div>
    </div>
  );
}
