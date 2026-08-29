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
import { useSuspenseQuery } from "@tanstack/react-query"
// import { userOptions } from "../pages/users-page"
import { getUsers } from "../server/queries"



export function ShowUsers({ data }: { data: Awaited<ReturnType<typeof getUsers>> }) {
    // const { data } = useSuspenseQuery(userOptions)

    return (
        <Table>
            <TableCaption>A list of registered users and their assigned roles.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25">ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead className="text-right">Joined</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="font-mono text-xs">{user.id}</TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                                {user.role ?? "user"}
                            </span>
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                            {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}