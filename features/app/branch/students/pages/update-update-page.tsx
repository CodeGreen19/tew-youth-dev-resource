import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"

export async function StudentUpdatePage({
    id,
}: {
    id: string
}) {
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Update Student
                </PageTitle>
            </PageHeader>
        </Page>
    )
}
