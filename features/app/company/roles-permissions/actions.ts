"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function createRole({
    role,
}: {
    role: string
}) {
    const org = await auth.api.getOrganization({
        headers: await headers(),
    })
    if (!org) {
        throw new Error("Org is not found")
    }
    const res = await auth.api.createOrgRole({
        body: {
            role,
            permission: {},
            organizationId: org.id,
        },
        headers: await headers(),
    })

    return { message: "New role is created", role: role }
}

export async function updateRolePermission({
    roleName,
    permission,
}: {
    roleName: string
    permission: Record<string, string[]>
}) {
    const org = await auth.api.getOrganization({
        headers: await headers(),
    })
    if (!org) {
        throw new Error("Org is not found")
    }
    const updatedRole = await auth.api.updateOrgRole({
        body: {
            roleName,
            organizationId: org.id,
            data: {
                permission: { ...permission },
            },
        },
        // This endpoint requires session cookies.
        headers: await headers(),
    })

    return { message: "Permissions Updated" }
}
