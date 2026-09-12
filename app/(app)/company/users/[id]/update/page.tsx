import { OrgUserDetailsPage } from "@/features/company/users/pages/user-details-page"

export default async function page(
    props: PageProps<"/company/users/[id]/details">,
) {
    const id = (await props.params).id
    return <OrgUserDetailsPage id={id} />
}
