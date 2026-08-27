import { Page, PageHeader, PageTitle } from '@/components/shared/page'
import React from 'react'
import { CourseForm } from '../components/course-form'

export function AddCoursePage() {
    return (
        <Page>
            <PageHeader>
                <PageTitle backTo='/admin/courses'>Add Course</PageTitle>
            </PageHeader>
            <div className='max-w-sm m-auto'>
                <CourseForm type='ADD' />
            </div>
        </Page>
    )
}
