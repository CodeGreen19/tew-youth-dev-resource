import { auth } from "@/lib/auth"
import { requireAuth } from "@/lib/dal"
import { institutionType } from "./types"

export async function getSidebarData() {
    const { headers, session } = await requireAuth()

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
    const institutionType: institutionType =
        process.env.COMPANY_ORG_ID === org.id
            ? "COMPANY"
            : "BRANCH"

    return { session, org, member, institutionType }
}
