"use client"

import { BranchApplicationById } from "../types"
import { ApproveBranch } from "./approve-branch"

export function ApplictionActions({
    application,
}: {
    application: BranchApplicationById
}) {
    return (
        <div className="max-w-lg">
            <ApproveBranch {...application} />
        </div>
    )
}
