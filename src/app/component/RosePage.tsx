'use client';

import React, { useState, useEffect } from 'react';
import { Flower2, Heart, Stars, Sparkles } from 'lucide-react';

const RoseDayPage = () => {
    const [showContent, setShowContent] = useState(false);
    const [showRoses, setShowRoses] = useState(false);
    const [selectedRose, setSelectedRose] = useState(null);
    const [showSurprise, setShowSurprise] = useState(false);
    const [roseClicks, setRoseClicks] = useState(0);

    useEffect(() => {
        // Initial entrance animation
        const timer = setTimeout(() => {
            setShowContent(true);
            setShowRoses(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const roses = [
        { color: 'red', meaning: 'Deep love and passion' },
        { color: 'pink', meaning: 'Admiration and sweetness' },
        { color: 'white', meaning: 'Pure and innocent love' },
    ];

    const getRoseColor = (color: any) => {
        switch (color) {
            case 'red': return 'text-rose-600';
            case 'pink': return 'text-pink-400';
            case 'white': return 'text-gray-100';
            default: return 'text-rose-600';
        }
    };

    const handleRoseClick = (index: any) => {
        setSelectedRose(index);
        setRoseClicks(prev => prev + 1);

        // Trigger surprise after clicking all roses
        if (roseClicks === 2) {
            setTimeout(() => {
                setShowSurprise(true);
            }, 500);
        }
    };

    // Create array of hearts for explosion animation
    const explosionHearts = [...Array(30)].map((_, i) => {
        const angle = (i / 30) * Math.PI * 2;
        const velocity = 1 + Math.random() * 0.5;
        return { angle, velocity };
    });

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-rose-100 via-pink-100 to-rose-200 flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Floating Roses Background */}
            <div className="absolute inset-0 pointer-events-none">
                {showRoses && [...Array(15)].map((_, i) => {
                    const seed = i + 1;
                    const left = (seed * 8.5) % 100;
                    const top = (seed * 12.3) % 100;
                    const duration = 6 + (seed * 0.8) % 4;
                    const delay = (seed * 0.6) % 3;
                    const size = 20 + (seed * 1.5) % 16;
                    const color = roses[i % roses.length].color;

                    return (
                        <Flower2
                            key={i}
                            className={`absolute animate-float ${getRoseColor(color)} opacity-30`}
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

            {/* Surprise Heart Explosion */}
            {showSurprise &&
                explosionHearts.map((heart, i) => (
                    <Heart
                        key={i}
                        className="absolute text-rose-500 animate-explode"
                        style={{
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) rotate(${heart.angle}rad)`, // Keep only one transform property
                            animation: `explode 1.5s ease-out forwards`,
                            animationDelay: `${i * 0.05}s`,
                        }}
                        data-angle={heart.angle} // Correct way to use data attributes
                        data-velocity={heart.velocity}
                        size={16}
                    />
                ))}

            <div className={`max-w-4xl mx-auto transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                {/* Header with Sparkle Animation */}
                <div className="text-center mb-8 relative">
                    <Sparkles
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-yellow-400 animate-sparkle"
                        size={24}
                    />
                    <h1 className="text-4xl md:text-6xl font-bold text-rose-600 mb-3 animate-bounce-in">
                        Happy Rose Day! 🌹
                    </h1>
                    <p className="text-xl md:text-2xl text-rose-500 animate-slide-up">
                        My Dearest Divyanshi
                    </p>
                </div>

                {/* Main Content */}
                <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8 transition-all duration-500 ${showSurprise ? 'scale-105 bg-rose-50/90' : ''}`}>
                    <div className="prose prose-lg text-gray-700 max-w-none mb-6">
                        <p className="mb-4 animate-fade-in">
                            On this beautiful Rose Day, I bring you not just roses, but my heart wrapped in petals of love.
                            Each rose represents a different aspect of my feelings for you, just as unique and special as you are.
                        </p>

                        <p className="mb-4 animate-fade-in delay-200">
                            Like these roses that bloom with grace, my love for you grows more beautiful with each passing day.
                            Your presence in my life adds colors that I never knew existed, bringing joy that words can't express.
                        </p>

                        <p className="text-rose-600 font-medium animate-fade-in delay-400">
                            You're the rose in my garden of life, making everything more beautiful with your presence.
                        </p>
                    </div>

                    {/* Interactive Rose Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {roses.map((rose, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-lg transition-all duration-300 cursor-pointer transform hover:scale-105
                  ${selectedRose === index ? 'bg-rose-100 scale-105 animate-pulse' : 'bg-white/60 hover:bg-rose-50'}
                  ${showSurprise ? 'hover:rotate-3' : ''}
                `}
                                onClick={() => handleRoseClick(index)}
                            >
                                <div className="flex items-center justify-center mb-2">
                                    <Flower2
                                        className={`w-8 h-8 ${getRoseColor(rose.color)} transition-transform duration-300
                      ${selectedRose === index ? 'animate-spin-slow' : ''}
                    `}
                                    />
                                </div>
                                <h3 className={`text-center font-semibold capitalize ${getRoseColor(rose.color)}`}>
                                    {rose.color} Rose
                                </h3>
                                <p className="text-center text-sm text-gray-600 mt-1">
                                    {rose.meaning}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Surprise Message */}
                    {showSurprise && (
                        <div className="text-center mt-8 animate-fade-up">
                            <div className="inline-block relative">
                                <Stars className="absolute -top-6 -left-6 text-yellow-400 animate-spin-slow" size={20} />
                                <Stars className="absolute -top-6 -right-6 text-yellow-400 animate-spin-slow" size={20} />
                                <p className="text-xl font-bold text-rose-600 animate-bounce-in">
                                    You've unlocked a special message! 💝
                                </p>
                            </div>
                            <p className="mt-4 text-rose-500 animate-fade-in">
                                Just like these roses that bloom with grace,<br />
                                My love for you has found its special place.<br />
                                Each petal whispers a promise true,<br />
                                Of endless moments, just me and you.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Corner Decorations */}
            <Stars className="absolute top-4 left-4 text-rose-400 w-6 h-6 animate-pulse" />
            <Stars className="absolute top-4 right-4 text-rose-400 w-6 h-6 animate-pulse" />
            <Heart className="absolute bottom-4 left-4 text-rose-400 w-6 h-6 animate-pulse" />
            <Heart className="absolute bottom-4 right-4 text-rose-400 w-6 h-6 animate-pulse" />
        </div>
    );
};

export default RoseDayPage;