
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Side: Text Content and Example Image */}
          <motion.div 
            className="lg:w-1/2 text-left mb-10 lg:mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-gray-800">
              Remove Image<br />
              Background
            </h1>
            
            <div className="flex items-center mb-6">
              <p className="text-lg text-gray-700 mr-3">100% Automatically and</p>
              <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-medium">Free</span>
            </div>
            
            {/* Example image with yellow blob background */}
            <div className="relative hidden lg:block max-w-sm">
              {/* Yellow blob */}
              <svg className="absolute -left-10 -top-10 w-96 h-96 text-yellow-300 opacity-80" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M40.9,-62.8C54.1,-56,66.9,-47.4,75.1,-35.1C83.3,-22.7,86.9,-6.5,84.1,8.3C81.3,23.2,72.1,36.7,61.3,47.9C50.5,59.1,38.1,68,24.2,74.2C10.4,80.5,-4.9,84.1,-19.6,81.4C-34.3,78.8,-48.3,69.9,-59.1,58C-69.9,46.1,-77.5,31.1,-80.1,14.9C-82.7,-1.3,-80.3,-18.7,-72.5,-32.6C-64.7,-46.5,-51.5,-57,-37.8,-63.7C-24.1,-70.5,-10.1,-73.5,2.3,-77.2C14.7,-80.9,27.7,-85.3,40.9,-79.8C54.1,-74.3,67.3,-58.9,73.1,-44.6C78.9,-30.3,77.3,-15.2,74.7,-1.5C72.1,12.2,68.5,24.4,62.3,35.3C56.1,46.1,47.4,55.5,36.6,60.8C25.8,66.1,12.9,67.1,-0.2,67.4C-13.3,67.7,-26.6,67.2,-38.8,62.3C-51,57.3,-62.1,47.8,-68.4,36C-74.7,24.2,-76.3,10.1,-74.2,-3.1C-72.1,-16.3,-66.4,-28.7,-58.1,-38.8C-49.8,-48.9,-38.9,-56.7,-27.1,-64.7C-15.3,-72.7,-2.4,-80.9,8.4,-79.8C19.2,-78.7,38.5,-68.3,40.9,-62.8Z" transform="translate(100 100)" fill="currentColor" />
              </svg>
              
              {/* Example person image */}
              <img 
                src="/lovable-uploads/245aecfb-aed6-407e-9d3e-746f55c48d8f.png" 
                alt="Person with plants" 
                className="relative z-10 max-h-72 object-contain"
              />
            </div>
          </motion.div>
          
          {/* Right Side: Upload Card */}
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              {/* Yellow squiggly decorative element - top right */}
              <motion.svg 
                className="absolute -top-16 right-0 w-32 h-32 text-yellow-400 opacity-80 z-0"
                viewBox="0 0 100 100"
                initial={{ rotate: 0 }}
                animate={{ rotate: 5, y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M10,30 Q30,5 50,30 Q70,55 90,30" fill="none" stroke="currentColor" strokeWidth="3" />
              </motion.svg>
              
              {/* Card with upload functionality */}
              <div className="relative z-10 bg-white rounded-3xl shadow-xl p-8 mx-auto max-w-md">
                <div className="flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-full text-center mb-6"
                  >
                    Upload Image
                  </motion.button>
                  
                  <p className="text-gray-500 text-center mb-2">or drop a file,</p>
                  <p className="text-gray-400 text-sm text-center mb-8">paste image or URL</p>
                  
                  <div className="mb-6 w-full">
                    <p className="text-gray-500 text-sm mb-4">No image?</p>
                    <p className="text-gray-500 text-sm mb-2">Try one of these:</p>
                    
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div 
                          key={i} 
                          className="aspect-square rounded-md bg-gray-200 overflow-hidden hover:opacity-80 transition-opacity cursor-pointer"
                        >
                          <div className="w-full h-full bg-gray-300"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-400 text-center">
                    By uploading an image or URL you agree to our Terms of Service.
                    <br />To learn more about how remove.bg handles your personal data, check our Privacy Policy
                  </p>
                </div>
              </div>
              
              {/* Yellow squiggly decorative element - bottom left */}
              <motion.svg 
                className="absolute -bottom-20 -left-10 w-32 h-32 text-yellow-400 opacity-80 z-0"
                viewBox="0 0 100 100" 
                initial={{ rotate: 0 }}
                animate={{ rotate: -5, x: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M10,50 Q30,70 50,50 Q70,30 90,50" fill="none" stroke="currentColor" strokeWidth="3" />
              </motion.svg>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Bottom decorative element */}
      <motion.svg 
        className="absolute bottom-0 left-1/4 w-32 h-32 text-yellow-400 opacity-60"
        viewBox="0 0 100 100"
        initial={{ rotate: 0 }}
        animate={{ 
          rotate: 360,
          y: [0, 10, 0] 
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <path d="M20,50 Q40,20 60,50 Q80,80 100,50" fill="none" stroke="currentColor" strokeWidth="3" />
      </motion.svg>
    </section>
  );
};

export default HeroSection;
