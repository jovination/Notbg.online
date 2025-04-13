
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface TestimonialProps {
  content: string;
  author: string;
  position: string;
  avatar: string;
  index: number;
}

const Testimonial = ({ content, author, position, avatar, index }: TestimonialProps) => (
  <motion.div 
    className="bg-white p-6 rounded-[32px] shadow-md flex flex-col gap-4"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true, margin: "-100px" }}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-2 text-amber-400">
      {[...Array(5)].map((_, i) => (
        <motion.svg 
          key={i} 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </motion.svg>
      ))}
    </div>
    <p className="text-gray-700">{content}</p>
    <div className="flex items-center gap-3 mt-2">
      <Avatar>
        <AvatarImage src={avatar} alt={author} />
        <AvatarFallback>{author.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-medium">{author}</h4>
        <p className="text-sm text-gray-500">{position}</p>
      </div>
    </div>
  </motion.div>
);

const TestimonialSection = () => {
  const testimonials = [
    {
      content: "This tool saved me hours of tedious work. The background removal is flawless, even with complex subjects like hair and transparent objects.",
      author: "Sarah Johnson",
      position: "Graphic Designer",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      content: "I've tried many background removers but this one gives the most professional results. Perfect for my product photography needs.",
      author: "Michael Chen",
      position: "E-commerce Owner",
      avatar: "https://i.pravatar.cc/150?img=8",
    },
    {
      content: "The speed is incredible. I can process dozens of images in minutes, and the quality is consistently excellent. 100% recommend!",
      author: "Emma Rodríguez",
      position: "Social Media Manager",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  return (
    <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8 bg-primary">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold mb-4">They love us. You will too.</h2>
          <p className="text-xl max-w-3xl mx-auto">
            Join thousands of satisfied users who have discovered the easiest way to remove image backgrounds
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              position={testimonial.position}
              avatar={testimonial.avatar}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
