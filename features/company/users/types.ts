import { getMembers } from "./queries"

export type OrgUser = Awaited<
    ReturnType<typeof getMembers>
>["members"][number]
