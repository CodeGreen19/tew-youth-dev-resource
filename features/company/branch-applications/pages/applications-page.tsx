import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"
import { columns } from "../components/columns"
import { getBrancheApplications } from "../queries"

export async function ApplicationsPage() {
    const branches = await getBrancheApplications()
    return (
        <Page>
            <PageHeader>
                <PageTitle>Applications</PageTitle>
            </PageHeader>
            <PageContent>
                <DataTable
                    searchBy="branchName"
                    columns={columns}
                    data={branches}
                />
            </PageContent>
        </Page>
    )
}
