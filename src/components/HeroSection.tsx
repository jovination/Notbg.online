import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-white h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="flex flex-col lg:flex-row items-center">
        
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 space-y-4 text-center lg:text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Sample Images Grid */}
            <div className="grid grid-cols-1 gap-4 mb-8 max-w-[420px] mx-auto lg:mx-0">
              {[
                {
                  id: "photo-1649972904349-6e44c42644a7",
                  alt: "Woman on bed"
                }
              ].map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="aspect-square rounded-[16px] overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  <img
                    src={`https://images.unsplash.com/${img.id}?w=300&h=300&fit=crop`}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Remove Image
              <span className="block text-primary">Background</span>
            </h1>
            <p className="text-xl font-medium text-gray-600 mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              No backgrounds 100% automatically in 5 seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary">Remove Background</Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Yellow squiggly decorations */}
      <motion.div 
        className="absolute top-40 right-10 w-16 h-16 text-primary opacity-50"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M20,50 Q40,30 60,50 Q80,70 100,50" />
        </svg>
      </motion.div>
      
      <motion.div 
        className="absolute bottom-20 left-10 w-20 h-20 text-primary opacity-50"
        animate={{ x: [-10, 10, -10] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
          <path d="M10,30 Q30,50 50,30 Q70,10 90,30" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
