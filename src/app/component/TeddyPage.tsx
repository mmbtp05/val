'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Gift, Stars, Sparkles } from 'lucide-react';

const TeddyDayPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [hugged, setHugged] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [teddyRotation, setTeddyRotation] = useState(0);
  
  useEffect(() => {
    setShowContent(true);
  }, []);

  const handleTeddyClick = () => {
    setHugged(true);
    setTimeout(() => setShowMessage(true), 1000);
  };

  const handleTeddyHover = () => {
    setTeddyRotation(prev => prev + 20);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-pink-400/30 animate-float"
            style={{
              left: `${(i * 8.5) % 100}%`,
              top: `${(i * 12.3) % 100}%`,
              animationDelay: `${i * 0.4}s`,
            }}
            size={16 + (i % 3) * 4}
          />
        ))}
      </div>

      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-3 animate-bounce-in">
            Happy Teddy Day! 🧸
          </h1>
          <p className="text-xl md:text-2xl text-pink-500 animate-slide-up">
            My Dearest Divyanshi
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 relative">
          {/* Interactive Teddy */}
          <div 
            className="cursor-pointer relative mx-auto w-48 h-48 mb-6"
            onClick={handleTeddyClick}
            onMouseEnter={handleTeddyHover}
          >
            <div 
              className={`w-full h-full rounded-full bg-amber-200 relative transition-all duration-500
                ${hugged ? 'scale-110' : 'hover:scale-105'}
              `}
              style={{ transform: `rotate(${teddyRotation}deg)` }}
            >
              {/* Teddy Face */}
              <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2">
                <div className="flex gap-8">
                  <div className="w-4 h-4 rounded-full bg-amber-950" />
                  <div className="w-4 h-4 rounded-full bg-amber-950" />
                </div>
                <div className="w-6 h-6 rounded-full bg-amber-950 mx-auto mt-4" />
              </div>
              {/* Ears */}
              <div className="absolute -top-4 left-1/4 w-8 h-8 rounded-full bg-amber-200" />
              <div className="absolute -top-4 right-1/4 w-8 h-8 rounded-full bg-amber-200" />
              {/* Arms */}
              <div className={`absolute left-0 w-12 h-8 rounded-full bg-amber-200 origin-right transition-all duration-500
                ${hugged ? 'rotate-45' : '-rotate-45'}`} />
              <div className={`absolute right-0 w-12 h-8 rounded-full bg-amber-200 origin-left transition-all duration-500
                ${hugged ? '-rotate-45' : 'rotate-45'}`} />
            </div>
            
            {/* Heart effect on hug */}
            {hugged && (
              <Heart 
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-pink-500 animate-float"
                size={32}
              />
            )}
          </div>

          <div className="prose prose-lg text-pink-900 max-w-none text-center">
            <p className="mb-4 animate-fade-in">
              Just like this cuddly teddy, my love for you is soft, warm, and always there for comfort.
              Click on the teddy to give it a hug! 🤗
            </p>
          </div>

          {/* Surprise Message */}
          {showMessage && (
            <div className="mt-8 text-center animate-rise-up">
              <Sparkles className="inline-block text-yellow-400 animate-spin-slow mb-2" size={24} />
              <div className="p-6 bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg shadow-inner">
                <p className="text-pink-800 font-medium mb-4">
                  Like this teddy that brings warmth and joy,<br/>
                  You make my heart dance and my soul sing.<br/>
                  In your arms is where I belong,<br/>
                  Forever cherishing the happiness you bring.
                </p>
                <p className="text-sm text-pink-500 mb-4">Click on the promises below! 💝</p>
                <div className="grid grid-cols-2 gap-4 text-sm text-pink-700 mt-4">
                  <button 
                    onClick={() => {
                      // Create shower of hugs from top
                      for(let i = 0; i < 20; i++) {
                        setTimeout(() => {
                          const hug = document.createElement('div');
                          hug.innerHTML = '🤗';
                          hug.className = 'fixed text-3xl animate-hug-fall';
                          hug.style.left = `${Math.random() * 100}vw`;
                          hug.style.top = '-50px';
                          hug.style.animationDelay = `${Math.random() * 2}s`;
                          document.body.appendChild(hug);
                          setTimeout(() => hug.remove(), 3000);
                        }, i * 100);
                      }
                    }}
                    className="flex items-center justify-center gap-2 p-3 rounded-lg bg-pink-100 hover:bg-pink-200 transition-colors cursor-pointer group"
                  >
                    <Gift className="group-hover:animate-wiggle" size={16} />
                    <span className="group-hover:animate-pulse">Endless Hugs</span>
                  </button>
                  <button
                    onClick={() => {
                      // Create shower of hearts from top
                      for(let i = 0; i < 20; i++) {
                        setTimeout(() => {
                          const heart = document.createElement('div');
                          heart.innerHTML = '💖';
                          heart.className = 'fixed text-3xl animate-love-fall';
                          heart.style.left = `${Math.random() * 100}vw`;
                          heart.style.top = '-50px';
                          heart.style.animationDelay = `${Math.random() * 2}s`;
                          document.body.appendChild(heart);
                          setTimeout(() => heart.remove(), 3000);
                        }, i * 100);
                      }
                    }}
                    className="flex items-center justify-center gap-2 p-3 rounded-lg bg-pink-100 hover:bg-pink-200 transition-colors cursor-pointer group"
                  >
                    <Heart className="group-hover:animate-beat" size={16} />
                    <span className="group-hover:animate-pulse">Infinite Love</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Corner Decorations */}
      <Stars className="absolute top-4 left-4 text-pink-400 w-6 h-6 animate-twinkle" />
      <Stars className="absolute top-4 right-4 text-pink-400 w-6 h-6 animate-twinkle" />
      <Stars className="absolute bottom-4 left-4 text-pink-400 w-6 h-6 animate-twinkle" />
      <Stars className="absolute bottom-4 right-4 text-pink-400 w-6 h-6 animate-twinkle" />
    </div>
  );
};

export default TeddyDayPage;