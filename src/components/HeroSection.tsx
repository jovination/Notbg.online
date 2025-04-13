
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Content */}
          <div className="lg:w-1/2 space-y-6 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Remove Image Background
              <span className="block text-primary">instantly for FREE</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
              Get rid of backgrounds 100% automatically in 5 seconds with one click
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="gap-2 bg-primary text-black hover:bg-primary/90">
                Start Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="border-gray-300 hover:bg-gray-50">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Background removal example"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
