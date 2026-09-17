"use client";

import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { Sparkles, Heart, Crown, Cake, Star, X } from "lucide-react";
import { sounds } from "./SoundEffects";

interface BirthdaySurpriseModalProps {
  isOpen: boolean;
  onClose: () => void;
  attemptedDate?: Date | null;
}

export default function BirthdaySurpriseModal({
  isOpen,
  onClose,
  attemptedDate,
}: BirthdaySurpriseModalProps) {
  const [candleBlown, setCandleBlown] = useState(false);

  useEffect(() => {
    if (isOpen) {
      sounds.playMagicSparkle();
      setCandleBlown(false);

      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FB7185", "#FDE047", "#FDA4AF", "#F43F5E", "#FEF08A"],
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBlowCandle = () => {
    sounds.playPop();
    setCandleBlown(true);
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.5 },
      colors: ["#FDE047", "#FB7185", "#FFFFFF", "#F43F5E"],
    });
  };

  const handleBackToCalendar = () => {
    sounds.playPop();
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-gradient-to-b from-rose-50 via-white to-pink-50 rounded-3xl p-6 sm:p-8 border-2 border-rose-200/90 shadow-2xl overflow-hidden text-center animate-scale-up"
      >
        {/* Floating Sparkles */}
        <div className="absolute top-2 left-3 text-rose-300 text-lg animate-bounce-subtle">
          ✦
        </div>
        <div className="absolute top-8 right-6 text-amber-300 text-xl animate-shimmer">
          ✨
        </div>
        <div className="absolute bottom-4 left-6 text-rose-200 text-2xl animate-pulse-gentle">
          💖
        </div>
        <div className="absolute bottom-6 right-8 text-amber-200 text-lg animate-bounce-subtle">
          ✦
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={handleBackToCalendar}
          aria-label="Close message"
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-rose-100/80 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Crown & Birthday Badge */}
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-rose-100 to-pink-100 border border-amber-300/60 text-amber-700 text-xs sm:text-sm font-bold shadow-xs">
            <Crown className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce-subtle" />
            <span>The Most Special Day of the Year</span>
            <Crown className="w-4 h-4 text-amber-500 fill-amber-400 animate-bounce-subtle" />
          </div>
        </div>

        {/* Kitten with Birthday Party Hat & Cake */}
        <div className="relative my-2 flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 160 140"
            className="w-32 h-28 sm:w-36 sm:h-32 filter drop-shadow-md select-none"
            fill="none"
          >
            <path
              d="M 80 10 L 68 45 L 92 45 Z"
              fill="#FB7185"
              stroke="#4A2E35"
              strokeWidth="2"
            />
            <path d="M 72 32 L 88 32" stroke="#FDE047" strokeWidth="2.5" />
            <path d="M 76 20 L 84 20" stroke="#FFFFFF" strokeWidth="2.5" />
            <circle cx="80" cy="8" r="4" fill="#FDE047" stroke="#4A2E35" strokeWidth="1.5" />

            <ellipse
              cx="80"
              cy="65"
              rx="32"
              ry="26"
              fill="#FFFFFF"
              stroke="#4A2E35"
              strokeWidth="2.5"
            />

            <path
              d="M 54 52 L 46 36 L 62 42 Z"
              fill="#FFFFFF"
              stroke="#4A2E35"
              strokeWidth="2"
            />
            <path d="M 53 48 L 49 39 L 59 43 Z" fill="#FFCCD5" />

            <path
              d="M 106 52 L 114 36 L 98 42 Z"
              fill="#FFFFFF"
              stroke="#4A2E35"
              strokeWidth="2"
            />
            <path d="M 107 48 L 111 39 L 101 43 Z" fill="#FFCCD5" />

            <path
              d="M 64 64 C 67 59 73 59 76 64"
              stroke="#4A2E35"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 84 64 C 87 59 93 59 96 64"
              stroke="#4A2E35"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            <ellipse cx="62" cy="71" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />
            <ellipse cx="98" cy="71" rx="5" ry="3" fill="#FDA4AF" opacity="0.7" />

            <path d="M 78 68 L 82 68 L 80 70 Z" fill="#FB7185" />
            <path
              d="M 76 72 C 78 74 80 74 80 71 C 80 74 82 74 84 72"
              stroke="#4A2E35"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M 66 100 L 94 100 L 90 118 L 70 118 Z"
              fill="#FED7AA"
              stroke="#4A2E35"
              strokeWidth="2"
            />
            <path
              d="M 62 100 C 62 92 70 90 80 90 C 90 90 98 92 98 100 Z"
              fill="#FB7185"
              stroke="#4A2E35"
              strokeWidth="2"
            />

            <rect x="78" y="78" width="4" height="12" fill="#FDE047" stroke="#4A2E35" strokeWidth="1.5" />

            {!candleBlown ? (
              <path
                d="M 80 71 C 77 74 77 77 80 77 C 83 77 83 74 80 71 Z"
                fill="#F59E0B"
                className="animate-pulse"
              />
            ) : (
              <text x="83" y="75" fontSize="8" fill="#9CA3AF">💨</text>
            )}

            <ellipse cx="64" cy="98" rx="5" ry="4" fill="#FFFFFF" stroke="#4A2E35" strokeWidth="2" />
            <ellipse cx="96" cy="98" rx="5" ry="4" fill="#FFFFFF" stroke="#4A2E35" strokeWidth="2" />
          </svg>

          <button
            type="button"
            onClick={handleBlowCandle}
            className="mt-1 text-xs font-semibold text-rose-500 hover:text-rose-700 underline decoration-rose-300 cursor-pointer"
          >
            {candleBlown ? "✨ Wish made! ✨" : "Make a wish & blow the candle 🕯️✨"}
          </button>
        </div>

        {/* Title */}
        <h2 className="font-handwriting text-3xl sm:text-4xl font-bold text-[#4A2E35] mb-1">
          Wait a moment... ♡
        </h2>
        <h3 className="font-sans-soft text-lg sm:text-xl font-extrabold text-rose-500 mb-3">
          December 26th is YOUR Birthday! 🎂✨
        </h3>

        {/* Heartfelt Note Box */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white/90 border border-rose-200 text-left text-[#4A2E35] text-xs sm:text-sm leading-relaxed space-y-2.5 shadow-xs mb-5">
          <p className="font-semibold text-rose-600 flex items-center gap-1.5">
            <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            <span>Why you can&apos;t pick after Dec 26:</span>
          </p>
          <p>
            Even across these 8 months, I never forgot that December 26th is the day you came into this world. That day is completely dedicated to celebrating you and everything that makes you extraordinary.
          </p>
          <p className="text-rose-500/95 font-medium italic">
            &ldquo;You will always hold a very special place in my heart, and your birthday is something I will always cherish.&rdquo;
          </p>
          <p>
            Let&apos;s pick a date <strong className="text-rose-600 font-bold">before December 26th</strong> so we can catch up in a relaxed way without waiting until the end of the year! ♡
          </p>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={handleBackToCalendar}
          className="w-full py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#FB7185] via-[#F43F5E] to-[#E11D48] shadow-soft-pink hover:shadow-glow-pink transition-all duration-300 hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Pick a date before Dec 26 ♡</span>
          <Heart className="w-4 h-4 fill-white" />
        </button>
      </div>
    </div>
  );
}
