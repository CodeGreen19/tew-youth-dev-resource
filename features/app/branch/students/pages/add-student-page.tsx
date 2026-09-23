"use client"

import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { useRouter } from "next/navigation"
import { FullStudentForm } from "../../new-student/components/full-student-form"

export function AddStudentPage() {
    const router = useRouter()

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Add Student
                </PageTitle>
            </PageHeader>
        </Page>
    )
}
