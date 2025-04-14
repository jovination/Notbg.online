
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Remove Image Background
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ready to transform your images? Try our free background remover now and see the magic happen in seconds.
        </p>
        
        <div className="relative bg-white rounded-[32px] shadow-lg p-6 mx-auto max-w-sm">
          <h3 className="text-lg font-medium mb-4">Remove Background</h3>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full w-full">
              Start Now <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
          <p className="text-gray-500 text-sm text-center mt-4 mb-4">or drop image here</p>
          <div className="flex justify-center space-x-2 mt-4">
            <div className="w-8 h-8 rounded-md bg-gray-200"></div>
            <div className="w-8 h-8 rounded-md bg-gray-200"></div>
            <div className="w-8 h-8 rounded-md bg-gray-200"></div>
            <div className="w-8 h-8 rounded-md bg-gray-200"></div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute right-0 top-1/2 w-12 h-12 text-primary opacity-60"
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20,40 Q40,20 60,40 Q80,60 100,40" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
