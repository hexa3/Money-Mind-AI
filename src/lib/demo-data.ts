import type { LearnerProfile, LifeScenario, Quest, ScoreSet, TeacherMetric } from "@/lib/types";

export const defaultProfile: LearnerProfile = {
  age: 17,
  goals: "Graduate college with low debt and build an emergency fund.",
  dreamCareer: "Product designer at a fintech startup",
  interests: "gaming, music, entrepreneurship",
  spendingStyle: "balanced",
};

export const startingScores: ScoreSet = {
  money: 64,
  happiness: 72,
  knowledge: 48,
  risk: 34,
};

export const quests: Quest[] = [
  {
    id: "survive-college",
    title: "Survive College",
    mission: "Make 4 choices that keep debt manageable while protecting grades and mental health.",
    level: 2,
    xp: 680,
    progress: 72,
    status: "active",
    reward: "Scholarship Strategist badge",
  },
  {
    id: "escape-debt",
    title: "Escape Debt",
    mission: "Prioritize high-interest balances and avoid traps that restart the debt cycle.",
    level: 3,
    xp: 920,
    progress: 38,
    status: "active",
    reward: "Interest Slayer badge",
  },
  {
    id: "startup-founder",
    title: "Startup Founder",
    mission: "Launch a side hustle without mixing personal cash, taxes, and business expenses.",
    level: 4,
    xp: 1250,
    progress: 15,
    status: "locked",
    reward: "Founder Finance kit",
  },
  {
    id: "millionaire-journey",
    title: "Millionaire Journey",
    mission: "Use compounding, career growth, and risk control to build long-term wealth.",
    level: 5,
    xp: 2100,
    progress: 0,
    status: "locked",
    reward: "Future Self unlock",
  },
];

export const scenarioBank: LifeScenario[] = [
  {
    id: "first-job",
    title: "First Real Paycheck",
    category: "career",
    situation:
      "You just landed your first job and earn $2,200/month after taxes. Rent with roommates is $780, transport is $210, food is $360, and subscriptions are quietly eating $95.",
    monthlyIncome: 2200,
    fixedCosts: 1445,
    choices: [
      {
        id: "auto-save",
        label: "Auto-save $250 before spending",
        shortImpact: "Builds emergency fund momentum.",
        delta: { money: 12, happiness: -2, knowledge: 8, risk: -8 },
      },
      {
        id: "upgrade-life",
        label: "Upgrade phone and add a gym membership",
        shortImpact: "Feels good now, tightens monthly cash flow.",
        delta: { money: -10, happiness: 8, knowledge: 1, risk: 9 },
      },
      {
        id: "track-week",
        label: "Track spending for one week first",
        shortImpact: "Reveals invisible leaks before committing.",
        delta: { money: 6, happiness: 1, knowledge: 11, risk: -4 },
      },
    ],
  },
  {
    id: "guaranteed-return",
    title: "The Guaranteed Crypto Offer",
    category: "scam",
    situation:
      "A classmate sends you an investment link promising 18% weekly returns. The page says withdrawals close tonight and includes screenshots of luxury cars.",
    monthlyIncome: 2200,
    fixedCosts: 1445,
    choices: [
      {
        id: "send-money",
        label: "Send $300 before the deadline",
        shortImpact: "High chance of losing the money.",
        delta: { money: -18, happiness: -12, knowledge: 5, risk: 25 },
      },
      {
        id: "research",
        label: "Check regulators and ask for proof",
        shortImpact: "Pressure tactics become obvious.",
        delta: { money: 5, happiness: 0, knowledge: 16, risk: -15 },
      },
      {
        id: "ignore",
        label: "Ignore and report the link",
        shortImpact: "Protects you and your friends.",
        delta: { money: 4, happiness: 2, knowledge: 10, risk: -13 },
      },
    ],
  },
  {
    id: "car-repair",
    title: "Emergency Car Repair",
    category: "emergency",
    situation:
      "Your car needs a $650 repair to get to work. You have $420 saved, a credit card at 24% APR, and a manager offering two weekend shifts.",
    monthlyIncome: 2200,
    fixedCosts: 1445,
    choices: [
      {
        id: "credit-only",
        label: "Put all $650 on the credit card",
        shortImpact: "Fast fix, expensive if unpaid.",
        delta: { money: -12, happiness: 1, knowledge: 4, risk: 14 },
      },
      {
        id: "split-shifts",
        label: "Use $300 savings and take weekend shifts",
        shortImpact: "Protects credit and rebuilds cash.",
        delta: { money: 9, happiness: -5, knowledge: 9, risk: -7 },
      },
      {
        id: "payday-loan",
        label: "Use a payday loan",
        shortImpact: "The fee cycle is dangerous.",
        delta: { money: -24, happiness: -9, knowledge: 8, risk: 28 },
      },
    ],
  },
];

export const achievements = [
  "Emergency Fund Spark",
  "Scam Shield",
  "Interest Slayer",
  "Budget Architect",
  "Future Self Ally",
];

export const teacherMetrics: TeacherMetric[] = [
  { label: "Class mastery", value: "78%", change: "+14% this week" },
  { label: "Scam detection avg", value: "86", change: "+22 points" },
  { label: "Active streaks", value: "19", change: "of 24 students" },
  { label: "At-risk learners", value: "3", change: "need debt review" },
];

export const leaderboard = [
  { name: "Maya", xp: 4120, badge: "Scam Shield" },
  { name: "Jordan", xp: 3890, badge: "Budget Architect" },
  { name: "Ari", xp: 3440, badge: "Interest Slayer" },
  { name: "Sam", xp: 3010, badge: "Emergency Fund Spark" },
];
