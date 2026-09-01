import { CoursesPage } from '@/features/admin/courses/pages/courses-page';
import { getCourses } from '@/features/admin/courses/queries';

export default async function page() {
    const courses = await getCourses();
    return (
        <CoursesPage courses={courses} />

    )
}
