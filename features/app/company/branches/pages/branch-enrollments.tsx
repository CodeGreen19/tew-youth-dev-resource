import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"
import { enrollmentsColumns } from "../components/enrollments-columns"
import { getEnrollmentsBranchId } from "../queries"

export async function BranchEnrollmentsPage({
    id,
}: {
    id: string
}) {
    const enrollments = await getEnrollmentsBranchId({ id })
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/branches">
                    Enrollments
                </PageTitle>
            </PageHeader>
            <PageContent>
                <DataTable
                    searchBy="name"
                    columns={enrollmentsColumns}
                    data={enrollments}
                />
            </PageContent>
        </Page>
    )
}
