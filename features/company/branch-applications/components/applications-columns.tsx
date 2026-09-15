"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { DataTableFeatures } from "@/components/table/data-table-features"

import { CellNavigateTo } from "@/components/table/cells/cell-navigate-to"
import { createSelectColumn } from "@/components/table/columns/create-select-column"
import { Badge } from "@/components/ui/badge"
import { BranchApplication } from "../types"
import Image from "next/image"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const columnHelper = createColumnHelper<
    DataTableFeatures,
    BranchApplication
>()

export const applicationsColumns = columnHelper.columns([
    createSelectColumn<BranchApplication>(),

    columnHelper.accessor("logo", {
        header: "Logo",
        cell: ({ row }) => {
            return (
                <Avatar>
                    <AvatarImage
                        src={row.original.logo?.secureUrl}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            )
        },
    }),

    columnHelper.accessor("branchName", {
        header: "Branch Name",
    }),
    columnHelper.accessor("ownerName", {
        header: "Owner Name",
    }),
    columnHelper.accessor("mobile", {
        header: "Mobile Number",
    }),
    columnHelper.accessor("status", {
        header: "Status",
        cell: ({ row }) => {
            return <Badge>{row.original.status}</Badge>
        },
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
                href={`/company/branch-applications/${row.original.id}`}
            />
        ),
    }),
])
