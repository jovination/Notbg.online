
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const examples = [
  {
    before: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    after: "/lovable-uploads/245aecfb-aed6-407e-9d3e-746f55c48d8f.png", // Keeping the processed version
    alt: "Woman with laptop",
    description: "Portrait photos"
  },
  {
    before: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    after: "/lovable-uploads/245aecfb-aed6-407e-9d3e-746f55c48d8f.png", // Keeping the processed version
    alt: "Woman on bed",
    description: "Product photos"
  },
  {
    before: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    after: "/lovable-uploads/245aecfb-aed6-407e-9d3e-746f55c48d8f.png", // Keeping the processed version
    alt: "Laptop computer",
    description: "E-commerce"
  },
  {
    before: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    after: "/lovable-uploads/245aecfb-aed6-407e-9d3e-746f55c48d8f.png", // Keeping the processed version
    alt: "Laptop on surface",
    description: "Design"
  },
];

const ExamplesSection = () => {
  const [currentExample, setCurrentExample] = useState(0);

  const nextExample = () => {
    setCurrentExample((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  };

  const prevExample = () => {
    setCurrentExample((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  };

  return (
    <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Examples</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See how our background removal works on different types of images
          </p>
          
          <div className="flex justify-center space-x-4 mb-8">
            {examples.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentExample(index)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  currentExample === index
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {examples[index].description}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
            <div className="bg-[#f8f9fa] p-4 rounded-lg shadow-sm w-full md:w-1/2">
              <p className="text-center font-medium mb-2 text-gray-700">Original</p>
              <div className="aspect-square relative overflow-hidden rounded-md bg-gray-100">
                <img
                  src={examples[currentExample].before}
                  alt={`Original ${examples[currentExample].alt}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            
            <div className="bg-[#f8f9fa] p-4 rounded-lg shadow-sm w-full md:w-1/2">
              <p className="text-center font-medium mb-2 text-gray-700">Transparent background</p>
              <div className="aspect-square relative overflow-hidden rounded-md bg-[url('/placeholder.svg')] bg-gray-100 bg-opacity-50 bg-contain">
                <img
                  src={examples[currentExample].after}
                  alt={`Processed ${examples[currentExample].alt}`}
                  className="object-contain w-full h-full"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevExample}
              className="bg-white shadow-sm hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextExample}
              className="bg-white shadow-sm hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
