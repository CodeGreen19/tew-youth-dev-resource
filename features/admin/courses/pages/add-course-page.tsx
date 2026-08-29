"use client"
import { Page, PageHeader, PageTitle } from '@/components/shared/page'
import { CourseForm } from '../components/course-form'
import { useRouter } from 'next/navigation'

export function AddCoursePage() {
    const router = useRouter();
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo='/admin/courses'>Add Course</PageTitle>
            </PageHeader>
            <div className='max-w-sm m-auto'>
                <CourseForm type='ADD' onSuccess={() => router.push("/admin/courses")} />
            </div>
        </Page>
    )
}
