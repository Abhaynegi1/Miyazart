"use client"
import React, { useState, useRef } from 'react';
import { Upload, Download, Palette, Sparkles, ChevronDown, X, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface ConversionTheme {
  id: string;
  name: string;
  description: string;
  color: string;
}

const PhotoConverter: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<ConversionTheme | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const conversionThemes: ConversionTheme[] = [
    { id: 'ghibli', name: 'Ghibli', description: 'Whimsical Studio Ghibli-inspired art', color: '#A3D9A5' },
    { id: 'demon-slayer', name: 'Demon Slayer', description: 'Bold and vibrant Demon Slayer style', color: '#FF6F61' },
    { id: 'jojo', name: "JoJo's Bizarre Adventure", description: 'Dramatic and colorful JoJo flair', color: '#B39DDB' },
    { id: 'naruto', name: 'Naruto', description: 'Energetic ninja-inspired Naruto look', color: '#F7C873' },
    { id: 'attack-on-titan', name: 'Attack on Titan', description: 'Epic and intense Attack on Titan vibe', color: '#A1887F' },
    { id: 'mob-psycho', name: 'Mob Psycho 100', description: 'Psychedelic Mob Psycho 100 effect', color: '#7DE2D1' },
    { id: 'black-white', name: 'Dramatic B&W', description: 'High contrast black and white', color: '#696969' }
  ];

  const sampleImages = [
    '/api/placeholder/60/60',
    '/api/placeholder/60/60',
    '/api/placeholder/60/60',
    '/api/placeholder/60/60'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setConvertedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file?.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target?.result as string);
          setConvertedImage(null);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleConvert = async () => {
    if (!selectedImage || !selectedTheme) return;
    
    setIsConverting(true);
    setTimeout(() => {
      setConvertedImage(selectedImage);
      setIsConverting(false);
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const selectTheme = (theme: ConversionTheme) => {
    setSelectedTheme(theme);
    setIsDropdownOpen(false);
  };

  const CustomDropdown = () => (
    <div className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full px-4 py-3 rounded-xl border-2 bg-white text-left flex items-center justify-between transition-all duration-300 hover:border-pink-400 focus:outline-none focus:border-pink-400"
        style={{ borderColor: selectedTheme ? '#E91E63' : '#C8C1B2', color: '#1C1C1C' }}
      >
        <div className="flex items-center space-x-3">
          {selectedTheme ? (
            <>
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: selectedTheme.color }}
              />
              <div>
                <span className="font-medium text-sm">{selectedTheme.name}</span>
              </div>
            </>
          ) : (
            <>
              <Palette className="w-4 h-4 text-gray-400" />
              <span className="text-gray-500 text-sm">Select Style</span>
            </>
          )}
        </div>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-300 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          style={{ color: '#6B6B6B' }}
        />
      </button>

      {isDropdownOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 rounded-xl shadow-lg z-10 overflow-hidden"
          style={{ borderColor: '#C8C1B2' }}
        >
          {conversionThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => selectTheme(theme)}
              className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-3"
            >
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: theme.color }}
              />
              <div>
                <span className="font-medium text-sm text-gray-900">{theme.name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  // Calculate aspect ratio and set max dimensions for modal
  let aspectRatio = 4 / 3;
  let maxWidth = 480;
  let maxHeight = 360;
  if (selectedImage) {
    const img = new window.Image();
    img.src = selectedImage;
    img.onload = () => {
      aspectRatio = img.width / img.height;
      if (aspectRatio > 1) {
        maxWidth = 480;
        maxHeight = Math.round(480 / aspectRatio);
      } else {
        maxHeight = 360;
        maxWidth = Math.round(360 * aspectRatio);
      }
    };
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF4E8' }}>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 gap-2">
          <Link href="/" className="group">
            <button
              className="flex items-center justify-center p-2 rounded-full transition-transform duration-200 group-hover:scale-110 group-hover:bg-gray-100"
              style={{ outline: 'none', border: 'none', background: 'transparent' }}
            >
              <span className="text-2xl font-bold" style={{ color: '#1C1C1C', display: 'inline-block', transition: 'transform 0.2s' }}>&lt;</span>
            </button>
          </Link>
          <div className="flex flex-col items-center flex-1">
            <h1 className="text-4xl font-bold mb-1" style={{ color: '#1C1C1C' }}>
              Photo Converter
            </h1>
            <p className="text-lg" style={{ color: '#6B6B6B' }}>
              Convert your photos with the help of AI.
            </p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-6">
            {/* Upload Button */}
            <div className="flex items-center space-x-4">
              <div
                ref={dropRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="relative"
              >
                <button
                  onClick={triggerFileInput}
                  className="px-6 py-2 rounded-full text-base font-semibold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 flex items-center space-x-2"
                  style={{
                    backgroundColor: '#E7C74B',
                    color: '#000',
                  }}
                >
                  <Upload className="w-5 h-5" />
                  <span>Upload Image</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="text-sm text-gray-500">
                <p>or drop a file here</p>
                <p className="text-xs">CTRL+V to paste image or URL</p>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Choose Style:</span>
              <div className="min-w-[200px]">
                <CustomDropdown />
              </div>
            </div>

            {/* Sample Images */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">Try sample:</span>
              <div className="flex space-x-2">
                {sampleImages.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(src)}
                    className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-pink-400 transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={src}
                      width={48}
                      height={48}
                      alt={`Sample ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        {selectedImage && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center">
            {/* Close Button */}
            <div className="flex justify-end w-full p-4 pb-0">
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setConvertedImage(null);
                  setSelectedTheme(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-8 pt-0 w-full flex flex-col items-center">
              <div
                className="flex flex-col lg:flex-row gap-8 items-center justify-center w-full lg:items-center"
              >
                {/* Original Image */}
                <div className="space-y-4 flex flex-col items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-gray-900">Original</h3>
                  </div>
                  <div
                    className="relative rounded-2xl overflow-hidden border-2"
                    style={{ width: maxWidth, height: maxHeight, borderColor: '#E7C74B', boxSizing: 'border-box' }}
                  >
                    <Image
                      src={selectedImage}
                      alt="Original"
                      width={maxWidth}
                      height={maxHeight}
                    />
                  </div>
                </div>

                {/* Result Image */}
                <div className="space-y-5 flex flex-col items-center justify-center" style={{height: maxHeight, width: maxWidth}}>
                  <div className="flex items-center space-x-3" style={{marginBottom: 0}}>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-gray-900">Result</h3>
                  </div>
                  <div
                    className="relative rounded-2xl overflow-hidden flex items-center justify-center border-2"
                    style={{ width: maxWidth, height: maxHeight, borderColor: '#E7C74B', boxSizing: 'border-box' }}
                  >
                    {convertedImage ? (
                      <Image
                        src={convertedImage}
                        alt="Result"
                        width={maxWidth}
                        height={maxHeight}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isConverting ? (
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Processing...</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <ImageIcon className="w-8 h-8 text-gray-400" />
                            </div>
                            <p className="text-gray-500">Select style and convert</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Convert Button (hide if result is available) */}
                  {!convertedImage && (
                    <div className="w-full flex flex-col items-center gap-4 mt-4">
                      <div className="min-w-[200px] mb-2">
                        <CustomDropdown />
                      </div>
                      <button
                        onClick={handleConvert}
                        disabled={!selectedImage || !selectedTheme || isConverting}
                        className={`px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform
                          ${!selectedImage || !selectedTheme || isConverting 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                          }
                        `}
                        style={{ width: '100%' }}
                      >
                        <div className="flex items-center space-x-2 justify-center">
                          {isConverting ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-4 h-4" />
                              <span>Convert</span>
                            </>
                          )}
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Download Section */}
              {convertedImage && (
                <div className="mt-6 pt-6 border-t border-gray-200 w-full flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.07, boxShadow: '0 4px 24px #E7C74B55' }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center space-x-2 px-8 py-3 rounded-full font-bold shadow border-2 transition-all duration-200"
                    style={{
                      backgroundColor: '#E7C74B',
                      color: '#000',
                      borderColor: '#E7C74B',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-base">Download</span>
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PhotoConverter;