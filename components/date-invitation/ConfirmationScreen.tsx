"use client";

import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import { Heart, Calendar, Share2, Download, Check, Sparkles, RotateCcw, Coffee, Smile, ShieldCheck } from "lucide-react";
import CuteIllustration from "./CuteIllustration";
import QuoteKeepsake from "./QuoteKeepsake";
import { DatePreferences } from "./DatePlannerQuestions";
import { sounds } from "./SoundEffects";

interface ConfirmationScreenProps {
  selectedDate: Date;
  preferences?: DatePreferences;
  onReset: () => void;
}

export default function ConfirmationScreen({
  selectedDate,
  preferences,
  onReset,
}: ConfirmationScreenProps) {
  const [copied, setCopied] = useState<boolean>(false);

  // Trigger romantic confetti on mount
  useEffect(() => {
    const end = Date.now() + 3 * 1000;
    const colors = ["#FB7185", "#FDA4AF", "#F43F5E", "#FFE4E8", "#FDE047", "#FFFFFF"];

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: colors,
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  // Format date
  const formattedDate = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  // Calculate days remaining
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(selectedDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const getCountdownText = () => {
    if (diffDays === 0) return "Today is the day! 💕";
    if (diffDays === 1) return "Tomorrow! Looking forward to seeing you ✨";
    if (diffDays < 0) return "A special memory together ♡";
    return `Only ${diffDays} days to go! ⏳✨`;
  };

  const activityLabels: Record<string, string> = {
    "cozy-cafe": "Quiet Cozy Cafe ☕",
    "walk-park": "Peaceful Walk in the Park 🌿",
    "icecream-dessert": "Ice Cream / Dessert 🍨",
    "casual-dinner": "Comfortable Casual Dinner 🍝",
    "boba-chat": "Boba & Friendly Chat 🧋",
  };

  const vibeLabels: Record<string, string> = {
    "casual-comfy": "Super Comfy & Casual 🧸",
    "cute-relaxed": "Cute & Everyday Wear 🌸",
    "dress-fancy": "A Little Dressed Up ✨",
  };

  const ruleLabels: Record<string, string> = {
    "zero-pressure": "Zero Pressure Rule 🤍",
    "listen-to-you": "I Just Listen 🎧",
    "good-vibes-only": "Laughs & Good Vibes Only 🌸",
  };

  const chosenActivity = preferences?.activity ? activityLabels[preferences.activity] || "Cozy Cafe" : "Cozy Cafe";
  const chosenVibe = preferences?.vibe ? vibeLabels[preferences.vibe] || "Comfy & Casual" : "Comfy & Casual";
  const chosenRule = preferences?.music ? ruleLabels[preferences.music] || "Zero Pressure" : "Zero Pressure";

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    const title = encodeURIComponent("Catching up over coffee ♡");
    const details = encodeURIComponent(
      `Our catch up!\nSetting: ${chosenActivity}\nVibe: ${chosenVibe}\nRule: ${chosenRule}\n\n"If I want to, I will. And I wanted to, and I will." ♡`
    );
    const location = encodeURIComponent("Cozy Spot");

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T170000/${dateStr}T190000&details=${details}&location=${location}`;
  };

  // Download .ics Calendar File
  const handleDownloadICS = () => {
    sounds.playPop();

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const dateStr = `${year}${month}${day}`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Our Catch Up//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `DTSTART:${dateStr}T170000`,
      `DTEND:${dateStr}T190000`,
      "SUMMARY:Catching up over coffee ♡",
      `DESCRIPTION:Our catch up! Setting: ${chosenActivity} | Vibe: ${chosenVibe} | Rule: ${chosenRule}. "If I want to, I will - and I will." ♡`,
      "LOCATION:Cozy Spot",
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `our-date-${dateStr}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // Copy Sweet Text Note
  const handleCopyNote = async () => {
    sounds.playPop();
    const note = `I'm really looking forward to seeing you on ${formattedDate}!\nSetting: ${chosenActivity}\nVibe: ${chosenVibe}\n"If I want to, I will. And I wanted to, and I will." ♡ Thank you for giving me this chance.`;
    try {
      await navigator.clipboard.writeText(note);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  return (
    <div className="relative w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 md:p-10 border border-rose-100 shadow-card-romantic transition-all duration-500 overflow-visible text-center">
      {/* Sparkle Header Badge */}
      <div className="flex justify-center mb-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-rose-500 text-xs sm:text-sm font-semibold shadow-sm animate-bounce-subtle">
          <Sparkles className="w-4 h-4 text-rose-400" />
          <span>Looking Forward to Seeing You</span>
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
        </div>
      </div>

      {/* Main Title & Gentle Subtitles */}
      <div className="space-y-2 select-none mb-5">
        <h1 className="font-handwriting text-4xl sm:text-5xl md:text-6xl font-bold text-[#4A2E35] tracking-tight leading-tight">
          It&apos;s a Date! ♡
        </h1>
        <p className="font-handwriting text-2xl sm:text-3xl text-rose-500 font-semibold">
          Thank you for giving me this chance. 🥰
        </p>
        <p className="font-sans-soft text-rose-400 text-xs sm:text-sm font-medium">
          I promise to make you smile — no pressure, just genuine effort.
        </p>
      </div>

      {/* Center Happy Kitten */}
      <div className="my-2 flex justify-center">
        <CuteIllustration mood="happy" onKittenClick={() => sounds.playPop()} />
      </div>

      {/* Romantic Date Showcase Card */}
      <div className="my-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-rose-50/80 via-white to-pink-50/80 border border-rose-200/80 shadow-soft-pink space-y-3">
        <div className="text-xs uppercase tracking-widest text-rose-400 font-bold">
          Our Special Day
        </div>
        <div className="font-sans-soft text-xl sm:text-2xl md:text-3xl font-extrabold text-[#4A2E35]">
          {formattedDate}
        </div>
        <div className="inline-block px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-600 text-xs sm:text-sm font-bold shadow-xs">
          {getCountdownText()}
        </div>

        {/* Date Choices Summary Chips */}
        {preferences && (
          <div className="pt-3 border-t border-rose-100 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
            <div className="bg-white/80 p-2.5 rounded-xl border border-rose-100">
              <div className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1">
                <Coffee className="w-3 h-3 text-rose-500" /> Setting
              </div>
              <div className="text-xs font-bold text-[#4A2E35] mt-0.5 truncate">{chosenActivity}</div>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-rose-100">
              <div className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1">
                <Smile className="w-3 h-3 text-rose-500" /> Vibe
              </div>
              <div className="text-xs font-bold text-[#4A2E35] mt-0.5 truncate">{chosenVibe}</div>
            </div>
            <div className="bg-white/80 p-2.5 rounded-xl border border-rose-100">
              <div className="text-[10px] text-rose-400 uppercase font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-rose-500" /> Promise
              </div>
              <div className="text-xs font-bold text-[#4A2E35] mt-0.5 truncate">{chosenRule}</div>
            </div>
          </div>
        )}
      </div>

      {/* Signature Belief Keepsake Note ("If I want to, I will. And I wanted to, and I will.") */}
      <div className="my-5">
        <QuoteKeepsake />
      </div>

      {/* Action Buttons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        {/* Google Calendar Link */}
        <a
          href={getGoogleCalendarUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => sounds.playPop()}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-rose-500" />
          <span>Add to Google Calendar</span>
        </a>

        {/* Download .ICS File */}
        <button
          type="button"
          onClick={handleDownloadICS}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white hover:bg-rose-50 border border-rose-200 text-rose-600 font-semibold text-xs sm:text-sm shadow-xs hover:shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
        >
          <Download className="w-4 h-4 text-rose-500" />
          <span>Apple / Outlook Invite</span>
        </button>

        {/* Copy Note to Clipboard */}
        <button
          type="button"
          onClick={handleCopyNote}
          className="sm:col-span-2 flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs sm:text-sm shadow-soft-pink hover:shadow-glow-pink transition-all duration-200 hover:scale-[1.02] active:scale-98 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-white" />
              <span>Copied Message to Clipboard! ♡</span>
            </>
          ) : (
            <>
              <Share2 className="w-4 h-4 text-white" />
              <span>Copy Sweet Message to Text Her</span>
            </>
          )}
        </button>
      </div>

      {/* Change / Reschedule Date Button */}
      <div className="pt-2 border-t border-rose-100/80 flex items-center justify-center">
        <button
          type="button"
          onClick={() => {
            sounds.playPop();
            onReset();
          }}
          className="group inline-flex items-center gap-1.5 text-xs sm:text-sm text-rose-400 hover:text-rose-600 font-medium transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 transition-transform group-hover:-rotate-90" />
          <span>Want to change plans or pick a different date?</span>
        </button>
      </div>
    </div>
  );
}
