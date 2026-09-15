import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import {
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"
import { CoursesView } from "../components/courses-view"
import { getCourses } from "../queries"

export async function CoursesPage() {
    const qc = getQueryClient()
    await qc.prefetchQuery({
        queryKey: ["courses"],
        queryFn: () => getCourses(),
    })

    return (
        <HydrationBoundary state={dehydrate(qc)}>
            <CoursesView />
        </HydrationBoundary>
    )
}
