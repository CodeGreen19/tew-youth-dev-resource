"use client"

import { createColumnHelper } from "@tanstack/react-table"

import {
    Expand,
    MoreHorizontal,
    SquareArrowOutUpRight,
} from "lucide-react"

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
import { User } from "../types"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<
    DataTableFeatures,
    User
>()

export const columns = columnHelper.columns([
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                indeterminate={
                    table.getIsSomePageRowsSelected() &&
                    !table.getIsAllPageRowsSelected()
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    row.toggleSelected(!!value)
                }
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    }),
    columnHelper.accessor("id", {
        header: "ID",
    }),
    columnHelper.accessor("name", {
        header: "Name",
    }),
    columnHelper.accessor("email", {
        header: "Email",
    }),
    columnHelper.accessor("role", {
        header: "Role",
        cell: ({ row }) => {
            return <Badge>{row.original.role}</Badge>
        },
    }),
    columnHelper.accessor("createdAt", {
        header: "Joined At",
        cell: ({ row }) => {
            return (
                <span>
                    {new Date(
                        row.original.createdAt,
                    ).toLocaleDateString()}
                </span>
            )
        },
    }),

    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
            return (
                <Button
                    nativeButton={false}
                    render={
                        <Link
                            href={`/admin/users/${row.original.id}`}
                        />
                    }
                    variant={"ghost"}
                    size={"icon"}
                >
                    <SquareArrowOutUpRight />
                </Button>
            )
        },
    }),
])
