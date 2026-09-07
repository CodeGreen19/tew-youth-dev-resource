import { getBrancheApplications } from "./queries"

export type BranchApplication = Awaited<
    ReturnType<typeof getBrancheApplications>
>[number]
