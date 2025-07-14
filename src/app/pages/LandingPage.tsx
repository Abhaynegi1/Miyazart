'use client';

import React, { useEffect, useRef } from 'react';

const MiyazArtLanding = () => {
  const heroRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  useEffect(() => {
    // Animate hero section on mount
    const hero = heroRef.current as HTMLElement | null;
    if (hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(30px)';
      setTimeout(() => {
        hero.style.transition = 'all 0.8s ease-out';
        hero.style.opacity = '1';
        hero.style.transform = 'translateY(0)';
      }, 100);
    }
    // Animate features on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF4E8' }}>
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div ref={heroRef} className="text-left">
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
                className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
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
              <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-md lg:max-w-lg">
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
      <section className="py-16 px-4 sm:px-6 lg:px-8">
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
            <div className="animate-on-scroll text-center">
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
            <div className="animate-on-scroll text-center">
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
            <div className="animate-on-scroll text-center">
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
    </div>
  );
};

export default MiyazArtLanding;