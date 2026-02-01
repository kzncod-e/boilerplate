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
        const currentUser = await requireAuth();

        const auth = await getAuthInstance();
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });
 await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: currentUser.name,
            action: "sign-in",
            targetType: "authentication",
            targetName:"User SignIn",
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
}: SignUpSchema): Promise<AuthResponse> => {
    try {
        const authdah = await getAuthInstance();
        const db = await getDb();
        const currentUser = await requireAuth();
        // @ts-ignore
        await authdah.api.createUser({
            body: {
                email,
                password,   
                name: username,
            },
        });
    await db.insert(auditLog).values({
            id: crypto.randomUUID(),
            actor: currentUser.name,
            action: "create",
            targetType: "user",
            targetName:"User Creation",
            metadata: JSON.stringify({ email }),
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
}
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
            targetName:"User SignUp",
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
            targetName:"User SignOut",
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

export const updateUser = async (id: string, data: { name?: string; email?: string }) => {
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
            targetName:"User Update",
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
