import { Page } from "@/components/shared/page"
import { headers } from "next/headers"
import { ShowUsers } from "../components/show-users"
import { UsersHeader } from "../components/users-header"
import { getUsers } from "../queries"

export async function UsersPage() {
    const data = await getUsers(await headers())

    return (
        <Page>
            <UsersHeader />
            <ShowUsers users={data.users} />
        </Page>
    )
}
