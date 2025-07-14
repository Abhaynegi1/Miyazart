import React from 'react';
import Image from 'next/image';

const GIF_URL = "/loader.gif";

const LoadingScreen: React.FC = () => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF4E8]">
    {/* Anime dancing GIF loader */}
    <Image
      src={GIF_URL}
      alt="Jujutsu Kaisen Chousou Dancing"
      width={160}
      height={160}
      style={{ objectFit: 'contain' }}
      draggable={false}
      priority
    />
    <div className="mt-6 text-xl font-semibold text-[#1C1C1C] animate-pulse">Loading...</div>
    <div className="mt-2 text-[#6B6B6B]">Summoning your anime experience!</div>
  </div>
);

export default LoadingScreen; 