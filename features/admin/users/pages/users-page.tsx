import { Page } from "@/components/shared/page"
import { ShowUsers } from "../components/show-users"
import { UsersHeader } from "../components/users-header"
import { getUsers } from "../queries"

export async function UsersPage() {
    const data = await getUsers()

    return (
        <Page>
            <UsersHeader />
            <ShowUsers users={data.users} />
        </Page>
    )
}
