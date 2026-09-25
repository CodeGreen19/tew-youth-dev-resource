import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { UpdateStudentForm } from "../components/update-student/update-student-form"
import { getPaidStudentByEnrolledId } from "../queries"

export async function UpdateStudentInfo({
    id,
}: {
    id: string
}) {
    const student = await getPaidStudentByEnrolledId({ id })
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Update Student
                </PageTitle>
            </PageHeader>
            <PageContent>
                <UpdateStudentForm
                    enrollmentId={id}
                    student={student}
                />
            </PageContent>
        </Page>
    )
}
