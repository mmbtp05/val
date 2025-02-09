'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Candy, Coffee, Gift, Stars, LucideIcon } from 'lucide-react';

const ChocolateTypes = [
  { 
    name: 'Dark Chocolate',
    message: 'Like the deep richness of dark chocolate, my love for you is intense and pure.',
    icon: Coffee,
    color: 'bg-amber-950'
  },
  {
    name: 'Milk Chocolate',
    message: 'Sweet and comforting, just like every moment spent with you.',
    icon: Candy,
    color: 'bg-amber-800'
  },
  {
    name: 'Truffle',
    message: "You're as precious as the finest truffle, rare and special.",
    icon: Gift,
    color: 'bg-amber-700'
  }
];

const ChocolateDayPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [selectedChocolate, setSelectedChocolate] = useState<number | null>(null);
  const [showSurprise, setShowSurprise] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleChocolateClick = (index: number) => {
    setSelectedChocolate(index);
    if (!showSurprise && index === ChocolateTypes.length - 1) {
      setTimeout(() => setShowSurprise(true), 500);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-100 via-amber-50 to-amber-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        {showContent && [...Array(12)].map((_, i) => {
          const left = ((i + 1) * 7.89) % 100;
          const top = ((i + 1) * 13.45) % 100;
          const delay = (i * 0.8) % 4;
          const Icon = i % 2 === 0 ? Heart : Candy;
          
          return (
            <Icon
              key={i}
              className="absolute text-amber-800/30 animate-float"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
              }}
              size={20 + (i % 3) * 4}
            />
          );
        })}
      </div>

      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Header */}
        <div className="text-center mb-8 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-3 animate-bounce-in">
            Happy Chocolate Day! 🍫
          </h1>
          <p className="text-xl md:text-2xl text-amber-700 animate-slide-up">
            My Sweet Divyanshi
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          <div className="prose prose-lg text-amber-900 max-w-none mb-6">
            <p className="mb-4 animate-fade-in">
              On this sweet Chocolate Day, I want to share something as special as you are.
              Just like chocolate, you make life richer, sweeter, and more delightful.
            </p>
            
            <p className="mb-4 animate-fade-in delay-200">
              Every moment with you is like savoring the finest chocolate - pure bliss and joy.
              Your presence in my life adds the perfect sweetness to every day.
            </p>
          </div>

          {/* Chocolate Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {ChocolateTypes.map((chocolate, index) => (
              <div
                key={index}
                onClick={() => handleChocolateClick(index)}
                className={`p-6 rounded-xl cursor-pointer transform transition-all duration-300
                  ${selectedChocolate === index ? 
                    `${chocolate.color} text-amber-50 scale-105` : 
                    'bg-amber-50 hover:bg-amber-100'
                  }
                `}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <chocolate.icon 
                    className={`w-12 h-12 ${
                      selectedChocolate === index ? 'text-amber-50' : 'text-amber-800'
                    } animate-bounce-gentle`}
                  />
                  <h3 className="font-semibold text-lg">{chocolate.name}</h3>
                  {selectedChocolate === index && (
                    <p className="text-sm animate-fade-in">{chocolate.message}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Surprise Message */}
          {showSurprise && (
            <div className="mt-8 text-center animate-rise-up">
              <div className="relative inline-block">
                <Stars className="absolute -top-6 -left-6 text-amber-400 animate-twinkle" size={20} />
                <Stars className="absolute -top-6 -right-6 text-amber-400 animate-twinkle" size={20} />
                <p className="text-xl font-bold text-amber-800 animate-bounce-in">
                  Sweet Surprise! 🍫✨
                </p>
              </div>
              <div className="mt-4 p-6 bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg shadow-inner">
                <p className="text-amber-900 animate-fade-in">
                  Life is like a box of chocolates,<br/>
                  And you're the sweetest piece I found.<br/>
                  Each day with you is pure delight,<br/>
                  Like chocolate melting, love profound.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corner Decorations */}
      <Stars className="absolute top-4 left-4 text-amber-600 w-6 h-6 animate-twinkle" />
      <Stars className="absolute top-4 right-4 text-amber-600 w-6 h-6 animate-twinkle" />
      <Candy className="absolute bottom-4 left-4 text-amber-600 w-6 h-6 animate-bounce-gentle" />
      <Candy className="absolute bottom-4 right-4 text-amber-600 w-6 h-6 animate-bounce-gentle" />
    </div>
  );
};

export default ChocolateDayPage;