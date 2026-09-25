import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export const getUnpaidStudents = withPermission(
    { students: ["view"] },
    async () => {
        "use cache"
        cacheTag("unpaid-students")

        return await db.query.enrollments.findMany({
            where: { NOT: { paymentStatus: "pending" } },
            columns: { paymentStatus: true },
            with: {
                student: {
                    columns: { name: true, email: true },
                },
                course: { columns: { name: true } },
            },
        })
    },
)

export const getEnrollmentById = withPermission(
    { students: ["view"] },
    async (_, { id }: { id: string }) => {
        "use cache"
        cacheTag("unpaid-students", `unpaid-students:${id}`)

        const enrollment =
            await db.query.enrollments.findFirst({
                where: { id },
            })

        if (!enrollment) {
            throw new NotFoundError()
        }

        return enrollment
    },
)
