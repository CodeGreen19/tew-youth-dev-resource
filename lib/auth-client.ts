import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import {
    ac,
    admin,
    manager,
    moderator,
} from "./permissions"
export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        adminClient({
            ac,
            roles: {
                admin,
                manager,
                moderator,
            },
        }),
    ],
})
