'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Stars, Sparkles } from 'lucide-react';

const ProposalPage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [answer, setAnswer] = useState<any>(null);
  const [showHearts, setShowHearts] = useState(false);
  const [position, setPosition] = useState({ x: 55, y: 90 }); // Initial position near "Yes"

  useEffect(() => {
    // Delay showing content and hearts to ensure consistent hydration
    const timer = setTimeout(() => {
      setShowMessage(true);
      setShowHearts(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleNoHover = () => {
    // Random position anywhere on screen with padding
    const newX = Math.max(5, Math.min(95, Math.random() * 100));
    const newY = Math.max(5, Math.min(95, Math.random() * 100));
    setPosition({ x: newX, y: newY });
  };

  const handleYes = () => {
    setAnswer('yes');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-100 to-red-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {showHearts && [...Array(12)].map((_, i) => {
          // Use index-based values for consistency
          const seed = i + 1;
          const left = (seed * 7.89) % 100;
          const top = (seed * 13.45) % 100;
          const duration = 5 + (seed * 0.7) % 5;
          const delay = (seed * 0.8) % 4;
          const size = 16 + (seed * 1.2) % 20;
          
          return (
            <Heart
              key={i}
              className="absolute animate-float text-pink-400 opacity-20"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animation: `float ${duration}s ease-in-out infinite`,
                animationDelay: `${delay}s`
              }}
              size={size}
            />
          );
        })}
      </div>

      <div className="h-full w-full max-w-4xl mx-auto flex flex-col justify-center items-center">
        <div className={`transition-opacity duration-1000 ${showMessage ? 'opacity-100' : 'opacity-0'} w-full`}>
          {/* Header Section */}
          <div className="mb-4">
            <h1 className="text-3xl md:text-5xl font-bold text-pink-600 mb-2 animate-fadeIn text-center">
              Hey Cheenu! 💖
            </h1>
            <p className="text-xl md:text-2xl text-pink-500 animate-slideUp text-center">
              My dearest Divyanshi Mehta
            </p>
          </div>

          {/* Main Content */}
          <div className="bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-2xl shadow-xl h-[60vh] flex flex-col">
            <div className="overflow-auto flex-grow space-y-3 text-base md:text-lg text-gray-700 leading-relaxed animate-fadeIn pr-2 custom-scrollbar">
              <p>
                On this special Proposal Day, my dearest Cheenu, I want to pour my heart out to you. 
                From the moment you came into my life, everything changed - colors became brighter, 
                laughter became sweeter, and every day became worth looking forward to.
              </p>
              
              <p>
                Your smile has this magical way of brightening even my darkest days. The way your 
                eyes light up when you're excited about something, how you scrunch your nose when 
                you laugh, and the pure joy you bring to every moment we share - it's all etched 
                in my heart forever.
              </p>

              <p>
                You're not just my girlfriend, Divyanshi - you're my best friend, my partner in 
                crime, my favorite person to share silly jokes with, and the one who understands 
                me without words.
              </p>

              <p className="text-pink-600 font-semibold">
                As we begin this Valentine's week, I want you to know that my heart beats a 
                little faster every time I think of you, and my world becomes a little more 
                beautiful every time you smile.
              </p>
            </div>

            {/* Interactive Section */}
                          {!answer && (
              <div className="mt-4 text-center flex-shrink-0">
                <p className="text-xl font-semibold text-pink-600 mb-3">
                  Will you be my Valentine? 
                </p>
                <div className="relative">
                  <button
                    onClick={handleYes}
                    className="px-6 py-2 bg-pink-500 text-white rounded-full text-lg font-semibold hover:bg-pink-600 transform hover:scale-105 transition-all duration-300"
                  >
                    Yes! 💝
                  </button>
                  <button
                    style={{
                      position: 'fixed',
                      left: `${position.x}%`,
                      top: `${position.y}%`,
                      transform: 'translate(-50%, -50%)',
                      transition: 'all 0.3s ease',
                      zIndex: 50
                    }}
                    onMouseEnter={handleNoHover}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full text-lg font-semibold"
                  >
                    No
                  </button>
                </div>
              </div>
            )}

            {/* Success Message */}
            {answer === 'yes' && (
              <div className="mt-4 animate-fadeIn text-center flex-shrink-0">
                <Sparkles className="inline-block text-yellow-400 w-8 h-8 animate-spin-slow mb-2" />
                <p className="text-xl font-bold text-pink-600 mb-2">
                  Yay! You've made me the happiest person alive! 🎉
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                  <p>💝 Be your biggest supporter</p>
                  <p>💝 Make you laugh everyday</p>
                  <p>💝 Always have your snacks</p>
                  <p>💝 Wipe away your tears</p>
                  <p>💝 Create beautiful memories</p>
                  <p>💝 Love you more each day</p>
                </div>
                <p className="text-lg text-pink-600 font-medium mt-2">
                  Here's to us, Cheenu! 🌟
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <Stars className="absolute top-4 left-4 text-pink-400 w-6 h-6 animate-pulse" />
      <Stars className="absolute top-4 right-4 text-pink-400 w-6 h-6 animate-pulse" />
      <Stars className="absolute bottom-4 left-4 text-pink-400 w-6 h-6 animate-pulse" />
      <Stars className="absolute bottom-4 right-4 text-pink-400 w-6 h-6 animate-pulse" />
    </div>
  );
};

export default ProposalPage;