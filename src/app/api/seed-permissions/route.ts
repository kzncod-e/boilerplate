import {
    seedPermissions,
    assignDefaultPermissionsToRoles,
} from "@/modules/role-management/actions/permission.actions";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        // Seed permissions
        const seedResult = await seedPermissions();
        if (!seedResult.success) {
            return NextResponse.json(
                { error: seedResult.error },
                { status: 500 },
            );
        }

        // Assign to roles
        const assignResult = await assignDefaultPermissionsToRoles();
        if (!assignResult.success) {
            return NextResponse.json(
                { error: assignResult.error },
                { status: 500 },
            );
        }

        return NextResponse.json({
            message: "Permissions seeded and assigned successfully",
        });
    } catch (error) {
        console.error("Error seeding:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
