import { SingleUserPage } from "@/features/admin/users/pages/single-user-page"
import React from "react"

export default function page(
    props: PageProps<"/admin/users/[id]">,
) {
    return <SingleUserPage {...props} />
}
