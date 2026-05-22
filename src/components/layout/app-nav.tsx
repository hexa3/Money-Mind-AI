"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, GraduationCap, Home, Rocket, ShieldAlert, User, Wand2 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/simulator", label: "Simulator", icon: Rocket },
  { href: "/tutor", label: "AI Tutor", icon: Bot },
  { href: "/scam-detector", label: "Scams", icon: ShieldAlert },
  { href: "/future", label: "Future", icon: Wand2 },
  { href: "/teacher", label: "Teacher", icon: GraduationCap },
  { href: "/profile", label: "Profile", icon: User },
];

export function AppNav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="MoneyMind AI home">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal-300 text-slate-950">
            <BarChart3 size={21} aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold">MoneyMind AI</p>
            <p className="text-xs text-slate-400">Financial intelligence lab</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {navItems.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white",
                  active && "bg-white/12 text-white",
                )}
              >
                <Icon size={16} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Link
          href="/login"
          className="rounded-lg border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/14"
        >
          Demo login
        </Link>
      </div>
      <nav className="flex gap-1 overflow-x-auto px-4 pb-3 lg:hidden" aria-label="Mobile navigation">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300",
                active && "bg-white/12 text-white",
              )}
            >
              <Icon size={15} aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
