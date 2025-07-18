"use client"
import React, { useState, useRef } from 'react';
import { Upload, Download, Palette, Sparkles, ChevronDown, X, Image as ImageIcon } from 'lucide-react';
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
    { id: 'vintage', name: 'Vintage Film', description: 'Classic film photography look', color: '#8B4513' },
    { id: 'cyberpunk', name: 'Cyberpunk Neon', description: 'Futuristic neon-lit aesthetic', color: '#00FFFF' },
    { id: 'watercolor', name: 'Watercolor Art', description: 'Soft painted watercolor effect', color: '#87CEEB' },
    { id: 'oil-painting', name: 'Oil Painting', description: 'Rich textured oil painting style', color: '#8B4513' },
    { id: 'anime', name: 'Anime Style', description: 'Japanese animation art style', color: '#FF69B4' },
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
                <p className="text-xs text-gray-500">{selectedTheme.description}</p>
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
                <p className="text-xs text-gray-500">{theme.description}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF4E8' }}>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#1C1C1C' }}>
            Photo Converter
          </h1>
          <p className="text-lg" style={{ color: '#6B6B6B' }}>
            Convert your photos with the help of ai 
          </p>
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
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {/* Close Button */}
            <div className="flex justify-end p-4 pb-0">
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

            <div className="p-8 pt-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Original Image */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-gray-900">Original</h3>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
                    <Image
                      src={selectedImage}
                      width={600}
                      height={450}
                      alt="Original"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Result Image */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <h3 className="text-xl font-semibold text-gray-900">Result</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <ImageIcon className="w-5 h-5 text-gray-400" />
                      </button>
                      <span className="text-sm text-gray-500">Change Background</span>
                    </div>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden bg-gray-100 aspect-[4/3]">
                    {convertedImage ? (
                      <div className="relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 opacity-30"></div>
                        <Image
                          src={convertedImage}
                          width={600}
                          height={450}
                          alt="Result"
                          className="w-full h-full object-cover"
                        />
                      </div>
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
                </div>
              </div>

              {/* Controls */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
                  {/* Convert Button */}
                  <div className="flex space-x-3">
                    <button
                      onClick={handleConvert}
                      disabled={!selectedImage || !selectedTheme || isConverting}
                      className={`
                        px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform
                        ${!selectedImage || !selectedTheme || isConverting 
                          ? 'bg-gray-400 cursor-not-allowed' 
                          : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                        }
                      `}
                    >
                      <div className="flex items-center space-x-2">
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
                </div>
              </div>

              {/* Download Section */}
              {convertedImage && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="text-sm text-gray-500">
                      Preview Image 577 x 433, free
                    </div>
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