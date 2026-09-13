import { db } from "@/drizzle/db"
import * as schema from "@/drizzle/schema"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import {
    admin as adminPlugin,
    organization,
} from "better-auth/plugins"
import { ac, owner } from "./permissions"
import { sendResetPasswordEmail } from "./emails/auth-emails"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }, req) => {
            await sendResetPasswordEmail(user.email, url)
        },
        onPasswordReset: async ({ user }, request) => {
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
    ],
})
