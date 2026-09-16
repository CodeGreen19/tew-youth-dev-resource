"use cache"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import { Page3View } from "../_components/page-3-view"
import { getTests } from "../_server/queries"
import {
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"

export default async function page() {
    const qc = getQueryClient()
    await qc.prefetchQuery({
        queryKey: ["tests"],
        queryFn: () => getTests(),
    })

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <Page3View />
        </HydrationBoundary>
    )
}
