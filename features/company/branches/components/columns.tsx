"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { SquareArrowOutUpRight } from "lucide-react"

import { DataTableFeatures } from "@/components/table/data-table-features"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import Link from "next/link"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    any
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
    columnHelper.accessor("branchName", {
        header: "Branch Name",
    }),
    columnHelper.accessor("ownerName", {
        header: "Owner Name",
    }),
    columnHelper.accessor("createdAt", {
        header: "Created At",
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
                            href={`/company/branches/${row.original.id}`}
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
