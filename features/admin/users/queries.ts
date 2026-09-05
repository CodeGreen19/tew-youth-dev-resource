"use cache"

import { auth } from "@/lib/auth"

export async function getUsers(headers: HeadersInit) {
    const res = await auth.api.listUsers({
        query: {},
        headers,
    })

    return res
}
