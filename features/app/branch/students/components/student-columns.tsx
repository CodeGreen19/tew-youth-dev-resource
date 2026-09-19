"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { DataTableFeatures } from "@/components/table/data-table-features"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"
import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Student } from "../types"
import { DeleteStudentDialog } from "./delete-student-dialog"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    Student
>()

export const studentsColumns = columnHelper.columns([
    createSelectColumn<Student>(),

    columnHelper.accessor("name", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Name"
            />
        ),
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter()

            const [deleteDialogInfo, setDeleteDialogInfo] =
                useState<Student | null>(null)

            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={
                                <Button
                                    variant="ghost"
                                    className="size-8 p-0"
                                />
                            }
                        >
                            <span className="sr-only">
                                Open menu
                            </span>
                            <MoreHorizontal className="size-4" />
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
                                            `/dashboard/students/${row.original.id}/update`,
                                        )
                                    }
                                >
                                    Edit Student
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    onClick={() =>
                                        router.push(
                                            `/dashboard/students/${row.original.id}/details`,
                                        )
                                    }
                                >
                                    View In Detail
                                </DropdownMenuItem>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                                onClick={() =>
                                    setDeleteDialogInfo(
                                        row.original,
                                    )
                                }
                                variant="destructive"
                            >
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <DeleteStudentDialog
                        deleteDialogInfo={deleteDialogInfo}
                        setDeleteDialogInfo={
                            setDeleteDialogInfo
                        }
                    />
                </div>
            )
        },
    }),
])
