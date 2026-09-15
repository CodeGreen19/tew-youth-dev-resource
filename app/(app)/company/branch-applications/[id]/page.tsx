import { ApplicationDetialsPage } from "@/features/company/branch-applications/pages/application-details-page"
import React from "react"

export default async function page(
    props: PageProps<"/company/branch-applications/[id]">,
) {
    const id = (await props.params).id
    return <ApplicationDetialsPage id={id} />
}
