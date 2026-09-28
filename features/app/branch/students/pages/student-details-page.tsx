import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { StudentDetails } from "../components/student-details"
import {
    getCourseInfo,
    getStudentDetailsByEnrollmentId,
} from "../queries"

export async function StudentDetailsPage({
    backTo,
    id,
}: {
    id: string
    backTo: string
}) {
    const student = await getStudentDetailsByEnrollmentId({
        id,
    })
    const courses = await getCourseInfo()
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo={backTo}>
                    Student Details
                </PageTitle>
            </PageHeader>
            <PageContent className="max-w-2xl mx-auto">
                <StudentDetails
                    backTo={backTo}
                    enrollmentId={id}
                    student={student}
                    courses={courses}
                />
            </PageContent>
        </Page>
    )
}
