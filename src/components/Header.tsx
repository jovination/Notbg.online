
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 sm:px-6 md:px-8 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-xl flex items-center">
            <img src="/lovable-uploads/bbbc152b-72da-4619-99de-b0b6dfcd6483.png" alt="Logo" className="h-8 mr-2" />
            removebg
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-gray-700 hover:text-blue-500 font-medium">Remove Background</a>
          <a href="#features" className="text-gray-700 hover:text-blue-500 font-medium flex items-center">
            Features <ChevronDown className="ml-1 h-4 w-4" />
          </a>
          <a href="#business" className="text-gray-700 hover:text-blue-500 font-medium flex items-center">
            For Business <ChevronDown className="ml-1 h-4 w-4" />
          </a>
          <a href="#pricing" className="text-gray-700 hover:text-blue-500 font-medium">Pricing</a>
          <a href="#login" className="text-gray-700 hover:text-blue-500 font-medium ml-4">Log in</a>
          <Button className="rounded-md bg-blue-500 hover:bg-blue-600 text-white">Sign up</Button>
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
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden absolute top-16 inset-x-0 z-50 bg-white shadow-lg p-4 animate-fade-in rounded-3xl mx-4"
        >
          <nav className="flex flex-col space-y-4">
            <a 
              href="#home" 
              className="text-gray-700 hover:text-blue-500 font-medium p-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Remove Background
            </a>
            <a 
              href="#features" 
              className="text-gray-700 hover:text-blue-500 font-medium p-2 flex items-center" 
              onClick={() => setIsMenuOpen(false)}
            >
              Features <ChevronDown className="ml-1 h-4 w-4" />
            </a>
            <a 
              href="#business" 
              className="text-gray-700 hover:text-blue-500 font-medium p-2 flex items-center" 
              onClick={() => setIsMenuOpen(false)}
            >
              For Business <ChevronDown className="ml-1 h-4 w-4" />
            </a>
            <a 
              href="#pricing" 
              className="text-gray-700 hover:text-blue-500 font-medium p-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#login" 
              className="text-gray-700 hover:text-blue-500 font-medium p-2" 
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </a>
            <Button 
              className="w-full rounded-md bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign up
            </Button>
          </nav>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
