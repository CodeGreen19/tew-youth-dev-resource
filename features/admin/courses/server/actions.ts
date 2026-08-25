'use server'

import { db } from "@/drizzle/db";
import { courses } from "@/drizzle/schema";
import { ActionResponse } from "@/types/server";
import { eq } from "drizzle-orm";
import { updateTag } from "next/cache";
import { Course, courseSchema } from "../schemas/courses";


export async function AddCourse(course: Course): Promise<ActionResponse> {

    const result = courseSchema.safeParse(course);
    if (!result.success) {
        return { success: false, message: "Validation failed" };
    }

    await db.insert(courses).values(result.data);
    updateTag("courses")
    return { success: true, message: "New Course Added" };
}


export async function UpdateCourse(course: Course & { id: string }): Promise<ActionResponse> {

    const result = courseSchema.safeParse(course);
    if (!result.success) {
        return { success: false, message: "Validation failed" };
    }

    const updatedRows = await db
        .update(courses)
        .set(result.data)
        .where(eq(courses.id, course.id)).returning();

    if (updatedRows.length === 0) {
        return { success: false, message: "Course not found or no changes made" };
    }

    return { success: true, message: "Course updated successfully" };
}


export async function DeleteCourse(id: string): Promise<ActionResponse> {

    await db
        .delete(courses)
        .where(eq(courses.id, id));

    return { success: true, message: "Course deleted successfully" };
}
