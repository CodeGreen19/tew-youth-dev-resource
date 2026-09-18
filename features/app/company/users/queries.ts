"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { UserWithRole } from "better-auth/plugins/admin"
import { AdditionalDataType } from "./types"
import { db } from "@/drizzle/db"

export async function getMembers() {
    return await auth.api.listMembers({
        query: {},
        headers: await headers(),
    })
}

type UserWithAdditionalFields = UserWithRole & {
    data: AdditionalDataType | null
    orgRole: string
    memberId: string
    organizationId: string
}
export async function getUserDetailsById({
    memberId,
}: {
    memberId: string
}) {
    const member = await db.query.members.findFirst({
        where: { id: memberId },
    })
    if (!member) {
        throw new Error("Member not found")
    }
    const res = await auth.api.getUser({
        query: { id: member.userId },
        headers: await headers(),
    })

    return {
        ...res,
        orgRole: member.role,
        memberId: member.id,
        organizationId: member.organizationId,
    } as UserWithAdditionalFields
}
