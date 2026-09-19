"use client"

import {
    Page,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { useRouter } from "next/navigation"
import { AddStudentForm } from "../components/add-student-form"

export function AddStudentPage() {
    const router = useRouter()

    return (
        <Page>
            <PageHeader>
                <PageTitle backTo="/dashboard/students">
                    Add Student
                </PageTitle>
            </PageHeader>

            <div className="max-w-lg m-auto">
                <AddStudentForm
                    onSuccess={() =>
                        router.push("/dashboard/students")
                    }
                />
            </div>
        </Page>
    )
}
