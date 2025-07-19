"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import ImageComparisonSlider from './ImageComparisonSlider';
import Link from 'next/link';

const HeroSection = () => {
  const heroRef = useRef(null);
  const cardRef = useRef(null);

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
    // Animate main card on mount with GSAP
    const card = cardRef.current as HTMLElement | null;
    if (card) {
      gsap.fromTo(
        card,
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.1,
          ease: 'elastic.out(1, 0.6)',
          delay: 0.2,
        }
      );
    }
  }, []);

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-8 md:py-22">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div ref={heroRef} className="text-left">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
              style={{ color: '#1C1C1C' }}
            >
            Turn Boring Photos into Bold Art!
            </h1>
            <p 
              className="text-lg md:text-xl mb-8 max-w-xl leading-relaxed"
              style={{ color: '#6B6B6B' }}
            >
              Why settle for selfies when you can be a sketch, a comic hero, or a renaissance masterpiece? Upload a photo, pick a style , and watch your image become frame-worthy in seconds. Its art magic. No paintbrush required.
            </p>
            <Link href="/PhotoConverter">
              <button 
                className="px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                style={{ 
                  backgroundColor: '#E7C74B',
                  color: '#000000'
                }}
              >
                Convert Now
              </button>
            </Link>
          </div>
          {/* Right Content - Main Character Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mx-auto max-w-md lg:max-w-lg">
              {/* Replace Anime Character Placeholder with ImageComparisonSlider */}
              <ImageComparisonSlider />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection; 