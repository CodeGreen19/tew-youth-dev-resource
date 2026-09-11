"use server"

import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getRolesAndPermissions() {
    const org = await auth.api.getOrganization({
        headers: await headers(),
    })
    if (!org) {
        throw new Error("Org is not found")
    }
    const roles = await auth.api.listOrgRoles({
        query: {
            organizationId: org.id,
        },
        headers: await headers(),
    })

    return roles
}
