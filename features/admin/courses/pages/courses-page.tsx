
import { Page } from '@/components/shared/page';
import { CourseHeader } from '../components/header';
import { ShowCourses } from '../components/show-courses';
import { getCourses } from '../queries';

export async function CoursesPage() {
    const courses = await getCourses();
    return (
        <Page>
            <CourseHeader />
            <ShowCourses courses={courses} />
        </Page>
    )
}
