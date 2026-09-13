"use server"

import { db } from "@/drizzle/db"
import { tests } from "@/drizzle/schema"

export async function getTests() {
    return await db.select().from(tests)
}
