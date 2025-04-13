
import { Camera, Clock, Wand2, Download, PenTool, Award } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="benefit-card">
    <div className="text-primary mb-4">{icon}</div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
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
    <section id="features" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Remove backgrounds 100% automatically
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our AI-powered tool makes background removal simple, fast, and incredibly accurate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
