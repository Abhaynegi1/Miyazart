import React from 'react';

const GIF_URL = "/loader.gif";

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF4E8]">
    {/* Anime dancing GIF loader */}
    <img
      src={GIF_URL}
      alt="Jujutsu Kaisen Chousou Dancing"
      style={{ width: 160, height: 160, objectFit: 'contain' }}
      draggable={false}
    />
    <div className="mt-6 text-xl font-semibold text-[#1C1C1C] animate-pulse">Loading...</div>
    <div className="mt-2 text-[#6B6B6B]">Summoning your anime experience!</div>
  </div>
);

export default LoadingScreen; 