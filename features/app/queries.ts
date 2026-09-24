import { db } from "@/drizzle/db"
import { auth } from "@/lib/auth"
import { requireAuth } from "@/lib/dal"

export async function getSidebarData() {
    const { headers, session } = await requireAuth()

    let org = await auth.api.getOrganization({
        headers,
    })

    if (!org) {
        const organizations =
            await auth.api.listOrganizations({
                headers,
            })

        org = organizations[0]

        if (!org) {
            throw new Error(
                "Authenticated user does not belong to an organization.",
            )
        }

        await auth.api.setActiveOrganization({
            headers,
            body: {
                organizationId: org.id,
            },
        })
    }

    const member = await db.query.members.findFirst({
        where: {
            AND: [
                {
                    organizationId: org.id,
                    userId: session.user.id,
                },
            ],
        },
        columns: { role: true },
    })

    if (!member) {
        throw new Error(
            "Authenticated user is not a member of the organization.",
        )
    }

    const institutionType =
        process.env.COMPANY_ORG_ID === org.id
            ? "COMPANY"
            : "BRANCH"

    return {
        session,
        org,
        orgRole: member.role,
        institutionType,
    }
}
