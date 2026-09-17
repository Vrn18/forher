"use client";

import React, { useState } from "react";
import { ArrowLeft, ArrowRight, Coffee, Sparkles, ShieldCheck, Smile, Heart } from "lucide-react";
import { sounds } from "./SoundEffects";

export interface DatePreferences {
  activity: string;
  vibe: string;
  music: string; // Used for "promise/comfort rule"
}

interface DatePlannerQuestionsProps {
  preferences: DatePreferences;
  onUpdatePreferences: (prefs: DatePreferences) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function DatePlannerQuestions({
  preferences,
  onUpdatePreferences,
  onNext,
  onBack,
}: DatePlannerQuestionsProps) {
  const [activity, setActivity] = useState<string>(preferences.activity || "cozy-cafe");
  const [vibe, setVibe] = useState<string>(preferences.vibe || "casual-comfy");
  const [rule, setRule] = useState<string>(preferences.music || "zero-pressure");

  const activityOptions = [
    { id: "cozy-cafe", label: "Quiet Cozy Cafe", icon: "☕", desc: "Warm tea/coffee, sweet pastries & peaceful talk" },
    { id: "walk-park", label: "Peaceful Walk in the Park", icon: "🌿", desc: "Fresh breeze, open air & zero pressure" },
    { id: "icecream-dessert", label: "Ice Cream / Dessert Spot", icon: "🍨", desc: "Sweet treats, easy laughs & casual vibes" },
    { id: "casual-dinner", label: "Comfortable Casual Dinner", icon: "🍝", desc: "Good food in a relaxed, friendly setting" },
    { id: "boba-chat", label: "Boba & Friendly Chat", icon: "🧋", desc: "Lighthearted, fun, and easy to pause anytime" },
  ];

  const vibeOptions = [
    { id: "casual-comfy", label: "Super Comfy & Casual", icon: "🧸", desc: "Hoodies/sweats, 100% relaxed" },
    { id: "cute-relaxed", label: "Cute & Everyday Wear", icon: "🌸", desc: "Simple, easy, and pretty" },
    { id: "dress-fancy", label: "A Little Dressed Up", icon: "✨", desc: "Only if you feel like dressing up" },
  ];

  const ruleOptions = [
    { id: "zero-pressure", label: "Zero Pressure Rule", icon: "🤍", desc: "Just two people catching up, no heavy expectations" },
    { id: "listen-to-you", label: "I Just Listen", icon: "🎧", desc: "You tell me all about what you've been up to" },
    { id: "good-vibes-only", label: "Laughs & Good Vibes Only", icon: "🌸", desc: "We leave the past behind and just enjoy the day" },
  ];

  const handleSelectActivity = (id: string) => {
    sounds.playPop();
    setActivity(id);
    onUpdatePreferences({ activity: id, vibe, music: rule });
  };

  const handleSelectVibe = (id: string) => {
    sounds.playPop();
    setVibe(id);
    onUpdatePreferences({ activity, vibe: id, music: rule });
  };

  const handleSelectRule = (id: string) => {
    sounds.playPop();
    setRule(id);
    onUpdatePreferences({ activity, vibe, music: id });
  };

  const handleContinue = () => {
    sounds.playPop();
    onUpdatePreferences({ activity, vibe, music: rule });
    onNext();
  };

  return (
    <div className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-100 shadow-card-romantic transition-all duration-500 overflow-visible">
      {/* Top Navigation */}
      <div className="flex items-center justify-between w-full mb-3 sm:mb-4 select-none">
        <button
          type="button"
          onClick={() => {
            sounds.playPop();
            onBack();
          }}
          aria-label="Back to question"
          className="group flex items-center gap-1 p-2 -ml-2 rounded-full hover:bg-rose-50 text-rose-400 hover:text-rose-600 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        </button>

        <span className="font-handwriting text-rose-400 text-base sm:text-lg font-semibold -rotate-1">
          Whatever Makes You Most Comfortable ♡
        </span>
      </div>

      {/* Header */}
      <div className="text-center space-y-1 select-none mb-6">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-500 text-xs font-semibold mb-1">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Making Sure You Feel 100% Comfortable</span>
        </div>
        <h2 className="font-handwriting text-3xl sm:text-4xl md:text-5xl font-bold text-[#4A2E35] tracking-tight leading-tight">
          What would feel best for you? ♡
        </h2>
        <p className="font-sans-soft text-rose-400 text-xs sm:text-sm font-medium">
          I want this to be completely stress-free and pleasant for you.
        </p>
      </div>

      {/* Question 1: Setting */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center gap-2 font-sans-soft text-xs sm:text-sm md:text-base font-extrabold text-[#4A2E35]">
          <Coffee className="w-4 h-4 text-rose-500" />
          <span>1. What kind of setting would you prefer?</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {activityOptions.map((opt) => {
            const isSelected = activity === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectActivity(opt.id)}
                className={`flex items-start gap-3 p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-rose-50/90 border-rose-400 ring-2 ring-rose-300 shadow-soft-pink scale-[1.01]"
                    : "bg-white/80 border-rose-100 hover:border-rose-300 hover:bg-rose-50/40"
                }`}
              >
                <span className="text-2xl select-none">{opt.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-sans-soft text-xs sm:text-sm font-bold text-[#4A2E35] flex items-center justify-between">
                    <span>{opt.label}</span>
                    {isSelected && <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />}
                  </div>
                  <div className="text-[11px] sm:text-xs text-rose-400 font-medium">
                    {opt.desc}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 2: Vibe */}
      <div className="space-y-3 mb-6">
        <label className="flex items-center gap-2 font-sans-soft text-xs sm:text-sm md:text-base font-extrabold text-[#4A2E35]">
          <Smile className="w-4 h-4 text-rose-500" />
          <span>2. What dress code makes you feel at ease?</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {vibeOptions.map((opt) => {
            const isSelected = vibe === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectVibe(opt.id)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-rose-50/90 border-rose-400 ring-2 ring-rose-300 shadow-soft-pink scale-[1.02]"
                    : "bg-white/80 border-rose-100 hover:border-rose-300 hover:bg-rose-50/40"
                }`}
              >
                <span className="text-2xl mb-1 select-none">{opt.icon}</span>
                <div className="font-sans-soft text-xs sm:text-sm font-bold text-[#4A2E35]">
                  {opt.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-rose-400 font-medium mt-0.5">
                  {opt.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Question 3: Promise / Comfort Rule */}
      <div className="space-y-3 mb-7">
        <label className="flex items-center gap-2 font-sans-soft text-xs sm:text-sm md:text-base font-extrabold text-[#4A2E35]">
          <ShieldCheck className="w-4 h-4 text-rose-500" />
          <span>3. What is our promise for our catch-up?</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {ruleOptions.map((opt) => {
            const isSelected = rule === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => handleSelectRule(opt.id)}
                className={`flex flex-col items-center text-center p-3 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-rose-50/90 border-rose-400 ring-2 ring-rose-300 shadow-soft-pink scale-[1.02]"
                    : "bg-white/80 border-rose-100 hover:border-rose-300 hover:bg-rose-50/40"
                }`}
              >
                <span className="text-2xl mb-1 select-none">{opt.icon}</span>
                <div className="font-sans-soft text-xs sm:text-sm font-bold text-[#4A2E35]">
                  {opt.label}
                </div>
                <div className="text-[10px] sm:text-[11px] text-rose-400 font-medium mt-0.5">
                  {opt.desc}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Gentle Statement Banner */}
      <div className="mb-6 p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border border-rose-200/70 text-center select-none">
        <p className="font-handwriting text-base sm:text-lg text-rose-500 font-bold">
          &ldquo;If I want to make effort for you, I will.&rdquo; ♡
        </p>
      </div>

      {/* Next Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleContinue}
          className="group relative px-10 py-3.5 rounded-full text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#FB7185] via-[#F43F5E] to-[#E11D48] shadow-soft-pink hover:shadow-glow-pink transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
        >
          <span>Pick a Date that works for you ♡</span>
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
