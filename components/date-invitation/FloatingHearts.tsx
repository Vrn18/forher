"use client";

import React, { useEffect, useState } from "react";

interface FloatingItem {
  id: number;
  x: number; // percentage (0-100)
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  opacity: number;
  type: "heart" | "sparkle" | "star";
  char: string;
}

export default function FloatingHearts({ count = 18 }: { count?: number }) {
  const [items, setItems] = useState<FloatingItem[]>([]);

  useEffect(() => {
    const chars = ["♡", "♥", "✦", "✨", "🌸", "💕"];
    const generated: FloatingItem[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 94 + 3, // keep within 3% - 97%
      size: Math.floor(Math.random() * 16) + 12, // 12px - 28px
      duration: Math.random() * 8 + 7, // 7s - 15s
      delay: Math.random() * 6,
      opacity: Math.random() * 0.4 + 0.25, // 0.25 - 0.65
      type: i % 3 === 0 ? "sparkle" : i % 4 === 0 ? "star" : "heart",
      char: chars[Math.floor(Math.random() * chars.length)],
    }));
    setItems(generated);
  }, [count]);

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {items.map((item) => (
        <span
          key={item.id}
          className="absolute select-none text-rose-300 transition-opacity"
          style={{
            left: `${item.x}%`,
            bottom: "-40px",
            fontSize: `${item.size}px`,
            opacity: item.opacity,
            animation: `float-heart ${item.duration}s ease-in-out infinite`,
            animationDelay: `${item.delay}s`,
            filter: "drop-shadow(0 2px 4px rgba(244,63,94,0.15))",
          }}
        >
          {item.char}
        </span>
      ))}
    </div>
  );
}
