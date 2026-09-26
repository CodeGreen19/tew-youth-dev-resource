import { Fragment } from "react"

import { auth } from "@/lib/auth"
import { headers as nextHeaders } from "next/headers"
import { redirect } from "next/navigation"
import { ContinueWorkspaceDialog } from "./continue-workspace-dialog"

export async function ContinueWorkspace() {
    const headers = await nextHeaders()
    const listOrg = await auth.api.listOrganizations({
        headers,
    })
    const org = listOrg[0]
    if (!org) {
        redirect("/")
    }

    return (
        <Fragment>
            <ContinueWorkspaceDialog orgId={org.id} />
        </Fragment>
    )
}
