import { DataTable } from "@/components/table/data-table"

import {
    Page,
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export async function StudentsPage() {
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
            {/* <DataTable
                columns={studentsColumns}
                data={students}
                searchBy="name"
                searchPlaceholder="Search by Name ..."
            /> */}
        </Page>
    )
}
