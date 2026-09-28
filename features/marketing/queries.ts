import { db } from "@/drizzle/db"
import { cacheLife, cacheTag } from "next/cache"

export async function getCourses() {
    "use cache"
    cacheLife("max")
    cacheTag("hero-courses")
    return db.query.courses.findMany()
}
