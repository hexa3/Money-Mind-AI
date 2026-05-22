export type SpendingStyle = "saver" | "balanced" | "spender" | "risk-taker";

export type LearnerProfile = {
  age: number;
  goals: string;
  dreamCareer: string;
  interests: string;
  spendingStyle: SpendingStyle;
};

export type ScoreSet = {
  money: number;
  happiness: number;
  knowledge: number;
  risk: number;
};

export type ScenarioChoice = {
  id: string;
  label: string;
  shortImpact: string;
  delta: ScoreSet;
};

export type LifeScenario = {
  id: string;
  title: string;
  situation: string;
  category: "career" | "debt" | "scam" | "investing" | "school" | "business" | "emergency";
  monthlyIncome: number;
  fixedCosts: number;
  choices: ScenarioChoice[];
};

export type ScenarioOutcome = {
  consequence: string;
  explanation: string;
  riskAnalysis: string;
  futureImpact: string;
  updatedScores: ScoreSet;
  xp: number;
  achievement?: string;
};

export type Quest = {
  id: string;
  title: string;
  mission: string;
  level: number;
  xp: number;
  progress: number;
  status: "active" | "locked" | "complete";
  reward: string;
};

export type ScamResult = {
  scamScore: number;
  verdict: string;
  suspiciousPhrases: string[];
  breakdown: string[];
  safetyMove: string;
};

export type TimelinePoint = {
  age: number;
  savings: number;
  milestone: string;
};

export type TeacherMetric = {
  label: string;
  value: string;
  change: string;
};
