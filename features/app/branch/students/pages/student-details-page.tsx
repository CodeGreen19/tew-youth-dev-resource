import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"

export async function StudentDetailsPage({
    id,
}: {
    id: string
}) {
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Student Details
                </PageTitle>
            </PageHeader>
        </Page>
    )
}
