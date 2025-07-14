'use client';

import React, { useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const MiyazArtLanding = () => {
  const heroRef = useRef(null);
  const heroTextRef = useRef(null);
  const heroImageRef = useRef(null);
  const stepsRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    // Load GSAP from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
    script.onload = () => {
      // Initialize GSAP animations after library loads
      initializeAnimations();
    };
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const initializeAnimations = () => {
    const { gsap } = window;
    if (!gsap) return;

    // Create timeline for hero section
    const heroTimeline = gsap.timeline();
    
    // Hero text animation
    heroTimeline.fromTo(heroTextRef.current, 
      { 
        opacity: 0, 
        y: 50 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        ease: "power3.out" 
      }
    );

    // Hero image animation (slightly delayed)
    heroTimeline.fromTo(heroImageRef.current, 
      { 
        opacity: 0, 
        scale: 0.8,
        rotation: -5
      },
      { 
        opacity: 1, 
        scale: 1,
        rotation: 0, 
        duration: 1.2, 
        ease: "elastic.out(1, 0.5)" 
      }, 
      "-=0.5"
    );

    // Animate steps on scroll
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, index) => {
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          },
          delay: index * 0.2
        }
      );
    });

    // Floating animation for hero image
    gsap.to(heroImageRef.current, {
      y: -10,
      duration: 2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1
    });

    // Hover animations for buttons
    const buttons = document.querySelectorAll('.gsap-button');
    buttons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Stagger animation for navigation items
    const navItems = document.querySelectorAll('.nav-item');
    gsap.fromTo(navItems, 
      { 
        opacity: 0, 
        y: -20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.3
      }
    );
  };

  // Load ScrollTrigger plugin
  useEffect(() => {
    const scrollTriggerScript = document.createElement('script');
    scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
    scrollTriggerScript.onload = () => {
      if (window.gsap) {
        window.gsap.registerPlugin(window.ScrollTrigger);
      }
    };
    document.head.appendChild(scrollTriggerScript);

    return () => {
      if (document.head.contains(scrollTriggerScript)) {
        document.head.removeChild(scrollTriggerScript);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // Animate mobile menu with GSAP
    if (window.gsap) {
      const mobileMenu = document.querySelector('.mobile-menu');
      if (!isMobileMenuOpen) {
        window.gsap.fromTo(mobileMenu, 
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF4E8' }}>
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Left Content */}
            <div ref={heroTextRef} className="text-left">
              <h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
                style={{ color: '#1C1C1C' }}
              >
                Transform Your Photos into Anime Art
              </h1>
              <p 
                className="text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
                style={{ color: '#6B6B6B' }}
              >
                Unleash your creativity and turn your ordinary photos into stunning anime-style masterpieces with our easy-to-use online tool.
              </p>
              <button 
                className="gsap-button px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg"
                style={{ 
                  backgroundColor: '#E7C74B',
                  color: '#000000'
                }}
              >
                Convert Now
              </button>
            </div>

            {/* Right Content - Main Character Image */}
            <div className="relative">
              <div ref={heroImageRef} className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-md lg:max-w-lg">
                {/* Anime Character Placeholder */}
                <div 
                  className="aspect-[3/4] flex items-center justify-center text-center p-8"
                  style={{ backgroundColor: '#C8C1B2' }}
                >
                  <div>
                    <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-200 to-pink-200 flex items-center justify-center">
                      <div className="text-4xl">🎨</div>
                    </div>
                    <p style={{ color: '#1C1C1C' }} className="font-semibold">
                      Beautiful Anime Character
                    </p>
                    <p style={{ color: '#6B6B6B' }} className="text-sm mt-2">
                      Your photo transformed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" ref={stepsRef}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              style={{ color: '#1C1C1C' }}
            >
              How It Works
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#6B6B6B' }}
            >
              Our advanced AI technology transforms your photos into anime-style art in just a few simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 - Upload Your Photo */}
            <div className="step-card text-center">
              <div className="mb-6">
                <div 
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mx-auto max-w-xs"
                  style={{ backgroundColor: '#C8C1B2' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-200 flex items-center justify-center">
                        <div className="text-2xl">👤</div>
                      </div>
                      <p style={{ color: '#1C1C1C' }} className="font-semibold">
                        Portrait Photo
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#1C1C1C' }}
              >
                Upload Your Photo
              </h3>
              <p style={{ color: '#6B6B6B' }}>
                Select the photo you want to transform from your device.
              </p>
            </div>

            {/* Step 2 - Choose Your Style */}
            <div className="step-card text-center">
              <div className="mb-6">
                <div 
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mx-auto max-w-xs"
                  style={{ backgroundColor: '#C8C1B2' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-200 flex items-center justify-center">
                        <div className="text-2xl">🌅</div>
                      </div>
                      <p style={{ color: '#1C1C1C' }} className="font-semibold">
                        Anime Style
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#1C1C1C' }}
              >
                Choose Your Style
              </h3>
              <p style={{ color: '#6B6B6B' }}>
                Choose from a variety of anime styles to match your vision.
              </p>
            </div>

            {/* Step 3 - Download Your Anime Art */}
            <div className="step-card text-center">
              <div className="mb-6">
                <div 
                  className="w-full aspect-square rounded-2xl overflow-hidden shadow-lg mx-auto max-w-xs"
                  style={{ backgroundColor: '#C8C1B2' }}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-200 flex items-center justify-center">
                        <div className="text-2xl">👥</div>
                      </div>
                      <p style={{ color: '#1C1C1C' }} className="font-semibold">
                        Group Art
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h3 
                className="text-xl font-semibold mb-3"
                style={{ color: '#1C1C1C' }}
              >
                Download Your Anime Art
              </h3>
              <p style={{ color: '#6B6B6B' }}>
                Download your newly created anime art in high resolution and share it with the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FAF4E8' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <a 
                href="#" 
                className="hover:underline transition-all duration-200"
                style={{ color: '#D2AD43' }}
              >
                Terms of Service
              </a>
            </div>
            <div>
              <a 
                href="#" 
                className="hover:underline transition-all duration-200"
                style={{ color: '#D2AD43' }}
              >
                Privacy Policy
              </a>
            </div>
            <div>
              <a 
                href="#" 
                className="hover:underline transition-all duration-200"
                style={{ color: '#D2AD43' }}
              >
                Contact Us
              </a>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: '#C8C1B2' }}>
            <p style={{ color: '#6B6B6B' }}>
              &copy; 2024 MiyazArt. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MiyazArtLanding;