"use cache"

import { db } from "@/drizzle/db";
import { cacheLife, cacheTag } from "next/cache";

export async function getCourses() {
    cacheTag("courses");
    cacheLife("max")
    return await db.query.courses.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getCourseById(id: string) {
    cacheTag(`course:${id}`)
    const res = await db.query.courses.findFirst({ where: { id } });
    if (!res) {
        throw new Error("Not Found!")
    }
    return res
}