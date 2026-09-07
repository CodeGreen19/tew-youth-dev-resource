"use server"

import { db } from "@/drizzle/db"

export async function getBrancheApplications() {
    return await db.query.branchApplications.findMany()
}
