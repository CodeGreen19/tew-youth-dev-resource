import { getBranchById, getBranches } from "./queries"

export type Branch = Awaited<
    ReturnType<typeof getBranches>
>[number]
export type BranchById = Awaited<
    ReturnType<typeof getBranchById>
>
