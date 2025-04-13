
import { 
  Camera, 
  Clock, 
  Wand2, 
  Download, 
  PenTool, 
  Award 
} from "lucide-react";
import { motion } from "framer-motion";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => (
  <motion.div 
    className="bg-white p-6 rounded-[32px] shadow-sm hover:shadow-md transition-shadow"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -5 }}
  >
    <motion.div 
      className="text-blue-500 mb-4"
      initial={{ scale: 0.8 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
    >
      {icon}
    </motion.div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <Wand2 className="h-8 w-8" />,
      title: "Automatic Processing",
      description: "Our AI detects the subject and removes background with no manual selection needed."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Remove backgrounds in seconds, not minutes. Save hours of tedious editing work."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Stunning Quality",
      description: "Preserve fine details like hair and transparent elements for professional results."
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: "Instant Download",
      description: "Download your edited images instantly in high-resolution PNG format."
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Batch Processing",
      description: "Process multiple images at once to save even more time."
    },
    {
      icon: <PenTool className="h-8 w-8" />,
      title: "No Design Skills Needed",
      description: "Anyone can achieve professional results with our simple one-click solution."
    }
  ];

  return (
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">
            Remove backgrounds 100% automatically
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tool makes background removal simple, fast, and incredibly accurate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
            />
          ))}
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          className="absolute right-10 bottom-10 w-20 h-20 text-primary opacity-60 hidden lg:block"
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3">
            <path d="M20,50 Q40,70 60,50 Q80,30 100,50" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
