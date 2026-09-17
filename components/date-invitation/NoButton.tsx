"use client";

import React, { useState, useRef, useCallback } from "react";
import { sounds } from "./SoundEffects";

interface NoButtonProps {
  onEvade?: (attemptCount: number) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function NoButton({ onEvade, containerRef }: NoButtonProps) {
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState<number>(0);
  const [hasMoved, setHasMoved] = useState<boolean>(false);
  const [currentMessage, setCurrentMessage] = useState<string>("I really missed you though... 🥺");
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const playfulMessages = [
    "I really missed you though... 🥺",
    "Just a quick coffee, no pressure at all! ♡",
    "I promise I'll only make you laugh 🤞",
    "Even just 20 minutes to see your smile? 🌸",
    "8 months was already too long without you 🥺♡",
    "Give me one small chance to treat you? ☕",
    "I'd love to hear how you've been... ♡",
  ];

  const moveButton = useCallback(() => {
    sounds.playWhoosh();

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setHasMoved(true);
    setShowMessage(true);

    const msgIndex = Math.min(newAttempts - 1, playfulMessages.length - 1);
    setCurrentMessage(playfulMessages[msgIndex]);

    if (onEvade) {
      onEvade(newAttempts);
    }

    if (buttonRef.current) {
      const container = containerRef?.current || buttonRef.current.parentElement;
      if (container) {
        const containerRect = container.getBoundingClientRect();
        const maxOffsetRangeX = Math.min(130, Math.floor(containerRect.width / 2 - 30));
        const maxOffsetRangeY = 100;

        let nextX = (Math.random() * 2 - 1) * maxOffsetRangeX;
        let nextY = (Math.random() * 2 - 1) * maxOffsetRangeY;

        if (Math.abs(nextX - position.x) < 40) {
          nextX = nextX > 0 ? nextX + 50 : nextX - 50;
        }
        if (Math.abs(nextY - position.y) < 30) {
          nextY = nextY > 0 ? nextY + 40 : nextY - 40;
        }

        nextX = Math.max(-maxOffsetRangeX, Math.min(maxOffsetRangeX, nextX));
        nextY = Math.max(-80, Math.min(80, nextY));

        setPosition({ x: nextX, y: nextY });
      } else {
        const randX = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 80 + 40);
        const randY = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 60 + 30);
        setPosition({ x: randX, y: randY });
      }
    }
  }, [attempts, containerRef, onEvade, position.x, position.y]);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" || e.pointerType === "touch" || e.pointerType === "pen") {
      moveButton();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    moveButton();
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    moveButton();
  };

  return (
    <div className="relative inline-block select-none">
      {/* Playful Evasive Button */}
      <button
        ref={buttonRef}
        type="button"
        onPointerEnter={handlePointerEnter}
        onTouchStart={handleTouchStart}
        onClick={handleClick}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: hasMoved
            ? "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)"
            : "transform 0.2s ease",
        }}
        aria-label="No, not yet"
        className="relative px-8 py-3 rounded-full text-base sm:text-lg font-semibold bg-white/90 text-rose-400 border-2 border-rose-200/90 shadow-sm hover:shadow-md hover:border-rose-300 hover:text-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-300 transition-colors duration-200 cursor-pointer min-w-[120px]"
      >
        No
      </button>

      {/* Tender Doodle Note below button */}
      {showMessage && (
        <div
          className="absolute left-1/2 -translate-x-1/2 top-full mt-3 flex flex-col items-center pointer-events-none z-30 min-w-[210px] animate-bounce-subtle"
          style={{
            transform: `translate(calc(-50% + ${position.x * 0.4}px), ${position.y * 0.4}px)`,
            transition: "transform 0.35s ease-out",
          }}
        >
          {/* Cute curved doodle arrow */}
          <svg
            className="w-8 h-8 text-rose-400 stroke-current fill-none -mt-1"
            viewBox="0 0 40 40"
          >
            <path
              d="M 28 5 C 22 15 15 20 18 32 M 18 32 L 12 24 M 18 32 L 26 26"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="font-handwriting text-rose-500 text-lg sm:text-xl font-bold -rotate-2 text-center drop-shadow-sm px-3 py-1 bg-white/90 backdrop-blur-sm rounded-xl border border-rose-100 shadow-xs">
            {currentMessage}
          </span>
        </div>
      )}
    </div>
  );
}
