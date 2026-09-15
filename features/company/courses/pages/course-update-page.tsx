import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { UpdateCourse } from "../components/update-course"
import { getCourseById } from "../queries"
import { getQueryClient } from "@/lib/tanstack-query/get-query-client"
import {
    dehydrate,
    HydrationBoundary,
} from "@tanstack/react-query"

export async function CourseUpdatePage({
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
                    Update Course
                </PageTitle>
            </PageHeader>
            <HydrationBoundary state={dehydrate(qc)}>
                <UpdateCourse id={id} />
            </HydrationBoundary>
        </Page>
    )
}
