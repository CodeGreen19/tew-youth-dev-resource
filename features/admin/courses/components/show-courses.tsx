"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { getCourses } from "../queries"
import { DataTable } from "@/components/table/data-table"
import { columns } from "./columns"

export function ShowCourses() {
    const { data } = useSuspenseQuery({ queryKey: ["courses"], queryFn: () => getCourses() })
    return (
        <div>
            <DataTable columns={columns} data={data} />
        </div>
    )
}
