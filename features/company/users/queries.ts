"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { UserWithRole } from "better-auth/plugins/admin"
import { AdditionalDataType } from "./types"

export async function getMembers() {
    return await auth.api.listMembers({
        query: {},
        headers: await headers(),
    })
}

type UserWithAdditionalFields = UserWithRole & {
    data: AdditionalDataType | null
}
export async function getUserDetailsById({
    userId,
}: {
    userId: string
}) {
    const res = await auth.api.getUser({
        query: { id: userId },
        headers: await headers(),
    })
    return res as UserWithAdditionalFields
}
