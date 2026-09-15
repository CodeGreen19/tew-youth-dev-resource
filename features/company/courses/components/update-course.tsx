"use client"

import { useRouter } from "next/navigation"
import { Course } from "../types"
import { UpdateCourseForm } from "./update-course-form"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getCourseById } from "../queries"

export function UpdateCourse({ id }: { id: string }) {
    const router = useRouter()
    const { data: course } = useSuspenseQuery({
        queryKey: ["courses-details", id],
        queryFn: () => getCourseById(id),
    })
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
