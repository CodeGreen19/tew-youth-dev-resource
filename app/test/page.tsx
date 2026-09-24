import {
    generateEnrollmentNumbers,
    getCourseRangeOptions,
} from "@/features/app/branch/new-student/utils"

export default async function DatePickerSimple() {
    const res = getCourseRangeOptions("2_years")
    return (
        <div>
            {res.map((r) => (
                <div key={r.label}>
                    {r.label}, {r.value}
                </div>
            ))}
        </div>
    )
}
