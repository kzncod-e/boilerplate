import GlobalCard from "@/components/global/cards/global-card";
import PageHeader from "@/components/global/page-header";
import { ComingSoon } from "@/components/global/system/coming-soon";

export default function StarterBlankPage() {
  return (
    <>
       <PageHeader
        title="Starter Page"
        description="Starter page for your feature from scratch"
      />

      <GlobalCard title="Starter Blank Page Card Title" className="min-h-full">
        Your content here...
      </GlobalCard>
    </>
  );
}