import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { CourseDetails } from "../components/course-details"
import { getCourseById } from "../queries"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import {
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"

export async function CourseDetailsPage({
    id,
}: {
    id: string
}) {
    const qc = getQueryClient()
    await qc.prefetchQuery({
        queryKey: ["courses-details", id],
        queryFn: () => getCourseById(id),
    })

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/company/courses">
                    Course Details
                </PageTitle>
            </PageHeader>
            <HydrationBoundary state={dehydrate(qc)}>
                <CourseDetails id={id} />
            </HydrationBoundary>
        </Page>
    )
}
