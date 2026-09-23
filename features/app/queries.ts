import { auth } from "@/lib/auth"
import { requireAuth } from "@/lib/dal"
import { institutionType } from "./types"

export async function getSidebarData() {
    const { headers, session } = await requireAuth()

    let org = await auth.api.getOrganization({
        headers,
    })

    console.log(org)

    if (!org) {
        const organizations =
            await auth.api.listOrganizations({
                headers,
            })

        console.log(organizations, "org")

        const firstOrg = organizations[0]

        if (!firstOrg) {
            throw new Error(
                "Authenticated user does not belong to an organization.",
            )
        }

        const data = await auth.api.setActiveOrganization({
            headers,
            body: {
                organizationId: firstOrg.id,
            },
        })

        console.log("data=>>>>", data)
        console.log("first=>>>>", firstOrg)

        org = firstOrg
    }

    console.log("outside org =>>>>", org)

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
