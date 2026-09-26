"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { MoreHorizontal } from "lucide-react"

import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableFeatures } from "@/components/table/data-table-features"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"

import { Student } from "../../types"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    Student
>()

export const studentColumns = columnHelper.columns([
    createSelectColumn<Student>(),
    columnHelper.accessor("student.image", {
        header: "Image",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage
                        src={
                            row.original.student?.image
                                .secureUrl || ""
                        }
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )
        },
    }),

    columnHelper.accessor("student.name", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Name"
            />
        ),
    }),
    columnHelper.accessor("registrationNumber", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Registration No."
            />
        ),
    }),

    columnHelper.accessor("rollNumber", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Roll No."
            />
        ),
    }),

    columnHelper.accessor("course.name", {
        id: "course",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Course"
            />
        ),
    }),

    columnHelper.accessor("paymentStatus", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Payment Status"
            />
        ),
        cell: ({ row }) => {
            const status = row.original.paymentStatus

            return (
                <Badge
                    variant={
                        status === "paid"
                            ? "default"
                            : status === "pending"
                              ? "secondary"
                              : "destructive"
                    }
                >
                    {status}
                </Badge>
            )
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter()

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    className="h-8 w-8 p-0"
                                />
                            }
                        >
                            <span className="sr-only">
                                Open menu
                            </span>
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>
                                    Actions
                                </DropdownMenuLabel>
                            </DropdownMenuGroup>

                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/students/${row.original.id}/update-student`,
                                        )
                                    }
                                >
                                    Update Student
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )
        },
    }),
])
