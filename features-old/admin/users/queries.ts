import { auth } from "@/lib/auth"
import { withPermission } from "@/lib/dal"
import { cacheTag } from "next/cache"

export async function getUsersd(headers: HeadersInit) {
    const res = await auth.api.listUsers({
        query: {},
        headers,
    })

    return res
}

export const getUsers = withPermission(
    { user: ["list"] },
    async ({ headers }) => {
        "use cache"
        const res = await auth.api.listUsers({
            query: {},
            headers,
        })
        return res
    },
)

export const getSingerUserById = withPermission(
    { user: ["get"] },
    async ({ headers }, id: string) => {
        const [user, { sessions }] = await Promise.all([
            await auth.api.getUser({
                query: {
                    id,
                },

                headers,
            }),
            await auth.api.listUserSessions({
                body: {
                    userId: id,
                },
                headers,
            }),
        ])

        return { user, sessions }
    },
)
