import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { ScamDetectorClient } from "@/components/features/scam-detector-client";
import { SectionShell } from "@/components/ui/card";

export default function ScamDetectorPage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader eyebrow="Scam Detector" title="Turn suspicious messages into teachable moments." description="Students paste real-looking offers and learn why pressure, guaranteed returns, and irreversible payments are dangerous." />
        <ScamDetectorClient />
      </SectionShell>
    </>
  );
}
