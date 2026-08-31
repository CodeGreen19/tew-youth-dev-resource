"use cache"
import { Page } from '@/components/shared/page';
import { getQueryClient } from '@/lib/tanstack-query/get-query-client';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';
import { ErrorBoundary } from "react-error-boundary";
import { CourseHeader } from '../components/header';
import { ShowCourses } from '../components/show-courses';
import { getCourses } from '../queries';

export async function CoursesPage() {
    const qc = getQueryClient();
    qc.prefetchQuery({ queryKey: ["courses"], queryFn: () => getCourses() })
    return (
        <Page>
            <CourseHeader />
            <HydrationBoundary state={dehydrate(qc)}>
                <ErrorBoundary fallback={<div>Error</div>}>
                    <Suspense fallback={<div>Course Loading...</div>}>
                        <ShowCourses />
                    </Suspense>
                </ErrorBoundary>
            </HydrationBoundary>
        </Page>
    )
}
