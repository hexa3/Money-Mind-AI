"use client";

import { motion } from "framer-motion";
import type { ScoreSet } from "@/lib/types";

const scoreMeta = [
  { key: "money", label: "Money", color: "#2dd4bf" },
  { key: "happiness", label: "Happiness", color: "#facc15" },
  { key: "knowledge", label: "Knowledge", color: "#60a5fa" },
  { key: "risk", label: "Risk", color: "#fb7185" },
] as const;

export function ScoreRings({ scores }: { scores: ScoreSet }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {scoreMeta.map((item) => (
        <div key={item.key} className="rounded-lg border border-white/10 bg-white/7 p-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm text-slate-300">{item.label}</span>
            <span className="text-lg font-bold text-white">{scores[item.key]}</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={{ width: `${scores[item.key]}%` }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
