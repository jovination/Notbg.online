
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 md:px-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-xl">Notbg</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-700 hover:text-primary font-medium">Features</a>
          <a href="#examples" className="text-gray-700 hover:text-primary font-medium">Examples</a>
          <a href="#testimonials" className="text-gray-700 hover:text-primary font-medium">Testimonials</a>
          <Button className="ml-4">Get Started</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-50 bg-white shadow-lg p-4 animate-fade-in rounded-3xl">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#features" 
              className="text-gray-700 hover:text-primary font-medium p-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#examples" 
              className="text-gray-700 hover:text-primary font-medium p-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Examples
            </a>
            <a 
              href="#testimonials" 
              className="text-gray-700 hover:text-primary font-medium p-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <Button className="w-full" onClick={() => setIsMenuOpen(false)}>
              Get Started
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
