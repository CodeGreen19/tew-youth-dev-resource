import { DataTable } from "@/components/table/data-table"

import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { studentColumns } from "../components/student-columns"
import { getPaidStudents } from "../queries"

export async function StudentsPage() {
    const students = await getPaidStudents()
    return (
        <Page>
            <PageHeader>
                <PageTitle>Students</PageTitle>
            </PageHeader>
            <DataTable
                columns={studentColumns}
                data={students}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            />
        </Page>
    )
}
