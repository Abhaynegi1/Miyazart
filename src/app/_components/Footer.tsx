import React from 'react';

const Footer = () => (
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
);

export default Footer; 