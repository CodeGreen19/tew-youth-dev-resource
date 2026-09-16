"use cache"

import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import {
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"
import { Page4View } from "../_components/page-4-view"
import { getTests } from "../_server/queries"
import { Suspense } from "react"
import { cacheTag } from "next/cache"

export default async function page() {
    cacheTag("tests")
    const qc = getQueryClient()
    void qc.prefetchQuery({
        queryKey: ["advanced-tests"],
        queryFn: () => getTests(),
    })

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <Suspense fallback={<div>Suspended...</div>}>
                <Page4View />
            </Suspense>
        </HydrationBoundary>
    )
}
