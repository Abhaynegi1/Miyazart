import React, { useState, useRef, useEffect } from 'react';

const ImageComparisonSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sample images - you can replace these with your actual before/after images
  const beforeImage = "/beforePhoto.jpeg";
  const afterImage = "/afterPhoto.png";

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMouseMove(e);
  };

  const handleMouseMove = (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging && e.type === 'mousemove') return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = (e as MouseEvent).clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleTouchMove(e);
  };

  const handleTouchMove = (e: TouchEvent | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.type === 'touchmove') return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    if (!rect) return;
    const touches = (e as TouchEvent).touches || (e as React.TouchEvent<HTMLDivElement>).touches;
    if (!touches || touches.length === 0) return;
    const x = touches[0].clientX - (rect?.left ?? 0);
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMouseMove(e);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDragging) {
        handleMouseUp();
      }
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        handleTouchMove(e);
      }
    };

    const handleGlobalTouchEnd = () => {
      if (isDragging) {
        handleTouchEnd();
      }
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('touchmove', handleGlobalTouchMove);
      document.addEventListener('touchend', handleGlobalTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg cursor-col-resize select-none"
      style={{ border: '2px solid #C8C1B2' }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage} 
          alt="After" 
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Before Image (Clipped) */}
      <div 
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img 
          src={beforeImage} 
          alt="Before" 
          className="w-full h-full object-cover"
          draggable={false}
        />
      </div>

      {/* Slider Handle */}
      <div 
        className="absolute top-0 bottom-0 w-1 shadow-lg cursor-col-resize"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          backgroundColor: '#1C1C1C'
        }}
      >
        {/* Slider Button */}
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-lg border-2 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{ 
            backgroundColor: '#FAF4E8', 
            borderColor: '#C8C1B2'
          }}
          onMouseEnter={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#E7C74B'}
          onMouseLeave={(e) => (e.currentTarget as HTMLDivElement).style.backgroundColor = '#FAF4E8'}
        >
          <div className="flex space-x-1">
            <div 
              className="w-1 h-4 rounded"
              style={{ backgroundColor: '#1C1C1C' }}
            ></div>
            <div 
              className="w-1 h-4 rounded"
              style={{ backgroundColor: '#1C1C1C' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Vertical line extending full height */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 pointer-events-none opacity-80"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          backgroundColor: '#1C1C1C'
        }}
      />
    </div>
  );
};

export default ImageComparisonSlider; 