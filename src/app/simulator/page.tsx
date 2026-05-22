import { AppNav } from "@/components/layout/app-nav";
import { PageHeader } from "@/components/layout/page-header";
import { SimulatorClient } from "@/components/features/simulator-client";
import { SectionShell } from "@/components/ui/card";

export default function SimulatorPage() {
  return (
    <>
      <AppNav />
      <SectionShell>
        <PageHeader
          eyebrow="AI Life Simulator"
          title="Make the choice before life makes it expensive."
          description="Personalize a learner, face realistic financial scenarios, and watch every decision change money, happiness, knowledge, and risk."
        />
        <SimulatorClient />
      </SectionShell>
    </>
  );
}
