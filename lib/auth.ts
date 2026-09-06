import { db } from "@/drizzle/db"
import * as schema from "@/drizzle/schema"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { organization } from "better-auth/plugins"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
    },
    plugins: [organization()],
})
