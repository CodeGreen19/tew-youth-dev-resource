"use server"

import { CourseStatus } from "@/constants/course"
import { db } from "@/drizzle/db"
import { courses } from "@/drizzle/schema"
import { uploadToCloudinary } from "@/lib/cloudinary/upload"
import { eq, inArray } from "drizzle-orm"
import {
    CourseSchemaType,
    UpdateCourseSchemaType,
    courseSchema,
    updateCourseSchema,
} from "./schemas"
import { deleteFromCloudinary } from "@/lib/cloudinary/delete"

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

    const banner = await uploadToCloudinary(
        result.data.banner,
        { folder: "course_banner" },
    )

    await db
        .insert(courses)
        .values({ ...result.data, banner })

    return {
        message: "New Course Added",
    }
}

export async function updateCourse(
    course: UpdateCourseSchemaType & { id: string },
) {
    const result = updateCourseSchema.safeParse(course)

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

    let banner = result.data.existingBanner
    if (result.data.banner) {
        banner = await uploadToCloudinary(
            result.data.banner,
            { folder: "course_banner" },
        )
        await deleteFromCloudinary(
            result.data.existingBanner.publicId,
        )
    }

    const updatedRows = await db
        .update(courses)
        .set({ ...result.data, banner })
        .where(eq(courses.id, course.id))
        .returning()

    if (updatedRows.length === 0) {
        throw new Error("Course not found")
    }

    return {
        message: "Course updated successfully",
    }
}

export async function deleteCourse({
    id,
    bannerPublicId,
}: {
    id: string
    bannerPublicId: string
}) {
    const deletedRows = await db
        .delete(courses)
        .where(eq(courses.id, id))
        .returning({ id: courses.id })

    await deleteFromCloudinary(bannerPublicId)
    if (deletedRows.length === 0) {
        throw new Error("Course not found")
    }

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

    return {
        message: "Course status updated",
    }
}
