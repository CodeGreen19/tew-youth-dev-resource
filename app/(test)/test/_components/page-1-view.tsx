"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Test, TestList } from "./test-list"

export function Page1View({ tests }: { tests: Test[] }) {
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
                        <Link href="/test/page-1/new">
                            Add Test
                        </Link>
                    }
                ></Button>
            </div>

            <TestList tests={tests} updatePage="page-1" />
        </div>
    )
}
