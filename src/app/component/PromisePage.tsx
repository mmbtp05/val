'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Stars, Gift, Lock, Key, Sparkles, InfinityIcon } from 'lucide-react';

const PromiseDayPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [unlockedPromises, setUnlockedPromises] = useState(new Set());
  const [showFinalSurprise, setShowFinalSurprise] = useState(false);
  const [keyRotation, setKeyRotation] = useState(0);

  const promises = [
    {
      id: 1,
      title: "Promise of Forever",
      icon: InfinityIcon,
      content: "I promise to love you more with each passing day, growing stronger like the roots of an eternal tree.",
      effect: "animate-infinity-loop"
    },
    {
      id: 2,
      title: "Promise of Trust",
      icon: Heart,
      content: "I promise to be your safe haven, where your heart finds peace and your soul finds comfort.",
      effect: "animate-heart-beat"
    },
    {
      id: 3,
      title: "Promise of Joy",
      icon: Gift,
      content: "I promise to fill your life with countless moments of happiness and surprise.",
      effect: "animate-gift-bounce"
    },
    {
      id: 4,
      title: "Promise of Support",
      icon: Stars,
      content: "I promise to stand by you through every storm, being your guiding star in the darkest nights.",
      effect: "animate-star-shine"
    }
  ];

  useEffect(() => {
    setShowContent(true);
  }, []);

  const unlockPromise = (id: any) => {
    if (unlockedPromises.has(id)) return;
    
    setKeyRotation(prev => prev + 360);
    const newUnlocked = new Set(unlockedPromises);
    newUnlocked.add(id);
    setUnlockedPromises(newUnlocked);

    if (newUnlocked.size === promises.length) {
      setTimeout(() => setShowFinalSurprise(true), 1000);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-pink-50 to-rose-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Elements Background */}
      {showContent && [...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute pointer-events-none animate-float opacity-20"
          style={{
            left: `${(i * 8.5) % 100}%`,
            top: `${(i * 12.3) % 100}%`,
            animationDelay: `${i * 0.4}s`,
          }}
        >
          {i % 4 === 0 ? <Heart size={20} className="text-rose-400" /> :
           i % 4 === 1 ? <Stars size={20} className="text-purple-400" /> :
           i % 4 === 2 ? <Lock size={20} className="text-pink-400" /> :
                        <Key size={20} className="text-amber-400" />}
        </div>
      ))}

      <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-purple-600 mb-3 animate-bounce-in">
            Happy Promise Day! 💝
          </h1>
          <p className="text-xl md:text-2xl text-purple-500 animate-slide-up">
            My Dearest Divyanshi
          </p>
        </div>

        {/* Promise Boxes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {promises.map((promise) => (
            <div
              key={promise.id}
              className={`relative bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-6 transform transition-all duration-500
                ${unlockedPromises.has(promise.id) ? 'scale-105' : 'hover:scale-102'}
              `}
            >
              {!unlockedPromises.has(promise.id) ? (
                <div 
                  className="absolute inset-0 bg-purple-50/90 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => unlockPromise(promise.id)}
                >
                  <Lock className="text-purple-400 mb-2 animate-pulse" size={32} />
                  <Key 
                    className="text-amber-400 transition-transform duration-500" 
                    style={{ transform: `rotate(${keyRotation}deg)` }}
                    size={24} 
                  />
                  <p className="text-purple-600 mt-2">Click to unlock</p>
                </div>
              ) : null}
              
              <div className="flex flex-col items-center text-center">
                <promise.icon 
                  className={`text-purple-500 mb-4 ${unlockedPromises.has(promise.id) ? promise.effect : ''}`}
                  size={32}
                />
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  {promise.title}
                </h3>
                <p className="text-purple-600">
                  {promise.content}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Surprise */}
        {showFinalSurprise && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center animate-rise-up">
            <Sparkles className="text-yellow-400 animate-spin-slow mb-4" size={32} />
            <h3 className="text-2xl font-bold text-purple-600 mb-4">
              Our Promise Symphony 💫
            </h3>
            <p className="text-purple-700 mb-4">
              As these promises unite, they create a melody of our love,<br/>
              A symphony that will play eternally in our hearts.<br/>
              Each promise is a note, and together they compose<br/>
              The beautiful music of our journey ahead.
            </p>
            <div className="flex justify-center space-x-4">
              {[...Array(5)].map((_, i) => (
                <Heart 
                  key={i}
                  className="text-rose-500 animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                  size={24}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromiseDayPage;