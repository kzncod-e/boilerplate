"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getPermissions,
  getRolePermissions,
  updateRolePermissions,
  type Permission,
  type RolePermission,
} from "../actions/permission.actions";
import { getRoles, type Role } from "../actions/role.actions";
import toast from "react-hot-toast";
import GlobalCard from "@/components/global/cards/global-card";

interface PermissionMatrix {
  [roleId: string]: {
    [permissionId: string]: boolean;
  };
}

export default function PermissionsTab() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermission[]>([]);
  const [permissionMatrix, setPermissionMatrix] = useState<PermissionMatrix>(
    {},
  );
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Group permissions by module
  const permissionsByModule = permissions.reduce(
    (acc, perm) => {
      if (!acc[perm.module]) {
        acc[perm.module] = [];
      }
      acc[perm.module].push(perm);
      return acc;
    },
    {} as Record<string, Permission[]>,
  );

  // Get unique modules
  const modules = Object.keys(permissionsByModule);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);

      // Fetch permissions
      const permResult = await getPermissions();
      if (permResult.success && permResult.data) {
        setPermissions(permResult.data);
      } else {
        toast.error("Failed to load permissions");
        console.error("Error loading permissions:", permResult.error);
      }

      // Fetch roles
      const roleResult = await getRoles();
      if (roleResult.success && roleResult.data) {
        setRoles(roleResult.data);
      } else {
        toast.error("Failed to load roles");
        console.error("Error loading roles:", roleResult.message);
      }

      // Fetch role permissions
      const rpResult = await getRolePermissions();
      if (rpResult.success && rpResult.data) {
        setRolePermissions(rpResult.data);
      } else {
        toast.error("Failed to load role permissions");
        console.error("Error loading role permissions:", rpResult.error);
      }

      setIsLoading(false);
    };

    loadData();
  }, []);

  useEffect(() => {
    if (
      permissions.length > 0 &&
      roles.length > 0 &&
      rolePermissions.length >= 0
    ) {
      // Build permission matrix
      const matrix: PermissionMatrix = {};
      roles.forEach((role) => {
        matrix[role.id] = {};
        permissions.forEach((perm) => {
          const hasPermission = rolePermissions.some(
            (rp) => rp.roleId === role.id && rp.permissionId === perm.id,
          );
          matrix[role.id][perm.id] = hasPermission;
        });
      });

      setPermissionMatrix(matrix);
    }
  }, [permissions, roles, rolePermissions]);

  const handlePermissionChange = (
    roleId: string,
    permissionId: string,
    checked: boolean,
  ) => {
    setPermissionMatrix((prev) => ({
      ...prev,
      [roleId]: {
        ...prev[roleId],
        [permissionId]: checked,
      },
    }));
    setHasUnsavedChanges(true);
  };

  const handleSelectAllRow = (module: string, checked: boolean) => {
    const modulePermissions = permissionsByModule[module] || [];

    setPermissionMatrix((prev) => {
      const newMatrix = { ...prev };
      roles.forEach((role) => {
        modulePermissions.forEach((perm) => {
          newMatrix[role.id] = {
            ...newMatrix[role.id],
            [perm.id]: checked,
          };
        });
      });
      return newMatrix;
    });
    setHasUnsavedChanges(true);
  };

  const handleSelectAllColumn = (roleId: string, checked: boolean) => {
    setPermissionMatrix((prev) => ({
      ...prev,
      [roleId]: Object.keys(prev[roleId]).reduce(
        (acc, permId) => {
          acc[permId] = checked;
          return acc;
        },
        {} as Record<string, boolean>,
      ),
    }));
    setHasUnsavedChanges(true);
  };

  const handleSave = async () => {
    try {
      // Update permissions for each role
      for (const role of roles) {
        const rolePermIds = permissions
          .filter((perm) => permissionMatrix[role.id]?.[perm.id])
          .map((perm) => perm.id);

        const result = await updateRolePermissions(
          role.id,
          role.name,
          rolePermIds,
        );
        if (!result.success) {
          toast.error(`Failed to update permissions for ${role.name}`);
          console.error("Error updating permissions:", result.error);
          return;
        }
      }

      setHasUnsavedChanges(false);
      toast.success("Permissions saved successfully");

      // Refresh role permissions
      const rpResult = await getRolePermissions();
      if (rpResult.success && rpResult.data) {
        setRolePermissions(rpResult.data);
      }
    } catch (error) {
      toast.error("Failed to save permissions");
      console.error("Error saving permissions:", error);
    }
  };

  const isRowFullySelected = (module: string, roleId: string) => {
    const modulePermissions = permissionsByModule[module] || [];
    return modulePermissions.every(
      (perm) => permissionMatrix[roleId]?.[perm.id],
    );
  };

  const isColumnFullySelected = (roleId: string) => {
    return Object.values(permissionMatrix[roleId] || {}).every(Boolean);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="h-96 w-full bg-muted animate-pulse rounded" />
      </div>
    );
  }

  return (
    <GlobalCard
      title="Permissions"
      description="            Manage permissions for each role"
    >
      <div className="flex justify-end items-center">
        <div className="flex gap-2">
          {hasUnsavedChanges && (
            <span className="text-sm text-orange-600 flex items-center">
              You have unsaved changes
            </span>
          )}
          <Button onClick={handleSave} disabled={!hasUnsavedChanges}>
            Save Changes
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Permission Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 font-medium">Module</th>
                  <th className="text-left p-2 font-medium">Action</th>
                  {roles.map((role) => (
                    <th
                      key={role.id}
                      className="text-center p-2 font-medium min-w-[100px]"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span>{role.name}</span>
                        <Checkbox
                          checked={isColumnFullySelected(role.id)}
                          onCheckedChange={(checked) =>
                            handleSelectAllColumn(role.id, checked as boolean)
                          }
                        />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {modules.map((module) => {
                  const modulePermissions = permissionsByModule[module];
                  return modulePermissions.map((permission, index) => (
                    <tr key={permission.id} className="border-b">
                      {index === 0 && (
                        <td
                          rowSpan={modulePermissions.length}
                          className="p-2 font-medium align-top"
                        >
                          {module}
                        </td>
                      )}
                      <td className="p-2">{permission.action}</td>
                      {roles.map((role) => (
                        <td key={role.id} className="p-2 text-center">
                          <Checkbox
                            checked={
                              permissionMatrix[role.id]?.[permission.id] ||
                              false
                            }
                            onCheckedChange={(checked) =>
                              handlePermissionChange(
                                role.id,
                                permission.id,
                                checked as boolean,
                              )
                            }
                          />
                        </td>
                      ))}
                    </tr>
                  ));
                })}
                {/* Select All Row */}
                <tr className="border-b bg-muted/50">
                  <td colSpan={2} className="p-2 font-medium">
                    Select All
                  </td>
                  {roles.map((role) => (
                    <td key={role.id} className="p-2 text-center">
                      <Checkbox
                        checked={modules.every((module) =>
                          isRowFullySelected(module, role.id),
                        )}
                        onCheckedChange={(checked) => {
                          modules.forEach((module) =>
                            handleSelectAllRow(module, checked as boolean),
                          );
                        }}
                      />
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </GlobalCard>
  );
}
