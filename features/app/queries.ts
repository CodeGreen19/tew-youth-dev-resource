import { withPermission } from "@/lib/dal"

export const getSidebarData = withPermission(
    { sidebar: ["view"] },
    async ({ org, orgMemberRole, session, user }) => {
        const institutionType =
            process.env.COMPANY_ORG_ID === org.id
                ? "COMPANY"
                : "BRANCH"

        return {
            session: { session, user },
            org,
            orgRole: orgMemberRole,
            institutionType,
        }
    },
)
