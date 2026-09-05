import { CourseDetailsPage } from "@/features/admin/courses/pages/course-details-page"

export default async function page(
    props: PageProps<"/admin/courses/[id]/update">,
) {
    return <CourseDetailsPage {...props} />
}
