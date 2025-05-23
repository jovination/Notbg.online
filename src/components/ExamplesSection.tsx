
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const examples = [
  {
    before: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&fit=crop", // Same image as before (we'll explain in the UI)
    alt: "Woman with laptop",
    description: "Portrait photos"
  },
  {
    before: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&fit=crop", // Same image as before (we'll explain in the UI)
    alt: "Woman on bed",
    description: "Product photos"
  },
  {
    before: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&fit=crop", // Same image as before (we'll explain in the UI)
    alt: "Laptop computer",
    description: "E-commerce"
  },
  {
    before: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&fit=crop",
    after: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&fit=crop", // Same image as before (we'll explain in the UI)
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
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">Examples</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See how our background removal works on different types of images
          </p>
          
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {examples.map((example, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentExample(index)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition ${
                  currentExample === index
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {example.description}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentExample}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-6 items-center justify-center"
            >
              <motion.div 
                className="bg-[#f8f9fa] p-4 rounded-[32px] shadow-sm w-full md:w-1/2"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-center font-medium mb-2 text-gray-700">Original</p>
                <div className="aspect-square relative overflow-hidden rounded-[24px] bg-gray-100">
                  <motion.img
                    src={examples[currentExample].before}
                    alt={`Original ${examples[currentExample].alt}`}
                    className="object-cover w-full h-full"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-[#f8f9fa] p-4 rounded-[32px] shadow-sm w-full md:w-1/2"
                initial={{ x: 20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-center font-medium mb-2 text-gray-700">Upload your own image to see results</p>
                <div className="aspect-square relative overflow-hidden rounded-[24px] bg-gray-100 flex items-center justify-center">
                  <motion.p 
                    className="text-gray-400 text-center p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Background removal will be applied<br/>to your uploaded images
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
          
          <div className="flex justify-center mt-6 space-x-4">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevExample}
                className="bg-white shadow-sm hover:bg-gray-50 rounded-full"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextExample}
                className="bg-white shadow-sm hover:bg-gray-50 rounded-full"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
