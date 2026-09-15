import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import {
    dehydrate,
    HydrationBoundary,
    queryOptions,
} from "@tanstack/react-query"
import { ApplicationsView } from "../components/applications-view"
import { getBranchApplications } from "../queries"

export const options = queryOptions({
    queryKey: ["branch-applications"],
    queryFn: () => getBranchApplications(),
})

export async function ApplicationsPage() {
    const qc = getQueryClient()
    await qc.prefetchQuery(options)

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <ApplicationsView />
        </HydrationBoundary>
    )
}
