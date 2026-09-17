"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RomanticBackground from "@/components/date-invitation/RomanticBackground";
import QuestionScreen from "@/components/date-invitation/QuestionScreen";
import DatePlannerQuestions, { DatePreferences } from "@/components/date-invitation/DatePlannerQuestions";
import DatePickerScreen from "@/components/date-invitation/DatePickerScreen";
import ConfirmationScreen from "@/components/date-invitation/ConfirmationScreen";

type Step = "QUESTION" | "PLAN_ACTIVITIES" | "DATE_SELECTION" | "CONFIRMATION";

export default function Home() {
  const [step, setStep] = useState<Step>("QUESTION");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [preferences, setPreferences] = useState<DatePreferences>({
    activity: "cozy-cafe",
    vibe: "dress-cute",
    music: "yours",
  });

  const handleAcceptQuestion = () => {
    setStep("PLAN_ACTIVITIES");
  };

  const handleNextFromActivities = () => {
    setStep("DATE_SELECTION");
  };

  const handleBackToQuestion = () => {
    setStep("QUESTION");
  };

  const handleBackToActivities = () => {
    setStep("PLAN_ACTIVITIES");
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleConfirmDate = async () => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");

      try {
        await fetch("/api/notify-date", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: `${year}-${month}-${day}`,
            activity: preferences.activity,
            vibe: preferences.vibe,
            rule: preferences.music,
          }),
        });
      } catch (error) {
        console.error("Could not send date notification:", error);
      }

      setStep("CONFIRMATION");
    }
  };

  const handleResetToCalendar = () => {
    setStep("DATE_SELECTION");
  };

  return (
    <RomanticBackground>
      <div className="w-full flex items-center justify-center min-h-[600px] py-4">
        <AnimatePresence mode="wait">
          {step === "QUESTION" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <QuestionScreen onAccept={handleAcceptQuestion} />
            </motion.div>
          )}

          {step === "PLAN_ACTIVITIES" && (
            <motion.div
              key="activities"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <DatePlannerQuestions
                preferences={preferences}
                onUpdatePreferences={setPreferences}
                onNext={handleNextFromActivities}
                onBack={handleBackToQuestion}
              />
            </motion.div>
          )}

          {step === "DATE_SELECTION" && (
            <motion.div
              key="datepicker"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <DatePickerScreen
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                onConfirmDate={handleConfirmDate}
                onBack={handleBackToActivities}
              />
            </motion.div>
          )}

          {step === "CONFIRMATION" && selectedDate && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -12 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              <ConfirmationScreen
                selectedDate={selectedDate}
                preferences={preferences}
                onReset={handleResetToCalendar}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </RomanticBackground>
  );
}
