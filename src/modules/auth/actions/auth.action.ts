"use server";

import { eq } from "drizzle-orm";
import type {
    AuthResponse,
    SignInSchema,
    SignUpSchema,
} from "@/modules/auth/models/auth.model";
import { getAuthInstance, requireAuth } from "@/modules/auth/utils/auth-utils";
import { user } from "@/modules/auth/schemas/auth.schema";
import { auditLog, getDb } from "@/db";

// #region SERVER ACTIONS

export const signIn = async ({
    email,
    password,
}: SignInSchema): Promise<AuthResponse> => {
    try {
        const db = await getDb();

        const auth = await getAuthInstance();
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: email,
            action: "sign-in",
            targetType: "authentication",
            targetName: "User SignIn",
            metadata: JSON.stringify({ email }),
            createdAt: new Date(),
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
export const createUser = async ({
    email,
    password,
    username,
    role,
}: SignUpSchema & { role?: string }): Promise<AuthResponse> => {
    try {
        const authdah = await getAuthInstance();
        const db = await getDb();

        // Check if email already exists in local DB to avoid unique constraint errors
        const existing = await db
            .select()
            .from(user)
            .where(eq(user.email, email))
            .limit(1);
        if (existing.length > 0) {
            return {
                success: false,
                message: "Email already exists",
            };
        }

        // create user on auth provider
        // @ts-ignore

        // insert into local user table so role and metadata are stored
        const now = new Date();

        const newUser = {
            id: crypto.randomUUID(),
            name: username,
            role: role || "user",
            email,
            image: null,
            emailVerified: false,
            banned: false,
            createdAt: now,
            updatedAt: now,
        };

        await db.insert(user).values(newUser);

        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: newUser.name,
            action: "create",
            targetType: "user",
            targetName: "User Creation",
            metadata: JSON.stringify({ email, role }),
            createdAt: new Date(),
        });

        return {
            success: true,
            message: "user created succesfully",
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
        const db = await getDb();
        // const currentUser = await requireAuth();

        await authdah.api.signUpEmail({
            body: {
                email,
                password,
                name: username,
            },
        });

        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: "new user",
            action: "sign-up",
            targetType: "authentication",
            targetName: "User SignUp",
            metadata: JSON.stringify({ email }),
            createdAt: new Date(),
        });
        return {
            success: true,
            message: "Signed up succesfully",
        };
    } catch (error) {
        console.log(error);

        const err = error as Error;
        return {
            success: false,
            message: err.message || "An unknown error occured.",
        };
    }
};
export const getUserByRole = async (role: string) => {
    try {
        const db = await getDb();
        const users = await db.select().from(user).where(eq(user.role, role));
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
export const signOut = async (): Promise<AuthResponse> => {
    try {
        const auth = await getAuthInstance();
        const db = await getDb();
        const currentUser = await requireAuth();
        const { email } = currentUser;
        await auth.api.signOut({
            headers: await import("next/headers").then((m) => m.headers()),
        });
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: currentUser.name,
            action: "sign-out",
            targetType: "authentication",
            targetName: "User SignOut",
            metadata: JSON.stringify({ email }),
            createdAt: new Date(),
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
        const db = await getDb();
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

export const updateUser = async (
    id: string,
    data: { name?: string; email?: string },
) => {
    try {
        const db = await getDb();
        await db.update(user).set(data).where(eq(user.id, id));
        const currentUser = await requireAuth();
        const { email } = currentUser;
        await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: currentUser.name,
            action: "update",
            targetType: "user",
            targetName: "User Update",
            metadata: JSON.stringify({ email }),
            createdAt: new Date(),
        });
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
        const db = await getDb();
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
