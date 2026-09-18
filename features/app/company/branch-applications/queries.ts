"use server"

import { db } from "@/drizzle/db"

export async function getBranchApplications() {
    return await db.query.branchApplications.findMany()
}
export async function getBranchApplicationById({
    id,
}: {
    id: string
}) {
    const branch =
        await db.query.branchApplications.findFirst({
            where: { id },
        })

    if (!branch) {
        throw new Error("branch not found")
    }

    return branch
}
