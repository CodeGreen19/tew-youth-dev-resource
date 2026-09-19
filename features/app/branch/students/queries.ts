"use server"

import { db } from "@/drizzle/db"
import { auth } from "@/lib/auth"
import { UnauthorizedError } from "@/utils/error-constructor"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export async function getStudents() {
    const session = auth.api.getSession()
    if (!session) {
        redirect("/login")
    }
    const hasPermission = await auth.api.hasPermission({
        body: { permissions: { students: ["view"] } },
        headers: await headers(),
    })
    if (!hasPermission.success) {
        throw new UnauthorizedError()
    }
    //working
    return await db.query.students.findMany({
        orderBy: (courses, { desc }) => [
            desc(courses.createdAt),
        ],
    })
}

export async function getStudentById(id: string) {
    const res = await db.query.courses.findFirst({
        where: { id },
    })

    if (!res) {
        throw new Error("Not Found!")
    }

    return res
}
