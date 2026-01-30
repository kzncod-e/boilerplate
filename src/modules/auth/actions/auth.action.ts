"use server";

import { eq } from "drizzle-orm";
import type {
    AuthResponse,
    SignInSchema,
    SignUpSchema,
} from "@/modules/auth/models/auth.model";
import { getAuthInstance } from "@/modules/auth/utils/auth-utils";
import { user } from "@/modules/auth/schemas/auth.schema";

// #region SERVER ACTIONS

export const signIn = async ({
    email,
    password,
}: SignInSchema): Promise<AuthResponse> => {
    try {
        const auth = await getAuthInstance();
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return {
            success: true,
            message: "Signed in succesfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occured.",
        };
    }
};

export const signUp = async ({
    email,
    password,
    username,
}: SignUpSchema): Promise<AuthResponse> => {
    try {
        const authdah = await getAuthInstance();
        await authdah.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            },
        });
     const newUser =   await authdah.api.c({
            body: {
                email,
                password,
                name: username,
                role:"admin"
            },
        });

        return {
            success: true,
            message: "Signed up succesfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occured.",
        };
    }
};
export const signOut = async (): Promise<AuthResponse> => {
    try {
        const auth = await getAuthInstance();
        await auth.api.signOut({
            headers: await import("next/headers").then((m) => m.headers()),
        });

        return {
            success: true,
            message: "Signed out successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const getUsers = async () => {
    try {
        const db = await import("@/db").then((m) => m.getDb());
        const users = await db.select().from(user);
        return {
            success: true,
            data: users,
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const updateUser = async (id: string, data: { name?: string; email?: string }) => {
    try {
        const db = await import("@/db").then((m) => m.getDb());
        await db.update(user).set(data).where(eq(user.id, id));
        return {
            success: true,
            message: "User updated successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};

export const deleteUser = async (id: string) => {
    try {
        const db = await import("@/db").then((m) => m.getDb());
        await db.delete(user).where(eq(user.id, id));
        return {
            success: true,
            message: "User deleted successfully",
        };
    } catch (error) {
        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occurred.",
        };
    }
};
// #endregion
