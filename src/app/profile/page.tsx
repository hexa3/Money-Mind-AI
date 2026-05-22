import { UserRound } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { Card, SectionShell } from "@/components/ui/card";

export default function ProfilePage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader eyebrow="Profile" title="Learner identity and goals." description="A portable student profile lets scenarios adapt to careers, interests, spending style, and classroom goals." />
        <Card className="max-w-2xl">
          <UserRound className="text-teal-200" size={32} aria-hidden />
          <h2 className="mt-4 text-2xl font-bold">Demo Learner</h2>
          <p className="mt-2 text-slate-300">17 • future fintech product designer • balanced spender</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {["Build emergency fund", "Avoid student debt traps", "Learn investing basics", "Detect scams"].map((goal) => (
              <div key={goal} className="rounded-lg border border-white/10 bg-white/7 p-3 text-sm text-white">{goal}</div>
            ))}
          </div>
        </Card>
      </SectionShell>
    </>
  );
}
