import { clamp } from "@/lib/utils";
import { scenarioBank } from "@/lib/demo-data";
import type { LearnerProfile, LifeScenario, ScenarioChoice, ScenarioOutcome, ScoreSet, TimelinePoint } from "@/lib/types";

export function selectScenario(profile: LearnerProfile, turn: number): LifeScenario {
  const interestBoost = profile.interests.toLowerCase().includes("business") ? 1 : 0;
  return scenarioBank[(turn + interestBoost) % scenarioBank.length];
}

export function calculateOutcome(scores: ScoreSet, choice: ScenarioChoice): ScenarioOutcome {
  const updatedScores = {
    money: clamp(scores.money + choice.delta.money),
    happiness: clamp(scores.happiness + choice.delta.happiness),
    knowledge: clamp(scores.knowledge + choice.delta.knowledge),
    risk: clamp(scores.risk + choice.delta.risk),
  };

  const goodRiskMove = choice.delta.risk < 0;
  const xp = Math.max(70, 100 + choice.delta.knowledge * 5 + (goodRiskMove ? 40 : 0));

  return {
    consequence:
      choice.delta.money >= 0
        ? "Your cash position improves and you gain more control over the next month."
        : "Your short-term flexibility shrinks, so the next surprise will feel more expensive.",
    explanation:
      "MoneyMind scores the decision across cash flow, emotional tradeoffs, learning value, and exposure to avoidable downside.",
    riskAnalysis: goodRiskMove
      ? "You reduced risk by slowing down, checking incentives, or avoiding high-interest debt."
      : "The decision increases risk because it relies on optimism, urgency, or expensive credit.",
    futureImpact:
      updatedScores.money > 75
        ? "Future you has more options: lower stress, better credit, and room to invest."
        : "Future you may need a recovery plan before taking on new goals.",
    updatedScores,
    xp,
    achievement: goodRiskMove && choice.delta.knowledge >= 10 ? "Scam Shield" : undefined,
  };
}

export function projectTimeline(age: number, salary: number, monthlySavings: number, goal: string): TimelinePoint[] {
  const annualGrowth = 1.06;
  let savings = monthlySavings * 6;

  return Array.from({ length: 7 }, (_, index) => {
    const projectedAge = age + index * 3;
    if (index > 0) {
      savings = savings * Math.pow(annualGrowth, 3) + monthlySavings * 36;
    }

    const milestone =
      savings > salary * 2
        ? `${goal || "Major goal"} becomes realistic`
        : savings > salary * 0.5
          ? "Emergency fund and investing base"
          : "Build the safety runway";

    return {
      age: projectedAge,
      savings: Math.round(savings),
      milestone,
    };
  });
}
