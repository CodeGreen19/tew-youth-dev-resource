import { db } from "@/drizzle/db"
import * as schema from "@/drizzle/schema"
import { waitUntil } from "@vercel/functions"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { nextCookies } from "better-auth/next-js"
import {
    admin as adminPlugin,
    organization,
} from "better-auth/plugins"
import { sendResetPasswordEmail } from "./emails/auth-emails"
import { ac, owner } from "./permissions"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            return await sendResetPasswordEmail(
                user.email,
                url,
            )
        },
        onPasswordReset: async ({ user }) => {
            console.log(
                `Password for user ${user.email} has been reset.`,
            )
        },
    },
    user: {
        additionalFields: {
            data: {
                type: "json",
                required: false,
            },
        },
    },

    plugins: [
        organization({
            ac,
            roles: {
                owner,
            },
            dynamicAccessControl: {
                enabled: true,
            },
        }),
        adminPlugin(),
        nextCookies(),
    ],
    advanced: {
        backgroundTasks: {
            handler: waitUntil,
        },
    },
})
