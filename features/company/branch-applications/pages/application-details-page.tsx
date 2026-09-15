import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import {
    dehydrate,
    HydrationBoundary,
    queryOptions,
} from "@tanstack/react-query"

import { getBranchApplicationById } from "../queries"
import { ApplicationDetialsView } from "../components/application-details-view"

export const options = (id: string) =>
    queryOptions({
        queryKey: ["branch-applications", id],
        queryFn: () =>
            getBranchApplicationById({
                id,
            }),
    })

export async function ApplicationDetialsPage({
    id,
}: {
    id: string
}) {
    const qc = getQueryClient()
    await qc.prefetchQuery(options(id))
    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <ApplicationDetialsView id={id} />
        </HydrationBoundary>
    )
}
