"use client";

import React, { useState } from "react";
import { Heart, Sparkles, MailOpen, Mail } from "lucide-react";
import { sounds } from "./SoundEffects";

export default function QuoteKeepsake() {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    sounds.playPop();
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full select-none transition-all duration-300">
      <div className="relative p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-rose-50/95 via-pink-50/90 to-amber-50/80 border-2 border-rose-200/90 shadow-soft-pink text-left overflow-hidden">
        {/* Floating Background Stars & Accents */}
        <div className="absolute -top-2 -right-2 text-rose-300/40 text-4xl select-none pointer-events-none">
          ♥
        </div>
        <div className="absolute bottom-2 right-4 text-amber-300/60 text-lg animate-shimmer select-none pointer-events-none">
          ✨
        </div>
        <div className="absolute top-4 left-3 text-rose-300/50 text-sm animate-bounce-subtle select-none pointer-events-none">
          ✦
        </div>

        {/* Top Keepsake Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 border border-rose-200 text-rose-600 text-[11px] sm:text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 fill-rose-300" />
            <span>A Sincere Note From My Heart</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </div>

          <button
            type="button"
            onClick={toggleOpen}
            className="flex items-center gap-1 text-[11px] sm:text-xs text-rose-400 hover:text-rose-600 font-semibold cursor-pointer transition-colors"
          >
            {isOpen ? (
              <>
                <MailOpen className="w-3.5 h-3.5 text-rose-500" />
                <span>Letter Open</span>
              </>
            ) : (
              <>
                <Mail className="w-3.5 h-3.5 text-rose-500" />
                <span>Read Note</span>
              </>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="space-y-3 animate-scale-up">
            {/* The Famous Core Belief */}
            <div className="border-l-4 border-rose-400 pl-3.5 py-1">
              <p className="font-handwriting text-2xl sm:text-3xl font-extrabold text-[#4A2E35] leading-snug">
                &ldquo;If I want to, I will. And I wanted to, and I will.&rdquo;
              </p>
            </div>

            {/* Emotional Narrative & Meaning */}
            <div className="text-xs sm:text-sm text-[#4A2E35] leading-relaxed space-y-2 bg-white/75 p-4 rounded-2xl border border-rose-100/80">
              <p>
                You’ve always believed that when someone truly cares, they show up without making excuses — because <strong className="text-rose-600">if they want to, they will.</strong>
              </p>
              <p>
                Over these past 8 months, not a single week went by where I didn’t think about how much I miss our conversations and your presence. I wanted to put my pride aside, I wanted to show you genuine effort, and I wanted to be brave enough to ask you to catch up.
              </p>
              <p className="text-rose-600 font-medium italic">
                So here I am: I wanted to, and I will.
              </p>
              <p className="font-semibold text-[#4A2E35] flex items-center gap-1 pt-1 border-t border-rose-100">
                <span>Thank you for giving me this chance. It truly means the world to me.</span>
                <span className="text-rose-500">♡</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
