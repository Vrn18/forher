"use client";

import React, { useRef, useState } from "react";
import { Heart } from "lucide-react";
import CuteIllustration from "./CuteIllustration";
import NoButton from "./NoButton";
import { sounds } from "./SoundEffects";

interface QuestionScreenProps {
  onAccept: () => void;
}

export default function QuestionScreen({ onAccept }: QuestionScreenProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [noAttempts, setNoAttempts] = useState<number>(0);
  const [isHoveringYes, setIsHoveringYes] = useState<boolean>(false);

  const handleYesClick = () => {
    sounds.playYesChime();
    onAccept();
  };

  const handleEvade = (attempts: number) => {
    setNoAttempts(attempts);
  };

  // Grow Yes button slightly if she keeps trying to click No
  const yesScaleMultiplier = Math.min(1 + noAttempts * 0.05, 1.25);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-100 shadow-card-romantic transition-all duration-500 overflow-visible"
    >
      {/* Top Header Card Doodles */}
      <div className="flex items-center justify-between w-full text-rose-400 font-handwriting text-base sm:text-xl font-semibold select-none mb-2 sm:mb-4">
        <span className="-rotate-1 hover:rotate-0 transition-transform duration-200">
          I Know It&apos;s Been 8 Months... ♡
        </span>
        <span className="rotate-1 text-right hover:rotate-0 transition-transform duration-200 text-rose-300 sm:text-rose-400 text-sm sm:text-lg">
          I&apos;ve Really Missed You ♡
        </span>
      </div>

      {/* Center Illustration */}
      <div className="my-2 sm:my-4 flex justify-center">
        <CuteIllustration
          mood={noAttempts >= 2 ? "pleading" : "happy"}
          onKittenClick={() => sounds.playPop()}
        />
      </div>

      {/* Main Question Heading & Subtitle */}
      <div className="text-center space-y-2 select-none mb-7 sm:mb-9">
        <h1 className="font-handwriting text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A2E35] tracking-tight leading-tight">
          Can I take you out? ♡
        </h1>
        <p className="font-sans-soft text-rose-400/90 text-xs sm:text-sm md:text-base font-medium flex items-center justify-center gap-1 max-w-md mx-auto">
          <span>No pressure, no heavy expectations — just a warm cup of coffee and catching up on all the time we lost.</span>
        </p>
      </div>

      {/* Interactive Choice Buttons */}
      <div className="relative flex flex-row items-center justify-center gap-4 sm:gap-6 min-h-[70px] z-20">
        {/* Yes Button (Primary CTA) */}
        <button
          type="button"
          onClick={handleYesClick}
          onMouseEnter={() => {
            setIsHoveringYes(true);
            sounds.playPop();
          }}
          onMouseLeave={() => setIsHoveringYes(false)}
          style={{
            transform: `scale(${yesScaleMultiplier})`,
          }}
          aria-label="Yes, let's catch up"
          className="group relative px-8 sm:px-10 py-3 sm:py-3.5 rounded-full text-lg sm:text-xl font-bold text-white bg-gradient-to-r from-[#FB7185] via-[#F43F5E] to-[#E11D48] shadow-soft-pink hover:shadow-glow-pink transition-all duration-300 cursor-pointer active:scale-95 flex items-center justify-center gap-2"
        >
          <span>Yes, let&apos;s catch up</span>
          <Heart className={`w-5 h-5 fill-white transition-transform duration-300 ${
            isHoveringYes ? "scale-125 animate-wiggle" : "animate-pulse-gentle"
          }`} />
          {/* Subtle button sheen */}
          <span className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </button>

        {/* Playful Evasive No Button */}
        <NoButton onEvade={handleEvade} containerRef={containerRef} />
      </div>
    </div>
  );
}
