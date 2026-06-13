import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import UnderstandSection from "@/components/UnderstandSection";
import ActionSection from "@/components/ActionSection";
import ResourcesSection from "@/components/ResourcesSection";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background transition-colors duration-500">
      <Navbar />
      <HeroSection />
      <UnderstandSection />
      <ActionSection />
      <ResourcesSection />
      <AboutSection />
      <Footer />
    </div>
  );
}
