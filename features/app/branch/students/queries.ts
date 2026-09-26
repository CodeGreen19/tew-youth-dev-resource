import { db } from "@/drizzle/db"
import { withPermission } from "@/lib/dal"
import { NotFoundError } from "@/utils/error-constructor"
import { cacheTag } from "next/cache"

export async function getCourseInfo() {
    "use cache"
    cacheTag("course-info")

    return await db.query.courses.findMany({
        columns: { name: true, id: true },
    })
}

export const getStudents = withPermission(
    { students: ["view"] },
    async ({ org }) => {
        "use cache"
        cacheTag("students")

        return await db.query.enrollments.findMany({
            where: {
                paymentStatus: "paid",
                student: { organizationId: org.id },
            },
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
export const getUnpaidStudents = withPermission(
    { students: ["view"] },
    async ({ org }) => {
        "use cache"

        cacheTag(`unpaid-students`)

        const feeField = {
            "3_months": "threeMonthsFee",
            "6_months": "sixMonthsFee",
            "1_year": "oneYearFee",
            "2_years": "twoYearsFee",
            "3_years": "threeYearsFee",
            "4_years": "fourYearsFee",
        } as const

        const res = await db.query.enrollments.findMany({
            where: {
                paymentStatus: {
                    NOT: "paid",
                },
                student: {
                    organizationId: org.id,
                },
            },
            columns: {
                id: true,
                paymentStatus: true,
                courseDuration: true,
            },
            with: {
                student: {
                    columns: {
                        name: true,
                        email: true,
                        image: true,
                    },
                },
                course: true,
            },
        })

        return res.map((enrollment) => {
            const field =
                feeField[
                    enrollment.courseDuration as keyof typeof feeField
                ]

            const price = field
                ? (enrollment.course?.[field] ?? 0)
                : 0

            return {
                ...enrollment,
                price,
            }
        })
    },
)

export const getStudentByEnrolledId = withPermission(
    { students: ["view"] },
    async ({ org }, { id }: { id: string }) => {
        "use cache"
        cacheTag(`student:${id}`)

        const enrollment =
            await db.query.enrollments.findFirst({
                where: {
                    id,
                    student: { organizationId: org.id },
                },
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
export const getEnrollmentById = withPermission(
    { students: ["view"] },
    async ({ org }, { id }: { id: string }) => {
        "use cache"
        cacheTag(`student:${id}`)

        const enrollment =
            await db.query.enrollments.findFirst({
                where: {
                    id,
                    student: { organizationId: org.id },
                },
            })

        if (!enrollment) {
            throw new NotFoundError()
        }

        return enrollment
    },
)
