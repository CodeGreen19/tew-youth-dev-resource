"use server"

import { db } from "@/drizzle/db"
import { formSubmissions } from "@/drizzle/schema"

export async function addToForm({ data, formVersionId }: { data: Record<string, any>, formVersionId: string }) {

    await db.insert(formSubmissions).values({ data, formVersionId });
    return { success: true, message: "Form Submitted" }
}