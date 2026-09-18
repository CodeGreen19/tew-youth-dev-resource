"use client"
import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { AddCourseForm } from "../components/add-course-form"
import { useRouter } from "next/navigation"

export function AddCoursePage() {
    const router = useRouter()

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/courses">
                    Add Course
                </PageTitle>
            </PageHeader>
            <div className="max-w-lg m-auto">
                <AddCourseForm
                    onSuccess={() =>
                        router.push("/dashboard/courses")
                    }
                />
            </div>
        </Page>
    )
}
