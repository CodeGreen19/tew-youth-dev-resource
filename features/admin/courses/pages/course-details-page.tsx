"use client"
import { Page, PageHeader, PageTitle } from '@/components/shared/page';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Course } from '../types';

export function CourseDetailsPage({ course }: { course: Course }) {

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo='/admin/courses'>Course Details</PageTitle>
            </PageHeader>
            <div className='max-w-lg m-auto'>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {course.name}
                        </CardTitle>
                        <CardDescription>
                            {course.description}
                        </CardDescription>

                    </CardHeader>
                    <CardContent>
                        <div className='aspect-video rounded-2xl bg-accent w-full'></div>
                    </CardContent>
                    <CardFooter>
                        <div>Created At : {course.createdAt.toLocaleDateString()}</div>
                    </CardFooter>
                </Card>
            </div>
        </Page>
    )
}
