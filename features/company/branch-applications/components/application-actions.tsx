"use client"

import { useSuspenseQuery } from "@tanstack/react-query"
import { options } from "../pages/application-details-page"

export function ApplictionActions({ id }: { id: string }) {
    const { data: application } = useSuspenseQuery(
        options(id),
    )
    return <div>ApplictionActions</div>
}
