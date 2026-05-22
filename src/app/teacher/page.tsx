import { BarChart3, BookOpenCheck, Plus, Users } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { Card, SectionShell } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { leaderboard, teacherMetrics } from "@/lib/demo-data";

export default function TeacherPage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader
          eyebrow="Teacher Dashboard"
          title="A classroom view built for action."
          description="Create classes, assign challenges, watch progress, and spot which learners need help before they fall behind."
          action={<Button><Plus size={16} aria-hidden /> Create classroom</Button>}
        />
        <div className="grid gap-4 md:grid-cols-4">
          {teacherMetrics.map((metric) => (
            <Card key={metric.label}>
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-2 text-3xl font-black">{metric.value}</p>
              <p className="mt-1 text-sm text-teal-200">{metric.change}</p>
            </Card>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_390px]">
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <BookOpenCheck className="text-teal-200" aria-hidden />
              <h2 className="text-xl font-bold">Assigned challenges</h2>
            </div>
            <div className="space-y-3">
              {["Survive College", "Scam Shield Drill", "Family Budget Challenge"].map((challenge, index) => (
                <div key={challenge} className="rounded-lg border border-white/10 bg-white/7 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="font-bold">{challenge}</p>
                      <p className="mt-1 text-sm text-slate-400">{index === 0 ? "Due Friday" : "Open practice"}</p>
                    </div>
                    <span className="rounded-lg bg-teal-300/12 px-3 py-2 text-sm text-teal-100">{84 - index * 11}% complete</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="mb-4 flex items-center gap-2">
              <Users className="text-yellow-200" aria-hidden />
              <h2 className="text-xl font-bold">Leaderboard</h2>
            </div>
            <div className="space-y-3">
              {leaderboard.map((student, index) => (
                <div key={student.name} className="flex items-center justify-between rounded-lg border border-white/10 bg-white/7 p-3">
                  <div>
                    <p className="font-bold">{index + 1}. {student.name}</p>
                    <p className="text-sm text-slate-400">{student.badge}</p>
                  </div>
                  <span className="font-bold text-teal-200">{student.xp}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Card className="mt-5">
          <div className="mb-3 flex items-center gap-2">
            <BarChart3 className="text-blue-200" aria-hidden />
            <h2 className="text-xl font-bold">Classroom insight</h2>
          </div>
          <p className="text-sm leading-7 text-slate-300">
            Three students repeatedly choose payday loans in emergency scenarios. Assign the Escape Debt mission and review APR using the AI Tutor prompt pack.
          </p>
        </Card>
      </SectionShell>
    </>
  );
}
