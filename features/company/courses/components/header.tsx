"use client"

import {
    PageAction,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { Plus } from "lucide-react"
import Link from "next/link"

export function CourseHeader() {
    const { data } = authClient.useSession()

    return (
        <PageHeader>
            <PageTitle>Courses</PageTitle>

            <PageAction>
                <Button
                    nativeButton={false}
                    render={
                        <Link
                            href={"/company/courses/add"}
                        />
                    }
                >
                    <Plus /> Add Course
                </Button>
            </PageAction>
        </PageHeader>
    )
}
