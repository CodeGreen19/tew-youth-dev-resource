import "server-only"
import { auth } from "./auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

type Session = NonNullable<
    Awaited<ReturnType<typeof auth.api.getSession>>
> & { headers: HeadersInit }

export type Permissions = NonNullable<
    Parameters<typeof auth.api.userHasPermission>[0]
>["body"]["permissions"]

export async function requireAuth() {
    const parasedHeaders = await headers()
    const session = await auth.api.getSession({
        headers: parasedHeaders,
    })

    if (!session) {
        redirect("/admin-login")
    }

    return { ...session, headers: parasedHeaders }
}

export function withPermission<
    Targs extends unknown[],
    TResult,
>(
    permissions: Permissions,
    action: (
        session: Session,
        ...args: Targs
    ) => Promise<TResult>,
) {
    return async (...args: Targs): Promise<TResult> => {
        const session = await requireAuth()

        const result = await auth.api.userHasPermission({
            body: {
                userId: session.user.id,
                permissions,
            },
        })

        if (!result.success) {
            throw new Error("You don't have permission")
        }
        return action(session, ...args)
    }
}
