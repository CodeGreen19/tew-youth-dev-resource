import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { UpdateCourse } from "../components/update-course"
import { getCourseById } from "../queries"

export async function UpdateCoursePage(
    props: PageProps<"/admin/courses/[id]/update">,
) {
    const id = await props.params.then((v) => v.id)
    const course = await getCourseById(id)

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/admin/courses">
                    Update Course
                </PageTitle>
            </PageHeader>
            <UpdateCourse course={course} />
        </Page>
    )
}
