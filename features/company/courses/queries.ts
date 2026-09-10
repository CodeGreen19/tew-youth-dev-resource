"use server"

import { db } from "@/drizzle/db"

export async function getCourses() {
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
