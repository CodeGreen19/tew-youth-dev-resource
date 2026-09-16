"use client"

import { Button } from "@/components/ui/button"
import { useSuspenseQuery } from "@tanstack/react-query"
import Link from "next/link"
import { getTests } from "../_server/queries"
import { TestList } from "./test-list"

export function Page4View() {
    const { data: tests } = useSuspenseQuery({
        queryKey: ["advanced-tests"],
        queryFn: () => getTests(),
    })
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">
                        Tests
                    </h1>

                    <p className="text-muted-foreground">
                        Manage your tests.
                    </p>
                </div>

                <Button
                    nativeButton={false}
                    render={
                        <Link href="/test/page-4/new">
                            Add Test
                        </Link>
                    }
                ></Button>
            </div>

            <TestList tests={tests} updatePage="page-4" />
        </div>
    )
}
