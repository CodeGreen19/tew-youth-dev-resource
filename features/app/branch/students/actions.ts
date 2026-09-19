"use server"

import { db } from "@/drizzle/db"
import { students } from "@/drizzle/schema"
import { eq, inArray } from "drizzle-orm"
import { studentSchema, StudentSchemaType } from "./schemas"

export async function addStudent(
    student: StudentSchemaType,
) {
    const result = studentSchema.safeParse(student)

    if (!result.success) {
        throw new Error("Validation failed")
    }

    await db.insert(students).values({
        name: result.data.name,
    })

    return {
        message: "New student added",
    }
}

export async function updateStudent(
    student: StudentSchemaType & { id: string },
) {
    const result = studentSchema.safeParse(student)

    if (!result.success) {
        throw new Error("Validation failed")
    }

    const updatedRows = await db
        .update(students)
        .set({
            name: result.data.name,
        })
        .where(eq(students.id, student.id))
        .returning({ id: students.id })

    if (updatedRows.length === 0) {
        throw new Error("Student not found")
    }

    return {
        message: "Student updated successfully",
    }
}

export async function deleteStudent({
    id,
}: {
    id: string
}) {
    const deletedRows = await db
        .delete(students)
        .where(eq(students.id, id))
        .returning({ id: students.id })

    if (deletedRows.length === 0) {
        throw new Error("Student not found")
    }

    return {
        message: "Student deleted successfully",
    }
}

export async function deleteStudents({
    ids,
}: {
    ids: string[]
}) {
    if (ids.length === 0) {
        throw new Error("No students selected")
    }

    const deletedRows = await db
        .delete(students)
        .where(inArray(students.id, ids))
        .returning({ id: students.id })

    return {
        message: `${deletedRows.length} student${
            deletedRows.length === 1 ? "" : "s"
        } deleted successfully`,
    }
}
