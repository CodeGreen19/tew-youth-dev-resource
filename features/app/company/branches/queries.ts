import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export const getBranches = withPermission(
    { branches: ["view"] },
    async () => {
        "use cache"
        cacheTag("branches")

        return await db.query.organizations.findMany()
    },
)

export const getBranchById = withPermission(
    { branches: ["view"] },
    async (_, { id }: { id: string }) => {
        "use cache"
        cacheTag("branches", `branch:${id}`)

        const branch =
            await db.query.organizations.findFirst({
                where: { id },
            })

        if (!branch) {
            throw new NotFoundError()
        }

        return branch
    },
)
