
const examples = [
  {
    before: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    after: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Woman with laptop",
  },
  {
    before: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    after: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    alt: "Woman on bed",
  },
  {
    before: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    after: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Laptop computer",
  },
  {
    before: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    after: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    alt: "Laptop on surface",
  },
];

const ExamplesSection = () => {
  return (
    <section id="examples" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Just Picture It</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See the amazing results our tool can achieve with these before and after examples
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((example, index) => (
            <div key={index} className="image-container group cursor-pointer">
              <img
                src={example.before}
                alt={example.alt}
                className="w-full h-auto object-cover aspect-square"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Result
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExamplesSection;
