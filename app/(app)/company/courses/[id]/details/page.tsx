import { CourseDetailsPage } from "@/features/company/courses/pages/course-details-page"

export default async function page(
    props: PageProps<"/company/courses/[id]/details">,
) {
    const id = (await props.params).id
    return <CourseDetailsPage id={id} />
}
