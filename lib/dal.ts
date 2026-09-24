import "server-only"
import { auth } from "./auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { UnauthorizedError } from "@/utils/error-constructor"

type Session = NonNullable<
    Awaited<ReturnType<typeof auth.api.getSession>>
> & { headers: HeadersInit }

export type Permissions = NonNullable<
    Parameters<typeof auth.api.hasPermission>[0]
>["body"]["permissions"]

export async function requireAuth() {
    let parasedHeaders = await headers()
    const session = await auth.api.getSession({
        headers: parasedHeaders,
    })

    if (!session) {
        redirect("/login")
    }

    return { session, headers: parasedHeaders }
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
        const { headers, session } = await requireAuth()

        const result = await auth.api.hasPermission({
            body: {
                permissions,
            },
            headers,
        })

        if (!result.success) {
            throw new UnauthorizedError()
        }
        return action({ headers, ...session }, ...args)
    }
}
