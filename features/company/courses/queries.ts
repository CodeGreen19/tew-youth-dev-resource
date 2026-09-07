import { db } from "@/drizzle/db"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function getCourses() {
    const data = await auth.api.hasPermission({
        body: {
            permissions: {
                course: ["view"],
            },
        },
        headers: await headers(),
    })
    if (!data.success) {
        throw new Error("Error occurs")
    }
    return await db.query.courses.findMany({
        orderBy: (courses, { desc }) => [
            desc(courses.createdAt),
        ],
    })
}

export async function getCourseById(id: string) {
    const res = await db.query.courses.findFirst({
        where: { id },
    })

    if (!res) {
        throw new Error("Not Found!")
    }

    return res
}
