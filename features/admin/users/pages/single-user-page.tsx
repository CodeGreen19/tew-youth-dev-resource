import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { getSingerUserById } from "../queries"
import ShowSingleUser from "../components/show-single-user"

export async function SingleUserPage(
    props: PageProps<"/admin/users/[id]">,
) {
    const userId = (await props.params).id
    const res = await getSingerUserById(userId)
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/admin/users">
                    User Details
                </PageTitle>
            </PageHeader>
            <div className="max-w-lg m-auto">
                <ShowSingleUser {...res} />
            </div>
        </Page>
    )
}
