import { UpdateCoursePage } from "@/features/admin/courses/pages/update-course-page";
import { getCourseById } from "@/features/admin/courses/queries";

export default async function page(props: PageProps<"/admin/courses/[id]/update">) {

    const id = await props.params.then((v) => v.id);
    const course = await getCourseById(id);
    return (
        <UpdateCoursePage course={course} />
    )
}
