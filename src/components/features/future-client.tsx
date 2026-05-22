"use client";

import { useEffect, useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { projectTimeline } from "@/lib/financial-engine";
import { formatCurrency } from "@/lib/utils";

export function FutureClient() {
  const [age, setAge] = useState(17);
  const [salary, setSalary] = useState(48000);
  const [savings, setSavings] = useState(300);
  const [goal, setGoal] = useState("debt-free college");
  const [mounted, setMounted] = useState(false);
  const data = useMemo(() => projectTimeline(age, salary, savings, goal), [age, salary, savings, goal]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid gap-5 lg:grid-cols-[360px_1fr]">
      <Card>
        <h2 className="text-xl font-bold">Future inputs</h2>
        <div className="mt-4 space-y-3">
          <label className="block text-sm text-slate-300">Age<Input type="number" value={age} onChange={(event) => setAge(Number(event.target.value))} className="mt-1" /></label>
          <label className="block text-sm text-slate-300">Annual salary<Input type="number" value={salary} onChange={(event) => setSalary(Number(event.target.value))} className="mt-1" /></label>
          <label className="block text-sm text-slate-300">Monthly savings<Input type="number" value={savings} onChange={(event) => setSavings(Number(event.target.value))} className="mt-1" /></label>
          <label className="block text-sm text-slate-300">Goal<Input value={goal} onChange={(event) => setGoal(event.target.value)} className="mt-1" /></label>
        </div>
      </Card>
      <Card>
        <h2 className="text-xl font-bold">Projected timeline</h2>
        <div className="mt-5 h-80">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ left: 8, right: 8, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="savings" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.09)" vertical={false} />
                <XAxis dataKey="age" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" tickFormatter={(value) => `$${Number(value) / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value))} contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="savings" stroke="#2dd4bf" fill="url(#savings)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-lg border border-white/10 bg-white/7" />
          )}
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {data.slice(1, 4).map((point) => (
            <div key={point.age} className="rounded-lg border border-white/10 bg-white/7 p-4">
              <p className="text-sm text-slate-400">Age {point.age}</p>
              <p className="mt-1 text-xl font-bold text-white">{formatCurrency(point.savings)}</p>
              <p className="mt-2 text-sm text-slate-300">{point.milestone}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
