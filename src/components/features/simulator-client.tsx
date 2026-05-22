"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseBusiness, RefreshCw, Sparkles } from "lucide-react";
import { defaultProfile } from "@/lib/demo-data";
import { selectScenario, calculateOutcome } from "@/lib/financial-engine";
import type { LearnerProfile, ScenarioOutcome } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScoreRings } from "@/components/features/score-rings";
import { useProgressStore } from "@/store/use-progress-store";
import { formatCurrency } from "@/lib/utils";

export function SimulatorClient() {
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  const [turn, setTurn] = useState(0);
  const [outcome, setOutcome] = useState<ScenarioOutcome | null>(null);
  const { scores, setScores, addXp } = useProgressStore();
  const scenario = useMemo(() => selectScenario(profile, turn), [profile, turn]);

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <Card>
        <div className="mb-4 flex items-center gap-2">
          <BriefcaseBusiness className="text-teal-200" size={19} aria-hidden />
          <h2 className="text-lg font-bold">Personalize the run</h2>
        </div>
        <div className="space-y-3">
          <label className="block text-sm text-slate-300">
            Age
            <Input
              type="number"
              min={13}
              max={80}
              value={profile.age}
              onChange={(event) => setProfile({ ...profile, age: Number(event.target.value) })}
              className="mt-1"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Dream career
            <Input
              value={profile.dreamCareer}
              onChange={(event) => setProfile({ ...profile, dreamCareer: event.target.value })}
              className="mt-1"
            />
          </label>
          <label className="block text-sm text-slate-300">
            Goals
            <Input value={profile.goals} onChange={(event) => setProfile({ ...profile, goals: event.target.value })} className="mt-1" />
          </label>
          <label className="block text-sm text-slate-300">
            Interests
            <Input value={profile.interests} onChange={(event) => setProfile({ ...profile, interests: event.target.value })} className="mt-1" />
          </label>
          <label className="block text-sm text-slate-300">
            Spending style
            <select
              value={profile.spendingStyle}
              onChange={(event) => setProfile({ ...profile, spendingStyle: event.target.value as LearnerProfile["spendingStyle"] })}
              className="mt-1 h-11 w-full rounded-lg border border-white/12 bg-slate-900 px-3 text-sm text-white outline-none focus:border-teal-200/70"
            >
              <option value="saver">Saver</option>
              <option value="balanced">Balanced</option>
              <option value="spender">Spender</option>
              <option value="risk-taker">Risk-taker</option>
            </select>
          </label>
        </div>
      </Card>
      <div className="space-y-5">
        <ScoreRings scores={scores} />
        <Card className="aurora-border">
          <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-teal-200">{scenario.category}</p>
              <h2 className="mt-2 text-3xl font-bold text-white">{scenario.title}</h2>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-300">
              Income {formatCurrency(scenario.monthlyIncome)} / Costs {formatCurrency(scenario.fixedCosts)}
            </div>
          </div>
          <p className="text-lg leading-8 text-slate-200">{scenario.situation}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {scenario.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => {
                  const result = calculateOutcome(scores, choice);
                  setOutcome(result);
                  setScores(result.updatedScores);
                  addXp(result.xp, result.achievement);
                }}
                className="rounded-lg border border-white/12 bg-white/8 p-4 text-left transition hover:-translate-y-1 hover:border-teal-200/50 hover:bg-white/12 focus:outline-none focus:ring-2 focus:ring-teal-200"
              >
                <span className="text-base font-bold text-white">{choice.label}</span>
                <span className="mt-3 block text-sm leading-6 text-slate-300">{choice.shortImpact}</span>
              </button>
            ))}
          </div>
        </Card>
        {outcome && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-teal-200/30">
              <div className="mb-3 flex items-center gap-2 text-teal-200">
                <Sparkles size={18} aria-hidden />
                <span className="font-bold">AI consequence engine</span>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <p className="text-sm leading-6 text-slate-200">{outcome.consequence}</p>
                <p className="text-sm leading-6 text-slate-300">{outcome.futureImpact}</p>
                <p className="text-sm leading-6 text-slate-300">{outcome.explanation}</p>
                <p className="text-sm leading-6 text-rose-100">{outcome.riskAnalysis}</p>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-3">
                <span className="rounded-lg bg-teal-300 px-3 py-2 text-sm font-bold text-slate-950">+{outcome.xp} XP</span>
                {outcome.achievement && <span className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white">{outcome.achievement} unlocked</span>}
                <Button variant="secondary" onClick={() => { setTurn((value) => value + 1); setOutcome(null); }}>
                  <RefreshCw size={16} aria-hidden />
                  Next scenario
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
