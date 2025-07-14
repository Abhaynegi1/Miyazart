'use client';
import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // @ts-expect-error: dynamic gsap usage, safe in browser context
    if (typeof window !== 'undefined' && window.gsap) {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!isMobileMenuOpen) {
        // @ts-expect-error: dynamic gsap usage, safe in browser context
        (window.gsap as any).fromTo(mobileMenu, 
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  };

  return (
    <nav className="w-full bg-black shadow-sm relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center nav-item">
            <div className="w-6 h-6 mr-2" style={{ color: '#E7C74B' }}>
              <ChevronDown className="w-6 h-6 rotate-90" />
            </div>
            <span className="text-xl font-semibold text-white">
              MiyazArt
            </span>
          </div>
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-yellow-300 transition-colors duration-200 nav-item">Home</a>
            <a href="#features" className="text-white hover:text-yellow-300 transition-colors duration-200 nav-item">Features</a>
            <a href="#pricing" className="text-white hover:text-yellow-300 transition-colors duration-200 nav-item">Pricing</a>
            <a href="#contact" className="text-white hover:text-yellow-300 transition-colors duration-200 nav-item">Contact</a>
            <button 
              className="gsap-button border-2 text-white px-6 py-2 rounded-full hover:bg-yellow-400 hover:text-black hover:border-yellow-400 transition-all duration-200 nav-item"
              style={{ 
                borderColor: '#E7C74B',
                backgroundColor: '#E7C74B',
                color: '#000000'
              }}
            >
              Get Started
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMobileMenu} className="text-white nav-item">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-black`}>
        <div className="px-4 py-2 space-y-2">
          <a href="#home" className="block py-2 text-white hover:text-yellow-300">Home</a>
          <a href="#features" className="block py-2 text-white hover:text-yellow-300">Features</a>
          <a href="#pricing" className="block py-2 text-white hover:text-yellow-300">Pricing</a>
          <a href="#contact" className="block py-2 text-white hover:text-yellow-300">Contact</a>
          <button 
            className="gsap-button w-full mt-2 border-2 text-black py-2 rounded-full"
            style={{ 
              borderColor: '#E7C74B',
              backgroundColor: '#E7C74B'
            }}
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 