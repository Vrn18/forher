"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Calendar as CalendarIcon, Sparkles, Crown } from "lucide-react";
import Calendar from "./Calendar";
import BirthdaySurpriseModal from "./BirthdaySurpriseModal";
import { sounds } from "./SoundEffects";

interface DatePickerScreenProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onConfirmDate: () => void;
  onBack: () => void;
}

export default function DatePickerScreen({
  selectedDate,
  onSelectDate,
  onConfirmDate,
  onBack,
}: DatePickerScreenProps) {
  const [showBirthdayModal, setShowBirthdayModal] = useState<boolean>(false);
  const [attemptedDate, setAttemptedDate] = useState<Date | null>(null);

  // Format date in human-friendly romantic format (e.g., Saturday, September 19, 2026)
  const formatRomanticDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleNextClick = () => {
    if (!selectedDate) return;
    sounds.playCelebrationFanfare();
    onConfirmDate();
  };

  const handleBackClick = () => {
    sounds.playPop();
    onBack();
  };

  const handleBirthdayAttempt = (date: Date) => {
    setAttemptedDate(date);
    setShowBirthdayModal(true);
  };

  return (
    <>
      <div className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-100 shadow-card-romantic transition-all duration-500 overflow-visible">
        {/* Top Bar Navigation */}
        <div className="flex items-center justify-between w-full mb-3 sm:mb-4 select-none">
          <button
            type="button"
            onClick={handleBackClick}
            aria-label="Go back to question"
            className="group flex items-center gap-1 p-2 -ml-2 rounded-full hover:bg-rose-50 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          </button>

          <span className="font-handwriting text-rose-400 text-lg sm:text-xl font-semibold -rotate-1 hover:rotate-0 transition-transform">
            Let&apos;s Plan Our Day ♡
          </span>
        </div>

        {/* Cute Calendar Badge Icon */}
        <div className="flex justify-center mb-2">
          <div className="relative p-3 rounded-2xl bg-gradient-to-tr from-rose-100 to-rose-50 border border-rose-200/80 shadow-sm animate-bounce-subtle">
            <CalendarIcon className="w-8 h-8 text-rose-500" />
            <span className="absolute inset-0 flex items-center justify-center pt-2 text-rose-600 font-bold text-xs select-none">
              ♥
            </span>
            {/* Sparkles */}
            <Sparkles className="absolute -top-1.5 -right-1.5 w-4 h-4 text-rose-400 animate-shimmer" />
          </div>
        </div>

        {/* Header Titles */}
        <div className="text-center space-y-1 select-none mb-4 sm:mb-5">
          <h2 className="font-handwriting text-4xl sm:text-5xl font-bold text-[#4A2E35] tracking-tight leading-tight">
            Yay! ♡
          </h2>
          <h3 className="font-sans-soft text-xl sm:text-2xl font-extrabold text-[#4A2E35]">
            Pick a Date
          </h3>
          <p className="font-sans-soft text-rose-400 text-xs sm:text-sm font-medium">
            I can&apos;t wait to spend time with you ♡
          </p>
        </div>

        {/* Interactive Dynamic Calendar */}
        <div className="mb-4 sm:mb-5">
          <Calendar
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
            onBirthdayAttempt={handleBirthdayAttempt}
          />
        </div>

        {/* Selected Date Readout */}
        {selectedDate && (
          <div className="text-center mb-4 animate-pulse-gentle">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs sm:text-sm font-semibold shadow-sm">
              <span>Selected:</span>
              <span className="font-bold">{formatRomanticDate(selectedDate)}</span>
              <span>♡</span>
            </div>
          </div>
        )}

        {/* Primary Action Button ("Next →" / "Let's Go ♡") */}
        <div className="flex justify-center mb-4">
          <button
            type="button"
            disabled={!selectedDate}
            onClick={handleNextClick}
            aria-label={selectedDate ? "Proceed to confirmation" : "Please pick a date first"}
            className={`group relative px-10 py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
              selectedDate
                ? "bg-gradient-to-r from-[#FB7185] via-[#F43F5E] to-[#E11D48] shadow-soft-pink hover:shadow-glow-pink hover:scale-105 active:scale-95 cursor-pointer"
                : "bg-rose-200 text-rose-100 cursor-not-allowed opacity-70"
            }`}
          >
            <span>Next</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Birthday Hint Footnote */}
        <div className="text-center mb-3">
          <button
            type="button"
            onClick={() => handleBirthdayAttempt(new Date(new Date().getFullYear(), 11, 26))}
            className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-rose-400/90 hover:text-rose-600 transition-colors font-medium cursor-pointer"
          >
            <Crown className="w-3 h-3 text-amber-500 fill-amber-400" />
            <span>Note: Date must be before Dec 26 (The Queen&apos;s Birthday! 🎂👑)</span>
          </button>
        </div>

        {/* Bottom Corner Doodles */}
        <div className="flex items-end justify-between w-full text-rose-300/90 select-none pt-1">
          {/* Linked Twin Hearts Doodle */}
          <div className="flex items-center text-rose-300 text-2xl -rotate-6">
            <span className="animate-pulse-gentle">♡</span>
            <span className="-ml-1 text-sm">─</span>
            <span className="animate-pulse-gentle" style={{ animationDelay: "0.5s" }}>♡</span>
          </div>

          {/* Romantic Corner Note */}
          <div className="font-handwriting text-right text-rose-400 text-sm sm:text-base leading-tight rotate-1">
            <div>More dates</div>
            <div>More memories</div>
            <div>with you ♡</div>
          </div>
        </div>
      </div>

      {/* Birthday Love Letter & Surprise Modal */}
      <BirthdaySurpriseModal
        isOpen={showBirthdayModal}
        onClose={() => setShowBirthdayModal(false)}
        attemptedDate={attemptedDate}
      />
    </>
  );
}
