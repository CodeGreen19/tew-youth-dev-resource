"use server"

import { auth } from "@/lib/auth"
import { headers as nextHeaders } from "next/headers"
import { redirect } from "next/navigation"

export async function getSideBarInfo() {
    const headers = await nextHeaders()
    const session = await auth.api.getSession({ headers })
    if (!session) {
        redirect("/login")
    }
    let org = await auth.api.getOrganization({ headers })
    if (!org) {
        const orgLists = await auth.api.listOrganizations({
            headers,
        })
        await auth.api.setActiveOrganization({
            headers,
            body: { organizationId: orgLists[0].id },
        })
        org = orgLists[0]
    }
    const member = await auth.api.getActiveMember({
        headers,
    })
    return { session, org, member }
}
