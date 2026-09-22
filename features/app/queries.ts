import { auth } from "@/lib/auth"
import { requireAuth } from "@/lib/dal"
import { institutionType } from "./types"
import { Organization } from "better-auth/plugins/organization"

export async function getSidebarData() {
    const { headers, session } = await requireAuth()

    let org: Organization | null = null

    try {
        let existedOrg = await auth.api.getOrganization({
            headers,
        })

        org = existedOrg
    } catch (error) {
        if (!org) {
            const organizations =
                await auth.api.listOrganizations({
                    headers,
                })

            const firstOrg = organizations[0]

            if (!firstOrg) {
                throw new Error(
                    "Authenticated user does not belong to an organization.",
                )
            }

            await auth.api.setActiveOrganization({
                headers,
                body: {
                    organizationId: firstOrg.id,
                },
            })

            org = firstOrg
        }
    }

    if (!org) {
        throw new Error("Org is not found")
    }

    const member = await auth.api.getActiveMember({
        headers,
    })

    if (!member) {
        throw new Error(
            "Active organization membership could not be found.",
        )
    }

    const institutionType: institutionType =
        process.env.COMPANY_ORG_ID === org.id
            ? "COMPANY"
            : "BRANCH"

    return {
        session,
        org,
        member,
        institutionType,
    }
}
