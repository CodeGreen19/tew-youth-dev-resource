import {
    Page,
    PageAction,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getMembers } from "../queries"
import { DataTable } from "@/components/table/data-table"
import { columns } from "../components/columns"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export async function UsersPage() {
    const members = (await getMembers()).members

    return (
        <Page>
            <PageHeader>
                <PageTitle>Org Users</PageTitle>
                <PageAction>
                    <Button
                        nativeButton={false}
                        render={
                            <Link
                                href={`/company/users/add`}
                            />
                        }
                    >
                        Add User <Plus />
                    </Button>
                </PageAction>
            </PageHeader>
            <PageContent>
                <DataTable
                    columns={columns}
                    data={members}
                />
            </PageContent>
        </Page>
    )
}
