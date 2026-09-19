import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getStudentById } from "../queries"
import { UpdateStudentForm } from "../components/update-student-form"

export async function StudentUpdatePage({
    id,
}: {
    id: string
}) {
    const student = await getStudentById(id)

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Update Student
                </PageTitle>
            </PageHeader>

            <PageContent>
                <div className="max-w-lg m-auto">
                    <UpdateStudentForm
                        existedValue={student}
                    />
                </div>
            </PageContent>
        </Page>
    )
}
