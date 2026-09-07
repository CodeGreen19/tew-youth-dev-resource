import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { UpdateCourse } from "../components/update-course"
import { getCourseById } from "../queries"

export async function CourseUpdatePage(
    props: PageProps<"/company/courses/[id]/update">,
) {
    const id = await props.params.then((v) => v.id)
    const course = await getCourseById(id)

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/company/courses">
                    Update Course
                </PageTitle>
            </PageHeader>
            <UpdateCourse course={course} />
        </Page>
    )
}
