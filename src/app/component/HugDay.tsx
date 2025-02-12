'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Stars, Sparkles } from 'lucide-react';

const HugDayPage = () => {
  const [showContent, setShowContent] = useState(false);
  const [isHugging, setIsHugging] = useState(false);
  const [hugsCount, setHugsCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [isRaining, setIsRaining] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  const createHugEmoji = () => {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const hug = document.createElement('div');
        hug.innerHTML = '🤗';
        hug.className = 'fixed text-4xl animate-emoji-fall';
        hug.style.left = `${Math.random() * 100}vw`;
        hug.style.top = '-50px';
        hug.style.animationDuration = `${2 + Math.random() * 2}s`;
        document.body.appendChild(hug);
        setTimeout(() => hug.remove(), 3000);
      }, i * 100);
    }
  };

  const triggerHug = () => {
    setIsHugging(true);
    setHugsCount(prev => prev + 1);
    setIsRaining(true);
    createHugEmoji();

    setTimeout(() => {
      setIsHugging(false);
      setShowMessage(true);
      setTimeout(() => setIsRaining(false), 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-50 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Main Content */}
      <div className={`w-full max-w-4xl transition-all duration-1000 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-4 animate-bounce-in">
            Happy Hug Day! 🤗
          </h1>
          <p className="text-xl md:text-2xl text-rose-500 animate-slide-up">
            My Dearest Divyanshi
          </p>
        </div>

        {/* Hugging Animation Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative overflow-hidden">
          <div className="flex justify-center mb-8">
            <div className="relative w-80 h-80">
              {/* Character Container */}
              <div 
                className={`absolute inset-0 cursor-pointer transition-transform duration-500 ${
                  isHugging ? 'scale-110' : 'hover:scale-105'
                }`}
                onClick={triggerHug}
              >
                {/* Left Character */}
                <div className={`absolute left-8 top-1/2 -translate-y-1/2 transition-all duration-500 
                  ${isHugging ? 'translate-x-12' : ''}`}>
                  <div className="w-32 h-48 relative">
                    {/* Body */}
                    <div className="absolute bottom-0 w-full h-32 bg-blue-400 rounded-t-full">
                      {/* Face */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-blue-300 rounded-full">
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
                          <div className={`w-2 h-2 bg-blue-900 rounded-full ${isHugging ? 'animate-wink' : ''}`}></div>
                          <div className={`w-2 h-2 bg-blue-900 rounded-full ${isHugging ? 'animate-wink' : ''}`}></div>
                        </div>
                        <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-6 h-2 bg-blue-900 rounded-full 
                          ${isHugging ? 'scale-x-150' : ''} transition-transform`}></div>
                      </div>
                      {/* Arms */}
                      <div className={`absolute top-8 right-0 w-16 h-6 bg-blue-400 rounded-full origin-left transition-all duration-500
                        ${isHugging ? 'rotate-45' : '-rotate-45'}`}></div>
                    </div>
                  </div>
                </div>

                {/* Right Character */}
                <div className={`absolute right-8 top-1/2 -translate-y-1/2 transition-all duration-500
                  ${isHugging ? '-translate-x-12' : ''}`}>
                  <div className="w-32 h-48 relative">
                    {/* Body */}
                    <div className="absolute bottom-0 w-full h-32 bg-pink-400 rounded-t-full">
                      {/* Face */}
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-24 bg-pink-300 rounded-full">
                        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex gap-4">
                          <div className={`w-2 h-2 bg-pink-900 rounded-full ${isHugging ? 'animate-wink' : ''}`}></div>
                          <div className={`w-2 h-2 bg-pink-900 rounded-full ${isHugging ? 'animate-wink' : ''}`}></div>
                        </div>
                        <div className={`absolute top-12 left-1/2 -translate-x-1/2 w-6 h-2 bg-pink-900 rounded-full
                          ${isHugging ? 'scale-x-150' : ''} transition-transform`}></div>
                      </div>
                      {/* Arms */}
                      <div className={`absolute top-8 left-0 w-16 h-6 bg-pink-400 rounded-full origin-right transition-all duration-500
                        ${isHugging ? '-rotate-45' : 'rotate-45'}`}></div>
                    </div>
                  </div>
                </div>

                {/* Heart Effects */}
                {isHugging && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Heart className="text-rose-500 animate-heart-pop" size={40} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <p className="text-center text-rose-600 text-lg mb-2">
            Click to share a warm hug! 🤗
          </p>
          <p className="text-center text-rose-500">
            Hugs shared: {hugsCount}
          </p>

          {/* Love Message */}
          {showMessage && (
                          <div className="mt-8 text-center animate-rise-up">
                <div className="inline-block relative">
                  <Sparkles className="absolute -top-8 left-0 text-yellow-400 animate-spin-slow" size={20} />
                  <Sparkles className="absolute -top-8 right-0 text-yellow-400 animate-spin-slow" size={20} />
                  <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-rose-100 p-6 rounded-xl shadow-inner">
                    <p className="text-xl font-medium text-rose-600 mb-4">
                      My Secret Message to You 💌
                    </p>
                    <div className="space-y-4 text-rose-700">
                      <p>
                        Dearest Divyanshi, my love, my comfort, my safe haven...
                      </p>
                      <p>
                        Do you know what makes your hugs so special? It's not just the warmth of your embrace, 
                        but the way time seems to stand still when I'm in your arms. Every hug from you feels like 
                        coming home - a place where worries fade and only love remains.
                      </p>
                      <p>
                        Each time I hold you close, I'm reminded of all the little things that make you uniquely you - 
                        the way your eyes light up when you smile, how your laugh can brighten even my darkest days, 
                        and how perfectly you fit in my arms, as if you were always meant to be there.
                      </p>
                      <p>
                        In your embrace, I find strength when I'm weak, comfort when I'm troubled, and joy when I'm down. 
                        Your hugs have the magical power to make everything better, to make me feel complete, to make me 
                        feel loved in ways words can't express.
                      </p>
                      <p className="font-medium text-rose-600">
                        So here's my promise to you:
                      </p>
                      <p>
                        I promise to hold you tight when you need strength,<br/>
                        To embrace you gently when you need comfort,<br/>
                        To hug you randomly just to make you smile,<br/>
                        And to never let go of the precious love we share.
                      </p>
                      <p className="italic">
                        Because in every hug we share, there's a story of love,<br/>
                        In every embrace, there's a promise of forever,<br/>
                        And in every moment together, there's you, my everything.
                      </p>
                      <p className="font-medium text-rose-600">
                        Today and always, my arms and heart are open for you. 💝
                      </p>
                    </div>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HugDayPage;