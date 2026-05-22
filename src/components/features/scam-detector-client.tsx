"use client";

import { useState, useTransition } from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";
import { scamDetectorAction } from "@/lib/actions/ai";
import type { ScamResult } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

export function ScamDetectorClient() {
  const [result, setResult] = useState<ScamResult | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_430px]">
      <Card>
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="text-rose-200" size={23} aria-hidden />
          <h2 className="text-xl font-bold">Paste a message, email, or offer</h2>
        </div>
        <form
          action={(formData) => {
            startTransition(async () => setResult(await scamDetectorAction(formData)));
          }}
          className="space-y-4"
        >
          <Textarea
            name="text"
            required
            defaultValue="Guaranteed 25% weekly crypto returns. Limited time only. Send funds today to unlock your account bonus."
            className="min-h-56"
          />
          <Button disabled={isPending}>
            <ShieldCheck size={16} aria-hidden />
            {isPending ? "Scanning..." : "Scan for scam signals"}
          </Button>
        </form>
      </Card>
      <Card className="aurora-border">
        {result ? (
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-slate-400">Scam score</p>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-6xl font-black text-white">{result.scamScore}</span>
              <span className="pb-2 text-slate-400">/ 100</span>
            </div>
            <p className="mt-4 rounded-lg bg-rose-400/12 p-3 text-sm font-semibold text-rose-100">{result.verdict}</p>
            <h3 className="mt-5 font-bold">Suspicious language</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {result.suspiciousPhrases.map((phrase) => (
                <span key={phrase} className="rounded-lg bg-white/10 px-3 py-2 text-sm text-white">
                  {phrase}
                </span>
              ))}
            </div>
            <h3 className="mt-5 font-bold">Educational breakdown</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-slate-300">
              {result.breakdown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-5 rounded-lg bg-teal-300/12 p-3 text-sm text-teal-100">{result.safetyMove}</p>
          </div>
        ) : (
          <p className="text-sm leading-7 text-slate-300">Results appear here with a judge-friendly score, red flags, and a teachable safety action.</p>
        )}
      </Card>
    </div>
  );
}
