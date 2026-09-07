import { CourseDetailsPage } from "@/features/company/courses/pages/course-details-page"

export default function page(
    props: PageProps<"/company/courses/[id]/details">,
) {
    return <CourseDetailsPage {...props} />
}
