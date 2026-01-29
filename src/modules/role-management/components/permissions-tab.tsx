"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  mockPermissions,
  mockRolePermissions,
  type Permission,
  type RolePermission,
} from "../mock/role-data";
import toast from "react-hot-toast";

interface PermissionMatrix {
  [roleId: string]: {
    [permissionId: string]: boolean;
  };
}

export default function PermissionsTab() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
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

  // Mock roles for the matrix
  const roles = [
    { id: "role-1", name: "Super Admin" },
    { id: "role-2", name: "Admin" },
    { id: "role-3", name: "Editor" },
    { id: "role-4", name: "Viewer" },
  ];

  useEffect(() => {
    // Simulate API call
    const loadPermissions = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));

      setPermissions(mockPermissions);
      setRolePermissions(mockRolePermissions);

      // Build permission matrix
      const matrix: PermissionMatrix = {};
      roles.forEach((role) => {
        matrix[role.id] = {};
        mockPermissions.forEach((perm) => {
          const hasPermission = mockRolePermissions.some(
            (rp) => rp.roleId === role.id && rp.permissionId === perm.id,
          );
          matrix[role.id][perm.id] = hasPermission;
        });
      });

      setPermissionMatrix(matrix);
      setIsLoading(false);
    };

    loadPermissions();
  }, []);

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
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, this would save to API
    console.log("Saving permissions:", permissionMatrix);

    setHasUnsavedChanges(false);
    toast.success("Permissions saved successfully");
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
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Permissions</h3>
          <p className="text-sm text-muted-foreground">
            Manage permissions for each role
          </p>
        </div>
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
    </div>
  );
}
