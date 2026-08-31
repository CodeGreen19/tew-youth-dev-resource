"use client"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { User } from "../types"
import { DataTable } from "@/components/table/data-table"
import { columns } from "./columns"


export function ShowUsers({ users }: { users: User[] }) {
    // const { data } = useSuspenseQuery(userOptions)

    return (
        <DataTable columns={columns} data={users} />
    )
}