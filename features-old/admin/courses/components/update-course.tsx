"use client"

import { useRouter } from "next/navigation"
import { Course } from "../types"
import { CourseForm } from "./course-form"

export function UpdateCourse({
    course,
}: {
    course: Course
}) {
    const router = useRouter()
    return (
        <div className="max-w-lg m-auto">
            <CourseForm
                type="UPDATE"
                existedValue={course}
                onSuccess={() =>
                    router.push("/admin/courses")
                }
            />
        </div>
    )
}
