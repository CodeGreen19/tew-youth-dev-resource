import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import CourseDetails from "../components/course-details"
import { getCourseById } from "../queries"

export async function CourseDetailsPage(
    props: PageProps<"/admin/courses/[id]/details">,
) {
    const id = await props.params.then((v) => v.id)
    const course = await getCourseById(id)
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/admin/courses">
                    Course Details
                </PageTitle>
            </PageHeader>
            <CourseDetails course={course} />
        </Page>
    )
}
