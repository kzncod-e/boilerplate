import PageHeader from "@/components/global/page-header";
import AuditLogsTab from "@/modules/role-management/components/audit-logs-tab";

export default function LogActivityPage() {
  return (
    <>
      <PageHeader
        title="Log Activity (Audit Log)"
        description="Track all important system actions for auditing and security"
      />

      <div className="mt-6">
        <AuditLogsTab />
      </div>
    </>
  );
}
