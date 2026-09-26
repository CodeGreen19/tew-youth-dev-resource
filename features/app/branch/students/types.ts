import {
    getEnrollmentById,
    getStudentByEnrolledId,
    getStudents,
    getUnpaidStudents,
} from "./queries"

export type Student = Awaited<
    ReturnType<typeof getStudents>
>[number]

export type UnpaidStudent = Awaited<
    ReturnType<typeof getUnpaidStudents>
>[number]

export type StudentByEnrolledId = Awaited<
    ReturnType<typeof getStudentByEnrolledId>
>
export type EnrollmentById = Awaited<
    ReturnType<typeof getEnrollmentById>
>
