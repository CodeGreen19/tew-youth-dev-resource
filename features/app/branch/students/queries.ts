import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export const getPaidStudents = withPermission(
    { students: ["view"] },
    async () => {
        "use cache"
        cacheTag("paid-students")

        return await db.query.enrollments.findMany({
            where: { paymentStatus: "paid" },
            columns: {
                id: true,
                paymentStatus: true,
                rollNumber: true,
                registrationNumber: true,
            },
            with: {
                student: {
                    columns: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                course: { columns: { name: true } },
            },
        })
    },
)

export const getPaidStudentByEnrolledId = withPermission(
    { students: ["view"] },
    async (_, { id }: { id: string }) => {
        "use cache"
        cacheTag("paid-students", `paid-students:${id}`)

        const enrollment =
            await db.query.enrollments.findFirst({
                where: { id },
                with: {
                    student: {
                        with: { qualifications: true },
                    },
                    course: true,
                },
            })

        if (!enrollment) {
            throw new NotFoundError()
        }
        const student = enrollment?.student
        if (!student) {
            throw new NotFoundError()
        }

        return student
    },
)
