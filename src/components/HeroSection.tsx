
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 yellow-gradient-bg">
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
              <Button size="lg" className="gap-2">
                Start Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-lg shadow-xl overflow-hidden">
              <img
                src="/lovable-uploads/245aecfb-aed6-407e-9d3e-746f55c48d8f.png"
                alt="Background removal example"
                className="w-full h-auto"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="squiggle -top-4 -left-8 text-2xl">✨</div>
            <div className="squiggle top-1/4 -right-8 text-3xl">🌟</div>
            <div className="squiggle bottom-1/4 -left-10 text-3xl">〰️</div>
            <div className="squiggle -bottom-6 right-1/4 text-3xl">✨</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
