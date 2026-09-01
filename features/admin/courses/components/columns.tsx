"use client"

import { createColumnHelper } from "@tanstack/react-table"



import { MoreHorizontal } from "lucide-react"

import { DataTableFeatures } from "@/components/table/data-table-features"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Course } from "../types"
import { useRouter } from "next/navigation"
import { useState } from "react"
import DeleteCourseDialog from "./delete-course-dialog"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Course>()

export const columns = columnHelper.columns([
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor("name", {
        header: "Course Name",
    }),


    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter();
            const [deleteDialogInfo, setDeleteDialogInfo] = useState<Course | null>(null)
            return (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            render={<Button variant="ghost" className="h-8 w-8 p-0" />}
                        >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem

                                    onClick={() => router.push(`/admin/courses/${row.original.id}/update`)}
                                >
                                    Edit Course
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => router.push(`/admin/courses/${row.original.id}/details`)}>View In Detail</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => setDeleteDialogInfo(row.original)} variant="destructive">Delete</DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DeleteCourseDialog deleteDialogInfo={deleteDialogInfo} setDeleteDialogInfo={setDeleteDialogInfo} />
                </div>
            )
        },
    }),
])


