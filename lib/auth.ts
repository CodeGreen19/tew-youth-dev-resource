import { db } from "@/drizzle/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import * as schema from "@/drizzle/schema"
import { admin as adminPlugin } from "better-auth/plugins"
import {
    ac,
    admin,
    manager,
    moderator,
} from "./permissions"

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema,
    }),
    emailAndPassword: {
        enabled: true,
    },
    // session: { cookieCache: { enabled: true } },
    plugins: [
        adminPlugin({
            ac,
            roles: {
                admin,
                manager,
                moderator,
            },
            defaultRole: "moderator",
        }),
    ],
})
