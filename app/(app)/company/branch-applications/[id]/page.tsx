import { ApplicationDetials } from "@/features/company/branch-applications/pages/application-details"
import React from "react"

export default async function page(
    props: PageProps<"/company/branch-applications/[id]">,
) {
    const id = (await props.params).id
    return <ApplicationDetials id={id} />
}
