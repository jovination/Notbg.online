
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Remove Image Background
            <span className="block text-primary">instantly for FREE</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Get rid of backgrounds 100% automatically in 5 seconds with one click
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="gap-2 bg-primary text-black hover:bg-primary/90 rounded-full">
              Start Now <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50 rounded-full">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
