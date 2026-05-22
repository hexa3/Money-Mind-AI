import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { Card, SectionShell } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader eyebrow="Settings" title="Prototype configuration." description="Environment, classroom, privacy, and AI-provider readiness for a production deployment." />
        <div className="grid gap-4 md:grid-cols-2">
          {[
            ["AI mode", "OpenAI API when configured, deterministic education engine as a fallback."],
            ["Data", "Supabase schema included for classrooms, progress, quests, and scenarios."],
            ["Privacy", "Student inputs should be minimized, validated, and protected by row-level security."],
            ["Accessibility", "Keyboard navigation, visible focus states, responsive layouts, and semantic sections."],
          ].map(([title, text]) => (
            <Card key={title}>
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{text}</p>
            </Card>
          ))}
        </div>
      </SectionShell>
    </>
  );
}
