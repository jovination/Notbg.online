
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 bg-white h-screen flex items-center justify-center">
      <div className="max-w-7xl  w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Remove Image
              <span className="block text-primary">Background</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl lg:max-w-none mx-auto lg:mx-0">
              Get rid of backgrounds 100% automatically in 5 seconds with one click
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full sm:w-auto">
                  Start Now <ArrowRight className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Image Section */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Yellow decorative elements */}
              <motion.div 
                className="absolute -top-10 -left-10 w-20 h-20 text-primary"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M10,50 Q30,10 50,50 Q70,90 90,50" />
                </svg>
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-10 -right-10 w-16 h-16 text-primary"
                initial={{ rotate: 0 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M30,20 Q50,40 70,20 Q90,0 70,40" />
                </svg>
              </motion.div>
              
 <div className="relative mt-10 max-w-[432px] w-[360px] md:w-full h-[346px] bg-white rounded-[32px] shadow-xl p-6 mx-auto flex flex-col items-center justify-center">
  <div className="bg-blue-500 text-xl font-semibold text-white rounded-full py-3 px-5 text-center mb-4">
    <span>Upload Image</span>
  </div>
  <p className="text-gray-500 text-base font-semibold text-center mb-4">or drop image here</p>
  <div className="flex justify-center space-x-2 mt-4">
    {[
      "photo-1581091226825-a6a2a5aee158",
      "photo-1649972904349-6e44c42644a7",
      "photo-1488590528505-98d2b5aba04b",
      "photo-1531297484001-80022131f5a1",
    ].map((id, i) => (
      <div key={i} className="w-8 h-8 rounded-md overflow-hidden">
        <img
          src={`https://images.unsplash.com/${id}?w=100&h=100&fit=crop`}
          alt={`Sample ${i + 1}`}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
</div>


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
