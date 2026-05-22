import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { TutorClient } from "@/components/features/tutor-client";
import { SectionShell } from "@/components/ui/card";

export default function TutorPage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader eyebrow="AI Tutor" title="Finance explanations that adapt to the student." description="Ask follow-up questions, get practical examples, and turn confusing terms into decisions students can actually make." />
        <TutorClient />
      </SectionShell>
    </>
  );
}
