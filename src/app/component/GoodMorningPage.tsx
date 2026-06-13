'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Sun, Heart, Sparkles, Coffee, Cloud, Stars } from 'lucide-react';

type Burst = { id: number; x: number; y: number; angle: number; dist: number; emoji: string };

const FLOAT_EMOJIS = ['💖', '🌸', '✨', '💛', '🌷', '☀️', '🦋', '💕'];

const GoodMorningPage = () => {
    const [showContent, setShowContent] = useState(false);
    const [dawn, setDawn] = useState(false);
    const [bursts, setBursts] = useState<Burst[]>([]);
    const [taps, setTaps] = useState(0);
    const [showLetter, setShowLetter] = useState(false);

    useEffect(() => {
        const t1 = setTimeout(() => setShowContent(true), 300);
        const t2 = setTimeout(() => setDawn(true), 1200);
        const t3 = setTimeout(() => setShowLetter(true), 2600);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
        };
    }, []);

    const handleBurst = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        const point = 'touches' in e ? e.touches[0] ?? e.changedTouches[0] : e;
        const x = (point as any).clientX;
        const y = (point as any).clientY;
        const now = Date.now();
        const newBursts: Burst[] = [...Array(14)].map((_, i) => ({
            id: now + i,
            x,
            y,
            angle: (i / 14) * Math.PI * 2,
            dist: 60 + Math.random() * 120,
            emoji: FLOAT_EMOJIS[Math.floor(Math.random() * FLOAT_EMOJIS.length)],
        }));
        setBursts((prev) => [...prev, ...newBursts]);
        setTaps((t) => t + 1);
        setTimeout(() => {
            setBursts((prev) => prev.filter((b) => !newBursts.some((n) => n.id === b.id)));
        }, 1100);
    }, []);

    return (
        <div
            onClick={handleBurst}
            onTouchStart={handleBurst}
            className={`gm-root relative min-h-[100dvh] w-full overflow-hidden select-none cursor-pointer transition-colors duration-[2500ms] ${
                dawn ? 'gm-sky-day' : 'gm-sky-dawn'
            }`}
        >
            {/* Twinkling stars (fade away at dawn) */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-[2500ms] ${
                    dawn ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {[...Array(40)].map((_, i) => (
                    <span
                        key={i}
                        className="gm-star absolute rounded-full bg-white"
                        style={{
                            left: `${(i * 53) % 100}%`,
                            top: `${(i * 37) % 60}%`,
                            width: `${2 + (i % 3)}px`,
                            height: `${2 + (i % 3)}px`,
                            animationDelay: `${(i % 10) * 0.3}s`,
                        }}
                    />
                ))}
            </div>

            {/* The Sun with rotating rays + glow */}
            <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[8%] sm:top-[6%]">
                <div className={`gm-sun-wrap transition-all duration-[2500ms] ${dawn ? 'gm-sun-up' : 'gm-sun-low'}`}>
                    <div className="gm-rays absolute inset-0 -z-10" />
                    <div className="gm-sun-glow absolute inset-0 -z-10" />
                    <div className="gm-sun relative flex items-center justify-center rounded-full">
                        <Sun className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-100 drop-shadow-[0_0_20px_rgba(255,200,80,0.9)]" />
                    </div>
                </div>
            </div>

            {/* Drifting clouds */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[
                    { top: '18%', dur: '34s', delay: '0s', scale: 1, op: 0.9 },
                    { top: '30%', dur: '46s', delay: '-12s', scale: 1.4, op: 0.7 },
                    { top: '12%', dur: '40s', delay: '-26s', scale: 0.8, op: 0.6 },
                    { top: '44%', dur: '52s', delay: '-6s', scale: 1.7, op: 0.5 },
                ].map((c, i) => (
                    <div
                        key={i}
                        className="gm-cloud absolute"
                        style={{ top: c.top, animationDuration: c.dur, animationDelay: c.delay, opacity: c.op }}
                    >
                        <Cloud
                            className="text-white drop-shadow-md"
                            style={{ width: `${70 * c.scale}px`, height: `${70 * c.scale}px` }}
                            fill="white"
                        />
                    </div>
                ))}
            </div>

            {/* Floating ambient emojis rising up */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(18)].map((_, i) => (
                    <span
                        key={i}
                        className="gm-rise absolute text-2xl sm:text-3xl"
                        style={{
                            left: `${(i * 61) % 100}%`,
                            bottom: '-10%',
                            animationDuration: `${8 + (i % 7)}s`,
                            animationDelay: `${(i % 9) * 0.8}s`,
                            opacity: 0.8,
                        }}
                    >
                        {FLOAT_EMOJIS[i % FLOAT_EMOJIS.length]}
                    </span>
                ))}
            </div>

            {/* Tap burst particles */}
            <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
                {bursts.map((b) => (
                    <span
                        key={b.id}
                        className="gm-burst absolute text-2xl"
                        style={
                            {
                                left: b.x,
                                top: b.y,
                                '--bx': `${Math.cos(b.angle) * b.dist}px`,
                                '--by': `${Math.sin(b.angle) * b.dist}px`,
                            } as React.CSSProperties
                        }
                    >
                        {b.emoji}
                    </span>
                ))}
            </div>

            {/* Main content */}
            <main
                className={`relative z-30 flex min-h-[100dvh] flex-col items-center justify-center px-5 py-24 text-center transition-all duration-1000 ${
                    showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                <div className="mb-3 flex items-center gap-2 text-amber-50/90">
                    <Stars className="h-5 w-5 animate-pulse" />
                    <span className="text-xs uppercase tracking-[0.35em]">A new day, a new me</span>
                    <Stars className="h-5 w-5 animate-pulse" />
                </div>

                <h1 className="gm-title font-bold leading-tight text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.25)]">
                    <span className="block text-[clamp(2.4rem,12vw,5rem)] gm-shimmer">Good Morning</span>
                    <span className="mt-2 block text-[clamp(1.6rem,8vw,3rem)] text-pink-100">my love 💛</span>
                </h1>

                {/* Glass love letter */}
                <div
                    className={`gm-card mt-8 w-full max-w-md rounded-3xl border border-white/40 bg-white/20 p-6 text-left shadow-2xl backdrop-blur-xl transition-all duration-1000 sm:p-8 ${
                        showLetter ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
                    }`}
                >
                    <div className="mb-4 flex items-center gap-2 text-rose-700">
                        <Coffee className="h-6 w-6 gm-wiggle" />
                        <h2 className="text-lg font-semibold sm:text-xl">I&apos;m sorry, and I love you ☀️</h2>
                    </div>
                    <p className="text-[15px] leading-relaxed text-rose-900/90 sm:text-base">
                        I know I made you sad last night, and I&apos;ve been holding that ache all through the dark.
                        So I wanted yours to be the first heart the sun touches today. 🌅
                    </p>
                    <p className="mt-3 text-[15px] leading-relaxed text-rose-900/90 sm:text-base">
                        You deserve gentle mornings, soft words, and someone who chooses you on the hard days too.
                        I&apos;m sorry. Let today start over — with me trying harder to be worthy of your smile.
                    </p>

                    <div className="mt-5 flex items-center gap-2 text-rose-700">
                        {[...Array(5)].map((_, i) => (
                            <Heart
                                key={i}
                                className="h-5 w-5 gm-beat fill-rose-500 text-rose-500"
                                style={{ animationDelay: `${i * 0.15}s` }}
                            />
                        ))}
                    </div>

                    <p className="mt-4 text-sm italic text-rose-800/80">
                        — Forever yours, hoping for your forgiveness 💖
                    </p>
                </div>

                <div className="mt-7 flex items-center gap-2 text-amber-50/90">
                    <Sparkles className="h-4 w-4 animate-pulse" />
                    <span className="text-xs">
                        {taps === 0 ? 'Tap anywhere to send love 💕' : `You sent ${taps} bursts of love 🥰`}
                    </span>
                    <Sparkles className="h-4 w-4 animate-pulse" />
                </div>
            </main>

            {/* Component-scoped heavy animations */}
            <style>{`
                .gm-sky-dawn {
                    background: linear-gradient(180deg, #1b1145 0%, #3b1f5e 35%, #7b3b6e 65%, #c96a5a 100%);
                }
                .gm-sky-day {
                    background: linear-gradient(180deg, #4a8fe7 0%, #8ec5ff 30%, #ffd59e 70%, #ffb37b 100%);
                }

                @keyframes gm-twinkle {
                    0%, 100% { opacity: 0.15; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.4); }
                }
                .gm-star { animation: gm-twinkle 2.5s ease-in-out infinite; }

                .gm-sun-wrap { position: relative; width: 96px; height: 96px; }
                @media (min-width: 640px) { .gm-sun-wrap { width: 128px; height: 128px; } }
                .gm-sun-low { transform: translateY(40px) scale(0.85); filter: saturate(0.7) brightness(0.85); }
                .gm-sun-up  { transform: translateY(0) scale(1); filter: saturate(1.1) brightness(1.1); }

                .gm-sun {
                    width: 100%; height: 100%;
                    background: radial-gradient(circle at 35% 35%, #fff6c2 0%, #ffd54a 45%, #ff9d3c 100%);
                    box-shadow: 0 0 60px 18px rgba(255,190,70,0.65);
                }
                .gm-sun-glow {
                    border-radius: 9999px;
                    background: radial-gradient(circle, rgba(255,214,120,0.55) 0%, rgba(255,214,120,0) 70%);
                    animation: gm-pulse 3.5s ease-in-out infinite;
                    transform: scale(2.2);
                }
                @keyframes gm-pulse {
                    0%, 100% { opacity: 0.5; transform: scale(2.0); }
                    50% { opacity: 0.9; transform: scale(2.6); }
                }
                .gm-rays {
                    border-radius: 9999px;
                    background: repeating-conic-gradient(
                        rgba(255,224,150,0.55) 0deg 6deg,
                        rgba(255,224,150,0) 6deg 18deg
                    );
                    transform: scale(2.6);
                    animation: gm-spin 18s linear infinite;
                    -webkit-mask: radial-gradient(circle, transparent 30%, #000 32%, #000 60%, transparent 62%);
                    mask: radial-gradient(circle, transparent 30%, #000 32%, #000 60%, transparent 62%);
                }
                @keyframes gm-spin { to { transform: scale(2.6) rotate(360deg); } }

                @keyframes gm-cloud-move {
                    from { transform: translateX(-30vw); }
                    to { transform: translateX(120vw); }
                }
                .gm-cloud { left: 0; animation-name: gm-cloud-move; animation-timing-function: linear; animation-iteration-count: infinite; }

                @keyframes gm-rise-up {
                    0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.9; }
                    90% { opacity: 0.9; }
                    100% { transform: translateY(-115vh) rotate(360deg); opacity: 0; }
                }
                .gm-rise { animation-name: gm-rise-up; animation-timing-function: linear; animation-iteration-count: infinite; }

                @keyframes gm-burst-fly {
                    0% { transform: translate(-50%, -50%) scale(0.4); opacity: 1; }
                    100% { transform: translate(calc(-50% + var(--bx)), calc(-50% + var(--by))) scale(1.3); opacity: 0; }
                }
                .gm-burst { animation: gm-burst-fly 1s ease-out forwards; will-change: transform, opacity; }

                @keyframes gm-shimmer-move {
                    to { background-position: 200% center; }
                }
                .gm-shimmer {
                    background: linear-gradient(90deg, #fff 0%, #ffe9a8 25%, #fff 50%, #ffd0e0 75%, #fff 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: gm-shimmer-move 4s linear infinite;
                }

                @keyframes gm-beat {
                    0%, 100% { transform: scale(1); }
                    30% { transform: scale(1.4); }
                    45% { transform: scale(0.95); }
                }
                .gm-beat { animation: gm-beat 1.3s ease-in-out infinite; }

                @keyframes gm-wiggle {
                    0%, 100% { transform: rotate(-8deg); }
                    50% { transform: rotate(8deg); }
                }
                .gm-wiggle { animation: gm-wiggle 1.6s ease-in-out infinite; }

                .gm-card { animation: gm-card-float 6s ease-in-out infinite; }
                @keyframes gm-card-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }

                @media (prefers-reduced-motion: reduce) {
                    .gm-rays, .gm-sun-glow, .gm-rise, .gm-cloud, .gm-card, .gm-shimmer, .gm-star { animation: none; }
                }
            `}</style>
        </div>
    );
};

export default GoodMorningPage;
