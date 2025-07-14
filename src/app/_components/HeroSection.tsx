import React from 'react';

type HeroSectionProps = {
  heroTextRef: React.RefObject<HTMLDivElement>;
  heroImageRef: React.RefObject<HTMLDivElement>;
};

const HeroSection: React.FC<HeroSectionProps> = ({ heroTextRef, heroImageRef }) => (
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
);

export default HeroSection; 