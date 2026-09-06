"use server"

import { db } from "@/drizzle/db"
import { courses, user } from "@/drizzle/schema" // Assuming standard schema names
import { withPermission } from "@/lib/dal"
import { count } from "drizzle-orm"

export const getStatus = withPermission(
    { dashboard: ["view"] },
    async () => {
        "use cache"
        const [resCourses, resBranches, resUsers] =
            await Promise.all([
                db.select({ count: count() }).from(courses),
                db.select({ count: count() }).from(courses),
                db.select({ count: count() }).from(user),
            ])

        // Return the structured array directly
        return [
            {
                title: "courses",
                count: resCourses[0]?.count ?? 0,
            },
            {
                title: "branches",
                count: resBranches[0]?.count ?? 0,
            },
            {
                title: "users",
                count: resUsers[0]?.count ?? 0,
            },
        ]
    },
)
