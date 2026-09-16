"use server"

import { db } from "@/drizzle/db"
import { tests } from "@/drizzle/schema"

import { eq } from "drizzle-orm"
import {
    testSchema,
    TestSchemaType,
} from "../_schemas/test"
import { updateTag } from "next/cache"

export async function addTest(input: TestSchemaType) {
    const result = testSchema.safeParse(input)

    if (!result.success) {
        throw new Error(
            result.error.issues[0]?.message ??
                "Invalid test data",
        )
    }

    const { name, code, description } = result.data

    const [test] = await db
        .insert(tests)
        .values({
            name,
            code,
            description: description || null,
        })
        .returning()
    updateTag("tests")
    return {
        message: "Test created successfully",
        data: test,
    }
}

export async function updateTest({
    id,
    input,
}: {
    id: string
    input: TestSchemaType
}) {
    if (!id) {
        throw new Error("Test ID is required")
    }

    const result = testSchema.safeParse(input)

    if (!result.success) {
        throw new Error(
            result.error.issues[0]?.message ??
                "Invalid test data",
        )
    }

    const { name, code, description } = result.data

    const [test] = await db
        .update(tests)
        .set({
            name,
            code,
            description: description || null,
            updatedAt: new Date(),
        })
        .where(eq(tests.id, id))
        .returning()

    if (!test) {
        throw new Error("Test not found")
    }
    updateTag("tests")
    return {
        message: "Test updated successfully",
        data: test,
    }
}

export async function deleteTest(id: string) {
    if (!id) {
        throw new Error("Test ID is required")
    }

    const [test] = await db
        .delete(tests)
        .where(eq(tests.id, id))
        .returning()

    if (!test) {
        throw new Error("Test not found")
    }
    updateTag("tests")
    return {
        message: "Test deleted successfully",
    }
}
