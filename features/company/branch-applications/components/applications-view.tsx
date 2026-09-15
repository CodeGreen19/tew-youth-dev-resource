"use client"

import {
    Page,
    PageContent,
    PageHeader,
    PageTitle,
} from "@/components/shared/page"
import { DataTable } from "@/components/table/data-table"
import { useSuspenseQuery } from "@tanstack/react-query"
import { options } from "../pages/applications-page"
import { applicationsColumns } from "./applications-columns"

export function ApplicationsView() {
    const { data: branches } = useSuspenseQuery(options)
    return (
        <Page>
            <PageHeader>
                <PageTitle>Applications</PageTitle>
            </PageHeader>
            <PageContent>
                <DataTable
                    searchBy="branchName"
                    columns={applicationsColumns}
                    data={branches}
                />
            </PageContent>
        </Page>
    )
}
