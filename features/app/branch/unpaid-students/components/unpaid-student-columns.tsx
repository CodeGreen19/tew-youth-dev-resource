"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { DataTableFeatures } from "@/components/table/data-table-features"

import { CellNavigateTo } from "@/components/table/cells/cell-navigate-to"
import { createSelectColumn } from "@/components/table/columns/create-select-column"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Branch } from "../types"
import { DataTableColumnHeader } from "@/components/table/data-table-column-header"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    Branch
>()

export const branchColumns = columnHelper.columns([
    createSelectColumn<Branch>(),

    columnHelper.accessor("logo", {
        header: "Logo",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage
                        src={row.original.logo || ""}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )
        },
    }),

    columnHelper.accessor("name", {
        header: ({ column }) => (
            <DataTableColumnHeader
                column={column}
                title="Branch Name"
            />
        ),
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
        cell: ({ row }) => (
            <CellNavigateTo
                href={`/dashboard/branches/${row.original.id}/details`}
            />
        ),
    }),
])
