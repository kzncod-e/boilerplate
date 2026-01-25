"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/modules/auth/actions/auth.action";
import authRoutes from "../routes/auth.route";
import { clearStoredFcmToken } from "@/modules/novu/components/push-initializer";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/novu/credentials", { method: "DELETE" }).catch(
                () => null,
            );
            const result = await signOut();
            if (result.success) {
                clearStoredFcmToken();
                router.push(authRoutes.login);
                router.refresh(); // Refresh to clear any cached data
            } else {
                console.error("Logout failed:", result.message);
            }
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <Button variant="ghost" className="text-red-400" onClick={handleLogout}>
            <LogOut className="text-red-400" /> Log Out
        </Button>
    );
}
