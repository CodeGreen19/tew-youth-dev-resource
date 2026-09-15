import { CourseUpdatePage } from "@/features/company/courses/pages/course-update-page"

export default async function page(
    props: PageProps<"/company/courses/[id]/details">,
) {
    const id = (await props.params).id
    return <CourseUpdatePage id={id} />
}
