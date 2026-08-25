"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getCourses } from "../server/queries"
import { CourseForm } from "./course-form"

export function ViewCourses() {
    const { data } = useSuspenseQuery({ queryKey: ["courses"], queryFn: () => getCourses() })
    return (
        <div>ViewCourses
            <div>
                {data.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </div>
            <CourseForm type="ADD" /></div>
    )
}
