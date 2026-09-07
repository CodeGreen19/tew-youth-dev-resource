import {
    organizationClient,
    adminClient,
} from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"
import { owner } from "./permissions"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [
        organizationClient({
            dynamicAccessControl: {
                enabled: true,
            },
            roles: {
                owner,
            },
        }),
        adminClient(),
    ],
})
