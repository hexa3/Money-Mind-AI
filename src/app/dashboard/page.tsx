"use client";

import { Flame, Trophy, Zap } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { QuestGrid } from "@/components/features/quest-grid";
import { ScoreRings } from "@/components/features/score-rings";
import { SectionShell, Card } from "@/components/ui/card";
import { useProgressStore } from "@/store/use-progress-store";

export default function DashboardPage() {
  const { scores, xp, level, streak, achievements } = useProgressStore();

  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader
          eyebrow="Command center"
          title="Your money intelligence is leveling up."
          description="Track choices, quest progress, achievements, and the four scores that make MoneyMind feel more like a life simulator than a budgeting app."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <Card><Zap className="text-teal-200" aria-hidden /><p className="mt-3 text-3xl font-black">{xp}</p><p className="text-sm text-slate-400">Total XP</p></Card>
          <Card><Trophy className="text-yellow-200" aria-hidden /><p className="mt-3 text-3xl font-black">Level {level}</p><p className="text-sm text-slate-400">Quest tier</p></Card>
          <Card><Flame className="text-rose-200" aria-hidden /><p className="mt-3 text-3xl font-black">{streak} days</p><p className="text-sm text-slate-400">Learning streak</p></Card>
        </div>
        <div className="mt-5">
          <ScoreRings scores={scores} />
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_360px]">
          <QuestGrid />
          <Card>
            <h2 className="text-xl font-bold">Achievements</h2>
            <div className="mt-4 space-y-3">
              {achievements.map((achievement) => (
                <div key={achievement} className="rounded-lg border border-white/10 bg-white/7 p-3 text-sm font-semibold text-white">
                  {achievement}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </SectionShell>
    </>
  );
}
