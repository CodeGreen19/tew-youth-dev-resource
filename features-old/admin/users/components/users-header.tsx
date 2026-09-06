"use client"

import { PageAction, PageHeader, PageTitle } from "@/components/shared/page"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export function UsersHeader() {
    return (
        <PageHeader>
            <PageTitle>Users</PageTitle>
            <PageAction>
                <Button nativeButton={false} render={<Link href={"/admin/users/add"} />}><Plus /> Add User</Button>
            </PageAction>
        </PageHeader>
    )
}
