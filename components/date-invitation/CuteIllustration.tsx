"use client";

import React, { useState } from "react";

interface CuteIllustrationProps {
  mood?: "happy" | "shy" | "excited" | "pleading";
  className?: string;
  onKittenClick?: () => void;
}

export default function CuteIllustration({
  mood = "happy",
  className = "",
  onKittenClick,
}: CuteIllustrationProps) {
  const [isWiggling, setIsWiggling] = useState(false);

  const handleClick = () => {
    setIsWiggling(true);
    if (onKittenClick) onKittenClick();
    setTimeout(() => setIsWiggling(false), 800);
  };

  return (
    <div
      onClick={handleClick}
      role="img"
      aria-label="Cute white kitten holding a pink heart"
      className={`relative inline-flex flex-col items-center justify-center cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 ${
        isWiggling ? "animate-wiggle" : "animate-float-slow"
      } ${className}`}
    >
      {/* Floating Surrounding Hearts (Matching Reference Image) */}
      <div className="absolute -top-3 -left-2 text-rose-300 text-lg animate-bounce-subtle select-none">
        ♥
      </div>
      <div
        className="absolute top-4 -left-6 text-rose-400 text-xs animate-pulse-gentle select-none"
        style={{ animationDelay: "0.5s" }}
      >
        ♥
      </div>
      <div
        className="absolute -top-2 right-0 text-rose-300 text-sm animate-bounce-subtle select-none"
        style={{ animationDelay: "0.8s" }}
      >
        ♥
      </div>
      <div
        className="absolute top-8 -right-5 text-rose-400 text-xs animate-pulse-gentle select-none"
        style={{ animationDelay: "1.2s" }}
      >
        ♥
      </div>
      <div
        className="absolute bottom-6 -left-7 text-rose-200 text-xl animate-shimmer select-none"
        style={{ animationDelay: "1.5s" }}
      >
        ♡
      </div>
      <div
        className="absolute bottom-8 -right-8 text-rose-200 text-xl animate-shimmer select-none"
        style={{ animationDelay: "0.3s" }}
      >
        ♡
      </div>

      {/* SVG Kitten & Heart */}
      <svg
        viewBox="0 0 240 220"
        className="w-48 h-44 sm:w-56 sm:h-52 md:w-60 md:h-56 filter drop-shadow-[0_8px_16px_rgba(244,63,94,0.12)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Heart Gradient */}
          <linearGradient id="heartGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDA4AF" />
            <stop offset="50%" stopColor="#FB7185" />
            <stop offset="100%" stopColor="#F43F5E" />
          </linearGradient>

          {/* Kitten Fur Gradient */}
          <linearGradient id="furGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="90%" stopColor="#FFF9FA" />
            <stop offset="100%" stopColor="#FFE8EC" />
          </linearGradient>

          {/* Blush Glow */}
          <radialGradient id="blushGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FB7185" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FB7185" stopOpacity="0" />
          </radialGradient>

          {/* Shadow Filter */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FDA4AF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground Soft Shadow */}
        <ellipse cx="120" cy="205" rx="70" ry="10" fill="url(#groundShadow)" />

        {/* Fluffy Tail on Right */}
        <path
          d="M 160 170 C 185 170 205 150 200 135 C 195 125 180 135 175 145 C 170 152 165 160 155 168"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Back Feet / Base */}
        <ellipse
          cx="88"
          cy="195"
          rx="18"
          ry="11"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
        />
        <ellipse
          cx="152"
          cy="195"
          rx="18"
          ry="11"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
        />
        {/* Foot Paw lines */}
        <path
          d="M 82 198 C 82 202 85 204 88 204 M 94 198 C 94 202 91 204 88 204"
          stroke="#4A2E35"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 146 198 C 146 202 149 204 152 204 M 158 198 C 158 202 155 204 152 204"
          stroke="#4A2E35"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Kitten Body */}
        <ellipse
          cx="120"
          cy="160"
          rx="44"
          ry="38"
          fill="url(#furGrad)"
          stroke="#4A2E35"
          strokeWidth="3.5"
        />

        {/* Left Ear */}
        <path
          d="M 80 85 C 65 65 52 40 64 30 C 76 22 98 48 106 68 Z"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Left Ear Inner Pink */}
        <path
          d="M 76 75 C 68 62 60 45 68 38 C 76 33 88 52 94 65 Z"
          fill="#FFCCD5"
        />

        {/* Right Ear */}
        <path
          d="M 160 85 C 175 65 188 40 176 30 C 164 22 142 48 134 68 Z"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* Right Ear Inner Pink */}
        <path
          d="M 164 75 C 172 62 180 45 172 38 C 164 33 152 52 146 65 Z"
          fill="#FFCCD5"
        />

        {/* Kitten Head */}
        <path
          d="M 70 100 C 65 75 85 62 120 62 C 155 62 175 75 170 100 C 175 125 155 140 120 140 C 85 140 65 125 70 100 Z"
          fill="url(#furGrad)"
          stroke="#4A2E35"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />

        {/* Cute Fur Tufts (Cheeks) */}
        <path
          d="M 68 95 C 60 97 58 103 66 106 C 58 110 62 116 70 115"
          stroke="#4A2E35"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M 172 95 C 180 97 182 103 174 106 C 182 110 178 116 170 115"
          stroke="#4A2E35"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Smiling Eyes (Matching Reference Image: Happy closed curved eyes) */}
        {mood === "pleading" ? (
          // Pleading big glossy eyes
          <>
            <circle cx="98" cy="98" r="9" fill="#4A2E35" />
            <circle cx="95" cy="95" r="3.5" fill="#FFFFFF" />
            <circle cx="100" cy="101" r="1.5" fill="#FFFFFF" />

            <circle cx="142" cy="98" r="9" fill="#4A2E35" />
            <circle cx="139" cy="95" r="3.5" fill="#FFFFFF" />
            <circle cx="144" cy="101" r="1.5" fill="#FFFFFF" />
          </>
        ) : (
          // Sweet closed smiling eyes (^ ^)
          <>
            <path
              d="M 88 98 C 94 90 104 90 110 98"
              stroke="#4A2E35"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M 130 98 C 136 90 146 90 152 98"
              stroke="#4A2E35"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </>
        )}

        {/* Rosy Cheeks */}
        <ellipse cx="86" cy="108" rx="11" ry="6" fill="url(#blushGlow)" />
        <ellipse cx="154" cy="108" rx="11" ry="6" fill="url(#blushGlow)" />
        <ellipse cx="86" cy="108" rx="7" ry="4" fill="#FDA4AF" opacity="0.6" />
        <ellipse cx="154" cy="108" rx="7" ry="4" fill="#FDA4AF" opacity="0.6" />

        {/* Tiny Cute Nose */}
        <path
          d="M 117 104 C 118 102 122 102 123 104 L 120 107 Z"
          fill="#FB7185"
        />

        {/* Cute 'w' Mouth */}
        <path
          d="M 112 109 C 115 113 119 113 120 108 C 121 113 125 113 128 109"
          stroke="#4A2E35"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cute Whisker Dots / Light Whiskers */}
        <line
          x1="62"
          y1="102"
          x2="48"
          y2="98"
          stroke="#704351"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="62"
          y1="108"
          x2="46"
          y2="110"
          stroke="#704351"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="178"
          y1="102"
          x2="192"
          y2="98"
          stroke="#704351"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="178"
          y1="108"
          x2="194"
          y2="110"
          stroke="#704351"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />

        {/* BIG PASTEL PINK HEART (Held by Kitten) */}
        <g className="animate-pulse-gentle origin-center">
          <path
            d="M 120 190 C 70 155 60 120 85 105 C 105 92 118 108 120 115 C 122 108 135 92 155 105 C 180 120 170 155 120 190 Z"
            fill="url(#heartGrad)"
            stroke="#4A2E35"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          {/* Heart Highlight / Texture */}
          <path
            d="M 88 115 C 80 125 80 135 88 145"
            stroke="#FFE4E8"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.6"
          />
          <circle cx="95" cy="118" r="2.5" fill="#FFFFFF" opacity="0.8" />
        </g>

        {/* Left Paw Grasping Heart */}
        <ellipse
          cx="92"
          cy="138"
          rx="13"
          ry="11"
          transform="rotate(20 92 138)"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
        />
        <path
          d="M 88 142 C 90 145 93 145 95 142"
          stroke="#4A2E35"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Right Paw Grasping Heart */}
        <ellipse
          cx="148"
          cy="138"
          rx="13"
          ry="11"
          transform="rotate(-20 148 138)"
          fill="#FFFFFF"
          stroke="#4A2E35"
          strokeWidth="3.5"
        />
        <path
          d="M 145 142 C 147 145 150 145 152 142"
          stroke="#4A2E35"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
