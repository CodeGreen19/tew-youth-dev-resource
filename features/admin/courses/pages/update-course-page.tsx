"use client"
import { Page, PageHeader, PageTitle } from '@/components/shared/page'
import { CourseForm } from '../components/course-form'
import { useRouter } from 'next/navigation'
import { Course } from '../types';

export function UpdateCoursePage({ course }: { course: Course }) {

    const router = useRouter();
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo='/admin/courses'>Update Course</PageTitle>
            </PageHeader>
            <div className='max-w-lg m-auto'>
                <CourseForm type='UPDATE' existedValue={course} onSuccess={() => router.push("/admin/courses")} />
            </div>
        </Page>
    )
}
