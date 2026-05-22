import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { FutureClient } from "@/components/features/future-client";
import { SectionShell } from "@/components/ui/card";

export default function FuturePage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader eyebrow="Future Self Visualizer" title="Show students the future value of one habit." description="Change savings, salary, and goals to see milestones become visible on a timeline students can understand in seconds." />
        <FutureClient />
      </SectionShell>
    </>
  );
}
