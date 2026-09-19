import { getStudents } from "./queries"

export type Student = Awaited<
    ReturnType<typeof getStudents>
>[number]
