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
    const canAdd = authClient.admin.checkRolePermission({
        permissions: { course: ["create"] },
        role: data?.user.role as "admin",
    })
    return (
        <PageHeader>
            <PageTitle>Courses</PageTitle>
            {canAdd && (
                <PageAction>
                    <Button
                        nativeButton={false}
                        render={
                            <Link
                                href={"/admin/courses/add"}
                            />
                        }
                    >
                        <Plus /> Add Course
                    </Button>
                </PageAction>
            )}
        </PageHeader>
    )
}
