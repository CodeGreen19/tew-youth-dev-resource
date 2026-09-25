import { UpdateStudentInfo } from "@/features/app/branch/students/pages/update-student-info"

export default async function page(
    props: PageProps<"/dashboard/students/[id]/update-student">,
) {
    const id = (await props.params).id
    return <UpdateStudentInfo id={id} />
}
