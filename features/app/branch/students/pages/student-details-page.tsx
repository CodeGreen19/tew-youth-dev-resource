import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getStudentById } from "../queries"
import { StudentDetails } from "../components/student-details"

export async function StudentDetailsPage({
    id,
}: {
    id: string
}) {
    const student = await getStudentById(id)

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Student Details
                </PageTitle>
            </PageHeader>

            <PageContent>
                <StudentDetails student={student} />
            </PageContent>
        </Page>
    )
}
