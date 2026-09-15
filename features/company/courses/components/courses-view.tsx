"use client"

import { DataTable } from "@/components/table/data-table"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { useSuspenseQuery } from "@tanstack/react-query"
import { Plus } from "lucide-react"
import Link from "next/link"
import { getCourses } from "../queries"
import { coursesColumns } from "./courses-columns"
import { SelectedBulkAction } from "./selected-bulk-actions"

export function CoursesView() {
    const { data: courses } = useSuspenseQuery({
        queryKey: ["courses"],
        queryFn: () => getCourses(),
    })
    return (
        <Page>
            <PageHeader>
                <PageTitle>Courses</PageTitle>

                <PageAction>
                    <Button
                        nativeButton={false}
                        render={
                            <Link
                                href={
                                    "/company/courses/add"
                                }
                            />
                        }
                    >
                        <Plus /> Add Course
                    </Button>
                </PageAction>
            </PageHeader>
            <DataTable
                BulkActionComponent={SelectedBulkAction}
                columns={coursesColumns}
                data={courses}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            />
        </Page>
    )
}
