"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getCourses } from "../server/queries"

export function ShowCourses() {
    const { data } = useSuspenseQuery({ queryKey: ["courses"], queryFn: () => getCourses() })
    return (
        <div>
            {data.map((course) => (
                <div key={course.id}>{course.name}</div>
            ))}
        </div>
    )
}
