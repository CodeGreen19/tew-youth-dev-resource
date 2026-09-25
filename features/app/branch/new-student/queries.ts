import { db } from "@/drizzle/db"

export async function getCourseInfo() {
    "use cache"

    return await db.query.courses.findMany({
        columns: { name: true, id: true },
    })
}
