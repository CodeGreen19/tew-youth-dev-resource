"use server"

import { auth } from "@/lib/auth"
import { requireAuth } from "@/lib/dal"

export async function getSidebarData() {
    const { session, headers, user } = await requireAuth()

    let org = await auth.api.getOrganization({ headers })
    if (!org) {
        const orgLists = await auth.api.listOrganizations({
            headers,
        })
        const existedOrg = orgLists[0]
        await auth.api.setActiveOrganization({
            headers,
            body: { organizationId: existedOrg.id },
        })
        org = existedOrg
    }
    const member = await auth.api.getActiveMember({
        headers,
    })
    const institutionType: "COMPANY" | "BRANCH" =
        process.env.COMPANY_ORG_ID === org.id
            ? "COMPANY"
            : "BRANCH"

    return { session, user, org, member, institutionType }
}
