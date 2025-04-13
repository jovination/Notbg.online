
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <motion.div 
        className="max-w-4xl mx-auto text-center bg-white p-8 rounded-[32px] shadow-sm"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6">
          Remove Image Background with Notbg
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ready to transform your images? Try our free background remover now and see the magic happen in seconds.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button size="lg" className="gap-2 rounded-full">
            Start Now <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
