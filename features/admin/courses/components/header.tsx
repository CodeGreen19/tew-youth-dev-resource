"use client"

import { PageAction, PageHeader, PageTitle } from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function CourseHeader() {
    return (
        <PageHeader>
            <PageTitle>Courses</PageTitle>
            <PageAction>
                <Button nativeButton={false} render={<Link href={"/admin/courses/add"} />}><Plus /> Add Course</Button>
            </PageAction>
        </PageHeader>
    )
}
