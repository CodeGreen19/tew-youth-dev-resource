import { UpdateCoursePage } from "@/features/admin/courses/pages/update-course-page"
import { getCourseById } from "@/features/admin/courses/queries"

export default function page(
    props: PageProps<"/admin/courses/[id]/update">,
) {
    return <UpdateCoursePage {...props} />
}
