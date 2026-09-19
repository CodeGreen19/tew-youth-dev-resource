import { StudentUpdatePage } from "@/features/app/branch/students/pages/update-update-page"

export default async function page(
    props: PageProps<"/dashboard/students/[id]/details">,
) {
    const id = (await props.params).id
    return <StudentUpdatePage id={id} />
}
