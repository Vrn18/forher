"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Sparkles } from "lucide-react";
import FloatingHearts from "./FloatingHearts";
import { sounds } from "./SoundEffects";

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  char: string;
}

export default function RomanticBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [particles, setParticles] = useState<ClickParticle[]>([]);

  const toggleSound = () => {
    const nextMuted = sounds.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sounds.playPop();
    }
  };

  const handleGlobalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Spawn a gentle floating heart at click location
    const chars = ["♡", "♥", "✦", "✨", "🌸", "💕"];
    const newParticle: ClickParticle = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      char: chars[Math.floor(Math.random() * chars.length)],
    };

    setParticles((prev) => [...prev.slice(-15), newParticle]);

    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
    }, 1000);
  };

  return (
    <div
      onClick={handleGlobalClick}
      className="relative min-h-screen w-full bg-[#FFF5F7] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-x-hidden selection:bg-rose-200"
    >
      {/* Soft Ambient Radial Gradients */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,_rgba(255,228,230,0.7)_0%,_transparent_50%),radial-gradient(circle_at_80%_80%,_rgba(254,205,211,0.6)_0%,_transparent_50%),radial-gradient(circle_at_50%_50%,_rgba(255,241,242,0.8)_0%,_transparent_70%)]" />

      {/* Floating Hearts & Stars */}
      <FloatingHearts count={20} />

      {/* Click Particles Burst */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 select-none text-rose-400 font-bold pointer-events-none"
            style={{
              left: `${p.x}px`,
              top: `${p.y}px`,
              animation: "float-heart 1s ease-out forwards",
              fontSize: "20px",
            }}
          >
            {p.char}
          </span>
        ))}
      </div>

      {/* Sound Toggle Button (Floating Top Right) */}
      <div className="fixed top-4 right-4 z-40">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleSound();
          }}
          aria-label={isMuted ? "Unmute sound effects" : "Mute sound effects"}
          className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-rose-500 border border-rose-200/80 shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-95 text-xs font-medium cursor-pointer"
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline text-rose-400">Sound: Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-rose-500 animate-pulse-gentle" />
              <span className="hidden sm:inline text-rose-600">Sound: On</span>
            </>
          )}
        </button>
      </div>

      {/* Main Content Container */}
      <main className="relative z-10 w-full max-w-xl flex flex-col items-center justify-center">
        {children}
      </main>

      {/* Subtle Footer Note */}
      <footer className="relative z-10 mt-8 text-center text-rose-300/80 text-xs font-medium tracking-wide">
        Made with all my heart ♡
      </footer>
    </div>
  );
}
