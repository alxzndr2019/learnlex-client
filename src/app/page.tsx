import HeroSection from "./_components/sections/HeroSection";
import FeaturesSection from "./_components/sections/FeaturesSection";
import PricingSection from "./_components/sections/PricingSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <PricingSection />
    </div>
  );
}
