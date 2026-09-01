"use client"

import { DataTable } from "@/components/table/data-table"
import { Course } from "../types"
import { columns } from "./columns"

export function ShowCourses({ courses }: { courses: Course[] }) {


    return (
        <div>
            <DataTable columns={columns} data={courses} />
        </div>
    )
}
