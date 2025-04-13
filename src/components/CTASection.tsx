
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Remove Image Background
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Ready to transform your images? Try our free background remover now and see the magic happen in seconds.
        </p>
        <Button size="lg" className="gap-2">
          Start Now <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};

export default CTASection;
