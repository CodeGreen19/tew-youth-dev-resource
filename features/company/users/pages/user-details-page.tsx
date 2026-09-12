import { getOrgUserDetailsById } from "../queries"

export async function OrgUserDetailsPage({
    id,
}: {
    id: string
}) {
    const data = await getOrgUserDetailsById({ userId: id })

    return (
        <div>
            UserDetailsPage {id} {JSON.stringify(data)}
        </div>
    )
}
