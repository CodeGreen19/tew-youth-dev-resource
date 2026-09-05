"use client"

import { DataTable } from "@/components/table/data-table"
import { User } from "../types"
import { columns } from "./columns"

export function ShowUsers({ users }: { users: User[] }) {
    return <DataTable columns={columns} data={users} />
}
