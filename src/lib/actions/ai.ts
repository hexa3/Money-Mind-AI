"use server";

import OpenAI from "openai";
import { z } from "zod";
import { calculateOutcome, projectTimeline, selectScenario } from "@/lib/financial-engine";
import { defaultProfile, startingScores } from "@/lib/demo-data";
import type { LearnerProfile, ScamResult, ScoreSet } from "@/lib/types";

const profileSchema = z.object({
  age: z.coerce.number().min(13).max(80),
  goals: z.string().min(3).max(220),
  dreamCareer: z.string().min(2).max(120),
  interests: z.string().min(2).max(160),
  spendingStyle: z.enum(["saver", "balanced", "spender", "risk-taker"]),
});

const scamSchema = z.object({
  text: z.string().min(10).max(4000),
});

const tutorSchema = z.object({
  question: z.string().min(3).max(800),
  learnerContext: z.string().max(300).optional(),
});

function openai() {
  if (!process.env.OPENAI_API_KEY) {
    return null;
  }

  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

export async function generateScenarioAction(input: LearnerProfile, turn = 0) {
  const profile = profileSchema.parse(input);
  const fallback = selectScenario(profile, turn);
  const client = openai();

  if (!client) {
    return fallback;
  }

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "Create one realistic financial literacy life-simulation scenario for a teenager. Return compact JSON only with id,title,category,situation,monthlyIncome,fixedCosts,choices where choices have id,label,shortImpact,delta money/happiness/knowledge/risk.",
        },
        { role: "user", content: JSON.stringify(profile) },
      ],
    });
    const text = response.output_text;
    return JSON.parse(text);
  } catch {
    return fallback;
  }
}

export async function resolveChoiceAction(choiceId: string, scores: ScoreSet = startingScores) {
  const scenario = selectScenario(defaultProfile, 0);
  const choice = scenario.choices.find((item) => item.id === choiceId) ?? scenario.choices[0];
  return calculateOutcome(scores, choice);
}

export async function tutorAction(formData: FormData) {
  const { question, learnerContext } = tutorSchema.parse({
    question: formData.get("question"),
    learnerContext: formData.get("learnerContext") || "",
  });
  const client = openai();

  if (!client) {
    return {
      answer:
        "Think of finance as choices under constraints. A strong money decision usually protects cash flow, avoids high-interest traps, and keeps future options open.",
      example: `For your question about "${question.slice(0, 80)}", compare the monthly cost, the downside risk, and what you give up by choosing it.`,
      nextStep: "Try explaining the concept in one sentence, then test it in the simulator.",
    };
  }

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      input: `You are MoneyMind AI, a friendly financial literacy tutor for students. Context: ${learnerContext}. Question: ${question}. Answer with three short sections: answer, example, nextStep.`,
    });
    return { answer: response.output_text, example: "", nextStep: "" };
  } catch {
    return {
      answer: "I could not reach the AI provider, so here is the core idea: slow down the decision and compare cost, risk, and future flexibility.",
      example: "If a loan seems small, calculate the total repayment, not just the monthly payment.",
      nextStep: "Run a simulation choice and watch how the risk score changes.",
    };
  }
}

export async function scamDetectorAction(formData: FormData): Promise<ScamResult> {
  const { text } = scamSchema.parse({ text: formData.get("text") });
  const lower = text.toLowerCase();
  const flags = [
    "guaranteed",
    "urgent",
    "limited time",
    "wire",
    "gift card",
    "crypto",
    "password",
    "verify your account",
    "act now",
    "risk-free",
  ].filter((flag) => lower.includes(flag));
  const scamScore = Math.min(98, 22 + flags.length * 13 + (/\b\d+%\b/.test(text) ? 18 : 0));

  return {
    scamScore,
    verdict: scamScore >= 70 ? "High risk: treat this as a likely scam." : scamScore >= 45 ? "Suspicious: verify through official channels." : "Lower risk, but still verify before sending money or data.",
    suspiciousPhrases: flags.length ? flags : ["Unclear sender identity", "Unverified claims"],
    breakdown: [
      "Pressure and urgency reduce careful thinking.",
      "Promises of guaranteed profit are a classic financial red flag.",
      "Requests for irreversible payment methods remove your ability to dispute.",
    ].slice(0, Math.max(2, Math.min(3, flags.length + 1))),
    safetyMove: "Do not click links. Contact the company through its official website or phone number.",
  };
}

export async function futureTimelineAction(formData: FormData) {
  const age = z.coerce.number().min(13).max(80).parse(formData.get("age"));
  const salary = z.coerce.number().min(0).max(1000000).parse(formData.get("salary"));
  const savings = z.coerce.number().min(0).max(100000).parse(formData.get("savings"));
  const goal = z.string().max(120).parse(formData.get("goal") || "financial independence");
  return projectTimeline(age, salary, savings, goal);
}
