import {
    getPaidStudentByEnrolledId,
    getPaidStudents,
} from "./queries"

export type Student = Awaited<
    ReturnType<typeof getPaidStudents>
>[number]
export type StudentById = Awaited<
    ReturnType<typeof getPaidStudentByEnrolledId>
>
