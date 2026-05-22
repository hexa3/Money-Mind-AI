import { Lock, Medal, Sparkles } from "lucide-react";
import { quests } from "@/lib/demo-data";
import { Card } from "@/components/ui/card";

export function QuestGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {quests.map((quest) => (
        <Card key={quest.id} className="relative overflow-hidden">
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-slate-400">Level {quest.level}</p>
              <h3 className="mt-1 text-xl font-bold text-white">{quest.title}</h3>
            </div>
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10">
              {quest.status === "locked" ? <Lock size={18} /> : <Medal size={18} />}
            </div>
          </div>
          <p className="min-h-12 text-sm leading-6 text-slate-300">{quest.mission}</p>
          <div className="mt-5 h-2 rounded-full bg-white/10">
            <div className="h-2 rounded-full bg-teal-300" style={{ width: `${quest.progress}%` }} />
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="font-semibold text-teal-200">{quest.xp} XP</span>
            <span className="flex items-center gap-1 text-slate-300">
              <Sparkles size={15} aria-hidden />
              {quest.reward}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
}
