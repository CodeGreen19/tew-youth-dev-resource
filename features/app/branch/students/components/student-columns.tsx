"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { CellNavigateTo } from "@/components/table/cells/cell-navigate-to"
import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { DataTableFeatures } from "@/components/table/data-table-features"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Student } from "../types"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    Student
>()

export const studentColumns = columnHelper.columns([
    createSelectColumn<Student>(),

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

    columnHelper.display({
        id: "student",
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Student"
            />
        ),
        cell: ({ row }) => {
            const student = row.original.student

            if (!student) {
                return "-"
            }

            return (
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage
                            src={
                                student.image?.secureUrl ||
                                ""
                            }
                            alt={student.name}
                        />
                        <AvatarFallback>
                            {student.name
                                .slice(0, 2)
                                .toUpperCase()}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex flex-col">
                        <span className="font-medium">
                            {student.name}
                        </span>
                        {student.email && (
                            <span className="text-muted-foreground text-sm">
                                {student.email}
                            </span>
                        )}
                    </div>
                </div>
            )
        },
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
        cell: ({ row }) => (
            <CellNavigateTo
                href={`/dashboard/students/${row.original.id}/details`}
            />
        ),
    }),
])
