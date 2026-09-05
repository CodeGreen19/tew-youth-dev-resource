import { Page } from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"
import { columns } from "../components/columns"
import { CourseHeader } from "../components/header"
import { SelectedBulkAction } from "../components/selected-bulk-actions"
import { getCourses } from "../queries"

export async function CoursesPage() {
    const courses = await getCourses()
    return (
        <Page>
            <CourseHeader />
            <DataTable
                BulkActionComponent={SelectedBulkAction}
                columns={columns}
                data={courses}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            />
        </Page>
    )
}
