
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ImageUploader from "@/components/ImageUploader";
import FeaturesSection from "@/components/FeaturesSection";
import ExamplesSection from "@/components/ExamplesSection";
import TestimonialSection from "@/components/TestimonialSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ImageUploader />
        <FeaturesSection />
        <ExamplesSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
