'use server'

import { db } from "@/drizzle/db";
import { courses } from "@/drizzle/schema";
import { ActionResponse } from "@/types/server";
import { eq, inArray } from "drizzle-orm";
import { updateTag } from "next/cache";
import { CourseSchemaType, courseSchema } from "./schemas";
import { CourseStatus } from "@/constants/course";


export async function addCourse(course: CourseSchemaType): Promise<ActionResponse> {

    const result = courseSchema.safeParse(course);
    if (!result.success) {
        return { success: false, message: "Validation failed" };
    }
    const existCode = await db.query.courses.findFirst({ where: { code: result.data.code } })
    if (existCode) {
        return { success: false, message: "Code already exists" }
    }
    await db.insert(courses).values(result.data);

    updateTag("courses")
    return { success: true, message: "New Course Added" };
}


export async function updateCourse(course: CourseSchemaType & { id: string }): Promise<ActionResponse> {

    const result = courseSchema.safeParse(course);
    if (!result.success) {
        return { success: false, message: "Validation failed" };
    }

    const existCode = await db.query.courses.findFirst({ where: { AND: [{ code: { eq: result.data.code } }, { id: { ne: course.id } }] } })
    if (existCode) {
        return { success: false, message: "Code already exists" }
    }

    const updatedRows = await db
        .update(courses)
        .set(result.data)
        .where(eq(courses.id, course.id)).returning();

    if (updatedRows.length === 0) {
        return { success: false, message: "Course not found or no changes made" };
    }

    updateTag("courses")
    return { success: true, message: "Course updated successfully" };
}


export async function deleteCourse(id: string): Promise<ActionResponse> {

    await db
        .delete(courses)
        .where(eq(courses.id, id));

    updateTag("courses")
    return { success: true, message: "Course deleted successfully" };
}

export async function changeCourseStatus({ id, status }: { id: string, status: CourseStatus }): Promise<ActionResponse> {

    await db
        .update(courses).set({ status })
        .where(eq(courses.id, id));

    updateTag("courses")
    return { success: true, message: "Course Status Updated" };
}


export async function changeCourseStatusInBulk({
    ids,
    status,
}: {
    ids: string[]
    status: CourseStatus
}): Promise<ActionResponse> {
    if (ids.length === 0) {
        return {
            success: false,
            message: "No courses selected",
        }
    }

    await db
        .update(courses)
        .set({ status })
        .where(inArray(courses.id, ids))

    updateTag("courses")

    return {
        success: true,
        message: "Course Status Updated",
    }
}