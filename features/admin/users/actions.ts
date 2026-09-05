"use server"

import { auth } from "@/lib/auth"
import { userSchema, UserSchemaType } from "./schemas"
import { withPermission } from "@/lib/dal"

export const createUser = withPermission(
    { user: ["create"] },
    async (_, schema: UserSchemaType) => {
        const inputs = userSchema.safeParse(schema)
        if (!inputs.success) {
            throw new Error("Error")
        }
        await auth.api.createUser({
            body: {
                ...inputs.data,
            },
        })
        return { message: "new user created" }
    },
)

// ─────────────────────────────────────────────
// Profile
// ─────────────────────────────────────────────

export const updateUserName = withPermission(
    { user: ["update"] },

    async (
        { headers },
        { id, newName }: { id: string; newName: string },
    ) => {
        if (newName.length < 3) {
            throw new Error(
                "User name Must be at least 3 char",
            )
        }
        await auth.api.adminUpdateUser({
            body: {
                userId: id,
                data: {
                    name: newName,
                },
            },
            headers,
        })

        return { message: "User name updated" }
    },
)

// ─────────────────────────────────────────────
// Actions
// ─────────────────────────────────────────────

export const setUserPassword = withPermission(
    { user: ["set-password"] },

    async (
        { headers },
        data: {
            userId: string
            newPassword: string
        },
    ) => {
        if (!data.userId || !data.newPassword) {
            throw new Error("Invalid input")
        }
        if (data.newPassword.length < 8) {
            throw new Error(
                "User name Must be at least 3 char",
            )
        }
        await auth.api.setUserPassword({
            body: {
                userId: data.userId,
                newPassword: data.newPassword,
            },
            headers,
        })

        return { message: "User password updated" }
    },
)

export const revokeUserSession = withPermission(
    { user: ["update"] },

    async (
        { headers },
        data: {
            sessionToken: string
        },
    ) => {
        if (!data.sessionToken) {
            throw new Error("Session token is required")
        }

        await auth.api.revokeUserSession({
            body: {
                sessionToken: data.sessionToken,
            },
            headers,
        })

        return { message: "Session revoked" }
    },
)

export const revokeAllUserSessions = withPermission(
    { user: ["update"] },

    async ({ headers }, data: { userId: string }) => {
        if (!data.userId) {
            throw new Error("User ID is required")
        }

        await auth.api.revokeUserSessions({
            body: {
                userId: data.userId,
            },
            headers,
        })

        return { message: "All user sessions revoked" }
    },
)

// ─────────────────────────────────────────────
// Danger Zone
// ─────────────────────────────────────────────

export const banUser = withPermission(
    { user: ["ban"] },

    async (
        { headers },
        data: {
            userId: string
            banReason?: string
            banExpiresIn?: number
        },
    ) => {
        if (!data.userId) {
            throw new Error("User ID is required")
        }

        await auth.api.banUser({
            body: {
                userId: data.userId,
                banReason: data.banReason,
                banExpiresIn: data.banExpiresIn,
            },
            headers,
        })

        return { message: "User banned" }
    },
)

export const unbanUser = withPermission(
    { user: ["ban"] },

    async ({ headers }, data: { userId: string }) => {
        if (!data.userId) {
            throw new Error("User ID is required")
        }

        await auth.api.unbanUser({
            body: {
                userId: data.userId,
            },
            headers,
        })

        return { message: "User unbanned" }
    },
)

export const removeUser = withPermission(
    { user: ["delete"] },

    async ({ headers }, data: { userId: string }) => {
        if (!data.userId) {
            throw new Error("User ID is required")
        }

        await auth.api.removeUser({
            body: {
                userId: data.userId,
            },
            headers,
        })

        return { message: "User removed" }
    },
)
