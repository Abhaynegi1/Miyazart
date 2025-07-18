'use client';
import React, { useState, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const featuresTimeout = useRef<NodeJS.Timeout | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (typeof window !== 'undefined') {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!isMobileMenuOpen && mobileMenu) {
        gsap.fromTo(
          mobileMenu,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
      }
    }
  };

  const handleFeaturesEnter = () => {
    if (featuresTimeout.current) clearTimeout(featuresTimeout.current);
    setIsFeaturesOpen(true);
  };

  const handleFeaturesLeave = () => {
    featuresTimeout.current = setTimeout(() => {
      setIsFeaturesOpen(false);
    }, 250);
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
            <Link href="/" className="text-white hover:text-yellow-300 transition-colors duration-200 nav-item">Home</Link>
            <div
              className="relative"
              onMouseEnter={handleFeaturesEnter}
              onMouseLeave={handleFeaturesLeave}
            >
              <button
                className="text-white hover:text-yellow-300 transition-colors duration-200 nav-item flex items-center gap-1"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Features <ChevronDown className="w-4 h-4" />
              </button>
              <AnimatePresence>
                {isFeaturesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="absolute left-0 mt-2 w-48 bg-black rounded-xl shadow-lg py-2 z-50 border border-gray-700"
                    style={{ pointerEvents: isFeaturesOpen ? 'auto' : 'none' }}
                  >
                    <Link href="/PhotoConverter" className="block px-4 py-2 text-white hover:bg-yellow-100 hover:text-black transition-colors duration-150">Animefy</Link>
                    <Link href="/PhotoBackgroundRemover" className="block px-4 py-2 text-white hover:bg-yellow-100 hover:text-black transition-colors duration-150">Remove BG</Link>
                    <Link href="#" className="block px-4 py-2 text-white hover:bg-yellow-100 hover:text-black transition-colors duration-150">Placeholder</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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
          {/* Mobile Menu Button and Get Started Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              className="gsap-button border-2 text-black px-4 py-1 rounded-full nav-item"
              style={{ 
                borderColor: '#E7C74B',
                backgroundColor: '#E7C74B'
              }}
            >
              Get Started
            </button>
            <button onClick={toggleMobileMenu} className="text-white nav-item">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`mobile-menu md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-black`}>
        <div className="px-4 py-2 space-y-2">
          <Link href="/" className="block py-2 text-white hover:text-yellow-300">Home</Link>
          <a href="#features" className="block py-2 text-white hover:text-yellow-300">Features</a>
          <a href="#pricing" className="block py-2 text-white hover:text-yellow-300">Pricing</a>
          <a href="#contact" className="block py-2 text-white hover:text-yellow-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 