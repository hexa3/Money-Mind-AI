import Link from "next/link";
import { LogIn } from "lucide-react";
import { AppNav } from "@/components/layout/app-nav";
import { Card, SectionShell } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <>
      <AppNav />
      <SectionShell className="grid min-h-[70vh] place-items-center">
        <Card className="w-full max-w-md">
          <h1 className="text-3xl font-black">Demo login</h1>
          <p className="mt-2 text-sm leading-6 text-slate-300">Use the seed accounts from the README. Authentication is wired with Auth.js credentials for hackathon demos.</p>
          <form className="mt-6 space-y-3">
            <Input type="email" defaultValue="student@moneymind.ai" aria-label="Email" />
            <Input type="password" defaultValue="westhacks" aria-label="Password" />
            <Button className="w-full" type="button">
              <LogIn size={16} aria-hidden />
              Continue as demo user
            </Button>
          </form>
          <Link href="/dashboard" className="mt-4 block text-center text-sm font-semibold text-teal-200">
            Skip to prototype dashboard
          </Link>
        </Card>
      </SectionShell>
    </>
  );
}
