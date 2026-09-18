"use server"

import { db } from "@/drizzle/db"

export async function getBranches() {
    return await db.query.organizations.findMany()
}
export async function getBranchById({
    id,
}: {
    id: string
}) {
    const branch = await db.query.organizations.findFirst({
        where: { id },
    })

    if (!branch) {
        throw new Error("branch not found")
    }

    return branch
}
