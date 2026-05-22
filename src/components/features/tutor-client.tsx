"use client";

import { useState, useTransition } from "react";
import { Bot, Send } from "lucide-react";
import { tutorAction } from "@/lib/actions/ai";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/input";

type TutorResponse = Awaited<ReturnType<typeof tutorAction>>;

export function TutorClient() {
  const [response, setResponse] = useState<TutorResponse | null>(null);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_390px]">
      <Card className="min-h-[520px]">
        <div className="mb-6 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal-300 text-slate-950">
            <Bot size={22} aria-hidden />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Ask anything financial</h2>
            <p className="text-sm text-slate-400">Personal examples, simpler explanations, follow-up friendly.</p>
          </div>
        </div>
        <form
          action={(formData) => {
            startTransition(async () => {
              setResponse(await tutorAction(formData));
            });
          }}
          className="space-y-4"
        >
          <Textarea name="question" required placeholder="Example: Should I build credit with a student card, or is that risky?" />
          <input type="hidden" name="learnerContext" value="High-school learner using MoneyMind AI" />
          <Button disabled={isPending}>
            <Send size={16} aria-hidden />
            {isPending ? "Thinking..." : "Ask tutor"}
          </Button>
        </form>
        <div className="mt-6 rounded-lg border border-white/10 bg-white/7 p-5">
          {response ? (
            <div className="space-y-4 text-sm leading-7 text-slate-200">
              <p>{response.answer}</p>
              {response.example && <p className="text-slate-300">{response.example}</p>}
              {response.nextStep && <p className="font-semibold text-teal-200">{response.nextStep}</p>}
            </div>
          ) : (
            <p className="text-sm leading-7 text-slate-400">
              The tutor is tuned to explain finance like a coach: clear, practical, and connected to choices students actually face.
            </p>
          )}
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold">Fast prompts</h3>
        <div className="mt-4 space-y-3 text-sm text-slate-300">
          {[
            "Explain APR like I am 15.",
            "How does compound interest help investing?",
            "What is a credit score actually measuring?",
            "Why are payday loans dangerous?",
          ].map((prompt) => (
            <div key={prompt} className="rounded-lg border border-white/10 bg-white/7 p-3">
              {prompt}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
