import { UnderMaintenance } from "@/components/global/system/under-maintenance";

export default function UnderMaintenancePage() {
  return (
    <UnderMaintenance 
      title="System Maintenance"
      description="We're performing essential maintenance to improve our service quality and performance."
      estimatedTime="1-2 hours"
      progress={75}
    />
  );
}