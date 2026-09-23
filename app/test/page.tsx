import { generateEnrollmentNumbers } from "@/features/app/branch/new-student/utils"

export default async function DatePickerSimple() {
    const res = await generateEnrollmentNumbers()
    return <div>{JSON.stringify(res)}</div>
}
