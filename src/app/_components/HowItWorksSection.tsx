import React from 'react';

type HowItWorksSectionProps = {
  stepsRef: React.RefObject<HTMLDivElement>;
};

const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ stepsRef }) => (
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
);

export default HowItWorksSection; 