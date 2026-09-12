"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getMembers() {
    return await auth.api.listMembers({
        query: {},
        headers: await headers(),
    })
}

export async function getOrgUserDetailsById({
    userId,
}: {
    userId: string
}) {
    return await auth.api.getUser({
        query: { id: userId },
        headers: await headers(),
    })
}
