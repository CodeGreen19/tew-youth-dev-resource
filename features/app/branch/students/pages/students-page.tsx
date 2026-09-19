import { DataTable } from "@/components/table/data-table"
import { getStudents } from "../queries"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { studentsColumns } from "../components/student-columns"

export async function StudentsPage() {
    const students = await getStudents()
    return (
        <Page>
            <PageHeader>
                <PageTitle>Students</PageTitle>

                <PageAction>
                    <Button
                        nativeButton={false}
                        render={
                            <Link
                                href={
                                    "/dashboard/students/add"
                                }
                            />
                        }
                    >
                        <Plus /> Add Student
                    </Button>
                </PageAction>
            </PageHeader>
            <DataTable
                columns={studentsColumns}
                data={students}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            />
        </Page>
    )
}
