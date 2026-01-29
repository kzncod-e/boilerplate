"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/global/page-header";
import RolesTab from "../components/roles-tab";
import PermissionsTab from "../components/permissions-tab";
import AuditLogsTab from "../components/audit-logs-tab";

export default function RoleManagementPage() {
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <>
      <PageHeader
        title="Role & Permission Management"
        description="Manage roles, permissions, and user assignments"
      />

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full justify-center grid-cols-3 ">
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            {/* <TabsTrigger value="users">Users</TabsTrigger> */}
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="mt-6">
            <RolesTab />
          </TabsContent>

          <TabsContent value="permissions" className="mt-6">
            <PermissionsTab />
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <AuditLogsTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
