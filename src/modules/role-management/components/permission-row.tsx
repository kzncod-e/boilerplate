"use client";

import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import type { Permission } from "../actions/permission.actions";
import type { Role } from "../actions/role.actions";

interface PermissionRowProps {
    permission: Permission;
    roles: Role[];
    index: number;
    modulePermissionsLength: number;
    onChange: (roleId: string, permissionId: string, checked: boolean) => void;
    getChecked: (roleId: string, permissionId: string) => boolean;
}

function PermissionRowInner({
    permission,
    roles,
    index,
    modulePermissionsLength,
    onChange,
    getChecked,
}: PermissionRowProps) {
    return (
        <tr key={permission.id} className="border-b">
            {index === 0 && (
                <td
                    rowSpan={modulePermissionsLength}
                    className="p-2 font-medium align-top"
                >
                    {permission.module}
                </td>
            )}
            <td className="p-2">{permission.action || permission.name}</td>
            {roles.map((role) => (
                <td key={role.id} className="p-2 text-center">
                    <Checkbox
                        checked={getChecked(role.id, permission.id)}
                        onCheckedChange={(checked) =>
                            onChange(role.id, permission.id, checked as boolean)
                        }
                    />
                </td>
            ))}
        </tr>
    );
}

function areEqual(prev: PermissionRowProps, next: PermissionRowProps) {
    // Only re-render when the checked state for any role changed for this permission
    for (const r of prev.roles) {
        if (
            prev.getChecked(r.id, prev.permission.id) !==
            next.getChecked(r.id, next.permission.id)
        )
            return false;
    }
    return true;
}

export default React.memo(PermissionRowInner, areEqual);
