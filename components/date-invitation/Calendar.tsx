"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Cake, Sparkles, Lock } from "lucide-react";
import { sounds } from "./SoundEffects";

interface CalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  onBirthdayAttempt?: (date: Date) => void;
  initialMonth?: Date;
}

export default function Calendar({
  selectedDate,
  onSelectDate,
  onBirthdayAttempt,
  initialMonth,
}: CalendarProps) {
  // Initialize current viewing month
  const [currentMonth, setCurrentMonth] = useState<Date>(() => {
    if (initialMonth) return new Date(initialMonth.getFullYear(), initialMonth.getMonth(), 1);
    if (selectedDate) return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth(); // 0-indexed

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // Weekday labels
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Days calculations
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 (Sun) to 6 (Sat)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  // Navigate months
  const handlePrevMonth = () => {
    sounds.playPop();
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    sounds.playPop();
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // Helper to check Birthday & After-Birthday conditions (Dec 26)
  const checkIsBirthday = (d: Date) => {
    return d.getMonth() === 11 && d.getDate() === 26;
  };

  const checkIsAfterBirthday = (d: Date) => {
    // Any date strictly after Dec 26 of current year, or future years
    if (d.getFullYear() > currentYear) return true;
    if (d.getFullYear() === currentYear) {
      if (d.getMonth() === 11 && d.getDate() > 26) return true;
    }
    return false;
  };

  // Build grid calendar cells
  interface DayCell {
    dayNumber: number;
    isCurrentMonth: boolean;
    date: Date;
    isPast: boolean;
    isToday: boolean;
    isSelected: boolean;
    isBirthday: boolean;
    isAfterBirthday: boolean;
  }

  const cells: DayCell[] = [];

  // Previous month trailing days
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const d = new Date(year, month - 1, dayNum);
    d.setHours(0, 0, 0, 0);
    const isBirthday = checkIsBirthday(d);
    const isAfterBirthday = checkIsAfterBirthday(d);

    cells.push({
      dayNumber: dayNum,
      isCurrentMonth: false,
      date: d,
      isPast: d < today,
      isToday: d.getTime() === today.getTime(),
      isSelected: !!selectedDate && selectedDate.toDateString() === d.toDateString(),
      isBirthday,
      isAfterBirthday,
    });
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    const d = new Date(year, month, i);
    d.setHours(0, 0, 0, 0);
    const isBirthday = checkIsBirthday(d);
    const isAfterBirthday = checkIsAfterBirthday(d);

    cells.push({
      dayNumber: i,
      isCurrentMonth: true,
      date: d,
      isPast: d < today,
      isToday: d.getTime() === today.getTime(),
      isSelected: !!selectedDate && selectedDate.toDateString() === d.toDateString(),
      isBirthday,
      isAfterBirthday,
    });
  }

  // Next month leading days (fill grid to 35 or 42)
  const remainingCells = (cells.length > 35 ? 42 : 35) - cells.length;
  for (let i = 1; i <= remainingCells; i++) {
    const d = new Date(year, month + 1, i);
    d.setHours(0, 0, 0, 0);
    const isBirthday = checkIsBirthday(d);
    const isAfterBirthday = checkIsAfterBirthday(d);

    cells.push({
      dayNumber: i,
      isCurrentMonth: false,
      date: d,
      isPast: d < today,
      isToday: d.getTime() === today.getTime(),
      isSelected: !!selectedDate && selectedDate.toDateString() === d.toDateString(),
      isBirthday,
      isAfterBirthday,
    });
  }

  const handleDayClick = (cell: DayCell) => {
    if (cell.isPast) return; // Prevent picking past dates

    // If she attempts to choose Dec 26 (her birthday) or ANY date after Dec 26
    if (cell.isBirthday || cell.isAfterBirthday) {
      if (onBirthdayAttempt) {
        onBirthdayAttempt(cell.date);
      }
      return;
    }

    sounds.playDateSelect();
    onSelectDate(cell.date);

    // If clicking a date from adjacent month, shift view to that month
    if (!cell.isCurrentMonth) {
      setCurrentMonth(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1));
    }
  };

  // Determine if previous month navigation should be disabled
  const isPrevMonthPast =
    new Date(year, month - 1, new Date(year, month, 0).getDate()) < today &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  return (
    <div className="w-full max-w-sm mx-auto bg-white/90 rounded-2xl p-4 sm:p-5 border border-rose-100 shadow-sm select-none">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4 px-1">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={isPrevMonthPast}
          aria-label="Previous month"
          className="p-1.5 rounded-full hover:bg-rose-50 text-rose-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h3 className="font-sans-soft text-base sm:text-lg font-bold text-[#4A2E35] tracking-tight">
          {monthNames[month]} {year}
        </h3>

        <button
          type="button"
          onClick={handleNextMonth}
          aria-label="Next month"
          className="p-1.5 rounded-full hover:bg-rose-50 text-rose-500 transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {weekdays.map((wd) => (
          <div
            key={wd}
            className="text-[11px] sm:text-xs font-semibold text-rose-300 uppercase tracking-wider py-1"
          >
            {wd}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 gap-1 sm:gap-1.5 place-items-center">
        {cells.map((cell, idx) => {
          const isSelected = cell.isSelected;
          const isPast = cell.isPast;
          const isCurrentMonth = cell.isCurrentMonth;
          const isToday = cell.isToday;
          const isBirthday = cell.isBirthday;
          const isAfterBirthday = cell.isAfterBirthday;

          return (
            <button
              key={`${cell.date.toISOString()}-${idx}`}
              type="button"
              disabled={isPast}
              onClick={() => handleDayClick(cell)}
              aria-label={`${cell.date.toDateString()}${
                isBirthday ? ", Her Birthday" : isAfterBirthday ? ", After Birthday (Secret message)" : ""
              }${isSelected ? ", selected" : ""}${isPast ? ", unavailable past date" : ""}`}
              className={`relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-gradient-to-tr from-[#FB7185] to-[#F43F5E] text-white font-bold shadow-soft-pink scale-105 z-10 animate-pulse-gentle"
                  : isBirthday
                  ? "bg-amber-100/90 text-amber-900 border-2 border-amber-300 font-bold hover:scale-110 shadow-xs animate-bounce-subtle"
                  : isAfterBirthday
                  ? "text-rose-400/80 hover:bg-rose-100/60 hover:text-rose-600"
                  : isPast
                  ? "text-rose-200/60 cursor-not-allowed line-through decoration-rose-200/40"
                  : isCurrentMonth
                  ? "text-[#4A2E35] hover:bg-rose-50 hover:text-rose-600 active:scale-95"
                  : "text-rose-200 hover:bg-rose-50/50"
              }`}
            >
              {cell.dayNumber}

              {/* Her Birthday (Dec 26) Crown/Cake Badge */}
              {isBirthday && (
                <span className="absolute -top-2 -right-1 text-[11px] animate-bounce-subtle">
                  🎂
                </span>
              )}

              {/* Today's subtle indicator dot */}
              {isToday && !isSelected && !isBirthday && (
                <span className="absolute bottom-1 w-1 h-1 rounded-full bg-rose-400" />
              )}

              {/* Selected Heart Badge */}
              {isSelected && (
                <span className="absolute -top-1 -right-1 text-[9px] text-white">
                  ♡
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
