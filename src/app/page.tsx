import Link from "next/link";
import { ArrowRight, BrainCircuit, GraduationCap, ShieldAlert, Sparkles, Trophy } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { SectionShell } from "@/components/ui/card";

const features = [
  { title: "AI Life Simulator", text: "Students learn by choosing through jobs, debt, scams, investing, college, and emergencies.", icon: BrainCircuit },
  { title: "Financial Quests", text: "XP, streaks, badges, missions, and unlockable challenges make literacy feel alive.", icon: Trophy },
  { title: "Teacher Dashboard", text: "Classroom analytics show mastery, at-risk learners, and challenge performance.", icon: GraduationCap },
  { title: "Scam Defense", text: "Paste suspicious offers and get a risk score, red flags, and a safer next move.", icon: ShieldAlert },
];

export default function Home() {
  return (
    <>
      <AppNav />
      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:px-8">
            <div>
              <p className="mb-4 inline-flex rounded-lg border border-teal-200/24 bg-teal-200/10 px-3 py-2 text-sm font-semibold text-teal-100">
                West Hacks • Fintech + Education
              </p>
              <h1 className="max-w-4xl text-5xl font-black tracking-tight text-white sm:text-7xl">
                MoneyMind AI
              </h1>
              <p className="mt-5 max-w-2xl text-2xl font-semibold text-teal-100">
                Duolingo for Real-Life Financial Intelligence
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A gamified AI platform where students practice real financial decisions before those decisions cost real money.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/simulator" className="inline-flex h-12 items-center gap-2 rounded-lg bg-teal-300 px-5 font-bold text-slate-950 transition hover:bg-teal-200">
                  Try simulator <ArrowRight size={18} aria-hidden />
                </Link>
                <Link href="/dashboard" className="inline-flex h-12 items-center rounded-lg border border-white/12 bg-white/9 px-5 font-bold text-white transition hover:bg-white/14">
                  View dashboard
                </Link>
              </div>
            </div>
            <div className="aurora-border rounded-lg">
              <div className="glass rounded-lg p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-400">Live scenario</p>
                    <h2 className="text-2xl font-bold">Guaranteed Crypto Offer</h2>
                  </div>
                  <Sparkles className="text-teal-200" aria-hidden />
                </div>
                <p className="text-lg leading-8 text-slate-200">
                  “A friend promises 18% weekly returns if you send $300 before midnight.”
                </p>
                <div className="mt-6 grid gap-3">
                  {["Send money", "Research the offer", "Report the link"].map((choice, index) => (
                    <div key={choice} className="rounded-lg border border-white/10 bg-white/7 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{choice}</span>
                        <span className={index === 1 ? "text-teal-200" : "text-rose-200"}>{index === 1 ? "+16 knowledge" : "+risk"}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-lg bg-teal-300/12 p-4 text-sm leading-6 text-teal-50">
                  AI explains the consequence, risk, and future impact after each choice.
                </div>
              </div>
            </div>
          </div>
        </section>
        <SectionShell className="pt-0">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass rounded-lg p-5">
                  <Icon className="text-teal-200" size={24} aria-hidden />
                  <h3 className="mt-4 text-lg font-bold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{feature.text}</p>
                </div>
              );
            })}
          </div>
        </SectionShell>
      </main>
    </>
  );
}
