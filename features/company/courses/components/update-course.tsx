"use client"

import { useRouter } from "next/navigation"
import { Course } from "../types"
import { UpdateCourseForm } from "./update-course-form"

export function UpdateCourse({
    course,
}: {
    course: Course
}) {
    const router = useRouter()
    return (
        <div className="max-w-lg m-auto">
            <UpdateCourseForm
                existedValue={{
                    ...course,
                    existingBanner: course.banner,
                    banner: null,
                }}
                onSuccess={() =>
                    router.push("/company/courses")
                }
            />
        </div>
    )
}
