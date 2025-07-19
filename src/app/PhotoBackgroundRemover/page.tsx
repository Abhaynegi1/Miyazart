"use client"
import React, { useState, useRef } from 'react';
import { Upload, Download, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Image from 'next/image';

const sampleImages = [
  '/api/placeholder/60/60',
  '/api/placeholder/60/60',
  '/api/placeholder/60/60',
  '/api/placeholder/60/60'
];

const PhotoBackgroundRemover: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgSrc = e.target?.result as string;
        setSelectedImage(imgSrc);
        setResultImage(null);
        setError(null);
        // Get image dimensions
        const img = new window.Image();
        img.onload = () => {
          setImageDimensions({ width: img.width, height: img.height });
        };
        img.src = imgSrc;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    // setIsDragging(true); // Unused, remove to fix linter
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    // setIsDragging(false); // Unused, remove to fix linter
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    // setIsDragging(false); // Unused, remove to fix linter
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file?.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imgSrc = e.target?.result as string;
          setSelectedImage(imgSrc);
          setResultImage(null);
          setError(null);
          // Get image dimensions
          const img = new window.Image();
          img.onload = () => {
            setImageDimensions({ width: img.width, height: img.height });
          };
          img.src = imgSrc;
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveBg = async () => {
    if (!selectedImage) return;
    setIsProcessing(true);
    setError(null);
    setResultImage(null);
    try {
      // Convert base64 to just the data part
      const base64img = selectedImage.split(',')[1];
      const res = await fetch('/api/remove-bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ base64img }),
      });
      if (!res.ok) {
        setError('Failed to remove background.');
        setIsProcessing(false);
        return;
      }
      const data = (await res.json()) as { base64img?: string };
      if (!data?.base64img) {
        setError('No image returned.');
        setIsProcessing(false);
        return;
      }
      setResultImage(`data:image/png;base64,${String(data.base64img)}`);
      setIsProcessing(false);
    } catch {
      setError('An error occurred.');
      setIsProcessing(false);
    }
  };

  // Calculate aspect ratio and set max dimensions for modal
  let aspectRatio = 4 / 3;
  let maxWidth = 480;
  let maxHeight = 360;
  if (imageDimensions) {
    aspectRatio = imageDimensions.width / imageDimensions.height;
    if (aspectRatio > 1) {
      maxWidth = 480;
      maxHeight = Math.round(480 / aspectRatio);
    } else {
      maxHeight = 360;
      maxWidth = Math.round(360 * aspectRatio);
    }
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
              Photo Background Remover
            </h1>
            <p className="text-lg" style={{ color: '#6B6B6B' }}>
              Instantly remove the background from your photo with AI.
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
            {/* Sample Images */}
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-600 whitespace-nowrap">Try sample:</span>
              <div className="flex space-x-2">
                {sampleImages.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedImage(src);
                      setResultImage(null);
                      setError(null);
                      // Get image dimensions
                      const img = new window.Image();
                      img.onload = () => {
                        setImageDimensions({ width: img.width, height: img.height });
                      };
                      img.src = src;
                    }}
                    className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-pink-400 transition-all duration-300 hover:scale-105"
                  >
                    <Image
                      src={src}
                      alt={`Sample ${index + 1}`}
                      width={60}
                      height={60}
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
                  setResultImage(null);
                  setImageDimensions(null);
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
                    {resultImage ? (
                      <Image
                        src={resultImage}
                        alt="Result"
                        width={maxWidth}
                        height={maxHeight}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        {isProcessing ? (
                          <div className="text-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                            <p className="text-gray-600">Processing...</p>
                          </div>
                        ) : (
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Image
                                src="/icons/image.svg"
                                alt="Image icon"
                                width={32}
                                height={32}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Remove Background Button (hide if result is available) */}
                  {!resultImage && (
                    <button
                      onClick={handleRemoveBg}
                      disabled={isProcessing}
                      className={`mt-4 px-8 py-3 rounded-xl font-semibold text-white transition-all duration-300 transform ${
                        isProcessing
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl'
                      }`}
                      style={{ width: '100%' }}
                    >
                      <div className="flex items-center space-x-2 justify-center">
                        {isProcessing ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-4 h-4" />
                            <span>Remove Background</span>
                          </>
                        )}
                      </div>
                    </button>
                  )}
                </div>
              </div>

              {/* Download Section */}
              {resultImage && (
                <div className="mt-6 pt-6 border-t border-gray-200 w-full flex justify-center">
                  <motion.a
                    whileHover={{ scale: 1.07, boxShadow: '0 4px 24px #E7C74B55' }}
                    whileTap={{ scale: 0.97 }}
                    href={resultImage}
                    download="background-removed.png"
                    className="flex items-center space-x-2 px-8 py-3 rounded-full font-bold shadow border-2 transition-all duration-200"
                    style={{
                      backgroundColor: '#E7C74B',
                      color: '#000',
                      borderColor: '#E7C74B',
                    }}
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-base">Download</span>
                  </motion.a>
                </div>
              )}
            </div>
          </div>
        )}
        {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
      </main>
    </div>
  );
};

export default PhotoBackgroundRemover;