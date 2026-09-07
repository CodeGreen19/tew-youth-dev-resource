import { CourseUpdatePage } from "@/features/company/courses/pages/course-update-page"

export default function page(
    props: PageProps<"/company/courses/[id]/details">,
) {
    return <CourseUpdatePage {...props} />
}
