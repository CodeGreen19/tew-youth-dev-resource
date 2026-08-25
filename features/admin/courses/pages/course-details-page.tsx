
export async function CourseDetailsPage(props: PageProps<"/admin/courses/[slug]">) {

    const slug = (await props.params).slug
    return (
        <div>CourseDetailsPage {slug}</div>
    )
}
