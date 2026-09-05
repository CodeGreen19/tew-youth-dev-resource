import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { cacheTag } from "next/cache"

export async function getCourses_s() {
    // cacheTag("courses")

    return await db.query.courses.findMany({
        orderBy: { createdAt: "desc" },
    })
}
export const getCourses = withPermission(
    { course: ["view"] },
    async () => {
        "use cache"
        cacheTag("courses")

        return await db.query.courses.findMany({
            orderBy: { createdAt: "desc" },
        })
    },
)

export async function getCourseById(id: string) {
    "use cache"
    cacheTag(`course:${id}`)
    const res = await db.query.courses.findFirst({
        where: { id },
    })
    if (!res) {
        throw new Error("Not Found!")
    }
    return res
}
