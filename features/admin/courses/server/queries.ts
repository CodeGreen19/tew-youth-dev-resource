"use cache"

import { db } from "@/drizzle/db"
import { cacheTag } from "next/cache";

export async function getCourses() {
    cacheTag("courses")
    return await db.query.courses.findMany();
}