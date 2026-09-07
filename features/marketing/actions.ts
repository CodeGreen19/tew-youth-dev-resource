"use server"

import { db } from "@/drizzle/db"
import {
    branchApplicationSchema,
    BranchApplicationSchemaType,
} from "./schemas"
import { branchApplications } from "@/drizzle/schema"

export async function applyForBranch(
    inputs: BranchApplicationSchemaType,
) {
    const res = branchApplicationSchema.safeParse(inputs)
    if (!res.success) {
        throw new Error("Invalid Data")
    }
    await db.insert(branchApplications).values(res.data)
    return {
        message: "Your form has submitted successfully",
    }
}
