"use server"

import { CourseStatus } from "@/constants/course"
import { db } from "@/drizzle/db"
import { courses } from "@/drizzle/schema"
import { eq, inArray } from "drizzle-orm"
import { updateTag } from "next/cache"
import { CourseSchemaType, courseSchema } from "./schemas"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export async function addCourse(course: CourseSchemaType) {
    const result = courseSchema.safeParse(course)

    if (!result.success) {
        throw new Error("Validation failed")
    }

    const existCode = await db.query.courses.findFirst({
        where: { code: result.data.code },
    })

    if (existCode) {
        throw new Error("Code already exists")
    }

    await db.insert(courses).values(result.data)

    updateTag("courses")

    return {
        message: "New Course Added",
    }
}

export async function updateCourse(
    course: CourseSchemaType & { id: string },
) {
    const result = courseSchema.safeParse(course)

    if (!result.success) {
        throw new Error("Validation failed")
    }

    const existCode = await db.query.courses.findFirst({
        where: {
            AND: [
                {
                    code: {
                        eq: result.data.code,
                    },
                },

                {
                    id: {
                        ne: course.id,
                    },
                },
            ],
        },
    })

    if (existCode) {
        throw new Error("Code already exists")
    }

    const updatedRows = await db
        .update(courses)
        .set(result.data)
        .where(eq(courses.id, course.id))
        .returning()

    if (updatedRows.length === 0) {
        throw new Error("Course not found")
    }

    updateTag("courses")

    return {
        message: "Course updated successfully",
    }
}

export async function deleteCourse(id: string) {
    const data = await auth.api.hasPermission({
        body: {
            permissions: {
                course: ["delete"],
            },
        },
        headers: await headers(),
    })
    if (!data.success) {
        throw new Error("Error occurs")
    }
    const deletedRows = await db
        .delete(courses)
        .where(eq(courses.id, id))
        .returning({ id: courses.id })

    if (deletedRows.length === 0) {
        throw new Error("Course not found")
    }

    updateTag("courses")

    return {
        message: "Course deleted successfully",
    }
}

export async function changeCourseStatus({
    id,
    status,
}: {
    id: string
    status: CourseStatus
}) {
    const updatedRows = await db
        .update(courses)
        .set({ status })
        .where(eq(courses.id, id))
        .returning({ id: courses.id })

    if (updatedRows.length === 0) {
        throw new Error("Course not found")
    }

    updateTag("courses")

    return {
        message: "Course status updated",
    }
}

export async function changeCourseStatusInBulk({
    ids,
    status,
}: {
    ids: string[]
    status: CourseStatus
}) {
    if (ids.length === 0) {
        throw new Error("No courses selected")
    }

    await db
        .update(courses)
        .set({ status })
        .where(inArray(courses.id, ids))

    updateTag("courses")

    return {
        message: "Course status updated",
    }
}
