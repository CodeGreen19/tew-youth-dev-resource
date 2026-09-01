"use client"
import { Page } from '@/components/shared/page';
import { DataTable } from '@/components/table/data-table';
import { columns } from '../components/columns';
import { CourseHeader } from '../components/header';
import { Course } from '../types';
import { SelectedBulkAction } from '../components/selected-bulk-actions';


export function CoursesPage({ courses }: { courses: Course[] }) {

    return (
        <Page>
            <CourseHeader />
            <DataTable BulkActionComponent={SelectedBulkAction} columns={columns} data={courses} searchBy='name' searchPlaceholder='Search by Name ...' />
        </Page>
    )
}

