'use client';

import React, { useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { initializeLandingPageAnimations, initializeScrollTriggerPlugin, animateMobileMenu } from "../_components/gsapUtils";
import HeroSection from "../_components/HeroSection";
import HowItWorksSection from "../_components/HowItWorksSection";

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
      initializeLandingPageAnimations(heroTextRef, heroImageRef);
    };
    document.head.appendChild(script);

    // Cleanup
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    initializeScrollTriggerPlugin();
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    animateMobileMenu(isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF4E8' }}>
      <HeroSection heroTextRef={heroTextRef} heroImageRef={heroImageRef} />
      <HowItWorksSection stepsRef={stepsRef} />
    </div>
  );
};

export default MiyazArtLanding;