"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { startingScores } from "@/lib/demo-data";
import type { ScoreSet } from "@/lib/types";

type ProgressState = {
  scores: ScoreSet;
  xp: number;
  streak: number;
  level: number;
  achievements: string[];
  setScores: (scores: ScoreSet) => void;
  addXp: (xp: number, achievement?: string) => void;
  reset: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      scores: startingScores,
      xp: 1180,
      streak: 6,
      level: 3,
      achievements: ["Emergency Fund Spark", "Budget Architect"],
      setScores: (scores) => set({ scores }),
      addXp: (xp, achievement) =>
        set((state) => {
          const totalXp = state.xp + xp;
          return {
            xp: totalXp,
            level: Math.max(1, Math.floor(totalXp / 650) + 1),
            achievements: achievement && !state.achievements.includes(achievement)
              ? [...state.achievements, achievement]
              : state.achievements,
          };
        }),
      reset: () =>
        set({
          scores: startingScores,
          xp: 1180,
          streak: 6,
          level: 3,
          achievements: ["Emergency Fund Spark", "Budget Architect"],
        }),
    }),
    { name: "moneymind-progress" },
  ),
);
