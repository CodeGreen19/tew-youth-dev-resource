import { UserDetailsPage } from "@/features/app/company/users/pages/user-details-page"

export default async function page(
    props: PageProps<"/dashboard/users/[id]/details">,
) {
    const id = (await props.params).id
    return <UserDetailsPage id={id} />
}
